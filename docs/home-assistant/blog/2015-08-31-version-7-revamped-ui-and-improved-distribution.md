---
title: '0.7: Better UI and improved distribution'
description: '随着 Home Assistant 用户越来越多，我们开始明显感受到缺少正式发布机制带来的问题。过去我们没有版本号，用户必须通过 Git 检出源码才能开始使用。此外，随着支持设备数量持续增长，所需依赖也越来越多。因此我们决定调整发布方式。从现在开始：。'
---
# 0.7: Better UI and improved distribution

随着 Home Assistant 用户越来越多，我们开始明显感受到缺少正式发布机制带来的问题。过去我们没有版本号，用户必须通过 Git 检出源码才能开始使用。此外，随着支持设备数量持续增长，所需依赖也越来越多。因此我们决定调整发布方式。从现在开始：

- 每次发布都会有版本号，从版本 0.7 开始。这个版本号的选择，表示我们已经发展了一段时间，但还不认为自己已经完全稳定。
- 每次发布都会上传到 PyPi。这将成为唯一受支持的分发方式。
- 安装后，Home Assistant 可通过命令行工具 `hass` 使用。
- 默认配置位置已从当前工作目录下的 `config` 移动到 `~/.homeassistant`（Windows 上是 `%APPDATA%/.homeassistant`）。
- 组件和平台依赖不再安装到当前 Python 环境（无论是否为虚拟环境），而是安装到 `<config-dir>/lib`。

特别感谢 [Ryan Kraus](https://github.com/rmkraus) 促成了这一切。请务必阅读 [the full 博客 post][self]，了解如何迁移你现有设置的详细步骤。

[self]: /博客/2015/08/31/版本-7-revamped-ui-and-improved-distribution/#read-more

在 Ryan 处理分发机制的同时，我也一直在努力给 Home Assistant 的界面做一次焕新。我们原来的界面已经不错，但对于拥有大量设备的用户来说，组织方式还不够理想。新界面不再是每个实体一张卡片，而是改为按分组和域来展示卡片。[The demo](/home-assistant/demo/) 也已更新，欢迎体验。

<p class='img'>
  <a href='/home-assistant/demo/'>
    <img src='/home-assistant/images/screenshots/ui2015.png' />
  </a>
  新界面截图
</p>

<!--more-->

## 迁移到版本 0.7

在这个示例中，假设你有一套旧版 Home Assistant 安装，路径为 `/home/paulus/home-assistant`。

如果你想把现有配置迁移为默认配置：

```bash
cp -r /home/paulus/home-assistant ~/.homeassistant
```

如果你希望把配置放在其他位置，例如 `/home/paulus/home-assistant-config`，则需要在启动时将 Home Assistant 指向该配置文件夹：

```bash
hass --config /home/paulus/home-assistant-config
```

## 新平台

最后同样重要的是：新平台支持！

__MQTT 传感器和开关__
<img src='/home-assistant/images/supported_brands/mqtt.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@sfam](https://github.com/sfam) 为我们带来了另外两个 MQTT 平台，进一步扩展了我们与 MQTT 的集成：[传感器][MQTT-传感器] 和 [开关][MQTT-开关]。这两个平台都要求 MQTT 组件先连接到 Broker。

[MQTT-传感器]: /integrations/传感器.MQTT/
[MQTT-开关]: /integrations/开关.MQTT/

```yaml
# Example configuration.yaml entry
sensor:
  platform: mqtt
  name: "MQTT Sensor"
  state_topic: "home/bedroom/temperature"
  unit_of_measurement: "°C"

switch:
  platform: mqtt
  name: "Bedroom Switch"
  state_topic: "home/bedroom/switch1"
  command_topic: "home/bedroom/switch1/set"
  payload_on: "ON"
  payload_off: "OFF"
  optimistic: false
```

__Actiontec MI424WR Verizon FIOS 无线路由器__
<img src='/home-assistant/images/supported_brands/actiontec.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Nolan](https://github.com/nkgilley) 贡献了对 Actiontec 无线路由器的支持。

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: actiontec
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

__DHT 温湿度传感器__
@MakeMeASandwich 贡献了 DHT 温湿度传感器支持。你可以从 DHT11、DHT22 或 AM2302 设备读取当前温度和湿度。

```yaml
# Example configuration.yaml entry
sensor:
  platform: dht
  sensor: DHT22
  pin: 23
  monitored_conditions:
    - temperature
    - humidity
```

__Aruba 设备追踪器__
[Michael Arnauts](https://github.com/michaelarnauts) 贡献了对 Aruba 无线路由器的支持，用于在家状态检测。

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: aruba
  host: YOUR_ACCESS_POINT_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```
