# Presence-based lights

Home Assistant 内置了一个名为 `device_sun_light_trigger` 的集成，用于帮助您自动控制灯光。该集成会：

* 在日落且家中有人时，让灯光渐亮
* 在日落后有人回家时打开灯光
* 当所有人离开家时关闭灯光

此集成要求启用 [sun](/home-assistant/integrations/sun/index.md)、[device\_tracker](/home-assistant/integrations/device_tracker/index.md)、[person](/home-assistant/integrations/person/index.md) 和 [light](/home-assistant/integrations/light/index.md) 集成。

要启用此集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 示例条目
device_sun_light_trigger:
```

```yaml
light_group:
  description: 指定要打开的灯或灯组。
  required: false
  type: string
light_profile:
  description: 指定开灯时要使用的灯光配置文件。
  required: false
  default: relax
  type: string
device_group:
  description: 指定要跟踪的组。该组可以包含 device_trackers 或 persons。
  required: false
  type: string
disable_turn_off:
  description: 禁用“所有人离家时关闭灯光”的行为。
  required: false
  default: false
  type: boolean
```

完整的配置示例如下：

```yaml
# `configuration.yaml` 示例条目
device_sun_light_trigger:
  light_group: group.living_room
  light_profile: relax
  device_group: group.my_devices
  disable_turn_off: true
```
