---
title: Motionblinds
description: 关于如何将 Coulisse B.V. 的 Motionblinds 集成到 Home Assistant 的说明。

ha_category:
  - Cover
ha_iot_class: Local Push
ha_release: 2020.12
ha_domain: motion_blinds
ha_codeowners:
  - '@starkillerOG'
ha_config_flow: true
ha_platforms:
  - button
  - cover
  - sensor
ha_dhcp: true
ha_integration_type: hub
---

**Motionblinds** 集成允许你控制来自 [Coulisse B.V.](https://coulisse.com/) 的 [Motionblinds](https://motionblinds.com/)。

另外，以下品牌也被报告可与此集成配合使用：

- [Acomax](https://www.acomax.de/)
- [AMP Motorization](https://www.ampmotorization.com/)
- [Bliss Automation - Alta Window Fashions](https://www.altawindowfashions.com/product/automation/bliss-automation/)
- [Bloc Blinds](https://www.blocblinds.com/)
- [Brel Home](https://www.brel-home.nl/)
- [3 Day Blinds](https://www.3dayblinds.com/)
- [Decorquip Dream](https://www.decorquip.com/post.php?dream)
- [Diaz](https://www.diaz.be/)
- [Dooya](http://www.dooya.com/)
- [Gaviota](https://www.gaviotagroup.com/en/)
- Havana Shade
- [Heicko](https://heicko.de/en/tubular-motors/controls/e-smart-home/usb-smart-home-stick-bi-direktional-1-st.html)
- [Hurrican Shutters Wholesale](https://www.hurricaneshutterswholesale.com/)
- [Inspired Shades](https://www.inspired-shades.com/)
- [iSmartWindow](https://www.autoblinds.co.nz/)
- [Kaiser Nienhaus](https://www.kaiser-nienhaus.de/)
- [Krispol](https://krispol.eu/en/drives/)
- [Linx](https://linxautomation.com.au/)
- [Madeco](https://www.madeco.fr/)
- [Martec](https://www.martec.co.nz/)
- [Motionblinds](https://motionblinds.com/)
- [Raven Rock MFG](https://www.ravenrockmfg.com/)
- [ScreenAway](https://www.screenaway.com.au/)
- [Smart Rollo (SIRO)](https://smart-rollos.de/)
- [Smartblinds](https://www.smartblinds.nl/)
- [Smart Home](https://www.smart-home.hu)
- [Ublockout](https://www.ublockout.com/)
- [Uprise Smart Shades](https://upriseshades.com/)

此集成既支持直接控制支持 Wi-Fi 连接的窗帘，也支持控制通过 433MHz Wi-Fi 网桥连接的单向和双向窗帘。
以下网桥已被报告可与此集成配合使用：

- CM-20 Motionblinds bridge
- CMD-01 Motionblinds mini-bridge
- DD7002B Connector bridge
- D1554 Connector mini-bridge
- DD7002B Brel-Home box
- D1554 Brel Home USB plug
- Brel HUB-03
- Acomax FX-I 620 Bridge Maxi
- Linx Hub
- Linx Hub Mini
- Linx Hub USB
- SIRO Connect SI7002
- SIRO Connect SI7005
- Heicko Smart Stick 1ST
- DD7006A Smart Home bridge
- Dreamhub Pro 191726
- Dreamhub mini 191717
- Kaiser Nienhaus Smart Stick


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 获取 API 密钥

设置 Home Assistant 集成所需的 16 位 API 密钥，需要先将窗帘或网桥连接到其品牌的官方应用。
在该应用中，通常可以通过在“About”页面的特定位置连续点击多次来找到该密钥。

### Motionblinds app

Motionblinds API 使用一个 16 位字符的密钥，你可以在官方 “Motionblinds” 应用中获取，支持 [IOS](https://apps.apple.com/app/id1437234324) 和 [Android](https://play.google.com/store/apps/details?id=com.coulisse.motion)。

打开应用，选择右上角的 3 个点，进入 “settings”，再进入 “Motion APP About”。请在这个 “Motion APP About” 页面上快速点击 5 次，会弹出一个窗口显示密钥。

请注意，在将密钥提供给 Home Assistant 时，必须包含 `-` 字符。密钥格式应类似于 `12ab345c-d67e-8f`

<p class='img'>
<img src='/home-assistant/images/integrations/motion_blinds/Motion_App__get_key_1.jpg' />
<img src='/home-assistant/images/integrations/motion_blinds/Motion_App__get_key_2.jpg' />
</p>

### Brel Home app

在 iOS 版 Brel Home 应用中，进入 `me` 页面（主页第 4 个标签），在页面底部对“version x.x.x(xxxx)”这段灰色信息连续多次点击，就会弹出显示密钥的窗口。
在 Android 版 Brel Home 应用中，进入 `me` 页面（主页第 4 个标签），在照片位置的右侧点击 5 次，就会弹出显示密钥的窗口。

### Bloc Blinds app

在官方 Bloc Blinds 应用中，进入 settings（三条横线 > 齿轮图标），进入 `About` 页面，在中间的 bloc blinds 图标上点击 5 次，就会弹出显示密钥的窗口。

### 3 Day Blinds app

在 3 Day Blinds 应用中，进入主页，再进入 settings（左上角三条横线 > 齿轮图标），从底部选择 `About`，然后在屏幕中央的 3 Day Blinds 图标上快速点击 5 次，就会弹出显示密钥的窗口。

### Blindsgalore AMP app

在 Blindsgalore AMP 应用中，进入主页，再进入 settings（左上角三条横线），选择你的个人头像，从底部选择 `About`，然后在屏幕中央的 AMP 图标上快速点击 5 次，就会弹出显示密钥的窗口。

### Connector app

 要获取 API 密钥（[iOS app](https://apps.apple.com/app/id1344058317)、[Android app](https://play.google.com/store/apps/details?id=com.smarthome.app.connector)），请按以下步骤操作：
 
  1. 在应用左侧边栏中，打开 **Settings** `[mdi:gear-outline]`（齿轮图标）。
  2. 选择 Connector 应用的 **About** 页面。
  3. 在 **About** 页面中点击屏幕 5 次。
      - 这会打开一个显示 API 密钥的窗口。

## 收藏位置

**Go to favorite position** 按钮实体允许你将窗帘移动到收藏位置。要显示此实体，你首先需要在移动应用中，或者通过遥控器或窗帘上的实体按键，为窗帘设置收藏位置。具体说明请参考对应窗帘的说明书。

**Set current position as favorite** 按钮实体允许你修改收藏位置。要让它生效，必须先通过短按窗帘上的重置按钮，让窗帘进入编程模式。此时窗帘会开始小幅上下移动。然后你就可以使用 **Set current position as favorite** 实体。完成后，再次短按重置按钮以退出编程模式。

## Top Down Bottom Up（TDBU）窗帘

TDBU 窗帘由上下两根横杆组成，由两个电机分别控制，名称为 Top 和 Bottom，中间夹着布料。
Top 和 Bottom 可以彼此独立移动，从而覆盖窗户的不同部分。
控制这两根横杆时，会创建三个不同的实体：Top、Bottom 和 Combined。

### Top 实体

- `Up/Open` 会将 Top 横杆移动到窗户顶部（绝对位置 100）
- `Down/Close` 会将 Top 横杆移动到 Bottom 横杆的位置，也就是让被遮挡的窗户区域尽可能小，但此时两根横杆都会位于 Bottom 横杆的位置（而不是窗户顶部）。当两根横杆完全重合后，Top 横杆将不再接受新的 `Down` 命令。此时必须先把 Top 横杆向上移动，即使 Bottom 横杆已经继续向下移动了
- `Position` 是 Top 横杆可移动范围内的相对位置，也就是从窗户顶部（100）到 Bottom 横杆所在位置（0）。因此，如果 Bottom 横杆移动了，这个位置值也会变化，因为 Top 横杆可活动的空间发生了变化
- `Absolute position` 是 Top 横杆相对于窗户本身的位置，也就是 0 = 窗户底部，100 = 窗户顶部。请注意，由于 Bottom 横杆的限制，并非所有绝对位置在任意时刻都可到达
- `Width` 是被布料覆盖的窗户百分比（即 Top 与 Bottom 横杆之间的区域）

### Bottom 实体

- `Up/Open` 会将 Bottom 横杆移动到 Top 横杆的位置。当两根横杆完全重合后，Bottom 横杆将不再接受新的 `Up` 命令。此时必须先把 Bottom 横杆向下移动，即使 Top 横杆已经继续向上移动了
- `Down/Close` 会将 Top 横杆移动到窗户底部（绝对位置 0）
- `Position` 是 Bottom 横杆可移动范围内的相对位置，也就是从 Top 横杆的位置（100）到窗户底部（0）。因此，如果 Top 横杆移动了，这个位置值也会变化，因为 Bottom 横杆可活动的空间发生了变化
- `Absolute position` 是 Bottom 横杆相对于窗户本身的位置，也就是 0 = 窗户底部，100 = 窗户顶部。请注意，由于 Top 横杆的限制，并非所有绝对位置在任意时刻都可到达
- `Width` 是被布料覆盖的窗户百分比（即 Top 与 Bottom 横杆之间的区域）

### Combined 实体

- `Up/Open` 会将 Top 和 Bottom 两根横杆都移动到窗户顶部，从而使窗户被遮挡的面积尽可能小（Width 将为 0%）
- `Down/Close` 会将 Top 横杆移到窗户顶部，并将 Bottom 横杆移到窗户底部，从而使整个窗户都被遮挡（Width 将为 100%）
- `Position` 是 Bottom 和 Top 横杆中心点的相对位置，这个中心点可以在不改变遮挡宽度的情况下移动，因此 Top 横杆可以到达窗户顶部，Bottom 横杆可以到达窗户底部
- `Absolute position` 是 Bottom 和 Top 横杆中心点相对于窗户本身的位置，也就是 0 = 窗户底部，100 = 窗户顶部。请注意，由于宽度限制，并非所有绝对位置在任意时刻都可到达
- `Width` 是被布料覆盖的窗户百分比（即 Top 与 Bottom 横杆之间的区域）

### TDBU 注意事项

由于 Home Assistant 默认使用相对位置，因此场景功能无法正确用于 TDBU 窗帘（取决于当前 Top 和 Bottom 的位置，同样的某个位置值，比如 70，可能对应窗户上的不同实际位置）。

因此，建议你对 TDBU Combined 实体使用脚本或自动化，并调用 `motion_blinds.set_absolute_position`，同时指定 `absolute_position` 和 `width`。

这样可以确保最终达到相对于窗户的同一绝对位置，同时避免让 Bottom 或 Top 横杆移动到不允许的绝对位置。

如果对 `motion_blinds.set_absolute_position` 使用的数值会让 Bottom 或 Top 横杆发生碰撞，那么不会执行任何动作。系统会记录错误日志，说明该位置不被允许，TDBU 窗帘也不会移动。

因此，在 Home Assistant 中对 TDBU 窗帘使用任何这些操作始终都是安全的。

## 操作 `motion_blinds.set_absolute_position`

对于普通窗帘，`motion_blinds.set_absolute_position` 与 `cover.set_cover_position` 操作作用相同。

### TDBU 窗帘

对于 TDBU 窗帘，`motion_blinds.set_absolute_position` 会设置相对于窗户本身的绝对位置。
而 `cover.set_cover_position` 设置的是 TDBU 窗帘在可移动空间中的缩放相对位置。

### 支持倾斜的窗帘

对于支持倾斜的窗帘，你可以指定新的位置和倾斜角度，窗帘会先移动到新位置，再调整倾斜角度。如果先执行普通的 `cover.set_cover_position`，紧接着又执行 `cover.set_cover_tilt_position`，窗帘会停止移动，并在到达目标位置前开始调整倾斜角度。

| Data attribute | Optional | Description                                                                                       |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | 要控制的 Motionblinds 卷帘实体名称。例如 `cover.TopDownBottomUp-Bottom-0001` |
| `absolute_position`    | no       | 要移动到的绝对位置。例如 70                                                      |
| `tilt_position`        | yes      | 要移动到的倾斜位置。例如 50                                                          |
| `width`                | yes      | 可选指定遮挡宽度，仅适用于 TDBU Combined 实体。例如 30     |

## 故障排除

### 网关覆盖范围

如果网关距离窗帘太远，有时窗帘虽然会响应来自网关的命令，但网关无法接收来自窗帘的消息。在这种情况下，窗帘的位置将无法被正确上报（无论是在 Home Assistant 中，还是在窗帘的移动应用中）。这对于 Top Down Bottom Up（TDBU）窗帘尤其容易引发问题，因为 TDBU 在执行请求位置前，会检查顶部电机和底部电机之间是否会发生碰撞，因此基于两个电机的当前位置，并非所有位置都被允许。如果网关未能正确接收到当前位置，某些命令可能会被错误地拒绝，以避免碰撞。

如果你遇到此类问题，请尝试将网关放到离窗帘更近的位置。

### 允许 UDP 组播通信

Home Assistant 与网关通信时使用以下 UDP 组播地址和端口：

- Motion hub 接收 UDP 组播：`238.0.0.18:32100`
- Motion hub 发送 UDP 组播：`238.0.0.18:32101`

你的本地网络必须允许这种通信。如果窗帘显示为不可用，并且你看到如下错误消息：

`Timeout of 5.0 sec occurred on 5 attempts while waiting on multicast push from update request, communication between gateway and blind might be bad.`

请确认 motion 网关和运行 Home Assistant 的设备位于同一 VLAN，并且你的路由器已启用或允许组播。
如果使用不同 VLAN，请确认 VLAN 之间已开放 `238.0.0.18:32100` 和 `238.0.0.18:32101` 端口进行通信（尚未测试或确认可用）。

对于某些路由器，需要在所用无线接口上禁用 “IGMP snooping”，以便放行 IGMP/组播消息。

对于 Ubiquiti 路由器或接入点，应禁用 “Enable multicast enhancement (IGMPv3)”。

### 绕过 UDP 组播

如果你的环境中 UDP 组播无法使用（例如受到网络限制），此集成可以改用本地轮询模式。
前往 Settings -> Integrations -> 在已设置好的 Motionblinds 集成上选择 “configure” --> 禁用 “Wait for multicast push on update” 选项（默认是禁用状态）。

Motionblinds 集成的默认更新间隔为每 10 分钟一次。当 UDP 组播推送不可用时，这个轮询间隔可能有点长。
要提高轮询频率：
前往 Settings -> Integrations -> 在已设置好的 Motionblinds 集成上选择更多选项（三点菜单），然后选择 “System options” -> 禁用 “polling for updates”。
接着创建一个自动化，触发器使用 time pattern，并选择你需要的轮询时间。
在操作中选择 **Perform action**，再选择 **Update entity**，并把其中一个 Motionblinds 卷帘作为实体。
你只需要创建一个自动化，并只选择一个 Motionblinds 卷帘实体，其余实体会在同一时间一起更新。

自定义轮询间隔（每分钟一次）的 YAML 自动化示例：

```yaml
alias: "Motionblinds polling automation"
triggers:
  - trigger: time_pattern
    minutes: "/1"
actions:
  - action: homeassistant.update_entity
    target:
      entity_id: cover.motion_shade
```
