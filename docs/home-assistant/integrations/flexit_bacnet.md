---
title: Flexit Nordic (BACnet)
description: 关于如何将 Flexit 空气处理设备集成到 Home Assistant 的说明。
ha_category:
  - Climate
ha_release: 2024.1
ha_iot_class: Local Polling
ha_domain: flexit_bacnet
ha_platforms:
  - binary_sensor
  - climate
  - number
  - sensor
  - switch
ha_integration_type: device
ha_codeowners:
  - '@lellky'
  - '@piotrbulinski'
ha_config_flow: true
ha_quality_scale: silver
---

将 [Flexit](https://www.flexit.no/en/) Nordic 系列空气处理设备集成到 Home Assistant。

## 前提条件

您的 Flexit 设备应配备以太网端口，不需要额外的模块。此集成通过以太网使用 BACnet 协议进行通信。

要配置集成，您需要获取设备的 IP 地址和设备 ID。

1. 在手机上打开 Flexit Go 应用。
2. 在主屏幕上，选择 **查找产品** 按钮。
3. 选择您的设备并选择 **连接**。
4. 输入安装人员代码（默认：1000）并选择 **登录**。
5. 前往 **更多** > **安装人员** > **通信** > **BACnet 设置**。
6. 记下 **IP 地址** 和 **设备 ID**。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
IP address:
  description: "Flexit Nordic 设备的 IP 地址。"
Device ID:
  description: "Flexit Nordic 设备的设备 ID。通常为 2。"
```

## 平台

此集成支持以下平台。

### Climate

集成添加了一个气候实体，具有预设通风模式和风扇模式的控制功能。它还有温度状态。

### Sensor

集成添加了传感器实体，显示设备的不同读数。目前支持以下传感器：

 - 室外空气温度
 - 进风温度
 - 排风温度
 - 回风温度
 - 室内温度
 - 壁炉通风剩余持续时间
 - 快速通风剩余持续时间
 - 进风风扇控制信号
 - 进风风扇
 - 排风风扇控制信号
 - 排风风扇
 - 电加热器功率
 - 空气滤网运行时间
 - 热交换器效率
 - 热交换器速度

### Binary sensor

集成添加了一个名为 _空气滤网污染_ 的二元传感器实体，告诉您是否需要更换设备中的滤网。

### Number

集成添加了用于设置各模式下风扇设定点的实体：

 - 离开
 - 在家
 - 壁炉
 - 高速
 - 抽油烟机

集成添加了用于设置剩余时间（分钟）的实体：

 - 壁炉模式运行时间（分钟）

### Switch

集成添加了以下开关：

- _电加热器_ 控制设备中的加热元件。
- _壁炉模式_ 启用或禁用壁炉模式。

### 关于关闭设备的说明
 
Flexit 建议不要让普通用户在界面中访问关闭设备的功能。因此，该功能将来会从集成中移除。

关闭设备的后果可能代价高昂且影响广泛。例如，在冰冻温度下可能会出现冷凝问题，转轮热交换器可能会冻结。

如果您需要关闭设备，请务必采取所有必要的预防措施，例如用防冻风门保护系统。

此外，Flexit 建议在更换滤网之前将设备从电源插座拔下。为防止损坏，在拔下设备之前，请务必从控制面板启动受控关机（或将来从 Home Assistant 中的动作）。

## 数据更新

集成默认每 60 秒从 Flexit 设备 polls 数据一次。此间隔不可配置。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.