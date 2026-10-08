# IMGW-PIB

**IMGW-PIB** 集成使用来自 [Institute of Meteorology and Water Management - National Research Institute](https://hydro.imgw.pl) 的水文数据，以展示波兰河流和水库的信息。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Hydrological station:
    description: "从可用站点列表中选择一个水文站。"
```

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 支持的功能

IMGW-PIB 集成提供以下实体。

### Sensors

* **Water level**
  * **Description**: 测量点处河流或水库的水位
* **Water flow**
  * **Description**: 测量点处河流的流量
  * **Remarks**: 并非所有水文站都可用
* **Water temperature**
  * **Description**: 测量点处河流或水库的水温
  * **Remarks**: 并非所有水文站都可用
* **Hydrological alert**
  * **Description**: 提供指定河流或水库的水文警报信息

## 数据更新

默认情况下，此集成每 30 分钟从 IMGW-PIB API polls 一次数据。

## 可能的使用场景

* 监测水文警报，以帮助保护您的家人和财产免受洪水影响。
* 监测河流水位，以长期了解您所在地区的气候变化情况。

## 示例

### 创建水文警报通知

以下自动化会创建一条持久通知，显示水文警报的内容和概率：

```yaml
automation:
  - alias: Hydrological alert
    triggers:
      - trigger: state
        entity_id:
          - sensor.warta_oborniki_hydrological_alert
        from: no_alert
    actions:
      - action: persistent_notification.create
        data:
          title: Hydrological alert!
          message: "{{ trigger.to_state.state }}, probability {{ trigger.to_state.attributes.probability }}%"
```

## 已知限制

* 此集成提供通过公开 IMGW-PIB API 可获取的水文站数据。某些水文站不在这些数据中，因此此集成不支持它们。
* 并非所有水文站都会提供全部数据，因此不同站点的实体集合可能有所不同。
