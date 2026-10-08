# SEKO PoolDose

**SEKO PoolDose** 集成可将 [SEKO](https://www.seko.com/) 水处理系统连接到 Home Assistant。SEKO 是一家生产泳池和水疗池各类监测与控制设备的制造商。

此集成使用未公开文档的本地 HTTP API。它可提供泳池传感器的实时读数，例如温度、pH、ORP/氧化还原值、报警状态、继电器状态以及配置参数。

## 前提条件

1. 按照用户手册安装并设置 PoolDose 设备。
   1. 特别是，要将设备连接到你的 Wi-Fi 网络。
   2. 确认设备的 IP 地址或主机名。
2. 通过 IP 地址或主机名访问设备。使用 HTTP 和端口 80。
   1. 登录 Web 界面。
   2. 确认能看到传感器数据，例如以仪表盘形式显示的水温或 pH 值。
   3. 停用设备密码，也就是将其设置为 0000。
3. 可选：阻止设备访问互联网，以确保完全本地运行，并防止可能带来问题的固件更新。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: 您设备的 IP 地址或主机名。可在设备的 Web 界面或路由器中查看。
```

## 数据更新

默认情况下，此集成每 10 分钟（600 秒）从设备轮询一次数据。设置这一轮询间隔是为了在数据新鲜度与设备稳定性之间取得平衡：

* 设备不支持频繁请求，较短的轮询间隔可能导致其变得不稳定。
* 实际水处理数值通常变化较慢，不需要频繁监测。
* 此间隔既能满足泳池水质管理的监控需求，也能保持设备可靠性。

### 更新与写入行为

集成会避免并行读取只读值，并将写入操作串行化（一次只写一个值）。这样可以降低设备有限硬件的负载，并防止竞争条件。

## 支持的设备

已知以下设备受此集成支持：

* SEKO PoolDose Double
* VÁGNER POOL VA DOS BASIC
* VÁGNER POOL VA DOS EXACT

## 支持的功能

此集成提供以下实体。

### 二进制传感器

* **Recirculation pump alarm**: Recirculation pump issue.
* **pH tank level alarm**: Low pH dosing solution level.
* **ORP tank level alarm**: Low ORP dosing solution level.
* **Chlorine tank level alarm**: Low chlorine dosing solution level.
* **Flow rate alarm**: Water flow issues.
* **pH overfeed alarm**: Excessive pH dosing detected.
* **ORP overfeed alarm**: Excessive ORP dosing detected.
* **Alarm relay**: Main alarm relay state.
* **Auxiliary relay 1**: Auxiliary relay 1 output state.
* **Auxiliary relay 2**: Auxiliary relay 2 output state.
* **Auxiliary relay 3**: Auxiliary relay 3 output state.

### 传感器

* **Temperature**: Water temperature.
  * **Unit**: °C, °F
* **pH**: pH value.
* **ORP**: Current ORP (Redox) value.
  * **Unit**: mV
* **Chlorine**: Chlorine concentration.
  * **Unit**: ppm
* **Flow rate**: Water flow rate.
  * **Unit**: L/s, m³/h
* **pH type dosing**: Type of pH dosing being used.
  * **Values**: pH+, pH-
* **Peristaltic pH dosing**: pH peristaltic dosing mode.
  * **Values**: Off, Proportional, On/Off, Timed
* **Overfeed alert pH time**: Time threshold for pH overfeed alerts.
  * **Unit**: min
* **ORP type dosing**: Type of ORP dosing being used.
  * **Values**: Low, High
* **Peristaltic ORP dosing**: ORP peristaltic dosing mode.
  * **Values**: Off, Proportional, On/Off, Timed
* **Chlorine type dosing**: Type of chlorine dosing being used.
  * **Values**: Low, High
* **Peristaltic chlorine dosing**: Chlorine peristaltic dosing mode.
  * **Values**: Off, Proportional, On/Off, Timed
* **Overfeed alert ORP time**: Time threshold for ORP overfeed alerts.
  * **Unit**: min
* **pH calibration type**: Type of pH calibration being used.
  * **Values**: Off, Reference, 1 point, 2 points
* **pH calibration offset**: pH calibration offset value.
  * **Unit**: mV
* **pH calibration slope**: pH calibration slope value.
  * **Unit**: mV
* **ORP calibration type**: Type of ORP calibration being used.
  * **Values**: Off, Reference, 1 point
* **ORP calibration offset**: ORP calibration offset value.
  * **Unit**: mV
* **ORP calibration slope**: ORP calibration slope value.
  * **Unit**: mV
* **Totalizer**: Total water volume accumulated.
  * **Unit**: L, m³

### 数值

* **pH target**: Target pH value for automatic dosing control.
* **ORP target**: Target ORP (Redox) value for automatic dosing control.
  * **Unit**: mV
* **Chlorine target**: Target chlorine concentration for automatic dosing control.
  * **Unit**: ppm
* **pH overfeed alarm lower limit**: Lower threshold for pH overfeed detection.
* **pH overfeed alarm upper limit**: Upper threshold for pH overfeed detection.
* **ORP overfeed alarm lower limit**: Lower threshold for ORP overfeed detection.
  * **Unit**: mV
* **ORP overfeed alarm upper limit**: Upper threshold for ORP overfeed detection.
  * **Unit**: mV
* **Chlorine overfeed alarm lower limit**: Lower threshold for chlorine overfeed detection.
  * **Unit**: ppm
* **Chlorine overfeed alarm upper limit**: Upper threshold for chlorine overfeed detection.
  * **Unit**: ppm

### 开关

* **Pause dosing**: Pauses or resumes the dosing process.
* **Pump monitoring**: Enables or disables pump monitoring.
* **Frequency input**: Enables or disables frequency input for a water meter.

### 选择项

* **Water meter unit**: Water meter measurement unit.
  * **Options**: Liters, Cubic meters
* **Flow rate unit**: Flow rate measurement unit.
  * **Options**: Cubic meters per hour, Liters per second
* **pH dosing type**: pH dosing type.
  * **Options**: pH+ / alcalyne, pH- / acid
* **pH dosing method**: pH dosing control method.
  * **Options**: Disabled, Proportional control, On/Off control, Timed dosing
* **ORP dosing type**: ORP/Redox dosing type.
  * **Options**: Low intensity, High intensity
* **ORP dosing method**: ORP/Redox dosing control method.
  * **Options**: Disabled, Proportional control, On/Off control, Timed dosing
* **Chlorine dosing type**: Chlorine dosing type.
  * **Options**: Low intensity, High intensity
* **Chlorine dosing method**: Chlorine dosing control method.
  * **Options**: Disabled, Proportional control, On/Off control, Timed dosing

## 示例

### 监测 ORP 水平并发送提醒

此自动化会监测泳池的 ORP 水平，并在其超出建议范围时发送通知。

```yaml
automation:
  - alias: "Pool ORP out of range"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.pool_device_orp
        below: 650
        id: "low"
      - trigger: numeric_state
        entity_id: sensor.pool_device_orp
        above: 750
        id: "high"
    actions:
      - action: notify.notify
        data:
          title: "Pool ORP alert"
          message: "ORP level is {{ trigger.id }}: {{ states('sensor.pool_device_orp') }} mV"
```

### 监测 pH 水平并发送提醒

此自动化会监测泳池的 pH 水平，并在其超出建议范围时发送通知。

```yaml
automation:
  - alias: "Pool pH out of range"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.pool_device_ph
        below: 6.8
        id: "low"
      - trigger: numeric_state
        entity_id: sensor.pool_device_ph
        above: 7.6
        id: "high"
    actions:
      - action: notify.notify
        data:
          title: "Pool pH alert"
          message: "pH level is {{ trigger.id }}: {{ states('sensor.pool_device_ph') }}"
```

### 在 pH 极端时暂停投药

此自动化会在 pH 值达到危险的高值或低值时暂停投药系统，以防止化学药剂投加过量。

```yaml
automation:
  - alias: "Pause dosing on extreme pH"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.pool_device_ph
        below: 6.5
        id: "too_low"
      - trigger: numeric_state
        entity_id: sensor.pool_device_ph
        above: 8.0
        id: "too_high"
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.pool_device_pause_dosing
      - action: notify.notify
        data:
          title: "Pool dosing paused"
          message: "Dosing paused - pH is {{ trigger.id }}: {{ states('sensor.pool_device_ph') }}"
```

### 泳池监控仪表板

此示例结合多种卡片类型，创建一个全面的泳池监控视图。

```yaml
type: vertical-stack
cards:
  - type: entities
    title: Pool status
    entities:
      - entity: sensor.pool_device_temperature
        name: Temperature
      - entity: sensor.pool_device_ph
        name: pH level
      - entity: sensor.pool_device_orp
        name: ORP level
      - entity: switch.pool_device_pause_dosing
        name: Dosing control
  - type: horizontal-stack
    cards:
      - type: gauge
        entity: sensor.pool_device_ph
        name: pH
        min: 6.5
        max: 8.0
        needle: true
        segments:
          - from: 6.5
            color: var(--error-color)
          - from: 6.8
            color: var(--warning-color)
          - from: 7.2
            color: var(--success-color)
          - from: 7.6
            color: var(--warning-color)
          - from: 7.8
            color: var(--error-color)
      - type: gauge
        entity: sensor.pool_device_orp
        name: ORP
        unit: mV
        min: 600
        max: 800
        needle: true
        segments:
          - from: 600
            color: var(--error-color)
          - from: 650
            color: var(--success-color)
          - from: 750
            color: var(--error-color)
  - type: history-graph
    title: 24 hour trends
    hours_to_show: 24
    entities:
      - entity: sensor.pool_device_ph
      - entity: sensor.pool_device_orp
      - entity: sensor.pool_device_temperature
  - type: entities
    title: Alarms
    state_color: true
    entities:
      - entity: binary_sensor.pool_device_ph_tank_level_alarm
        name: pH tank level
      - entity: binary_sensor.pool_device_orp_tank_level_alarm
        name: ORP tank level
      - entity: binary_sensor.pool_device_ph_overfeed_alarm
        name: pH overfeed
      - entity: binary_sensor.pool_device_orp_overfeed_alarm
        name: ORP overfeed
      - entity: binary_sensor.pool_device_flow_rate_alarm
        name: Flow rate
```

## 已知限制

### 硬件与连接问题

PoolDose 设备有两个特性可能影响其网络连接能力：

* **硬件限制**：设备使用的是小型控制器，Web 服务器和数据处理任务会给它带来较高负载。这有时会导致短暂的连接中断，不过设备通常会很快恢复。

* **节能模式**：当设备设置中启用了泵监控功能时，如果未检测到泵运行，设备通常会进入节能模式。在此期间，设备对网络请求的响应可能变慢，或者暂时在网络上不可用，比如夜间。

### 缓存数据行为

这些限制属于设备的正常行为，并非集成本身的问题。为应对这类连接问题，当设备暂时无响应时，集成会将数值最多缓存 300 秒（5 分钟）。缓存期结束后，实体会显示为“不可用”，直到设备再次提供新数据。

## 故障排除

### 找不到设备

#### 症状：“无法在网络中找到设备”

尝试设置集成时，你会收到无法找到设备的错误。

##### 说明

设备可能没有正确连接到网络，或者它使用的 IP 地址或主机名与你预期的不一致。

##### 解决方法

尝试以下步骤来解决此问题：

1. 检查设备是否已通电并连接到你的 Wi-Fi 网络。
2. 在路由器的设备列表或 DHCP 客户端表中查找名为 “kommspot” 的设备。
3. 在集成设置中使用 “kommspot” 显示的 IP 地址。
4. 确保设备与 Home Assistant 位于同一网段。

### 连接被拒绝

#### 症状：“连接被拒绝”或身份验证错误

尽管设备能在网络中被找到，但集成仍无法连接到它。

##### 说明

这通常发生在设备 Web 界面的密码未设置为默认值（0000），或者未被正确停用时。

##### 解决方法

请按以下步骤操作：

1. 使用浏览器访问设备的 IP 地址。
2. 登录 Web 界面。
3. 将密码设为默认值（0000）或停用密码保护。
4. 再次尝试设置集成。

### 连接不稳定

#### 症状：实体频繁变为不可用

传感器实体会间歇性显示为“不可用”，尤其是在一天中的某些时段。

##### 说明

这是 PoolDose 设备的正常行为。当循环泵未运行时，设备会进入一种类似休眠的模式，对网络请求的响应会变慢。

##### 解决方法

这是预期行为，并不表示集成存在问题：

1. 当设备暂时无响应时，集成会使用缓存值。
2. 设备恢复响应后，实体会恢复正常。
3. 在创建依赖这些传感器的自动化时，请考虑这种行为。

### 缺少蠕动泵状态

#### 症状：没有可用的蠕动泵状态数据

蠕动泵状态传感器不显示任何数据，或显示为不可用。

##### 说明

只有当设备设置中启用了这些泵的外部继电器时，PoolDose 设备才会上传蠕动投药泵的状态。

##### 解决方法

要获取蠕动泵状态数据：

1. 打开 PoolDose 设备的设置页面。
2. 找到 pH 和 ORP 泵的外部继电器配置。
3. 为你想监控的泵启用外部继电器。
4. 保存设置，并在需要时重启设备。

## 诊断

此集成提供诊断信息，用于帮助调试和故障排除。诊断输出包括：

* 协调器上报的设备信息，其中敏感值会被脱敏处理。
* 协调器最近一次从设备获取的数据。

要收集诊断信息，请前往 **设置** > **设备与服务**，打开 PoolDose 集成，选择集成条目上的三点菜单，然后选择 **下载诊断信息**。报告问题时请附上下载的文件，以帮助维护者排查。

## 删除集成

此集成遵循标准的集成删除流程，无需额外步骤。

### 从 Home Assistant 中删除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
2. 在设备列表中，选择你要删除的集成实例。
3. 在该条目旁选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **删除**。
