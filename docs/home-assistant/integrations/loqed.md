---
title: LOQED Touch Smart Lock
description: '将您的 LOQED Touch 智能锁接入 Home Assistant。锁状态一旦变化，就会立即通知 Home Assistant，而您也可以自行更改锁状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Lock
ha_release: 2023.7
ha_iot_class: Local Push
ha_codeowners:
  - '@mikewoudenberg'
ha_domain: loqed
ha_platforms:
  - lock
  - sensor
ha_config_flow: true
ha_integration_type: device
ha_zeroconf: true
---
# LOQED Touch Smart Lock

将您的 LOQED Touch 智能锁接入 Home Assistant。锁状态一旦变化，就会立即通知 Home Assistant，而您也可以自行更改锁状态。

## 功能

此集成支持：

- 实时发送锁状态变化（open、unlock、lock）
- 更改锁状态（open、unlock、lock）
  - 只有当您的门外侧是固定旋钮时，您才能使用 “open” 锁状态。如果不是这种结构（也就是门外侧是可下压的把手），该命令的行为会等同于发送 unlock 命令。

## 前提条件

请在 [LOQED personal access token 网站](https://integrations.production.loqed.com/personal-access-tokens)上执行以下步骤：

<details>
<summary>生成访问令牌</summary>


1. 使用您的 LOQED App 邮箱地址登录（您需要拥有管理员权限）。
2. 选择 **Create**。
3. 为个人访问令牌命名（后续不会使用该名称，但建议使用类似 “Home Assistant” 这样的名称，以便识别其用途）。
4. 选择 **Save**。
5. 将访问令牌保存在便于复制粘贴的位置，因为接下来的步骤会用到它（而且它只会显示一次）。请注意，您可以使用同一个令牌设置多个锁。
   
</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

如果 Home Assistant 与锁运行在同一网络中，Home Assistant 应会自动检测到您的锁。在这种情况下，您只需在配置集成时提供选定的 API key。

如果由于某些原因未能自动检测到锁，您也可以手动设置。在这种情况下，您需要提供上一步中的 API key，以及该锁在 LOQED 配套应用中显示的名称。

## 操作

锁可用的操作请参阅默认的 [lock 集成页面](/home-assistant/integrations/lock/)。

## 在 Loqed 中卸载

首先，从 Home Assistant 中移除该集成。这会删除锁本身为 Home Assistant 所做的任何配置。

接着，在 [LOQED personal access token 网站](https://integrations.production.loqed.com/personal-access-tokens)上执行以下步骤：

1. 使用您的 LOQED App 邮箱地址登录（您需要是管理员）。
2. 在创建此集成时使用的 Personal Access Token 上选择 **delete**。
