import {
	initCanvas, init, changeTheme, drawLoadingText,
} from "./game/core";
import { changeScore, initScoreBox } from "./game/score";
import {
	changeUITheme,
	setContentType,
	ContentType,
	showBox,
	closeBox,
} from "./game/ui";
import "./styles/index.scss";

const theme = "default";
const SCORE_CHANGE = 100;

showMenu();
changeUITheme(theme);

export function startGame() {
	const root = document.getElementById("root");
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	if (context) {
		root.appendChild(canvas);

		changeUITheme(theme);
		initScoreBox();
		changeTheme(theme);
		initCanvas(canvas);
		drawLoadingText(context);
		setTimeout(() => {
			init({
				context,
				onEatCollision,
				onCollision,
			});
		// eslint-disable-next-line no-magic-numbers
		}, 2000);
	}
}

function onEatCollision() {
	changeScore(SCORE_CHANGE);
}

function onCollision() {
	closeBox();
	setTimeout(() => {
		showMenu();
	// eslint-disable-next-line no-magic-numbers
	}, 600);
}

function showMenu() {
	setContentType(ContentType.MENU);
	showBox();

	document.getElementById("start-btn").addEventListener("click", () => {
		closeBox();
		setTimeout(() => {
			setContentType(ContentType.GAME);
			showBox();
			startGame();
			// eslint-disable-next-line no-magic-numbers
		}, 500);
	});
}
