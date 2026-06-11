# ドリンクカウンター

## 概要
バー・キャバクラ等で自分と相手（接客スタッフ）が何杯飲んだかをカウントするWebアプリ。
看守番犬キャラクターが罵倒コメントで飲みすぎ・奢りすぎを防ぐ。

**2026-05-03にMVPリリース済み**（PWA / Vercel: https://drink-counter.vercel.app ）。
現在はフィードバック収集フェーズ。

## 重要ドキュメント（作業前に必ず参照）
- `docs/SPEC.md`    : 現在の仕様書（画面フロー・キャラ仕様・データ形式）
- `docs/ROADMAP.md` : 今後の計画とフェーズ。**機能追加の優先度判断はこれを基準にする**

## 技術スタック
- React 19 + Vite 8（JavaScript / JSX、TypeScript未使用）
- CSS（素のCSS、CSSモジュールなし）
- vite-plugin-pwa（PWA対応済み）
- Vercel Analytics
- Vercelにデプロイ

## ディレクトリ構成
```
src/
├── App.jsx          # 全コンポーネント集約（単一ファイル構成）
├── App.css          # スタイル
├── index.css        # ベーススタイル
└── main.jsx         # エントリーポイント
docs/
├── SPEC.md          # 仕様書
└── ROADMAP.md       # ロードマップ
```

## コーディング規約
- コンポーネントはアロー関数で書く
- スタイルはApp.cssにまとめる
- コメントは日本語OK

## よく使うコマンド
- `npm run dev`    : 開発サーバー起動（http://localhost:5173）
- `npm run build`  : 本番ビルド
- `npm run preview`: ビルド結果を確認
- `npm run lint`   : ESLint実行

## スラッシュコマンド（.claude/commands/）
- `/ship`        : lint→ビルド→コミット→push→デプロイ確認まで一気通貫
- `/check`       : リリース前の品質チェック（lint・デバッグコード残り・SPEC整合・実機確認リスト）
- `/session-end` : セッション終了処理（docs更新→メモリ記録→未コミット報告）

## 作業の進め方
- 新機能はコンセプトを対話で深掘りしてから実装に入る（岡田さんの希望）
- 仕様を変更したら `docs/SPEC.md` を、計画を変更したら `docs/ROADMAP.md` を更新する
- デプロイはVercelのGit連携: **mainへのpushで本番に自動デプロイされる**（GitHub: jump-mokd/drink-counter）。リリースは `/ship` を使う
