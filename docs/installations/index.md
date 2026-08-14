---
pageType: home
title: 'Home Assistant 安装指南 - x86、树莓派、iHost、香橙派与虚拟化部署 | 老王杂谈说'
description: '汇总 Home Assistant OS 极速版的常见安装方式，覆盖 x86 物理机、树莓派、Sonoff iHost、香橙派、Proxmox VE 与 Hyper-V，帮助你快速选择合适的部署路径。'
keywords: 'Home Assistant, Home Assistant 中文, 安装指南, x86, 树莓派, Sonoff iHost, 香橙派, Proxmox, Hyper-V, HAOS'
og:
  title: 'Home Assistant 安装指南 - 常见平台刷机与部署'
  description: '按硬件与虚拟化平台整理 Home Assistant 安装入口，便于快速选择合适的部署方式。'
  type: 'website'
  locale: 'zh_CN'
  site_name: 'Home Assistant 中文网'

hero:
  name: Installations
  text: 选择适合你的安装方式
  tagline: 按硬件平台与虚拟化环境整理常见部署路径，先选平台，再进入对应刷机或导入步骤
  actions:
    - theme: brand
      text: 下载镜像
      link: /download
    - theme: alt
      text: x86 物理机直装
      link: /installations/x86

features:
  - title: x86 物理机
    details: 适合 x86 架构主机，使用 Balena Etcher 烧录安装专用系统到 U 盘，引导安装 Home Assistant。
    icon: 🖥️
    link: /installations/x86
  - title: 树莓派
    details: 适合 Raspberry Pi 3、4、5 用户，使用 Balena Etcher 或 Raspberry Pi Imager 烧录镜像。
    icon: 🍓
    link: /installations/raspberrypi
  - title: Sonoff iHost
    details: 适合希望在 iHost 上直接启动 Home Assistant 的用户，包含 SD 卡烧录、启动与硬件资源说明。
    icon: 🏠
    link: /installations/ihost
  - title: 香橙派
    details: 适合 Orange Pi CM4 等设备，包含卡刷参考与 EMMC 写入流程。
    icon: 🍊
    link: /installations/orangepi
  - title: Proxmox VE
    details: 适合在 PVE 中创建虚拟机部署 Home Assistant，重点覆盖 qcow2 导入与关键虚拟机设置。
    icon: 🐧
    link: /installations/proxmox
  - title: 飞牛 fnOS
    details: 适合在飞牛 NAS 的虚拟机中部署 Home Assistant，使用 ova 或 qcow2 固件导入。
    icon: 🐂
    link: /installations/fnos
  - title: ESXi
    details: 适合在 VMware ESXi 宿主机上部署 Home Assistant，使用 vmdk 或 ova 固件导入。
    icon: 🖧
    link: /installations/esxi
  - title: 威联通 QNAP
    details: 适合在威联通 NAS 虚拟机工作站中部署 Home Assistant，使用 ova 固件导入。
    icon: 🗄️
    link: /installations/qnap
  - title: UTM（Mac）
    details: 适合在 Mac 的 UTM 虚拟机中部署 Home Assistant，使用 qcow2 固件导入。
    icon: 🍏
    link: /installations/utm
  - title: Hyper-V
    details: 适合在 Windows Hyper-V 环境下部署，当前为简版入口，后续可继续补充完整流程。
    icon: 🪟
    link: /installations/hyperv
---

# Home Assistant 安装指南 - x86、树莓派、iHost、香橙派与虚拟化部署 | 老王杂谈说

## 如何选择

- 拥有 x86 架构的普通电脑或主机：优先选择 `x86 物理机直装`
- 有实体硬件并希望低功耗常驻运行：优先选择 `树莓派`、`Sonoff iHost` 或 `香橙派`
- 已有家用服务器或虚拟化环境：优先选择 `Proxmox VE`、`飞牛`、`ESXi` 或 `Hyper-V`
- 使用 Mac 的用户：优先选择 `UTM`
- 如果你还没有下载镜像，可以先前往 [下载页](/download) 选择对应平台文件

## 当前支持的平台

| 平台 | 适合人群 | 入口 |
| --- | --- | --- |
| x86 物理机 | 拥有 x86 架构主机、希望直接安装实体机的用户 | [查看教程](/installations/x86) |
| 树莓派 | 想快速上手、生态成熟的用户 | [查看教程](/installations/raspberrypi) |
| Sonoff iHost | 希望复用 iHost 硬件资源的用户 | [查看教程](/installations/ihost) |
| 香橙派 | 使用 Orange Pi CM4 等开发板的用户 | [查看教程](/installations/orangepi) |
| Proxmox VE | 已有 PVE 宿主机、希望虚拟化部署的用户 | [查看教程](/installations/proxmox) |
| 飞牛 fnOS | 使用飞牛 NAS 虚拟机部署的用户 | [查看教程](/installations/fnos) |
| ESXi | 使用 VMware ESXi 宿主机部署的用户 | [查看教程](/installations/esxi) |
| 威联通 QNAP | 使用威联通 NAS 虚拟机工作站的用户 | [查看教程](/installations/qnap) |
| UTM（Mac） | 使用 Mac 部署的用户 | [查看教程](/installations/utm) |
| Hyper-V | 使用 Windows 虚拟化环境的用户 | [查看教程](/installations/hyperv) |

## 安装前建议

- 先确认目标平台对应的镜像格式，例如 `img.xz`、`qcow2.xz`，x86 物理机直装则为 `iso` 安装工具
- 烧录或导入前校验下载文件与目标磁盘，避免写错设备
- 首次启动 Home Assistant 需要一定时间，初始化阶段请耐心等待