---
pageType: home
title: 'Home Assistant 安装指南 - 树莓派、iHost、香橙派与虚拟化部署 | 老王杂谈说'
description: '汇总 Home Assistant OS 极速版的常见安装方式，覆盖树莓派、Sonoff iHost、香橙派、Proxmox VE 与 Hyper-V，帮助你快速选择合适的部署路径。'
keywords: 'Home Assistant, Home Assistant 中文, 安装指南, 树莓派, Sonoff iHost, 香橙派, Proxmox, Hyper-V, HAOS'
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
      text: 树莓派刷机
      link: /installations/raspberrypi

features:
  - title: 树莓派
    details: 适合 Raspberry Pi 3、4、5 用户，使用 Balena Etcher 或 Raspberry Pi Imager 烧录镜像。
    icon: SBC
    link: /installations/raspberrypi
  - title: Sonoff iHost
    details: 适合希望在 iHost 上直接启动 Home Assistant 的用户，包含 SD 卡烧录、启动与硬件资源说明。
    icon: iHost
    link: /installations/ihost
  - title: 香橙派
    details: 适合 Orange Pi CM4 等设备，包含卡刷参考与 EMMC 写入流程。
    icon: OPI
    link: /installations/orangepi
  - title: Proxmox VE
    details: 适合在 PVE 中创建虚拟机部署 Home Assistant，重点覆盖 qcow2 导入与关键虚拟机设置。
    icon: PVE
    link: /installations/proxmox
  - title: Hyper-V
    details: 适合在 Windows Hyper-V 环境下部署，当前为简版入口，后续可继续补充完整流程。
    icon: VM
    link: /installations/hyperv
---

# Home Assistant 安装指南 - 树莓派、iHost、香橙派与虚拟化部署 | 老王杂谈说

## 如何选择

- 有实体硬件并希望低功耗常驻运行：优先选择 `树莓派`、`Sonoff iHost` 或 `香橙派`
- 已有家用服务器或虚拟化环境：优先选择 `Proxmox VE` 或 `Hyper-V`
- 如果你还没有下载镜像，可以先前往 [下载页](/download) 选择对应平台文件

## 当前支持的平台

| 平台 | 适合人群 | 入口 |
| --- | --- | --- |
| 树莓派 | 想快速上手、生态成熟的用户 | [查看教程](/installations/raspberrypi) |
| Sonoff iHost | 希望复用 iHost 硬件资源的用户 | [查看教程](/installations/ihost) |
| 香橙派 | 使用 Orange Pi CM4 等开发板的用户 | [查看教程](/installations/orangepi) |
| Proxmox VE | 已有 PVE 宿主机、希望虚拟化部署的用户 | [查看教程](/installations/proxmox) |
| Hyper-V | 使用 Windows 虚拟化环境的用户 | [查看教程](/installations/hyperv) |

## 安装前建议

- 先确认目标平台对应的镜像格式，例如 `img.xz` 或 `qcow2.xz`
- 烧录或导入前校验下载文件与目标磁盘，避免写错设备
- 首次启动 Home Assistant 需要一定时间，初始化阶段请耐心等待