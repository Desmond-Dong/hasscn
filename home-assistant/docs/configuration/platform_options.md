# 实体集成平台选项

:::important
这些选项正在逐步淘汰，仅适用于单平台集成。
:::

某些集成或平台（那些基于[实体](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/helpers/entities.py)类的）允许设置各种额外选项。

## 实体命名空间

通过设置实体命名空间，所有实体都将带有该命名空间前缀。这样，`light.bathroom` 可以变为 `light.holiday_house_bathroom`。

```yaml
# Example configuration.yaml entry
light:
  - platform: your_lights
    entity_namespace: holiday_house
```

## 扫描间隔

需要轮询的平台将按照主集成指定的间隔进行轮询。例如，灯光将每 30 秒检查一次状态变化。可以通过指定 `scan_interval` 配置键来覆盖任何被轮询平台的扫描间隔。在下面的示例中，我们设置了 `your_lights` 平台，但告诉 Home Assistant 每 10 秒轮询一次设备，而不是默认的 30 秒。

```yaml
# Example configuration.yaml entry to poll your_lights every 10 seconds.
light:
  - platform: your_lights
    scan_interval: 10
```
