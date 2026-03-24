---
title: Uptime Kuma
description: 关于如何将 Uptime Kuma 与 Home Assistant 集成的说明。
ha_category:
  - Sensor
  - System monitor
  - Update
ha_iot_class: Cloud Polling
ha_release: 2025.8
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: uptime_kuma
ha_integration_type: service
ha_platforms:
  - diagnostics
  - sensor
  - update
ha_quality_scale: platinum
---

**Uptime Kuma** 集成可将 Home Assistant 与您的 Uptime Kuma 监控工具连接起来。

## 关于 Uptime Kuma

Uptime Kuma 是一个开源、免费且易于使用的自托管监控工具，用于跟踪网站、应用程序和其他服务的在线状态与性能。

## 此集成的用途

此集成允许您直接在 Home Assistant 中跟踪 **Uptime Kuma** 监控项的状态。您可以在仪表板、自动化和脚本中使用这些实体，以便对服务中断作出反应，或在智能家居环境中监控在线率趋势。

## 前提条件

要设置 **Uptime Kuma** 集成，您需要准备 **API key** 以及 Uptime Kuma 实例的 **URL**（例如：`https://uptime.example.org`）。

您可以登录 Uptime Kuma 实例，前往 **Settings** > **API Keys**，然后选择 **Add API Key** 来创建 API key。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
"URL":
  description: "Uptime Kuma 实例地址。例如：`https://uptime.example.com`。"
"Verify SSL certificate":
  description: "为安全连接启用 SSL 证书验证。"
"API key":
  description: "用于与 Uptime Kuma 实例进行身份验证的 API key。"
```

## 传感器

- **Status**：监控项当前状态。可能的状态有 *up*、*down*、*pending* 或 *maintenance*。
- **Response time**：最近一次状态检查所花费的时间，单位为毫秒。
- **Certificate expiry**：SSL 证书到期前剩余的天数。
- **Monitor type**：执行的检查类型（例如 HTTP(s)、TCP、ping）。
- **Monitored hostname**：被监控的主机名或 IP 地址（如适用）。
- **Monitored port**：被监控服务使用的端口号（如适用）。
- **Monitored URL**：被监控服务的完整 URL（如适用）。
- **Uptime (1/30/365 days)**：基于 1、30 或 365 天滑动窗口计算的在线率百分比。
- **Response time Ø (1/30/365 days)**：基于 1、30 或 365 天滑动窗口计算的平均响应时间。
- **Tags**：分配给该监控项的标签数量。完整标签列表可在状态属性中查看。

## 更新

- **Uptime Kuma version**：该更新实体会指示 Uptime Kuma 是否已是最新版本，或者是否有更新版本可用。有关如何更新 Uptime Kuma 实例，请参阅[文档](https://github.com/louislam/uptime-kuma/wiki/%F0%9F%86%99-How-to-Update)。如果您使用的是 Home Assistant 的 Uptime Kuma 社区应用（原名 Uptime Kuma add-on），那么该社区应用一旦更新，您就会在 Home Assistant 中收到更新通知。

## 自动化

您可以从下面这个自动化示例开始，创建一个会根据监控项状态变化颜色的 Uptime Kuma 警示灯。

<details>
<summary>YAML 配置示例</summary>


```yaml
actions:
  - choose:
      - conditions:
          - condition: state
            entity_id: sensor.uptime_kuma_my_service
            state: down
        sequence:
          - action: light.turn_on
            data:
              color_name: red
            target:
              entity_id: light.warning_light
      - conditions:
          - condition: state
            entity_id: sensor.uptime_kuma_my_service
            state: pending
        sequence:
          - action: light.turn_on
            data:
              color_name: yellow
            target:
              entity_id: light.warning_light
      - conditions:
          - condition: state
            entity_id: sensor.uptime_kuma_my_service
            state: maintenance
        sequence:
          - action: light.turn_on
            data:
              color_name: blue
            target:
              entity_id: light.warning_light
      - conditions:
          - condition: state
            entity_id: sensor.uptime_kuma_my_service
            state: up
        sequence:
          - action: light.turn_on
            data:
              color_name: green
            target:
              entity_id:
                - light.warning_light
triggers:
  - trigger: state
    entity_id:
      - sensor.uptime_kuma_my_service
```


</details>

## 示例

### 全局状态二进制传感器

如果您希望使用一个二进制传感器来反映 Uptime Kuma 监控项的整体状态，可以创建一个模板二进制传感器。只要一个或多个选定监控项处于异常状态（例如 down、pending 或 maintenance），该传感器就会报告问题。

1. Open your Home Assistant Dashboard.
2. Go to [**Settings** > **Devices & services** > **Helpers**](https://my.home-assistant.io/redirect/helpers/).
3. Select **Create helper**.
4. Go to **Templates** > **Binary sensor**.
5. Fill in the name, for example **Uptime Kuma global status**.
6. Select the device class **problem**.
7. Paste the following state template:


```jinja
{% set problems = ['down', 'pending', 'maintenance'] %}
{% set has_label = 'my-label' %}
{% set entities = integration_entities('uptime_kuma') | select('match', 'sensor.*_status*') %}
{% set alerts = expand(entities) | selectattr('state', 'in', problems ) | selectattr('entity_id', 'in', label_entities(has_label))  | list %}
{{ alerts | count }}
```


:::important
- 将 `my-label` 替换为您的实际标签名称。
- 如果您的 Home Assistant 语言或实体命名不同，请相应调整 `sensor.*_status*`。
- 将选定标签添加到所有希望纳入此全局检查的 Uptime Kuma 状态传感器上。


:::
## 数据更新

此集成每 30 秒从 Uptime Kuma 实例获取一次数据。

## 已知限制

- 使用早于 v2.0.0 的 Uptime Kuma 版本时，Uptime Kuma API 不会公开监控项的唯一标识符。因此，如果多个监控项使用相同名称，Home Assistant 中只会显示其中一个。重命名监控项会创建新的实体，而旧的（失效的）实体会保留，除非您手动移除它们。
- 已暂停的监控项不会通过 API 暴露，因此 Home Assistant 无法区分某个监控项是已删除还是已暂停。因此，如果您删除了某个 Uptime Kuma 监控项，Home Assistant 中对应的设备条目必须手动移除。

:::note
要从 Home Assistant 中移除某个监控项，请前往 [**Settings** > **Devices & services** > **Uptime Kuma**](https://my.home-assistant.io/redirect/integration/?domain=uptime_kuma)，在要移除的设备条目旁选择三点菜单 `[mdi:dots-vertical]`，然后选择 **Remove device**。


:::
## 故障排除

除非 Uptime Kuma 在本地运行，否则 **Uptime Kuma** 集成依赖有效的互联网连接来与 Uptime Kuma 实例通信。如果遇到问题，请确认网络连接稳定，并确保 Uptime Kuma 实例可访问。

无论如何，在报告问题时，请先启用[调试日志](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，重启集成，并在问题再次出现后立即关闭调试日志（*调试日志文件会自动开始下载*）。如果仍然可行，也请一并下载[诊断数据](/home-assistant/integrations/diagnostics)。收集到调试日志和诊断数据后，请随问题报告一同提供。

## 移除集成

您可以按照以下步骤移除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

4. 现在您可以从 Uptime Kuma 中删除供 Home Assistant 使用的 API key，除非它同时还被其他集成或应用使用。
