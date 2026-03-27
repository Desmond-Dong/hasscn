---
title: LCN
description: 'Home Assistant 的 LCN 集成可让您连接到 LCN(https://www.lcn.eu/) 硬件设备。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Hub
  - Light
  - Scene
  - Sensor
  - Switch
ha_release: 0.85
ha_iot_class: Local Polling
ha_codeowners:
  - '@alengwenus'
ha_domain: lcn
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - scene
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: hub
ha_quality_scale: silver
---
# LCN

Home Assistant 的 **LCN** 集成可让您连接到 [LCN](https://www.lcn.eu/) 硬件设备。

## 前提条件

- 该集成需要一份未使用的 LCN-PCHK（版本 >2.8）耦合软件许可证，以及一个 LCN 硬件耦合器。
- 或者，您也可以使用提供至少两个 PCHK 许可证的 LCN-VISU 或 LCN-PKE 耦合器。

在这样的设置下，便可以向 LCN 模块发送命令，并接收来自 LCN 模块的命令。

`lcn` 集成支持连接多个硬件耦合器。对于每个耦合器，都需要创建一个新的集成条目。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

要设置该集成，您需要提供以下信息：

```yaml
Name:
  description: "用于标识该集成条目的名称"
IP address:
  description: "PCHK 服务器的 IP 地址或主机名"
Port:
  description: "PCHK 服务器使用的端口"
Username:
  description: "用于在 PCHK 服务器上授权的用户名"
Password:
  description: "用于在 PCHK 服务器上授权的密码"
Segment coupler scan attempts:
  description: "在您的安装中查找段耦合器的尝试次数。如果并非所有段耦合器都能被正确识别，请增大该数值。如果安装中没有段耦合器，请将其保持为 0。"
Dimming mode:
  description: "所有 LCN 模块输出调光时使用的步进数。该设置取决于具体系统以及已安装 LCN 模块的能力。"
Request acknowledgement from modules:
  description: "LCN 模块可以为接收到的命令发送确认消息。如果未收到确认，命令会被重新发送。但启用确认会增加总线流量，如果安装中模块很多，可能导致消息丢失。"
```

## 支持的设备类型

目前在 Home Assistant 中支持以下设备类型：

- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Light](#light)
- [Scene](#scene)
- [Sensor](#sensor)
- [Switch](#switch)

:::note
已实现的平台并未覆盖 LCN 系统的全部功能。
因此，`lcn` 集成还提供了多种 [events](#events)、[device triggers](#device-triggers) 和 [actions](#actions)。
它们非常适合用于自动化脚本或 `template` 平台。

:::
## 设置设备和实体

`lcn` 硬件模块和组在 Home Assistant 中表示为 *devices*。每个 `lcn` 模块的外围功能则表示为 Home Assistant 的 *entities*。外围功能例如模块的输出端口、继电器和变量。关于每种外围功能应使用哪种实体，请参阅各个 [platform](#platforms) 的说明。

`lcn` 设备和实体的配置完全通过 Web 用户界面（配置面板）完成。

将集成添加到 Home Assistant 后，您可以在 [LCN integration page](https://my.home-assistant.io/redirect/integration/?domain=lcn) 中，对应的集成条目旁选择 **Configure** 按钮，以打开 `lcn` 配置面板。

![Integration configuration](/home-assistant/images/integrations/lcn/lcn_integration_configuration.png)

## 配置面板

在 LCN 配置面板中，您可以在 Home Assistant 内配置 LCN 模块、组和实体。

![LCN Configuration Panel](/home-assistant/images/integrations/lcn/lcn_device_page.png)

### 配置设备

您可以直接在配置面板中添加或移除模块和组。添加后，它们会在 Home Assistant 中显示为设备，并可在脚本或自动化中触发[特定操作](#actions)。示例请参阅 [Performing actions](/home-assistant/docs/scripts/perform-actions/) 页面。

**Modules / Groups** 选项卡会概览您已配置的 LCN 模块和组，并显示其名称、ID 和 segment ID。LCN 配置面板会尝试从 LCN 模块中读取名称；如果模块没有名称或属于某个组，则会分配一个标准名称。

#### 扫描模块

要开始扫描总线上的 LCN 模块，请在右上角选择三点菜单 `[mdi:dots-vertical]`，然后选择 **Scan Modules**。
- **结果：** 该过程会轮询每个模块的名称和序列号。
- 当所有模块响应都收到后，它们会显示在设备列表中。
- 模块扫描可能需要几秒钟。流程完成后，弹出对话框会自动关闭。

#### 添加设备

如果模块扫描失败，或某个模块在总线上不可用，您可以手动添加它。组也可以手动创建。

1. 若要手动添加模块或组，请选择 **Create Module/Group** 按钮。
2. 选择要添加模块还是组，并输入所需的 `segment id` 以及模块/组 `id`。

    ![Create module/group dialog](/home-assistant/images/integrations/lcn/lcn_create_device.png)
3. 选择 **Create** 以添加新设备。

#### 删除设备

要删除单个设备，请选择其旁边的垃圾桶图标。
- **结果：** 该设备会从设备列表和 Home Assistant 中移除，同时删除其关联的所有实体。

要一次删除多个设备，请启用选择模式，选中所需条目，然后在右上角选择 **Delete Selected**。

### 配置实体

为所有设备配置的实体会列在 **Entities** 选项卡中。

若要查看某个特定设备（模块或组）的实体，请在 **Modules / Groups** 选项卡中选择该设备条目。
  - **结果：** **Entities** 选项卡会打开，并显示所选设备的实体。
  - 如果要应用自定义过滤器，请启用过滤选项。

  ![Create module/group dialog](/home-assistant/images/integrations/lcn/lcn_entities_page.png)

#### 添加实体

1. 若要创建新实体，请选择 **Create Entity**。
2. 在下拉菜单中，选择要为其创建实体的模块或组。
    - 如果已应用单个模块或组过滤器，则会自动预选。

      ![Create entity dialog](/home-assistant/images/integrations/lcn/lcn_create_entity.png)
3. 为该实体选择域（平台）并输入名称。
    - 您稍后可以在 Home Assistant 的实体设置中更改此名称。
4. 根据所选域的不同，还会显示额外选项。输入所需信息后，选择 **Create**，即可将实体添加到列表和 Home Assistant 中。

#### 删除实体

要删除单个实体，请选择其旁边的垃圾桶图标。
- **结果：** 该实体会从列表和 Home Assistant 中移除。

要删除多个实体，请启用选择模式，选中所需条目，然后在右上角选择 **Delete Selected**。

#### 显示实体属性

实体创建后，您可以查看并配置其属性。

在实体列表中选择该实体。
  - 这会打开 Home Assistant 的实体属性对话框，您可以像在通用实体配置面板中一样配置该实体。

## 平台

### Binary sensor

`lcn` binary sensor 平台可用于监控以下 [LCN](https://www.lcn.eu/) 二进制数据源：

- 二进制硬件传感器

binary sensor 可用于自动化脚本，或与 `template` 平台配合使用。

### Climate

`lcn` climate 平台可用于控制 [LCN](https://www.lcn.eu/) 温控器。
该平台依赖模块温控器的正确配置，这部分需要在 LCN-PRO 编程软件中完成。
您至少需要指定当前温度变量，以及用于目标温度的设定点变量。
如果控制被设置为可锁定，则可将温控器打开或关闭。

:::tip
如果您希望将温度调节交给 Home Assistant，建议结合 [Generic Thermostat](/home-assistant/integrations/generic_thermostat/)、[LCN Sensor](#sensor) 和 [LCN Switch](#switch) 使用。

:::
### Cover

`lcn` cover 平台可用于控制已配置为电机控制器的 [LCN](https://www.lcn.eu/) 继电器和输出端口。
请参阅 [motors table](#motors)，了解各电机使用了哪些模块外围资源。

仅适用于固件早于 190C 的模块：<br>
配置中可选择定义反转时间。该时间是电机电流切换时需要等待的时长。
仅当使用模块输出端口来驱动 cover 时，才应在此处定义反转时间。对于其他配置，反转时间需要在 LCN Pro 软件中定义。
反转时间可使用以下常量之一：`RT70` (70ms)、`RT600` (600ms)、`RT1200` (1.2s)。

:::important
如果您使用模块输出端口进行电机控制，请确保已在 LCN Pro 软件中将这些输出端口配置为电机控制器！
否则，输出端口之间不会互锁，存在损坏电机的风险。

:::
### Light

`lcn` light 平台可用于控制以下 [LCN](https://www.lcn.eu/) 端口：

- （可调光）输出端口
- 继电器

### Scene

`lcn` scene 平台可用于激活预先编程的 [LCN](https://www.lcn.eu/) 场景。

### Sensor

`lcn` sensor 平台可用于监控以下 [LCN](https://www.lcn.eu/) 数据源：

- 变量
- 温控器设定点
- 阈值
- S0 输入
- LED 状态
- 逻辑运算状态

sensor 可用于自动化脚本，或与 `template` 平台配合使用。

:::important
请确保 LCN 模块已正确配置，以提供所请求的值。
否则，模块可能出现异常行为或返回错误消息。

:::
### Switch

`lcn` switch 平台可用于控制以下 [LCN](https://www.lcn.eu/) 端口：

- 输出端口
- 继电器
- 温控器锁定状态
- 按键锁定状态

## 附加功能

### 应答器、指纹传感器和密码锁

要使用 LCN 应答器、指纹传感器或密码锁，请确保已在 LCN-PRO 软件中启用并正确配置对应模块的 I 端口属性。
LCN 应答器、指纹和密码锁通过一个六位十六进制代码标识（例如 *123abc*）。
当接收到代码时，会触发对应事件（[transponder event](#event-lcn_transponder)、[fingerprint event](#event-lcn_fingerprint)、[codelock event](#event-lcn_codelock)），可用于触发自动化。
您也可以使用对应的 [device triggers](#device-triggers)。

示例：

此示例展示了如何提取 `event_data`，并使用 Home Assistant 模板引擎在条件中进行判断。
它会在 transponder 事件触发时，确保接收到的代码在给定列表中：


```yaml
automation:
  triggers:
    - trigger: event
      event_type: lcn_transponder
  conditions: "{{ trigger.event.data.code in ['aabbcc', 'ddeeff', '112233'] }}"
  actions:
    ...
```


更多示例请参阅 [event section](#events)。

### 遥控器

要使用 LCN 遥控器（如 LCN-RT 或 LCN-RT16），请确保已在 LCN-PRO 软件中启用对应模块的 I 端口属性，并将其行为正确配置为 "IR access control"。
在此配置下，每个遥控器都由一个六位十六进制代码标识（例如 *123abc*）。
当接收到遥控器命令时，会触发对应事件（[transponder event](#event-lcn_transponder)），可用于触发自动化。同时会传递该代码、被按下的按键及按键动作。
您也可以使用对应的 [device triggers](#device-triggers)。

示例请参阅 [event section](#events)。

### 发送给 PCHK 主机（Home Assistant）的 LCN 命令

LCN 模块不仅可被编程为向其他模块或组发送命令，也可以向 `lcn` 集成中配置的 PCHK 主机发送命令。
这些命令会直接传递给 Home Assistant 并可用于判断。当前仅支持 *send keys*（旧版）命令。

在 LCN-PRO 中，将 *send keys* 命令（仅支持 "A-C former command"）编程到某个按键上。
目标地址请手动填写 PCHK 主机 ID（默认值：4），然后按需选择按键和按键动作。

当收到 *send keys* 命令时，LCN 集成会针对每个已配置按键触发一个 [send keys event](#event-lcn_send_keys)。
这些事件可用于触发自动化。
您也可以使用对应的 [device triggers](#device-triggers)。

示例请参阅 [event section](#events)。

:::note
仅会处理由模块物理按键发出的命令。LCN-PRO 软件中的 "Test command" 按钮不会被处理，因此不能用于测试。

:::
## Events

LCN 系统中有一些功能不会通过集成以常规实体方式暴露，而是以事件形式提供。
例如遥控器（发射器）按键、应答器识别、指纹传感器，以及所谓的 *send keys* 事件。

:::tip
如果您觉得在脚本自动化中处理事件比较困难，也可以使用 [device triggers](#device-triggers)，通过 UI 设计自动化。

:::
所有事件在 `event_data` 中都包含一些通用属性，用于标识发送事件的 LCN 硬件模块（例如连接应答器的模块）：

| 事件负载项 | 说明 | 取值 |
| ---------- | ---- | ---- |
| `device_id`   | LCN 模块在 Home Assistant 中的内部设备 ID | 字符串 |
| `segment_id`  | 模块的段 ID | 5..128 |
| `module_id`   | 模块 ID | 5..254 |

此外，每个事件还有其专属属性，详见下文。
所有专属属性都是可选的，可用作附加筛选条件。

### Event: `lcn_transmitter`

当接收到 LCN 遥控器命令时，会触发 `lcn_transmitter` 事件。

| 专属负载项 | 说明 | 取值 |
| ---------- | ---- | ---- |
| `code` | 发射器代码 | 字符串（6 位十六进制） |
| `level` | 按键级别 | 0..4 |
| `key` | 按键 | 0..4 |
| `action` | 按键动作 | `hit`, `make`, `break` |

示例：

当代码为 *123abc* 的遥控器上任意按键发生 `hit` 动作，且接收硬件连接在 segment 0 的模块 7 上时，该触发器会触发。

```yaml
automation:
  triggers:
    - trigger: event
      event_type: lcn_transmitter
      event_data:
        segment_id: 0
        module_id: 7
        code: 123abc
        action: hit
```

### Event: `lcn_transponder`

当接收到 LCN 应答器命令时，会触发 `lcn_transponder` 事件。

| 专属负载项 | 说明 | 取值 |
| ---------- | ---- | ---- |
| `code` | 应答器代码 | 字符串（6 位十六进制） |

示例：

当任意硬件模块检测到代码为 *123abc* 的应答器时，该触发器会触发。

```yaml
automation:
  triggers:
    - trigger: event
      event_type: lcn_transponder
      event_data:
        code: 123abc
```

### Event: `lcn_fingerprint`

当接收到 LCN 指纹命令时，会触发 `lcn_fingerprint` 事件。

| 专属负载项 | 说明 | 取值 |
| ---------- | ---- | ---- |
| `code` | 指纹代码 | 字符串（6 位十六进制） |

示例：

当任意硬件模块检测到代码为 *123abc* 的指纹时，该触发器会触发。

```yaml
automation:
  triggers:
    - trigger: event
      event_type: lcn_fingerprint
      event_data:
        code: 123abc
```

### Event: `lcn_codelock`

当接收到 LCN 密码锁命令时，会触发 `lcn_codelock` 事件。

| 专属负载项 | 说明 | 取值 |
| ---------- | ---- | ---- |
| `code` | 密码锁代码 | 字符串（6 位十六进制） |

示例：

当任意硬件模块上的代码为 *123abc* 的密码锁被激活时，该触发器会触发。

```yaml
automation:
  triggers:
    - trigger: event
      event_type: lcn_codelock
      event_data:
        code: 123abc
```

### Event: `lcn_send_keys`

当 PCHK 主机收到 *send keys* 命令时，会触发 `lcn_send_keys` 事件。

| 专属负载项 | 说明 | 取值 |
| ---------- | ---- | ---- |
| `key` | LCN 按键 | a1..c8 |
| `action` | 按键动作 | `hit`, `make`, `break` |

示例：

当 PCHK 主机收到一个对按键 `a1` 执行 `hit` 动作的命令时，该触发器会触发。

```yaml
automation:
  triggers:
    - trigger: event
      event_type: lcn_send_keys
      event_data:
        key: a1
        action: hit
```

## Device triggers

为简化在自动化中使用事件，LCN 集成将这些事件作为 device trigger 暴露。
这些 device trigger 可以在 Home Assistant 自动化编辑器中直接选择。

创建新自动化后，先选择 *Device* 作为触发器类型，再在设备列表中选择会产生该事件的模块。
随后可选择触发器类型并配置其属性。若某个属性是可选项，它会作为触发器的附加过滤条件。
各属性的说明请参阅对应的 [events](#events)。

## Actions

若要直接与 LCN 系统交互，或调用未被已实现平台覆盖的命令，可使用以下 actions。
用法示例请参阅 [Performing actions](/home-assistant/docs/scripts/service-calls) 页面。

当 action 与某个特定设备关联时，设备通过其 `device_id` 标识。`device_id` 是 Home Assistant 提供的唯一标识符。

:::tip
在自动化或脚本中获取 LCN 模块 `device_id` 的一种简便方式，是按[这里](/home-assistant/docs/configuration/templating/#devices)所述，在模板中使用 `device_id()` 函数。这样可以根据前端显示的模块名称（或在 LCN-PRO 软件中配置的名称）查到对应 `device_id`。


```yaml
action: lcn.pck
data:
  device_id: "{{ device_id('Module name') }}"
  pck: PIN4
```


:::
### Action: `output_abs`

以百分比设置输出端口的绝对亮度。

| 数据属性         | 可选 | 说明                      | 取值                |
| ---------------- | ---- | ------------------------- | ------------------- |
| `device_id`      | 否   | Home Assistant 设备 ID    ||
| `output`         | 否   | 模块输出端口              | [OUTPUT_PORT](#ports) |
| `brightness`     | 是   | 绝对亮度（百分比）        | 0..100                |
| `transition`     | 是   | 过渡（渐变）时间，单位秒  | 0..486                |

示例：

```yaml
action: lcn.output_abs
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  output: output1
  brightness: 100
  transition: 0
```

### Action: `output_rel`

以百分比设置输出端口的相对亮度。

| 数据属性         | 可选 | 说明                      | 取值                  |
| ---------------- | ---- | ------------------------- | --------------------- |
| `device_id`      | 否   | Home Assistant 设备 ID    ||
| `output`         | 否   | 模块输出端口              | [OUTPUT_PORT](#ports) |
| `brightness`     | 是   | 相对亮度（百分比）        | -100..100             |
| `transition`     | 是   | 过渡（渐变）时间，单位秒  | 0..486                |

示例：

```yaml
action: lcn.output_rel
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  output: output1
  brightness: 30
```

### Action: `output_toggle`

切换输出端口状态。

| 数据属性         | 可选 | 说明                      | 取值                  |
| ---------------- | ---- | ------------------------- | --------------------- |
| `device_id`      | 否   | Home Assistant 设备 ID    ||
| `output`         | 否   | 模块输出端口              | [OUTPUT_PORT](#ports) |
| `transition`     | 是   | 过渡（渐变）时间，单位秒  | 0..486                |

示例：

```yaml
action: lcn.output_toggle
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  output: output1
  transition: 0
```

### Action: `relays`

设置继电器状态。继电器状态由一个 8 字符字符串定义。
每个字符表示一个继电器的状态变化（1=开，0=关，t=切换，-=不变）。

状态示例：`t---001-`

| 数据属性         | 可选 | 说明                   | 取值 |
| ---------------- | ---- | ---------------------- | ---- |
| `device_id`      | 否   | Home Assistant 设备 ID ||
| `state`          | 否   | 继电器状态字符串       ||

示例：

```yaml
action: lcn.relays
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  state: t---001-
```

### Action: `led`

设置 LED 状态。

| 数据属性         | 可选 | 说明                   | 取值               |
| ---------------- | ---- | ---------------------- | ------------------ |
| `device_id`      | 否   | Home Assistant 设备 ID ||
| `state`          | 否   | LED 状态字符串         | [LED_STATE](#states) |

示例：

```yaml
action: lcn.led
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  led: led6
  state: blink
```

### Action: `var_abs`

设置变量或设定点的绝对值。
若未定义 `value`，默认值为 0。
若未定义 `unit_of_measurement`，默认值为 `native`。

| 数据属性               | 可选 | 说明                   | 取值                                                                 |
| ---------------------- | ---- | ---------------------- | -------------------------------------------------------------------- |
| `device_id`            | 否   | Home Assistant 设备 ID ||
| `variable`             | 否   | 变量名称               | [VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units) |
| `value`                | 是   | 变量值                 | _任意正数_                                                           |
| `unit_of_measurement`  | 是   | 变量单位               | [VAR_UNIT](#variables-and-units)                                    |

示例：

```yaml
action: lcn.var_abs
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  variable: var1
  value: 75
  unit_of_measurement: %
```

:::important
请确保 LCN 模块已正确配置，以便访问所定义的变量。
否则模块可能出现异常行为或返回错误消息。

:::
### Action: `var_rel`

设置变量或设定点的相对值。
若未定义 `value`，默认值为 0。
若未定义 `unit_of_measurement`，默认值为 `native`。

| 数据属性               | 可选 | 说明                   | 取值                                                                                                  |
| ---------------------- | ---- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `device_id`            | 否   | Home Assistant 设备 ID ||
| `variable`             | 否   | 变量名称               | [VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units), [THRESHOLD](#variables-and-units) |
| `value`                | 是   | 变量值                 | _任意正数或负数_                                                                                      |
| `unit_of_measurement`  | 是   | 变量单位               | [VAR_UNIT](#variables-and-units)                                                                      |

示例：

```yaml
action: lcn.var_rel
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  variable: var1
  value: 10
  unit_of_measurement: %
```

:::important
请确保 LCN 模块已正确配置，以便访问所定义的变量。
否则模块可能出现异常行为或返回错误消息。

:::
### Action: `var_reset`

重置变量或设定点的值。

| 数据属性         | 可选 | 说明                   | 取值                                                             |
| ---------------- | ---- | ---------------------- | ---------------------------------------------------------------- |
| `device_id`      | 否   | Home Assistant 设备 ID ||
| `variable`       | 否   | 变量名称               | [VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units) |

示例：

```yaml
action: lcn.var_reset
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  variable: var1
```

:::important
请确保 LCN 模块已正确配置，以便访问所定义的变量。
否则模块可能出现异常行为或返回错误消息。

:::
### Action: `lock_regulator`

锁定调节器设定点。
若未定义 `state`，默认值为 `False`。

| 数据属性         | 可选 | 说明                   | 取值                           |
| ---------------- | ---- | ---------------------- | ------------------------------ |
| `device_id`      | 否   | Home Assistant 设备 ID ||
| `setpoint`       | 否   | 设定点名称             | [SETPOINT](#variables-and-units) |
| `state`          | 是   | 锁定状态               | true, false                      |

示例：

```yaml
action: lcn.lock_regulator
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  setpoint: r1varsetpoint
  state: true
```

### Action: `send_keys`

发送按键（会执行已绑定命令）。
`keys` 属性是包含一个或多个按键标识符的字符串。例如：`a1a5d8`
若未定义 `state`，默认值为 `hit`。
该命令支持立即发送或延时发送按键。若为延时发送，必须指定 `time` 和 `time_unit` 属性。延时发送时，仅允许 `hit` 这一按键状态。
若未定义 `time_unit`，默认值为 `seconds`。

| 数据属性         | 可选 | 说明                   | 取值                            |
| ---------------- | ---- | ---------------------- | ------------------------------- |
| `device_id`      | 否   | Home Assistant 设备 ID ||
| `keys`           | 否   | 按键字符串             |
| `state`          | 是   | 按键状态               | [KEY_STATE](#states)              |
| `time`           | 是   | 延时时间               | 0..                               |
| `time_unit`      | 是   | 时间单位               | [TIME_UNIT](#variables-and-units) |

示例：

立即发送按键：
```yaml
action: lcn.send_keys
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  keys: a1a5d8
  state: hit
```

延时发送按键：
```yaml
action: lcn.send_keys
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  keys: a1a5d8
  time: 5
  time_unit: s
```

### Action: `lock_keys`

锁定按键。
若未定义 `table`，默认使用表 `a`。
按键锁定状态由一个 8 字符字符串定义。每个字符表示一个按键锁的状态变化（1=开，0=关，t=切换，-=不变）。
该命令支持按指定时长锁定按键。若要按时长锁定，必须指定 `time` 和 `time_unit` 属性。按时长锁定时，仅允许表 `a`。
若未定义 `time_unit`，默认值为 `seconds`。

| 数据属性         | 可选 | 说明                   | 取值                            |
| ---------------- | ---- | ---------------------- | ------------------------------- |
| `device_id`      | 否   | Home Assistant 设备 ID ||
| `table`          | 是   | 要锁定按键所在的表     ||
| `state`          | 否   | 按键锁定状态字符串     | [KEY_STATE](#states)              |
| `time`           | 是   | 锁定时长               | 0..                               |
| `time_unit`      | 是   | 时间单位               | [TIME_UNIT](#variables-and-units) |

示例：

永久锁定按键：
```yaml
action: lcn.lock_keys
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  table: a
  state: 1---t0--
```

按指定时长锁定按键：
```yaml
action: lcn.lock_keys
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  state: 1---t0--
  time: 10
  time_unit: s
```

### Action: `dyn_text`

向 LCN-GTxD 显示器发送动态文本。
显示器支持 4 行文本消息。
每一行可独立设置，最多可存储 60 个字符（UTF-8 编码）。

| 数据属性         | 可选 | 说明                          | 取值 |
| ---------------- | ---- | ----------------------------- | ---- |
| `device_id`      | 否   | Home Assistant 设备 ID        ||
| `row`            | 否   | 文本行号（1-4）               ||
| `text`           | 否   | 发送到指定行的文本            ||

示例：

```yaml
action: lcn.dyn_text
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  row: 1
  text: "text in row 1"
```

### Action: `pck`

发送任意 PCK 命令。`pck` 字符串中只需填写 PCK 命令本体部分。

| 数据属性         | 可选 | 说明                   | 取值 |
| ---------------- | ---- | ---------------------- | ---- |
| `device_id`      | 否   | Home Assistant 设备 ID ||
| `pck`            | 否   | PCK 命令               ||

示例：

```yaml
action: lcn.pck
data:
  device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
  pck: PIN4
```

## LCN constants

[actions](#actions) 使用若干预定义常量作为参数。

### Ports

| Constant       | Values                                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| OUTPUT_PORT    | `output1`, `output2`, `output3`, `output4`                                                                     |

### Motors

电机取值用于指定使用哪组硬件继电器或输出端口配置：

|  Motor   | Relay on/off | Relay up/down |
| :------: | :----------: | :-----------: |
| `motor1` |   `relay1`   |   `relay2`    |
| `motor2` |   `relay3`   |   `relay4`    |
| `motor3` |   `relay5`   |   `relay6`    |
| `motor4` |   `relay7`   |   `relay8`    |

|   Motor   | Output up | Output down |
| :-------: | :-------: | :---------: |
| `outputs` | `output1` |  `output2`  |

### Variables and units

| Constant     | Values                                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VARIABLE     | `var1`, `var2`, `var3`, `var4`, `var5`, `var6`, `var7`, `var8`, `var9`, `var10`, `var11`, `var12`, `tvar`, `r1var`, `r2var`                                                     |
| SETPOINT     | `r1varsetpoint`, `r2varsetpoint`                                                                                                                                                |
| THRESHOLD    | `thrs1`, `thrs2`, `thrs3`, `thrs4`, `thrs5`, `thrs2_1`, `thrs2_2`, `thrs2_3`, `thrs2_4`, `thrs3_1`, `thrs3_2`, `thrs3_3`, `thrs3_4`, `thrs4_1`, `thrs4_2`, `thrs4_3`, `thrs4_4` |
| VAR_UNIT     | `native`, `°C`, `°K`, `°F`, `lux_t`, `lux_i`, `m/s`, `%`, `ppm`, `volt`, `ampere`, `degree`                                                                                     |
| TIME_UNIT    | `seconds`, `minutes`, `hours`, `days`                                                                                                                                           |

### States

| Constant      | Values                             |
| ------------- | ---------------------------------- |
| LED_STATE     | `on`, `off`, `blink`, `flicker`    |
| KEY_STATE     | `hit`, `make`, `break`, `dontsend` |

### Keys

凡是需要提供按键的地方，都使用由表标识符（`a`、`b`、`c`、`d`）与对应按键编号拼接而成的字符串。
示例：`a1`、`a5`、`d8`。

## Removing the integration

该集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

:::warning
移除该集成会删除所有通过 UI 面板完成的设备与实体配置。


:::
