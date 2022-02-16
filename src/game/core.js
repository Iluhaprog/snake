import { themes } from "./themes";

const sizes = {
	field: {
		width: 600,
		height: 420,
	},
	cell: {
		width: 30,
		height: 30,
	},
	gap: 0.1,
};

const FPS = 5;
const TIME_FRAMERATE = 1000;

const horizontalLength = sizes.field.width / sizes.cell.width;
const verticalLength = sizes.field.height / sizes.cell.height;

const INDENT = 3;

const ARRAY_BEGINNING_INDEX = 0;

// cell types
const CELL = 1;
const SNAKE_SEGMENT = 2;
const SNAKE_HEAD = 3;
const EAT = 4;

// directions
const TO_LEFT = 0;
const TO_RIGHT = 1;
const TO_TOP = 2;
const TO_BOTTOM = 3;

let direction = getRandomInt(TO_LEFT, TO_BOTTOM);
const snakeBody = [];
let eatPosition = { x: 0, y: 0 };
let step = 0;
const directionQueue = [];
let fpsInterval;
let now;
let then;
let elapsed;

let currentTheme = null;

export function selectTheme(themeName) {
	currentTheme = themes.find((element) => element.name === themeName);
}

/**
 *
 * @param {HTMLCanvasElement} canvas
 */
