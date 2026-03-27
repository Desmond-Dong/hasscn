---
title: 在 PocketCHIP 上运行 Home Assistant
description: '<img src=''/home-assistant/images/blog/2016-07-pocketchip/pocketchip-logo.png'' style=''clear: right; border:none; box-shadow: none; float: right。'
---
# 在 PocketCHIP 上运行 Home Assistant

<img src='/home-assistant/images/blog/2016-07-pocketchip/pocketchip-logo.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
一年多前，我参加了 [Next Thing Co.](https://www.nextthing.co/) 发起的 [Kickstarter 众筹](https://www.kickstarter.com/projects/1598272670/chip-the-worlds-first-9-computer/description)——“CHIP：世界上第一台 9 美元电脑”。我选择 PocketCHIP 正是因为它的设计理念：有显示屏、内置存储（因此不需要 SD 卡）、电池供电、还有键盘，这些特性都很吸引人。上周它终于到货了……

<!--more-->

多亏了 [Next Thing Co.](https://www.nextthing.co/) 和他们那块真的只要 9 美元的 CHIP，单板电脑的体积门槛又被拉低了。没有以太网和 HDMI 输出也有助于缩小体积。不过我猜下一个开发周期，我们可能就能把带有有线网络和 SATA 接口的板子塞进火柴盒里。

<p class='img'>
  <img src='/home-assistant/images/blog/2016-07-pocketchip/size.png' />
  Cubieboard、OrangePi One 和 CHIP 的体积对比。
</p>

如果你开始用 PocketCHIP，绝对会有种在用 Blackberry 或 Game Boy 的感觉。打字基本靠两只拇指 :-)

先做几项基础调整，比如配置 `sudo`、升级现有系统、修改密码、启用 ssh、删掉一些碍事的默认内容，然后再安装 Home Assistant。整体没太多可说的，非常直接。下面把我做过的步骤完整记一下。

系统默认提供 Debian 安装环境。这意味着 Home Assistant 的部分依赖并不齐全。我还没确认 PocketCHIP 的新镜像是否已经包含这些依赖。因此先执行 `$ sudo apt-get update`，再安装依赖，整个过程大概一两分钟。

```bash
sudo apt-get install python3-dev python3-pip python3-venv
```

和往常一样，我会在 [venv](https://docs.python.org/3/library/venv.html) 中运行 Python 应用。

```bash
pvenv ha
```

接下来激活刚创建的环境。

```bash
cd ha
source bin/activate
```

如果你还没见过接下来的两条命令，那你该去看看我们的[首页](/)。

```bash
pip3 install homeassistant
hass --open-ui
```

在低分辨率屏幕上使用 `surf` 浏览网页，体验并不理想。现在大多数智能手机（哪怕很便宜的）都有更高分辨率的触摸屏。没关系，[`midori`](https://twitter.com/fabaff/status/748852317047418880) 也没好到哪去。

<p class='img'>
  <img src='/home-assistant/images/blog/2016-07-pocketchip/pocketchip.png' />
  运行 Home Assistant 前端的 PocketCHIP
</p>

总之，借助 PocketCHIP 和 Home Assistant，你可以在一台 49 美元、带触摸屏、集成 USB 和键盘的设备上运行家庭自动化。显示屏上方还提供 GPIO 接口，甚至可以把 PocketCHIP 直接连接到传感器和执行器。
