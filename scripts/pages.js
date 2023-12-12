const transformAndWriteToFile = require('json-to-frontmatter-markdown').default;
const TurndownService = require('turndown');
const path = require('node:path');

const pages = require(path.join(__dirname, '../_export/pages.json'));
const turndownService = new TurndownService({
	codeBlockStyle: 'fenced',
	preformattedCode: true,
	headingStyle: 'atx'
});

Object.keys(pages).forEach((p, i) => {
	let page = pages[i];

	// Convert to Markdown
	let content = page.content.rendered
		.replace(/http:\/\/www.ffoodd.fr\/wp-content\/uploads/g, '/images')
		.replace(/http:\/\/www.ffoodd.fr/g, 'https://www.ffoodd.fr');

	let newContent =  turndownService.turndown(content)
		.replace(/ /g, '&nbsp;')
		.replace(/   /g, ' ');

	// Write to markdown file with frontmatter
	transformAndWriteToFile({
		frontmatterMarkdown: {
			frontmatter: [
				{ title: turndownService.turndown(page.title.rendered.replace(/ /g, '&nbsp;')) },
				{ permalink: `${page.slug}/index.html` }
			],
			body: newContent
			},
			path: './_src/pages',
			fileName: `${page.slug}.md`
		})
})
