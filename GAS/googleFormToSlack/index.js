function sendToSlack(body, channel) {
  var url = '[slack webhook url]';
  var data = { "channel": channel, "username": "googleform", "text": body };
  var payload = JSON.stringify(data);
  var options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": payload
  };
  var response = UrlFetchApp.fetch(url, options);
}

function onFormSubmit(e) {

  //* 回答群を取得
  var itemResponse = e.response.getItemResponses();
  var message = ''

  for (var j = 0; j < itemResponse.length; j++) {
    var formData = itemResponse[j];
    var question = formData.getItem().getTitle();
    var answer = formData.getResponse();

    message += question + ': ' + answer + '\n';
  }

  const body = 'お問い合わせフォーム\n\n'
    + message
  sendToSlack(body, "#channel_name");
}
