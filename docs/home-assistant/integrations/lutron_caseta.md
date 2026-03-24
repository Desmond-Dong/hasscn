---
title: Lutron Caséta
description: 关于如何在 Home Assistant 中使用 Lutron Caseta 设备的说明。
featured: true
ha_category:
  - Binary sensor
  - Button
  - Cover
  - Fan
  - Hub
  - Light
  - Scene
  - Switch
ha_release: 0.41
ha_iot_class: Local Push
ha_domain: lutron_caseta
ha_config_flow: true
ha_codeowners:
  - '@swails'
  - '@danaues'
  - '@eclair4151'
ha_zeroconf: true
ha_homekit: true
ha_platforms:
  - binary_sensor
  - button
  - cover
  - diagnostics
  - fan
  - light
  - scene
  - switch
ha_integration_type: hub
---

[Lutron](https://www.lutron.com/) 是一家美国照明控制公司。其提供多条家庭自动化产品线，可管理开关、调光器、占用传感器、暖通控制等设备。Home Assistant 中的 `lutron_caseta` 集成用于与 Lutron Caseta Smart Bridge 通信，以接入 [Caseta](https://www.casetawireless.com/) 产品线中的调光器、开关、窗帘和传感器。它也可与 Lutron Radio RA2 Main Repeater 通信，以接入 [RA2 Select](https://www.lutron.com/controls/systems/ra2select) 产品线中的调光器、开关、窗帘和传感器。

此集成支持 [Caséta](https://www.casetawireless.com/)、[RA2 Select](https://www.lutron.com/controls/systems/ra2select)、[RadioRA 3](https://radiora3.lutron.com/) 和 [Homeworks QSX](https://residential.lutron.com/homeworks) **（不支持 QS）** 产品线。

支持的网桥：

- Lutron Caséta Smart Hub (L-BDG2-WH)
- Lutron Caséta Smart Bridge PRO (L-BDGPRO2-WH)
- RA2 Select Main Repeaters (RR-SEL-REP2-BL)
- QSX Processor (HQP7)
- RadioRA 3 All-in-One Processor (RR-PROC3)
 
如需使用 RadioRA 2 和 HomeWorks QS 产品线，请参阅 [Lutron 集成](/home-assistant/integrations/lutron/)。

当前支持的设备：

- 墙壁和插接式调光器，作为[灯光](#light)
- 墙壁开关，作为[开关](#switch)
- 场景，作为[场景](#scene)
- Lutron 窗帘，作为[cover](#cover)
- Lutron 智能[风扇](#fan)转速控制
- Lutron 占用/空置[传感器](#sensor)
- Pico 遥控器，作为[设备触发器](/home-assistant/integrations/device_automation/)
- Shade 遥控器，作为[设备触发器](/home-assistant/integrations/device_automation/)

配置完成后，Lutron Caséta 集成会自动发现已在 Lutron Smart Bridge 中设置、且受支持的设备。Lutron 手机应用中的设备命名会用于生成 Home Assistant 中的 `entity_id`。例如，在名为 “Bedroom” 的房间中，名为 “Lamp” 的调光器会对应为 `light.bedroom_lamp`。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 手动配置 Hub

要在你的安装中使用 Lutron Caseta 设备，你需要先登录 Lutron 账户并生成证书，以允许 Home Assistant 连接到网桥。可按照[此处步骤](https://github.com/gurumitts/pylutron-caseta/tree/master#getting-started)操作，执行后会生成三个文件：`caseta.key`、`caseta.crt`、`caseta-bridge.crt`。

如果你已拥有 `caseta.key`、`caseta.crt`、`caseta-bridge.crt`，且无法在现场按下网桥按钮，也可以使用这些现有文件完成配对。

拿到这三个必要文件后，将它们放入配置目录，并在 `configuration.yaml` 中添加以下内容：

```yaml
# configuration.yaml 示例
lutron_caseta:
  - host: IP_ADDRESS
    keyfile: caseta.key
    certfile: caseta.crt
    ca_certs: caseta-bridge.crt
```

:::note
你可以通过多个配置块来配置多个 hub，但每个 hub 都需要单独生成并指定自己的 `keyfile`、`certfile` 和 `ca_certs`。

:::
```yaml
  host:
    required: true
    description: Lutron Smart Bridge 的 IP 地址。
    type: string
  keyfile:
    required: true
    description: Home Assistant 用于向网桥认证的私钥。
    type: string
  certfile:
    required: true
    description: Home Assistant 用于向网桥认证的证书链。
    type: string
  ca_certs:
    required: true
    description: Home Assistant 连接网桥时预期的证书颁发机构列表（通常只有一个）。
    type: string
```

:::tip
建议为 Lutron Smart Bridge 分配静态 IP 地址。这样可避免其 IP 变化，防止网桥重启后因地址变化而需要修改 `host`。
<br>
你可以在路由器中设置 DHCP 保留地址，或在 Smart Bridge PRO 型号中通过手机应用的 Advanced / Integration 菜单下 Network Settings 设置 IP 地址。

:::
要让 Lutron Caseta 卷帘、蜂巢帘、木百叶、灯光、场景和开关在 Home Assistant 中正常工作，请先完成上文通用 Lutron Caseta 集成步骤。

## Cover

设置后，窗帘会以基于 Lutron 手机应用名称的 `entity_id` 出现在 Home Assistant 中。例如，名为 “Living Room Window” 的窗帘会显示为 `cover.living_room_window`。

有关在 Home Assistant 中使用窗帘的更多信息，请参阅 [Covers 集成](/home-assistant/integrations/cover/)。

可用动作：`cover.open_cover`、`cover.close_cover`、`cover.stop_cover` 和 `cover.set_cover_position`。`position` 范围为 `0`（完全关闭）到 `100`（完全打开）。

仅支持倾角控制的木百叶可用动作：`cover.open_cover_tilt`、`cover.close_cover_tilt`、`cover.stop_cover_tilt`、`cover.toggle_tilt`。`position` 为 `0` 或 `100` 表示完全关闭，为 `50` 表示完全打开。

## Light

设置后，可调光灯（包括墙壁和插接式调光器）会以基于 Lutron 手机应用名称的 `entity_id` 出现在 Home Assistant 中。例如，名为 “Bedroom Lamp” 的灯会显示为 `light.bedroom_lamp`。

对于不可调光灯或开关负载，请参阅本页的 switch 部分。

有关在 Home Assistant 中使用灯光的更多信息，请参阅 [Lights 集成](/home-assistant/integrations/light/)。

## Scene

Lutron Caseta 场景平台可让你控制在 Lutron 手机应用中创建的 Smart Bridge 场景。

设置后，场景会以基于 Lutron 手机应用名称的 `entity_id` 出现在 Home Assistant 中。例如，名为 “Entertain” 的场景会显示为 `scene.entertain`。

有关在 Home Assistant 中使用场景的更多信息，请参阅 [Scenes 集成](/home-assistant/integrations/scene/)。

RA3 和 QSX 型号不直接支持场景，但可使用 button 平台（见下文）来触发这些系统中的场景。

## Switch

设置后，开关会以基于 Lutron 手机应用名称的 `entity_id` 出现在 Home Assistant 中。例如，名为 “Master Bathroom Vanity” 的灯开关会显示为 `switch.master_bathroom_vanity`。

对于可调光灯（包括墙壁和插接式调光器），请参阅本页的 light 部分。

有关在 Home Assistant 中使用开关的更多信息，请参阅 [Switches 集成](/home-assistant/integrations/switch/)。

## Fan

设置后，风扇会以基于 Lutron 手机应用名称的 `entity_id` 出现在 Home Assistant 中。例如，名为 “Master Bedroom Ceiling Fan” 的设备会显示为 `fan.master_bedroom_ceiling_fan`。

有关在 Home Assistant 中使用风扇的更多信息，请参阅 [Fans 集成](/home-assistant/integrations/fan/)。

在受支持的网桥上，会在 smart bridge 下创建名为 Smart Away 的 switch 实体。该开关用于启用或关闭 Smart Away。

## Sensor

你可以向 Lutron Caseta 系统添加占用传感器，在区域变为空置以及（可选）占用时触发事件。不过，Lutron 系统仅以 *occupancy groups*（即一个或多个传感器组成的分组）形式上报占用/空置状态。

occupancy group 会以 `entity_id` 出现在 Home Assistant 中，命名基于该组第一个传感器所在区域。例如，Master Bathroom 中一个或多个传感器会显示为 `binary_sensor.master_bathroom_occupancy`。

当分组内任一传感器处于 “occupied” 状态时，该 occupancy group 即视为占用。具体来说，这表示该传感器在其超时设置内检测到过运动。只有当分组内所有传感器都报告空置时，该 occupancy group 才会报告为空置。

Lutron Caseta 占用传感器支持 4 种超时和 3 档灵敏度，但这些参数只能在设备本体上设置，无法通过 Home Assistant 或 Caseta 手机应用修改。

由于 Lutron Caseta 设备会自动向 Home Assistant 上报状态（而非依赖轮询），占用状态更新几乎是实时的。

有关在 Home Assistant 中使用二进制传感器的更多信息，请参阅 [Binary Sensors 集成](/home-assistant/integrations/binary_sensor/)

## Button

系统中每个 Keypad 按键和 Pico Remote 按键都会创建对应的 button 实体。
Radio RA3 和 HomeWorks QSX 系统可使用这些 button 实体来触发 Lutron 系统内定义的场景。

有关在 Home Assistant 中使用按钮的更多信息，请参阅 [Buttons 集成](/home-assistant/integrations/button/)。

## Pico 和 Shade 遥控器

Smart Bridge（L-BDG2-WH）、Smart Bridge PRO（L-BDGPRO2-WH）和 RA2 Select（RR-SEL-REP2-BL）型号支持 Pico 和 Shade 遥控器。

通过监听 `lutron_caseta_button_event` 事件，可为遥控器上每个按键的 `press` 和 `release` 实现设备触发器，事件格式如下：


```json
{
    "serial": 28786608,
    "type": "FourGroupRemote",
    "button_number": 4,
    "device_name": "Shade Remote",
    "area_name": "Upstairs Hall",
    "action": "press"
}
```


