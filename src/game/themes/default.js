export const defaultTheme = {
	name: "default",
	price: 0,
	eat,
	snakeHead,
	snakeSegment,
	cell,
	backgroundColor: "#7C7669",
};

export const SNAKE_COLOR = "#AA977C";
export const SNAKE_HEAD_COLOR = "#5C5C5A";
export const EAT_COLOR = "#F5C40C";
export const CELL_COLOR = "#F3EDE9";

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
