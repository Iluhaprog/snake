const Events = {
	URL_CHANGE: "url-change",
};

const MAX_HISTORY_STACK_SIZE = 10;

export class Route {
	#routes = {};

	#historyStack = [];

	constructor(opts = { default: "/" }) {
		this.defaultPath = opts.default;
		this.currentPath = opts.default;
	}

	apply() {
		this.#initLoadListener();
		this.#initUrlChangeListener();
	}

	add(routeName, act) {
		this.#routes[routeName] = act;
	}

	// eslint-disable-next-line class-methods-use-this
	change(routeName, params) {
		window.history.pushState(params, "", routeName);

		window.dispatchEvent(new CustomEvent(Events.URL_CHANGE, {
			detail: {
				routeName,
				params,
			},
		}));
	}

	back() {
		this.#historyStack.pop();
		// eslint-disable-next-line no-magic-numbers
		const prevLocation = this.#historyStack.at(-1);

		this.change(
			prevLocation.routeName,
			prevLocation.params,
		);
	}

	#initLoadListener() {
		const { change, defaultPath } = this;

		window.addEventListener("load", () => {
			const path = window.location.pathname;
			if (path === "/") {
				change(defaultPath);
			}
		});
	}

	#initUrlChangeListener() {
		window.addEventListener(Events.URL_CHANGE, ({ detail: { routeName, params } }) => {
			this.#routes[routeName](params);

			this.currentPath = routeName;

			if (this.#historyStack > MAX_HISTORY_STACK_SIZE) {
				this.#historyStack.shift();
			}

			this.#historyStack.push({
				routeName,
				params,
			});
		});
	}
}
