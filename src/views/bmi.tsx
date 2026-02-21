export function BmiFormPage() {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>BMI計算</title>
      </head>
      <body>
        <h1>BMI計算</h1>
        <form method="post" action="/bmi/calculate">
          <label>
            体重(kg): <input type="number" name="weight" step="0.1" required />
          </label>
          <label>
            身長(cm): <input type="number" name="height" step="0.1" required />
          </label>
          <button type="submit">計算する</button>
        </form>
      </body>
    </html>
  );
}

export function BmiResultPage({
  bmi,
  category,
}: {
  bmi: number;
  category: string;
}) {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>BMI結果</title>
      </head>
      <body>
        <h1>BMI計算結果</h1>
        <p>BMI: {bmi}</p>
        <p>判定: {category}</p>
        <a href="/bmi">戻る</a>
      </body>
    </html>
  );
}

export function BmiErrorPage() {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>入力エラー</title>
      </head>
      <body>
        <h1>入力エラー</h1>
        <p>体重・身長に正しい値を入力してください。</p>
        <a href="/bmi">戻る</a>
      </body>
    </html>
  );
}
