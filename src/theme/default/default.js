class DefaultTheme {
    constructor(name) {
        this.name = name;
        this.color = "#242424";
    }

    point(ctx, x, y, size) {
        ctx.fillStyle = "#242424";
        ctx.fillRect(x, y, size, size);
        ctx.fill();
    }

    eat(ctx, x, y, size) {
        ctx.fillStyle = "#242424";
        ctx.fillRect(x, y, size, size);
        ctx.fill();
    }
}

const theme = new DefaultTheme("Dafault");
