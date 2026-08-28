# TP-Link LTE

Home Assistant 的 **TP-Link LTE** 集成可让您通过 TP-Link LTE 路由器发送短信。您需要在 YAML 配置中预先定义电话号码，每个电话号码都会在 Home Assistant 中显示为额外的通知操作。该集成为每个已配置的号码添加一个可用于发送短信的通知操作。仅在 TL-MR6400 v4 上测试过。

该集成提供一个可发送短信的通知操作。

## 配置

要启用该集成，请将以下内容添加到您的 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
tplink_lte:
  - host: IP_ADDRESS
    password: SECRET
    notify:
      - name: sms1
        recipient: "+15105550123"
      - name: sms2
        recipient: "+55520525252"
```

```yaml
host:
  description: 路由器 Web 界面的 IP 地址。
  required: true
  type: string
password:
  description: 用于路由器 Web 界面的密码。
  required: true
  type: string
notify:
  description: 与此特定主机关联的通知目标列表。
  required: false
  type: list
  keys:
    recipient:
      description: 默认收件人的电话号码，或包含多个收件人的列表。
      required: true
      type: [string, list]
    name:
      description: 通知操作的名称。
      required: false
      default: notify
      type: string
```
