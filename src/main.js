import { Route } from "./libs/Route";
import { routes, rootId } from "./ui/config";
import { getChains, getTemplates, setupRoutes } from "./ui/helpers";

export function main() {
	const route = new Route({ default: routes.HOME });
	const templates = getTemplates(rootId);
	const chains = getChains(route, templates);
	setupRoutes(route, chains);
	route.apply();
}
