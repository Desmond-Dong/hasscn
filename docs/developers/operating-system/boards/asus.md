---
title: "Asus Tinker Board"
sidebar_label: Asus Tinker Board
---

## 支持的硬件

| Device         | Release Date  | Support | Config   |
|----------------|---------------|---------|----------|
| Tinker RK3288  | April 2017    | yes     | [tinker](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/tinker_defconfig) |
| Tinker S RK3288| January 2018  | yes     | [tinker](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/tinker_defconfig) |
| Tinker Edge T  | November 2019 | no?     |          |
| Tinker Edge R  | November 2019 | no?     |          |

## eMMC

同一镜像即可支持 eMMC。只需通过 Micro-USB 将 Tinker Board S 连接到你的 PC，并将镜像刷写到 eMMC。请参阅 Tinkerboard 文档，了解如何使用 Micro-USB 和 UMS 进行刷写。

Home Assistant OS 提供的 U-Boot 也支持 UMS，
但需要手动干预：

  1. 将 Micro-USB 和 HDMI 之间的跳线设置为 maskrom 模式
  2. 插入 SD 卡，并通过 Micro-USB 将开发板连接到你的 PC
  3. 持续按下 Ctrl+C 以中断启动
  4. 将跳线恢复到停放位置
  5. 使用以下命令启动 UMS：
```
ums 0 mmc 0
```
  6. 此时应会出现一个大容量存储设备。将 Home Assistant OS 刷写到其中。

## 串口控制台

如需通过串口控制台访问终端，请在 `cmdline.txt` 中添加 `console=ttyS2,115200`。GPIO 引脚为：34 = GND / 32 = UART TXD / 33 = UART RXD。
