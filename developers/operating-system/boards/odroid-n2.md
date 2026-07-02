# Hardkernel ODROID-N2

## eMMC

eMMC 支持是透明提供的。像刷写 SD 卡一样将镜像刷到 eMMC 板上即可。

## 控制台

默认情况下，可通过串口排针和 HDMI 访问控制台。某些启动消息默认只会出现在串口控制台上。若想改为在 HDMI 控制台显示这些消息，请调整 boot 分区中 `cmdline.txt` 文件里两个控制台的顺序。如果你不打算使用串口适配器，也可以删除 AML0 控制台。
eg. `console=ttyAML0,115200n8 console=tty0`

## GPIO

请参阅 [the odroid wiki](https://wiki.odroid.com/odroid-n2/hardware/expansion_connectors)。
目前，Home Assistant OS 使用的上游内核尚未支持全部功能。

11 号引脚上的 GPIO 被用作低电平有效的电源按键输入。
