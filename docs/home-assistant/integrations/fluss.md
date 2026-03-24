---
title: Fluss+
description: 关于如何在 Home Assistant 中集成 Fluss+ 设备的说明。
ha_category:
  - Button
ha_release: 2026.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fluss'
ha_domain: fluss
ha_config_flow: true
ha_platforms:
  - button
ha_integration_type: integration
ha_quality_scale: bronze
---

**Fluss+** 集成允许您通过 Home Assistant 控制 [Fluss+](https://fluss.io/) 设备。Fluss 将您的手机变成遥控钥匙，可以打开您的车库、大门、门，甚至办公室的停车场——让您完全掌控。Home Assistant 集成允许您通过 Wi-Fi 触发 Fluss+ 设备，以打开或关闭连接的电机设备。

## 前提条件

- 一个 Fluss+ 设备（可在此处订购：https://fluss.io/flussplus）。
- 一个 Fluss+ 账户。
- 智能手机上已安装 Fluss+ 应用程序。
- Fluss+ 设备已物理连接到您的设备（例如，车库门开启器）。
- Fluss+ 设备已连接到您的 Wi-Fi 网络并具有互联网访问权限。
- 在 Home Assistant 中设置集成时，系统将提示您输入 API 密钥。
  - 您可以在 Fluss+ 应用程序的个人资料设置中请求 API 密钥。
  - API 密钥将允许您访问您的 Fluss+ 设备并通过 Home Assistant 触发它们。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 按钮

Home Assistant 中的按钮代表您可以访问的 Fluss 设备。您可以通过 Wi-Fi 按下某个设备的按钮，然后它会向连接的设备（如车库门开启器）发送命令。

#### 示例

如果您在 Fluss+ 应用程序中可以访问三个设备，分别命名为"家用车库门"、"前门大门"和"办公停车场"，Home Assistant 将显示三个按钮，每个按钮都标有相应的设备名称。按下"家用车库门"按钮会向连接到您车库门开启器的 Fluss+ 设备发送命令，然后该设备将触发电机打开/关闭。其他设备也是如此。

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.