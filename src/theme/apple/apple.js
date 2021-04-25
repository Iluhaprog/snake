class AppleTheme {
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

        var colors = ["#5ebd3e",  "#ffb900", "#f78200", "#e23838", "#973999", "#009cdf"];

        for (var k = 0; k < colors.length; k++) {
            ctx.fillStyle = colors[k];
            ctx.fillRect(x, y, size, size/colors.length);
            ctx.fill();
            y += size/colors.length;
        }
        ctx.strokeStyle = "#242424";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y - size , size, size);
    }
}

const theme = new AppleTheme("Apple");