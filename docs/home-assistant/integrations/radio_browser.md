---
title: Radio Browser
description: 有关如何将无线电浏览器集成到 Home Assistant 的说明。
ha_category:
  - Media source
  - Multimedia
ha_release: 2022.3
ha_iot_class: Cloud Polling
ha_domain: radio_browser
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_integration_type: service
---

**Radio Browser** 集成允许您在 Home Assistant 中使用 [Radio Browser](https://www.radio-browser.info) 收录的电台目录。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

要启动 Radio Browser，请在 Home Assistant 中前往 **媒体** > **Radio Browser** 并选择扬声器。
![Starting the radio browser](/home-assistant/images/integrations/radio_browser/radio_browser.png)

## 自动化

您也可以在自动化中使用 Radio Browser。创建自动化时，使用 **播放媒体** 操作从目录中选择电台。例如，这样您就可以创建一个自动化，在 Cast 设备上播放您喜爱的电台。

如果您想使用 YAML 编写自动化，示例如下：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.YOUR_MEDIA_PLAYER
data:
  media_content_id: media-source://radio_browser/963ccae5-0601-11e8-ae97-52543be04c81
  media_content_type: audio/mpeg
```

更多选项请参阅 [Media Player](/home-assistant/integrations/media_player)。
