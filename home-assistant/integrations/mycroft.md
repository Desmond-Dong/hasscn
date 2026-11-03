# Mycroft

[Mycroft](https://mycroft.ai) 是一款开源语音助手，可让您从 Home Assistant 向 Mycroft 发送通知等内容。

Home Assistant 目前支持以下设备类型：

* **通知** - 允许将通知从 Home Assistant 发送到 [Mycroft AI](https://mycroft.ai/)。

## 配置

要在您的安装中使用 Mycroft，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mycroft:
  host: 0.0.0.0
```

```yaml
host:
  description: 您的 Mycroft 实例的 IP 地址。
  required: true
  type: string
```

## 使用通知

要使用 Mycroft 发送通知，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
notify:
  - platform: mycroft
    name: mycroft
```

```yaml
name:
  description: 您的 Mycroft 实例的友好名称。
  required: true
  type: string
```

## 示例

通过调用 `notify.mycroft` 操作向 Mycroft 发送消息：

```yaml
message: "Hey Mycroft. Turn on the office light. "
```
