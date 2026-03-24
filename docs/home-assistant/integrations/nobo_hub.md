---
title: Nobø Ecohub
description: "有关如何将 Nobø Ecohub 集成到 Home Assistant 的说明。"

ha_category:
  - Climate
ha_release: '2022.10'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@echoromeo'
  - '@oyvindwe'
ha_domain: nobo_hub
ha_platforms:
  - climate
  - select
  - sensor
ha_integration_type: hub
---
集成 [Nobø Ecohub](https://www.glendimplex.no/produkter/varmestyring/11123610/noboe-hub/c-77/p-330)
进入家庭助理。此集成并未得到 Glen Dimplex Nordic AS 的正式支持或认可，
作者/维护者不是 Glen Dimplex Nordic AS 的官方合作伙伴。

要配置集成，您需要集线器序列号的最后 3 位数字。序列号位于
在轮毂背面。如果集线器位于与 Home Assistant 不同的网络（即 IoT VLAN 或 Home Assistant 的其他可路由网络）上，您还需要提供集线器的 IP 地址。

## Configuration

To add the **Nobø Ecohub** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nobo_hub)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nobo_hub).
- From the list, select **Nobø Ecohub**.
- Follow the instructions on screen to complete the setup.

</details>

# Heaters

每个包含地板或壁挂式加热器的区域都表示为 HVAC 实体。添加和删除区域
加热器必须使用 Nobø Energy 移动应用程序来完成。

## Operation modes

目前，您可以查看和更改区域的操作和预设，并设置生态/舒适温度（如果您有）
支持远程控制温度设置的恒温器。

可能的操作模式如下：

- “自动” - 在此模式下，该区域处于默认设置，预设显示该区域当前所处的状态
  （根据日历设置）。
- “加热” - 在此模式下，区域被覆盖并处于预设选择的状态（“离开”、“环保”）
  或“舒适”）。

可以通过以下方式利用：

- 将预设更改为“离开”、“环保”或“舒适”将自动将操作模式更改为“加热”。
- 将预设更改为无将自动将操作更改为“自动”并更新预设。
- 将操作更改为“自动”将自动更新预设。
- 将操作更改为“加热”会将预设设置为“舒适”。

### Preset override duration

默认情况下，所有覆盖（当操作不处于“自动”模式时）都是恒定的。这是可以改变的
让覆盖在下周配置文件发生变化时结束（与 Nobø Energy 移动应用程序中的“现在”持续时间相同）
在集成配置中。

### Week profiles

周配置文件是从中心检索的。可以更改区域的当前周配置文件
使用选择器。周概况必须使用 Nobø Energy 移动应用程序创建和编辑。

### No preset "Off"

Nobø 加热器不支持预设“关闭”。这不是集成的限制，而是集成中的安全机制
Nobø 系统（可能与北欧地区霜冻导致的管道冻结有关）。 
“离开”温度固定为 7°C 并且无法更改。当防区处于“离开”状态时，开/关接收器将关闭。

要完全关闭加热器，请按照以下步骤操作（这是一个解决方案）： 
1. 在 Nobø Energy 移动应用程序中，创建一周档案。
    - 在此配置文件中，将所有日期设置为关闭。 
2. 要关闭某个区域，请为该区域选择本周配置文件。 
3. 要再次打开某个区域，请切换到该区域的正常周配置文件。

有关更多信息，请参阅 [Nobø Ecohub 手册](https://help.nobo.no/en/user-manual/before-you-start/what-is-a-weekly-program/)。

## Global override

要将所有区域覆盖为给定预设（配置为不遵循全局覆盖的区域除外），请使用全局
覆盖选择器。全局覆盖持续时间遵循与预设覆盖持续时间相同的配置。

# Nobø Switch

每个 Nobø 开关 (SW4) 均表示为温度传感器。如果开关连接到一个区域，则温度为
也可用作 HVAC 实体的当前温度。