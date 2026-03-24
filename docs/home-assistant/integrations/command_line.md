---
title: Command line
description: 关于如何在 Home Assistant 中集成命令行工具的说明。
ha_category:
  - Binary sensor
  - Cover
  - Notifications
  - Sensor
  - Utility
ha_release: 0.12
ha_iot_class: Local Polling
ha_domain: command_line
ha_platforms:
  - binary_sensor
  - cover
  - notify
  - sensor
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@gjohansson-ST'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Command line** 集成提供了执行特定命令以获取数据或控制设备的功能。

:::tip
强烈建议您使用单引号 `'` 包裹命令，这样可以确保命令中可使用所有字符，并降低意外转义的风险。如果要在已用单引号包裹的命令中包含单引号，请将其写成两个单引号：`''`。

:::
```yaml
command_line:
  description: `command_line` 集成要使用的平台。
  required: true
  type: list
  keys:
    binary_sensor:
      description: 二进制传感器平台。
      required: false
      type: map
      keys:
        command:
          description: 用于获取值的命令。
          required: true
          type: template
        command_timeout:
          description: 定义命令超时时间（秒）。
          required: false
          type: integer
          default: 15
        device_class:
          description: 设置[设备类别](/home-assistant/integrations/binary_sensor/)，从而更改前端显示的设备状态和图标。
          required: false
          type: string
        name:
          description: 允许您覆盖设备名称。
          required: false
          type: string
          default: "Binary Command Sensor"
        icon:
          description: 为实体图标定义模板。
          required: false
          type: template
        payload_on:
          description: 表示启用状态的负载。
          required: false
          type: string
          default: 'ON'
        unique_id:
          description: 唯一标识此二进制传感器的 ID。将其设置为唯一值可允许通过 UI 进行自定义。
          required: false
          type: string
        payload_off:
          description: 表示禁用状态的负载。
          required: false
          type: string
          default: 'OFF'
        value_template:
          description: 定义一个[模板](/home-assistant/docs/configuration/templating/#processing-incoming-data)，用于从负载中提取值。
          required: false
          type: string
        availability:
          description: 定义一个模板来获取实体的 `available` 状态。如果模板渲染失败，或返回 `True`、`"1"`、`"true"`、`"yes"`、`"on"`、`"enable"`，或非零数字，则实体会被视为 `available`。如果模板返回其他任意值，则实体会被视为 `unavailable`。如果未配置，实体将始终为 `available`。请注意，字符串比较不区分大小写；例如 `"TrUe"` 和 `"yEs"` 也有效。
          required: false
          type: template
          default: true
        scan_interval:
          description: 定义每次更新之间的时间间隔（秒）。
          required: false
          type: integer
          default: 60
    cover:
      description: cover 平台。
      required: false
      type: map
      keys:
        command_close:
          description: 关闭 cover 的命令。
          required: true
          default: true
          type: string
        command_open:
          description: 打开 cover 的命令。
          required: true
          default: true
          type: string
        command_state:
          description: 如果提供，此项会作为一个在后台运行的传感器来更新 cover 状态。如果命令返回 `0`，表示 cover 完全关闭；而返回 `100` 表示 cover 完全打开。
          required: false
          type: string
        command_stop:
          description: 停止 cover 的命令。
          required: true
          default: true
          type: string
        command_timeout:
          description: 定义命令超时时间（秒）。
          required: false
          type: integer
          default: 15
        device_class:
          description: 设置[设备类别](/home-assistant/integrations/cover/)，从而更改前端显示的设备状态和图标。
          required: false
          type: string
        name:
          description: 在前端中显示的 cover 名称。
          required: true
          type: string
        icon:
          description: 为实体图标定义模板。
          required: false
          type: template          
        unique_id:
          description: 唯一标识此 cover 的 ID。将其设置为唯一值可允许通过 UI 进行自定义。
          required: false
          type: string
        value_template:
          description: 如果指定了此项，`command_state` 将忽略命令返回码，而改由模板的计算结果来表示 cover 位置。例如，如果 `command_state` 返回字符串 `"open"`，那么像上方配置示例那样使用 `value_template`，即可将其转换为有效状态 `100`。
          required: false
          type: template
        availability:
          description: 定义一个模板来获取实体的 `available` 状态。如果模板渲染失败，或返回 `True`、`"1"`、`"true"`、`"yes"`、`"on"`、`"enable"`，或非零数字，则实体会被视为 `available`。如果模板返回其他任意值，则实体会被视为 `unavailable`。如果未配置，实体将始终为 `available`。请注意，字符串比较不区分大小写；例如 `"TrUe"` 和 `"yEs"` 也有效。
          required: false
          type: template
          default: true
        scan_interval:
          description: 定义每次更新之间的时间间隔（秒）。
          required: false
          type: integer
          default: 15
    notify:
      description: notify 平台。
      required: false
      type: map
      keys:
        name:
          description: 设置可选参数 `name` 可创建多个通知器。通知器将绑定到 `notify.NOTIFIER_NAME` 操作。
          required: false
          default: notify
          type: string
        command:
          description: 要执行的命令。
          required: true
          type: template
        command_timeout:
          description: 定义命令超时时间（秒）。
          required: false
          type: integer
          default: 15
    sensor:
      description: 传感器平台。
      required: false
      type: map
      keys:
        command:
          description: 用于获取值的命令。
          required: true
          type: template
        command_timeout:
          description: 定义命令超时时间（秒）。
          required: false
          type: integer
          default: 15
        json_attributes:
          description: 定义一个键列表，用于从 JSON 字典结果中提取值，并将其设置为传感器属性。
          required: false
          type: [string, list]
        json_attributes_path:
          description: 一个 [JSONPath](https://goessner.net/articles/JsonPath/)，用于引用 JSON 内容中 `json_attributes` 的位置。
          required: false
          type: string
        name:
          description: 命令传感器的名称。
          required: false
          type: string
          default: "Command Sensor"
        icon:
          description: 为实体图标定义模板。
          required: false
          type: template
        unique_id:
          description: 唯一标识此传感器的 ID。将其设置为唯一值可允许通过 UI 进行自定义。
          required: false
          type: string
        unit_of_measurement:
          description: 定义传感器的测量单位（如果有）。
          required: false
          type: string
        value_template:
          description: "定义一个[模板](/home-assistant/docs/configuration/templating/#processing-incoming-data)，用于从负载中提取值。"
          required: false
          type: string
        availability:
          description: 定义一个模板来获取实体的 `available` 状态。如果模板渲染失败，或返回 `True`、`"1"`、`"true"`、`"yes"`、`"on"`、`"enable"`，或非零数字，则实体会被视为 `available`。如果模板返回其他任意值，则实体会被视为 `unavailable`。如果未配置，实体将始终为 `available`。请注意，字符串比较不区分大小写；例如 `"TrUe"` 和 `"yEs"` 也有效。
          required: false
          type: template
          default: true
        device_class:
          description: 设置设备类别，从而更改 UI 上显示的设备状态和图标（见下文）。它不会设置 `unit_of_measurement`。
          required: false
          type: device_class
          default: None
        state_class:
          description: "传感器的 [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes)。"
          required: false
          type: string
          default: None
        scan_interval:
          description: 定义每次更新之间的时间间隔（秒）。
          required: false
          type: integer
          default: 60
        device_class:
          description: 设置设备类别，从而更改 UI 上显示的设备状态和图标（见下文）。它不会设置 `unit_of_measurement`。
          required: false
          type: device_class
        state_class:
          description: "传感器的 [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes)。这将根据用户资料中定义的 **Number Format** 来显示数值。"
          required: false
          type: string
    switch:
      description: 开关平台。
      required: false
      type: map
      keys:
        command_on:
          description: 打开时要执行的命令。
          required: true
          type: string
        command_off:
          description: 关闭时要执行的命令。
          required: true
          type: string
        command_state:
          description: "如果提供，此命令将被执行。返回结果码 `0` 表示开关为打开状态。"
          required: false
          type: string
        command_timeout:
          description: 定义命令超时时间（秒）。
          required: false
          type: integer
          default: 15
        name:
          description: 在前端中显示的开关名称。
          required: true
          type: string
        icon:
          description: 为实体图标定义模板。
          required: false
          type: template
        unique_id:
          description: 唯一标识此开关的 ID。将其设置为唯一值可允许通过 UI 进行自定义。
          required: false
          type: string
        value_template:
          description: "如果指定了此项，`command_state` 将忽略命令返回码，而模板计算结果为 `true` 时表示开关处于打开状态。"
          required: false
          type: string
        availability:
          description: 定义一个模板来获取实体的 `available` 状态。如果模板渲染失败，或返回 `True`、`"1"`、`"true"`、`"yes"`、`"on"`、`"enable"`，或非零数字，则实体会被视为 `available`。如果模板返回其他任意值，则实体会被视为 `unavailable`。如果未配置，实体将始终为 `available`。请注意，字符串比较不区分大小写；例如 `"TrUe"` 和 `"yEs"` 也有效。
          required: false
          type: template
          default: true
        scan_interval:
          description: 定义每次更新之间的时间间隔（秒）。
          required: false
          type: integer
          default: 30
```

