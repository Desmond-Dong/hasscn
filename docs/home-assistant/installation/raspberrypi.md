---
title: 树莓派
description: '我们需要几样东西来开始安装 Home Assistant。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 树莓派

## 推荐硬件

我们需要几样东西来开始安装 Home Assistant。

- [树莓派 5](https://www.amazon.com/dp/B0CRSPKPNG) 或 [树莓派 4](https://www.amazon.com/dp/B07TC2BK1X)，配[电源适配器](https://www.amazon.com/dp/B07TYQRXTK)（确保选择至少 2 GB 内存的型号）。
- [Micro SD 卡](https://www.amazon.com/dp/B07G3GMRYF)。
  - 理想情况下选择 [Application Class 2](https://www.sdcard.org/developers/overview/application/index.html) 等级的卡。检查卡上的 **A2** 标签。Application Class 2 卡性能更好，特别是在小读写操作方面，更适合运行应用程序。
  - 确保使用至少 32 GB 的卡。
- SD 卡读卡器。大多数笔记本电脑已经内置，如果没有，可以购买一个[独立 USB 适配器](https://www.amazon.com/dp/B0B9QZ4W4Y)。品牌不重要，选择最便宜的即可。
- [以太网线](https://www.amazon.com/dp/B00N2VISLW)。安装时必需。安装后，Home Assistant 可以使用 Wi-Fi，但以太网连接更可靠，强烈推荐。

:::note
请确保您的树莓派使用[合适的电源适配器](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#power-supply)。手机充电器可能不合适，因为有些设计为只对该制造商的手机提供全功率。计算机上的 USB 端口也无法提供足够的电力，不应使用。
:::

## 安装 Home Assistant Operating System

本指南展示如何使用树莓派 Imager 将 **Home Assistant Operating System** 安装到您的树莓派上。

### 将镜像写入 SD 卡

1. 按照官网说明在您的计算机上下载并安装树莓派 Imager：[https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)。
   - **故障排除**：如果您的平台不支持树莓派 Imager，可以[下载 Home Assistant 镜像](#downloading-the-home-assistant-image)并使用其他镜像工具，如 Balena Etcher。
2. 打开树莓派 Imager 并选择 **选择操作系统**。
    ![打开树莓派 Imager](/home-assistant/images/installation/rpi_imager_start.png)
3. 选择操作系统类型：
   - 选择 **其他特定用途操作系统** > **家庭自动化** > **Home Assistant**。
    ![选择操作系统类型：其他特定用途操作系统](/home-assistant/images/installation/rpi-ha-1.webp)
4. 选择与您的硬件匹配的 Home Assistant OS（RPi 3、RPi 4 或 RPi 5）。
    ![选择 Home Assistant OS](/home-assistant/images/installation/rpi-ha-2.webp)
5. 选择存储设备：
   1. 将 SD 卡插入计算机。注意：卡上的内容将被覆盖。
   2. 选择您的 SD 卡。
    ![选择存储设备](/home-assistant/images/installation/rpi-select-sd-card.png)
6. 将安装程序写入 SD 卡：
   1. 要开始此过程，选择 **下一步**，然后选择 **写入**。
   2. 等待 Home Assistant OS 写入 SD 卡。
    ![选择写入](/home-assistant/images/installation/rpi_choose_write.png)
7. 选择 **完成** 并弹出 SD 卡。

### 启动树莓派

1. 将 SD 卡插入树莓派。
2. 插入以太网线，确保树莓派与您的计算机连接到同一网络，并连接到互联网。
3. 连接电源适配器以启动设备。

### 访问 Home Assistant

连接树莓派后几分钟内，您就可以访问您的新 Home Assistant。

- 在桌面系统的浏览器中，输入 <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>。

:::note
如果您运行的是较旧的 Windows 版本或有更严格的网络配置，您可能需要在 <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> 或 `http://X.X.X.X:8123`（将 X.X.X.X 替换为您的树莓派的 IP 地址）访问 Home Assistant。
:::

- 此页面变为可用所需的时间取决于您的硬件。在树莓派 4 或 5 上，此页面应该在一分钟内可用。
  - 如果在 Pi 4 或 5 上 5 分钟后仍未显示，可能是镜像没有正确写入。
    - 尝试重新烧录 SD 卡，甚至尝试不同的 SD 卡。
  - 如果这没有帮助，请查看树莓派上的控制台输出。
    - 为此，通过 HDMI 连接显示器。

恭喜！您已完成树莓派设置！

### 下载 Home Assistant 镜像

如果您的平台不支持树莓派 Imager，您可以下载 Home Assistant 镜像并使用其他镜像工具，如 Balena Etcher。

要将镜像下载到您的计算机，复制树莓派 4 或 5 的正确 URL（注意：下面有两个不同的链接！）：

安装并可以访问 Home Assistant Operating System 后，您可以继续进行初始设置。

:::info [初始设置](/home-assistant/getting-started/onboarding/)
:::

<div style="margin-top:50px">
<p>
    <i>我们通过此帖子中的链接购买可获得佣金。</i></p>
</div>