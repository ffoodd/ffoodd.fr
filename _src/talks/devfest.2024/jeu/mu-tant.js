class Mutant extends HTMLElement {
	// @todo Ajouter un attribut genre + peau pour varier les personnages ?
	// @link https://emojipedia.org/zero-width-joiner?ref=blog.emojipedia.org
	// @todo Ajouter une animation spécifique pour chaque type ?
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

	getRandomArrayItem(array) {
		return array[Math.floor((Math.random() * array.length))];
	}

	// @note Au lieu de se contenter du `innerText`, on peut imaginer embarquer des styles !
	_mutate(type) {
		switch (type) {
			case 'zombie':
				// @note attributes: true
				this.innerText = '🧟';
				this.interval = setInterval(() => this._mutateAttribute(), 1000);
				break;
			case 'invaders':
				// @note childList: true
				this.interval = setInterval(() => this.innerText += '👾', 1000);
				break;
			case 'villain':
				// @note characterData: true
				this.innerText = '🦹🏼';
				this.interval = setInterval(() => this._mutateText(), 1000);
				break;
			case 'ghost':
				// @note attributeFilter: ['id']
				this.innerText = '👻';
				this.interval = setInterval(() => this._mutateAttributes(), 1000);
				break;
			case 'vampire':
				// @note attributeOldValue: true
				// @note mutation.oldValue === 'mutant'
				// Et éventuellement :
				// @note mutation.type === 'attributes' && mutation.attributeName === 'class'
				this.innerText = '🧛';
				this.interval = setInterval(() => this._mutateAttributeValue(), 1000);
				break;
			case 'skull':
				// @note characterDataOldValue: true
				// @note mutation.oldValue === '💀'
				// Et éventuellement :
				// @note mutation.type === 'characterData'
				this.innerText = '👶';
				this.current = 0;
				this.interval = setInterval(() => this._mutateOldText(), 1000);
				break;
				// @fixme Pas d’exemple avec subtree (?)
				// @note Zombie avec enfants en emoji (?)
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
}

customElements.define('mu-tant', Mutant);
