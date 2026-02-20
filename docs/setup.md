# 環境構築手順

## 必要なツール

| ツール | 推奨バージョン | 用途 |
|--------|--------------|------|
| Node.js | v20以上 | 実行環境 |
| npm | v10以上 | パッケージ管理 |

---

## 1. リポジトリのクローン

```bash
git clone https://github.com/aogu-takahashi/sharibatezu.git
cd sharibatezu
```

---

## 2. 依存パッケージのインストール

```bash
npm install
```

`package.json` に記載された以下のパッケージがインストールされる：

| パッケージ | バージョン | 種別 | 用途 |
|------------|-----------|------|------|
| hono | ^4.12.0 | dependencies | Webフレームワーク |
| wrangler | ^4.4.0 | devDependencies | Cloudflare Workers CLI |

---

## 3. ローカル開発サーバーの起動

```bash
npm run dev
```

- `http://localhost:8787` でアクセスできる
- ファイルを保存すると自動でリロードされる
- `Ctrl + C` で停止

---

## 4. Cloudflare へのデプロイ

### 4-1. Cloudflare アカウントへログイン

初回のみ必要。

```bash
npx wrangler login
```

ブラウザが開くので、Cloudflare アカウントで認証する。

### 4-2. デプロイ

```bash
npm run deploy
```

デプロイ完了後、`https://sharibatezu.<アカウント名>.workers.dev` でアクセスできる。

---

## 主要コマンド一覧

| コマンド | 内容 |
|----------|------|
| `npm run dev` | ローカル開発サーバー起動 |
| `npm run deploy` | Cloudflare Workers へデプロイ |
| `npm run cf-typegen` | Cloudflare バインディングの型定義を生成 |

---

## ディレクトリ構成

```
sharibatezu/
├── CLAUDE.md            # Claude Code 向けプロジェクト概要
├── docs/
│   ├── setup.md         # 本ファイル（環境構築手順）
│   ├── spec.md          # 機能仕様
│   └── architecture.md  # アーキテクチャ設計
├── src/
│   ├── index.ts         # エントリーポイント
│   ├── routes/          # ルートハンドラ
│   ├── lib/             # 計算ロジック
│   └── data/            # 百名山静的データ
├── wrangler.jsonc        # Cloudflare Workers 設定
├── package.json
└── tsconfig.json
```

---

## トラブルシューティング

### ポートが競合して `8787` で起動しない

前回のサーバープロセスが残っている場合、`8788` など別ポートで起動する。
一度すべてのターミナルで `Ctrl + C` を押してから再実行する。

### `wrangler login` 後もデプロイできない

Cloudflare ダッシュボードで Workers の利用が有効になっているか確認する。
