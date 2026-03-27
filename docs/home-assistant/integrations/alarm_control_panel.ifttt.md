---
title: "IFTTT 报警控制面板"
description: 'IFTTT 集成允许您集成没有开放 API 但可以通过 IFTTT(https://ifttt.com/explore) 控制的安全系统。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Alarm
ha_release: 0.66
ha_domain: ifttt
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# IFTTT 报警控制面板

**IFTTT** 集成允许您集成没有开放 API 但可以通过 [IFTTT](https://ifttt.com/explore) 控制的安全系统。

此集成依赖于 [IFTTT](/home-assistant/integrations/ifttt/) Home Assistant 集成。请参阅集成文档进行设置。

:::note
需要注意的是，此平台完全依赖 IFTTT 来接收安全系统状态变化时的更新。因此，此平台显示的是推测状态。

:::
## 配置

要启用此功能，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
ifttt:
  key: YOUR_WEBHOOK_KEY

alarm_control_panel:
  - platform: ifttt
    name: YOUR_ALARM_NAME
    code: YOUR_ALARM_CODE
    event_arm_away: YOUR_ARM_AWAY_EVENT
    event_arm_home: YOUR_ARM_HOME_EVENT
    event_arm_night: YOUR_ARM_NIGHT_EVENT
    event_disarm: YOUR_DISARM_EVENT
```

```yaml
name:
  description: Home Assistant 报警控制面板的名称。
  required: false
  type: string
code:
  description: 报警控制面板的密码。
  required: false
  type: string
code_arm_required:
  description: 如果为 true，则需要密码来布防报警。
  required: false
  type: boolean
  default: true
event_arm_away:
  description: 当状态设置为外出布防时要调用的 IFTTT webhook 事件。
  required: false
  type: string
  default: alarm_arm_away
event_arm_home:
  description: 当状态设置为在家布防时要调用的 IFTTT webhook 事件。
  required: false
  type: string
  default: alarm_arm_home
event_arm_night:
  description: 当状态设置为夜间布防时要调用的 IFTTT webhook 事件。
  required: false
  type: string
  default: alarm_arm_night
event_disarm:
  description: 当状态设置为撤防时要调用的 IFTTT webhook 事件。
  required: false
  type: string
  default: alarm_disarm
optimistic:
  description: 指定状态是否由 ifttt.push_alarm_state 调用更新（false）或可以立即设置（true）。
  required: false
  type: boolean
  default: false
```

:::warning
强烈建议在不使用加密时不要使用此平台；否则，您的 API 密码将通过 IFTTT Webhooks 不受保护地发送。建议[使用 Let's Encrypt 设置加密](/home-assistant/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/)。


:::
### 所需的 IFTTT 小程序

接下来，您需要设置以下所需的 IFTTT 小程序。

此平台支持 `alarm_disarm`、`alarm_arm_away`、`alarm_arm_home` 和 `alarm_arm_night` 动作。对于每个动作，都会触发一个 IFTTT webhook。

为了使此系统正常运行，必须设置以下 IFTTT 小程序。显然，如果您的报警设备不支持某些状态，则无需为这些状态提供小程序。

- **IF** Webhook 事件 `YOUR_DISARM_EVENT` 被调用，**THEN** 撤防报警系统。
- **IF** Webhook 事件 `YOUR_ARM_HOME_EVENT` 被调用，**THEN** 将报警系统设置为在家布防。
- **IF** Webhook 事件 `YOUR_ARM_NIGHT_EVENT` 被调用，**THEN** 将报警系统设置为外出布防。
- **IF** Webhook 事件 `YOUR_DISARM_EVENT` 被调用，**THEN** 将报警系统设置为夜间布防。
- **IF** 报警系统已撤防，**THEN** 执行 Webhook `POST` web 请求到 URL `https://HASS_URL/api/services/ifttt/push_alarm_state?api_password=API_PASSWORD`，内容类型为 `application/json`，正文为 `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "disarmed"}`。
- **IF** 报警系统状态变为在家布防，**THEN** 执行 Webhook `POST` web 请求到 URL `https://HASS_URL/api/services/ifttt/push_alarm_state?api_password=API_PASSWORD`，内容类型为 `application/json`，正文为 `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "armed_home"}`。
- **IF** 报警系统状态变为外出布防，**THEN** 执行 Webhook `POST` web 请求到 URL `https://HASS_URL/api/services/ifttt/push_alarm_state?api_password=API_PASSWORD`，内容类型为 `application/json`，正文为 `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "armed_away"}`。
- **IF** 报警系统状态变为夜间布防，**THEN** 执行 Webhook `POST` web 请求到 URL `https://HASS_URL/api/services/ifttt/push_alarm_state?api_password=API_PASSWORD`，内容类型为 `application/json`，正文为 `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "armed_night"}`。