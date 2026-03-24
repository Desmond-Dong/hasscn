---
title: '0.15: Unforked Open Z-Wave, templated 服务 calls, extended 场景 support
  and PEP257 compliance.'
description: Home Assistant 0.15 has arrived.
---

两周过去了，0.15 来了！我们这段时间非常专注于质量，确保系统更加稳定、可靠。我通常会在发布说明里重点介绍一项很酷的更新，但这次发布有 4 条令人兴奋的公告！

 - [@fabaff] has upgraded the codebase to follow the PEP257 文档 standard.
 - [@partofthething] has migrated us to use the main Python Open Z-Wave library instead of our forked 版本.
 - To make our 自动化 more powerful, [@persandstrom] added the option to use 模板 to dynamically create 服务 calls. This works for 自动化, Alexa, universal media player, 模板 开关. [Learn more.][服务]
 - [@MartinHjelmare] has upgraded our 场景 support to now support all built-in 服务 and components.

除错误修复外，这次发布还带来了：

<img src='/home-assistant/images/supported_brands/hunter-douglas-powerview.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - 场景: Converted to a platform based component ([@sander76])
 - 场景: [Hunter Douglas Powerview] now supported ([@sander76])
 - 门锁: [MQTT] platform added ([@fabaff])
 - 设备 Tracker: [OwnTracks] will allow filtering inaccurate GPS locations ([@HydrelioxGitHub])
 - 二元sensor: Wemo Motion now supported ([@pavoni], [@ryanlaux])

```yaml
# Example using templates for service and data in service call.
# Works for automation, Alexa, universal media player, template switch.
automation:
  - trigger:
      - platform: state
        entity_id: switch.bathroom
    action:
      service: >
        
          switch.turn_on
        
          switch.turn_off
        
      target:
        entity_id: switch.
```

### Backward-incompatible changes

 - Media Player: 属性 to call 服务 play_media has been renamed to
`media_content_type` and `media_content_id`, to match the corresponding media
player 状态 属性. This change affects 自动化, 脚本 and 场景.

[服务]: /docs/脚本/服务-calls/#use-模板-to-decide-which-服务-to-call
[Hunter Douglas Powerview]: /integrations/hunterdouglas_powerview
[MQTT]: /integrations/门锁.MQTT/
[OwnTracks]: /integrations/owntracks
[Wemo Motion]: /integrations/wemo
[@fabaff]: https://github.com/fabaff
[@partofthething]: https://github.com/partofthething
[@persandstrom]: https://github.com/persandstrom
[@fabaff]: https://github.com/fabaff
[@persandstrom]: https://github.com/persandstrom
[@PartOfTheThing]: https://github.com/PartOfTheThing
[@sander76]: https://github.com/sander76
[@sander76]: https://github.com/sander76
[@fabaff]: https://github.com/fabaff
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@pavoni]: https://github.com/pavoni
[@ryanlaux]: https://github.com/ryanlaux
