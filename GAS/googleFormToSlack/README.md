# GASからslack通知
## 全体の流れ
- google formを回答
- 回答内容が自動でslack通知
## 前準備
- 通知先のチャンネル作成
- slack appを作成
- Incoming Webhooksで作成したチャンネルへのWebhook URLを作成しておく
## 利用方法
- google form作成
- スクリプトエディタにコードを貼り付け
- webhook urlとチャンネル名を設定
- トリガーを「フォーム送信時」で設定