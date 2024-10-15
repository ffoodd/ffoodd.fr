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
		this.replay = document.getElementById('replay');
	}

	connectedCallback() {
		this._invade();

		this.spyer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				if (mutation.addedNodes.length && document.querySelectorAll('mu-tant').length >= 100) {
					this._gameOver();
				}

				if (mutation.removedNodes.length && this._isMutant(mutation.removedNodes[0])) {
					if (!document.querySelector('mu-tant')) {
						this._nextLevel();
					} else if ((this.type === 'all' && !document.querySelector('mu-tant:not([type=""])'))) {
						this._nextLevel();
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
					event.detail.data.fonction,
					event.detail.type
				);
				if (event.detail.data.fonction === '') {
					this.timeout = setTimeout(() => this._replay(), 2000);
				} else {
					this.timeout = setTimeout(() => {
						if (this.querySelectorAll('mu-tant:not([type=""])').length) {
							this._replay();
						}
					}, 2000);
				}
				break;
			case 'close':
				location.reload();
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
			const mutant = document.createElement('mu-tant');
			const type = (this.type === 'all') ? this.generateRandomType() : this.type;
			mutant.type = type;
			mutant.setAttribute('type', type);
			mutant.style.setProperty('--placement', this.generateRandomNumber(0, 100))
			this.append(mutant);
			this._invade();
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
	}

	_killMutant(mutant, options, condition, fonction, watchTextNode, watchSubtree) {
		// @fixme Comparaison : solution attendue pour le niveau ?
		const hunter = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				const target = watchTextNode ?
					mutation.target.parentNode :
					watchSubtree ?
						mutation.target.closest('mu-tant')
						: mutation.target;
				if (fonction !== '') {
					eval(fonction);
					clearTimeout(this.invader);
					hunter.disconnect();
				} else if (condition !== '') {
					eval(`if (${condition}) {
						target.remove();
						clearTimeout(this.invader);
						clearTimeout(this.timeout);
						hunter.disconnect();
					}`);
				} else {
					target.remove();
					clearTimeout(this.invader);
					clearTimeout(this.timeout);
					hunter.disconnect();
				}
			}
		});
		try {
			const optionsAsJson = JSON.parse(`{${options}}`);
			hunter.observe(watchTextNode ? mutant.childNodes[0] : mutant, optionsAsJson);
		} catch (error) {
			console.error(error);
			this._replay();
		}
	}

	_nextLevel() {
		if (this.observer) this.observer.disconnect();
		this.portal.showModal();
		this.portal.addEventListener('close', this);
	}

	_gameOver() {
		if (this.observer) this.observer.disconnect();
		clearTimeout(this.invader);
		this.over.showModal();
		this.over.addEventListener('close', this);
	}

	_replay() {
		this.replay.showModal();
		this.replay.addEventListener('close', this);
	}
}

customElements.define('play-ground', PlayGround);
