const { DateTime } = require('luxon');
const markdownit = require("markdown-it");
const anchor = require("markdown-it-anchor");
const figure = require("markdown-it-image-figures");
const footnote = require("markdown-it-footnote");
const tocPlugin = require("eleventy-plugin-toc");
const pluginRss = require("@11ty/eleventy-plugin-rss");

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
		.use(anchor)
		.use(footnote)
		.use(figure, {
			figcaption: true,
			lazy: true,
			classes: ['aligncenter', 'alignright', 'alignleft']
		})

	md.renderer.rules.footnote_block_open = () => ('<ol class="footnotes-list small mt2 pt2 pb2">\n')
	// @note Beurk, mais permet d’ajouter le lien vers les commentaires
	md.renderer.rules.footnote_block_close = () => ('\n')

	// @todo Syntax highlighting
	// @link https://www.11ty.dev/docs/plugins/syntaxhighlight/
	// @note Les portions de code existantes fonctionnent toujours : privilégier PrismJS pour la rétro-compatibilité ?
	eleventyConfig.setLibrary("md", md)

	// Plugins
	eleventyConfig.addPlugin(tocPlugin, {
		tags: ["h2"],
		wrapper: ''
	})
	eleventyConfig.addPlugin(pluginRss)

	// Passe-plat
	eleventyConfig.addPassthroughCopy("_src/favicon.svg")
	eleventyConfig.addPassthroughCopy("_src/images")
	eleventyConfig.addPassthroughCopy("_src/assets")

	// Serveur
	eleventyConfig.setServerOptions({
		liveReload: true
	})

	// @todo Vérifier les 404 (sur les images notamment)

	return {
			dir: {
					input: '_src',
					output: 'docs'
			},
			markdownTemplateEngine: 'njk'
	}
}
