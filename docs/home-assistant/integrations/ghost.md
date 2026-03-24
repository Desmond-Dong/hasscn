---
title: Ghost
description: 关于如何将 Ghost 与 Home Assistant 集成的说明。
ha_category:
  - Sensor
ha_release: '2026.3'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@johnonolan'
ha_domain: ghost
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

**Ghost** 集成允许您在 Home Assistant 中监控您的 [Ghost](https://ghost.org) 发布指标，包括成员数量、收入、文章统计和电子邮件通讯性能。

## 前提条件

- 运行版本 5.0 或更高版本的 Ghost 站点
- Ghost 管理员员工用户账户

### 创建 Ghost Admin API 集成

1. 在 Ghost Admin 中，前往 **设置** > **集成**。
2. 在 **自定义集成** 下，选择 **添加自定义集成**。
3. 输入名称，如 **Home Assistant**。
4. 复制 **API URL**。
5. 复制 **Admin API 密钥**。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
API URL:
    description: "Ghost 站点的 API URL。您可以在 Ghost Admin 的 **设置** > **集成** > **自定义** 下找到它。"
Admin API Key:
    description: "Ghost 站点的 Admin API 密钥。您可以在 Ghost Admin 的 **设置** > **集成** > **自定义** 下找到它。"
```

## 支持的功能

### 实体

**Ghost** 集成提供以下实体。

#### 传感器

##### 成员指标

- **总成员数**：订阅者总数
- **付费成员数**：付费订阅者数量
- **免费成员数**：免费订阅者数量
- **赠送成员数**：赠送订阅者数量

##### 收入指标

- **MRR**：月度经常性收入（美元）
- **ARR**：年度经常性收入（美元）

##### 内容指标

- **已发布文章**：已发布文章数量
- **草稿文章**：草稿文章数量
- **计划发布文章**：计划发布文章数量
- **最新文章**：最新文章的标题
- **总评论数**：评论总数

##### 电子邮件通讯指标

- **最新邮件**：最新通讯的标题
- **最新邮件发送数**：发送的邮件数量
- **最新邮件打开数**：打开的邮件数量
- **最新邮件打开率**：打开率百分比
- **最新邮件点击数**：链接点击次数
- **最新邮件点击率**：点击率百分比

##### SocialWeb (ActivityPub) 指标

- **SocialWeb 关注者**：联邦宇宙关注者数量
- **SocialWeb 正在关注**：正在关注的账户数量

##### 通讯订阅者

对于您 Ghost 站点上的每个活动通讯，都会创建一个额外的传感器，显示该通讯的订阅者数量。

## 数据更新

集成每 5 分钟 polls 您的 Ghost 站点一次以更新传感器数据。

## 示例

### 宣布里程碑成员数量


```yaml
automation:
  - alias: "成员里程碑庆祝"
    triggers:
      - trigger: state
        entity_id: sensor.my_ghost_site_total_members
    conditions:
      - condition: template
        value_template: "{{ trigger.to_state.state | int % 100 == 0 }}"
    actions:
      - action: notify.mobile_app
        data:
          title: "达到里程碑！"
          message: "您现在有 {{ trigger.to_state.state }} 位成员！"
```


## 已知限制

- 收入指标（MRR/ARR）仅适用于已连接 Stripe 的站点。
- ActivityPub/SocialWeb 指标需要 Ghost 6 或更高版本并启用 ActivityPub。

## 故障排除

### 无效的 API 密钥

#### 症状：设置过程中出现"无效的 API 密钥"错误

尝试设置集成时，您收到"无效的 API 密钥"错误。

##### 描述

当 API 密钥格式不正确或密钥已失效时，会出现此错误。

##### 解决方案

要解决此问题，请尝试以下步骤：

1. 确保 API 密钥包含冒号（`:`）分隔密钥 ID 和密文（格式：`id:secret`）。
2. 验证您复制的是 Admin API 密钥，而不是 Content API 密钥。
3. 检查 Ghost 中的自定义集成是否未被删除或重新生成。

### 无法连接到 Ghost

#### 症状：设置过程中出现"无法连接"错误

尝试设置集成时，您收到连接错误。

##### 描述

当 Home Assistant 无法访问您的 Ghost 站点时，会出现此错误。

##### 解决方案

要解决此问题，请尝试以下步骤：

1. 验证 API URL 正确并包含协议（例如，`https://example.com`）。
2. 确保您的 Ghost 站点可从 Home Assistant 实例访问。
3. 检查是否有防火墙或代理阻止连接。

### 缺少收入数据

#### 症状：MRR 和 ARR 传感器显示为不可用

MRR（月度经常性收入）和 ARR（年度经常性收入）传感器显示为不可用。

##### 描述

收入传感器需要活跃的 Stripe 连接和付费成员。

##### 解决方案

要解决此问题，请检查以下内容：

1. 验证您的 Ghost 站点已连接 Stripe。
2. 确认您至少有一位付费成员。

### 缺少 SocialWeb/ActivityPub 数据

#### 症状：SocialWeb 传感器显示为不可用

SocialWeb 关注者和正在关注传感器显示为不可用。

##### 描述

这些传感器需要 Ghost 6 或更高版本并启用 ActivityPub。

##### 解决方案

要解决此问题，请检查以下内容：

1. 验证您正在运行 Ghost 6 或更高版本。
2. 确保 ActivityPub 在您的 Ghost 设置中已启用。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.