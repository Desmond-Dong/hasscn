---
title: Datadog
description: 'Datadog 集成使用 Datadog Agent(https://docs.datadoghq.com/guides/basicagentusage/) 将所有状态更改发送到 Datadog(https://www.datadoghq.com/)。'
ha_category:
  - History
ha_iot_class: Local Push
ha_release: 0.45
ha_domain: datadog
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---
# Datadog

**Datadog** 集成使用 [Datadog Agent](https://docs.datadoghq.com/guides/basic_agent_usage/) 将所有状态更改发送到 [Datadog](https://www.datadoghq.com/)。

Datadog 允许您分析、监控、交叉引用您的数据并对其发出警报。您可以使用它来检测统计异常、实时查看跨多个来源的图表、向 Slack 发送关键警报等。

<p class='img'>
  <img src='/home-assistant/images/screenshots/datadog-board-example.png' alt='Datadog 仪表板示例截图' />
</p>

该集成还将活动跟踪的事件发送到 Datadog，允许您将这些事件与数据相关联。

<p class='img'>
  <img src='/home-assistant/images/screenshots/datadog-event-stream.png' alt='Datadog 事件流示例截图' />
</p>

## 设置

您需要在 Home Assistant 可访问的网络中安装 Datadog 代理。

在 [Datadog Agent 配置](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L2203-L2207)中，您必须启用 [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/) 非本地流量，以允许从 `localhost` 外部收集 StatsD 数据。

## 配置


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
host:
  description: 您的 Datadog 主机的 IP 地址或主机名，例如 192.168.1.23。
port:
  description: 要使用的端口。
prefix:
  description: 要使用的指标前缀。
rate:
  description: 发送到 Datadog 的 UDP 数据包的采样率。
```

## 移除集成

此集成遵循标准的集成移除流程。不需要额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
