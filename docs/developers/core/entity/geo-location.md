---
title: Geolocation 实体
sidebar_label: Geolocation
---

Geolocation 实体表示一个与位置相关联的外部事件，例如地震、野火或外部 feed 发布的其他兴趣点。每个实体都携带坐标，通常显示为地图上的标记。

Geolocation 实体派生自 [`homeassistant.components.geo_location.GeolocationEvent`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/geo_location/__init__.py)。

## 状态

Geolocation 实体的状态是事件位置到 Home Assistant 实例配置的 home location 的距离，四舍五入到一位小数。状态由基类实体管理，无法覆盖；应设置 `distance` 属性。距离的单位通过标准的 `unit_of_measurement` 属性声明。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称      | 类型            | 默认值      | 描述                                                                    |
| --------- | --------------- | ------------ | ------------------------------------------------------------------------------ |
| source    | `str`           | **必填** | 事件的来源，通常是提供该事件集成的 domain。     |
| distance  | `float \| None` | `None`       | 从 home location 到事件的距离，单位为 `unit_of_measurement`。        |
| latitude  | `float \| None` | `None`       | 事件的纬度。                                                         |
| longitude | `float \| None` | `None`       | 事件的经度。                                                        |

所有实体共有的其他属性（如 `icon`、`name` 等）也适用。

`latitude`、`longitude` 和 `source` 值会自动作为状态属性暴露；坐标四舍五入到五位小数。

## 生命周期

与大多数实体不同，geolocation 实体通常表示短期外部事件，而不是设备：集成在新事件出现在外部 feed 中添加实体，并在事件不再被报告时将其移除。常见的模式是一个管理器订阅 feed 更新，并在每次更新时为新事件添加实体、更新现有实体，并通过调用其 `async_remove(force_remove=True)` 方法来移除已消失事件的实体——`force_remove` 标志确保已注册的实体从状态机中完全移除，而不是作为不可用而滞留。使用唯一 ID 创建的实体也应移除其 entity registry 条目。

[GDACS integration](https://github.com/home-assistant/core/blob/dev/homeassistant/components/gdacs/geo_location.py) 是此模式的示例，[demo platform](https://github.com/home-assistant/core/blob/dev/homeassistant/components/demo/geo_location.py) 提供了最小实现。
