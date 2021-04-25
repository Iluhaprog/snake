class Microsoft {
    constructor(name) {
        this.name = name;
        this.color = "#0067b8";

    }

    point(ctx, x, y, size) {
        ctx.fillStyle = "#737373";
        ctx.fillRect(x, y, size, size);
        ctx.fill();
    }

    eat(ctx, x, y, size) {

        size = size / 2 - 1;

        ctx.fillStyle = "#F25022";
        ctx.fillRect(x, y, size, size);
        ctx.fill();
        ctx.fillStyle = "#7FBA00";
        ctx.fillRect(x + 11, y, size, size);
        ctx.fill();
        ctx.fillStyle = "#00A4EF";
        ctx.fillRect(x, y + 11, size, size);
        ctx.fill();
        ctx.fillStyle = "#FFB900";
        ctx.fillRect(x + 11, y + 11, size, size);
        ctx.fill();
    }
}

const theme = new Microsoft("Microsoft");