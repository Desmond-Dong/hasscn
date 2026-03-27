---
title: August
description: 'August 集成允许您将 August(https://august.com/) 和某些 Yale Access 设备集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Doorbell
  - Event
  - Lock
  - Sensor
ha_release: 0.64
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: august
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - event
  - lock
  - sensor
ha_integration_type: hub
---
# August

**August** 集成允许您将 [August](https://august.com/) 和某些 Yale Access 设备集成到 Home Assistant 中。

对于使用 [Yale Home](https://yalehome.com/global) 应用程序的设备，应改用 [Yale](/home-assistant/integrations/yale) 集成。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 已知可工作的设备

| 设备                            | 需要 [Connect Bridge](https://august.com/products/august-connect/) 或门铃 |
| --------------------------------- | ------------------------------------|
| August Wi-Fi Smart Lock (Gen 4) | 否 |
| August Smart Lock Pro (Gen 3) | 是 |
| August Smart Lock (Gen 2) | 是 |
| August Smart Lock (Gen 1) | 否 |
| August Doorbell Cam (Gen 1, Gen2) | 否 |
| August View | 否 |
| Yale Assure Lock | 是 |
| Yale Assure Lock 2 | 是 |
| Yale Smart Safe | 是 |

上面未列出的其他设备未经测试，可能无法按预期工作。

目前 Home Assistant 支持以下设备类型：

- 门铃
- 二值传感器
- 按钮
- 传感器
- 摄像头
- 门锁

:::note
大多数设备需要 August Connect Bridge 或门铃才能连接到 Home Assistant。

:::
## 电池报告的已知问题

August Wi-Fi Smart Lock (Gen 4) 使用与其他门锁不同的电池技术（锂离子）。门锁详情 API 报告的电池电量值经常被报告为这些型号的不正确值。

其他 August 门锁预期使用 AA 碱性（不可充电）电池供电。在这些门锁中使用可充电电池将导致电池电量报告不正确。

## 某些实体不提供推送更新

虽然大多数实体可以通过推送 API 更新，但 August/Yale 不为某些数据提供推送 API，这意味着这些实体的更新会更慢：

- 门铃叮咚传感器（仅限 Doorman 型号）
- 门锁电池传感器
- 门锁操作传感器

## 二值传感器

如果您有 August 门铃，启用 August 集成后，您应该看到以下传感器：

- 门铃叮咚传感器
- 门铃运动传感器
- 门铃在线传感器

如果您有带 DoorSense 的 August 智能门锁，启用 August 集成后，您应该看到以下传感器：

- 门传感器

## 按钮

创建按钮是为了将门锁从深度睡眠中唤醒。如果您的门锁没有报告状态，它可能处于深度睡眠中，可以使用按钮唤醒它。为了节省电池寿命，门锁不会自动从深度睡眠中唤醒。

## 事件

如果您有 August 门铃或带有内置门铃的门锁，启用 August 集成后，您应该看到以下事件实体：

- 门铃
- 运动

并非所有型号都包含运动传感器，带有内置门铃的门锁支持仅限于 Yale Doorman 7 型和 10 型。

## 摄像头

`august` 摄像头平台允许您在 Home Assistant 中查看您的 [August](https://august.com/) 设备的最新摄像头图像（由运动触发）。

## 传感器

如果您有带电池的 August 门铃，启用 August 集成后，您应该看到以下传感器：

- 门铃电池

如果您有 August 智能门锁，启用 August 集成后，您应该看到以下传感器：

- 门锁电池
- 门锁操作

如果您有 August 键盘，启用 August 集成后，您应该看到以下传感器：

- 键盘电池

## 与 Yale Access 蓝牙集成

[Yale Access Bluetooth](/home-assistant/integrations/yalexs_ble) 集成通过蓝牙对许多 Yale Access 门锁和一些使用相同系统的 August 门锁提供本地控制。

对于支持 Yale Access 系统的门锁，August 集成可以使您的离线访问密钥保持最新，以确保您可以通过蓝牙操作门锁。离线密钥更新必须满足以下要求：

- August 集成必须支持该门锁。
- [Yale Access Bluetooth 集成](/home-assistant/integrations/yalexs_ble) 必须支持该门锁。
- 蓝牙集成必须处于活动状态且正常工作。
- 门锁必须能被 [Yale Access Bluetooth 集成](/home-assistant/integrations/yalexs_ble) 发现。
- 使用 August 集成登录的账户必须拥有离线密钥。

### 离线密钥更新故障排除

- 如果您不知道哪个账户拥有离线密钥，请使用每个不同的所有者账户配置 August 集成，直到找到拥有密钥的账户。您可能需要创建一个新的所有者账户并授予该账户访问您门锁的权限，以强制密钥与云服务同步。
- 确保门锁在范围内且能被 [Yale Access Bluetooth 集成](/home-assistant/integrations/yalexs_ble) 发现。

## 使用门锁操作进行存在检测

使用门锁操作传感器，您可以检测用户何时操作门锁并且实际在场（非远程）。下面的自动化示例（添加到 `automations.yaml`）将在 August 中名为"John Doe"的用户从键盘（如果存在）、通过蓝牙从手机或通过自动解锁锁定或解锁门时触发。传感器的状态将是 August 返回的操作门锁方的名称。


```yaml
- id: "1583706446906"
  alias: "joe_doe_front_door_operate"
  description: John Doe 锁定或解锁前门
  triggers:
  - trigger: state
    entity_id: sensor.front_door_operator
    to: "John Doe"
  conditions:
  - condition: template
    value_template: "{{ not state_attr('sensor.front_door_operator', 'remote') }}"
  actions:
  - action: camera.turn_off
    entity_id: camera.inside
    
```

