本页展示集成页面的推荐结构和有用的可复用文本。

本页概述集成页面的高层级结构。请将此结构与以下文档配合使用：

* [Documentation standards](/developers/documenting/standards.md)
* [Documentation style guide](/developers/documenting/general-style-guide.md)
* [Integration Quality Scale](/developers/core/integration-quality-scale.md) 的文档规则

## 集成页面的基本结构

可以复制粘贴的模板，请参见 `home-assistant.io` 仓库中的集成文档模板：[/\_integrations/\_integration\_docs\_template.markdown](https://github.com/home-assistant/home-assistant.io/tree/current/source/_integrations/_integration_docs_template.markdown)。

集成页面遵循以下结构：

* 介绍
  * 用例
* 支持/不支持的设备
* 先决条件
* 配置
* 配置选项
* 支持的功能
* trigger 列表
* condition 列表
* action 列表
* 示例
* 数据更新
* 已知限制
* 故障排除
* 社区说明
* 移除集成

## 文档化 automation triggers、conditions 和 actions

编写集成文档时，为集成中的每个 trigger、condition 和 action 创建单独的文件。然后在主集成页面中通过以下方式引入它们：

```liquid
{% include integrations/triggers.md %}
{% include integrations/conditions.md %}
{% include integrations/actions.md %}
```

如果集成同时包含这三种组件（trigger、condition 和 action），可以使用合并模板：

```liquid
{% include integrations/triggers_conditions_actions.md %}
```

### 在 UI 步骤中引用 automation triggers、conditions 和 actions

在 UI 步骤或 automation 示例中引用 automation trigger、condition 或 action 时，使用 UI 显示的名称。

对于不涉及特定品牌、产品或服务的通用或共享集成，不要添加集成 domain 作为前缀。这适用于 `fan`、`vacuum`、`media_player` 和 `climate` 等集成。

* Bad：`**Action**: Fan: Turn on fan`
* Good：`**Action**: Turn on fan`

对于涉及特定品牌、产品或服务的集成，在 trigger、condition 或 action 名称前加上集成名称。这有助于读者区分集成特有的项目与名称相同的通用或共享项目。

* Good：`**Action**: Jellyfin: Play media`

### 模板：trigger

在 `home-assistant.io` 仓库的 `source/_triggers` 中创建文件。
保存为 `<my_integration>.<trigger_name>.markdown`，例如：`light.brightness_changed.markdown`。

根据你的集成调整此模板：

```md
---
title: "Light brightness changed"
trigger: light.brightness_changed
domain: light
description: "Triggers after the brightness of one or more lights changes."
related_triggers:
  - light.brightness_crossed_threshold
  - light.turned_on
---

The **Light brightness changed** trigger fires after...
Use it to...

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Light brightness changed**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick... You can also select a floor, a device, a specific entity, or a label.
6. From the triggers shown for that target, select...
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Any**, **First**, or **Last** to control how multiple targets interact.
8. Under **Threshold type**, set how much the level has to change before the trigger fires.
9. Under **Another field**, set...
10. Select **Save**.

### UI 中的选项

<!-- Note that there are no "type" or "default" fields for UI options, as you have in YAML. They are not rendered for the UI options. -->

{% options_ui %}
Threshold type:
  description: How much the brightness has to change before the trigger fires, as a percentage of full brightness. Can be a fixed number, or reference a helper entity that provides the value.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `light.brightness_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: light.brightness_changed
  target:
    entity_id: light.living_room
  options:
    threshold: 10
behavior:
  description: >
    当针对多个传感器时，控制触发何时触发。接受 `any`、`first` 或 `last`。
  required: false
  type: string
  default: any
{% endexample %}

这会在客厅灯光亮度变化至少百分之十时触发。

### YAML 中的选项

YAML 有时提供一些通过 UI 无法获得的、用于更复杂用例的额外选项。

<!-- If the option has a default value, set the required field to false. -->

{% options_yaml %}
threshold:
  description: >
    亮度在触发前必须变化的最小量（以百分比为单位）。接受一个数字，或对带百分比单位的 `input_number`、`number` 或 `sensor` entity 的引用。
  required: true
  type: any
{% endoptions_yaml %}

<!-- Keep the "include" below if your integration supports targets -->
{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## 需要了解的信息

- 在此添加额外信息。

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### 自动化：将吊扇速度与顶灯同步

When you dim the ceiling light down, slow the fan down too. 当你调低天花板灯光时，也降低风扇转速。这是一个经典的 "场景氛围" 自动化，保持房间协调一致。

- **Trigger**: Light brightness changed
  - **Target**: Living room ceiling light
  - **Threshold type**: 10
- **Action**: Set fan speed

{% details "YAML example for a ceiling-light-linked fan" %}

{% example %}
automation: |
  alias: "Match fan to ceiling light"
  triggers:
    - trigger: light.brightness_changed
      target:
        entity_id: light.living_room_ceiling
      options:
        threshold: 10
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_room
      data:
        percentage: "{{ state_attr('light.living_room_ceiling', 'brightness_pct') | int }}"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
```

### 模板：condition

在 `home-assistant.io` 仓库的 `source/_conditions` 中创建文件。
保存为 `<my_integration>.<condition_name>.markdown`，例如：`light.is_on.markdown`。

根据你的集成调整此模板：

```md
---
title: "Light is on"
condition: light.is_on
domain: light
description: "Tests if one or more lights are on."
related_conditions:
  - light.is_off
  - light.is_brightness
---

The **Light is on** condition passes when...
Use it to...

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Light is on**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your ... is in (like your living room or bedroom).
   You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Select **Save**.

### UI 中的选项

{% options_ui %}
Condition passes if:
  description: When multiple lights are targeted, controls how results combine. Pick **Any** to pass if at least one targeted light is on, or **All** to pass only when every targeted light is on.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `light.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: light.is_on
  target:
    entity_id: light.living_room
{% endexample %}

当客厅灯光当前为开启状态时通过。

### YAML 中的选项

YAML 有时提供一些通过 UI 无法获得的、用于更复杂用例的额外选项。

{% options_yaml %}
behavior:
  description: >
    当针对多个灯时，控制结果如何合并。接受 `all` 或 `any`。
  required: false
  type: string
  default: any
{% endoptions_yaml %}

<!-- Keep the two "includes" below if your integration supports targets -->
{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## 需要了解的信息

- 在此添加额外信息。

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### 自动化：仅在客厅有灯光时播报门铃

当门铃响起时，仅当客厅灯已开启时才通过客厅音箱播报。当房间无人时保持房子安静。

- **Trigger**: State: Doorbell button pressed
- **Condition**: Light is on
  - **Target**: Living room light
  - **Condition passes if**: Any
- **Action**: Play media

{% details "YAML example for a doorbell announcement gated on lights" %}

{% example %}
automation: |
  alias: "Doorbell announce when living room lit"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  conditions:
    - condition: light.is_on
      target:
        entity_id: light.living_room
      options:
        behavior: any
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.living_room
      data:
        media_content_id: "media-source://tts/cloud?message=Someone+is+at+the+door"
        media_content_type: music
        announce: true
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

```

### 模板：action

在 `home-assistant.io` 仓库的 `source/_actions` 中创建文件。
保存为 `<my_integration>.<action_name>.markdown`，例如：`light.turn_on.markdown`。

根据你的集成调整此模板：

```md
---
title: "Turn on a light"
action: light.turn_on
domain: light
description: "Turn a light on. Optionally set brightness, color, color temperature, an effect, or a transition."
since: "0.7"
related_actions:
  - light.turn_off
  - light.toggle
---

The **Turn on a light** action turns a light on...
This action works with any light {% term entity %} in Home Assistant...
If the light is already on, calling the action...

{% include actions/ui_header.md %}

To turn a light on from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Turn on light**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your ... is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
7. Select **Save**.

### UI 中的选项

{% options_ui %}
Transition:
  description: How long, in seconds, it takes to get to the next state. Use this for a smooth fade instead of switching instantly.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `light.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: light.turn_on
  target:
    entity_id: light.kitchen
{% endexample %}

以之前的亮度和颜色开启 `light.kitchen`。

### YAML 中的选项

YAML 有时提供一些通过 UI 无法获得的、用于更复杂用例的额外选项。

{% options_yaml %}
transition:
  description: >
    到达下一个状态所需的时间，以秒为单位。使用此选项可以平滑淡入淡出，而不是瞬间切换。
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## 需要了解的信息

- 在此添加额外信息。

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### 自动化：设置舒适的暖白光

When you start winding down in the evening, dim the kitchen light to a warm white tone. 当你在傍晚开始放松时，将厨房灯光调至温暖的白光。

- **Action**: Turn on light
  - **Target**: Kitchen light
  - **Brightness percentage**: 80
- **Color**: warm_white

{% details "YAML example for a cozy warm white scene" %}

{% example %}
action: |
  action: light.turn_on
  target:
    entity_id: light.kitchen
  data:
    brightness_pct: 80
    color_name: warm_white
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

```

## 集成可复用文本

你可以[复用文本](/developers/documenting/general-style-guide.md#reusable-text)，即跨多个页面重复出现的内容。

以下片段对集成页面很有用。

### 配置

<p class='img'>
<img class='invertDark'
    src='/img/en/documentation/config_flow.png'
    alt='Screenshot showing predefined configuration text block'
  />
  截图显示预定义的配置文本块
</p>

要使用此元素，添加以下行：

```markdown
{% include integrations/config_flow.md %}
```

查看当前片段内容，请参见 [`config_flow.md`](https://github.com/home-assistant/home-assistant.io/blob/current/source/_includes/integrations/config_flow.md)。

### Configuration\_basic 块

如果集成通过 config flow 设置，使用 `configuration_basic` block 来描述配置选项。

<p class='img'>
  <img class='invertDark'
      src='/img/en/documentation/configuration_variables_ui.png'
      alt='Screenshot showing a configuration variable block for integrations that are set up in the UI'
    />
    截图显示为在 UI 中设置的集成准备的配置变量块
</p>

```markdown
{% configuration_basic %}
Host:
    description: "The IP address of your bridge. You can find it in your router or in the Integration app under **Bridge Settings** > **Local API**."
Local access token:
    description: "The local access token for your bridge. You can find it in the Integration app under **Bridge Settings** > **Local API**."
{% endconfiguration_basic %}
```

### 面向 YAML 集成的 Configuration block

如果集成仅通过 YAML 设置，使用 `configuration` block 来描述配置选项。

<p class='img'>
  <img class='invertDark'
      src='/img/en/documentation/configuration_variables_yaml.png'
      alt='Screenshot showing a configuration variable block for YAML integrations'
    />
    截图显示为 YAML 集成准备的配置变量块
</p>

```markdown
{% configuration %}
Host:
    description: "The IP address of your bridge. You can find it in your router or in the Integration app under **Bridge Settings** > **Local API**."
    required: false
    type: string
Local access token:
    description: "The local access token for your bridge. You can find it in the Integration app under **Bridge Settings** > **Local API**."
    required: false
    type: string
{% endconfiguration %}
```
