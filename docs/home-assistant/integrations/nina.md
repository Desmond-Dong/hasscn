---
title: NINA
description: "有关如何在 Home Assistant 中设置 NINA 警告的说明。"

ha_category:
  - Binary sensor
ha_release: 2022.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@DeerMaximum'
ha_domain: nina
ha_platforms:
  - binary_sensor
  - diagnostics
ha_integration_type: service
ha_quality_scale: silver
---

The [NINA](https://www.bbk.bund.de/DE/Warnung-Vorsorge/Warn-App-NINA/warn-app-nina_node.html) integration displays warnings from the [Bundesamt für Bevölkerungsschutz und Katastrophenhilfe](https://www.bbk.bund.de/) in Germany.

它为每个县/市创建警告槽，当出现警告时，警告槽会更改为不安全。警告文本和元数据存储在槽的属性中。

## Configuration

To add the **NINA** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nina)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nina).
- From the list, select **NINA**.
- Follow the instructions on screen to complete the setup.

</details>

```yaml
City/county:
  description: "City/county to receive warnings for. Grouped for better searchability."
Maximum warnings:
  description: "Maximum warnings fetched per city/county"
Affected area filter:
  description: "Whitelist regex to filter warnings based on affected areas. For details see below."
Headline blocklist:
  description: "Blacklist regex to filter warning based on headlines. For details see below."
```

## Options

To define options for NINA, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of NINA are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
City/county:
  description: "City/county to receive warnings for. Grouped for better searchability."
Maximum warnings:
  description: "Maximum warnings fetched per city/county"
Affected area filter:
  description: "Whitelist regex to filter warnings based on affected areas. For details see below."
Headline blocklist:
  description: "Blacklist regex to filter warning based on headlines. For details see below."
```

## Filter

该集成包括通过正则表达式以两种方式过滤警告的可能性。

:::note
All filters are applied to lowercase text only.

:::
### Headline blocklist

该黑名单根据标题过滤警告。换句话说，如果正则表达式与警告标题匹配，则警告将被**忽略**。

默认值：不匹配任何内容 (`/(?!)/`)

#### Example

忽略包含“corona”一词的警告

正则表达式：`.*corona.*` <br>
标题：“corona-verordnung des landes：warnstufe durch landesgesundheitsamt ausgerufen”

### Affected area filter

此过滤器基于受影响区域的**白名单**警告。换句话说，如果正则表达式匹配该区域，就会**显示**。

Default: Match all (`.*`)

#### Example

仅显示来自纳戈尔德市的警告。

正则表达式：`.*nagold.*` <br>
地区：`gemeinde oberreichenbach、gemeinde neuweiler、stadt nagold`

## Attributes

| Attribute    | Description                            |
| ------------ | -------------------------------------- |
| `headline` | *(str)* Official headline of the warning. |
| `description` | *(str)* Official description of the warning. |
| `sender` | *(str)* Sender of the warning. Can be empty. |
| `severity` | *(str)* Severity of the warning. <br>Extreme - Extraordinary threat to life or property <br>Severe - Significant threat to life or property <br>Moderate - Possible threat to life or property <br>Minor – Minimal to no known threat to life or property <br>Unknown - Severity unknown |
| `recommended_actions` | *(str)* The recommendations for action. |
| `affected_areas` | *(str)* Areas where the warning applies. |
| `id` | *(str)* Individual ID for each warning. |
| `sent` | *(time)* Transmission time and date (UTC) of the issued warning. |
| `start` | *(time)* Starting time and date (UTC) of the issued warning. Can be empty. |
| `expires` | *(time)* Expiration time and date (UTC) of the issued warning. Can be empty. |

## Data updates

集成每 5 分钟检查一次警告。

## Known limitations

此集成可能仅适用于支持 IPv4 的 Internet 连接。

## Removing the integration

此集成遵循标准集成删除。不需要额外的步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
