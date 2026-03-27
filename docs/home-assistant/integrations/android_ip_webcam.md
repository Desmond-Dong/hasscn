---
title: Android IP Webcam
description: 'Android IP Webcam 集成与 Android IP Webcam 连接，可将任何 Android 手机或平板电脑变成具有多种查看选项的网络摄像头。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Camera
  - Hub
  - Sensor
  - Switch
ha_release: '0.40'
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: android_ip_webcam
ha_platforms:
  - binary_sensor
  - camera
  - sensor
  - switch
ha_integration_type: device
ha_codeowners:
  - '@engrbm87'
---
# Android IP Webcam

**Android IP Webcam** 集成与 Android IP Webcam 连接，可将任何 Android 手机或平板电脑变成具有多种查看选项的网络摄像头。

该集成设置为 MJPEG 摄像头，所有设置作为 Home Assistant 中的开关。您还可以集成该应用程序公开的传感器。如果您有多部手机，可以在列表中使用所有选项。

目前 Home Assistant 支持以下设备类型：

- 二值传感器
- 摄像头
- 传感器
- 开关

## 设置

下载 [Android IP Webcam 应用](https://play.google.com/store/apps/details?id=com.pas.webcam) 并启动该应用。当您按下"Start Server"时，它将开始从您的手机流式传输视频，设备的 IP 地址将显示在屏幕上。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
如果您希望在 Home Assistant 中看到传感器状态，需要在 Android 应用中启用日志记录（`Data logging` > `Enable data logging`）。在此功能启用之前，传感器状态将保持为 `unknown`。

:::
