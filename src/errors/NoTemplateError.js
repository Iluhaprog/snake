export class NoTemplateError extends Error {
	constructor(templateName) {
		super(`Template with name "${templateName}" does not exists!`);
	}
}
