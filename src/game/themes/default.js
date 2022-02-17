export const defaultTheme = {
	name: "default",
	price: 0,
	eat,
	snakeHead,
	snakeSegment,
	cell,
	backgroundColor: "#4B558A",
	font: "IndieFlower-Regular",
	fontColor: "#E3E2CC",
};

export const SNAKE_COLOR = "#41C7DC";
export const SNAKE_HEAD_COLOR = "#4B558A";
export const EAT_COLOR = "#D6522B";
export const CELL_COLOR = "#E3E2CC";

function eat(params) {
	const { context } = params;
	context.fillStyle = EAT_COLOR;
	rect(params);
}

function snakeHead(params) {
	const { context } = params;
	context.fillStyle = SNAKE_HEAD_COLOR;
	rect(params);
}

function snakeSegment(params) {
	const { context } = params;
	context.fillStyle = SNAKE_COLOR;
	rect(params);
}

function cell(params) {
	const { context } = params;
	context.fillStyle = CELL_COLOR;
	rect(params);
}

function rect({
	context, x, y, sizes,
}) {
	context.fillRect(
		x * sizes.cell.width + sizes.gap,
		y * sizes.cell.height + sizes.gap,
		sizes.cell.width - sizes.gap - sizes.gap,
		sizes.cell.height - sizes.gap - sizes.gap,
	);
}
