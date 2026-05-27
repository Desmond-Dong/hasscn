# 场景

你可以创建场景，用来记录某些实体应处于的状态。例如，一个场景可以指定灯 A 打开、灯 B 呈亮红色。场景既可以通过独立的[场景集成](/home-assistant/integrations/scene/index.md)作为实体使用，也可以嵌入到[自动化](/home-assistant/docs/automation/action/index.md)和[脚本](/home-assistant/docs/scripts/index.md)中。

```yaml
# `configuration.yaml` 配置示例
scene:
  - name: Romantic
    entities:
      light.tv_back_light: "on"
      light.ceiling:
        state: "on"
        xy_color: [0.33, 0.66]
        brightness: 200
  - name: Movies
    entities:
      light.tv_back_light:
        state: "on"
        brightness: 125
      light.ceiling: off
      media_player.sony_bravia_tv:
        state: "on"
        source: HDMI 1
```

## 如何配置场景

在 `configuration.yaml` 文件中定义场景时，请确保使用下列所有必需参数。

name:
description: 场景的友好名称。
required: true
type: string
entities:
description: 要控制的实体及其目标状态。
required: true
type: list

如你所见，每个 `entity_id` 的状态有两种定义方式：

* 直接为实体定义 `state`。请注意，必须显式定义 `state`。
* 使用属性来定义更复杂的状态。你可以在开发者工具的“状态”页面查看某个实体可用的全部属性。

场景可以通过 `scene.turn_on` 动作激活（不存在 `scene.turn_off` 动作）。

```yaml
# 自动化示例
automation:
  triggers:
    - trigger: state
      entity_id: device_tracker.sweetheart
      from: "not_home"
      to: "home"
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.romantic
```

## 不预先定义场景时直接应用

通过 `scene.apply` 动作，你可以不先在配置中定义场景，而是直接在数据中传入状态。数据格式与配置中的 `entities` 字段相同。

```yaml
# 自动化示例
automation:
  triggers:
    - trigger: state
      entity_id: device_tracker.sweetheart
      from: "not_home"
      to: "home"
  actions:
    - action: scene.apply
      data:
        entities:
          light.tv_back_light:
            state: "on"
            brightness: 100
          light.ceiling: off
          media_player.sony_bravia_tv:
            state: "on"
            source: "HDMI 1"
```

## 使用场景过渡效果

`scene.apply` 和 `scene.turn_on` 动作都支持设置过渡时间，从而让切换到场景的过程更平滑。

下面是一个设置浪漫场景的自动化示例，其中灯光会在 2.5 秒内过渡到目标场景。

```yaml
# 自动化示例
automation:
  triggers:
    - trigger: state
      entity_id: device_tracker.sweetheart
      from: "not_home"
      to: "home"
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.romantic
      data:
        transition: 2.5
```

目前只有灯光支持过渡效果，而且这些灯本身也必须支持该功能。不过，场景本身并不要求只包含灯光，仍然可以设置过渡时间。

## 重新加载场景

每当你修改场景配置后，都可以调用 `scene.reload` 动作来重新加载场景。
