---
title: Universal media player
description: '通用媒体播放器可将 Home Assistant 中多个现有实体组合成一个媒体播放器实体。这样就能创建一个可控制整个媒体中心的单一媒体播放器实体。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media player
ha_iot_class: Calculated
ha_release: 0.11
ha_quality_scale: internal
ha_domain: universal
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Universal media player

通用媒体播放器可将 Home Assistant 中多个现有实体组合成一个媒体播放器实体。这样就能创建一个可控制整个媒体中心的单一媒体播放器实体。

你可以通过通用媒体播放器控制多个媒体播放器实体。此外，通用媒体播放器还可以将音量和电源命令转发给其他 Home Assistant 实体。例如，这样就能用媒体播放器的电源和音量命令控制电视、功放或音频接收器等设备。

要使用通用媒体播放器，请将其添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
media_player:
  - platform: universal
    name: MEDIA_PLAYER_NAME
    children:
      - media_player.CHILD_1_ID
      - media_player.CHILD_2_ID
    commands:
      turn_on:
        action: SERVICE
        data: SERVICE_DATA
      turn_off:
        action: SERVICE
        data: SERVICE_DATA
      volume_up:
        action: SERVICE
        data: SERVICE_DATA
      volume_down:
        action: SERVICE
        data: SERVICE_DATA
      volume_mute:
        action: SERVICE
        data: SERVICE_DATA
      media_play:
        action: SERVICE
        data: SERVICE_DATA
      media_pause:
        action: SERVICE
        data: SERVICE_DATA
      media_previous_track:
        action: SERVICE
        data: SERVICE_DATA
      media_next_track:
        action: SERVICE
        data: SERVICE_DATA 
    attributes:
      is_volume_muted: ENTITY_ID|ATTRIBUTE
      state: ENTITY_ID|ATTRIBUTE
    browse_media_entity: media_player.CHILD_2_ID
    device_class: tv
    unique_id: a_unique_string
```

```yaml
name:
  description: 要分配给播放器的名称。
  required: true
  type: string
children:
  description: 此实体要控制的子媒体播放器有序列表。
  required: false
  type: list
active_child_template:
  description: "用于选择（覆盖）活动子实体的 [template](/home-assistant/docs/configuration/templating/)。必须返回被选为活动子实体的 `entity_id`，或返回 `None` 以使用默认行为。"
  required: false
  type: template
state_template:
  description: "可指定一个 [template](/home-assistant/docs/configuration/templating/) 来渲染媒体播放器状态。这样，状态就可以依赖于并非媒体播放器的实体，例如开关或输入布尔值。"
  required: false
  type: template
commands:
  description: "可覆盖的媒体播放器命令。几乎所有媒体播放器动作命令都可以被覆盖。示例包括 `turn_on`、`turn_off`、`select_source`、`volume_set`、`volume_up`、`volume_down`、`volume_mute`、`media_play`、`media_pause`、`media_stop`、`media_previous_track`、`media_next_track` 和 `play_media`（完整列表参见 [`media_player` 文档](/home-assistant/integrations/media_player/)）。"
  required: false
  type: string
attributes:
  description: "可覆盖的属性。大多数媒体播放器属性都可以被覆盖。示例包括 `is_volume_muted`、`state`、`source`、`source_list` 和 `volume_level`。值应为实体 ID 与状态属性，并用竖线（`|`）分隔。如果要使用实体 ID 本身的状态，则只需提供实体 ID。"
  required: false
  type: string
browse_media_entity:
  description: 允许将媒体浏览所使用的实体覆盖为指定的媒体播放器。
  required: false
  type: string
device_class:
  description: 此实体表示的设备类别。可为 `tv`、`speaker` 或 `receiver`。
  required: false
  type: string
unique_id:
  description: 此实体的唯一标识符。在 `media_player` 平台中必须唯一。
  required: false
  type: string
