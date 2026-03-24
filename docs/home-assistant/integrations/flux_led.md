---
title: Magic Home
description: 关于如何在 Home Assistant 中设置 Magic Home 的说明。
ha_category:
  - Button
  - Light
  - Number
  - Select
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: 0.25
ha_domain: flux_led
ha_platforms:
  - button
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
ha_codeowners:
  - '@icemanch'
ha_config_flow: true
ha_dhcp: true
ha_integration_type: integration
---

**Magic Home** 集成支持使用相同协议的多个品牌的开关、灯泡和控制器。如果您可以使用 Magic Home 应用程序或 Surp Life 应用程序控制设备，您的灯泡或控制器（例如 WiFi LED 控制器）很有可能与此集成配合使用。

这种集成将为您的 LED 灯/灯带提供本地控制，并且可以配置为自动扫描您的网络以查找控制器，或者让您通过 IP 地址手动配置各个灯。

灯泡示例：

- [MagicLight Smart Bulbs](https://www.magiclightbulbs.com/lightbulbs) 或 [Amazon](https://www.amazon.com/gp/product/B081YJHHB1/)
- [RGBCW Downlights](https://www.amazon.com/gp/product/B093Q83G7S/)
- [RGBCW Floodlights](https://www.amazon.com/dp/product/B08CDS3N6H)

带条的控制器示例：

- [MagicLight Strip Lights](https://www.magiclightbulbs.com/strip-lights) 或 [Amazon](https://www.amazon.com/gp/product/B08LPSS4J3/)

控制器示例：

- [Single color](https://www.amazon.com/gp/product/B07J5B3R5L/)
- [RGB](https://www.amazon.com/gp/product/B07C1LN7FZ/)
- [RGBW](https://www.amazon.com/gp/product/B07J9QCQNN/)
- [RGBCW](https://www.amazon.co.uk/gp/product/B09BMC4JNJ/)
- [RGB/W/CW](https://www.amazon.com/gp/product/B01DY56N8U/)

可寻址控制器的示例：

- [Addressable v3](https://www.amazon.com/gp/product/B09BMBSCRF/)

带条带的可寻址控制器示例：
- [Addressable v1](https://www.amazon.com/gp/product/B07RLF7C86/)
- [Addressable v2](https://www.amazon.com/gp/product/B07B7CQ2ZB/)

套接字示例：
- [MagicLight Smart Plugs](https://www.magiclightbulbs.com/smart-plugs) 或 [Amazon](https://www.amazon.com/gp/product/B07XNBVVXV/)

这些设备至少以以下品牌销售：

- 艾斯兰
- [Allkeys](http://allkeystech.com/)
- 阿波波
- [Arilux](https://www.ariluxworldwide.com/)
- 奥布里克
- 贝伦尼斯
- BHGY
- [Brizled](https://www.brizled.com/)
- 文平
- [Chichin](https://chichinlighting.com/)
- 科莫伊达
- 达拉丁
- [DALS RGBW / Armacost Lighting / MyLED](https://www.armacostlighting.com/)
- 防暗
- [Daybetter](https://www.daybetter.com/)
- 鹿舞
- 钻石
- [Diode Dynamics](https://www.diodedynamics.com/)
- [Flux LED](https://www.fluxsmartlighting.com/)
- [FVTLED](https://fvtled.com/)
- GEV LIG
- 格悦雅之家
- GIDEALED
- [GIDERWEL](https://giderwel.com/)
- GMK
- 戈德温
- 客家电子
- [HaoDeng](http://www.zengge.com/appkzd)
- [Heissner](https://www.heissner.de/)
- HDDFL
- [illume RGBW](https://dals.com/illume/)
- [Illumination FX](https://www.illumination-fx.com/)
- 英达润
- iNextStation
- [Koopower](https://www.koopower.com/)
- 拉鲁默
- 莱德网络
- [LiteWRX](https://litewrx.com/)
- 莱托克斯
- 魔法氛围
- [Magic Home](http://www.zengge.com/appkzd)
- [Magic Hue](http://www.magichue.com/)
- [Magic Light](https://www.magiclightbulbs.com/)
- 米希尔
- 莫韦莱
- 内克斯勒克斯
- 痴迷
- 奥德克斯
- PH LED
- 波波罗
- [Pin Stadium Pinball Lights](https://pinstadium.com/)
- POV灯
- [PROTEAM Europe Pool Lights](https://proteam-me.com/)
- [Rimikon](https://www.rimikon.com/)
- SMFX
- [Sumaote](https://fvtled.com/)
- [Superhome](https://superhome.com.cy/)
- [SurpLife](http://www.zengge.com/newbrand)
- [SuperlightingLED](https://www.superlightingled.com/)
- 斯维皮尔
- 托莫克斯
- 瓦南斯
- 耶泰达
- YHW
- [Zengge](http://www.zengge.com/sy)
- 赞伯


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

添加设备后，可以为它们配置以下列出的不同效果。可以通过导航到“设置”->“集成”中的集成设置并选择灯泡或控制器的“Magic Home”配置来访问这些设置。

**自定义效果**\
可以输入 RGB 颜色列表来创建效果。可以使用下面的滑块调整效果速度。

**自定义效果类型**\
这决定了每种颜色之间的过渡。

### 支持的型号

以下模型已经过测试。

|型号|描述 |麦克风|笔记|
| ----- | --------------------------- | ---------- | ------------------------------- |
| 0x01 | 0x01传统 RGB 控制器 |没有|原始协议|
| 0x03 | 0x03传统 CCT 控制器 |没有|原始协议|
| 0x04 | 0x04 UFO 控制器 RGBW |没有|                                 |
| 0x06 | 0x06控制器 RGBW |没有|                                 |
| 0x07 | 0x07控制器 RGBCW |没有|                                 |
| 0x08 | 0x08带麦克风的 RGB 控制器 |是的 |                                 |
| 0x09 | 0x09吸顶灯色温 |没有|                                 |
| 0x0E|落地灯 RGBCW |没有|                                 |
| 0x10 | 0x10圣诞灯|没有|                                 |
| 0x16 | 0x16磁光 CCT |没有|                                 |
| 0x17 | 0x17磁力灯可调光 |没有|                                 |
| 0x1A | 0x1A圣诞灯|没有|                                 |
| 0x1C | 0x1C台灯色温 |没有|                                 |
| 0x1E | 0x1E吸顶灯 RGBCW |没有|                                 |
| 0x21 | 0x21灯泡可调光 |没有|                                 |
| 0x25 | 0x25控制器 RGB/WW/CW |没有|支持RGB、RGBW、RGBWW、CW、DIM |
| 0x33 | 0x33控制器 RGB |没有|                                 |
| 0x35 | 0x35灯泡 RGBCW |没有|                                 |
| 0x41 | 0x41可调光控制器 |没有|                                 |
| 0x44 | 0x44灯泡 RGBW |没有|                                 |
| 0x52 | 0x52灯泡色温 |没有|                                 |
| 0x54 | 0x54 RGBW筒灯|没有|                                 |
| 0x62 | 0x62控制器 CCT |没有|                                 |
| 0x93 | 0x93切换 1 通道 |没有|                                 |
| 0x97 | 0x97插座|没有|                                 |
| 0xA1 | 0xA1可寻址 v1 |没有|支持UCS1903、SM16703、WS2811、WS2812B、SK6812、INK1003、WS2801、LB1914 |
| 0xA2 | 0xA2可寻址 v2 |是的 |支持UCS1903、SM16703、WS2811、WS2811B、SK6812、INK1003、WS2801、WS2815、APA102、TM1914、UCS2904B |
| 0xA3 | 0xA3可寻址 v3 |是的 |支持 WS2812B、SM16703、SM16704、WS2811、UCS1903、SK6812、SK6812RGBW (WS2814)、INK1003、UCS2904B |
| 0xA4 | 0xA4可寻址 v4 |没有|支持 WS2812B、SM16703、SM16704、WS2811、UCS1903、SK6812、SK6812RGBW (WS2814)、INK1003、UCS2904B |
| 0xA6 | 0xA6可寻址 v6 |是的 |支持 WS2812B、SM16703、SM16704、WS2811、UCS1903、SK6812、SK6812RGBW (WS2814)、INK1003、UCS2904B |
| 0xA7 | 0xA7可寻址 v7 |是的 |支持 WS2812B、SM16703、SM16704、WS2811、UCS1903、SK6812、SK6812RGBW (WS2814)、INK1003、UCS2904B |
| 0xE1 | 0xE1吸顶灯色温 |没有|                                 |
| 0xE2 | 0xE2吸顶灯辅助 |没有|不支持辅助开关 |

### 未经测试的模型

以下模型尚未经过测试，但可能有效。

|型号|描述 |麦克风|笔记|
| ----- | --------------------------- | ---------- | ------------------------------- |
| 0x02 | 0x02传统调光控制器 |没有|原始协议，已停产 |

### 不支持的型号

以下型号已确认不受支持。

|型号|描述 |麦克风|笔记|
| ----- | --------------------------- | ---------- | ------------------------------- |
| 0x18 | 0x18植物生长灯|没有|                                 |
| 0x19 | 0x19带 2 个 USB 的插座 |没有|                                 |
| 0x1B | 0x1B香薰香薰灯|没有|                                 |
| 0x1D | 0x1D补光|没有|                                 |
| 0x94 | 0x94开关 1c 瓦 |没有|                                 |
| 0x95 | 0x95切换 2 通道 |没有|                                 |
| 0x96 | 0x96切换 4 通道 |没有|                                 |
| 0xD1 | 0xD1数字时间灯|没有|                                 |

### 故障排除

如果条带控制器设备在调整颜色和效果期间无法保持 WiFi 或离线，升级到更高安培数的电源通常可以解决任何稳定性问题。

### 效果

Magic Home 灯提供了许多其他照明套件中不包含的效果。这些可以从前端选择，或在 `light.turn_on` 命令的效果字段中发送。

|效果名称|描述 |
|--------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `colorloop` |顺利过渡穿过彩虹。                          |
| `colorjump` |跳跃七种不同的彩虹颜色。                      |
| `colorstrobe` |循环选通每种彩虹颜色。                              |
| `red_fade`、`green_fade`、`blue_fade`、`yellow_fade`、`cyan_fade`、`purple_fade`、`white_fade` |在效果名称中所示的颜色和黑色之间淡入淡出。 |
| `rg_cross_fade` |在红色和绿色之间渐变。                                       |
| `rb_cross_fade` |在红色和蓝色之间渐变。                                        |
| `gb_cross_fade` |在绿色和蓝色之间渐变。                                      |
| `red_strobe`、`green_strobe`、`blue_strobe`、`yellow_strobe`、`cyan_strobe`、`purple_strobe`、`white_strobe` |选通效果名称指示的颜色。                    |
| `random` |通过选择 R、G 和 B 的随机值来选择随机颜色。


### 自定义效果 - 动作 `flux_led.set_custom_effect`

该集成提供了自定义操作，使您能够将灯光设置为自定义灯光效果。

|数据属性|描述 |
| ---------------------- | ----------- |
| `entity_id` |要设置效果的 LED 灯的实体 ID。 |
| `colors` |要在效果中进行过渡的 RGB 颜色列表。 （最多 16 个，必填）|
| `speed_pct` |效果的速度，以 % 为单位（0-100。默认 50）|
| `transition` |您想要的过渡效果。有效选项为 `gradual`、`jump` 或 `strobe`。 （默认`gradual`）|

```yaml
#Example action
entity_id: light.led_strip
colors:
  - [255,0,0]
  - [0,255,0]
  - [0,0,255]
speed_pct: 80
transition: "jump"
```

### 设置区域 - 操作 `flux_led.set_zones`

可寻址 v3 (0xA3) 型号允许为每个区域设置颜色效果。每个区域的长度是每段的像素数除以颜色数。如果设备已关闭，设置区域将不会将其打开。需要单独调用 `light.turn_on` 才能打开设备。

|数据属性|描述 |
| ---------------------- | ----------- |
| `entity_id` |要设置效果的 LED 灯的实体 ID。 |
| `colors` |每个区域的颜色列表 (RGB)。 （最多 2048 种颜色）|
| `speed_pct` |效果的速度，以 % 为单位（0-100。默认 50）|
| `effect` |你想要的效果。有效选项为 `static`、`running_water`、`strobe`、`jump` 或 `breathing`。 （默认`static`）|

```yaml
#Example action
action: flux_led.set_zones
target:
  entity_id:
    - light.addressable_v3_8e2f7f
    - light.addressable_v3_8ebdeb
data:
  colors:
    - [255, 0, 0]
    - [0, 255, 0]
    - [0, 0, 255]
    - [255, 255, 255]
  speed_pct: 80
```

### 设置音乐模式 - 操作 `flux_led.set_music_mode`

带 MIC (0x08)、Addressable v2 (0xA2) 和 Addressable v3 (0xA3) 型号的 RGB 具有内置麦克风，具有多种音乐模式设置。

|数据属性|描述 |
| ---------------------- | ----------- |
| `entity_id` |要设置效果的 LED 灯的实体 ID。 |
| `sensitivity` |麦克风灵敏度（0-100）|
| `brightness` |灯光亮度（0-100）|
| `light_screen` |二维像素的光屏模式（仅限可寻址型号）|
| `effect` |效果（可寻址型号为 1-16，带 MIC 的 RGB 型号为 0-3）|
| `foreground_color` |前景 RGB 颜色 |
| `background_color` |背景 RGB 颜色（仅限可寻址型号）|

```yaml
#Example action
action: flux_led.set_music_mode
target:
  entity_id:
    - light.addressable_v3_8e2f7f
    - light.addressable_v3_8ebdeb
data:
  sensitivity: 100
  brightness: 100
  effect: 2
  light_screen: false
  background_color: [0, 255, 0]
  foreground_color: [255, 0, 0]
```
