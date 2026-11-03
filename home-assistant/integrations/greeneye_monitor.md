# GreenEye Monitor (GEM)

[GreenEye Monitor (GEM)](https://www.brultech.com/greeneye/) 集成可让您在 Home Assistant 中为 GEM 的各类数据通道创建传感器。每个电流互感器（CT）通道、脉冲计数器和温度传感器都会在 Home Assistant 中显示为传感器，并可用于自动化。

请将您的 GEM 配置为生成二进制格式的数据包（例如，对于部分通道配置为净计量的 32 通道 GEM，可使用 `Bin32 NET`），并将其发送到 Home Assistant 主机上的一个未使用端口。（这些设置位于 GEM UI 的 `Packet Send` 和 `Network` 页面中。）然后，在 `configuration.yaml` 文件中指定该端口，以及您的监视器和要监控的数据通道信息。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
greeneye_monitor:
  port: 8000
  monitors:
    - serial_number: "YOUR_SERIAL_NUMBER"
      channels:
        - number: 1
          name: total_power
        - number: 2
          name: solar_panels_power
          net_metering: true
      pulse_counters:
        - number: 1
          name: sprinklers_water_usage
          counted_quantity: "gal"
          counted_quantity_per_pulse: 1
          time_unit: "min"
      temperature_sensors:
        temperature_unit: "C"
        sensors:
          - number: 1
            name: back_porch_temperature
      voltage:
        - number: 1
          name: house_volts
```

默认情况下，GEM 每 5 秒发送一次更新。这会产生大量数据，而 [`recorder`](/home-assistant/integrations/recorder.md) 集成用于历史记录的数据库并不擅长处理如此多的数据，因此建议您配置 [`influxdb`](/home-assistant/integrations/influxdb.md) 集成，并将 GEM 传感器从 `recorder` 中排除。

```yaml
port:
  description: Home Assistant 用于监听 GEM 数据包的端口。必须与 GEM 设置界面 `Network` 选项卡中设置的端口一致。
  required: true
  type: string
monitors:
  description: 应显示在 Home Assistant 中的监视器列表。其他监视器的数据将被忽略。
  required: false
  type: list
  keys:
    serial_number:
      description: 您的 8 位 GEM 序列号，与 UI 中显示的一致。
      required: true
      type: string
    channels:
      description: 此监视器中应显示在 Home Assistant 里的通道列表。其他通道的数据将被忽略。
      required: false
      type: list
      keys:
        number:
          description: GEM UI 中显示的通道编号。
          required: true
          type: integer
        name:
          description: 此通道传感器在 Home Assistant 中使用的名称。
          required: true
          type: string
        net_metering:
          description: 如果该通道在 GEM 中配置为净计量，则设为 `true`，否则设为 `false`。
          required: false
          type: boolean
          default: false
    voltage:
      description: 电压传感器配置
      required: false
      keys:
        number:
          description: GEM 中存在的通道编号。当前型号的 GEM 只有一个电压传感器。
          required: true
          type: integer
        name:
          description: 电压传感器在 Home Assistant 中使用的名称。
          required: true
          type: string
    temperature_sensors:
      description: 温度传感器配置
      required: false
      keys:
        temperature_unit:
          description: 温度使用的单位（F 或 C）
          type: string
          required: true
        sensors:
          description: 此监视器中应显示在 Home Assistant 里的温度传感器列表。其他传感器的数据将被忽略。
          required: true
          type: list
          keys:
            number:
              description: GEM UI 中显示的传感器编号。
              required: true
              type: integer
            name:
              description: 该传感器在 Home Assistant 中使用的名称。
              required: true
              type: string
    pulse_counters:
      description: 此监视器中应显示在 Home Assistant 里的脉冲计数器列表。其他脉冲计数器的数据将被忽略。
      required: false
      type: list
      keys:
        number:
          description: GEM UI 中显示的脉冲计数器编号。
          required: true
          type: integer
        name:
          description: 该脉冲计数器在 Home Assistant 中使用的名称。
          required: true
          type: string
        counted_quantity:
          description: 该脉冲计数器统计的单位（例如 `gal`、`L`）
          required: true
          type: string
        counted_quantity_per_pulse:
          description: 每个脉冲所代表的计量数量。
          required: false
          type: float
          default: 1.0
        time_unit:
          description: 计算速率时使用的时间单位（`s`、`min` 或 `h`）
          required: false
          type: string
          default: s
```
