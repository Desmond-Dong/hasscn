# Facebook Messenger

**Facebook Messenger** 集成可通过 [Facebook](https://facebook.com) 提供支持，使用 Facebook Messenger 发送通知。

要在您的安装中使用此通知集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: facebook
    page_access_token: FACEBOOK_PAGE_ACCESS_TOKEN
```

```yaml
page_access_token:
  description: "您的 Facebook 页面访问令牌。更多信息请参阅 [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform/webhooks)。"
  required: true
  type: string
name:
  description: 设置可选参数 `name` 后，可以创建多个通知器。该通知器会绑定到 `notify.NOTIFIER_NAME` 动作。
  required: false
  default: "`notify`"
  type: string
```

### 用法

通过 Facebook 通知动作，您可以借助自己的 Facebook 页面将通知发送到 Facebook Messenger。为此，您需要创建一个 [Facebook 页面和 App](https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start)。您可以按照[这里的说明](/home-assistant/integrations/notify/index.md)调用通知动作。它会代表您的页面，将消息发送给 **target** 中指定的用户。更多信息请参阅[快速入门指南](https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start)。

**target** 中使用的电话号码必须已注册 Facebook Messenger。接收者的电话号码应采用 `+1(212)555-2368` 这样的格式。如果您的应用尚未通过 Facebook 审核，则接收者必须是该 Facebook 应用的管理员、开发者或测试者之一。有关电话号码的更多信息，请参阅[这里](https://developers.facebook.com/docs/messenger-platform/reference/send-api#phone_number)。

```yaml
# Example automation notification entry
automation:
  - alias: "Evening Greeting"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: notify.facebook
        data:
          message: "Good Evening"
          target:
            - '+919413017584'
            - '+919784516314'
```

您也可以向那些未在 Facebook 上保存电话号码的用户发送消息，但这需要多做一些配置。Messenger 平台使用的是页面专属用户 ID，而不是全局用户 ID。您需要在 Facebook 开发者控制台中为 "messages" 事件启用 webhook。当用户向页面发送消息后，该 webhook 就会在请求负载中收到该用户的页面专属 ID。下面是一个简单的 PHP 脚本，它会对消息 "get my id" 作出响应，并回复包含该用户 ID 的消息：

```php
<?php

$access_token = "";
$verify_token = "";

if (isset($_REQUEST['hub_challenge'])) {
    $challenge        = $_REQUEST['hub_challenge'];
    $hub_verify_token = $_REQUEST['hub_verify_token'];

    if ($hub_verify_token === $verify_token) {
        echo $challenge;
    }
}

$input   = json_decode(file_get_contents('php://input'), true);
$sender  = $input['entry'][0]['messaging'][0]['sender']['id'];
$message = $input['entry'][0]['messaging'][0]['message']['text'];

if (preg_match('/get my id/', strtolower($message))) {
    $url      = 'https://graph.facebook.com/v2.10/me/messages?access_token=' . $access_token;
    $ch       = curl_init($url);
    $jsonData = '{
        "recipient":{
            "id":"' . $sender . '"
        },
        "message":{
            "text":"Your ID: ' . $sender . '"
        }
      }';

    $jsonDataEncoded = $jsonData;
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    if (!empty($input['entry'][0]['messaging'][0]['message'])) {
        $result = curl_exec($ch);
    }
}

```

### 富消息

您还可以发送富消息，比如卡片、按钮、图片、视频等。有关支持哪些消息类型以及如何构建它们，请参阅[这里](https://developers.facebook.com/docs/messenger-platform/reference/send-api)。

```yaml
# Example script with a notification entry with a rich message

script:
  test_fb_notification:
    sequence:
      - action: notify.facebook
        data:
          message: Some text before the quick replies
          target: 0034643123212
          data:
            quick_replies:
              - content_type: text
                title: Red
                payload: DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED
              - content_type: text
                title: Blue
                payload: DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_BLUE
```
