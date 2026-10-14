# Buienradar

**Buienradar** 集成使用 [buienradar.nl](https://buienradar.nl/) 作为您所在位置当前气象数据的来源。天气预报由 Buienradar 提供，它为荷兰用户提供详细的天气信息服务。

将根据 Home Assistant 配置中指定的位置（或在 Buienradar 天气/传感器集成中）自动选择相关的气象站。所有可用气象站的地图可以在[这里](https://www.google.com/maps/d/embed?mid=1NivHkTGQUOs0dwQTnTMZi8Uatj0)找到。

除了天气平台，目前还支持以下额外的设备类型：

* [摄像头](#camera)：雷达图
* [传感器](#sensor)：扩展天气数据

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 摄像头

`buienradar` 摄像头平台使用 [buienradar.nl](https://buienradar.nl/) 作为最近降雨雷达图的来源。整个荷兰的概览图像被加载并作为摄像头显示在 Home Assistant 中。荷兰是默认国家，可以更改为比利时（参见[选项](#options)）。

在内部，此集成使用 buienradar.nl 上[文档化](https://www.buienradar.nl/overbuienradar/gratis-weerdata)的雷达图像。
下载的图像会被缓存，以防止 Home Assistant 在检查摄像头新图像时每分钟多次向 buienradar.nl 发出新请求。

摄像头实体默认禁用，应在读取摄像头图像之前[启用](/home-assistant/common-tasks/general/index.md#enabling-entities)。

## 传感器

**Buienradar** 集成将设置单独的传感器实体，提供更详细的天气数据。所选气象站将提供所有天气数据，但预报降水量除外。预报降水量数据将使用您的实际 GPS 位置（而不是最近气象站的位置）从 Buienradar 获取。传感器实体默认禁用，应在更新数据之前启用。

将创建以下实体：

* **站点名称**：所选气象站的名称
* **气压预报**：数值气压预报（1 到 7）
* **气压预报名称**：气压预报的文字表示（例如：雷暴、稳定等）
* **状况代码**：标识当前天气状况的符号和唯一代码
  * `a`：晴朗/晴
  * `b`：晴和中等或低云的混合
  * `j`：晴和高云的混合
  * `o/r`：多云（字符递增表示状况增强）
  * `c`：阴天
  * `p`：多云
  * `d`：交替多云，局部有雾
  * `n`：晴朗，局部有雾或薄雾
  * `f`：交替多云，有小雨
  * `h/k/l`：下雨（字符递增表示状况增强）
  * `q`：阴天有雨
  * `w`：阴天有雨和冬季降水
  * `m`：阴天有小雨
  * `u`：多云有小雪
  * `i/v`：阴天有小雪（字符递增表示状况增强）
  * `t`：（大雪）
  * `g`：（晴朗，可能有强闪电）
  * `s`：（多云，可能有强雷阵雨）
* **状况**：符号和当前天气状况（`clear`、`cloudy`、`fog`、`rainy`、`snowy` 或 `lightning`）
* **详细状况**：符号和详细的当前天气状况（`clear`、`partlycloudy`、`cloudy`、`partlycloudy-fog`、`partlycloudy-light-rain`、`partlycloudy-rain`、`light-rain`、`rainy`、`snowy-rainy`、`partlycloudy-light-snow`、`partlycloudy-snow`、`light-snow`、`snowy`、`partlycloudy-lightning` 或 `lightning`）
* **精确状况**：带有完整当前天气状况的符号（英文）
* **符号**：当前天气的符号和完整当前状况（荷兰语）
* **体感温度**：当前风寒指数（[°C](https://en.wikipedia.org/wiki/Celsius)）
* **湿度**：相对湿度（%）
* **温度**：当前温度（[°C](https://en.wikipedia.org/wiki/Celsius)）
* **地面温度**：当前地面温度（[°C](https://en.wikipedia.org/wiki/Celsius)）
* **风速**：风速（[km/h](https://en.wikipedia.org/wiki/Kilometres_per_hour)）
* **风力**：风速/风力（[Bft](https://en.wikipedia.org/wiki/Beaufort_scale)）
* **风向**：风的来向：N（北）、Z（南）、NO（东北）等
* **风向方位角**：风的来向角度，正北为 0°，顺时针递增
* **气压**：海平面气压（[hPa](https://en.wikipedia.org/wiki/Hectopascal)）
* **能见度**：能见度（[m](https://en.wikipedia.org/wiki/Metre)）
* **阵风**：阵风风速（[km/h](https://en.wikipedia.org/wiki/Kilometres_per_hour)）
* **降水量**：降水量/雨量（mm/h）
* **预报降水平均值**：给定时间范围内预期的平均降水量/雨量（mm/h）
* **预报降水总量**：给定时间范围内预期的总降水量/雨量（mm）。配置时间范围内预期的总降雨量等于 *precipitation\_forecast\_total*/*timeframe* mm/min。因此，时间范围配置为 30 分钟且值为 5 时，预期降雨量为 30 分钟内 5 mm，即 10 mm/h。如果时间范围设置为 90 分钟且值为 5，预期降雨量为 90 分钟内 5 mm，即 3.3 mm/h。
* **辐照度**：太阳强度，单位瓦特每平方米（[W/m2](https://en.wikipedia.org/wiki/W/m2)）
* **过去 24 小时降雨**：过去 24 小时的降雨量（[mm](https://en.wikipedia.org/wiki/Millimeter)）
* **过去 1 小时降雨**：过去 1 小时的降雨量（[mm](https://en.wikipedia.org/wiki/Millimeter)）
* **n 天后温度**：n 天后的预报温度（[°C](https://en.wikipedia.org/wiki/Celsius)）
* **n 天后最低温度**：n 天后的预报最低温度（[°C](https://en.wikipedia.org/wiki/Celsius)）
* **n 天后降雨概率**：n 天后的预报降雨概率（%）
* **n 天后晴天概率**：n 天后的预报晴天概率（%）
* **n 天后降雨量**：n 天后的预报降雨量（[mm](https://en.wikipedia.org/wiki/Millimeter)）；`n 天后最低降雨量` 和 `n 天后最高降雨量` 的平均值
* **n 天后最低降雨量**：n 天后的预报最低降雨量（[mm](https://en.wikipedia.org/wiki/Millimeter)）
* **n 天后最高降雨量**：n 天后的预报最高降雨量（[mm](https://en.wikipedia.org/wiki/Millimeter)）
* **n 天后风向方位角**：n 天后风的来向角度，正北为 0°，顺时针递增（从`n 天后风向`派生）
* **n 天后风向**：n 天后风的来向：N（北）、Z（南）、NO（东北）等
* **n 天后风力**：n 天后的预期风力（[Bft](https://en.wikipedia.org/wiki/Beaufort_scale)）
* **n 天后风速**：n 天后的预期风速（[m/s](https://en.wikipedia.org/wiki/M/s)）（从`n 天后风力`派生）
* **n 天后状况代码**：n 天后预期状况的符号和状况代码
* **n 天后状况**：n 天后预期状况的符号
* **n 天后详细状况**：n 天后详细预期状况的符号
* **n 天后完整状况**：n 天后完整预期状况的符号

## Options

To define options for Buienradar, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of Buienradar are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
country_code:
  description: 您可以指定要在摄像头上显示的国家代码（NL 或 BE）。
delta:
  description: 摄像头图像更新之间的时间间隔（秒）
timeframe:
  description: 降水预报传感器的预测时间范围（分钟）（最小 5，最大 120）。
```

:::note
**使用声明**
Buienradar 向个人和企业（网站/内联网）提供免费天气数据。天气数据的使用仅限于**非商业目的**。请参阅[完整使用声明](https://www.buienradar.nl/overbuienradar/gratis-weerdata)以确认您的使用或请求许可。

:::
