---
title: Honeywell Total Connect Comfort (Europe)
description: 关于如何将 Honeywell Evohome/TCC 系统与 Home Assistant 集成的说明。
ha_category:
  - Climate
  - Hub
  - Water heater
ha_release: '0.80'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@zxdavb'
ha_domain: evohome
ha_platforms:
  - climate
  - water_heater
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Evohome** 集成将 Home Assistant 与所有_非美国_ [Honeywell Total Connect Comfort (TCC)](https://international.mytotalconnectcomfort.com/Account/Login) CH/DHW 系统链接，例如：

- Honeywell Evohome CH/DHW 系统，以及
- 带有圆形恒温器的 Honeywell 移动访问套件

它不支持 TCC 的家庭安全功能。

它使用 [evohome-async](https://github.com/zxdavb/evohome-async) 客户端库。

要使您的系统与此集成兼容，您必须能够通过 [https://international.mytotalconnectcomfort.com/](https://international.mytotalconnectcomfort.com/) 访问它（注意"international"）。

## 配置

要设置此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
evohome:
  username: "YOUR_USERNAME"
  password: "YOUR_PASSWORD"
```

```yaml
username:
  description: 有权访问 [TCC](https://international.mytotalconnectcomfort.com/Account/Login) 网站的用户名（电子邮件地址）。
  required: true
  type: string
password:
  description: 与上述用户名对应的密码。
  required: true
  type: string
location_idx:
  description: 用于选择要使用的位置（如果您的登录有权访问多个位置）。一次多个位置不受官方支持。
  required: false
  type: integer
  default: 0
scan_interval:
  description: 从供应商网络服务器检索更新的频率。最小间隔为 60 秒。
  required: false
  type: integer
  default: 300
```

这是一个物联网云轮询集成，建议的最小 `scan_interval` 为 180 秒。测试表明，这是一个安全的间隔——本身——不应该导致您被供应商限制速率。较短的间隔几乎没有价值，因为此集成会在任何配置更改后不久自动强制刷新。

## 位置和区域

TCC 系统实现为一个_位置_，由 1-12 个_区域_和可选的 DHW 控制器组成：

- 系统位置（例如房屋）用于操作模式，如在家、离开、节能等。
- 供暖区域（例如房间）用于目标温度。

### Evohome

每个区域表示为一个 **Climate** 实体，它将公开区域的操作模式、当前温度和设定点。

Evohome 位置（控制器）也表示为一个 **Climate** 实体，它将公开位置的操作模式。位置既没有当前温度也没有设定点，但由于 Home Assistant 要求所有 **Climate** 实体报告温度，因此计算为所有区域的平均值。

DHW 控制器表示为一个 **WaterHeater** 实体，它将报告其当前温度并可以打开或关闭。由于供应商 RESTful API 的限制，设定点不会被报告，也不能更改。

请注意，对时间表的支持有限：无法更改它们，也没有备份/恢复该数据的功能（有关此类功能，请参阅[此处](https://evohome.readthedocs.io/en/latest/)）。

### 圆形恒温器

这些系统使用互联网网关而不是 Evohome 控制器。它们通常只有一个圆形恒温器，尽管可以有两个。只有一个此类恒温器的系统仍将显示为两个 **Climate** 实体，一个用于位置模式（离开、节能等），另一个用于区域设定点。

## 温度精度

请注意，TCC 设备可能以非常高的精度测量温度，但供应商 API 将报告向设定点四舍五入的温度（即向上或向下），精度为 0.5 °C；这是其他气候系统使用的死区的代理。在可能的情况下，此集成将利用较旧的供应商 API 获取精度为 0.01 °C 的当前温度。

因此，根据上述情况，Home Assistant 将以 0.5 °C 或 0.1 °C 的精度（其支持的最高精度）显示/记录当前温度。

## 系统模式、区域覆盖和继承

TCC 位置最多可支持六种不同的操作模式：**Auto**、**AutoWithEco**、**Away**、**DayOff**、**HeatingOff** 和 **Custom**。并非所有系统都支持所有模式。

区域支持三种设定点模式：**FollowSchedule**、**TemporaryOverride** 和 **PermanentOverride**，但从其位置"继承"操作模式（实际算法比下面指出的稍微复杂一些——请参阅供应商的文档）。

对于 **FollowSchedule**，区域的 `setpoint`（目标温度）是其计划目标温度和继承模式的函数：

- **Auto** 设定点是计划温度（默认）
- **AutoWithEco** 设定点是计划温度减去 3 °C

如果更改了区域的目标温度，则它将是 **TemporaryOverride** 或 **PermanentOverride**，具体情况而定。**TemporaryOverride** 将在指定时间后恢复为 **FollowSchedule**。**PermanentOverride** 是永久性更改，直到进行后续干预。区域可以在两种覆盖模式之间切换而不更改目标温度。

对于某些位置模式，所有区域都将被强制设定一个设定点，而不管其自己的模式：

- **Away** 设定点为 12 °C
- **HeatingOff** 设定点为最小值，通常为 4 °C

对于 **Away**，DHW 控制器也将关闭。

某些位置有一个隐藏模式 **AutoWithReset**，它的行为类似于 **Auto**，并将所有区域重置为 **FollowSchedule**。

在 Home Assistant 架构中，所有这些都通过 `HVAC_MODE` 和 `PRESET_MODE` 的组合完成（但也请参阅下面的状态属性 `system_mode_status` 和 `setpoint_status`）。

## 动作调用

此集成提供自己的动作来公开 TCC 系统的全部功能，超越 Home Assistant 标准化架构的限制。大多数情况下，这与指定模式更改的持续时间有关，之后实体将恢复为 **Auto** 或 **FollowSchedule**（分别用于位置和区域）。

建议尽可能使用本机动作（例如 `evohome.set_system_mode`）而不是 Home Assistant 的通用等效动作（例如 `climate.set_hvac_mode`）。但是，可能需要使用通用动作与第三方系统（如 Amazon Alexa 或 Google Home）集成。

### evohome.set_system_mode

此动作调用将在指定时间段内设置系统的操作 `mode`，之后它将恢复为 **Auto**。但是，如果未提供时间段，则更改是永久的。

对于 **AutoWithEco**，时间段是 `duration`，最长为 24 小时。

```yaml
- actions:
    - action: evohome.set_system_mode
      data:
        mode: AutoWithEco
        duration: {hours: 1, minutes: 30}
```

对于其他模式，如 **Away**，持续时间是天数的 `period`，其中 1 天将在今晚午夜恢复，2 天将在明天午夜恢复。

```yaml
- actions:
    - action: evohome.set_system_mode
      data:
        mode: Away
        period: {days: 30}
```

### evohome.reset_system

此动作将系统的操作模式设置为 **AutoWithReset**，并将所有区域重置为 **FollowSchedule**。

并非所有系统都支持此功能。

### evohome.refresh_system

此动作将立即从供应商服务器拉取最新状态数据，而不是等待下一个 `scan_interval`。

### evohome.set_zone_override

此动作将在指定时间段内设置区域（由其 `entity_id` 标识）的 `setpoint`（**TemporaryOverride**）。但是，如果未提供时间段（即持续时间为 0，见下文），则更改是永久的（**PermanentOverride**）。

```yaml
- actions:
    - action: evohome.set_zone_override
      target:
        entity_id: climate.loungeroom
      data:
        setpoint: 10
```

`duration` 最长可为 24 小时，之后区域模式将恢复为计划（**FollowSchedule**）。如果 `duration` 为 0 小时，则更改将持续到下一个设定点。

```yaml
- actions:
    - action: evohome.set_zone_override
      target:
        entity_id: climate.loungeroom
      data:
        setpoint: 10
        duration: {minutes: 0}
```

### evohome.clear_zone_override

此动作用于将区域（由其 `entity_id` 标识）设置为 **FollowSchedule**。

## 有用的 Jinja 模板

Evohome 实体的实际操作模式可以通过其状态属性跟踪，其中包括当前状态的 JSON 数据结构 `status`。

对于位置（控制器），请参阅 `system_mode_status`：


```text
{% if state_attr('climate.my_home', 'status').system_mode_status.mode == "Away" %}
  系统处于离开模式
{% else %}
  系统不处于离开模式
{% endif %}
```


对于区域，是 `setpoint_status`：


```text
{{ state_attr('climate.kitchen', 'status').setpoint_status.setpoint_mode }}
```


区域将公开当前/即将到来的计划 `setpoints`：


```text
{{ state_attr('climate.kitchen', 'status').setpoints.next_sp_temp }}
```


所有 Evohome 实体可能有故障，这些可以转换为传感器，或者：


```text
{% if state_attr('climate.bedroom', 'status').active_faults %}
  {% if state_attr('climate.bedroom', 'status').active_faults[0].faultType == 'TempZoneActuatorLowBattery' %}
    电池电量低
  {% endif %}
    存在故障！
{% else %}
  好耶，一切正常 :)
{% endif %}
```

