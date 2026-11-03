# Homematic

[Homematic](https://www.eq-3.com/products/homematic.html) 集成为你的 CCU/Homegear 提供双向通信能力。它通过 XML-RPC 连接向设备写入值，并订阅设备与 CCU 发出的事件。
如果你使用的是 Homegear，且其中配对了 [Intertechno](https://intertechno.at/) 设备，也可以进行单向通信。

目前在 Home Assistant 中支持以下设备类型：

* Binary sensor
* Climate
* Cover
* Light
* Lock
* Notifications
* Sensor
* Switch

大多数有线、无线设备以及许多 IP 设备都已支持。如果你的环境中混用了多种协议，则需要为不同协议配置额外的 [interfaces](/home-assistant/integrations/homematic.md#interfaces) 并指定相应端口。默认端口 `2001` 对应无线设备；有线设备通常使用 `2000`，IP 设备通常使用 `2010`。CCU 提供的虚拟 thermostat groups 使用端口 `9292`，并且**还需要**将 `path` 设为 `/groups`。如果在 CCU3 上启用了 SSL，默认会使用在原端口前加 `4` 的形式，例如 `2001` 会变成 `42001`，`2010` 会变成 `42010`。

:::important
从 CCU Version 3 开始，内部防火墙默认启用。你需要在 CCU 的安全设置中为 `XML-RPC API` 授予完全访问权限，或者填入 Home Assistant 实例的 IP 地址并加入允许列表。

:::
如果你想确认某个具体设备是否受支持，可以前往 [pyhomematic](https://github.com/danielperna84/pyhomematic/tree/master/pyhomematic/devicetypes) 仓库查看源码。设备标识符（例如 `HM-Sec-SC-2`）对应的字典通常位于相关模块靠近底部的位置。如果你的设备尚未支持，欢迎贡献代码。

我们会自动检测当前已支持的所有设备，并尽量生成有意义的名称。如果启用了名称解析，我们会尝试从 Metadata（Homegear）、JSON-RPC 或你在 CCU 上安装的 XML-API 中获取设备名称。由于该过程可能失败，因此默认关闭。
你也可以使用 Home Assistant 的 [Customizing](/home-assistant/docs/configuration/customizing-devices/index.md) 功能手动重命名已创建的实体。Homematic 集成还支持 [Entity Registry](https://developers.home-assistant.io/docs/entity_registry_index/)，可直接在 Home Assistant UI 中修改 friendly name 和 entity ID。

## 配置

要设置此集成，请将以下信息添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
homematic:
  interfaces:
    wireless:
      host: 127.0.0.1
```

配置变量（全局）：

```yaml
interfaces:
  description: Configuration for each XML-RPC interface to integrate into Home Assistant.
  required: true
  type: list
hosts:
  description: Configuration for each Hub (CCU/Homegear) to integrate into Home Assistant.
  required: false
  type: list
local_ip:
  description: IP of device running Home Assistant. Override auto-detected value for exotic network setups.
  required: false
  type: string
  default: 0.0.0.0
local_port:
  description: Port for connection with Home Assistant. By default it is randomly assigned.
  required: false
  type: integer
```

配置变量（interface）：

```yaml
host:
  description: IP address or hostname of CCU/Homegear device or app for Home Assistant.
  required: true
  type: string
port:
  description: "Port of CCU/Homegear XML-RPC Server. Wireless: 2001, wired: 2000, IP: 2010, thermostatgroups: 9292. With enabled SSL on the CCU3 usually a 4 is prepended to the Port. e.g., 2001 becomes 42001 with enabled SSL."
  required: false
  type: integer
ssl:
  default: false
  description: Set to `true` if SSL support is enabled on the CCU3.
  required: false
  type: boolean
verify_ssl:
  default: false
  description: Set to `true` if a valid certificate is being used. The default is `false` as usually a self-signed certificate is configured.
  required: false
  type: boolean
callback_ip:
  description: Set this, if Home Assistant is reachable under a different IP from the CCU (NAT, Docker etc.).
  required: false
  type: string
callback_port:
  description: Set this, if Home Assistant is reachable under a different port from the CCU (NAT, Docker etc.).
  required: false
  type: integer
resolvenames:
  description: Try to fetch device names. Defaults to `false` if not specified.
  required: false
  type: string
  default: false
jsonport:
  description: Port of CCU JSON-RPC Server. The default is 80, but it may be different when running CCU virtually via Docker or with enabled SSL.
  required: false
  type: integer
username:
  description: When fetching names via JSON-RPC, you need to specify a user with guest-access to the CCU. Admin-access is required if you work with variables on the CCU.
  required: false
  type: string
password:
  description: When fetching names via JSON-RPC, you need to specify the password of the user you have configured above.
  required: false
  type: string
path:
  description: Set to `/groups` when using port 9292.
  required: false
  type: string
```

配置变量（host）：

```yaml
host:
  description: IP address of CCU/Homegear device.
  required: true
  type: string
port:
  description: "Port of CCU/Homegear XML-RPC Server. Wireless: 2001, wired: 2000, IP: 2010"
  required: false
  type: integer
username:
  description: When fetching names via JSON-RPC, you need to specify a user with guest-access to the CCU.
  required: false
  type: string
password:
  description: When fetching names via JSON-RPC, you need to specify the password of the user you have configured above.
  required: false
  type: string
```

### 包含多协议及其他选项的配置示例

```yaml
homematic:
  interfaces:
    rf:
      host: 127.0.0.1
      resolvenames: "json"
      username: "Admin"
      password: "secret"
    wired:
      host: 127.0.0.1
      port: 2000
      resolvenames: "json"
      username: "Admin"
      password: "secret"
    ip:
      host: 127.0.0.1
      port: 2010
    groups:
      host: 127.0.0.1
      port: 9292
      resolvenames: "json"
      username: "Admin"
      password: "secret"
      path: /groups
  hosts:
    ccu2:
      host: 127.0.0.1
      port: 2001
      username: "Admin"
      password: "secret"

```

### `resolvenames` 选项

我们提供三种方式来获取设备名称。前提都是你已经在现有 Homematic 环境中为设备设置了合适的名称。通用建议：设备名称尽量使用 ASCII 字符，因为 Home Assistant 不会在实体名称中保留非 ASCII 字符。

1. `json`：CCU 允许通过 JSON-RPC 获取已配对设备的详细信息。要使用此方式，你需要在集成配置中填写有效凭据。仅查询设备名称时，访客权限即可。
2. `xml`：如果你使用的是 CCU，可以安装名为 `XML-API` 的 Home Assistant app。安装后即可通过 XML-RPC 从 CCU 读取各种信息，我们也能借此获取设备名称。该方式不支持认证。相比之下，推荐优先使用 `json` 而非 `xml`。XML-API 支持仅为向后兼容保留，未来版本可能会移除。
3. `metadata`：Homegear 会通过设备内部的 metadata 提供设备名称。使用 HM-CFG-LAN interface 时，你通常会借助配置软件（桌面快捷方式默认名称一般为“HomeMatic-Komponenten konfigurieren”）来配对和配置设备。配对完成后，设备会显示在表格中，最左侧的 `Name` 列会预填默认名称，你可以直接点进去改成任意名字。

名称解析可能需要一点时间。因此刚启动 Home Assistant 时，你可能暂时看不到这些设备。对于拥有 20+ 个设备的环境，UI 中全部显示出来可能需要接近一分钟。

### 多个 host

为了并行连接多个 host 或多种协议（wireless、wired 和 IP），系统会分别建立多条连接，每条连接对应一个已配置目标。你为 host 选择的名称必须唯一，且仅能使用 ASCII 字母。
使用多个 host 的缺点是，下文介绍的 actions 可能不会完全按预期工作。因为 action 只能使用其中一条连接，所以一个 action 能操作的设备/变量会受限于该 host 的作用域/协议。
这*不会*影响 Home Assistant 中的实体；它们各自使用自己的连接，通常都能正常工作。

### 读取实体属性

大多数设备除了状态本身外，还带有额外属性，例如电池状态或阀门位置。你可以在自动化中通过模板读取这些属性，也可以借助 [template sensor](/home-assistant/integrations/template.md) 集成把它们单独暴露成实体。下面是一个将温控器阀门位置暴露为模板传感器的示例。

```yaml
template:
  - sensor:
    - name: "Bedroom valve"
      state: "{{ state_attr('climate.leq123456', 'level') }}"
```

### 变量

你可以读取并设置在 CCU/Homegear 上创建的系统变量。当前支持写入的类型为 float 和 bool。对于 CCU，需要使用具有 Admin 权限的用户。
变量状态会作为 hub 实体（例如 `homematic.ccu2`）的属性提供。你可以像上面那样借助模板，将这些变量用于自动化或转成实体。
系统每 30 秒从 CCU/Homegear 轮询一次变量值；而写入变量则会立即执行并直接下发。

### 事件

当 Homematic 设备的状态或其他内部值发生变化时，CCU/Homegear 会向 Home Assistant 发送事件消息。系统会自动解析这些事件并更新对应实体。你也可以手动使用这些事件来触发自动化。目前提供两种事件类型：

* `homematic.keypress`: For devices with buttons, see information below
* `homematic.impulse`: For impulse sensors

#### 带按钮的设备

带按钮的设备（例如 HM-Sen-MDIR-WM55、遥控器）可能不会在 UI 中完整显示。这是预期行为，因为按钮本身并不作为实体值展示，它们的主要用途就是触发事件。
举例来说：
HM-Sen-MDIR-WM55 运动传感器会显示为 2 个实体：一个运动传感器和一个亮度传感器。此外，它还会提供 2 组（每个按钮一组）共 4 种事件：`PRESS_SHORT`、`PRESS_LONG`、`PRESS_CONT`、`PRESS_LONG_RELEASE`。需要注意的是，并非所有设备都会提供全部这些事件；但通常来说，只要“能按”，至少就会有 `PRESS_SHORT`。

下面是一个在自动化中使用这些事件的示例：

```yaml
automation:
  triggers:
    - trigger: event
      event_type: homematic.keypress
      event_data:
        name: "Kitchen Switch"
        channel: 1
        param: PRESS_SHORT
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.Kitchen_Ambience
```

`channel` 参数应填写你要配置自动化的那个按钮所在通道。可用通道可在你用于配对设备的 UI 中查看。
`name` 是否为友好名称取决于你是否启用了名称解析。如果没有启用，它会是设备 ID（例如 `LEQ1234657`）；如果启用了且解析成功，则会显示为你在 CCU 或 metadata 中设置的名称（例如 `Kitchen Switch`）。

你可以通过查看终端输出来测试按钮是否在 Home Assistant 中正常工作。按下按钮时，应出现类似如下的日志：

```bash
2018-01-27 11:51:32 INFO (Thread-12) [pyhomematic.devicetypes.generic] HMGeneric.event: address=MEQ1234567:6, interface_id=homeassistant-CCU2, key=PRESS_SHORT, value=True
2018-01-27 11:51:32 INFO (MainThread) [homeassistant.core] Bus:Handling <Event homematic.keypress[L]: param=PRESS_SHORT, name=your_nice_name, channel=6>
2018-01-27 11:51:32 INFO (Thread-12) [pyhomematic.devicetypes.generic] HMGeneric.event: address=MEQ1234567:6, interface_id=homeassistant-CCU2, key=INSTALL_TEST, value=True
```

有时 `your_nice_name` 可能无法被正确解析，此时上面示例中的第 2 条消息会缺失。这可能与 HM interface 和 HM 设备之间使用了安全通信有关。你可以在 HM interface 中把通信模式从 `secure` 改为 `standard` 来解决（在 `Einstellungen` - `Geräte` 中找到对应设备，把 `Übertragungsmodus` 从 secure 改为 standard），但对于本就应使用安全通信的设备，不建议这样做。

#### Homematic IP 设备的 `homematic.keypress` 事件

对于部分 Homematic IP 设备（例如 WRC2 / WRC6 墙壁开关、SPDR passage sensor、KRC4 钥匙扣遥控器），如果想收到 `homematic.keypress` 事件，需要先在 CCU 中为每个通道临时创建一个空程序：

1. In the menu of your CCU's admin panel go to `Programs and connections` > `Programs & CCU connection`
2. Go to `New` in the footer menu
3. Click the plus icon below `Condition: If...` and press the button `Device selection`
4. Select one of the device's channels you need (1-2 / 1-6 for WRC2 / WRC6 and 2-3 for SPDR)
5. Select short or long key press
6. Save the program with the `OK` button
7. Trigger the program by pressing the button as configured in step 5. Your device might indicate success via a green LED or similar. When you select the device in `Status and control` > `Devices` on the CCU, the `Last Modified` field should no longer be empty
8. When your channel is working now, you can edit it to select the other channels one by one
9. At the end, you can delete this program from the CCU

### 动作

* *homematic.virtualkey*：在 CCU/Homegear 上模拟一次按键（或其他有效动作），可用于实体按键或虚拟按键。
* *homematic.reconnect*：无需重启 Home Assistant，重新连接到 CCU/Homegear（在 CCU 重启后尤其有用）。
* *homematic.set\_variable\_value*：设置系统变量的值。
* *homematic.set\_device\_value*：手动控制设备（即使该设备尚未被正式支持），等价于 XML-RPC 的 `setValue` 方法。
* *homematic.put\_paramset*：手动修改设备的 `paramset`（即使该设备尚未被正式支持），等价于 XML-RPC 的 `putParamset` 方法。

#### 示例

模拟按下一个按钮：

```yaml
...
actions:
  - action: homematic.virtualkey
    data:
      address: "BidCoS-RF"
      channel: 1
      param: PRESS_LONG
```

打开 KeyMatic：

```yaml
...
actions:
  - action: homematic.virtualkey
    data:
      address: "LEQ1234567"
      channel: 1
      param: OPEN
```

将布尔变量设为 `true`：

```yaml
...
actions:
  - action: homematic.set_variable_value
    target:
      entity_id: homematic.ccu2
    data:
      name: "Variablename"
      value: true
```

#### 进阶示例

如果你熟悉 Homematic 设备的内部机制，可以手动向设备写入值。这在某个设备暂时未被支持，或仅实现了部分功能时，可以作为变通方案。
使用这个 action 相当于直接调用主连接上的 `setValue` 方法。如果你配置了多个 host，可以通过 `proxy` 参数指定目标 host，其值应与配置中该 host 的名称一致。在上面的示例中，`rf`、`wired` 和 `ip` 都是合法取值。

手动打开一个 switch actor：

```yaml
...
actions:
  - action: homematic.set_device_value
    data:
      address: "LEQ1234567"
      channel: 1
      param: STATE
      value: true
```

手动设置温控器温度：

```yaml
...
actions:
  - action: homematic.set_device_value
    data:
      address: "LEQ1234567"
      channel: 4
      param: SET_TEMPERATURE
      value: 23.0
```

手动设置温控器当前 profile：

```yaml
...
actions:
  - action: homematic.set_device_value
    data:
      address: "LEQ1234567"
      channel: 1
      param: ACTIVE_PROFILE
      value: 1
      value_type: int
```

设置墙壁温控器的周程序：

```yaml
...
actions:
  - action: homematic.put_paramset
    data:
      interface: wireless
      address: "LEQ1234567"
      paramset_key: MASTER
      paramset:
        WEEK_PROGRAM_POINTER: 1
```

为墙壁温控器设置带显式 `rx_mode` 的周程序（仅 BidCos-RF）：

```yaml
...
actions:
  - action: homematic.put_paramset
    data:
      interface: wireless
      address: "LEQ1234567"
      paramset_key: MASTER
      rx_mode: WAKEUP
      paramset:
        WEEK_PROGRAM_POINTER: 1
```

BidCos-RF 设备的 `put_paramset` 支持一个可选参数，用来定义配置数据发送到设备的方式。

`rx_mode` 为 `BURST`（默认值）时，提交配置数据会唤醒设备，因此会消耗一定电池电量。它的优点是立即生效，也就是数据几乎会立刻发送出去。

`rx_mode` 为 `WAKEUP` 时，只有在设备向 CCU 上报新值之后才会发送配置数据，通常约每 3 分钟一次。它不会主动唤醒设备，因此更省电。

手动锁定 KeyMatic 设备：

```yaml
...
actions:
  - action: lock.lock
    target:
      entity_id: lock.leq1234567
```

手动解锁 KeyMatic 设备：

```yaml
...
actions:
  - action: lock.unlock
    target:
      entity_id: lock.leq1234567
```

#### 集成 HMIP-DLD

当前 `pyhomematic` 实现中，还没有现成的 HMIP Doorlock（HMIP-DLD）默认集成。
可行的变通方案是在配置中定义一个 template lock：

```yaml
lock:
  - platform: template
    name: Basedoor
    unique_id: basedoor
    value_template: "{{ is_state('sensor.lock_status', 'locked') }}"
    lock:
      action: homematic.set_device_value
      data:
        address: "002A1BE9A792D2"
        channel: 1
        param: LOCK_TARGET_LEVEL
        value: 0
    unlock:
      action: homematic.set_device_value
      data:
        address: "002A1BE9A792D2"
        channel: 1
        param: LOCK_TARGET_LEVEL
        value: 1
```

#### 检测连接丢失

当与 Homematic CCU 或 Homegear 的连接丢失后，Home Assistant 就无法再收到设备更新。例如在 CCU 重启后就可能发生这种情况。由于通信协议本身的限制，这个问题无法自动恢复，因此你需要手动调用 *homematic.reconnect*。也正因如此，通常建议通过自动化去检查 Homematic 集成是否仍在正常更新，以便及时发现连接中断。可以通过以下几种方式实现：

* 如果你有一个确定会频繁更新的传感器（例如室外温度传感器、电压传感器或光照传感器），可以创建一个辅助 binary sensor，并配合如下自动化：

```yaml
template:
  - binary_sensor:
      - name: "Homematic is sending updates"
        state: >-
          {{ (now() - states.sensor.office_voltage.last_changed).seconds < 600 }}

automation:
  - alias: "Homematic Reconnect"
    triggers:
      - trigger: state
        entity_id: binary_sensor.homematic_is_sending_updates
        to: "off"
    actions:
      # Reconnect, if sensor has not been updated for over 10 minutes
      - action: homematic.reconnect
```

这里的关键是 `sensor.time` 实体（来自 time\_date 集成）。它会在传感器变化时以及每分钟触发一次 binary sensor 重新计算。如果 Homematic 传感器不再发送更新，`sensor.time` 会在最后一次更新 10 分钟后把 binary sensor 置为 `off`，从而触发该自动化。

* 如果你使用的是 CCU，也可以在 CCU 上创建一个系统变量，用来存储其最近一次重启时间。由于 Home Assistant 即使在 CCU 重启后仍能刷新系统变量，所以这也是触发 *homematic.reconnect* 的一种办法。不过尽管这种方式看起来不依赖传感器，很多人会更喜欢，**但它其实不如检测传感器更新可靠**。因为这个变量只会在开机时变化，若 Home Assistant 与 CCU 之间的连接断开却没有引发重启（例如网络故障），这种方式就无法检测到。实现步骤如下：

  1. Create a string variable **V\_Last\_Reboot** on the CCU

  2. Create a new program on the CCU **without any conditions**, which executes the following *HM-Script* with a delay of 30 seconds. The script needs to be implemented within the section `Activity: Then`.

     ```javascript
     var obj = dom.GetObject("V_Last_Reboot");
     string now = system.Date("%d.%m.%Y %H:%M:%S");
     obj.State(now);
     ```

     The Homematic CCU will execute all active programs which meet their conditions (none in this case) on every reboot.

  3. Set up a template sensor in Home Assistant, which contains the value of the system variable:

     ```yaml
     template:
       - sensor:
         - name: "v last reboot"
           state: "{{ state_attr('homematic.ccu2', 'V_Last_Reboot') or '01.01.1970 00:00:00' }}"
           icon: "mdi:clock"
     ```

  4. Set up an automation which calls *homematic.reconnect* whenever the sensor variable changes:

     ```yaml
     automation:
       - alias: "Homematic CCU Reboot"
         triggers:
           - trigger: state
             entity_id: sensor.v_last_reboot
         actions:
           - action: homematic.reconnect
     ```

## 通知

`homematic` 通知平台可用于调用 Homematic 设备。

要在你的安装中使用此通知平台，请将以下内容添加到 `configuration.yaml` 文件中：

### 配置

```yaml
# Example configuration.yaml entry
notify:
  - name: my_hm
    platform: homematic
    address: "NEQXXXXXXX"
    channel: 2
    param: "SUBMIT"
    value: "1,1,108000,8"
```

```yaml
address:
  description: The address of your Homematic device. The address is the serial number of the device shown in the CCU in the `devices` section in the column `serial number`.
  required: true
  type: string
channel:
  description: The channel of your Homematic device.
  required: true
  type: integer
param:
  description: An additional parameter for the Homematic device.
  required: true
  type: string
interface:
  description: Set the name of the interface from the configuration.
  required: false
  type: string
value:
  description: This is the value that is set on the device. It's device specific.
  required: true
  type: string
```

### 用法

`homematic` 是一个 notify 平台，可以按[这里](/home-assistant/integrations/notify/index.md)描述的方式通过 notify action 调用。

只有事件负载中的 `data` 部分会被处理。该部分可以指定或覆盖配置变量中的取值：

```json
{
  "data": {
    "address": "NEQXXXXXXX",
    "channel": 2,
    "param": "SUBMIT",
    "value": "1,1,108000,8"
  }
}
```

也可以通过模板动态计算 `value`：

```json
{
  "data": {
    "value": "1,1,108000{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},1{% endif %}{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},2{% endif %}"
  }
}
```

你也可以通过 group notification 来指定事件负载（而不是直接在 notify 自身上填写 `value`）：

```yaml
notify:
  - name: my_hm
    platform: homematic
    address: NEQXXXXXXX
  - name: group_hm
    platform: group
    services:
      - action: my_hm
        data:
          data:
            value: "1,1,108000{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},1{% endif %}{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},2{% endif %}"

alert:
  temperature:
    name: Temperature too high
    done_message: Temperature OK
    entity_id: binary_sensor.temperature_too_high
    can_acknowledge: true
    notifiers:
      - group_hm
```

请注意，第一个 `data` 元素属于 `my_hm` action，而第二个 `data` 元素属于事件负载本身。
