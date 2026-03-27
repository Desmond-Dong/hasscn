---
title: HomeKit Device
description: 'HomeKit(https://developer.apple.com/apple-home/) Device 集成可让你将带有“Works with HomeKit”标识的配件连接到 Home Assistant。请不要将此集成与 HomeKit Bridge(/home-assistant/integra。'
ha_category:
  - Alarm
  - Binary sensor
  - Climate
  - Cover
  - Fan
  - Health
  - Hub
  - Humidifier
  - Light
  - Lock
  - Sensor
  - Switch
ha_release: 0.68
ha_iot_class: Local Push
ha_bluetooth: true
ha_config_flow: true
ha_codeowners:
  - '@Jc2k'
  - '@bdraco'
ha_domain: homekit_controller
ha_zeroconf: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - diagnostics
  - event
  - fan
  - humidifier
  - light
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
ha_integration_type: device
---
 [HomeKit](https://developer.apple.com/apple-home/) Device 集成可让你将带有“Works with HomeKit”标识的配件连接到 Home Assistant。请不要将此集成与 [HomeKit Bridge](/home-assistant/integrations/homekit/) 集成混淆，后者可让你通过 HomeKit 控制 Home Assistant 设备。

# 添加 HomeKit 设备

将 HomeKit 设备添加到 Home Assistant 有多种方法：

- [通过以太网或 Wi-Fi](#adding-a-homekit-device-via-ethernet-or-wi-fi)
- [通过蓝牙](#adding-a-homekit-device-through-bluetooth)
- [通过 Thread](#adding-a-homekit-device-through-thread)
  - [使用 Home Assistant 的首选 Thread 网络](#adding-a-homekit-device-to-a-thread-network-via-home-assistant)
  - [使用 Apple Thread 边界路由器](#adding-a-homekit-device-via-apple-thread-border-router)

## 通过以太网或 Wi-Fi 添加 HomeKit 设备

当 HomeKit [兼容设备](#supported-devices)准备好配对时，HomeKit Device 集成会自动在你的网络中检测到它们。

### 前提条件

- 如果你没有启用 [`default_config`](/home-assistant/integrations/default_config/) 集成，请在 "`configuration.yaml`" 文件中添加 [`zeroconf`](/home-assistant/integrations/zeroconf/)。
- 找到你的 HomeKit 配对码。该代码位于设备本体或包装上。如果设备有屏幕，也可能显示在屏幕上。
  - 如果你没有这个代码，就无法恢复。在这种情况下，你需要联系制造商了解可行方案。
- 确保设备已通电。
- 确保设备已连接到你的网络，但尚未与其他 HomeKit 控制器配对。根据设备情况，你需要执行不同步骤：
  - 如果设备尚未加入你的网络：先将设备接入网络：
    - 按照制造商说明将设备加入网络
    - 如果设备仅支持 HomeKit（例如 Koogeek LS1 灯带），请先使用 Apple Home 应用配对，然后再执行下一步。
  - 如果设备已在你的网络中，但已通过 HomeKit 与 Apple 设备配对：请从 Apple Home 应用中**移除**该设备。
    - 否则你将无法把它与 Home Assistant 配对。
  - **说明：**先将设备添加到 Home 应用，再将其移除，会产生两个效果：
    - 它会把设备加入你的网络。即使从应用中移除，设备仍会保留在网络中。
    - 从应用中移除设备后，设备会重新开放给 Home Assistant 的 HomeKit Device 集成进行配对。HomeKit 设备一次只能与一个控制器配对。


### 通过以太网或 Wi-Fi 添加 HomeKit 设备

1. 设备应已出现在 **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)** 下。
2. 在 HomeKit Device 集成卡片上，选择 **Configure**。
     
     ![HomeKit integration](/home-assistant/images/integrations/homekit_controller/homekit_controller_add_01.png)
3. 输入你的 HomeKit 配对码。
   - 将设备添加到某个房间，然后选择 **Finish**。
   - 设备现在应已添加到你的 Home Assistant 实例中。
4. 当 Home Assistant 完成设备配置后，你可以通过 [`HomeKit Bridge`](/home-assistant/integrations/homekit/) 集成将它重新导出到 Siri 和 Apple Home。

## 通过蓝牙添加 HomeKit 设备

你可以通过 [Bluetooth](/home-assistant/integrations/bluetooth) 将 HomeKit [兼容设备](#supported-devices)添加到 Home Assistant。

### 前提条件

- 找到你的 HomeKit 配对码。该代码位于设备本体或包装上。如果设备有屏幕，也可能显示在屏幕上。
   - 如果你没有这个代码，就无法恢复。在这种情况下，你需要联系制造商了解可行方案。
- 如果你的 Home Assistant 实例原生不支持蓝牙，请使用 ESPHome 蓝牙代理。
  - 如果 Home Assistant 设备距离待配对设备太远，代理也会很有帮助。
- 如果你的 HomeKit 设备之前用过 Thread，或仍与 iOS 配对，请重置设备。
  - HomeKit 设备一次只能与一个控制器配对。
  - 如果它之前加入过 Thread 网络，设备可能仍记得其他网络的 Thread 凭据。重置可确保设备未连接到任何 Thread 网络。

### 通过蓝牙添加 HomeKit 设备

1. 为你的 HomeKit 设备通电。
   - 如果已启用蓝牙，设备应出现在 **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)** 下。
2. 在 HomeKit Bridge 集成卡片上，选择 **Configure**。
     
     ![HomeKit integration](/home-assistant/images/integrations/homekit_controller/homekit_controller_add_01.png)
3. 输入 HomeKit 配对码以配对设备。
   - 如果是电池供电设备，你可能需要按下设备上的按钮将其唤醒后再配对。
   - 蓝牙设备的配对时间可能明显长于 IP 设备。
   - 将设备添加到某个房间，然后选择 **Finish**。

## 通过 Thread 添加 HomeKit 设备

本节介绍将 HomeKit 设备加入 Thread 网络的方法：

1. 通过 Home Assistant
2. 通过 Apple Thread 边界路由器

### 通过 Home Assistant 将 HomeKit 设备添加到 Thread 网络

将 HomeKit [兼容设备](#supported-devices)添加到 Thread 网络有两种方法：

- 通过 Home Assistant 的首选 Thread 网络
- 通过 [Apple Thread 边界路由器](#adding-a-homekit-device-via-apple-thread-border-router)

本节介绍如何通过 Home Assistant 的首选 Thread 网络添加设备。

#### 前提条件

- 一台支持 Thread 的 HomeKit 设备。包装上通常会有 Thread 标识。
- 确保该 HomeKit 设备已[通过蓝牙加入](#adding-a-homekit-device-through-bluetooth)。
- **Thread 网络**：要通过 Thread 使用 HomeKit，你需要一个正常工作的边界路由器。
  - 确保你的 Home Assistant 设备与边界路由器位于同一局域网中。
  - 确保你想使用的 Thread 网络已被 Home Assistant 识别，并在 Thread 配置中标记为 **Preferred network**。
  - 如果你有 Home Assistant Yellow、Connect&nbsp;ZBT-1 或 Connect&nbsp;ZBT-2，可以启用 Thread 来设置 Open Thread 边界路由器，并创建 Thread 网络。
    - [在 Yellow 上启用 Thread 的文档](https://support.nabucasa.com/hc/articles/25742476767517)
    - [在 Connect ZBT-1 上启用 Thread 的文档](https://support.nabucasa.com/hc/sections/26122472719517)
    - [在 Connect ZBT-2 上启用 Thread 的文档](https://support.nabucasa.com/hc/sections/31260019451421)

#### 通过 Home Assistant 将 HomeKit 设备添加到 Thread 网络

1. 在 **HomeKit** 集成中选择相应**设备**，打开设备配置页面。
2. 在 **Diagnostic** 下，你可以看到 **Thread Status** 显示为 **Disabled**。
   ![Device configuration page](/home-assistant/images/integrations/homekit_controller/homekit_controller_add_02.png)
3. 要启用 Thread，请在 **Configuration** 下选择 **Press**。这会下发首选 Thread 凭据。
   - 此时状态会发生变化：
     - 根据设备类型、网状网络规模和健康状况，Thread 状态可能显示为 **Child**、**Router** 或 **Leader**。
       ![Thread status](/home-assistant/images/integrations/homekit_controller/homekit_controller_add_02.png)
   - 完成后，你的 HomeKit 设备就会通过 Thread 通信。

### 通过 Apple Thread 边界路由器添加 HomeKit 设备

将 HomeKit [兼容设备](#supported-devices)添加到 Thread 网络有两种方法：

- 通过 [Home Assistant 的首选 Thread 网络](#adding-a-homekit-device-to-a-thread-network-via-home-assistant)
- 通过 Apple Thread 边界路由器

本节介绍如何使用 Apple Thread 边界路由器设备（如 HomePod mini）添加 HomeKit [兼容设备](#supported-devices)。

#### 前提条件

- 一台可充当 Thread 边界路由器的 Apple 设备，例如 HomePod mini。
- 一台支持 Thread 的 HomeKit 设备。包装上通常会有 Thread 标识。
- 确保你的 Home Assistant 实例与边界路由器位于同一局域网中。
- 确保该 HomeKit 设备已在 Apple Home 应用中完成配对（使用 iOS Home 应用）。

#### 通过 Apple Thread 边界路由器添加 HomeKit 设备

1. 从 Apple Home 应用中移除该 HomeKit 设备，但不要重置设备。
   - 这样会把 Thread 网络信息保留在 HomeKit 设备上。
   - Home Assistant 中的 HomeKit controller 集成会自动发现该设备。
   - 它会以通过 Thread 发现的设备形式出现。
2. 在 **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)** 下的 HomeKit 集成卡片上，选择 **Configure**。

   ![HomeKit integration](/home-assistant/images/integrations/homekit_controller/homekit_controller_add_01.png)

3. 输入 HomeKit 配对码来配对设备。该代码位于设备本体或包装上。
   - 如果是电池供电设备，你可能需要按下设备上的按钮将其唤醒后再配对。
   - 蓝牙设备的配对时间可能明显长于 IP 设备。
   - 将设备添加到某个房间，然后选择 **Finish**。
4. 在 **HomeKit** 集成中选择相应**设备**，打开设备配置页面。
5. 在 **Diagnostic** 下检查状态：
   - 根据设备类型、网状网络规模和健康状况，Thread 状态可能显示为 **Child**、**Router** 或 **Leader**。
     ![Thread status](/home-assistant/images/integrations/homekit_controller/homekit_controller_add_02.png)
   - 完成后，你的 HomeKit 设备就会通过 Thread 通信。

## 支持的设备

Home Assistant 当前支持以下设备类型（也称为 *domains*），下面列出的是其默认类型。

- Alarm control panel（HomeKit 安防系统）
- Climate（HomeKit 恒温器和空调）
- Cover（HomeKit 车库门开关、窗户或窗帘）
- Light（HomeKit 灯）
- Lock（HomeKit 门锁）
- Switch（HomeKit 开关、插座和阀门）
- Binary sensor（HomeKit 运动、接触、占用、一氧化碳和烟雾传感器）
- Sensor（HomeKit 湿度、温度、CO2 和光照传感器）
- Fan
- Air quality
- Humidifier (HomeKit humidifiers and dehumidifiers)
- Automation triggers (HomeKit 'stateless' accessories like buttons, remotes and doorbells)

:::note
如果你的设备不在此列表中，你仍然可能可以完成配对，并在设备注册表中看到它，但 Home Assistant 可能不会为其创建实体。

:::
此集成会启用推送更新。通过 Wi-Fi 或以太网连接的设备如果连接不稳定，可能会退回为轮询模式。

## “无状态”开关和传感器

某些 HomeKit 设备（如按钮、遥控器和门铃）不像普通 HomeKit 设备那样提供可读取的传感器，它们只会在事件发生时通知 Home Assistant。这意味着 Home Assistant 无法为它们显示实体，因为它们没有状态。不过，你仍可以将它们用于[设备自动化](/home-assistant/integrations/device_automation/)。

例如，如果你想添加一个由这些设备触发的新自动化，请前往设备注册表界面并找到你想用作触发器的设备。选择该设备以打开其设备注册表条目。你将能够看到设备的型号、制造商和固件版本。你也可能会看到相关实体，比如电池传感器。

<p class='img'>
<img src='/home-assistant/images/integrations/homekit_controller/device_automation_start.png' />
</p>

选择按钮以添加自动化。弹出窗口会显示可用触发器列表。

<p class='img'>
<img src='/home-assistant/images/integrations/homekit_controller/device_automation_triggers.png' />
</p>

选择其中一个后，你会进入自动化编辑器，并自动填入该触发器。如果设备支持，你还可以选择事件类型，比如短按或长按。

<p class='img'>
<img src='/home-assistant/images/integrations/homekit_controller/device_automation_new.png' />
</p>

填写完表单其余部分并创建自动化后，它就会显示在设备注册表中的该设备下。

<p class='img'>
<img src='/home-assistant/images/integrations/homekit_controller/device_automation_finish.png' />
</p>

## 使用不安全的设置码进行配对

某些设备制造商未遵循 HomeKit 规范，会使用固定代码或像 `123-45-678` 这样极易猜测的代码进行配对。此集成在配对时会提醒你该配置存在安全风险，并要求你在与配件配对前额外确认。建议考虑更换为支持随机配对码的设备。

## 故障排除

### 我没有 HomeKit PIN

当你购买经过认证、支持 HomeKit 的设备时，PIN 码可能位于说明书中，或贴在配件本体上的标签上。

像恒温器这类带屏幕的设备，包装中可能根本没有 PIN 码。每次你在 Home Assistant 前端中选择 “Configure” 时，设备都会生成新的配对码并显示在屏幕上。

如果你的设备没有显示屏，并且是在发售后才增加 HomeKit 支持，那么你可能没有配对码。具体处理方式取决于制造商。有些制造商允许你在他们的 iOS 应用中查看配对码，另一些则要求你必须使用他们的应用配置 HomeKit，且不会提供配对 PIN。在这种情况下，你暂时无法将这些设备用于此集成。

如果你丢失了 PIN 码，可能就无法再配对该配件。你应联系制造商看看是否还有可行办法。

### Home Assistant 无法发现我的设备

对于 IP 配件，Home Assistant 只能发现已经位于同一网络中的设备。如果配件使用 Wi-Fi，且没有可供加入 Wi-Fi 网络的用户界面，那么你需要一台 Apple HomeKit 控制器设备（iPhone 或 iPad）。你应先用该控制器与设备配对，然后在界面中移除配对关系（但不要重置配件本身）。这样设备会继续留在你的 Wi-Fi 网络中，但处于未配对状态，随后 Home Assistant 就能发现它。

Home Assistant 只能发现尚未配对的配件。即使你重置了 Home Assistant 配置，配件仍会认为自己已配对，因此无法在 Home Assistant 中使用。你应按照制造商说明重置配件。有些设备提供 “Reset HomeKit” 选项，也有些可能需要完全重置。

如果你的设备与 Home Assistant 位于不同的 VLAN 中，则必须配置 mDNS 反射器，发现和配对功能才能正常工作。

请使用 mDNS 工具检查是否能看到你的设备。如果你熟悉命令行，可以在 Home Assistant 安装环境中运行 `netdisco`：

```bash
python3 -m netdisco
Discovered devices:
homekit:
[ {'host': '192.168.17.5',
  'hostname': 'Philips-hue.local.',
  'name': 'Philips hue - xxxx',
  'port': 8080,
  'properties': {'c#': '21',
                 'ci': '2',
                 'ff': '1',
                 'id': 'AA:BB:CC:DD:EE:FF',
                 'md': 'BSB002',
                 'pv': '1.1',
                 's#': '1',
                 'sf': '0'}},
```

Home Assistant 发现 HomeKit 设备时并不使用 `netdisco`，因此如果 `netdisco` 都看不到你的设备，问题更可能出在网络环境，而不是 Home Assistant 本身。

如果你不太熟悉命令行，也可以使用这些工具：适用于 [Mac](https://apps.apple.com/app/id1381004916) 或 [iOS](https://apps.apple.com/app/id305441017) 的 Discovery、Android 的 [Service Browser](https://play.google.com/store/apps/details?id=com.druk.servicebrowser)，或 [All My Lan](https://apps.microsoft.com/store/detail/all-my-lan/9WZDNCRDN19V)。不过，这些诊断工具的参考价值较低，因为它们并不是从 Home Assistant 所在的网络位置运行。即使工具中能看到设备，问题仍可能是网络配置导致的，但它们有时仍能提供一些线索。

如果发现工具提供了一个 IP 地址，请检查它是否符合预期（例如和路由器中的 DHCP 租约对比）。你能 ping 通它吗？如果不能，说明你存在网络问题。

一些用户反馈，他们的网络配置会干扰 HomeKit 设备与 Home Assistant 的配合使用。表现形式各不相同，包括完全无法发现设备，或发现过程不稳定（有时有效，有时无效）。这不仅与所使用的硬件有关，也与配置方式密切相关，因此我们无法提供通用且正确的设置建议。例如，有人认为 IGMP Snooping 是问题根源，也有人把它当作解决办法。

### 即使我没有 Apple 设备，集成仍在我的网络中发现设备

这是完全正常的。与许多商业 IoT 方案不同，HomeKit 协议是本地且可离线工作的协议，不依赖 Apple 生态系统运行。你无需 Apple 在线账户也能使用带有 “Works with HomeKit” 标识的设备。某些 Wi-Fi 设备可能需要临时借助 iOS 设备接入 Wi-Fi，但除此之外，你的网络中并不需要任何 Apple 硬件。

许多 IoT 设备会在上市后获得 HomeKit 支持升级。这意味着，尽管你购买时设备并不支持 HomeKit，它现在也可能在 Home Assistant 中显示为 `homekit_controller` 设备。对你来说，这可能比原生集成更适合。例如，许多气候设备同时提供仅在线可用的 API 和 HomeKit API。HomeKit API 可能无法暴露你熟悉的全部设置和控制项，但当互联网断开或云服务停止时，它也不会失效。

### 日志中出现了集成跳过更新的警告

你可能会看到如下日志：

```log
HomeKit device update skipped as previous poll still in flight
```

在这种情况下，问题通常并不是集成本身直接导致的。这是一项安全机制，用于避免你的 Home Assistant 实例过载。它表示 Home Assistant 尝试轮询配件时，上一次轮询仍未完成。这说明轮询你的配件耗时已超过 1 分钟，可能由以下原因造成：

- 你的 Home Assistant 实例中有太多会阻塞的同步集成。所有同步集成共享同一个线程池，如果队列中的任务太多，就会排队并产生延迟。在最糟糕的情况下，排队速度会快于处理速度。更快的硬件或许有帮助，但你也可能需要禁用部分集成。
- 你与某个配件之间的网络连接较差，导致集成无法稳定访问该配件。这通常需要调整网络设置，以改善 Wi-Fi 覆盖，或更换损坏的线缆。
- 配件本身存在问题，导致间歇性的网络异常。

在这些情况下，集成会跳过轮询，以避免你的实例中积压越来越多的待处理任务。

### 我看不到“无状态”配件生成的任何事件

这是正常现象。像某些门铃、按钮或遥控器这样的无状态配件，在 Home Assistant 中只能通过设备自动化来使用。Home Assistant 不会为设备自动化触发器额外创建重复事件，因此你无法在开发者工具的事件界面中看到它们。

### Home Assistant 看不到我的 Homebridge 设备

请在 Homebridge 的设置或配置中确认你使用的是 `ciao`，而不是 `Bonjour-HAP`。`Bonjour-HAP` 已不再被 `homebridge` 推荐，并被视为已损坏或不受支持。
