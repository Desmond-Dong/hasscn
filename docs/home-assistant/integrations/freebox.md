---
title: Freebox
description: 'Freebox 集成允许您监控和控制 Freebox 路由器(https://www.free.fr/freebox/)。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Alarm
  - Camera
  - Network
  - Presence detection
  - Sensor
  - Switch
ha_release: 0.85
ha_iot_class: Local Polling
ha_codeowners:
  - '@hacf-fr'
  - '@Quentame'
ha_config_flow: true
ha_domain: freebox
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - device_tracker
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: device
---
# Freebox

**Freebox** 集成允许您监控和控制 [Freebox 路由器](https://www.free.fr/freebox/)。

目前 Home Assistant 支持以下设备类型：

- [传感器](#sensor)：提供连接速度、内部温度、空闲分区空间和未接来电的指标
- [二值传感器](#binary-sensor)：用于监控 RAID 阵列健康状况
- [设备跟踪器](#presence-detection)：用于跟踪已连接设备
- [开关](#switch)：控制 Wi-Fi
- [摄像头](#camera)
- [二值传感器](#binary)
- [报警控制面板](#alarm-control-panel)
  

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

您可以通过在浏览器中打开此地址 <http://mafreebox.freebox.fr/api_version> 来查找您的 Freebox 主机和端口。
返回的 JSON 应包含一个 `api_domain`（`host`）和一个 `https_port`（`port`）。
请查阅 [API 文档](https://dev.freebox.fr/sdk/os/) 获取更多信息。

:::tip
<http://mafreebox.freebox.fr/api_version> 提供的 `host`（例如：xxxxxxxx.fbxos.fr）和 `port` 指的是您的 Freebox 公网 IP 地址，如果您的 Home Assistant 服务器位于本地局域网内，可能无法正常工作。对于本地 API 访问，您可以改用 `host` = *mafreebox.freebox.fr* 和 `port` = *443*。


:::
### 初始设置

:::important
您必须为您的 Freebox 路由器 Web 管理页面设置密码。启用"Permettre les nouvelles demandes d'associations"选项，并检查"Gestion des ports" > "Connexions entrantes"中的"Accès à distance sécurisé à Freebox OS"选项是否处于活动状态。


:::
首次 Home Assistant 连接到您的 Freebox 时，您需要在提示时按下 Freebox 正面的右箭头键进行授权。

要使 Wi-Fi 开关和重启动作正常工作，您需要在"Paramètres de la Freebox" > "Gestion des accès" > "Applications"中为 Home Assistant 应用程序添加"Modification des réglages de la Freebox"权限。

要使用 Freebox Delta 的摄像头，您需要在"Paramètres de la Freebox" > "Gestion des accès" > "Applications"中为 Home Assistant 应用程序添加"Gestion de l'alarme et maison connectée"权限。

### 支持的路由器

仅支持带有 Freebox OS 的路由器：

- Freebox V8 也称为 Freebox Pop
- Freebox V7 也称为 Freebox Delta
- Freebox V6 也称为 Freebox Revolution
- Freebox mini 4k

## 存在检测

此平台通过跟踪连接到 [Freebox](https://www.free.fr/freebox/) 路由器的设备来提供存在检测。

### 注意事项

请注意，Freebox 会等待一段时间才将设备标记为非活动状态，这意味着从您断开设备到它在 Home Assistant 中显示为"离开"之间会有一个小的延迟（1 或 2 分钟）。在指定 `consider_home` 参数时应考虑到这一点。
相反，Freebox 会立即报告新连接的设备，因此一旦 Home Assistant 刷新设备状态，它们应该几乎立即显示为"在家"。

## 传感器

此平台为您提供传感器来监控 Freebox 路由器。
监控的指标有：
- 内部温度
- 上传和下载速率（KB/s）
- 已使用磁盘的空闲分区空间
- 未接来电数量

## 二值传感器

每个 RAID 阵列的健康状态可以通过诊断二值传感器进行监控，反映 `degraded` 状态（OK 表示未降级，PROBLEM 表示已降级）。

## 摄像头

摄像头仅在 Freebox V7（也称为 Freebox Delta）中可用。

## 二值
此平台为您提供传感器来监控：
- 运动传感器
- 开门器 
- 塑料外壳

## 报警控制面板

此集成允许您查看和控制 Freebox 报警控制面板。


## 动作

### 动作：重启

`freebox.reboot` 动作允许您重启 Freebox 路由器。它不接受任何参数。请注意，没有确认提示。

## 开关

此平台为您提供开关来开启或关闭 Wi-Fi。这将切换路由器的所有 Wi-Fi 接口（所有 SSID 和所有频段）。