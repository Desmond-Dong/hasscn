# 如果是轮询集成，请设置适当的轮询间隔

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

在理想的情况下，所有集成都将具有基于推送的数据接口，其中设备或服务会让我们知道新数据何时可用。
这将减少 Home Assistant 发出的请求量。

然而，在现实世界中，许多设备和服务无法进行基于推送的通信，因此我们必须诉诸轮询。
为了负责任地做到这一点，我们应该设置一个适当的轮询间隔来为大多数用户服务。

适当的轮询间隔没有真正的定义，因为它取决于被轮询的设备或服务。
例如，我们不应该每 5 秒轮询一次空气质量传感器，因为数据不会经常更改。
在这些情况下，超过 99% 的用户可以接受一分钟或更长的轮询间隔。

举另一个例子，如果我们轮询云服务以获取太阳能电池板数据，其中数据每小时更新一次。
对我们来说，每分钟进行一次民意调查是没有意义的，因为民意调查之间的数据不会发生变化。

对于确实想要更频繁更新的用户，他们可以 [define a custom polling interval](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval)

## 实施示例

有两种方法可以设置轮询间隔。
使用哪一种取决于集成轮询数据的方式。
使用更新协调器时，可以通过设置协调器中的`update_interval`参数或属性来设置轮询间隔。
使用内置实体更新方法时，将 `should_poll` 实体属性设置为 `True` 后，可以通过在平台模块中设置 `SCAN_INTERVAL` 常量来设置轮询间隔。

ZZ保护0ZZ:

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

ZZ保护0ZZ:

```python {1} showLineNumbers
SCAN_INTERVAL = timedelta(minutes=1)

class MySensor(SensorEntity):
    """Representation of a Sensor."""

    _attr_should_poll = True
```

## 其他资源

有关轮询的更多信息可以在[documentation](/developers/integration_fetching_data.md)中找到。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
