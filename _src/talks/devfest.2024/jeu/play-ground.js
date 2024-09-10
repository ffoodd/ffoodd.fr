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
					// @fixme Vérifier le **dernier** élément à être supprimé
					if (this._isMutant(mutation.removedNodes[0])) {
						// @todo Lien vers le niveau suivant ? Événement ?
						// @note Fiche « IRL » avec cas d’usage réél (?)
						// @note Pour que tout le monde franchisse les paliers en même temps…
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
				event.detail.data.questions,
				event.detail.data.condition,
				event.detail.type
			);
		}
	}

	_isMutant(element) {
		return element.nodeName.toLowerCase() === 'mu-tant';
	}

	_isCharacterData(options) {
		return options.includes('characterData') || options.includes('characterDataOldValue');
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

	_stopInvasion(options = '"characterData": true, "childList": true', condition = '', type = 'json') {
		const wachTextNode = this._isCharacterData(options);

		// @todo Si type = callback, on fait quoi ?
		this.querySelectorAll('mu-tant').forEach(
			leon => {
				this._killMutant(leon, options, condition, wachTextNode);
			}
		);

		this.observer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				for (const leon of mutation.addedNodes) {
					if (this._isMutant(leon)) {
						this._killMutant(leon, options, condition, wachTextNode);
					}
				}
			}
		});
		this.observer.observe(this, { "childList": true });
	}

	_killMutant(mutant, options, condition, wachTextNode) {
		const hunter = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				const target = wachTextNode ? mutation.target.parentNode : mutation.target;
				if (condition !== '') {
					eval(`if (${condition}) {
						target.remove();
						hunter.disconnect();
					}`);
				} else {
					target.remove();
					hunter.disconnect();
				}
			}
		});
		hunter.observe(wachTextNode ? mutant.childNodes[0] : mutant, JSON.parse(`{${options}}`));
	}
}

customElements.define('play-ground', PlayGround);
