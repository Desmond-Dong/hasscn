# Cisco Mobility Express

这是一个用于 [Cisco](https://www.cisco.com) Mobility Express 无线控制器的存在检测扫描器。

要在您的系统中使用此设备跟踪器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: cisco_mobility_express
    host: CONTROLLER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

```yaml
host:
  description: 您控制器的 IP 地址，例如 192.168.10.150。
  required: true
  type: string
username:
  description: 具有管理权限的用户名。
  required: true
  type: string
password:
  description: 您指定的管理员账户的密码。
  required: true
  type: string
ssl:
  description: 使用 HTTPS 而不是 HTTP 连接。
  required: false
  type: boolean
  default: false
verify_ssl:
  description: 启用或禁用 SSL 证书验证。如果您有自签名 SSL 证书且尚未安装 CA 证书以启用验证，请设置为 false。
  required: false
  default: true
  type: boolean
```

有关如何配置要跟踪的人员的说明，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/index.md)。
