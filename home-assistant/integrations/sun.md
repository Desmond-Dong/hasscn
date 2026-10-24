# Sun

**Sun** 集成会根据您配置的家庭位置计算所有与太阳相关的时间（如日出、日落、黎明、黄昏等）。这意味着所有基于时间的计算和触发器都会针对您的具体位置保持准确，如您的[基础配置](/home-assistant/docs/configuration/basic/index.md)中所定义。

Sun 集成会使用 [configured in your Home Assistant configuration](https://my.home-assistant.io/redirect/general/) 的位置来跟踪太阳是否位于地平线之上或之下。在自动化中，太阳既可以作为[带可选偏移量的触发器，用于模拟黎明/黄昏][sun_trigger]，也可以作为[带可选偏移量的条件，用于判断太阳是否已经升起或落下][sun_condition]。

[sun_trigger]: /docs/automation/trigger/#sun-trigger

[sun_condition]: /docs/scripts/conditions/#sun-condition

## 默认已配置

此集成默认已配置并安装，通常无需您手动配置，除非您在 YAML 配置中禁用了或移除了 [`default_config:`](/home-assistant/integrations/default_config/index.md) 这一行。

如果确实如此，您可以按照下面的说明进行配置。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## YAML 配置

或者，您也可以通过 YAML 手动配置并设置此集成。要在您的安装中启用 Sun 集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sun:
```

<p class='img'>
<img src='/home-assistant/images/screenshots/more-info-dialog-sun.png' />
</p>

## 自动化触发器

Sun 的事件监听器会在太阳升起或落下时，按设定的偏移量执行操作。

Sun 触发器需要指定 `sun` 类型、事件类型（`sunset` 或 `sunrise`）以及可选的偏移量。

```yaml
triggers:
  - trigger: sun
    event: sunrise
    offset: "-01:00:01"
```

| 键名 | 说明 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `event`  | 可选值：`sunset` 或 `sunrise` |
| `offset` | Sun 事件触发器的可选偏移量，可以是正数或负数秒，也可以写成 `HH:MM:SS`（在太阳事件之后）或 `-HH:MM:SS`（在太阳事件之前）。 |

### 维护实体 `sun.sun`

| 可能的状态 | 说明 |
| --------------- | ---------------------------------- |
| `above_horizon` | 太阳位于地平线之上。 |
| `below_horizon` | 太阳位于地平线之下。 |

## 传感器

出于向后兼容的原因，这些传感器也作为 `sun.sun` 实体的属性提供。

| 传感器 | 说明 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Next rising   | 下一次日出的日期和时间（UTC）。 |
| Next setting  | 下一次日落的日期和时间（UTC）。 |
| Next dawn     | 下一次黎明的日期和时间（UTC）。 |
| Next dusk     | 下一次黄昏的日期和时间（UTC）。 |
| Next noon     | 下一次太阳正午的日期和时间（UTC）。 |
| Next midnight | 下一次太阳午夜的日期和时间（UTC）。 |
| Elevation     | 太阳高度角，即太阳与地平线之间的夹角。负值表示太阳位于地平线之下。 |
| Azimuth       | 太阳方位角，从正北开始按顺时针方向计算。 |

## 二进制传感器

出于向后兼容的原因，这些二进制传感器也作为 `sun.sun` 实体的属性提供。

| 传感器 | 说明 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Solar rising  | 如果当前太阳正在上升（即太阳午夜之后、太阳正午之前），则为 True。 |
