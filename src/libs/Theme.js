export class Theme {
	constructor(wrapperId = "wrapper") {
		this.wrapper = document.getElementById(wrapperId);
	}

	select(theme) {
		this.wrapper.dataset.theme = theme;
	}

	getName() {
		return this.wrapper.dataset.theme;
	}
}
