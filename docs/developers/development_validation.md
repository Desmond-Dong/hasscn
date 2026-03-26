---
title: "验证输入"
---

`configuration.yaml` 文件包含组件和平台的配置项。我们使用 [voluptuous](https://pypi.python.org/pypi/voluptuous) 来确保用户提供的配置有效。有些条目是可选的，有些则是平台或组件运行所必需的。其他值还必须符合预定义类型，或来自预定义列表。

我们会验证配置，以提升用户体验，并尽可能在 Home Assistant 启动前就发现平台或组件设置中的问题。

除了 [voluptuous](https://pypi.python.org/pypi/voluptuous) 的默认类型外，我们还提供了许多自定义类型。概览请参阅辅助模块 [config_validation.py](https://github.com/home-assistant/core/blob/dev/homeassistant/helpers/config_validation.py)。

- 类型：`string`、`byte` 和 `boolean`
- 实体 ID：`entity_id` 和 `entity_ids`
- 编号：`small_float` 和 `positive_int`
- 时间：`time`、`time_zone`
- 其他：`template`、`slug`、`temperature_unit`、`latitude`、`longitude`、`isfile`、`sun_event`、`ensure_list`、`port`、`url` 和 `icon`

对于 [MQTT](https://www.home-assistant.io/components/mqtt/) 平台，还可以使用 `valid_subscribe_topic` 和 `valid_publish_topic` 进行校验。

需要记住的一些事情：

- 使用 `const.py` 中定义的常量。
- 从你要扩展的集成中导入 `PLATFORM_SCHEMA`，并在其基础上进行扩展。
- 建议将 `required` 项放在前面，`optional` 项放在后面。
- 可选配置键的默认值必须是有效值。不要写成 `vol.Optional(CONF_SOMETHING, default=None): cv.string` 这种默认值为 `None` 的形式；如果该值需要是字符串，请将默认值设为 `default=''`。

### 片段

本节包含一些常见的验证代码片段。

#### 默认名称

如果用户没有提供名称，通常会为传感器设置一个默认值。

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

你可能希望将用户输入限制在几个固定选项内。

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

所有端口号都必须位于 1 到 65535 之间。

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

如果传感器有预定义的可选项列表，请确保配置项与该列表匹配。

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
