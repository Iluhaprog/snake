const screenToggleConfig = {
	hiddenClassName: "hidden",
	visibleClassName: "visible",
	stepDuration: 500,
};

const routes = {
	HOME: "/home",
	GAME: "/game",
	THEMES: "/themes",
	LEADERS: "/leaders",
	ADD_SCORE: "/add-score",
};

const screens = {
	HOME: "home-template",
	GAME: "game-template",
	THEMES: "themes-template",
	LEADERS: "leaders-template",
	ADD_SCORE: "add-score-template",
};

const rootId = "root";

export {
	rootId,
	routes,
	screens,
	screenToggleConfig,
};
