const transformAndWriteToFile = require('json-to-frontmatter-markdown').default;
const path = require('node:path');

const comments = require(path.join(__dirname, '../_export/comments.json'));

Object.keys(comments).forEach((p, i) => {
	let comment = comments[i];

	// Convert to Markdown
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
