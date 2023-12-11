const transformAndWriteToFile = require('json-to-frontmatter-markdown').default;
const path = require('path');

const pages = require(path.join(__dirname, '../_export/pages.json'));

Object.keys(pages).forEach((p, i) => {
	let page = pages[i];
	transformAndWriteToFile({
		frontmatterMarkdown: {
			frontmatter: [
				{ title: page.title.rendered },
				{ permalink: `${page.slug}/index.html` }
			],
			body: page.content.rendered.replace(/http:\/\/www.ffoodd.fr\/wp-content\/uploads/g, '/images').replace(/http:\/\/www.ffoodd.fr/g, 'https://www.ffoodd.fr')
			},
			path: './_src/pages',
			fileName: `${page.slug}.md`
		})
})
