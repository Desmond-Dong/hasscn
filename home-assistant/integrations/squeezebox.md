# Squeezebox (Lyrion Music Server)

**Squeezebox** 集成可让您控制 [Lyrion Music Server](https://lyrion.org/) (LMS) 生态中的音乐播放器。Lyrion Music Server 之前名为 [Logitech Media Server](https://en.wikipedia.org/wiki/Squeezebox_%28network_music_player%29)。

此集成会连接到现有的 <abbr title="Lyrion Music Server">LMS</abbr> 服务器，并提供媒体播放器实体和用于监控服务器状态的传感器。

可通过此集成控制的 Squeezebox 音乐播放器生态包括 Logitech 的[硬件音频播放器](https://lms-community.github.io/players-and-controllers/hardware-comparison/)，例如 [Squeezebox 第三代](https://lyrion.org/players-and-controllers/squeezebox-classic/)、[Squeezebox Boom](https://lyrion.org/players-and-controllers/squeezebox-boom/)、[Squeezebox Receiver](https://lyrion.org/players-and-controllers/squeezebox-receiver/)、[Transporter](https://lyrion.org/players-and-controllers/transporter/)、[Squeezebox2](https://lyrion.org/players-and-controllers/squeezebox2/)、[Squeezebox](https://lyrion.org/players-and-controllers/squeezebox1/) 和 [SLIMP3](https://lyrion.org/players-and-controllers/SLIMP3/)，以及许多软件模拟器，如 [Squeezelite](https://sourceforge.net/projects/lmsclients/files/squeezelite/)、[SqueezeSlave](https://sourceforge.net/projects/lmsclients/files/squeezeslave/)、[SoftSqueeze](https://sourceforge.net/projects/lmsclients/files/softsqueeze/) 和 [SqueezePlay](https://sourceforge.net/projects/lmsclients/files/squeezeplay/)。

## 支持的设备

此集成支持任何与 Squeezebox 兼容的[硬件或软件播放器](https://lyrion.org/players-and-controllers/)，以及 Lyrion Music Server 和 Logitech Media Server。

## 前提条件

1. 一台或多台与 Squeezebox 兼容的[硬件或软件播放器](https://lyrion.org/players-and-controllers/)。
2. 一台或多台 [Lyrion Music Server 或 Logitech Media Server (LMS)](https://lyrion.org/getting-started)，并让 Squeezebox 播放器连接到这些服务器。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
此集成的单个配置条目会将连接到同一台 LMS 的所有 Squeezebox 设备添加到 Home Assistant。

:::
如果无法发现 LMS，也可以手动配置。

```yaml
Host:
  description: "The host name or IP address (e.g., \"192.168.1.2\") of your LMS."
Port:
  description: "The integration uses the web interface of the Lyrion Music Server (LMS) to send commands. The default port of the web interface is 9000. It is the same port that you use to access the LMS through your web browser."
Username:
  description: "If you have selected \"Password Protection\" in your LMS Advanced Security, enter your Username here."
Password:
  description: "If you have selected \"Password Protection\" in your LMS Advanced Security, enter your Password here."
Connect over HTTPS:
  description: "The integration now supports Lyrion Music Servers behind an HTTPS reverse proxy. Please note that Lyrion Music Server natively only supports HTTP traffic. Unless you have configured a reverse proxy, do not select the \"Connect over HTTPS\" option. If you have configured a reverse proxy, remember to update the port number."
```

拥有两个数字输入的 Logitech Transporter 可以通过脚本启用。以下示例会打开 Transporter 并激活 toslink 输入接口：

```yaml
# Turn on Transporter and activate toslink interface
transporter_toslink:
  sequence:
    - action: homeassistant.turn_on
      target:
        entity_id: media_player.transporter
    - action: media_player.play_media
      target:
        entity_id: media_player.transporter
      data:
        media_content_id: 'source:toslink'
        media_content_type: 'music'
```

## 选项

要为 Squeezebox（Lyrion Music Server）设置选项，请按以下步骤操作：

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of Squeezebox (Lyrion Music Server) are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
  
Browse limit:  
 description: Maximum number of items to include when browsing media or in a playlist.
Volume step:  
 description: Amount to adjust the volume when turning volume up or down.  
```

## 通知播放

The Squeezebox media player entity supports the "announce" parameter in the `media_player.play_media` action. When media is played with announce:true, the current state of the media player is saved, the media is then played, and when playing is finished, the original state is restored. For example, if the media player is on and playing a track, once the announcement is finished, the track will resume playing at the same point it was paused by the announcement. If the media player was off, it will be turned off again after playing the announcement.

### 附加键

以下附加键可用于修改通知播放行为。

| Data attribute     | Optional | Description                                                                                                                                                              |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `announce_volume`  | yes      | Specifies the volume at which the announcement should play. The value must be between 0 and 1, where 0.1 represents 10% of the player's volume, 0.2 represents 20%, etc. |
| `announce_timeout` | yes      | Specify the maximum length of the announcement in seconds after which the original media will be resumed.                                                                |

这些附加键都是可选的。如果未指定 announce\_volume，通知将以播放器当前音量播放。如果未指定 announce\_timeout，通知会一直播放到结束。

### 示例

将本地文件作为通知播放：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.squeezebox
data:
  media_content_type: music
  media_content_id: media-source://media_source/local/doorbell.mp3
  announce: true
```

将本地文件作为通知播放，并设置音量为 20%、超时时间为 60 秒：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.squeezebox
data:
  media_content_type: music
  media_content_id: media-source://media_source/local/doorbell.mp3
  announce: true
  extra:
    announce_volume: 0.2
    announce_timeout: 60
```

### 通知与文本转语音（TTS）

使用“文本转语音 (TTS)：说出”操作时，Home Assistant 会自动将 announce 参数设为 true，并启用通知相关功能，例如暂停当前播放。

不过，“文本转语音 (TTS)：说出”操作不支持上述附加键。如果你希望在 TTS 中使用 announce\_volume 和/或 announce\_timeout，需要像下方示例那样，使用 media-source://tts/(tts\_provider) 构造 media\_content\_id。

#### 示例

使用文本转语音（TTS）操作播放通知

```yaml
action: tts.speak
data:
  media_player_entity_id: media_player.squeezebox
  message: There's someone at the door
  cache: false
target:
  entity_id: tts.google_translate_en_co_uk
```

使用带有 announce\_volume 和 announce\_timeout 的 TTS media-source 播放通知

```yaml
action: media_player.play_media
target:
  entity_id: media_player.squeezebox
data:
  media_content_type: music
  media_content_id: media-source://tts/tts.google_translate_en_co_uk?message="There's someone at the door"
  announce: true
  extra:
    announce_volume: 0.2
    announce_timeout: 60
```

## 支持的功能

此集成提供以下功能：

### 开关

* **Alarm**: Enables a scheduled alarm to sound. Alarms must also be enabled on the associated player for the alarm to sound, using the Alarms Enabled switch or directly on the Lyrion Music Server for that player.
* **Alarms Enabled**: Enables a player to sound alarms. Disabling will prevent all alarms from sounding on that player, regardless of whether the individual alarm is enabled.

### 二进制传感器

* **Alarm active**
  * **Description**: One of the alarms on the Squeezebox player is currently going off.

* **Alarm snoozed**
  * **Description**: One of the alarms on the Squeezebox player is currently active but snoozed. In this case the "Alarm active" binary sensor will be in state OFF.

* **Alarm upcoming**
  * **Description**: The Squeezebox player has an alarm scheduled within the next 24 hours.

* **Library rescan**
  * **Description**: The music library is currently being scanned by LMS (depending on the type of scan, some content may be unavailable).

* **Needs restart**
  * **Description**: Server Service needs to be restarted (typically, this is needed to apply updates).

### 按钮

* **Preset 1 ... Preset 6**
  * **Description**: Play media stored in Preset 1 to Preset 6 on Squeezebox.

* **Brightness up, Brightness down**
  * **Description**: Adjust the brightness on Logitech Squeezebox players
  * **Available on**: Logitech hardware players with built-in screen, such as Radio and Boom.

* **Bass up, Bass down**
  * **Description**: Adjust the bass on Logitech Squeezebox players, such as Radio and Boom.
  * **Available on**: Logitech hardware players such as Radio, Duet and Boom.

* **Treble up, Treble down**
  * **Description**: Adjust the treble on Logitech Squeezebox players, such as Radio and Boom.
  * **Available on**: Logitech hardware players such as Radio, Duet, and Boom.

### 传感器

* **Last scan**
  * **Description**: Date of the last library scan.

* **Next alarm**
  * **Description**: Timestamp of the next enabled alarm of a player.

* **Player count**
  * **Description**: Number of players on the service.

* **Player count off service**
  * **Description**: Number of players not on this service.

* **Total albums**
  * **Description**: Total number of albums currently available on the service.

* **Total artists**
  * **Description**: Total number of artists currently available on the service.

* **Total duration**
  * **Description**: Duration of all tracks in service (HHHH:MM:SS).

* **Total genres**
  * **Description**: Total number of genres used in current service.

* **Total songs**
  * **Description**: Total number of music files currently in service.

### 更新

当 LMS 版本或已安装插件有可用更新时，此集成会通知你。

* **Lyrion Music Server**: Update of the server software is available.
* **Updated plugins**: Plugin updates are available.  The list of updates can be viewed by selecting the "Read release announcement" link.  On the LMS, an option is available on the Manage Plugins settings page to "Update plugins automatically".  If this option is selected, plugins will be downloaded automatically by the LMS and then installed on the next restart of the LMS.  For some installation types of LMS, the LMS can be restarted by selecting the **Update** button. Allow enough time for the LMS to restart as it will become briefly unavailable.

### 操作

此集成提供以下操作。

#### 操作：调用方法

The `squeezebox.call_method` action calls a custom Squeezebox JSON-RPC API.

See documentation for this interface on `http://HOST:PORT/html/docs/cli-api.html?player=` where HOST and PORT are the host name and port for your Lyrion Music Server.

| Data attribute | Optional | Description                                                                                           |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `entity_id`    | no       | Name(s) of the Squeezebox entities where to run the API method.                                       |
| `command`      | no       | Command to pass to Lyrion Music Server (p0 in the CLI documentation).                                 |
| `parameters`   | yes      | Array of additional parameters to pass to Lyrion Music Server (p1, ..., pN in the CLI documentation). |

此操作可用于将任意 Squeezebox 操作集成到自动化中。

它也可用于从 IFTTT（或 Dialogflow、Alexa 等）调用指定的 Squeezebox。

例如，要播放收藏中的一张专辑，可以创建如下 IFTTT 小程序：

* Trigger: Google Assistant, with sentence: `I want to listen to album $`
* Action: JSON post query with such JSON body:
  `{ "entity_id": "media_player.squeezebox_radio", "command": "playlist", "parameters": ["loadtracks", "album.titlesearch={{TextField}}"] }`

这适用于标题搜索以及几乎任何内容。若直接调用 Squeezebox 服务器则无法实现同样效果，因为 IFTTT 无法对文本字段进行转义。

在可视化编辑器中指定附加参数时，每个参数前都必须加上连字符和空格，才能正确填充数组：

例如，要创建一个将播放静音的自动化，请使用命令 `mixer` 和参数 `muting`：

| Row | Parameter | Description            |
| --- | --------- | ---------------------- |
| 1   | - muting  | Toggle muting on / off |

生成的 YAML 如下：

```yaml
# Toggle the muting state of the specified player
action: squeezebox.call_method
metadata: {}
data:
  command: mixer
  parameters:
    - muting
```

如果参数表示递增或递减，则必须将该值放在双引号中。

例如，要提高播放音量，请使用命令 `mixer`，并传入参数 `volume` 以及要增加的数值：

| Row | Parameter | Description                   |
| --- | --------- | ----------------------------- |
| 1   | - volume  | Parameter to change           |
| 2   | - "+5"    | Increment volume by 5 percent |

生成的 YAML 如下：

```yaml
# Increment the playback volume of the specified player by five percent
action: squeezebox.call_method
metadata: {}
data:
  command: mixer
  parameters:
    - volume
    - '+5'
```

#### 操作 `call_query`

调用自定义 Squeezebox JSON-RPC API。查询结果会存储在播放器的 `query_result` 属性中。

See documentation for this interface on `http://HOST:PORT/html/docs/cli-api.html?player=` where HOST and PORT are the host name and port for your Lyrion Music Server.

| Data attribute | Optional | Description                                                                                           |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `entity_id`    | no       | Name(s) of the Squeezebox entities where to run the API method.                                       |
| `command`      | no       | Command to pass to Lyrion Music Server (p0 in the CLI documentation).                                 |
| `parameters`   | yes      | Array of additional parameters to pass to Lyrion Music Server (p1, ..., pN in the CLI documentation). |

此操作可用于将 Squeezebox 查询集成到自动化中。例如，在 Python 脚本中，你可以这样获取某位艺术家的专辑列表：
`hass.services.call("squeezebox", "call_query", { "entity_id": "media_player.kitchen", "command": "albums", "parameters": ["0", "20", "search:beatles", "tags:al"] })`
要处理结果：
`result = hass.states.get("media_player.kitchen").attributes['query_result']`

## 数据更新

此集成使用轮询方式从 Lyrion Music Server (LMS) 接收更新。它通过 LMS 的 Web 界面发送命令。Web 界面的默认端口为 9000，也就是你通过浏览器访问 LMS 时使用的端口。

## 已知限制

此集成所使用的 LMS API 目前无法覆盖或控制淡入与交叉淡化设置。这意味着，如果你在播放器音频设置中启用了 **Play or Resume fade-in duration**，该淡入效果也会应用到任何通知播放中。这可能导致通知开头因淡入而被错过。因此，如果你会使用通知功能，建议将 **Play or Resume fade-in duration** 设为较短时间，或直接禁用该功能。

## 删除集成

此集成遵循标准的集成删除流程，无需额外步骤。

### 从 Home Assistant 中删除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
2. 在设备列表中，选择你要删除的集成实例。
3. 在该条目旁选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **删除**。
