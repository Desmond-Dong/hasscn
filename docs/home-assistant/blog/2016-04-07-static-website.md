---
title: Static website
description: Serving a static website with Home Assistant.
---

Home Assistant 的前端借助本地 Web 服务器提供服务。如果你已经[自定义](/home-assistant/getting-started/devices/#customizing-devices-and-服务)过安装，那你其实已经在使用这个功能了。位于 Home Assistant 配置目录（`.homeassistant`）中的 `www` 文件夹内容，会通过 `/local` 对外提供（例如 `index.html` 文件对应 `https://localhost:8123/local/index.html`）。

但你还能做得更多！你不仅可以在这里托管用于自定义的图像，还可以托管 HTML 文件，甚至包含 CSS 和 Javascript 的 Web 应用。

<p class='img'>
<img src='/home-assistant/images/blog/2016-04-display/ha-display.png' />
</p>

<!--more-->

过去，“Smart mirror” 这个热词在我们的[聊天室](https://discord.gg/c5DvZ4e)里被提到过好几次，甚至还出现在了 [issue tracker](https://github.com/home-assistant/home-assistant/issues/1392) 中。如果你家里或公寓里已经在某处运行了 Home Assistant，那么现有方案（[Smart mirror](https://docs.smart-mirror.io/)、[MagicMirror](https://michaelteeuw.nl/tagged/magicmirror) 和 [HomeMirror](https://github.com/HannahMitt/HomeMirror)）看起来就有点“杀鸡用牛刀”了。为什么不直接在平板上显示由 Home Assistant 提供的网页呢？不需要 app，也不需要在后台运行树莓派。

实现这个目标的方法有很多，比如 [RESTful API](/home-assistant/developers/rest_api/)、~~Python API~~，或者任一 [history components](/home-assistant/integrations/#history)。如果要做成网页，我使用的是 [MQTT Eventstream component](/home-assistant/integrations/mqtt_eventstream/) 和 [Eclipse Paho JavaScript Client](https://www.eclipse.org/paho/clients/js/)。

[HBMQTT](https://pypi.org/pypi/hbmqtt) 代理为 MQTT 提供了 websockets 支持，而网页中引入的 mqttws31.js 让你可以访问 MQTT 消息。整个过程只需几分钟。好吧，实际上我花的时间更久一点，因为我并不是 Javascript 老手，要写出展示你环境细节的软件部分并不轻松。源码在 [https://github.com/fabaff/home-assistant-display](https://github.com/fabaff/home-assistant-display)，上面的截图就是最终效果。我猜任何熟悉 Javascript 的人都能把代码进一步精简，并让它更灵活。不过，这本来就只是一个原型和展示，用来在这篇博客里放一张图像。

希望这篇小文章能给你一些灵感，用一种不那么传统的方式扩展 Home Assistant。
