# 環境構築手順

## 必要なツール

| ツール | 推奨バージョン | 用途 |
|--------|--------------|------|
| Deno | v2以上 | 実行環境・パッケージ管理 |

---

## 1. リポジトリのクローン

```bash
git clone https://github.com/aogu-takahashi/sharibatezu.git
cd sharibatezu
```

---

## 2. ローカル開発サーバーの起動

```bash
deno task dev
```

- `http://localhost:8787` でアクセスできる
- ファイルを保存すると自動でリロードされる
- `Ctrl + C` で停止

---

## 3. Cloudflare へのデプロイ

### 3-1. Cloudflare アカウントへログイン

初回のみ必要。

```bash
deno run -A npm:wrangler login
```

ブラウザが開くので、Cloudflare アカウントで認証する。

### 3-2. デプロイ

```bash
deno task deploy
```

デプロイ完了後、`https://sharibatezu.<アカウント名>.workers.dev` でアクセスできる。

---

## 主要コマンド一覧

| コマンド | 内容 |
|----------|------|
| `deno task dev` | ローカル開発サーバー起動 |
| `deno task deploy` | Cloudflare Workers へデプロイ |
| `deno task cf-typegen` | Cloudflare バインディングの型定義を生成 |
| `deno task test` | テストを実行 |

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
├── deno.json
└── tsconfig.json
```

---

## トラブルシューティング

### ポートが競合して `8787` で起動しない

前回のサーバープロセスが残っている場合、`8788` など別ポートで起動する。
一度すべてのターミナルで `Ctrl + C` を押してから再実行する。

### `wrangler login` 後もデプロイできない

Cloudflare ダッシュボードで Workers の利用が有効になっているか確認する。
