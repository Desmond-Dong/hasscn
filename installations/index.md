# Home Assistant 安装指南 - 树莓派、iHost、香橙派与虚拟化部署 | 老王杂谈说

## 如何选择

* 有实体硬件并希望低功耗常驻运行：优先选择 `树莓派`、`Sonoff iHost` 或 `香橙派`
* 已有家用服务器或虚拟化环境：优先选择 `Proxmox VE` 或 `Hyper-V`
* 如果你还没有下载镜像，可以先前往 [下载页](/download.md) 选择对应平台文件

## 当前支持的平台

| 平台 | 适合人群 | 入口 |
| --- | --- | --- |
| 树莓派 | 想快速上手、生态成熟的用户 | [查看教程](/installations/raspberrypi.md) |
| Sonoff iHost | 希望复用 iHost 硬件资源的用户 | [查看教程](/installations/ihost.md) |
| 香橙派 | 使用 Orange Pi CM4 等开发板的用户 | [查看教程](/installations/orangepi.md) |
| Proxmox VE | 已有 PVE 宿主机、希望虚拟化部署的用户 | [查看教程](/installations/proxmox.md) |
| Hyper-V | 使用 Windows 虚拟化环境的用户 | [查看教程](/installations/hyperv.md) |

## 安装前建议

* 先确认目标平台对应的镜像格式，例如 `img.xz` 或 `qcow2.xz`
* 烧录或导入前校验下载文件与目标磁盘，避免写错设备
* 首次启动 Home Assistant 需要一定时间，初始化阶段请耐心等待
