"use strict";function displayEl(e,t){e.style.display=t}function rnd(e,t){return Math.floor(Math.random()*(t-e)+e)}var scores=document.getElementById("scores"),addScore=document.querySelector(".add-score-block");function getScores(){$.ajax({type:"GET",url:"https://157.230.98.200/scores"}).done(function(e){scores.innerHTML+="<div>"+e+"</div>"}).fail(function(e,t){console.error(e),console.error(t)})}function showWindowAddScore(){addScore.classList.add("add-score-block__show")}function getCookie(e){var t=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return null!==t&&"undefined"!==t[1]&&decodeURIComponent(t[1])}function setCookie(e,t){var n=encodeURIComponent(e)+"="+encodeURIComponent(t);return document.cookie=n,t}getScores();var themes=[{name:"Default",file:"default.js"},{name:"Apple",file:"apple.js"},{name:"Microsoft",file:"microsoft.js"},{name:"Dark",file:"dark.js"}],themesCss=["default.css","apple.css","microsoft.css","dark.css"];function CSSLoad(e){var t=document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),t.setAttribute("href",e),1<document.getElementsByTagName("link").length&&document.getElementsByTagName("head")[0].removeChild(document.getElementsByTagName("link")[1]),document.getElementsByTagName("head")[0].appendChild(t)}function JSLoad(e){var t=document.createElement("script");t.setAttribute("src",e),3<document.getElementsByTagName("script").length&&document.getElementsByTagName("head")[0].removeChild(document.getElementsByTagName("script")[0]),document.getElementsByTagName("head")[0].appendChild(t),console.log(e)}var selectedTheme=getCookie("theme")?getCookie("theme"):setCookie("theme",0);setCookie("theme",selectedTheme),CSSLoad("themes/"+themesCss[selectedTheme]),JSLoad("themes/"+themes[selectedTheme].file);var themesBox=document.getElementById("themesBox");function initThemes(){themesBox.innerHTML="";for(var e=0;e<themes.length;e++)themesBox.innerHTML+='<button onclick="changeTheme('.concat(e,');" class="').concat(themes[e].name,' button button__theme">\n                                    ').concat(themes[e].name," Theme\n                                </button>")}function showThemes(){initThemes(),themesBox.classList.add("theme-choice__show")}function closeThemes(){themesBox.classList.remove("theme-choice__show")}function changeTheme(e){selectedTheme=parseInt(e),CSSLoad("themes/"+themesCss[selectedTheme]),JSLoad("themes/"+themes[selectedTheme].file),setCookie("theme",selectedTheme),closeThemes()}var canvas=document.getElementById("game"),ctx=null;canvas.getContext&&(ctx=canvas.getContext("2d"));var loading=!1,score=0,points=[],direction=rnd(1,5),eatPosition={x:rnd(1,579),y:rnd(1,579)},gameOverWindow=document.querySelector(".game-over");function createHead(e,t){points.push({x:rnd(e,t),y:rnd(e,t)})}function left(){3!==direction&&(direction=1)}function up(){4!==direction&&(direction=2)}function right(){1!==direction&&(direction=3)}function down(){2!==direction&&(direction=4)}function addPoint(){var e=0,t=0;switch(direction){case 1:e=-20;break;case 2:t=-20;break;case 3:e=20;break;case 4:t=20}points.push({x:points[points.length-1].x+e,y:points[points.length-1].y+t})}function draw(){for(var e=0;e<points.length;e++)theme.point(ctx,points[e].x,points[e].y,20)}function createEat(){eatPosition={x:rnd(1,579),y:rnd(1,579)}}function eat(e){e&&e.x>eatPosition.x-20&&e.x<eatPosition.x+20&&e.y>eatPosition.y-20&&e.y<eatPosition.y+20&&(addPoint(),createEat(),score++)}function isCollision(e){for(var t=1;t<e.length;t++)if(e[0].x===e[t].x&&e[0].y===e[t].y)return!0;return!1}function move(){var e=0,t=0,n=isCollision(points);switch(direction){case 1:e=-20;break;case 2:t=-20;break;case 3:e=20;break;case 4:t=20}eat(points[0]),points&&null!==points&&0<=points[0].x&&points[0].x<=580&&0<=points[0].y&&points[0].y<=580&&!n?(points.pop(),points.unshift({x:points[0].x+e,y:points[0].y+t})):(gameOverWindow.classList.add("game-over__show"),points=[],eatPosition={x:-21,y:-21},ctx.clearRect(0,0,600,600),document.getElementById("scoreCounter").innerHTML=score,document.getElementById("scoreCounter2").innerHTML=score,document.getElementById("scoreInput").value=score)}function restart(){gameOverWindow.classList.remove("game-over__show"),loading=!0,setTimeout(function(){createHead(300,400),addPoint(),createEat(),score=0,loading=!1},2500)}document.addEventListener("keydown",function(e){switch(e.which){case 37:left();break;case 38:up();break;case 39:right();break;case 40:down()}}),createHead(300,400),addPoint(),setInterval(function(){ctx.clearRect(0,0,600,600),!0===loading&&(ctx.font="20px serif",ctx.fillStyle=theme.color,ctx.fillText("Loading . . .",10,25)),theme.eat(ctx,eatPosition.x,eatPosition.y,20),move(),draw()},70);