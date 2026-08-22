---
title: "Asus Tinker Board"
sidebar_label: Asus Tinker Board
---

## 支持的硬件

| 设备         | 发布日期    | 支持状态 | 配置   |
|--------------|-------------|----------|--------|
| Tinker RK3288  | 2017 年 4 月    | 是     | [tinker](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/tinker_defconfig) |
| Tinker S RK3288| 2018 年 1 月  | 是     | [tinker](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/tinker_defconfig) |
| Tinker Edge T  | 2019 年 11 月 | 否？     |          |
| Tinker Edge R  | 2019 年 11 月 | 否？     |          |

## eMMC

eMMC 支持通过相同的镜像提供。只需通过 Micro-USB 将 Tinker Board S 连接到 PC，然后将镜像刷入 eMMC 即可。请参阅 Tinkerboard 文档，了解如何使用 Micro-USB 和 UMS 进行刷写。

Home Assistant OS 提供的 U-Boot 同样支持 UMS，
但需要进行手动操作：

 1. 将 Micro-USB 与 HDMI 之间的跳线设置为 maskrom 模式
 2. 插入 SD 卡，并通过 Micro-USB 将开发板连接到 PC
 3. 持续按 Ctrl+C 以中断启动
 4. 将跳线拨回 park 位置
 5. 使用以下命令启动 UMS：
```
ums 0 mmc 0
```
 6. 系统应显示一个 mass storage 设备。将 Home Assistant OS 刷入该设备即可。

## 串口控制台

要通过串口控制台访问终端，请在 `cmdline.txt` 中添加 `console=ttyS2,115200`。GPIO 引脚为：34 = GND / 32 = UART TXD / 33 = UART RXD。