```

通用媒体播放器主要会模拟其某个 `children` 子实体的行为。它会控制列表中第一个处于活动状态（非 idle/off）的子实体。如果未提供 `state_template`，通用媒体播放器还会继承第一个活动子实体的状态。`children:` 列表中的实体必须是媒体播放器，但状态模板中可以包含任意实体。

如果默认行为不适合你的场景，可以使用 `active_child_template` 来指定活动实体。该模板必须返回将被选为活动实体的子实体 `entity_id`，或者返回 `None` 以恢复默认行为。

建议同时提供 `turn_on`、`turn_off` 命令以及 `state` 属性。`state` 属性用于指示媒体播放器当前是开还是关。如果 `state` 表示媒体播放器已关闭，则该状态会优先于各个子实体的状态。如果所有子实体都处于 idle/off，而 `state` 为 on，则通用媒体播放器的状态会显示为 on。如果未提供，`toggle` 命令会根据 `state` 转发到 `turn_on` 或 `turn_off`。

同样也建议同时提供 `volume_up`、`volume_down`、`volume_mute` 命令以及 `is_volume_muted` 属性。`is_volume_muted` 在静音时应返回 `True` 或 on 状态。`volume_mute` 动作应切换静音设置。

当提供 `select_source` 命令时，建议同时提供 `source` 和 `source_list` 属性。`source` 属性表示当前选中的输入源，`source_list` 属性则是所有可用输入源的列表。

使用 `state_template` 时，如果模板依赖当前时间，建议使用 `now()`。使用 `now()` 会使模板在每个新分钟开始时刷新。更多信息请参见模板文档中的 [time](/home-assistant/docs/configuration/templating/#time) 部分。

`browse_media_entity` 参数允许你指定媒体浏览器中要使用哪个媒体播放器。

## 使用示例

### 通过开关控制 Chromecast 与 Kodi

在此示例中，使用一个开关控制电视电源。还提供了用于调高音量、调低音量和静音的开关。这些可以是命令行开关，也可以是 Home Assistant 中的其他实体。`turn_on` 和 `turn_off` 命令会被重定向到电视，音量命令会被重定向到音频接收器，而 `select_source` 命令会直接传递给 A/V 接收器。

其子实体为 Chromecast 和 Kodi 播放器。如果 Chromecast 正在播放，通用媒体播放器会反映其状态；如果 Chromecast 处于 idle 而 Kodi 正在播放，则通用媒体播放器会切换为反映 Kodi 的状态。


```yaml
media_player:
  platform: universal
  name: Test Universal
  children:
    - media_player.living_room_cast
    - media_player.living_room_kodi
  commands:
    turn_on:
      action: switch.turn_on
      target:
        entity_id: switch.living_room_tv
    turn_off:
      action: switch.turn_off
      target:
        entity_id: switch.living_room_tv
    volume_up:
      action: switch.turn_on
      target:
        entity_id: switch.living_room_volume_up
    volume_down:
      action: switch.turn_on
      target:
        entity_id: switch.living_room_volume_down
    volume_mute:
      action: switch.turn_on
      target:
        entity_id: switch.living_room_mute
    select_source:
      action: media_player.select_source
      target:
        entity_id: media_player.receiver
      data:
        source: "{{ source }}"
    volume_set:
      action: media_player.volume_set
      target:
        entity_id: media_player.receiver
      data:
        volume_level: "{{ volume_level }}"

  attributes:
    state: switch.living_room_tv
    is_volume_muted: switch.living_room_mute
    volume_level: media_player.receiver|volume_level
    source: media_player.receiver|source
    source_list: media_player.receiver|source_list
```


### Kodi CEC-TV 控制

在此示例中，[Kodi Media Player](/home-assistant/integrations/kodi) 运行在支持 CEC 的设备上（例如全天候运行 OSMC/OpenElec 的 Raspberry Pi），并且安装了 JSON-CEC Kodi 插件后，它可以打开和关闭所连接的电视。

我们将所连接电视的状态存储在一个 [input boolean](/home-assistant/integrations/input_boolean/) 中，这样就能区分电视是开还是关；由于 Kodi 始终显示为 `idle`，我们使用通用媒体播放器通过模板来渲染其状态。现在便可以区分 `idle` 与 `off` 两种状态（当 Kodi 为 idle 且电视关闭时即为后者）。

由于用于存储电视状态的输入布尔值只有在使用 Home Assistant 的 `turn_on` 和 `turn_off` 动作时才会变化，而 Kodi 可能通过多种方式被控制，因此我们还定义了一些自动化，以便在需要时更新这个输入布尔值。

完整配置如下：


```yaml
homeassistant:
  customize:
    media_player.kodi_tv:
      friendly_name: Kodi

input_boolean:
  kodi_tv_state:

