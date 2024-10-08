class PlayGround extends HTMLElement {
	static get observedAttributes() {
		return ['type'];
	}

	constructor() {
		super();
		document.addEventListener('voightkampff', this);
		this.type = this.hasAttribute('type') ? this.getAttribute('type') : 'zombie';
		this.portal = document.getElementById('portal');
		this.setAttribute('data-type', this.type);
	}

	connectedCallback() {
		this._invade();

		this.spyer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				if (mutation.removedNodes.length) {
					if (this._isMutant(mutation.removedNodes[0]) && !document.querySelector('mu-tant')) {
						this.observer.disconnect();
						this.portal.showModal();
						this.portal.addEventListener('close', this);
					}
				}
			}
		});
		this.spyer.observe(this, { "childList": true });
	}

	handleEvent(event) {
		switch (event.type) {
			case 'voightkampff':
				this._stopInvasion(
					event.detail.data.questions,
					event.detail.data.condition,
					event.detail.type
				);
				break;
			case 'close':
				document.querySelectorAll('input, textarea')
					.forEach(element => element.value = '');
				this._invade();
				break;
			default:
				console.info(`Event ${event.type} not handled by play-ground.`)
				break;
		}
	}

	generateRandomNumber(min = 300, max = 3000) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	_isMutant(element) {
		return element.nodeName.toLowerCase() === 'mu-tant';
	}

	_isCharacterData(options) {
		return options.includes('characterData') || options.includes('characterDataOldValue');
	}

	_invade() {
		this.invader = setTimeout(() => {
			// @todo Ajouter des mutants sans type (humain) à ne pas dézinguer ?
			// @note Et vérifier qu’ils n’ont pas été tués… ?
			// @note Voire même pour certains niveaux : ajouter un type après chargement, en mode contagion ?
			// @todo Un niveau contenant tous les types de mutants, pour en cibler un en particulier ?
			// @note Pour les niveaux supérieurs ?
			let mutant = document.createElement('mu-tant');
			mutant.type = this.type;
			mutant.setAttribute('type', this.type);
			mutant.style.setProperty('--placement', this.generateRandomNumber(0, 100))
			this.append(mutant);
			this._invade();
			// @note Ajouter du son : un BIP par apparition, etc.
		}, this.generateRandomNumber());
	}

	_stopInvasion(options = '"characterData": true, "childList": true', condition = '', type = 'json') {
		const wachTextNode = this._isCharacterData(options);

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
				// @note Comparaison : solution attendue pour le niveau ?
				const target = wachTextNode ? mutation.target.parentNode : mutation.target;
				// @todo Avec callback complet, pour niveau expert / boss final ?
				if (condition !== '') {
					eval(`if (${condition}) {
						target.remove();
						clearTimeout(this.invader);
						hunter.disconnect();
					}`);
				} else {
					target.remove();
					clearTimeout(this.invader);
					hunter.disconnect();
				}
			}
		});
		hunter.observe(wachTextNode ? mutant.childNodes[0] : mutant, JSON.parse(`{${options}}`));
	}
}

customElements.define('play-ground', PlayGround);
