const props = PropertiesService.getScriptProperties().getProperties();
const SEND_GRID_ENDPOINT = props.SEND_GRID_ENDPOINT
const SEND_GRID_API_KEY = props.SEND_GRID_API_KEY
const FROM_MAIL_ADDRESS = props.FROM_MAIL_ADDRESS

// フォーム送信時発火
function onFormSubmit(e) {

  //* 回答群を取得
  let itemResponse = e.response.getItemResponses();
  let message = ''
  let name = ''
  let email = ''

  for (let j = 0; j < itemResponse.length; j++) {
    let formData = itemResponse[j];
    let question = formData.getItem().getTitle();
    let answer = formData.getResponse();

    message += question + ': ' + answer + '\n';

    if (question === 'お名前') name = answer
    if (question === 'メールアドレス') email = answer
  }

  // 返信メール送信
  if (email) sendMail(email, name)
}


// 資料請求返信メール送信
function sendMail(to, name) {
  const params = {
    "personalizations": [
      {
        "to": [{ "email": to}],
        "subject": 'お問合せいただきありがとうございます。'
      }
    ],
    "from": {
      "email": FROM_MAIL_ADDRESS,
      "name" : 'お問合せサポート'
    },
    "content": [
      {
        "type": "text/plain",
        "value":
          name + ' 様' + '\n'
        + '\n'
        + 'お問合せサポートです。' + '\n'
        + '\n'
        + 'この度は資料請求ありがとうございます。' + '\n'
        + '下記のリンクよりダウンロードください。' + '\n'
        + 'https/xxxx' + '\n'
        + '\n'
        + 'お気軽にご連絡ください。' + '\n'
        + '\n'
        + 'よろしくお願いいたします。' + '\n'
        + '---' + '\n'
        + 'お問合せサポート'
      }
    ]
  }

  const payload = JSON.stringify(params);
  UrlFetchApp.fetch(SEND_GRID_ENDPOINT, {
    method: 'POST',
    headers: { "Content-Type": 'application/json',
              "Authorization": "Bearer "+SEND_GRID_API_KEY},
    payload: payload
  });
}