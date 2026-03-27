---
title: Denon AVR Network Receivers
description: 'Denon AVR Network Receivers 集成允许您从 Home Assistant 控制 Denon 网络接收器(https://www.denon.com/category/heos)。您的设备可能受 Denon 平台支持。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: 0.7.2
ha_domain: denonavr
ha_codeowners:
  - '@ol-iver'
  - '@starkillerOG'
ha_config_flow: true
ha_ssdp: true
ha_platforms:
  - media_player
ha_integration_type: device
---
# Denon AVR Network Receivers

**Denon AVR Network Receivers** 集成允许您从 Home Assistant 控制 [Denon 网络接收器](https://www.denon.com/category/heos)。您的设备可能受 [Denon] 平台支持。

已知支持的设备：

- Denon AVR-X1000
- Denon AVR-X1100W
- Denon AVR-X1200W
- Denon AVR-X1300W
- Denon AVR-X1400H
- Denon AVR-X1500H
- Denon AVR-X1600H
- Denon AVR-X1700H
- Denon AVR-X1800H
- Denon AVR-X2000
- Denon AVR-X2100W
- Denon AVR-X2200W
- Denon AVR-X2300W
- Denon AVR-X2400H
- Denon AVR-X2500H
- Denon AVR-X2600H
- Denon AVR-X2700H
- Denon AVR-X2800H
- Denon AVC-X2850H
- Denon AVR-X3000
- Denon AVR-X3200W
- Denon AVR-X3300W
- Denon AVR-X3400H
- Denon AVR-X3500H
- Denon AVR-X3600H
- Denon AVR-X3700H
- Denon AVR-X3800H
- Denon AVC-X3800H
- Denon AVR-X4100W
- Denon AVR-X4300H
- Denon AVR-X4400H
- Denon AVR-X4500H
- Denon AVR-X4700H
- Denon AVC-X4800H
- Denon AVR-X6500H
- Denon AVR-X6700H
- Denon AVR-X7200W
- Denon AVR-X8500H
- Denon AVR-1713
- Denon AVR-1912
- Denon AVR-2112CI
- Denon AVR-2312CI
- Denon AVR-3311CI
- Denon AVR-3312
- Denon AVR-3313CI
- Denon AVR-4810
- Denon AVR-E300
- Denon AVR-E400
- Denon AVR-S650H
- Denon AVC-S660H
- Denon AVR-S710W
- Denon AVR-S720W
- Denon AVR-S740H
- Denon AVR-S750H
- Denon AVR-S760H
- Denon AVR-S770H
- Denon AVR-S940H
- Denon AVR-S950H
- Denon AVR-S960H
- Denon AVR-S970H
- Denon DN-500AV
- Denon DRA-N5
- Denon DRA-800H
- Marantz AV 20
- Marantz AV7702
- Marantz AV7703
- Marantz AV7704
- Marantz AV8802A
- Marantz AV8805
- Marantz CINEMA 50
- Marantz CINEMA 60
- Marantz CINEMA 70s
- Marantz M-CR510
- Marantz M-CR511
- Marantz M-CR603
- Marantz M-CR610
- Marantz M-CR611
- Marantz SR5006
- Marantz SR5008
- Marantz SR5010
- Marantz SR5011
- Marantz SR5015
- Marantz SR6007 - SR6012
- Marantz SR7007
- Marantz SR7010
- Marantz SR7012
- Marantz SR8015
- Marantz NR1504
- Marantz NR1506
- Marantz NR1509
- Marantz NR1510
- Marantz NR1602
- Marantz NR1603
- Marantz NR1604
- Marantz NR1606
- Marantz NR1607
- Marantz NR1609
- Marantz NR1710
- Marantz NR1711
- 其他 Denon AVR 接收器（未测试）
- Marantz 接收器（实验性）

如果您的型号不在列表中，请测试一下，如果一切正常，请通过单击页面底部的 **编辑** 链接将其添加到列表中。

如果您使用 VLAN，Home Assistant 需要访问 AVR 上的以下端口：23、8080 和 60006（均为 TCP）。

:::warning
如果有其他设备使用您的 Denon AVR 3808CI 的 IP 控制器，例如您的 URC 控制器，它将无法工作！某些型号存在 bug 或安全问题，只有一个设备可以控制 IP 功能。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
host:
  description: 设备的 IP 地址，例如 192.168.1.32。如果未设置，则使用自动发现。
show_all_sources:
  description: 如果为 True，则即使接收器中标记为已删除，所有源也会显示在源列表中。如果为 False，则不显示已删除的源。某些接收器有一个 bug，会将所有源标记为已删除。在这种情况下，此选项可能有帮助。
zone2:
  description: 指定是否应激活区域 2。区域显示为额外的媒体播放器，具有与设备主区域相同的功能。
zone3:
  description: 指定是否应激活区域 3。区域显示为额外的媒体播放器，具有与设备主区域相同的功能。某些接收器不支持第二区域。
update_audyssey:
  description: 指定是否应更新 Audyssey 设置。对于某些接收器，这可能需要长达 10 秒。
use_telnet:
  description: 指定是否应使用 telnet 连接来接收设备状态更新。使用 telnet 可为许多值提供实时更新（本地推送），但每个接收器仅限于单个连接。如果启用此设置，则无法通过 telnet 建立到设备的其他连接。对于集成的新安装，此设置将为 true，但对于现有安装将为 false，以防止兼容性问题。
```

几点说明：

- 对于控制具有内置 Web 服务器的 Denon AVR 接收器，另一个选项是使用带有 `denonavr` 平台的 HTTP 接口。
- `denonavr` 平台支持一些额外功能，如专辑封面、自定义输入源名称和自动发现。
- Marantz 接收器似乎有相当相似的接口。因此，如果您拥有一个，请尝试一下。
- 要使用 Home Assistant 远程开启 Marantz 接收器，必须在接收器设置中启用自动待机功能。
- 声音模式：设置特定声音模式的命令与接收器报告的当前声音模式值（sound_mode_raw）不同。有一个键值结构（sound_mode_dict）将原始声音模式匹配到设置声音模式的可能命令之一（例如 {'MUSIC':['PLII MUSIC']}。如果您收到"无法匹配声音模式"警告，请在 [denonavr 库](https://github.com/ol-iver/denonavr)上提交问题，说明无法匹配的原始声音模式，以便将其添加到匹配字典中。您可以在 [**设置** > **开发者工具** > **状态**](https://my.home-assistant.io/redirect/developer_states/) 下找到当前原始声音模式。

#### 动作 `denonavr.get_command`

Denon AVR 接收器支持简单的基于文本的网络接口，用于通过网络向接收器发送命令。您可以通过 `denonavr.get_command` 动作访问此接口。此外，还可以向此接口发送红外遥控代码。

各种 Denon AVR 接收器支持的网络命令列表可以[在这里找到](https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf)。红外代码列表可以[在这里找到](https://assets.denon.com/DocumentMaster/UK/AVR3313_IR_CODE_V01.pdf)。

要使用这些命令，调用 `denonavr.get_command` 动作并将特定命令附加到路径 `/goform/formiPhoneAppDirect.xml?`：

| 数据属性 | 可选 | 描述                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       否 | 要发送命令的实体名称。例如 `media_player.marantz`|
| `command`              |       否 | 要发送到设备的命令，例如 `/goform/formiPhoneAppDirect.xml?VSMONI2`|

例如，上述命令 `/goform/formiPhoneAppDirect.xml?VSMONI2` 将把 HDMI 切换到输出 2（如果您的接收器支持）。发送红外代码的方式相同，因此命令 `/goform/formiPhoneAppDirect.xml?RCKSK0410370` 将切换静音。

:::tip
denonavr 平台支持标准媒体播放器控制，如 `turn_on` 和 `volume_up`。因此，调用 `media_player.turn_on` 动作等效于使用命令 `/goform/formiPhoneAppDirect.xml?PWON` 调用 `denonavr.get_command`。有关更多详细信息，请参阅 [media_player](/home-assistant/integrations/media_player/)。


:::
#### 动作 `denonavr.set_dynamic_eq`

启用或禁用 DynamicEQ 设置。

| 数据属性 | 可选 | 描述                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      是 | 要发送命令的实体名称。例如 `media_player.marantz`|
| `dynamic_eq`           |       否 | True/false 用于启用/禁用。|

#### 动作 `denonavr.update_audyssey`

更新 Audyssey 设置。对于某些接收器，这可能需要长达 10 秒。

| 数据属性 | 可选 | 描述                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      是 | 要发送命令的实体名称。例如 `media_player.marantz`|

[Denon]: /integrations/denon