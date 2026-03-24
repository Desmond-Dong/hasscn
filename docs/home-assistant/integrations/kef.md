---
title: KEF
description: 关于如何将 KEF 扬声器集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 0.104
ha_codeowners:
  - '@basnijholt'
ha_domain: kef
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**KEF** 集成可让您在 Home Assistant 中控制 KEF LS50 Wireless 和 [KEF LSX](https://international.kef.com/products/lsx) 扬声器。

支持的设备：

- KEF LS50 Wireless
- KEF LSX

## 配置

要将 KEF 扬声器添加到您的安装中，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
media_player:
 - platform: kef
   host: IP_ADDRESS
   type: LS50
```

```yaml
host:
  description: "设备的 IP 地址。例如：192.168.1.32"
  required: true
  type: string
type:
  description: 扬声器类型，可为 `LS50` 或 `LSX`。
  required: true
  type: string
name:
  description: 设备名称
  required: false
  default: KEF
  type: string
port:
  description: 设备端口
  required: false
  default: 50001
  type: integer
maximum_volume:
  description: 允许的最大音量。取值范围为 0 到 1。
  required: false
  default: 0.5
  type: float
volume_step:
  description: 提高音量时的步进值。
  required: false
  default: 0.05
  type: float
inverse_speaker_mode:
  description: 将声道从 L/R 切换为 R/L。
  required: false
  default: false
  type: boolean
standby_time:
  description: 扬声器会在 `20` 或 `60` 分钟后自动进入待机模式。留空则永不进入待机模式。
  required: false
  type: integer
supports_on:
  description: 序列号低于 LS50W13074K24L/R2G 的 LS50 Wireless 不支持通过网络开机。如果您使用的是较旧型号，请将其设为 false。
  default: true
  required: false
  type: boolean
```

## 高级 - 配置示例

```yaml
# configuration.yaml 示例条目
media_player:
 - platform: kef
   host: IP_ADDRESS
   type: LS50
   name: My KEF speakers
   maximum_volume: 0.6
   volume_step: 0.05
```

## 操作

与 KEF Control 应用一样，您可以更改数字信号处理（DSP）设置。

扬声器当前的 DSP 设置会每小时自动更新一次，并在每次操作后更新。
如果要手动更新设置，请使用 `kef.update_dsp`。

### 操作：更新 DSP

`kef.update_dsp` 操作会更新所有 DSP 设置。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | --------------------------------- |
| entity_id              | No       | KEF 扬声器的 entity_id。 |

### 操作：设置模式

`kef.set_mode` 操作用于设置扬声器模式。省略可选属性时，对应设置将保持不变。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------------- |
| entity_id              | No       | KEF 扬声器的 entity_id。 |
| desk_mode              | Yes      | “Desk mode”（`true` 或 `false`） |
| wall_mode              | Yes      | “Wall mode”（`true` 或 `false`） |
| phase_correction       | Yes      | “Phase correction”（`true` 或 `false`） |
| high_pass              | Yes      | “High-pass mode”（`true` 或 `false`） |
| sub_polarity           | Yes      | “Sub polarity”（`-` 或 `+`） |
| bass_extension         | Yes      | “Bass extension” 选择器（`Less`、`Standard` 或 `Extra`） |

### 操作：设置桌面模式 dB

`kef.set_desk_db` 操作用于设置扬声器“Desk mode”滑块的 dB 值。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | KEF 扬声器的 entity_id。 |
| db_value               | No       | 滑块值（-6 到 0，步进为 0.5） |

### 操作：设置墙面模式 dB

`kef.set_wall_db` 操作用于设置扬声器“Wall mode”滑块的 dB 值。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | KEF 扬声器的 entity_id。 |
| db_value               | No       | 滑块值（-6 到 0，步进为 0.5） |

### 操作：设置高音 dB

`kef.set_treble_db` 操作用于设置扬声器“Treble trim”滑块的 dB 值。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | KEF 扬声器的 entity_id。 |
| db_value               | No       | 滑块值（-2 到 2，步进为 0.5） |

### 操作：设置高通 Hz

`kef.set_high_hz` 操作用于设置扬声器“High-pass mode”滑块的 Hz 值。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | KEF 扬声器的 entity_id。 |
| hz_value               | No       | 滑块值（50 到 120，步进为 5） |

### 操作：设置低通 Hz

`kef.set_low_hz` 操作用于设置扬声器“Sub out low-pass frequency”滑块的 Hz 值。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | KEF 扬声器的 entity_id。 |
| hz_value               | No       | 滑块值（40 到 250，步进为 5） |

### 操作：设置低音炮 dB

`kef.set_sub_db` 操作用于设置扬声器“Sub gain”滑块的 dB 值。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | KEF 扬声器的 entity_id。 |
| db_value               | No       | 滑块值（-10 到 10，步进为 1） |

## 备注

- LS50 Wireless 已使用 2019-11-19 的最新固件 `p6.3001902221.105039422` 和旧固件 `p6.2101809171.105039422` 进行测试
- LSX Wireless 已使用 2019-10-10 的最新固件 v4.1：`p20.4101909240.105243` 进行测试

[KEF Speakers]: /integrations/kef/
