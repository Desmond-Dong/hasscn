---
title: Python Scripts
description: '此集成允许你编写 Python 脚本，并将其作为 Home Assistant 中的动作公开。你在 <config/pythonscripts/ 文件夹中创建的每个 Python 文件都会作为一个动作显示。脚本内容不会被缓存，因此开发时可以直接编辑文件、保存更改、执行动作。脚本运行在沙盒环境中。'
ha_category:
  - Automation
ha_release: 0.47
ha_quality_scale: internal
ha_domain: python_script
ha_integration_type: integration
---
# Python Scripts

此集成允许你编写 Python 脚本，并将其作为 Home Assistant 中的动作公开。你在 `<config>/python_scripts/` 文件夹中创建的每个 Python 文件都会作为一个动作显示。脚本内容不会被缓存，因此开发时可以直接编辑文件、保存更改、执行动作。脚本运行在沙盒环境中。沙盒内可用变量如下：

| Name       | Description                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `hass`     | Home Assistant 对象。仅允许执行动作、设置/移除状态和触发事件。[API reference][hass-api]                                                  |
| `data`     | 传递给 Python Script 动作的数据。                                                                                                          |
| `logger`   | 日志记录器，可写入日志：`logger.info()`、`logger.warning()`、`logger.error()`。[API reference][logger-api]                                |
| `time`     | 受限访问的标准库 `time`。                                                                                                                  |
| `datetime` | 受限访问的标准库 `datetime`。                                                                                                              |
| `dt_util`  | `homeassistant.util.dt` 模块。                                                                                                             |
| `output`   | 一个空字典。可添加条目以通过 [`response_variable`](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data) 返回数据。        |

其他导入，如 `min`、`max`，可作为内建对象使用。可查看 [python_script](https://github.com/home-assistant/core/blob/dev/homeassistant/components/python_script/__init__.py) 源码，以获取脚本内可用对象的最新信息。

[hass-api]: https://developers.home-assistant.io/docs/dev_101_hass/
[logger-api]: https://docs.python.org/3.7/library/logging.html#logger-objects

:::note
- 此集成不支持 Python `import`。如果你需要更高级的脚本能力，可参考 [AppDaemon](https://appdaemon.readthedocs.io/en/latest/) 或 [pyscript](https://github.com/custom-components/pyscript)
  - 不能将脚本直接作为仪表板按钮。可通过创建 [helper button](/home-assistant/integrations/input_button/) 并编写自动化，在按钮状态变化时运行脚本。

:::
## 编写第一个脚本、读取输入并记录活动

这是一个不执行实际业务的简化示例。
作为第一步，它用于说明：

- 如何设置脚本
- 如何处理输入数据
- 如何记录脚本活动
- 如何排查问题 / 手动调用脚本

先启用 Python Scripts 集成并创建第一个脚本。

- 在 `configuration.yaml` 中添加：`python_script:`
- 创建文件夹 `<config>/python_scripts`
- 在该文件夹中创建 `<config>/python_scripts/hello_world.py` 并写入以下内容：

```python
# `data` is available as builtin and is a dictionary with the input data.
name = data.get("name", "world")
# `logger` and `time` are available as builtin without the need of explicit import.
logger.info("Hello {} at {}".format(name, time.time()))
```

- 启动 Home Assistant 以重新加载脚本配置。
- 在 [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_services/) 中使用 YAML 模式，调用新的 [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_call_service/?service=python_script.hello_world) 动作（带参数）。

```yaml
action: python_script.hello_world
data:
  name: "Input-Text"
```

:::tip
运行该脚本不会在屏幕上显示输出，但会写入 `info` 级别日志。你至少需要为 [Logger](/home-assistant/integrations/logger/) 启用 `info` 级别。

你的 `configuration.yaml` 应包含如下内容。

```yaml
logger:
  default: info
```


:::
## 触发事件

下面示例演示如何通过 `hass.bus` 触发自定义事件。

此示例基于前一个示例中的 `hello_world.py`。
编辑该文件，在末尾添加以下代码。
无需重新加载配置或重启 Home Assistant。

```python
hass.bus.fire("hello_world_event", {"wow": "from a Python script!"})
```

该脚本不会直接输出内容。不过，你可以在开发者工具中查看触发的事件。

在另一个浏览器窗口或标签页中，前往 `Developer tools -> Events`，在 `Listen to events` 输入 `hello_world_event`，然后按 `Start listening`。你会看到类似内容：

```yaml
event_type: hello_world_event
data:
  wow: from a Python script!
origin: LOCAL
time_fired: "2022-09-19T16:15:39.613378+00:00"
context:
  id: 01GDB8H9JXJ1N23Q62SHX6PTBK
  parent_id: null
  user_id: null
```

## 调用服务

以下示例展示如何在 `python_script` 中调用服务。该脚本接收两个参数：`entity_id`（必填）和 `rgb_color`（可选），然后调用 `light.turn_on` 服务，并将亮度设置为 `255`。

```python
# turn_on_light.py
entity_id = data.get("entity_id")
rgb_color = data.get("rgb_color", [255, 255, 255])
if entity_id is not None:
    service_data = {"entity_id": entity_id, "rgb_color": rgb_color, "brightness": 255}
    hass.services.call("light", "turn_on", service_data, False)
```

可使用以下 YAML 作为输入来调用上面的 `python_script`。

```yaml
- action: python_script.turn_on_light
  target:
    entity_id: light.bedroom
  data:
    rgb_color: [255, 0, 0]
```

服务也可以返回数据。你可以在 Python 脚本中将 `hass.services.call` 的 `blocking` 和 `return_response` 参数设为 `True` 来获取返回值。下例获取天气预报并赋值给 `current_forecast` 变量：

```python
# get_forecast.py
service_data = {"type": "daily", "entity_id": ["weather.YOUR_HOME", "weather.YOUR_SCHOOL"]}
current_forecast = hass.services.call("weather", "get_forecasts", service_data, blocking=True, return_response=True)
```

## 返回数据

Python 脚本本身也可以返回数据。只需向 `python_script` 中的 `output` 变量添加条目，整个字典都会被返回。你可以在自动化中通过 [`response_variable`](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data) 使用这些结果。

```python
# hello_world.py
output["hello"] = f"hello {data.get('name', 'world')}"
```

可使用以下 YAML 调用上面的 `python_script`，并将结果传递给后续步骤。


```yaml
- action: python_script.hello_world
  response_variable: python_script_output
- action: notify.mobile_app_iphone
  data:
    message: "{{ python_script_output['hello'] }}"
```


## 为 Python 脚本添加文档

你可以为 Python 脚本添加名称和描述，以便在前端显示。做法是在 `<config>/python_scripts` 文件夹中创建 `services.yaml` 文件。以上面的脚本为例，`services.yaml` 内容如下：

```yaml
# services.yaml
turn_on_light:
  name: Turn on light
  description: Turn on a specific light and set its color.
  fields:
    entity_id:
      description: The light that will be turned on.
      example: light.bedroom
    rgb_color:
      description: The color to which the light will be set.
      example: [255, 0, 0]
```

更多示例请访问论坛中的 [Scripts section](https://community.home-assistant.io/c/26)。

## 动作

可用动作：`reload`。

### 动作：Reload

`python_script.reload` 动作会从 `<config>/python_scripts` 文件夹重新加载所有可用 python_scripts，是重启 Home Assistant 的更快捷替代方案。

当你新建 Python 脚本，或更新 `<config>/python_scripts/services.yaml` 文件后，请使用该动作。

修改现有 Python 脚本内容时，无需调用此服务。

此服务不接收数据属性。
