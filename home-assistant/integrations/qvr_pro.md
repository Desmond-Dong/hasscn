# QVR Pro

[QVR Pro](https://www.qnap.com/en/software/qvr-pro) 让您可以在 QNAP NAS 上创建独立且可扩展的监控环境。`qvr_pro` 集成可让您在 Home Assistant 中查看 QVR Pro 频道。

目前，此集成仅支持摄像头。

## 配置

要启用 QVR Pro 集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
qvr_pro:
  host: YOUR_HOST
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

```yaml
host:
  description: 可访问 QVR Pro 的 IP 地址。
  required: true
  type: string
username:
  description: 用于访问 QVR 账户的用户名。
  required: true
  type: string
password:
  description: 用于访问 QVR 账户的密码。
  required: true
  type: string
port:
  description: QVR 接受连接的端口。
  required: false
  default: 8080
  type: integer
exclude_channels:
  description: 要排除的频道编号列表，以逗号分隔。
  required: false
  type: list
```

启用 QVR Pro 摄像头平台后，默认会添加所有 QVR Pro 频道。如果您希望排除某些频道，使其不在 Home Assistant 中显示，请参阅 `exclude_channels` 选项。

:::important
QVR Pro 用户必须拥有 Surveillance Management 权限。

:::
