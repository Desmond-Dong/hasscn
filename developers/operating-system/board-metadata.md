# 开发板元数据

每个受支持的开发板都有一个名为 `meta` 的 Home Assistant Operating System（HAOS）专用元数据文件。本文档说明其中的变量及可用选项。

## 开发板专用变量

`BOARD_ID`:

开发板标识符。通常全部小写。用于生成文件名，并在 os-release 文件中作为 `VARIANT_ID` 使用。

`BOARD_NAME`:

面向用户的开发板名称。用于 os-release 文件中的 `VERSION` 和 `VARIANT` 变量。

## 与启动相关的变量

`BOOT_ENV_SIZE`:

boot loader environment 的最大大小（十六进制）。rauc 必填。

`BOOT_SYS`:

* efi
* hybrid
* mbr

HAOS 会尽可能使用 GPT。若要使用 GPT，第二个逻辑块（LBA）必须可用。在某些开发板上，该块会被启动固件保留或要求使用。如果是这种情况，就必须采用经典 MBR 方案。

如果可以使用 GPT，但底层固件仍要求 MBR，则使用 Hybrid，同时包含两种分区表。

`BOOT_SPL`:

* true
* false

启用 SPL（secondary program loader，二级程序加载器）处理。某些 U-Boot 目标除了主 U-Boot 二进制文件外，还会生成一个较小的加载器（SPL）。

`BOOTLOADER`:

* grub
* uboot

HAOS 主要使用 [U-Boot](https://www.denx.de/wiki/U-Boot)。对于 UEFI 系统，则使用 [GRUB](https://www.gnu.org/software/grub/)。

`DISK_SIZE`:

默认值为 2。最终（未压缩）镜像的大小，单位为 GB。

`KERNEL_FILE`:

内核二进制文件名。通常 aarch64 为 `Image`，`armv7` 为 `zImage`，`amd64` 为 `bzImage`。

## 与 Supervisor 相关的变量

`SUPERVISOR_MACHINE`:

* generic-x86-64
* khadas-vim3
* odroid-c2
* odroid-c4
* odroid-n2
* odroid-xu
* qemuarm
* qemuarm-64
* qemux86
* qemux86-64
* raspberrypi
* raspberrypi2
* raspberrypi3
* raspberrypi4
* raspberrypi3-64
* raspberrypi4-64
* tinker

`SUPERVISOR_ARCH`:

* amd64
* i386
* armhf
* armv7
* aarch64
