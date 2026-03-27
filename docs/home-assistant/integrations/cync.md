---
title: Cync
description: 'Cync 集成用于与 GE Lighting(https://www.gelighting.com/) 销售的智能设备集成。Cync，以前称为"C by GE"，是 GE Lighting 智能设备系列的名称。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: '2025.10'
ha_iot_class: Cloud Push
ha_category:
  - light
ha_codeowners:
  - '@Kinachi249'
ha_domain: cync
ha_integration_type: hub
ha_platforms:
  - light
ha_quality_scale: bronze
ha_config_flow: true
---
# Cync

**Cync** 集成用于与 [GE Lighting](https://www.gelighting.com/) 销售的智能设备集成。Cync，以前称为"C by GE"，是 GE Lighting 智能设备系列的名称。

## 先决条件

- 使用此集成需要 Cync 账户。
- 您希望添加到 Home Assistant 的任何设备必须先通过 Cync 应用程序设置。
- 您的 Cync 账户中需要至少设置一个 Wi-Fi 连接的设备。
  - 较旧的仅支持蓝牙的 Cync 设备如果没有 Cync 网桥设备，可能无法被集成识别。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Email:
    description: 您的 Cync 账户电子邮件地址
Password:
    description: 您的 Cync 账户密码
```

## 支持的功能

**Cync** 集成提供以下实体。

### 灯光

- 支持的操作：
  - 开/关
  - 亮度*
  - 色温*
  - RGB 颜色*

*如果设备支持。

## 已知限制

- 以下灯光功能尚不支持：
  - 动态效果
  - 灯光秀
  - 音乐秀
  - LED 灯带分段控制
- Cync 服务器一次只允许您账户的一个实例连接。如果当 Home Assistant 正在运行时您打开 Cync 应用程序，集成将短暂失去连接。它将在 10 秒等待期后自动重新连接。

## 移除集成

此集成遵循标准的集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.