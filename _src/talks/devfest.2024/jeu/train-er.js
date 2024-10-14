class TrainEr extends HTMLElement {
	constructor() {
		super();

		this.form = this.querySelector('form');
		this.form.addEventListener('submit', this);
		this.form.addEventListener('invalid', this);
		this.playground = document.querySelector('play-ground');
	}

	handleEvent(event) {
		switch (event.type) {
			case 'submit':
				event.preventDefault();
				if (this.form.checkValidity()) {
					this.playground.querySelectorAll('mu-tant').forEach(
						mutant => mutant.remove()
					);
					clearTimeout(this.playground.invader);
				}
				break;
			case 'invalid':
				console.error('Une erreur s’est glissée dans votre réponse. Saurez-vous la trouver ?')
				break;
			default:
				break;
		}
	}
}

customElements.define('train-er', TrainEr);
