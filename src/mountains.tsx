import { Hono } from "hono";
import { mountains } from "./lib/mountains";
import { MountainSelectPage } from "./views/mountains";

const mountainsRoute = new Hono();

mountainsRoute.get("/", (c) => {
  return c.html(<MountainSelectPage mountains={mountains} />);
});

export default mountainsRoute;
