# ドリンクカウンター

## 概要
バーで自分と相手（接客スタッフ）が何杯飲んだかをカウントするWebアプリ。

## 技術スタック
- React 18
- Vite
- CSS（素のCSS、CSSモジュールなし）

## ディレクトリ構成
```
src/
├── App.jsx          # メインコンポーネント
├── App.css          # スタイル
└── main.jsx         # エントリーポイント
```

## コーディング規約
- コンポーネントはアロー関数で書く
- スタイルはApp.cssにまとめる
- コメントは日本語OK

## よく使うコマンド
- `npm run dev`   : 開発サーバー起動（http://localhost:5173）
- `npm run build` : 本番ビルド
- `npm run preview`: ビルド結果を確認

## 次回やること：PWA化
このWebアプリをスマホのホーム画面に追加できるPWAに変換する。

手順：
1. `vite-plugin-pwa` をインストール
2. `vite.config.js` にPWAプラグインを設定
3. アイコン画像を用意して `manifest.json` を設定
4. `npm run build` でビルド
5. VercelかNetlifyに無料デプロイ
6. iPhoneのSafariで開いて「ホーム画面に追加」

参考：CapacitorでApp Store向けネイティブアプリにする選択肢もある。
