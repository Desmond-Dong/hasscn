---
title: SNMP
description: 有关如何将 SNMP 集成到 Home Assistant 的说明。
ha_category:
  - Network
  - Presence detection
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.57
ha_domain: snmp
ha_platforms:
  - device_tracker
  - sensor
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@nmaggioni'
ha_quality_scale: legacy
---

许多路由器、Wi-Fi 接入点、打印机以及其他联网设备都支持[简单网络管理协议 (SNMP)](https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol)。这是一种用于监控和管理联网设备的标准化方法。SNMP 使用树状层级结构，其中每个节点都是一个对象。许多此类对象都包含持续更新的指标列表，例如网络接口吞吐量、磁盘活动、网络中的活跃设备、墨粉余量等。

Home Assistant 目前支持以下设备类型：

- [Presence detection](#presence-detection)
- [Sensor](#sensor)
  - [Finding OIDs](#finding-oids)
  - [Examples](#examples)
    - [Printer uptime minutes](#printer-uptime-minutes)
- [Switch](#switch)

:::important
此设备追踪器要求在目标网络设备上启用 SNMP。你可能需要在路由器、交换机、服务器或任何你要从中提取信息的设备上手动安装 SNMP 支持。

:::
## 在线状态检测

以下 OID 指向多个常见路由器品牌当前的 MAC 地址表。它们反映了网络中最近出现过的所有设备。不过，由于设备通常要在预定义超时后才会从这些内部表中删除（通常是在设备最后一次在网络中活跃后的 5 到 15 分钟，取决于厂商实现），因此它们用于[设备追踪](/home-assistant/integrations/device_tracker/)的效果通常不够理想。如果需要接近实时的结果，建议改用 [Ping](/home-assistant/integrations/ping) 或 [Nmap](/home-assistant/integrations/nmap_tracker) 集成。

| Brand    | Device/Firmware                  | OID                                             |
| -------- | -------------------------------- | ----------------------------------------------- |
| Aerohive | AP230                            | `1.3.6.1.4.1.26928.1.1.1.2.1.2.1.1`             |
| Apple    | Airport Express (2nd gen.) 7.6.9 | `1.3.6.1.2.1.3.1.1.2` or `1.3.6.1.2.1.4.22.1.2` |
| Aruba    | IAP325 on AOS 6.5.4.8            | `1.3.6.1.4.1.14823.2.3.3.1.2.4.1.1`             |
| BiPAC    | 7800DXL Firmware 2.32e           | `1.3.6.1.2.1.17.7.1.2.2.1.1`                    |
| DD-WRT   | unknown version/model            | `1.3.6.1.2.1.4.22.1.2`                          |
| IPFire   | 2.25                             | `1.3.6.1.2.1.4.22.1.2`                          |
| MikroTik | unknown RouterOS version/model   | `1.3.6.1.4.1.14988.1.1.1.2.1.1`                 |
| MikroTik | RouterOS 6.x on RB2011           | `1.3.6.1.2.1.4.22.1.2`                          |
| OpenWrt  | Chaos Calmer 15.05               | `1.3.6.1.2.1.4.22.1.2`                          |
| OPNSense | 19.1                             | `1.3.6.1.2.1.4.22.1.2`                          |
| pfSense  | 2.2.4                            | `1.3.6.1.2.1.4.22.1.2`                          |
| Ruckus   | ZoneDirector 9.13.3              | `1.3.6.1.4.1.25053.1.2.2.1.1.3.1.1.1.6`         |
| TP-Link  | Archer VR1600v                   | `1.3.6.1.2.1.3.1.1.2.16.1`                      |
| TP-Link  | Archer VR2600v                   | `1.3.6.1.2.1.3.1.1.2.19.1`                      |
| TP-Link  | Archer VR600                     | `1.3.6.1.2.1.3.1.1.2`                           |
| Ubiquiti | Edgerouter Lite v1.9.0           | `1.3.6.1.2.1.4.22.1.2`                          |

若要在安装中使用 SNMP 版本 1 或 2c，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# SNMP 版本 1 或 2c 的 configuration.yaml 示例条目
device_tracker:
  - platform: snmp
    host: 192.168.1.1
    community: public
    baseoid: 1.3.6.1.4.1.14988.1.1.1.2.1.1
```

如果你的网络设备支持 SNMP 版本 3 且已正确配置，则可通过添加 `auth_key` 和 `priv_key` 变量来启用加密。示例配置如下：

```yaml
# SNMP 版本 3 的 configuration.yaml 示例条目
device_tracker:
  - platform: snmp
    host: 192.168.1.1
    community: USERNAME
    auth_key: AUTHPASS
    priv_key: PRIVPASS
    baseoid: 1.3.6.1.4.1.14988.1.1.1.2.1.1
```

```yaml
host:
  description: 路由器的 IP 地址，例如 192.168.1.1。
  required: true
  type: string
community:
  description: 设备上设置的 SNMP community。大多数设备默认 community 为 `public`，并带有只读权限（对大多数用途已足够）。
  required: true
  type: string
baseoid:
  description: 可找到无线客户端注册信息的 OID 前缀，通常由厂商决定。建议使用数字表示法。要查找该基础 OID，请查看厂商文档或设备的 MIB 文件。
  required: true
  type: string
auth_key:
  description: "SNMPv3 的认证密钥。也必须设置变量 `priv_key`。"
  required: inclusive
  type: string
priv_key:
  description: "SNMPv3 的隐私密钥。也必须设置变量 `auth_key`。"
  required: inclusive
  type: string
```

有关如何配置要追踪的人员，请参阅[设备追踪器集成页面](/home-assistant/integrations/device_tracker/)。

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

## 传感器

`snmp` 传感器平台用于显示网络设备通过 SNMP 协议提供的值。

若要在安装中启用该传感器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: snmp
    host: 192.168.1.32
    baseoid: 1.3.6.1.4.1.2021.10.1.3.1
```

```yaml
accept_errors:
  description: "决定当 SNMP 主机无法访问或无响应时，传感器是否仍应启动并继续工作。这样即使例如打印机在 Home Assistant 启动时未开机，传感器也能正确初始化。"
  required: false
  type: string
  default: false
auth_key:
  description: 用于 SNMP v3 的认证密钥。
  required: false
  type: string
  default: no key
auth_protocol:
  description: 用于 SNMP v3 的认证协议。
  required: false
  type: string
  default: 'none'
baseoid:
  description: 信息所在的 OID。建议使用数字表示法。
  required: true
  type: string
community:
  description: "设备用于 SNMP v1 和 v2c 的 SNMP community。大多数设备默认 community 为 `public`，并带有只读权限（对大多数不接受通过 SNMP 直接修改参数的设备来说已足够，例如打印机）。"
  required: false
  type: string
  default: 'public'
default_value:
  description: "如果设置了 `accept_errors` 且主机无法访问或无响应，决定传感器应采用什么值。若未设置，发生错误时传感器值将为 `unknown`。"
  required: false
  type: string
device_class:
  description: 设置[设备类别](/home-assistant/integrations/sensor#device-class)，从而改变前端显示的设备状态和图标。
  required: false
  type: string
host:
  description: 主机的 IP 地址，例如 `192.168.1.32`。
  required: false
  type: string
  default: 'localhost'
icon:
  description: 为 SNMP 传感器定义图标模板。
  required: false
  type: template
name:
  description: 为 SNMP 传感器定义名称模板。
  required: false
  type: template
  default: SNMP
picture:
  description: 为 SNMP 传感器定义实体图片模板。
  required: false
  type: template
port:
  description: 主机的 SNMP 端口。
  required: false
  type: string
  default: '161'
priv_key:
  description: 用于 SNMP v3 的隐私密钥。
  required: false
  type: string
  default: no key
priv_protocol:
  description: 用于 SNMP v3 的隐私协议。
  required: false
  type: string
  default: 'none'
state_class:
  description: 传感器的 [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes)。
  required: false
  type: string
unique_id:
  description: 用于唯一标识此实体的 ID。这样可以在 Web 界面中更改 `name`、`icon` 和 `entity_id`。
  required: false
  type: string
unit_of_measurement:
  description: 定义传感器的计量单位（如果有）。
  required: false
  type: string
username:
  description: 用于认证的用户名。
  required: false
  type: string
  default: ''
value_template:
  description: "定义用于解析数值的[模板](/home-assistant/docs/configuration/templating/#processing-incoming-data)。"
  required: false
  type: template
version:
  description: "SNMP 协议版本，可为 `1`、`2c` 或 `3`。要读取 64 位计数器数据，需要使用 `2c` 或更高版本。"
  required: false
  type: string
  default: '1'
```

`auth_protocol` 的有效值：

- **none**
- **hmac-md5**
- **hmac-sha**
- **hmac128-sha224**
- **hmac192-sha256**
- **hmac256-sha384**
- **hmac384-sha512**

`priv_protocol` 的有效值：

- **none**
- **des**
- **3des-ede**
- **aes-cfb-128**
- **aes-cfb-192**
- **aes-cfb-256**

### 查找 OID

OID 在不同系统上可能不同，因为它们通常是厂商特定的。查找 OID 的最佳位置是设备手册或厂商文档。例如，以下 OID 对应 Linux 系统的负载信息。

- 1 分钟负载：`1.3.6.1.4.1.2021.10.1.3.1`
- 5 分钟负载：`1.3.6.1.4.1.2021.10.1.3.2`
- 15 分钟负载：`1.3.6.1.4.1.2021.10.1.3.3`

有许多工具可用于处理 SNMP。`snmpwalk` 可以让你轻松获取某个 OID 的值。

```bash
$ snmpwalk -Os -c public -v 2c 192.168.1.32 1.3.6.1.4.1.2021.10.1.3.1
laLoad.1 = STRING: 0.19
```

### 示例

#### 打印机运行时长（分钟）

根据最常见的 SNMP 标准，设备运行时长可通过 OID `1.3.6.1.2.1.1.3.0` 获取。该值采用名为 `TimeTicks` 的格式表示，单位为百分之一秒。

若要创建一个以分钟显示打印机运行时长的传感器，可以使用以下配置：


```yaml
# configuration.yaml 示例条目
sensor:
  - platform: snmp
    name: "Printer uptime"
    host: 192.168.2.21
    baseoid: 1.3.6.1.2.1.1.3.0
    accept_errors: true
    unit_of_measurement: "minutes"
    value_template: "{{((value | int) / 6000) | int}}"
```


`accept_errors` 选项可让传感器在 Home Assistant 首次启动时，即使打印机尚未开机也能正常工作：此时传感器只会显示 `-`，而不是分钟数。

`value_template` 选项会将原始值转换为分钟。

## 开关

`snmp` 开关平台允许你控制支持 SNMP 的设备。

目前仅支持接受整数值的 SNMP OID。支持 SNMP v1、v2c 和 v3。

若要在安装中使用 SNMP 开关：

```yaml
# configuration.yaml 示例条目：
switch:
  - platform: snmp
    host: 192.168.0.2
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
```

```yaml
baseoid:
  description: 用于轮询开关状态的 SNMP BaseOID。
  required: true
  type: string
command_oid:
  description: 用于打开和关闭开关的 SNMP OID；若与 `baseoid` 不同，可在此设置。
  required: false
  type: string
host:
  description: 要控制的 IP/主机。
  required: false
  type: string
  default: 'localhost'
port:
  description: 通信所使用的端口。
  required: false
  type: string
  default: '161'
community:
  description: 用于认证的 community 字符串（SNMP v1 和 v2c）。
  required: false
  type: string
  default: 'private'
username:
  description: 用于认证的用户名。
  required: false
  type: string
  default: ''
auth_key:
  description: 用于 SNMP v3 的认证密钥。
  required: false
  type: string
  default: no key
auth_protocol:
  description: 用于 SNMP v3 的认证协议。
  required: false
  type: string
  default: 'none'
priv_key:
  description: 用于 SNMP v3 的隐私密钥。
  required: false
  type: string
  default: no key
priv_protocol:
  description: 用于 SNMP v3 的隐私协议。
  required: false
  type: string
  default: 'none'
version:
  description: 要使用的 SNMP 版本，可为 `1`、`2c` 或 `3`。
  required: false
  type: string
  default: '1'
payload_on:
  description: 哪个返回值表示开关处于 `On` 状态。如果未设置 `command_payload_on`，写入时也会使用相同值来打开开关。
  required: false
  type: string
  default: '1'
payload_off:
  description: 哪个返回值表示开关处于 `Off` 状态。如果未设置 `command_payload_off`，写入时也会使用相同值来关闭开关。
  required: false
  type: string
  default: '0'
command_payload_on:
  description: 若与 `payload_on` 不同，用于打开开关时写入的值。
  required: false
  type: string
command_payload_off:
  description: 若与 `payload_off` 不同，用于关闭开关时写入的值。
  required: false
  type: string
vartype:
  description: `payload_on` 和 `payload_off` 命令的 SNMP 变量类型，定义见 [RFC1902](https://tools.ietf.org/html/rfc1902.html)。
  required: false
  type: string  
  default: 'none'
```

你应咨询设备厂商，以确认正确的 OID 以及用于开启和关闭开关的值。

`auth_protocol` 的有效值：

- **none**
- **hmac-md5**
- **hmac-sha**
- **hmac128-sha224**
- **hmac192-sha256**
- **hmac256-sha384**
- **hmac384-sha512**

`priv_protocol` 的有效值：

- **none**
- **des**
- **3des-ede**
- **aes-cfb-128**
- **aes-cfb-192**
- **aes-cfb-256**

`vartype` 的有效值：

- **Counter32**
- **Counter64**
- **Gauge32**
- **Integer32**
- **Integer**
- **IpAddress**
- **ObjectIdentifier**
- **OctetString**
- **Opaque**
- **TimeTicks**
- **Unsigned32**

完整示例：

```yaml
switch:
  - platform: snmp
    name: SNMP v1 开关
    host: 192.168.0.2
    community: private
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
    payload_on: 1
    payload_off: 0

  - platform: snmp
    name: SNMP v3 开关
    host: 192.168.0.3
    version: "3"
    username: "myusername"
    auth_key: "myauthkey"
    auth_protocol: "hmac-sha"
    priv_key: "myprivkey"
    priv_protocol: "aes-cfb-128"
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
    payload_on: 1
    payload_off: 0

  - platform: snmp
    name: 使用 SNMP v3 启用 NETGEAR 交换机 2 号端口的 PoE
    host: 192.168.0.4
    version: "3"
    username: "myusername"
    auth_key: "myauthkey"
    auth_protocol: "hmac-sha"
    priv_key: "myprivkey"
    priv_protocol: "des"
    baseoid: 1.3.6.1.4.1.4526.11.15.1.1.1.1.1.2
    payload_on: 15400
    payload_off: 3000
    vartype: Gauge32
```
