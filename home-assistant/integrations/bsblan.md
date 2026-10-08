# BSB-LAN

**BSB-Lan** 集成将 [BSBLan](https://github.com/fredlcore/BSB-LAN) 设备集成到 Home Assistant。

BSBLan 是由 `Frederik Holst` 在许多其他贡献者的帮助下制造的设备。板 v3 专为 Arduino Due 设计，配有以太网扩展板，用于基于 Web 控制供暖系统，如 `Elco Thision`、`Brötje` 和类似系统。还提供 ESP32 版本的板。

它可以通过 Boiler-System-Bus、Local Process Bus 和 <abbr title="Punkt-zu-Punkt Schnittstelle">PPS</abbr> 与供暖系统通信。有关它支持哪些系统的更多信息，请查看他们的[文档](https://docs.bsb-lan.de)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

对于身份验证，支持使用用户名和密码的 HTTP 身份验证或使用密钥。使用其中之一。

## 支持的功能

根据您的系统，以下实体可用：

* 按钮
* 气候
* 诊断
* 传感器
* 热水器

### 按钮

* **同步时间**：将 BSB-Lan 设备时间与当前 Home Assistant 时间同步。当您的设备时间漂移或与 Home Assistant 时间不匹配时使用它。

**同步时间**按钮出现在设备页面的**配置**部分下，默认不在您的仪表板上。您也可以使用 `bsblan.sync_time` 动作以编程方式触发相同的同步，例如在每日自动化中。

### 传感器

根据您的供暖系统，以下传感器可用：

* 室内温度
* 室外温度
* 总能量（默认禁用）

要使用**总能量**传感器，请在 Home Assistant 中[启用该实体](/home-assistant/common-tasks/general/index.md#enabling-or-disabling-entities)。

:::note
**总能量**传感器不是实时的。它以 1 kWh 步长更新，因此只有在再使用 1 kWh 后值才会改变。

:::

## 动作

集成提供以下动作。

### 动作：设置热水计划

`bsblan.set_hot_water_schedule` 动作允许您为 BSB-Lan 设备设置热水加热计划。一周中的每一天可以有一个或多个热水加热应处于活动状态的时间段。

* **目标**：`device_id`
  * **描述**：要配置的 BSB-Lan 设备。
  * **必需**：是
* **数据属性**：
  * **`monday_slots`**：周一的时间段列表。每个时间段包含 `start_time` 和 `end_time`。
    * **可选**：是
  * **`tuesday_slots`**：周二的时间段列表。每个时间段包含 `start_time` 和 `end_time`。
    * **可选**：是
  * **`wednesday_slots`**：周三的时间段列表。每个时间段包含 `start_time` 和 `end_time`。
    * **可选**：是
  * **`thursday_slots`**：周四的时间段列表。每个时间段包含 `start_time` 和 `end_time`。
    * **可选**：是
  * **`friday_slots`**：周五的时间段列表。每个时间段包含 `start_time` 和 `end_time`。
    * **可选**：是
  * **`saturday_slots`**：周六的时间段列表。每个时间段包含 `start_time` 和 `end_time`。
    * **可选**：是
  * **`sunday_slots`**：周日的时间段列表。每个时间段包含 `start_time` 和 `end_time`。
    * **可选**：是
  * **`standard_values_slots`**：标准/默认时间段列表。每个时间段包含 `start_time` 和 `end_time`。
    * **可选**：是

时间段使用时间选择器定义，便于配置而无需手动格式化。您只需指定要配置的日期。

### 动作 `bsblan.sync_time`

将 Home Assistant 时间同步到 BSB-Lan 设备。仅在设备时间与 Home Assistant 时间不同时更新。

* **目标**：`device_id`
  * **描述**：要同步时间的 BSB-LAN 设备。
  * **必需**：是

#### 示例

同步所有 BSB-Lan 设备的时间：

```yaml
action: bsblan.sync_time
```

同步特定设备的时间：

```yaml
action: bsblan.sync_time
target:
  device_id: "your_device_id"
```

在自动化中使用以每日同步时间：

```yaml
automation:
  - alias: "每日同步 BSB-Lan 时间"
    triggers:
      - trigger: time
        at: "03:00:00"
    actions:
      - action: bsblan.sync_time
```

## 示例

以下示例展示如何在 Home Assistant 自动化中使用 BSB-Lan 集成动作。

### 设置工作日和周末计划

此示例为工作日和周末设置不同的计划。每天可以有多个时间段。

```yaml
action: bsblan.set_hot_water_schedule
target:
  device_id: abc123device456
data:
  monday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  tuesday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  wednesday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  thursday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  friday_slots:
    - start_time: "06:00:00"
      end_time: "08:00:00"
    - start_time: "17:00:00"
      end_time: "21:00:00"
  saturday_slots:
    - start_time: "08:00:00"
      end_time: "22:00:00"
  sunday_slots:
    - start_time: "08:00:00"
      end_time: "22:00:00"
```

### 季节性计划自动化

此示例根据季节自动调整热水计划。

```yaml
automation:
  - alias: "设置热水计划 - 冬季"
    triggers:
      - trigger: state
        entity_id: sensor.season
        to: winter
    actions:
      - action: bsblan.set_hot_water_schedule
        target:
          device_id: "{{ device_id('water_heater.bsblan_hot_water') }}"
        data:
          monday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          tuesday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          wednesday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          thursday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          friday_slots:
            - start_time: "05:00:00"
              end_time: "08:30:00"
            - start_time: "16:00:00"
              end_time: "23:00:00"
          saturday_slots:
            - start_time: "07:00:00"
              end_time: "23:00:00"
          sunday_slots:
            - start_time: "07:00:00"
              end_time: "23:00:00"

  - alias: "设置热水计划 - 夏季"
    triggers:
      - trigger: state
        entity_id: sensor.season
        to: summer
    actions:
      - action: bsblan.set_hot_water_schedule
        target:
          device_id: "{{ device_id('water_heater.bsblan_hot_water') }}"
        data:
          monday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          tuesday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          wednesday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          thursday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          friday_slots:
            - start_time: "06:00:00"
              end_time: "07:00:00"
            - start_time: "18:00:00"
              end_time: "20:00:00"
          saturday_slots:
            - start_time: "08:00:00"
              end_time: "21:00:00"
          sunday_slots:
            - start_time: "08:00:00"
              end_time: "21:00:00"
```

有关 BSBLan 设备的更多文档，请查看[手册](https://docs.bsb-lan.de)。

要查看成功使用 BSB-LAN 的报告系统的更详细列表，请访问相应链接：

[支持的供暖系统](https://docs.bsb-lan.de/supported_heating_systems.html)

该集成已使用稳定固件版本 `5.0.16-20250525002819` 进行测试。较新的固件版本可能无法工作，因为 API 可能已更改。对于自动发现，请使用最新版本：[release 5.0](https://github.com/fredlcore/BSB-LAN/releases/tag/v5.0)。
