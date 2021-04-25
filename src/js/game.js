var canvas = document.getElementById("game");
var ctx = null;

if (canvas.getContext) {
    ctx = canvas.getContext("2d");
}
var loading = false;
var score = 0;
var points = [];
var direction = rnd(1, 5);
var eatPosition = { x: rnd(1, 579), y: rnd(1, 579) };

var gameOverWindow = document.querySelector(".game-over");

function createHead(min, max) {
    points.push({ x: rnd(min, max), y: rnd(min, max) });
}

function left() {
    if (direction !== 3) direction = 1;
}
function up() {
    if (direction !== 4) direction = 2;
}
function right() {
    if (direction !== 1) direction = 3;
}
function down() {
    if (direction !== 2) direction = 4;
}

document.addEventListener("keydown", function (e) {
    switch (e.which) {
        case 37:
            left();
            break;
        case 38:
            up();
            break;
        case 39:
            right();
            break;
        case 40:
            down();
            break;
    }
});

function addPoint() {
    var kx = 0;
    var ky = 0;
    switch (direction) {
        case 1:
            kx = -20;
            break;
        case 2:
            ky = -20;
            break;
        case 3:
            kx = 20;
            break;
        case 4:
            ky = 20;
            break;
    }
    points.push({ x: points[points.length - 1].x + kx, y: points[points.length - 1].y + ky });
}

function draw() {
    for (var i = 0; i < points.length; i++) {
        theme.point(ctx, points[i].x, points[i].y, 20);
    }
}


function createEat() {
    eatPosition = { x: rnd(1, 579), y: rnd(1, 579) };
}

function eat(head) {
    if (!!head) {
        if (head.x > eatPosition.x - 20 && head.x < eatPosition.x + 20 &&
            head.y > eatPosition.y - 20 && head.y < eatPosition.y + 20) {
            addPoint();
            createEat();
            score++;
        }
    }
}

function isCollision(el) {
    for (let i = 1; i < el.length; i++) {
        if (el[0].x === el[i].x && el[0].y === el[i].y) {
            return true;
        }
    }
    return false;
}

function move() {
    var kx = 0, ky = 0;
    var collision = isCollision(points);

    switch (direction) {
        case 1:
            kx = -20;
            break;
        case 2:
            ky = -20;
            break;
        case 3:
            kx = 20;
            break;
        case 4:
            ky = 20;
            break;
    }

    eat(points[0]);

    if (!!points && points !== null && points[0].x >= 0 && points[0].x <= 580 && points[0].y >= 0 && points[0].y <= 580 && !collision) {
        points.pop();
        points.unshift({ x: points[0].x + kx, y: points[0].y + ky });
    } else {
        gameOverWindow.classList.add("game-over__show");
        points = [];
        eatPosition = { x: -21, y: -21 };
        ctx.clearRect(0, 0, 600, 600);
        document.getElementById("scoreCounter").innerHTML = score;
        document.getElementById("scoreCounter2").innerHTML = score;
        document.getElementById("scoreInput").value = score;
    }

}

function restart() {
    gameOverWindow.classList.remove("game-over__show")
    loading = true;

    setTimeout(function () {
        createHead(300, 400);
        addPoint();
        createEat();
        score = 0;
        loading = false;
    }, 2500);
}

createHead(300, 400);
addPoint();

setInterval(function () {
    ctx.clearRect(0, 0, 600, 600);

    if (loading === true) {
        ctx.font = "20px serif";
        ctx.fillStyle = theme.color;
        ctx.fillText("Loading . . .", 10, 25);
    }

    theme.eat(ctx, eatPosition.x, eatPosition.y, 20);
    move();
    draw();

}, 70);
