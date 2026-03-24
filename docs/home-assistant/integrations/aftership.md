---
title: AfterShip
description: 关于在 Home Assistant 中设置 AfterShip 传感器的说明。
ha_category:
  - Postal service
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_domain: aftership
ha_platforms:
  - sensor
ha_integration_type: service
ha_config_flow: true
---

**AfterShip** 集成允许通过 [AfterShip](https://www.aftership.com) 跟踪包裹，该服务支持全球 490 多家承运商。使用跟踪 API 功能需要 Pro 计划。

传感器状态值显示未处于 `已送达` 状态的包裹数量。属性会显示各状态对应的包裹数量。

## 设置

要使用此传感器，您需要 [AfterShip 账户](https://accounts.aftership.com/register)并设置 API 密钥。要设置 API 密钥，请前往 [AfterShip API](https://admin.aftership.com/settings/api-keys) 页面，复制现有密钥或生成新密钥。

:::important
AfterShip 已从永久免费计划中移除跟踪 API 功能，并且不再在 Essentials 计划中提供。现在使用此集成至少需要 [Pro](https://www.aftership.com/pricing/tracking) 计划。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 动作 `add_tracking`

您可以使用 `aftership.add_tracking` 动作向 AfterShip 添加跟踪。

| 数据属性 | 必需 | 类型 | 描述 |
| ---------------------- | -------- | -------- | ----------- |
| `tracking_number` | `True` | string | 快递单号 |
| `slug` | `False` | string | 快递公司，例如 `fedex` |
| `title` | `False` | string | 包裹的显示名称 |

## 动作 `remove_tracking`

您可以使用 `aftership.remove_tracking` 动作从 AfterShip 移除跟踪。

| 数据属性 | 必需 | 类型 | 描述 |
| ---------------------- | -------- | -------- | ----------- |
| `tracking_number` | `True` | string | 快递单号 |
| `slug` | `True` | string | 快递公司，例如 `fedex` |

:::note
此集成从 AfterShip 公共 REST API 检索数据，但该集成与 AfterShip 无关联。

:::
