---
title: Pentair ScreenLogic
description: 'Pentair ScreenLogic 集成允许您通过 Pentair ScreenLogic(https://www.pentair.com/products/residential/pool-spa-equipment/pool-automation/screenlogic2interfaceforint。'
ha_release: '2021.4'
ha_category:
  - Binary sensor
  - Climate
  - Hub
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@dieselrabbit'
  - '@bdraco'
ha_domain: screenlogic
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - light
  - number
  - sensor
  - switch
ha_integration_type: hub
---
# Pentair ScreenLogic

**Pentair ScreenLogic** 集成允许您通过 [Pentair ScreenLogic](https://www.pentair.com/products/residential/pool-spa-equipment/pool-automation/screenlogic2_interfaceforintellitouchandeasytouchautomationsystems.html) 网关，将 Pentair IntelliTouch 或 EasyTouch 泳池控制器接入 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 选项

ScreenLogic 选项可通过 **Settings** > **Devices & services** > **Pentair ScreenLogic** > **Options** 进行设置。

- **Seconds between scans** - 每次轮询 ScreenLogic 网关之间的秒数。

## 操作

### `screenlogic.set_color_mode`

设置所有已连接彩灯的运行模式。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------- |
| `config_entry`         | 否       | 要设置颜色模式的 ScreenLogic 实例的集成 `entry_id`。 |
| `color_mode`           | 否       | 要设置的颜色模式。有效值见下表。 |

### `screenlogic.start_super_chlorination`

开始强力加氯；如果未指定时长，则默认运行 24 小时。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `config_entry`         | 否       | 要开始强力加氯的 ScreenLogic 实例的集成 `entry_id`。 |
| `runtime`              | 是       | 强力加氯持续的小时数。默认为 24 小时。 |

### `screenlogic.stop_super_chlorination`

停止强力加氯。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `config_entry`         | 否       | 要停止强力加氯的 ScreenLogic 实例的集成 `entry_id`。 |

## 参考

### 颜色模式

| color_mode   | Name         | Description                                                                                               |
| ------------ | ------------ | --------------------------------------------------------------------------------------------------------- |
| `all_off`    | All Off      | Turns all light circuits off.                                                                             |
| `all_on`     | All On       | Turns all light circuits on to their last mode.                                                           |
| `color_set`  | Color Set    | Sets light circuits to their pre-set colors as set in the pool controller.                                |
| `color_sync` | Color Sync   | Synchronize all IntelliBrite, SAm, SAL, or FIBERworks color changing lights and synchronize their colors. |
| `color_swim` | Color Swim   | Cycles through white, magenta, blue and green colors. (Emulates Pentair SAm color changing light.)        |
| `party`      | Party        | Rapid color changing building the energy and excitement.                                                  |
| `romance`    | Romance      | Slow color transitions creating a mesmerizing and calming effect.                                         |
| `caribbean`  | Caribbean    | Transitions between a variety of blues and greens.                                                        |
| `american`   | American     | Patriotic red, white and blue transition.                                                                 |
| `sunset`     | Sunset       | Dramatic transitions of orange, red and magenta tones.                                                    |
| `royal`      | Royal        | Richer, deeper, color tones.                                                                              |
| `save`       | Save Color   | Save the exact colors that are being displayed.                                                           |
| `recall`     | Recall Color | Recall the saved colors.                                                                                  |
| `blue`       | Blue         | Fixed color: Blue                                                                                         |
| `green`      | Green        | Fixed color: Green                                                                                        |
| `red`        | Red          | Fixed color: Red                                                                                          |
| `white`      | White        | Fixed color: White                                                                                        |
| `magenta`    | Magenta      | Fixed color: Magenta                                                                                      |
| `thumper`    | Thumper      | Toggles the solenoid thumper on MagicStream laminars.                                                     |
| `next_mode`  | Next Mode    | Cycle to the next color mode.                                                                             |
| `reset`      | Reset        | Reset light modes.                                                                                        |
| `hold`       | Hold         | Hold light transitions.                                                                                   |
