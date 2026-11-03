# Rogers Hitron CODA

**Rogers Hitron CODA** 集成通过检查连接到 [Rogers Hitron CODA](https://www.rogers.com/customer/support/article/wi-fi-password-hitron-coda4582-cgn3amr-cgnm3552-cgn3acr-cgn3) 或 [Shaw Hitron CGNM](https://community.shaw.ca/docs/DOC-4066) 路由器的设备来实现在家状态检测。

如需在您的安装中使用 Hitron 路由器，请将以下内容添加到 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
device_tracker:
  - platform: hitron_coda
    host: !secret router_ip
    username: !secret router_username
    password: !secret router_password
    type: rogers
```

```yaml
host:
  description: 路由器的 IP 地址，例如 `192.168.0.1`。
  required: true
  type: string
username:
  description: 登录路由器的用户名（该用户应具有路由器 Web 界面的读取权限）。通常为 "cusadmin"。
  required: true
  type: string
password:
  description: 指定用户名对应的密码。通常为您的 Wi-Fi 密码。
  required: true
  type: string
type:
  description: 调制解调器的网络供应商；"rogers" 或 "shaw"。默认为 "rogers"。
  required: false
  type: string
```

有关如何配置要跟踪的人员，请参阅 [device tracker 集成页面](/home-assistant/integrations/device_tracker/index.md)。
