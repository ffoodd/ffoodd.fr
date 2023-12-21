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

	// Cleanup URLs
	let content = page.content.rendered
		.replace(/http:\/\/www.ffoodd.fr\/wp-content\/uploads/g, '/images')
		.replace(/http:\/\/www.ffoodd.fr/g, 'https://www.ffoodd.fr');

	// Convert to Markdown
	let newContent =  turndownService.turndown(content)
		// Handling footnotes
		.replace(/\[\\\[(\d)\\\]\]\(.*?"(.*?)"\).+/gm, ".[^$1]\n\n[^$1]: $2\n\n")
		.replace(/\[\\\[(\d)\\\]\]\(.*?"(.*?)"\)+/gm, ".[^$1]\n\n[^$1]: $2\n\n")
		// Handle non-breakable/thin spaces
		.replace(/\u00A0/g, '&nbsp;')
		.replace(/\u2009/g, '&thinsp;')
		// Cleanup apostrophes and double-spaces
		.replace(/\'/g, '’')
		.replace(/   /g, ' ');

	// Write to markdown file with frontmatter
	transformAndWriteToFile({
		frontmatterMarkdown: {
			frontmatter: [
				{ layout: 'base.njk' },
				{ title: turndownService.turndown(page.title.rendered).replace(/\u00A0/g, '&nbsp;') },
				{ permalink: `${page.slug}/index.html` }
			],
			body: newContent
		},
		path: './_src/pages',
		fileName: `${page.slug}.md`
	})
})
