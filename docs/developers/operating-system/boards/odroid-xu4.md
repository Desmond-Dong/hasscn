---
title: "Hardkernel ODROID-XU4"
description: 'ODROID XU4 使用 eMMC 启动分区进行启动。通常 eMMC 读卡器无法写入这个 eMMC 启动分区。这里有几种情况：。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: ODROID-XU4
---
# Hardkernel ODROID-XU4

## eMMC

ODROID XU4 使用 eMMC 启动分区进行启动。通常 eMMC 读卡器无法写入这个 eMMC 启动分区。这里有几种情况：

1. **可工作**，例如刷写 HassOS 之前 eMMC 上已经有一个可工作的镜像：
   - 它会启动到 U-Boot（但不会继续）。
     - 如果你有串口适配器，应当可以在 uboot 提示符下输入 `distro_bootcmd` 继续启动。
     - 否则，可先将 HassOS 镜像刷写到 SD 卡，并临时从 SD 卡启动（同时保持 eMMC 已插入）。
   - 启动后，在提示界面登录，然后在 linux 提示符下输入 `dd if=/dev/mmcblk0 of=/dev/mmcblk0boot0 bs=512 skip=63 seek=62 count=1440`。
   - 切换回 eMMC 并重启（别忘了把启动开关拨到 eMMC）
2. **不可工作**，例如 eMMC 启动分区是全新/已清空/已损坏的：
   - 你需要按照 [Hardkernel's instructions](https://forum.odroid.com/viewtopic.php?f=53&t=6173) 获取一个可工作的启动扇区。然后刷入 HassOS，并按上面的说明继续操作。
   - 或者，你也可以尝试同时将 HassOS 刷到 SD 卡和 eMMC，然后在保持 eMMC 已插入的情况下从 SD 卡启动，再在 Linux 提示符下运行 `dd if=/dev/mmcblk1 of=/dev/mmcblk0boot0 bs=512 skip=1 seek=0 count=16381`。请注意，这种方式尚未测试，但理论上应当可行。

如果你在使用 `dd` 命令时遇到权限问题，可尝试关闭只读：
`echo 0 > /sys/block/mmcblk0boot0/force_ro`
运行完 `dd` 后重新启用：
`echo 1 > /sys/block/mmcblk0boot0/force_ro`

## 控制台

默认情况下，可通过串口排针和 HDMI 访问控制台。某些启动消息默认只会出现在串口控制台上。若想改为在 HDMI 控制台显示这些消息，请调整 boot 分区中 `cmdline.txt` 文件里两个控制台的顺序。如果你不打算使用串口适配器，也可以删除 SAC2 控制台。
eg. `console=tty1 console=ttySAC2,115200`

## GPIO

请参阅 [the odroid wiki](https://wiki.odroid.com/odroid-xu4/hardware/expansion_connectors)。
