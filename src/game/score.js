const BEGIN_SCORE = 0;
let scoreBox;
let score = BEGIN_SCORE;

export function initScoreBox() {
	score = BEGIN_SCORE;
	scoreBox = document.getElementById("score");
}

export function changeScore(change) {
	score += change;
	scoreBox.innerHTML = `Score: ${score}`;
}
