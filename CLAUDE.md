# sharibatezu

## プロジェクト概要

日本百名山を登る際に必要なエネルギー量（消費カロリー）を計算するWebアプリ。
ユーザーが体重・登山する山を選択すると、登山に必要な消費カロリーを算出する。

このプロジェクトはTypeScript・Hono・Cloudflareの学習を兼ねている。

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Hono
- **ランタイム**: Cloudflare Workers
- **フロントエンド**: Hono JSX（SSR）
- **パッケージマネージャー**: npm
- **インフラ**: Cloudflare（無料枠を最大限活用）

## ディレクトリ構成

```
sharibatezu/
├── CLAUDE.md
├── docs/
│   ├── spec.md          # 機能仕様
│   └── architecture.md  # アーキテクチャ設計
├── src/
│   ├── index.ts         # Honoエントリーポイント
│   ├── routes/          # ルーティング
│   ├── lib/             # 計算ロジック・ユーティリティ
│   └── data/            # 百名山静的データ（JSON）
├── wrangler.toml        # Cloudflare Workers設定
└── package.json
```

## 作業ルール

- `git push` は必ずユーザーの確認を取ってから行う
- `git commit` は必ずユーザーの確認を取ってから行う
- `git merge` は必ずユーザーの確認を取ってから行う

## コーディング規約

- 型定義は明示的に行い、`any` は使用しない
- 計算ロジックはルートハンドラから分離し `src/lib/` に置く
- 百名山データは静的JSONとして `src/data/` に管理する（DBコスト不要）

## 詳細ドキュメント

- 環境構築手順 → `docs/setup.md`
- 機能仕様 → `docs/spec.md`
- アーキテクチャ設計 → `docs/architecture.md`
