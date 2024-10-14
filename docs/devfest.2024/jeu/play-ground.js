class PlayGround extends HTMLElement {
	static get observedAttributes() {
		return ['type'];
	}

	constructor() {
		super();
		document.addEventListener('voightkampff', this);
		this.type = this.hasAttribute('type') ? this.getAttribute('type') : '';
		this.portal = document.getElementById('portal');
		this.over = document.getElementById('game-over');
	}

	connectedCallback() {
		this._invade();

		this.spyer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				if (mutation.removedNodes.length && this._isMutant(mutation.removedNodes[0])) {
					if (this.type === 'all' &&
						(document.querySelectorAll('mu-tant') === document.querySelectorAll('mu-tant[type=""]'))
					) {
						if (this.observer) this.observer.disconnect();
						this.portal.showModal();
						this.portal.addEventListener('close', this);
					} else if (!document.querySelector('mu-tant')) {
						if (this.observer) this.observer.disconnect();
						this.portal.showModal();
						this.portal.addEventListener('close', this);
					}
				}

				// GAME OVER!
				if (mutation.addedNodes.length && document.querySelectorAll('mu-tant').length >= 100) {
					if (this.observer) this.observer.disconnect();
					clearTimeout(this.invader);
					this.querySelectorAll('mu-tant')
						.forEach(mutant => mutant.remove());
					this.over.showModal();
					this.over.addEventListener('close', this);
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
					event.detail.data.fonction,
					event.detail.type
				);
				break;
			case 'close':
				document.querySelectorAll('input, textarea')
					.forEach(element => element.value = '');
				this._invade();
				break;
			default:
				console.info(`L’événement ${event.type} n’est pas supporté par le play-ground.`)
				break;
		}
	}

	generateRandomNumber(min = 300, max = 3000) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	generateRandomType() {
		const types = ['', 'zombie', 'invaders', 'villain', 'ghost', 'mage', 'vampire', 'skull'];
		return types[Math.floor((Math.random() * types.length))];
	}

	_isMutant(element) {
		return element.nodeName.toLowerCase() === 'mu-tant';
	}

	_isCharacterData(options) {
		return options.includes('characterData') || options.includes('characterDataOldValue');
	}

	_isSubtree(options) {
		return options.includes('subtree');
	}

	_invade() {
		this.invader = setTimeout(() => {
			// @note Ajouter un type après chargement, en mode contagion ?
			const mutant = document.createElement('mu-tant');
			const type = (this.type === 'all') ? this.generateRandomType() : this.type;
			mutant.type = type;
			mutant.setAttribute('type', type);
			mutant.style.setProperty('--placement', this.generateRandomNumber(0, 100))
			this.append(mutant);
			this._invade();
			// @note Ajouter du son : un BIP par apparition, etc.
		}, this.generateRandomNumber());
	}

	_stopInvasion(options = '"attributes": true, "childList": true', condition = '', fonction = '', type = 'json') {
		let watchTextNode = this._isCharacterData(options);
		let watchSubtree = this._isSubtree(options);

		if (this.type === 'all') {
			options = '"attributes": true, "childList": true, "characterData": true, "subtree": true';
			watchTextNode = false;
			watchSubtree = false;
		}

		this.querySelectorAll('mu-tant').forEach(
			leon => {
				this._killMutant(leon, options, condition, fonction, watchTextNode, watchSubtree);
			}
		);

		this.observer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				for (const leon of mutation.addedNodes) {
					if (this._isMutant(leon)) {
						this._killMutant(leon, options, condition, fonction, watchTextNode, watchSubtree);
					}
				}
			}
		});
		this.observer.observe(this, { "childList": true });
	}

	_killMutant(mutant, options, condition, fonction, watchTextNode, watchSubtree) {
		const hunter = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				// @note Comparaison : solution attendue pour le niveau ?
				const target = watchTextNode ?
					mutation.target.parentNode :
					watchSubtree ?
						mutation.target.closest('mu-tant')
						: mutation.target;
				if (fonction !== '') {
					// @note Solutions :
					/* Solution 1 :
					if (mutation.target.nodeName === 'MU-TANT') {
						mutation.target.remove();
					} else if (mutation.target.parentNode.nodeName === 'MU-TANT') {
						mutation.target.parentNode.remove();
					} else if (mutation.target.closest('mu-tant') !== undefined) {
						mutation.target.closest('mu-tant').remove();
					}
					*/
					/* Solution 2 :
					document.querySelectorAll('mu-tant:not([type=""])').forEach(mutant => mutant.remove());
					 */
					eval(fonction);
					clearTimeout(this.invader);
					hunter.disconnect();
					// Échec !
					setTimeout(() => {
						if (this.querySelectorAll('mu-tant').length) {
							const replay = document.getElementById('replay');
							replay.showModal();
							replay.addEventListener('close', () => location.reload());
						}
					});
				} else if (condition !== '') {
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
		hunter.observe(watchTextNode ? mutant.childNodes[0] : mutant, JSON.parse(`{${options}}`));
	}
}

customElements.define('play-ground', PlayGround);
