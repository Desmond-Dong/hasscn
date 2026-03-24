---
title: QwikSwitch QSUSB
description: 有关如何将 QwikSwitch QSUSB 集线器集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Hub
  - Light
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: '0.20'
ha_codeowners:
  - '@kellerza'
ha_domain: qwikswitch
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**QwikSwitch QSUSB** 集成是将各种 [QwikSwitch](https://www.qwikswitch.co.za/) 设备接入 Home Assistant 的主集成。该集成需要 QSUSB Modem 设备，并连接到 QS Mobile 应用。

目前在 Home Assistant 中支持以下设备类型：

- Binary sensor
- Light
- [Sensor](#qwikswitch-sensors)
- [Switch](#switch)

`qwikswitch` 集成会从 QS Mobile 中发现所有设备。目前，Home Assistant 可发现继电器和 LED 调光器。继电器设备默认作为灯光实体添加，也可以配置为[开关](#switch)。

## 配置

要在您的安装中使用 QwikSwitch 集成，请将其添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
qwikswitch:
   url: http://127.0.0.1:2020
```

```yaml
url:
  description: 包含端口号的 QwikSwitch 集线器 URL。
  required: true
  type: string
dimmer_adjust:
  description: 用于按指数方式调整调光器亮度的小数值。增大此值后，那些在 QS Mobile 中以较低数值就达到满亮度的调光器，在 Home Assistant 中会表现得更线性。建议值为 1 到 2，默认值为 1。
  required: false
  type: float
  default: 1
button_events:
  description: 会生成事件的按钮类型列表，以逗号分隔。详见 [QwikSwitch Events](#qwikswitch-events)。
  required: false
  default: TOGGLE,SCENE EXE,LEVEL
  type: string
switches:
  description: 应作为开关而不是灯光处理的设备 QS_id 列表（例如 `['@0dev01', '@0dev02']`）。
  required: false
  type: list
sensors:
  description: 传感器配置列表。
  required: false
  type: list
  keys:
    name:
      description: 传感器名称，实体 ID 将据此生成。
      required: true
    id:
      description: QS_Id。
      required: true
      type: string
    type:
      description: |
        Qwikswitch 传感器类型，可包括：
        - imod（二进制传感器，最多 6 个通道）
        - door（二进制传感器，单通道）
        - qwikcord（通道 1 = CTavg，通道 2 = CTsum）
      required: true
      type: string
    channel:
      description: 目标通道。请参阅上方的类型说明。
      required: false
      default: 1
      type: integer
    invert:
      description: 反转开/关状态。仅适用于 binary_sensors。
      required: false
      default: false
      type: string
    class:
      description: binary_sensor 的 [class](/home-assistant/integrations/binary_sensor/#device-class)。仅适用于 binary_sensors。
      required: false
      default: door
      type: string
```

### QwikSwitch Events

QwikSwitch 设备（即发射器按钮）会在 Home Assistant 总线上触发事件。随后，这些事件可作为任意 `automation` 动作的触发器，例如：

```yaml
automation:
  - alias: "Action - Respond to A button press"
    triggers:
      - trigger: event
        event_type: qwikswitch.button.@12df34
```

`event_type` 名称应采用 **qwikswitch.button.@_QS_id_** 格式。其中 **@_QS_id_** 会在按下按钮时记录到 Home Assistant 日志中。您也可以在 QS Mobile 应用中获取设备 ID，或访问 `http://127.0.0.1:2020/&listen` 调用 listen API 后按下按钮来获取。

来自 QSUSB API 的完整数据包会作为 `data` 传递。

默认情况下，当 listen 数据包中的 command（cmd）字段值为以下内容时会触发事件：

- `TOGGLE` - 普通 QwikSwitch 发射器按钮
- `SCENE EXE` - QwikSwitch 场景发射器按钮
- `LEVEL` - QwikSwitch OFF 发射器按钮

可通过 **button_events** 配置项为钥匙扣、门磁传感器和 PIR 发射器扩展可识别命令列表。**button_events** 可以是列表，也可以是用逗号分隔的附加命令列表；这些命令都会触发 Home Assistant 事件。默认值为：TOGGLE,SCENE EXE,LEVEL。

在某些 QS Mobile 服务器上，只有已添加到 QS Mobile 应用中的开关才会生成按钮事件，因此最好通过 `/&listen` API 测试按钮按下行为。

### Qwikswitch 传感器

传感器配置是一个列表。根据传感器类型的不同，会创建为 sensor 或 binary_sensor。

传感器配置示例：

```yaml
qwikswitch:
  ...
  sensors:
    - name: door sensor
      id: "@id03"
      type: door
    - name: Imod 1 sensor
      id: "@id02"
      channel: 1
      type: imod
    - name: Imod 2 sensor
      id: "@id02"
      channel: 2
      type: imod
```

### 开关

`qwikswitch` 平台允许您在 Home Assistant 中将 [QwikSwitch](https://www.qwikswitch.co.za/) 继电器作为开关进行控制。

如果设备在 QS Mobile 应用中的名称以 `Switch` 结尾，则会创建为开关；否则会创建为灯光。
