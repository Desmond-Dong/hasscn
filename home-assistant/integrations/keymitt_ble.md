# Keymitt MicroBot Push

此集成可让您在本地控制 MicroBot Push（此前由 Naran 生产，现归入 Keymitt 品牌）。

### 前提条件

要使用此集成，运行 Home Assistant 的设备必须已正确设置并启用 [Bluetooth](/home-assistant/integrations/bluetooth.md)。不需要 Naran/Keymitt 集线器。

在将设备添加到 Home Assistant 之前，需要先让设备进入配对模式。要重置 MicroBot Push，请先关闭设备，再重新打开，并在 LED 呈红色时立即按住按钮。约 5 秒后，LED 会快速闪烁，此时松开按钮。如果已成功进入配对模式，LED 会闪烁蓝灯。

如果您有多个设备，则需要知道目标设备的 BTLE MAC 地址，以便区分它们。

请注意，要让此集成正常工作，设备不能继续与 MicroBot 应用保持配对。它们必须仅与 Home Assistant 配对。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 支持的设备

此集成仅适用于 MicroBot Push，不支持 Keymitt 锁。

### 操作：校准

`keymitt_ble.calibrate` 操作用于在本地设置 MicroBot Push 的按压深度、持续时间和模式。

请注意：执行该操作后，推杆会根据所定义的模式伸出或收回。设备会演示模式和深度，但不会演示持续时间。不过，该设置会被保存，您可以通过手动操作设备进行确认。

| 数据属性 | 必需 | 说明 |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `depth`                | yes      | 推杆伸出的距离百分比。 |
| `duration`             | yes      | 推杆保持伸出状态的持续时间，单位为秒。 |
| `mode`                 | yes      | `Normal` - 伸出后收回推杆。 |
|                        |          | `Invert` - 先收回再伸出推杆。 |
|                        |          | `Toggle` - 在伸出和收回之间切换。 |

### 错误代码与故障排除

启用且正常运行 [Bluetooth](/home-assistant/integrations/bluetooth.md) 集成后，此集成会自动发现设备。

由于设备在长时间无活动后会进入深度睡眠，因此在极端情况下响应时间可能长达一分钟，不过通常会快得多。

<details>
<summary>配对失败</summary>

请确认设备已通电、在蓝牙范围内，并且处于配对模式。按一下 MicroBot Push 上的按钮，使其退出深度睡眠，也可能会有帮助。

</details>

<details>
<summary>未找到未配置设备</summary>

请确认设备已通电、在蓝牙范围内，并且处于配对模式。按一下 MicroBot Push 上的按钮，使其退出深度睡眠，也可能会有帮助。

</details>
