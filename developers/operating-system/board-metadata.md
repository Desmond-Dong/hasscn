每个受支持的板卡都有一个 Home Assistant Operating System（HAOS）特有的元数据文件，名为 `meta`。这记录了变量和可用的选项。

## 板卡特定变量

`BOARD_ID`：

板卡标识符。通常为全小写。用于生成文件名，并在 os-release 文件中用作 `VARIANT_ID`。

`BOARD_NAME`：

用户友好的板卡名称。用于 os-release 文件中的 `VERSION` 和 `VARIANT` 变量。

## 启动相关变量

`BOOT_ENV_SIZE`：

bootloader 环境的最大大小（以十六进制表示）。rauc 需要此参数。

`BOOT_SYS`：

* efi
* hybrid
* mbr

HAOS 在可能的情况下尽量使用 GPT。要使用 GPT，第二个逻辑块（LBA）必须可用。在某些板卡上，该块被 boot 固件保留或需要。如果是这种情况，则需要使用经典 MBR 方法。

Hybrid 在 GPT 可用的情况下同时使用两种分区表，但底层固件仍需要 MBR。

`BOOT_SPL`：

* true
* false

启用 SPL（secondary program loader）处理。某些 U-Boot 目标除了主要的 U-Boot 二进制文件外，还会生成一个小的加载器（SPL）。

`BOOTLOADER`：

* grub
* uboot

HAOS 主要使用 [U-Boot](https://www.denx.de/wiki/U-Boot)。对于 UEFI 系统，使用 [GRUB](https://www.gnu.org/software/grub/)。

`DISK_SIZE`：

默认值为 2。最终（未压缩）镜像的大小，单位为 GB。

`KERNEL_FILE`：

内核二进制文件的文件名。aarch64 通常为 `Image`，`armv7` 为 `zImage`，`amd64` 为 `bzImage`。

## Supervisor 相关变量

`SUPERVISOR_MACHINE`：

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

`SUPERVISOR_ARCH`：

* amd64
* i386
* armhf
* armv7
* aarch64
