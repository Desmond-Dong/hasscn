---
title: Nabu Casa 已收购 ESPHome
description: '<img alt="Nabu Casa 与 ESPHome" src="/home-assistant/images/blog/2021-03-18-nabu-casa-acquired-esphome/social.png" /。 本页属于 Home Assistant 中文博客与更新记录。'
---
# Nabu Casa 已收购 ESPHome

<img alt="Nabu Casa 与 ESPHome" src="/home-assistant/images/blog/2021-03-18-nabu-casa-acquired-esphome/social.png" />

今天，我很高兴地宣布，[ESPHome](https://esphome.io) 从现在起正式加入 [Nabu Casa](https://www.nabucasa.com) 旗下。ESPHome 是为 ESP8266 和 ESP32 设备编程并将其集成到 Home Assistant 中最简单的方式。它已经成为 Home Assistant 生态系统中非常重要的一部分，因此我们希望确保这个项目能够继续作为一个自由且开源的项目蓬勃发展。本周，Nabu Casa 与 ESPHome 创始人 [Otto Winter](https://github.com/ottowinter) 达成协议，收购 ESPHome 项目。

Otto 在三年前创建了 ESPHome，目标是让 ESP 设备的编程尽可能简单。使用 ESPHome，你只需要编写简单的 YAML 文件，描述 ESP 设备的哪些引脚连接了哪些组件。随后，ESPHome 就会将这些内容直接带入 Home Assistant。无需额外工作，就是这么简单。

下面这个 ESPHome YAML 示例会为你的 ESP 设备写入程序。当你把它接上电源后，它会让连接在 16 号引脚上的灯光出现在 Home Assistant 中。

```yaml
esphome:
  name: esp32_light
  platform: ESP32
  board: esp32dev

wifi:
  ssid: "MySSID"
  password: "supersecret"

api:

light:
  - platform: binary
    name: "Desk Lamp"
    output: light_output

output:
  - id: light_output
    platform: gpio
    pin: GPIO16
```

<img alt="ESPHome 徽标" src="/home-assistant/images/sponsors/esphome.svg" class='no-shadow' />

Otto 的判断是对的，如今 ESPHome 已成为人们在 Home Assistant 中集成 ESP 设备最简单的方式。比如，[标签读取器](/home-assistant/blog/2020/09/15/home-assistant-tags/#standalone-tag-reader) 就是基于 ESPHome 构建的，还有许多其他项目也是如此。

随着项目不断发展，Otto 在个人生活中的责任也越来越多，最终已经难以两者兼顾。通过这次收购，Nabu Casa 现在拥有 Otto 所编写代码的版权，以及 GitHub、Docker 等平台上的 ESPHome 组织。Otto 已经关闭了他的 Patreon 账号，也会从项目管理层面逐步淡出。项目仍将继续作为开源项目发展，并由当前的 ESPHome 开发团队 [@jesserockz](https://github.com/jesserockz) 和 [@glmnet](https://github.com/glmnet) 继续推进。Otto 仍然会留在社区中，并在时间允许时继续参与开发工作。

我们会把在 Home Assistant 项目中积累的经验带到 ESPHome，比如更加关注社区，以及更易于使用。如果你有任何想法，欢迎在 [ESPHome Discord](https://discord.gg/KhAMKrd) 中与我们分享。

**更新**：我参加了 Home Assistant 播客，聊了聊这次收购。[第 83 期值得一听。](https://hasspodcast.io/ha083/)

**关于 Nabu Casa**<br>
Nabu Casa 由 Home Assistant 的创始人们创立，目标是让以隐私为中心的智能家居对每个人都触手可及。Nabu Casa 没有投资人，完全依靠用户订阅 Home Assistant Cloud 提供资金支持。通过 Home Assistant，Nabu Casa 已经在努力确保你的家居“大脑”尽可能出色。而通过 ESPHome，他们也将帮助你确保家中的其他设备同样出色。
