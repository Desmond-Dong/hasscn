# IamMeter

[IAMMETER](https://www.iammeter.com/) 提供双向单相电表（[WEM3080](https://www.iammeter.com/products/single-phase-meter)）和双向三相电力监测器（[WEM3080T](https://www.iammeter.com/products/three-phase-meter)）。这两种设备都可以集成到 Home Assistant。
[WEM3050T](https://www.iammeter.com/products/3phase-meter-3050t) 是 IAMMETER 于 2023 年 11 月发布的最新三相/分相电表。
除云服务外，WEM3050T 几乎提供了 WEM3080T 的所有功能。
WEM3050T 可通过 WEM3080T 支持的[所有方法](https://community.home-assistant.io/t/485520)集成到 Home Assistant。
由于默认不提供云服务，WEM3050T 的价格远低于 WEM3080T。

## 配置

要在您的安装中使用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: iammeter
    host: IP_ADDRESS_OF_HOST
```

```yaml
host:
  description: IAMMETER 的 IP 地址。
  required: true
  type: string
port:
  description: IAMMETER 的端口。
  required: false
  default: 80
  type: integer
name:
  description: 传感器实体的名称。
  required: false
  type: string
  default: IamMeter
```

## 传感器

此库中可用的传感器：

### 单相电表（WEM3080/WEM3162）

| name                 | Unit | Description                  |
| -------------------- | ---- | :--------------------------- |
| wem3080\_voltage      | V    | Voltage.                     |
| wem3080\_current      | A    | current.                     |
| wem3080\_power        | W    | active power.                |
| wem3080\_importenergy | kWh  | Energy consumption from grid |
| wem3080\_exportgrid   | kWh  | Energy export to grid        |

### 三相电表（WEM3080T）

| name                    | Unit | Description           |
| ----------------------- | ---- | :-------------------- |
| wem3080t\_voltage\_a      | V    | A phase voltage       |
| wem3080t\_current\_a      | A    | A phase current       |
| wem3080t\_power\_a        | W    | A phase active power  |
| wem3080t\_importenergy\_a | kWh  | A phase import energy |
| wem3080t\_exportgrid\_a   | kWh  | A phase export energy |
| wem3080t\_frequency\_a    | Hz   | A phase frequency     |
| wem3080t\_pf\_a           |      | A phase power factor  |
|                         |      |                       |
| wem3080t\_voltage\_b      | V    | B phase voltage       |
| wem3080t\_current\_b      | A    | B phase current       |
| wem3080t\_power\_b        | W    | B phase active power  |
| wem3080t\_importenergy\_b | kWh  | B phase import energy |
| wem3080t\_exportgrid\_b   | kWh  | B phase export energy |
| wem3080t\_frequency\_b    | Hz   | B phase frequency     |
| wem3080t\_pf\_b           |      | B phase power factor  |
|                         |      |                       |
| wem3080t\_voltage\_c      | V    | C phase voltage       |
| wem3080t\_current\_c      | A    | C phase current       |
| wem3080t\_power\_c        | W    | C phase active power  |
| wem3080t\_importenergy\_c | kWh  | C phase import energy |
| wem3080t\_exportgrid\_c   | kWh  | C phase export energy |
| wem3080t\_frequency\_c    | Hz   | C phase frequency     |
| wem3080t\_pf\_c           |      | C phase power factor  |
