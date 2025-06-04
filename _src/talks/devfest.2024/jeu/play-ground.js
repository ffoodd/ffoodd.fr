class PlayGround extends HTMLElement {
	static get observedAttributes() {
		return ['type', 'await', 'max'];
	}

	constructor() {
		super();
		document.addEventListener('voightkampff', this);
		this.type = this.hasAttribute('type') ? this.getAttribute('type') : '';
		this.max = this.hasAttribute('max') ? this.getAttribute('max') : 100;
		this.async = this.hasAttribute('await');
		this.portal = document.getElementById('portal');
		this.over = document.getElementById('game-over');
		this.replay = document.getElementById('replay');
	}

	connectedCallback() {
		this.spyer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				if (this.over && mutation.addedNodes.length && this.querySelectorAll('mu-tant').length >= this.max) {
					this._gameOver();
				}

				if (this.portal && mutation.removedNodes.length && this._isMutant(mutation.removedNodes[0])) {
					if (!this.querySelector('mu-tant')) {
						this._nextLevel();
					} else if ((this.type === 'all' && !this.querySelector('mu-tant:not([type=""])'))) {
						this._nextLevel();
					}
				}
			}
		});

		if (this.async) {
			this.scout = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting === true) {
					this._invade();
					this.spyer.observe(this, { "childList": true });
				} else {
					this.querySelectorAll('mu-tant').forEach(
						mutant => mutant.remove()
					);
					clearTimeout(this.invader);
					clearTimeout(this.timeout);
					this.spyer.disconnect();
				}
			}, {
				root: document.querySelector('main'),
				threshold: [1]
			});
			this.scout.observe(this);
		} else {
			this._invade();
			this.spyer.observe(this, { "childList": true });
		}
	}

	disconnectedCallback() {
		this.scout.disconnect();
		this.spyer.disconnect();
		clearTimeout(this.invader);
		clearTimeout(this.timeout);
		document.removeEventListener('voightkampff', this);
		this.portal.removeEventListener('close', this);
		this.over.removeEventListener('close', this);
		this.replay.removeEventListener('close', this);
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
				if (this.replay) {
					this.timeout = setTimeout(() => {
						if (this.querySelectorAll('mu-tant:not([type=""])').length > 0) {
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

		const observer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				for (const leon of mutation.addedNodes) {
					if (this._isMutant(leon)) {
						this._killMutant(leon, options, condition, fonction, watchTextNode, watchSubtree);
					}
				}
			}
		});
		observer.observe(this, { "childList": true });
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
		this.portal.showModal();
		if (this.async) {
			const level = this.closest('section')?.id?.split('-')[1];
			this.portal.addEventListener('close', () => {
				const target = document.getElementById(`slide-${(Number(level) + 1).toString()}`);
				target?.scrollIntoView({ inline: 'start' });
				target?.focus();
			});
		} else {
			this.portal.addEventListener('close', this);
		}
	}

	_gameOver() {
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
