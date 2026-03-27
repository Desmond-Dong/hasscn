---
title: Prana
description: 'Prana recuperators 集成可让您控制 Prana 热回收设备。您可以管理电机及其工作模式，并监控设备提供的一系列传感器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 2026.2
ha_iot_class: Local Polling
ha_codeowners:
  - '@prana-dev-official'
ha_domain: prana
ha_integration_type: device
related:
  - url: https://prana.ua
    title: Prana
ha_category: []
ha_quality_scale: bronze
ha_platforms:
  - switch
ha_config_flow: true
ha_zeroconf: true
---
# Prana

**Prana recuperators** 集成可让您控制 Prana 热回收设备。您可以管理电机及其工作模式，并监控设备提供的一系列传感器。

使用场景：如果您有一台 Prana 热回收设备，并希望自动化通风、监控滤网状态，或将该设备接入其他 Home Assistant 自动化，此集成就能帮助您实现这些需求。

## 支持的设备

- 具备 Wi-Fi 控制功能且固件版本为 47 或更高的设备

## 不支持的设备

- 没有本地网络接口的型号
- 固件版本为 46 或更低的设备

## 前提条件

1. 将 Prana 热回收设备连接到与 Home Assistant 相同的本地网络。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

### 实体

此集成会提供以下实体。

#### 开关

- **Auto**
  - Description: 启用自动控制
- **Auto+**
  - Description: 增强型自动模式，运行更安静
- **Winter**
  - Description: 用于除霜逻辑的冬季模式
- **Heater**
  - Description: 打开加热器（如果设备支持）
- **Bound**
  - Description: 绑定或同步两个风扇及其相关参数

## 数据更新

此集成使用本地轮询。默认情况下，Home Assistant 每 10 秒轮询一次设备。如果设备停止响应，相关实体会被标记为 *unavailable*，直到通信恢复。

## 已知限制

- 某些较旧的 Prana 型号没有官方支持。
- 某些指示信息或设备特有细节可能仅能在厂商应用中查看。
- 此集成不提供云端或远程控制功能。

## 故障排除

### 未发现设备

1. 确保 Home Assistant 和 Prana 设备位于同一本地网络。
2. 重启设备和 Home Assistant。
3. 检查路由器是否允许 mDNS/LLMNR。

### 实体显示为 unavailable

- 检查设备网络连接。
- 确保设备已通电且可以访问；通信恢复后，实体会自动重新可用。

## 社区说明

- 如果您使用的型号未按预期工作，请在仓库或社区中补充说明，并附上型号和固件版本。

## 删除集成

此集成遵循 Home Assistant 的标准集成删除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

从 Home Assistant 中移除此集成后，我们建议您在 Prana Online 2.0 应用中检查设备设置。
