---
title: HERE Travel Time
description: 关于如何将 HERE 行程时间添加到 Home Assistant 的说明。
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.100'
ha_config_flow: true
ha_codeowners:
  - '@eifinger'
ha_domain: here_travel_time
ha_platforms:
  - sensor
ha_integration_type: service
---

**HERE Travel Time** 集成通过 [HERE Routing API](https://www.here.com/docs/bundle/routing-api-developer-guide-v8/page/README.html) 提供行程时间。

## Setup

您需要按照 [API 开发者指南](https://www.here.com/docs/bundle/routing-api-developer-guide-v8/page/topics/send-request.html)中的说明注册并获取 API 密钥。

HERE 提供 Base Plan，每月包含 5000 次免费调用。如果您不使用[按需更新传感器](#updating-sensors-on-demand-using-automation)，通常可以跟踪 1 条路线而不超出限制。

更多信息请参阅[定价页面](https://www.here.com/get-started/pricing)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

说明：

- Origin 和 Destination 可以是地址或 GPS 坐标。对于[动态配置](#dynamic-configuration)，您还可以填写：状态中包含此信息的实体 ID、带有经纬度属性的实体 ID，或区域友好名称（区分大小写）。

## Options

To define options for HERE Travel Time, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of HERE Travel Time are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

## Dynamic configuration

跟踪可配置为跟踪 `device_tracker`、`zone`、`sensor`、`input_select`、`input_text` 和 `person` 类型的实体。如果在 origin 或 destination 中填写实体，每次平台更新时都会使用该实体的最新位置。这意味着系统会尽可能直接使用其位置，或持续解析实体值，直到找到有效坐标。您还可以将多个目的地放入 `input_select` 的选项中，并将其设为 destination。

```yaml
# Example entry for configuration.yaml
input_select:
  here_destination_preset:
    options:
      - zone.home
      - zone.office
      - zone.somewheredefault
```

- **device_tracker**
  - 如果状态是某个 zone，则使用该 zone 的位置
  - 如果状态不是 zone，则查找 longitude 和 latitude 属性
- **person**
  - 如果状态是某个 zone，则使用该 zone 的位置
  - 如果状态不是 zone，则查找 longitude 和 latitude 属性
- **zone**
  - 使用 longitude 和 latitude 属性
- **sensor**
  - 如果状态是某个 zone，则使用该 zone 的位置
  - 如果状态是另一个实体的名称，则会递归解析实体状态，直到找到有效坐标
- **input_select**
  - 如果状态是某个 zone，则使用该 zone 的位置
  - 如果状态是另一个实体的名称，则会递归解析实体状态，直到找到有效坐标
- **input_text**
  - 如果状态是某个 zone，则使用该 zone 的位置
  - 如果状态是另一个实体的名称，则会递归解析实体状态，直到找到有效坐标

## Updating sensors on-demand using Automation

您也可以使用 `homeassistant.update_entity` 动作按需更新传感器。例如，如果您希望在工作日早晨每 2 分钟更新一次 `sensor.morning_commute`，可以使用以下自动化：

```yaml
automation:
- alias: "Commute - Update morning commute sensor"
  initial_state: "on"
  triggers:
    - trigger: time_pattern
      minutes: "/2"
  conditions:
    - condition: time
      after: "08:00:00"
      before: "11:00:00"
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: homeassistant.update_entity
      target:
        entity_id: sensor.morning_commute
```

如需更详细的自定义轮询间隔设置步骤，请按以下流程操作。

### Defining a custom polling interval

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
