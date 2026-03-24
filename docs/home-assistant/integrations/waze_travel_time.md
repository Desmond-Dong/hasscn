---
title: Waze Travel Time
description: 关于如何将 Waze 行程时间添加到 Home Assistant 的说明。
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.67
ha_config_flow: true
ha_domain: waze_travel_time
ha_platforms:
  - sensor
ha_codeowners:
  - '@eifinger'
ha_integration_type: service
---

**Waze Travel Time** 集成可从 [Waze](https://www.waze.com/) 获取行程时间。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

说明：

- 如果未指定单位制，此集成会使用 Home Assistant 实例中配置的单位制。
- **Origin** 和 **Destination** 可以是地址，也可以是 GPS 坐标。坐标请使用如下格式：`52.5200, 13.4050`。请确保坐标之间以逗号分隔，且不能包含字母。您也可以输入一个在状态中提供这些信息的实体 ID、一个带有经纬度属性的实体 ID，或区域的友好名称（区分大小写）。
- `incl_filter`/`excl_filter` 可让您在路线时间计算中强制使用某条特定路线，或避开某条特定路线。这些输入必须与街道名称完全一致，包括大小写、空格和特殊字符。您可以使用 [`waze_travel_time.get_travel_times`](#action-waze_travel_timeget_travel_times) 操作来获取每条路线的精确街道名称。
- 使用 `Avoid Toll Roads?`、`Avoid Subscription Roads?` 和 `Avoid Ferries?` 选项时，请注意：如果 Waze 认为您拥有有效的收费道路通行资格或订阅，它有时仍可能为您规划经过收费道路或渡轮的路线。默认行为是 Waze 会规划经过带订阅选项的道路。因此，如有需要，最好同时设置 `Avoid Toll Roads?` 与 `Avoid Subscription Roads?`，或设置 `Avoid Ferries?`，并通过实际测试确认结果是否符合预期。

## 操作 `waze_travel_time.get_travel_times`

此服务会填充 [response data](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data)，返回两个地点之间的备选路线和行程时间。

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `origin` | no | The origin of the route | "51.330436, 3.802043", "person.fred" |
| `destination` | no | The destination of the route | "51.330436, 3.802043", "zone.work", "Work" |
| `region` | no | The region. Controls which waze server is used. | "us" |
| `units` | yes | Which unit system to use | metric |
| `vehicle_type` | yes | Which vehicle to use | "car" |
| `incl_filter` | yes | Exact streetname which must be part of the selected route | "L3482 - Wiesbadener Straße" |
| `excl_filter` | yes | Exact streetname which must NOT be part of the selected route | "L3482 - Wiesbadener Straße" |
| `realtime` | yes | Use real-time or statistical data | True |
| `avoid_toll_roads` | yes | Whether to avoid toll roads | True |
| `avoid_ferries` | yes | Whether to avoid ferries | True |
| `avoid_subscription_roads` | yes | Whether to avoid subscription roads | True |

```yaml
action: waze_travel_time.get_travel_times
data:
  origin: "51.330436, 3.802043"
  destination: "51.445677, 3.749929"
  region: "eu"
response_variable: routes
```

<details>
<summary>操作响应示例</summary>


```yaml
waze_travel_time.get_travel_times:
  routes:
    - duration: 16.15
      distance: 13.942
      name: B455 - Boelckestraße Wiesbaden
      street_names:
        - Eleonorenstraße
        - Wiesbadener Straße
        - L3482 - Wiesbadener Straße
        - Otto-Suhr-Ring
        - Boelckestraße
        - B455 - Boelckestraße
        - A66 > Frankfurt am Main / Köln
        - A66
        - AS 8 Wallau
        - L3017
        - Diedenberger Straße
        - L3017 - Diedenberger Straße
        - K785 - Diedenberger Straße
        - Hessenstraße
        - Robert-Bosch-Straße
        - Nassaustraße
        - Johannes-Gutenberg-Straße
    - duration: 16.9
      distance: 15.319
      name: L3482 - Wiesbadener Landstraße Wiesbaden
      street_names:
        - Eleonorenstraße
        - Wiesbadener Straße
        - L3482 - Wiesbadener Straße
        - Wiesbadener Landstraße
        - L3482 - Wiesbadener Landstraße
        - Kasteler Straße
        - L3482 - Kasteler Straße
        - Mainzer Straße
        - K650 - Mainzer Straße
        - "> A66 / Wiesbaden-Stadtmitte"
        - A66 > Frankfurt / Hannover
        - A66
        - AS 8 Wallau
        - L3017
        - Diedenberger Straße
        - L3017 - Diedenberger Straße
        - K785 - Diedenberger Straße
        - Hessenstraße
        - Robert-Bosch-Straße
        - Nassaustraße
        - Johannes-Gutenberg-Straße
```


</details>

## 自定义轮询间隔

如果您想为设备设置特定的数据轮询间隔，可以禁用默认轮询间隔，并创建自己的轮询自动化。

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后选择您的集成。
2. 在集成条目上，选择 `[mdi:dots-vertical]`。
   - 然后选择 **系统选项**，并切换按钮以禁用轮询。
   ![Disable polling for updates](/home-assistant/images/screenshots/custom_polling_01.png)
3. 要定义自定义轮询间隔，请创建一个自动化。
   - 前往 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automations/) 并创建一个新的自动化。
   - 根据需要定义触发器和条件。
   - 选择 **添加操作**，然后选择 **其他操作**。
   - 选择 **执行操作**，并从列表中选择 [`homeassistant.update_entity` 操作](/home-assistant/integrations/homeassistant/#action-homeassistantupdate_entity)。
   - 通过选择 **选择区域**、**选择设备**、**选择实体** 或 **选择标签** 按钮来设置目标。
   ![Update entity](/home-assistant/images/screenshots/custom_polling_02.png)
4. 保存新的自动化，以按设定间隔轮询数据。

## 使用动态目的地的示例

通过灵活地将某个传感器值设置为 `Destination`，您可以只配置一个 Waze 集成，并按需计算前往多个可选地点的行程时间。

在下面的示例中，`Input Select` 会被转换为地址，并用于修改从 `device_tracker.myphone` 位置出发时 Waze 路线计算的目的地。由于 Waze 数据获取有固定间隔，因此数值更新可能需要几分钟。


```yaml
input_select:
  destination:
    name: destination
    options:
      - Home
      - Work
      - Parents

template:
  - sensor:
     - name: "Destination address"
       state: >-
          {%- if is_state("input_select.destination", "Home")  -%}
            725 5th Ave, New York, NY 10022, USA
          {%- elif is_state("input_select.destination", "Work")  -%}
            767 5th Ave, New York, NY 10153, USA
          {%- elif is_state("input_select.destination", "Parents")  -%}
            178 Broadway, Brooklyn, NY 11211, USA
          {%- else -%}
            Unknown
          {%- endif %}

```


### 支持的多种配置方式

#### 从实体到实体的跟踪

在此示例中，我们使用一个 device_tracker 实体 ID 作为起点，并使用上面创建的传感器作为终点。

  - Name: "Me to some destination"
  - Origin: `device_tracker.myphone`
  - Destination: `sensor.dest_address`
  - Region: "US"

#### 从实体到区域友好名称的跟踪

在此示例中，我们使用一个区域的实体 ID 作为起点，并使用某个区域的友好名称作为终点。

  - Name: "Home to Eddie's house"
  - Origin: `zone.home`
  - Destination: "Eddies House"
  - Region: "US"

#### 使用英制单位跟踪实体

  - Name: "Somewhere in New York"
  - Origin: `person.paulus`
  - Destination: "725 5th Ave, New York, NY 10022, USA"
  - Region: "US"
  - Units: "imperial"
  - Vehicle Type: "motorcycle"

#### 避开收费道路和订阅道路

  - Name: "Westerscheldetunnel"
  - Origin: "51.330436, 3.802043"
  - Destination: "51.445677, 3.749929"
  - Region: "EU"
  - Avoid Toll Roads: `True`
  - Avoid Subscription Roads: `True`

## 在 iFrame 中使用实时地图

如果您打算在仪表板 [iframe](/home-assistant/dashboards/iframe/) 中使用 [Waze 的实时地图](https://developers.google.com/waze/iframe/)，请使用 [https://embed.waze.com/iframe](https://embed.waze.com/iframe)，而不是实时地图页面本身的 URL。
