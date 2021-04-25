// js for themes
const themes = [
    {name: "Default", file: "default.js"},
    {name: "Apple", file: "apple.js"},
    {name: "Microsoft", file: "microsoft.js"},
    {name: "Dark", file: "dark.js"}
];

// css for themes
const themesCss = [
    'default.css',
    'apple.css',
    'microsoft.css',
    'dark.css'
]

function CSSLoad(file){
	var link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
    link.setAttribute("href", file);
    if (document.getElementsByTagName("link").length > 1) {
        document.getElementsByTagName("head")[0].removeChild(document.getElementsByTagName("link")[1]);
    }
    document.getElementsByTagName("head")[0].appendChild(link);
}

function JSLoad(file) {
    var script = document.createElement("script");
    script.setAttribute("src", file);
    if (document.getElementsByTagName("script").length > 3) {
        document.getElementsByTagName("head")[0].removeChild(document.getElementsByTagName("script")[0]);
    }
    document.getElementsByTagName("head")[0].appendChild(script);
    console.log(file);
}

var selectedTheme = getCookie("theme") ? getCookie("theme") : setCookie("theme", 0);

setCookie("theme", selectedTheme);

CSSLoad("themes/" + themesCss[selectedTheme]);
JSLoad("themes/" + themes[selectedTheme].file);