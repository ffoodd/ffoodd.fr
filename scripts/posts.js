const transformAndWriteToFile = require('json-to-frontmatter-markdown').default;
const TurndownService = require('turndown');
const path = require('node:path');

const posts = require(path.join(__dirname, '../_export/posts.json'));

const caption = {
	filter: ['figcaption'],
	replacement: (content) => {
		return `"${content}"`
	}
}

const turndownService = new TurndownService({
	codeBlockStyle: 'fenced',
	preformattedCode: true,
	headingStyle: 'atx'
});

turndownService.addRule('figcaption', {
	filter: ['figcaption'],
	replacement: (content) => {
		// @note ↔nis used to ease replacement later on
		return `↔"${content}")`
	}
});

// @todo Commentaires
Object.keys(posts).forEach((p, i) => {
	let post = posts[i];

	// Cleanup URLs
	let content = post.content.rendered
		.replace(/http:\/\/www.ffoodd.fr\/wp-content\/uploads/g, '/images')
		.replace(/http:\/\/www.ffoodd.fr/g, 'https://www.ffoodd.fr');

	// Convert to Markdown
	let newContent =  turndownService.turndown(content)
		// <figcaption>
		.replace(')↔"', ' "')
		// Handling footnotes
		.replace(/\[\\\[(\d)\\\]\]\(.*?"(.*?)"\).+/gm, ".[^$1]\n\n[^$1]: $2\n\n")
		.replace(/\[\\\[(\d)\\\]\]\(.*?"(.*?)"\)+/gm, ".[^$1]\n\n[^$1]: $2\n\n")
		// Handle non-breakable/thin spaces
		.replace(/\u00A0/g, '&nbsp;')
		.replace(/\u2009/g, '&thinsp;')
		// Cleanup apostrophes and double-spaces
		.replace(/\'/g, '’')
		.replace(/   /g, ' ');

	let frontMatter = [
		{ title: turndownService.turndown(post.title.rendered).replace(/\u00A0/g, '&nbsp;') },
		{ date: post.date },
		{ modified: post.modified },
		{ permalink: `${post.slug}/index.html` },
		{ excerpt: turndownService.turndown(post.excerpt.rendered).replace(/\u00A0/g, '&nbsp;') },
		{ format: post.format }
	];

	const description = typeof post.metadata._ffeeeedd__metabox__description === Object ?
		Object.values(post.metadata._ffeeeedd__metabox__description)[0] : '';
	if (description !== '') {
		frontMatter.push({
			description: turndownService.turndown(description).replace(/\u00A0/g, '&nbsp;')
		})
	}

	const canonical = typeof post.metadata._ffeeeedd__metabox__canonical === Object ?
		Object.values(post.metadata._ffeeeedd__metabox__canonical)[0] : '';
	if (canonical !== '') {
		frontMatter.push({
			alternate: canonical
		})
	}

	if (post.format === 'status') {
		frontMatter.push({
			editeur: post.acf.editeur,
			auteur: post.acf.auteur,
			date_de_parution: post.acf.date_de_parution,
			ean13: post.acf.ean13,
			nombre_de_pages: post.acf.nombre_de_pages,
			collection: post.acf.collection,
			lien: post.acf.lien,
			note: post.acf.note
		})
	}

	// Write to markdown file with frontmatter
	transformAndWriteToFile({
		frontmatterMarkdown: {
			frontmatter: frontMatter,
			body: newContent
		},
		path: './_src/posts',
		fileName: `${post.slug}.md`
	})
})
