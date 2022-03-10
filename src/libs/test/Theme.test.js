import { Theme } from "../Theme";

describe("Theme", () => {
	let theme;
	const themeName = "theme1";
	const newThemeName = "theme2";

	beforeEach(() => {
		document.body.innerHTML = `
      <div id="wrapper" data-theme="${themeName}"></div>
    `;

		theme = new Theme("wrapper");
	});

	it("must get current theme name", () => {
		const name = theme.getName();
		expect(name).toBe(themeName);
	});

	it("must change theme", () => {
		theme.select(newThemeName);
		const name = theme.getName();

		expect(name).toBe(newThemeName);
	});
});
