---
title: OpenUV
description: 有关如何将 OpenUV 集成到 Home Assistant 中的说明。
ha_category:
  - Binary sensor
  - Health
  - Sensor
ha_release: 0.76
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: openuv
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: service
---


**OpenUV** 集成会显示来自 [openuv.io](https://www.openuv.io/) 的紫外线和臭氧数据。

:::warning
本文档中的指导信息仅为估算值，旨在帮助您做出更明智的判断。它们不应替代经过专业训练的医疗人员提供的分析、建议或诊断。

:::
## 生成 API 密钥

要生成 API 密钥，请登录 [OpenUV 网站](https://www.openuv.io/)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

| Name                           | Type          | Value                                                                                                                       |
| ------------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Current Ozone Level            | Sensor        | ozone level in du (Dobson Units)                                                                                            |
| Current UV Index               | Sensor        | UV Index (numerical value)                                                                                                  |
| Current UV Level               | Sensor        | UV Level (as literal)                                                                                                       |
| Max UV Index                   | Sensor        | max UV Index for the day (at solar noon)                                                                                    |
| Protection window              | Binary sensor | whether sunblock protection should be used                                                                                  |
| Skin Type 1 Safe Exposure Time | Sensor        | the amount of time [Fitzpatrick skin type 1](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 2 Safe Exposure Time | Sensor        | the amount of time [Fitzpatrick skin type 2](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 3 Safe Exposure Time | Sensor        | the amount of time [Fitzpatrick skin type 3](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 4 Safe Exposure Time | Sensor        | the amount of time [Fitzpatrick skin type 4](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 5 Safe Exposure Time | Sensor        | the amount of time [Fitzpatrick skin type 5](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |
| Skin Type 6 Safe Exposure Time | Sensor        | the amount of time [Fitzpatrick skin type 6](https://en.wikipedia.org/wiki/Fitzpatrick_scale) can be in the sun unprotected |

## 更新数据

:::important
OpenUV _不会_自动更新其实体的数据！您必须通过 `homeassistant.update_entity` 动作手动更新数据。

:::
自 2019 年 2 月 1 日起，“Limited” 方案（也是新用户默认获得的方案）每天最多只能发起 50 次 API 请求。由于不同 API 套餐和不同地理位置的需求并不相同，OpenUV 集成在首次加载后不会自动查询 API 以获取新数据。若要请求新数据，应使用 `homeassistant.update_entity` 动作。

请注意，对于 UV 和臭氧数据，只要选择以下任意一个实体：

- Current Ozone Level
- Current UV Index
- Current UV Level
- Max UV Index
- Skin Type 1 Safe Exposure Time
- Skin Type 2 Safe Exposure Time
- Skin Type 3 Safe Exposure Time
- Skin Type 4 Safe Exposure Time
- Skin Type 5 Safe Exposure Time
- Skin Type 6 Safe Exposure Time

……作为 `homeassistant.update_entity` 动作的目标，就会更新这些实体中 _全部_ 的数据。

为避免浪费 API 调用次数，所有引用 OpenUV 实体的 `homeassistant.update_entity` 调用都被限制为至少间隔 15 分钟。

### 防护时段

当应当使用防晒保护时，Protection Window 二进制传感器会变为 `on`。

默认情况下，只要 UV 指数高于 3.5，就会进入该状态。您可以在 UI 中通过配置条目选项来调整此行为，相关参数有两个：

- `Starting UV index for the protection window`：当 UV 指数超过该值时，表示应启用防护。
- `Ending UV index for the protection window`：当 UV 指数低于该值时，表示不再需要防护。

## 更新数据示例

当太阳高度至少高于地平线 10 度时，每 20 分钟更新一次 UV 指数数据：


```yaml
automation:
  - alias: "Update OpenUV"
    triggers:
      - trigger: time_pattern
        minutes: "/20"
    conditions:
      - condition: numeric_state
        entity_id: sun.sun
        value_template: "{{ state.attributes.elevation }}"
        above: 10
    actions:
      - action: homeassistant.update_entity
        target:
          entity_id: sensor.LATITUDE_LONGITUDE_current_uv_index
```


每天中午 12:00 更新一次防护时段：

```yaml
automation:
  - alias: "Update OpenUV"
    triggers:
      - trigger: time
        at: "12:00:00"
    actions:
      - action: homeassistant.update_entity
        target:
          entity_id: binary_sensor.LATITUDE_LONGITUDE_protection_window
```

如果您所在地区的白昼时长变化较大，并希望更合理地安排 API 调用次数，就需要知道一年中白昼最长那一天的总日照时数。例如，如果最长日照为 17 小时，那么您可以大约每 45 分钟调用 2 次，而不会触及每天 50 次的 API 限额：


```yaml
automation:
  - alias: "Update OpenUV"
    triggers:
      # Time pattern of /45 will not work as expected, as it will sometimes be true
      # twice per hour (on the whole hour and on the whole hour + 45 minutes); use a
      # more frequent time pattern and a condition to get the intended behavior:
      - trigger: time_pattern
        minutes: "/15"
    conditions:
      - condition: sun
        after: sunrise
        before: sunset
        # The last call will most likely fall before the sunset, leaving the UV index at
        # something other than 0 for the remainder of the night; to fix this, we allow
        # one more action after the sun has set:
        before_offset: "+00:45:00"
      - condition: template
        # We check if the last trigger has been 40 minutes or more ago so we don't run
        # into timing issues; by checking for 40 minutes or greater, we ensure this is
        # only true at the 45 minute mark:
        value_template: >- 
          {{
            state_attr('automation.update_openuv', 'last_triggered') == None
            or (
              now() - state_attr('automation.update_openuv', 'last_triggered')
            ) >= timedelta(hours = 0, minutes = 40)
          }}
    actions:
      - action: homeassistant.update_entity
        target:
          entity_id:
            # Update both UV and protection window data:
            - binary_sensor.LATITUDE_LONGITUDE_protection_window
            - sensor.LATITUDE_LONGITUDE_current_uv_index
```


## API 密钥过期与重新验证

在 OpenUV 中，`HTTP 403` 响应表示以下两种情况之一：

1. API 密钥无效。
2. API 密钥已达到每日或每月调用上限。

遗憾的是，集成无法根据 OpenUV 提供的 API 数据区分具体属于哪一种情况。因此会采用以下处理策略：

1. 任何 `HTTP 403` 响应都会创建一条持久通知，提示您重新验证 OpenUV 集成。
2. 如果只是 API 调用次数超限，那么一旦 `homeassistant.update_entity` 服务调用再次成功，已有的重新验证通知就会自动移除。

如果您收到重新验证通知，并且确定只是密钥达到了每日调用上限，那么可以放心忽略该通知。
