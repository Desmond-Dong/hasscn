---
title: Community Highlights
description: Another round-up of the amazing things from our community including Alexa
  Lightning skill and HomeKit 集成.
---
# Community Highlights

Home Assistant 社区最近非常活跃，很多人都做出了很棒的项目。

### Part of the Thing 的家庭自动化演示

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Mc_29EC3aZw" frameborder="0" allowfullscreen></iframe>
</div>

### Haaska - Home Assistant 的 Alexa Skill 适配器

Haaska 允许你通过 Amazon Echo 控制 Home Assistant 实例中暴露的灯光、开关和场景。这与我们自己的 [Alexa](/home-assistant/integrations/alexa/) 组件不同，因为它会直接让 Amazon Echo 识别这些设备，而不是让 Echo 经由 Home Assistant 转发。它不支持自定义句式，但你在发出命令时可以跳过“Ask Home Assistant”这一步：

- "Alexa，将 kitchen 调到百分之二十"
- "Alexa，打开 evening 场景"
- "Alexa，关闭 bedroom 灯光"

[Haaska GitHub 页面](https://github.com/auchter/haaska)

### 将 Home Assistant 集成到 HomeKit

贡献者 Maddox 为 HomeBridge（一个开源 HomeKit 桥接项目）创建了一个插件。借助它，你可以在 Apple 设备上通过 Siri 控制你的家。由于 HomeBridge 最近进行了结构调整，你需要通过 `homebridge-homeassistant` 这个 npm 包单独安装该插件。

用于加载 Home Assistant 的 `config.json` 示例条目：

```json
"platforms": [
    {
        "platform": "HomeAssistant",
        "name": "HomeAssistant",
        "host": "http://192.168.1.50:8123",
        "password": "xxx",
        "supported_types": ["light", "switch", "media_player", "scene"]
    }
]
```

[HomeBridge GitHub 页面](https://github.com/nfarina/homebridge)
[HomeBridge Home Assistant 插件](https://github.com/maddox/homebridge-homeassistant)

### 使用 Home Assistant 构建自定义报警系统

用户 thaijames 在论坛帖子（[Home Assistant forums 讨论帖](https://community.home-assistant.io/t/controlling-house-报警-from-ha/67)）中介绍了他如何使用 Home Assistant、DIY 组件和加菲猫玩偶，搭建一个基于 NFC 的自定义报警系统。

<p class='img'>
<img src='/home-assistant/images/blog/2016-02-community-highlights/garfield-nfc.png'>
把你的 NFC 标签贴到加菲猫肚子上即可解除报警。
</p>
