---
title: 2015 年 4 月 25 日发布说明
description: 介绍折线图、日志簿、ISY994 hub、Transmission 和 modbus 支持。
---

距离上次更新已经过去一个月，这段时间又发生了很多变化。下面快速概述一下这次的新内容。

__折线图__
[James](https://github.com/jamespcole) 升级了前端中的历史视图，现已支持折线图。任何带有计量单位的实体都会显示折线图，实体的“更多信息”卡片中也会显示折线图。[查看在线演示示例。](/home-assistant/demo/)

<p class='img'>
<img src='/home-assistant/images/screenshots/history-line-graphs.png'>
</p>

__ISY994 hub 支持__
<img src='/home-assistant/images/supported_brands/universal_devices.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Ryan](https://github.com/rmkraus) 贡献了 Universal Devices ISY994 hub 的集成支持。你可以借此接入 X10/Insteon 传感器、开关和灯光。

他还编写了一份完整的入门指南，可在 [ISY994 组件页面](/home-assistant/integrations/isy994/) 查看。

```yaml
# Example configuration.yaml entry
isy994:
```

__日志簿__
<img src='/home-assistant/images/supported_brands/logbook.png' style='margin-left:10px; float: right;' height="100" /> 我（Paulus）新增了日志簿组件。日志簿会按时间顺序展示家中发生的所有变化，让你用另一种视角查看家庭历史。[查看在线演示示例。](/home-assistant/demo/)
<span class='clearfix'></span>

```yaml
# Example configuration.yaml entry
logbook:
```

<!--more-->

__Transmission 支持__
<img src='/home-assistant/images/supported_brands/transmission.png' style='border:none; box-shadow: none; float: right;' height='50' /> James 还贡献了 Transmission 集成支持。

```yaml
# Example configuration.yaml entry
sensor:
  platform: transmission
  name: Transmission
  host: 192.168.1.26
  port: 9091
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  monitored_variables:
    - type: 'current_status'
    - type: 'download_speed'
    - type: 'upload_speed'
```

__Modbus 支持__
[Kixam](https://github.com/kixam) 贡献了 Modbus 支持。Modbus 是一种用于控制 PLC 的串行通信协议。目前它支持可通过串口、TCP 和 UDP 连接控制的传感器与开关。

```yaml
# Example configuration.yaml entry
modbus:
  type: serial
  method: rtu
  port: /dev/ttyUSB0
  baudrate: 9600
  stopbits: 1
  bytesize: 8
  parity: N

sensor:
  platform: modbus
  slave: 1
  registers:
    16:
      name: My integer sensor
        unit: C
    24:
      bits:
        0:
          name: My boolean sensor
        2:
          name: My other boolean sensor

switch:
  platform: modbus
  slave: 1
  registers:
    24:
      bits:
        0:
          name: My switch
        2:
          name: My other switch
```
