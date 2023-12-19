module.exports = function (eleventyConfig) {

	// @note Micro-typographie : des choses à ajouter ?
	// @note À utiliser dans les titres et listes, surtout pas sur le contenu.
	eleventyConfig.addFilter('micro-typo', (text) => {
		return text
			.replace(' :', '&nbsp;:')
			.replace(' ?', ' ?')
			.replace(' !', ' !')
			.replace(' ;', ' ;')
			.replace(' »', ' »')
			.replace('« ', '« ')
			.replace(' — ', ' — ')
			.replace(' / ', ' / ')
	})

	// @todo Configuration markdown-it :
	// @link https://www.alpower.com/tutorials/configuring-footnotes-with-eleventy/
	// @link https://www.alpower.com/tutorials/adding-figures-with-captions-to-images-in-markdown-with-eleventy/
	// @link https://github.com/valeriangalliat/markdown-it-anchor
	// @todo RSS
	// @link https://www.11ty.dev/docs/plugins/rss/
	// @todo Syntax highlighting
	// @link https://www.11ty.dev/docs/plugins/syntaxhighlight/
	// @todo HTML minifier ?
	// @link https://github.com/terser/html-minifier-terser
	// @todo Robots.txt
	// @link https://micro.anniegreens.lol/2023/09/29/updated-my-microblog.html

	eleventyConfig.addPassthroughCopy("_site/images")

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
