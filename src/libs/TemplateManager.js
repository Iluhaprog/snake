import { NoRootIdError } from "../errors/NoRootIdError";
import { NoTemplateError } from "../errors/NoTemplateError";

function getTemplates(ids) {
	if (!ids.length) return [];

	return ids.reduce((prev, templateId) => ({
		...prev,
		[templateId]: document.getElementById(templateId),
	}), {});
}

export class TemplateManager {
	#templates = {};

	#rootEl = null;

	constructor(opts = {}) {
		this.#templates = getTemplates(opts.templates);

		if (!opts.rootId) throw new NoRootIdError();
		this.#rootEl = document.getElementById(opts.rootId);

		this.currentTemplate = {
			name: "",
			element: null,
		};
	}

	use(templateName) {
		const template = this.#templates[templateName];

		if (!this.#templates[templateName]) throw new NoTemplateError(templateName);

		this.currentTemplate = {
			name: templateName,
			element: template.content.cloneNode(true),
		};

		this.#rootEl.innerHTML = "";
		this.#rootEl.appendChild(this.currentTemplate.element);
	}
}
