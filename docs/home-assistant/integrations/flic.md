---
title: Flic
description: 'Flic 集成允许您从 flic(https://flic.io) 智能按钮接收点击事件。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
ha_iot_class: Local Push
ha_release: 0.35
ha_domain: flic
ha_platforms:
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Flic

**Flic** 集成允许您从 [flic](https://flic.io) 智能按钮接收点击事件。

该集成不直接与按钮交互，*而是与管理按钮的 flic 服务通信*。该服务可以在运行 Home Assistant 的同一实例上运行，也可以在任何其他可访问的机器上运行。

## 动作设置

如果您使用的是 Home Assistant 操作系统，可以通过[安装](/home-assistant/common-tasks/os#installing-third-party-apps)来自 [pschmitt 的仓库](https://github.com/pschmitt/home-assistant-addons) 的 Home Assistant flicd 应用程序在本地运行该服务。

有关如何手动安装服务的说明，请访问适用于 [Linux](https://github.com/50ButtonsEach/fliclib-linux-hci)、[macOS](https://github.com/50ButtonsEach/flic-service-osx) 或 [Windows](https://github.com/50ButtonsEach/fliclib-windows) 的服务 GitHub 仓库。

## 配置

要在您的系统中使用 flic 按钮，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  - platform: flic
```

```yaml
host:
  description: flic 服务器的 IP 或主机名。
  required: false
  type: string
  default: localhost
port:
  description: flic 服务的端口。
  required: false
  type: integer
  default: 5551
discovery:
  description: 如果为 `true`，则集成将配置为持续扫描新按钮。
  required: false
  type: boolean
  default: true
ignored_click_types:
  description: 不应触发 `flic_click` 事件的点击类型列表。点击类型有 `single`、`double` 和 `hold`。
  required: false
  type: list
timeout:
  description: 事件在按钮上本地排队的最大时间（秒），超过后丢弃该事件。
  required: false
  type: integer
  default: 3
```

## 发现

如果启用了发现功能，您可以通过按住按钮至少 7 秒来添加新按钮。该按钮将与 flic 服务配对并添加到 Home Assistant 中。否则，您必须手动将其与 flic 服务配对。Home Assistant 平台不会扫描新按钮，只会连接已配对的按钮。

## 超时

当 flic 按钮在与 flic 服务断开连接时被触发，它将排队所有事件并尝试尽快连接并传输它们。超时变量可用于在动作与 Home Assistant 中通知之间经过太长时间时停止事件触发。

## 事件

flic 集成在总线上触发 `flic_click` 事件。您可以捕获这些事件并在自动化脚本中响应它们，如下所示：

```yaml
# 示例 configuration.yaml 自动化条目
automation:
  - alias: "单击 flic 时打开客厅灯光"
    triggers:
      - trigger: event
        event_type: flic_click
        event_data:
          button_name: flic_81e4ac74b6d2
          click_type: single
    actions:
      - action: homeassistant.turn_on
        target:
          entity_id: group.lights_livingroom
```

事件数据：

- **button_name**：触发事件的按钮名称。
- **button_address**：触发事件的按钮蓝牙地址。
- **click_type**：点击类型。可能的值有 `single`、`double` 和 `hold`。
- **queued_time**：此事件在按钮上排队的时间（秒）。

为了帮助检测和调试 flic 按钮点击，您可以使用此自动化，在每次点击任何按钮时发送通知。此示例使用 [HTML5 推送通知平台](/home-assistant/integrations/html5)。访问[通知集成页面](/home-assistant/integrations/notify/)了解更多关于设置通知的信息。


```yaml
automation:
  - alias: "FLIC 每次点击发送 Html5 通知"
    triggers:
      - trigger: event
        event_type: flic_click
    actions:
      - action: notify.html5
        data:
          title: "flic 点击"
          message: "flic {{ trigger.event.data.button_name }} 被{{ trigger.event.data.click_type }}点击"
```


### 忽略点击类型

对于某些用途，排除特定点击类型以避免触发点击事件可能是有意义的。例如，当忽略双击时，快速按两次按钮将产生两个 `single` 点击事件而不是一个 `double` 点击事件。这对于需要快速点击的应用非常有用。