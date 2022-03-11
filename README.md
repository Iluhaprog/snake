### Structure of project
1. I must use **webpack** for build project.
2. I must try **docker** for deploy it.
3. I must write the simple backend with **nodejs** and **sqlite**, but without a libraries for routing, just HTTP.
### Structure of theme in frontend

#### JS: 
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

#### CSS
```css
  .selector[data-theme="theme"] {
    /* some styles */
  }
```

### TO-DO:
1. ~~Write UI management setup~~
2. Write game
3. ~~Write setup for home screen~~
4. Write setup for themes screen
5. Write setup for leaders screen
6. Write setup for add score screen
7. Write setup for game screen

