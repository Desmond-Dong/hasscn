# Alarms, Sonos and iTunes now supported

这次就像有人把一整罐硬核开发者倒进了我们的 [chat channel](https://discord.gg/c5DvZ4e)，于是讨论和贡献都迎来了大爆发。0.7.3 版本亮点包括：Sonos、iTunes、报警组件，以及自动化升级。

更详细的发布说明请查看 [GitHub](https://github.com/home-assistant/home-assistant/releases/tag/0.7.3)。

*迁移说明：`scheduler` 组件已移除，改为使用 `automation` 组件。*

**Sonos 支持** <img src='/home-assistant/images/supported_brands/sonos.png' style='border:none; box-shadow: none; float: right;' height='50' /> Sonos 支持由 [@rhooper](https://github.com/rhooper) 和 [@SEJeff](https://github.com/SEJeff) 添加。Home Assistant 现在可以自动发现你网络中的 Sonos 设备并完成设置。你可以控制 Sonos 播放内容并调整音量。

**iTunes 与 AirPlay 音箱** <img src='/home-assistant/images/supported_brands/itunes.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@maddox](https://github.com/maddox) 贡献了对 iTunes 和 AirPlay 音箱的控制支持。要使用此功能，你需要在 Mac 上运行 [itunes-api](https://github.com/maddox/itunes-api) 作为中间层。

```yaml
# Example configuration.yaml entry
media_player:
  platform: itunes
  name: iTunes
  host: http://192.168.1.50
  port: 8181
```

<!--more-->

**自动化**
自动化在这个版本里得到了大量改进。它现在支持条件、多个触发器，以及新的触发器类型。想快速上手，最好的方式是查看新的 [自动化入门](/home-assistant/getting-started/automation/index.md) 页面。

```yaml
# Example of entry in configuration.yaml
automation:
  alias: "Light on in the evening"
  trigger:
    - platform: sun
      event: sunset
      offset: "-01:00:00"
    - platform: state
      entity_id: all
      state: home
  condition:
    - platform: state
      entity_id: all
      state: home
    - platform: time
      after: "16:00:00"
      before: "23:00:00"
  action:
    service: homeassistant.turn_on
    target:
      entity_id: group.living_room
```

**Verisure 报警** <img src='/home-assistant/images/supported_brands/verisure.png' style='border:none; box-shadow: none; float: right;' height='50' /> 感谢 [@persandstrom](https://github.com/persandstrom) 的支持，我们现在可以在 Home Assistant 中对 Verisure 报警进行布防和撤防。
