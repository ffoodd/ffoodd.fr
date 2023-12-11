module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("_site/images")

	// @note Ajoute rle filtre micro-typo de iimmgg ?

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
