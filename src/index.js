import { initCanvas, init, changeTheme } from "./game/core";
import { changeScore } from "./game/score";
import { changeUITheme } from "./game/ui";
import "./styles/index.scss";

const root = document.getElementById("root");

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const theme = "default";

if (context) {
	root.appendChild(canvas);

	changeUITheme(theme);
	changeTheme(theme);
	initCanvas(canvas);
	init({
		context,
		onEatCollision,
	});
}

const SCORE_CHANGE = 100;

function onEatCollision() {
	changeScore(SCORE_CHANGE);
}
