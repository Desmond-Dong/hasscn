---
title: 是否支持 Raspberry Pi 4 的 USB 启动？
description: 'Home Assistant 提供数据磁盘功能，可将所有数据转移到已连接的 USB 硬盘上。SD 卡仍会继续使用，但仅用于承载 Home Assistant OS。了解数据磁盘功能的更多信息。(/home-assistant/common-tasks/os/using-external-data-disk)。'
---
# 是否支持 Raspberry Pi 4 的 USB 启动？

Home Assistant 提供数据磁盘功能，可将所有数据转移到已连接的 USB 硬盘上。SD 卡仍会继续使用，但仅用于承载 Home Assistant OS。[了解数据磁盘功能的更多信息。](/home-assistant/common-tasks/os/#using-external-data-disk)

**从 USB 启动**

由于 USB 以及 USB 大容量存储设备类别本身较为复杂，因此从 USB 设备启动是一个较为脆弱的过程。从 USB 驱动器启动时，这个过程必须经历多个阶段（固件或引导加载程序，以及操作系统），而且很可能会在其中某个阶段无法顺利完成。

尽管如此，完全从 USB 驱动器（SSD 或其他任何 USB 大容量存储设备）启动 Home Assistant OS 对于*某些* USB 设备来说是可行的。已知可与 Raspberry Pi OS 配合使用的 USB 设备（请参阅 Raspberry Pi Forum）更有可能也能与 Home Assistant OS 配合使用。不过，由于 Home Assistant OS 的启动链中还包含 U-Boot，因此有些已知可在 Raspberry Pi OS 上运行的设备，在 Home Assistant OS 上却*无法*运行。要找到合适的硬件组合，往往需要反复尝试。
