export type BmiInput = {
  weightKg: number;
  heightCm: number;
};

export type BmiResult = {
  bmi: number;
  category: string;
};

export function calculateBmi(input: BmiInput): BmiResult {
  const { weightKg, heightCm } = input;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: string;
  if (bmi < 18.5) {
    category = "低体重";
  } else if (bmi < 25) {
    category = "普通体重";
  } else if (bmi < 30) {
    category = "肥満（1度）";
  } else {
    category = "肥満（2度以上）";
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
  };
}
