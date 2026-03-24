---
title: Azure DevOps
description: 关于如何将 Azure DevOps 与 Home Assistant 集成的说明。
ha_category:
  - Sensor
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: azure_devops
ha_platforms:
  - sensor
ha_integration_type: service
---

**Azure DevOps** 集成允许您在 Home Assistant 中控制和监控您的 Azure DevOps 实例。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

此集成为 Azure DevOps 提供一个传感器：

- Latest build - 最新构建的构建号。
- Latest build id - 最新构建的 ID。
- Latest build reason - 触发构建的原因。
- Latest build result - 构建结果。
- Latest build source branch - 源 git 分支。
- Latest build source version - 这是版本，即标签（如果已设置）或提交。
- Latest build status - 构建状态。
- Latest build queue time - 最新构建排队的时间。
- Latest build start time - 最新构建实际开始的时间。
- Latest build finish time - 最新构建完成的时间。
- Latest build URL - 最新构建的 URL。
- Work item count - 项目中每种工作项类型和状态的工作项数量。