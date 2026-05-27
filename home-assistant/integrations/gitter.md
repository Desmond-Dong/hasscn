# Gitter

**Gitter** 集成可让您监控 [Gitter.im](https://gitter.im) 聊天室中的未读消息。

## 配置

访问 [Gitter Developer Apps](https://developer.gitter.im/apps) 获取您的“Personal Access Token”。

若要在您的安装中使用 Gitter 集成，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: gitter
    api_key: YOUR_API_TOKEN
```

```yaml
api_key:
  description: 您的 Gitter.im API 令牌。
  required: true
  type: string
room:
  description: 要监控的 Gitter 房间。
  required: false
  type: string
  default: "`home-assistant/home-assistant`"
```
