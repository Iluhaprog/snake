class Dark {
    constructor(name) {
        this.name = name;
        this.color = "#86C232";
    }

    point(ctx, x, y, size) {
        ctx.fillStyle = "#6D6E70";
        ctx.fillRect(x, y, size, size);
        ctx.fill();

        ctx.fillStyle = "#61892F";
        ctx.fillRect(x, y, 10, 10);
        ctx.fillRect(x + 10, y + 10, 10, 10);
        ctx.fill();
        ctx.fillStyle = "#86C232";
        ctx.fillRect(x + 10, y, 10, 10);
        ctx.fillRect(x, y + 10, 10, 10);
        ctx.fill();
    }

    eat(ctx, x, y, size) {
        ctx.fillStyle = "#86C232";
        ctx.fillRect(x, y, size, size);
        ctx.fill();
        ctx.fillStyle = "#222629";
        ctx.fillRect(x + 5, y + 5, size / 2, size / 2);
        ctx.fill();
    }
}

const theme = new Dark("Dark");