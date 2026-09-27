# Synology SRM

此集成允许您通过检查连接到 [Synology SRM](https://www.synology.com/srm) 路由器的设备来检测在家状态。

## 配置

要在您的安装中使用这个设备追踪器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
device_tracker:
  - platform: synology_srm
    host: 192.168.1.254
    password: YOUR_ADMIN_PASSWORD
```

```yaml
host:
  description: Synology SRM 路由器的主机名或 IP 地址，例如 `192.168.1.1` 或 `router.mydomain.local`
  required: true
  type: string
port:
  description: 连接到 Synology SRM 路由器的端口。
  required: false
  default: 8001
  type: integer
username:
  description: 具有管理员权限的用户名。
  required: false
  default: admin
  type: string
password:
  description: 您所提供管理员账户的密码。
  required: true
  type: string
ssl:
  description: 使用 HTTPS 而不是 HTTP 进行连接。
  required: false
  default: true
  type: boolean
verify_ssl:
  description: 启用或禁用 SSL 证书验证。
  required: false
  default: false
  type: boolean
```

有关在 SRM 上创建多个管理员账户的说明，请参阅 [Synology Knowledge Center](https://kb.synology.com/en-id/SRM/tutorial/Create_multiple_administrator_accounts_on_Synology_Router)。

已知受支持的型号列表：

* RT1900ac
* RT2600ac
* MR2200ac
* RT6600ax

有关如何配置要追踪的人员，请参阅 [device tracker 集成页面](/home-assistant/integrations/device_tracker/index.md)。
