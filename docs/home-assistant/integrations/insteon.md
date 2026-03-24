---
title: Insteon
description: 关于如何在 Home Assistant 中本地设置 Insteon 调制解调器（PLM 或 Hub）的说明。
ha_category:
  - Binary sensor
  - Cover
  - Fan
  - Hub
  - Light
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: 0.39
ha_domain: insteon
ha_codeowners:
  - '@teharris1'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - switch
ha_integration_type: hub
ha_dhcp: true
---

:::important
Insteon 应用（Director 或 Insteon for Hub）是付费服务，使用 Insteon 云来控制 Insteon Hub。Home Assistant 不要求你使用 Insteon 应用，但如果需要，也可以与该应用配合使用。

:::
此集成可将你的 Insteon 网络接入 Home Assistant。它已经在所有 USB 和串口 PowerLinc Modem（PLM）上完成测试，包括 [2413U]、[2448A7]、[2413S] 和 [2412S] 型号，也已测试可与 [2242] 和 [2245] Hub 配合使用。

_如果你已将设备恢复出厂设置，请参阅[Hub 恢复出厂设置后的恢复方法](#recovering-after-factory-resetting-the-hub)了解后续操作。_


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

<p class='img'>
<img src='/home-assistant/images/integrations/insteon/insteon-products.jpg' alt='支持的 Insteon 调制解调器和 Hub 概览'>
支持的 Insteon 调制解调器和 Hub 概览
</p>

[2413U]: https://www.insteon.com/powerlinc-modem-usb
[2413S]: https://www.insteon.com/support-knowledgebase/get-started-2413s
[2412S]: https://www.insteon.com/powerlinc-modem-serial
[2448A7]: https://www.insteon.com/support-knowledgebase/2014/12/10/usb-wireless-adapter-quick-start-guide
[2245]: https://www.insteon.com/insteon-hub/
[2242]: https://www.insteon.com/support-knowledgebase/2014/9/26/insteon-hub-owners-manual

## 自动发现

首次运行自动发现时，**任何已与调制解调器建立链接的设备**都会被识别。此过程每台设备最多可能需要 60 秒。之后再次启动时，会使用缓存的设备信息，因此速度会快得多。如果某个设备在自动发现期间未被识别，请触发该设备，例如切换一次按钮，以强制设备向调制解调器发送消息。这样设备随后就会被发现。你可能需要多触发几次设备。如果设备仍未被识别，请使用 [Insteon 配置面板](#insteon-configuration-panel) 中的链接说明，将该设备重新链接到调制解调器。

## Insteon configuration panel

<p class='img'>
<img src='/home-assistant/images/integrations/insteon/insteon-panel.png' alt='Insteon 配置面板'>
Insteon 配置面板可用于对 Insteon 设备和 Insteon 场景进行产品特定配置。
</p>

打开 Insteon 配置面板：

1. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)。
2. 选择 **Insteon** 集成。然后选择 **Configure** 以打开 Insteon 配置面板。

Insteon 配置面板提供以下功能：

### Add device

任意两个 Insteon 设备要想互相通信，必须先建立链接。有关设备链接的概览，请参阅 Insteon 的 [understanding linking] 页面。要添加 Insteon 设备：

1. 打开 [Insteon 配置面板](#insteon-configuration-panel)。
2. 选择屏幕右下角的 **Add device** 按钮。
3. 在 **Add device** 对话框中填写以下选项：

- **Device address**：输入设备的 Insteon 地址，例如 `1A.2B.3C`，以远程链接特定设备。并非所有设备都支持远程链接。如果设备不支持远程链接，请按下设备上的 `Set` 按钮，使其进入链接模式。
- **Link multiple**：若要在一次会话中添加多个设备，请选中 **Add multiple** 复选框。

### 管理 Insteon 场景

你可以使用 [Insteon 配置面板](#insteon-configuration-panel)中的 **Scenes** 选项卡创建、修改或删除 Insteon 场景。有关如何触发 Insteon 场景，请参阅下方的[触发 Insteon 场景](#triggering-insteon-scenes)。

### 设备属性

Insteon 设备属性（例如 LED 亮度）可通过 Insteon 配置面板进行管理。若要查看某设备可用的属性，请在 Insteon 配置面板的设备列表中选择该设备。系统会在 **Properties** 选项卡中显示该设备可用属性的列表。不同设备类型具有不同的属性集合，并非所有设备都提供属性。

- **Read device properties**：从设备读取属性。
- **Change device properties**：允许你从属性列表中选择某项属性并编辑其值。此操作不会立即写入设备。
- **Write property changes**：使用 **Write to device** 菜单选项将属性更改保存到设备。
- **Undo changes**：在属性写入设备前撤销更改。
- **Delete device**：从 Home Assistant 中删除 Insteon 设备，并移除调制解调器中对该设备的所有引用。你也可以选择同时移除其他 Insteon 设备中对它的引用。

### 设备 All-Link Database

Insteon All-Link Database（ALDB）包含该设备与 Insteon 网络中其他设备之间的链接列表。你可以通过 Insteon 配置面板管理 All-Link Database。若要查看某个设备的 All-Link Database，请在 Insteon 配置面板的设备列表中选择该设备，然后打开 **All-Link Database** 选项卡。

- **Read the All-Link Database**：使用 **Load from device** 菜单选项读取设备当前的 ALDB 记录。
- **Add a record**：使用 **Create ALDB record** 菜单选项向 All-Link Database 添加记录。此操作不会写入设备。
- **Modify a record**：若要修改现有记录，请选择该记录并在对话框中按需更改。此操作不会写入设备。
- **Add default links**：设备要与调制解调器正常通信，ALDB 中需要存在一组默认记录。使用 **Add default links** 菜单选项可将这些链接添加到设备。此操作**会**写入设备。
- **Write changes to the device**：将新增或修改的记录写入设备。
- **Undo changes**：在 ALDB 记录写入设备前撤销更改。
- **Delete device**：从 Home Assistant 中删除 Insteon 设备，并移除调制解调器中对该设备的所有引用。你也可以选择同时移除其他 Insteon 设备中对它的引用。

:::tip
如果你选择使用 Insteon 应用，建议通过 Insteon 应用来添加设备和场景。Home Assistant 同样会看到这些设备和场景。通过 Home Assistant 添加的设备和场景则不会出现在 Insteon 应用中。

:::
:::warning
编辑设备的 All-Link Database 可能导致设备无响应。如果出现这种情况，只需按照上文的 <a href="#add-device">Add device</a> 说明，将设备重新链接到调制解调器即可。

:::
[understanding linking]: https://www.insteon.com/support-knowledgebase/2015/1/28/understanding-linking

### 实用工具

- **Change the modem connection**：重新配置调制解调器连接信息，例如 USB 端口或 Hub IP 地址。
- **Configure device overrides**：添加或移除设备覆盖。请参阅下方的[设备覆盖](#device-overrides)。
- **Delete device**：使用设备的 Insteon 地址将其从网络中删除。

## Triggering Insteon scenes

通过自动化可以打开或关闭 Insteon 场景。系统提供以下两个动作来支持此功能：

- **insteon.scene_on**
  - **group**：（必填）要触发的 Insteon 场景编号。
- **insteon.scene_off**
  - **group**：（必填）要关闭的 Insteon 场景。

```yaml
automation:
  # Trigger an Insteon scene 25
  - alias: "Turn on scene 25"
    actions:
      - action: insteon.scene_on
        group: 25
```

## 事件与 Mini-Remote

Mini-Remote 设备不会作为 Home Assistant 实体出现，而是会生成事件。可用事件如下：

- **insteon.button_on**
  - **address**：（必填）小写且不带点号的 Insteon 设备地址，例如 `1a2b3c`
  - **button**：（可选）小写按钮 ID。对于 4 键遥控器，取值为 `a` 到 `d`；对于 8 键遥控器，取值为 `a` 到 `h`。单键遥控器不使用此字段。
- **insteon.button_off**
  - **address**：（必填）小写且不带点号的 Insteon 设备地址，例如 `1a2b3c`
  - **button**：（可选）小写按钮 ID。对于 4 键遥控器，取值为 `a` 到 `d`；对于 8 键遥控器，取值为 `a` 到 `h`。单键遥控器不使用此字段。

这样就可以将 mini-remote 配置为自动化触发器。以下示例展示了如何在自动化中使用这些事件：

```yaml
automation:
  # 4 or 8 button remote with button c pressed
  - alias: "Turn a light on"
    triggers:
      - trigger: event
        event_type: insteon.button_on
    event_data:
      address: 1a2b3c
      button: c
    conditions:
      - condition: state
        entity_id: light.some_light
        state: "off"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.some_light

  # single button remote
  - alias: "Turn a light off"
    triggers:
      - trigger: event
        event_type: insteon.button_on
    event_data:
      address: 1a2b3c
    conditions:
      - condition: state
        entity_id: light.some_light
        state: "off"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.some_light
```

## 动作

可用动作如下：

- **insteon.add_all_link**：将 Insteon Modem（IM）置于 All-Linking 模式。IM 可设置为控制器或响应器。如果 IM 是控制器，请先让 IM 进入链接模式，然后按下设备上的 SET 按钮。如果 IM 是响应器，请先按设备上的 SET 按钮，再让 IM 进入链接模式。
- **insteon.delete_all_link**：通知 Insteon Modem（IM）从 IM 和设备的 All-Link Database 中移除一条 All-Link 记录。当 IM 已设置为删除链接后，按下对应设备上的 SET 按钮即可完成流程。
- **insteon.load_all_link_database**：加载某个设备的 All-Link Database。警告：加载设备的 All-Link Database 可能需要很长时间，并且可能需要重复执行才能获取所有记录。
- **insteon.print_all_link_database**：打印某个设备的 All-Link Database。要求先完成 All-Link Database 的加载。
- **insteon.print_im_all_link_database**：打印 Insteon Modem（IM）的 All-Link Database。
- **insteon.add_default_links**：在调制解调器与设备之间添加一组默认链接，以便二者能够正常通信。

## Device overrides

:::warning
设备覆盖并不是用来向 Insteon 集成中添加设备的。只有当某个设备已正确链接到 Insteon Modem，但没有出现在 Home Assistant 中时，才需要使用它。

:::
**device override** 功能主要有两个用途：

- 自动发现期间没有响应的设备。这在电池供电设备上很常见。在使用设备覆盖之前，请先触发设备几次，它很可能会被 Home Assistant 发现。
- 尚未获得完整支持的设备。这样可以将未知设备映射为与另一种设备行为相似的设备。

你可以通过 [Insteon 配置面板](#insteon-configuration-panel)设置设备覆盖。

## Recovering after factory resetting the hub

2022 年 4 月 Insteon 应用停止工作时，许多用户尝试将 Insteon Hub 恢复出厂设置。如果你也是其中之一，可以按照以下步骤将其重新连接到 Home Assistant，并让所有设备恢复工作。

1. 登录 Home Assistant 并添加 Insteon 集成。如果你使用的是 2245-xxx，请选择 Insteon Hub v2；如果使用的是 2242-xxx，请选择 Hub V1。

2. 按照屏幕上的说明添加集成。

    - 你需要 Hub 的 IP 地址，通常可以在路由器中找到。具体方法请参阅你的路由器文档。

    - 如果你使用的是 Hub v2，则需要输入印在 Hub 底部的默认用户名和密码。

3. 使用 [Insteon 配置面板](#insteon-configuration-panel)中的添加设备说明，将设备重新添加到 Hub。

当设备重新链接到 Hub 后，它们会自动出现在 Home Assistant 中。
