---
title: "Hardkernel ODROID-C2"
sidebar_label: ODROID-C2
---

## eMMC

eMMC 支持是透明提供的。只需像刷入 SD 卡一样将镜像刷入 eMMC 板即可。

## 控制台

默认情况下，控制台访问通过串口 header 和 HDMI 提供。某些启动消息默认仅在串口控制台上显示。若要在 HDMI 控制台上显示这些消息，请交换 boot 分区上 `cmdline.txt` 文件中两个控制台的顺序。如果你不打算使用串口适配器，也可以删除 AML0 控制台。
例如，`console=ttyAML0,115200n8 console=tty0`

## USB

一个长期存在的 kernel 漏洞目前会导致一些异常行为。要使用 USB，必须在硬启动时将设备插入其中一个 USB 端口。如果所有设备都被从 USB 端口移除，USB 将停止工作，直到重启。

### OTG

OTG USB 尚未经过测试。

## GPIO

请参考 [the odroid wiki](https://wiki.odroid.com/odroid-c2/hardware/expansion_connectors)。
