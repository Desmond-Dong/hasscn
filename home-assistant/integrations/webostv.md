# LG webOS TV

**LG webOS TV** 集成可让您控制 [LG](https://www.lg.com/) webOS 电视。

Home Assistant 目前支持以下设备类型：

* [Media player](/home-assistant/integrations/media_player/index.md)
* [Notifications](/home-assistant/integrations/notify/index.md)

开始之前，请先在电视的 *Network* 设置中启用 *LG Connect Apps* 功能。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: "电视的主机名或 IP 地址。您可以在路由器中找到它。"
```

## 配置选项

此集成提供以下配置选项：

```yaml
Sources:
  description: 您可以选择哪些输入源会在媒体播放器中可用。打开电视后，在集成卡片中选择 **CONFIGURE** 按钮并选择要启用的输入源。如果您没有选择任何输入源，媒体播放器将提供电视的全部输入源。
```

## 支持的设备

运行 webOS 2.0 及以上版本的 LG webOS TV 设备。

## 开机自动化触发器

要打开电视，您需要创建一个自动化。您可以直接在用户界面中创建自动化。在设备页面中创建新的自动化，并选择 **Device is requested to turn on** 触发器。

如果您想通过自动化来打开 LG webOS TV，请安装如 [HDMI-CEC](/home-assistant/integrations/hdmi_cec/index.md) 或 [WakeOnLan](/home-assistant/integrations/wake_on_lan/index.md) 等集成。它们提供了可用于开机的操作。

对于 webOS 3.0 及以上版本，通常会使用 WakeOnLan 功能。要使用此功能，您的电视应通过以太网而不是无线网络连接到局域网，并且需要在电视的 *Network* 设置中启用 *LG Connect Apps* 功能（旧型号则可能是在 *General* 设置中的 *Mobile App*，具体因版本而异）。

:::important
这通常仅在电视连接到同一网络时有效。要将 WakeOnLan 数据包路由到其他子网，需要在路由器上进行特殊配置，或者可能根本无法实现。

:::
您也可以使用 YAML 创建自动化：

`webostv.turn_on` 设备触发器可用于在按下媒体播放器电源按钮时，通过自动化打开电视。

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Entity requested to turn on. For example `media_player.lg_webos_tv`|

```yaml
# Example configuration.yaml entry
wake_on_lan: # enables `wake_on_lan` integration

automation:
  - alias: "Turn On Living Room TV with WakeOnLan"
    triggers:
      - trigger: webostv.turn_on
        entity_id: media_player.lg_webos_tv
    actions:
      - action: wake_on_lan.send_magic_packet
        data:
          mac: aa:bb:cc:dd:ee:ff
```

您也可以配置其他用于开机的 [actions](/home-assistant/docs/automation/action/index.md)。

## 操作

此集成提供以下操作。

### 操作：选择声音输出

`webostv.select_sound_output` 操作用于选择当前激活的声音输出。
电视当前的声音输出可在状态属性中查看。

| Data attribute | Optional | Description                             |
| ---------------------- | -------- | --------------------------------------- |
| `entity_id`            | no       | Target a specific webostv media player. |
| `sound_output`         | no       | Name of the sound output to switch to.  |

### 操作：按钮按下

`webostv.button` 操作用于模拟按键按下。

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Target a specific webostv media player.                                                                                                                                                                                                                                                |
| `button`               | no       | Name of the button. Known possible values are `LEFT`, `RIGHT`, `DOWN`, `UP`, `HOME`, `MENU`, `BACK`, `ENTER`, `DASH`, `INFO`, `ASTERISK`, `CC`, `EXIT`, `MUTE`, `RED`, `GREEN`, `BLUE`, `YELLOW`, `VOLUMEUP`, `VOLUMEDOWN`, `CHANNELUP`, `CHANNELDOWN`, `PLAY`, `PAUSE`, `NETFLIX`, `GUIDE`, `AMAZON`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` |

### 操作：通用命令

`webostv.command` 操作用于向电视发送通用命令。

| Data attribute | Optional | Description                                                                                                                                                                          |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | no       | Target a specific webostv media player.                                                                                                                                              |
| `command`              | no       | Endpoint for the command, e.g.,  `system.launcher/open`.  The full list of known endpoints is available at <https://github.com/home-assistant-libs/aiowebostv/blob/main/aiowebostv/endpoints.py> |
| `payload`             | yes      | An optional payload to provide to the endpoint in the format of key value pair(s). |

```yaml
script:
  home_button:
    sequence:
      - action: webostv.button
        target:
          entity_id:  media_player.lg_webos_tv
        data:
          button: "HOME"

  open_google_command:
    sequence:
      - action: webostv.command
        target:
          entity_id:  media_player.lg_webos_tv
        data:
          command: "system.launcher/open"
          payload:
            target: https://www.google.com
```

### 操作：通知

`notify` 平台允许您向 LG webOS TV 发送通知。
您可以通过提供替代图标文件路径，为单条通知覆盖默认图标：

| Data attribute | Optional | Description                             |
| ---------------------- | -------- | --------------------------------------- |
| `entity_id`            | no       | Target a specific webostv media player. |
| `message`         | no       | Message to be displayed on the TV.  |
| `icon`         | yes       | Optional icon to be shown with the notification.  |

```yaml
automation:
  - alias: "Front door motion"
    triggers:
      - trigger: state
        entity_id: binary_sensor.front_door_motion
        to: "on"
    actions:
      - action: notify.livingroom_tv
        data:
          message: "Movement detected: Front Door"
          data:
            icon: "/home/homeassistant/images/doorbell.png"
```

:::important
图标必须是 Home Assistant 可访问的本地文件，而不能是网页 URL。电视本身不需要直接访问该图标。此集成会将图标编码到通知消息中并发送到电视。

:::

## 数据更新

LG webOS TV 设备会自动向 Home Assistant 推送数据。

## 通过自动化切换输入源

假设您希望 LG 电视在开机后自动切换到某个特定输入源。下面是一个简单的自动化示例，它会在电视打开后启动 `YouTube`。
它使用 [Media player](/home-assistant/integrations/media_player/index.md) 集成中的 `select_source` 操作，来启动安装在 LG 电视上的特定应用。

要查找电视可用的输入源

1. Go to [**Settings** > **Developer tools** > **States**](https://my.home-assistant.io/redirect/developer_states/).
2. Find your TV's media\_player entity.
3. Look for the `source_list` attribute which contains all available sources.

:::tip
Source list example: `source_list: ARD Mediathek, Apps, HDMI 1, Home Dashboard, JBL Bar 1300, Media Player, Netflix, Prime Video, Public Value, Spotify - Music and Podcasts, Timer, Web Browser, YouTube, ZDFmediathek`

:::
此自动化可以完全通过 Home Assistant UI 创建。设置时，您只需在操作配置中手动输入输入源名称（例如 `YouTube`）。下面是生成的 YAML 代码：

```yaml
alias: Switch TV source to YouTube by Default
description: 'Regardless if started from TV remote or via wake-on-lan, the TV will switch to YouTube right after it is on'
triggers:
  - device_id: <TV DEVICE ID>
    domain: media_player
    entity_id: <TV MEDIA PLAYER ENTITY ID>
    type: turned_on
    trigger: device
conditions: []
actions:
  - action: media_player.select_source
    metadata: {}
    data:
      source: YouTube
    target:
      device_id: <TV DEVICE ID>
mode: single
```

## 通过 play\_media 操作切换频道

`play_media` 操作可在脚本中用于切换到指定电视频道。它会根据 `media_content_id` 参数选择最匹配的频道：

1. Channel number *(i.e., '1' or '6')*
2. Exact channel name *(i.e., 'France 2' or 'CNN')*
3. Substring in channel name *(i.e., 'BFM' in 'BFM TV')*

```yaml
# Example action entry in script to switch to channel number 1
action: media_player.play_media
target:
  entity_id: media_player.lg_webos_tv
data:
  media_content_id: 1
  media_content_type: "channel"

# Example action entry in script to switch to channel including 'TF1' in its name
action: media_player.play_media
target:
  entity_id: media_player.lg_webos_tv
data:
  media_content_id: "TF1"
  media_content_type: "channel"
```

## 下一项/上一项按钮

下一项和上一项按钮的行为会根据当前活动输入源而不同：

* 如果输入源是 `LiveTV`（电视）：下一项/上一项按钮会作为频道加减
* 否则：下一项/上一项按钮会作为下一曲/上一曲

## 故障排除

### 设备未被自动发现

此集成依赖 [SSDP](/home-assistant/integrations/ssdp.md) 集成，必须启用后设备发现功能才能正常工作。

### [WakeOnLan](/home-assistant/integrations/wake_on_lan/index.md) 无法工作

对于较新的型号（2017 及以后），可能需要在电视设置中前往 **Settings** > **General** > **Mobile TV On** > **Turn On Via WiFi** 启用 WakeOnLan。[说明](https://support.quanticapps.com/hc/en-us/articles/115005985729-How-to-turn-on-my-LG-Smart-TV-using-the-App-WebOS-)

### 添加电视时配对失败

请确保已在电视的 *Network* 设置中启用 *LG Connect Apps* 功能。

## 已知限制

* 如果 Home Assistant 与电视不在同一网络中，您需要创建一条防火墙规则，允许 Home Assistant 使用 TCP 协议通过 3000 和 3001 端口连接到电视。
* 大多数较新的电视固件不允许在 `notify` 命令中传递 `icon` 参数，电视会忽略图标，只显示消息内容。

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
