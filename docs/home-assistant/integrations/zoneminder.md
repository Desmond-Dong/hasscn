---
title: ZoneMinder
description: 如何将 ZoneMinder 集成到 Home Assistant 中。
ha_category:
  - Binary sensor
  - Camera
  - Hub
  - Sensor
  - Switch
ha_release: 0.31
ha_iot_class: Local Polling
ha_codeowners:
  - '@rohankapoorcom'
  - '@nabbi'
ha_domain: zoneminder
ha_platforms:
  - binary_sensor
  - camera
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**ZoneMinder** 集成将您的 [ZoneMinder](https://www.zoneminder.com) 实例与 Home Assistant 进行设置。

目前 Home Assistant 支持以下设备类型：

- [二值传感器](#binary-sensor)
- [摄像头](#camera)
- [传感器](#sensor)
- [开关](#switch)

## 配置

要将集成添加到您的安装中，请将其添加到 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
zoneminder:
  - host: ZM_HOST
```

```yaml
host:
  description: 您的 ZoneMinder 服务器主机（和可选端口），不包括协议。
  required: true
  type: string
path:
  description: 您的 ZoneMinder 安装路径。
  required: false
  type: string
  default: "`/zm/`"
path_zms:
  description: 流式传输 CGI 脚本的路径。这应与 ZM "Paths" 设置中的 `PATH_ZMS` 匹配。
  required: false
  type: string
  default: "`/zm/cgi-bin/nph-zms`"
ssl:
  description: 如果您的 ZoneMinder 安装使用 SSL，则设置为 `true`。
  required: false
  type: boolean
  default: false
verify_ssl:
  description: 验证端点的证书。
  required: false
  type: boolean
  default: true
username:
  description: 您的 ZoneMinder 用户名。
  required: false
  type: string
password:
  description: 您的 ZoneMinder 密码。如果 ZM 中启用了 `OPT_USE_AUTH`，则必需。
  required: false
  type: string
```

### 完整配置

```yaml
# 示例 configuration.yaml 条目
zoneminder:
  - host: ZM_HOST
    path: ZM_PATH
    path_zms: ZM_PATH_ZMS
    ssl: true
    verify_ssl: true
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

### 动作：设置运行状态

`zoneminder.set_run_state` 动作更改 ZoneMinder 的当前运行状态。

| 数据属性 | 可选 | 描述                       |
| :--------------------- | :------- | :-------------------------------- |
| `id`                   | 否       | ZoneMinder 实例的主机。  |
| `name`                 | 否       | 要设置的新运行状态名称。 |

例如，如果您的 ZoneMinder 实例配置了一个名为"Home"的运行状态，您可以编写一个[自动化](/home-assistant/getting-started/automation/)，通过包含以下[action](/home-assistant/getting-started/automation-action/)将 ZoneMinder 更改为"Home"运行状态：

 ```yaml
actions:
  action: zoneminder.set_run_state
  data:
    id: ZM_HOST
    name: Home
```

## 二值传感器

`zoneminder` 二值传感器平台允许您监控 [ZoneMinder](https://www.zoneminder.com) 安装的可用性。

创建的每个 binary_sensor 将以配置 [ZoneMinder 集成](/home-assistant/integrations/zoneminder/)时使用的主机名命名。

## 摄像头

`zoneminder` 摄像头平台允许您监控 [ZoneMinder](https://www.zoneminder.com) 摄像头的当前流。

### 配置

要设置它，请将以下信息添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
camera:
  - platform: zoneminder
```

## 传感器

`zoneminder` 传感器平台允许您监控 [ZoneMinder](https://www.zoneminder.com) 安装的当前状态，包括事件数量、摄像头的当前状态和 ZoneMinder 的当前运行状态。

要设置它，请将以下信息添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: zoneminder
    include_archived: false
```

```yaml
include_archived:
  description: 是否在事件计数中包含已归档的 ZoneMinder 事件。
  required: false
  default: false
  type: boolean
monitored_conditions:
  description: 在前端显示的事件计数传感器。
  required: false
  type: list
  keys:
    all:
      description: 所有事件。
    month:
      description: 最近一个月的事件。
    week:
      description: 最近一周的事件。
    day:
      description: 最近一天的事件。
    hour:
      description: 最近一小时的事件。
```

## 开关

`zoneminder` 开关平台允许您切换连接到 [ZoneMinder](https://www.zoneminder.com) 实例的所有摄像头的当前功能。

:::important
您必须已配置 [ZoneMinder 集成](/home-assistant/integrations/zoneminder/) 才能使用此功能，如果启用了 ZoneMinder 身份验证，集成配置中指定的账户必须具有"System"的"Edit"权限。

:::
要启用此开关，请将以下行添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: zoneminder
    command_on: Modect
    command_off: Monitor
```

```yaml
command_on:
  description: 您希望摄像头在开启时运行的功能。
  required: true
  type: string
command_off:
  description: 您希望摄像头在关闭时运行的功能。
  required: true
  type: string
```

:::note
ZoneMinder 安装的默认功能有：None、Monitor、Modect、Record、Mocord、Nodect。

:::
