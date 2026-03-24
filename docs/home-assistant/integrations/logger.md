---
title: Logger
description: 关于如何为 Home Assistant 启用日志集成的说明。
ha_category:
  - Utility
ha_release: 0.8
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: logger
ha_integration_type: system
---

**Logger** 集成可让您定义 Home Assistant 中日志活动的级别。

要在您的安装中启用 `logger` 集成，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
logger:
```

如果未在 `configuration.yaml` 中启用 logger 集成，则日志严重性级别默认为 `warning`。

如果您想记录所有消息，并忽略指定集成中低于 critical 的事件：

```yaml
# configuration.yaml 示例条目
logger:
  default: info
  logs:
    homeassistant.components.yamaha: critical
    custom_components.my_integration: critical
```

如果您想忽略所有低于 critical 的消息，但为指定集成记录事件：

```yaml
# configuration.yaml 示例条目
logger:
  default: critical
  logs:
    # log level for HA core
    homeassistant.core: fatal

    # log level for MQTT integration
    homeassistant.components.mqtt: warning

    # log level for all python scripts
    homeassistant.components.python_script: warning

    # individual log level for this python script
    homeassistant.components.python_script.my_new_script.py: debug

    # log level for SmartThings lights
    homeassistant.components.smartthings.light: info

    # log level for a custom integration
    custom_components.my_integration: debug

    # log level for the `aiohttp` Python package
    aiohttp: error

    # log level for both 'glances_api' and 'glances' integration
    homeassistant.components.glances: fatal
    glances_api: fatal
```

日志条目格式如下：  
*timestamp* *log-level* *thread* [**namespace**] *message*  
其中 **namespace** 是当前正在记录日志的 *<component_namespace>*。

```yaml
  default:
    description: Default log level. See [log_level](#log-levels).
    required: false
    type: string
  logs:
    description: List of integrations and their log level.
    required: false
    type: map
    keys:
      '&lt;component_namespace&gt;':
        description: Logger namespace of the integration. See [log_level](#log-levels).
        type: string
  filters:
    description: Regular Expression logging filters.
    required: false
    type: map
    keys:
      '&lt;component_namespace&gt;':
        description: Logger namespace of the integration and a list of Regular Expressions. See [Log Filters](#log-filters).
        type: list
```

在示例中，请注意 `glances_api` 与 `homeassistant.components.glances` 这两个 namespace 的区别，二者都位于根级别，但分别由不同 API 记录。

如果您想知道自己环境中的 namespace，请查看启动时的日志文件。
您会看到来自 `homeassistant.loader` 的 INFO 日志消息，其中会显示 `loaded <component> from <namespace>`。
这些就是您可以设置 `log level` 的 namespace。

### 日志级别

可用的日志严重性级别，按从高到低排序如下：

- critical
- fatal
- error
- warning
- warn
- info
- debug
- notset

### 日志过滤器

用于日志的服务级正则表达式过滤器。若消息匹配该正则表达式，则会被忽略。

配置示例如下：

```yaml
# configuration.yaml 示例条目
logger:
  default: info
  logs:
    custom_components.my_integration: critical
  filters:
    custom_components.my_integration:
      - "HTTP 429" # Filter all HTTP 429 errors
      - "Request to .*unreliable.com.* Timed Out"
    homeassistant.components.nws:
      - "^Error handling request$"
```

## 操作

### 操作：设置默认级别

`logger.set_default_level` 操作用于修改默认日志级别（适用于未指定日志级别的集成）。

调用示例如下：

```yaml
action: logger.set_default_level
data:
  level: info
```

### 操作：设置级别

`logger.set_level` 操作用于修改一个或多个集成的日志级别。
它接受与配置中 `logs` 相同的格式。

调用示例如下：

```yaml
action: logger.set_level
data:
  homeassistant.core: fatal
  homeassistant.components.mqtt: warning
  homeassistant.components.smartthings.light: info
  custom_components.my_integration: debug
  aiohttp: error
```

## 查看日志

您可以在 [**Settings** > **System** > **Logs**](https://my.home-assistant.io/redirect/logs/) 中查看和下载日志信息。

### 在 Container 安装中查看日志

对于 Home Assistant Container 安装，日志信息会存储在[配置目录](/home-assistant/docs/configuration/)中的 `home-assistant.log` 文件里。
您可以使用命令行工具 `cat` 读取，或使用 `tail -f` 动态查看。

当您通过 [Home Assistant 的 SSH 应用](/home-assistant/common-tasks/os/#installing-and-using-the-ssh-app)（以前称为 SSH add-on）登录后，可以使用以下示例：

```bash
tail -f /config/home-assistant.log
```

在 Docker 中，您可以直接使用宿主机命令行。使用以下命令动态查看日志：

```bash
# 动态跟踪日志
docker logs --follow  MY_CONTAINER_ID
```

如需查看其他选项，请使用 `--help`，或者不带参数直接显示完整日志。
