---
title: easyEnergy
description: 'easyEnergy 集成可将 easyEnergy(https://www.easyenergy.com) API 平台接入 Home Assistant。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Energy
  - Sensor
ha_release: 2023.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: easyenergy
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---
# easyEnergy

**easyEnergy** 集成可将 [easyEnergy](https://www.easyenergy.com) API 平台接入 Home Assistant。

该集成可从 easyEnergy 获取动态电价和燃气价格，帮助您了解当天的价格走势，并据此调整能源使用方式。

使用 easyEnergy 数据的公司：

- [NieuweStroom](https://nieuwestroom.nl)

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 使用场景

在 [能源仪表板](/home-assistant/energy) 中，您可以使用 `current hour` 价格实体，根据 easyEnergy 的价格来计算每小时的用电或用气成本。您也可以将某个动作与[模板传感器](#prices-sensor-with-response-data)结合，在仪表板图表中显示未来 24 小时的价格。

## 数据更新

该集成每 10 分钟轮询一次 easyEnergy API，以更新 Home Assistant 中的数据。

## 已知限制

通过 API 获取的价格是包含增值税的基础价格，但能源公司通常还会收取其他费用，例如**能源税**和**采购成本**。该集成没有提供将这些费用直接加入价格的配置选项，不过您可以为此创建一个[模板传感器](#all-in-price-sensor)。

## 传感器

easyEnergy 集成会为燃气价格和电价创建多个传感器实体。

### 电力市场价格

在电力方面，您会看到两个独立服务。easyEnergy 对您使用（购入）的电力和回馈（售出）的电力采用不同价格。每天大约在 **14:00 UTC**，会发布次日的新价格。

- `current` 和 `next hour` 电力市场价格
- 当日平均电价
- 最低电价
- 最高电价
- 价格最高的时间点
- 价格最低的时间点
- 当前价格相对于最高价的百分比
- 高于或低于当前价格的小时数

带有小时数的实体用于显示，一天中有多少小时的价格**高于**或**低于**当前小时价格。以下图为例，如果当前时间是 00:30，那么有 8 个小时的价格低于当前价格，4 个小时的价格高于当前价格。借助这些信息，您可以让设备在一天中最便宜的若干小时内运行。

<p class='img'>
  <img src='/home-assistant/images/integrations/easyenergy/pricegraph.png' alt='Screenshot showing energy price graph.'>
  电价图示例。
</p>

### 燃气市场价格

对于动态燃气价格，只会创建显示 `current` 和 `next hour` 价格的实体，因为燃气价格始终会固定 24 小时；新价格会在每天早上 **05:00 UTC** 发布。

## 动作

电价和燃气价格通过[动作](/home-assistant/docs/scripts/perform-actions/)提供。这些动作会将价格数据填充到[响应数据](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data)中。

### 动作：获取燃气价格

`easyenergy.get_gas_prices` 动作可让您获取燃气的每小时价格。

| 数据属性 | 可选 | 说明 | 示例 |
| -------- | ---- | ---- | ---- |
| `config_entry` | 否 | 要使用的配置条目 ID | 013713c172577bada2874a32dbe44feb |
| `incl_vat` | 否 | 定义价格是否包含增值税 | False |
| `start` | 是 | 获取价格的开始时间。默认为当天 00:00:00 | 2023-01-01 00:00:00 |
| `end` | 是 | 获取价格的结束时间。默认为当天 00:00:00 | 2023-01-01 00:00:00 |

:::tip
您可以在[开发者工具](/home-assistant/docs/tools/dev-tools/)中通过动作获取 `config_entry`：使用任一 easyEnergy 动作，然后查看 YAML。

:::
#### 响应数据

响应数据是一个字典，其中包含以字符串和浮点数形式表示的燃气时间戳与价格。

```json
{
  "prices": [
    {
      "timestamp": "2023-12-09 03:00:00+00:00",
      "price": 0.46914
    },
    {
      "timestamp": "2023-12-09 04:00:00+00:00",
      "price": 0.46914
    }
  ]
}
```

### 动作：获取用电价格

`easyenergy.get_energy_usage_prices` 动作可让您获取您使用（购入）电力的每小时价格。

| 数据属性 | 可选 | 说明 | 示例 |
| -------- | ---- | ---- | ---- |
| `config_entry` | 否 | 要使用的配置条目 ID | 013713c172577bada2874a32dbe44feb |
| `incl_vat` | 否 | 定义价格是否包含增值税 | False |
| `start` | 是 | 获取价格的开始时间。默认为当天 00:00:00 | 2023-01-01 00:00:00 |
| `end` | 是 | 获取价格的结束时间。默认为当天 00:00:00 | 2023-01-01 00:00:00 |

:::tip
您可以在[开发者工具](/home-assistant/docs/tools/dev-tools/)中通过动作获取 `config_entry`：使用任一 easyEnergy 动作，然后查看 YAML。

:::
#### 响应数据

响应数据是一个字典，其中包含以字符串和浮点数形式表示的电力时间戳与价格。

```json
{
  "prices": [
    {
      "timestamp": "2023-12-09 03:00:00+00:00",
      "price": 0.08418
    },
    {
      "timestamp": "2023-12-09 04:00:00+00:00",
      "price": 0.08758
    }
  ]
}
```

### 动作：获取回馈电价

`easyenergy.get_energy_return_prices` 动作可让您获取您回馈（售出）电力的每小时价格。

| 数据属性 | 可选 | 说明 | 示例 |
| -------- | ---- | ---- | ---- |
| `config_entry` | 否 | 要使用的配置条目 ID | 013713c172577bada2874a32dbe44feb |
| `start` | 是 | 获取价格的开始时间。默认为当天 00:00:00 | 2023-01-01 00:00:00 |
| `end` | 是 | 获取价格的结束时间。默认为当天 00:00:00 | 2023-01-01 00:00:00 |

:::tip
您可以在[开发者工具](/home-assistant/docs/tools/dev-tools/)中通过动作获取 `config_entry`：使用任一 easyEnergy 动作，然后查看 YAML。

:::
#### 响应数据

响应数据是一个字典，其中包含以字符串和浮点数形式表示的电力时间戳与价格。

```json
{
  "prices": [
    {
      "timestamp": "2023-12-09 03:00:00+00:00",
      "price": 0.06957
    },
    {
      "timestamp": "2023-12-09 04:00:00+00:00",
      "price": 0.07238
    }
  ]
}
```

## 模板

您可以创建模板传感器，在图表中显示价格，或计算包含所有费用的每小时价格。

### 使用响应数据的价格传感器

要使用动作返回的响应数据，您可以创建一个每小时更新一次的模板传感器。


```yaml
template:
  - triggers:
      - trigger: time_pattern
        seconds: "*"
    actions:
      - action: easyenergy.get_energy_usage_prices
        response_variable: prices
        data:
          config_entry: 013713c172577bada2874a32dbe44feb
          incl_vat: true
    sensor:
      - name: Energy prices
        device_class: timestamp
        state: "{{ now() }}"
        attributes:
          prices: "{{ prices }}"
```


### 含全部费用的价格传感器

要计算包含全部费用的每小时价格，您可以创建一个模板传感器，根据当前价格、能源税和采购成本进行计算。


```yaml
template:
  - sensor:
      - name: easyEnergy all-in current price
        unique_id: allin_current_price
        icon: mdi:cash
        unit_of_measurement: "€/kWh"
        state_class: measurement
        state: >
          {% set energy_tax = PUT_HERE_THE_PRICE %}
          {% set purch_costs = PUT_HERE_THE_PRICE %}
          {% set current_price = states('sensor.easyenergy_today_energy_usage_current_hour_price') | float(0) %}
          {{ (current_price + energy_tax + purch_costs) | round(2) }}
```


## 移除集成

该集成遵循标准的集成移除步骤。如果您还使用了模板传感器，则需要手动将其删除。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
