---
title: X
description: 'X 集成使用 X(https://twitter.com) 从 Home Assistant 发送通知。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Notifications
ha_release: 0.12
ha_domain: twitter
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
ha_quality_scale: legacy
---
# X

**X** 集成使用 [X](https://twitter.com) 从 Home Assistant 发送通知。

## 设置

请确保你已注册 X 开发者账号，然后前往 [X Apps](https://developer.twitter.com/en/portal/dashboard) 创建一个应用。如果你还没有开发者账号，则需要先申请，审批可能需要一些时间。

### 应用权限

如果你不执行此步骤，你的应用将只获得读取权限，无法代表你的 X 账号发布推文。

1. 打开应用的 **Settings**。
2. 在 **User authentication settings** 下选择 `Set up`。
3. 勾选 `OAuth 1.0a`。
4. 将应用权限设为 `Read and write`。
5. 输入 `callback` 和 `website` URL，然后点击保存。

对于此集成来说，`callback` 或 `website` URL 填什么并不重要。

### 生成令牌和密钥

1. 打开应用的 **Keys and tokens**。
2. 在 **Consumer keys** 下选择 `Regenerate`，获取你的 **Consumer Key** 和 **Consumer Secret**。
3. 在 **Access Tokens and Secret** 下选择 `Regenerate`，获取你的 **Access Token** 和 **Access Token Secret**。

## 配置

要将 X 添加到你的安装中，请将以下内容添加到你的 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
notify:
  - name: NOTIFIER_NAME
    platform: twitter
    consumer_key: YOUR_API_KEY
    consumer_secret: YOUR_API_SECRET
    access_token: YOUR_ACCESS_TOKEN
    access_token_secret: YOUR_ACCESS_SECRET
```

```yaml
name:
  description: 设置可选参数 `name` 可创建多个通知器。该通知器将绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  default: "`notify`"
  type: string
consumer_key:
  description: 该应用的 Consumer Key（API Key）。
  required: true
  type: string
consumer_secret:
  description: 该应用的 Consumer Secret（API Secret）。
  required: true
  type: string
access_token:
  description: 该应用的 Access Token。
  required: true
  type: string
access_token_secret:
  description: 该应用的 Access Token Secret。
  required: true
  type: string
username:
  description: "用于私信时，可填写不带 `@` 的 X 用户名，或带 `@` 并加引号。"
  required: false
  type: string
```

要使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。
