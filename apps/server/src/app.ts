import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import customers from "./routes/customers/customers.index";
import index from "./routes/index.route";
import members from "./routes/organizations/members/members.index";
import organizations from "./routes/organizations/organizations.index";
import tickets from "./routes/tickets/tickets.index";
import users from "./routes/users/users.index";

const app = createApp();

configureOpenAPI(app);

const routes = [
	index,
	users,
	organizations,
	members,
	customers,
	tickets,
] as const;

for (const route of routes) {
	app.route("/v1", route);
}

export type AppType = (typeof routes)[number];

export default app;