export function initCanvas(canvas) {
	canvas.classList.add("game-field");
	canvas.width = sizes.field.width;
	canvas.height = sizes.field.height;
	canvas.style.backgroundColor = currentTheme.backgroundColor;
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 */
export function init({ context, onEatCollision, onCollision }) {
	setupKeyPressing();

	snakeBody.push({
		x: getRandomInt(INDENT, horizontalLength - INDENT),
		y: getRandomInt(INDENT, verticalLength - INDENT),
	});
	snakeBody.unshift(getNewSnakeSegment());

	generateEat();

	drawField(context);
	drawEat(context);
	drawSnake(context);
	setupFPS(FPS);

	window.requestAnimationFrame(() => run(context, onEatCollision, onCollision));
}

function setupKeyPressing() {
	window.addEventListener("keypress", (ev) => {
		switch (ev.key) {
		case "w":
			directionQueue.push(TO_TOP);
			break;
		case "s":
			directionQueue.push(TO_BOTTOM);
			break;
		case "a":
			directionQueue.push(TO_LEFT);
			break;
		case "d":
			directionQueue.push(TO_RIGHT);
			break;
		default:
			break;
		}
	});
}

function setupFPS(fps) {
	fpsInterval = TIME_FRAMERATE / fps;
	then = Date.now();
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 */
function run(context, onEatCollision, onCollision) {
	now = Date.now();
	elapsed = now - then;

	let isGameOver = false;

	if (elapsed > fpsInterval) {
		then = now - (elapsed % fpsInterval);
		changeDirection();

		moveSnake({
			context,
			onCollision: () => {
				isGameOver = true;
				onCollision();
			},
			onEatCollision: () => {
				eat(context);
				onEatCollision();
			},
			onMove: redrawCell,
		});
	}
	if (!isGameOver) {
		drawSnake(context);
		window.requestAnimationFrame(() => run(context, onEatCollision, onCollision));
	}
}

function eat(context) {
	generateEat();
	drawEat(context);
}

function changeDirection() {
	if (step >= 1 && directionQueue.length >= 1) {
		const selectedDirection = directionQueue.shift();
		if (direction === TO_LEFT && selectedDirection !== TO_RIGHT) direction = selectedDirection;
		if (direction === TO_RIGHT && selectedDirection !== TO_LEFT) direction = selectedDirection;
		if (direction === TO_TOP && selectedDirection !== TO_BOTTOM) direction = selectedDirection;
		if (direction === TO_BOTTOM && selectedDirection !== TO_TOP) direction = selectedDirection;
	}
}

function redrawCell(context, x, y) {
	clearCell(context, x, y);
	drawCell({ context, x, y });
}

function drawField(context) {
	for (let y = 0; y < verticalLength; y += 1) {
		for (let x = 0; x < horizontalLength; x += 1) {
			drawCell({ context, x, y });
		}
	}
}

function drawSnake(context) {
	for (let i = snakeBody.length - 1; i >= ARRAY_BEGINNING_INDEX; i -= 1) {
		if (i === ARRAY_BEGINNING_INDEX) {
			drawCell({
				context, x: snakeBody[i].x, y: snakeBody[i].y, type: SNAKE_HEAD,
			});
		} else {
			drawCell({
				context, x: snakeBody[i].x, y: snakeBody[i].y, type: SNAKE_SEGMENT,
			});
		}
	}
}

function drawEat(context) {
	drawCell({
		context, x: eatPosition.x, y: eatPosition.y, type: EAT,
	});
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x
 * @param {number} y
 * @param {EAT|SNAKE_HEAD|SNAKE_SEGMENT|CELL} type is EAT | SNAKE_HEAD | SNAKE_SEGMENT | CELL
 */
function drawCell({
	context, x, y, type = CELL,
}) {
	const params = {
		context, x, y, sizes,
	};
	switch (type) {
	case SNAKE_HEAD:
		currentTheme.snakeHead(params);
		break;
	case SNAKE_SEGMENT:
		currentTheme.snakeSegment(params);
		break;
	case EAT:
		currentTheme.eat(params);
		break;
	case CELL:
		currentTheme.cell(params);
		break;
	default:
		currentTheme.cell(params);
		break;
	}
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x
 * @param {number} y
 */
function clearCell(context, x, y) {
	context.clearRect(
		x * sizes.cell.width,
		y * sizes.cell.height,
		sizes.cell.width,
		sizes.cell.height,
	);
}

function generateEat() {
	let isUnique = true;

	eatPosition = {
		x: getRandomInt(ARRAY_BEGINNING_INDEX, horizontalLength - 1),
		y: getRandomInt(ARRAY_BEGINNING_INDEX, verticalLength - 1),
	};

	for (let i = 0; i < snakeBody.length; i += 1) {
		if (eatPosition.x === snakeBody[i].x && eatPosition.y === snakeBody[i].y) {
			isUnique = false;
			break;
		}
	}

	if (!isUnique) generateEat();
}

function moveSnake({
	context,
	onCollision = () => {},
	onEatCollision = () => {},
	onMove = () => {},
}) {
	const snakeHead = snakeBody[0];
	const snakeTail = snakeBody[snakeBody.length - 1];

	if (!isOutside(snakeHead) && !isSegmentCollision(snakeHead)) {
		if (snakeHead.x === eatPosition.x && snakeHead.y === eatPosition.y) {
			snakeBody.unshift(getNewSnakeSegment());
			onEatCollision(context);
		}

		onMove(context, snakeTail.x, snakeTail.y);

		snakeBody.unshift(getNewSnakeSegment());
		snakeBody.pop();
		step += 1;
	} else {
		onCollision(context);
	}
}

function isOutside(head) {
	return head.x < ARRAY_BEGINNING_INDEX
        || head.x > horizontalLength - 1
        || head.y < ARRAY_BEGINNING_INDEX
        || head.y > verticalLength - 1;
}

function isSegmentCollision(head) {
	if (snakeBody.length > 1) {
		for (let i = 1; i < snakeBody.length; i += 1) {
			if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
				return true;
			}
		}
	}
	return false;
}

function getNewSnakeSegment() {
	const xValue = compare(direction, TO_LEFT, TO_RIGHT);
	const yValue = compare(direction, TO_TOP, TO_BOTTOM);
	const segment = {
		x: snakeBody[0].x + xValue,
		y: snakeBody[0].y + yValue,
	};

	return segment;
}

/**
 *
 * @param {number|string} value
 * @param {number|string} v1
 * @param {number|string} v2
 * @returns number
 */
function compare(value, v1, v2) {
	const FIRST_MATCH = -1;
	const SECOND_MATCH = 1;
	const NO_MATCH = 0;

	if (value === v1) return FIRST_MATCH;
	if (value === v2) return SECOND_MATCH;
	return NO_MATCH;
}

function getRandomInt(min = 0, max = 1) {
	return Math.floor(Math.random() * (max - min) + min);
}
