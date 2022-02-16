import { initCanvas, init, selectTheme } from "./game/core";
import "./styles/styles.css";

const root = document.getElementById("root");
const scoreBox = document.getElementById("score");

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const EAT_PRICE = 100;
let score = 0;

if (context) {
	root.appendChild(canvas);
	selectTheme("default");
	initCanvas(canvas);
	init({
		context,
		onEatCollision,
	});
}

function onEatCollision() {
	score += EAT_PRICE;
	scoreBox.innerText = `Score: ${score}`;
}
