class CodeRunner extends HTMLElement {
	static get observedAttributes() {
		return ['type'];
	}

	constructor() {
		super();

		this.form = this.querySelector('form');
		this.form.addEventListener('submit', this);
		window.addEventListener('error', this);

		this.type = this.hasAttribute('type') ? this.getAttribute('type') : 'json';
	}

	handleEvent(event) {
		switch (event.type) {
			case 'submit':
				event.preventDefault();
				let questions = this.form.options ? this.form.options.value : '"attributes": true, "childList": true';
				let condition = this.form.condition ? this.form.condition.value : '';
				let fonction = this.form.fonction ? this.form.fonction.value : '';

				if (this.type === 'json') {
					questions = this._normalizeJson(questions);
				}

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
