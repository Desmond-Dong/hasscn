---
title: 解释一下 Updater
description: '上周六我们发布了 Home Assistant 0.310.31，其中包含了改进后的 updater 组件，它会通过 Home Assistant 服务器检查新版本。我们希望向社区同步这次上线情况，并回答一些已经出现的问题。作为更新检查的一部分，除非你选择退出。'
---
# 解释一下 Updater

上周六我们发布了 [Home Assistant 0.31][0.31]，其中包含了改进后的 updater 组件，它会通过 Home Assistant 服务器检查新版本。我们希望向社区同步这次上线情况，并回答一些已经出现的问题。作为更新检查的一部分，除非你选择退出，否则系统会向 Home Assistant 服务器提交匿名的操作系统与 Python 版本信息。

<!--more-->
## 为什么要改 updater
这项改动主要由两个重要因素推动。

### 提升用户安全性

作为用户，如果你运行的 Home Assistant 版本包含已知安全漏洞组件，你将能够收到通知。

虽然我们希望这个功能不会经常用到，但我们必须具备触达受影响用户的能力。过去我们确实遇到过这种需求：由于一个 bug，forecast.io 传感器发起了大量 API 请求，导致部分用户超出免费配额并产生费用。

请注意，这项功能目前还未完成，会在未来版本中提供。

### 把资源用在关键处

作为 Home Assistant 开发者，我们将能了解 Home Assistant 正运行在哪些环境中。以下是我们过去没有的数据点：

- 实例总数
- 正在使用的操作系统版本与发行版
- Python 版本
- 哪种方式更受欢迎：Docker、Virtualenv 还是裸机安装？
- 我们新的[树莓派镜像][rpi-图像]有多受欢迎？

## 为什么要用 GeoIP 查询你的 IP
我们会保存城市级信息，以便了解用户来自哪里。这些信息能帮助我们更好地洞察用户分布，例如判断是否应优先推进国际化。另外，我们过去在 `sun` 组件中遇到过一个严重 bug：高纬度地区的用户每天会崩溃多次。如果当时已有 updater 组件，我们就可以只向这部分用户定向发送高优先级更新通知。

正如发布博客里写的那样，位置信息并不是由你本地的 Home Assistant 安装提供，而是通过将你的 IP 地址与 [MaxMind 提供的 GeoLite2 数据][geolite]比对获得。其文档中写道：

> IP geolocation is inherently imprecise. Locations are often near the center of the population. Any location provided by a GeoIP database should not be used to identify a particular address or household.

## 为什么默认启用
我们决定默认启用它，因为我们认为收集的信息并不会造成伤害。我们也理解并非所有人都认同这一点，因此提供了[多种退出方式][opt-out]。

我们已将“在前端中提供该功能的开关选项”列入短期计划。

[0.31]: /博客/2016/10/22/flash-briefing-updater-hacktoberfest/#comment-2965607849
[geolite]: https://dev.maxmind.com/geoip/geoip2/geolite2/
[opt-out]: /integrations/updater/
[rpi-图像]: /博客/2016/10/01/we-have-raspberry-图像-now/
