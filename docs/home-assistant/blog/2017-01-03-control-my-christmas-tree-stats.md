---
title: Control My Christmas Tree Stats
description: I used Home Assistant for a publicly controllable Christmas tree and
  it worked great!
---

大家好，新年快乐！

我不是 Paulus。我叫 Ben，是 [BRUH 自动化 YouTube channel][bruh] 的创建者。如果你看过我的视频，你应该知道我非常喜欢家庭自动化，也非常喜欢 Home Assistant。

我想分享一下我最近一个项目中的一些有趣数据：[Control My Christmas tree!](https://github.com/bruhautomation/BRUH-Christmas-Tree-2016)。在这个项目中，我在一台 Raspberry Pi 2 上搭建了一个 Home Assistant 实例，并通过 DuckDNS 对外公开访问。Paulus 非常帮忙，协助我关闭了几个开发者服务，以免这些服务被人利用来关闭这个 Home Assistant 实例。

我在这个 Home Assistant 实例中添加了三个设备：Wemo Insight、Sonoff 开关（运行 MQTT 固件），以及一条自制的 MQTT 数字 LED 灯带。再加上一些 3D 打印的《星球大战》装饰之后，这棵树就准备好了！

<p class='img'>
  <img src='/home-assistant/images/blog/2017-01-bruh-christmas/christmas-tree.gif'>
  圣诞树运行中的样子。
</p>

<!--more-->
在这棵树开放期间，共有来自 88 个国家的 7,366 位访客连接到了我的 Home Assistant 实例。大家总共在其中的开关上点了大约 100,000 次，这其中也要“感谢”一些连续 6 到 8 小时使用宏的人。

<p class='img'>
  <img src='/home-assistant/images/blog/2017-01-bruh-christmas/stats.png'>
  视频的观看次数。
</p>

我很高兴地告诉大家，Home Assistant 一次都没有崩溃。实际上，它甚至没有变慢，也完全不需要重启。Wemo Insight 和 Sonoff 继电器同样表现得非常稳定。我只遇到过一次 Sonoff 故障和两次 Wemo Insight 故障，而这些问题都只需要断电重启即可解决。数字 LED 灯带的表现也相当不错，除了一个松动的接头之外，只卡住了两次。

我想向所有努力让 Home Assistant 运行得如此出色的开发者致以衷心感谢。这个项目正是你们辛勤工作的最好证明，也说明了 Home Assistant 为什么会成为最优秀的家庭自动化平台之一。谢谢你们！

我很期待继续和 Home Assistant 一起探索家庭自动化的乐趣，也已经迫不及待想迎接下一个圣诞节，做出一棵更大、更酷的树了。 :)

祝大家 2017 年一切顺利！

致意！-Ben

[bruh]: https://www.youtube.com/channel/UCLecVrux63S6aYiErxdiy4w
