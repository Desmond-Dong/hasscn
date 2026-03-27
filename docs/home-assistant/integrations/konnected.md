---
title: Konnected.io (传统版)
description: 'Konnected.io (传统版) 集成允许您将有线传感器和开关连接到 Konnected 报警面板，或运行开源 Konnected 软件(https://github.com/konnected-io/konnected-security)的基于 NodeMCU ESP8226 的设备。'
ha_category:
  - Alarm
  - Binary sensor
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: '0.70'
ha_codeowners:
  - '@heythisisnate'
ha_config_flow: true
ha_domain: konnected
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: hub
---
# Konnected.io (传统版)

**Konnected.io (传统版)** 集成允许您将有线传感器和开关连接到 Konnected 报警面板，或运行[开源 Konnected 软件](https://github.com/konnected-io/konnected-security)的基于 NodeMCU ESP8226 的设备。重复使用旧式或预装报警系统安装中的有线传感器和警报器，并将它们直接集成到 Home Assistant 中。

:::warning
此集成已被弃用，推荐使用 [Konnected 的 ESPHome 固件](https://support.konnected.io/add-a-konnected-device-to-home-assistant-with-esphome)，将不再接收更新。ESPHome 在本地原生连接到 Home Assistant，不需要此自定义集成。如果您刚开始使用 Konnected 设备，请勿使用此集成。相反，请为 [Konnected 报警面板](https://install.konnected.io/esphome)和[车库门开启器](https://support.konnected.io/installing-the-garage-door-opener-with-home-assistant)刷入基于 ESPHome 的固件。

:::
访问 [Konnected.io 网站](https://konnected.io) 了解有关 Konnected 报警面板板和兼容硬件的更多信息。

:::important
在将面板连接到 Home Assistant 之前，请始终确保您的面板运行的是[最新固件](https://help.konnected.io/support/solutions/folders/32000035066)。

:::
该集成目前在 Home Assistant 中支持以下设备类型：

- 二值传感器：有线门窗传感器、运动探测器、玻璃破碎探测器、漏水传感器、烟雾和 CO 探测器或任何开/关开关。
- 开关：驱动警报器、频闪灯、蜂鸣器或继电器模块。
- 传感器：来自 DHT 温湿度传感器和 DS18B20 温度传感器的定期测量。

此集成使用 [SSDP](/home-assistant/integrations/ssdp) 集成，必须启用该集成才能使设备发现工作。如果您不想使用 SSDP，则需要手动提供每个 Konnected 面板的 IP 和端口信息。可以使用 Konnected 移动应用程序找到 IP/端口信息。

:::note
Konnected 设备通过您的本地 LAN 与 Home Assistant 通信——没有云组件！为了获得最佳性能，我们建议允许 LAN 上的 Konnected 设备与 Home Assistant 之间的不安全 HTTP API 流量。这意味着您不应使用 `http` 集成来提供 SSL/TLS 证书。相反，使用 NGINX 或 Caddy 等代理来提供 SSL/TLS。[了解更多。](https://help.konnected.io/support/solutions/articles/32000023964-set-up-hass-io-with-secure-remote-access-using-duckdns-and-nginx-proxy)

:::
## 配置

### Web 界面

从 0.106.0 开始，Home Assistant 需要通过 Home Assistant (Web) 前端中的 **设置** > **设备与服务** 进行 Konnected 的基于 UI 的配置。如果您的 LAN 上有 Konnected 报警面板，或在 configuration.yaml 中，您将在 **已发现** 集成列表中看到一个或多个 **Konnected.io** 条目。

选择其中一个已发现的面板将引导您完成连接和配置面板的过程。如果您的面板是通过 SSDP 发现的，您不需要任何信息即可完成配置——只需确认显示的信息正确即可。如果 UI 提示您输入 IP/端口，您需要输入它。可以使用 Konnected 移动应用程序找到 IP/端口信息。

:::note
如果您有现有的 `configuration.yaml`，完成 UI 配置将对 `configuration.yaml` 中包含的设置进行一次性导入。一旦导入创建了 **已配置** 集成，就不再使用 `configuration.yaml` 的 Konnected 部分——建议在导入发生后删除 `configuration.yaml` 的 `konnected` 部分。以后对设置的任何更改都应通过 Home Assistant Web 界面中提供的设置进行。

如果您想保留 `configuration.yaml` 并需要重新导入任何更改或更新，您需要删除 **设置** > **设备与服务** > **已配置** 中的条目，并重复该设备的 UI 配置。

:::
配置完成后，您将在 **设置** > **设备与服务** > **已配置** 中看到 Konnected.io 条目。如果您从 `configuration.yaml` 导入了设置，现在就完成了！如果您正在设置新的 Konnected 报警面板或修改设置，您需要使用设置 UI 来配置区域行为。

#### 使用设置 UI 配置区域行为

每个面板的设置可以通过在 **设置** > **设备与服务** > **已配置** 中选择条目，然后点击右上角的齿轮图标来访问。您可以随时重新配置这些设置，一旦完成，设置将立即应用。

设置 UI 首先让您配置每个区域的一般行为。您需要为每个区域指定 `禁用`、`二值传感器`、`数字传感器` 或 `可切换输出`。之后，系统将提示您为每个未禁用的区域配置区域行为的详细信息。所有区域都允许输入名称。其他字段取决于您如何配置区域的一般行为。
**注意，某些区域不支持所有行为。UI 将反映每个区域可用的特定选项。**

##### 二值传感器：

**二值传感器类型：** 连接到区域的传感器类型。

**名称（可选）** 与区域关联的实体的友好名称。

**反转开/关状态：** 反转二值传感器电路的开/关含义。通常用于常开有线烟雾报警电路。

##### 数字传感器：

**传感器类型：** 连接到区域的传感器类型——`dht` 或 `ds18b20`。

**名称（可选）** 与区域关联的实体的友好名称。

**轮询间隔（可选）：** 轮询传感器更新的频率（分钟）。

##### 可切换输出：

**名称：（可选）** 与区域关联的实体的友好名称。

**开启时的输出：** 激活时开关的状态。

**脉冲持续时间（可选）：** 激活后开关脉冲的持续时间（毫秒）。

**脉冲间暂停（可选）：** 激活时脉冲之间等待的持续时间（毫秒）。

**重复次数（可选）：** 每次激活开关时重复脉冲的次数。

**为此区域配置附加状态：** 选择"否"将完成区域的配置并进入下一个区域的选项。如果您需要为此区域创建额外的输出状态，请选择"是"。

#### 使用设置 UI 配置附加面板行为

配置完所有区域后，系统将显示附加面板行为的配置。

**发送状态更改时闪烁面板 LED：** 面板所需的 LED 行为。

**覆盖默认的 Home Assistant API 主机 URL：** Konnected 报警面板将传感器状态回传到 Home Assistant API。如果此值未选中，面板将使用 Home Assistant 中[配置](/home-assistant/integrations/homeassistant/#allowlist_external_urls)的 URL 默认回传。默认情况下，集成将使用内部 URL。但是，如果您选中此字段并将 **自定义 API 主机 URL** 设置为您的_本地_ IP 地址和端口（例如 `http://192.168.1.101:8123`），它将代替内部 URL 使用。

**自定义 API 主机 URL（可选）：** 如果您在上面的步骤中选中了 **覆盖默认的 Home Assistant API 主机 URL**，则使用的主机信息。如果 **覆盖默认的 Home Assistant API 主机 URL** 未选中，则忽略此项。

### YAML 配置

如果您愿意，可以使用 `configuration.yaml` 文件中的 `konnected` 部分来指定网络上的 Konnected 设备及其连接的传感器或执行器。如果使用 `configuration.yaml`，在通过面板的配置流程时配置将进行一次性导入。**请注意，您仍必须完成基于 UI 的设置，然后集成才会配置并创建/访问实体。**

配置字段和值的详细信息可以在下面找到。
```yaml
# 示例 configuration.yaml 条目
konnected:
  access_token: REPLACE_ME_WITH_A_RANDOM_STRING
  devices:
    - id: 438a388bcd53
      binary_sensors:
        - zone: 1
          type: door
      switches:
        - zone: out
    - id: 8bcd53438a38
      binary_sensors:
        - pin: 2
          type: door
      switches:
        - pin: 5
```

```yaml
access_token:
  description: 任意随机字符串。这用于确保只有您配置的设备才能向 Home Assistant 进行身份验证以更改设备状态。
  required: true
  type: string
api_host:
  description: 覆盖 Konnected 设备用于通信传感器状态更新的 Home Assistant IP 地址/主机（和端口号）。如果省略，这默认为 Home Assistant 配置中的内部 URL 值。
  required: false
  type: string
  default: 内部 URL 的值
devices:
  description: 您网络上的 Konnected 设备列表。
  required: true
  type: list
  keys:
    id:
      description: Konnected 设备的 MAC 地址（Konnected 报警面板）或设备 ID（Konnected 报警面板 Pro）。MAC 地址必须格式化为不带冒号/标点符号，例如 `68c63a8bcd53`。您通常可以在路由器的客户端列表中找到 MAC 地址。或者，检查 [Home Assistant 日志](/home-assistant/integrations/logger/#viewing-logs)以获取自动发现设备的日志消息。设备 ID 可以在设备状态页面上找到，可通过 Konnected 移动应用程序访问。
      required: true
      type: string
    binary_sensors:
      description: 连接到设备的二值传感器列表。有关配置变量，请参阅 [Konnected 二值传感器](/home-assistant/integrations/konnected#binary-sensor)。
      required: false
      type: list
      keys:
        pin:
          description: 参见[配置说明](#configuration-notes)。
          required: exclusive
        zone:
          description: 参见[配置说明](#configuration-notes)。
          required: exclusive
        type:
          description: 任何[二值传感器](/home-assistant/integrations/binary_sensor/)类，通常是 `door`、`window`、`motion` 或 `smoke`。
          required: true
        name:
          description: 前端使用的设备名称。
          required: false
          default: 自动生成
        inverse:
          type: boolean
          description: 反转二值传感器电路的开/关含义。通常用于常开有线烟雾报警电路。
          required: false
          default: false
    sensors:
      description: 连接到设备的数字传感器列表（目前支持 DHT 和 DS18B20 传感器）
      required: false
      type: list
      keys:
        pin:
          description: 参见[配置说明](#configuration-notes)。
          required: exclusive
        zone:
          description: 参见[配置说明](#configuration-notes)。
          required: exclusive
        name:
          description: 前端使用的设备名称。
          required: false
          default: 自动生成
        type:
          description: 传感器类型。有效值为 `dht` 或 `ds18b20`
          required: true
        poll_interval:
          type: integer
          description: Konnected 设备报告传感器数据的频率（分钟）。最小 `1` 分钟。_注意：_ 这仅为 `dht` 传感器实现。
          required: false
          default: 未设置（设备默认为 3 分钟）
    switches:
      description: 连接到设备的执行器（开/关开关）列表。有关配置变量，请参阅 [Konnected 开关](/home-assistant/integrations/konnected#switch)。
      required: false
      type: list
      keys:
        pin:
          description: 参见[配置说明](#configuration-notes)。
          required: exclusive
        zone:
          description: 参见[配置说明](#configuration-notes)。
          required: exclusive
        name:
          description: 前端使用的设备名称。
          required: false
          default: 自动生成
        activation:
          description: `low` 或 `high`，用于指定开关打开时的状态。
          default: high
          required: false
        momentary:
          description: 瞬时脉冲的持续时间（毫秒）。要使用继电器为车库门开启器制作半秒瞬时触点，请将此值设置为 `500`。
          required: false
        pause:
          description: 同时使用 _momentary_ 和 _repeat_ 时脉冲之间暂停的时间（毫秒）。要使用压电蜂鸣器发出门铃"哔"声，请将此值设置为 `55`，将 _momentary_ 设置为 `65`，将 _repeat_ 设置为 `3` 或 `4`。
          required: false
        repeat:
          description: 重复瞬时脉冲的次数。设置为 `-1` 可无限重复。这对于与压电蜂鸣器一起用作警报或警告很有用。
          required: false
    host:
      type: string
      required: false
      description: 可选指定 Konnected 设备的 IP 地址或主机名以在没有发现的情况下进行设置。
    port:
      type: integer
      required: false
      description: 可选指定设备上 Konnected API 的端口号。请注意，每个设备的端口都不同。请参阅 help.konnected.io 了解如何确定端口号。
    discovery:
      type: boolean
      required: false
      default: true
      description: 启用或禁用此设备的发现。当 `true` 时，设备将响应您网络上的发现请求。当 `false` 时，设备将不响应发现请求，因此为设备设置保留 IP 并在此处配置 _host_ 和 _port_ 很重要。
    blink:
      type: boolean
      required: false
      default: true
      description: 成功传输状态更改后闪烁蓝色 LED。
```

### 配置说明

- 每个执行器或传感器都需要 `pin` 或 `zone`。不要在同一定义中同时使用两者。
- `pin` 表示对应于 NodeMCU 开发板上标记引脚的 _IO 索引_ 的数字。有关更多详细信息，请参阅 [NodeMCU GPIO 文档](https://nodemcu.readthedocs.io/en/release/modules/gpio/)。有效值为 `1`、`2`、`5`、`6`、`7`、`8` 和 `9`。基于引脚的配置仅允许用于基于 ESP8266 的设备。
- 引脚 `D8` 或 `out` 区域仅在激活设置为高（默认值）时工作。
- `zone` 表示对应于 [Konnected 报警面板](https://konnected.io)板上标记区域的值。Konnected 报警面板的有效区域值为 `1`、`2`、`3`、`4`、`5`、`6` 和 `out`（`out` 表示专用的 ALARM/OUT 端子），Konnected 报警面板 Pro 为 `1`、`2`、`3`、`4`、`5`、`6`、`7`、`8`、`9`、`10`、`11`、`12`、`out1`、`alarm1` 和 `alarm2_out2`。
- **Konnected 报警面板 Pro 不支持通过 `pin` 进行配置。**

## 扩展配置

```yaml
# 示例 configuration.yaml 条目
konnected:
  access_token: REPLACE_ME_WITH_A_RANDOM_STRING
  devices:
    - id: 6001948bcd53
      binary_sensors:
        - zone: 1
          type: door
          name: "前门"
        - zone: 2
          type: smoke
          name: "卧室烟雾探测器"
          inverse: true
        - zone: 3
          type: motion
          name: "测试运动"
      switches:
        - zone: out
          name: 警报器
        - zone: 5
          name: "哔哔"
          momentary: 65
          pause: 55
          repeat: 4
        - zone: 5
          name: 警告
          momentary: 65
          pause: 55
          repeat: -1
    - id: 5ccf7f438a38
      binary_sensors:
        - pin: 1
          type: motion
          name: 办公室运动
        - pin: 2
          type: door
          name: 办公室门
      switches:
        - pin: 5
          name: 车库门
          activation: low
          momentary: 500
        - pin: 8
          name: LED 灯
      sensors:
        - pin: 6
          name: 厨房
          type: dht
```

## 唯一 ID 和实体注册表

从 Home Assistant 版本 0.90 开始，为每个传感器或开关实体生成唯一 ID。这使最终用户能够通过 Home Assistant UI 在 [**设置** > **设备与服务** > **实体**](https://my.home-assistant.io/redirect/entities/) 修改实体名称和实体 ID。

唯一 ID 内部生成如下：

**二值传感器**：`{mac-address}-{zone-number}`

**开关**：`{mac-address}-{unique-hash}`*

**DHT 传感器**：`{mac-address}-{pin-number}-{temperature|humidity}`

**DS18B20 传感器**：`{sensor-serial-number}`

\* 开关由包含引脚号、`momentary`、`pause` 和 `repeat` 值的唯一哈希标识。如果修改这些值，将创建一个新实体，旧实体必须从 _实体注册表_ 中手动删除。

## 引脚映射

Konnected 运行在带有 NodeMCU 固件的 ESP8266 板上。它通常与 NodeMCU 开发套件 Wi-Fi 模块一起使用，也可以选择 Konnected 的报警面板硬件。下表显示了 Konnected 硬件标记区域、NodeMCU 标记引脚和 ESP8266 GPIO 引脚之间的引脚映射。

| Konnected 报警面板区域 | NodeMCU 引脚 | IO 索引 | ESP8266 GPIO |
| -------------------------- | ----------- | -------- | ------------ |
| 1                          | D1          | 1        | GPIO5        |
| 2                          | D2          | 2        | GPIO4        |
| 3                          | D5          | 5        | GPIO14       |
| 4                          | D6          | 6        | GPIO12       |
| 5                          | D7          | 7        | GPIO13       |
| 6                          | RX          | 9        | GPIO3        |
| ALARM 或 OUT               | D8          | 8        | GPIO15       |

## 二值传感器

`konnected` 二值传感器允许您监控连接到运行[开源 Konnected 软件](https://github.com/konnected-io/konnected-security)的 NodeMCU ESP8266 Wi-Fi 模块的有线门传感器、窗传感器、运动传感器、烟雾探测器、CO 探测器、玻璃破碎传感器、水漏传感器或任何其他简单的有线开/关电路。

此集成支持通用[二值传感器](/home-assistant/integrations/binary_sensor/)集成的所有内置设备类。

## 开关

`konnected` 开关平台允许您使用 [Konnected 报警面板板](https://konnected.io)或继电器模块以及运行[开源 Konnected 软件](https://github.com/konnected-io/konnected-security)的 NodeMCU ESP8266 Wi-Fi 模块来驱动报警系统警报器、频闪灯、蜂鸣器或任何其他有线设备。