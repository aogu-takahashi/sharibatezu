import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { calculateBmi } from "./bmi.ts";

describe("calculateBmi", () => {
  it("低体重（BMI < 18.5）を判定する", () => {
    const result = calculateBmi({ weightKg: 50, heightCm: 170 });
    expect(result.bmi).toBe(17.3);
    expect(result.category).toBe("低体重");
  });

  it("普通体重（18.5 ≤ BMI < 25）を判定する", () => {
    const result = calculateBmi({ weightKg: 60, heightCm: 170 });
    expect(result.bmi).toBe(20.8);
    expect(result.category).toBe("普通体重");
  });

  it("境界値 18.5 は普通体重", () => {
    // 18.5 * 1.7^2 = 53.465
    const result = calculateBmi({ weightKg: 53.465, heightCm: 170 });
    expect(result.category).toBe("普通体重");
  });

  it("境界値 25 は肥満（1度）", () => {
    // 25 * 1.7^2 = 72.25
    const result = calculateBmi({ weightKg: 72.25, heightCm: 170 });
    expect(result.category).toBe("肥満（1度）");
  });

  it("肥満（1度）（25 ≤ BMI < 30）を判定する", () => {
    const result = calculateBmi({ weightKg: 80, heightCm: 170 });
    expect(result.bmi).toBe(27.7);
    expect(result.category).toBe("肥満（1度）");
  });

  it("境界値 30 は肥満（2度以上）", () => {
    // 30 * 1.7^2 = 86.7
    const result = calculateBmi({ weightKg: 86.7, heightCm: 170 });
    expect(result.category).toBe("肥満（2度以上）");
  });

  it("肥満（2度以上）（BMI ≥ 30）を判定する", () => {
    const result = calculateBmi({ weightKg: 100, heightCm: 170 });
    expect(result.bmi).toBe(34.6);
    expect(result.category).toBe("肥満（2度以上）");
  });
});
