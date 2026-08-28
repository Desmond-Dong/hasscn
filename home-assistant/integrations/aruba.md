# Aruba

此集成允许您通过查看连接到 [Aruba Instant](https://www.arubanetworks.com/products/networking/aruba-instant/) 设备的设备来检测存在。

支持的设备（已测试）：

* Aruba AP-105
* Aruba AP-205
* Aruba AP-505
* Aruba AP-515
* Aruba IAP-315
* Aruba IAP-335
* Aruba Instant IAP-275

:::important
此设备跟踪器需要在路由器上启用 telnet。

:::
要在您的安装中使用此设备跟踪器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: aruba
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

```yaml
host:
  description: 您路由器的 IP 地址，例如 `192.168.1.1`。
  required: true
  type: string
username:
  description: 具有管理权限的用户的用户名，通常是 `admin`。
  required: true
  type: string
password:
  description: 您给定管理员账户的密码。
  required: true
  type: string
```

有关如何配置要跟踪的人员的说明，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/index.md)。
