const transformAndWriteToFile = require('json-to-frontmatter-markdown').default;
const path = require('path');

const posts = require(path.join(__dirname, '../_export/posts.json'));

// Description (?)
// Extrait en HTML flingue le frontmatter
// Commentaires
Object.keys(posts).forEach((p, i) => {
		let post = posts[i];
	transformAndWriteToFile({
		frontmatterMarkdown: {
			frontmatter: [
				{ title: post.title.rendered },
				{ date: post.date },
				{ modified: post.modified },
				{ permalink: `${post.slug}/index.html` },
				{ excerpt: post.excerpt.rendered },
				{ format: post.format }
			],
			body: post.content.rendered.replace(/http:\/\/www.ffoodd.fr\/wp-content\/uploads/g, '/images').replace(/http:\/\/www.ffoodd.fr/g, 'https://www.ffoodd.fr')
			},
			path: './_src/posts',
			fileName: `${post.slug}.md`
		})
})

// à convertir : notes de bas-de-page (plugin 11ty ?), formats (layouts ?)
// Fil d’Ariane / archives (/journal)