media_player:
  - platform: universal
    name: Kodi TV
    state_template: >
      {% if is_state('media_player.kodi', 'idle') and is_state('input_boolean.kodi_tv_state', 'off') %}
        off
      {% else %}
        {{ states('media_player.kodi') }}
      {% endif %}
    children:
      - media_player.kodi
    commands:
      turn_on:
        action: media_player.turn_on
        target:
          entity_id: media_player.kodi
      turn_off:
        action: media_player.turn_off
        target:
          entity_id: media_player.kodi
    attributes:
      is_volume_muted: media_player.kodi|is_volume_muted
      volume_level: media_player.kodi|volume_level

  - platform: kodi
    name: "Kodi"
    host: 192.168.1.10
    turn_on_action:
      - action: input_boolean.turn_on
        target:
          entity_id: input_boolean.kodi_tv_state
      - action: media_player.kodi_call_method
        target:
          entity_id: media_player.kodi
        data:
          method: Addons.ExecuteAddon
          addonid: script.json-cec
          params:
            command: activate

    turn_off_action:
      - action: input_boolean.turn_off
        target:
          entity_id: input_boolean.kodi_tv_state
      - action: media_player.media_stop
        target:
          entity_id: media_player.kodi
      - action: media_player.kodi_call_method
        target:
          entity_id: media_player.kodi
        data:
          method: Addons.ExecuteAddon
          addonid: script.json-cec
          params:
            command: standby

automation:
  - alias: "Turn on the TV when Kodi is activated"
    triggers:
      - trigger: state
        entity_id: media_player.kodi_tv
        from: "off"
        to: "playing"
    actions:
      - action: media_player.turn_on
        target:
          entity_id: media_player.kodi_tv

  - alias: "Turn off the TV when Kodi is in idle > 15 min"
    triggers:
      - trigger: state
        entity_id: media_player.kodi_tv
        to: "idle"
        for:
          minutes: 15
    actions:
      - action: media_player.turn_off
        target:
          entity_id: media_player.kodi_tv
```


### Harmony 遥控器示例

完整配置如下：


```yaml
media_player:
  - platform: universal
    name: Media Room TV
    attributes:
      state: remote.harmony_hub
      source_list: remote.harmony_hub|activity_list
      source: remote.harmony_hub|current_activity
    commands:
      turn_on:
        action: remote.turn_on
        target:
          entity_id: remote.harmony_hub
      turn_off:
        action: remote.turn_off
        target:
          entity_id: remote.harmony_hub
      volume_up:
        action: remote.send_command
        target:
          entity_id: remote.harmony_hub
        data:
          device: Receiver
          command: VolumeUp
      volume_down:
        action: remote.send_command
        target:
          entity_id: remote.harmony_hub
        data:
          device: Receiver
          command: VolumeDown
      select_source:
        action: remote.turn_on
        target:
          entity_id: remote.harmony_hub
        data:
          activity: "{{ source }}"
    device_class: tv
    unique_id: media_room_harmony_hub
```


### Denon AVR 与 HEOS

这个媒体播放器结合了 [Denon AVR](/home-assistant/integrations/denonavr/) 与 [HEOS](/home-assistant/integrations/heos/) 集成提供的媒体播放器实体。

特性：
- 通过 Denon 实体控制音量（可能比 HEOS 的音量控制更细粒度）
- 通过 Denon 实体提供开/关按钮（HEOS 媒体播放器不提供）
- 通过 Denon 实体提供声音模式选择（HEOS 媒体播放器不提供）
- 通过 HEOS 实体提供专辑封面和元数据（Denon 媒体播放器不提供）

完整配置如下：


```yaml
media_player:
  - platform: universal
    name: Denon
    unique_id: denon_universal_remote
    device_class: receiver
    children:
      - media_player.denon_avr_x2700h       # Denon AVR Integration entity
      - media_player.denon_avr_x2700h_heos  # Denon HEOS Integration entity
    browse_media_entity: media_player.denon_avr_x2700h_heos
    commands:
      turn_off:
        action: media_player.turn_off
        data:
          entity_id: media_player.denon_avr_x2700h
      turn_on:
        action: media_player.turn_on
        data:
          entity_id: media_player.denon_avr_x2700h
      volume_up:
        action: media_player.volume_up
        data:
          entity_id: media_player.denon_avr_x2700h
      volume_down:
        action: media_player.volume_down
        data:
          entity_id: media_player.denon_avr_x2700h
      select_sound_mode:
        action: media_player.select_sound_mode
        target:
          entity_id: media_player.denon_avr_x2700h
        data:
          sound_mode: "{{ sound_mode }}"
    attributes:
      sound_mode: media_player.denon_avr_x2700h|sound_mode
      sound_mode_raw: media_player.denon_avr_x2700h|sound_mode_raw
      sound_mode_list: media_player.denon_avr_x2700h|sound_mode_list
```


### 覆盖活动子实体

此示例展示了如何使用 `active_child_template`：


```yaml
media_player:
  - platform: universal
    name: sony_tv
    unique_id: sony_tv
    children:
      - media_player.sony_tv_cast
      - media_player.sony_tv_psk
    active_child_template: >
      {% if is_state_attr('media_player.sony_tv_cast', 'app_name', 'TV') %}
         media_player.sony_tv_psk
      {% else %}
         media_player.sony_tv_cast
      {% endif %}
```


