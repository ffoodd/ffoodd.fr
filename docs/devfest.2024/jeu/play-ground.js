class PlayGround extends HTMLElement {
	static get observedAttributes() {
		return ['type'];
	}

	constructor() {
		super();
		document.addEventListener('voightkampff', this);
		this.type = this.hasAttribute('type') ? this.getAttribute('type') : 'zombie';
	}

	connectedCallback() {
		this._invade();

		this.spyer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				if (mutation.removedNodes.length) {
					if (this._isMutant(mutation.removedNodes[0])) {
						// @todo Lien vers le niveau suivant ? Événement ?
						console.log('Success!');
						this.spyer.disconnect();
						clearTimeout(this.invader);
					}
				}
			}
		});
		this.spyer.observe(this, { "childList": true });
	}

	handleEvent(event) {
		if (event.type === 'voightkampff') {
			this._stopInvasion(
				event.detail.data,
				event.detail.type
			);
		}
	}

	_isMutant(element) {
		return element.nodeName.toLowerCase() === 'mu-tant';
	}

	_invade() {
		this.invader = setTimeout(() => {
			let mutant = document.createElement('mu-tant');
			mutant.type = this.type;
			this.append(mutant);
			this._invade();
			// @note Ajouter du son : un BIP par apparition, etc.
		}, 1000);
		// @todo Random timer ↑
	}

	_stopInvasion(options = '"characterData": true, "childList": true', type = 'json') {
		// @todo Si type = callback, on fait quoi ?
		this.querySelectorAll('mu-tant').forEach(
			leon => this._killMutant(leon, options)
		);

		this.observer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				for (const leon of mutation.addedNodes) {
					if (this._isMutant(leon)) {
						this._killMutant(leon, options);
					}
				}
			}
		});
		this.observer.observe(this, { "childList": true });
	}

	_killMutant(mutant, options) {
		const hunter = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				// @fixme Pas assez méchant : il faut spécifier le test en fonction des conditions !
				mutation.target.remove();
				hunter.disconnect();
			}
		});
		hunter.observe(mutant, JSON.parse(`{${options}}`));
	}
}

customElements.define('play-ground', PlayGround);
