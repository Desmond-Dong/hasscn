---
title: GitHub
description: 关于如何将 GitHub 集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 0.88
ha_iot_class: Cloud Polling
ha_domain: github
ha_platforms:
  - diagnostics
  - sensor
ha_codeowners:
  - '@timmo001'
  - '@ludeeus'
ha_integration_type: service
---

**GitHub** 集成允许您监控您喜欢的 [GitHub](https://github.com/) 公共仓库。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

当您设置此集成时，系统将首先引导您允许集成代表您使用 [GitHub API](https://docs.github.com/en/rest)。如果您还没有 [GitHub](https://github.com/) 账户，系统会在集成配置过程中提示您创建一个。

当您授权集成后，您可以选择要监控的仓库，该列表包含您使用账户在 GitHub 上创建和[加星](https://github.com/stars)的仓库。

该集成通过订阅仓库上的事件来为实体提供类似推送的体验，这意味着当创建新问题、当有人打开带有修复的拉取请求，或当您期待的新版本刚刚发布时，此集成将帮助您在发生时立即获取信息。

## 移除授权

从 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 移除集成后，您需要手动撤销 OAuth 应用程序授权。

1. 转到您的 [已授权 OAuth 应用](https://github.com/settings/applications)
2. 找到"Home Assistant GitHub Integration"应用程序
3. 点击名称右侧的 3 个点（`...`）
4. 选择"Revoke"

## 动作

当您在此集成中配置要跟踪的仓库时，它将在设备面板中表示为一个服务，所有与该仓库相关的实体都将嵌套在该设备下。该设备还提供 GitHub 上仓库的链接以及下载该服务[诊断信息](/home-assistant/integrations/diagnostics)的选项。

<picture>
  <source srcset="/images/integrations/github/service_dark.png" media="(prefers-color-scheme: dark)">
  <img src="/home-assistant/images/integrations/github/service_light.png">
  <p>
</picture>

## 提供的实体

### 最新提交

此传感器显示默认分支中最新提交的消息作为状态。

传感器为最新提交提供额外的属性：

- `sha`：提交的 SHA
- `url`：将在 GitHub 上显示该提交的 URL

### 最新讨论

此传感器显示最新创建的讨论标题作为状态。

传感器为最新讨论提供额外的属性：

- `number`：讨论被分配的数字 ID
- `url`：将在 GitHub 上显示该讨论的 URL

### 最新问题

此传感器显示最新创建的问题标题作为状态。

传感器为最新问题提供额外的属性：

- `number`：问题被分配的数字 ID
- `url`：将在 GitHub 上显示该问题的 URL

### 最新拉取请求

此传感器显示最新创建的拉取请求标题作为状态。

传感器为最新拉取请求提供额外的属性：

- `number`：拉取请求被分配的数字 ID
- `url`：将在 GitHub 上显示该拉取请求的 URL

### 最新发布

此传感器显示仓库中最新创建的发布标题。

传感器为最新发布提供额外的属性：

- `tag`：发布创建的标签名称
- `url`：将在 GitHub 上显示该发布的 URL

### 最新标签

此传感器显示仓库中最新创建的标签标题。

传感器为最新标签提供额外的属性：

- `url`：将在 GitHub 上显示标签创建的提交的 URL

### 诊断实体

这些实体是简单的诊断实体，没有任何额外的属性：

- **讨论**：显示讨论数量
- **复刻**：显示复刻数量
- **问题**：显示开放问题数量
- **拉取请求**：显示开放拉取请求数量
- **星标**：显示星标数量
- **关注者**：显示关注者数量

## 自动化

以下是一些关于如何使用此集成提供的实体进行自动化的小示例。

:::note
请记住，这些示例中使用的动作名称和实体 ID 也是示例，您需要将其替换为您安装中拥有的动作和实体。

:::
### 通知新发布

此示例使用此集成提供的 [最新发布](#latest-release) 实体和一个 [notify](/home-assistant/integrations/notify) 动作，


```yaml
triggers:
  - trigger: state
    entity_id: sensor.awesome_repository_latest_release
actions:
  - action: notify.notify
    data:
      title: "新的 github/repository 发布"
      message: >-
        新发布的链接：
        https://github.com/github/repository/releases/{{ trigger.to_state.state }}

```


### 通知新星标

此示例使用此集成提供的 [星标](#diagnostic-entities) 诊断实体和一个 [notify](/home-assistant/integrations/notify) 动作，


```yaml
triggers:
  - trigger: state
    entity_id: sensor.awesome_repository_stars
actions:
  - action: notify.notify
    data:
      title: "新的 github/repository 星标"
      message: >-
        github/repository 再次被加星！
        总星标数现在是：{{ trigger.to_state.state }}
```

