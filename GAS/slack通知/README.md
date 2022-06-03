# GASからslack通知
## 全体の流れ
- POSTされて起動
- slackに「hello! [name]!」と通知する
## 前準備
- 通知先のチャンネル作成
- slack appを作成
- Incoming Webhooksで作成したチャンネルへのWebhook URLを作成しておく
- 作成されたURLをGASのプロパティに設定しておく（環境変数化）
  - プロジェクトの設定 -> スクリプト プロパティを追加
  - key: SLACK_NOTIFY_CHANNEL_URL
  - value: xxxxxxxx
## 利用方法
- webアプリとしてデプロイ
- アクセスできるユーザーを全員にする
  - どこからでもurlにPOSTできるので、必要であればAPIキーなどで認証する
- 発行されたurlに対してPOSTする