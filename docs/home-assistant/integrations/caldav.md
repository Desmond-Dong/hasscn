---
title: CalDAV
description: 'CalDAV integration 允许您将 WebDAV 日历连接到 Home Assistant，作为以下实体类型之一：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Calendar
  - To-do List
ha_iot_class: Cloud Polling
ha_release: '0.60'
ha_domain: caldav
ha_platforms:
  - calendar
  - todo
ha_integration_type: service
ha_config_flow: true
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - docs: /integrations/calendar
    title: Calendar
  - docs: /docs/configuration/
    title: Configuration file
---
# CalDAV

**CalDAV** integration 允许您将 WebDAV 日历连接到 Home Assistant，作为以下实体类型之一：

- 一个[日历](/home-assistant/integrations/calendar)实体，可用于根据事件名称或描述等条件，在事件开始或结束时触发自动化。
- 一个[todo](/home-assistant/integrations/todo)实体，用于跟踪待办事项列表上的活动项目数量。

WebDAV 实体大约每 15 分钟更新一次。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

在配置流程中，您将被要求输入 CalDAV 服务器及其凭据。示例 CalDAV URL 为 `https://caldav.icloud.com/`。

此集成已针对以下系统进行测试，但任何其他符合 RFC4791 的系统应该也能工作：

- [Baikal](https://sabre.io/baikal/)
- [iCloud Calendar](https://www.icloud.com/calendar/)
- [Nextcloud](https://nextcloud.com/)
- [Owncloud](https://owncloud.org/)
- [Synology Calendar](https://www.synology.com/en-us/dsm/feature/calendar)

## 手动配置

您也可以通过将以下部分添加到 "`configuration.yaml`" 文件中，在 Home Assistant 中手动添加 WebDAV 日历。此方法不支持待办事项列表。
:::tip
更改配置后需要重启 Home Assistant。
:::

<details>
<summary>手动配置示例</summary>


```yaml
# 示例 configuration.yaml 条目（适用于 baikal）
calendar:
  - platform: caldav
    username: john.doe@test.com
    password: !secret caldav
    url: https://baikal.my-server.net/cal.php/calendars/john.doe@test.com/default
```

```yaml
# 示例 configuration.yaml 条目（适用于 nextcloud），日历将自动发现
calendar:
  - platform: caldav
    username: john.doe
    password: !secret caldav
    url: https://nextcloud.example.com/remote.php/dav
```

```yaml
# 示例 configuration.yaml 条目（适用于 Radicale），日历将自动发现
calendar:
  - platform: caldav
    username: john.doe
    password: !secret caldav
    url: https://radicale.example.com/
```

```yaml
# 示例 configuration.yaml 条目（适用于 iCloud），日历将自动发现
calendar:
  - platform: caldav
    username: !secret userIcloud
    password: !secret passIcloud
    url: https://caldav.icloud.com
```

使用 yaml 配置时，默认不支持全天事件。

以下示例创建匹配特定搜索条件的日历实体。

```yaml
# 示例 configuration.yaml 条目
calendar:
  - platform: caldav
    username: john.doe@test.com
    password: !secret caldav
    url: https://baikal.my-server.net/cal.php/calendars/john.doe@test.com/default
    custom_calendars:
      - name: "HomeOffice"
        calendar: "Agenda"
        search: "HomeOffice"
      - name: "WarmupFlat"
        calendar: "Agenda"
        search: "Warmup"
```

这将为日历名称 Agenda 创建两个实体："HomeOffice" 和 "WarmupFlat"，其中事件匹配 `search` 中指定的正则表达式。在自定义日历中，会考虑持续一整天的事件。

请注意，如果您使用 `custom_calendars` 选项，则只会加载这些日历。您不能在同一配置中使用 `calendars` 和 `custom_calendars`。

```yaml
url:
  required: true
  description: 日历的完整 URL。
  type: string
username:
  required: false
  description: 用于身份验证的用户名。
  type: string
password:
  required: false
  description: 用于身份验证的密码。
  type: string
calendars:
  required: false
  description: 要过滤的日历列表。为空或不存在表示不过滤，即添加所有日历。如果使用 `custom_calender` 选项则不能使用此项。
  type: list
custom_calendars:
  required: false
  description: 您想创建的任何自定义日历的详细信息。使用此项将只加载提供的自定义日历。不会加载其他日历。
  type: list
  keys:
    name:
      required: true
      description: 自定义日历的名称。
      type: string
    calendar:
      required: true
      description: 要搜索的源日历。
      type: string
    search:
      required: true
      description: 根据事件摘要、描述或位置内容过滤事件的正则表达式。
      type: string
days:
  required: false
  description: 搜索即将到来的预约的天数。
  default: 1
  type: integer
verify_ssl:
  description: 是否验证 SSL 证书。如果使用自签名证书，通常需要设置为 "False"。
  required: false
  type: boolean
  default: true
```


</details>

## 日历事件自动化

单个日历*事件*可以为自动化提供支持，例如：

- 在名为 *前院灯* 的事件*开始*时打开灯
- 在*任何事件开始前 5 分钟*发送通知
- 在名为 *锻炼* 的事件*结束 30 分钟后*停止媒体播放器。

有关概述，请参阅[日历自动化](/home-assistant/integrations/calendar#automation)，并阅读有关[日历触发变量](/home-assistant/docs/automation/templating/#calendar)的更多信息，了解您可以在条件或动作中使用的可用信息，如事件 `summary`、`description`、`location` 等。

## 日历实体属性

日历实体具有与单个下一个即将发生的事件相关的额外属性。

:::tip
使用实体状态和属性比使用日历自动化更容易出错且灵活性较低。日历实体本身可能只跟踪单个即将发生的活动事件，无法处理具有相同开始时间的多个事件或重叠事件。

:::
- **offset_reached**：如果在事件标题中设置并解析出来，当标题中的偏移分钟数达到时将为开/关。因此标题非常重要的会议 `!! -10` 将在事件开始前 10 分钟触发此属性为开。格式应为 `HH:MM` 或 `MM`。从 UI 配置时此属性不可用。
- **all_day**：如果这是全天事件则为 `True/False`。如果没有找到事件则为 `False`。
- **message**：提取了 `search` 值后的事件标题。因此在上述 `offset_reached` 示例中，消息将设置为非常重要的会议
- **description**：事件描述。
- **location**：事件位置。
- **start_time**：事件开始时间。
- **end_time**：事件结束时间。

## 待办事项实体

待办事项实体是待办事项列表上未完成项目的数量。有关详细信息以及可在自动化中使用的可用动作，请参阅 [todo 集成](/home-assistant/integrations/todo)文档。

## 故障排除

<details>
<summary>iCloud</summary>


您可能需要使用[应用专用密码](https://support.apple.com/en-us/102654)为 Home Assistant 生成新密码，以避免共享您的 iCloud 账户密码。


</details>