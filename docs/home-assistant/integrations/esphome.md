---
title: ESPHome
description: 'ESPHome 集成允许 ESPHome(https://esphome.io) 设备通过 原生 ESPHome API(https://esphome.io/components/api/) 直接连接到 Home Assistant。 本页属于 Home Assistant 中文文档。'
featured: true
ha_category:
  - Alarm
  - DIY
  - Update
ha_release: 0.85
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@jesserockz'
  - '@kbx81'
  - '@bdraco'
ha_domain: esphome
ha_zeroconf: true
ha_platforms:
  - alarm_control_panel
  - assist_satellite
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - date
  - datetime
  - diagnostics
  - event
  - fan
  - light
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - text
  - time
  - update
  - valve
  - water_heater
ha_integration_type: device
ha_dhcp: true
ha_quality_scale: platinum
---
# ESPHome

## 概述

**ESPHome** 集成允许 [ESPHome](https://esphome.io) 设备通过 [原生 ESPHome API](https://esphome.io/components/api/) 直接连接到 Home Assistant。

ESPHome 是一个固件生成器和配置系统，能够将微控制器转变为完全可定制的智能家居设备。使用简单的 YAML 配置文件，ESPHome 允许用户定义硬件组件，如传感器、执行器和外设。然后将这些配置编译成自定义固件，可以刷写到目标设备上。

### 主要功能

- **YAML 配置**：使用简洁明了的 YAML 语法指定硬件组件、传感器、执行器和集成。
- **自定义固件生成**：ESPHome 将提供的配置编译成高度优化的、特定于设备的固件镜像，准备刷写到微控制器上。
- **无缝集成**：刷写后，ESPHome 设备可以使用 ESPHome 原生 API 与 Home Assistant 无缝集成。此文档页面专注于 [原生 API](https://esphome.io/components/api/)，它允许设备直接与 Home Assistant 通信以进行实时自动化和监控。对于其他集成，如 MQTT 或 HTTP，请参阅 [ESPHome 文档](https://esphome.io/)的相关部分。

ESPHome 支持多种微控制器，不仅限于 ESP 系列。包括：

- **ESP32**：具有 Wi-Fi 和蓝牙功能的强大微控制器。
- **ESP8266**：具有 Wi-Fi 支持的低成本微控制器。
- **BK72xx**：来自 Beken 的微控制器系列，常用于智能家居应用。
- **RP2040**：由 Raspberry Pi 开发的微控制器，以其灵活性和成本效益著称。
- **RTL87xx**：来自 Realtek 的微控制器系列，支持各种无线通信协议。

有关官方支持的微控制器和设备列表，请参阅 [ESPHome 设备数据库](https://devices.esphome.io/)。请记住，此数据库仅代表生态系统的一部分——还有许多其他设备和外设受支持，但可能不会出现在数据库中。

有关完整、即用型配置的灵感和示例，请查看 [ESPHome 现成项目](https://esphome.io/projects/)。这些包括 [蓝牙代理](https://esphome.io/components/bluetooth_proxy/) 等设置，可以扩展 Home Assistant 的 [蓝牙](/home-assistant/integrations/bluetooth/#remote-adapters-bluetooth-proxies) 范围。

如果您正在寻找预构建的解决方案，[Voice PE](https://www.home-assistant.io/voice-pe/) 是一个很好的例子。它是由 ESPHome 驱动的预构建语音助手设备，提供将语音控制集成到 Home Assistant 系统的简单方法。许多预构建的解决方案，如 Voice PE，都是开源的，可以进行自定义，让您可以灵活地根据需要进行调整。

有关配置不受支持或自定义设备的详细信息，请查阅官方 [ESPHome 文档](https://esphome.io/)，其中提供了超越预配置设备扩展和自定义设置的深入指南。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 必需的手动输入

要配置 ESPHome 设备，请输入以下信息：

```yaml
host:
  description: "ESPHome 设备的 IP 地址或主机名。<br>如果设备是自动发现的，这将预先填充。"
port:
  description: "ESPHome 原生 API 使用的端口（默认：6053）。<br>如果设备是自动发现的，这将预先填充。"
noise_psk:
  description: "用于加密的预共享密钥。<br>这是一个 32 字节的 base64 编码字符串。如果未启用原生加密，请留空。"
password:
  description: "设备密码（已弃用）。<br>请使用 Noise PSK（加密密钥）代替——密码支持将在未来版本中移除。"
```

更多信息，请参阅 [ESPHome 原生 API 组件文档](https://esphome.io/components/api/)。

## Options

To define options for ESPHome, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of ESPHome are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

这些选项默认禁用，不是必需的——仅在特别需要时设置。

```yaml
Allow the device to perform Home Assistant actions:
  description: "否/是<br>启用后，ESPHome 设备可以执行 Home Assistant 动作，如调用服务或发送事件。仅当您信任该设备时才启用此选项。"
Subscribe to logs from the device:
  description: "否/是<br>启用后，设备将向 Home Assistant 发送日志，您可以在日志面板中查看。"
```

## 支持的设备

ESPHome 集成适用于运行 ESPHome 固件并通过 [原生 ESPHome API](https://esphome.io/components/api/) 公开其功能的设备。此 API 专为与 Home Assistant 紧密、高效的集成而设计，使 ESPHome 设备能够**近乎实时**地将更新直接推送到 Home Assistant。

## 更新数据

Home Assistant 不会轮询传感器值或设备状态，而是使用原生 API 与每个 ESPHome 设备保持持久连接。这允许状态变化——如温度传感器更新、按钮按下或二值传感器触发——在发生时立即发送，从而减少延迟并提高自动化的响应速度。

### 其他技术细节

- **高效通信协议**：ESPHome 使用基于 TCP 的轻量级双向协议，专为微控制器优化。此协议在 [aioesphomeapi](https://github.com/esphome/aioesphomeapi) 中实现，这是 Home Assistant 用于处理与 ESPHome 设备实时通信的异步 Python 库。它支持低延迟更新和近乎即时的命令执行。
- **自动重新连接**：Home Assistant 与每个 ESPHome 设备保持持久连接，如果连接丢失，将自动尝试重新连接。这包括支持"休眠"或电池供电的设备，它们定期从深度睡眠中唤醒。当此类设备上线时，Home Assistant 会快速重新建立连接——特别是当 **mDNS**（多播 DNS）可用时——允许在不需静态 IP 或手动配置的情况下发现和连接设备。

与传统的基于轮询的集成相比，这种实时行为支持快速、响应式的自动化和流畅的用户体验。

## 支持的功能

### 实体

可用的实体取决于每个设备的 ESPHome YAML 配置中定义的组件。这些实体通过 [原生 API 组件](https://esphome.io/components/api/) 公开。

### 在 Home Assistant 事件总线上触发事件

在 Home Assistant 中使用原生 API 时，您可以直接从 ESPHome 在 Home Assistant 事件总线上触发事件。更多详情，请参阅 [homeassistant.event 动作](https://esphome.io/components/api/#homeassistantevent-action)。

### 动作

每个设备都可以根据其 ESPHome YAML 配置定义 Home Assistant 动作。更多信息，请参阅 [原生 API 组件](https://esphome.io/components/api/) 文档中的 [动作](https://esphome.io/components/api/#actions) 部分。

### 从 Home Assistant 检索数据

ESPHome 可以使用 [原生 API](https://esphome.io/components/api/) 和 [用户定义的动作](https://esphome.io/components/api/#user-defined-actions) 检索 Home Assistant 实体的状态。

### Home Assistant 动作

ESPHome 设备可以调用任何 [Home Assistant 动作](https://esphome.io/components/api/#homeassistantaction-action)。此功能对新添加的设备默认不启用，但可以通过选项流按设备启用。

### 标签扫描支持

[原生 API 组件](https://esphome.io/components/api/) 还支持向 Home Assistant 发送标签扫描事件。更多信息，请参阅 [homeassistant.tag_scanned 动作](https://esphome.io/components/api/#homeassistanttag_scanned-action)。

## 实体命名和 ID

- 实体名称是友好名称（或名称，如果未设置）和组件名称的组合
- 实体 ID 从实体名称派生
- 名称中的 Unicode 字符将音译为最接近的 ASCII 等效字符以保持兼容性

设置 `friendly_name` 的示例：

```yaml
esphome:
   name: "livingroomdesk"
   friendly_name: "Living room desk"

sensor:
   name: "Temperature"
```

实体将被命名为 `Living room desk Temperature`，默认情况下实体 ID 为 `sensor.living_room_desk_temperature`。

未设置 `friendly_name` 的示例：

```yaml
esphome:
   name: "livingroomdesk"

sensor:
   name: "Temperature"
```

实体将被命名为 `livingroomdesk Temperature`，默认情况下实体 ID 为 `sensor.livingroomdesk_temperature`。

包含 Unicode 字符的示例：

```yaml
esphome:
   name: "haloszoba-klima"
   friendly_name: "Hálószoba klíma"

sensor:
   name: "Árvíztűrő tükörfúrógép"
```

实体将被命名为 `Hálószoba klíma Árvíztűrő tükörfúrógép`，默认情况下实体 ID 为 `sensor.haloszoba_klima_arvizturo_tukorfurogep`。请注意 Unicode 字符是如何音译而不是用下划线替换的。

## 故障排除

### 查看实时日志

要对 ESPHome 设备进行故障排除，无论您是使用 [**ESPHome Device Builder**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon) 还是 **ESPHome CLI**，都可以轻松查看实时日志。日志包含详细信息，如 Wi-Fi 连接状态、错误和调试消息，可以帮助您识别和解决设备问题。

#### 使用 [**ESPHome Device Builder**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon)

1. 在 [**ESPHome Device Builder**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon) 应用中，找到您正在使用的设备。
2. 点击 **LOGS** 按钮打开日志视图。

#### 使用 **ESPHome CLI**

如果您使用 **ESPHome CLI**，请按照 [logs 命令](https://esphome.io/guides/cli/#logs-command)的说明访问日志。

### 从设备获取日志

如果您希望设备发送日志而不需要您主动监控，请按照以下步骤操作：

1. 要让设备向 Home Assistant 发送日志，在 [选项流](#options) 中启用 `Subscribe to logs from the device`。
   - 它们以等效级别记录在 `homeassistant.components.esphome` 记录器下。

2. 要调整日志级别，有两个选项：
    - 启用[调试日志](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，
    - 或使用[开发者工具](/home-assistant/docs/tools/dev-tools/#actions-tab)调用 [`logger.set_level`](/home-assistant/integrations/logger/#action-set_level) 动作指定所需级别：

      ```yaml
      action: logger.set_level
      data:
        homeassistant.components.esphome: debug
      ```

## 重新配置和设备更换

此集成支持重新配置，允许您在设备已设置后进行更改——例如更新 IP 地址。

### 名称冲突解决

如果 Home Assistant 检测到多个设备具有相同的 [**name**](https://esphome.io/components/esphome/#configuration-variables)，它将自动启动 **名称冲突解决**。此过程旨在帮助您用新硬件无缝更换失败或退役的设备，同时保留现有配置（如果需要）。

此过程给您两个选项：

- **迁移**：将现有实体配置传输到新设备。这保留所有设置、实体名称和历史记录。当您更换硬件但保持相同的 YAML 配置时使用此选项。
- **覆盖**：用新设备替换现有配置。
  **注意：** 这将**删除旧设备的所有现有设置**，包括实体名称、自定义和历史记录将丢失。仅在新设备完全不同且您不需要之前设置的任何内容时使用此选项。

:::tip
如果您在新设备上使用相同的 YAML 文件，选择 **迁移**。如果是完全不同的设备（即使它共享相同的名称），**覆盖** 是更安全的选择。

:::
---

### 名称冲突解决的要求

要触发名称冲突解决，必须满足以下所有条件：

- 新设备必须运行 **ESPHome 2025.4.0 或更高版本**。
- 新设备必须使用相同的 [**name**](https://esphome.io/components/esphome/#configuration-variables)（不仅仅是友好名称）。
- 原始（旧）设备必须**离线**。

---

### 如何触发名称冲突解决

您可以通过多种方式触发名称冲突解决：

- 连接具有相同名称和**静态 IP 地址**的新设备将自动启动修复流程。
- 使用 UI 中的 **重新配置** 选项指向托管具有相同名称设备的不同 IP。
- 配置使用相同名称的**新发现设备**。
- 通过集成设置**手动添加**具有相同名称的设备。

## 已知限制

每个 ESPHome 设备必须有一个**唯一名称**。此名称对于 mDNS 公告很重要，确保设备可以被正确发现、在上线或从深度睡眠唤醒时快速重新连接（对于支持深度睡眠的设备），并正确链接到 [**ESPHome Device Builder**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon) 应用。对于 **DHCP 发现**（如果 mDNS 不可用），这也至关重要。

使用重复名称可能导致连接问题、发现失败以及集成和 Home Assistant 应用（以前称为插件）的意外行为。

## 删除集成

此集成遵循标准集成删除流程；无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.