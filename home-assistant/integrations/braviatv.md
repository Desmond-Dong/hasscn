# Sony Bravia TV

**Sony Bravia TV** 集成允许您控制 [Sony Bravia TV](https://www.sony.com/)。

几乎所有 [2013 年及更新的 Sony Bravia TV](https://info.tvsideview.sony.net/en_ww/home_device.html#bravia) 都受支持。对于较旧的电视，请参阅[下面](#for-tvs-older-than-2013)更通用的设备控制方法。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 身份验证

Bravia TV 集成支持两种身份验证方式：

* **PSK（预共享密钥）** 是用于访问控制的用户定义密钥。此身份验证方法更可靠、更稳定，因此推荐使用。要在电视上设置和启用 PSK，请转到：**设置** > **网络** > **家庭网络设置** > **IP 控制**。
* **PIN 码** 身份验证更简单，不需要额外设置。如果您的电视不显示 PIN 码，请[参阅此指南](#tv-does-not-generate-new-pin)。

有关更多信息，请参阅 [IP 控制身份验证](https://pro-bravia.sony.net/develop/integrate/ip-control/index.html#ip-control-authentication)。

## 媒体浏览器

使用媒体浏览器，您可以查看所有已安装应用程序和电视频道的列表并启动它们。您可以从 Home Assistant 侧边菜单的**媒体**部分或通过选择媒体播放器卡片上的**浏览媒体**按钮访问媒体浏览器。

## 与 Google Cast 配合使用

Bravia TV 集成提供有关设备电源状态、当前源和音量的信息。它使您能够控制播放、运行应用程序和发送遥控命令。不幸的是，由于 Bravia REST API 的限制，它不提供有关应用程序中当前播放内容的信息（应用名称、媒体标题、持续时间、播放/暂停状态等）。相反，[Google Cast](/home-assistant/integrations/cast/index.md) 集成不提供有关设备电源状态的可靠信息（例如在主屏幕上），并且不允许您在没有 [MediaSession](https://developer.android.com/reference/android/media/session/MediaSession) 支持的 Android 应用中控制播放。但是，它可以显示受支持应用中正在播放内容的完整信息。如果您的电视运行 Android 或 Google TV，您可以将 Google Cast 集成与 Bravia TV 集成一起使用。为方便起见，您可以使用[通用媒体播放器](/home-assistant/integrations/universal/index.md)将两个媒体播放器合并为一个。通用媒体播放器将自动选择适当的活动媒体播放器实体。

<details>
<summary>示例 YAML 配置</summary>

将 `media_player.sony_tv_native` 替换为您的 Bravia TV 集成媒体播放器实体 ID。将 `media_player.sony_tv_cast` 替换为您的 Google Cast 集成媒体播放器实体 ID。

```yaml
media_player:
  - platform: universal
    name: Sony TV
    unique_id: sony_tv_combined
    device_class: tv
    children:
      - media_player.sony_tv_native
      - media_player.sony_tv_cast
    active_child_template: >
      {% if state_attr('media_player.sony_tv_native', 'media_content_id') %}
         media_player.sony_tv_native
      {% endif %}
    attributes:
      source: media_player.sony_tv_native|source
      source_list: media_player.sony_tv_native|source_list
    browse_media_entity: media_player.sony_tv_native
    commands:
      turn_off:
        action: media_player.turn_off
        data:
          entity_id: media_player.sony_tv_native
      turn_on:
        action: media_player.turn_on
        data:
          entity_id: media_player.sony_tv_native
      select_source:
        action: media_player.select_source
        data:
          entity_id: media_player.sony_tv_native
          source: "{{ source }}"
      media_play:
        action: media_player.media_play
        target:
          entity_id: media_player.sony_tv_native
      media_pause:
        action: media_player.media_pause
        target:
          entity_id: media_player.sony_tv_native
      media_play_pause:
        action: media_player.media_play_pause
        target:
          entity_id: media_player.sony_tv_native
      media_previous_track:
        action: media_player.media_previous_track
        target:
          entity_id: media_player.sony_tv_native
      media_next_track:
        action: media_player.media_next_track
        target:
          entity_id: media_player.sony_tv_native
```

</details>

## 播放媒体动作

`play_media` 动作可在自动化或脚本中使用，以切换到指定的应用程序或电视频道。它根据 `media_content_id` 选择最佳匹配的应用程序或频道：

1. 频道号\*（例如 '1' 或 '6'）\*
2. 确切的应用或频道名称\*（例如 'Google Play' 或 'CNN'）\*
3. 应用或频道名称中的子字符串\*（例如 'BFM TV' 中的 'BFM'）\*
4. 应用或频道的 URI 字符串\*（例如 'tv:dvbt?trip=9999.441.41104\&srvName=BBC HD'）\*

**打开 YouTube 应用的示例：**

```yaml
action: media_player.play_media
target:
  entity_id: media_player.bravia_tv
data:
  media_content_id: "YouTube"
  media_content_type: "app"
```

**切换到频道号 11 的示例：**

```yaml
action: media_player.play_media
target:
  entity_id: media_player.bravia_tv
data:
  media_content_id: 11
  media_content_type: "channel"
```

**切换到名称包含 'news' 的频道的示例：**

```yaml
action: media_player.play_media
target:
  entity_id: media_player.bravia_tv
data:
  media_content_id: "news"
  media_content_type: "channel"
```

## 遥控器

集成支持 `remote` 平台。它允许您使用 `remote.send_command` 动作向电视发送遥控命令。

可以发送到电视的命令取决于您的电视型号。要显示您的电视支持命令的列表，请使用无效命令（例如 `Test`）调用动作 `remote.send_command`。可用命令列表将显示在 [Home Assistant 系统日志](https://my.home-assistant.io/redirect/logs)中。命令列表也可以通过从[集成设置](https://my.home-assistant.io/redirect/integration/?domain=braviatv)中的设备信息下载诊断来显示。

**发送 `Down` 键命令的示例：**

```yaml
action: remote.send_command
target:
  entity_id: remote.bravia_tv
data:
  command: "Down"
```

<details>
<summary>一些常用命令</summary>

* Up
* Down
* Left
* Right
* Confirm
* Return
* Home
* Exit
* Rewind
* Forward
* ActionMenu
* SyncMenu
* Num0
* Num1
* Num2
* Num3
* Num4
* Num5
* Num6
* Num7
* Num8
* Num9

</details>

## 按钮

集成支持 `button` 平台，允许您重启设备或终止所有正在运行的应用程序。

## 限制和已知问题

### 电视不生成新的 PIN

如果您之前通过 PIN 码将电视设置为任何 Home Assistant 实例，则必须从电视中删除 Home Assistant，以便电视生成新的 PIN。在电视上，转到：**设置** > **网络** > **远程设备设置** > **注销远程设备**。菜单标题可能因型号而略有不同。如有需要，请参阅您特定型号的[手册](https://www.sony.com/electronics/support/manuals)以获取更多指导。

### 有时集成在日志中显示错误，不响应命令

不幸的是，电视上提供 Sony Bravia REST API 的系统服务应用程序（WebApiCore）工作不佳，存在许多问题。该服务可能会自发重启或冻结，特别是当电视长时间未重启或正在运行重度应用程序时。有时进程可能会因内存不足而被 Android TV 本身终止。当服务正在重启时（约 30 秒），API 将不可用，与集成的任何交互都可能导致日志中出现错误。

如果遇到这种情况，您必须完全重启电视。为此，按住遥控器上的**电源**按钮并选择**重启**。此外，我们建议定期完全重启电视。您还可以创建一个自动化，自动重启电视（例如，如果电视关闭，每晚重启）。

如果这种情况经常发生，您可以尝试重置 **WebApiCore** 服务。在电视上，转到：**设置** > **应用** > **查看所有应用** > 找到 **WebApiCore** > 按**清除数据**。

### 集成显示 'Smart TV' 而不是正在运行的应用程序名称

有关更多详细信息，请参阅[与 Google Cast 配合使用](#using-with-google-cast)部分。

### 启用集成时，电视待机模式下的功耗约为 15 W

Bravia TV 是[本地轮询集成](https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#polling-the-local-device)。即使电视关闭，其状态也会不断轮询以确定当前状态，因此电视的网络接口保持启用。这是正常行为。如果您对此感到担忧，可以在集成**系统选项**菜单中禁用更新轮询，但电视状态将不再自动更新，您必须手动调用 `homeassistant.update_entity` 动作来强制更新实体。

请注意，这种行为不仅可能由集成引起，还可能由电视上安装的某些应用程序引起。

### 对于 2013 年以前的电视

2013 年以前的电视用户可以使用 [HDMI-CEC](/home-assistant/integrations/hdmi_cec/index.md)、[Broadlink](/home-assistant/integrations/broadlink/index.md) 或 [Kodi](/home-assistant/integrations/kodi/index.md) 集成控制其设备。
