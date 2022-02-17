// menu
const wrapper = document.getElementById("wrapper");
wrapper.dataset.theme = "default";

export function changeUITheme(theme) {
	wrapper.dataset.theme = theme;
}
