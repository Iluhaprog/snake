export class LayoutElement {
	children = [];

	#selectors = [];

	eventHandlers = {};

	constructor(opts = {}) {
		this.name = opts.name ?? "div";
		this.#selectors = opts.className ?? [];
		this.children = opts.children ?? [];
		this.eventHandlers = opts.eventHandlers ?? {};
	}

	get className() {
		return this.#selectors.reduce((prev, curr) => `${prev} ${curr}`, "").trim();
	}

	addSelector(selector) {
		this.#selectors.push(selector);
		return this;
	}

	removeSelector(selector) {
		this.#selectors = this.#selectors.filter((element) => element !== selector);
	}

	addChild(element) {
		if (element instanceof LayoutElement) {
			this.children.push(element);
			return this;
		}
		throw new Error("Element is not a LayoutElement!");
	}

	addEventHandler(eventName, cb) {
		if (!this.eventHandlers[eventName]) {
			this.eventHandlers[eventName] = [ cb ];
		}
		this.eventHandlers[eventName].push(cb);
		return this;
	}

	build() {
		const element = this;
		const realElement = document.createElement(this.name);
		realElement.className = this.className;

		this.children.forEach((child) => {
			realElement.appendChild(child.build());
		});

		Object.keys(this.eventHandlers).forEach((eventName) => {
			element.eventHandlers[eventName].forEach((cb) => {
				realElement.addEventListener(eventName, cb);
			});
		});

		return realElement;
	}
}
