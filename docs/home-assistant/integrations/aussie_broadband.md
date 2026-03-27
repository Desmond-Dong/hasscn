---
title: Aussie Broadband
description: 'Aussie Broadband 集成使用 Aussie Broadband API 显示各种服务指标。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Network
  - Sensor
ha_release: 2022.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@nickw444'
  - '@Bre77'
ha_domain: aussie_broadband
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---
# Aussie Broadband

**Aussie Broadband** 集成使用 Aussie Broadband API 显示各种服务指标。

## 前提条件

您必须拥有 [My Aussie Broadband](https://my.aussiebroadband.com.au) 账户，并且至少有 1 个活动服务。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 实体

### 传感器

集成将为与您服务相关的各种指标创建传感器实体：

#### NBN/互联网服务
- 总使用量
- 下载数据
- 上传数据
- 计费周期长度
- 计费周期剩余

#### 手机
- 数据使用量
- 国内通话
- 手机通话
- 发送短信
- 计费周期长度
- 计费周期剩余