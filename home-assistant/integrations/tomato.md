# Tomato

**Tomato** 集成可跟踪连接到运行 [Tomato](https://tomato.groov.pl/) 固件的无线路由器上的设备。

由于 Tomato API 的限制，此集成只能跟踪无线设备。

已确认此集成可与 [FreshTomato](https://freshtomato.org) 2020.8 一起使用，也可能兼容 [AdvancedTomato](https://advancedtomato.com/)。

## 设置

此集成需要一个额外的配置变量 `http_id`。你可以登录 Tomato 管理界面，并在页面源代码中搜索 `http_id` 来获取其值。

## 配置

要在你的安装中使用此设备跟踪器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
device_tracker:
  - platform: tomato
    host: YOUR_ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password:  YOUR_ADMIN_PASSWORD
    http_id: YOUR_HTTP_ID
```

```yaml
host:
  description: "你的路由器的 IP 地址或主机名，例如 `192.168.1.1` 或 `rt-ac68u`。"
  required: true
  type: string
port:
  description: "你的路由器端口号，例如 `443`。"
  required: false
  type: integer
  default: 80/443 (automatically detected)
ssl:
  description: "是否通过 `https` 连接。"
  required: false
  type: boolean
  default: false
verify_ssl:
  description: "如果需要关闭 HTTPS 资源的 SSL 验证（例如自签名证书），可设置为布尔值 `false` 或 `true`，或者传入设备上可用于验证的证书路径，例如 `/mnt/NAS/router_cert.pem`。"
  required: false
  type: [string, boolean]
  default: true
username:
  description: "具有管理权限的用户名，通常为 *admin*。"
  required: true
  type: string
password:
  description: "对应管理员账号的密码。"
  required: true
  type: string
http_id:
  description: "`http_id` 的值。"
  required: true
  type: string
```

有关如何配置要跟踪的人员，请参阅 [device tracker 集成页面](/home-assistant/integrations/device_tracker/index.md)。

## SSL 证书

可以使用以下命令（或类似命令）获取路由器的 SSL 证书：

```bash
openssl s_client -showcerts -connect 172.10.10.1:443 </dev/null 2>/dev/null | openssl x509 -outform PEM > router_cert.pem
```
