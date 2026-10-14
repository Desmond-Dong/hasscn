# Atag

**Atag** 集成允许 Home Assistant 连接到 [Atag One](https://www.atagverwarming.nl) 恒温器，报告并设置其状态。
该集成实现了以下平台：

* 气候
* 热水器
* 传感器

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
host:
  description: Atag 主机名或 IP 地址。
  required: true
  type: string
port:
  description: API 端口。仅在间接连接时更改（例如通过反向代理）
  required: false
  type: integer
```

## 气候

`Atag` 气候平台提供供暖系统的当前和目标温度信息、锅炉状态和 HVAC 模式。

### 集成动作

此集成支持以下动作（参见 [Climate](/home-assistant/integrations/climate/index.md)）。

* [`set_temperature`](/home-assistant/integrations/climate/index.md#action-climateset_temperature)
* [`set_hvac_mode`](/home-assistant/integrations/climate/index.md#action-climateset_hvac_mode)
  * `heat` 用于恒温器模式
  * `auto` 用于基于天气的模式
* [`set_preset_mode`](/home-assistant/integrations/climate/index.md#action-climateset_preset_mode)
  * `Manual` 启用手动操作
  * `Auto` 启用基于计划表的操作
  * `Extend` 将下次计划的温度更新延迟默认延长周期
  * `away` 启用度假模式 1 天或直到激活另一个预设
  * `boost` 启用壁炉模式

:::note
`HVAC 模式 Auto`（基于天气）不应与 `预设模式 Auto`（计划表、恒温器模式）混淆。
目前在 Extend、Away 和 boost 模式下选择自定义时间段不受支持。可以在设备上更改默认设置。

:::

## 热水器

热水器报告生活热水需求的当前和目标温度，以及锅炉状态（加热或空闲）。这可用于检测热水需求，例如正在运行的淋浴或自来水。
目前不支持设置目标值。

## 传感器

并非 One 报告的所有指标都是热水器或气候平台的一部分。额外的传感器被添加到 Home Assistant 以监控这些指标，如果需要可以在 UI 中禁用。导航到 `配置`、`实体` 并选择您希望禁用的实体。
以下传感器将被添加到 Home Assistant：

### 默认启用的传感器

* `average_outside_temperature`
* `burning_hours`
* `ch_return_temperature`
* `ch_water_pressure`
* `ch_water_temperature`
* `flame`
* `outside_temperature`
* `weather_status`
