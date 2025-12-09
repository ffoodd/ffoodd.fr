class CodeRunner extends HTMLElement {
	static get observedAttributes() {
		return ['type'];
	}

	constructor() {
		super();

		this.form = this.querySelector('form');
		this.form.addEventListener('submit', this);
		window.addEventListener('error', this);
		document.addEventListener('beforeunload', this);

		this.type = this.hasAttribute('type') ? this.getAttribute('type') : 'json';
	}

	connectedCallback() {
		this.level =
			this.closest('section')?.id?.split('-')[1] ||
			document.querySelector('h1')?.innerText?.split(' ')[1]?.split('\n')[0];

		['options', 'condition', 'fonction']
			.map(field => {
				const value = localStorage.getItem(`${this.level}-${field}`);
				if (value) {
					this.form[field].value = value;
				}
			});
	}

	disconnectedCallback() {
		this.form.removeEventListener('submit', this);
		window.removeEventListener('error', this);
		document.removeEventListener('beforeunload', this);
	}

	handleEvent(event) {
		switch (event.type) {
			case 'submit':
				event.preventDefault();
				const defaultOptions = '"attributes": true, "childList": true';
				let questions = this.form?.options ? this.form.options.value : defaultOptions;
				let condition = this.form?.condition ? this.form.condition.value : '';
				let fonction = this.form?.fonction ? this.form.fonction.value : '';

				if (this.type === 'json') {
					questions = this._normalizeJson(questions);
				}

				if (questions !== defaultOptions) localStorage.setItem(`${this.level}-options`, questions);
				if (condition !== '') localStorage.setItem(`${this.level}-condition`, condition);
				if (fonction !== '') localStorage.setItem(`${this.level}-fonction`, fonction);

				let voightkampff = new CustomEvent('voightkampff', {
					bubbles: true,
					detail: {
						data: {
							questions: questions,
							condition: condition,
							fonction: fonction
						},
						type: this.type
					}
				});
				this.dispatchEvent(voightkampff);
				break;
			case 'error':
				console.error('Une erreur s’est glissée dans votre réponse.')
				break;
			default:
				break;
		}
	}

	_normalizeJson(questions) {
		try {
			let reworded = questions.replaceAll(/([a-zA-Z0-9_]+?):(?![a-zA-Z0-9_]+?)/g, '"$1":');
			return reworded.replaceAll("'", '"');
		} catch (erreur) {
			console.error(`Ces questions ne peuvent pas faire partie d’un test de Voight-Kampff. ${erreur}.`);
		}
	}
}

customElements.define('code-runner', CodeRunner);
