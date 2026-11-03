# Norwegian Institute for Air Research (NILU)

The **NILU** integration shows measurements of current air quality from NILU (Norsk Institutt for luftforskning/Norwegian Institute for Air Research) sensor stations within Norway. Makes data from the open API at [luftkvalitet.info](https://www.luftkvalitet.info) and [nilu.no](https://nilu.no/) available in Home Assistant.

## Configuration

To enable this integration, add the following lines to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/index.md#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# Example configuration.yaml entry
air_quality:
  - platform: nilu
```

```yaml
latitude:
  description: Manually specify latitude. By default, the value will be taken from the Home Assistant configuration.
  required: false
  type: float
  default: Provided by Home Assistant configuration.
longitude:
  description: Manually specify longitude. By default, the value will be taken from the Home Assistant configuration.
  required: false
  type: float
  default: Provided by Home Assistant configuration.
name:
  description: Name of the sensor to use in the frontend.
  required: false
  default: NILU
  type: string
area:
  description: Name of an area to get sensor stations from. See available areas below.
  required: exclusive
  type: string
stations:
  description: Name of a specific station to get measurements from.
  required: exclusive
  type: string
show_on_map:
  description: Option to show the position of the sensor station on the map.
  required: false
  default: false
  type: boolean
```

## 健康风险指数解释

在尼鲁站的属性下，会有一个“尼鲁污染指数”。这表明传感器站周围区域的空气污染程度。以下是对索引含义的详细解释。

### Low

与测量到的空气污染相关的健康风险较低或没有。建议户外活动。

### Moderate

一些哮喘患者和患有其他呼吸系统疾病以及严重心血管疾病的人可能会受到健康影响。可以建议绝大多数人进行户外活动，但有些人应该考虑在人流量大或排放量大的地区进行活动。

### High

哮喘患者和患有其他呼吸系统疾病以及严重心血管疾病的人可能会对健康产生影响。患有呼吸窘迫（哮喘、支气管炎）的儿童和患有严重心脏或呼吸窘迫的成人应减少户外活动，不要留在污染最严重的地区。

### Extremely high

人口中的敏感群体可能会对健康产生影响。健康受试者可能会出现呼吸道刺激和不适。患有心脏或呼吸困难的人应减少户外活动，不要留在污染最严重的地区。

资料来源：[健康建议和污染等级](https://luftkvalitet.miljodirektoratet.no/artikkel/en/articles/health-recommendations-and-pollution-classes/)

## Available areas

“区域”配置仅限于 NILU 定义的区域。以下是可用区域的列表：

* “卑尔根”
  -`勃肯鞋`
  -`博德`
  -“布鲁蒙达尔”
  -“巴鲁姆”
  -“德拉门”
* `Elverum`
  -“腓特烈斯塔”
  -`约维克`
* “格伦兰”
  -“哈尔登”
  -“哈马尔”
  -“哈尔斯塔”
* “胡达尔”
* “卡拉绍克”
* “克里斯蒂安桑”
* `Kårvatn`
  -“利勒哈默尔”
* “利勒桑”
* “利勒斯特罗姆”
* `洛伦斯科格`
* 《摩伊拉纳》
  -`苔藓`
  -“纳尔维克”
  -“奥斯陆”
* “普雷斯特巴克”
  -“桑德维”
  -“萨普斯堡”
  -“斯塔万格”
* “南瓦朗厄尔”
* “特罗姆瑟”
  -“特隆赫姆”
* “塔斯特湖”
* “齐柏林飞艇”
* “奥勒松”

## Configuration examples

从 Home Assistant 位置周围的传感器站添加健康风险监控的示例。

```yaml
# Example configuration.yaml entry
# Adds all sensor stations within 20km.
air_quality:
  - platform: nilu
```

传感器也添加到地图中的示例。

```yaml
# Example configuration.yaml entry
# Adds all sensor stations within 20km.
# Additionally adds the sensors to the map.
air_quality:
  - platform: nilu
    show_on_map: True
```

特定电台的示例。

```yaml
# Example configuration.yaml entry
# Monitors stations 'Alnabru'
air_quality:
  - platform: nilu
    stations:
      - Alnabru
```

从指定区域获取站点并为传感器指定自定义名称的示例。

```yaml
# Example configuration.yaml entry
# Stations from specific area, 'Bergen'
# Custom name for the sensors.
air_quality:
  - platform: nilu
    area: Bergen
    name: Forurensing Bergen
```
