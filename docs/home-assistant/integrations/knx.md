---
title: KNX
description: 'KNX(https://www.knx.org) 集成可将 Home Assistant 连接到您的 KNX 安装，使您能够控制 KNX 设备、响应报文，并将其他集成实体的状态变化转发到 KNX 总线。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
featured: true
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Date
  - Fan
  - Hub
  - Light
  - Notifications
  - Number
  - Scene
  - Select
  - Sensor
  - Switch
  - Text
  - Time
  - Weather
ha_release: 0.24
ha_iot_class: Local Push
ha_codeowners:
  - '@Julius2342'
  - '@farmio'
  - '@marvin-w'
ha_domain: knx
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - date
  - datetime
  - diagnostics
  - fan
  - light
  - notify
  - number
  - scene
  - select
  - sensor
  - switch
  - text
  - time
  - weather
ha_config_flow: true
ha_integration_type: hub
ha_quality_scale: platinum
---
# KNX

[KNX](https://www.knx.org) 集成可将 Home Assistant 连接到您的 KNX 安装，使您能够控制 KNX 设备、响应报文，并将其他集成实体的状态变化转发到 KNX 总线。

此集成需要本地 KNX/IP 接口或路由器，以建立 Home Assistant 与 KNX 总线之间的连接。

目前在 Home Assistant 中支持以下设备类型：

- [二进制传感器](#binary-sensor)
- [按钮](#button)
- [温控](#climate)
- [遮罩](#cover)
- [日期](#date)
- [日期时间](#datetime)
- [风扇](#fan)
- [灯光](#light)
- [通知](#notify)
- [数值](#number)
- [场景](#scene)
- [选择项](#select)
- [传感器](#sensor)
- [开关](#switch)
- [文本](#text)
- [时间](#time)
- [天气](#weather)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### KNX 连接方式 {#knx-connection}

请选择连接到 KNX 总线的方式。此集成支持以下连接方法：

- `Automatic` 会在启动时扫描网关，以查找 KNX IP 接口，并通过隧道连接。当初始化设置时网关扫描未成功时，此选项不可用。
- `Tunneling` 会通过隧道连接到指定的 KNX IP 接口。
- `Routing` 会使用 Multicast 与 KNX IP 路由器通信。

有关 KNX 连接类型的更多信息，请参阅 [连接设置](#connection)。

### 隧道专用设置

如果在设置期间发现了多个隧道设备，您可以选择其中一个特定设备。如果未发现任何设备，也可以手动配置连接信息。

```yaml
KNX tunneling type:
  description: "`UDP`、`TCP` 或 `Secure Tunneling`"
Host:
  description: "KNX/IP 隧道设备的 IP 地址或主机名。"
Port:
  description: "KNX/IP 隧道设备使用的端口。"
Route back / NAT mode:
  description: "如果您的 KNXnet/IP 隧道服务器位于 NAT 后面，请启用此项。仅适用于 UDP 连接。"
Local IP interface:
  description: "Home Assistant 发起连接时使用的本地 IP 或接口名称。留空则使用自动发现。"
```

#### 隧道端点

请选择用于连接的隧道端点。此步骤仅适用于 `TCP` 或 `Secure Tunneling` 连接类型。

### 路由专用设置

```yaml
Individual address:
  description: "Home Assistant 用于发送报文的 KNX individual address。该地址不应被您安装中的任何其他设备使用。"
KNX IP Secure Routing:
  description: "如果您的安装使用符合 KNX IP Secure 标准的加密通信，请选择此项。该设置需要兼容的设备和正确配置。下一步会提示您输入凭据。"
Multicast group:
  description: "安装中使用的 Multicast 组。默认值为 `224.0.23.12`"
Multicast port:
  description: "安装中使用的 Multicast 端口。默认值为 `3671`"
Local IP interface:
  description: "Home Assistant 发起连接时使用的本地 IP 或接口名称。留空则使用自动发现。"
```

### KNX IP Secure 专用设置 {#knx-ip-secure-specific-settings}

有关如何获取此配置步骤所需文件或密钥，请参阅 [Connection](#connection)。

## 重新配置 {#reconfiguration}

您可以随时通过集成设置更改 KNX 连接配置。这在您需要更新 Keyring 文件或切换到其他连接类型时非常有用。

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 选择 **KNX**。
3. 点击三点菜单 `[mdi:dots-vertical]`，然后选择 **重新配置**。

### 配置 KNX 接口 {#configure-knx-interface}

重新配置连接设置。更多信息请参阅上文。

### 导入 KNX Keyring {#import-knx-keyring}

提供一个供集成使用的新 keyring 文件。有关如何获取该文件，请参阅 [KNX Secure](#knx-secure)。

## 选项 {#options}

如需配置 KNX 选项，请按以下步骤操作：

1. 在 Home Assistant 中，前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 如果已配置多个 KNX 实例，请选择要配置的实例。
3. 在卡片上选择齿轮图标 `[mdi:cog-outline]`。
   - 如果卡片上没有齿轮图标，说明该集成不支持此设备的选项设置。

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. 编辑选项，然后选择 **提交** 以保存更改。

```yaml
State updater:
  description: "设置定期从 KNX 总线读取状态地址时的默认行为。"
Rate limit:
  description: "每秒最大发送报文数。`0` 表示禁用限制 - 这是推荐设置。"
Telegram history limit:
  description: "为 KNX 面板组监视器保留在内存中的报文数量。"
```

## 基本配置

要使用 KNX 集成提供的各种平台，您需要通过 KNX 面板进行设置，或将相应的 YAML 配置添加到 `configuration.yaml` 中。如果您希望将 YAML 部分拆分到专用文件中，请参阅[拆分配置](/home-assistant/docs/configuration/splitting_configuration/)。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
knx:
  # configure platforms directly in configuration.yaml
  binary_sensor:
    - name: "My first binary sensor"
      state_address: "1/2/3"
    # etc...
  # or outsource platform configuration to separate files
  sensor: !include knx_sensor.yaml
```

有关如何正确配置，请参阅下方各平台的专门章节。

### 组地址

组地址可配置为字符串或整数。3 级组地址结构使用 `1/2/3` 格式，2 级组地址结构使用 `1/2` 格式，自由组地址结构则使用 `1` 格式。

HA KNX 集成使用已配置的 `state_address` 或 `*_state_address` 来更新某项功能的状态。这些地址会在启动时，以及在一小时内没有收到传入报文时（默认 `sync_state`）通过 GroupValueRead 请求读取。

可以为每个 KNX 平台的所有功能（`expose` 和 `notify` 除外）配置被动/监听组地址。这样便可以使用多个组地址来更新对应功能的状态（例如灯光亮度）。当组地址配置为字符串列表时，第一个条目是主动发送或读取状态的地址，其余条目则注册为被动地址。这种模式与 ETS 配置类似，即第一个是“发送”地址，其余地址仅用于更新组对象。

如果您的 KNX 设备提供主动状态组对象，建议使用 `*_state_address` 而不是被动地址，因为这样可以降低配置复杂度，并避免错误状态（例如通道被逻辑锁定时）。

```yaml
knx:
  switch:
    - name: "Switch without passive addresses"
      address: "1/1/1" # this is the address that will be sent to
      state_address: "8/8/8"  # this is the address GroupValueRead requests are sent to
    - name: "Switch with passive addresses"
      address: 
        - "1/1/1" # this is the address that will be sent to
        - "1/1/2" # this and following are passive addresses
        - "1/1/3"
      state_address: 
        - "8/8/8" # this is the address GroupValueRead requests are sent to
        - "8/8/2" # this and following are passive addresses
        - "8/8/3"
```

## 连接设置 {#connection}

连接参数会在集成设置过程中完成配置，并可在之后的集成设置中修改。

### KNX 安全功能 {#knx-secure}

KNX 集成同时支持 IP Secure 和 Data Secure。

#### IP Secure {#ip-secure}

IP Secure 凭据可通过两种方式提供：

1. 使用 `.knxkeys` 文件：该文件可从 ETS 导出，并导入到集成设置中。
2. 手动配置：如果您未使用 Data Secure，可以在集成设置中手动输入所需的 IP Secure 凭据。

#### Data Secure {#data-secure}

Data Secure 凭据始终来自 `.knxkeys` 文件。您可以在集成设置中导入或更新 Keyring 文件。

:::important
在导出 Keyring 文件之前，请先在 ETS 中将 Home Assistant 会使用的所有受保护组地址分配给接口的隧道端点，或分配给一个虚拟设备（dummy device）。


:::
在更新安全组时，请确保所有参与的设备、路由器和耦合器应用也一并更新。完成更改后，请将更新后的 Keyring 文件重新加载到 Home Assistant 中。

### 隧道

隧道连接（Tunneling）使用 KNX IP Interface 连接到 KNX 总线。大多数 KNX IP Router 也支持隧道连接。这是推荐的连接类型，也是您在集成设置中选择 `Automatic` 连接时所使用的方式。

对于较新的接口（支持 TCP 或 IP Secure），您可以选择要使用的特定隧道端点。请确保 Home Assistant 是唯一连接到该隧道端点的客户端。

在 ETS 中，建议将您要使用的组地址连接到 Home Assistant 所使用的隧道端点。对于受保护组地址，这是强制要求。

如果您使用 KNX IP Secure Tunneling 或 Data Secure，请从 ETS 导出 Keyring 文件，并将其导入 KNX 集成设置中。

![Tunnel endpoint setup in ETS 6](/home-assistant/images/integrations/knx/knx_ets_tunnel.png)

:::note
如果您希望 Home Assistant 使用特定的 individual address，可以在 ETS 中修改所用隧道端点的地址。


:::
<details>
<summary>手动配置 IP Secure 隧道凭据</summary>


如果您选择手动配置 IP Secure 隧道连接，则需要以下信息：

1. 用户 ID：请使用 2 或更高的用户 ID。（0 和 1 保留不用。）
   ETS 中第一个隧道端点通常使用用户 ID `2`，第二个使用 `3`，以此类推。
2. 用户密码。
3. 设备认证码（可选）。

![Obtain the tunnel User-ID and password in ETS](/home-assistant/images/integrations/knx/knx_ets_tunnel_password.png)

下图展示了如何在 ETS 中找到设备认证码。

![Obtain device authentication code in ETS](/home-assistant/images/integrations/knx/knx_ets_authentication_code.png)


</details>

### 路由

路由连接（Routing）通过 IP Multicast 与 KNXnet/IP 路由器通信。

使用 routing 时：

1. 在 ETS 中与路由器同一拓扑层级添加一个虚拟设备（dummy device）。
2. 为该虚拟设备分配与 KNX 集成设置中相同的 individual address。
3. 将 Home Assistant 会使用的所有组地址连接到该虚拟设备。
这样可确保路由器和耦合器的过滤表保持最新，并支持 Home Assistant 使用安全组地址。
4. 如果您使用 KNX IP Secure routing 或 Data Secure 组，请从 ETS 导出 Keyring 文件并在 KNX 集成设置中导入。

![Routing dummy setup in ETS 6](/home-assistant/images/integrations/knx/knx_ets_dummy.png)

<details>
<summary>手动配置 IP Secure 路由凭据</summary>


如果您选择手动配置 IP Secure 路由，则需要主干密钥（backbone key）。您可以在 ETS 的 "Project Security" 报告中找到它。

![Backbone key in ETS Project Security report](/home-assistant/images/integrations/knx/knx_ets_backbone_key.png)


</details>

## 数据更新

此集成使用 KNX/IP 协议实时接收总线上的报文（telegram）。集成加载后，会主动请求初始化已配置实体所需的数据。更多信息请参阅 [组地址](#group-addresses)。

`KNX Interface` 设备中的诊断实体状态会每 10 秒轮询一次。

## 触发器

KNX 集成提供了可在自动化中使用的专用触发器平台。

### 报文触发器

`knx.telegram` 触发器可用于在收到入站或出站 KNX telegram 时触发自动化。

:::note
`KNX Interface` 设备也提供了该触发器作为设备触发器。它支持在自动化构建器 UI 中设置选项，但不支持设置特定 <abbr title="data point type">DPT</abbr>（`type`）来解码负载，因为它始终依赖项目数据。

:::
```yaml
destination:
  description: 触发器要监听的组地址，或组地址列表。未设置或设置为空列表时，将监听所有组地址。
  type: [string, list]
  required: false
type:
  description: 设置后，负载会在触发器数据中按指定 DPT 解码。未设置时，DPT 来自项目数据。可用值为 [KNX Sensor](#sensor) 中的 KNX 传感器类型（如 "2byte_float" 或 "percent"）。
  type: [string, integer]
  required: false
group_value_write:
  description: 设为 `false` 时，不会因 GroupValueWrite telegram 触发。
  type: boolean
  default: true
  required: false
group_value_response:
  description: 设为 `false` 时，不会因 GroupValueResponse telegram 触发。
  type: boolean
  default: true
  required: false
group_value_read:
  description: 设为 `false` 时，不会因 GroupValueRead telegram 触发。
  type: boolean
  default: true
  required: false
incoming:
  description: 设为 `false` 时，不会因入站 telegram 触发。
  type: boolean
  default: true
  required: false
outgoing:
  description: 设为 `false` 时，不会因出站 telegram 触发。
  type: boolean
  default: true
  required: false
```

#### 可用的触发器数据

除了[标准自动化触发器数据](/home-assistant/docs/automation/templating/#all)外，`knx.telegram` 触发器平台还提供以下额外触发器数据。

- `trigger.destination` 目标组地址
- `trigger.destination_name` 目标组地址名称
- `trigger.direction` Telegram 方向
- `trigger.dpt_main` 目标组地址主数据点类型编号
- `trigger.dpt_sub` 目标组地址子数据点类型编号
- `trigger.dpt_name` DPT 值类型名称，参见传感器值类型
- `trigger.payload` 原始 telegram 负载。DPT 1、2、3 为 0..255 整数，其他 DPT 为 0..255 整数列表
- `trigger.source` 源 individual address
- `trigger.source_name` 源名称
- `trigger.telegramtype` telegram 的 APCI 类型
- `trigger.timestamp` 时间戳
- `trigger.unit` 按组地址 DPT 解析出的单位
- `trigger.value` 按 DPT 解码后的 telegram 负载

| 模板变量                   | 类型                        | 是否需要项目数据      |
|----------------------------|-----------------------------|-----------------------|
| `trigger.destination`      | string                      | 否                    |
| `trigger.destination_name` | string                      | 是                    |
| `trigger.direction`        | string                      | 否                    |
| `trigger.dpt_main`         | integer                     | 是                    |
| `trigger.dpt_sub`          | integer                     | 是                    |
| `trigger.dpt_name`         | string                      | 是                    |
| `trigger.payload`          | integer or list of integers | 否                    |
| `trigger.source`           | string                      | 否                    |
| `trigger.source_name`      | string                      | 是                    |
| `trigger.telegramtype`     | string                      | 否                    |
| `trigger.timestamp`        | timestamp                   | 否                    |
| `trigger.unit`             | string                      | 是                    |
| `trigger.value`            | any                         | 是                    |

对于需要项目数据的值：如果未找到相关信息，或未提供项目文件，该数据将设为 `null`。

#### 示例

自动化配置示例


```yaml
- alias: "Single group address trigger"
  triggers:
    - trigger: knx.telegram
      destination: 1/2/3
      group_value_read: false
      outgoing: false
  conditions: "{{ trigger.value == 0 }}"
  actions: []
```


触发器数据示例

```yaml
variables:
  triggers:
    id: "0"
    idx: "0"
    alias: null
    destination: 1/2/3
    destination_name: Light office brightness
    direction: Incoming
    dpt_main: 5
    dpt_sub: 1
    dpt_name: percent
    payload:
      - 255
    source: 1.0.51
    source_name: Dimming actuator 1
    telegramtype: GroupValueWrite
    timestamp: "2024-01-09T10:38:28.447487+01:00"
    unit: "%"
    value: 100
context: null
```

## 事件

:::tip
对于自动化触发，建议使用 [knx.telegram](#telegram-trigger) 触发器，而不是 `knx_event`。

:::
```yaml
knx:
  event:
    - address:
        - "0/1/*"
    - address:
        - "1/2/*"
        - "1/3/2-4"
      type: "2byte_unsigned"
    - address:
        - "3/4/5"
      type: "2byte_float"
```

```yaml
address:
  description: 定义用于匹配 KNX 组地址的模式列表。目标地址匹配任一模式的 telegram 会作为 `knx_event` 发送到 Home Assistant 事件总线。
  required: true
  type: [list, string]
type:
  description: `knx_event` 事件中的 telegram 负载会按同一配置块中地址设置的类型（DPT）进行解码。解码值会写入事件数据的 `value` 键。若未配置，`value` 为 `None`，`data` 键仍保留原始负载（适用于 DPT 1、2、3）。所有传感器类型都可用，参见 [KNX Sensor](#sensor)（例如 "2byte_float" 或 "1byte_signed"）。
  type: [string, integer]
  required: false
```

凡是其目标地址匹配上述模式的 telegram，都会在事件总线上作为 `knx_event` 发布，并包含以下数据属性：

- `data` 包含原始负载数据（例如 `1` 或 `"[12, 55]"`）
- `destination` 为 telegram 发送到的 KNX 组地址字符串（例如 `"1/2/3"`）
- `direction` 为 telegram 方向字符串（`"Incoming"` / `"Outgoing"`）
- `source` 为发送方 KNX individual address 字符串（例如 `"1.2.3"`）
- `telegramtype` 为 telegram 的 APCI 服务类型。`"GroupValueWrite"`、`"GroupValueRead"` 或 `"GroupValueResponse"` 会生成 knx_event
- `value` 在地址配置了 `type` 时包含解码后的负载值。对于 `"GroupValueRead"` telegram，该值为 `None`

## 操作

如需直接与 KNX 总线交互，您可以使用以下动作：

### 发送

```text
Domain: knx
Action: send
Data: {"address": "1/0/15", "payload": 0, "type": "temperature"}
```

```yaml
address:
  description: KNX 组地址。
  type: string
payload:
  description: 要发送到总线的负载。未设置 `type` 时会发送原始字节。整数会按 DPT 1/2/3 负载处理。对于大于 6 位的 DPT，请发送列表。每个值表示 1 个字节（0-255），并用 `0` 填充到 DPT 的字节长度。
  type: [integer, list]
type:
  description: 设置后，负载不会以原始字节发送，而是按给定 DPT 编码。可用值为 KNX 传感器类型，参见 [KNX Sensor](#sensor) 中的表格。
  type: [string, integer, float]
response:
  description: 设为 `true` 时，telegram 会以 `GroupValueResponse` 发送，而不是 `GroupValueWrite`。
  type: boolean
  default: false
```


```yaml
# 示例脚本：发送固定值和实体状态
alias: "My Script"
sequence:
  - action: knx.send
    data:
      address: 1/1/1
      type: percent
      payload: 50
      response: false
  - action: knx.send
    data:
      address: 1/1/1
      payload: [128]  # 50 % as 1-byte raw value
      response: false
  - action: knx.send
    data:
      address: 3/3/3
      type: temperature
      payload: "{{ states('sensor.dew_point') }}"
      response: false
```


### 读取

您可以调用 `homeassistant.update_entity` 动作，对某个实体的全部 `*state_address` 发起 GroupValueRead 请求。
如需手动发送 GroupValueRead 请求，请使用 `knx.read` 动作。响应可通过 `knx.telegram` 触发器用于自动化，也会由 KNX 实体处理。

```text
Domain: knx
Action: read
Data: {"address": "1/0/15"}
```

```yaml
address:
  description: 要发送读取请求的组地址。传入列表时会读取多个组地址。
  type: [string, list]
```

```yaml
# 示例自动化：启动移动 10 秒后更新 cover 位置
automation:
  - triggers:
      - trigger: knx.telegram
        # Cover 移动触发地址
        destination: "0/4/20"
    actions:
      - delay: 0:0:10
      - action: knx.read
        data:
          # Cover 位置地址
          address: "0/4/21"

  - triggers:
      - trigger: homeassistant
        event: start
    actions:
      # 注册组地址以触发 knx_event
      - action: knx.event_register
        data:
          # Cover 移动触发地址
          address: "0/4/20"
```

### 注册事件

`knx.event_register` 动作可用于注册（或取消注册）触发 `knx_event` 事件的组地址。在 "`configuration.yaml`" 的 `event` 键中配置的组地址无法取消注册。请参见 [knx_event](#events)

```yaml
address:
  description: 要添加或移除的组地址。
  required: true
  type: [string, list]
remove:
  description: 设为 `true` 时会移除该组地址。
  required: false
  type: boolean
  default: false
type:
  description: 设置后，负载会按指定 DPT 解码，并写入事件数据的 `value` 键。可用值为 [KNX Sensor](#sensor) 中的 KNX 传感器类型（如 "2byte_float" 或 "1byte_signed"）。
  type: [string, integer]
  required: false
```

### 注册暴露

`knx.exposure_register` 动作可用于注册（或取消注册）到 KNX 总线的 exposure。在 "`configuration.yaml`" 中定义的 exposure 无法取消注册。每个地址只能注册一个 exposure。请参见 [expose](#exposing-entity-states-entity-attributes-or-time-to-knx-bus)

```yaml
remove:
  description: 在 [expose](#exposing-entity-states-entity-attributes-or-time-to-knx-bus) 的配置变量基础上，可设置 `remove: true` 来移除 exposure。移除时仅需 `address`。
  required: false
  type: boolean
  default: false
```

## 将实体状态、实体属性或时间暴露到 KNX 总线

将 Home Assistant 的实体状态和属性公开到 KNX 总线，以便其他 KNX 设备响应变化或读取最新值。您还可以广播当前时间与日期。

### 提供当前时间

您可以每小时向 KNX 总线广播当前本地时间、日期，或日期时间组合值。可在 KNX 面板前端中配置，也可通过 YAML 配置。

<details>
<summary>通过 YAML 配置时间暴露</summary>


```yaml
knx:
  expose:
    - type: time
      address: "0/0/1"
```

```yaml
address:
  description: 发送时间信息的 KNX 组地址。其他 KNX 设备可从该地址读取当前时间。
  type: string
  required: true
type:
  description: 选择 `time`（DPT 10.001）仅发送时间，`date`（DPT 11.001）仅发送日期，或 `datetime`（DPT 19.001）发送日期和时间。
  type: string
  required: true
```


</details>

### 实体暴露

公开 Home Assistant 实体，以便与 KNX 总线共享其状态或属性。每当值变化时，Home Assistant 会自动发送当前值，并响应 KNX 总线上的读取请求。


```yaml
knx:
  expose:
    - type: binary
      entity_id: binary_sensor.kitchen_window
      address: "0/6/5"

    # 带默认值的实体状态
    - type: binary
      entity_id: light.office
      address: "0/3/0"
      default: false

    # 带默认值的实体属性
    - type: percent
      entity_id: light.office
      attribute: brightness
      default: 0
      address: "0/3/1"

    # 限制更新频率并周期发送
    - type: temperature
      entity_id: sensor.kitchen_temperature
      address: "0/0/2"
      cooldown:
        minutes: 10
      periodic_send:
        hours: 1

    # value_template 示例
    - type: percent
      address: "1/1/1"
      entity_id: cover.office
      attribute: current_position
      value_template: "{{ 100 - value }}"  # 反转数值
      cooldown: 2  # 秒
    - type: percent
      address: "2/2/2"
      entity_id: media_player.kitchen
      attribute: volume_level
      value_template: "{{ value * 100 }}"  # 将 0..1 转换为百分比
```


```yaml
address:
  description: 发送状态更新的 KNX 组地址。其他设备可从该地址读取值，Home Assistant 也会在此响应读取请求。
  type: string
  required: true
type:
  description: 数据类型。对开/关状态或布尔值使用 `binary`（DPT 1），或使用 [KNX Sensor](#sensor) 中任意值类型，如 `temperature`、`humidity`、`percent`、`string`。
  type: [string, integer]
  required: true
entity_id:
  description: 要公开的实体 ID。
  type: string
  required: false
attribute:
  description: 公开指定实体属性而非主状态。例如可使用 `brightness` 公开灯光亮度，而不是开关状态。
  type: string
  required: false
default:
  description: 当实体状态不可用或未知，或属性未设置时发送的值。若省略 `default`，这些情况下不会发送任何内容，但最后一次已知值仍可用于读取请求。
  type: [boolean, string, integer, float]
  default: None
  required: false
value_template:
  description: 在发送前转换值的 Jinja2 模板。在模板中通过 `value` 访问实体状态或属性值。
  required: false
  default: None
  type: template
cooldown:
  description: 连续两次发送之间的最小时间（秒或时间段）。可用于在值高频变化时减少 KNX 总线流量。冷却期内仅发送最新值。
  type: [time, float]
  required: false
  default: 0
periodic_send:
  description: 自动将当前值重新发送到 KNX 总线的时间间隔（秒或时间段），即使值未变化也会发送。`0` 表示禁用周期发送。
  type: [time, float]
  required: false
  default: 0
respond_to_read:
  description: 响应发送到已配置 `address` 的 GroupValueRead telegram。
  required: false
  type: boolean
  default: true
```

## 实体平台

### 通用实体配置选项

所有 KNX 实体平台都支持以下通用配置选项。

```yaml
name:
  description: 此实体的初始名称。
    实体创建后，将不再使用该配置项。
    您可以在 Home Assistant UI 中更改名称。
  required: false
  type: string
entity_category:
  description: 实体的[分类](https://developers.home-assistant.io/docs/core/entity#generic-properties)。
  required: false
  type: string
  default: None
```

### 二进制传感器 {#binary-sensor}

KNX binary sensor 平台可用于监控 [KNX](https://www.knx.org/) 二进制传感器，如门窗磁、运动探测器和报警器等。

:::note
二进制传感器是只读实体。若要写入 KNX 总线，请配置 [KNX Switch 实体](#switch) 或使用 [`knx.send` 动作](#send)。


:::
Binary sensor 实体可在 KNX 面板前端中创建，也可通过 YAML 创建。

<details>
<summary>通过 YAML 配置 KNX binary sensor 实体</summary>


```yaml
knx:
  binary_sensor:
    - name: "Sensor 1"
      state_address: "6/0/2"
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
state_address:
  description: binary sensor 的 KNX 组地址。*DPT 1*
  required: true
  type: [string, list]
sync_state:
  description: 主动从总线读取值。最大时间间隔（`<minutes>`）为 1440。可用值如下

    - `true` 等同于 "expire 60"（默认）

    - `false` 不向总线发送 GroupValueRead telegram

    - `every <minutes>` 每 \<minutes\> 定期更新

    - `expire <minutes>` 在 \<minutes\> 内未收到 telegram 时从 KNX 总线读取状态

    - `<minutes>` 等同于 "expire \<minutes\>"

    - `init` 仅在启动时初始化状态

  required: false
  type: [boolean, string, integer]
  default: true
device_class:
  description: 设置[设备类别](/home-assistant/integrations/binary_sensor/)，从而改变前端显示的设备状态和图标。
  required: false
  type: string
reset_after:
  description: 在指定秒数后重置为 "off" 状态。
  required: false
  type: float
invert:
  description: 在处理前反转 telegram 负载。该处理先于 `context_timeout` 或 `reset_after` 的判断。
  required: false
  type: boolean
  default: false
ignore_internal_state:
  description: 指定 telegram 是否忽略内部状态，并始终触发 Home Assistant 状态更新。
  required: false
  type: boolean
  default: false
context_timeout:
  description: 多个相同 telegram 负载在该秒数内会计入可用于自动化的内部计数器。该设置定义第二个 telegram 计入同一次状态变化的时间窗口。例如设置为 `3.0` 时，您可在 3 秒内触发第二次按键；若只有一次按键，则会在 3 秒后触发 Home Assistant 状态更新。设置此项后，内部会将 `ignore_internal_state` 设为 `true`。最大值为 `10.0`。
  required: false
  type: float
  default: None
```


</details>

#### 自动化示例 {#automation-example}

假设您已配置一个名为 `Livingroom Switch` 的 binary sensor，并希望按钮按一次切换一盏灯、按两次切换另一盏灯。
要实现此功能，需要配置 `context_timeout`，并确保开关每次按下都发送相同负载（在时间窗口内 `on` - `on`）。

```yaml
automation:
  - triggers:
      - trigger: numeric_state
        entity_id: binary_sensor.livingroom_switch
        attribute: counter
        above: 0
        below: 2
    actions:
      - action: light.toggle
        entity_id: light.livingroom_ceiling_lamp
  - triggers:
      - trigger: numeric_state
        entity_id: binary_sensor.livingroom_switch
        attribute: counter
        above: 1
        below: 3
    actions:
      - action: light.toggle
        target:
          entity_id: 
            - light.livingroom_floor_lamp
```

### 按钮 {#button}

KNX button 平台允许通过前端或动作发送预定义值。用户按下按钮时，会将指定的通用原始负载发送到 KNX 总线。

:::tip
KNX 总线上发往该按钮组地址的 telegram 不会反映为新的按钮状态。如果您要基于某个组地址接收到的特定负载进行自动化，请使用 `knx.telegram` 触发器。

:::
```yaml
# configuration.yaml 配置示例
knx:
  button:
    - name: "DPT 1 - True button"
      address: "0/0/1"
    - name: "100% button"
      address: "0/0/2"
      payload: 0xFF
      payload_length: 1
    - name: "Temperature button"
      address: "0/0/3"
      value: 21.5
      type: temperature
```

:::important
使用 `type` 时必须提供 `value`，`payload` 无效。
使用 `payload_length` 时，`value` 无效。

:::
See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: 要发送到的组地址。
  required: true
  type: string
payload:
  description: 要发送的原始负载。
  required: false
  type: integer
  default: 1
payload_length:
  description: telegram 中负载数据的长度。DPT 1、2、3 使用 `0`。
  required: false
  type: integer
  default: 0
value:
  description: 通过 `type` 编码后要发送的值。
  required: false
  type: [integer, float, string]
type:
  description: 使用[value 类型表](/home-assistant/integrations/knx/#value-types)中的类型对已配置的 `value` 进行编码。
  required: false
  type: [string, integer]
```

### 温控 {#climate}

KNX climate 平台用作 KNX 恒温器和房间控制器的接口。

Climate 实体可在 KNX 面板前端中创建，也可通过 YAML 创建。

<details>
<summary>通过 YAML 配置 KNX climate 实体</summary>


要在您的安装中使用 KNX 恒温器，请将以下内容添加到 "`configuration.yaml`" 顶层的 [KNX Integration](/home-assistant/integrations/knx) 配置键中：

```yaml
# Example configuration.yaml entry
knx:
  climate:
    - name: "Kitchen"
      temperature_address: "5/1/1"
      setpoint_shift_address: "5/1/2"
      setpoint_shift_state_address: "5/1/3"
      target_temperature_state_address: "5/1/4"
      operation_mode_address: "5/1/5"
      operation_mode_state_address: "5/1/6"
```

或者，如果您的设备为防冻/夜间/舒适模式提供了专用的二进制组地址：

```yaml
# Example configuration.yaml entry
knx:
  climate:
    - name: "Kitchen"
      temperature_address: "5/1/1"
      setpoint_shift_address: "5/1/2"
      setpoint_shift_state_address: "5/1/3"
      target_temperature_state_address: "5/1/4"
      operation_mode_frost_protection_address: "5/1/5"
      operation_mode_night_address: "5/1/6"
      operation_mode_comfort_address: "5/1/7"
      operation_mode_state_address: "5/1/8"
```

如果您的设备不支持 `setpoint_shift` 计算（即未提供 `setpoint_shift_address` 值），请设置 climate 设备的 `min_temp` 和 `max_temp` 属性，
以避免前端出现超过有效温度范围的问题。在这种情况下，也请确保在配置中添加 `target_temperature_address`：

```yaml
# Example configuration.yaml entry
knx:
  climate:
    - name: "Kitchen"
      temperature_address: "5/1/2"
      target_temperature_address: "5/1/4"
      target_temperature_state_address: "5/1/1"
      operation_mode_frost_protection_address: "5/1/5"
      operation_mode_night_address: "5/1/6"
      operation_mode_comfort_address: "5/1/7"
      operation_mode_state_address: "5/1/8"
      operation_mode_standby_address: "5/1/9"
      min_temp: 7.0
      max_temp: 32.0
```

`setpoint_shift_mode` 允许使用以下两种 DPT：

- DPT6010（用于带比例因子的 1 字节有符号整数）
- DPT9002（用于 2 字节浮点数）

示例：

```yaml
# Example configuration.yaml entry
knx:
  climate:
    - name: "Kitchen"
      temperature_address: "5/1/1"
      setpoint_shift_address: "5/1/2"
      setpoint_shift_state_address: "5/1/3"
      setpoint_shift_mode: "DPT9002"
      target_temperature_state_address: "5/1/4"
      operation_mode_address: "5/1/5"
      operation_mode_state_address: "5/1/6"
```

如果已指定 `operation_mode_address`，则无需设置 `operation_mode_frost_protection_address` / `operation_mode_night_address` / `operation_mode_comfort_address` / `operation_mode_standby_address`。

`heat_cool_address` 和 `heat_cool_state_address` 支持以下值：

- `0`（制冷）
- `1`（制热）

系统会自动识别您的 KNX 恒温器支持的 HVAC 模式。您也可以使用 `controller_modes` 配置变量进行覆盖。支持的控制器模式如下：

- `off`
- `auto`
- `heat`
- `cool`
- `fan_only`
- `dehumidification`

系统会自动识别您的 KNX 恒温器支持的预设模式。您也可以使用 `operation_modes` 配置变量进行覆盖。支持的运行模式如下：

- `auto`
- `comfort`
- `standby`
- `economy`
- `building_protection`

另请参阅[通用实体配置选项](#common-entity-configuration-options)。

```yaml
temperature_address:
  description: 用于从 KNX 总线读取当前室温的 KNX 组地址。*DPT 9.001*
  required: true
  type: [string, list]
temperature_step:
  description: 定义 `setpoint_shift` 每一步（比例因子）的开尔文步进值。对于未使用 setpoint shift 的配置，此值用于设置 UI 中温度滑块的步进。
  required: false
  type: float
  default: 0.1
target_temperature_address:
  description: 用于设置目标温度的 KNX 组地址。*DPT 9.001*
  required: false
  type: [string, list]
target_temperature_state_address:
  description: 用于从 KNX 总线读取当前目标温度的 KNX 组地址。*DPT 9.001*
  required: true
  type: [string, list]
setpoint_shift_address:
  description: `setpoint_shift` 的 KNX 地址。*DPT 6.010 或 DPT 9.002，取决于 setpoint_shift_mode*
  required: false
  type: [string, list]
setpoint_shift_state_address:
  description: 用于读取 `setpoint_shift` 的 KNX 地址。*DPT 6.010 或 DPT 9.002，取决于 setpoint_shift_mode*
  required: false
  type: [string, list]
setpoint_shift_mode:
  description: 定义设备内部使用的 DPT。可设为 `DPT6010`、`DPT9002` 或 `None`。当为 `None` 或省略时，DPT 会根据第一条入站报文自动分配。
  required: false
  type: string
  default: None
setpoint_shift_min:
  description: Setpoint shift 的最小值。
  required: false
  default: -6
  type: float
setpoint_shift_max:
  description: Setpoint shift 的最大值。
  required: false
  default: 6
  type: float
active_state_address:
  description: 用于读取当前活动状态的 KNX 地址。`0` 表示空闲，`1` 表示活动。*DPT 1*
  required: false
  type: [string, list]
command_value_state_address:
  description: 用于读取当前命令值（百分比）的 KNX 地址。若未设置 `active_state_address`，则 `0` 会将 climate 实体设为空闲。*DPT 5.001*
  required: false
  type: [string, list]
humidity_state_address:
  description: 用于读取当前湿度的 KNX 地址。*DPT 9.007*
  required: false
  type: [string, list]
operation_mode_address:
  description: 用于设置运行模式（auto / building protection / economy / standby / comfort）的 KNX 地址。*DPT 20.102*
  required: false
  type: [string, list]
operation_mode_state_address:
  description: 用于读取运行模式的 KNX 地址。*DPT 20.102*
  required: false
  type: [string, list]
controller_status_address:
  description: 用于 HVAC 控制器状态的 KNX 地址（符合 KNX AN 097/07 rev 3）。
  required: false
  type: [string, list]
controller_status_state_address:
  description: 用于读取 HVAC 控制器状态的 KNX 地址。
  required: false
  type: [string, list]
controller_mode_address:
  description: 用于设置 HVAC 控制器模式的 KNX 地址。*DPT 20.105*
  required: false
  type: [string, list]
controller_mode_state_address:
  description: 用于读取 HVAC 控制模式的 KNX 地址。*DPT 20.105*
  required: false
  type: [string, list]
heat_cool_address:
  description: 用于切换制热/制冷模式的 KNX 地址。*DPT 1.100*
  required: false
  type: [string, list]
heat_cool_state_address:
  description: 用于读取制热/制冷模式的 KNX 地址。*DPT 1.100*
  required: false
  type: [string, list]
operation_mode_frost_protection_address:
  description: 用于开关防冻/防热保护模式的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
operation_mode_night_address:
  description: 用于开关经济模式的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
operation_mode_comfort_address:
  description: 用于开关舒适模式的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
operation_mode_standby_address:
  description: 用于开关待机模式的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
operation_modes:
  description: 覆盖自动识别的运行模式。请提供设备支持的 `preset_modes` 值。
  required: false
  type: list
controller_modes:
  description: 覆盖自动识别的控制器模式。请提供设备支持的 `hvac_modes` 值。
  required: false
  type: list
default_controller_mode:
  description: 覆盖默认控制器模式。可配置任意 Home Assistant `hvac_mode`。例如，仅制冷设备可设置为 `cool`。
  required: false
  default: "heat"
  type: string
on_off_address:
  description: 用于开关 climate 设备的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
on_off_invert:
  description: 开关 climate 设备的值取反。
  required: false
  default: false
  type: boolean
on_off_state_address:
  description: 用于获取 climate 设备当前状态（开/关）的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
min_temp:
  description: 覆盖最小温度。
  required: false
  type: float
max_temp:
  description: 覆盖最大温度。
  required: false
  type: float
fan_speed_address:
  description: 用于设置风扇百分比或档位的 KNX 组地址。*DPT 5.001* 或 *DPT 5.010*
  required: false
  type: [string, list]
fan_speed_state_address:
  description: 用于读取风扇百分比或档位的 KNX 组地址。*DPT 5.001* 或 *DPT 5.010*
  required: false
  type: [string, list]
fan_max_step:
  description: 风扇的最大档位数。
  required: false
  type: integer
  default: 3
fan_speed_mode:
  description: 风扇速度组地址的数据类型。`percent` 对应 *DPT 5.001*，`step` 对应 *DPT 5.010*。
  required: false
  type: string
  default: percent
fan_zero_mode:
  description: 零速时的风扇模式，可选 `off` 或 `auto`。这会影响 UI 中显示的风扇模式。
  required: false
  type: string
  default: "off"
swing_address:
  description: 用于开关（垂直）摆风的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
swing_state_address:
  description: 用于获取（垂直）摆风当前状态（开/关）的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
swing_horizontal_address:
  description: 用于开关水平摆风的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
swing_horizontal_state_address:
  description: 用于获取水平摆风当前状态（开/关）的 KNX 地址。*DPT 1*
  required: false
  type: [string, list]
```


</details>

### 遮罩 {#cover}

The KNX cover platform is used as an interface to KNX covers.

:::note
Unlike most KNX devices, Home Assistant defines 0% as closed and 100% as fully open in regards to covers. The corresponding value inversion is done internally by the KNX integration.

Home Assistant will, by default, `close` a cover by moving it in the `DOWN` direction in the KNX nomenclature, and `open` a cover by moving it in the `UP` direction.

:::
Cover entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX cover 实体</summary>


To use your KNX covers in your installation, add the following lines to your top level [KNX Integration](/home-assistant/integrations/knx) configuration key in your "`configuration.yaml`":

```yaml
# Example configuration.yaml entry
knx:
  cover:
    - name: "Kitchen shutter"
      move_long_address: "3/0/0"
      stop_address: "3/0/4"
      position_address: "3/0/3"
      position_state_address: "3/0/2"
      travelling_time_down: 51
      travelling_time_up: 61
    - name: "Bedroom blinds"
      move_long_address: "3/1/1"
      move_short_address: "3/1/4"
      position_address: "3/1/3"
      position_state_address: "3/1/2"
      angle_address: "3/1/5"
      angle_state_address: "3/1/6"
      travelling_time_down: 40
      travelling_time_up: 40
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
move_long_address:
  description: KNX group address for moving the cover full up or down. *DPT 1*
  required: false
  type: [string, list]
move_short_address:
  description: KNX group address for moving the cover stepwise up or down. Used by some covers also as the means to stop the cover. Stepwise moves are only mapped to tilt angle functions in Home Assistant, as no stepwise move of cover position is generally supported by the architecture. If tilt angle is not supported, prefer the use of a `stop_address`. *DPT 1*
  required: false
  type: [string, list]
stop_address:
  description: KNX group address for stopping the current movement of the cover. *DPT 1*
  required: false
  type: [string, list]
position_address:
  description: KNX group address for moving the cover to the dedicated position. *DPT 5.001*
  required: false
  type: [string, list]
position_state_address:
  description: Separate KNX group address for requesting the current position of the cover. *DPT 5.001*
  required: false
  type: [string, list]
angle_address:
  description: KNX group address for tilting the cover to the dedicated angle. *DPT 5.001*
  required: false
  type: [string, list]
angle_state_address:
  description: Separate KNX group address for requesting the current tilt angle of the cover. *DPT 5.001*
  required: false
  type: [string, list]
travelling_time_down:
  description: Time cover needs to travel down in seconds. Needed to calculate the intermediate positions of cover while traveling.
  required: false
  default: 25
  type: integer
travelling_time_up:
  description: Time cover needs to travel up in seconds. Needed to calculate the intermediate positions of cover while traveling.
  required: false
  default: 25
  type: integer
invert_updown:
  description: Set this to `true` to invert the up/down commands from/to your KNX actuator. Default is to consider `UP` (0) as opening of a cover and `DOWN` (1) as closing of a cover.
  required: false
  default: false
  type: boolean
invert_position:
  description: Set this to `true` if your actuator reports fully down position as 0% in KNX.
  required: false
  default: false
  type: boolean
invert_angle:
  description: Set this to `true` if your actuator reports fully closed tilt as 0% in KNX.
  required: false
  default: false
  type: boolean
device_class:
  description: Sets the [class of the device](/home-assistant/integrations/cover/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
```


</details>

### 日期 {#date}

The KNX date platform allows to send date values to the KNX bus and update its state from received telegrams. It can optionally respond to read requests from the KNX bus.

:::note
Date entities without a `state_address` will restore their last known state after Home Assistant was restarted.

Dates that have a `state_address` configured request their current state from the KNX bus.

:::
:::note
DPT 11.001 covers the range 1990 to 2089. Year values outside of this range are not allowed.

:::
Date entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX date 实体</summary>


```yaml
# Example configuration.yaml entry
knx:
  date:
    - name: "Date"
      address: "0/0/2"
      state_address: "0/0/2"
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: The group address to which new values will be sent. *DPT 11.001*
  required: true
  type: [string, list]
state_address:
  description: Group address for retrieving the state from the KNX bus. *DPT 11.001*
  required: false
  type: [string, list]
respond_to_read:
  description: If `true`, the entity will respond to GroupValueRead telegrams received on the configured `address` by sending a GroupValueResponse to the same `address`. This is typically used when Home Assistant acts as the state provider for the KNX bus. In such cases, only `address` is configured, and `state_address` is not set. Read-requests to passive or state addresses don't trigger responses.
  required: false
  type: boolean
  default: false
sync_state:
  description: Actively read the value from the bus. The maximum time interval (`<minutes>`) is 1440. The following values are valid

    - `true` equivalent to "expire 60" (default)

    - `false` no GroupValueRead telegrams will be sent to the bus

    - `every <minutes>` to update it regularly every \<minutes\>

    - `expire <minutes>` to read the state from the KNX bus when no telegram was received for \<minutes\>

    - `<minutes>` equivalent to "expire \<minutes\>"

    - `init` to just initialize the state on startup

  required: false
  type: [boolean, string, integer]
  default: true
```


</details>

### 日期时间 {#datetime}

The KNX datetime platform allows to send datetime values to the KNX bus and update its state from received telegrams. It can optionally respond to read requests from the KNX bus.

:::note
Date entities without a `state_address` will restore their last known state after Home Assistant was restarted.

DateTimes that have a `state_address` configured request their current state from the KNX bus.

:::
:::note
System timezone is used as DPT 19.001 doesn't provide timezone information.
Year values outside of the range 1900 to 2155 are invalid.

:::
Datetime entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX datetime 实体</summary>


```yaml
# Example configuration.yaml entry
knx:
  datetime:
    - name: "DateTime"
      address: "0/0/3"
      state_address: "0/0/4"
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: The group address to which new values will be sent. *DPT 19.001*
  required: true
  type: [string, list]
state_address:
  description: Group address for retrieving the state from the KNX bus. *DPT 19.001*
  required: false
  type: [string, list]
respond_to_read:
  description: If `true`, the entity will respond to GroupValueRead telegrams received on the configured `address` by sending a GroupValueResponse to the same `address`. This is typically used when Home Assistant acts as the state provider for the KNX bus. In such cases, only `address` is configured, and `state_address` is not set. Read-requests to passive or state addresses don't trigger responses.
  required: false
  type: boolean
  default: false
sync_state:
  description: Actively read the value from the bus. The maximum time interval (`<minutes>`) is 1440. The following values are valid

    - `true` equivalent to "expire 60" (default)

    - `false` no GroupValueRead telegrams will be sent to the bus

    - `every <minutes>` to update it regularly every \<minutes\>

    - `expire <minutes>` to read the state from the KNX bus when no telegram was received for \<minutes\>

    - `<minutes>` equivalent to "expire \<minutes\>"

    - `init` to just initialize the state on startup

  required: false
  type: [boolean, string, integer]
  default: true
```


</details>

### 风扇 {#fan}

The KNX fan integration is used to control KNX fans. Following control types are supported:

- Percentage controlled: Fans that set the percentage directly from 0-100%.
- Step controlled: Fans which have a fixed amount of steps to set. The integration will convert percentage to step automatically. The `max_step` attribute is set to the number of steps of the fan, not counting the `off`-step. Example: A fan supports the steps 0 to 3. To use this fan the `max_step` attribute has to be set to `3`. The integration will convert the percentage `66 %` to the step `2` when sending data to KNX.

Fan entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX fan 实体</summary>


To use your KNX fan in your installation, add the following lines to your top-level [KNX Integration](/home-assistant/integrations/knx) configuration key in your "`configuration.yaml`":

```yaml
# Example configuration.yaml entry
knx:
  fan:
    - name: "Ceiling fan"
      address: "9/0/1"
      state_address: "9/0/2"
```

:::note
At least one of `address` or `switch_address` must be provided. If you set only `address`, Home Assistant also uses this address to switch the fan on and off by sending 0 to turn the fan off.

:::
See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: KNX group address for setting the percentage or step of the fan. *DPT 5.001* or *DPT 5.010*
  required: false
  type: [string, list]
state_address:
  description: KNX group address for retrieving the percentage or step of the fan. *DPT 5.001* or *DPT 5.010*
  required: false
  type: [string, list]
switch_address:
  description: KNX group address for switching the fan on/off. *DPT 1*
  required: false
  type: [string, list]
switch_state_address:
  description: KNX group address for retrieving the on/off state of the fan. *DPT 1*
  required: false
  type: [string, list]
oscillation_address:
  description: KNX group address for switching the fan oscillation on or off. *DPT 1*
  required: false
  type: [string, list]
oscillation_state_address:
  description: KNX group address for retrieving the state of the fan oscillation. *DPT 1*
  required: false
  type: [string, list]
max_step:
  description: The maximum amount of steps for a step-controlled fan. If set, the integration will convert percentages to steps automatically.
  required: false
  type: integer
```


</details>

### 灯光 {#light}

The KNX light integration is used as an interface to control KNX actuators for lighting applications such as:

- Switching actuators
- Dimming actuators
- LED controllers
- DALI gateways

Light entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX light 实体</summary>


See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: KNX group address for switching the light on and off. *DPT 1.001*
  required: true
  type: [string, list]
state_address:
  description: KNX group address for retrieving the switch state of the light. *DPT 1.001*
  required: false
  type: [string, list]
brightness_address:
  description: KNX group address for setting the brightness of the light in percent (absolute dimming). *DPT 5.001*
  required: false
  type: [string, list]
brightness_state_address:
  description: KNX group address for retrieving the brightness of the light in percent. *DPT 5.001*
  required: false
  type: [string, list]
color_address:
  description: KNX group address for setting the RGB color of the light. *DPT 232.600*
  required: false
  type: [string, list]
color_state_address:
  description: KNX group address for retrieving the RGB color of the light. *DPT 232.600*
  required: false
  type: [string, list]
rgbw_address:
  description: KNX group address for setting the RGBW color of the light. *DPT 251.600*
  required: false
  type: [string, list]
rgbw_state_address:
  description: KNX group address for retrieving the RGBW color of the light. *DPT 251.600*
  required: false
  type: [string, list]
hue_address:
  description: KNX group address for setting the hue of the light color in degrees. *DPT 5.003*
  required: false
  type: [string, list]
hue_state_address:
  description: KNX group address for retrieving the hue of the light color in degrees. *DPT 5.003*
  required: false
  type: [string, list]
saturation_address:
  description: KNX group address for setting the saturation of the light color in percent. *DPT 5.001*
  required: false
  type: [string, list]
saturation_state_address:
  description: KNX group address for retrieving the saturation of the light color in percent. *DPT 5.001*
  required: false
  type: [string, list]
xyy_address:
  description: KNX group address for setting the xyY color of the light. *DPT 242.600*
  required: false
  type: [string, list]
xyy_state_address:
  description: KNX group address for retrieving the xyY color of the light. *DPT 242.600*
  required: false
  type: [string, list]
individual_colors:
  description: Used when the actuator only supports individual group addresses for colors. When `individual_colors` is used the root `address` key may be omitted.
  required: false
  type: map
  keys:
    red:
      description: Group addresses for the red component.
      type: map
      required: true
      keys:
        address:
          description: KNX group address to switch the red component. *DPT 1.001*
          type: [string, list]
          required: false
        state_address:
          description: KNX group address for the state of the red component. *DPT 1.001*
          type: [string, list]
          required: false
        brightness_address:
          description: KNX group address to set the brightness of the red component. *DPT 5.001*
          type: [string, list]
          required: true
        brightness_state_address:
          description: KNX group address for the current brightness of the red component. *DPT 5.001*
          type: [string, list]
          required: false
    green:
      description: Group addresses for the green component. Same keys available as for red component above.
      type: map
      required: true
    blue:
      description: Group addresses for the blue component. Same keys available as for red component above.
      type: map
      required: true
    white:
      description: Group addresses for the white component. Same keys available as for red component above.
      type: map
      required: false
color_temperature_address:
  description: KNX group address for setting the color temperature of the light. *DPT 5.001, 7.600 or 9 based on color_temperature_mode*
  required: false
  type: [string, list]
color_temperature_state_address:
  description: KNX group address for retrieving the color temperature of the light. *DPT 5.001, 7.600 or 9 based on color_temperature_mode*
  required: false
  type: [string, list]
color_temperature_mode:
  description: Color temperature group address data type. `absolute` for color temperature in Kelvin (2 byte unsigned integer). *color_temperature_address -> DPT 7.600*. `absolute_float` for color temperature represented in 2 byte float. *color_temperature_address -> DPT 9*. `relative` color temperature in percent cold white (0% warmest; 100% coldest). *color_temperature_address -> DPT 5.001*
  required: false
  type: string
  default: absolute
min_kelvin:
  description: Warmest possible color temperature in Kelvin. Used in combination with `color_temperature_address`.
  required: false
  type: integer
  default: 2700
max_kelvin:
  description: Coldest possible color temperature in Kelvin. Used in combination with `color_temperature_address`.
  required: false
  type: integer
  default: 6000
```

Many KNX devices can change their state internally without a message to the switch address on the KNX bus, e.g., if you configure a scene or a timer on a channel. The optional `state_address` can be used to inform Home Assistant about these state changes. If a KNX message is seen on the bus addressed to the given `state_address` (in most cases from the light actuator), it will overwrite the state of the object.

For switching/light actuators that are only controlled by a single group address and don't have dedicated state group objects you can set `state_address` to the same value as `address` if it is readable from the bus.

#### YAML 配置示例

```yaml
knx:
  light:
    # dimmable light
    # color mode: brightness
    - name: "Dimmable light"
      address: "1/0/9"
      state_address: "1/1/9"
      brightness_address: "1/2/9"
      brightness_state_address: "1/3/9"
    # XYY light
    # color mode: xy
    - name: "XYY light"
      address: "1/0/9"
      state_address: "1/1/9"
      brightness_address: "1/2/9"  # optional - if not set brightness will be sent over the xyy data point
      brightness_state_address: "1/3/9"
      xyy_address: "1/4/9"
      xyy_state_address: "1/5/9"
    # HS light
    # color mode: hs
    - name: "HS light"
      address: "1/0/9"
      state_address: "1/1/9"
      brightness_address: "1/2/9"  # required for HS
      brightness_state_address: "1/3/9"
      hue_address: "1/4/8"
      hue_state_address: "1/5/8"  # required for HS
      saturation_address: "1/4/9"
      saturation_state_address: "1/5/9"  # required for HS
    # RGB light
    # color mode: rgb
    - name: "RGB light"
      address: "1/0/9"
      state_address: "1/1/9"
      brightness_address: "1/2/9"  # optional for RGB lights
      brightness_state_address: "1/3/9"
      color_address: "1/4/9"
      color_state_address: "1/5/9"
    # RGBW light
    # color mode: rgbw
    - name: "RGBW light"
      address: "0/4/83"
      state_address: "0/4/84"
      brightness_address: "0/4/85"  # optional for RGBW lights
      brightness_state_address: "0/4/86"
      rgbw_address: "0/4/87"
      rgbw_state_address: "0/4/88"
    # RGB(W) individual object light
    # color mode: rgb / rgbw
    - name: "RGBW individual light"
      address: "1/0/9"  # optional for individual color lights
      individual_colors:
        red:
          brightness_address: "0/4/61"
          brightness_state_address: "0/5/61"
        green:
          brightness_address: "0/4/62"
          brightness_state_address: "0/5/62"
        blue:
          brightness_address: "0/4/63"
          brightness_state_address: "0/5/63"
        white:
          brightness_address: "0/4/64"
          brightness_state_address: "0/5/64"
    # tunable white light
    # color mode: color_temp
    - name: "TW light"
      address: "1/0/21"
      state_address: "1/1/21"
      brightness_address: "1/2/21"
      brightness_state_address: "1/3/21"
      color_temperature_address: "1/4/21"
      color_temperature_state_address: "1/5/21"
      color_temperature_mode: absolute
      min_kelvin: 2550
      max_kelvin: 6200
    # actuator without dedicated state group object
    # color mode: onoff
    - name: "Simple light"
      address: "1/0/5"
      state_address: "1/0/5"
```


</details>

### 通知 {#notify}

The KNX notify platform allows you to send notifications to [KNX](https://www.knx.org/) devices as DPT16 strings.

```yaml
knx:
  notify:
    - name: "Alarm"
      address: "5/1/10"
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: KNX group address the notification will be sent to. *DPT 16*
  required: true
  type: [string, list]
type:
  description: A DPT identifier representing a text value ("string" or "latin_1" - see [KNX Sensor](#sensor)) used to encode the notification.
  required: false
  default: "latin_1"
  type: string
```

#### 操作示例

```yaml
action: notify.send_message
data:
  message: "Hello from HA!"
  entity_id: notify.alarm
```

### 数值 {#number}

The KNX number platform allows to send generic numeric values to the KNX bus and update its state from received telegrams. It can optionally respond to read requests from the KNX bus.

:::note
Number entities without a `state_address` will restore their last known state after Home Assistant was restarted.

Numbers that have a `state_address` configured request their current state from the KNX bus.

:::
Number entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX number 实体</summary>


```yaml
# Example configuration.yaml entry
knx:
  number:
    - name: "Duration"
      address: "0/0/1"
      type: time_period_sec
    - name: "Volume"
      address: "0/0/2"
      state_address: "0/0/3"
      type: percent
    - name: "Temperature threshold"
      address: "0/0/4"
      respond_to_read: true
      type: temperature
      min: 20
      max: 24.5
      step: 0.1
      mode: slider
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: The group address to which new values will be sent.
  required: true
  type: [string, list]
state_address:
  description: Group address for retrieving the state from the KNX bus.
  required: false
  type: [string, list]
type:
  description: Any supported type of [KNX Sensor](#sensor) representing a numeric value (e.g., "percent" or "temperature").
  required: true
  type: [string, integer]
respond_to_read:
  description: If `true`, the entity will respond to GroupValueRead telegrams received on the configured `address` by sending a GroupValueResponse to the same `address`. This is typically used when Home Assistant acts as the state provider for the KNX bus. In such cases, only `address` is configured, and `state_address` is not set. Read-requests to passive or state addresses don't trigger responses.
  required: false
  type: boolean
  default: false
min:
  description: Minimum value that can be sent. Defaults to the `type` DPT minimum value.
  required: false
  type: float
max:
  description: Maximum value that can be sent. Defaults to the `type` DPT maximum value.
  required: false
  type: float
step:
  description: Step value. Defaults to the step size defined for the DPT in the KNX specifications.
  required: false
  type: float
mode:
  description: Specifies the mode used in the UI. `auto`, `box` or `slider` are valid.
  required: false
  type: string
  default: auto
```


</details>

### 场景 {#scene}

The KNX scene platform allows you to activate KNX scenes and updates scene entities when the corresponding scene number is received on the KNX bus.

Scene entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX scene 实体</summary>


```yaml
# Example configuration.yaml entry
knx:
  scene:
    - name: "Romantic"
      address: 8/8/8
      scene_number: 23
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: KNX group address for the scene. *DPT 17.001*
  required: true
  type: [string, list]
scene_number:
  description: KNX scene number to be activated (range 1..64 ).
  required: true
  type: integer
```


</details>

### 选择项 {#select}

The KNX select platform allows the user to define a list of values that can be selected via the frontend and can be used within conditions of automation. When a user selects a new item, the assigned generic raw payload is sent to the KNX bus. A received telegram updates the state of the select entity. It can optionally respond to read requests from the KNX bus.

:::note
Select entities without a `state_address` will restore their last known state after Home Assistant was restarted.

Selects that have a `state_address` configured request their current state from the KNX bus.

:::
```yaml
# Example configuration.yaml entry
knx:
  select:
    - name: "DPT 2 selector"
      address: "0/0/1"
      payload_length: 0
      options:
        - option: "No control"
          payload: 0
        - option: "Control On"
          payload: 0b10
        - option: "Control Off"
          payload: 0b11
    - name: "DHWMode"
      address: "0/0/2"
      state_address: "0/0/3"
      payload_length: 1
      options:
        - option: "Auto"
          payload: 0
        - option: "LegioProtect"
          payload: 1
        - option: "Normal"
          payload: 2
        - option: "Reduced"
          payload: 3
        - option: "Off/FrostProtect"
          payload: 4
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: The group address to which new values will be sent.
  required: true
  type: [string, list]
state_address:
  description: Group address for retrieving the state from the KNX bus.
  required: false
  type: [string, list]
payload_length:
  description: The length of the payload expected for the DPT. Use `0` for DPT 1, 2 or 3.
  required: true
  type: integer
options:
  description: List of options to choose from. Each `option` and `payload` have to be unique.
  type: list
  required: true
  keys:
    option:
      description: The name of the option used to trigger the assigned `payload`.
      required: true
      type: string
    payload:
      description: The raw payload assigned to the `option`.
      required: true
      type: integer
respond_to_read:
  description: If `true`, the entity will respond to GroupValueRead telegrams received on the configured `address` by sending a GroupValueResponse to the same `address`. This is typically used when Home Assistant acts as the state provider for the KNX bus. In such cases, only `address` is configured, and `state_address` is not set. Read-requests to passive or state addresses don't trigger responses.
  required: false
  type: boolean
  default: false
sync_state:
  description: Actively read the value from the bus. The maximum time interval (`<minutes>`) is 1440. The following values are valid

    - `true` equivalent to "expire 60" (default)

    - `false` no GroupValueRead telegrams will be sent to the bus

    - `every <minutes>` to update it regularly every \<minutes\>

    - `expire <minutes>` to read the state from the KNX bus when no telegram was received for \<minutes\>

    - `<minutes>` equivalent to "expire \<minutes\>"

    - `init` to just initialize the state on startup

  required: false
  type: [boolean, string, integer]
  default: true
```

### 传感器 {#sensor}

The KNX sensor platform allows you to monitor [KNX](https://www.knx.org/) sensors.

:::note
Sensors are read-only entities. To write to the KNX bus, configure a [KNX Number entity](#number) or use the [`knx.send` action](#send).


:::
Sensor entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX sensor 实体</summary>


```yaml
# Example configuration.yaml entry
knx:
  sensor:
    - name: "Heating Valve 1"
      state_address: "2/0/0"
      type: percent
```

In order to actively read the sensor data from the bus every 30 minutes you can add the following lines to your "`configuration.yaml`":

```yaml
# Example configuration.yaml entry
knx:
  sensor:
    - name: "Heating Valve 1"
      state_address: "2/0/0"
      type: percent
      sync_state: every 30
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
state_address:
  description: KNX group address of the sensor.
  required: true
  type: [string, list]
type:
  description: A type from the [value types table](/home-assistant/integrations/knx/#value-types) below must be defined. The DPT of the group address should match the expected KNX DPT to be parsed correctly.
  required: true
  type: [string, integer]
sync_state:
  description: Actively read the value from the bus. The maximum time interval (`<minutes>`) is 1440. The following values are valid

    - `true` equivalent to "expire 60" (default)

    - `false` no GroupValueRead telegrams will be sent to the bus

    - `every <minutes>` to update it regularly every \<minutes\>

    - `expire <minutes>` to read the state from the KNX bus when no telegram was received for \<minutes\>

    - `<minutes>` equivalent to "expire \<minutes\>"

    - `init` to just initialize the state on startup

  required: false
  type: [boolean, string, integer]
  default: true
always_callback:
  description: Defines if telegrams with equal payload as the previously received telegram should trigger a state update within Home Assistant.
  required: false
  type: boolean
  default: false
state_class:
  description: Overrides the DPT's default [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes).
  required: false
  type: string
device_class:
  description: Overrides the DPT's default [class of the device](/home-assistant/integrations/sensor/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
```

### 更多示例

```yaml
# Example configuration.yaml entry
knx:
  sensor:
    - name: "Heating Valve 1"
      state_address: "2/0/0"
      sync_state: init
      type: percent
    - name: "Kitchen Temperature"
      state_address: "6/2/1"
      sync_state: every 60
      type: temperature
      state_class: measurement
```


</details>

### 开关 {#switch}

The KNX switch platform is used as an interface to switching actuators.

Switch entities can be created from the frontend in the KNX panel or via YAML.

Switch entities without a `state_address` will restore their last known state after Home Assistant was restarted.
Switches that have a `state_address` configured request their current state from the KNX bus.

<details>
<summary>通过 YAML 配置 KNX switch 实体</summary>


```yaml
knx:
  switch:
    - name: "Kitchen coffee maker"
      address: "1/1/6"
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: KNX group address for switching the switch on/off. *DPT 1*
  required: true
  type: [string, list]
state_address:
  description: Separate KNX group address for retrieving the switch state. *DPT 1*
  required: false
  type: [string, list]
invert:
  description: Invert the telegrams payload before processing or sending.
  required: false
  type: boolean
  default: false
respond_to_read:
  description: If `true`, the entity will respond to GroupValueRead telegrams received on the configured `address` by sending a GroupValueResponse to the same `address`. This is typically used when Home Assistant acts as the state provider for the KNX bus. In such cases, only `address` is configured, and `state_address` is not set. Read-requests to passive or state addresses don't trigger responses.
  required: false
  type: boolean
  default: false
device_class:
  description: Sets the [class of the device](/home-assistant/integrations/switch/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
```

The optional `state_address` can be used to inform Home Assistant about state changes not triggered by a telegram to the `address` e.g., if you configure a timer on a channel. If a KNX message is seen on the bus addressed to the given state address, this will overwrite the state of the switch object.


</details>

### 文本 {#text}

The KNX text platform allows to send text values to the KNX bus and update its state from received telegrams. It can optionally respond to read requests from the KNX bus.

:::note
Text entities without a `state_address` will restore their last known state after Home Assistant was restarted.

Texts that have a `state_address` configured request their current state from the KNX bus.

:::
Text entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX text 实体</summary>


```yaml
# Example configuration.yaml entry
knx:
  text:
    - name: "Info"
      address: "0/0/1"
    - name: "ASCII Info"
      address: "0/0/2"
      state_address: "0/0/3"
      type: string
    - name: "Greeting"
      address: "0/0/4"
      respond_to_read: true
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: The group address to which new values will be sent.
  required: true
  type: [string, list]
state_address:
  description: Group address for retrieving the state from the KNX bus.
  required: false
  type: [string, list]
type:
  description: Either `latin_1` for DPT 16.001 or `string` for DPT 16.000 (ASCII).
  required: false
  type: [string, integer]
  default: latin_1
respond_to_read:
  description: If `true`, the entity will respond to GroupValueRead telegrams received on the configured `address` by sending a GroupValueResponse to the same `address`. This is typically used when Home Assistant acts as the state provider for the KNX bus. In such cases, only `address` is configured, and `state_address` is not set. Read-requests to passive or state addresses don't trigger responses.
  required: false
  type: boolean
  default: false
mode:
  description: Specifies the mode used in the UI. `text` or `password` are valid.
  required: false
  type: string
  default: text
```


</details>

### 时间 {#time}

The KNX time platform allows to send time values to the KNX bus and update its state from received telegrams. It can optionally respond to read requests from the KNX bus.

:::note
Time entities without a `state_address` will restore their last known state after Home Assistant was restarted.

Times that have a `state_address` configured request their current state from the KNX bus.

:::
:::note
The `day` field of the time telegram will always be set to 0 (`no day`).

:::
Time entities can be created from the frontend in the KNX panel or via YAML.

<details>
<summary>通过 YAML 配置 KNX time 实体</summary>


```yaml
# Example configuration.yaml entry
knx:
  time:
    - name: "Time"
      address: "0/0/2"
      state_address: "0/0/2"
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address:
  description: The group address to which new values will be sent. *DPT 10.001*
  required: true
  type: [string, list]
state_address:
  description: Group address for retrieving the state from the KNX bus. *DPT 10.001*
  required: false
  type: [string, list]
respond_to_read:
  description: If `true`, the entity will respond to GroupValueRead telegrams received on the configured `address` by sending a GroupValueResponse to the same `address`. This is typically used when Home Assistant acts as the state provider for the KNX bus. In such cases, only `address` is configured, and `state_address` is not set. Read-requests to passive or state addresses don't trigger responses.
  required: false
  type: boolean
  default: false
sync_state:
  description: Actively read the value from the bus. The maximum time interval (`<minutes>`) is 1440. The following values are valid

    - `true` equivalent to "expire 60" (default)

    - `false` no GroupValueRead telegrams will be sent to the bus

    - `every <minutes>` to update it regularly every \<minutes\>

    - `expire <minutes>` to read the state from the KNX bus when no telegram was received for \<minutes\>

    - `<minutes>` equivalent to "expire \<minutes\>"

    - `init` to just initialize the state on startup

  required: false
  type: [boolean, string, integer]
  default: true
```


</details>

### 天气 {#weather}

The KNX weather platform is used as an interface to KNX weather stations.

To use your KNX weather station in your installation, add the following lines to your top-level [KNX Integration](/home-assistant/integrations/knx) configuration key in your "`configuration.yaml`":

```yaml
# Example configuration.yaml entry
knx:
  weather:
    - name: "Home"
      address_temperature: "7/0/0"
      address_brightness_south: "7/0/1"
      address_brightness_west: "7/0/2"
      address_brightness_east: "7/0/3"
      address_brightness_north: "7/0/11"
      address_wind_speed: "7/0/4"
      address_rain_alarm: "7/0/5"
      address_frost_alarm: "7/0/6"
      address_wind_alarm: "7/0/7"
      address_day_night: "7/0/8"
      address_air_pressure: "7/0/9"
      address_humidity: "7/0/10"
      sync_state: true
```

See also the [common entity configuration options](#common-entity-configuration-options).

```yaml
address_temperature:
  description: KNX group address for reading current outside temperature from KNX bus. *DPT 9.001*
  required: true
  type: [string, list]
address_brightness_south:
  description: KNX group address for reading current brightness to south coordinate from KNX bus. *DPT 9.004*
  required: false
  type: [string, list]
address_brightness_west:
  description: KNX group address for reading current brightness to west coordinate from KNX bus. *DPT 9.004*
  required: false
  type: [string, list]
address_brightness_east:
  description: KNX group address for reading current brightness to east coordinate from KNX bus. *DPT 9.004*
  required: false
  type: [string, list]
address_brightness_north:
  description: KNX group address for reading current brightness to north coordinate from KNX bus. *DPT 9.004*
  required: false
  type: [string, list]
address_wind_bearing:
  description: KNX group address for reading current wind bearing from KNX bus. *DPT 5.003*
  required: false
  type: [string, list]
address_wind_speed:
  description: KNX group address for reading current wind speed from KNX bus. *DPT 9.005*
  required: false
  type: [string, list]
address_rain_alarm:
  description: KNX group address for reading if rain alarm is on/off.
  required: false
  type: [string, list]
address_frost_alarm:
  description: KNX group address for reading if frost alarm is on/off.
  required: false
  type: [string, list]
address_wind_alarm:
  description: KNX group address for reading if wind alarm is on/off.
  required: false
  type: [string, list]
address_day_night:
  description: KNX group address for reading if it's day/night.
  required: false
  type: [string, list]
address_air_pressure:
  description: KNX address reading current air pressure. *DPT 9.006 or 14.058*
  required: false
  type: [string, list]
address_humidity:
  description: KNX address for reading current humidity. *DPT 9.007*
  required: false
  type: [string, list]
sync_state:
  description: Actively read the value from the bus. The maximum time interval (`<minutes>`) is 1440. The following values are valid

    - `true` equivalent to "expire 60" (default)

    - `false` no GroupValueRead telegrams will be sent to the bus

    - `every <minutes>` to update it regularly every \<minutes\>

    - `expire <minutes>` to read the state from the KNX bus when no telegram was received for \<minutes\>

    - `<minutes>` equivalent to "expire \<minutes\>"

    - `init` to just initialize the state on startup

  required: false
  type: [boolean, string, integer]
  default: true
```

## 数值类型 {#value-types}

The following table lists the supported numeric Data Point Types (DPT). You can use either the `type` field or the DPT number as a string in your YAML configuration to specify the data type for your entities.

| KNX DPT | type                          | size in byte |           range            | unit           |
| ------: | ----------------------------- | -----------: | :------------------------: | -------------- |
|       5 | 1byte_unsigned                |            1 |         0 ... 255          |                |
|   5.001 | percent                       |            1 |         0 ... 100          | %              |
|   5.003 | angle                         |            1 |         0 ... 360          | °              |
|   5.004 | percentU8                     |            1 |         0 ... 255          | %              |
|   5.005 | decimal_factor                |            1 |         0 ... 255          |                |
|   5.006 | tariff                        |            1 |         0 ... 254          |                |
|   5.010 | pulse                         |            1 |         0 ... 255          | counter pulses |
|       6 | 1byte_signed                  |            1 |        -128 ... 127        |                |
|   6.001 | percentV8                     |            1 |        -128 ... 127        | %              |
|   6.010 | counter_pulses                |            1 |        -128 ... 127        | counter pulses |
|       7 | 2byte_unsigned                |            2 |        0 ... 65535         |                |
|   7.001 | pulse_2byte                   |            2 |        0 ... 65535         | pulses         |
|   7.002 | time_period_msec              |            2 |        0 ... 65535         | ms             |
|   7.003 | time_period_10msec            |            2 |        0 ... 65535         | ms             |
|   7.004 | time_period_100msec           |            2 |        0 ... 65535         | ms             |
|   7.005 | time_period_sec               |            2 |        0 ... 65535         | s              |
|   7.006 | time_period_min               |            2 |        0 ... 65535         | min            |
|   7.007 | time_period_hrs               |            2 |        0 ... 65535         | h              |
|   7.011 | length_mm                     |            2 |        0 ... 65535         | mm             |
|   7.012 | current                       |            2 |        0 ... 65535         | mA             |
|   7.013 | brightness                    |            2 |        0 ... 65535         | lx             |
|   7.600 | color_temperature             |            2 |        0 ... 65535         | K              |
|       8 | 2byte_signed                  |            2 |      -32768 ... 32767      |                |
|   8.001 | pulse_2byte_signed            |            2 |      -32768 ... 32767      | pulses         |
|   8.002 | delta_time_ms                 |            2 |      -32768 ... 32767      | ms             |
|   8.003 | delta_time_10ms               |            2 |      -32768 ... 32767      | ms             |
|   8.004 | delta_time_100ms              |            2 |      -32768 ... 32767      | ms             |
|   8.005 | delta_time_sec                |            2 |      -32768 ... 32767      | s              |
|   8.006 | delta_time_min                |            2 |      -32768 ... 32767      | min            |
|   8.007 | delta_time_hrs                |            2 |      -32768 ... 32767      | h              |
|   8.010 | percentV16                    |            2 |      -32768 ... 32767      | %              |
|   8.011 | rotation_angle                |            2 |      -32768 ... 32767      | °              |
|   8.012 | length_m                      |            2 |      -32768 ... 32767      | m              |
|       9 | 2byte_float                   |            2 |  -671088.64 ... 670760.96  |                |
|   9.001 | temperature                   |            2 |      -273 ... 670760       | °C             |
|   9.002 | temperature_difference_2byte  |            2 |     -670760 ... 670760     | K              |
|   9.003 | temperature_a                 |            2 |     -670760 ... 670760     | K/h            |
|   9.004 | illuminance                   |            2 |        0 ... 670760        | lx             |
|   9.005 | wind_speed_ms                 |            2 |        0 ... 670760        | m/s            |
|   9.006 | pressure_2byte                |            2 |        0 ... 670760        | Pa             |
|   9.007 | humidity                      |            2 |        0 ... 670760        | %              |
|   9.008 | ppm                           |            2 |  -671088.64 ... 670760.96  | ppm            |
|   9.009 | air_flow                      |            2 |  -671088.64 ... 670760.96  | m³/h           |
|   9.010 | time_1                        |            2 |     -670760 ... 670760     | s              |
|   9.011 | time_2                        |            2 |     -670760 ... 670760     | ms             |
|   9.020 | voltage                       |            2 |  -671088.64 ... 670760.96  | mV             |
|   9.021 | curr                          |            2 |  -671088.64 ... 670760.96  | mA             |
|   9.022 | power_density                 |            2 |  -671088.64 ... 670760.96  | W/m²           |
|   9.023 | kelvin_per_percent            |            2 |  -671088.64 ... 670760.96  | K/%            |
|   9.024 | power_2byte                   |            2 |  -671088.64 ... 670760.96  | kW             |
|   9.025 | volume_flow                   |            2 |  -671088.64 ... 670760.96  | l/h            |
|   9.026 | rain_amount                   |            2 |  -671088.64 ... 670760.96  | l/m²           |
|   9.027 | temperature_f                 |            2 |     -459.6 ... 670760      | °F             |
|   9.028 | wind_speed_kmh                |            2 |        0 ... 670760        | km/h           |
|   9.029 | absolute_humidity             |            2 |        0 ... 670760        | g/m³           |
|   9.030 | concentration_ugm3            |            2 |        0 ... 670760        | μg/m³          |
|     9.? | enthalpy                      |            2 |  -671088.64 ... 670760.96  | H              |
|      12 | 4byte_unsigned                |            4 |      0 ... 4294967295      |                |
|  12.001 | pulse_4_ucount                |            4 |      0 ... 4294967295      | counter pulses |
|  12.100 | long_time_period_sec          |            4 |      0 ... 4294967295      | s              |
|  12.101 | long_time_period_min          |            4 |      0 ... 4294967295      | min            |
|  12.102 | long_time_period_hrs          |            4 |      0 ... 4294967295      | h              |
| 12.1200 | volume_liquid_litre           |            4 |      0 ... 4294967295      | l              |
| 12.1201 | volume_m3                     |            4 |      0 ... 4294967295      | m³             |
|      13 | 4byte_signed                  |            4 | -2147483648 ... 2147483647 |                |
|  13.001 | pulse_4byte                   |            4 | -2147483648 ... 2147483647 | counter pulses |
|  13.002 | flow_rate_m3h                 |            4 | -2147483648 ... 2147483647 | m³/h           |
|  13.010 | active_energy                 |            4 | -2147483648 ... 2147483647 | Wh             |
|  13.011 | apparant_energy               |            4 | -2147483648 ... 2147483647 | VAh            |
|  13.012 | reactive_energy               |            4 | -2147483648 ... 2147483647 | VARh           |
|  13.013 | active_energy_kwh             |            4 | -2147483648 ... 2147483647 | kWh            |
|  13.014 | apparant_energy_kvah          |            4 | -2147483648 ... 2147483647 | kVAh           |
|  13.015 | reactive_energy_kvarh         |            4 | -2147483648 ... 2147483647 | kVARh          |
|  13.016 | active_energy_mwh             |            4 | -2147483648 ... 2147483647 | MWh            |
|  13.100 | long_delta_timesec            |            4 | -2147483648 ... 2147483647 | s              |
| 13.1200 | delta_volume_liquid_litre     |            4 | -2147483648 ... 2147483647 | L              |
| 13.1201 | delta_volume_m3               |            4 | -2147483648 ... 2147483647 | m³             |
|      14 | 4byte_float                   |            4 |                            |                |
|  14.000 | acceleration                  |            4 |                            | m/s²           |
|  14.001 | acceleration_angular          |            4 |                            | rad/s²         |
|  14.002 | activation_energy             |            4 |                            | J/mol          |
|  14.003 | activity                      |            4 |                            | s⁻¹            |
|  14.004 | mol                           |            4 |                            | mol            |
|  14.005 | amplitude                     |            4 |                            |                |
|  14.006 | angle_rad                     |            4 |                            | rad            |
|  14.007 | angle_deg                     |            4 |                            | °              |
|  14.008 | angular_momentum              |            4 |                            | J s            |
|  14.009 | angular_velocity              |            4 |                            | rad/s          |
|  14.010 | area                          |            4 |                            | m²             |
|  14.011 | capacitance                   |            4 |                            | F              |
|  14.012 | charge_density_surface        |            4 |                            | C/m²           |
|  14.013 | charge_density_volume         |            4 |                            | C/m³           |
|  14.014 | compressibility               |            4 |                            | m²/N           |
|  14.015 | conductance                   |            4 |                            | S              |
|  14.016 | electrical_conductivity       |            4 |                            | S/m            |
|  14.017 | density                       |            4 |                            | kg/m³          |
|  14.018 | electric_charge               |            4 |                            | C              |
|  14.019 | electric_current              |            4 |                            | A              |
|  14.020 | electric_current_density      |            4 |                            | A/m²           |
|  14.021 | electric_dipole_moment        |            4 |                            | C m            |
|  14.022 | electric_displacement         |            4 |                            | C/m²           |
|  14.023 | electric_field_strength       |            4 |                            | V/m            |
|  14.024 | electric_flux                 |            4 |                            | c              |
|  14.025 | electric_flux_density         |            4 |                            | C/m²           |
|  14.026 | electric_polarization         |            4 |                            | C/m²           |
|  14.027 | electric_potential            |            4 |                            | V              |
|  14.028 | electric_potential_difference |            4 |                            | V              |
|  14.029 | electromagnetic_moment        |            4 |                            | A m²           |
|  14.030 | electromotive_force           |            4 |                            | V              |
|  14.031 | energy                        |            4 |                            | J              |
|  14.032 | force                         |            4 |                            | N              |
|  14.033 | frequency                     |            4 |                            | Hz             |
|  14.034 | angular_frequency             |            4 |                            | rad/s          |
|  14.035 | heatcapacity                  |            4 |                            | J/K            |
|  14.036 | heatflowrate                  |            4 |                            | W              |
|  14.037 | heat_quantity                 |            4 |                            | J              |
|  14.038 | impedance                     |            4 |                            | Ω              |
|  14.039 | length                        |            4 |                            | m              |
|  14.040 | light_quantity                |            4 |                            | lm s           |
|  14.041 | luminance                     |            4 |                            | cd/m²          |
|  14.042 | luminous_flux                 |            4 |                            | lm             |
|  14.043 | luminous_intensity            |            4 |                            | cd             |
|  14.044 | magnetic_field_strength       |            4 |                            | A/m            |
|  14.045 | magnetic_flux                 |            4 |                            | Wb             |
|  14.046 | magnetic_flux_density         |            4 |                            | T              |
|  14.047 | magnetic_moment               |            4 |                            | A m²           |
|  14.048 | magnetic_polarization         |            4 |                            | T              |
|  14.049 | magnetization                 |            4 |                            | A/m            |
|  14.050 | magnetomotive_force           |            4 |                            | A              |
|  14.051 | mass                          |            4 |                            | kg             |
|  14.052 | mass_flux                     |            4 |                            | kg/s           |
|  14.053 | momentum                      |            4 |                            | N/s            |
|  14.054 | phaseanglerad                 |            4 |                            | rad            |
|  14.055 | phaseangledeg                 |            4 |                            | °              |
|  14.056 | power                         |            4 |                            | W              |
|  14.057 | powerfactor                   |            4 |                            |                |
|  14.058 | pressure                      |            4 |                            | Pa             |
|  14.059 | reactance                     |            4 |                            | Ω              |
|  14.060 | resistance                    |            4 |                            | Ω              |
|  14.061 | resistivity                   |            4 |                            | Ωm             |
|  14.062 | self_inductance               |            4 |                            | H              |
|  14.063 | solid_angle                   |            4 |                            | sr             |
|  14.064 | sound_intensity               |            4 |                            | W/m²           |
|  14.065 | speed                         |            4 |                            | m/s            |
|  14.066 | stress                        |            4 |                            | Pa             |
|  14.067 | surface_tension               |            4 |                            | N/m            |
|  14.068 | common_temperature            |            4 |                            | °C             |
|  14.069 | absolute_temperature          |            4 |                            | K              |
|  14.070 | temperature_difference        |            4 |                            | K              |
|  14.071 | thermal_capacity              |            4 |                            | J/K            |
|  14.072 | thermal_conductivity          |            4 |                            | W/mK           |
|  14.073 | thermoelectric_power          |            4 |                            | V/K            |
|  14.074 | time_seconds                  |            4 |                            | s              |
|  14.075 | torque                        |            4 |                            | Nm             |
|  14.076 | volume                        |            4 |                            | m³             |
|  14.077 | volume_flux                   |            4 |                            | m³/s           |
|  14.078 | weight                        |            4 |                            | N              |
|  14.079 | work                          |            4 |                            | J              |
|  14.080 | apparent_power                |            4 |                            | VA             |
| 14.1200 | volume_flux_meter             |            4 |                            | m³/h           |
| 14.1201 | volume_flux_ls                |            4 |                            | L/s            |
|  16.000 | string                        |           14 |           ASCII            |                |
|  16.001 | latin_1                       |           14 |    ISO 8859-1 / Latin-1    |                |
|  17.001 | scene_number                  |            1 |          1 ... 64          |                |
|      29 | 8byte_signed                  |            8 |    ±9223372036854775807    |                |
|  29.010 | active_energy_8byte           |            8 |    ±9223372036854775807    | Wh             |
|  29.011 | apparant_energy_8byte         |            8 |    ±9223372036854775807    | VAh            |
|  29.012 | reactive_energy_8byte         |            8 |    ±9223372036854775807    | VARh           |

## 已知限制

- The integration aims to be compatible with a wide variety of KNX devices from different manufacturers and eras. However, there are some devices that use non-standard <abbr title="data point type">DPT</abbr> or use telegrams in a proprietary way. In these cases, you might not be able to configure entities directly through this integration. However, you may still use [Template entities](/home-assistant/integrations/template/) with the [KNX telegram trigger](#telegram-trigger) to work around this.

- USB bus interfaces are not directly supported by the underlying [`xknx` library](https://github.com/XKNX/xknx). However, you could try to run a software KNX router such as `Calimero` or `knxd` alongside Home Assistant to serve as a USB to IP bridge. For best reliability, using a certified KNX IP interface or router is recommended.

## 故障排除 / 常见问题

### KNX 集成的日志

The [`xknx` library](https://github.com/XKNX/xknx) is used for KNX communication. It provides various logging handlers for monitoring and debug purposes.
Add the following lines to your Home Assistant "`configuration.yaml`" to activate them:

```yaml
logger:
  default: warning
  logs:
    # For most debugging needs `xnx.log` and `xknx.telegram` are a good choice.
    xknx: info  # sets the level of all loggers
    # Loggers for different layers of KNX communication
    xknx.log: debug  # provides general information (connection, etc.)
    xknx.telegram: debug  # logs telegrams before they are being processed or sent
    xknx.cemi: debug  # logs incoming and outgoing CEMI frames
    xknx.data_secure: debug  # logs Data Secure relevant information
    xknx.ip_secure: debug  # logs IP Secure relevant information
    xknx.knx: debug  # logs incoming and outgoing KNX/IP frames
    xknx.raw_socket: warning  # logs incoming UDP/TCP frames in raw hex format at socket level
    # Loggers for xknx internals
    xknx.ga_dpt: warning  # logs when payloads can't be decoded with given project file information
    xknx.state_updater: warning  # provides information about the state updater
```

You can use the `logger.set_level` action to change the log level of a handler on a running instance.
[![Open **Settings** > **Developer tools** > **Actions** in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=logger.set_level)

### 组地址无法读取

Every `*_state_address` is read on startup sequentially if not configured differently. If you see the following errors in your log, a group address could not be read by a GroupValueRead request from Home Assistant in time.

```log
> Could not sync group address '1/2/3' (Entity name - Feature)
> Error: KNX bus did not respond in time (2.0 secs) to GroupValueRead request for: '1/2/3'
```

#### ETS 中没有为该组地址（GA）分配启用读取标志的组对象（GO） {#no-group-object-go-assigned-to-the-group-address-ga-has-the-read-flag-set-in-ets}

- Enable the read flag for *one* GO assigned to the GA. Use the one most likely to hold the current state (e.g., for a light entity's `brightness_state_address` the according GO of the dimming actuator).

#### 响应报文未通过安装中的线路耦合器、路由器或其他过滤器 {#response-telegrams-are-not-passing-a-line-coupler-router-or-other-filter-in-the-installation}

- Assign the group addresses used by Home Assistant to the used interface in ETS if your interface application supports that. ETS will generate filter tables that are applied to your line couplers after updating their application.
- If your interface application doesn't support that, use a dummy device in ETS for Home Assistant. These can be found in the ETS online catalog. Assign it to the line your interface connects Home Assistant to and link its group objects to the group addresses you are using in Home Assistant.

#### 系统无响应 {#unresponsive-system}

- The timeout for logging the errors (2 seconds) is started when the GroupValueRead request is scheduled to be sent. On systems experiencing high loads sending can be delayed (e.g., Raspberry Pi running lots of integrations at startup).
Incoming response telegrams are always processed, so no information gets lost.

### 重复的实体

If you find following error in your log you seem to have a duplicated entity in your configuration.

```log
Platform knx does not generate unique IDs. ID 1/2/3 already exists - ignoring platform.name
```

The `unique_id` for KNX entities is generated based on required configuration values.

- binary_sensor: `state_address`
- climate: `temperature_address` `target_temperature_state_address` `target_temperature_address` `setpoint_shift_address`
- cover: `move_long_address` `position_address`
- fan: `address`
- light: `address` or all combined `brightness_address` if only `individual_colors` is used
- notify: `address`
- scene: `address` and `scene_number`
- sensor: `state_address`
- switch: `address`
- weather: `address_temperature`

There can not be multiple entities on the same platform sharing these exact group addresses, even if they differ in other configuration.

## 删除集成

This integration can be removed by following these steps:

### 从 Home Assistant 中移除集成实例 {#to-remove-an-integration-instance-from-home-assistant}

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

In addition, remove `knx:` from your "`configuration.yaml`".

:::warning
Removing the integration will delete an uploaded keyring file, ETS project information, telegram history, and all entity configuration done via the UI panel.


:::
