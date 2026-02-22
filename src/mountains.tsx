import { Hono } from "hono";
import { mountains } from "./lib/mountains.ts";
import { MountainSelectPage } from "./views/mountains.tsx";

const mountainsRoute = new Hono();

mountainsRoute.get("/", (c) => {
  return c.html(<MountainSelectPage mountains={mountains} />);
});

export default mountainsRoute;
