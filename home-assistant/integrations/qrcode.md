# QR Code

**QR Code** 集成可从摄像头画面中识别二维码。

要运行此集成，请安装 `zbar-tools`（Ubuntu 18.04）。

## 配置

要启用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
image_processing:
  - platform: qrcode
    source:
      - entity_id: camera.door
```

```yaml
source:
  description: 图像源列表。
  required: true
  type: list
  keys:
    entity_id:
      description: 用于获取图像的摄像头实体 ID。
      required: true
      type: string
    name:
      description: 此参数允许您覆盖 `image_processing` 实体的名称。
      required: false
      type: string
```

## 基本示例

使用此集成的自动化示例如下：

```yaml
automation:
  - alias: "识别二维码并布防报警系统"
    triggers:
      - trigger: state
        entity_id: image_processing.qr_front_door
        to: ARM_QR_CODE_VALUE
    actions:
      - action: alarm_control_panel.alarm_arm_away
        target:
          entity_id: alarm_control_panel.home_alarm
        data:
          code: MY_ALARM_CODE
```
