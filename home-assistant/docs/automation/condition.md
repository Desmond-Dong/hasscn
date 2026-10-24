# 自动化条件

条件是自动化规则的可选部分。它们可以用于阻止自动化的动作被执行。当触发器发生后，所有条件都会被检查。如果所有条件返回 `true`，自动化将被执行。如果任何条件返回 `false`，自动化将不会启动。

条件看起来与触发器非常相似，但它们是截然不同的 — 触发器可以观察可能已经发生的事件并启动自动化。条件只能在自动化从触发器启动后看到当前状态。以一个开关被快速打开然后关闭为例。那个开关打开的事件将启动自动化，不管它现在已经关闭了。当自动化检查来自开关打开事件的条件时，它可能已经再次关闭了，作为它的当前状态。这种情况也被称为竞态条件。

自动化可用的条件与脚本语法相同，因此请参阅该页面获取[可用条件的完整列表](/home-assistant/docs/scripts/conditions/index.md)。

使用条件的示例：

```yaml
automation:
  - alias: "Turn on office lights"
    triggers:
      - trigger: state
        entity_id: sensor.office_motion_sensor
        to: "on"
    conditions:
      - or:
        - condition: numeric_state
          entity_id: sun.sun
          attribute: elevation
          below: 4
        - condition: numeric_state
          entity_id: sensor.office_lux_sensor
          below: 10
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.office_lights
```

自动化的 `condition` 选项也接受单个条件模板。例如：

```yaml
automation:
  - alias: "Turn on office lights"
    triggers:
      - trigger: state
        entity_id: sensor.office_motion_sensor
        to: "on"
    conditions: ""
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.office_lights
```
