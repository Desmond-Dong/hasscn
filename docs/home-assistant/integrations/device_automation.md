---
title: Device automation
description: '设备自动化 是自动化集成的一个插件，用于让其他集成提供特定于设备的触发器、条件和操作。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Automation
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: device_automation
ha_integration_type: system
---
# Device automation

**设备自动化** 是自动化集成的一个插件，用于让其他集成提供特定于设备的触发器、条件和操作。

设备自动化没有专门的独立配置，而是作为常规自动化的一部分进行配置。

设备自动化旨在通过 UI 进行配置。

示例：

```yaml
- alias: "Light turns off"
  triggers:
    - trigger: device
      device_id: 7a92d5ee74014a0b86903fc669b0bcd6
      domain: light
      type: turn_off
      entity_id: light.bowl
  actions:
    - action: camera.turn_off
```
