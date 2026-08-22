---
title: "如果是轮询集成，设置合适的轮询间隔"
sidebar_label: 🥉 appropriate-polling
related_rules:
  - parallel-updates
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

在理想世界中，所有集成都会使用基于推送的数据接口，即设备或服务会在有新数据时通知我们。
这样可以减少 Home Assistant 发出的请求数量。

然而，在现实世界中，许多设备和服务无法进行基于推送的通信，因此我们必须使用轮询。
为了负责任地进行轮询，我们应该设置一个适用于大多数用户的合适轮询间隔。

实际上并没有明确的定义来界定什么是合适的轮询间隔，因为它取决于被轮询的设备或服务。
例如，我们不应该每 5 秒轮询一次空气质量传感器，因为数据不会变化那么频繁。
在这些情况下，超过 99% 的用户都会接受一分钟或更长的轮询间隔。

再举一个例子，如果我们轮询一个云服务的太阳能板数据，而数据每小时更新一次。
每分钟轮询一次是没有意义的，因为两次轮询之间数据不会改变。

对于确实希望更频繁更新的用户，他们可以[定义自定义轮询间隔](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval)

## 示例实现

有两种方式设置轮询间隔。
使用哪种方式取决于集成如何轮询数据。
当使用 update coordinator 时，可以通过在 coordinator 中设置 `update_interval` 参数或属性来设置轮询间隔。
当使用内置的 entity update 方法时，通过设置 `should_poll` entity 属性为 `True`，可以在 platform 模块中设置 `SCAN_INTERVAL` 常量来设置轮询间隔。

`coordinator.py`:
```python {10} showLineNumbers
class MyCoordinator(DataUpdateCoordinator[MyData]):
    """Class to manage fetching data."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize coordinator."""
        super().__init__(
            hass,
            logger=LOGGER,
            name=DOMAIN,
            update_interval=timedelta(minutes=1),
        )
```

`sensor.py`:
```python {1} showLineNumbers
SCAN_INTERVAL = timedelta(minutes=1)

class MySensor(SensorEntity):
    """Representation of a Sensor."""

    _attr_should_poll = True
```

## 更多资源

关于轮询的更多信息，请参见[文档](/developers/integration_fetching_data)。

## 例外

此规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
