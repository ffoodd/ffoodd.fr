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
			case 'troll':
				// @note attributeValue
				this.innerText = '🧌';
				this.interval = setInterval(() => this._mutateAttributeValue(), 1000);
				break;
			case 'vampire':
				// @note oldAttributeValue
				this.innerText = '🧛';
				this.interval = setInterval(() => this._mutateOldAttributeValue(), 1000);
				break;
			case 'ghost':
				// @note attributeFilter
				this.innerText = '👻';
				this.interval = setInterval(() => this._mutateAttributes(), 1000);
				break;
			case 'villain':
				// @note text
				this.interval = setInterval(() => this._mutateText(), 1000);
				break;
			case 'skull':
				// @note oldText
				this.current = -1;
				this.interval = setInterval(() => this._mutateOldText(), 1000);
				break;
			case 'invaders':
				// @note subtree
				// @note Suffisant pour déclencher le 'subtree' ?
				this.interval = setInterval(() => this.innerText += '👾', 1000);
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

	_mutateAttributeValue() {
		this.setAttribute('id', this.generateRandomString());
	}

	_mutateAttributes() {
		// @note Objectif : filtrer l’attribut « id »
		const attributes = ['class', 'id', 'title', 'data-yoyo', 'data-boo'];
		this.setAttribute(this.getRandomArrayItem(attributes), this.generateRandomString());
	}

	_mutateOldAttributeValue() {
		// @note Objectif : cibler la valeur « mutant »
		const attributes = ['standard', 'normal', 'ordinaire', 'quelconque', 'mutant'];
		this.classList.toggle(this.getRandomArrayItem(attributes));
	}

	_mutateText() {
		// @note Objectif : cibler le « 🦹🏼 »
		const content = ['🦹', '🦹🏻', '🦹🏼', '🦹🏽', '🦹🏾', '🦹🏿'];
		this.innerText = this.getRandomArrayItem(content);
	}

	_mutateOldText() {
		// @note Objectif : cibler le « ☠️ »
		const content = ['👶', '🧒', '🧑', '🧔', '🧑‍🦳', '🧓', '☠️'];
		++this.current;
		if (this.current === (content.length - 1)) {
			clearInterval(this.interval);
		}
		this.innerText = content[this.current];
	}
}

customElements.define('mu-tant', Mutant);
