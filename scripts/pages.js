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

	let permalink = `${page.slug}/index.html`;
	let title = turndownService.turndown(page.title.rendered).replace(/\u00A0/g, '&nbsp;');
	let layout = 'template/page.njk';
	let path = './_src/pages';
	let slug = `${page.slug}.md`;
	if (page.slug === 'accueil') {
		permalink = 'index.html';
		title = 'La vie en #ffoodd'
		layout = 'template/home.njk';
		path = './_src';
		slug = 'index.md';
	}

	// Write to markdown file with frontmatter
	transformAndWriteToFile({
		frontmatterMarkdown: {
			frontmatter: [
				{ layout: layout },
				{ title: title },
				{ permalink: permalink },
				{ tags: 'pages' }
			],
			body: newContent
		},
		path: path,
		fileName: slug
	})
})
