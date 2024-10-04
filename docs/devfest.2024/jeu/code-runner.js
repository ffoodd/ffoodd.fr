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
			let questions = this.form?.options.value;
			let condition = this.form.condition ? this.form.condition.value : '';

			if (this.type === 'json') {
				questions = this._normalizeJson(questions);
			}

			let voightkampff = new CustomEvent('voightkampff', {
				bubbles: true,
				detail: {
					data: {
						questions: questions,
						condition: condition
					},
					type: this.type
				}
			});
			this.dispatchEvent(voightkampff);
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
