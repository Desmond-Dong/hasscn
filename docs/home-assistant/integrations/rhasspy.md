---
title: Rhasspy
description: 有关在 Home Assistant 中设置 Rhasspy 的说明。
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2022.8'
ha_config_flow: true
ha_codeowners:
  - '@synesthesiam'
ha_domain: rhasspy
ha_integration_type: integration
---

**Rhasspy** 集成允许您在 Home Assistant 安装中使用 [Rhasspy 语音助手](https://rhasspy.readthedocs.io)。Rhasspy 是一套开源、完全离线的语音助手服务，支持多种人类语言。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

Rhasspy 提供两种版本。如果您只是想先试用，可以将麦克风和扬声器连接到运行 Home Assistant 的设备上，并将 Rhasspy Junior 作为 Home Assistant 应用安装。安装完成后，您就可以说出[这些预定义语句](https://github.com/rhasspy/rhasspy-junior#domains)中的任意一句。

[![Open **Add-on** in your Home Assistant instance.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=47701997_rhasspy_junior)

对于已经有 Rhasspy 使用经验并希望进一步了解的高级用户，可以使用完整版 Rhasspy。完整版允许调整几乎所有可配置项，并且通常需要先完成这些设置后才能使用。它也可以作为应用安装：

[![Open **Add-on** in your Home Assistant instance.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=47701997_rhasspy)
