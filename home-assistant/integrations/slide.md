# Slide

**Slide** 集成允许您使用[官方 API](https://documenter.getpostman.com/view/6223391/S1Lu2pSf?version=latest)，在 Home Assistant 中接入 [slide.store](https://slide.store/) 设备。

### 配置

要在您的安装中使用 Slide 集成，请将其添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
slide:
  username: YOUR_SLIDE_APP_USERNAME
  password: YOUR_SLIDE_APP_PASSWORD
```

```yaml
username:
  description: 登录 Slide 应用所需的用户名。
  required: true
  type: string
password:
  description: 登录 Slide 应用所需的密码。
  required: true
  type: string
scan_interval:
  description: "两次更新之间的最小时间间隔。"
  required: false
  default: 30 seconds
  type: integer
invert_position:
  description: 反转位置百分比。
  required: false
  default: false
  type: boolean
```
