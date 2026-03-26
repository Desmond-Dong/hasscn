---
title: "Hardkernel ODROID-M1S"
sidebar_label: ODROID-M1S
---

Home Assistant OS 12 及更高版本支持 ODROID-M1S 开发板。

## SD-card

ODROID-M1S 可以直接从 SD 卡启动 HAOS，因为它的优先级高于 eMMC 上的系统。只需使用你喜欢的工具将镜像刷写到 SD 卡，并将其插入开发板上的 micro SD 插槽即可。即使 eMMC 已被清空，或者其中仍是出厂默认的 U-Boot SPL 加载器，这种方式也能工作，因为它仍然能够加载 HAOS 镜像中提供的 U-Boot。不过在后一种情况下，如果 SD 卡探测失败（例如硬件故障），系统可能会改为从 eMMC 启动，而不是启动 HAOS。

## eMMC

HAOS 可以使用一个特殊的启动镜像直接安装到 eMMC，步骤如下：

1. 下载 _UMS Utility_ 镜像：[`ODROID-M1S_EMMC2UMS.img`][1]。_UMS Utility_ 是一个可将 ODROID-M1S 切换为 USB 大容量存储设备的特殊镜像。
2. 使用 balenaEtcher 或其他工具将 _UMS utility_ 刷写到 SD 卡。
3. 将该 SD 卡插入你的 ODROID-M1S 并启动。然后将你的 PC 连接到 Micro USB OTG 端口。
4. 此时 eMMC 会在你的 PC 上显示为一个驱动器，你可以直接用 balenaEther 刷写 HAOS 镜像。

安装 HAOS 时，会用 HAOS 提供的主线版本替换 eMMC 上的固件和 SPL。因此，之后将无法再使用带有 EMMC2UMS 镜像的 SD 卡，因为当前（2024 年 2 月）主线 SPL 与 EMMC2UMS 镜像中的 U-Boot 不兼容。这对正常使用没有影响，只是在你想恢复到 Hardkernel 提供的 OS 时会更复杂一些。

在这种情况下，可靠的 eMMC 重刷方式是先将 [该二进制文件](https://dn.odroid.com/RK3566/ODROID-M1S/Installer/ODROID-M1S_EMMC2UMS.img) 下载到一台运行 ssh server 的 PC 上。
然后，在 Odroid M1S 设备上使用 HA CLI，输入 `login` 命令进入 root shell。
接着，从你的 PC 复制该二进制文件（例如 `ssh user@mypc.local:/path_to/ODROID-M1S_EMMC2UMS.img /tmp` —— 将其中的 user 替换为你在 PC 上的用户名，将 mypc.local 替换为你的计算机名或 IP 地址，将 path_to 替换为实际的下载路径）。这样会把该二进制文件复制到 HAOS 的 `/tmp/`。
然后运行 `dd if=/tmp/ORDOID-M1S_EMMC2UMS.img of=/dev/mmcblk0` —— 这会将二进制镜像写入 eMMC 的启动部分。

**警告：** 由于 odroid.com 页面启用了机器人检测，请不要使用 `curl` 命令，因为它**不会**下载真正的文件；这可能导致你的设备被刷坏！

采用这种方式后，在移除 SD 卡并下次启动时，设备会进入 UMS 模式。或者，你也可以直接使用 [Hardkernel installer image][2] 替代 EMMC2UMS 镜像。

## NVMe

不支持直接从 NVMe 启动。NVMe 卡可作为数据盘使用。

## 启动流程技术说明

Home Assistant OS 镜像可由 SoC 直接启动。关于启动过程中哪些部分从 eMMC 执行、哪些部分从 SD 卡执行，请参阅 [boot sequence documentation][3]。不过，上面记录的步骤应该已经覆盖了标准用户在使用中可能遇到的所有场景。

## 控制台

默认情况下，可通过串口排针（UART）和 HDMI 访问控制台。
串口控制台默认波特率为 1500000。

systemd 启动消息默认只会出现在串口控制台上。
若想改为在 HDMI 控制台显示这些消息，请手动将对应控制台
添加到 boot 分区的 `cmdline.txt` 文件中（例如 `console=tty0`）。

## GPIO

Odroid-M1S 引入了一个新的 14 针扩展排针。请参阅 [the ODROID wiki][4]。
目前，Home Assistant OS 使用的上游内核尚未支持其全部功能。  
目前支持的模块包括：
- UPS
- Internal USB
- Mini IO board（部分支持）


[1]: https://dn.odroid.com/RK3566/ODROID-M1S/Installer/ODROID-M1S_EMMC2UMS.img
[2]: https://wiki.odroid.com/odroid-m1s/getting_started/os_installation_guide#user_installer
[3]: https://wiki.odroid.com/odroid-m1s/board_support/boot_sequence
[4]: https://wiki.odroid.com/odroid-m1s/hardware/expansion_connectors
