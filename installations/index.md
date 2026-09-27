# Home Assistant 安装指南 - x86、树莓派、iHost、香橙派与虚拟化部署 | 老王杂谈说

## 如何选择

* 拥有 x86 架构的普通电脑或主机：优先选择 `x86 物理机直装`
* 有实体硬件并希望低功耗常驻运行：优先选择 `树莓派`、`Sonoff iHost` 或 `香橙派`
* 已有家用服务器或虚拟化环境：优先选择 `Proxmox VE`、`飞牛`、`ESXi` 或 `Hyper-V`
* 使用 Mac 的用户：优先选择 `UTM`
* 如果你还没有下载镜像，可以先前往 [下载页](/download.md) 选择对应平台文件

## 当前支持的平台

| 平台 | 适合人群 | 入口 |
| --- | --- | --- |
| x86 物理机 | 拥有 x86 架构主机、希望直接安装实体机的用户 | [查看教程](/installations/x86.md) |
| 树莓派 | 想快速上手、生态成熟的用户 | [查看教程](/installations/raspberrypi.md) |
| Sonoff iHost | 希望复用 iHost 硬件资源的用户 | [查看教程](/installations/ihost.md) |
| 香橙派 | 使用 Orange Pi CM4 等开发板的用户 | [查看教程](/installations/orangepi.md) |
| Proxmox VE | 已有 PVE 宿主机、希望虚拟化部署的用户 | [查看教程](/installations/proxmox.md) |
| 飞牛 fnOS | 使用飞牛 NAS 虚拟机部署的用户 | [查看教程](/installations/fnos.md) |
| ESXi | 使用 VMware ESXi 宿主机部署的用户 | [查看教程](/installations/esxi.md) |
| 威联通 QNAP | 使用威联通 NAS 虚拟机工作站的用户 | [查看教程](/installations/qnap.md) |
| UTM（Mac） | 使用 Mac 部署的用户 | [查看教程](/installations/utm.md) |
| Hyper-V | 使用 Windows 虚拟化环境的用户 | [查看教程](/installations/hyperv.md) |

## 安装前建议

* 先确认目标平台对应的镜像格式，例如 `img.xz`、`qcow2.xz`，x86 物理机直装则为 `iso` 安装工具
* 烧录或导入前校验下载文件与目标磁盘，避免写错设备
* 首次启动 Home Assistant 需要一定时间，初始化阶段请耐心等待
