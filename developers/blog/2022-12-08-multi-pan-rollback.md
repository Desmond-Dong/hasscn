**更新：** multi-pan 已修复，从 Home Assistant 2023.2 开始，用户可以重新选择加入实验版本。

在 [Home Assistant 2022.12](https://www.home-assistant.io/blog/2022/12/07/release-202212/) 中，我们软发布了实验性的 multi-pan 功能：允许使用 Home Assistant Yellow 和 Home Assistant SkyConnect 中的单个 radio 同时运行 Zigbee 和 Thread。用户需要在硬件菜单中找到它，确认实验说明并选择加入。

我们刚刚在固件中发现了一个严重的 bug，需要修复。这就是我们决定从 Home Assistant 2022.12.1 开始暂时禁止用户选择加入 multi-pan 的原因。

该 bug 是 Zigbee end-device 无法通过 coordinator 重新加入网络：coordinator 会将其踢出并要求重新加入，反复如此。普通的 EmberZNet 固件不会出现这种行为。它仅影响直接加入 coordinator 的 end device，而不是通过中间 router 加入的设备，并且仅影响那些尝试重新加入网络的设备。

我们正在与 Silicon Labs 合作，尽快解决此问题。一旦解决，我们将重新启用 multi-pan。

启用 multi-pan 会在您的 radio 上安装特殊固件。要禁用 multi-pan，需要重新安装原始的 Zigbee 固件。目前这还无法从 Home Assistant 自动完成。我们将尽快通过浏览器方式更新此帖子的操作说明。
