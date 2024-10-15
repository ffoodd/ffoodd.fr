class Mutant extends HTMLElement {
	static get observedAttributes() {
		return ['type', 'genre', 'teint'];
	}

	constructor() {
		super();
		this.type = this.hasAttribute('type') ? this.getAttribute('type') : '';
		this.genre = this.hasAttribute('genre') ? this.getAttribute('genre') : '';
		this.teint = this.hasAttribute('teint') ? this.getAttribute('teint') : '';
	}

	connectedCallback() {
		this.genre = localStorage.getItem('genre') || '';
		this.teint = localStorage.getItem('teint') || '';
		this._mutate(this.type);
	}

	disconnectedCallback() {
		console.info('PAN!');
		clearInterval(this.interval);
	}

	generateRandomString() {
		return Math.floor(Math.random() * Date.now()).toString(36);
	}

	generateRandomDelay(min = 300, max = 3000) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getRandomArrayItem(array) {
		return array[Math.floor((Math.random() * array.length))];
	}

	_mutate(type) {
		switch (type) {
			case 'zombie':
				// @note attributes: true
				this.innerText = `🧟‍${this.genre}`;
				this.interval = setInterval(() => this._mutateAttribute(), this.generateRandomDelay());
				break;
			case 'invaders':
				// @note childList: true
				this.interval = setInterval(() => this.innerText += '👾', this.generateRandomDelay());
				break;
			case 'villain':
				// @note characterData: true
				this.innerText = `🦹${this.teint}‍${this.genre}`;
				this.interval = setInterval(() => this._mutateText(), this.generateRandomDelay());
				break;
			case 'ghost':
				// @note attributeFilter: ['id']
				// @fixme Ça fonctionne aussi avec attributes: true :/
				this.innerText = '👻';
				this.interval = setInterval(() => this._mutateAttributes(), this.generateRandomDelay());
				break;
			case 'mage':
				// @note childList: true, subtree: true
				this.mage = `🧙${this.teint}‍${this.genre}`;
				this.innerHTML = `<span>${this.mage}</span>`;
				this.depth = 1;
				this.interval = setInterval(() => this._mutateSubTree(), this.generateRandomDelay());
				break;
			case 'vampire':
				// @note mutation.oldValue.includes('mutant')
				// @note attributeOldValue: true
				// Et éventuellement :
				// @note mutation.attributeName === 'class'
				this.innerText = `🧛${this.teint}‍${this.genre}`;
				this.interval = setInterval(() => this._mutateAttributeValue(), this.generateRandomDelay());
				break;
			case 'skull':
				// @note characterDataOldValue: true
				// @note mutation.oldValue === '💀'
				this.innerText =  `👶${this.teint}`;
				this.current = 0;
				this.interval = setInterval(() => this._mutateOldText(), this.generateRandomDelay());
				break;
			default:
				this.human = (this.genre === '♀️') ? '👩' : (this.genre === '♂️') ? '👨' : '🧑';
				this.innerText = `${this.human}${this.teint}`;
				console.warn(`${type} n’est pas un type de mutation connu…`);
				break;
		}
	}

	_mutateAttribute() {
		for (let data in this.dataset) {
			delete this.dataset[data];
		}
		this.dataset[this.generateRandomString()] = true;
	}

	_mutateAttributes() {
		const attributes = ['class', 'id', 'title', 'data-yoyo', 'data-boo'];
		this.setAttribute(this.getRandomArrayItem(attributes), this.generateRandomString());
	}

	_mutateAttributeValue() {
		const attributes = ['standard', 'normal', 'ordinaire', 'quelconque', 'mutant'];
		this.classList.toggle(this.getRandomArrayItem(attributes));
	}

	_mutateText() {
		const content = ['🏻', '🏽', '🏽', '🏾', '🏿'].map(
			tone => `🦹${tone}‍${this.genre}`
		);
		this.childNodes[0].nodeValue = this.getRandomArrayItem(content);
	}

	_mutateOldText() {
		const baby = `👶${this.teint}`;
		const child = (this.genre === '♀️') ? `👧${this.teint}` : (this.genre === '♂️') ? `👦${this.teint}` : `🧒${this.teint}`;
		const person = (this.genre === '♀️') ? `👩${this.teint}` : (this.genre === '♂️') ? `👨${this.teint}` : `🧑${this.teint}`;
		const beard = `🧔${this.teint}‍${this.genre}`;
		const elder = (this.genre === '♀️') ? `👵${this.teint}` : (this.genre === '♂️') ? `👴${this.teint}` : `🧓${this.teint}`;

		const content = [baby, child, person, beard, elder, '💀', '☠️'];
		++this.current;
		this.childNodes[0].nodeValue = content[this.current];
		if (this.current === (content.length -1)) {
			this.current = -1;
		}
	}

	_mutateSubTree() {
		const target = this.querySelector('span '.repeat(this.depth));
		if (target && this.depth < 10) {
			this.querySelector('span '.repeat(this.depth)).innerHTML = `${this.mage}<span>${this.mage}</span>`;
			this.depth++;
		} else {
			this.querySelector('span '.repeat(6)).parentElement.remove();
			this.depth = 4;
		}
	}
}

customElements.define('mu-tant', Mutant);
