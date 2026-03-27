---
title: Picnic
description: 'Picnic integration 允许从 Picnic(https://picnic.app) 获取有关订单、配送和购物车内容的信息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Other
ha_release: 2021.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@corneyl'
  - '@codesalatdev'
ha_domain: picnic
ha_platforms:
  - sensor
  - todo
ha_integration_type: service
---
# Picnic

**Picnic** integration 允许从 [Picnic](https://picnic.app) 获取有关订单、配送和购物车内容的信息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

此集成提供以下传感器。添加集成时，某些传感器默认禁用。

| 名称                           | 描述                                                                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cart items count               | 当前购物车中不同产品的数量。                                                                                             |
| Cart total price               | 当前购物车中产品的总价。                                                                                                 |
| Selected slot start            | 所选配送时段的开始时间，如果未选择则为 `unknown`。                                                                             |
| Selected slot end              | 所选配送时段的结束时间，如果未选择则为 `unknown`。                                                                               |
| Selected slot max order time   | 所选配送时段仍可下单的最长时间，如果未选择则为 `unknown`。                               |
| Selected slot min order value  | 所选配送时段所需的最小订单金额，如果未选择则为 `unknown`。               |
| Last order slot start          | 最近下单的配送时段开始时间                                                                                                      |
| Last order slot end            | 最近下单的配送时段结束时间                                                                                                        |
| Last order status              | 最近订单的状态，可能是 `CURRENT`、`CANCELLED` 或 `COMPLETED`。只有在发送发票邮件后才会转换为 `COMPLETED`。  |
| Last order max order time      | 最近订单仍可添加产品的最长时间。 |
| Last order delivery time       | 最近订单的配送时间，如果尚未配送则为 `unavailable`。 |
| Last order total price         | 最近订单的总价。 |
| Next delivery ETA start        | 下次配送的预计到达时间窗口开始时间，如果司机已出发会更精确。 |
| Next delivery ETA end          | 下次配送的预计到达时间窗口结束时间。 |
| Next delivery slot start       | 下次配送的配送时段开始时间。 |
| Next delivery slot end         | 下次配送的配送时段结束时间。 |


 ## 购物车

此集成提供一个包含购物车内容的列表。此列表作为[待办事项列表](/home-assistant/integrations/todo/)提供，也可以在 Home Assistant 实例主侧边栏的待办事项列表仪表板中找到。

您可以通过在 **Add item** 字段中输入名称将产品添加到购物车。就像 [`picnic.add_product`](#action-picnicadd_product) 动作一样，将进行搜索并添加找到的第一个项目。

## 动作

### 动作 `picnic.add_product`

使用 `picnic.add_product` 动作将产品添加到购物车，可以使用产品 ID 或产品名称。
当使用产品名称添加产品时，将进行搜索，第一个结果将被添加到购物车。
当找不到产品，或未指定 `product_id` 或 `product_name` 时，动作将失败。

| 数据属性 | 可选 | 描述                                                                      |
|------------------------|----------|----------------------------------------------------------------------------------|
| `config_entry_id`      | 否       | Picnic 服务配置条目的 ID。                                       |
| `product_id`           | 是       | Picnic 产品 ID。                                                           |
| `product_name`         | 是       | 要搜索的产品名称，第一个搜索结果将被添加到购物车。 |
| `amount`               | 是       | 要添加的数量，默认为 1。                                                |

```yaml
# Example automation action to add a product to the cart by name.
- action: picnic.add_product
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    product_name: "Picnic cola zero"
```