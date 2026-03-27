---
title: Viessmann ViCare
description: 'Viessmann ViCare 集成允许您通过 Viessmann ViCare（REST）API 控制 Viessmann(https://www.viessmann-climatesolutions.com) 设备。 大多数较新的联网 Viessmann 供暖设备（如燃气锅炉）都应受到支持。'
ha_category:
  - Climate
  - Fan
  - Water heater
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: vicare
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - fan
  - number
  - sensor
  - water_heater
ha_dhcp: true
ha_integration_type: hub
ha_codeowners:
  - '@CFenner'
---
# Viessmann ViCare

**Viessmann ViCare** 集成允许您通过 Viessmann ViCare（REST）API 控制 [Viessmann](https://www.viessmann-climatesolutions.com) 设备。
大多数较新的联网 Viessmann 供暖设备（如燃气锅炉）都应受到支持。

## 前提条件

您需要使用**现有的 ViCare 应用用户凭据**登录 [Viessmann 开发者门户](https://app.developer.viessmann-climatesolutions.com)。

在开发者控制台的 **Clients** 部分选择 **Add**，并使用以下设置创建新的 API 客户端：
   - Name: `HomeAssistant`
   - Google reCAPTCHA: `disabled`
   - Redirect URIs: `vicare://oauth-callback/everest`

复制开发者控制台 **Clients** 部分中的 **Client ID**，以便在 Home Assistant 中设置时使用。

:::important
您必须在安装了 ViCare 应用的设备（手机）上设置此集成。否则，设备不知道如何处理 `vicare://` 重定向 URL，您将收到 **Invalid credentials** 通知，并且设置流程会失败。

:::
:::note
新的客户端可能需要最多 1 小时才能激活并可用。否则，您将在 Home Assistant 中看不到任何设备。

:::
### API 限制

Viessmann API 有调用频率限制。在其 “Basic” （免费）套餐中，如果您超过以下任一限制，将会被封锁 24 小时：

- 120 calls for a time window of 10 minutes
- 1450 calls for a time window of 24 hours

在付费 API 套餐中，此限制会提高到 24 小时内 3000 次调用。该集成每 60 秒轮询一次 API，并会在这些限制范围内运行。不过，任何额外的 API 请求，比如通过集成设置温度或在 ViCare 应用中操作，也会计入这些限制。

:::important
除最高级的 “Advanced” 套餐外，Viessmann 对终端用户可访问的 API 范围设置了若干限制。不幸的是，这也会影响对智能家居集成有用的 API，例如控制恒温阀（TRV）和气候传感器的 API，这些仅在 “Advanced” 套餐中可用。如果您使用较低级别的套餐设置此集成，那么 TRV 和其他智能家居实体将无法在 Home Assistant 中使用。

如果您认为这对自己的使用场景构成限制，请考虑按照[其 FAQ](https://developer.viessmann-climatesolutions.com/start/faq.html) 中 “Where can I give feedback on the API?” 的说明向 Viessmann 提供反馈。

:::
:::note
如果您在 Home Assistant 中有多个 Viessmann 设备，它们会共享该限制，这意味着轮询间隔会变长，数值更新也会变得不那么频繁。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 实体

ViCare 将设备表示为一组[数据点](https://api.viessmann-climatesolutions.com/documentation/data-points)，而 ViCare 集成会将其映射为 Home Assistant 中不同 platforms 的 entities。单个设备可能会由一个或多个平台共同表示。

### Climate

表示设备的供暖控制功能。

:::note
带有室温感应功能的 Viessmann 设备会通过 `current_temperature` 显示当前室温。其他设备则会显示供暖回路的当前供水温度。

:::
### Fan

通风设备会显示为风扇实体，并支持调速和预设模式。

### Water heater

表示设备的生活热水控制功能。

:::note
无法通过 water heater 集成开启或关闭热水加热，因为这会与供暖集成的运行模式发生冲突。因此，该集成中的运行模式仅作为属性提供，无法修改。

:::
### Sensor

设备的附加数据会以独立传感器的形式提供。系统会根据可用的 API 数据点自动发现这些传感器。

### Button

按钮实体可用于触发操作，例如热水器的一次性加热。

### Number

数值实体可用于调整不同供暖程序的预设温度，或供暖曲线的偏移和斜率等数值。

## 操作

ViCare 集成提供以下 [climate 集成](/home-assistant/integrations/climate/)操作：`set_temperature`、`set_hvac_mode`、`set_preset_mode`

ViCare 集成提供以下 [water_heater 集成](/home-assistant/integrations/water_heater/)操作：`set_temperature`

### 操作：设置 ViCare 模式

`vicare.set_vicare_mode` 操作用于设置 Viessmann 定义的气候设备模式（Home Assistant Climate 模式与其映射关系请参阅 [set_hvac_mode](#action-climateset_hvac_mode)）。这样可以更细粒度地控制供暖模式。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的 climate 设备 `entity_id` 的字符串或字符串列表。若要以所有实体为目标，请使用 `all` 关键字，而不是 `entity_id`。 |
| `vicare_mode` | no | ViCare 模式的新值。支持的取值请参阅 climate 实体的 `vicare_modes` 属性。 |

### 操作：设置温度

`climate.set_temperature` 操作用于将目标温度设置为指定值。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的 climate 设备 `entity_id` 的字符串或字符串列表。若要以所有实体为目标，请使用 `all` 关键字，而不是 `entity_id`。 |
| `temperature` | no | 目标温度。 |

请注意，`set_temperature` 始终会影响当前的常规温度；如果已设置预设模式，则会影响该预设模式下的温度（也就是 Viessmann 的 eco 或 comfort 等程序）。

### 操作：设置 HVAC 模式

`climate.set_hvac_mode` 操作用于设置气候设备的 HVAC 模式。支持以下模式：

ViCare 集成中，HVAC 模式与 Viessmann 运行模式的映射关系如下：

| HVAC mode | Viessmann mode | Description |
| ---------------------- | -------- | ----------- |
| `off` | `ForcedReduced` | 永久将供暖设为低温模式。注意：这也会停用生活热水。 |
| `heat` | `ForcedNormal` | 永久将供暖设为正常温度。 |
| `auto` | `DHWandHeating` | 按照设备中设定的供暖日程，在低温和正常温度之间切换。 |
 
| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的 climate 设备 `entity_id` 的字符串或字符串列表。若要以所有实体为目标，请使用 `all` 关键字，而不是 `entity_id`。 |
| `hvac_mode` | no | HVAC 模式的新值。 |

### 操作：设置预设模式

`climate.set_preset_mode` 操作用于设置预设模式。支持的预设模式为 *eco* 和 *comfort*。它们与对应的 Viessmann 程序一致，并且只会临时生效 8 小时。
Eco 模式会将目标温度降低 3°C，而 Comfort 模式会将目标温度设置为一个可配置的值。更多信息请参阅供暖设备说明书。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的 climate 设备 `entity_id` 的字符串或字符串列表。若要以所有实体为目标，请使用 `all` 关键字，而不是 `entity_id`。 |
| `preset_mode` | no | 预设模式的新值。 |

### 操作：设置热水器温度

`water_heater.set_temperature` 操作用于将生活热水的目标温度设置为指定值。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的 climate 设备 `entity_id` 的字符串或字符串列表。 |
| `temperature` | no | 热水器的新目标温度。 |

## 故障排除

### 密码中的 UTF-8 字符

底层的 PyViCare Python 库无法处理密码中的 UTF-8 字符，因此请不要在密码中使用 `ü`、`ø` 等字符。

### GATEWAY_OFFLINE

ViCare API 有时会与网关失去连接。Home Assistant 日志中会记录如下内容：

```log
Invalid data from Vicare server: {
  'viErrorId': '...',
  'statusCode': 400,
  'errorType': 'DEVICE_COMMUNICATION_ERROR',
  'message': '',
  'extendedPayload': {
    'httpStatusCode': 'NotFound',
    'code': '404',
    'reason': 'GATEWAY_OFFLINE'
  }
}
```

通常该问题会在一段时间后自行恢复，但如果这种状态持续存在，请尝试重新断电并启动网关。

## 移除集成

此集成遵循标准的集成移除流程。移除集成后，您还可以前往 [Viessmann 开发者门户](https://app.developer.viessmann-climatesolutions.com)，删除为 Home Assistant 创建的 API 客户端（前提是它仅用于此集成）。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
