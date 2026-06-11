---
description: lint→ビルド→コミット→push→Vercelデプロイ確認まで一気通貫でリリースする
allowed-tools: Bash(npm run lint), Bash(npm run build), Bash(git *), Bash(gh api *), Bash(curl *)
---

drink-counterの変更をリリースする。以下を順番に実行すること。途中で失敗したらそこで停止し、原因を報告する（勝手に先へ進まない）。

## 手順

### 1. 事前チェック
- `git status` で変更内容を確認。変更がなければ「リリースするものがない」と報告して終了
- `npm run lint` を実行。エラーがあれば修正案を提示して停止
- `npm run build` を実行。失敗したら原因を報告して停止

### 2. コミット
- `git diff` で変更内容を把握し、変更の主旨をまとめる
- conventional commits形式（feat/fix/docs/refactor/chore等 + 日本語の説明）でコミットする
- このリポジトリはmainに直接コミットする運用

### 3. push & デプロイ確認
- `git push` でmainにpushする（VercelのGit連携で自動的に本番デプロイされる）
- デプロイ状況を確認する:
  ```
  gh api repos/jump-mokd/drink-counter/deployments --jq '.[0] | {id, sha: .sha[0:7]}'
  gh api repos/jump-mokd/drink-counter/deployments/{id}/statuses --jq '.[0].state'
  ```
  state が `success` になるまで30秒間隔で確認（最大3分。`failure`/`error`なら即報告）
- `curl -s -o /dev/null -w "%{http_code}" https://drink-counter.vercel.app` で本番が200を返すことを確認

### 4. 報告
- コミットハッシュ・変更サマリ・デプロイ結果を報告
- 最後に「スマホ（iPhone Safari / ホーム画面のPWA）での実機確認」を岡田さんにリマインドする
