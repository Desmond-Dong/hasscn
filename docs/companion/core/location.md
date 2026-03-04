---
title: "位置"
id: "location"
---

## 概述

在以下情况下，位置更新会从您的设备发送到 Home Assistant：
*   当您进入或退出 Home Assistant 中定义的[区域](https://www.home-assistant.io/components/zone/)时。对于 Android，请确保在 [配置](https://my.home-assistant.io/redirect/config/) 的 Companion App 部分启用了基于区域的追踪开关。
*   当检测到或丢失 iBeacon 时（见[下文](#ibeacons)）。<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />
*   当应用打开且未在后台运行时。
*   通过自动后台获取。
*   当通过[特殊通知](/companion/notifications/commands#request-location-updates)请求更新时
*   当打开 [URL 处理器](/companion/integrations/url-handler) 链接时。<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />
*   当通过 [X-Callback-URL](/companion/integrations/x-callback-url) 调用应用时。<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />
*   当您的设备检测到[显著位置变化](#location-tracking-when-outside-a-home-assistant-zone)时。
*   手动刷新应用时（在页面顶部下拉）或从 3D Touch 应用图标打开的快捷菜单中刷新。<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />
*   当通过[发送 intent](#sending-an-intent) 请求更新时。<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

您可以通过检查 `sensor.last_update_trigger` 的值来查看最近一次位置更新的原因 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />

根据您的设置，位置数据直接从您的手机发送到 Home Assistant 实例，或通过 Home Assistant 云服务发送。这取决于 [配置](https://my.home-assistant.io/redirect/config/) 中 Companion App 部分的连接设置中指定的 URL。位置数据不会通过任何其他服务器或组织发送。当然，如果您决定不授予 Home Assistant Companion App 位置权限，或者您随后移除了位置权限（<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 设置>隐私>定位服务 或 <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 设置>隐私>权限），则不会从您的设备向 Home Assistant 发送任何位置数据。**需要注意的是，如果在 iOS 上禁用位置功能，则所有[传感器](sensors.md)都无法工作！<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />，而在 Android 上 <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />，您仍然可以看到一些不依赖于位置权限的传感器**。另一种方法是从[实体注册表](https://www.home-assistant.io/integrations/config/#entity-registry)中禁用 `device_tracker.<device_name>` 实体。

## 入门

首次安装并打开 Home Assistant Companion App 后，将创建一个新的 `device_tracker.` 实体。默认情况下，该实体的名称格式为 `device_tracker.<device_ID>`，其中 `<device_ID>` 是您设置的设备名称（<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 设置>通用>关于本机 或 <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 设置>关于手机）。您可以在 Home Assistant 中访问侧边栏配置页面的[集成仪表板](https://my.home-assistant.io/redirect/integrations/)，点击或点按您设备的 Mobile App 集成，然后滚动浏览实体列表来检查实体名称。如果需要，您可以根据需要编辑实体的 `name` 属性。

以下是一个基本示例，用于在天黑后进入您的 _home_ 区域时打开灯光。

```yaml
automation:
  - alias: "回家时打开门灯"
    trigger:
      - platform: state
        entity_id: device_tracker.<device_ID>
        to: "home"
    condition:
      - condition: sun
        after: sunset
    action:
      - action: light.turn_on
        data:
          entity_id: light.frontdoor
```

## 实体属性

新创建的 `device_tracker` 实体可能根据您的操作系统提供以下某些属性。

| 名称                | 单位                           |
| ------------------- | ------------------------------ |
| `source`            | _无_                         |
| `battery_level`     | 百分比                     |
| `latitude`          | 度                        |
| `longitude`         | 度                        |
| `gps_accuracy`      | 米                         |
| `altitude`          | 米                         |
| `course`            | 度                        |
| `speed`             | 米每秒              |
| `vertical_accuracy` | 米                         |
| `floor`             | 楼层 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> |

如果您想了解更多关于这些属性的详细信息，请参阅您操作系统的相关文档：

[Android](https://developer.android.com/reference/android/location/Location) 或
[iOS](https://developer.apple.com/documentation/corelocation/cllocation)

## 管理位置追踪级别

当使用核心 2022.2 或更高版本时，您可以在 Companion App 设置中配置位置的发送方式：

 - <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 该设置可以针对每个服务器进行管理。打开服务器设置，在隐私下更改位置发送设置。
 - <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 启用位置追踪可以针对每个服务器进行管理，精确/仅区域名称适用于所有服务器。前往管理传感器 > 后台位置，更改位置发送设置。

可用选项：

- **精确** 发送您设备的 GPS 坐标。
- **仅区域名称** 仅发送区域名称（或 `not_home`），这对于不暴露位置的存在检测很有用。仅考虑相关服务器的区域。
- **<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 从不** 或 **<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 禁用** 将不会发送 GPS 坐标或区域信息。

## 在 Home Assistant 区域外的位置追踪

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />

Home Assistant Companion App 从 iOS 接收_显著位置变化_。每当收到更新时，它会发送到 Home Assistant。大致上，每次您的设备转移到新的蜂窝塔、经过了大量时间（通常几小时）或连接状态发生变化且系统注意到您的位置最近发生了变化时，都会收到更新。

Apple [定义][apple-location-programming-guide] 显著位置变化更新为：

> 显著变化位置服务仅在设备位置发生显著变化时（例如 500 米或更多）才会传递更新。

他们在 [能效指南][apple-energy-guide] 中还表示：

> 显著变化位置更新每隔 15 分钟至少唤醒系统和您的应用一次，即使没有发生位置变化。

最后，我认为 [Stack Overflow][stackoverflow] 的这个回答说得最好：

> 显著位置变化是所有位置监控类型中最不准确的。它仅在蜂窝塔转换或变化时获取更新。这可能意味着根据用户所在位置有不同的准确性和更新级别。城市区域，更多的塔，更多的更新。城外、州际公路，更少的塔和变化。

关于显著变化位置更新的真实情况是什么？谁知道呢，因为 Apple 将其保密。

## 在 Home Assistant 区域内的位置追踪

启动时，Home Assistant for iOS 会为您的 Home Assistant 配置中的所有区域设置地理围栏。进入和退出通知会发送到 Home Assistant。对于 Android，您需要确保在应用配置页面启用了基于区域的追踪。

### 配置

在您的 [区域配置](https://my.home-assistant.io/redirect/zones/) 中添加 `track_ios: false` 可禁用所有已连接 iOS 应用的区域位置追踪。<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />

### iBeacons

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />

该应用基本支持使用 iBeacon 触发进入/退出更新。要配置它们，请将您的 iBeacon 详细信息添加到您的区域，如下所示：

```yaml
zone.home:
  beacon:
    uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
    major: 60042
    minor: 43814
```

重启 Home Assistant 和 iOS 应用。然后它将开始使用 iBeacon _而不是您的位置_ 来触发区域周围的进入（但不是退出）触发器。要将 iBeacon 添加到 `zone.home`，请将上述内容添加到您的 `customize` 下。

[apple-energy-guide]: https://developer.apple.com/library/content/documentation/Performance/Conceptual/EnergyGuide-iOS/LocationBestPractices.html#//apple_ref/doc/uid/TP40015243-CH24-SW4
[apple-location-programming-guide]: https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html#//apple_ref/doc/uid/TP40009497-CH2-SW9
[stackoverflow]: http://stackoverflow.com/a/13331625/486182

## 发送 intent

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 发送 intent 是一项高级功能，适用于熟悉 Android 自动化应用的用户。用户可以使用 Tasker 或任何其他允许用户发送 intent 的自动化应用发送 intent 来请求位置更新。您需要确保应用在[后台](/companion/troubleshooting/errors#device-tracker-is-not-updating-in-android-app)运行，并且启用了单次精确定位传感器，以便更新正确触发。

以下步骤是使用 Tasker 发送 intent 的示例：

1.  创建一个新任务
2.  向任务添加一个步骤
3.  选择"发送 Intent"
4.  在 Action 中输入 `io.homeassistant.companion.android.background.REQUEST_ACCURATE_UPDATE`
5.  在 Package 中输入 `io.homeassistant.companion.android`
6.  保存任务
7.  将任务与任何 Tasker 配置文件一起使用来请求位置更新

## Android 位置传感器

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 用户可以在 [设置](https://my.home-assistant.io/redirect/config/) > Companion App > 管理传感器 > 位置传感器下找到位置追踪的自定义传感器设置。这些传感器都要求应用具有适当的位置权限且设备上已启用位置功能，如果不满足这两个要求中的任何一个，传感器将变为禁用状态。

*  第一个传感器是 `后台位置`，该传感器负责使用 [Google 的 Fused Location API](https://developers.google.com/location-context/fused-location-provider) 注册频繁的后台更新。更新通常在 1-3 分钟之间，但当您使用 Google 地图等导航时，可能每 30 秒就有一次更新。
*  `后台位置` 还提供[高精度模式](#high-accuracy-mode)，以便您可以获得更快的更新。此模式的状态可以通过下一个位置传感器 `高精度模式` 来确定，它只是报告该模式是否启用。此传感器与您从 Google 获得的位置更新没有直接关系。
*  第三个位置传感器是 `位置区域`，启用后，该传感器将获取所有配置的 [`zones`](https://www.home-assistant.io/integrations/zone/) 列表，并使用 Google 的位置服务创建包含 `zone` 数据的地理围栏。这将允许更快的进入和退出检测，同时保持电池友好。

:::info
Android 应用最多可以创建 100 个地理围栏。如果您有超过 100 个区域，Home Assistant 将只为前 100 个区域创建地理围栏并接收事件。

当与高精度模式结合使用时，[带有触发范围约束的区域](/companion/core/location#zone-when-using-the-high-accuracy-mode-trigger-range-for-zone-meters-option-value-greater-than-0)，约束中包含的每个区域将创建 2 个地理围栏。例如，如果您有 2 个区域，其中 1 个配置了触发范围，则应用将创建 3 个地理围栏。
:::

*  最后一个位置传感器是 `单次精确定位`，该传感器仅在报告的精度不符合[传感器设置](#location-sensor-settings)中设置的标准时才会使用。当应用收到[通知命令](/companion/notifications/commands#request-location-updates)或 [intent](#sending-an-intent) 时，也会使用此传感器。

### 位置传感器设置

 设置允许您调整报告给 Home Assistant 的位置所需的精度。从 Google 收到的每个位置报告都包含报告的精度，有时这个数字可能很高或很低，取决于某些环境条件。通常，数字越高，报告越不准确。您可以独立于后台位置、位置区域和单次精确定位调整此设置。这将允许您在应用在后台时获得更快的区域检测，同时也保持准确。默认值为 `200`，在大多数用例中不需要更改，但在[故障排除](/companion/troubleshooting/errors#device-tracker-is-not-updating-in-android-app)期间，您可能会发现某些报告被跳过。在这种情况下，您可以将此数字调高以捕获那些被跳过的报告。
 
 单次精确定位传感器允许您调整发送到服务器的更新之间的最小时间，默认设置为 1 分钟（60000 毫秒）。单次精确定位传感器还有一个设置，允许您将位置更新作为传感器更新的一部分包含在内，请注意，启用后可能会导致过多的位置结果。通常您不需要调整这些设置。

### 高精度模式

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
:::caution
请注意，启用此选项后，由于持续使用 GPS，您的电池消耗会比正常情况更快。
:::

后台位置传感器还有在高精度模式下运行的选项。启用 `高精度模式（可能会快速消耗电池）` 选项后，位置每 X 秒更新一次（通过 `高精度间隔` 选项定义。默认 5 秒，最小 5 秒），通过 GPS 更新。

您可以定义蓝牙和/或区域约束来限制高精度模式的使用。

:::info
如果您同时使用两个约束（蓝牙、区域），则默认情况下只需满足一个约束即可启用高精度模式。

您可以通过启用相应选项来启用两个约束的组合。请参阅[组合](/companion/core/location#combination-of-zones-constraint-and-bluetooth-constraint)。
:::

#### 蓝牙约束

您还可以使用 `仅在连接到蓝牙设备时使用高精度模式` 选项仅在连接到特定蓝牙设备时启用高精度模式。请确保同时启用 `高精度模式（可能会快速消耗电池）` 选项。

#### 区域约束

此外，您可以使用 `进入区域时启用高精度模式` 选项在进入特定区域时启用高精度模式。如果您想在进入区域之前启用高精度模式，可以使用 `区域的高精度模式触发范围（米）` 选项。启用此选项后，将在原始区域周围创建一个扩展区域（仅应用内部）。当您到达该扩展区域时，高精度模式将被启用，然后在到达原始区域时被禁用。请查看区域示例。

这两个选项都要求您启用 `位置区域` 传感器。

##### 区域示例

![区域](/companion-assets/Zone.png)

###### 使用 `区域的高精度模式触发范围（米）` 选项时的区域（值大于 0）

在这种情况下，区域由扩展区域（zone.home_expanded）减去原始区域（zone.home）定义。图中以蓝色显示。

到达家庭区域：

- 进入 `zone.home_expanded` -> 高精度模式 **启用**
- 进入 `zone.home`，因此退出 `zone.home_expanded` -> 高精度模式 **禁用**

离开家庭区域：

- 退出 `zone.home`，因此进入 `zone.home_expanded` -> 高精度模式 **启用**
- 退出 `zone.home_expanded` -> 高精度模式 **禁用**

###### 不使用 `区域的高精度模式触发范围（米）` 选项时的区域（值等于 0）

在这种情况下，仅使用原始区域（zone.home）。图中以橙色显示。

到达家庭区域：

- 进入 `zone.home` -> 高精度模式 **启用**

离开家庭区域：

- 退出 `zone.home` -> 高精度模式 **禁用**

###### 区域约束和蓝牙约束的组合

可以以两种方式组合。首先是默认的简单或组合，当相应开关关闭时使用。如上面的信息框所述，只需满足一个约束即可启用高精度模式。

但是，如果组合开关打开，则必须同时满足两个约束才能启用高精度模式。

启用状态的示例：您通过蓝牙连接到汽车，并且当您的设备识别到您进入特定区域或其周围半径时，高精度模式将打开。如果您离开该区域但仍与汽车保持连接（例如，继续行驶），高精度模式将被禁用。同样，如果您在家中走动但未连接到汽车，高精度模式将保持禁用。

#### 通知

如果启用了高精度模式，您将看到一个包含位置详细信息的通知。由于 Android 系统的要求，此通知是永久的。但您可以通过系统的通知设置隐藏/最小化位置通知。
如果同时启用了地理编码传感器，通知将显示您当前的地址。否则，它将显示您当前的坐标。此外，它还将显示最后找到的位置的精度。

高精度模式也可以通过通知命令启用/禁用。[详见此处](/companion/notifications/commands#high-accuracy-mode)。

高精度模式的状态可以通过启用[传感器](sensors.md#high-accuracy-mode)来查看。

高精度模式的更新间隔也可以通过启用[传感器](sensors.md#high-accuracy-mode)来查看。