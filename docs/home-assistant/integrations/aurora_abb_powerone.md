---
title: Aurora ABB PowerOne Solar PV
description: '此集成实现了与 PVI-3.0/3.6/4.2-TL-OUTD ABB 系列太阳能逆变器的直接 RS485 连接，可能也适用于其他型号。 该逆变器原由 PowerOne 制造，后被 ABB 收购。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Energy
  - Sensor
ha_release: 0.96
ha_iot_class: Local Polling
ha_codeowners:
  - '@davet2001'
ha_domain: aurora_abb_powerone
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
---
# Aurora ABB PowerOne Solar PV

此集成实现了与 PVI-3.0/3.6/4.2-TL-OUTD ABB 系列太阳能逆变器的直接 RS485 连接，可能也适用于其他型号。
该逆变器原由 PowerOne 制造，后被 ABB 收购。

与逆变器通信的 TCP/IP 方法受 Python 库支持，但此集成中未实现。

此集成将逆变器创建为一个具有三个传感器的设备，报告以瓦特为单位的实时功率输出、以 kWh 为单位的发电量和设备温度。

请注意，光伏逆变器在黑暗中不会响应通信，因此传感器在夜间将报告"不可用"。

RS485 连接可以使用低成本的 USB-RS485 转换器进行。它使用 2 线接口工作，但带有独立接地参考的接口可能更可靠。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
::: 

逆变器需要开启（即在白天）并正确连接才能进行首次设置。通常只需选择正确的串口并保留默认地址 `2` 即可。