---
title: File
description: 关于如何将读取文件的传感器集成到 Home Assistant 的说明。
ha_category:
  - Notifications
  - Sensor
  - Utility
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: file
ha_platforms:
  - notify
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

**File** 集成允许您将通知存储到文件中，或者根据文件内容创建传感器。

默认情况下，此集成已启用，除非您在配置中禁用了或移除了 [`default_config:`](/home-assistant/integrations/default_config/) 这一行。如果是这种情况，下面的示例展示了如何手动启用此集成：

```yaml
# Basic configuration.yaml entry
file:
```

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 动作：读取文件

`file.read_file` 动作会读取文件，并在响应中返回数据。

| 数据属性 | 可选 | 说明 |
| -------------- | -------- | ----------- |
| `file_name`    | No       | 要读取的文件路径和文件名。文件应采用 UTF-8 编码。示例：`config/www/myfile.yaml` |
| `file_encoding`| No       | 文件内容类型（`JSON` 或 `YAML`）。示例：`YAML` |

> **注意：** 文件路径应相对于 Home Assistant 配置目录。

> **注意：** 文件路径必须添加到 `configuration.yaml` 中的 [allowlist_external_dirs](/home-assistant/integrations/homeassistant/#allowlist_external_dirs)。

该动作会返回一个字典，其中 `data` 元素包含从文件中解析出的内容。

示例：读取 `www` 目录中的一个 JSON 文件。
```yaml
  - action: file.read_file
    data:
      file_name: config/www/myfile.json
      file_encoding: JSON
    response_variable: file_content
```
<!-- textlint-disable -->
myfile.json 的内容
<!-- textlint-enable -->
```json
{
  "latitude": 32.87336,
  "longitude": -117.22743,
  "gps_accuracy": 1.2
}
```
响应：
```yaml
data:
  latitude: 32.87336
  longitude: -117.22743
  gps_accuracy: 1.2
```

## 通知

请确保您要使用的文件已经添加到 [allowlist_external_dirs](https://www.home-assistant.io/integrations/homeassistant/#allowlist_external_dirs) 中。如果文件不存在，系统会自动创建它，但请确保其所在文件夹已经存在。您可以将 [configuration](/home-assistant/docs/configuration/) 文件夹中的某个路径（例如 `/config/file_notifications`）加入允许列表，以便将文件保存在那里。将 `timestamp` 设为 `true` 会为每条日志记录添加时间戳。
创建配置条目后，您也可以按需修改条目名称、通知实体名称或实体 ID。

要在自动化或脚本中使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

使用 `notify.send_message` 动作来存储通知消息。

## 传感器

`file` 传感器平台会读取纯文本文件中的条目，并显示找到的值。仅使用文件的最后一行。这相当于在命令行中执行 `$ tail -n 1 sensor.txt`。请注意，文件路径必须添加到 [allowlist_external_dirs](/home-assistant/integrations/homeassistant/#allowlist_external_dirs)。

### 示例

本节展示一些此传感器的实际使用示例。

#### 以 JSON 形式记录条目

假设日志文件包含多条按 JSON 格式写入的记录，如下所示：

```text
[...]
{"temperature": 21, "humidity": 39}
{"temperature": 22, "humidity": 36}
```

要提取温度值，需要进行如下设置：

- Name: `Temperature`
- File path: `/config/sensor.json`
- Value template: `{{ value_json.temperature }}`
- Unit of measurement: `"°C"`

#### 以 CSV 形式记录条目

假设日志文件包含多条按 CSV 格式写入的记录，如下所示：

```text
timestamp,temperature,humidity
1631472948,21,39
1631472949,22,36
```

要提取温度值，需要进行如下设置：

- Name: `Temperature`
- File path: `/config/sensor.csv`
- Value template: `{{ value.split(",")[1] }}`
- Unit of measurement: `"°C"`
