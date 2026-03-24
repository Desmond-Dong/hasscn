---
title: Spotify
description: 有关如何将 Spotify 集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_release: 0.43
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
  - '@joostlek'
ha_domain: spotify
ha_platforms:
  - diagnostics
  - media_player
ha_integration_type: service
---

**Spotify** 集成可让您在 Home Assistant 中控制 Spotify 账户的播放，并浏览 [Spotify](https://www.spotify.com/) 媒体库。

## 前提条件

- 一个可用的 Spotify 账户。不强制要求 Premium，但推荐使用。
  Premium 账户可进行控制（暂停、播放、下一首等），免费账户只能用于浏览和查看当前播放状态。
- 一个兼容 Spotify 的播放[输出设备](#selecting-output-source)
- 一个 Spotify Developer 应用。创建方法见下一步。

### 创建 Spotify 应用

为了让 Home Assistant 与 Spotify 通信，我们需要通过 Spotify Developer 网站创建一个 Spotify 应用。这样就能获得 Home Assistant 所需的应用凭据，以便您使用 Spotify 账户登录。

1. 如果您之前曾使用 _过期_ 的凭据将 Spotify 集成到 Home Assistant 中，可能需要先在 [Home Assistant Application Credentials dashboard](https://my.home-assistant.io/redirect/application_credentials/) 中删除这些旧的 Spotify 账户凭据。

2. 登录 [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)。

3. 点击右上角的 [**Create app**](https://developer.spotify.com/dashboard/create) 按钮。
  
    ![Spotify Developer Dashboard](/home-assistant/images/integrations/spotify/create-spotify-application.png)

4. 输入名称和描述；可以自由填写您喜欢的内容。

   - 将 _"Redirect URI"_ 设置为以下地址：

    `https://my.home-assistant.io/redirect/oauth`

    - 请直接复制粘贴上面的完整 URL，**不要**修改。

    ![Creating a Spotify Application](/home-assistant/images/integrations/spotify/create-spotify-application.png)

5. 选择 Web API。

6. 勾选同意相关要求，然后点击 **Save** 按钮确认创建应用。

7. Spotify 现在会显示您刚创建的新应用。点击右上角的 **Settings** 按钮进行配置。

   ![Edit the Spotify Application settings](/home-assistant/images/integrations/spotify/edit-settings.png)

8. 在开始配置 Home Assistant 前，我们需要先获取 Home Assistant 所需的应用凭据。

   - 点击 **View client secret** 按钮以显示 client secret。

   ![Show the client secret of the Spotify Application](/home-assistant/images/integrations/spotify/show-client-secret.png)

9. _"Client ID"_ 和 _"Client secret"_ 是 Home Assistant 与 Spotify 通信所需的两项信息，也就是所谓的应用凭据。

   ![Get the application credentials from the Spotify Application](/home-assistant/images/integrations/spotify/application-credentials.png)

   - 在 Home Assistant 中设置 Spotify 集成时，您将需要使用 _"Client ID"_ 和 _"Client secret"_。

现在您可以继续阅读下一节，在 Home Assistant 中配置 Spotify 集成。

<details>
<summary>我已手动禁用 My Home Assistant</summary>


如果您的安装中没有启用 [My Home Assistant](/home-assistant/integrations/my)，则可以改用 `<HOME_ASSISTANT_URL>/auth/external/callback` 作为重定向 URI。

`<HOME_ASSISTANT_URL>` 必须与配置/认证过程中所使用的地址一致。

内部地址示例：`http://192.168.0.2:8123/auth/external/callback`、`http://homeassistant.local:8123/auth/external/callback`。


</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 数据更新

该集成至少每 30 秒进行一次 polls。
如果当前播放的曲目将在 30 秒内结束，集成会在曲目结束后再次轮询，以更新状态。

## 使用多个 Spotify 账户

此集成同时支持多个 Spotify 账户。您无需在 Spotify Developer Portal 中重新创建另一个 Spotify 应用。
多个 Spotify 账户可以关联到 _同一个_ Spotify 应用。

您需要在 Spotify Developer Portal 的应用 **User Management** 部分中添加这些账户。

要向 Home Assistant 添加额外的 Spotify 账户，请前往 Spotify 网站退出当前账户，然后 _仅_ 重复[Configuration](#configuration) 部分中的步骤。

## 选择输出源

要播放媒体，Spotify 首先需要选择一个作为音频输出的设备，即 `source`。

```yaml
# 选择 AV 接收机作为输出设备的示例代码
action: media_player.select_source
target:
  entity_id: media_player.spotify
data:
  source: "Denon AVR-X2000"
```

Spotify API 无法向尚未被 Spotify API 识别的设备发起播放。可用设备的 source 列表可在 Spotify 媒体播放器控件的 Details 区域，以及 [**Settings** > **Developer Tools** > **States**](https://my.home-assistant.io/redirect/developer_states/) 中的 `source_list` 属性里找到。

## 播放 Spotify 播放列表

您可以通过 [media_player.play_media](/home-assistant/integrations/media_player/#action-media_playerplay_media) 操作中的 `"media_content_type": "playlist"` 将播放列表发送给 Spotify，例如：

```yaml
# 播放播放列表的示例脚本
script:
  play_jazz_guitar:
    sequence:
      - action: media_player.play_media
        target:
          entity_id: media_player.spotify
        data:
          media_content_id: "https://open.spotify.com/playlist/5xddIVAtLrZKtt4YGLM1SQ?si=YcvRqaKNTxOi043Qn4LYkg"
          media_content_type: playlist
```

`media_content_id` 的值可在 Spotify 桌面应用中获取：点击专辑封面旁边的更多选项（`...`），选择 `Share`，然后选择 `Copy Spotify URI` 或 `Copy Playlist Link`（Spotify 手机应用和网页应用中也可获取）。或者，您也可以直接将 Spotify URI 字符串（例如 `spotify:playlist:5xddIVAtLrZKtt4YGLM1SQ`）作为 `media_content_id` 提供。

## 不支持的设备

- **Sonos**：虽然 Sonos 是 Spotify Connect 设备，但官方 Spotify API 不支持它。一个可行的替代方案是通过 [Music Assistant](https://www.music-assistant.io/) 使用 `music_assistant.play_media` 操作来配合 Sonos 播放 Spotify。Music Assistant 会额外创建一个以原始 `media_player` 命名的媒体播放器实体，您可以用它来播放 Spotify。

## 移除此集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
