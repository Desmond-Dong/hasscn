---
title: RDW
description: 有关如何将 RDW 车辆信息与 Home Assistant 集成的说明。
ha_category:
  - Binary sensor
  - Car
  - Sensor
ha_release: 2021.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
  - '@joostlek'
ha_domain: rdw
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: service
---

**RDW** 集成连接到 [RDW](https://www.rdw.nl)（荷兰车辆管理局）的开放数据服务，以便在 Home Assistant 中获取并监控您的荷兰注册车辆信息。RDW 是荷兰负责车辆注册、许可、监管和执法的政府机构。

## 使用场景

通过此集成，您可以直接在 Home Assistant 仪表板中跟踪重要车辆信息，例如定期检验（<abbr title="Algemene Periodieke Keuring">APK</abbr>）到期日期、保险状态和召回通知。这样您就无需手动查看 RDW 网站，也不必等待邮寄纸质通知。您还可以设置自动化，在车辆需要处理事项时及时收到提醒。

## 先决条件

要使用此集成，您需要：

1. 一辆已在荷兰注册的车辆（车牌）
2. 您要监控车辆的车牌号码


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
License plate:
    description: "车辆的荷兰车牌号码。请输入不带空格和连字符的格式（例如输入 AB123C，而不是 AB-123-C）。"
```

## 支持的功能

### 实体

**RDW** 集成为您的车辆提供以下实体：

#### 二进制传感器

- **Liability insured**：显示您的车辆当前是否具有责任保险。
- **Pending recall**：指示您的车辆是否存在需要处理的未完成召回通知。

#### 传感器

- **APK expiration**：车辆定期技术检验（APK）的到期日期。
- **Ascription date**：车辆登记到当前车主名下的日期。

## 示例

### 创建车辆召回提醒自动化

当 RDW 报告您的车辆存在安全召回时，此自动化会向您发送重要通知：

```yaml
# 车辆安全召回提醒自动化
automation:
  - alias: "Vehicle recall alert"
    trigger:
      - platform: state
        entity_id: binary_sensor.rdw_ab123c_pending_recall
        to: "on"
    actions:
      - action: notify.mobile_app
        data:
          title: "Vehicle recall alert"
          message: "Your vehicle has a pending safety recall. Please contact your dealer."
```

## 数据更新

**RDW** 集成每小时从 RDW 开放数据库 polls 一次数据。对于车辆相关信息来说，这样的更新频率是合适的，因为这些数据通常不会频繁变化。

## 已知限制

- 此集成仅适用于荷兰车辆车牌。

## 故障排除

### 未找到车辆信息

#### 症状：“Unknown license plate”

尝试设置集成时，表单会显示“Unknown license plate.”。

##### 说明

当车牌有效，但 RDW 数据库中没有这辆车的信息时，就会出现这种情况。

##### 解决方法

1. 再次确认您输入的车牌号码是否正确。
2. 确保车辆已在荷兰注册。
3. 新近注册的车辆可能需要一些时间才会出现在开放数据中。
4. 访问 [RDW 网站](https://www.rdw.nl) 检查该车辆是否已显示。

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
