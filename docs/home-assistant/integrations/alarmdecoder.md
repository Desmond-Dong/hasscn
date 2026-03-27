---
title: AlarmDecoder
description: 关于如何使用 AlarmDecoder 设备将 DSC/Honeywell 报警面板集成到 Home Assistant 的说明。
ha_category:
  - Alarm
  - Binary sensor
  - Sensor
ha_release: 0.43
ha_iot_class: Local Push
ha_domain: alarmdecoder
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - sensor
ha_integration_type: device
---
# AlarmDecoder

**AlarmDecoder** integration 允许拥有 DSC 或 Honeywell 报警面板的 Home Assistant 用户利用其报警系统和传感器为 Home Assistant 提供有关其家庭的丰富信息。Home Assistant 与报警面板之间的连接通过 Nu Tech Software Solutions 生产的设备（称为 AlarmDecoder）实现。AlarmDecoder 设备为报警面板提供串行、TCP/IP 套接字或 USB 接口，并在其中模拟报警键盘。

请访问 [AlarmDecoder 网站](https://www.alarmdecoder.com/) 了解有关 AlarmDecoder 设备的更多信息。

目前 Home Assistant 支持以下 device 类型：

- [报警控制面板](#alarm-control-panel)：报告报警状态，可用于布防/撤防系统
- 传感器：模拟键盘显示
- 二值传感器：报告区域状态

这是一个完全基于事件的集成。AlarmDecoder 设备发送的任何 event 都将立即反映在 Home Assistant 中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

系统将提示您选择协议（即 `socket` 或 `serial`）。根据您的选择，系统将要求您提供以下连接信息：

- **socket**：
  - **host** - 连接到报警面板的 AlarmDecoder 设备的主机名或 IP 地址。
  - **port** - AlarmDecoder 可访问的端口（即 `10000`）。
- **serial**：
  - **path** - AlarmDecoder 设备的路径（即 `/dev/ttyUSB0`）。
  - **baud rate** - AlarmDecoder 设备的波特率（即 `115200`）。

## 设置

按照上述说明设置 AlarmDecoder 后，可以通过在 **[设置 > 设备与服务](https://my.home-assistant.io/redirect/integrations/)** 页面上的 _AlarmDecoder_ 卡片上选择 _选项_ 来配置布防设置和区域。

### 布防设置

AlarmDecoder 目前有 3 个布防设置（如下所示）。

- **替代夜间模式** - 对于 Honeywell 系统，设置为 `true` 可在夜间布防时启用 _夜间留守_ 模式而不是 _即时_ 模式。对于 DSC 系统，设置为 `true` 可在夜间布防时启用 _无入口_ 模式而不是 _留守_ 模式。对于这两个系统，当此选项设置为 `true` 时，**无论 _布防需要密码_ 设置如何**，夜间布防都需要密码。有关更多信息，请参阅下面的[布防按键序列](#arming-key-sequences)部分。
- **布防时自动旁路** - （仅限 Honeywell）设置为 `true` 可在布防前发送 `code` + `6#` 自动旁路所有打开的区域。仅当布防时有故障区域时，此设置才需要密码。
- **布防需要密码** - 设置为 `false` 可启用无需密码的布防。有关更多信息，请参阅下面的[布防按键序列](#arming-key-sequences)部分。

### 区域

可以通过选项表单添加、编辑和删除区域。

添加到 AlarmDecoder 的每个 zone 都将创建自己的[二值传感器](https://www.home-assistant.io/integrations/binary_sensor/)。

#### 添加新区域

出现提示时，输入您要添加的 zone 编号。选择 _提交_ 进入下一个屏幕，系统将提示您输入[区域设置](#zone-settings)。再次选择 _提交_ 进行保存。

**注意：** 输入的区域编号将作为属性显示在创建的二值传感器实体上，以便日后轻松编辑区域设置。

#### 编辑现有区域

出现提示时，输入您要编辑的 zone 编号。选择 _提交_ 进入下一个屏幕，现有区域设置将被预填充。编辑区域设置并选择 _提交_ 保存更改。

#### 删除现有区域

出现提示时，输入您要删除的 zone 编号。选择 _提交_ 进入下一个屏幕，现有区域设置将被预填充。清除 _区域名称_ 字段并选择 _提交_。

#### 区域设置

zone 的设置如下所述：

- **区域名称** - 区域的名称
- **区域类型** - 传感器的类型（请参阅[设备类](https://www.home-assistant.io/integrations/binary_sensor/#device-class)）
- **RF 序列号** - （可选）与无线 RF 区域关联的 RF 序列号。提供此字段允许 Home Assistant 将原始传感器数据关联到给定区域，从而可以直接监控状态、电池和监控状态。
- **RF 回路** - （可选）与 RF 区域关联的回路编号（1、2、3 或 4）。提供此字段允许 Home Assistant 从原始传感器数据以及面板显示中读取打开/关闭状态，这意味着它可以正确显示报警布防时被旁路的 RF 区域是打开还是关闭。（这是 RF 区域的 relayaddr/relaychan 的替代方案。）
- **继电器地址** - （可选）与区域关联的继电器或区域扩展板的地址。（例如：12、13、14 或 15）。通常用于面板不会发送旁路区域（如在家布防状态期间的运动）的情况，Vista 20P 就是一个例子。AlarmDecoder 可以模拟区域扩展板，面板可以编程为将区域事件推送到此虚拟扩展器。这允许使用旁路区域二值传感器。一个例子是在夜间使用旁路运动传感器进行基于运动的自动灯光，而系统在运动传感器被旁路的情况下布防。
- **继电器通道** - （可选）与区域关联的继电器或区域扩展板的通道。（例如：继电器扩展板为 1、2、3 或 4，区域扩展板为 1 - 8）

## 报警控制面板

报警面板上有多个属性可为您提供有关报警的更多信息。

- `ac_power`：如果您的系统有交流电源供电，则设置为 `true`。
- `alarm_event_occurred`：如果您的系统最近被触发，则设置为 `true`。当 `alarm_event_occurred` 为 `true` 时，必须通过输入您的密码 + 1（或调用 `alarm_control_panel.alarm_disarm` 动作）来清除它，然后才能尝试布防报警。
- `backlight_on`：如果您的键盘背光亮起，则设置为 `true`。
- `battery_low`：如果您的系统备用电池电量低，则设置为 `true`。
- `check_zone`：如果您的系统检测到区域有问题，则设置为 `true`。
- `chime`：如果您的系统的门铃已激活，则设置为 `true`。激活后，当报警撤防时，每当门或窗发生故障，您的系统都会发出蜂鸣声。
- `entry_delay_off`：如果您的系统处于"即时"模式，则设置为 `true`，这意味着任何故障都会触发报警。
- `programming_mode`：如果您的系统处于编程模式，则设置为 `true`。
- `ready`：如果您的系统准备好布防，则设置为 `true`。任何故障，包括运动传感器，都会使此值为 `false`。
- `zone_bypassed`：如果您的系统当前正在旁路某个区域，则设置为 `true`。
- `code_arm_required`：设置为您的 AlarmDecoder 选项中指定的值。

## 动作

**Alarm Decoder** integration 为您提供多个 actions 来控制您的报警。

- `alarm_arm_away`：在外出模式下布防报警；所有故障都会触发报警。
- `alarm_arm_home`：在留守模式下布防报警；门或窗的故障会触发报警。
- `alarm_arm_night`：根据 `替代夜间模式` 选项布防报警。
- `alarm_disarm`：从任何状态撤防报警。
- `alarmdecoder.alarm_keypress`：向报警发送一串字符，就像您在键盘上触摸了这些键一样。
- `alarmdecoder.alarm_toggle_chime`：切换报警的门铃状态。

:::note
`alarm_arm_custom_bypass` 和 `alarm_trigger` 虽然在 Home Assistant 的动作列表中可用，但目前在 Alarm Decoder 平台上尚未实现。

:::
### 示例

使用可用的 actions 和属性的组合，您可以创建开关模板。

### 门铃状态和控制


```yaml
- platform: template
  switches:
    alarm_chime:
      friendly_name: Chime
      value_template: "{{ is_state_attr('alarm_control_panel.alarm_panel', 'chime', true) }}"
      turn_on:
        - condition: state
          entity_id: alarm_control_panel.alarm_panel
          attribute: chime
          state: False
        - action: alarmdecoder.alarm_toggle_chime
          target:
            entity_id: alarm_control_panel.alarm_panel
          data:
            code: !secret alarm_code
      turn_off:
        - condition: state
          entity_id: alarm_control_panel.alarm_panel
          attribute: chime
          state: True
        - action: alarmdecoder.alarm_toggle_chime
          target:
            entity_id: alarm_control_panel.alarm_panel
          data:
            code: !secret alarm_code
      icon_template: >-
        {% if is_state_attr('alarm_control_panel.alarm_panel', 'chime', true) %}
          mdi:bell-ring
        {% else %}
          mdi:bell-off
        {% endif %}
```


## 布防按键序列

下表显示了不同面板品牌和配置设置组合用于布防的按键序列。它们取自 [adext](https://pypi.org/project/adext/) PyPI 包。

### Honeywell

#### code_arm_required = true（默认）

| 模式                                                    | 按键序列  |
| ------------------------------------------------------- | ------------- |
| `alarm_arm_home`                                        | `code` + `3`  |
| `alarm_arm_away`                                        | `code` + `2`  |
| `alarm_arm_night` (`alt_night_mode` = `false`，默认) | `code` + `7`  |
| `alarm_arm_night` (`alt_night_mode` = `true`)           | `code` + `33` |

#### code_arm_required = false

| 模式                                                    | 按键序列  |
| ------------------------------------------------------- | ------------- |
| `alarm_arm_home`                                        | `#3`          |
| `alarm_arm_away`                                        | `#2`          |
| `alarm_arm_night` (`alt_night_mode` = `false`，默认) | `#7`          |
| `alarm_arm_night` (`alt_night_mode` = `true`)           | `code` + `33` |

### DSC

#### code_arm_required = true（默认）

| 模式                                                    | 按键序列  |
| ------------------------------------------------------- | ------------- |
| `alarm_arm_home`                                        | `code`        |
| `alarm_arm_away`                                        | `code`        |
| `alarm_arm_night` (`alt_night_mode` = `false`，默认) | `code`        |
| `alarm_arm_night` (`alt_night_mode` = `true`)           | `*9` + `code` |

#### code_arm_required = false

:::note
下面的 `chr(4)` 和 `chr(5)` 序列分别等同于按下 <em>留守</em> 和 <em>外出</em> 键盘键（如 <a href='https://www.alarmdecoder.com/wiki/index.php/Protocol#Special_Keys'>AlarmDecoder 文档</a> 中所述）。


:::
| 模式                                                    | 按键序列                   |
| ------------------------------------------------------- | ------------------------------ |
| `alarm_arm_home`                                        | `chr(4)` + `chr(4)` + `chr(4)` |
| `alarm_arm_away`                                        | `chr(5)` + `chr(5)` + `chr(5)` |
| `alarm_arm_night` (`alt_night_mode` = `false`，默认) | `chr(4)` + `chr(4)` + `chr(4)` |
| `alarm_arm_night` (`alt_night_mode` = `true`)           | `*9` + `code`                  |