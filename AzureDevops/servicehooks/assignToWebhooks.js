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
      const fields = resource.fields
      const links = resource._links

      // タスク割当に変更がない場合、スキップ
      // if (!fields['System.AssignedTo']) return

      // 割当変更前後の値、タスクURL取得
      const oldValue = fields['System.AssignedTo'].oldValue || ''
      const newValue = fields['System.AssignedTo'].newValue || ''
      const taskUrl = links.html.href

      // タスク名取得
      const taskMessageHtml = body.message.html
      const taskName = taskMessageHtml.match(/\((.+)\)/)[1]

      // 割り当てられた時と解除されたときで、メッセージ生成
      let message = ''
      if (newValue) {
        // ユーザ名を姓名の順に入れ替え
        const username = newValue.split(' ')[1] + ' ' + newValue.split(' ')[0]

        message =  'タスク「' +  taskName + '」が、' + username + 'さんに割り当てられました。\n\n'
        message += 'タスクの内容は<' + taskUrl + '|こちらより>ご確認ください。\n\n'
        message += '確認された場合、:thumbsup:を押してリアクションをお願いします！'
      } else {
        message =  'タスク「' +  taskName + '」のアサインが解除されました。\n\n'
        message += 'タスクの内容は<' + taskUrl + '|こちらより>ご確認ください。'
      }

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