# BlinkStick

**BlinkStick** 集成允许您从 Home Assistant 内控制您的 [Blinkstick](https://www.blinkstick.com/) 灯光。

## 设置

要使用您的 Blinkstick，您需要允许[非 root 用户](https://github.com/arvydas/blinkstick-python#permission-problems-in-linux-and-mac-os-x)访问设备。

```bash
sudo blinkstick --add-udev-rule
```

## 配置

要将 Blinkstick 添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
light:
  - platform: blinksticklight
    serial: BS000795-1.1
```

```yaml
serial:
  description: 您的设备序列号。
  required: true
  default: 640
  type: string
name:
  description: 设备的名称。
  required: false
  type: string
  default: Blinkstick
```
