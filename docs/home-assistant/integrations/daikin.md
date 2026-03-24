---
title: Daikin AC
description: 关于如何将大金空调设备与 Home Assistant 集成的说明。
ha_category:
  - Climate
  - Energy
  - Sensor
  - Switch
ha_release: 0.59
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@fredrike'
ha_domain: daikin
ha_zeroconf: true
ha_platforms:
  - climate
  - sensor
  - switch
ha_integration_type: device
---

**Daikin** 集成将大金空调系统集成到 Home Assistant 中。

Home Assistant 目前支持以下设备类型：

- [气候](#气候)
- [传感器](#传感器)
- [开关](#开关)

## 支持的硬件

- 欧洲版本的 WiFi 控制单元（BRP069A41、42、43、45），由 [Daikin Online Controller](https://play.google.com/store/apps/details?id=eu.daikin.remoapp) 应用程序驱动。新版本的 WiFi 控制单元 BRP069Bxx 也已确认可以工作，已测试并正常工作的设备有 BRP069B41 和 BRP069B45。
- 澳大利亚版本的大金 WiFi 控制单元 BRP072A42，由 [Daikin Mobile Controller (iOS)](https://apps.apple.com/au/app/id917168708)（[Android](https://play.google.com/store/apps/details?id=ao.daikin.remoapp)）应用程序驱动。已确认在大金 Cora 系列逆循环分体式空调 2.5kW 制冷 FTXM25QVMA 上正常工作，支持运行模式、温度、风扇摆动（3D、水平、垂直）。
  - 基于 BRP072Cxx 的设备（包括 Zena 设备）*。
- 美国版本的 WiFi 控制单元（BRP072A43），由 [Daikin Comfort Control](https://play.google.com/store/apps/details?id=us.daikin.comfortcontrols) 应用程序驱动。已确认在大金壁挂式 FTXS09LVJU、FTXS15LVJU、FTXS18LVJU 和落地式 FVXS15NVJU 上正常工作，支持运行模式、温度、风扇摆动（3D、水平、垂直）。
- 使用固件 2.8.0 的 BRP069C4x/BRP084Cxx 设备已在 HA 2025.9 中添加。
- 澳大利亚版本的大金 **AirBase** 设备 WiFi 控制器（BRP15B61），由 [Daikin Airbase](https://play.google.com/store/apps/details?id=au.com.daikin.airbase) 应用程序驱动。
- 基于 **SKYFi** 的设备，由 SKYFi 应用程序驱动*。

如果您的设备不在上面的列表中，还有另一个选择，购买并安装 [ESP32-Faikout](https://github.com/revk/ESP32-Faikout)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

如果您的设备设置了密码，请使用密码。如果它有 API 密钥，请使用 API 密钥。在所有其他情况下，将字段留空。

:::note
如果您的大金设备与您的 Home Assistant 实例不在同一网络中，即您的网络是分段的，请注意在发现过程中会建立几个 UDP 连接：

- 从 Home Assistant 到大金控制器：`UDP:30000` => `30050`
- 从大金控制器到 Home Assistant：`UDP:<随机端口>` => `30000`

如果您遇到这种情况，可能需要相应地调整您的防火墙。


:::
## 气候

`daikin` 气候平台将大金空调系统集成到 Home Assistant 中，可以控制设置以下参数：

- [**set_hvac_mode**](/home-assistant/integrations/climate/#action-climateset_hvac_mode)（`off`、`heat`、`cool`、`heat_cool` 或 `fan_only`）
- [**目标温度**](/home-assistant/integrations/climate#action-climateset_temperature)
- [**打开/关闭**](/home-assistant/integrations/climate#action-climateturn_on)
- [**风扇模式**](/home-assistant/integrations/climate#action-climateset_fan_mode)（速度）
- [**摆动模式**](/home-assistant/integrations/climate#action-climateset_swing_mode)
- [**set_preset_mode**](/home-assistant/integrations/climate#action-climateset_preset_mode)（away、none）

显示当前室内温度。

当您的控制器支持区域温度控制（AirBase/SKYFi）时，集成还会为每个区域公开一个气候实体。

### 区域气候实体

- 每个区域气候实体可以在系统设定点的 ±2 °C 范围内设置温度。
- 打开或关闭区域仍然依赖于现有的区域开关实体。区域气候实体专门用于温度管理。
- 即使区域已关闭，您也可以调整其目标温度；大金会在区域重新启用后立即应用存储的设定点。
- 只有宣传线性区域控制并公开区域温度表的控制器（例如 AirHub Touch Zone Controller、具有线性区域控制的 AirBase/SKYFi 型号）才会创建这些额外的气候实体。

主要的大金气候继续提供 `zone_temps` 属性，用于快速查看所有区域目标。

:::note
某些型号不支持设置**风扇速度**或**摆动模式**。
  

:::
:::note
预设模式 **away** 对应于大金的"假日模式"：<br/>
<br>
_"假日模式"用于当您要离家较长时间时关闭设备。_<br/>
<br>
_当"假日模式"启用时，会执行以下操作：_

- _所有连接的设备都会关闭。_
- _所有计划计时器都会被禁用。_


:::
## 传感器

`daikin` 传感器平台将大金空调系统集成到 Home Assistant 中，可以按设备显示以下参数：

- 室内温度
- 室内湿度
- 制冷模式下的每小时能耗
- 制热模式下的每小时能耗
- 今日总能耗（每小时更新，00:00 重置）

集成显示室外压缩机的以下参数：

- 室外温度
- 室外压缩机预估功耗（所有设备的总和）
- 室外压缩机能耗（所有设备的总和，00:00 重置）
- 室外压缩机频率

:::note
- 某些型号只有在开启时才报告室外温度。
- 某些型号没有湿度传感器。
- 某些型号不报告功耗/能耗。
- 某些型号不报告压缩机频率。


:::
:::note
- '室外压缩机能耗'和'室外压缩机预估功耗'传感器在所有不同运行模式每消耗 100 Wh 时更新一次。
- '室外压缩机预估功耗'传感器由上述能耗得出，并非由空调直接提供。
- '制冷/制热'能耗传感器每小时更新一次，显示给定模式和给定空调的前一小时能耗。
- '制冷'模式还包括'风扇'和'除湿'模式的功耗。
- 如果您有多个室内设备，'室外压缩机'传感器将被创建多次，但都会报告相同的值。您可以禁用除一个以外的所有传感器。


:::
## 开关

AirBase 和 SKYFi 设备公开可以单独开关的区域（通常是房间）。

:::note
名称为 `-` 的区域将被忽略，就像 AirBase 应用程序的工作方式一样。


:::
为每个设备创建一个开关，用于切换设备的开/关。这将把设备打开到其之前的状态，或将其关闭。此开关与气候实体配合工作。

此外，可以在支持的设备上使用开关切换大金 Streamer（空气净化器）功能。请注意，目前无法可靠检测特定设备是否支持 streamer，因此即使功能实际不支持，开关也可能出现在 UI 中。

## 更改区域

欧洲和美国控制器（很可能也包括澳大利亚控制器）有一个 HTTP API 端点，允许您更改控制器的区域，以便可以使用其他地区的应用程序。（有时这些控制器会被出口到无法下载控制器区域应用程序的地区。）

`http://Daikin-IP-Address/common/set_regioncode?reg=XX` 将 XX 替换为您选择的区域代码。

当前已知的区域代码：

- AU
- EU
- JP
- US
- TH

如果您在使用某些应用程序（如 Daikin ONECTA）时遇到问题，请尝试设置小写的区域代码（例如 'eu'）。