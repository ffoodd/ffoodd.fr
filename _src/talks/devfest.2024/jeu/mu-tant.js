class Mutant extends HTMLElement {
	// @todo Ajouter un attribut genre + peau pour varier les personnages ?
	// @link https://emojipedia.org/zero-width-joiner?ref=blog.emojipedia.org
	static get observedAttributes() {
		return ['type'];
	}

	constructor() {
		super();
		this.type = this.hasAttribute('type') ? this.getAttribute('type') : 'zombie';
	}

	connectedCallback() {
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

	// @note Au lieu de se contenter du `innerText`, on peut imaginer embarquer des styles !
	_mutate(type) {
		switch (type) {
			case 'zombie':
				// @note attributes: true
				this.innerText = '🧟';
				this.interval = setInterval(() => this._mutateAttribute(), this.generateRandomDelay());
				break;
			case 'invaders':
				// @note childList: true
				this.interval = setInterval(() => this.innerText += '👾', this.generateRandomDelay());
				break;
			case 'villain':
				// @note characterData: true
				this.innerText = '🦹🏼';
				this.interval = setInterval(() => this._mutateText(), this.generateRandomDelay());
				break;
			case 'ghost':
				// @note attributeFilter: ['id']
				this.innerText = '👻';
				this.interval = setInterval(() => this._mutateAttributes(), this.generateRandomDelay());
				break;
			case 'troll':
				// @note childList: true, subtree: true
				this.innerHTML = '<span>🧌</span>';
				this.depth = 1;
				this.interval = setInterval(() => this._mutateSubTree(), this.generateRandomDelay());
				break;
			case 'vampire':
				// @note attributeOldValue: true
				// @note mutation.oldValue === 'mutant'
				// @todo Vérifier si oldValue.includes() peut faire le job plus vite (?)
				// Et éventuellement :
				// @note mutation.type === 'attributes' && mutation.attributeName === 'class'
				this.innerText = '🧛';
				this.interval = setInterval(() => this._mutateAttributeValue(), this.generateRandomDelay());
				break;
			case 'skull':
				// @note characterDataOldValue: true
				// @note mutation.oldValue === '💀'
				// Et éventuellement :
				// @note mutation.type === 'characterData'
				this.innerText = '👶';
				this.current = 0;
				this.interval = setInterval(() => this._mutateOldText(), this.generateRandomDelay());
				break;
			default:
				this.innerText = '🧑';
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
		const content = ['🦹', '🦹🏻', '🦹🏼', '🦹🏽', '🦹🏾', '🦹🏿'];
		this.childNodes[0].nodeValue = this.getRandomArrayItem(content);
	}

	_mutateOldText() {
		const content = ['👶', '🧒', '🧑', '🧔', '🧑‍🦳', '🧓', '💀', '☠️'];
		++this.current;
		this.childNodes[0].nodeValue = content[this.current];
		if (this.current === (content.length -1)) {
			this.current = -1;
		}
	}

	_mutateSubTree() {
		const target = this.querySelector('span '.repeat(this.depth));
		if (target && this.depth < 10) {
			this.querySelector('span '.repeat(this.depth)).innerHTML = '🧌<span>🧌</span>';
			this.depth++;
		}
	}
}

customElements.define('mu-tant', Mutant);
