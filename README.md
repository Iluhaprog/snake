### Structure of project
1. I must write css in js. For it i should create elements, which i can use like:
```javascript
  const root = new AppElement("div");

  const canvas = new AppElement("canvas");
  canvas.style`
    width: 500px;
    height: 400px;
    background: green;
  `;

  renderer.render(root);
  renderer.render(root, canvas);
  
  // OR
  const root = new AppElement({
    name: "div",
    children: [
      new AppElement({
        name: "h1"
        children: [
          "Hello, World!",
        ],
        style: `
          color: blue;
          font-family: Arial;
          font-size: 34px;
        `
      }),
      new TouchHandler({
        name: "div",
        children: [...],
        style: `...`,
        onHandle: {
          onStart: function (context, event) {/* do something */ },
          onActive: function (context, event) { /* do something */ },
          onEnd: function (context, event) { /* do something */ },
        },
      }),
    ],
  });

  renderer.render(root);
```
> I need study **CSSOM** in details for correct using.
2. I must use **webpack** for build project.
3. I must try **docker** for deploy it.
4. I must write the simple backend with **nodejs** and **sqlite**, but without a libraries for routing, just HTTP.
5. I can try to integrate Feature-Sliced Design.
### Structure of theme in frontend

```javascript
{
  "name": "string",
  "snakeHead": {
    "draw": function ({context, x, y, size}) {},
    "isDynamic": false, // it means that it can be animated
  },
  "snakeSegment": {
    "draw": function ({context, x, y, size}) {},
    "isDynamic": false,
  },
  "cell": {
    "draw": function ({context, x, y, size}) {},
    "isDynamic": false,
  }
  "eat": {
    "draw": function ({context, x, y, size}) {},
    "isDynamic": false,
  },
}
```
