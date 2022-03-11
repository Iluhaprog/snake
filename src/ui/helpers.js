import { TemplateManager } from "../libs/TemplateManager";
import { createChain } from "../libs/chain";
import {
	setupHomeScreen,
	setupThemesScreen,
	setupLeadersScreen,
	setupAddScoreScreen,
} from "./screens-setups";
import {
	rootId,
	routes,
	screens,
	screenToggleConfig,
} from "./config";

const screensSetups = {
	[screens.HOME]: setupHomeScreen,
	[screens.GAME]() {},
	[screens.THEMES]: setupThemesScreen,
	[screens.LEADERS]: setupLeadersScreen,
	[screens.ADD_SCORE]: setupAddScoreScreen,
};

export function getChains(route, templates) {
	return {
		home: getChain({
			...screenToggleConfig, route, templates, screenName: screens.HOME,
		}),
		themes: getChain({
			...screenToggleConfig, route, templates, screenName: screens.THEMES,
		}),
		leaders: getChain({
			...screenToggleConfig, route, templates, screenName: screens.LEADERS,
		}),
		game: getChain({
			...screenToggleConfig, route, templates, screenName: screens.GAME,
		}),
		addScore: getChain({
			...screenToggleConfig, templates, route, screenName: screens.ADD_SCORE,
		}),
	};
}

// eslint-disable-next-line max-lines-per-function
function getChain({
	templates,
	screenName,
	hiddenClassName,
	visibleClassName,
	stepDuration,
	route,
}) {
	return createChain({
		hide: ({ done, context }) => {
			context.root.className = hiddenClassName;
			setTimeout(done, stepDuration);
		},
		afterHide: ({ done, context }) => {
			templates.use(screenName);
			context.currentScreen = templates.currentTemplate;
			done();
		},
		beforeShow: ({ done, context }) => {
			if (screenName !== screens.GAME) screensSetups[screenName](route, context.currentScreen);
			done();
		},
		show: ({ done, context }) => {
			context.root.className = visibleClassName;
			setTimeout(done, stepDuration);
		},
		afterShow: ({ done, context }) => {
			if (screenName === screens.GAME) screensSetups[screenName](route, context.currentScreen);
			done();
		},
	});
}

export function getTemplates(id) {
	return new TemplateManager({
		templates: Object.values(screens),
		rootId: id,
	});
}

export function setupRoutes(route, chains) {
	const root = document.getElementById(rootId);

	route.add(routes.HOME, () => chains.home.go({ root }));
	route.add(routes.GAME, () => chains.game.go({ root }));
	route.add(routes.THEMES, () => chains.themes.go({ root }));
	route.add(routes.LEADERS, () => chains.leaders.go({ root }));
	route.add(routes.ADD_SCORE, () => chains.addScore.go({ root }));
}
