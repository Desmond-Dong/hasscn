---
title: Amber Electric
description: 'Amber(https://www.amber.com.au/) 是一家澳大利亚电力零售商，提供批发电力价格的访问权限。客户可以监控批发价格，并将能源使用转移到更便宜、更绿色的时段。这样可以节省费用，并支持澳大利亚向更多可再生能源的转变。客户还可以以波动的价格出售未使用的电力。'
ha_category:
  - Energy
  - Sensor
ha_release: '2021.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@madpilot'
ha_domain: amberelectric
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: service
---
# Amber Electric

[Amber](https://www.amber.com.au/) 是一家澳大利亚电力零售商，提供批发电力价格的访问权限。客户可以监控批发价格，并将能源使用转移到更便宜、更绿色的时段。这样可以节省费用，并支持澳大利亚向更多可再生能源的转变。客户还可以以波动的价格出售未使用的电力。这与其他批发供应商不同，后者的售电价格会根据电网需求而变化。

使用 **Amber Electric** 集成，客户可以更进一步 —— 根据实时电力价格和预测，设置设备自动将能源使用转移到更便宜、更绿色的时段。

## 获取 API 密钥

要使用此集成，您需要生成一个 API 密钥。

1. 登录您的 Amber 账户：<https://app.amber.com.au>
2. 点击 _Settings_
3. 启用 _Developer Mode_
4. 点击 _Generate API Key_
5. 为您的 API 密钥取一个易记的名称（例如：Home Assistant）
6. 复制生成的代码。注意：刷新页面后它将消失，请务必记录下来！


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 集成工作原理

价格分为三种通道类型：

- **General（通用）** - 记录您所有灯光和电器用电的通道
- **Controlled Load（受控负载）** - 仅在非高峰时段启用的特殊通道。通常电热水器连接到受控负载通道。
- **Feed In（馈入）** - 记录从太阳能电池板和电池输出电力的通道。

它为每种通道类型提供以下传感器：

- **Price（价格）** - 您当前的电力价格，单位为 $/kWh
- **Forecast（预测）** - 未来 12 小时的预测价格
- **Descriptor（描述符）** - 价格的描述。如果您想创建一个与应用匹配的 Amber 灯光，这很有用。可能值：`extremely_low`、`very_low`、`low`、`neutral`、`high` 和 `spike`。

还有两个额外的传感器：

- **Price Spike（价格尖峰）** - 一个二值传感器，指示当前价格是否超过 $3/kWh。
- **Renewables（可再生能源）** - 电网中当前可再生能源的百分比。

## 动作

### 动作：获取预测

`amberelectric.get_forecasts` 动作允许您获取请求的通道类型的预测数组。

| Data attribute    | Optional | Description                                                           |
| ----------------- | -------- | --------------------------------------------------------------------- |
| `config_entry_id` | Yes      | The config entry of the site to get forecasts for.                    |
| `channel_type`    | Yes      | The channel type to fetch. Options: general, controller_load, feed_in |