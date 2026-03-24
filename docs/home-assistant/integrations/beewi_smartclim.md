---
title: BeeWi SmartClim BLE sensor
description: 关于如何将 MBeeWi SmartClim BLE 传感器与 Home Assistant 集成的说明。
ha_category:
  - Sensor
ha_release: 0.99
ha_iot_class: Local Polling
ha_codeowners:
  - '@alemuro'
ha_domain: beewi_smartclim
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**BeeWi SmartClim** 集成允许监控室内或室外温度和湿度。BeeWi SmartClim BLE 是一款蓝牙低能耗传感器设备，通过使用应用程序从智能手机监控房间或花园的温度。使用此集成，可以通过 Home Assistant 从任何位置跟踪这些指标，以及根据房间温度创建一些自动化脚本。

## 安装

根据您运行的操作系统，您需要在系统上配置适当的蓝牙后端：

- 只要主机支持蓝牙（如 Raspberry Pi），`beewi_smartclim` 就可以开箱即用。
- 使用 [Home Assistant Container 安装](/home-assistant/docs/installation/docker/)：在主机上使用 `--net=host` 和正确配置的蓝牙即可开箱即用。

## 配置

启动扫描以确定传感器的 MAC 地址：

```bash
$ sudo hcitool lescan
LE Scan ...
D0:5F:B8:51:9B:36 BeeWi SmartClim
[...]
```

或者如果您的发行版使用 bluetoothctl：

```bash
$ bluetoothctl
[bluetooth]# scan on
Discovery started
[CHG] Controller XX:XX:XX:XX:XX:XX Discovering: yes
[NEW] Device D0:5F:B8:51:9B:36 BeeWi SmartClim
```

查找 `BeeWi SmartClim` 或类似条目，这些是您的传感器。

要在您的安装中使用 Mi 温湿度传感器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: beewi_smartclim
    mac: "xx:xx:xx:xx:xx:xx"
```

```yaml
mac:
  description: 您传感器的 MAC 地址。
  required: true
  type: string
name:
  description: 在前端显示的名称。
  required: false
  type: string
```

## 完整示例

完整的配置示例可能如下所示：

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: beewi_smartclim
    mac: "xx:xx:xx:xx:xx:xx"
    name: Garden
```