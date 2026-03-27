---
title: Remember The Milk
description: 'Remember The Milk 集成允许您从 Home Assistant 在 Remember The Milk (RTM)(https://www.rememberthemilk.com) 中创建任务。如果您希望 Home Assistant 发送一些不该忘记的待办事项，例如给植物浇水。'
ha_category:
  - Calendar
ha_iot_class: Cloud Push
ha_release: 0.57
ha_domain: remember_the_milk
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Remember The Milk

**Remember The Milk** 集成允许您从 Home Assistant 在 [Remember The Milk (RTM)](https://www.rememberthemilk.com) 中创建任务。如果您希望 Home Assistant 发送一些不该忘记的待办事项，例如给植物浇水，就可以使用此集成。该集成允许您同时使用多个 RTM 账户。

## 设置

设置分为两步：获取 API 密钥并注册账户。

### 第 1 步：API 密钥

要使用此集成，您需要拥有一个 Remember The Milk 账户，并申请自己的 [API 密钥](https://www.rememberthemilk.com/services/api/keys.rtm)。获得 API 密钥时，您还会收到个人 shared secret。这两项都需要存储在 Home Assistant 的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目

remember_the_milk:
  - name: your_rtm_account
    api_key: YOUR_API_KEY
    shared_secret: YOUR_SHARED_SECRET

```

```yaml
  name:
    description: RTM 账户名称。由于您可以在 RTM 中使用多个账户，因此该名称必须唯一。
    required: true
    type: string
  api_key:
    description: 在此填写您收到的 API 密钥。
    required: true
    type: string
  shared_secret:
    description: 在此填写您收到的 shared secret。
    required: true
    type: string
```

### 第 2 步：注册账户

保存配置后，您需要重新启动 Home Assistant。首次启动时，您会在 Home Assistant 页面上看到一个新的“Configuration”面板。打开该配置页面后，点击“Remember The Milk login”链接。这样会跳转到登录页面，您需要使用常规的 Remember The Milk 账户凭据登录。这将授权 Home Assistant 访问您的 Remember The Milk 账户。

之后点击“login completed”按钮。这会通知 Home Assistant：您已经在 Remember The Milk 页面上完成登录流程，Home Assistant 可以尝试使用该账户完成注册。

如果注册成功，Configuration 面板将从 Home Assistant 界面中消失，并出现一个 Remember The Milk 面板。至此设置完成。

在后台，Home Assistant 会从 Remember The Milk 服务器下载一个“token”，并将其保存在本地的 `remember_the_milk.conf` 文件中。因此您只需要注册一次。之后会使用该 token 与服务器进行身份验证。

## 使用 `create_task` 服务创建/更新任务

此集成提供了一个新的服务域 `remember_the_milk`，其中包含 `<account>_create_task` 服务。您可以使用参数 `name` 以及可选参数 `id` 调用该服务，在 Remember The Milk 账户中创建新任务。您可以在常规自动化中调用该服务。

如果您设置了 `id`，并且已经存在具有该 id 的任务，则会更新现有任务，而不是创建新任务。这样您就可以修改任务名称。如果不设置 `id`，则每次调用都会创建一个新任务。如果您是在自动化中使用该服务，可以把自动化名称或触发该任务创建的实体作为 id，这样之后就可以更新或完成该任务。

任务创建支持“smart syntax”。例如，要创建一个标签为 `from_hass` 且今天到期的任务，您可以将任务名称写成 `test task created in Home Assistant ^today #from_hass`。关于 smart syntax 的更多信息，请参阅 [Remember The Milk 文档](https://www.rememberthemilk.com/help/answer/basics-smartadd-howdoiuse)。

**注意：**
目前，在更新任务时 *不支持* smart syntax。更新期间，所有 smart syntax 命令都会被忽略，并作为普通文本保留在任务名称中。

| 数据属性 | 可选 | 说明 | 示例 |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------- | --------------------------- |
| name                   | 否       | 新任务的名称，可在此使用 smart syntax。 | "do this ^today #from_hass" |
| id                     | 是       | 正在创建的任务标识符，可用于后续更新或完成该任务。 | "myid"                      |

## 使用 `complete_task` 服务完成任务

完成一个先前由 Home Assistant 创建的任务。您无法完成在 Home Assistant 之外创建的任务。

如果您在创建任务时设置了 `id`，则可通过传入参数 `id` 调用 `<account>_complete_task` 来完成该任务。

| 数据属性 | 可选 | 说明 | 示例 |
| ---------------------- | -------- | -------------------------------------------------- | ------- |
| id                     | 否       | 创建任务时定义的标识符。 | "myid"  |

## 自动化示例

下面是一个自动化示例：当 `sensor.mysensor` 为 `on` 时创建一个新任务，而当该传感器变为 `off` 时完成任务。这样就能提醒您将其关闭。通过将 `entity_id` 用作任务 ID，您也可以将同一条规则用于多个传感器。


```yaml
- triggers:
    - trigger: state
      entity_id: sensor.mysensor
      to: "on"
  actions:
    - action: remember_the_milk.myaccount_create_task
      data:
        name: "Please switch off {{trigger.entity_id}}"
        id: "{{trigger.entity_id}}"
- triggers:
    - trigger: state
      entity_id: sensor.mysensor
      to: "off"
  actions:
    - action: remember_the_milk.myaccount_complete_task
      data:
        id: "{{trigger.entity_id}}"
```


## 免责声明

此集成使用 Remember The Milk API，但未获得 Remember The Milk 的认可或认证。
