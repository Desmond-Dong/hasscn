# Acaia

**Acaia** integration 允许您通过 Home Assistant 控制 [Acaia](https://acaia.co/) 秤。

如果您的设备在 Home Assistant 主机的蓝牙范围内，并且 [蓝牙](/home-assistant/integrations/bluetooth.md) 集成已完全加载，秤应该会被自动发现。如果您正在手动配置设备，您的秤在设置过程中需要保持开启状态。

集成设置完成后，Home Assistant 将每 15 秒尝试连接一次您的秤。这意味着您打开秤与 Home Assistant 连接之间有时会有短暂的延迟。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Device:
  description: "作为您的秤的蓝牙设备。"
```

## 可用平台和实体

### 二值传感器

* **计时器运行中**：计时器当前是否在秤上运行

### 按钮

* **归零**：将秤归零。
* **重置计时器**：重置计时器。如果计时器正在运行，它将继续运行。
* **开始/停止计时器**：根据计时器当前是否运行来启动或停止计时器。不会重置，而是继续计时。

### 传感器

* **电池**：秤当前的电池电量。
* **体积流速**：计算冲泡时的当前流速（以 mL/s 为单位）。
* **重量**：秤上当前显示的重量。

## 支持的设备

以下设备已通过此集成成功测试：

* Lunar
* Pyxis
* Pearl
* Pearl S

如果您已成功使用其他 Acaia 型号测试此集成，请通过完善此文档或在 GitHub 上提出问题来告知我们。

## 可能的用例

此集成可以与智能咖啡机的集成结合使用，例如 [La Marzocco 集成](https://www.home-assistant.io/integrations/lamarzocco/)。
它也可以用于在 Pyxis 或 Lunar 上冲泡时在辅助显示屏上显示重量，因为这些设备上看不到显示屏。

## 自动化

从这些自动化示例开始。

### 冲泡开始时归零并启动计时器

<details>
<summary>示例 YAML 配置</summary>

```yaml
alias: "在秤上启动计时器"
description: "当咖啡机开始冲泡时，执行以下操作：归零、重置计时器，并在秤上启动计时器。"
triggers:
  - trigger: state
    entity_id:
      - binary_sensor.lm001234_brewing_active
    to: "on"
    from: "off"
actions:
  - action: button.press
    target:
      entity_id: button.lunar_tare
  - action: button.press
    target:
      entity_id:
        - button.lunar_reset_timer
  - action: button.press
    target:
      entity_id:
        - button.lunar_start_stop_timer
```

</details>

## 已知限制

* 当此集成配置给您的设备时，您将无法使用官方应用程序，因为一次只支持一个连接。

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 故障排除

<details>
<summary>设备未被发现或找到</summary>

确保您的秤已开启并在 Home Assistant 实例的蓝牙范围内。[ESPHome 蓝牙代理](https://esphome.io/components/bluetooth_proxy/) 是扩大范围的好方法，如果您的实例距离太远。在 acaia 集成中启用调试设置并检查您的日志。

</details>
