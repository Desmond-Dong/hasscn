# Snooz

将 [SNOOZ](https://getsnooz.com/) 设备集成到 Home Assistant 中。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用且可正常工作的 [Bluetooth](/home-assistant/integrations/bluetooth.md) 集成后，SNOOZ 集成会自动发现设备。

## 支持的设备

* [SNOOZ White Noise Machine](https://getsnooz.com/products/snooz-white-noise-machine)

## 设置

设备被发现后，需要先将其置于配对模式，才能完成设置。

### 进入配对模式

1. 确保设备未连接到移动应用或任何其他蓝牙控制器。
2. 按住电源按钮，直到所有按键开始闪烁（约 5 秒）。

<p class='img'>
  <img src='/home-assistant/images/integrations/snooz/pairing_mode.jpg' alt='Top down view of a SNOOZ White Noise Machine, highlighting the power button.'>
</p>

## 平台

### Fan

设备会以 Fan 实体的形式暴露，并与设备保持持久连接。

风扇速度百分比会映射到设备音量等级。

:::note
低于 10 的速度百分比不会产生区别——它们都会映射为设备上的值 1。

:::

## 操作

### 操作：Transition on

`snooz.transition_on` 操作会在指定时长内平滑过渡到目标音量。如果设备当前已关闭，则过渡会从最低音量开始。

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=snooz.transition_on)

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `duration` | 是 | 过渡到目标音量所需的秒数。 |
| `volume` | 是 | 音量百分比。如未指定，则使用设备当前音量。 |

#### 自动化示例

```yaml
automation:
  - triggers:
      - trigger: time
        at: "04:20:00"
    actions:
      - action: snooz.transition_on
        target:
          entity_id: fan.snooz_abcd
        data:
          volume: 33
          duration: 120
```

### 操作：Transition off

`snooz.transition_off` 操作会在指定时长内将音量平滑降低到最低，然后关闭设备。

:::note
过渡完成后，音量会恢复为过渡开始前的值。

:::
[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=snooz.transition_off)

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `duration` | 是 | 完成过渡所需的秒数。 |

#### 自动化示例

```yaml
automation:
  - triggers:
      - trigger: time
        at: "16:20:00"
    actions:
      - action: snooz.transition_off
        target:
          entity_id: fan.snooz_abcd
        data:
          duration: 120
```
