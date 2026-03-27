---
title: Ridwell
description: 'Ridwell 集成允许用户跟踪通过 Ridwell(https://www.ridwell.com) 安排的回收取件。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_release: 2021.12
ha_iot_class: Cloud Polling
ha_domain: ridwell
ha_codeowners:
  - '@bachya'
ha_config_flow: true
ha_platforms:
  - calendar
  - diagnostics
  - sensor
  - switch
ha_integration_type: service
---
# Ridwell

**Ridwell** 集成允许用户跟踪通过 [Ridwell](https://www.ridwell.com) 安排的回收取件。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Options

To define options for Ridwell, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Ridwell are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

### 事件摘要详情

日历事件摘要可以自定义，以显示某次取件的不同详情。

以下选项可用于自定义显示文本。每个选项也会在下方单独说明。

```yaml
Pickup status:
    description: 当天该次取件的当前状态 _（默认选项）_
Rotating category:
    description: 该次取件所选轮换类别的名称
No details:
    description: 事件标题后不显示任何文本
```

#### Pickup status

单次取件的常见状态包括：
- `initialized`: 可供客户选择加入取件
- `scheduled`: 已选择加入；Ridwell 会在当天的路线中包含您
- `notified`: Ridwell 已尝试联系尚未加入即将发生取件的客户
- `skipped`: 之前已安排，但后来取消了该次取件

#### Rotating category

取件成功安排后，将显示轮换类别。

如果取件未处于 `scheduled` 状态，则在其变为 `scheduled` 之前，日历事件会显示 [Pickup status](#pickup-status) 中描述的 **Pickup status** 值。

#### No details

日历标题将仅显示 “Ridwell Pickup”，但各种取件类型的完整详情仍会包含在事件描述中。

:::note
更改此选项后，Ridwell 集成会重新加载。

您可能会注意到 Ridwell 日历短暂消失，随后以新的事件格式重新出现。

:::
## 日历

日历传感器包含一个 `calendar` 状态属性，其中包括：

- Ridwell 日历的名称。
- 事件是否为全天事件（布尔值）。
- 日历事件的开始时间，从午夜开始。
- 事件的结束时间，到午夜结束。
- 事件的位置。
- 取件物品的描述。
- 日历事件的友好名称。

例如：

```yaml
message: Ridwell Pickup (scheduled)
all_day: true
start_time: 2024-07-26 00:00:00
end_time: 2024-07-27 00:00:00
location: 
description: Pickup types: Light Bulbs (quantity: 1), Hand Tools (quantity: 1), Batteries (quantity: 1), Threads (quantity: 1), Plastic Film (quantity: 1)
friendly_name: Ridwell
```

## 取件类型

取件传感器包含一个 `pickup_types` 状态属性，其中包括：

- 本次事件中要取走的物品
- 每件物品所属的类别
- 每件物品的数量

例如：

```json
{
  "Latex Paint": {
    "category": "add_on",
    "quantity": 7
  },
  "Beyond the Bin": {
    "category": "add_on",
    "quantity": 2
  },
  "Fluorescent Light Tubes": {
    "category": "add_on",
    "quantity": 1
  },
  "Winter Coats and Jackets": {
    "category": "rotating",
    "quantity": 1
  },
  "Light Bulbs": {
    "category": "standard",
    "quantity": 1
  },
  "Batteries": {
    "category": "standard",
    "quantity": 1
  },
  "Threads": {
    "category": "standard",
    "quantity": 1
  },
  "Plastic Film": {
    "category": "standard",
    "quantity": 1
  }
}
```

## 故障排除

:::tip
Ridwell 集成大约每小时从您的 Ridwell 账户检查一次更新信息。

**取件变更最多可能需要 60 分钟才会显示在 Home Assistant 中。**

:::
如果 Home Assistant 中的取件信息与您 Ridwell 账户中的最新变更不一致，您可以通过重新加载 Ridwell 集成来手动触发详情检查。在集成概览页面中，打开要刷新的账户实例的选项菜单并选择 **Reload**。

## 删除集成

此集成遵循标准删除流程。

:::note
从 Home Assistant 中移除此集成不会终止或影响您的付费订阅。

:::
由此集成安排或修改的任何取件在删除集成后仍会保留，您仍可通过 Ridwell 网站或应用继续管理它们。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
