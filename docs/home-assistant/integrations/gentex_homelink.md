---
title: HomeLink
description: 'HomeLink 集成允许您将 HomeLink(https://homelink.com) 设备集成到 Home Assistant 中。HomeLink 应用程序允许 HomeLink(https://homelink.com) 用户从车内触发各种基于云的智能家居平台上的智能家居例程。'
ha_category:
  - Binary sensor
ha_release: 2026.1
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@niaexa'
  - '@ryanjones-gentex'
ha_domain: gentex_homelink
ha_platforms:
  - event
ha_integration_type: integration
ha_quality_scale: bronze
---
# HomeLink

**HomeLink** 集成允许您将 [HomeLink](https://homelink.com) 设备集成到 Home Assistant 中。HomeLink 应用程序允许 [HomeLink](https://homelink.com) 用户从车内触发各种基于云的智能家居平台上的智能家居例程。当您回家时，按一下 HomeLink 按钮就可以调节恒温器、打开灯光、解除安全系统、解锁门，并开始播放您最喜欢的音乐。

## 前提条件

HomeLink 仅兼容可通过 HomeLink 应用程序访问的 HomeLink 设备。要与 Home Assistant 集成，请准备：


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 配置

```yaml
Email:
    description: "您的 HomeLink 账户电子邮件。"
Password:
    description: "您的 HomeLink 账户密码。"
```

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.