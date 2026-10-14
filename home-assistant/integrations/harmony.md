# Logitech Harmony Hub

**Logitech Harmony Hub** 集成允许您控制 [Harmony Hub 设备](https://support.myharmony.com/hub) 的状态。

支持的设备：

* Harmony Hub
* Harmony Companion
* Harmony Pro
* Harmony Elite
* Harmony Pro 2400

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

**注意：** 根据固件版本，您可能需要启用 XMPP 才能使此集成工作。从您的 Harmony 应用程序，转到：**菜单** > **Harmony 设置** > **添加/编辑设备和活动** > **遥控器和 Hub** > **启用 XMPP**。

配置 Logitech Harmony Hub 后，可以通过 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) > **您的 Logitech Harmony Hub** 在设置中调整默认活动和向设备发送命令之间的间隔时间（秒）。

### 配置文件

启动时，每个设备会在您的 Home Assistant 配置目录中写入一个文件，格式为：`harmony_UNIQUE_ID.conf`。该文件将包含：

* 所有已编程活动名称和 ID 号码的列表
* 所有已编程设备名称和 ID 号码的列表
* 每个已编程设备的所有可用命令列表

每当 Harmony HUB 有新配置时，此文件将被覆盖，无需重启 Home Assistant。

### 动作 `remote.turn_off`

关闭从当前活动开始时打开的所有设备。

| 数据属性 | 可选 | 描述          |
| ---------------------- | -------- | -------------------- |
| `entity_id`            | 否       | 目标实体 ID。 |

### 动作 `remote.turn_on`

启动一个活动。如果未指定活动，将启动 "`configuration.yaml`" 中的默认 `activity`。指定的活动可以是活动名称或写入您的 [Home Assistant 配置目录](/home-assistant/docs/configuration/index.md) 的配置文件中的活动 ID。

| 数据属性 | 可选 | 描述                            |
| ---------------------- | -------- | -------------------------------------- |
| `entity_id`            | 否       | 目标实体 ID。                   |
| `activity`             | 是      | 要启动的活动 ID 或活动名称。 |

#### 示例

在文件 'harmony\_REMOTENAME.conf' 中，您可以找到可用的活动，例如：

```text
{
    "Activities": {
        "-1": "PowerOff",
        "20995306": "Watch TV",
        "20995307": "Play Games",
        "20995308": "Listen Music"
    }
}
```

使用活动名称"Watch TV"，您可以通过自动化执行动作来切换到此活动：

```yaml
actions:
  - action: remote.turn_on
    target:
      entity_id: remote.bed_room_hub
    data:
       activity: "Watch TV"
```

### 动作 `remote.send_command`

向一个设备发送单个命令或一组命令，设备 ID 和可用命令在启动时写入配置文件。您可以选择指定希望重复命令的次数以及重复命令之间的延迟时间。

| 数据属性 | 可选 | 描述                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `entity_id`            | 否       | 目标实体 ID。                                |
| `device`               | 否       | 要发送命令的设备 ID 或设备名称。    |
| `command`              | 否       | 要发送的单个命令或命令列表。     |
| `num_repeats`          | 是      | 重复命令的次数。       |
| `delay_secs`           | 是      | 发送每个命令之间的秒数。 |
| `hold_secs`            | 是      | 遥控器上的按钮在发送释放之前按住的秒数。 |

在文件 'harmony\_REMOTENAME.conf' 中，您可以找到可用的设备和命令，例如：

```text
{
    "Devices": {
        "TV": {
            "commands": [
                "PowerOff",
                "PowerOn"
            ],
            "id": "327297814"
        },
        "Receiver": {
            "commands": [
                "PowerOff",
                "PowerOn",
                "VolumeUp",
                "VolumeDown",
                "Mute"
            ],
            "id": "428297615"
        }
    }
}
```

发送多个按钮按下的典型动作如下所示：

```yaml
action: remote.send_command
target:
  entity_id: remote.tv_room
data:
  command:
    - PowerOn
    - Mute
  device: Receiver
  delay_secs: 0.6
```

或

```yaml
action: remote.send_command
target:
  entity_id: remote.tv_room
data:
  command:
    - PowerOn
    - Mute
  device: 428297615
  delay_secs: 0.6
```

### 动作：更换频道

`harmony.change_channel` 动作向 Harmony Hub 发送更换频道命令。

| 数据属性 | 可选 | 描述                 |
| ---------------------- | -------- | --------------------------- |
| `entity_id`            | 否       | 目标实体 ID。        |
| `channel`              | 否       | 要切换到的频道号 |

更换频道的典型动作如下：

```yaml
action: harmony.change_channel
target:
  entity_id: remote.tv_room
data:
  channel: 200
```

### 动作：同步

`harmony.sync` 动作强制 Harmony 设备与 Harmony 云端之间的同步。

| 数据属性 | 可选 | 描述          |
| ---------------------- | -------- | -------------------- |
| `entity_id`            | 否       | 目标实体 ID。 |

### 示例

模板传感器可用于在前端显示当前活动。

```yaml
template:
  - sensor:
    - name: 'Family Room Harmony Remote'
      state: >
        {{ state_attr('remote.family_room', 'current_activity') }}
    - name: 'Bedroom Harmony Remote'
      state: >
        {{ state_attr('remote.bedroom', 'current_activity') }}
```

下面的示例展示了如何使用 Harmony 遥控器的当前活动控制 `input_boolean` 开关。当遥控器的状态更改并启动 Kodi 活动时，开关将打开，当遥控器的状态更改且当前活动为"PowerOff"时，开关将关闭。

```yaml
automation:
  - alias: "从 harmony hub 启动观看电视"
    triggers:
      - trigger: state
        entity_id: remote.family_room
    conditions:
      - condition: template
        value_template: '{{ trigger.to_state.attributes.current_activity == "Kodi" }}'
    actions:
      - action: input_boolean.turn_on
        target:
          entity_id: input_boolean.notify
  - alias: "从 harmony hub 启动关机"
    triggers:
      - trigger: state
        entity_id: remote.family_room
    conditions:
      - condition: template
        value_template: '{{ trigger.to_state.attributes.current_activity == "PowerOff" }}'
    actions:
      - action: input_boolean.turn_off
        target:
          entity_id: input_boolean.notify
```
