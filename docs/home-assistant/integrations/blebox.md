---
title: BleBox devices
description: 关于如何将 BleBox 设备集成到 Home Assistant 的说明。
ha_category:
  - Cover
ha_release: '0.110'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bbx-a'
  - '@swistakm'
ha_domain: blebox
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - light
  - sensor
  - switch
ha_integration_type: device
ha_zeroconf: true
---

[BleBox](https://blebox.eu/) 生产小型、低功耗、价格实惠且功能丰富的 WiFi 设备，用于无服务器的智能家居自动化。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

为了获得最佳体验，请确保您的 BleBox 设备已安装最新的可用固件。


## BleBox 控制器

### rollerGate

此集成将 Blebox 设备作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置
- 停止

### gateBox

此集成将 Blebox 设备作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开（触发主输出）
- 关闭（触发主输出）
- 停止（触发次输出）
- 大门状态（开、关、未知）

#### 附加功能

- "停止"需要将设备的次触发器设置为停止（通过网站或手机应用程序）。

### gateBox Pro

此集成将 Blebox 设备作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开（触发主输出）
- 关闭（触发主输出）
- 停止（触发次输出）
- 大门状态（开、关、未知）

#### 附加功能

- "停止"需要将设备的次触发器设置为停止（通过网站或手机应用程序）。

### doorBox

此集成将 Blebox 设备作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 门状态（开、关、未知）

### saunaBox

此集成将 Blebox 设备作为气候实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 设置目标温度
- 读取当前温度

### thermoBox

此集成将 Blebox 设备作为气候实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 设置目标温度
- 读取当前温度

#### 附加功能

- 更改运行模式（制冷/制热）需要直接访问设备或通过 wBox 应用程序

### shutterBox

此集成将 Blebox 设备作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置
- 倾斜调节

### shutterBoxDC

此集成将 Blebox 设备作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置
- 倾斜调节

### shutterBox DIN

此集成将 Blebox 设备作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置
- 倾斜调节

### switchBox

此集成将 Blebox 设备作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 能耗测量

### switchBox DIN

此集成将 Blebox 设备作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 能耗测量

### switchBoxD

此集成将 Blebox 设备作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 能耗测量

### switchBoxD DIN

此集成将 Blebox 设备作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 能耗测量

### switchBoxDC

此集成将 Blebox 设备作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭

### switchBox LIGHT

此集成将 Blebox 设备作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭

### switchBoxT PRO

此集成将 Blebox 设备作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭

### dimmerBox

此集成将 Blebox 设备作为灯光实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 亮度

### wLightBox

此集成将 Blebox 设备作为以下实体添加到 Home Assistant：

- 多个 MONO 灯光实体，
- 1 或 2 个 CCT 灯光实体，
- 1 个 RGB 或 RGBW 或 RGBCCT 灯光实体。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度
- 颜色（仅 RGB、RGBW、RGBCCT 模式）
- 色温控制（仅 RGBCCT 和 CCT 模式）
- 效果

#### 附加功能

- 在 wBox 应用程序中可更改控制模式（线性/伽马校正）。
- 在 wBox 应用程序中可更改颜色模式（MONO/CCT）。
- 您可以创建自己的效果。效果创建器在 wBox 应用程序中可用。
- 更改设置后，需要重新加载设备。

### wLightBox PRO

此集成将 Blebox 设备作为以下实体添加到 Home Assistant：

- 多个 MONO 灯光实体，
- 1 或 2 个 CCT 灯光实体，
- 1 个 RGB 或 RGBW 或 RGBCCT 灯光实体。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度
- 颜色（仅 RGB、RGBW、RGBCCT 模式）
- 色温控制（仅 RGBCCT 和 CCT 模式）
- 效果

#### 附加功能

- 在 wBox 应用程序中可更改控制模式（线性/伽马校正）。
- 在 wBox 应用程序中可更改颜色模式（MONO/CCT）。
- 您可以创建自己的效果。效果创建器在 wBox 应用程序中可用。
- 更改设置后，需要重新加载设备。

### wLightBoxS

此集成将 Blebox 设备作为灯光实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度

### dacBoxD DC

此集成将 Blebox 设备作为 2 个 MONO 灯光或 1 个 CCT 灯光实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 亮度/线性百分比控制（取决于设备设置）
- 色温控制（仅 CCT 模式）
- 效果

#### 附加功能

- 在 wBox 应用程序中可更改控制模式（线性/伽马校正）。
- 在 wBox 应用程序中可更改颜色模式（MONO/CCT）。
- 可以创建自己的效果。效果创建器在 wBox 应用程序中可用。
- 更改设置后，需要重新加载设备。

### wLightBoxS PRO

此集成将 Blebox 设备作为灯光实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度

### pixelBox

此集成将 Blebox 设备作为灯光实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度
- 颜色

### tempSensor

此集成将 Blebox 设备作为传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取温度

### tempSensorAC

此集成将 Blebox 设备作为传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取所有探头的温度

### tempSensor PRO

此集成将 Blebox 设备作为传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取所有探头的温度

### floodSensor

此集成将 Blebox 设备作为湿气二值传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取湿气状态为"检测到"或"正常"。

### humiditySensor

此集成将 Blebox 设备作为传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取湿度
- 定期读取温度

### wind&RainSensor

此集成将 Blebox 设备作为传感器和二值传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取当前风速
- 定期读取雨水检测状态

### rainSensor

此集成将 Blebox 设备作为二值传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取雨水检测状态

### airSensor

此集成将 Blebox 设备作为传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取：
  - pm1
  - pm2.5
  - pm10

### windSensor PRO

此集成将 Blebox 设备作为传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取当前风速

### actionBox、actionBoxS 和 proxiBox

此集成不直接支持 actionBox、actionBoxS 和 proxiBox 设备。但是，可以通过 webhook 和 wBox 移动应用程序使用自动化将这些设备与 Home Assistant 集成。

配置包括两个步骤：

- [在 Home Assistant 中生成兼容的 webhook](#generating-the-compatible-webhook-in-home-assistant)
- [在 wBox 应用程序中配置设备](#configuring-the-device-in-the-wbox-app)


#### 在 Home Assistant 中生成兼容的 webhook

1. 前往 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automations/)，在右下角选择 **创建自动化** 按钮。
2. 选择 **Webhook** 作为触发器类型
3. 在 webhook ID 旁边，选择齿轮图标以允许 GET 方法。
4. 点击 webhook ID 旁边的"复制"图标将 webhook URL 复制到剪贴板。
5. 保存 URL 以供以后参考。
6. 如果适用，添加任何所需的条件（*并且如果*部分）和动作（*然后执行*部分）

注意：第二阶段将需要 webhook ID，并且必须输入到 wBox 移动应用程序中。您可以选择使用更方便的文本值。但是，请记住，这是在您的网络中对 webhook 进行身份验证的唯一内容。请像对待密码一样对待此 ID。

#### 在 wBox 应用程序中配置设备

1. 通过添加"发送 URL"类型的动作来配置设备。
2. 输入您在生成 webhook 时复制的 webhook URL。这是动作的 URL 地址。

注意：为了使此集成流程正常工作，webhook URL 主机必须在设备网络内可解析和访问。如有疑问，请参阅[webhook 触发器自动化的一般文档](https://www.home-assistant.io/docs/automation/trigger/#webhook-trigger)。

### luxSensor

此集成将 Blebox 设备作为传感器实体添加到 Home Assistant。

#### 主要支持的功能

- 定期读取照度（单位：lx）

------

## "BleBox inside" 控制器

### Simon 54 GO SHUTTER

此集成将 Simon 54 GO 设备（"blebox inside"）作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置
- 倾斜调节

### Simon 54 GO SWITCH

此集成将 Simon 54 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭

### Simon 54 GO SWITCH D

此集成将 Simon 54 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭

### Simon 54 GO LED 230V (调光器)

此集成将 Simon 54 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 亮度

### Simon 54 GO LED MONO

此集成将 Simon 54 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度
- 颜色

### Simon 54 GO RGBW

此集成将 Simon 54 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度
- 颜色

### Simon 55 GO SHUTTER

此集成将 Simon 55 GO 设备（"blebox inside"）作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置
- 倾斜调节

### Simon 55 GO SWITCH

此集成将 Simon 55 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭

### Simon 55 GO SWITCH D

此集成将 Simon 55 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 亮度

### Simon 55 GO LED 230V (调光器)

此集成将 Simon 55 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 亮度

### Simon 55 GO LED MONO

此集成将 Simon 55 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度
- 颜色

### Simon 55 GO RGBW

此集成将 Simon 55 GO 设备（"blebox inside"）作为开关实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度
- 颜色

### Simon 54 GO Control 和 Simon 55 GO Control

此集成不直接支持 Simon 54 GO Control 和 Simon 55 GO Control 设备。但是，可以通过 webhook 和 wBox 移动应用程序使用自动化将这些设备与 Home Assistant 集成。

配置包括两个步骤：

- [在 Home Assistant 中生成兼容的 webhook](#generating-the-compatible-webhook-in-home-assistant)
- [在 wBox 应用程序中配置设备](#configuring-the-device-in-the-wbox-app)

### FAKRO FTP-V/FTU-V WiFi

此集成将 Fakro 设备（"blebox inside"）作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置

### FAKRO ARF/ARP WiFi

此集成将 Fakro 设备（"blebox inside"）作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置

### FAKRO ARZ/AMZ/VMZ WiFi

此集成将 Fakro 设备（"blebox inside"）作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置

### SABAJ TV K-SMRT-4 - WIFI RJ-45

此集成将 SABAJ 设备（"blebox inside"）作为按钮实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 上
- 下
- 收藏

### Wiśniowski RiCo

此集成将 Wiśniowski 设备（"blebox inside"）作为遮盖实体添加到 Home Assistant。

- 打开（触发主输出）
- 关闭（触发主输出）
- 停止（触发次输出）
- 大门状态（开、关、未知）- 仅 Pro 版本

#### 附加功能

- "停止"需要将设备的次触发器设置为停止（通过网站或手机应用程序）

### Polfendo smartGateControl

此集成将 Polfendo 设备（"blebox inside"）作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 关闭
- 位置
- 停止

### Plast-met SMART LIGHT BOSSPIO

此集成将 Plast-met 设备（"blebox inside"）作为灯光实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度

### Plast-met SMART LIGHT SIMPIO

此集成将 Plast-met 设备（"blebox inside"）作为灯光实体添加到 Home Assistant。

#### 主要支持的功能

- 开启
- 关闭
- 效果
- 亮度

### Tedee 继电器模块

此集成将 Tedee 设备（"blebox inside"）作为遮盖实体添加到 Home Assistant。

#### 主要支持的功能

- 打开
- 门状态（开、关、未知）
