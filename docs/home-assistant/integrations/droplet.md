---
title: Droplet
description: 'Droplet 集成将您的 Home Assistant 设置无缝连接到 Droplet(https://shop.hydrificwater.com/pages/buy-droplet)——一款先进的智能家居一体式水传感器。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Sensor
ha_config_flow: true
ha_release: '2025.10'
ha_iot_class: Local Push
ha_codeowners:
  - '@sarahseidman'
ha_domain: droplet
ha_platforms:
  - sensor
ha_integration_type: device
ha_zeroconf: true
ha_quality_scale: bronze
---
# Droplet

**Droplet** 集成将您的 Home Assistant 设置无缝连接到 [Droplet](https://shop.hydrificwater.com/pages/buy-droplet)——一款先进的智能家居一体式水传感器。

利用尖端超声波传感技术，Droplet 准确实时监控您家的用水量。它可以保护您的财产免受潜在的水损害，使您能够就节水做出明智的决定，并及早发现异常。

通过 Droplet 和 Home Assistant 高效智能地控制您家的水系统。

## 先决条件

在连接到 Home Assistant 之前，需要在您的 Droplet 上启用集成。

在 Droplet 应用程序中，前往 **设置** > **智能家居集成** > **Home Assistant**。启用集成并复制屏幕上显示的令牌。您需要在配置步骤中输入此令牌。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
IP address:
  description: "如果您的 Droplet 有固定 IP 地址，您可以使用它进行手动配置。自动发现不需要此字段。"
Pairing code:
  description: "用于与 Droplet 设备进行身份验证的配对码。您可以在 Droplet 应用程序的 **设置** > **智能家居集成** > **Home Assistant** 下找到它。"
```

## 支持的功能

### 传感器

以下传感器值可用：

- 流量
- 体积
- 服务器连接
- 信号质量

## 数据更新

集成连接后，Droplet 将在数据点可用时立即推送数据。在活动增加期间，这可能每 5 秒一次。在非活动期间，可能每 30 秒一次。

## 使用案例

### 将 Droplet 添加到能源仪表板

1. 打开能源仪表板的编辑菜单。
2. 选择用水量磁贴。
![用水量磁贴截图](/home-assistant/images/integrations/droplet/water_consumption.png)
3. 选择 Droplet 的体积传感器之一。可选跟踪您的费用。
![用水量源选择器截图](/home-assistant/images/integrations/droplet/configure_water_consumption.png)
4. Droplet 记录的用水量现在将纳入您的能源仪表板。
![能源仪表板上的水传感器截图](/home-assistant/images/integrations/droplet/energy_dashboard.png)

## 移除集成

此集成遵循标准的集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
4. 为防止 Droplet 在移除后显示为已发现设备，请在 Droplet 应用程序的 **设置** > **智能家居集成** > **Home Assistant** 下禁用本地 API。

## 故障排除

如果您在将 Droplet 连接到 Home Assistant 时遇到问题，可以采取以下步骤。

- 确保您输入的 Droplet 应用程序代码没有空格且全部为大写。
- 在应用程序中启用 Home Assistant 或重新生成代码后，尝试等待 1-2 分钟。Droplet 可能需要一点时间才能准备好接受连接。

## 常见问题

### 问：为什么 Droplet 的体积传感器有时显示负值？

**答**：即使您不使用家中的电器，管道中仍可能有活动。Droplet 试图非常准确，对微小流量敏感，这可能包括来回晃动的水，或压力差导致的轻微移动。小的负值是预期会出现的，并被报告出来，以便 Home Assistant（或其他 API 消费者）中报告的累积统计完全准确。

### 问：为什么 Droplet 的体积传感器值这么小？

**答**：Droplet 通过本地 API 报告的体积是点对点的，意味着每个新值代表自上次发送此数据以来记录的体积差异。这些数据可以聚合以生成日、周或月等期间的累积体积。