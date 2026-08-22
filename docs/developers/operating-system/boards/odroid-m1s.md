---
title: "Hardkernel ODROID-M1S"
sidebar_label: ODROID-M1S
---

Home Assistant OS 12 及更高版本支持 ODROID-M1S 板。

## SD-card

ODROID-M1S 可以直接从 SD 卡启动 HAOS，因为 SD 卡的优先级高于 eMMC 上的系统。只需使用你喜欢的工具将镜像刷入 SD 卡，然后将其插入板上的 micro SD 槽即可。即使 eMMC 被清空，或者其中包含出厂默认的 U-Boot SPL 加载器，这也同样有效，因为该加载器仍然能够加载 HAOS 镜像中提供的 U-Boot。但在后一种情况下，如果 SD 卡探测失败（例如，由于硬件故障），则可能会启动 eMMC 上的系统，而非 HAOS。

## eMMC

可以使用特殊的 boot image 将 HAOS 直接安装到 eMMC 上，步骤如下：

1. 下载 _UMS Utility_ 镜像：[`ODROID-M1S_EMMC2UMS.img`][1]。_UMS Utility_ 是一种特殊镜像，可将 ODROID-M1S 切换为 USB Mass Storage 设备。
2. 使用 balenaEtcher 或其他工具将 _UMS utility_ 刷入 SD 卡。
3. 将该 SD 卡插入 ODROID-M1S 并启动它。将你的 PC 连接到 Micro USB OTG 端口。
4. eMMC 将作为驱动器显示在你的 PC 上，你可以直接使用 balenaEtcher 刷入 HAOS 镜像。

安装 HAOS 会用 HAOS 提供的主线版本替换 eMMC 上的 firmware 和 SPL。因此，无法再使用带有 EMMC2UMS 镜像的 SD 卡，因为主线 SPL 目前（2024 年 2 月）与 EMMC2UMS 镜像中的 U-Boot 不兼容。这对标准使用不会造成任何问题，只是在你想要恢复到 Hardkernel 提供的操作系统时，会变得更复杂一些。

在这种情况下重新刷写 eMMC 的可靠方法是，将 [the binary](https://dn.odroid.com/RK3566/ODROID-M1S/Installer/ODROID-M1S_EMMC2UMS.img) 从 Odroid 下载到运行 ssh server 的 PC 上。
然后，在 Odroid M1S 设备上使用 HA CLI，输入 `login` 命令进入 root shell。
从那里，将二进制文件从你的 PC 复制过来（例如，`ssh user@mypc.local:/path_to/ODROID-M1S_EMMC2UMS.img /tmp` ——将 user 替换为你在 PC 上的用户名，将 mypc.local 替换为你的计算机名或 IP 地址，将 path_to 替换为你下载的二进制文件的实际路径）。该命令随后会将二进制文件复制到你的 HAOS 的 /tmp/ 中。
接下来，运行 `dd if=/tmp/ORDOID-M1S_EMMC2UMS.img of=/dev/mmcblk0` ——这会将二进制镜像写入 eMMC 的 boot 部分。

**警告：** 由于 odroid.com 页面存在机器人检测，请勿使用 curl 命令，因为它不会下载实际文件；这有使你的设备变砖的风险！

这样，设备在下次启动时（移除 SD 卡后）将以 UMS 模式启动。或者，你也可以直接使用 [Hardkernel installer image][2] 代替 EMMC2UMS 镜像。

## NVMe

不支持直接从 NVMe 启动。NVMe 卡可作为数据盘使用。

## 启动流程技术说明

Home Assistant OS 镜像可由 SoC 直接启动。有关从 eMMC 执行启动的哪一部分、从 SD 卡执行哪一部分的详细信息，请参阅 [boot sequence documentation][3]。但上述记录的步骤应涵盖普通用户在使用过程中可能遇到的所有场景。

## Console

默认情况下，可在串口 header（UART）和 HDMI 上获得控制台访问。
串口控制台的波特率默认为 1500000。

systemd 启动消息默认仅在串口控制台上显示。
若要在 HDMI 控制台上显示这些消息，请手动将 console 添加到 boot 分区上的 `cmdline.txt` 文件中（例如，`console=tty0`）。

## GPIO

Odroid-M1S 引入了一个新的 14pin 扩展 header。请参考 [the ODROID wiki][4]。
目前，Home Assistant OS 使用的上游 kernel 尚不支持所有功能。  
受支持的模块包括：
- UPS
- Internal USB
- Mini IO board（部分支持）


[1]: https://dn.odroid.com/RK3566/ODROID-M1S/Installer/ODROID-M1S_EMMC2UMS.img
[2]: https://wiki.odroid.com/odroid-m1s/getting_started/os_installation_guide#user_installer
[3]: https://wiki.odroid.com/odroid-m1s/board_support/boot_sequence
[4]: https://wiki.odroid.com/odroid-m1s/hardware/expansion_connectors
