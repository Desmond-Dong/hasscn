# Envisalink

**Envisalink** 集成允许拥有 DSC 或 Honeywell 报警面板的 Home Assistant 用户，将报警系统及其传感器接入 Home Assistant，从而为家庭提供更丰富的信息。Home Assistant 与报警面板之间的连接是通过 Eyez On 生产的一种设备实现的，这个设备被称为 Envisalink。Envisalink evl3 和 evl4 板为报警面板提供 TCP/IP 接口，并模拟一个报警键盘。该板卡还公开了一个基于原始 TCP/IP 的 API，本集成正是构建在该 API 之上。目前最新型号是 Envisalink 4，本集成同时支持 evl3 和 evl4。

有关 evl3 和 evl4 板卡的更多信息，请访问 [eyezon 网站](https://www.eyezon.com/)。

目前，Home Assistant 支持以下设备类型：

* Binary sensor：报告防区状态（可查看[类型/类别](/home-assistant/integrations/binary_sensor/index.md#device-class)列表，以了解防区可能的可视化表示）
* Sensor：模拟连接到报警面板的字母数字键盘
* Alarm control panel：报告分区状态，并可用于布防或撤防系统

这是一个完全基于事件的集成。Envisalink 设备发送的任何事件都会立即反映到 Home Assistant 中。

从 0.29 版本开始，支持 `alarm_trigger` 服务。您可以直接从 Home Assistant 触发基于 Envisalink 的报警。例如，现在可以通过 Home Assistant 自动化将较新的 Z-Wave/Zigbee 传感器整合进传统报警系统中。

`configuration.yaml` 文件中必须存在 `envisalink` 部分，并至少包含以下必需选项。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
envisalink:
  host: <envisalink IP address or hostname>
  panel_type: HONEYWELL or DSC
  user_name: YOUR_USERNAME
  password: YOUR_PASSWORD
  code: "1234"
  port: 4025
  evl_version: 3
  keepalive_interval: 60
  zonedump_interval: 30
  timeout: 10
  panic_type: Police
  zones:
    1:
      name: "Back Door"
      type: "opening"
    2:
      name: "First Floor Motion"
      type: "motion"
  partitions:
    1:
      name: "Home Alarm"
```

```yaml
host:
  description: 家庭网络中 Envisalink 设备的 IP 地址或主机名（host.fqdn.tld）。
  required: true
  type: string
panel_type:
  description: "根据您的报警系统类型设置为 `HONEYWELL` 或 `DSC`。"
  required: true
  type: string
user_name:
  description: 连接设备时用于身份验证的用户名。必须是直接连接该设备的用户名，而不是 EyezOn 账户的用户名。在 Honeywell 报警面板上，用户名和密码相同。
  required: true
  type: string
password:
  description: 连接设备时用于身份验证的密码。必须是直接连接该设备的密码，而不是 EyezOn 账户的密码。EVL3 最多只支持 6 个字符。
  required: true
  type: string
code:
  description: 您报警面板的代码，用于在布防或撤防时验证用户输入。如果未提供该值，集成会在运行时提示用户输入代码。
  required: false
  type: string
port:
  description: 要连接的网络端口。
  required: false
  default: 4025
  type: integer
evl_version:
  description: evl3 填 3，evl4 填 4。
  required: false
  default: 3
  type: integer
keepalive_interval:
  description: 这是一个定期发送到 Envisalink 板卡的心跳信号（单位为秒），用于防止设备重启。DSC 和 Honeywell 系统都需要此设置。
  required: false
  default: 60
  type: integer
zonedump_interval:
  description: 这是 Envisalink 定期导出所有防区状态的时间间隔（单位为秒）。Honeywell 系统需要此设置，因为它们无法正确发送防区关闭事件。DSC 板卡从技术上来说不一定需要此项。
  required: false
  default: 30
  type: integer
timeout:
  description: 与 envisalink 通信时的网络连接超时时间。如果在此时间（秒）内无法建立连接，集成将停止继续尝试连接。
  required: false
  default: 10
  type: integer
panic_type:
  description: "DSC 和 Honeywell 板卡都支持紧急报警。该设置会在 Home Assistant 中调用 `alarm_trigger` 动作时使用，用于决定触发哪种类型的紧急报警。有效值为：Police、Fire、Ambulance。"
  required: false
  default: Police
  type: string
zones:
  description: "Envisalink 板卡无法告知我们哪些防区实际在用，因此每个防区都必须在 Home Assistant 中手动配置。防区编号应与您报警系统中的配置一致，范围必须在 1 到 64 之间。每个防区至少需要提供一个名称。有关防区可视化表示的更多信息，请参阅 [binary sensor](/home-assistant/integrations/binary_sensor/#device-class) 文档。*注意：如果未指定任何 zones，Home Assistant 将不会加载任何 binary_sensor 集成。*"
  required: false
  type: integer
  keys:
    name:
      description: 防区名称
      required: true
      type: string
    type:
      description: 防区类型
      required: false
      default: opening
      type: string
partitions:
  description: 同样，Envisalink 板卡不会告诉我们哪些分区正在使用，因此每个分区都必须配置分区名称。如果未指定 partition 参数，则不会加载任何 alarm_panel 或 sensor 集成。
  required: false
  type: integer
  keys:
    name:
      description: 分区名称
      required: true
      type: string
```

## 动作

Envisalink 支持以下动作，可用于为报警系统编写脚本或创建自动化。

* **alarm\_disarm**：使用提供的用户代码，或配置中指定的代码，对报警系统执行撤防
* **alarm\_arm\_home**：以居家模式布防
* **alarm\_arm\_away**：以离家模式布防
* **alarm\_arm\_night**：以夜间模式布防
* **alarm\_trigger**：在连接到 Envisalink 的报警系统上触发报警。例如，现在可以通过 Home Assistant 自动化将较新的 Z-Wave/Zigbee 传感器整合进传统报警系统中
* **alarm\_keypress**：向报警系统发送最长 6 个字符的字符串。*适用于 DSC 面板，并已确认可用于 Honeywell Vista-20P（又名 First Alert FA-168）*
* **invoke\_custom\_function**：调用自定义 PGM 功能。*仅适用于 DSC 报警系统*

## 属性

防区状态二进制传感器会带有额外属性，用于表示每个防区的更多信息。

| 名称 | 说明 |
| ---- | ---- |
| `last_tripped_time` | 该防区上次被触发的时间 |
| `zone` | 防区编号。可与 `alarm_keypress` 动作结合使用，以发送与该防区相关的命令 |
