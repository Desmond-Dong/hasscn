---
title: Duke Energy
description: 关于在 Home Assistant 中集成 Duke Energy 的说明。
ha_category:
  - Energy
ha_release: '2024.10'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@hunterjm'
ha_domain: duke_energy
ha_config_flow: true
ha_integration_type: service
---

**Duke Energy** 集成允许您从 [Duke Energy](https://www.duke-energy.com/) 获取能源信息。

## 支持的设备

目前，此集成仅支持电表。

## 前提条件

您需要一个 Duke Energy 账户才能使用此集成。在安装集成期间，您需要用户名和密码来访问您的账户。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 能源

由于 Duke Energy 发布使用数据大约有 48 小时延迟，集成将数据插入统计对象中。
您可以在 [**设置** > **开发者工具** > **统计**](https://my.home-assistant.io/redirect/developer_statistics/) 中找到统计信息，搜索 "duke_energy"。
**此延迟意味着今天和可能的昨天能源仪表板中不会有数据**（取决于您查看的时间）。

在初始设置时，集成会拉取自账户激活以来的历史小时用量。Duke Energy 通常只保留过去 3 年的这些数据。
初始设置后，集成会持续拉取过去 30 天的数据（每天两次），以允许对数据进行任何更正。

在能源仪表板配置中（[**设置** > **仪表板** > **能源**](https://my.home-assistant.io/redirect/config_energy/)）：

1. 为 **电网** 选择 **添加消耗**。
2. 为 **消耗的能源** 选择 **Duke Energy Electric {电表序列号} Consumption**。