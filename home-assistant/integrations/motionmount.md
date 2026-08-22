# Vogel's MotionMount

**Vogel's MotionMount** 集成允许您控制 [TVM 7675 Pro](https://www.vogels.com/p/tvm-7675-pro-motorized-tv-wall-mount-black) SIGNATURE MotionMount 的位置。

此集成使用 MotionMount 的以太网（IP）连接，无法通过 RS-232 连接接入。

它会提供支架当前位置的信息，并允许设置新的位置。

一个典型用例是根据是否真的有人在观看电视来调整电视位置。MotionMount 提供了 HDMI 连接来监测电视是否打开，并据此将电视移动到预设位置或上次已知位置。不过，如果您也会把电视用于背景音乐播放，可能并不希望 MotionMount 伸出。通过使用存在传感器来检查电视前方是否真的有人，您可以确保只有在电视被实际观看时 MotionMount 才会伸出。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: 设备的主机名或 IP 地址，例如：`192.168.1.2`。
Port:
  description: 设备的 TCP 端口。默认为 23。只有在您非常确定不应为 23 时才需要修改。
PIN:
  description: 用户级 PIN 码，仅当设备上已配置时需要填写。
```

## 移除此集成

此集成遵循标准集成移除流程，不需要额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 数据更新

MotionMount 会主动向集成推送新数据。
唯一的例外是预设位。预设位的变化通过 polled 获取，默认每 60 秒一次。

## 已知限制

此集成不提供配置 MotionMount 的能力。
所有设置（包括配置预设位）都应通过 MotionMount 应用完成。

仅支持 IP 连接。不支持通过 RS-232 或蓝牙低功耗连接。

## 支持的设备

支持以下设备：

* TVM 7675 Pro (SIGNATURE MotionMount with Pro extension)

## 不支持的设备

以下设备*不*受支持：

* TVM 7675 (SIGNATURE MotionMount without Pro extension)
* TVM 7355 (NEXT MotionMount)

## 支持的功能

### Entities

#### Sensors

* **Moving**
  * **Description**：指示 MotionMount 是否正在移动。

* **Error Status**
  * **Description**：MotionMount 的错误状态。
    * None：没有错误。
    * Motor：与电机通信时出现问题。
    * HDMI CEC：与电视通信时出现问题。请检查 HDMI 线缆。
    * Obstruction：MotionMount 检测到障碍物并停止移动。
    * TV Width Constraint：MotionMount 检测到电视移动得过于靠近墙面，因此停止移动。
    * Internal：发生内部错误。请参考 MotionMount 应用获取支持。

#### Numbers

* **Extension**
  * **Description**：MotionMount 当前距离墙面的伸出长度。

* **Turn**
  * **Description**：MotionMount 当前的旋转角度。

#### Selects

* **Presets**
  * **Description**：如果 MotionMount 当前位于某个预设位置，这里会显示对应的预设。
    可选择任意预设，让 MotionMount 移动到该预设位置。

## 故障排除

### 无法连接到设备

1. 确认设备已通电。
2. 确认设备与 Home Assistant 连接在同一网络中。
3. 确认 MotionMount 的 IP 地址配置正确。
   * 如有疑问，可按住重置按钮约 5 秒执行网络重置。
     * **Result**：LED 会开始缓慢闪烁，这表示网络配置正在重置为使用 DHCP。
     * **Important**：不要按住重置按钮太久（约 10 秒）。按住 10 秒或更长时间会启动恢复出厂设置。恢复出厂设置时 LED 会快速闪烁。
