---
title: Overkiz
description: 有关如何将使用 Overkiz IoT 平台的集线器与 Home Assistant 集成的说明。
ha_category:
  - Alarm
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Hub
  - Light
  - Lock
  - Number
  - Scene
  - Select
  - Sensor
  - Siren
  - Switch
  - Water heater
ha_release: 2022.2
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@imicknl'
ha_domain: overkiz
ha_dhcp: true
ha_zeroconf: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - light
  - lock
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
  - water_heater
ha_integration_type: hub
---

Overkiz（由 Somfy 提供）IoT 平台被许多不同厂商使用，例如 Somfy、Hitachi 和 Atlantic。此集成允许您通过 Overkiz API 将这些设备接入 Home Assistant。

## 支持的网关与设备

- Atlantic Cozytouch
- Bouygues Flexom
- Hitachi Hi Kumo
- Nexity Eugénie
- Sauter Cozytouch
- Simu LiveIn2
- Somfy Connectivity Kit
- Somfy Connexoon IO _(local API available)_
- Somfy Connexoon RTS _(local API available)_
- Somfy TaHoma v2 _(local API available)_
- Somfy TaHoma Beecon _(local API available)_
- Somfy TaHoma Switch _(local API available)_
- Thermor Cozytouch
- Ubiwizz

Overkiz 平台兼容 60 个品牌的 6000 多种设备。此集成会获取您的设备，并将其映射到相应的 Home Assistant 平台。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

Overkiz 集成同时支持 Overkiz 云端 API 和本地 API（仅部分 Somfy 网关支持）。对于兼容的 Somfy 网关，您可以通过本地连接在无互联网连接的情况下控制设备。开始前，请先选择您用于控制设备的服务器或应用。

### 登录 Overkiz（云端 API）

```yaml
"Username":
  description: "您的 Overkiz 云账户用户名（即您在 IoT 应用中使用的账户）。"
Password:
  description: "您的 Overkiz 云账户密码（即您在 IoT 应用中使用的账户）。"
```

### 登录 Overkiz（本地 API）

要使用本地 API，您必须在 TaHoma by Somfy 应用中启用 [Somfy TaHoma Developer Mode](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode?tab=readme-ov-file#getting-started)。请按照[官方说明](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode?tab=readme-ov-file#getting-started)生成令牌。Home Assistant 通过本地 API 连接到您的网关时需要使用此令牌。

Somfy TaHoma Developer Mode **不支持**场景和 climate 实体。

```yaml
"Host":
  description: "您的 Overkiz 网关的主机名或 IP 地址。主机名为网关 PIN 加上 `.local:8443`（例如 `1234-4567-8912.local`）。"
"Token":
  description: "由用于控制设备的应用生成的令牌。"
Verify SSL:
  description: "验证网关的 SSL 证书。此选项仅在通过主机名连接时可用。"
```

## 数据更新

此集成每 30 秒从 Overkiz 获取一次数据，以确保及时更新。如果您仅拥有无状态设备（RTS 协议），此集成会每小时轮询一次新数据，以减少对 Overkiz API 的不必要负载。

## 已知限制

### 不支持的硬件

您在厂商应用中看到的某些设备可能并未使用 Overkiz 平台，因此无法通过 Overkiz API 访问。例如，Somfy Protect 设备和部分 Atlantic Cozytouch 设备就不受此集成支持。

如果您的 Cozytouch 设备不受 Overkiz 集成支持，可以尝试使用社区创建的[自定义组件](https://github.com/gduteil/cozytouch)。它们可能支持更多 Cozytouch 设备。

### 不支持 Zigbee、Z-Wave、Hue 和 Sonos 设备

尽管大多数 Overkiz 网关支持添加 Zigbee、Z-Wave、Hue 和 Sonos 设备，但 Overkiz 集成并不支持这些设备。这些平台在 Home Assistant 中均有原生集成，可提供更频繁的状态更新和更丰富的功能。

### 无状态 RTS 窗帘

RTS 窗帘不会向网关回报状态，因此 Home Assistant 无法在控制后跟踪其状态。如果您只通过 Home Assistant 控制 RTS 窗帘，可以使用 [template cover](/home-assistant/integrations/template/#cover) 创建一个有状态的窗帘实体。这样可以帮助您跟踪当前状态（打开或关闭），并在自动化和场景中使用它。

```yaml
cover:
  - platform: template
    covers:
      stateful_rts_test_shutter: # unique ID
        friendly_name: "Stateful RTS Test Shutter" # your name
        optimistic: true # default when no state is available
        open_cover:
          - action: cover.open_cover
            target:
              entity_id: cover.rts_test_shutter # change to your device id
        close_cover:
          - action: cover.close_cover
            target:
              entity_id: cover.rts_test_shutter # change to your device id
        stop_cover:
          - action: cover.stop_cover
            target:
              entity_id: cover.rts_test_shutter # change to your device id
```

### 排查本地 API 连接问题

如果您的实体经常短时间变为 unavailable，通常说明 Home Assistant 与网关之间存在连接问题。为提高稳定性，请尝试使用网关的 IP 地址而不是 `gateway-xxxx-xxxx-xxx.local` 主机名进行连接。

### Overkiz API 限制

**并非所有设备都会广播状态变化**

部分 Overkiz 设备不会广播状态变化。为了更新这些设备的状态，厂商应用（例如 Somfy TaHoma）会在打开时请求一次状态更新。随后，应用会通过事件广播这些状态，而 Overkiz 集成也会监听这些事件。Overkiz 集成无法完全复制这种行为，因为它不知道您何时打开 Home Assistant 仪表板或运行自动化。

因此，Home Assistant 中某些 Overkiz 设备的状态可能并不总是最新的。

**Server busy, please try again later.（执行次数过多）**

在高峰时段，Overkiz 平台可能无法执行您的命令。此集成会尝试重试该命令，但不能保证一定成功。

**网关执行队列已满**

Overkiz API 的执行队列最多只支持 10 个请求。如果您尝试同时控制更多设备，例如通过群组控制，就会因 `EXEC_QUEUE_FULL` 而失败。作为替代方案，您可以在对应应用中创建一个场景，并在集成同步后调用该场景。

### 通过本地 API 的设备支持情况

由于本地 API 的限制，Somfy TaHoma Developer Mode **不支持**多种传感器、场景和 climate 实体。如果您的设备在云端 API 下可用，但在本地 API 下不可用，这属于本地 API 的固有限制，无法解决。

### 通过 HomeKit 的设备支持情况

如果您的网关（例如 Somfy Connectivity Kit）支持 HomeKit，Home Assistant 中会添加一个名为 **HomeKit Setup Code** 的传感器。要配置 [HomeKit Controller](/home-assistant/integrations/homekit_controller/) 集成以进行本地控制，请按照以下步骤操作：

1. 在 Home Assistant 中找到 **HomeKit Setup Code** 传感器。
2. 获取该传感器中的设置代码值。
3. 使用此设置代码在 Home Assistant 中配置 [HomeKit Controller](/home-assistant/integrations/homekit_controller/) 集成。

请注意，只有[有限的一组设备支持通过 HomeKit 使用](https://service.somfy.com/downloads/nl_v5/tahoma-homekitcompatibilitylist_eng.pdf)。

## 删除集成

此集成遵循标准的集成删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
