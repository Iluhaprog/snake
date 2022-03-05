/* eslint-disable max-lines-per-function */
import { LayoutElement } from "./LayoutElement";

describe("LayoutElement", () => {
	const elementName = "div";
	let element;

	beforeEach(() => {
		element = new LayoutElement();
	});

	afterEach(() => {
		element = undefined;
	});

	describe("fields", () => {
		it("must create element", () => {
			expect(element).not.toEqual(undefined);
		});

		it("must have name", () => {
			expect(element.name).toEqual(elementName);
		});

		it("must have children", () => {
			expect(Array.isArray(element.children)).toBe(true);
		});

		it("must have className", () => {
			expect(typeof element.className).toBe("string");
		});

		it("must have eventHandlers", () => {
			expect(
				typeof element.eventHandlers === "object"
      && element.eventHandlers !== null,
			).toBe(true);
		});
	});

	describe("methods", () => {
		const testSelector = "selector";

		it("must add selector to className [constructor]", () => {
			const el = new LayoutElement({
				className: [ testSelector ],
			});

			expect(el.className).toBe(testSelector);
		});

		it("must add selector to className [addSelector]", () => {
			element.addSelector(testSelector);
			expect(element.className).toBe(testSelector);
		});

		it("must remove selector from className [removeSelector]", () => {
			element.addSelector(testSelector);
			element.removeSelector(testSelector);
			expect(element.className).toBe("");
		});

		it("must build realElement [build]", () => {
			expect(element.build() instanceof Element).toBe(true);
		});

		it("must add child [addChild]", () => {
			element.addChild(new LayoutElement());
			expect(element.children.length).toBe(1);
			expect(element.children[0] instanceof LayoutElement).toBe(true);
		});

		it("must build realElement with options [build]", () => {
			const mockClick = jest.fn(() => {});

			const testElementOptions = {
				name: "main",
				className: [
					"selector1",
					"selector2",
				],
				children: [
					new LayoutElement(),
					new LayoutElement(),
				],
				eventHandlers: {
					click: [ mockClick ],
				},
			};
			const testElement = new LayoutElement(testElementOptions);
			const realElement = testElement.build();

			realElement.click();
			expect(realElement.tagName.toLowerCase()).toBe(testElementOptions.name);
			expect(realElement.className).toBe(testElement.className);
			expect(realElement.children.length).toBe(testElementOptions.children.length);
			expect(mockClick.mock.calls.length).toBe(1);
		});

		it("must add event handler [addEventHandler]", () => {
			const mockClick = jest.fn(() => {});
			element.addEventHandler("click", mockClick);
			expect(element.eventHandlers.click).not.toBe(undefined);
		});

		it("must call event handler [build, addEventHandler]", () => {
			const mockClick = jest.fn(() => {});
			element.addEventHandler("click", mockClick);
			const realElement = element.build();
			realElement.click();

			expect(mockClick.mock.calls.length).toBe(1);
		});
	});
});
