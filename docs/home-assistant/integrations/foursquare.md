---
title: Foursquare
description: 关于如何将 Foursquare API 集成到 Home Assistant 的说明。
ha_category:
  - Social
ha_release: 0.26
ha_iot_class: Cloud Push
ha_domain: foursquare
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Foursquare** 集成可接收来自 Foursquare [Real-Time API](https://developer.foursquare.com/overview/realtime) 的推送，并提供一个在 Swarm 中为用户签到的动作。

要启用 Foursquare，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
foursquare:
  access_token: "<foursquare access token>"
  push_secret: "<foursquare push secret>"
```

```yaml
access_token:
  description: Foursquare API 访问令牌。
  required: true
  type: string
push_secret:
  description: Foursquare 在应用仪表板中提供给您的推送密钥。
  required: true
  type: string
```

## 获取访问令牌

当您在 [My Apps Page](https://foursquare.com/developers/apps) 上注册应用后，会获得一个 `CLIENT_ID`。同时，您还需要指定一个 `REDIRECT_URL`。它可以是任意 URL，但由于访问令牌会通过 HTTP GET 请求返回，因此这个 URL 应能够忽略 `access_token` 这个 HTTP GET 参数。一个不错的选择是使用您的 Home Assistant URL。

请在浏览器中访问以下地址：

```text
https://foursquare.com/oauth2/authenticate?client_id=CLIENT_ID&response_type=token&redirect_uri=YOUR_REGISTERED_REDIRECT_URI
```

然后将其中的 `CLIENT_ID` 和 `YOUR_REGISTERED_REDIRECT_URL` 替换为您的实际值。

随后，您会看到一个 OAuth 授权页面，询问您是否希望将 Foursquare 账户连接到刚刚创建的应用。请选择 "Yes"。

之后，系统会将您重定向到 `REDIRECT_URL`，并将 `access_token` 作为 HTTP GET 参数附带在 URL 中。复制等号后面的全部内容，并将其作为 `access_token` 粘贴到 `configuration.yaml` 中。

### Real-Time API

该集成会在 `/api/foursquare` 路径上接收来自 Foursquare 的推送。此路由不需要身份验证。

Foursquare 签到事件可以直接用于触发自动化动作，例如：

```yaml
automation:
  - alias: "Trigger action when you check into a venue."
    triggers:
      - trigger: event
        event_type: foursquare.push
    actions:
      - action: script.turn_on
        target:
          entity_id: script.my_action
```

### 签到

要为用户执行签到，请使用 `foursquare/checkin` 动作。

参数：

- **venueId**（*必填*）：用户要签到的 Foursquare 场所 ID
- **eventId**（*可选*）：用户要签到到的事件 ID
- **shout**（*可选*）：关于此次签到的消息。该字段最长 140 个字符
- **mentions**（*可选*）：签到消息中的提及。该参数是一个用分号分隔的提及列表。单个提及的格式为 `start,end,userid`，其中 `start` 是 shout 中提及文本首字符的索引，`end` 是提及文本结束后下一个字符的索引，而 `userid` 是被提及用户的用户 ID。如果 `userid` 以 `fbu-` 开头，则表示该用户是 Facebook 用户 ID。shout 中的字符索引从 0 开始
- **broadcast**（*可选*）：将签到广播给哪些对象。可接受一个逗号分隔的值列表：private（不公开）或 public（与朋友分享）、Facebook（分享到 Facebook）、X（分享到 X）、followers（分享给关注者，仅限名人模式用户）。如果未找到有效值，则默认使用 public
- **ll**（*可选*）：用户所在位置的纬度和经度。仅当您在签到时拥有用户的 GPS 或其他定位设备上报的位置时才需要填写
- **llAcc**（*可选*）：用户经纬度位置的精度，单位为米
- **alt**（*可选*）：用户所在位置的海拔高度，单位为米
- **altAcc**（*可选*）：用户所在位置的垂直精度，单位为米
