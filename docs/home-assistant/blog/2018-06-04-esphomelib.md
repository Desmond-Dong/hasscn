---
title: esphomelib - 在 Home Assistant 中使用 ESP 的一体化方案
description: 'ESP8266(https://www.espressif.com/products/socs/esp8266) 和 ESP32(https://www.espressif.com/products/socs/esp32) 是价格极低、支持 WiFi 的微控制器，已经成为许多 DIY 家庭自动化项目的基础。'
---
# esphomelib - 在 Home Assistant 中使用 ESP 的一体化方案

[ESP8266](https://www.espressif.com/products/socs/esp8266) 和 [ESP32](https://www.espressif.com/products/socs/esp32) 是价格极低、支持 WiFi 的微控制器，已经成为许多 DIY 家庭自动化项目的基础。包括 iTead（Sonoff 设备）在内的不少厂商，也因为性价比选择了这些芯片。

这些微控制器要实现基础功能，如今也很容易：借助 ESPEasy 或 Sonoff-Tasmota 等流行项目，下载固件刷入芯片即可。但如果你尝试超出这些框架的基础能力、做一些定制，就会发现事情没那么简单。很多时候你最终得从网上找 Arduino 代码项目，再按自己的需求修改。

这正是 esphomelib 发挥作用的地方：[esphomelib 工具套件](https://esphome.io/)以提供尽可能好的用户体验为目标。它一方面允许你在不写*一行*代码的前提下完成大量定制，另一方面提供完整的 Home Assistant 集成。在 esphomelib 生态中，你基本只需要编写一个简单的 YAML 配置文件，后续的编译、刷写、上传等流程都会自动完成。

<!--more-->

## 安装

一个示例最能说明问题。使用 esphomeyaml 主要有两种方式：通过 [HassIO add-on](https://esphome.io/guides/getting_started_hassio.html)，或者通过[命令行](https://esphome.io/guides/getting_started_command_line.html)。对于 esphomeyaml 插件，你只需把 "[https://github.com/esphome/esphome](https://github.com/esphome/esphome)" 添加为插件仓库（见[安装第三方插件](/home-assistant/hassio/installing_third_party_addons/)），然后选择并安装“esphomeyaml”，等待安装完成。之后就可以启动插件并访问 Web 界面。

使用命令行时，只需用下面的 pip 命令安装 **Python 2** 包，然后访问 `localhost:6052` 打开仪表盘。

```bash
pip2 install esphomeyaml
esphomeyaml config/ dashboard
# Alternative for docker users:
docker run --rm -p 6052:6052 -p 6123:6123 -v "$PWD":/config ottowinter/esphomeyaml /config dashboard
```

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/uWZmc_MjSWs?rel=0&amp;showinfo=0loop=1&amp;autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

进入仪表盘后，你会看到一个简短的设置向导，帮助你快速开始使用 esphomeyaml 并创建基础配置。最终你会得到类似下面的配置文件。

```yaml
esphomeyaml:
  name: livingroom
  platform: ESP8266
  board: nodemcuv2

wifi:
  ssid: "MySSID"
  password: "MyPassword"

mqtt:
  broker: "192.168.178.83"
  username: ""
  password: ""

logger:
ota:
```

到这一步你已经可以刷写固件了。先把 ESP 的 USB 线连接到运行 esphomeyaml 的设备上，等待出现“Discovered new serial port”提示（某些情况下需要重启插件）。然后在顶部导航栏选择上传端口，点击大号“UPLOAD”按钮。如果一切顺利，你现在就有一个可工作的 esphomelib 节点，并能看到调试日志 🎉

## 添加一些基础功能

上面的配置说实话有点“无聊”：它只连接了 WiFi 和 MQTT，本身并不做事。所以我们来加一个基础的 [GPIO 开关](https://esphome.io/components/开关/gpio.html)！esphomelib 的 GPIO 开关组件可以控制 ESP 任意引脚的开/关状态。比如把下面这段配置加到 YAML 文件末尾，就会把 `GPIO5` 设置为一个名为 "Living Room Dehumidifer" 的开关。

```yaml
switch:
  - platform: gpio
    name: "Living Room Dehumidifer"
    pin: GPIO5
```
如果你现在再次点击上传（这次 ESP 不必再通过 USB 连接，因为更新[可以通过 WiFi 完成](https://esphome.io/components/ota.html)），你会看到一个开关通过 [MQTT discovery](/home-assistant/docs/MQTT/discovery/) 自动出现在 Home Assistant 中。

<p class='img'>
  <img
    src='/home-assistant/images/blog/2018-06-esphomelib/switch.png'
    alt='esphomeyamls 设置 wizard.'>
  启用 <a href='/home-assistant/docs/MQTT/discovery/'>MQTT
  discovery</a> 且使用 <a href='/home-assistant/integrations/group/'>default view</a> 时，新配置的开关会这样显示在 Home Assistant 中。
</p>

确实，单靠这个功能在其他项目里也不算难。但当你开始加入[灯光](https://esphome.io/index.html#灯光-components)、[遮盖](https://esphome.io/index.html#遮盖-components)和[其他传感器](https://esphome.io/index.html#sensor-components)后，esphomelib 的模块化设计优势就会非常明显。

## 另见

- [查看完整入门指南（包括从其他项目迁移的方法）](https://esphome.io/guides/)
- [按设备分类的配置指南](https://esphome.io/#devices)
- [支持的传感器/执行器列表](https://esphome.io/)
- 如果需要帮助，欢迎加入 [Discord 服务器](https://discord.gg/KhAMKrd)。
