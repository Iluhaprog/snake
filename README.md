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