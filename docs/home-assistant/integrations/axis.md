---
title: Axis
description: 'Axis Communications(https://www.axis.com/) 设备是监控摄像头、扬声器、门禁控制和其他安全相关的网络连接硬件。Event API 适用于固件 5.50 及更新版本。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Camera
  - Light
  - Switch
ha_config_flow: true
ha_release: 0.45
ha_iot_class: Local Push
ha_codeowners:
  - '@Kane610'
ha_domain: axis
ha_qa_scale: platinum
ha_zeroconf: true
ha_ssdp: true
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - camera
  - diagnostics
  - light
  - switch
ha_integration_type: device
---
# Axis

[Axis Communications](https://www.axis.com/) 设备是监控摄像头、扬声器、门禁控制和其他安全相关的网络连接硬件。Event API 适用于固件 5.50 及更新版本。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::tip
建议您在 Axis 设备上专门为 Home Assistant 创建一个用户。对于传感器功能，创建一个具有查看者权限的用户就足够了。如果您想要额外的功能控制，您将需要管理员权限。

:::
## 调试集成

如果您遇到设备或集成问题，可以将调试打印添加到日志中。

```yaml
logger:
  default: info
  logs:
    axis: debug
    homeassistant.components.axis: debug
```

### 故障排除

如果您遇到问题并想报告问题，请始终首先确保您使用的是最新的 [Axis OS 版本](https://www.axis.com/support/firmware)。

### 发现故障排除

如果您的设备未被发现。在您的摄像头中，前往 **System Options** > **Advanced** > **Plain Configuration**。将下拉框更改为 `network` 并点击 `Select Group`。如果 `Network Interface I0 ZeroConf` 包含 `169.x.x.x` IP 地址，请取消此部分 `Enabled` 旁边的复选框并点击 `Save`。

### 完整集成需要互联网访问

如果 Axis 设备没有互联网访问，Home Assistant 可能只显示摄像头流。其他实体（如传感器和输出控制）可能不会出现。为确保所有设备功能可用，请确保摄像头在初始设置期间具有互联网访问。

### 报告问题

在创建详细说明与集成相关的问题时，请确保分享设备型号和固件以及准备日志。日志可能包含敏感信息，因此在分享之前请务必查看。

## 二值传感器

支持以下传感器类型：

- 移动检测 (Fence guard/Loitering guard/Motion guard/Object analyzer/VMD3/VMD4)
- 被动红外移动检测
- 声音检测
- 日夜模式
- 输入和监控输入

## 摄像头

Axis 摄像头平台可通过集成选项进行配置。可用选项（取决于设备）是选择要使用的流配置文件和要显示的视频源。

### 流配置文件

流配置文件由分辨率、帧率和压缩等设置组成，并在设备上配置。
如果此设置被禁用（默认），它将使用摄像头默认流设置。

### 视频源

视频源（视图区域）定义了摄像头传感器的子部分，通常是更聚焦的关注区域。可以在设备上配置额外的视图区域。
如果此设置被禁用（默认），它将使用摄像头默认源。

## 灯光

控制连接到设备的红外 LED 灯的亮度和状态。

## 开关

支持以下可控端口类型：

- 输出
- 继电器