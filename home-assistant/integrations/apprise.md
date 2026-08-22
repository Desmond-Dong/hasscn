# Apprise

[Apprise 服务](https://github.com/caronc/apprise/)是一个一体化方案，可将 Home Assistant 接入几乎所有通知平台（如 Amazon SNS、Discord、Telegram、Slack、MSTeams、Twilio 等）。

## 配置

要使用 Apprise 支持的通知，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 使用 URL 的示例 configuration.yaml 条目
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    url: YOUR_APPRISE_URLS
```

您还可以预先定义自己的配置文件，并将其存储在远程或本地位置。只需使用 `config` 选项。

```yaml
# 使用外部定位的 Apprise 配置文件/站点的示例 configuration.yaml 条目：
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    config: YOUR_APPRISE_CONFIG_URLS
```

您可定义任意数量的 URL 或 Apprise 配置位置，也可以同时使用这两项：

```yaml
# 使用所有选项的示例 configuration.yaml 条目
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    config: YOUR_APPRISE_CONFIG_URLS
    url: YOUR_APPRISE_URLS
```

```yaml
name:
  description: 通知器将绑定到动作 `notify.NAME`。
  required: false
  type: string
  default: notify
url:
  description: 一个或多个 Apprise URL。
  required: false
  type: string
config:
  description: 一个或多个 Apprise 配置 URL。
  required: false
  type: string
```

## 示例动作

```yaml
- action: notify.NOTIFIER_NAME
  data:
    message: "来自 Home Assistant 的消息"
```

如果您使用配置文件存储 Apprise URL，还可以将标签与其关联。默认情况下，Home Assistant 中的 Apprise 只会通知未关联标签的项目。您可以根据分配给服务的标签仅通知特定服务，如下所示：

```yaml
- action: notify.NOTIFIER_NAME
  data:
    message: "来自 Home Assistant 的消息"
    target: [
      "tag_name1",
    ]
```

标签 `all` 是保留的，用于绝对通知所有内容，无论您是否将标签与 URL 关联。

## 注意事项

Apprise 支持 50 多种通知服务。每种服务都有可用的专属调优和自定义选项。

* 有关如何构建 URL 的说明，请访问[此处](https://github.com/caronc/apprise/wiki#notification-services)。
* 有关如何自定义自己的 Apprise 配置文件（通过 `config` 指令引用）的说明，请查看以下内容：
  * [文本格式 URL](https://github.com/caronc/apprise/wiki/config_text)
  * [YAML 格式 URL](https://github.com/caronc/apprise/wiki/config_yaml)
