---
title: Tibber
description: '如果你是 Tibber(https://tibber.com/) 客户，Tibber 集成会提供一个显示当前电价的传感器。 如果你有 Tibber Pulse(https://tibber.com/no/store/produkt/pulse) 或 Watty(https://tibber.com/se/st。'
ha_category:
  - Binary sensor
  - Energy
  - Notifications
  - Sensor
ha_release: 0.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: tibber
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - notify
  - sensor
ha_integration_type: hub
---
# Tibber

如果你是 [Tibber](https://tibber.com/) 客户，**Tibber** 集成会提供一个显示当前电价的传感器。
如果你有 [Tibber Pulse](https://tibber.com/no/store/produkt/pulse) 或 [Watty](https://tibber.com/se/store/produkt/watty-smart-energimatare)，还会显示实时用电量。你还会获得月度用电量、月度费用和月度峰值小时的传感器。如果你有实时电表，数据每小时更新一次，否则每天更新一次。系统会生成每小时用电量和费用的统计信息，可在[能源仪表板](/home-assistant/docs/energy/)中使用（ID 为 `tibber:energy_consumption_HOMEID` 和 `tibber:energy_totalcost_HOMEID`）。如果你会发电，还会生成每小时发电量和收益的统计信息，也可在该仪表板中使用（ID 为 `tibber:energy_production_HOMEID` 和 `tibber:energy_profit_HOMEID`）。

Home Assistant 目前支持以下设备类型：

- [Binary sensor](#binary-sensor)
- [Notifications](#notifications)
- [Sensor](#sensor)

## 设置

前往 [developer.tibber.com/settings/accesstoken](https://developer.tibber.com/settings/accesstoken) 获取你的 API 令牌。


## Client ID 和 client secret（Tibber Data API）

1. 前往 Tibber 开发者门户 https://data-api.tibber.com/clients/manage。
2. 创建一个新的客户端。
3. 为 Home Assistant 添加重定向 URI：
   - `https://my.home-assistant.io/redirect/oauth`

4. 保存应用。
5. 复制 **client ID** 和 **client secret**。
6. 前往 [**Settings** > **Devices & services** > **Application credentials**](https://my.home-assistant.io/redirect/application_credentials/)，添加 Tibber 凭据，并粘贴你的 client ID 和 client secret。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 通知

Tibber 可通过调用 [`notify.send_message` 操作](/home-assistant/integrations/notify/)来发送通知。它会向 Tibber 账户中注册的所有设备发送通知。

要使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

### 发送消息

```yaml
actions:
  - action: notify.send_message
    data:
      entity_id: notify.tibber
      title: "Your title"
      message: "This is a message for you!"
```

## 传感器

如果你是 [Tibber](https://tibber.com/) 客户，`tibber` 传感器会提供当前电价。
你还会获得月度用电量、月度费用和月度峰值小时的传感器。
如果你有 Tibber Pulse，它还会显示实时用电量。

## 可用传感器

- 自午夜起累计费用（需要有效的 Tibber 电力套餐）
- 自午夜起消耗的千瓦时
- 自午夜起净发电量（千瓦时）
- 自上一个整点切换以来的净发电量（千瓦时）
- L1、L2 和 L3 上的电流
- 当前小时用电量估算（千瓦时）
- 自上一个整点切换以来消耗的千瓦时
- 自午夜起的平均功耗（瓦）
- 最近一次电表有功输入寄存器状态（千瓦时）
- 最近一次电表有功输出寄存器状态（千瓦时）
- 自午夜起峰值功耗（瓦）
- 自午夜起最低功耗（瓦）
- 当前用电功耗（瓦）
- 当前用电功耗（瓦）
- 当前净发电量（A-，瓦）
- 总电价（能源费 + 税费）
- 设备信号强度（Pulse 为 dB；Watty 为百分比）
- 第 1、2、3 相电压
- 月度费用
- 月度净用电量
- 月度峰值小时
- 最大每小时用电量发生时间
- 储能荷电状态
- 储能目标荷电状态
- 剩余续航里程
- 最大充电电流
- 离线回退充电电流

## 二进制传感器

Tibber 集成提供二进制传感器。

## 可用二进制传感器


### 充电器传感器

- Charging：表示充电器当前是否正在为车辆充电。
- Plug：表示是否有车辆已连接到充电器。

### 电动车传感器

- Charging：表示电动车当前是否正在充电。
- Plug：表示电动车当前是否已连接。

### 加热设备

- Power：表示智能插座或温控器当前是否处于通电状态。

## 操作

每小时电价通过[操作](/home-assistant/docs/scripts/perform-actions/)暴露。这些操作会用价格数据填充[响应数据](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data)。

### 操作：Get prices

`tibber.get_prices` 操作用于获取每小时能源价格。

| Data attribute | Optional | Description                                           | Example             |
| -------------- | -------- | ----------------------------------------------------- | ------------------- |
| `start`        | yes      | 获取价格的开始时间。默认为今天 00:00:00              | 2024-01-01 00:00:00 |
| `end`          | yes      | 获取价格的结束时间。默认为明天 00:00:00              | 2024-01-01 00:00:00 |

#### 响应数据

响应数据是一个字典，包含每个 Home 的能源价格。`start_time` 由 API 以本地时间返回。

```json
{
  "prices": {
    "Nickname_Home":[
      {
        "start_time": "2023-12-09 03:00:00+02:00",
        "price": 0.46914,
      },
      {
        "start_time": "2023-12-09 04:00:00+02:00",
        "price": 0.46914,
      }
    ],
    "Nickname_Home_2":[
      {
        "start_time": "2023-12-09 03:00:00+02:00",
        "price": 0.46914,
      },
      {
        "start_time": "2023-12-09 04:00:00+02:00",
        "price": 0.46914,
      }
    ]
  }
}
```

## 示例

本节提供一些在实际场景中使用此传感器的示例。

### 电价

你可以基于电价创建自动化。该传感器带有 `max_price` 和 `min_price` 属性，分别表示当天的最高价和最低价。以下示例会在价格高于当天最高价的 90% 时发送通知：


```yaml
- alias: "Electricity price"
  triggers:
    - trigger: time_pattern
      # Matches every hour at 1 minutes past whole
      minutes: 1
  conditions:
    - condition: template
      value_template: '{{ float(states('sensor.electricity_price_hamretunet_10')) > 0.9 * float(state_attr('sensor.electricity_price_hamretunet_10', 'max_price')) }}'
  actions:
   - action: notify.pushbullet
     data:
       title: "Electricity price"
       target: "device/daniel_telefon_cat"
       message: "The electricity price is now {{ states('sensor.electricity_price_hamretunet_10') }}"
```


