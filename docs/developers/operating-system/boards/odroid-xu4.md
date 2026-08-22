---
title: "Hardkernel ODROID-XU4"
sidebar_label: ODROID-XU4
---

## eMMC

ODROID XU4 使用 eMMC boot 分区来启动。通常 eMMC 读卡器无法写入该 eMMC boot 分区。有以下几种可能：

1. **可工作** 例如，在刷入 HassOS 之前 eMMC 上已经有一个可工作的镜像：
   - 它将启动到 U-Boot（但无法继续）。
     - 如果你有串口适配器，应该能够在 uboot 提示符下输入 `distro_bootcmd` 以继续启动。
     - 如果没有，将 HassOS 镜像刷入 SD 卡并暂时从该卡启动（同时 eMMC 也保持连接）。
   - 启动后，在提示符处登录，然后在 linux 提示符下输入 `dd if=/dev/mmcblk0 of=/dev/mmcblk0boot0 bs=512 skip=63 seek=62 count=1440`。
   - 使用 eMMC 重启（别忘了将 boot 开关切换到 eMMC）
2. **不可工作** 例如，eMMC boot 分区是干净/已清空/已损坏的：
   - 你需要按照 [Hardkernel's instructions](https://forum.odroid.com/viewtopic.php?f=53&t=6173) 来获取一个可工作的 boot sector。然后刷入 HassOS 并遵循上述说明。
   - 或者，你可以尝试将 HassOS 同时刷入 SD 卡和 eMMC，然后从 SD 卡启动（同时 eMMC 也保持连接），然后在 Linux 提示符下运行 `dd if=/dev/mmcblk1 of=/dev/mmcblk0boot0 bs=512 skip=1 seek=0 count=16381`。注意，此方法尚未经过测试，但理论上应该可以工作。

如果在使用 dd 命令时遇到权限问题，请尝试禁用 RO：
`echo 0 > /sys/block/mmcblk0boot0/force_ro`
运行 dd 后重新启用：
`echo 1 > /sys/block/mmcblk0boot0/force_ro`

## Console

默认情况下，控制台访问通过串口 header 和 HDMI 提供。某些启动消息默认仅在串口控制台上显示。若要在 HDMI 控制台上显示这些消息，请交换 boot 分区上 `cmdline.txt` 文件中两个控制台的顺序。如果你不打算使用串口适配器，也可以删除 SAC2 控制台。
例如，`console=tty1 console=ttySAC2,115200`

## GPIO

请参考 [the odroid wiki](https://wiki.odroid.com/odroid-xu4/hardware/expansion_connectors)。
