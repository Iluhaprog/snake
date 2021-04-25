var themesBox = document.getElementById("themesBox");

function initThemes() {
    themesBox.innerHTML = "";
    for (let i = 0; i < themes.length; i++) {
        themesBox.innerHTML += `<button onclick="changeTheme(${i});" class="${themes[i].name} button button__theme">
                                    ${themes[i].name} Theme
                                </button>`;
    }
}

function showThemes() {
    initThemes();
    themesBox.classList.add("theme-choice__show");
}

function closeThemes() {
    themesBox.classList.remove("theme-choice__show");
}

function changeTheme(theme) {
    selectedTheme = parseInt(theme);
    CSSLoad("themes/" + themesCss[selectedTheme]);
    JSLoad("themes/" + themes[selectedTheme].file);
    setCookie("theme", selectedTheme);
    closeThemes();
}