---
title: Anglian Water
description: 'Anglian Water 集成用于与 Anglian Water(https://www.anglianwater.co.uk) 的智能水表进行集成。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 2025.12
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@pantherale0'
ha_domain: anglian_water
ha_integration_type: service
ha_platforms:
  - sensor
ha_category:
  - Sensor
ha_quality_scale: bronze
ha_config_flow: true
---
# Anglian Water

**Anglian Water** 集成用于与 [Anglian Water](https://www.anglianwater.co.uk) 的智能水表进行集成。

## 支持的设备

- 智能水表
- 增强型智能水表

## 不支持的设备

此集成不支持以下设备：

- 需要手动读数的基础水表


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Username:
    description: "用于登录 Anglian Water 账户的用户名/电子邮箱。"
Password:
    description: "用于登录 Anglian Water 账户的密码。"
Account number:
    description: "如果默认账单账户没有关联有效的智能水表，请准备好您最新的账单。您需要提供账单顶部的账号。"
```

## 支持的功能

**Anglian Water** 集成提供以下实体。

### 传感器

- **最新读数**
  - **描述**：智能水表的最新读数。

- **昨日费用**
  - **描述**：昨日用水总费用。

- **昨日用水量**
  - **描述**：昨日总用水量（升）（可能要到中午 12 点后才会更新）。

## 数据更新

**Anglian Water** 集成默认每 60 分钟从服务 polls 一次数据。

## 已知限制

数据延迟最长可达 24 小时（如果智能水表服务出现问题，延迟可能更长）。

由于智能水表不会频繁报告变化，Home Assistant 仅每 60 分钟从 API 获取一次新数据。

昨日费用传感器由 Anglian Water 提供，截至 2025 年 11 月 25 日，此数据不包含固定费用或污水处理费用。

## 故障排除

### 读数未更新

如果智能水表服务遇到容量问题或中断，可能会发生这种情况。在提交问题之前，请先查看 Anglian Water 网站。

### 智能水表不可用

这意味着检测到（或提供的）账号没有活跃且受支持的智能水表，因此无法与此集成一起使用。

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.