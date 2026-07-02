# Home Assistant goes geo with OwnTracks

几周过去了，又到了发布新版本的时候：版本 0.7.4。我们非常高兴地宣布，这次带来了全新的 OwnTracks 集成，可在地图上追踪人员位置。地理位置支持包含三个部分：

* [OwnTracks platform for the 设备 tracker][platform-owntracks]，用于获取设备位置
* 全新的[区域 component][component-区域]，用于定义位置区域并支持[触发器 自动化][区域-自动化]
* UI 中新增地图来展示这些信息（[see it in 动作 in the demo](/home-assistant/demo/)）

我们还新增了一个[入门 section][start-在场]，帮助你快速开始。

[platform-owntracks]: /integrations/owntracks

[component-区域]: /integrations/区域/

[区域-自动化]: /getting-started/自动化-触发器/#区域-触发器

[start-在场]: /getting-started/在场-detection/

<p class='img'>
<img src='/home-assistant/images/screenshots/map.png' />
Home Assistant 中的地图，显示两个人和三个区域（home、school、work）
</p>

当然，过去三周还有很多其他变化。这里不再写成长文，改为简要列出重点更新：

<a href='/home-assistant/integrations/plex#media-player'>
<img src='/home-assistant/images/supported_brands/plex.png' style='border:none; box-shadow: none; float: right;' height='50' />
</a>

* 传感器: [rest platform](/home-assistant/integrations/rest.md) added ([@fabaff](https://github.com/fabaff))
* 报警 Control 面板: [MQTT platform](/home-assistant/integrations/alarm_control_panel.MQTT/) added ([@sfam](https://github.com/sfam))
* Media Player: [Plex platform](/home-assistant/integrations/plex.md#media-player) added (\[@miniconfig]\(https://github.com/miniconfig, [@adrienbrault](https://github.com/adrienbrault))
* Dev Tools: 服务 can now show description of fields ([@balloob](https://github.com/balloob))
* MQTT: Support for certificates and improved 错误 reporting ([@balloob](https://github.com/balloob))
* 灯光: [limitlessled platform](/home-assistant/integrations/limitlessled.md) extended with white 灯光 support ([@auchter](https://github.com/auchter))
* Fuzzy matching for 场景 ([@pavoni](https://github.com/pavoni))
* 场景 support for media player ([@maddox](https://github.com/maddox))
