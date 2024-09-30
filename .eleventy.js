const path = require("node:path");
// Globals: dates, strings
const { DateTime } = require('luxon')
const string = require('string')
const slugify = s => string(s).slugify().toString()
// Markdown configuration
const markdownit = require("markdown-it")
const anchor = require("markdown-it-anchor")
const figure = require("markdown-it-image-figures")
const footnote = require("markdown-it-footnote")
const { imgSize } = require("@mdit/plugin-img-size")
// 11ty plugins
const tocPlugin = require("eleventy-plugin-toc")
const rssPlugin = require("@11ty/eleventy-plugin-rss")
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
// Assets
const sass = require("sass");

module.exports = function (eleventyConfig) {
	// Shortcodes
	eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

	// Filtres
	eleventyConfig.addFilter('date', dateObj => {
		return DateTime.fromISO(dateObj).setLocale('fr').toLocaleString(DateTime.DATE_FULL)
	})

	eleventyConfig.addFilter('datetime', dateObj => {
		return DateTime.fromISO(dateObj).setLocale('fr').toLocaleString({...DateTime.DATETIME_MED, month: 'long'})
	})

	eleventyConfig.addFilter('publicationdate', dateStr => {
		const dateData = dateStr.split('/')
		return new Date(dateData[2], dateData[1], dateData[0]).toISOString()
	})

	eleventyConfig.addFilter('comments', (comments, slug) => {
		return comments.filter(
			comment => comment.data.tags.includes(slug)
		)
	})

	const mdFilter = new markdownit()
	eleventyConfig.addFilter("markdown", content => {
		return mdFilter.renderInline(content);
	})

	// Configuration de markdown-it
	const md = markdownit({
		html: true,
		typographer: true,
		quotes: ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'],
	})
		.use(anchor, { slugify })
		.use(footnote)
		.use(figure, {
			figcaption: true,
			lazy: true,
			async: true,
			classes: ['aligncenter', 'alignright', 'alignleft']
		})
		.use(imgSize)

	md.renderer.rules.footnote_block_open = () => ('<ol class="footnotes-list small mt2 pt2 pb2">\n')
	// @note Beurk, mais permet d’ajouter le lien vers les commentaires
	md.renderer.rules.footnote_block_close = () => ('\n')

	eleventyConfig.setLibrary("md", md)

	// @todo Corriger les liens externes morts
	// @note Lancer `npm run docs:lint:external`

	// Plugins
	eleventyConfig.addPlugin(tocPlugin, {
		tags: ["h2"],
		wrapper: ''
	})
	eleventyConfig.addPlugin(rssPlugin)
	eleventyConfig.addPlugin(syntaxHighlightPlugin, {
		preAttributes: {
			tabindex: 0
		}
	})

	// Passe-plat
	eleventyConfig.addPassthroughCopy("_src/favicon.svg")
	eleventyConfig.addPassthroughCopy("_src/favicon.ico")
	eleventyConfig.addPassthroughCopy("_src/humans.txt")
	eleventyConfig.addPassthroughCopy("_src/images")
	eleventyConfig.addPassthroughCopy("_src/assets")
	eleventyConfig.addPassthroughCopy({"_src/talks" : "./"})

	// Serveur
	eleventyConfig.setServerOptions({
		liveReload: true
	})

	return {
		dir: {
			input: '_src',
			output: 'docs'
		},
		markdownTemplateEngine: 'njk'
	}
}
