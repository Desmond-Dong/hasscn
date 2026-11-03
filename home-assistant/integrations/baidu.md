# Baidu

**Baidu** 集成使用 [百度 TTS 引擎](https://cloud.baidu.com/product/speech/tts) 以自然的声音朗读文本。

## 配置

要开始使用，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
#示例 configuration.yaml 条目
tts:
  - platform: baidu
    app_id: YOUR_APPID
    api_key: YOUR_APIKEY
    secret_key: YOUR_SECRETKEY
```

```yaml
app_id:
  description: 使用此服务的 App ID，必须在百度上已注册。
  required: true
  type: string
api_key:
  description: 来自百度的 API 密钥。
  required: true
  type: string
secret_key:
  description: 来自百度的秘密密钥。
  required: true
  type: string
speed:
  description: 音频速度，从 0 到 9。
  required: false
  type: integer
  default: 5
pitch:
  description: 音频音调，从 0 到 9。
  required: false
  type: integer
  default: 5
volume:
  description: 音频音量，从 0 到 15。
  required: false
  type: integer
  default: 5
person:
  description: 声音类型。您可以从 0、1、3、4、5、103、106、110 或 111 中选择一个。
  required: false
  type: integer
  default: 0
```

目前，`zh` 是唯一支持的语言，因此是默认值。
