# air-Q

**air-Q** 集成允许将您的 [air-Q](https://www.air-q.com/) 设备提供的传感器集成到 Home Assistant 中。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

在初始配置期间，系统会提示用户输入设备的 IP 地址或序列号的前 5 个字符，以及设备密码。

要使此集成与设备通信，两者必须连接到同一个 Wi-Fi 网络。

设置完成后，将为您的设备中发现的每个传感器创建单独的实体。

## 传感器

目前，集成支持以下传感器：

| 传感器名称          | 测量单位 |
|----------------------|---------------------|
| Acetaldehyde         | µg/m³               |
| Ammonia              | µg/m³               |
| Arsine               | µg/m³               |
| Bromine              | µg/m³               |
| CH4S                 | µg/m³               |
| Chlorine             | µg/m³               |
| ClO2                 | µg/m³               |
| CO                   | mg/m³               |
| CO2                  | ppm                 |
| CS2                  | µg/m³               |
| Dew Point            | °C                  |
| Ethanol              | µg/m³               |
| Ethylene             | µg/m³               |
| Formaldehyde         | µg/m³               |
| F2                   | µg/m³               |
| H2S                  | µg/m³               |
| HCl                  | µg/m³               |
| HCN                  | µg/m³               |
| HF                   | µg/m³               |
| Health Index         | %                   |
| Humidity (relative)  | %                   |
| Absolute Humidity    | g/m³                |
| Hydrogen             | µg/m³               |
| Hydrogen Peroxide    | µg/m³               |
| Methane              | %                   |
| Mold Index           | %                   |
| N2O                  | µg/m³               |
| NO                   | µg/m³               |
| NO2                  | µg/m³               |
| Organic Acid         | ppb                 |
| Oxygen               | µg/m³               |
| Ozone                | µg/m³               |
| Performance Index    | %                   |
| PH3                  | µg/m³               |
| PM1, PM25, PM10      | µg/m³               |
| Pressure             | hPa                 |
| Relative Pressure    | hPa                 |
| Propane              | %                   |
| Refrigerant R-32     | %                   |
| Refrigerant R-454B   | %                   |
| Refrigerant R-454C   | %                   |
| SiH4                 | µg/m³               |
| SO2                  | µg/m³               |
| Noise                | dBa                 |
| Noise (Maximum)      | dBa                 |
| Radon                | Bq/m³               |
| Temperature          | °C                  |
| Virus Index          | %                   |
| VOC                  | ppb                 |
| VOC (Industrial)     | ppb                 |

PM1、PM25 和 PM10 分别对应直径小于 1µm、2.5µm 和 10µm 的颗粒物浓度

### 虚拟传感器和指数

所有四个支持的指数——健康、性能、霉菌和病毒——都在一致的范围内运行：**0%（高风险）** 到 **100%（无风险/最佳）。**

* **病毒指数**：使用 CO2 作为气溶胶负荷的代理指标。它评估房间通风是否充分，以最大限度地减少空气传播病原体传播的风险。
* **霉菌指数**：通过分析温度和相对湿度趋势来评估霉菌形成的长期风险。
* **激活**：虚拟传感器如"相对气压"、"病毒指数"和"霉菌指数"默认处于停用状态。您可以在 air-Q 移动应用程序的 **设置** > **传感器** 中启用它们。

## 附加配置

集成初始化完成后，用户可以配置以下两个参数：

* **显示设备平均值**。默认值：`on`。在默认配置中，air-Q 会对传感器值流进行平均。此平均强度可在设备端配置（不通过 HA 暴露）。但是，此集成允许在从设备轮询平均数据和原始数据之间切换。要从设备轮询有噪声的传感器读数，请将**显示设备平均值**设置为 `off`。

* **裁剪负值**。默认值：`on`。出于基线校准目的，某些传感器值可能会短暂变为负值。默认行为是将此类值裁剪为 0。

## LED 控制

除了传感器读数外，此集成还将设备 LED 灯带的亮度公开为名为 `number.<device_name>_led_brightness` 的 `number` 实体。您可以从概览面板或自动化中手动设置亮度（0–100）。将其设置为 0 将关闭 LED。

## 故障排除

在排除故障或报告问题时，请启用[调试日志](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)并重新启动集成。问题再次出现后，停止调试日志，这将触发调试日志文件的下载。
启用调试日志会对系统性能产生轻微影响，不建议长期使用。
