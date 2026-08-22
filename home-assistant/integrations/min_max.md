# Min/Max

**Min/Max** 集成会读取其他传感器的状态，以计算收集到的状态中的最小值、最大值、最新值（last）、平均值、中位数、范围和总和。

此集成提供的传感器会始终显示所有被监控传感器中接收到的最低值、最高值或最新值。如果您的数据存在尖峰值，建议先使用 [statistics 传感器](/home-assistant/integrations/statistics.md) 对数值进行过滤或平滑处理。

如果源传感器提供的是未知状态，则在计算中会被忽略；但对于总和（sum）类型，结果状态会被设置为 unknown。如果传感器的计量单位不同，Min/Max 传感器将进入错误状态，其值为 `UNKNOWN`，计量单位为 `ERR`。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Name:
  description: 传感器名称。您之后仍可再次修改。
Input entities:
  description: 至少要监控两个实体。所有实体必须使用相同的计量单位。
Type:
  description: 传感器类型，可为 `min`、`max`、`last`、`mean`、`median`、`range` 或 `sum`。
Precision:
  description: 将计算得到的平均值、中位数或总和值四舍五入到最多 N 位小数。
```

## YAML 配置

此外，也可以通过 YAML 手动配置和设置此集成。要在您的安装中启用此集成传感器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: min_max
    entity_ids:
      - sensor.kitchen_temperature
      - sensor.living_room_temperature
      - sensor.office_temperature
```

```yaml
entity_ids:
  description: 至少要监控两个实体。将使用第一个条目的计量单位，所有实体都必须使用相同的计量单位。
  required: true
  type: [list, string]
type:
  description: "传感器类型：`min`、`max`、`last`、`mean`、`median`、`range` 或 `sum`。"
  required: false
  default: max
  type: string
name:
  description: 在前端中使用的传感器名称。
  required: false
  type: string
round_digits:
  description: 将平均值或中位数四舍五入到指定的小数位数。
  required: false
  type: integer
  default: 2
unique_id:
  description: 唯一 ID，用于在 UI 中配置该实体。
  required: false
  type: string
```
