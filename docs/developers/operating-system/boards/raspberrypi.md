---
title: "Raspberry Pi"
description: '如需通过串口控制台访问终端，请在 cmdline.txt 中添加 console=ttyAMA0,115200，并在 config.txt 中添加 enableuart=1、dtoverlay=pi3-disable-bt。GPIO 引脚为：6 = GND / 8 = UART TXD / 10 =。'
sidebar_label: Raspberry Pi
---
# Raspberry Pi

## 支持的硬件

| Device              | Release Date  | Support         | Config             |
|---------------------|---------------|-----------------|--------------------|
| Raspberry Pi 3 B/B+ |2016/2018      | yes             | [rpi3_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi3_64_defconfig) |
| Raspberry Pi 4 B    |2019           | yes             | [rpi4_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi4_64_defconfig) |
| Raspberry Pi 5      |2023           | yes (beta)      | [rpi5_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi5_64_defconfig) |

## 串口控制台

如需通过串口控制台访问终端，请在 `cmdline.txt` 中添加 `console=ttyAMA0,115200`，并在 `config.txt` 中添加 `enable_uart=1`、`dtoverlay=pi3-disable-bt`。GPIO 引脚为：6 = GND / 8 = UART TXD / 10 = UART RXD。

## I2C

在 `config.txt` 中添加 `dtparam=i2c1=on` 和 `dtparam=i2c_arm=on`。之后可通过[配置 U 盘][config]在主机上创建模块文件，或直接写入 `/etc/modules-load.d`。

rpi-i2c.conf:
```
i2c-dev
i2c-bcm2708
```

## USB 启动

Raspberry Pi 4（仅 64 位）、3B、3B+ 和 3A+ 支持 USB 大容量存储启动。

对于 Raspberry Pi 3B 和 3A+，要启用 USB 启动，请在 `config.txt` 中添加 `program_usb_boot_mode=1`。请注意，这会**永久性**修改设备的一次性可编程内存。

对于 Raspberry Pi 4

* 请确保将 bootloader 更新到支持 USB 大容量存储启动的稳定版本（参见 [bcm2711_bootloader_config.md](https://www.raspberrypi.org/documentation/hardware/raspberrypi/bcm2711_bootloader_config.md#usbmassstorageboot)）。
* 如果不使用 SD 卡，请在 `config.txt` 中的 `dtparam` 添加 `sd_poll_once=on`（使用逗号分隔）。这样可消除 `mmc0: timeout waiting for hardware interrupt` 内核错误。
* 如果安装仍然失败，则你的 SSD 很可能需要启用 quirks 才能正常工作（参见 [Finding the VID and PID of your USB SSD](https://www.raspberrypi.org/forums/viewtopic.php?t=245931)）。找到适配器 ID 后，请在 `cmdline.txt` 中添加 quirks 参数。

更多信息请参阅 [RaspberryPi](https://www.raspberrypi.org/documentation/hardware/raspberrypi/bootmodes/msd.md)。

### 注意事项

* 必须移除所有可启动的 SD 卡。
* 使用 USB 启动时，启动时间可能明显变长。这是因为启动流程会先尝试从 SD 卡启动，失败后才退回到 USB。
* 许多 USB 设备根本无法用于启动。这很可能是因为 uboot 中的驱动支持极其有限，且不会修复。如果某个盘无法启动，请尝试其他品牌或型号。SanDisk Cruzer 设备似乎更容易出现问题。

## 调整

如果你不需要 bluetooth，可在 `config.txt` 中加入 `dtoverlay=pi3-disable-bt` 将其禁用。

[config]: ../configuration.md#automatic
