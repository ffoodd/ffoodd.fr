class AutoPortrait extends HTMLElement {
	constructor() {
		super();
		this.portrait = document.querySelector('.portrait');
		this.portal = document.getElementById('portal');
		this.form = this.querySelector('form');
		this.form.addEventListener('change', this);
		this.form.addEventListener('submit', this);
		window.addEventListener('error', this);
	}

	connectedCallback() {
		this.genre = localStorage.getItem('genre') || '';
		this.teint = localStorage.getItem('teint') || '';
		this.portrait.textContent = `🦸${this.teint}‍${this.genre}`;
	}

	handleEvent(event) {
		switch (event.type) {
			case 'change':
				this.genre = this.form.genre.value;
				this.teint = this.form.teint.value;
				this.portrait.textContent = `🦸${this.teint}‍${this.genre}`;
				break;
			case 'submit':
				event.preventDefault();
				localStorage.setItem('genre', this.genre);
				localStorage.setItem('teint', this.teint);
				this.portal.showModal();
				break;
			default:
				break;
		}
	}
}

customElements.define('auto-portrait', AutoPortrait);
