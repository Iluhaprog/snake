export const ContentType = {
	GAME: "game",
	MENU: "menu",
	THEME: "theme",
	SETTINGS: "settings",
};

let currentContentType = "";

const wrapper = document.getElementById("wrapper");
wrapper.dataset.theme = "default";

const box = document.getElementById("box");

export function changeUITheme(theme) {
	wrapper.dataset.theme = theme;
}

export function closeBox() {
	box.dataset.show = "false";
}

export function showBox() {
	box.dataset.show = "true";
}

export function setContentType(contentType) {
	insertContent(contentType);
	setCurrentContentType(contentType);
}

function setCurrentContentType(contentType) {
	if (contentType !== currentContentType) {
		currentContentType = contentType;
	}
}

function insertContent(contentType) {
	if (contentType === ContentType.MENU) return setTemplate(ContentType.MENU);
	if (contentType === ContentType.GAME) return setTemplate(ContentType.GAME);

	return setTemplate(ContentType.MENU);
}

function setTemplate(contentType) {
	if (currentContentType !== contentType) {
		cleanBox();
		const template = document.getElementById(contentType);
		box.appendChild(template.content.cloneNode(true));
	}
}

export function cleanBox() {
	box.innerHTML = "";
}
