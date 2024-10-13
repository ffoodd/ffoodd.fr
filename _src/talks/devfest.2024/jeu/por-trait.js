class PorTrait extends HTMLElement {
	static get observedAttributes() {
		return ['type'];
	}

	constructor() {
		super();
		this.type = this.hasAttribute('type') ? this.getAttribute('type') : '';
		this.portrait = document.querySelector('.portrait');
	}

	connectedCallback() {
		this.genre = localStorage.getItem('genre') || '';
		this.teint = localStorage.getItem('teint') || '';

		switch (this.type) {
			case 'zombie':
				this.emoji = '🧟';
				this.portrait.textContent = `${this.emoji}‍${this.genre}`;
				break;
			case 'villain':
				this.emoji = '🦹';
				this.portrait.textContent = `${this.emoji}${this.teint}‍${this.genre}`;
				break;
			case 'mage':
				this.emoji = '🧙';
				this.portrait.textContent = `${this.emoji}${this.teint}‍${this.genre}`;
				break;
			case 'vampire':
				this.emoji = '🧛';
				this.portrait.textContent = `${this.emoji}${this.teint}‍${this.genre}`;
				break;
			default:
				this.emoji = (this.genre === '♀️') ? '👩' : (this.genre === '♂️') ? '👨' : '🧑';
				this.portrait.textContent = `${this.emoji}${this.teint}`;
				return;
		}
	}
}

customElements.define('por-trait', PorTrait);
