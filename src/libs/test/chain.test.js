/* eslint-disable max-lines-per-function */
import { createChain } from "../chain";

function createMockFunctions(length = 6) {
	return Array(length).fill(jest.fn(({ done }) => { done(); })).reduce((prev, curr, index) => ({
		...prev,
		[`name${index}`]: curr,
	}), {});
}

describe("Chain", () => {
	let chain;

	describe("init", () => {
		beforeAll(() => {
			chain = createChain();
		});

		afterAll(() => {
			chain = undefined;
		});

		it("must have stage", () => {
			expect(chain.getStage).not.toBe(undefined);
		});

		it("getStage of chain must be function", () => {
			expect(typeof chain.getStage).toBe("function");
		});

		it("must have go function", () => {
			expect(chain.go).not.toBe(undefined);
		});

		it("go of chain must be function", () => {
			expect(typeof chain.go).toBe("function");
		});
	});

	describe("usage for chain with 3 stages", () => {
		const stages = 3;
		let functions;

		beforeEach(() => {
			functions = createMockFunctions(stages);
			chain = createChain(functions);
		});

		afterEach(() => {
			functions = undefined;
			chain = undefined;
		});

		it("must call all functions in chain with", async () => {
			await chain.go();

			Object.keys(functions).forEach((funcName) => {
				expect(functions[funcName].mock.calls[0].length).toBe(1);
			});
		});
	});

	describe("usage for chain with 6 stages", () => {
		const stages = 6;
		let functions;

		beforeEach(() => {
			functions = createMockFunctions(stages);
			chain = createChain(functions);
		});

		afterEach(() => {
			functions = undefined;
			chain = undefined;
		});

		it("must call all functions", async () => {
			await chain.go();

			Object.keys(functions).forEach((funcName) => {
				expect(functions[funcName].mock.calls[0].length).toBe(1);
			});
		});
	});

	describe("context values", () => {
		const NEW_VALUE = 2;
		const OLD_VALUE = 1;
		let func;

		afterEach(() => {
			func = undefined;
			chain = undefined;
		});

		it("must have some values in context", async () => {
			const someValues = { value: OLD_VALUE };
			func = jest.fn(({ done }) => done());
			chain = createChain({ func });

			await chain.go(someValues);

			expect(func.mock.calls[0][0].context.value).toBe(someValues.value);
		});

		it("must change some values in context", async () => {
			const someValues = { value: OLD_VALUE };

			chain = createChain({
				func: ({ done, context }) => {
					context.value = NEW_VALUE;
					done();
				},
			});

			await chain.go(someValues);

			expect(someValues.value).toBe(NEW_VALUE);
		});
	});
});
