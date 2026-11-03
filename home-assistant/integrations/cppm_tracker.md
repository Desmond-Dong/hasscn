# Aruba ClearPass

此集成允许您通过查看连接到 [Aruba Clearpass](https://www.arubanetworks.com/products/security/network-access-control/) 的设备来检测存在。

支持的平台（已测试）：

* Aruba ClearPass 6.7.5

:::important
您必须先在[这里](https://www.arubanetworks.com/techdocs/ClearPass/6.6/Guest/Content/AdministrationTasks1/CreateEditAPIclient.htm)创建一个 API 客户端。

:::
要在您的系统中使用此设备追踪器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: cppm_tracker
    host: clearpass.server.org
    client_id: clearpassapi
    api_key: 00000004qyO513hTdCfjIO2ZWWnmex8QZ5000000000
```

```yaml
host:
  description: "ClearPass 服务器的 IP 地址或主机名，例如 `clearpass.server.com`。"
  required: true
  type: string
client_id:
  description: "API 客户端页面中的客户端 ID。"
  required: true
  type: string
api_key:
  description: "API 客户端页面中的密钥。"
  required: true
  type: string
```

有关如何配置要追踪的人员的说明，请参阅[设备追踪器集成页面](/home-assistant/integrations/device_tracker/index.md)。
