class CodeRunner extends HTMLElement {
	static get observedAttributes() {
		return ['type'];
	}

	constructor() {
		super();

		this.form = this.querySelector('form');
		this.form.addEventListener('submit', this);

		this.type = this.hasAttribute('type') ? this.getAttribute('type') : 'json';
	}

	handleEvent(event) {
		if (event.type === 'submit') {
			event.preventDefault();
			let questions = this.form.elements[0].value;
			if (this.type === 'json') {
				questions = this._normalizeJson(questions);
			}

			let voightkampff = new CustomEvent('voightkampff', {
				bubbles: true,
				detail: {
					data: questions,
					type: this.type
				}
			});
			this.dispatchEvent(voightkampff);
		}
	}

	_normalizeJson(questions) {
		try {
			return questions.replaceAll(/([a-zA-Z0-9_]+?):(?![a-zA-Z0-9_]+?)/g, '"$1":');
		} catch (erreur) {
			console.error(`Ces questions ne peuvent pas faire partie d’un test de Voight-Kampff. ${erreur}.`);
		}
	}
}

customElements.define('code-runner', CodeRunner);
