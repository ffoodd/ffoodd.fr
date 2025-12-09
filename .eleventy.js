import path from 'node:path'
// Globals: dates, strings
import { DateTime } from 'luxon'
import slugify from '@sindresorhus/slugify'
// Markdown configuration
import markdownit from 'markdown-it'
import anchor from 'markdown-it-anchor'
import figure from 'markdown-it-image-figures'
import footnote from 'markdown-it-footnote'
import { legacyImgSize } from '@mdit/plugin-img-size'
// 11ty plugins
import tocPlugin from 'eleventy-plugin-toc'
import rssPlugin from '@11ty/eleventy-plugin-rss'
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight'

export default function (eleventyConfig) {
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
		.use(anchor, { slugify: s => slugify(s) })
		.use(footnote)
		.use(figure, {
			figcaption: true,
			lazy: true,
			async: true,
			classes: ['aligncenter', 'alignright', 'alignleft']
		})
		.use(legacyImgSize)

	md.renderer.rules.footnote_block_open = () => ('<ol class="footnotes-list small mt2 pt2 pb2">\n')
	// @note Beurk, mais permet d’ajouter le lien vers les commentaires
	md.renderer.rules.footnote_block_close = () => ('\n')

	eleventyConfig.setLibrary("md", md)

	// @todo Corriger les liens externes morts
	// @note Lancer `npm run docs:lint:external`

	// Préprocesseurs
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

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
