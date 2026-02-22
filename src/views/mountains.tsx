import type { Mountain } from "../lib/mountains";

export function MountainSelectPage({ mountains }: { mountains: Mountain[] }) {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>山を選択</title>
      </head>
      <body>
        <h1>山を選択</h1>
        <form>
          <label>
            登山する山:
            <select name="mountainId">
              {mountains.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}（{m.prefecture}）
                </option>
              ))}
            </select>
          </label>
          <button type="submit">選択する</button>
        </form>
        <div id="mountain-detail">
          <h2>コース詳細</h2>
          <p>山を選択してください。</p>
        </div>
      </body>
    </html>
  );
}
