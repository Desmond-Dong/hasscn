---
title: HomeMatic/homematicIP 支持的新附加组件 - 需要采取行动
description: 为了在未来进一步改进 HomeMatic 支持，我们将弃用当前的
  HomeMatic CCU 附加组件，改为推荐功能更完整的 RaspberryMatic CCU 附加组件。
---

如果你正在将 HomeMatic/homematicIP 智能家居产品与 Home Assistant 搭配使用，那么未来会变得更加明朗。

[RaspberryMatic](https://raspberrymatic.de/de/home/) 团队在过去几个月里一直努力把他们的替代版 HomeMatic CCU 操作系统做成一个成熟的 [Home Assistant 附加组件](https://github.com/jens-maus/RaspberryMatic/tree/master/home-assistant-addon)。与我们自己的 `HomeMatic CCU` 附加组件相比，这个第三方附加组件提供了更先进的功能，因此现在它已经成为把 Home Assistant 作为 HomeMatic CCU 智能家居中枢来使用时的推荐方案。官方仓库中的旧版 `HomeMatic CCU` 附加组件现已弃用。

为了让迁移尽可能顺利，我们最新版本的附加组件也加入了最后一项关键功能：创建并导出备份。前往 WebUI，选择 **Create Backup** 来生成 `.sbk` 系统备份文件。然后停止我们的 `HomeMatic CCU` 附加组件，安装 [RaspberryMatic CCU 插件](https://github.com/jens-maus/RaspberryMatic/wiki/Installing-HomeAssistant)，再导入该备份文件，就可以继续使用你现有的所有 HomeMatic/homematicIP 设备。特别感谢 Jens Maus 促成了这一切！

<a href='https://github.com/jens-maus/RaspberryMatic/tree/master/home-assistant-addon'><img src='/home-assistant/images/blog/2022-02/raspberrymatic-ccu-addon.png' style='border: 0;box-shadow: none;'></a>

另外，从 Home Assistant OS 7.3 开始，HAOS 在搭配 HomeMatic+homematicIP 使用时支持双 HomeMatic+homematicIP 通信。使用 [HmIP-RFUSB](https://de.elv.com/elv-homematic-ip-arr-bausatz-rf-usb-stick-fuer-alternative-steuerungsplattformen-hmip-rfusb-fuer-smart-home-hausautomation-152306) RF USB Stick 时，需要使用 `RaspberryMatic CCU` 附加组件。不过，这项变化也会给仍在使用旧版 HomeMatic CCU 附加组件的现有安装带来一个设备命名更新：如果你使用的是 HmIP-RFUSB，在升级到 OS 7.3 后，需要手动把 `hmip` 设备设置更新为 `/dev/raw-uart`。当然，更好的做法是现在就迁移到 RaspberryMatic CCU 附加组件，这样你就能获得完整、无云的智能家居中枢体验，就像厂商提供的 `CCU3` 一样。

最后，同样重要的是，我们才刚刚开始彻底重构 Home Assistant 内置的 HomeMatic/homematicIP 设备集成层。虽然仍处于**早期开发**阶段，但[这次完整重构](https://github.com/danielperna84/custom_homematic)将带来出色的新功能、更轻松的设置方式，以及对所有 HomeMatic/homematicIP 设备更完整的集成支持。

因此，在 Home Assistant 中使用 HomeMatic/homematicIP 设备的未来从未像现在这样值得期待，现在正是加入的好时机！
