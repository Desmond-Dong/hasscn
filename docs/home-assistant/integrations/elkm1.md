---
title: Elk-M1 Control
description: 'Elk-M1 Control 集成让您将 Elk-M1 Gold 和 EZ8 报警面板连接到 Home Assistant。这些先进的家庭安防和自动化控制器提供强大的报警控制面板功能，以及广泛的自动化功能，帮助您管理和保护您的家。 本页属于 Home Assistant 中文文档。'
ha_release: 0.81
ha_category:
  - Alarm
  - Binary sensor
  - Climate
  - Hub
  - Light
  - Scene
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_domain: elkm1
ha_dhcp: true
ha_config_flow: true
ha_codeowners:
  - '@gwww'
  - '@bdraco'
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - climate
  - light
  - scene
  - sensor
  - switch
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Elk-M1 Control

**Elk-M1 Control** 集成让您将 Elk-M1 Gold 和 EZ8 报警面板连接到 Home Assistant。这些先进的家庭安防和自动化控制器提供强大的报警控制面板功能，以及广泛的自动化功能，帮助您管理和保护您的家。

Elk-M1 控制器由 [Elk Products](https://www.elkproducts.com) 制造。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

Home Assistant 目前支持以下设备类型：

- **报警控制面板** - Elk-M1 区域（也称为分区）表示为 `alarm_control_panel` 实体
- **二进制传感器** - 具有 4 种状态（非模拟区域）的 Elk-M1 区域表示为 `binary_sensor` 实体。`Normal` 状态为 `off`，任何其他状态为 `on`
- **气候** - Elk-M1 恒温器表示为 `climate` 实体
- **灯光** - Elk-M1 灯光（X10、Insteon、UPB）表示为 `light` 实体
- **场景** - Elk-M1 任务表示为 `scene` 实体
- **传感器** - Elk-M1 计数器、键盘、面板状态、设置和区域表示为 `sensor` 实体
- **开关** - Elk-M1 输出表示为 `switch` 实体

实现遵循 Elk Products ElkM1 "ASCII Protocol & Interface Specification, Revision 1.84" 文档。该文档可以在互联网上找到。

## 前提条件

在设置 Elk-M1 集成之前，请确保您的系统满足以下要求：

### ElkM1 版本

ElkM1 应运行：

- 版本 4.6.8，或
- 版本 5.2.0 或更高

强制离家布防和留守布防在 5.3.0 或更高版本中可用。

许多功能在较低版本的 ElkM1 上也能工作。有关详细信息，请查看"ElkM1 RS232 Protocol"手册。

### ELK-M1XEP 版本

ELK-M1XEP 是 ElkM1 的以太网控制板。如果以安全模式连接集成，ELK-M1XEP 的版本决定支持哪种安全协议。

- ELK-M1XEP 版本低于 2.0.46 支持 TLS 1.0（在 UI 中使用 `secure`）
- ELK-M1XEP 版本 2.0.46 及以上支持 TLS 1.2（在 UI 中使用 `TLS 1.2`）

:::note
ELK-M1XEP 不支持 TLS 协议版本的自动协商。连接时必须指定正确的 TLS 版本。

:::
## ElkM1 配置和设置

### 必需的全局设置

为了获得最佳功能，请在您的 ElkM1 面板上配置以下全局设置：

#### 全局设置 35 - 传输事件日志

ElkM1 集成跟踪最后一个布防或撤防面板用户的用户编号和名称。`alarm_control_panel` 实体的 `changed_by` 和 `changed_by_id` 属性保存此信息。

:::important
必须启用全局设置 35"传输事件日志"才能使此功能正常工作。

:::
:::note
如果没有启用全局设置 35，在单区域系统中，`changed_by` 和 `changed_by_id` 仅在用户在物理键盘上输入有效代码时更新。

:::
#### 全局设置 36-40 - 特定功能设置

根据您要使用的功能启用这些设置：

| 设置 | 选项名称                      | 描述                                                                                                                                                                                                                        |
| ------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 36      | 传输区域变化            | 如果使用区域则启用。允许 Home Assistant 跟踪区域状态变化。                                                                                                                                                |
| 37      | 传输输出变化          | 如果使用输出则启用。允许 Home Assistant 跟踪输出状态变化。                                                                                                                                            |
| 38      | 传输自动化任务变化 | 如果使用 ElkM1 任务则启用。允许 Home Assistant 跟踪任务状态变化。                                                                                                                                          |
| 39      | 传输灯光变化           | 如果使用 ElkM1 灯光则启用。允许 Home Assistant 跟踪灯光状态变化。                                                                                                                                        |
| 40      | 传输键盘变化          | 启用以跟踪键盘变化和报警状态。按键事件和跟踪布防/撤防/报警状态需要此设置。 |

## 系统故障状态

ElkM1 能够报告一般系统故障状态。这通过 Home Assistant 中面板传感器（通常命名为 `sensor.elkm1`）的 `system_trouble_status` 属性报告。

`system_trouble_status` 属性的格式是活动故障的逗号分隔列表。列表中只有活动的故障状态。
如果故障是针对某个区域的，则 `zone <number>` 会附加到故障名称后面。

例如，如果区域 42 无线传感器与面板失去通信，则 `system_trouble_status` 将是"Lost Transmitter zone 42"。如果另外还有交流电故障，则 `system_trouble_status` 将是字符串"AC Fail, Lost Transmitter zone 42"。

故障状态的完整列表如下：

- AC Fail
- Box Tamper（区域是状态的一部分）
- Fail To Communicate
- EEProm Memory Error
- Low Battery Control
- Transmitter Low Battery（区域是状态的一部分）
- Over Current
- Telephone Fault
- Output 2
- Missing Keypad
- Zone Expander
- Output Expander
- ELKRP Remote Access
- Common Area Not Armed
- Flash Memory Error
- Security Alert（区域是状态的一部分）
- Serial Port Expander
- Lost Transmitter（区域是状态的一部分）
- GE Smoke CleanMe
- Ethernet
- Display Message In Keypad Line 1
- Display Message In Keypad Line 2
- Fire（区域是状态的一部分）


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 手动配置

或者，您可以通过 "`configuration.yaml`" 文件为高级设置配置集成。

两种配置方法都支持**自动配置**，它会自动发现并仅添加在您的 ElkM1 面板上配置了"名称"的元素。例如，如果面板上的计数器 #11 配置了名称"Test counter"，它将出现在 Home Assistant 中。没有名称的元素不会出现，除非禁用自动配置。

```yaml
# 示例 configuration.yaml 条目
elkm1:
  - host: elk://IP_ADDRESS_1
  ...
  - host: elk://IP_ADDRESS_2
    prefix: gh  # 用于客房控制器
```

```yaml
host:
  description: Elk 的连接字符串，格式为 `<method>://<address>[:port]`。`<method>` 是 `elk` 用于非安全连接，`elks` 用于安全 TLS 1.0 连接，`elksv1_2` 用于安全 TLS 1.2 连接，`serial` 用于串口连接。`<address>` 是 IP 地址或域名，或对于 `serial` 是 Elk 连接的串口。可选的 `<port>` 是要连接到 Elk 的端口，默认为 `elk` 使用 2101，`elks` 和 `elksv1_2` 使用 2601。对于 `serial` 方法，_address_ 是 tty 的路径，例如 _/dev/ttyS1_，`[:baud]` 是连接的波特率（Elk 系统默认为 115200 波特，但这可以在 Elk 系统配置期间更改）。有关选择适当安全版本的信息，请参阅上面的 ELK-M1XEP 部分。您可以有多个 host 部分来连接多个控制器。
  required: true
  type: string
username:
  description: 登录 Elk 的用户名。如果使用安全连接方法则需要。
  required: false
  type: string
password:
  description: 登录 Elk 的密码。如果使用安全连接方法则需要。
  required: false
  type: string
prefix:
  description: 用于此控制器创建的所有设备的前缀（如果有）。最多一个 host 可以省略前缀，所有其他必须在 Home Assistant 实例中具有唯一的前缀。
  require: false
  type: string
auto_configure:
  description: 自动配置 `area`、`counter`、`keypad`、`output`、`setting`、`task`、`thermostat`、`plc` 和 `zone`，仅添加 ElkM1 在初始同步时报告的元素。
  required: false
  type: boolean
  default: False
area:
  description: 要包含在 Home Assistant 中的 Elk 区域。
  required: false
  default: 全部包含。
  type: map
  keys:
    enabled:
      description: 启用此配置部分。
      type: boolean
      required: false
      default: true
    include:
      description: 要包含的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是正整数或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 全部包含。
    exclude:
      description: 要排除的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是数字或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 无排除。
counter:
  description: 要包含在 Home Assistant 中的 Elk 计数器。
  required: false
  default: 全部包含。
  type: map
  keys:
    enabled:
      description: 启用此配置部分。
      type: boolean
      required: false
      default: true
    include:
      description: 要包含的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是正整数或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 全部包含。
    exclude:
      description: 要排除的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是数字或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 无排除。
keypad:
  description: 要包含在 Home Assistant 中的 Elk 键盘。
  required: false
  default: 全部包含。
  type: map
  keys:
    enabled:
      description: 启用此配置部分。
      type: boolean
      required: false
      default: true
    include:
      description: 要包含的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是正整数或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 全部包含。
    exclude:
      description: 要排除的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是数字或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 无排除。
output:
  description: 要包含在 Home Assistant 中的 Elk 输出。
  required: false
  default: 全部包含。
  type: map
  keys:
    enabled:
      description: 启用此配置部分。
      type: boolean
      required: false
      default: true
    include:
      description: 要包含的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是正整数或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 全部包含。
    exclude:
      description: 要排除的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是数字或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 无排除。
setting:
  description: 要包含在 Home Assistant 中的 Elk 设置。
  required: false
  default: 全部包含。
  type: map
  keys:
    enabled:
      description: 启用此配置部分。
      type: boolean
      required: false
      default: true
    include:
      description: 要包含的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是正整数或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 全部包含。
    exclude:
      description: 要排除的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是数字或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 无排除。
task:
  description: 要包含在 Home Assistant 中的 Elk 任务。
  required: false
  default: 全部包含。
  type: map
  keys:
    enabled:
      description: 启用此配置部分。
      type: boolean
      required: false
      default: true
    include:
      description: 要包含的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是正整数或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 全部包含。
    exclude:
      description: 要排除的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是数字或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 无排除。
thermostat:
  description: 要包含在 Home Assistant 中的 Elk 恒温器。
  required: false
  default: 全部包含。
  type: map
  keys:
    enabled:
      description: 启用此配置部分。
      type: boolean
      required: false
      default: true
    include:
      description: 要包含的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是正整数或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 全部包含。
    exclude:
      description: 要排除的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是数字或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 无排除。
plc:
  description: 要包含在 Home Assistant 中的 Elk PLC 灯光。
  required: false
  default: 全部包含。
  type: map
  keys:
    enabled:
      description: 启用此配置部分。
      type: boolean
      required: false
      default: true
    include:
      description: 要包含的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是正整数或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 全部包含。
    exclude:
      description: 要排除的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是数字或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 无排除。
zone:
  description: 要包含在 Home Assistant 中的 Elk 区域。
  required: false
  default: 全部包含。
  type: map
  keys:
    enabled:
      description: 启用此配置部分。
      type: boolean
      required: false
      default: true
    include:
      description: 要包含的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是正整数或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 全部包含。
    exclude:
      description: 要排除的列表，格式为 `<value>` 或 `<value>-<value>`，其中 `<value>` 是数字或 X10 房屋代码。有关范围示例，请参阅下面的配置。
      type: list
      required: false
      default: 无排除。
```

上述配置示例：

```yaml
elkm1:
  host: elks://IP_ADDRESS
  username: USERNAME
  password: PASSWORD
  area:
    exclude: [5-8]
  zone:
    exclude: [11-16, 19-192, 199-208]
  plc:
    include: [a1-d16, 192]
    exclude: [b12-d5]
```

使用 `auto_configure` 的配置示例：

```yaml
elkm1:
  host: elks://IP_ADDRESS
  username: USERNAME
  password: PASSWORD
  auto_configure: true
```

在 /dev/ttyUSB0 上以 115200 波特率的串口实例示例：

```yaml
elkm1:
  - host: serial:///dev/ttyUSB0:115200
    # Elk 不知道哪些区域/区域等未使用，所以它可能生成
    # 许多不需要的 Home Assistant 实体。在排除它们时要大方：
    area:
      exclude: [2-8]
    zone:
      exclude: [17-192, 195-208]
    plc:
      enabled: false
    task:
      enabled: false
    counter:
      exclude: [1-64]
    keypad:
      exclude: [3-16]
    setting:
      exclude: [1-20]
    output:
      enabled: false
    thermostat:
      enabled: false
```

## 事件

ElkM1 集成支持以下事件：`elkm1.keypad_key_pressed`。
每当在 ElkM1 键盘上按下按键时，就会生成该事件。
`event_data` 包含以下内容：

- `keypad_id`：报告按键的键盘编号。
- `key_name`：按下的按键名称。
- `key`：按下的按键编号。

## 动作

ElkM1 集成除了报警控制面板、气候、灯光、场景、传感器和开关的标准 Home Assistant 动作外，还提供额外的动作。

### 报警动作

#### 布防模式

- `elkm1.alarm_arm_home_instant` - 以"即时留守"模式布防区域
- `elkm1.alarm_arm_night_instant` - 以"即时夜间"模式布防区域
- `elkm1.alarm_arm_vacation` - 以"度假"模式布防区域

| 数据属性 | 可选 | 描述                                   |
| -------------- | -------- | --------------------------------------------- |
| `entity_id`    | 是      | 要布防的 ElkM1 区域                            |
| `code`         | 否       | 布防系统的报警代码（4 或 6 位） |

#### 区域管理

- `elkm1.alarm_bypass` - 旁路与指定报警面板关联的所有区域
- `elkm1.alarm_clear_bypass` - 清除与指定报警面板关联的所有区域的旁路

| 数据属性 | 可选 | 描述                                           |
| -------------- | -------- | ----------------------------------------------------- |
| `entity_id`    | 是      | 要旁路或清除旁路的 ElkM1 区域                 |
| `code`         | 否       | 旁路报警面板的报警代码（4 或 6 位） |

#### 显示消息

- `elkm1.alarm_display_message` - 在区域的键盘上显示文本

| 数据属性 | 可选 | 描述                                                                      |
| -------------- | -------- | -------------------------------------------------------------------------------- |
| `entity_id`    | 是      | 显示消息的 ElkM1 区域                                         |
| `clear`        | 是      | 0=清除消息，1=用 * 键清除消息，2=显示直到超时；默认 2 |
| `beep`         | 是      | 0=无蜂鸣，1=蜂鸣；默认 0                                                    |
| `timeout`      | 是      | 显示消息的时间，0=永远，最大 65535，默认 0                        |
| `line1`        | 是      | 最多 16 个字符的文本（如果太长则截断）。默认为空白              |
| `line2`        | 是      | 最多 16 个字符的文本（如果太长则截断）。默认为空白              |

### 传感器动作

#### 计数器管理

- `elkm1.sensor_counter_refresh` - 刷新计数器的值
- `elkm1.sensor_counter_set` - 将计数器设置为特定值

:::note
面板在某些条件下不会自动发送计数器值更新。使用刷新动作检索当前计数器值。

:::
| 数据属性 | 必需 | 描述                                 |
| -------------- | -------- | ------------------------------------------- |
| `entity_id`    | 否       | 要刷新或设置的 ElkM1 计数器             |
| `value`        | 是（用于 `sensor_counter_set`） | 将计数器设置为的值（0-65536） |

#### 区域管理

- `elkm1.sensor_zone_bypass` - 旁路一个区域
- `elkm1.sensor_zone_trigger` - 虚拟触发一个区域

| 数据属性 | 必需 | 描述                                     |
| -------------- | -------- | ----------------------------------------------- |
| `entity_id`    | 否       | 要旁路或触发的 ElkM1 区域                |
| `code`         | 是（仅用于旁路） | 报警代码（4 或 6 位）                |

:::note
ElkM1 提供的唯一清除区域旁路的机制是清除给定报警面板（区域）中所有已旁路的区域。

:::
:::note
`sensor_zone_trigger` 动作在区域上创建虚拟瞬时开路条件，就像 EOL 硬连线回路被物理打开一样。

:::
### 系统动作

#### 时间同步

- `elkm1.set_time` - 将面板上的时间设置为与 Home Assistant 当前时间匹配

| 数据属性 | 可选 | 描述                                               |
| -------------- | -------- | --------------------------------------------------------- |
| `prefix`       | 是      | 配置多个面板时用于标识面板的前缀 |

#### 语音播报

- `elkm1.speak_phrase` - 播报预定义短语
- `elkm1.speak_word` - 播报预定义单词

:::note
可用短语和单词的列表在 ElkM1 ASCII 协议文档中定义。

:::
| 数据属性 | 可选 | 描述                                               |
| -------------- | -------- | --------------------------------------------------------- |
| `phrase`       | 否*      | 要播报的短语。*仅 `speak_phrase` 必需       |
| `word`         | 否*      | 要播报的单词。*仅 `speak_word` 必需           |
| `prefix`       | 是      | 配置多个面板时用于标识面板的前缀 |

## 调试

如果您遇到 ElkM1 集成问题，调试日志可以帮助识别问题。有关启用调试日志的详细说明，请参阅[启用调试日志](/home-assistant/docs/configuration/troubleshooting/#enabling-debug-logging)。

或者，您可以在 "`configuration.yaml`" 文件中手动启用调试日志：

1. 将以下内容添加到您的 "`configuration.yaml`" 文件：

   ```yaml
   logger:
     logs:
       elkm1_lib: debug
       homeassistant.components.elkm1: debug
   ```

2. 重启 Home Assistant。
3. 检查 Home Assistant `config` 目录中 `homeassistant.log` 文件中的调试日志。

## 移除集成

此集成遵循标准集成移除流程。不需要额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.