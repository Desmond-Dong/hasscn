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
