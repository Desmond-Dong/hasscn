---
title: Google Calendar
description: 'Google Calendar integration 允许您将 Google 日历(https://calendar.google.com)连接到 Home Assistant。该集成添加 calendar 实体，这些实体显示在日历仪表板上，可用于基于任何事件的自动化，或限于特定匹配条件。'
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: 0.33
ha_config_flow: true
ha_domain: google
ha_platforms:
  - calendar
  - diagnostics
ha_codeowners:
  - '@allenporter'
ha_integration_type: service
google_dev_console_link: https://console.developers.google.com/apis/credentials
api: Google Calendar API
api_link: https://console.cloud.google.com/apis/library/calendar-json.googleapis.com
---
# Google Calendar

**Google Calendar** integration 允许您将 [Google 日历](https://calendar.google.com)连接到 Home Assistant。该集成添加 calendar 实体，这些实体显示在*日历*仪表板上，可用于基于任何事件的自动化，或限于特定匹配条件。

## 前提条件

您需要配置开发者凭据以允许 Home Assistant 访问您的 Google 账户。当前推荐的方法是为 Google 日历创建 *Web Auth* 凭据，因为相同的凭据适用于所有 Google 集成。以前，此集成仅支持 *Device Auth* 凭据，这些凭据不再推荐。您可以继续使用 *Device Auth* 凭据，但它们仅适用于 Google 日历。

### Scenario 1: You already have credentials

In this case, all you need to do is enable the API:

1. Go to the Google Developers Console [Google Calendar API](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com).
2. Confirm the project and select **Enable** for the API.
3. Continue with the steps described in the [Configuration](#configuration) section.

### Scenario 2: You do not have credentials set up yet

In this case, you need to generate a client secret first:

<details>
<summary>To generate client ID and client secret</summary>

This section explains how to generate a client ID and client secret in the [Google Developers Console](https://console.developers.google.com/apis/credentials).

1. First, go to the Google Developers Console to enable [Google Calendar API](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com).
2. Select **Create project**, enter a project name, and select **Create**.
3. Enable Google Calendar API.
4. Navigate to **APIs & Services** > [Credentials](https://console.cloud.google.com/apis/credentials).
5. In the left sidebar, select **OAuth consent screen**.
6. Complete the app information and create the consent screen.
7. Under **Publishing status** > **Testing**, select **Publish app**.
8. In the left sidebar, select **Clients** and create a **Web application** client.
9. Add `https://my.home-assistant.io/redirect/oauth` to **Authorized redirect URIs** and select **Create**.
10. Copy the **Client ID** and **Client Secret** before closing the dialog.

</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The integration setup then gives you instructions to enter the [Application Credentials](/home-assistant/integrations/application_credentials/) and authorize Home Assistant to connect to Google Calendar.

<details>
<summary>OAuth and device authorization steps</summary>

1. Continue through the steps of selecting the account you want to authorize.
2. You may get a message telling you that the app has not been verified and that you need to acknowledge it to proceed.
3. Review what Home Assistant is requesting access to, then select **Continue**.
4. When the page displays **Link account to Home Assistant?**, confirm that **Your instance URL** is correct, then select **Link Account**.
5. You can close the window and return to Home Assistant, where you should see a **Success!** message.

</details>

## 故障排除

如果设置过程失败并且您看到错误消息，例如*身份验证代码已过期，请重试*，您可能需要重新尝试流程。您还可以检查日志中的其他错误消息，这些消息可能指示配置错误，例如无效的客户端 ID 或密钥。

如果您的凭据有错误，您可以在[应用程序凭据](/home-assistant/integrations/application_credentials/)用户界面中删除它们。

### 视频教程
此视频教程介绍了如何在 Home Assistant 中设置 Google 日历以及如何根据日历事件触发自动化。

<lite-youtube videoid="r2WbpxKDOD4" videotitle="How To Use Calendar Events in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>

## 日历实体

*我的日历*中的每个 Google 日历（[更多信息](https://support.google.com/calendar/answer/37095)）在 Home Assistant 中表示为[日历](/home-assistant/integrations/calendar)实体。

例如，您名为 *Personal* 的日历将创建为实体 `calendar.personal`。您可以重命名实体，或禁用任何您不需要的实体。

## 日历事件自动化

单个日历*事件*是为自动化提供支持的内容，例如：

- 在名为 *前院灯* 的事件*开始*时打开灯
- 在*任何事件开始前 5 分钟*发送通知
- 在名为 *锻炼* 的事件*结束 30 分钟后*停止媒体播放器。

有关概述，请参阅[日历自动化](/home-assistant/integrations/calendar#automation)，并阅读有关[日历触发变量](/home-assistant/docs/automation/templating/#calendar)的更多信息，了解您可以在条件或动作中使用的可用信息，如事件 `summary`、`description`、`location` 等。

## 日历实体属性

日历实体具有与单个下一个即将发生的事件相关的额外属性。

:::tip
使用实体状态和属性比使用日历自动化更容易出错且灵活性较低。日历实体本身可能只跟踪单个即将发生的活动事件，无法处理具有相同开始时间的多个事件或重叠事件。

:::
<details>
<summary>属性</summary>


- **all_day**：如果这是全天事件则为 `true`/`false`。如果没有找到事件则为 `false`。
- **message**：事件摘要。
- **description**：事件描述。
- **location**：事件位置。
- **start_time**：事件开始时间。
- **end_time**：事件结束时间。


</details>

### 动作：创建事件

`google.create_event` 动作允许您在日历中创建新的日历事件。

<details>
<summary>创建事件动作详情</summary>


:::note
只有在配置选项中授予了 Home Assistant `read-write` 访问权限，此功能才可用。

:::
使用[目标选择器](/home-assistant/docs/blueprint/selectors/#target-selector)选择日历 `target`，`data` 负载支持以下字段：

| 数据属性 | 可选 | 描述                                         | 示例             |
| ---------------------- | -------- | --------------------------------------------------- | ------------------- |
| `summary`              | 否       | 作为事件的标题。                     | 保龄球             |
| `description`          | 是      | 事件的描述。                       | 生日保龄球    |
| `start_date_time`      | 是      | 事件应开始的日期和时间。           | 2019-03-10 20:00:00 |
| `end_date_time`        | 是      | 事件应结束的日期和时间。             | 2019-03-10 23:00:00 |
| `start_date`           | 是      | 全天事件应开始的日期。          | 2019-03-10          |
| `end_date`             | 是      | 全天事件应结束的日期。            | 2019-03-11          |
| `in`                   | 是      | 您想要在多少天或几周内创建事件。 | "days": 2           |
| `location`             | 是      | 事件的位置。                          | 保龄球中心      |

:::important
您要么使用 `start_date_time` 和 `end_date_time`，要么使用 `start_date` 和 `end_date`，要么使用 `in`。

:::
这是 YAML 中动作的完整示例：

```yaml
action: google.create_event
target:
  entity_id: calendar.device_automation_schedules
data:
  summary: "示例"
  start_date: "2022-10-1"
  end_date: "2022-10-2"
```


</details>

## 更多配置


<details>
<summary>更多配置</summary>


:::warning
不建议新用户使用这些设置，因为它们与其他 Home Assistant 功能不兼容，但此文档可供现有用户使用。

:::
集成支持从 `google_calendars.yaml` 文件进行额外配置，该文件适用于 `2022.06` 之前的现有用户。此文件不再自动填充。

```yaml
cal_id:
  description: 此日历的 Google *生成*唯一 ID。
  required: true
  type: string
  default: "**不要更改默认值**"
entities:
  description: 是的，您可以为日历创建多个传感器！
  required: true
  type: list
  keys:
    device_id:
      description: >
        您的所有自动化/脚本将用于引用此设备的名称。
      required: true
      type: string
    name:
      description: 您将在前端看到的传感器名称。
      required: true
      type: string
    search:
      description: 如果设置，将仅触发匹配的事件。
      required: false
      type: string
    offset:
      description: >
        事件标题中位于数字之前的一组字符，用于指定传感器上的预触发状态更改。
        格式应为 HH:MM 或 MM。
      required: false
      type: string
      default: "!!"
    ignore_availability:
      description: "我们是否应该遵守 `空闲`/`忙碌` 标志？"
      required: false
      type: boolean
      default: true
```


</details>