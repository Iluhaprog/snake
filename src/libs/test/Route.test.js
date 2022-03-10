/* eslint-disable max-lines-per-function */
import { Route } from "../Route";

describe("Routing", () => {
	let route;
	const ROUTE_1 = "/route-1";
	const ROUTE_2 = "/route-2";

	describe("init", () => {
		beforeAll(() => {
			route = new Route();
		});

		afterAll(() => {
			route = undefined;
		});

		it("must have default path", () => {
			expect(route.defaultPath).not.toBe(undefined);
			expect(route.defaultPath).toBe("/");
		});

		it("must have current path", () => {
			expect(route.currentPath).not.toBe(undefined);
			expect(route.currentPath).toBe("/");
		});

		it("must have add method", () => {
			expect(route.add).not.toBe(undefined);
			expect(typeof route.add).toBe("function");
		});

		it("must have change method", () => {
			expect(route.change).not.toBe(undefined);
			expect(typeof route.change).toBe("function");
		});

		it("must have back method", () => {
			expect(route.back).not.toBe(undefined);
			expect(typeof route.back).toBe("function");
		});
	});

	describe("usage", () => {
		let fn1;
		let fn2;

		beforeEach(() => {
			fn1 = jest.fn(() => {});
			fn2 = jest.fn(() => {});
			route = new Route({ default: ROUTE_1 });

			route.add(ROUTE_1, fn1);
			route.add(ROUTE_2, fn2);

			route.apply();
		});

		afterEach(() => {
			fn1 = undefined;
			fn2 = undefined;
			route = undefined;
		});

		it("must redirect to default path", () => {
			window.dispatchEvent(new Event("load"));
			const currPath = window.location.pathname;

			expect(currPath).toBe(ROUTE_1);
		});

		it("must change route", () => {
			route.change(ROUTE_2);
			const currPath = window.location.pathname;

			expect(currPath).toBe(ROUTE_2);
		});

		it("must call act on url-change", () => {
			route.change(ROUTE_2);

			expect(fn2.mock.calls[0].length).toBe(1);
		});

		it("must go back", () => {
			route.change(ROUTE_1);
			route.change(ROUTE_2);

			route.back();

			const currPath = window.location.pathname;

			expect(currPath).toBe(ROUTE_1);
			expect(route.currentPath).toBe(ROUTE_1);
			expect(fn1.mock.calls[0].length).toBe(1);
		});
	});
});
