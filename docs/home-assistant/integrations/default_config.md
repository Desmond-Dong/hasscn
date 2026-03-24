---
title: Default Config
description: 默认配置集成将为 Home Assistant 初始化默认配置。
ha_category:
  - Other
ha_release: 0.88
ha_domain: default_config
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

此集成是一个元组件，用于为 Home Assistant 配置一组默认加载的集成。将会加载以下集成：

- [Assist 流程](/home-assistant/integrations/assist_pipeline/) (`assist_pipeline`)
- [备份](/home-assistant/integrations/backup/) (`backup`)
- [蓝牙](/home-assistant/integrations/bluetooth/) (`bluetooth`)
- [配置](/home-assistant/integrations/config/) (`config`)
- [对话](/home-assistant/integrations/conversation/) (`conversation`)
- [DHCP 发现](/home-assistant/integrations/dhcp/) (`dhcp`)
- [能源](/home-assistant/integrations/energy/) (`energy`)
- [Go2rtc](/home-assistant/integrations/go2rtc/) (`go2rtc`)
- [历史记录](/home-assistant/integrations/history/) (`history`)
- [Home Assistant 警报](/home-assistant/integrations/homeassistant_alerts) (`homeassistant_alerts`)
- [Home Assistant 云](/home-assistant/integrations/cloud/) (`cloud`)
- [图片上传](/home-assistant/integrations/image_upload/) (`image_upload`)
- [活动](/home-assistant/integrations/logbook/) (`logbook`)
- [媒体源](/home-assistant/integrations/media_source/) (`media_source`)
- [移动应用支持](/home-assistant/integrations/mobile_app/) (`mobile_app`)
- [我的 Home Assistant](/home-assistant/integrations/my/) (`my`)
- [简单服务发现协议 (SSDP)](/home-assistant/integrations/ssdp/) (`ssdp`)
- [流](/home-assistant/integrations/stream/) (`stream`)
- [太阳](/home-assistant/integrations/sun/) (`sun`)
- [使用预测](/home-assistant/integrations/usage_prediction/) (`usage_prediction`)
- [USB](/home-assistant/integrations/usb/) (`usb`)
- [Webhooks](/home-assistant/integrations/webhook) (`webhook`)
- [零配置网络 (zeroconf)](/home-assistant/integrations/zeroconf/) (`zeroconf`)

## 配置

要在 Home Assistant 中启用它，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# `configuration.yaml` 示例条目
default_config:
```
