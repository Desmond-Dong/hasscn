# Default Config

此集成是一个元组件，用于为 Home Assistant 配置一组默认加载的集成。将会加载以下集成：

* [Assist 流程](/home-assistant/integrations/assist_pipeline/index.md) (`assist_pipeline`)
* [备份](/home-assistant/integrations/backup/index.md) (`backup`)
* [蓝牙](/home-assistant/integrations/bluetooth/index.md) (`bluetooth`)
* [配置](/home-assistant/integrations/config/index.md) (`config`)
* [对话](/home-assistant/integrations/conversation/index.md) (`conversation`)
* [DHCP 发现](/home-assistant/integrations/dhcp/index.md) (`dhcp`)
* [能源](/home-assistant/integrations/energy/index.md) (`energy`)
* [Go2rtc](/home-assistant/integrations/go2rtc/index.md) (`go2rtc`)
* [历史记录](/home-assistant/integrations/history/index.md) (`history`)
* [Home Assistant 警报](/home-assistant/integrations/homeassistant_alerts.md) (`homeassistant_alerts`)
* [Home Assistant 云](/home-assistant/integrations/cloud/index.md) (`cloud`)
* [图片上传](/home-assistant/integrations/image_upload/index.md) (`image_upload`)
* [活动](/home-assistant/integrations/logbook/index.md) (`logbook`)
* [媒体源](/home-assistant/integrations/media_source/index.md) (`media_source`)
* [移动应用支持](/home-assistant/integrations/mobile_app/index.md) (`mobile_app`)
* [我的 Home Assistant](/home-assistant/integrations/my/index.md) (`my`)
* [简单服务发现协议 (SSDP)](/home-assistant/integrations/ssdp/index.md) (`ssdp`)
* [流](/home-assistant/integrations/stream/index.md) (`stream`)
* [太阳](/home-assistant/integrations/sun/index.md) (`sun`)
* [使用预测](/home-assistant/integrations/usage_prediction/index.md) (`usage_prediction`)
* [USB](/home-assistant/integrations/usb/index.md) (`usb`)
* [Webhooks](/home-assistant/integrations/webhook.md) (`webhook`)
* [零配置网络 (zeroconf)](/home-assistant/integrations/zeroconf/index.md) (`zeroconf`)

## 配置

要在 Home Assistant 中启用它，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# `configuration.yaml` 示例条目
default_config:
```
