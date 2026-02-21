import { Hono } from "hono";
import bmi from "./bmi";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/bmi", bmi);

export default app;
