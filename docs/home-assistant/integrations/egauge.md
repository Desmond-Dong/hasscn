---
title: eGauge
description: 'eGauge 集成用于与 eGauge 能源监测器(https://www.egauge.net)集成。eGauge 为住宅和商业应用提供能源监测器。它们通常与太阳能装置一起使用。eGauge 集成可以将 eGauge 设备的传感器读数公开到 Home Assistant 中。'
ha_release: 2026.1
ha_category:
  - Energy
ha_quality_scale: bronze
ha_iot_class: Local Polling
ha_codeowners:
  - '@neggert'
ha_domain: egauge
ha_integration_type: device
related:
  - url: https://www.egauge.net/
    title: eGauge Home
ha_platforms:
  - sensor
ha_config_flow: true
---
# eGauge

**eGauge** 集成用于与 [eGauge 能源监测器](https://www.egauge.net)集成。eGauge 为住宅和商业应用提供能源监测器。它们通常与太阳能装置一起使用。eGauge 集成可以将 eGauge 设备的传感器读数公开到 Home Assistant 中，包括与能源仪表板配合使用的电能表。

## 支持的设备

此集成支持所有运行固件版本 4.2 或更高版本的 eGauge 能源监测器。有关如何检查和升级 eGauge 设备固件的说明，请参阅 [eGauge 知识库](https://kb.egauge.net/configuration/how-to-check-and-upgrade-firmware)。

## 前提条件

### 为 Home Assistant 创建只读用户账户

此设置是可选的，但建议作为安全最佳实践。

1. 转到您的 eGauge 网络仪表板。
2. 选择 **设置**，然后选择 **访问控制**。
3. 添加一个新用户，权限设置为 **允许查看所有数据和设置**。
4. 选择 **保存**。
5. 选择 **更改密码** 为新账户创建密码。

### 配置 eGauge 寄存器

此设置是可选的，但与能源仪表板集成时需要。

虽然 eGauge 电表通常配置为测量净用量，但 Home Assistant 需要单独的传感器来计算消耗和发电。本节描述如何配置您的 eGauge 以便为常见装置生成这些测量值。

请查阅 [eGauge 配置指南](https://www.egauge.net/media/support/docs/config-guide.pdf) 或询问您的安装商以确定您的装置类型。首先，按照指南中的基本配置说明操作。然后，您需要创建 `grid_in` 和 `grid_out` 寄存器以供 Home Assistant 使用。请注意，您可以随意命名这些寄存器；您将在能源仪表板配置屏幕中选择它们。

#### 分相回馈

在此装置中，太阳能逆变器连接到您的配电盘。

- `grid_in  = [= ] [Power (W)] max(0, $"grid")`
- `grid_out = [= ] [Power (W)] max(0, -$"grid")`

#### 直馈

在此装置中，太阳能逆变器直接馈入电网。

- `grid_in = [= ] [Power (W)] max(0, $"grid"-$"solar")`
- `grid_out = [= ] [Power (W)] max(0, $"solar"-$"grid")`

#### 其他装置

有关其他装置类型的前提条件，请查阅 [eGauge 配置指南](https://www.egauge.net/media/support/docs/config-guide.pdf)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: "您 eGauge 设备的主机名或 IP 地址。"
Username:
    description: "Home Assistant 用于访问您的 eGauge 设备的用户名。此用户必须有查看数据和设置的权限。"
Password:
    description: "配置用户的密码。"
Uses an SSL certificate:
    description: "使用 SSL 与 eGauge 设备建立安全连接。如果您不确定，请保持开启。"
Verify SSL certificate:
    description: "验证 eGauge 设备的 SSL 证书是否由受信任的证书颁发机构签名。默认情况下，eGauge 设备使用自签名证书，因此除非您已将自定义证书上传到您的 eGauge，否则请保持关闭。"
```

## 支持的功能

**eGauge** 集成提供以下实体：

### 传感器

- **功率和能量**：eGauge 上的每个功率寄存器将显示为两个 Home Assistant 传感器：一个报告当前功率，另一个报告累计总能量使用量。
- **电压**：eGauge 上的每个电压寄存器将显示为报告电压（伏特 V）的 Home Assistant 传感器。
**电流**：eGauge 上的每个电流寄存器将显示为报告电流（安培 A）的 Home Assistant 传感器。

### 数据更新

**eGauge** 集成每 30 秒轮询一次设备。

## 已知限制

- 该集成目前仅支持一部分寄存器类型。有关支持的类型列表，请参阅[传感器](#sensors)。
- 该集成目前是只读的，无法修改 eGauge 设备上的设置。

## 故障排除

### 无法设置设备

#### 症状："无法连接"

尝试设置集成时，表单显示消息"无法连接"。

##### 解决方案

这意味着 Home Assistant 无法在配置的主机上找到 eGauge 设备。仔细检查主机名或 IP 地址，并确保可以从您的 Home Assistant 服务器访问它。您还可以检查确保验证 SSL 证书已关闭，或者 eGauge 已配置为由 Home Assistant 服务器信任的证书颁发机构签名的自定义证书。

#### 症状："身份验证无效"

尝试设置集成时，表单显示消息"身份验证无效"。

##### 解决方案

这意味着 Home Assistant 使用提供的用户名和密码进行身份验证失败。仔细检查提供的凭据是否正确，以及配置的用户是否有查看数据和设置的权限。

### 传感器值异常

检查您的 eGauge 寄存器是否为您的装置正确配置。

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.