:::note
对于传感器来说，虽然 `value_template` 是可选的，但如果因为输出是 JSON 而设置了 `json_attributes`，建议您同时在 `value_template` 字段中提供一个模板，以便给传感器提供状态值，否则其状态将始终为 `unknown`。请参阅下方[示例](#usage-of-json-attributes-in-command-output)。

:::
## 故障排除

由于 **Command line** 集成仅支持 YAML 配置，因此要启用扩展日志，需要在 `configuration.yaml` 文件中设置日志配置。

在配置中加入以下示例，会将默认日志级别设置为 `info`，并将 `command_line` 的日志级别设置为 `debug`。完成后，重启 Home Assistant 以使其生效。


```yaml
# 设置日志
logger:
  default: info
  logs:
    homeassistant.components.command_line: debug
```


:::note
虽然 `sensor` 和 `binary_sensor` 的 `command` 支持模板，但只有命令参数可以使用模板。这意味着命令名称本身不能由模板生成，而必须直接写出。


:::
### Using templates

For incoming data, a value template translates incoming JSON or raw data into a valid payload.
Incoming payloads are rendered with possible JSON values, so when rendering, the `value_json` variable can be used to access attributes in a JSON-based payload. Otherwise, the `value` variable can be used for non-JSON payloads.

The `this` variable can also be used in the template. The `this` attribute refers to the current [entity state](/home-assistant/docs/configuration/state_object) of the entity.
Further information about the `this` variable can be found in the [template documentation](/home-assistant/integrations/template/#template-and-action-variables).

:::note
**Example value template with JSON:**

With the following payload:

```json
{ "state": "ON", "temperature": 21.902 }
```

Template `{{ value_json.temperature | round(1) }}` renders to `21.9`.
:::

## 二进制传感器

要在您的安装中使用命令行二进制传感器，请将以下内容添加到 `configuration.yaml` 文件中：


```yaml
# `configuration.yaml` 示例条目
command_line:
  - binary_sensor:
      command: "cat /proc/sys/net/ipv4/ip_forward"
      payload_on: "1"
      payload_off: "0"
  - binary_sensor:
      command: "echo 1"
      payload_on: "1"
      payload_off: "0"
```


## `cover`

`command_line` cover 平台会在 cover 上升、下降和停止时执行特定命令。它允许您将任何能够通过命令行控制的 cover 类型集成到 Home Assistant 中。

要在您的安装中启用命令行 cover，请将以下内容添加到 `configuration.yaml` 文件中：


```yaml
# `configuration.yaml` 示例条目
command_line:
  - cover:
      command_open: move_command up garage
      command_close: move_command down garage
      command_stop: move_command stop garage
      name: Garage
```


## 通知

`command_line` 平台允许您使用外部工具从 Home Assistant 发送通知。消息将通过标准输入（STDIN）传入。

要在您的安装中启用这些通知，请将以下内容添加到 `configuration.yaml` 文件中：


```yaml
# `configuration.yaml` 示例条目
command_line:
  - notify:
      command: "espeak -vmb/mb-us1"
```


有关如何使用通知，请参阅[自动化入门](/home-assistant/getting-started/automation/)。

## 传感器

要启用它，请将以下内容添加到 `configuration.yaml` 中：


```yaml
# `configuration.yaml` 示例条目
command_line:
  - sensor:
      command: SENSOR_COMMAND
  - sensor:
      command: SENSOR_COMMAND_2
```


## 开关

`command_line` 开关平台会在其打开和关闭时执行特定命令。它很可能是最强大的平台之一，因为它允许您将任何可以通过命令行控制的开关类型集成到 Home Assistant 中，甚至包括调用其他脚本！

要启用它，请将以下内容添加到 `configuration.yaml` 中：


```yaml
# `configuration.yaml` 示例条目
command_line:
  - switch:
      name: Kitchen Light
      command_on: switch_command on kitchen
      command_off: switch_command off kitchen
```


:::note
关于 `cover` 和 `switch` 的 `name`，请注意：
  
`friendly_name` 和 `object_id` 的用法已弃用，而 slug 化后的 `name` 也会被用作标识符。

请使用 `unique_id` 来支持通过 UI 修改名称；如果需要，也可将 slug 化后的 `name` 用作标识符。


:::
## 执行命令

`command` 会在[配置目录](/home-assistant/docs/configuration/)中执行。

:::note
如果您使用的是 [Home Assistant Operating System](https://github.com/home-assistant/operating-system)，这些命令会在 `homeassistant` 容器环境中执行。因此，如果您要测试或调试脚本，最好也在该容器环境中进行，以获得相同的运行环境。


:::
当命令以退出码 `0` 结束时，其输出（stdout）会被用作 `value`。如果命令返回非 `0` 退出码，或因 `command_timeout` 而终止，则结果只会记录到 Home Assistant 日志中，传感器值不会更新。

## 二进制传感器平台示例

本节提供了一些如何使用 command_line 传感器的实际示例。

### SickRage

检查 [SickRage](https://github.com/sickragetv/sickrage) 实例的状态。


```yaml
# `configuration.yaml` 示例条目
command_line:
  - binary_sensor:
      command: 'netstat -na | grep "33322" | grep -q "LISTENING" > nul && (echo "Running") || (echo "Not running")'
      name: "sickragerunning"
      device_class: moving
      payload_on: "Running"
      payload_off: "Not running"
```


### 检查 RasPlex

检查 [RasPlex](https://github.com/RasPlex/RasPlex) 是否 `online`。


```yaml
command_line:
  - binary_sensor:
      command: 'ping -c 1 rasplex.local | grep "1 received" | wc -l'
      name: "is_rasplex_online"
      device_class: connectivity
      payload_on: 1
      payload_off: 0
```


另一种解决方案如下：


```yaml
command_line:
  - binary_sensor:
      name: Printer
      command: 'ping -W 1 -c 1 192.168.1.10 > /dev/null 2>&1 && echo success || echo fail'
      device_class: connectivity
      payload_on: "success"
      payload_off: "fail"
```


也可以考虑使用 [ping sensor](/home-assistant/integrations/ping#binary-sensor) 作为上述示例的替代方案。

### 检查系统服务是否正在运行

正在运行的服务会列在 `/etc/systemd/system` 中，并可通过 `systemctl` 命令进行检查：


```bash
$ systemctl is-active home-assistant@rock64.service
active
$ sudo service home-assistant@rock64.service stop
$ systemctl is-active home-assistant@rock64.service
inactive
```


可以使用二进制命令行传感器来检查：


```yaml
command_line:
  - binary_sensor:
      command: '/bin/systemctl is-active home-assistant@rock64.service'
      payload_on: "active"
      payload_off: "inactive"
```


## `cover` 平台示例


```yaml
# `configuration.yaml` 示例条目
command_line:
  - cover:
      name: Garage door
      command_open: move_command up garage
      command_close: move_command down garage
      command_stop: move_command stop garage
      command_state: state_command garage
      value_template: >
        {% if value == 'open' %}
        100
        {% elif value == 'closed' %}
        0
        {% endif %}
```


## 传感器平台示例

本节提供了一些如何使用此传感器的实际示例。

### CPU 温度

借助 [`proc`](https://en.wikipedia.org/wiki/Procfs) 文件系统，您可以获取系统的各种详细信息。这里我们关注的是 CPU 温度。请将类似以下内容添加到 `configuration.yaml` 文件中：


```yaml
# `configuration.yaml` 示例条目
command_line:
  - sensor:
      name: CPU Temperature
      command: "cat /sys/class/thermal/thermal_zone0/temp"
      # 如果出现错误，请确保配置文件采用 UTF-8 编码
      unit_of_measurement: "°C"
      value_template: "{{ value | multiply(0.001) | round(1) }}"
```


### 获取上游 Home Assistant 版本信息

您可以直接在前端（**开发者工具** -> **关于**）查看当前运行的 Home Assistant 版本。Home Assistant 的发行版本可在 [Python Package Index](https://pypi.python.org/pypi) 上获取，因此可以据此查询当前最新版本。


```yaml
command_line:
  - sensor:
      command: python3 -c "import requests; print(requests.get('https://pypi.python.org/pypi/homeassistant/json').json()['info']['version'])"
      name: HA release
```


### 从远程文本文件读取值

如果您的设备会将数值存储在可通过 HTTP 访问的文本文件中，那么您可以采用与上一节相同的方法。不同的是，这里不是读取 JSON 响应，而是直接获取传感器值。


```yaml
command_line:
  - sensor:
      command: python3 -c "import requests; print(requests.get('http://remote-host/sensor_data.txt').text)"
      name: File value
```


### 使用外部脚本

此示例与 [aREST sensor](/home-assistant/integrations/arest#sensor) 实现的功能相同，但使用的是外部 Python 脚本。它可以帮助您了解如何与公开 RESTful API 的设备进行交互。

下面展示了用于获取数值的单行脚本。当然，您也可以直接在 `configuration.yaml` 文件中使用它，但需要额外注意引号的处理。


```bash
python3 -c "import requests; print(requests.get('http://10.0.0.48/analog/2').json()['return_value'])"
```


实际使用的脚本（保存为 `arest-value.py`）如下所示。


```python
#!/usr/bin/python3
from requests import get

response = get("http://10.0.0.48/analog/2")
print(response.json()["return_value"])
```


要使用该脚本，您需要将类似以下内容添加到 `configuration.yaml` 文件中。


```yaml
# `configuration.yaml` 示例条目
command_line:
  - sensor:
      name: Brightness
      command: "python3 /path/to/script/arest-value.py"
```


### 在 `command:` 中使用模板

`command` 配置变量支持使用[模板](/home-assistant/docs/configuration/templating/)。如果您想将某个特定传感器的状态作为参数传递给外部脚本，就可以使用此功能。


```yaml
# `configuration.yaml` 示例条目
command_line:
  - sensor:
      name: Wind direction
      command: "sh /home/pi/.homeassistant/scripts/wind_direction.sh {{ states('sensor.wind_direction') }}"
      unit_of_measurement: "Direction"
```


### 在命令输出中使用 JSON 属性

此示例展示了如何通过 `value_json` 和 `json_attributes`，使用一个传感器获取多个值（其中附加值作为属性提供）。


```yaml
# `configuration.yaml` 示例条目
command_line:
  - sensor:
      name: JSON time
      json_attributes:
        - date
        - milliseconds_since_epoch
      command: "python3 /home/pi/.homeassistant/scripts/datetime.py"
      value_template: "{{ value_json.time }}"
```


[JSONPlaceholder](https://jsonplaceholder.typicode.com/) 提供了用于测试的示例 JSON 数据。在下面的示例中，JSONPath 用于定位 JSON 文档中的属性。[JSONPath Online Evaluator](https://jsonpath.com/) 提供了一个测试 JSONPath 的工具。


```yaml
command_line:
  - sensor:
      name: JSON user
      command: python3 -c "import requests; print(requests.get('https://jsonplaceholder.typicode.com/users').text)"
      json_attributes_path: "$.[0].address"
      json_attributes:
        - street
        - suite
        - city
        - zipcode
      value_template: "{{ value_json[0].name }}"
```


## 开关平台示例

### 在状态变化时更改图标

此示例演示了如何在状态变化时使用模板更改图标。该图标引用了其自身状态。


```yaml
command_line:
  - switch:
      name: Driveway outside sensor
      command_on: >
        curl -X PUT -d '{"on":true}' "http://ip_address/api/sensors/27/config/"
      command_off: >
        curl -X PUT -d '{"on":false}' "http://ip_address/api/sensors/27/config/"
      command_state: curl http://ip_address/api/sensors/27/
      value_template: >
        {{value_json.config.on}}
      icon: >
        {% if value_json.config.on == true %} mdi:toggle-switch
        {% else %} mdi:toggle-switch-off
        {% endif %}
```


### aREST 设备

下面的示例与 [aREST switch](/home-assistant/integrations/arest#switch) 实现的功能相同。
它使用命令行工具 [`curl`](https://curl.haxx.se/) 来切换一个可通过 REST 控制的引脚。


```yaml
# `configuration.yaml` 示例条目
command_line:
  - switch:
      command_on: "/usr/bin/curl -X GET http://192.168.1.10/digital/4/1"
      command_off: "/usr/bin/curl -X GET http://192.168.1.10/digital/4/0"
      command_state: "/usr/bin/curl -X GET http://192.168.1.10/digital/4"
      value_template: '{{ value == "1" }}'
      name: Kitchen Lightswitch
```


基于此示例，在 UI 中您会看到 `friendly_name` 为 “Kitchen Light”。不过，其 `identifier` 是 `arest_pin_four`，因此 `entity_id` 会是 `switch.arest_pin_four`，这也是您在[`automation`](/home-assistant/integrations/automation/)或 [API 调用](/home-assistant/developers/)中会使用的值。

### 关闭本地主机

此开关会关闭运行 Home Assistant 的系统。

:::warning
此开关会立即关闭您的主机，不会有确认提示。

:::

```yaml
# `configuration.yaml` 示例条目
command_line:
  - switch:
      name: Home Assistant System Shutdown
      command_off: "/usr/sbin/poweroff"
```


### 控制 VLC 播放器

此开关会控制本地 VLC 媒体播放器（[来源](https://community.home-assistant.io/t/106)）。


```yaml
# `configuration.yaml` 示例条目
command_line:
  - switch:
      name: VLC
      command_on: "cvlc 1.mp3 vlc://quit &"
      command_off: "pkill vlc"
```


### 控制 Foscam 运动传感器

此开关可控制支持 CGI 命令的 Foscam 网络摄像头的运动传感器（[来源](https://www.iltucci.com/blog/wp-content/uploads/2018/12/Foscam-IPCamera-CGI-User-Guide-V1.0.4.pdf)）。
此开关支持 `statecmd`，用于检查当前的运动检测状态。


```yaml
# `configuration.yaml` 示例条目
command_line:
  - switch:
      name: Foscam Motion
      command_on: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&usr=admin&pwd=password"'
      command_off: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=0&usr=admin&pwd=password"'
      command_state: 'curl -k --silent "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=getMotionDetectConfig&usr=admin&pwd=password" | grep -oP "(?<=isEnable>).*?(?=</isEnable>)"'
      value_template: '{{ value == "1" }}'
```


- 将 `admin` 和 `password` 替换为具有 “Admin” 权限的 Foscam 用户账户
- 将 `ipaddress` 替换为您的 Foscam 本地 IP 地址

## 操作

可用操作：`reload`。

### 操作：重新加载

`command_line.reload` 操作用于重新加载所有 `command_line` 实体。

此操作不接受任何数据属性。
