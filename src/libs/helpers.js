export function getTemplates(ids) {
	if (!ids.length) return [];

	return ids.reduce((prev, templateId) => ({
		...prev,
		[templateId]: document.getElementById(templateId),
	}), {});
}
