---
title: Withings
description: 关于如何在 Home Assistant 中集成 Withings 健康产品的说明。
ha_category:
  - Health
  - Sensor
ha_release: 0.99
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: withings
ha_platforms:
  - binary_sensor
  - calendar
  - diagnostics
  - sensor
ha_integration_type: hub
ha_dhcp: true
---

**Withings** 集成会读取由 [Withings](https://www.withings.com) 生产的各类健康设备数据。

## 前提条件

- Withings 账户
- 已安装 Withings 应用
- 已在应用中设置好 Withings 设备
- [Withings developer account](#creating-a-withings-developer-account)，用于获取 *ClientID* 和 *Secret*，以便连接并从 Withings 云 API 获取数据

### 创建 Withings 开发者账户

您必须拥有开发者账户才能分发这些数据。

:::note
您只需要一个开发者账户。同一个账户和凭据可用于每个 Withings 配置。

:::
1. [Create a free developer account](https://account.withings.com/partner/add_oauth2).
2. Make sure to select **Withings public cloud** (and not Withings US medical cloud or similar).
3. Select **Create an application**.
4. Under **Application creation**, select **Public API integration**.
   - Read and accept the terms and select **Next**.
5. Under **Information**:
   - **Target environment**: *Development*
   - **Application name**: [any name]
   - **Application description**: [any description]
   - **Registered URLs**: `https://my.home-assistant.io/redirect/oauth`
     - Do not test this URL. It won't work at this stage. It will be setup once you install the integration in Home Assistant.
   - **Change logo**: Optional
6. **Save** your changes.
   - Once saved, the *ClientID* and *Secret* fields will be populated.
- 将它们复制并保存在安全的位置。下一步会用到。

<details>
<summary>已手动禁用 My Home Assistant</summary>


If you don't have [My Home Assistant](/home-assistant/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Withings will validate (with HTTP HEAD) these requirements each time you save your Withings developer account. When these checks fail, the Withings UI is not always clear about why.

- Home Assistant (For create/update of Withings developer account):
  - Publicly accessible.
  - Running on a fully qualified domain name.
  - Running over HTTPS signed by a globally recognized Certificate Authority. Let's Encrypt will work.


</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 数据更新

此集成会自动检测您是否可以使用 webhook。这样它就只会在有新数据时更新。
睡眠二进制传感器仅在此集成能够与 Withings 建立 webhook 时才可用。

### Webhook 要求

要使 webhook 正常工作，Withings 云服务必须能够访问您的 Home Assistant 实例。必须满足以下要求：

- **可从公网访问** - 您的 Home Assistant 实例必须能够从互联网访问
- **443 端口上的 HTTPS** - Withings 要求必须使用 443 端口上的 HTTPS。使用非标准端口（如 8443）的 HTTPS 无法工作
- **有效的 SSL 证书** - 证书必须由全球认可的证书颁发机构签发（例如 Let's Encrypt）。自签名证书无法使用

:::important
如果无法建立 webhook，某些传感器将不可用。特别是睡眠二进制传感器没有轮询回退机制，必须依赖可用的 webhook 才能工作。

:::
## 可用数据

此集成提供多个实体，其中一部分会在有相应数据时动态启用。

For example, measurement sensors like weight only work when data has been registered in the last 14 days. So if you start using a new device, for example, to measure your temperature or you manually update a value in the app, the sensor automatically appears.

Sleep sensors are only created if the integration can find sleep data for you within the last day.

Workout calendar and the workout and activity sensors show if the latest available data point is no older than 14 days.

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### 从 Home Assistant 中移除集成实例

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
