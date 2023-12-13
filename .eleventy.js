module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("_site/images")

	// @todo Configuration markdown-it :
	// @link https://www.alpower.com/tutorials/configuring-footnotes-with-eleventy/

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
