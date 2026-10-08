# 安装

开始使用 Home Assistant 的第一步，就是把它安装到设备上。Home Assistant 可以运行在多种场景和多种技能水平适合的设备上。

## 最简单：使用 Home Assistant Green 即插即用

经济实惠的 Home Assistant Green 是开始使用 Home Assistant 最简单的方式。它开箱即用，并且已经预装了 Home Assistant Operating System。

* 所需技能：对搭建智能家居感兴趣即可
* 所需工具：以太网连接
* 教程：<https://support.nabucasa.com/hc/articles/24737667232413>

## 简单：使用 Raspberry Pi 自行搭建

Raspberry Pi 是运行 Home Assistant 最受欢迎的平台之一。如果你想通过 DIY 的方式开始并积累经验，这是很好的选择。

* 推荐页面：[在 Raspberry Pi 上安装 Home Assistant](/home-assistant/installation/raspberrypi.md)
* 所需技能：组装 Raspberry Pi、烧录系统镜像
* 所需工具：Raspberry Pi 4 或 5（至少 2 GB 内存）、MicroSD 卡、以太网连接

## 关于安装类型

Home Assistant 提供两种主要安装类型，其中推荐使用 Home Assistant Operating System。

* **Home Assistant Operating System**：专为 Home Assistant 生态设计的精简系统，适合单板计算机和虚拟机，安装维护最方便，并支持应用扩展。
* **Home Assistant Container**：基于容器的安装方式。你需要自行准备 Linux 等宿主系统以及 Docker 等容器环境，并手动处理更新；此方式不支持应用扩展。

| 功能 | HA OS | Container |
|------|-------|-----------|
| 自动化 | 支持 | 支持 |
| 仪表盘 | 支持 | 支持 |
| 集成 | 支持 | 支持 |
| 应用扩展 | 支持 | 不支持 |
| 蓝图 | 支持 | 支持 |
| 一键更新 | 支持 | 不支持 |
| 备份 | 支持 | 支持 |

## 进阶：使用 Home Assistant Yellow 扩展系统

Home Assistant Yellow 适合希望构建更强大智能家居基础平台的用户。它提供更高的扩展性，但需要你自行准备 Raspberry Pi Compute Module。

* 所需技能：能按照说明安装计算模块、散热器并烧录系统
* 所需工具：Raspberry Pi Compute Module 4、以太网连接、USB 存储设备、螺丝刀

## 更难：安装到其他硬件

你也可以把 Home Assistant 安装到其他硬件上，比如 Odroid 或通用 x86-64 机器。Home Assistant Operating System 允许你在这些设备上运行 Home Assistant，即使你几乎没有 Linux 经验也可以完成安装。

* [Odroid](/home-assistant/installation/odroid.md)
* [通用 x86-64](/home-assistant/installation/generic-x86-64.md)
* [其他安装方式](/home-assistant/installation/alternative.md)

## 遇到问题？

* 查看 [安装故障排除](/home-assistant/installation/troubleshooting.md)
* 安装完成后，继续阅读 [入门指南](/home-assistant/getting-started/index.md)
