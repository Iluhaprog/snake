const scoreBox = document.getElementById("score");
let score = 0;

export function changeScore(change) {
	score += change;
	scoreBox.innerHTML = `Score: ${score}`;
}
