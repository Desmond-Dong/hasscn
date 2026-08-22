---
title: "Validate the input"
---

`configuration.yaml` 文件包含组件和平台的配置选项。我们使用 [voluptuous](https://pypi.python.org/pypi/voluptuous) 来确保用户提供的配置是有效的。某些条目是可选的，或者是设置平台或组件所必需的。其他条目必须为已定义的类型或来自已定义的列表。

我们会测试配置，以确保用户在 Home Assistant 运行之前，如果平台或组件设置有问题，能尽量减少通知并保持良好的体验。

除了 [voluptuous](https://pypi.python.org/pypi/voluptuous) 默认类型外，还有许多自定义类型。要概览它们，请查看 [config_validation.py](https://github.com/home-assistant/core/blob/dev/homeassistant/helpers/config_validation.py) helper。

- Types: `string`、`byte` 和 `boolean`
- Entity ID: `entity_id` 和 `entity_ids`
- Numbers: `small_float` 和 `positive_int`
- Time: `time`、`time_zone`
- Misc: `template`、`slug`、`temperature_unit`、`latitude`、`longitude`、`isfile`、`sun_event`、`ensure_list`、`port`、`url` 和 `icon`

对于使用 [MQTT](https://www.home-assistant.io/components/mqtt/) 的平台验证，可使用 `valid_subscribe_topic` 和 `valid_publish_topic`。

需要注意的事项：

- 使用 `const.py` 中定义的常量
- 从你正在集成的 integration 中导入 `PLATFORM_SCHEMA` 并对其进行扩展
- 首选顺序是先 `required`，后 `optional`
- 可选配置键的默认值必须是有效值。不要使用 `None` 作为默认值，如 `vol.Optional(CONF_SOMETHING, default=None): cv.string`，如果需要，请将默认值设置为 `default=''`

### 代码片段

本节包含我们使用的验证代码片段。

#### 默认名称

如果用户没有提供名称，为 sensor 设置默认值是很常见的做法。

```python
DEFAULT_NAME = "Sensor name"

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        # ...
        vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
    }
)
```

#### 限制值

你可能希望将用户的输入限制在少数几个选项。

```python
DEFAULT_METHOD = "GET"

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        # ...
        vol.Optional(CONF_METHOD, default=DEFAULT_METHOD): vol.In(["POST", "GET"]),
    }
)
```

#### 端口

所有端口号范围都是 1 到 65535。

```python
DEFAULT_PORT = 993

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        # ...
        vol.Optional(CONF_PORT, default=DEFAULT_PORT): cv.port,
    }
)
```

#### 列表

如果 sensor 有一个预定义的可用选项列表，请测试以确保配置条目与列表匹配。

```python
SENSOR_TYPES = {
    "article_cache": ("Article Cache", "MB"),
    "average_download_rate": ("Average Speed", "MB/s"),
}

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        # ...
        vol.Optional(CONF_MONITORED_VARIABLES, default=[]): vol.All(
            cv.ensure_list, [vol.In(SENSOR_TYPES)]
        ),
    }
)
```
