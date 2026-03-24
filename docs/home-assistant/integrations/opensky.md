---
title: OpenSky Network
description: 有关如何将 OpenSky Network 集成到 Home Assistant 的说明。
ha_category:
  - Transport
ha_release: 0.43
ha_iot_class: Cloud Polling
ha_domain: opensky
ha_platforms:
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@joostlek'
ha_config_flow: true
---


**OpenSky** 集成允许您跟踪指定区域上空的航班。它使用来自 [OpenSky Network](https://opensky-network.org/) 公共 API 的众包数据，并会在航班进入或离开定义区域时触发 Home Assistant 事件。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
latitude:
  description: 要跟踪区域中心点的纬度。默认使用家庭位置的纬度。
longitude:
  description: 要跟踪区域中心点的经度。默认使用家庭位置的经度。
radius:
  description: 围绕该纬度/经度点进行跟踪的半径，单位为米。
altitude:
  description: 跟踪飞机的最大高度，单位为米。不填（或填 0）表示跟踪该区域内的所有飞机。
```

## 身份验证

默认每 15 分钟轮询一次，以避免触及 API 限制。

经过身份验证的用户可以使用更多 API 请求额度。

您可以在集成设置完成后添加凭据。

## 事件

- **opensky_entry**：当航班进入区域时触发。
- **opensky_exit**：当航班离开区域时触发。

两个事件都具有以下共同属性：

- **sensor**：触发事件的 `opensky` 传感器名称。
- **callsign**：航班呼号。

**opensky_entry** 还包含 4 个额外属性：

- **altitude**：航班高度，单位为米。
- **latitude**：航班纬度，十进制度数。
- **longitude**：航班经度，十进制度数。
- **icao24**：飞机应答机的 ICAO 24 位地址。

要通过 [Home Assistant Companion App](https://companion.home-assistant.io/) 接收航班进入区域的通知，请将以下内容添加到您的 `configuration.yaml` 文件中：


```yaml
automation:
  - alias: "Flight entry notification"
    triggers:
      - trigger: event
        event_type: opensky_entry
    actions:
      - action: notify.mobile_app_<device_name>
        data:
          message: "Flight entry of {{ trigger.event.data.callsign }}"
```


您还可以使用 `icao24` 标识生成 OpenSky 网站的直接链接，以查看该航班：


```yaml
automation:
  - alias: "Flight entry notification"
    triggers:
      - trigger: event
        event_type: opensky_entry
    actions:
      - action: notify.mobile_app_<device_name>
        data:
          message: "Flight entry of {{ trigger.event.data.callsign }}"
          data:
            actions:
              - action: URI
                title: "Track the flight"
                uri: >-
                  https://opensky-network.org/aircraft-profile?icao24={{
                  trigger.event.data.icao24 }}
```

