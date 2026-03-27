---
title: 2015 年 11 月调查
description: '<img src=''/home-assistant/images/blog/2015-11-survey/releases.png'' style=''float: right; margin-left: 8px; margin-bottom: 8px;'' height=''120''/大约一周前。'
---
# 2015 年 11 月调查

<img src='/home-assistant/images/blog/2015-11-survey/releases.png' style='float: right; margin-left: 8px; margin-bottom: 8px;' height='120'/>大约一周前，我们发起了第一次调查。现在已经有 30 人参与。若你也参与了，非常感谢。我们认为这个时间点已经足以得到一些“仅具部分代表性”的数据。很难准确判断目前有多少 Home Assistant 用户。当前我们的 [Discord 聊天服务器](https://discord.gg/c5DvZ4e) 有 215 名成员，而上周 [PyPI](https://pypi.python.org/pypi/homeassistant/) 统计到 5063 次下载。

这次调查的目标，是匿名收集一些关于 Home Assistant 各部分使用情况的数据，以及少量运行环境信息。

<!--more-->
得益于 Python，用户可以在最主流的 Linux 发行版上运行 Home Assistant，也可以在 OS X 和 Microsoft Windows 等其他操作系统上运行。有四分之一的操作系统信息未知，这让我们推测，Home Assistant 今天应该可以在大多数常见操作系统上运行。我们也希望 *BSD 用户同样玩得开心。硬件平台方面，x86_64 和 ARM 看起来是最常见的选择。

当然，大多数用户都在使用 [自动化](/home-assistant/getting-started/automation/) 组件，否则使用 Home Assistant 的意义就不大了。[sun](/home-assistant/integrations/sun/) 组件的使用率也很高。我们希望这不是因为它默认就会启用。

[报警控制面板](/home-assistant/integrations/alarm_control_panel/) 和 [摄像头组件](/home-assistant/integrations/camera/) 大约都被三分之一的调查参与者使用。可以说它们目前仍偏小众，但随着更多人发现可以用 Home Assistant 搭建报警系统，它们会越来越受欢迎。

[Philips Hue](/home-assistant/integrations/hue) 是灯光类别的“赢家”，紧随其后的是 [MQTT 灯光](/home-assistant/integrations/light.mqtt/)。[Google Cast](/home-assistant/integrations/cast) 和 [Plex](/home-assistant/integrations/plex#media-player) 是最受欢迎的媒体播放器平台。[Pushbullet](/home-assistant/integrations/pushbullet) 则远远领先，成为使用最多的 [通知平台](/home-assistant/integrations/notify/)。如果你有关注最近对该平台的改进，这个结果并不意外。

有意思的是，大多数传感器、开关和恒温器平台都有人在使用。很多人似乎对 [天气预报传感器](/home-assistant/integrations/darksky) 提供的天气数据很感兴趣。MQTT 传感器和开关几乎部署在 50% 的 Home Assistant 安装中。

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/releases.png' />
  Home Assistant 发布版本
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/os.png' />
  操作系统
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/platforms.png' />
  硬件平台
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/components.png' />
  组件
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/alarm-cameras.png' />
  报警控制面板和摄像头
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/trackers.png' />
  设备追踪器
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/lights.png' />
  灯光
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/players.png' />
  媒体播放器
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/notifications.png' />
  通知
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/sensors.png' />
  传感器
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/switches.png' />
  开关
</p>

<p class='img'>
  <img src='/home-assistant/images/blog/2015-11-survey/thermostats.png' />
  恒温器
</p>

结论是，[MQTT](http://MQTT.org/) 在几乎每个类别里都很流行，从报警控制面板、通过 [owntracks](http://owntracks.org/) 进行在场检测，到传感器和开关，现在甚至在灯光领域也是如此。

至于这些数据该如何解读，就留给你自己判断了。再次感谢你参与这次调查。
