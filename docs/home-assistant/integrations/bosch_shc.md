---
title: Bosch SHC
description: 集成 Bosch SHC。
ha_category:
  - Binary sensor
  - Cover
  - Hub
  - Sensor
  - Switch
ha_release: 2021.6
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@tschamm'
ha_domain: bosch_shc
ha_platforms:
  - binary_sensor
  - cover
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

**Bosch SHC** 集成允许您将 [Bosch Smart Home Controller](https://www.bosch-smarthome.com) 连接到 Home Assistant，以控制和监控您的 Bosch 智能家居设备。

目前 Home Assistant 支持以下设备类型：

- [二值传感器](#binary-sensor)
- [遮盖](#cover)
- [传感器](#sensor)
- [开关](#switch)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 二值传感器

二值传感器平台允许您监控门窗触点和电池传感器的状态。为以下每种设备添加二值传感器设备：

- 门窗触点
- 门窗触点 II
- 电池供电设备

### 遮盖

遮盖平台允许您控制您的遮盖。为每个遮盖控制设备添加遮盖设备。

### 传感器

传感器平台允许您监控温度、湿度、纯度、空气质量、功率、能量和阀瓣传感器的状态。为以下每种设备添加传感器设备：

- 恒温器
- 墙壁恒温器
- Twinguard
- 智能插座
- 紧凑型智能插座

### 开关

开关平台允许您控制您的插座和灯开关。为以下每种设备添加开关：

- 灯开关
- 智能插座
- 紧凑型智能插座

## 客户端注册

要启动客户端注册，请按住控制器上的按钮直到 LED 开始闪烁。在配置期间，会生成客户端 SSL 证书/密钥对并在控制器上注册。对于此步骤，需要您控制器的系统密码，该密码是在控制器初始设置时创建的。