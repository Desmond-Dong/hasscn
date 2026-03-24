---
title: Bosch Alarm
description: 集成 Bosch 报警系统。
ha_category:
  - Alarm
  - Binary Sensor
  - Sensor
  - Switch
ha_release: 2025.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mag1024'
  - '@sanjay900'
ha_domain: bosch_alarm
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - diagnostics
  - sensor
  - switch
ha_integration_type: device
ha_quality_scale: platinum
ha_dhcp: true
---

**Bosch 报警面板** 集成允许您将 [Bosch 报警面板](https://www.boschsecurity.com) 连接到 Home Assistant，以控制和监控您的 Bosch 报警面板。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: "您面板的 IP 地址。您可以在路由器中或 A-Link Plus / RPS 中找到它。"
Port:
    description: "您面板使用的端口。除非在配置面板时更改过，否则通常为 7700。"
Password:
    description: "为您面板设置的自动化代码。可以在 A-Link Plus 或 RPS 中找到。由 AMAX、B 和 G 系列面板使用。"
User code:
    description: "此集成将与面板通信的用户代码。通常是您通过键盘布防或撤防面板时使用的代码。由 Solution 系列面板使用。"
Installer code:
    description: "您面板的安装者代码。可以在 A-Link Plus 中找到。由 AMAX 系列面板使用。"
```

:::important
由于 _Mode 2_ 自动化用户具有"超级用户"权限，它会绕过常规配置的报警密码：通过集成布防/撤防时，您_不会_被提示输入_用户_代码。

:::
## 支持的设备

- _Solution 2000/3000/4000_
- B 系列：_B3512/B4512/B5512/B6512_
- G 系列：_B8512G/B9512G_
- _AMAX 2100/3000/4000_
- _D7412GV4/D9412GV4_ [^1]

[^1]: 固件 2.0+

## 提供的实体

提供以下实体：

- [报警控制面板](#alarm-control-panel)
- [二值传感器](#binary-sensor)
- [传感器](#sensor)
- [开关](#switch)

### 报警控制面板

此集成为每个配置的区域添加一个报警控制面板设备，具有发出布防/撤防命令的能力。
此实体报告状态（_disarmed_、_armed_away_ 等）。
 
### 二值传感器

为报警上配置的每个点添加一个二值传感器。

为每个区域添加两个二值传感器，以指示是否可以外出布防或在家布防。

### 传感器

为每个区域提供一个传感器，列出当前处于故障状态的点数。

为以下每种报警类型提供一个传感器，显示该报警的健康状况

- 火灾
- 气体
- 入侵

传感器的状态可以是以下之一：

- 无问题
- 故障

  这些信号表示系统内的故障或失败。这些信号通常指向如果不解决可能导致系统完全失效的问题。例如，断线或烟雾探测器故障可能会触发故障信号。这些信号通常需要及时采取措施，以确保系统继续按预期工作。

- 监管

  这些信号与需要注意但并非立即面临故障风险的系统组件有关。它们通常不紧急，表示系统内的某些东西需要维护或功能不佳。这些信号可能包括关闭的阀门或已停用的灭火器。

- 报警

  报警当前已触发。

### 开关

为面板上配置的每个输出添加一个开关。请注意，对于某些面板，只有类型设置为**远程输出**的输出才能通过 _Mode 2_ API 控制。

每扇门添加三个开关，允许锁定、安全或临时解锁门。

## 动作

集成提供以下动作。

### 动作：设置面板日期和时间

`bosch_alarm.set_date_time` 动作用于更新面板上的日期和时间。

- **数据属性**：`config_entry_id`
  - **描述**：正在更新的面板配置条目的 ID。
  - **可选**：否

- **数据属性**：`datetime`
  - **描述**：要设置的日期和时间。如果未设置，则默认为当前日期和时间。
  - **可选**：是


```yaml
# 示例：更新面板的日期和时间
action: bosch_alarm.set_date_time
data:
  config_entry_id: "YOUR_CONFIG_ENTRY_ID"
  datetime: "2025-05-01T12:00:00"
```


## 身份验证

_Mode 2_ API 的主要身份验证方式是_自动化_密码。它需要至少 10 个字符长，与用于布防/撤防面板的较短数字密码_用户_代码不同。
集成将提示输入所需的密码，这取决于面板类型。

| 面板    | 代码       |
| -------- | ---------- |
| Solution | 用户 [^2]  |
| B 系列 | 自动化 |
| G 系列 | 自动化 |
| AMAX     | 两者       |

[^2]: 如果您希望与历史事件交互，用户需要具有"主码功能"权限。

:::important
由于 _Mode 2_ 自动化用户具有"超级用户"权限，它会绕过常规配置的报警密码：通过集成布防/撤防时，您_不会_被提示输入_用户_代码。

:::
## 数据更新

**Bosch Alarm** 集成每 30 秒从设备获取数据。
较新的设备和固件版本可以推送数据，而不需要依赖轮询。
启动时，集成会检查您的面板是否支持推送数据更新，如果不支持则回退到轮询。

## 示例

### 走进房间时打开灯


```yaml
automation:
  - alias: "走进房间时打开灯"
    triggers:
      - platform: state
        entity_id:
          - binary_sensor.bosch_solution_3000_bedroom
        to: "on"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom_light


```


## 重新配置

此集成支持重新配置，因此可以在配置后更改 IP 地址等配置。

## 故障排除

### Bosch Solution 2000/3000/4000 面板的问题

我们发现某些面板最终会具有与集成不兼容的配置。
发生这种情况时，即使凭据正确，尝试与面板通信时也会出现连接错误。
如果重启面板后仍然出现连接错误，则您的配置有问题。
解决此问题的最简单方法是按照下面概述的完全重置和恢复步骤操作。

#### 重置配置并恢复集成

1. 更新固件（推荐）。
   1. 从 Bosch Security 网站下载并安装控制面板和 IP 模块的最新固件。
2. 备份现有配置。
   1. 通过 A-Link Plus 连接到面板。
   2. 执行面板配置上传。
   3. 将配置保存到您的计算机。
3. 恢复控制面板默认设置。
   1. 按下面板上的默认/重置按钮。
   2. 使用安装者代码 1234。
   3. 设置：
      1. 位置 0081 = 3（启用 IP 模块模式）
      2. 位置 4456 = 4（启用 RSC+ 通信）
   4. 使用主码 `25806#` 设置日期和时间。
4. 初始 Home Assistant 测试。
   1. 重置面板后等待 2 到 5 分钟。
   2. 使用其 IP 地址在面板上设置集成。
   3. Home Assistant 应使用默认配置连接并显示面板状态。
5. 恢复原始配置。
   1. 使用 A-Link Plus 重新连接到面板。
   2. 修改区域、输出和用户代码以匹配原始设置。
   3. 保存并将更新的配置下载到面板。
   4. 等待 2 到 5 分钟。
6. 重新连接到 Home Assistant。
   1. 打开 Home Assistant。
   2. 集成现在应检测到更新的配置。
   3. 所有相关实体（区域、分区、输出）应自动出现。

#### 重启面板网络栈

我们发现 Solution 面板有一个错误，它们可能进入网络模块停止让我们使用 _Mode 2_ API 的状态。
如果您的配置信息正确，但仍无法连接到面板，则您可能遇到了此错误。
这可以通过重启网络模块来解决，可以使用以下步骤完成。

##### 重置网络模块 1

使用键盘，输入您的主码，然后按 `[9][4][1]` 和 `[#]` 键。

##### 重置网络模块 2

使用键盘，输入您的主码，然后按 `[9][4][2]` 和 `[#]` 键。

### Bosch B/G 系列 (B3512/B4512/B5512/B8512/B9512) 的问题

以下步骤可用于正确配置面板，使其与集成一起工作。

#### 面板配置步骤

1. 更新固件（推荐）。
   1. 使用 RPS 将控制面板和 B426（如果使用的 IP 模块）更新到最新固件。
   2. 从 Bosch Security 网站下载固件。
2. 设置 IP 地址。
   1. 使用 RPS 或通过键盘配置面板的 IP 设置。
   2. 使用 DHCP 进行初始设置（可选），或分配静态 IP。
3. 配置自动化设备。
   1. 在 RPS 中：
      1. 将**自动化设备**设置为**Mode 2**（Bosch 标准协议）。
      2. 设置您的自动化密码（用于 Home Assistant 身份验证）。
4. 等待更改应用。
   1. 等待 2 到 5 分钟让面板重启并应用设置。
5. 连接到 Home Assistant。
   1. 使用面板的 IP 地址设置集成。
   2. 在 Home Assistant 配置中输入自动化密码。
   3. Home Assistant 应连接并显示面板状态、区域和分区。

#### TLS 问题

这些面板的某些较旧固件使用 Home Assistant 不再信任的过时证书。如果您在连接时遇到问题并在日志中看到 TLS 错误，请更新面板上的固件。

## 已知限制

- 集成不允许您配置面板；您可以通过面板的配置实用程序进行此操作。
- Solution / AMAX 系列面板的某些较旧固件版本一次仅支持单个连接。如果您尝试在这些面板上同时使用云连接和集成，面板的网络栈可能会锁定，集成将停止工作。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.