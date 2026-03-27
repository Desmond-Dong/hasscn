---
title: Fressnapf Tracker
description: 'Fressnapf Tracker 集成允许您将 Fressnapf GPS 跟踪器(https://tracker.fressnapf.de/) 集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Presence detection
ha_iot_class: Cloud Polling
ha_release: 2026.1
ha_config_flow: true
ha_codeowners:
  - '@eifinger'
ha_domain: fressnapf_tracker
ha_platforms:
  - binary_sensor
  - device_tracker
  - light
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---
# Fressnapf Tracker

**Fressnapf Tracker** 集成允许您将 [Fressnapf GPS 跟踪器](https://tracker.fressnapf.de/) 集成到 Home Assistant 中。

您可以使用此集成来跟踪您的宠物位置并在 Home Assistant 中监控它们的活动。

## 支持的功能

### 实体

**Fressnapf Tracker** 集成提供以下实体。

- **设备跟踪器**
  - **描述**：显示您宠物的当前位置。
- **电池**
  - **描述**：显示跟踪器当前的电池电量。
- **充电状态**
  - **描述**：指示跟踪器当前是否正在充电。
- **手电筒**
  - **描述**：允许您打开跟踪器的手电筒，以帮助在黑暗中定位您的宠物。
- **睡眠模式**
  - **描述**：允许您控制跟踪器的睡眠模式以节省电量。
  
## 前提条件

您必须使用移动应用程序将跟踪器添加到您的 Fressnapf Tracker 账户中。
您用于注册的电话号码随后可用于设置集成。

在设置过程中，您将通过短信收到验证码以确认您的身份。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 定义自定义轮询间隔

**Fressnapf Tracker** 每 15 分钟从云端polls数据。

If you want to define a specific interval at which your device is polled for data, you can disable the default polling interval and create your own polling automation.

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), and select your integration.
2. On the integration entry, select `[mdi:dots-vertical]`.
   - Then, select **System options** and toggle the button to disable polling.
   ![Disable polling for updates](/home-assistant/images/screenshots/custom_polling_01.png)
3. To define your custom polling interval, create an automation.
   - Go to [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/) and create a new automation.
   - Define any trigger and condition you like.
   - Select **Add action**, then select **Other actions**.
   - Select **Perform action**, and from the list, select the [`homeassistant.update_entity` action](/home-assistant/integrations/homeassistant/#action-homeassistantupdate_entity).
   - Choose your targets by selecting the **Choose area**, **Choose device**, **Choose entity**, or **Choose label** buttons.
   ![Update entity](/home-assistant/images/screenshots/custom_polling_02.png)
4. Save your new automation to poll for data.

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.