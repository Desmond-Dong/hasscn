# Edimax

此 **Edimax** 集成允许您控制 [Edimax](https://www.edimax.com/edimax/merchandise/merchandise_list/data/edimax/global/home_automation_smart_plug/) 开关的状态。

要在您的系统中使用 Edimax 开关，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: edimax
    host: 192.168.1.32
```

```yaml
host:
  description: "您的 Edimax 开关的 IP 地址，例如 `192.168.1.32`。"
  required: true
  type: string
username:
  description: 您的 Edimax 开关用户名。
  required: false
  default: admin
  type: string
password:
  description: 您的 Edimax 开关密码。
  required: false
  default: 1234
  type: string
name:
  description: 显示此开关时使用的名称。
  required: false
  default: Edimax Smart Plug
  type: string
```
