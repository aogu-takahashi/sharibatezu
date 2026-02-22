import { Hono } from "hono";
import bmi from "./bmi.tsx";
import mountainsRoute from "./mountains.tsx";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/bmi", bmi);
app.route("/mountains", mountainsRoute);

export default app;
