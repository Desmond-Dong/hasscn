---
title: Kodi
description: 关于如何将 Kodi 集成到 Home Assistant 的说明。
ha_category:
  - Media player
  - Media source
  - Notifications
ha_release: pre 0.7
ha_iot_class: Local Push
ha_codeowners:
  - '@OnFreund'
ha_domain: kodi
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - media_player
  - notify
ha_integration_type: service
---

**Kodi** 集成可让您在 Home Assistant 中控制 [Kodi](https://kodi.tv/) 多媒体系统。

设置 Kodi 平台的首选方式是通过自动发现，这要求您在 Kodi 安装中启用 [Web 界面](https://kodi.wiki/view/Web_interface)。

目前在 Home Assistant 中支持以下设备类型：

- [Media player](#configuration)
- [Notifications](#notifications)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

如果您之前通过 `configuration.yaml` 配置过 Kodi，建议将其移除，并改为通过 UI 配置。

如果您不移除，配置将被导入，但会有以下限制：

- 您的开机/关机操作不会被导入。该功能现已通过设备触发器提供。
- 可能会出现重复实体。
- 要成功导入配置，Home Assistant 首次加载时 Kodi 必须处于开机状态。

### 开机/关机

您可以通过自动化自定义开机和关机操作。只需使用相应的 Kodi 设备触发器，自动化就会执行 `turn_on` 或 `turn_off` 序列；可用脚本请参阅 [Kodi 开机/关机示例](#kodi-turn-onoff-samples) 部分。

这些自动化可以通过 UI 配置（自动化中的相关说明请参阅 [device triggers](/home-assistant/docs/automation/trigger/#device-triggers)）。如果您更喜欢 YAML，则需要从 UI 自动化编辑器中获取设备 ID。自动化格式如下：

```yaml
automation:
  - alias: "Kodi: turn on"
    triggers:
      - trigger: device
        device_id: !secret kodi_device_id
        domain: kodi
        entity_id: media_player.kodi
        type: turn_on
    actions:
      - action: script.kodi_turn_on

  - alias: "Kodi: turn off"
    triggers:
      - trigger: device
        device_id: !secret kodi_device_id
        domain: kodi
        entity_id: media_player.kodi
        type: turn_off
    actions:
      - action: script.kodi_turn_off
```

### 操作

#### 操作 `kodi.add_to_playlist`

将音乐添加到默认播放列表（也就是 `playlistid=0`）。

| 数据属性 | 可选 | 说明 |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`    | no       | 要向其中添加媒体的 Kodi 实体名称。 |
| `media_type`   | yes      | 媒体类型标识符。必须是 SONG 或 ALBUM 之一。 |
| `media_id`     | no       | 要添加的媒体条目的唯一 ID（`songid` 或 `albumid`）。如果未定义，则需要 `media_name` 和 `artist_name` 来搜索 Kodi 音乐库。 |
| `media_name`   | no       | 用于筛选媒体的可选媒体名称。当 `media_type` 为 `ALBUM` 且指定了 `artist_name` 时，可设为 `ALL`，以添加某位艺术家的全部歌曲。 |
| `artist_name`  | no       | 用于筛选媒体的可选艺术家名称。 |

#### 操作 `kodi.call_method`

调用带可选参数的 [Kodi JSON-RPC API](https://kodi.wiki/?title=JSON-RPC_API) 方法。Kodi API 调用结果会通过 Home Assistant 事件 `kodi_call_method_result` 返回。

| 数据属性 | 可选 | 说明 |
| ------------------- | -------- | --------------------------------------------------------- |
| `entity_id`         | no       | 要运行 API 方法的 Kodi 实体名称。 |
| `method`            | yes      | 要调用的 Kodi JSON-RPC API 方法名称。 |
| any other parameter | no       | Kodi API 调用的可选参数。 |

### 事件触发

调用 `kodi.call_method` 操作时，如果 Kodi JSON-RPC API 返回数据，Home Assistant 在接收到数据后会在事件总线上触发 `kodi_call_method_result` 事件，其 `event_data` 如下：

```yaml
entity_id: "<Kodi media_player entity_id>"
result_ok: <boolean>
input: <input parameters of the action>
result: <data received from the Kodi API>
```

### Kodi 开机/关机示例

以下脚本可用于自动化中控制 Kodi 实例开机和关机；请参阅 [开机/关机](#turning-onoff)。您也可以不创建脚本，而是直接在自动化中使用这些操作序列。

#### 使用 Wake on LAN 启动 Kodi

使用此配置时，对 Kodi 设备调用 `media_player/turn_on` 会向指定 MAC 地址发送一个 _magic packet_。要使用此操作，您需要先在 Home Assistant 中配置 [`wake_on_lan`](/home-assistant/integrations/wake_on_lan) 集成，也就是在 `configuration.yaml` 中添加 `wake_on_lan:`。

```yaml
script:
  turn_on_kodi_with_wol:
    sequence:
      - action: wake_on_lan.send_magic_packet
        data:
          mac: aa:bb:cc:dd:ee:ff
          broadcast_address: 192.168.255.255
```

#### 使用 API 调用关闭 Kodi

以下是使用旧选项关闭 Kodi（`quit`、`hibernate`、`suspend`、`reboot` 或 `shutdown`）的等效配置方式：

- **Quit** 方法

```yaml
script:
  kodi_quit:
    sequence:
      - action: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: Application.Quit
```

- **Hibernate** 方法

```yaml
script:
  kodi_hibernate:
    sequence:
      - action: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: System.Hibernate
```

- **Suspend** 方法

```yaml
script:
  kodi_suspend:
    sequence:
      - action: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: System.Suspend
```

- **Reboot** 方法

```yaml
script:
  kodi_reboot:
    sequence:
      - action: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: System.Reboot
```

- **Shutdown** 方法

```yaml
script:
  kodi_shutdown:
    sequence:
      - action: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: System.Shutdown
```

#### 使用 Kodi JSON-CEC 应用开关电视

对于 24/7 持续运行、并连接到支持 CEC 的电视的 Kodi 设备（例如运行在 Raspberry Pi 上的 OSMC / OpenElec 及类似系统），此配置可让您在 Kodi 始终处于运行状态时，以较理想的方式通过 Home Assistant 控制所连接电视的开关机：

```yaml
script:
  turn_on_kodi_with_cec:
  sequence:
    - action: kodi.call_method
      target:
        entity_id: media_player.kodi
      data:
        method: Addons.ExecuteAddon
        addonid: script.json-cec
        params:
          command: activate

  turn_off_kodi_with_cec:
    sequence:
      - action: media_player.media_stop
        target:
          entity_id: media_player.kodi
      - action: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: Addons.ExecuteAddon
          addonid: script.json-cec
          params:
            command: standby
```

:::important
此示例及后续内容要求您已在 Kodi 播放器中安装 [script.json-cec](https://github.com/joshjowen/script.json-cec) 插件。它还会在 Kodi 播放器上暴露无需身份验证的 `standby`、`toggle` 和 `activate` 端点。请谨慎使用。

:::
### Kodi 操作示例

#### 按时间播放某个 PVR 频道的简单脚本


```yaml
script:
  play_kodi_pvr:
    alias: "Turn on the silly box"
    sequence:
      - alias: "TV on"
        action: media_player.turn_on
        target:
          entity_id: media_player.kodi
      - alias: "Play TV channel"
        action: media_player.play_media
        target:
          entity_id: media_player.kodi
        data:
          media_content_type: "CHANNEL"
          media_content_id: >
            {% if (now().hour < 14) or ((now().hour == 14) and (now().minute < 50)) %}
              10
            {% elif (now().hour < 16) %}
              15
            {% elif (now().hour < 20) %}
              2
            {% elif (now().hour == 20) and (now().minute < 50) %}
              10
            {% elif (now().hour == 20) or ((now().hour == 21) and (now().minute < 15)) %}
              15
            {% else %}
              10
            {% endif %}
```


#### 播放智能播放列表的简单脚本


```yaml
script:
  play_kodi_smp:
    alias: "Turn on the silly box with random Firefighter Sam episode"
    sequence:
      - alias: "TV on"
        action: media_player.turn_on
        target:
          entity_id: media_player.kodi
      - action: media_player.play_media
        target:
          entity_id: media_player.kodi
        data:
          media_content_type: DIRECTORY
          media_content_id: special://profile/playlists/video/feuerwehrmann_sam.xsp
```


#### 触发 Kodi 视频库更新

```yaml
script:
  update_library:
    alias: "Update Kodi Library"
    sequence:
      - alias: "Call Kodi update"
        action: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: VideoLibrary.Scan
```

## 通知

`kodi` 通知平台可让您从 Home Assistant 向 [Kodi](https://kodi.tv/) 多媒体系统发送消息。

要将 Kodi 添加到您的安装中，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
notify:
  - platform: kodi
    name: NOTIFIER_NAME
    host: IP_ADDRESS
```

```yaml
name:
  description: 在前端中显示的名称。该通知器会绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  type: string
host:
  description: 运行 Kodi 的设备主机名或地址。
  required: true
  type: string
port:
  description: HTTP 端口号。
  required: false
  default: 8080
  type: integer
proxy_ssl:
  description: 使用 HTTPS 连接到 Kodi。如果 Kodi 位于 SSL 代理之后，这会很有用。
  required: false
  default: "`false`"
  type: boolean
username:
  description: XBMC/Kodi HTTP 用户名。
  required: false
  type: string
password:
  description: XBMC/Kodi HTTP 密码。
  required: false
  type: string
```

### 脚本示例

```yaml
kodi_notification:
  sequence:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Home Assistant"
      message: "Message to KODI from Home Assistant!"
      data:
        displaytime: 20000
        icon: "warning"
```

#### 消息变量

```yaml
title:
  description: 显示在消息中的标题。
  required: false
  type: string
message:
  description: 要显示的消息。
  required: true
  type: string
data:
  description: 配置消息属性。
  required: false
  type: map
  keys:
    icon:
      description: "Kodi 自带 3 个默认图标：`info`、`warning` 和 `error`，也可以使用图像 URL。"
      required: false
      default: "`info`"
      type: string
    displaytime:
      description: 消息在屏幕上停留的时长，单位为毫秒。
      required: false
      default: "`10000` ms"
      type: integer
```

如需使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

## 按键事件

您可以在 Kodi 中重写键盘/遥控器按键，并将其配置为向 Home Assistant 发送事件。随后这些事件可用于自动化，例如调高或调低电视/功放音量。

可以通过 [Kodi keymap XML](https://kodi.wiki/view/Keymap) 在 Kodi 中重写按键，也可以在 Kodi 图形界面中使用 [Keymap Editor 插件](https://kodi.wiki/view/Add-on:Keymap_Editor) 完成。

以下是一个使用 XML 的 Kodi keymap 配置示例，它会重写 `volume_up` / `volume_down` 按键，并改为向 Home Assistant 发送事件：

```xml
<keymap>
  <global>
    <keyboard>
      <volume_up>NotifyAll("KodiLivingroom", "OnKeyPress", {"key":"volume_up"})</volume_up>
      <volume_down>NotifyAll("KodiLivingroom", "OnKeyPress", {"key":"volume_down"})</volume_down>
    </keyboard>
  </global>
</keymap>
```

`"KodiLivingroom"` 可设置为任意值，并会在事件数据中作为 `"sender"` 出现。
`"OnKeyPress"` 用于在 Home Assistant 中识别该事件，请勿修改。
`{"key":"volume_up"}` 可以包含任意 JSON，并会出现在事件数据的 `"data"` 键下，通常用来标识按下的是哪个按键。

可用的键盘按键名称请参阅：https://kodi.wiki/view/List_of_keynames
其他操作请参阅：https://kodi.wiki/view/Keymap#Keynames

以上例为例，当按下音量增大键时，Home Assistant 中会触发如下事件：
```yaml
event_type: kodi_keypress
data:
  type: keypress
  device_id: 72e5g0ay5621f5d719qd8cydj943421a
  entity_id: media_player.kodi_livingroom
  sender: KodiLivingroom
  data:
    key: volume_up
```

以下是一个使用该事件来调节功放音量的自动化示例：


```yaml
alias: Kodi keypress
mode: parallel
max: 10
triggers:
  - trigger: event
    event_type: kodi_keypress
    event_data:
      entity_id: media_player.kodi_livingroom
actions:
  - choose:
      - conditions:
          - condition: template
            value_template: "{{trigger.event.data.data.key=='volume_up'}}"
        sequence:
          - action: media_player.volume_up
            target:
              entity_id: media_player.receiver
      - conditions:
          - condition: template
            value_template: "{{trigger.event.data.data.key=='volume_down'}}"
        sequence:
          - action: media_player.volume_down
            target:
              entity_id: media_player.receiver
```


