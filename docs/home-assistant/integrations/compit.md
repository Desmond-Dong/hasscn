---
title: Compit
description: 关于如何在 Home Assistant 中集成 Compit 设备的说明。
ha_category:
  - Climate
  - Water Heater
ha_release: '2025.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Przemko92'
ha_domain: compit
ha_platforms:
  - binary_sensor
  - climate
  - fan
  - number
  - select
  - sensor
  - water_heater
ha_integration_type: hub
ha_quality_scale: bronze
---

**Compit** 集成允许您将空调、通风和供暖控制器与 Home Assistant 集成。您需要一个 Compit iNext 账户，可以在 [inext.compit.pl](https://inext.compit.pl) 设置。

## 前提条件

1. 在 [inext.compit.pl](https://inext.compit.pl) 创建账户。
2. 在您的账户中配置 Compit 设备。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Username:
    description: "您的 Compit iNext 账户用户名。"
Password:
    description: "您的 Compit iNext 账户密码。"
```

## 支持的设备

此集成支持 Compit 大多数型号的恒温器、控制器和传感器。

### 恒温器

- [Nano Color](https://compit.pl/produkty/termostaty-pokojowe/8-termostat-pokojowy-nano-color.html?ic=1) – 房间恒温器
- [Nano Color 2](https://compit.pl/produkty/termostaty-pokojowe/88-termostat-pokojowy-nano-color-2.html?ic=1) – 房间恒温器
- [Nano One](https://compit.pl/produkty/termostaty-pokojowe/24-termostat-pokojowy-nano-one.html?ic=1) – 房间恒温器

### 控制器

- [AF-1](https://compit.pl/produkty/osprzet/91-af-1.html?ic=1) – 防冻系统
- [BioMax742](https://compit.pl/dokumenty-do-pobrania/sterowniki-do-kot%C5%82%C3%B2w-dokumenty-do-pobrania/category/50-sterownik-kot%C5%82a-pelletowego-biomax-742.html?download=90:sterownik-kot%C5%82a-pelletowego-biomax-742-wersja-u7) – 颗粒锅炉控制器
- [BioMax775](https://compit.pl/dokumenty-do-pobrania/sterowniki-do-kot%C5%82%C3%B3w-dokumenty-do-pobrania/category/126-sterownik-kotla-pelletowego-biomax-775.html?download=313:sterownik-kotla-pelletowego-biomax-775-wersja-7), BioMax772 – 颗粒锅炉控制器
- [BWC310](https://compit.pl/produkty/sterowniki-ogrzewania-podlogowego/40-sterownik-ogrzewania-podlogowego-l2.html?ic=1) – 混水阀控制器
- [COMBO](https://compit.pl/produkty/osprzet/92-combo.html?ic=1) – Combo 模块
- [EL750](https://compit.pl/produkty/sterowniki-do-kotlow/73-sterownik-kotla-elektrycznego-el750-1.html?ic=1) – 电锅炉控制器
- [L2](https://compit.pl/produkty/sterowniki-ogrzewania-podlogowego/40-sterownik-ogrzewania-podlogowego-l2.html?ic=1) – 地暖控制器
- [R350.CWU](https://compit.pl/produkty/sterowniki-uniwerslane/78-sterownik-do-podgrzewania-wody-r350-cwu.html?ic=1) – 通用控制器
- [R350 T3](https://compit.pl/produkty/sterowniki-instalacji/42-dwustopniowy-sterownik-temperatury-regulator-pi-regulator-krokowy-sterowanie-3-punktowe-r350-07.html?ic=1) – 通用控制器
- [R350.M](https://compit.pl/produkty/sterowniki-uniwerslane/85-pogodowy-regulator-temperatury-obiegu-grzewczego-z-mieszaczem-r350m.html?ic=1) – 通用控制器
- [R377B](https://compit.pl/produkty/sterowniki-pomp-ciepla/86-sterownik-kaskady-pomp-ciepla-r377-wersja-2.html) – 热泵级联控制器
- [R470](https://compit.pl/produkty/sterowniki-pomp-ciepla/10-sterownik-pompy-ciepla-r470-one.html?ic=1), R480 – 热泵控制器
- [R490](https://compit.pl/produkty/sterowniki-pomp-ciepla/12-sterownik-pompy-ciepla-R490-one.html?ic=1) – 热泵控制器
- [R770RS](https://compit.pl/produkty/sterowniki-do-kotlow/83-pogodowy-regulator-kotla-retortowego-i-instalacji-grzewczej-r771-2.html?ic=1), [R771RS](https://compit.pl/produkty/sterowniki-do-kotlow/83-pogodowy-regulator-kotla-retortowego-i-instalacji-grzewczej-r771-2.html?ic=1) – 锅炉控制器
- [R810](https://compit.pl/produkty/sterowniki-instalacji/43-pogodowy-regulator-temperatury-obiegu-grzewczego-r810.html?ic=1) – 供暖回路控制器
- [R900](https://compit.pl/produkty/sterowniki-pomp-ciepla/89-r900.html?ic=1) – 热泵控制器
- [SolarComp951](https://compit.pl/produkty/regulatory-solarne/22-sterownik-ukladu-solarnego-solarcomp-951.html) – 太阳能系统控制器
- [SolarComp971](https://compit.pl/produkty/regulatory-solarne/23-sterownik-ukladu-solarnego-z-pwm-solarcomp-971.html) – 太阳能系统控制器
- [SolarComp971C](https://compit.pl/produkty/regulatory-solarne/70-sterownik-ukladu-solarnego-z-pwm-solarcomp-971c.html) – 太阳能系统控制器

### 传感器

- [SHC](https://compit.pl/produkty/osprzet/67-czujnik-stezenia-dwutlenku-wegla-wilgotnosci-i-temperatury-w-pomieszczeniach-shc.html?ic=1) – CO₂、湿度和温度传感器
- [SPM](https://compit.pl/produkty/osprzet/87-czujnik-jakosci-powietrza-spm.html?ic=1) – 空气质量传感器

:::note
当 SPM 传感器连接到 Nano Color 恒温器时，在 Home Assistant 中显示为 `SPM - Nano Color`。当连接到 Nano Color 2 恒温器时，显示为 `SPM - Nano Color 2`。

:::
## 支持的功能

**Compit** 集成提供以下实体。

### 传感器

集成根据您的设备型号提供各种传感器。以下是可用传感器及其支持设备的完整列表。

:::note
当 SPM 传感器连接到 Nano Color 恒温器时，在 Home Assistant 中显示为 `SPM - Nano Color`。当连接到 Nano Color 2 恒温器时，显示为 `SPM - Nano Color 2`。

:::
#### 温度传感器

- **室外温度**
  - **描述**：当前室外温度。
  - **支持的设备**：
    - R810（供暖回路控制器）
    - R350 T3（通用控制器）
    - Nano Color（房间恒温器）
    - CO2 SHC（CO₂、湿度和温度传感器）
    - R470（热泵控制器）
    - BioMax742（颗粒锅炉控制器）
    - R350.CWU（通用控制器）
    - BioMax772（颗粒锅炉控制器）
    - R770RS / R771RS（锅炉控制器）
    - BioMax775（颗粒锅炉控制器）
    - R350.M（通用控制器）
    - Nano Color 2（房间恒温器）
    - R900（热泵控制器）
    - SPM（空气质量传感器）
    - AF-1（防冻系统）

- **锅炉温度**
  - **描述**：锅炉当前温度。
  - **支持的设备**：
    - BioMax742（颗粒锅炉控制器）
    - BioMax772（颗粒锅炉控制器）
    - R770RS / R771RS（锅炉控制器）
    - BioMax775（颗粒锅炉控制器）
    - EL750（电锅炉控制器）

- **计算供暖温度**
  - **描述**：计算的目标供暖温度。
  - **支持的设备**：R810（供暖回路控制器）、BWC310（混水阀控制器）

- **目标供暖温度**
  - **描述**：目标供暖温度设置。
  - **支持的设备**：R810（供暖回路控制器）、BWC310（混水阀控制器）

- **回水温度**
  - **描述**：回水温度。
  - **支持的设备**：R810（供暖回路控制器）、AF-1（防冻系统）

- **计算目标温度**
  - **描述**：系统计算的目标温度。
  - **支持的设备**：R350 T3（通用控制器）、R350.CWU（通用控制器）

- **回路目标温度**
  - **描述**：供暖回路目标温度。
  - **支持的设备**：R350 T3（通用控制器）

- **混水器温度**
  - **描述**：混水阀处温度。
  - **支持的设备**：R350 T3（通用控制器）、R350.M（通用控制器）

- **区域 1 混水器温度**
  - **描述**：区域 1 混水器温度。
  - **支持的设备**：R770RS / R771RS（锅炉控制器）

- **区域 2 混水器温度**
  - **描述**：区域 2 混水器温度。
  - **支持的设备**：R770RS / R771RS（锅炉控制器）

- **集热器温度**
  - **描述**：太阳能集热器温度。
  - **支持的设备**：
    - SolarComp 951（太阳能系统控制器）
    - SolarComp971（太阳能系统控制器）
    - SolarComp971C（太阳能系统控制器）

- **水箱温度 T2（底部）**
  - **描述**：水箱底部温度（传感器 T2）。
  - **支持的设备**：
    - SolarComp 951（太阳能系统控制器）
    - SolarComp971（太阳能系统控制器）
    - SolarComp971C（太阳能系统控制器）

- **水箱温度 T3（顶部）**
  - **描述**：水箱顶部温度（传感器 T3）。
  - **支持的设备**：
    - SolarComp 951（太阳能系统控制器）
    - SolarComp971（太阳能系统控制器）
    - SolarComp971C（太阳能系统控制器）

- **水箱温度 T4**
  - **描述**：传感器 T4 位置温度。
  - **支持的设备**：SolarComp 951（太阳能系统控制器）

- **生活热水温度**
  - **描述**：生活热水温度。
  - **支持的设备**：EL750（电锅炉控制器）

- **生活热水测量温度**
  - **描述**：测量的生活热水温度。
  - **支持的设备**：R350.CWU（通用控制器）、R480（热泵控制器）

- **缓冲回水温度**
  - **描述**：缓冲回水温度。
  - **支持的设备**：EL750（电锅炉控制器）

- **低位热源温度**
  - **描述**：低位热源温度。
  - **支持的设备**：R490（热泵控制器）

- **高位热源温度**
  - **描述**：高位热源温度。
  - **支持的设备**：R490（热泵控制器）

- **实际缓冲温度**
  - **描述**：当前缓冲温度。
  - **支持的设备**：R480（热泵控制器）、R900（热泵控制器）

- **实际生活热水温度**
  - **描述**：当前生活热水温度。
  - **支持的设备**：R480（热泵控制器）、R900（热泵控制器）

- **保护温度**
  - **描述**：保护温度传感器读数。
  - **支持的设备**：R350.M（通用控制器）

- **缓冲设定温度**
  - **描述**：缓冲温度设定点。
  - **支持的设备**：R377B（控制器）

- **区域 1 实际供暖回路温度**
  - **描述**：供暖回路区域 1 当前温度。
  - **支持的设备**：R900（热泵控制器）

- **区域 2 实际供暖回路温度**
  - **描述**：供暖回路区域 2 当前温度。
  - **支持的设备**：R900（热泵控制器）

- **区域 3 实际供暖回路温度**
  - **描述**：供暖回路区域 3 当前温度。
  - **支持的设备**：R900（热泵控制器）

- **区域 4 实际供暖回路温度**
  - **描述**：供暖回路区域 4 当前温度。
  - **支持的设备**：R900（热泵控制器）

- **实际高位热源温度**
  - **描述**：当前高位热源温度。
  - **支持的设备**：R900（热泵控制器）

- **计算缓冲温度**
  - **描述**：计算的缓冲温度。
  - **支持的设备**：R900（热泵控制器）

- **计算生活热水温度**
  - **描述**：计算的生活热水温度。
  - **支持的设备**：R900（热泵控制器）

- **计算高位热源温度**
  - **描述**：计算的高位热源温度。
  - **支持的设备**：R900（热泵控制器）

- **区域 1 供暖目标温度**
  - **描述**：区域 1 目标供暖温度。
  - **支持的设备**：R900（热泵控制器）

- **区域 2 供暖目标温度**
  - **描述**：区域 2 目标供暖温度。
  - **支持的设备**：R900（热泵控制器）

- **区域 3 供暖目标温度**
  - **描述**：区域 3 目标供暖温度。
  - **支持的设备**：R900（热泵控制器）

- **区域 4 供暖目标温度**
  - **描述**：区域 4 目标供暖温度。
  - **支持的设备**：R900（热泵控制器）

#### 空气质量传感器

- **PM2.5 等级**
  - **描述**：PM2.5 颗粒物状态等级（正常、警告、超标）。
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）

- **PM10 等级**
  - **描述**：PM10 颗粒物状态等级（正常、警告、超标）。
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）

- **PM2.5 测量值**
  - **描述**：PM2.5 颗粒物浓度（µg/m³）。
  - **支持的设备**：SPM（空气质量传感器）

- **PM10 测量值**
  - **描述**：PM10 颗粒物浓度（µg/m³）。
  - **支持的设备**：SPM（空气质量传感器）

- **PM1 等级测量值**
  - **描述**：PM1 颗粒物浓度（µg/m³）。
  - **支持的设备**：SPM - Nano Color 2（连接到 Nano Color 2 的空气质量传感器）

- **PM4 等级测量值**
  - **描述**：PM4 颗粒物浓度（µg/m³）。
  - **支持的设备**：SPM - Nano Color 2（连接到 Nano Color 2 的空气质量传感器）

- **CO₂ 等级**
  - **描述**：二氧化碳浓度（ppm）。
  - **支持的设备**：SPM - Nano Color 2（连接到 Nano Color 2 的空气质量传感器）

- **CO₂ 百分比**
  - **描述**：二氧化碳百分比。
  - **支持的设备**：SPM - Nano Color 2（连接到 Nano Color 2 的空气质量传感器）

#### 湿度传感器

- **湿度**
  - **描述**：相对湿度（%）。
  - **支持的设备**：SHC（CO₂、湿度和温度传感器）、SPM（空气质量传感器）

#### 功率和能源传感器

- **集热器功率**
  - **描述**：太阳能集热器当前功率输出（kW）。
  - **支持的设备**：
    - SolarComp 951（太阳能系统控制器）
    - SolarComp971（太阳能系统控制器）
    - SolarComp971C（太阳能系统控制器）

- **今日能源**
  - **描述**：今日收集的能源（kWh）。
  - **支持的设备**：SolarComp971（太阳能系统控制器）、SolarComp971C（太阳能系统控制器）

- **能源消耗**
  - **描述**：当前能源消耗（MW）。
  - **支持的设备**：SolarComp 971SD1（太阳能系统控制器）

- **总能源**
  - **描述**：总消耗能源（kWh）。
  - **支持的设备**：R350.CWU（通用控制器）

- **昨日能源**
  - **描述**：昨日消耗能源（kWh）。
  - **支持的设备**：R350.CWU（通用控制器）

- **昨日智能电网能源**
  - **描述**：昨日通过智能电网消耗的能源（kWh）。
  - **支持的设备**：R350.CWU（通用控制器）

#### 燃料和电池传感器

- **燃料液位**
  - **描述**：当前燃料液位（%）。
  - **支持的设备**：
    - BioMax742（颗粒锅炉控制器）
    - BioMax772（颗粒锅炉控制器）
    - BioMax775（颗粒锅炉控制器）
    - R770RS（锅炉控制器）
    - R771RS（锅炉控制器）

- **电池电量**
  - **描述**：电池电量（%）。
  - **支持的设备**：AF-1（防冻系统）

- **充电功率**
  - **描述**：电池充电电流（mA）。
  - **支持的设备**：AF-1（防冻系统）

#### 诊断传感器

- **通风报警**
  - **描述**：通风系统报警状态。
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）

- **通风档位**
  - **描述**：当前通风档位设置。
  - **支持的设备**：Nano Color 2（房间恒温器）

- **报警代码**
  - **描述**：系统报警代码。
  - **支持的设备**：AF-1（防冻系统）

- **PK1 功能**
  - **描述**：PK1 功能模式状态。
  - **支持的设备**：Combo（Combo 模块）

:::note
可用传感器取决于您的具体 Compit 设备配置。并非所有设备都有所有传感器。

:::
### 二值传感器

- **通风中**
  - **描述**：指示窗户是否打开进行通风。
  - **支持的设备**：Nano Color 2（房间恒温器）

- **电池充电中**
  - **描述**：指示电池是否正在充电。
  - **支持的设备**：AF-1（防冻系统）

- **CO₂ 警报**
  - **描述**：指示 CO₂ 水平是否超过阈值。
  - **支持的设备**：SPM - Nano Color 2（连接到 Nano Color 2 的空气质量传感器）

- **CO₂ 等级**
  - **描述**：指示 CO₂ 水平是否有问题。
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）、SPM（空气质量传感器）、SHC（CO₂、湿度和温度传感器）

- **粉尘警报**
  - **描述**：指示粉尘水平是否超过阈值。
  - **支持的设备**：SPM - Nano Color 2（连接到 Nano Color 2 的空气质量传感器）

- **有电池**
  - **描述**：指示设备是否安装了电池。
  - **支持的设备**：AF-1（防冻系统）

- **有外部电源**
  - **描述**：指示设备是否连接外部电源。
  - **支持的设备**：AF-1（防冻系统）

- **泵状态**
  - **描述**：指示泵是否正在运行。
  - **支持的设备**：AF-1（防冻系统）

- **温度警报**
  - **描述**：指示温度是否超过阈值。
  - **支持的设备**：SPM - Nano Color 2（连接到 Nano Color 2 的空气质量传感器）

二值传感器提供 Compit 设备的状态信息。

### 气候

气候实体反映当前供暖或制冷状态以及**活动**目标温度。当您想临时或在当前会话中更改目标温度时使用气候实体（例如，晚上调高暖气）。气候实体是您设置设备当前目标温度的地方。

### 风扇

- **通风**
  - **描述**：控制通风风扇。您可以打开或关闭风扇并设置速度。
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）。
  - **备注**：风扇有 5 个速度级别，在 Home Assistant 中以百分比显示。

### 数字

数字实体让您设置**默认**温度设定点和其他配置值。这些是每种操作模式（如舒适、节能或假期）使用的预设目标温度。它们不用于临时或一次性更改；对于这些，请改用气候实体。

- **舒适目标温度**
  - **描述**：舒适模式目标室温。
  - **范围**：0–40 °C
  - **支持的设备**：Nano One（房间恒温器）、Nano Color（房间恒温器）、Nano Color 2（房间恒温器）

- **节能目标温度**
  - **描述**：节能模式目标室温。
  - **范围**：0–40 °C
  - **支持的设备**：Nano One（房间恒温器）

- **假期目标温度**
  - **描述**：度假期间目标室温。
  - **范围**：0–40 °C
  - **支持的设备**：Nano One（房间恒温器）

- **冬季节能目标温度**
  - **描述**：冬季季节节能模式目标室温。
  - **范围**：0–40 °C
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）

- **制冷节能目标温度**
  - **描述**：制冷期间节能模式目标室温。
  - **范围**：0–40 °C
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）

- **外出目标温度**
  - **描述**：无人在家时目标室温。
  - **范围**：0–40 °C
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）

- **恒定目标温度**
  - **描述**：供暖回路恒定目标温度。
  - **范围**：0–95 °C
  - **支持的设备**：R810（供暖回路控制器）

- **供暖恒定目标温度**
  - **描述**：热泵供暖回路恒定目标温度。
  - **范围**：0–95 °C
  - **支持的设备**：R470（热泵控制器）

- **混水器目标温度**
  - **描述**：混水阀回路目标温度。
  - **范围**：0–90 °C
  - **支持的设备**：R350.M（通用控制器）

- **区域 1 混水器目标温度**
  - **描述**：区域 1 混水阀回路目标温度。
  - **范围**：0–95 °C
  - **支持的设备**：R770RS（锅炉控制器）、R771RS（锅炉控制器）

- **区域 2 混水器目标温度**
  - **描述**：区域 2 混水阀回路目标温度。
  - **范围**：0–95 °C
  - **支持的设备**：R770RS（锅炉控制器）、R771RS（锅炉控制器）

- **锅炉目标温度**
  - **描述**：锅炉目标温度。
  - **范围**：0–95 °C
  - **支持的设备**：BioMax742（颗粒锅炉控制器）、EL750（电锅炉控制器）

- **锅炉恒定目标温度**
  - **描述**：锅炉恒定目标温度。
  - **范围**：0–90 °C
  - **支持的设备**：BioMax742（颗粒锅炉控制器）、BioMax772（颗粒锅炉控制器）、BioMax775（颗粒锅炉控制器）

### 选择

- **语言**
  - **描述**：设备界面语言。
  - **选项**：Polish、English
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）、Nano One（房间恒温器）

- **Aero by pass**
  - **描述**：通风系统旁路模式。
  - **选项**：Off、Auto、On
  - **支持的设备**：Nano Color（房间恒温器）、Nano Color 2（房间恒温器）

- **Nano 工作模式**
  - **描述**：恒温器操作模式。
  - **选项**：Manual 3、Manual 2、Manual 1、Manual 0、Schedule、Christmas、Out of home
  - **支持的设备**：Nano One（房间恒温器）

- **操作模式**
  - **描述**：设备主要操作模式。
  - **选项**：Disabled、Eco、Hybrid（适用于 R900、R490、R480）；Disabled、Auto、Eco（适用于 R470）
  - **支持的设备**：R900（热泵控制器）、R490（热泵控制器）、R470（热泵控制器）、R480（热泵控制器）

- **工作模式**
  - **描述**：季节性操作模式。
  - **选项**：Winter、Summer、Cooling
  - **支持的设备**：R490（热泵控制器）

- **供暖修正源**
  - **描述**：供暖温度修正源。
  - **选项**：No corrections、Schedule、Thermostat、Nano nr 1、Nano nr 2、Nano nr 3、Nano nr 4、Nano nr 5
  - **支持的设备**：R470（热泵控制器）、BioMax742（颗粒锅炉控制器）

- **SolarComp 操作模式**
  - **描述**：太阳能控制器操作模式。
  - **选项**：Auto、De-icing、Holiday、Disabled
  - **支持的设备**：SolarComp951（太阳能系统控制器）、SolarComp971（太阳能系统控制器）和 SolarComp971C（太阳能系统控制器）

- **区域 1 混水器模式**
  - **描述**：区域 1 混水阀操作模式。
  - **选项**：Disabled、Without thermostat、Schedule、Thermostat、Nano nr 1、Nano nr 2、Nano nr 3、Nano nr 4、Nano nr 5
  - **支持的设备**：BioMax775（颗粒锅炉控制器）、BioMax772（颗粒锅炉控制器）

- **区域 2 混水器模式**
  - **描述**：区域 2 混水阀操作模式。
  - **选项**：Disabled、Without thermostat、Schedule、Thermostat、Nano nr 1、Nano nr 2、Nano nr 3、Nano nr 4、Nano nr 5
  - **支持的设备**：BioMax775（颗粒锅炉控制器）、BioMax772（颗粒锅炉控制器）

- **混水器模式**
  - **描述**：混水阀操作模式。
  - **选项**：No corrections、Schedule、Thermostat、Nano nr 1、Nano nr 2、Nano nr 3、Nano nr 4、Nano nr 5
  - **支持的设备**：R350 T3（通用控制器）、BioMax742（颗粒锅炉控制器）

- **生活热水循环**
  - **描述**：生活热水循环模式。
  - **选项**：Disabled、Constant、Schedule
  - **支持的设备**：BioMax775（颗粒锅炉控制器）、BioMax742（颗粒锅炉控制器）、BioMax772（颗粒锅炉控制器）

- **缓冲模式**
  - **描述**：缓冲水箱操作模式。
  - **选项**：Schedule、Manual、Disabled
  - **支持的设备**：R480（热泵控制器）

### 热水器

- **热水器**
  - **描述**：控制生活热水参数。
  - **支持的设备**：BioMax742、BioMax772、BioMax775、EL750、R350.CWU、R377B、R470、R480、R490、R770RS、R771RS、R900、SolarComp951、SolarComp971、SolarComp971C
  - **备注**：
    - 太阳能控制器和 R350.CWU 仅支持设置目标温度。
    - 其他设备还支持开/关和操作模式。
      - 状态 `off` 对应 Compit 中的 `off`
      - 状态 `performance` 对应 Compit 中的 `on`
      - 状态 `eco` 对应 Compit 中的 `schedule`
    - 太阳能控制器不支持当前温度属性。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.