# Insteon 用户请看！

*美国智能家居公司 Insteon 突然停摆并关闭了它的云服务。虽然 Insteon 产品本身仍然支持本地通信，但它们的应用和语音助手集成并不支持。失去这些服务后，用户将无法控制和配置自己的中枢，自动化也无法继续运行。*

如果你正是受到影响的 Insteon 用户，这篇文章就是写给你的。

好消息是，Home Assistant 仍然可以通过 Insteon hub 或 modem 与你的 Insteon 设备通信。你依然可以像以前一样配对新设备、设置链接。

另一个好消息是，Home Assistant 完全在本地运行。它的任何功能都不依赖云端，也没有人可以远程把它关掉。

<p class='img'>
<img src='/home-assistant/images/integrations/insteon/insteon-products.jpg' alt='支持的 Insteon modem 和 hub 概览'>
支持的 Insteon modem 和 hub 概览
</p>

运行 Home Assistant 的方式有很多。最简单也最推荐的方法，是[购买一台专门运行 Home Assistant 的设备](/home-assistant/blog/2022/04/16/devices-to-run-home-assistant/)。另外，如果你家里已经有服务器，并且熟悉相关技术，也可以尝试我们的[虚拟机](/home-assistant/installation/alternative.md#install-home-assistant-operating-system)或 [Docker 容器](/home-assistant/installation/alternative.md#install-home-assistant-container)安装方式。

当 Home Assistant 运行起来之后，请查看 Insteon 集成的[文档](https://www.home-assistant.io/integrations/insteon/)，了解如何进行设置。它支持 [2413U] USB 和 [2412S] RS242 版本的 PLM，以及 [2448A7] USB stick。它也已经测试可与 [2242] 和 [2245] Hub 配合工作。

[Tom Harris](https://github.com/teharris1) 正在主导 Home Assistant 中 Insteon 集成的开发，目前他还在为 Home Assistant 界面打磨一个全新的 Insteon 页面。这个页面将让你更轻松地管理 Insteon 网络，就像过去在 Insteon 官方应用中那样。预计 1-2 周内就会推出。

<p class='img'>
<img src='/home-assistant/images/blog/2022-04-for-insteon-users/insteon-panel-1.jpg' alt='即将推出的 Insteon 页面截图'>
即将推出的 Insteon 页面截图
</p>

Home Assistant 拥有一个开放且友善的社区，非常乐意帮助新用户。如果你遇到困难，欢迎加入我们的 [Discord 聊天](/home-assistant/join-chat/) 或访问[论坛](https://www.home-assistant.io/join-chat/)。

如果你想和其他 Insteon 用户交流，我们推荐你前往 [Reddit 上的 /r/Insteon 社区](https://www.reddit.com/r/insteon/)。

如果你想及时了解 Home Assistant 的最新发布，可以关注我们的 [Twitter](https://twitter.com/home_assistant)、[Facebook](https://www.facebook.com/homeassistantio)，或者[订阅新闻简报](/home-assistant/newsletter/)。

<p class='img'>
<img src='/home-assistant/images/blog/2022-04-for-insteon-users/insteon-panel-2.jpg' alt='另一张即将推出的 Insteon 页面截图'>
另一张即将推出的 Insteon 页面截图
</p>

[2413U]: https://www.insteon.com/powerlinc-modem-usb

[2412S]: https://www.insteon.com/powerlinc-modem-serial

[2448A7]: https://www.smarthome.com/insteon-2448a7-portable-usb-adapter.html

[2245]: https://www.insteon.com/insteon-hub/

[2242]: https://www.insteon.com/support-knowledgebase/2014/9/26/insteon-hub-owners-manual
