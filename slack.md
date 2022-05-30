# slack 使い方

## リマインダー
### 基本形
- `/remind [宛先] [リマインド内容] [いつ]`
### 使用例
- 今日の9時に自分にリマインド
  - `/remind me ご飯の時間です。 9:00`
- 毎週月曜日9時にリマインド
  - `/remind me ご飯の時間です。 every Monday at 9am`
- 平日にリマインド
  - `/remind me ご飯の時間です。 every weekday at 9am`
- 2週間ごとにリマインド
  - `/remind me ご飯の時間です。 every two weeks at 9am`
- 毎月1日にリマインド
  - `/remind me ご飯の時間です。 on the 1st of every month at 9am`

## webhook URL発行
- [slack apps](https://api.slack.com/apps)
- create new app
  - app name
  - 追加するワークスペースを選択
  - feature - incoming webhooks - activate
  - add new webhook to workspace
  - select channel
- URLが発行されるため、それに対してPOSTする
- `curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/XXXXXX/YYYYY/ZZZZ`