## eMMC

eMMC 支持是透明提供的。只需将镜像刷入 eMMC 板，就像刷入 SD 卡一样。

## 控制台

默认情况下，通过串口 header 和 HDMI 提供控制台访问。某些启动消息默认仅在串口控制台上显示。要在 HDMI 控制台上显示这些消息，请交换 boot 分区上 `cmdline.txt` 文件中两个控制台的顺序。如果你不打算使用串口适配器，也可以删除 AML0 控制台。
例如，`console=ttyAML0,115200n8 console=tty0`

## GPIO

请参考 [odroid wiki](https://wiki.odroid.com/odroid-n2/hardware/expansion_connectors)。
目前，Home Assistant OS 使用的上游内核尚不支持所有功能。

第 11 号引脚上的 GPIO 被用作低电平有效的电源按钮输入。
