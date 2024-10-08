class SocialLinks extends HTMLElement {
	constructor() {
			super();
	}

	connectedCallback() {
			const contactPoints = [
					{
							"name": "Mastodon",
							"url": "https://mamot.fr/@ffoodd"
					},
					{
							"name": "GitHub",
							"url": "https://github.com/ffoodd"
					},
					{
							"name": "CodePen",
							"url": "https://codepen.io/ffoodd"
					},
					{
							"name": "Dribbble",
							"url": "https://dribbble.com/ffoodd"
					},
					{
							"name": "LinkedIn",
							"url": "https://www.linkedin.com/pub/ga%C3%ABl-poupard/30/17b/401"
					},
					{
							"name": "RSS",
							"url": "/feed/index.xml"
					}
			];

			const ulElem = `
					<ul class="social-links">
							${contactPoints.map(contactPoint => `
									<li class="social-link" itemscope itemprop="contactPoint">
											<a class="link--unstyled"
													href="${contactPoint.url}"
													itemprop="url"
													${contactPoint.name === 'Mastodon' ? 'rel="me"' : ''}
													title="${contactPoint.name === 'RSS' ? 'La vie en #ffoodd | Flux RSS' : 'Gaël Poupard sur ' + contactPoint.name}">
													<span class="social-links__sprite social-links__sprite--${contactPoint.name.toLowerCase()}"></span>
													<span itemprop="name">${contactPoint.name}</span>
											</a>
									</li>
							`).join('')}
					</ul>
			`;

			this.innerHTML = ulElem;
	}
}

customElements.define('social-links', SocialLinks);
