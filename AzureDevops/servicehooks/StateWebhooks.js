function doPost(e) {
  // slack通知先チャンネル設定
  const props = PropertiesService.getScriptProperties().getProperties();
  const SLACK_NOTIFY_CHANNEL_URL = props.SLACK_NOTIFY_CHANNEL_URL

  try {
    if (!e || !e.postData) return

      // body取得
      const body = JSON.parse(e.postData.getDataAsString())

      // イベントタイプチェック（タスク更新のみ受付）
      const resource = body.resource
      const eventType = body.eventType
      if (eventType !== 'workitem.updated') return

      // 各種情報取得
      const revisedBy = resource.revisedBy
      const fields = resource.fields
      const links = resource._links

      // タスク割当に変更がない場合、スキップ
      // if (!fields['System.AssignedTo']) return

      // タスクステータス変更前後の値、タスクURL取得
      const oldValue = fields['System.State'].oldValue || ''
      const newValue = fields['System.State'].newValue || ''
      const taskUrl = links.html.href

      // 変更者の名前
      const revisedUsername = revisedBy.displayName
      const username = revisedUsername.split(' ')[1] + ' ' + revisedUsername.split(' ')[0]

      // タスク名取得
      const taskMessageHtml = body.message.html
      const taskName = taskMessageHtml.match(/\((.+)\)/)[1]

      // 割り当てられた時と解除されたときで、メッセージ生成
      let message = ''
      message =  'タスク「' +  taskName + '」のステータスが、' + username + 'さんによって、「' + newValue + '」に変更されました。\n\n'
      message += 'タスクの内容は<' + taskUrl + '|こちらより>ご確認ください。\n\n'

      // slackにメッセージ送信
      const payload = JSON.stringify({
        "text" : message,
        'parse' : 'none',
        'as_user' : true
      });

      var options = {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload
      };


      UrlFetchApp.fetch(SLACK_NOTIFY_CHANNEL_URL, options);
  } catch (error) {
    // slackにメッセージ送信
    const payload = JSON.stringify({
      "text" : error,
      'parse' : 'none',
      'as_user' : true
    });

    var options = {
      "method" : "post",
      "contentType" : "application/json",
      "payload" : payload
    };

    UrlFetchApp.fetch(SLACK_NOTIFY_CHANNEL_URL, options);
  }
}