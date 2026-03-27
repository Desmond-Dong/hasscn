---
title: SimpliSafe
description: 'SimpliSafe 集成可将 SimpliSafe home security(https://simplisafe.com)（V2 和 V3）系统接入 Home Assistant，并支持多个 SimpliSafe 账户。 本页属于 Home Assistant 中文文档。'
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_category:
  - Alarm
  - Button
  - Lock
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: simplisafe
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - diagnostics
  - lock
  - sensor
ha_dhcp: true
ha_integration_type: hub
---
# SimpliSafe

**SimpliSafe** 集成可将 [SimpliSafe home security](https://simplisafe.com)（V2 和 V3）系统接入 Home Assistant，并支持多个 SimpliSafe 账户。

Home Assistant 目前支持以下设备类型：

- **Alarm control panel**：报告当前报警状态，可用于布防和撤防。
- **CO detector**：报告一氧化碳传感器状态*。
- **Entry sensor**：报告门窗开关传感器状态*。
- **Freeze sensor**：报告防冻传感器温度*。
- **Glass Break Sensor**：报告玻璃破碎传感器状态*。
- **Lock**：报告 `Door Locks`，并可用于锁定和解锁门锁。
- **Motion Sensor**：报告运动检测状态*。
- **Siren**：报告警号状态*。
- **Smoke Detector**：报告烟雾传感器状态*。
- **Smoke+CO Detector**：报告烟雾和一氧化碳传感器状态*。
- **Water Sensor**：报告漏水传感器状态*。

- 传感器状态仅适用于 SimpliSafe V3 系统，并且每 30 秒更新一次，因此 Home Assistant 中显示的信息可能会有延迟。

## SimpliSafe 套餐

SimpliSafe 提供多个[监控套餐](https://support.simplisafe.com/articles/alarm-events-monitoring/what-are-the-service-plan-options/6344794a013ba90af0bce6a4)。所有套餐（包括免费套餐）都应可与此集成配合使用。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 获取授权码

:::important
您必须在 SimpliSafe 账户中启用多因素认证（MFA），下面的说明才能生效。如果没有启用 MFA，您将永远无法收到正确的授权码！

:::
SimpliSafe 通过其 Web 应用对用户进行身份验证。由于技术限制，在添加此集成时需要执行一个手动步骤。有关更详细的说明，请参阅 [`simplisafe-python` 身份验证文档](https://simplisafe-python.readthedocs.io/en/latest/usage.html#authentication)中的第 6 步。

## 操作

### `simplisafe.remove_pin`

移除一个 SimpliSafe PIN（按标签或 PIN 值）。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | -------------------------------- |
| `label_or_pin`         | 否       | 要移除的 PIN 标签或 PIN 值 |

### `simplisafe.set_pin`

设置一个 SimpliSafe PIN。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | -------------------------------------- |
| `label`                | 否       | 在 SimpliSafe UI 中显示的标签 |
| `pin`                  | 否       | 要使用的 PIN 值 |

### `simplisafe.system_properties`

设置一个或多个系统属性。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------------------------------- |
| `alarm_duration`       | 是       | 报警触发后响铃的秒数 |
| `chime_volume`         | 是       | 门铃提示音音量 |
| `entry_delay_away`     | 是       | 系统处于 `away` 状态时，进入后触发前的延迟秒数 |
| `entry_delay_home`     | 是       | 系统处于 `home` 状态时，进入后触发前的延迟秒数 |
| `exit_delay_away`      | 是       | 系统处于 `away` 状态时，离开后触发前的延迟秒数 |
| `exit_delay_home`      | 是       | 系统处于 `home` 状态时，离开后触发前的延迟秒数 |
| `light`                | 是       | 布防时是否显示基站指示灯 |
| `voice_prompt_volume`  | 是       | 基站语音提示音量 |

## 事件

### `SIMPLISAFE_EVENT`

`SIMPLISAFE_EVENT` 事件表示会出现在 SimpliSafe Web 和移动应用时间线中的事件。接收到此类事件时，事件数据会包含以下键：

- `last_event_changed_by`：触发事件的 PIN（如适用）
- `last_event_type`：事件类型
- `last_event_info`：更详细描述该事件的人类可读字符串
- `last_event_sensor_name`：触发事件的传感器名称（如适用）
- `last_event_sensor_serial`：触发事件的传感器序列号（如适用）
- `last_event_sensor_type`：触发事件的传感器类型（如适用）
- `system_id`：该事件所属的系统 ID
- `last_event_timestamp`：接收到该事件时的 UTC 时间戳

例如，当有人按门铃时，会触发一个 `SIMPLISAFE_EVENT` 事件，并带有如下事件数据：

```python
{
    "event_type": "SIMPLISAFE_EVENT",
    "data": {
        "last_event_changed_by": "",
        "last_event_type": "doorbell_detected",
        "last_event_info": "Someone is at your \"Front Door\"",
        "last_event_sensor_name": "Front Door",
        "last_event_sensor_serial": "",
        "last_event_sensor_type": "doorbell",
        "system_id": [systemid],
        "last_event_timestamp": "2021-01-28T22:01:32+00:00"
    },
    "origin": "LOCAL",
    "time_fired": "2021-01-28T22:01:37.478539+00:00",
    "context": {
        "id": "[id]",
        "parent_id": null,
        "user_id": null
    }
}
```

`last_event_type` 可能具有以下值：

- `automatic_test`
- `camera_motion_detected`
- `doorbell_detected`
- `device_test`
- `secret_alert_triggered`
- `sensor_paired_and_named`
- `user_initiated_test`

要使用这些事件构建自动化，请将 `SIMPLISAFE_EVENT` 用作事件触发器，并将 `last_event_type` 作为 `event_data` 条件。
例如，以下配置会在门铃响起时触发：

```yaml
triggers:
  - trigger: event
    event_type: SIMPLISAFE_EVENT
    event_data:
        last_event_type: doorbell_detected
```

### 使用秘密警报处理传感器变化

如果默认的 30 秒轮询间隔对自动化来说过长，您可以使用秘密警报来在传感器触发时接收推送通知。

对于启用了秘密警报的二进制传感器设备，Home Assistant 会自动将其状态设为已触发。然而，由于 Simplisafe 实现秘密警报的方式，您只能在设备被触发时收到推送通知，而无法在恢复正常时收到。清除二进制传感器状态只能通过轮询完成。

如果您希望可靠地判断二进制传感器每次被触发的时刻，请按以下步骤操作：

1. 在 Simplisafe 应用中为该设备启用秘密警报。
2. 记录该设备的序列号。
    - 您可以在设置警报页面左上角看到它。
3. 使用以下事件触发器：

  ```yaml
  triggers:
    - trigger: event
      event_type: SIMPLISAFE_EVENT
      event_data:
          last_event_type: secret_alert_triggered
          last_event_sensor_serial: "abc123xyz"  # Replace with your device's serial number (use lowercase letters)
  ```


### `SIMPLISAFE_NOTIFICATION`

`SIMPLISAFE_NOTIFICATION` 事件表示会出现在 SimpliSafe Web 和移动应用消息区域中的系统通知。接收到此类事件时，事件数据包含以下键：

- `category`：通知类别（例如 `error`）
- `code`：该通知对应的 SimpliSafe 代码
- `message`：通知的实际文本内容
- `timestamp`：通知的 UTC 时间戳

请注意，当 Home Assistant 重启时，凡是在 SimpliSafe Web 或移动应用中仍处于活动状态的通知，都会再次触发 `SIMPLISAFE_NOTIFICATION` 事件。要避免这种情况，可以选择：(a) 在 Web/移动应用中清除这些通知，或 (b) 使用报警控制面板提供的 `clear_notifications` 按钮。
