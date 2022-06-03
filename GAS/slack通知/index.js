// bodyにnameを設定してPOSTする

function doPost(e) {
  const props = PropertiesService.getScriptProperties().getProperties();
  const SLACK_NOTIFY_CHANNEL_URL = props.SLACK_NOTIFY_CHANNEL_URL

  let name = 'guest';

  if (e && e.postData) {
    const body = JSON.parse(e.postData.getDataAsString())
    name = body.name || 'guest'
  }

  const message = 'hello! ' + name + '!'

  const payload = JSON.stringify({ "text" : message });

  var options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(SLACK_NOTIFY_CHANNEL_URL, options);
}