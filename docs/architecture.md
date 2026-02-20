# アーキテクチャ設計書

## 1. 構成概要

```
ブラウザ
  │
  │ HTTP リクエスト
  ▼
Cloudflare Workers（Hono）
  ├── ルーティング
  ├── HTMLレンダリング（Hono JSX）
  └── 計算ロジック（src/lib/）
        └── 百名山データ参照（src/data/mountains.json）
```

外部DBは使用しない。百名山データはビルド時に静的JSONとしてバンドルする。

---

## 2. 技術スタック詳細

| レイヤー | 技術 | 理由 |
|----------|------|------|
| ランタイム | Cloudflare Workers | 無料枠・低レイテンシ・エッジ実行 |
| フレームワーク | Hono | Workers対応・軽量・TypeScript親和性が高い |
| レンダリング | Hono JSX（SSR） | 追加ビルドツール不要でシンプルに構成できる |
| スタイリング | CSS（インライン or 静的ファイル） | 依存最小化 |
| デプロイ | Wrangler CLI | Cloudflare公式ツール |

---

## 3. ディレクトリ構成

```
sharibatezu/
├── CLAUDE.md
├── docs/
│   ├── spec.md
│   └── architecture.md
├── src/
│   ├── index.ts              # Honoエントリーポイント・ルート定義
│   ├── routes/
│   │   └── calculator.ts     # 計算ページのルートハンドラ
│   ├── lib/
│   │   └── energy.ts         # エネルギー計算ロジック
│   └── data/
│       └── mountains.json    # 百名山データ（静的）
├── wrangler.toml
├── package.json
└── tsconfig.json
```

---

## 4. データフロー

```
1. ユーザーがフォームを送信（POST /calculate）
2. Hono ルートハンドラが体重・山IDを受け取る
3. mountains.json から対象の山データを取得
4. src/lib/energy.ts の計算関数を呼び出す
5. 計算結果を Hono JSX でHTMLレンダリングして返す
```

---

## 5. 主要ファイルの役割

### `src/index.ts`

Honoアプリのエントリーポイント。ルートをマウントする。

```typescript
import { Hono } from 'hono'
import { calculatorRoute } from './routes/calculator'

const app = new Hono()
app.route('/', calculatorRoute)

export default app
```

### `src/lib/energy.ts`

計算ロジックのみを担当する純粋関数群。

```typescript
type EnergyInput = {
  weightKg: number;
  elevationGainM: number;
  distanceKm: number;
};

type EnergyResult = {
  totalKcal: number;
  recommendedSupplyKcal: number;
};

export function calculateEnergy(input: EnergyInput): EnergyResult { ... }
```

### `src/data/mountains.json`

百名山の静的データ。ビルド時にバンドルされる。

### `wrangler.toml`

Cloudflare Workers のデプロイ設定。

```toml
name = "sharibatezu"
main = "src/index.ts"
compatibility_date = "2024-01-01"
```

---

## 6. デプロイフロー

```
ローカル開発
  wrangler dev（ローカルプレビュー）
      ↓
コードレビュー・動作確認
      ↓
本番デプロイ
  wrangler deploy
      ↓
Cloudflare Workers にデプロイ完了
```

---

## 7. コスト見積もり

Cloudflare Workers 無料枠：

| リソース | 無料枠 | 想定使用量 |
|----------|--------|------------|
| リクエスト数 | 10万回/日 | 十分 |
| CPU時間 | 10ms/リクエスト | 計算のみなので余裕あり |
| ストレージ | 不使用 | - |

**月額コスト: $0**
