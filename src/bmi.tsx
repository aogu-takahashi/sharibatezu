import { Hono } from "hono";
import { calculateBmi } from "./lib/bmi";
import { BmiFormPage, BmiResultPage, BmiErrorPage } from "./views/bmi";

const bmi = new Hono();

bmi.get("/", (c) => {
  return c.html(<BmiFormPage />);
});

bmi.post("/calculate", async (c) => {
  const body = await c.req.parseBody();
  const weightKg = Number(body.weight);
  const heightCm = Number(body.height);

  if (isNaN(weightKg) || isNaN(heightCm) || weightKg <= 0 || heightCm <= 0) {
    return c.html(<BmiErrorPage />, 400);
  }

  const result = calculateBmi({ weightKg, heightCm });

  return c.html(<BmiResultPage bmi={result.bmi} category={result.category} />);
});

export default bmi;
