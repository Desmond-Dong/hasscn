# 自动化动作

自动化的动作是指当自动化被触发时要执行的内容。动作部分遵循[脚本语法](/home-assistant/docs/scripts/index.md)，因此可以通过其他动作或事件与各种内容交互。

对于动作，您可以指定要应用到的 `entity_id` 和可选参数（例如指定亮度）。

您还可以执行动作来激活[场景](/home-assistant/integrations/scene/index.md)，这将允许您定义设备的状态，并让 Home Assistant 执行正确的动作。

```yaml
automation:
  # 将厨房和客厅的灯亮度设置为 150，并改为红色。
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id:
          - light.kitchen
          - light.living_room
      data:
        brightness: 150
        rgb_color: [255, 0, 0]

automation 2:
  # 在手机上向我发送事件通知
  triggers:
    - trigger: sun
      event: sunset
      offset: -00:30
  variables:
    notification_action: notify.paulus_iphone
  actions:
    # 动作遵循脚本语法，因此也可以是动作列表
    - action: ""
      data:
        message: "Beautiful sunset!"
    - delay: 0:35
    - action: notify.notify
      data:
        message: "Oh wow you really missed something great."
```

条件也可以作为动作的一部分。您可以在单个动作中组合多个动作和条件，它们将按照您指定的顺序处理。如果条件的结果为 false，动作将在那里停止，因此该条件之后的任何动作都不会执行。

```yaml
automation:
- alias: "Office at evening"
  triggers:
    - trigger: state
      entity_id: sensor.office_occupancy
      to: "on" 
  actions:
    - action: notify.notify
      data:
        message: "Testing conditional actions"
    - condition: or
      conditions:
        - condition: numeric_state
          entity_id: sun.sun
          attribute: elevation
          below: 4
        - condition: state
          entity_id: sensor.office_illuminance
          below: 10
    - action: scene.turn_on
      target:
        entity_id: scene.office_at_evening
    - action: light.turn_on
      target: "{{ {'entity_id': ['light.office', 'light.office_2']} }}"
    - action: switch.turn_on
      target:
        label_id: ""
```
