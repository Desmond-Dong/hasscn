---
title: HASSbian 1.1 - The Toy-box
description: New release of the HASSbian Raspberry Pi 图像 for Home Assistant
---
# HASSbian 1.1 - The Toy-box

今晚我很高兴宣布，我们的 Raspberry Pi 镜像迎来了新版本：**HASSbian 1.1 - The Toy-box.**  
你可能会好奇，为什么叫 Toy-box？因为这个名字很贴切地概括了这次更新所包含的内容。

与之前的镜像相比，这次有大大小小不少变化，不过我们先从最有意思的部分开始说起。

### Hassbian-脚本
这是一组脚本，用来为你的 Raspberry Pi 安装增加额外功能。
这些脚本以 `pi` 用户身份运行，并会安装一组工具或软件包。
目前包括：
 - 安装 Libcec，添加本地 [HDMI-CEC support][cec]
 - 安装 Mosquitto，从 Mosquitto 官方仓库安装最新版 Mosquitto 软件包和客户端工具，现在还包含 websocket 支持
 - 安装 OpenZWave，安装 OpenZWave，并为使用 USB 或 GPIO 的 Z-Wave 控制器做好准备
 - 安装 Samba，安装 Samba 软件包，并通过 smb 共享你的配置，这样你就能在任何电脑上直接编辑它，而不需要单独的文件传输软件。这个共享没有安全保护，因此如果你的安装是对公网开放的，我们不建议你使用它。

所有这些脚本都位于目录 `/home/pi/hassbian-scripts/` 中。这个目录实际上是一个在首次启动时克隆下来的 git 仓库，之后也可以很方便地更新到最新版本。
如果要更新 `hassbian-scripts` 目录，请以 `pi` 用户身份执行以下命令。
```bash
cd hassbian-scripts
git pull
```
如果要使用任意一个 hassbian 脚本，请以 `pi` 用户身份执行以下命令。这里以 libcec 脚本为例。
```bash
sudo ./hassbian-scripts/install_libcec.sh
```

想了解这些脚本的更多信息，请查看 [hassbian-脚本 repository][hassbian-repo]。

### Spring cleaning
这次镜像还对基础系统，以及生成 Raspberry Pi 镜像的脚本做了不少整理和清理。
 - 更新 pi-gen。我们的构建脚本已经升级，现在会更贴近 Raspbian 镜像。这份镜像本质上就是在 Raspbian lite 镜像基础上，加入 Home Assistant、依赖项，以及少量基础系统调整后的版本。
 - 移除了 Mosquitto。听起来没那么糟，因为它的安装方式已经转移到了新的 hassbian 脚本之一中。
 - 添加了 rng-tools。这样你的 HASSbian 安装就能利用 Raspberry Pi 的硬件能力来生成熵。
 - 添加了 avahi-daemon 软件包。现在你的 Raspberry Pi 应该可以通过 [hassbian.local][hassbian-avahi] 访问。
 - 添加了 htop。一个对用户友好的交互式进程监视工具。
 - 添加了 tmux。一个非常好用的终端复用器，可以让通过 ssh 使用命令行变得更轻松。
 - 将 `homeassistant` 用户加入了 `dialout` 组。这样可以更方便地使用像 Z-Wave USB 控制器这类需要该权限的硬件。
 
### On the horizon
当然，未来还有更多内容在路上，我们对这份镜像将来如何发展也有更多计划和期待。
在更近一步的计划中，[@Landrash][landrash-github] 正在编写更多脚本，用于 tellstick、emulated_hue，以及控制 Home Assistant。

如果你想关注 HASSbian 镜像的开发讨论，或者想参与贡献，欢迎加入我们的 [Discord chat server][discord]。
 
如果你想开始使用这个新镜像，请查看入门部分中的安装说明。
 
[cec]: /integrations/hdmi_cec/
[hassbian-repo]: https://github.com/home-assistant/hassbian-脚本
[hassbian-avahi]: https://hassbian.local
[landrash-github]: https://github.com/Landrash
[discord]: https://discord.gg/8X8DTH4
