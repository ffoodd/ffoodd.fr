const transformAndWriteToFile = require('json-to-frontmatter-markdown').default;
const TurndownService = require('turndown');
const path = require('node:path');

const comments = require(path.join(__dirname, '../_export/comments.json'));
const turndownService = new TurndownService({
	codeBlockStyle: 'fenced',
	preformattedCode: true,
	headingStyle: 'atx'
});

Object.keys(comments).forEach((p, i) => {
	let comment = comments[i];
	let commentSlug = comment.link
		.replace('https:\/\/www.ffoodd.fr\/', '')
		.split('#');
	let slug = commentSlug[0].replace('/', '');
	let hash = commentSlug[1].replace('comment-', '');
	let content = turndownService.turndown(comment.content.rendered)
		// Handle non-breakable/thin spaces
		.replace(/\u00A0/g, '&nbsp;')
		.replace(/\u2009/g, '&thinsp;')
		// Cleanup apostrophes and double-spaces
		.replace(/\'/g, '’')
		.replace(/   /g, ' ');

	// @note Associer via le slug de l’article
	// @note Puis dans le template, trier par date

	// Convert to Markdown
	transformAndWriteToFile({
		frontmatterMarkdown: {
			frontmatter: [
				{ date: comment.date },
				{ author_name: comment.author_name },
				{ author_url: comment.author_url },
				{ author_avatar: comment.author_avatar_urls['48'] }
			],
			body: content
		},
		path: './_src/comments',
		fileName: `${slug}_${hash}.md`
	})
})
