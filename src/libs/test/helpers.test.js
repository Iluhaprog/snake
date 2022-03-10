import { getTemplates } from "../helpers";

describe("Helpers", () => {
	describe("getTemplates", () => {
		const ID_1 = "id1";
		const ID_2 = "id2";

		beforeEach(() => {
			document.body.innerHTML = `
        <template id="${ID_1}"></template>
        <template id="${ID_2}"></template>
      `;
		});

		it("must get object of templates by id", () => {
			const templates = getTemplates([ ID_1, ID_2 ]);

			expect(templates[ID_1].id).toBe(ID_1);
			expect(templates[ID_2].id).toBe(ID_2);
		});
	});
});
