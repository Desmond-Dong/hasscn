---
title: Home Assistant Labs
description: 在新预览功能成为 Home Assistant 标准功能之前试用它们。
ha_category:
  - Other
ha_release: 2025.12
ha_iot_class: Calculated
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: labs
ha_integration_type: system
related:
  - docs: /docs/configuration/basic/
    title: Configuration basics
---

**Labs** 集成为您提供一个专门的面板，让您可以在新功能成为 Home Assistant 标准功能之前进行预览和测试。这些预览功能已经可以正常使用，且没有严重缺陷，但仍可能根据用户反馈继续调整设计。

Labs 预览功能与 Beta 测试不同：

- *Beta 测试* 用于评估即将发布的 Home Assistant 版本的稳定性。
- *Labs 预览功能* 则是在真实使用和反馈中持续打磨的功能。
  
## 关于 Labs

Labs 可让您：

- 在功能成为标准功能前进行预览
- 在自己的环境中体验即将推出的功能
- 提供反馈，帮助塑造最终设计

Labs 中的所有预览功能都具有以下特点：

- 可选：默认禁用，您需要手动启用
- 没有严重缺陷：功能完整且不含严重问题
- 可能发生变化：功能集可能扩展，设计和行为也可能根据反馈继续调整
- 可逆：可随时禁用


## 关于预览功能

Labs 中每个预览功能部分都包含：

- **Name** 和 **Description**：说明功能作用
- **Enable/Disable** 按钮：打开或关闭功能

有些功能还会额外包含：

- **Feedback** 链接：向社区分享您的使用体验
- **Documentation** 链接：进一步了解该功能
- **Report issue** 链接：报告缺陷或问题

## 启用预览功能

### 前提条件

- 您需要管理员权限才能访问此面板。
- 某些预览功能需要先安装并配置特定集成。
  - 如果某个功能显示不可用，并提示需要某个集成，请先设置该集成后再试。

### 启用预览功能

1. Go to [**Settings** > **System** > **Labs**](https://my.home-assistant.io/redirect/labs/).
2. 找到您想试用的功能。
3. 选择 **Enable**。

您也可以使用 My Home Assistant 链接直接跳转到 Labs 中的某个特定功能。例如：

```text
https://my.home-assistant.io/redirect/labs/?domain=kitchen_sink&preview_feature=special_repair
```

这些链接适合用于发布说明、文档，或与他人分享某个特定功能时使用。

## 禁用预览功能

### 前提条件

- 您需要管理员权限才能访问此面板。
- 您已经启用了某个预览功能。

### 禁用预览功能

1. Go to [**Settings** > **System** > **Labs**](https://my.home-assistant.io/redirect/labs/).
2. 找到已启用的功能。
3. 选择 **Disable**。

## 提供反馈

您的反馈能帮助这些功能不断改进！当您启用某个预览功能后：

1. 使用 **Give feedback** 链接在社区论坛中分享您的体验。
2. 使用 **Report issue** 链接在 GitHub 上报告缺陷。
3. 尽量具体说明哪些地方表现良好、哪些地方可以改进。
4. 附上相关细节，例如您的 Home Assistant 版本和设置情况。

## 已知限制

- 预览功能可能会根据用户反馈在不同版本之间发生变化。
- 功能设计和行为可能会在没有事先通知的情况下调整。
- 某些功能可能需要安装特定集成。

## 删除集成

此集成是 Home Assistant 的核心组成部分，无法删除。
