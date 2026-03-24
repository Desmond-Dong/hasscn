---
title: 我们现在有树莓派镜像了
description: Home Assistant 树莓派镜像正式发布
---

今天我们很高兴宣布全新的树莓派镜像！它基于 Raspbian Lite，并集成了 HASS，因此我们把它命名为 Hassbian。

这个镜像已预装好你快速开始 Home Assistant 所需的一切内容。

要开始使用，请查看入门章节中的安装说明，或观看 [BRUHAutomation] 的最新视频：

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/iIz6XqDwHEk" frameborder="0" allowfullscreen></iframe>
</div>

### 技术细节

它基于 Raspbian Lite，并使用与构建[官方 Raspbian 镜像](https://raspberrypi.org/downloads/raspbian/)相同脚本的分支版本来生成，脚本见[这里](https://github.com/home-assistant/pi-gen)。HASS 的安装流程与[手动安装](/home-assistant/getting-started/安装-raspberry-pi/)文档一致。请注意，本项目与树莓派基金会及其项目没有任何关联。

首次启动时会安装 Home Assistant 的最新版本，大约 3 到 5 分钟后即可访问。此镜像预装了 MQTT broker [Mosquitto](https://mosquitto.org/)、蓝牙支持，以及让 `homeassistant` 账户可使用树莓派 GPIO 引脚的配置。Mosquitto 默认不会自动启用。

目前镜像未提供预编译的 Z-Wave 支持，但你可以按照 [Z-Wave 入门说明](/home-assistant/getting-started/Z-Wave/)自行安装。

祝你自动化愉快！

[BRUHAutomation]: https://www.youtube.com/channel/UCLecVrux63S6aYiErxdiy4w
