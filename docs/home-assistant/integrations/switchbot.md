---
title: SwitchBot Bluetooth
description: 'SwitchBot Bluetooth 集成可让你控制 SwitchBot devices(https://www.switch-bot.com/) 设备，例如传感器、门锁、窗帘、灯具、插座、扫地机器人和 Hub 等。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Fan
  - Humidifier
  - Light
  - Lock
  - Select
  - Sensor
  - Switch
  - Vacuum
ha_release: 0.78
ha_iot_class: Local Push
ha_codeowners:
  - '@danielhiversen'
  - '@RenierM26'
  - '@murtas'
  - '@Eloston'
  - '@dsypniewski'
  - '@zerzhang'
ha_domain: switchbot
works_with:
  - bluetooth
ha_bluetooth: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - fan
  - humidifier
  - light
  - lock
  - select
  - sensor
  - switch
  - vacuum
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: gold
---
# SwitchBot Bluetooth

**SwitchBot Bluetooth** 集成可让你控制 SwitchBot [devices](https://www.switch-bot.com/) 设备，例如传感器、门锁、窗帘、灯具、插座、扫地机器人和 Hub 等。

## 你可以如何使用此集成

SwitchBot 集成可以实现很多操作，例如开关设备、切换设备模式、在 Home Assistant 仪表板中监控传感器数据和能耗，以及手动或通过自动化控制设备配置。

## 前提条件

要使用此集成，运行 Home Assistant 的设备上必须已正确设置并可用 [Bluetooth](/home-assistant/integrations/bluetooth)。此集成不要求必须配备 [SwitchBot Hub](https://switch-bot.com/pages/switchbot-hub-mini)。

如果你有多个相同类型的设备，需要获取设备的 BTLE MAC 地址来区分它们。可按以下步骤查看：

1. 打开 SwitchBot 应用。
2. 打开设备设置。
3. 点击 “Device Info”。
4. 记下设备的 BTLE MAC 地址。

请注意，在 SwitchBot 应用中配置的设备名称不会同步到 Home Assistant。

某些 SwitchBot 设备需要先在应用中完成配置后，才能由 Home Assistant 控制，例如校准窗帘开合限位，或将两个窗帘配对联动。

### 添加模式

在通过蓝牙添加 SwitchBot 设备前，请先确认你的蓝牙适配器在 Bluetooth 集成配置中处于 **Active** 还是 **Passive** 模式。

- 若要打开 Bluetooth 集成设置，请前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，选择 **集成**，找到并打开 **Bluetooth** 集成以检查适配器模式。

- 主动模式
  - 设备通常会被自动发现。
  - 如果设备未被自动发现：
    - 对于带物理按键的设备，请长按按键进入配对模式。
    - 对于没有按键的设备，请断电重启设备以触发配对模式。
    - 若仍无法发现设备，可尝试打开 **SwitchBot** 集成并登录，从你的 SwitchBot 账户同步设备。

- 被动模式
  - 无法通过本地蓝牙扫描发现设备，必须通过你的 SwitchBot 账户进行同步。
  - 若要从账户同步设备，请前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，打开 **集成**，选择 **SwitchBot**，点击该集成打开登录窗口并登录。如果本地蓝牙扫描检测到与你 SwitchBot 账户关联且在范围内的设备，登录后即可添加它们。

如果仍无法添加设备，请确认设备已通电、在蓝牙覆盖范围内，且未连接到其他应用。必要时，请按照厂商提供的重置说明操作，或联系 SwitchBot 支持。

### 添加加密的 SwitchBot 设备

部分 SwitchBot 设备类型为提升安全性采用了加密，未来还会有更多类型和型号加入加密设备范围。

加密的 SwitchBot 设备可通过两种方式在 Home Assistant 中设置。
你可以手动输入 key ID 和加密密钥，也可以让 Home Assistant 从你的 SwitchBot 账户中导入。

#### SwitchBot 账户（推荐）

使用此选项时，你可以提供 SwitchBot 账户登录凭据，Home Assistant 会从你的账户中导入对应的加密密钥。

```yaml
Username:
  description: SwitchBot account username
Password:
  description: SwitchBot account password
```

:::important
此集成不支持 SSO 账户（例如使用 Google 登录），仅支持用户名和密码账户。

:::
#### 手动输入门锁加密密钥

此选项适合希望自行获取加密密钥，和/或希望明确了解其账户凭据具体使用位置与方式的用户。

```yaml
Key ID:
  description: Locks' encryption key ID
Encryption key:
  description: Locks' encryption key
```

关于如何获取加密密钥，请参阅 [PySwitchbot](https://github.com/Danielhiversen/pySwitchbot#obtaining-locks-encryption-key) 项目的 README。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的设备

### 插座与开关

- [Bot (WoHand)](https://switch-bot.com/pages/switchbot-bot)
- [Plug Mini (WoPlug)](https://www.switch-bot.com/products/switchbot-plug-mini)
- [Plug Mini (HomeKit Enabled)](https://www.switch-bot.com/products/switchbot-plug-mini-homekit-enabled)
- [Relay Switch 1](https://www.switch-bot.com/products/switchbot-relay-switch-1)
- [Relay Switch 1PM](https://www.switch-bot.com/products/switchbot-relay-switch-1pm)
- [Plug Mini EU](https://www.switch-bot.com/products/switchbot-plug-mini-eu)
- [Relay Switch 2PM](https://www.switch-bot.com/products/switchbot-relay-switch-2pm)

### 窗帘与遮阳

- [Curtain (WoCurtain)](https://switch-bot.com/pages/switchbot-curtain) (version 1 & 2)
- [Curtain 3 (WoCtn3)](https://switch-bot.com/pages/switchbot-curtain-3)
- [Blind Tilt (WoBlindTilt)](https://switch-bot.com/pages/switchbot-blind-tilt)
- [Roller Shade](https://www.switch-bot.com/products/switchbot-roller-shade)
- [Garage Door Opener](https://www.switch-bot.com/products/switchbot-garage-door-opener)

### 灯光

- [Color Bulb (WoBulb)](https://switch-bot.com/pages/switchbot-color-bulb)
- [Light Strip (WoStrip)](https://www.switchbot.jp/products/switchbot-strip-light)
- [Smart Ceiling Light (WoCeiling)](https://www.switchbot.jp/products/switchbot-ceiling-light)
- [Strip Light 3](https://www.switch-bot.com/products/switchbot-led-strip-light-3)
- [Floor Lamp](https://www.switch-bot.com/products/switchbot-floor-lamp)
- [RGBICWW Strip Light](https://www.switch-bot.com/products/switchbot-rgbicww-strip-light)
- [RGBICWW Floor Lamp](https://www.switch-bot.com/products/switchbot-rgbicww-floor-lamp)

### 门锁

- [Lock (WoLock)](https://switch-bot.com/pages/switchbot-lock)
- [Lock Pro (WoLockPro)](https://www.switch-bot.com/pages/switchbot-lock-pro)
- [Lock Ultra (WoLockUltra)](https://www.switch-bot.com/products/switchbot-lock-ultra)
- [Lock Lite (WoLockLite)](https://www.switchbot.jp/products/switchbot-lock-lite)

### 加湿器

- [Humidifier (WoHumi)](https://www.switchbot.jp/products/switchbot-smart-humidifier)
- [Evaporative Humidifier](https://www.switch-bot.com/products/switchbot-evaporative-humidifier-auto-refill)

### 传感器

- [Meter](https://switch-bot.com/pages/switchbot-meter)
- [Meter Plus (WoSensorTH)](https://switch-bot.com/pages/switchbot-meter-plus)
- [Indoor/Outdoor Meter (WoIOSensorTH)](https://switch-bot.com/pages/switchbot-indoor-outdoor-thermo-hygrometer) 
- [Meter Pro](https://www.switch-bot.com/products/switchbot-meter-pro)
- [Meter Pro CO2 Monitor](https://www.switch-bot.com/products/switchbot-meter-pro-co2-monitor)
- [Contact Sensor (WoContact)](https://switch-bot.com/pages/switchbot-contact-sensor)
- [Motion Sensor (WoPresence)](https://switch-bot.com/pages/switchbot-motion-sensor)
- [Water Leak Detector](https://www.switch-bot.com/products/switchbot-water-leak-detector)
- [Remote (WoRemote)](https://www.switch-bot.com/products/switchbot-remote) (currently only supports battery level monitoring)
- [Climate Panel](https://www.switch-bot.com/products/switchbot-home-climate-panel) (currently only supports retrieving sensor data, does not yet support device control)
- [Presence Sensor](https://www.switch-bot.com/products/switchbot-presence-sensor)

### Hub

- [Hub 2 (WoHub2)](https://switch-bot.com/pages/switchbot-hub-2) (currently only supports retrieving sensor data, does not yet support device control)
- [Hub Mini Matter Enabled](https://www.switch-bot.com/products/switchbot-hub-mini-matter-enabled)(currently only supports retrieving sensor data, does not yet support device control)
- [Hub 3 (WoHub3)](https://www.switch-bot.com/products/switchbot-hub-3)(currently only supports retrieving sensor data, does not yet support device control)

### 风扇

- [Circulator Fan](https://www.switch-bot.com/products/switchbot-battery-circulator-fan)

### 吸尘器
- [K10+](https://www.switch-bot.com/products/switchbot-mini-robot-vacuum-k10)
- [K10+ Pro](https://www.switch-bot.com/products/switchbot-mini-robot-vacuum-k10-pro)
- [K10+ Pro Combo](https://www.switch-bot.com/products/switchbot-k10-pro-combo)
- [K11+](https://www.switch-bot.com/products/switchbot-robot-vacuum-k11)
- [K20](https://www.switchbot.jp/products/switchbot-robot-vacuum-cleaner-k20-pro)
- [S10](https://www.switch-bot.com/products/switchbot-floor-cleaning-robot-s10)
- [S20](https://www.switch-bot.com/products/switchbot-floor-cleaning-robot-s20)

### 空气净化器

- [Air Purifier](https://www.switch-bot.com/products/switchbot-air-purifier)
- [Air Purifier Table](https://www.switch-bot.com/products/switchbot-air-purifier-table)

### 气候设备

- [Smart Radiator Thermostat](https://www.switch-bot.com/products/switchbot-smart-radiator-thermostat)

### 按钮

- [Art Frame](https://www.switch-bot.com/products/switchbot-ai-art-frame)

### Keypad Vision

- [Keypad Vision](https://www.switch-bot.com/products/switchbot-keypad-vision)
- [Keypad Vision Pro](https://www.switch-bot.com/products/switchbot-keypad-vision-pro)

## Works with Home Assistant 认证

SwitchBot 致力于确保其产品保持最新状态，并能在 Home Assistant 中良好使用。
这些设备已获得 Bluetooth 和 Matter 双重认证。

以下设备已通过 Bluetooth 认证：
- [SwitchBot Lock Ultra](https://www.switch-bot.com/products/switchbot-lock-ultra)
- [SwitchBot Air Purifier](https://www.switch-bot.com/products/switchbot-air-purifier)
- [SwitchBot Air Purifier Table](https://www.switch-bot.com/products/switchbot-air-purifier-table)
- [SwitchBot Leak Detector](https://www.switch-bot.com/products/switchbot-water-leak-detector)
- [SwitchBot Meter](https://www.switch-bot.com/products/switchbot-meter)
- [SwitchBot Meter Pro](https://www.switch-bot.com/products/switchbot-meter-pro)
- [SwitchBot Meter Pro CO2](https://www.switch-bot.com/products/switchbot-meter-pro-co2-monitor)
- [SwitchBot Indoor/Outdoor Thermo-Hygrometer](https://www.switch-bot.com/products/switchbot-indoor-outdoor-thermo-hygrometer)
- [SwitchBot Curtain 3](https://www.switch-bot.com/products/switchbot-curtain-3)
- [SwitchBot Contact Sensor](https://www.switch-bot.com/products/contact-sensor)
- [SwitchBot Roller Shade](https://www.switch-bot.com/products/switchbot-roller-shade)
- [SwitchBot Lock Pro](https://www.switch-bot.com/products/switchbot-lock-pro)

如需查看通过 SwitchBot Matter 认证的设备列表，请访问 [SwitchBot Matter](/home-assistant/integrations/switchbot_matter/) 页面。

## 支持的功能

### 通用

#### 选项
- `Retry count`：向 SwitchBot 设备发送命令时的重试次数。

#### 属性
- `last_run_success`：若上一次发送给 SwitchBot 的操作成功，则返回 `true`。当蓝牙连接偶发不稳定时，这个属性有助于排查错误。若为 `false`，请查看 [Home Assistant 日志](/home-assistant/integrations/logger/#viewing-logs) 了解具体错误信息。

### 插座与开关

Bot、Plug Mini 和 Relay Switch 会添加为 switch 实体。

#### Bot

密码保护：你可以在 SwitchBot 应用中为设备设置密码，以防附近的人控制你的设备。设置密码后，必须输入正确密码才能将其添加到集成中。

功能：

- 开启或关闭
- 按压
- 获取电池电量

属性：
- `Switch mode`：指定设备模式。若为 `true`，设备处于适用于拨动开关的拉动/回弹模式；否则设备处于瞬时开关模式。

#### Plug Mini

功能：

- 开启或关闭
- 获取功耗读数

#### Plug Mini EU

这是一个加密设备。

功能：

- 开启或关闭
- 获取功率
- 获取电压
- 获取电流
- 获取用电量

#### Relay Switch 1

这是一个加密设备。

功能：

- 开启或关闭

#### Relay Switch 1PM

这是一个加密设备。

功能：

- 开启或关闭
- 获取功率
- 获取电压
- 获取电流
- 获取用电量

#### Relay Switch 2PM

这是一个加密设备，并且具有两个开关通道，你可以分别进行设置。

功能：

- 开启或关闭
- 获取功率
- 获取电压
- 获取电流
- 获取用电量

### 窗帘与遮阳

Curtain、Curtain 3、Blind Tilt、Roller Shade 和 Garage Door Opener 会添加为 cover 实体。

#### Curtain

功能：

- 打开/关闭/暂停
- 设置位置
- 获取位置
- 获取光照等级
- 获取电池电量
- 获取校准状态

#### Curtain 3

功能：

- 打开/关闭/暂停
- 设置位置
- 获取位置
- 获取光照等级
- 获取电池电量
- 获取校准状态
- 设置窗帘移动速度

窗帘移动速度可在设备选项中配置。该设置主要针对 Curtain 3 设计，较旧的 Curtain 型号可能会忽略此设置。

1. 若要设置 **Curtain movement speed**，请前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 找到 SwitchBot 集成，并选择你要配置的窗帘设备。
3. 选择该设备的 **配置**。
4. 在 **选项** 对话框中，将 **Curtain movement speed** 设置为 0-255 之间的数值，默认值为 255。

#### Blind Tilt

功能：

- 向上关闭/向下关闭/暂停
- 设置位置
- 获取位置
- 获取光照等级
- 获取电池电量
- 获取校准状态

Blind Tilt 会作为 cover 实体暴露，仅支持控制倾斜角度：

| 倾斜位置 | 百叶帘状态 |
| ------------- | ----------- |
| 100% | 向上关闭 |
| 50% | 完全打开 |
| 0% | 向下关闭 |

关闭按钮会将百叶帘关闭到最近的关闭位置（0% 或 100%），如果百叶帘完全打开，则默认向下关闭。由于 Home Assistant 认为 100% 代表打开，默认卡片在倾斜角度为 100% 时会禁用打开按钮，但该操作实际仍可生效，并将百叶帘打开到 50%。

##### 简单的 cover 模板实体

某些集成可能会将你的 SwitchBot Blind Tilt 提供给其他动作使用，而那些动作默认认为 100% 为打开、0% 为完全关闭。你可以使用 [Cover Template](/home-assistant/integrations/template/#cover) 创建一个代理实体，使其在 100% 时表示打开、0% 时表示关闭。这个模板实体仅支持单方向关闭。


```yaml
# Example configuration.yaml entry
cover:
  - platform: template
    covers:
      example_blinds_simple:
        device_class: blind
        friendly_name: Example Blinds (Simple Down)
        open_cover:
          action: cover.set_cover_tilt_position
          data:
            tilt_position: 50
          target:
            entity_id: cover.example_blinds
        close_cover:
          action: cover.set_cover_tilt_position
          data:
            tilt_position: 0
          target:
            entity_id: cover.example_blinds
        position_template: >
          {{ int(states.cover.example_blinds.attributes.current_tilt_position)*2 }}
        set_cover_position:
          action: cover.set_cover_tilt_position
          data:
            tilt_position: "{{position/2}}"
          target:
            entity_id: cover.example_blinds
```


#### Roller Shade
Roller Shade 会作为 cover 实体暴露，仅支持控制位置：

| 位置 | Roller Shade 状态 |
| -------- | ------------------ |
| <=20% | 打开 |
| >20% | 关闭 |

功能：

- 打开/关闭/暂停
- 设置位置
- 获取位置
- 获取电池电量

#### Garage Door Opener

功能：

- 打开/关闭

### 传感器

温湿度计、运动传感器、门磁传感器、漏水传感器、人体存在传感器、遥控器按钮和 climate panel 会添加为 sensor 实体。

#### Meter

功能：

- 获取温度
- 获取湿度
- 获取电池电量

#### Meter Plus

功能：

- 获取温度
- 获取湿度
- 获取电池电量

#### Indoor/Outdoor Meter

功能：

- 获取温度
- 获取湿度
- 获取电池电量

#### Meter Pro

功能：

- 获取温度
- 获取湿度
- 获取电池电量

#### Meter Pro CO2 Monitor

功能：

- 获取温度
- 获取湿度
- 获取二氧化碳浓度
- 获取电池电量
- 设置显示时间格式（12 小时/24 小时）
- 将设备日期和时间与 Home Assistant 同步

<details>
<summary>自动与 Home Assistant 同步设备日期和时间</summary>
 

该集成会在设备详情页中添加一个 **Sync date and time** 按钮。你可以创建自动化，定期触发这个按钮。下面是一个简单的 `configuration.yaml` 示例：


```yaml
automation:
  - alias: "Daily SwitchBot CO2 Time Sync"
    description: "Sync date and time sync for the Meter Pro CO2 every night."
    trigger:
    triggers:
      - trigger: time
        # Ensures the time is in sync after a DST (summer/winter) time change.
        at: "03:00:00"
    actions:
      - action: button.press
        target:
          # Replace with your actual entity ID
          entity_id: button.<your_device_name>_sync_date_and_time
```


</details>

#### Contact Sensor

功能：

- 打开或关闭状态
- 运动检测状态
- 获取电池电量

#### Motion Sensor

功能：

- 运动检测状态
- 获取电池电量

#### Presence Sensor

注意：设备电池数据存储在 service data 中，而不是通过广播发送。只有在 Bluetooth 处于 active 模式时才能获取此数据。

功能

- 获取光照等级
- 获取电池电量
- 获取占用状态

#### Water Leak Detector

这是一个加密设备。

功能：

- 漏水或干燥状态
- 获取电池电量

#### Remote

功能：
- 获取电池电量

#### Climate Panel

这是一个加密设备。

功能：

- 获取温度
- 获取湿度
- 获取电池电量
- 运动检测状态
- 光线检测状态

#### Keypad Vision (Pro)

这是一个加密设备。测试时，你可以在开发者工具中分别执行此设备支持的各项动作。

动作：
- add_password

示例：
```yaml
action: switchbot.add_password
data:
  device_id: c2d01328efd261f586e56d914e3af07e
  password: 123456
```

### 灯光

Color Bulb、LED Strip Light 和 Ceiling Light 会添加为 light 实体。

#### Ceiling Light

功能：

- 开启或关闭
- 调整亮度
- 调整色温

#### Color Bulb

功能：
- 开启或关闭
- 调整亮度
- 调整色温
- 调整颜色
- 设置效果

#### LED Strip Light

功能：

- 开启或关闭
- 调整亮度
- 调整颜色
- 设置效果

#### Strip Light 3

这是一个加密设备。

功能：

- 开启或关闭
- 调整亮度
- 调整色温
- 调整颜色
- 设置效果

#### Floor Lamp

这是一个加密设备。

功能：

- 开启或关闭
- 调整亮度
- 调整色温
- 调整颜色
- 设置效果

#### RGBICWW Strip Light

这是一个加密设备。

功能：

- 开启或关闭
- 调整亮度
- 调整色温
- 调整颜色
- 设置效果

#### RGBICWW Floor Lamp

这是一个加密设备。

功能：

- 开启或关闭
- 调整亮度
- 调整色温
- 调整颜色
- 设置效果

### 门锁

注意：该集成当前仅使用主锁状态；在双锁模式下，并非所有功能都能正常工作。

#### Lock

这是一个加密设备。

功能：

- 上锁或解锁
- 打开或关闭状态
- 自动上锁暂停状态
- 校准状态
- 获取电池电量

选项：

1. 若要启用 nightlatch operation mode，请前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 在 **集成条目** 下找到该门锁并选择 **配置**。
3. 在 **选项** 对话框中配置夜闩操作模式。

#### Lock Pro

这是一个加密设备。

功能：

- 上锁或解锁
- 打开或关闭状态
- 自动上锁暂停状态
- 校准状态
- 获取电池电量

选项：

1. 若要启用 nightlatch operation mode，请前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 在 **集成条目** 下找到该门锁并选择 **配置**。
3. 在 **选项** 对话框中配置夜闩操作模式。


#### Lock Ultra

这是一个加密设备。

功能：

- 上锁或解锁
- 打开或关闭状态
- 自动上锁暂停状态
- 校准状态
- 获取电池电量

选项：

1. 若要启用 nightlatch operation mode，请前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 在 **集成条目** 下找到该门锁并选择 **配置**。
3. 在 **选项** 对话框中配置夜闩操作模式。

#### Lock Lite

这是一个加密设备。

功能：

- 上锁或解锁
- 校准状态
- 获取电池电量

### Hub

部分 Hub 可作为桥接器使用，同时仍可通过蓝牙连接获取传感器数据。Hub 2 可通过传感器线缆显示温湿度；没有数字显示屏的 Hub Mini Matter Enabled 也可读取传感器线缆数据。

#### Hub 2

功能：

- 获取温度
- 获取湿度
- 获取光照等级

#### Hub Mini Matter Enabled

功能：

- 获取温度
- 获取湿度

#### Hub3

功能：

- 获取温度
- 获取湿度
- 获取光照等级
- 运动检测状态

### 风扇

Battery Circulator Fan / Circulator Fan 会添加为 fan 实体。

#### Battery Circulator Fan/Circulator Fan

功能：
- 开启
- 关闭
- 设置风速
- 设置模式
- 左右摆风
- 获取电池电量（仅 Battery Circulator Fan）

### 空气净化器

Air Purifier 和 Air Purifier Table 会添加为 fan 实体。

空气净化器目前支持三个风速档位，可通过设置 mode 进行调整。

这是一个加密设备。

功能：

- 开启
- 关闭
- 设置模式

#### Air Purifier Table

这是一个加密设备。

功能：

- 开启
- 关闭
- 设置模式

### 吸尘器

K10+、K10+ Pro、K10+ Pro Combo、K20、S10、K11+、S20 会添加为 vacuum 实体。

功能：
- 获取状态，包括 `cleaning`、`docked`、`idle`、`paused`、`returning` 和 `error`；更多细节请参阅“已知限制”
- 启动清扫
- 返回基站
- 获取电池电量

### 加湿器

Humidifier 和 Evaporative Humidifier 会添加为 humidifier 实体。

#### Humidifier

功能：

- 开启
- 关闭
- 设置模式
- 设置湿度

#### Evaporative Humidifier

这是一个加密设备。
注意：若未绑定温湿度传感器，并非所有模式都可用。

功能：

- 开启
- 关闭
- 设置模式
- 设置湿度

### 气候设备

smart radiator thermostat 会添加为 climate 实体。

这是一个加密设备。

功能：

- 开启
- 关闭
- 设置模式
- 设置目标温度

### 按钮

art frame 会添加为 button 实体。

这是一个加密设备。

注意：用户需要先在应用中预设图片。

功能：
- 下一张图片
- 上一张图片


## 数据更新

SwitchBot 设备使用 [local push](/home-assistant/blog/2016/02/12/classifying-the-internet-of-things/#classifiers) 策略来维持实时状态更新。当设备检测到状态变化时，会主动将更新推送到 Home Assistant 以立即同步。对于用户在 Home Assistant 中主动发起的操作（例如开关设备），集成还会额外主动拉取一次状态，以确保新状态能被即时确认。
该集成通过本地连接与设备通信，不经过 SwitchBot Cloud。

## 已知限制

### 连接速度慢

请将设备移近一些，或更换速度更快的蓝牙适配器。更多信息请参阅[改善连接时间](/home-assistant/integrations/bluetooth/#improving-connection-times)。

### 设备名称不同步

在 SwitchBot 应用中配置的设备名称不会同步到 Home Assistant。

### 电池电量

由于固件限制，**Lock**、**Lock Lite** 等早期型号上报的是粗略的电量区间，而非精确数值：

- < 10 %  → 10  
- 10 % – 20 % → 20  
- 20 % – 60 % → 60  
- ≥ 60 % → 100

精确定义请参阅最新版 [OpenAPI doc](https://github.com/OpenWonderLabs/SwitchBotAPI)。

### 锁状态

该集成当前仅使用主锁状态；在双锁模式下，并非所有功能都能正常工作。

### 吸尘器状态

对于扫地机器人 K10+ 和 K10+ Pro，由于固件实现限制，仅会返回 `cleaning` 和 `docked` 这两种状态。

## 故障排查

启用且正确运行 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，SwitchBot 集成会自动发现设备。

<details>
<summary>无法加载配置流程</summary>

可能是自定义集成冲突，正在使用不同版本的 PySwitchbot；请尝试卸载该自定义集成。

</details>

<details>
<summary>未找到未配置的设备</summary>

请确认设备已通电并处于蓝牙覆盖范围内。

</details>

## 示例

### 自动化思路

你可以创建各种自动化，将传感器作为触发条件，将开关、窗帘和灯光作为执行动作。

- 检测到运动时打开或关闭灯和开关。
- 温度或湿度过低时，打开或关闭 Bot，以控制风扇、空调遥控器或循环扇。
- 温度过高时关闭窗帘。
- 功耗过高时关闭 Relay Switch。
- 二氧化碳浓度过高时，改变 LED Strip Lights 或 Color Bulb 的颜色，或通过 Bot / Relay Switch 打开循环扇。

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### 从 Home Assistant 中删除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，选择该集成卡片。
2. 在设备列表中，选择你要删除的集成实例。
3. 在对应条目旁点击三点 `[mdi:dots-vertical]` 菜单，然后选择 **删除**。
