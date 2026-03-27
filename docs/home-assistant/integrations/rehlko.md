---
title: Rehlko
description: 'Rehlko（前称 Kohler Energy Management）集成允许您通过 Home Assistant 监控已启用的 Kohler 发电机(https://www.kohlerhomeenergy.rehlko.com/kohler-energy-management-app) 状态。'
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2025.5
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@peterager'
ha_dhcp: true
ha_domain: rehlko
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
---
# Rehlko

**Rehlko**（前称 Kohler Energy Management）集成允许您通过 Home Assistant 监控已启用的 [Kohler 发电机](https://www.kohlerhomeenergy.rehlko.com/kohler-energy-management-app) 状态。此集成取代了旧版 Oncue 集成。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 必填手动输入项

要配置 Rehlko（Kohler Energy Management）账户，请输入以下信息：

```yaml
email:
  description: "用于登录 Rehlko（Kohler Energy Management）应用的电子邮箱。"
password:
  description: "用于登录 Rehlko（Kohler Energy Management）应用的密码。"
```

此集成会使用发电机名称作为设备名称，并用于实体命名。如果您想更改此名称，建议在配置集成前先在 Kohler 应用中修改。

## 二进制传感器

此集成提供以下二进制传感器，以帮助您跟踪发电机的关键状态：

- **Auto run**  
  指示发电机是否会在停电时自动启动。

- **Connectivity**  
  显示发电机当前是否连接到 Rehlko 云端。

- **Oil pressure**  
  监控机油压力传感器。如果该传感器为 *on*，表示机油压力存在问题。

## 传感器

此集成公开的传感器取决于您的发电机和转换开关所安装的具体仪表配置。即使是同一型号，不同设备之间可用传感器也可能有很大差异。

### 状态传感器

状态传感器提供有关发电机整体状态的信息。

> **注意：** 此值列表并不完整。如果您发现新的取值，请提交 issue 反馈。

#### 发电机状态

提供发电机的整体状态。

| 值 | 说明 |
|--------------------------------------|---------------------------------|
| `ReadyToRun` | 发电机已准备好在停电时运行。 |
| `Running` | 发电机正在运行。 |
| `RunningExercise` | 发电机正在运行自检程序。 |
| `Shutdown` | 发电机因故障而关闭，停电时**不会**运行。 |
| `SwitchStateOff` | 发电机已关闭，停电时**不会**运行。 |

#### 发动机状态

提供发动机的详细状态。

| 值 | 说明 |
|--------------------------------------|---------------------------------|
| `CrankOn` | 发电机正在起动并尝试启动。 |
| `Off` | 发电机已关闭，停电时**不会**运行。 |
| `Running` | 发电机正在运行。 |
| `Standby` | 发电机已准备好在停电时运行。 |
| `Stopping` | 发电机正在停止。 |
| `PerformingFullSpeedDiagnostics` | 发电机正在执行全速诊断。 |
| `PerformingUnloadedFullSpeedExercise` | 发电机正在执行空载全速演练。 |
| `PerformingVariableSpeedExercise` | 发电机正在执行变速演练。 |

#### 电源来源

指示家庭当前的供电来源。

| 值 | 说明 |
|--------------------------------------|---------------------------------|
| `Generator` | 由发电机为家庭供电。 |
| `Utility` | 由市电为家庭供电。 |


## 已测试的发电机

以下是已经测试过的发电机型号：

- [38RCLB](https://resources.kohler.com/power/kohler/residential/pdf/tp6908.pdf)
- [26RCA](https://www.kohlerhomeenergy.rehlko.com/products/home+generators/26rca)
- [20RESA](https://resources.kohler.com/power/kohler/residential/pdf/tp6804.pdf)
- [20RCA](https://www.kohlerhomeenergy.rehlko.com/products/home+generators/20rca)
- [14RESA](https://www.kohler.com/content/dam/kohler-com-NA/Lifestyle/PDF/PDF-tp6803.pdf)
- [30RCL](https://www.kohlerhomeenergy.rehlko.com/products/home+generators/30rcla)

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
