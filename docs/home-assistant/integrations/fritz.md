---
title: FRITZ!Box Tools
description: 关于如何将 FRITZ!Box 路由器集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Image
  - Presence detection
  - Sensor
  - Update
ha_release: '0.10'
ha_domain: fritz
ha_config_flow: true
ha_codeowners:
  - '@AaronDavidSchneider'
  - '@chemelli74'
  - '@mib1185'
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - image
  - sensor
  - switch
  - update
ha_ssdp: true
ha_integration_type: hub
related:
  - docs: /common-tasks/general/#enabling-or-disabling-entities
    title: Enabling or disabling entities
ha_quality_scale: bronze
---

**FRITZ!Box Tools** 集成允许您控制您的 [FRITZ!Box](https://en.fritz.com/products/fritzbox/) 路由器（由 FRITZ!，前身为 AVM 制造），并对已连接的网络设备进行存在检测。

Home Assistant 支持以下平台类型：

- **设备追踪器** - 通过查看已连接的设备进行存在检测。
- **二元传感器** - 连接状态。
- **图像** - 访客 Wi-Fi 的二维码。
- **按钮** - 重启、重新连接、固件更新。
- **传感器** - 外部 IP 地址、运行时间、CPU 温度和网络监控。
- **开关** - 呼叫转移、端口转发、家长控制和 Wi-Fi 网络。
- **更新** - 设备的固件状态。

## 前提条件

:::important
在 FRITZ!Box 的 **家庭网络** > **网络** > **网络设置** > **家庭网络中的访问设置** 下，需要同时启用 TR-064（_允许应用访问_）和 UPnP（_通过 UPnP 传输状态信息_）协议，以便 Home Assistant 登录并读取设备信息。

要使用[拨号](#action-dial)动作，还必须在 **电话** > **通话** > **点击拨号** 下启用 FRITZ!Box 的点击拨号服务。

:::
### 用户名

建议创建一个单独的用户将 Home Assistant 连接到您的 FRITZ!Box。要创建用户，在 FRITZ!Box 中前往 **系统** > **FRITZ!Box 用户** > **用户** > **添加用户**。确保用户具有 **FRITZ!Box 设置** 权限。

:::note
如果您仍想使用预定义的用户，请注意，从 FRITZ!OS 7.24 开始，如果您没有自己设置管理员用户名，FRITZ!Box 会为管理员用户创建一个随机用户名。登录 FRITZ!Box 并访问 **系统** > **FRITZ!Box 用户** > **用户** 后可以找到它。用户名以 `fritz` 开头，后跟四个随机数字。在右侧的属性下显示 `自动创建`。在 FRITZ!OS 7.24 之前，默认用户名为 `admin`。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: FRITZ!Box 路由器的主机名或 IP 地址。
Port:
    description: 用于连接到 FRITZ!Box 路由器的端口。留空以使用默认端口。
Username:
    description: 用于将 Home Assistant 连接到 FRITZ!Box 的用户名（_请参阅[用户名](#username)_）
Password:
    description: 用于将 Home Assistant 连接到 FRITZ!Box 的用户密码（_请参阅[用户名](#username)_）
Uses an SSL certificate:
    description: 是否使用 SSL 加密连接到 FRITZ!Box 路由器。
Enable network device tracking:
    description: 是否启用或禁用网络设备跟踪功能。禁用时，所有网络设备相关实体（_家长控制开关、设备追踪器和 WoL 按钮_）也将被移除或不创建。
```

## Options

To define options for FRITZ!Box Tools, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of FRITZ!Box Tools are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Consider home:
    description: 断开连接的设备在被认为"不在家"之前必须经过的秒数。
Enable old discovery method:
    description: 在无网格支持的网络（_FritzOS <= 6.x_）或混合品牌网络设备或 LAN 交换机等场景中需要。
Enable network device tracking:
    description: 是否启用或禁用网络设备跟踪功能。禁用时，所有网络设备相关实体（_家长控制开关、设备追踪器和 WoL 按钮_）也将被移除或不创建。
```

## 数据更新

此集成每 30 秒从 FRITZ!Box 路由器获取一次数据。

## 动作

可用动作：

- `set_guest_wifi_password`
- `dial`

### 动作：设置访客 Wi-Fi 密码

`fritz.set_guest_wifi_password` 动作允许您为访客 Wi-Fi 设置新密码。密码长度必须在 8 到 63 个字符之间。

| 数据属性 | 必需 | 描述 |
| --- | --- | --- |
| `device_id` | 是 | 仅对特定路由器执行操作 |
| `password` | 否 | 访客 wifi 的新密码（_如果未定义将自动生成_） |
| `length` | 否 | 自动生成密码的长度。（_默认 12_） |

### 动作：拨号

`fritz.dial` 动作允许您让 FRITZ!Box 拨打电话号码。

| 数据属性 | 必需 | 描述 |
| --- | --- | --- |
| `device_id` | 是 | 仅对特定路由器执行操作 |
| `number` | 是 | 要拨打的电话号码 |
| `max_ring_seconds` | 是 | 拨号后响铃的最大秒数。请注意，实际响铃持续时间可能较短，具体取决于接听者的电话设置。（_默认 15 秒_） |

## 附加信息

### 家长控制开关

家长控制开关可用于启用和禁用单个设备的互联网访问。您还可以在 FRITZ!Box 界面的 **互联网** > **过滤器** > **家长控制** > **设备阻止** 中找到各个设备的当前阻止状态。

### 设备追踪器

**注意**：如果您不想自动跟踪新检测到的设备，请禁用集成系统选项 `启用新添加的实体`。

### 端口转发开关

出于安全原因，FRITZ! 实现了仅允许规则中涉及的主机启用/禁用端口转发规则。因此，此集成将仅为以您的 Home Assistant 主机为目的地的规则创建实体。

**注意 1**：在 FRITZ!Box 的 **互联网** > **允许访问** 下，为运行 HA 的设备启用设置 `允许此设备独立端口共享`。

**注意 2**：仅适用于您有专用 IPv4 地址的情况（_不适用于 DS-Lite_）

### WiFi 开关

为 FRITZ!Box 服务的每个 SSID 创建 WiFi 开关。使用这些开关，可以激活和停用每个单独的 SSID。

**注意 1**：在网格设置中，WiFi 设置会被每个网格中继器采用（_**家庭网络 > 网格 > 网格设置 > 自动采用网格设置**_）

**注意 2**：对于网格中继器，这些开关默认禁用，但可以启用。当您的网格基于网格主站和网格中继器之间的 WiFi 连接时，也不会为网格中继器创建 WiFi 开关。

## 示例自动化和脚本

### 脚本：重新连接 / 获取新 IP

以下脚本可用于轻松地向您的 UI 添加重新连接按钮。如果您想重启 FRITZ!Box，可以改用 `fritz.reboot`。

```yaml
fritz_box_reconnect:
  alias: "重新连接 FRITZ!Box"
  sequence:
    - action: button.press
      target:
        entity_id: button.fritzbox_7530_reconnect

```

### 自动化：每晚重新连接 / 获取新 IP

```yaml
automation:
- alias: "重新连接 FRITZ!Box"
  triggers:
    - trigger: time
      at: "05:00:00"
  actions:
    - action: button.press
      target:
        entity_id: button.fritzbox_7530_reconnect

```

### 自动化：创建访客 Wi-Fi 时发送 WiFi 凭证到手机

```yaml
automation:
  - alias: "访客 WiFi 开启 -> 发送密码到手机"
    triggers:
      - trigger: state
        entity_id: switch.fritzbox_7530_wifi_myssid
        to: "on"
    actions:
      - action: notify.notify
        data:
          title: "访客 WiFi 已启用"
          message: "密码：..."

```

## 故障排除

无论何种情况，报告问题时，请启用[调试日志](/home-assistant/docs/configuration/troubleshooting/#enabling-debug-logging)，重新启动集成，一旦问题再次出现，请再次停止调试日志（_调试日志文件将自动开始下载_）。此外，_如果仍然可能_，请同时下载[诊断数据](/home-assistant/docs/configuration/troubleshooting/#download-diagnostics)。如果您已收集调试日志和诊断数据，请将其与问题报告一起提供。

### 设备存在检测未按预期工作

检查是否适用以下情况之一：

- 您看到设备仍然存在，即使它已离线或断开连接超过配置的[视为在家](#consider-home)秒数。
- 您正在使用额外的网络设备，如网络交换机或 WiFi 接入点（不是 Fritz!Repeater 或其他 FRITZ! 组件），但未在家用网络中配置为[网格](https://en.fritz.com/service/knowledge-base/dok/FRITZ-Box-7590/3329_Mesh-with-FRITZ/)。

如果上述情况之一适用于您的设置，请尝试在[集成选项](#integration-options)中[启用旧发现方法](#enable-old-discovery-method)。这可能会解决问题。

## 移除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

如果您不再使用单独创建的 FRITZ!Box 用户，请在 **系统** > **FRITZ!Box 用户** > **用户** 下从 FRITZ!Box 中删除它。