## 支持的硬件

| 设备               | 发布日期    | 支持状态       | 配置                                 |
|--------------------|-------------|----------------|--------------------------------------|
| Raspberry Pi 3 B/B+ |2016/2018    | 是             | [rpi3\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi3_64_defconfig) |
| Raspberry Pi 4 B    |2019         | 是             | [rpi4\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi4_64_defconfig) |
| Raspberry Pi 5      |2023         | 是（beta）     | [rpi5\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi5_64_defconfig) |

## 串口控制台

要通过串口控制台访问终端，请在 `cmdline.txt` 中添加 `console=ttyAMA0,115200`，并在 `config.txt` 中添加 `enable_uart=1`、`dtoverlay=pi3-disable-bt`。GPIO 引脚为：6 = GND / 8 = UART TXD / 10 = UART RXD。

## I2C

在 `config.txt` 中添加 `dtparam=i2c1=on` 和 `dtparam=i2c_arm=on`。之后我们通过[config usb stick][config]在主机上创建模块文件，或直接添加到 `/etc/modules-load.d`。

rpi-i2c.conf:

```
i2c-dev
i2c-bcm2708
```

## USB 启动

Raspberry Pi 4（仅 64 位）、3B、3B+ 和 3A+ 支持 USB 大容量存储启动。

对于 Raspberry Pi 3B 和 3A+，要启用 USB 启动，请在 `config.txt` 中添加 `program_usb_boot_mode=1`。请注意，这会**永久**更改设备的单次可编程内存。

对于 Raspberry Pi 4

* 确保将 bootloader 更新为支持 USB 大容量存储启动的稳定版本（参见 [bcm2711\_bootloader\_config.md](https://www.raspberrypi.org/documentation/hardware/raspberrypi/bcm2711_bootloader_config.md#usbmassstorageboot)）。
* 如果不使用 SD 卡，请在 `config.txt` 中的 `dtparam`（逗号分隔）中添加 `sd_poll_once=on`。这将消除 `mmc0: timeout waiting for hardware interrupt` 内核错误。
* 如果安装仍然失败，则你的 SSD 可能需要启用 quirks 才能正常工作（参见 [Finding the VID and PID of your USB SSD](https://www.raspberrypi.org/forums/viewtopic.php?t=245931)）。找到适配器 ID 后，在 `cmdline.txt` 中添加 quirks 参数。

更多信息请参见 [RaspberryPi](https://www.raspberrypi.org/documentation/hardware/raspberrypi/bootmodes/msd.md)。

### 注意事项

* 必须移除所有可启动的 SD 卡。
* USB 启动时启动时间会显著更长。这是因为启动过程首先尝试从 SD 卡启动，失败后才会回退到 USB。
* 许多 USB 驱动器根本无法用于启动。这可能是由于 uboot 中最小的驱动支持所致，且不会修复。如果无法在某个驱动器上启动，请尝试不同的品牌/型号。SanDisk Cruzer 驱动器似乎问题发生率较高。

## 调整

如果你不需要蓝牙，可以在 `config.txt` 中添加 `dtoverlay=pi3-disable-bt` 来禁用它。

[config]: /developers/operating-system/configuration.md#automatic
