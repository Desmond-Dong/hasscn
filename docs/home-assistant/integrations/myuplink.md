---
title: myUplink
description: 'myUplink 集成允许您通过官方云 API(https://dev.myuplink.com) 获取支持 myUplink 的热泵设备信息并对其进行控制。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_iot_class: Cloud Polling
ha_release: '2024.2'
ha_domain: myuplink
ha_codeowners:
  - '@pajzo'
  - '@astrandb'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: hub
related:
  - url: https://myuplink.com/
    title: myUplink web portal
ha_quality_scale: silver
---
# myUplink

**myUplink** 集成允许您通过[官方云 API](https://dev.myuplink.com) 获取支持 myUplink 的热泵设备信息并对其进行控制。

该集成会连接到您的账户，并从 API 下载所有可用数据。下载的信息将用于在 Home Assistant 中创建设备和实体。根据设备类型不同，生成的实体数量可能从几个到数百个不等。此集成会尽力将 API 中的数据点映射为传感器、开关、数字和选择实体。

:::note
您可能需要拥有有效的 myUplink 订阅，才能通过开关、选择和数字实体控制设备。

:::
## 前提条件

1. 访问 [https://myuplink.com/register](https://myuplink.com/register) 并注册用户账户。
2. 前往 [**Applications**](https://dev.myuplink.com/apps)，注册一个新的应用：

- **Application Name**：Home Assistant（或任何对您有意义的名称）
- **Description**：简要描述您将如何使用此应用（例如：`Home Assistant integration for controlling my heat pump`）
- **Callback URL**：`https://my.home-assistant.io/redirect/oauth`

<details>
<summary>我已手动禁用 My Home Assistant</summary>


如果您的安装中没有启用 [My Home Assistant](/home-assistant/integrations/my)，则可以改用 `<HOME_ASSISTANT_URL>/auth/external/callback` 作为重定向 URI。

`<HOME_ASSISTANT_URL>` 必须与配置/认证过程中使用的地址一致。

内部地址示例：`http://192.168.0.2:8123/auth/external/callback`、`http://homeassistant.local:8123/auth/external/callback`。


</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

配置此集成时需要使用上面创建的 **Client ID** 和 **Client Secret**。更多信息请参阅 [Application Credentials](/home-assistant/integrations/application_credentials)。

## 支持的热泵系统

此集成支持所有可连接到 myUplink 云服务的热泵设备。请参阅 [Works with myUplink](https://myuplink.com/legal/works-with/en)。
不过，在 Home Assistant 中的具体呈现方式取决于制造商如何以及在多大程度上实现了该服务。

## 使用场景

常见使用场景包括：

- **系统监控**：显示热泵当前运行状态（为房屋、泳池或热水加热）
- **智能通知**：在热水箱水温过低时接收提醒
- **自动化**：在度假模式期间调整温度曲线偏移
- **分析**：查看相关传感器的长期统计数据和图表

## 示例

以下自动化会在热水储备即将不足时向智能手机发送通知。在这个例子中，当水箱中部温度低于 42°C 时会触发通知。请注意，实际实体名称会因热泵型号不同而有所差异，您需要根据自己的安装情况调整 YAML 代码。

```yaml
automation:
  - alias: "Notify on low hot water reserve"
    triggers:
      - trigger: numeric_state
        entity_id:
          - sensor.your_pump_hot_water_charging_bt6
        below: 42
    actions:
      - action: notify.mobile_app_your_device
        data:
          message: "Hot water reserve is getting low."
          title: "Water heater"
```

## 数据更新

此集成会每 60 秒轮询一次 API 以获取数据。该轮询间隔旨在满足 myUplink API 的速率限制，同时提供较为及时的更新。

## 已知限制

- 此集成会尽力将 API 中的数据点映射到 Home Assistant 中合适的实体。不过，对于某些热泵型号，部分传感器可能不会出现；在另一些情况下，也可能会创建许多无关实体。如果您认为映射仍可改进，请在 GitHub 上创建 issue，并附上您安装环境的诊断下载文件。
- 实体名称以英文提供，Home Assistant 无法自动翻译它们。原因是这些名称由 API 定义，并且可能随着 API 或设备固件更新而变化。不过，大多数实体名称都较易理解，例如 `Room temperature (BT50)`。

## 故障排除

<details>
<summary>无法登录 myUplink API</summary>

请确认您已正确输入应用凭据。常见问题是输入的凭据字符串中包含了前导或尾随空格。您可能需要从 Home Assistant 中删除应用凭据，并重新安装该集成以完成正确配置。

</details>

## 移除此集成

移除此集成后，请前往 myUplink 的[开发者网站](https://dev.myuplink.com/apps)删除这些凭据，除非您还会再次使用它们。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
