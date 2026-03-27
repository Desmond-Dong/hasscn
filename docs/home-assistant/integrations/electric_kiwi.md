---
title: Electric Kiwi
description: 'Electric Kiwi(https://www.electrickiwi.co.nz/) is an independent power and broadband company in New Zealand, offering variable rates for peak, shoulder。'
ha_category:
  - Energy
ha_release: '2023.8'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@mikey0000'
ha_domain: electric_kiwi
ha_config_flow: true
ha_platforms:
  - select
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---
# Electric Kiwi

[Electric Kiwi](https://www.electrickiwi.co.nz/) is an independent power and broadband company in New Zealand, offering variable rates for peak, shoulder, and off-peak pricing with a selectable hour of free power. 

This integration uses the official [Electric Kiwi API](https://developer.electrickiwi.co.nz) to provide account information, including balances and savings, and to show and select your hour of free power.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
The configuration uses `client_id` and `client_secret` provided to Home Assistant, so all you need to do is install the integration and authenticate using your account credentials. 

:::
## 支持的功能

The integration provides `sensor` entities with account balances, billing, and hour of free power start and end time. It also provides a `select` entity to change the hour of free power.

## 使用场景

This integration can be used as part of an automation, for example, to turn on/off appliances automatically.

## 自动化示例

<details>
<summary>在免费用电时段运行热泵</summary>


```yaml
alias: "Turn on expensive heat pump"
description: "Turn on the heat pump when the hour of free power starts"
triggers:
  - at: sensor.hour_of_free_power_start
    trigger: time
actions:
  - action: climate.turn_on
    target:
      entity_id: climate.heat_pump
    data: {}
```

```yaml
alias: "Turn off expensive heat pump"
description: "Turn off the heat pump when the hour of free power ends"
triggers:
  - at: sensor.hour_of_free_power_end
    trigger: time
actions:
  - action: climate.turn_off
    target:
      entity_id: climate.heat_pump
    data: {}
```


</details>

## 删除集成

This integration follows standard integration removal, no extra steps are required.

### 从 Home Assistant 中删除集成实例

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
