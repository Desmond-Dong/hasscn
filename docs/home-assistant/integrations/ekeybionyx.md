---
title: ekey bionyx
description: 关于如何将 ekey bionyx 设备集成到 Home Assistant 的说明。
ha_category:
  - Event
ha_release: '2025.10'
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: ekeybionyx
ha_codeowners:
  - '@richardpolzer'
ha_platforms:
  - event
ha_integration_type: hub
ha_quality_scale: bronze
---

**ekey bionyx** 集成允许 Home Assistant 接收来自您的 [ekey 指纹读取器](https://www.ekey.net)的事件。

## 前提条件

- **ekey bionyx** 应用程序。
- ekey 设备需要在应用程序中设置为 **plus 模式**。
- 需要在应用程序中启用 ekey bionyx 第三方 API。

![激活 ekey bionyx 第三方 API](/home-assistant/images/integrations/ekeybionyx/activate_third_party_api.png)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::tip
设置集成时建议使用本地 IP 而不是域名，因为事件响应会更快。

:::
添加集成后，打开 ekey 应用程序并将事件分配给您希望用作触发器的手指。

## 支持的功能

**ekey bionyx** 集成提供以下实体。

### 事件

设置期间定义的功能在 Home Assistant 中以事件形式表示。您可以将这些事件用作自动化中的触发器。

## 限制

- ekey 集成每个 ekey 系统只允许五个功能。
- 您不能将多个 Home Assistant 实例链接到同一个 ekey 系统。

## 移除集成

基于令牌的有限生命周期，您有两种选择来干净地重置与 Home Assistant 的连接：

- 在 Home Assistant 中删除集成，重新设置（触发删除过程），并在命名功能的步骤中止。
- 在 Home Assistant 中删除集成，然后在 ekey 应用程序中禁用并重新启用第三方 API（这将重置所有功能和 webhook，即使在 Home Assistant 之外）。