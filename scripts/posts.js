const transformAndWriteToFile = require('json-to-frontmatter-markdown').default;
const TurndownService = require('turndown');
const path = require('node:path');

const posts = require(path.join(__dirname, '../_export/posts.json'));
const turndownService = new TurndownService({
	codeBlockStyle: 'fenced',
	preformattedCode: true,
	headingStyle: 'atx'
});

// @todo Corriger le frontmatter
// @todo Commentaires
// @todo À convertir : notes de bas-de-page (plugin 11ty ?), formats (layouts ?), métadonnées livres
// @todo Layout : Fil d’Ariane / archives (/journal)
Object.keys(posts).forEach((p, i) => {
	let post = posts[i];

	// Convert to Markdown
	let content = post.content.rendered
		.replace(/http:\/\/www.ffoodd.fr\/wp-content\/uploads/g, '/images')
		.replace(/http:\/\/www.ffoodd.fr/g, 'https://www.ffoodd.fr');

	let newContent =  turndownService.turndown(content)
		.replace(/ /g, '&nbsp;')
		.replace(/   /g, ' ');

	// Write to markdown file with frontmatter
	transformAndWriteToFile({
		frontmatterMarkdown: {
			frontmatter: [
				{ title: turndownService.turndown(post.title.rendered) },
				{ date: post.date },
				{ modified: post.modified },
				{ permalink: `${post.slug}/index.html` },
				{ description: post.metadata._ffeeeedd__metabox__description },
				{ excerpt: turndownService.turndown(post.excerpt.rendered) },
				{ format: post.format },
				{ alternate: post.metadata._ffeeeedd__metabox__canonical }
			],
			body: newContent
			},
			path: './_src/posts',
			fileName: `${post.slug}.md`
		})
})
