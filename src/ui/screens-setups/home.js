import { routes } from "../config";

const HomeButtons = {
	START: "home-start-btn",
	THEMES: "home-themes-btn",
	LEADERS: "home-leaders-btn",
	ADD_SCORE: "home-add-score-btn",
};

export function setupHomeScreen(route) {
	const buttons = getButtons();
	buttons[HomeButtons.START].addEventListener("click", () => { route.change(routes.GAME); });
	buttons[HomeButtons.THEMES].addEventListener("click", () => { route.change(routes.THEMES); });
	buttons[HomeButtons.LEADERS].addEventListener("click", () => { route.change(routes.LEADERS); });
	buttons[HomeButtons.ADD_SCORE].addEventListener("click", () => { route.change(routes.ADD_SCORE); });
}

function getButtons() {
	return Object.values(HomeButtons).reduce((buttons, buttonId) => ({
		...buttons,
		[buttonId]: document.getElementById(buttonId),
	}), {});
}
