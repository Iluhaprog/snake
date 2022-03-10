/* eslint-disable max-lines-per-function */
import { TemplateManager } from "../TemplateManager";
import { NoRootIdError } from "../../errors/NoRootIdError";
import { NoTemplateError } from "../../errors/NoTemplateError";

describe("TemplateManager", () => {
	const TEMPLATE_1 = "template1";
	const TEMPLATE_2 = "template2";
	const TEXT_1 = "text 1";
	const TEXT_2 = "text 2";
	const ROOT_ID = "root";

	let templateManager;

	describe("init", () => {
		beforeAll(() => {
			document.body.innerHTML = `
      <template id="${TEMPLATE_1}">
        <h1>${TEXT_1}</h1>
      </template>

      <template id="${TEMPLATE_2}>
        <h1>${TEXT_2}</h1>
      </template>

      <div id="${ROOT_ID}"></div>
    `;

			templateManager = new TemplateManager({
				templates: [
					TEMPLATE_1,
					TEMPLATE_2,
				],
				rootId: ROOT_ID,
			});
		});

		afterAll(() => {
			templateManager = undefined;
		});

		it("must have current template", () => {
			expect(templateManager.currentTemplate).not.toBe(undefined);
		});

		it("must have use method", () => {
			expect(templateManager.use).not.toBe(undefined);
			expect(typeof templateManager.use).toBe("function");
		});
	});

	describe("must use template", () => {
		beforeAll(() => {
			document.body.innerHTML = `
        <template id="${TEMPLATE_1}">
          <h1>${TEXT_1}</h1>
        </template>

        <template id="${TEMPLATE_2}">
          <h1>${TEXT_2}</h1>
        </template>

        <div id="${ROOT_ID}"></div>
      `;

			templateManager = new TemplateManager({
				templates: [
					TEMPLATE_1,
					TEMPLATE_2,
				],
				rootId: ROOT_ID,
			});
		});

		afterAll(() => {
			templateManager = undefined;
		});

		it("1", () => {
			templateManager.use(TEMPLATE_1);

			expect(document.querySelector("h1").innerHTML).toBe(TEXT_1);
		});

		it("2", () => {
			templateManager.use(TEMPLATE_2);

			expect(document.querySelector("h1").innerHTML).toBe(TEXT_2);
		});
	});

	describe("errors", () => {
		it("must throw NoRootIdError", () => {
			try {
				// eslint-disable-next-line no-new
				new TemplateManager({
					templates: [],
					// rootId is undefined
				});
			} catch (e) {
				expect(e instanceof NoRootIdError).toBe(true);
			}
		});

		it("must throw NoTemplateError", () => {
			document.body.innerHTML = `
        <template id="${TEMPLATE_1}">
          <h1>${TEXT_1}</h1>
        </template>

        <template id="${TEMPLATE_2}>
          <h1>${TEXT_2}</h1>
        </template>

        <div id="${ROOT_ID}"></div>
      `;
			const tm = new TemplateManager({
				templates: [ TEMPLATE_1 ],
				rootId: ROOT_ID,
			});

			try {
				// eslint-disable-next-line no-new
				tm.use("other-template");
			} catch (e) {
				expect(e instanceof NoTemplateError).toBe(true);
			}
		});
	});
});
