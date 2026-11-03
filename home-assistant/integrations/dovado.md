# Dovado

**Dovado** 集成管理与 [Dovado](https://www.dovado.com/) 路由器的通信。

目前 Home Assistant 支持以下设备类型：

* [通知](/home-assistant/integrations/dovado/index.md#notifications)
* [传感器](/home-assistant/integrations/dovado/index.md#sensor)

要将 Dovado 集成添加到您的安装中，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
dovado:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

```yaml
username:
  description: 您的 Dovado 用户名。
  required: true
  type: string
password:
  description: 您的 Dovado 密码。
  required: true
  type: string
host:
  description: 您路由器的 IP 地址。
  required: false
  type: string
  default: Home Assistant 的默认网关
port:
  description: 您路由器的端口号。
  required: false
  type: integer
  default: 6435
```

## 通知

`dovado` 通知平台允许您从 [Dovado](https://www.dovado.com/) 路由器发送短信（如果支持）。

要将 Dovado 集成添加到您的安装中，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
notify:
  - platform: dovado
```

### 使用

这是一个通知平台，因此可以通过调用通知动作来控制，[如所述](/home-assistant/integrations/notify/index.md)。它将向通知 **target** 中的单个电话号码发送短信通知。

```yaml
# Example automation notification entry
automation:
  - alias: "The sun has set"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: notify.dovado
        data:
          message: "The sun has set"
          target: "+14151234567"
```

## 传感器

`dovado` 传感器平台让您监控 [Dovado](https://www.dovado.com/) 路由器。

要将 Dovado 传感器添加到您的安装中，请将以下内容添加到您的 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dovado
    sensors:
      - network
```

```yaml
sensors:
  description: 要在前端显示的条件。仅接受此处列出的值。
  required: true
  type: list
  keys:
    network:
      description: 创建网络状态传感器（3G、4G 等）。
    signal:
      description: 创建信号强度传感器。
    download:
      description: 创建下载速度传感器。
    upload:
      description: 创建上传速度传感器。
    sms:
      description: 创建未读短信数量传感器。
```
