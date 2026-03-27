---
title: HTML5 Push Notifications
description: 'HTML5 Push Notifications 集成可让你无论身在世界何处，都能在 Chrome 或 Firefox 中接收推送通知。html5 还支持 Android 上的 Chrome 和 Firefox，从而无需原生应用也能实现接近原生应用的集成体验。'
ha_category:
  - Notifications
ha_release: 0.27
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: html5
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_codeowners:
  - '@alexyao2015'
---
# HTML5 Push Notifications

**HTML5 Push Notifications** 集成可让你无论身在世界何处，都能在 Chrome 或 Firefox 中接收推送通知。`html5` 还支持 Android 上的 Chrome 和 Firefox，从而无需原生应用也能实现接近原生应用的集成体验。

:::important
HTML5 推送通知在低于 16.4 的 iOS 版本上**无法**使用。

:::
### 前提条件 {#requirements}

`html5` 平台只有在满足以下所有条件时才能正常工作：

- 你正在任意桌面平台、ChromeOS 或 Android 上使用 Chrome 和/或 Firefox；或者你已在 iOS 16.4 及以上版本中将 Home Assistant 实例添加到主屏幕。
- 如果你在桌面端使用 Brave，请在地址栏打开 `brave://settings/privacy` 或前往 **设置 > 隐私与安全**，并确保已开启 **Use Google services for push messaging** 选项。
- 你的 Home Assistant 实例可通过 HTTPS 从外部网络访问，或者能够对 Home Assistant 所使用的域名执行其他[域名验证方法](https://support.google.com/webmasters/answer/9008080#domain_name_verification)。
- 如果使用代理，则在注册或注销推送通知时必须禁用 HTTP Basic 认证；之后可以重新启用。
- 你已为 Home Assistant 配置 SSL/TLS。不过不一定非要直接在 Home Assistant 中配置，例如你可以在 Home Assistant 前面运行 NGINX，这样同样可行。证书必须可信（也就是不能是自签名证书）。
- 你愿意在浏览器中授予通知权限。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 设置浏览器 {#setting-up-your-browser}

假设你已经配置好了该平台：

[![Open **User profile** in your Home Assistant instance.](https://my.home-assistant.io/badges/profile.svg)](https://my.home-assistant.io/redirect/profile/)

1. 在[受支持的浏览器](#requirements)中打开 Home Assistant 的 [**用户资料**](https://my.home-assistant.io/redirect/profile/) 页面。
   - 你可以点击上方链接，或在 Home Assistant 中点击侧边栏底部的用户头像缩写进入该页面。
2. 如果你已经满足上方所有[前提条件](#requirements)，你应该会看到 **接收通知** 开关。
   - 如果该开关是灰色的，请确认你当前是通过外部 HTTPS 地址访问 Home Assistant。
   - 另外，也请确认你已经将 [**HTML5 Push Notifications**](https://my.home-assistant.io/redirect/integrations/?domain=html5) 集成添加到 Home Assistant。
3. 打开该开关，并为设备命名。
4. 几秒钟后，系统应会提示你允许来自 Home Assistant 的通知。
5. 如果你同意，这样就设置完成了！

**注意：** 如果你在启用通知时没有收到设备命名提示，请打开配置目录中的 `html5_push_registrations.conf` 文件。你会看到一个刚添加浏览器对应的新条目。将其从 `unnamed device` 改成你自定义的名称，以便后续识别。_不要修改此文件中的其他任何内容！_ 修改后需要重启 Home Assistant。

### 通知实体 {#notifiers}

**HTML5 Push Notifications** 集成会为你已配置的设备添加一个 notify 实体。要发送通知，你可以使用 `notify.send_message` 动作。关于如何在自动化中使用 **HTML5 Push Notifications**，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

<details>
<summary>YAML 配置示例</summary>


```yaml
action: notify.send_message
data:
  title: "Reminder"
  message: "Have you considered frogs?"
  entity_id: notify.my-desktop
```


</details>

### 测试通知 {#testing}

如果前面的设置已成功完成，且你的浏览器已注册，你可以按以下步骤测试通知：

[![Open **Settings** > **Developer tools** > **Actions** in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_services.svg)](https://my.home-assistant.io/redirect/developer_services/)

1. 点击上方的 My 按钮。
2. 在 **动作** 下拉菜单中搜索你的 HTML5 通知动作（`notify.html5`）并选择它。
3. 在数据文本框中输入：`{"message":"hello world"}`，然后点击 **执行动作** 按钮。
4. 如果一切正常，你应该会看到一个弹出通知。

### 用法 {#usage}

`html5` 平台支持标准的通知载荷。不过，它还内置了一些可通过载荷控制的特殊功能。


#### 操作按钮 {#actions}

Chrome 支持通知操作按钮，也就是随通知一起显示的可配置按钮，点击后可以触发 Home Assistant 中的动作。你最多可以发送 2 个操作按钮。

```yaml
message: Anne has arrived home
data:
  actions:
    - action: open
      icon: "/static/icons/favicon-192x192.png"
      title: Open Home Assistant
    - action: open_door
      title: Open door
```

#### 自定义数据 {#data}

你在通知载荷中传入的任意参数，只要不是 HTML5 通知支持的字段（`actions`、`badge`、`body`、`dir`、`icon`、`image`、`lang`、`renotify`、`requireInteraction`、`tag`、`timestamp`、`vibrate`、`priority`、`ttl`、`silent`），都会在[回调事件](#automating-notification-events)中原样返回给你。

```yaml
title: Front door
message: The front door is open
data:
  my-custom-parameter: front-door-open
```

#### 标签 {#tag}

默认情况下，每条发送的通知都会带有一个随机生成的 UUID（v4）作为其 _tag_（唯一标识符）。这个 tag 针对的是通知本身，_不是_ 某个特定目标设备。如果你在通知载荷中自行传入 tag，就可以通过再次发送相同 tag 的通知来替换已有通知。你可以像这样提供 `tag`：

```yaml
title: Front door
message: The front door is open
data:
  tag: front-door-notification
```

这是一个为通知添加 tag 的示例。如果已存在相同 tag 的通知，则不会创建新通知。


```yaml
  - alias: "Push/update notification of sensor state with tag"
    triggers:
      - trigger: state
        entity_id: sensor.sensor
    actions:
      - action: notify.html5
        data:
          message: "Last known sensor state is {{ states('sensor.sensor') }}."
          data:
            tag: "notification-about-sensor"
```


#### 目标设备 {#targets}

如果你在通知载荷中未提供 `target` 参数，通知会发送到 `html5_push_registrations.conf` 中列出的所有已注册目标。你可以像这样提供 `target` 参数：

```yaml
title: Front door
message: The front door is open
target: unnamed device
```

`target` 也可以是一个目标字符串数组，例如：

```yaml
title: Front door
message: The front door is open
target:
  - unnamed device
  - unnamed device 2
```

#### 参数覆盖 {#overrides}

你可以在 `data` 字典中传入[这里](https://developer.mozilla.org/docs/Web/API/ServiceWorkerRegistration/showNotification#Parameters)列出的任意参数。请注意，Chrome 规定图标最大尺寸为 320px × 320px，`badge` 最大尺寸为 96px × 96px，操作按钮图标最大尺寸为 128px × 128px。

#### 跳转 URL {#url}

你可以在 `data` 字典中加入 `url`，以指定点击通知时要打开的链接，例如：

```yaml
title: Front door
message: The front door is open
data:
  url: https://google.com
```

如果没有提供 URL 或操作按钮，与通知交互时会在浏览器中打开你的 Home Assistant。你也可以使用相对 URL 指向 Home Assistant，例如 `/map` 会变成 `https://192.168.1.2:8123/map`。

#### TTL 与优先级 {#ttl-and-priority}

较新的 Android 版本引入了更严格的电池优化，因此通知默认只有在手机处于唤醒状态时才会送达。
`TTL` 和 `priority` 选项可以帮助缓解这个问题。`TTL` 默认值为 `86400s`，`priority` 默认值为 `normal`。
你可以将 `priority` 设为 `normal` 或 `high`，而 `TTL` 可以是任意整数值。

```yaml
title: Front door
message: The front door is open
data:
  ttl: 86400
  priority: high
```

### 清除通知 {#dismiss}

你可以像下面这样使用 `html5.dismiss` 动作来清除通知：

```yaml
target: ['my phone']
data:
  tag: notification_tag
```

如果未提供 target，则会对所有目标清除。
如果未提供 tag，则会清除所有通知。

### 通知事件自动化 {#automating-notification-events}

在单条推送通知的生命周期内，Home Assistant 会向事件总线发出几种不同事件，你可以基于这些事件编写自动化。

常见事件载荷参数如下：

| 参数 | 说明 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `action` | 发送通知时为操作按钮设置的 `action` 键。仅会出现在 `clicked` 事件中。 |
| `data` | 你最初在通知载荷中传入的 `data` 字典，但不包含那些已被加入 HTML5 通知本身的参数（`actions`、`badge`、`body`、`dir`、`icon`、`image`、`lang`、`renotify`、`requireInteraction`、`tag`、`timestamp`、`vibrate`、`silent`）。 |
| `tag` | 通知的唯一标识符。发送通知时可覆盖此值，从而替换已存在的通知。 |
| `target` | 该通知回调对应的目标设备。 |
| `type` | 收到的事件回调类型，可为 `received`、`clicked` 或 `closed`。 |

你可以使用 `target` 参数为单个目标设备编写自动化。若需要更细粒度的控制，可结合 `action` 与 `target`，根据哪个目标点击了哪个操作来执行不同逻辑。

#### `received` 事件 {#received-event}

当设备收到通知时，你会收到名为 `html5_notification.received` 的事件。

```yaml
- alias: "HTML5 push notification received and displayed on device"
  triggers:
    - trigger: event
      event_type: html5_notification.received
```

#### `clicked` 事件 {#clicked-event}

当通知本身或通知操作按钮被点击时，你会收到名为 `html5_notification.clicked` 的事件。被点击的操作按钮会以 `action` 字段出现在 `event_data` 中。

```yaml
- alias: "HTML5 push notification clicked"
  triggers:
    - trigger: event
      event_type: html5_notification.clicked
```

or

```yaml
- alias: "HTML5 push notification action button clicked"
  triggers:
    - trigger: event
      event_type: html5_notification.clicked
      event_data:
        action: open_door
```

#### `closed` 事件 {#closed-event}

当通知被关闭时，你会收到名为 `html5_notification.closed` 的事件。

```yaml
- alias: "HTML5 push notification clicked"
  triggers:
    - trigger: event
      event_type: html5_notification.closed
```

### 让通知在 NGINX 代理下正常工作 {#making-notifications-work-with-nginx-proxy}

如果你在 Home Assistant 前面使用带认证的 NGINX 代理，可能会遇到事件无法正确回传到 Home Assistant 的问题。这是因为认证令牌无法顺利通过代理传递。

要解决这个问题，请在你的 NGINX 站点配置中添加以下 `location`：

```bash
location /api/notify.html5/callback {
    if ($http_authorization = "") { return 403; }
    allow all;
    proxy_pass http://localhost:8123;
    proxy_set_header Host $host;
    proxy_redirect http:// https://;
}
```

这条规则会检查请求是否带有 `Authorization` HTTP 头，并绕过 `htpasswd` 认证（如果你有启用它）。

如果即使加上上述规则后问题仍然存在，可以尝试继续添加以下配置：

```bash
    proxy_set_header Authorization $http_authorization;
    proxy_pass_header Authorization;
```
