---
title: Aladdin Connect
description: 关于如何将 Genie Aladdin Connect 车库门开启器集成到 Home Assistant 进行监控和控制的说明。
ha_category:
  - Cover
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_domain: aladdin_connect
ha_platforms:
  - cover
  - sensor
ha_integration_type: hub
ha_codeowners:
  - '@swcloudgenie'
ha_config_flow: true
ha_dhcp: true
---
# Aladdin Connect

**Aladdin Connect** integration 允许您通过 Home Assistant 打开、关闭和检查 Genie Aladdin Connect 车库门的状态。它还会报告开启器备用电池的电量。

使用此集成，您可以在车库门被打开时收到通知，或让它在每晚的固定时间自动关闭。

## 支持的设备

任何适用于 **AladdinConnect** 应用程序的车库门开启器都应该适用于此集成。您网络上的 Aladdin Connect 设备也可以使用 <abbr title="动态主机配置协议">DHCP</abbr> 发现自动发现。

## 前提条件

在开始之前，您需要以下内容：

1. 有效的 [Home Assistant Cloud](https://www.nabucasa.com/) 订阅，因为集成通过它进行身份验证。
2. 在手机上安装 **AladdinConnect** 应用程序并创建账户。
3. 将您的车库门开启器添加到应用程序中，并确认您可以打开和关闭它。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

在设置过程中，您将被重定向到使用您的 Aladdin Connect 账户登录。在您授权 Home Assistant 后，您的车库门将自动添加。无需配置其他参数。

## 支持的功能

### 实体

**Aladdin Connect** 集成提供以下实体。

#### 遮盖

- **车库门**
  - **描述**：您的车库门。您可以打开和关闭它，它会报告其当前状态：打开、正在打开、已关闭或正在关闭。
  - **设备类**：车库

#### 传感器

- **电池电量**
  - **描述**：开启器备用电池的电量，以百分比表示。用于了解何时需要更换电池。
  - **实体类别**：诊断
  - **备注**：默认禁用。要使用此传感器，请从实体设置中手动启用它。


## 示例

### 当车库门被打开时发送通知

如果有人让车库门打开超过 10 分钟，此自动化将向您的手机发送通知。

<details>
<summary>示例 YAML 配置</summary>


```yaml
alias: "Notify when garage left open"
description: >
  Send a notification if the garage door stays open
  for more than 10 minutes.
triggers:
  - trigger: state
    entity_id: cover.garage_door
    to: "open"
    for:
      minutes: 10
actions:
  - action: notify.mobile_app_your_phone
    data:
      title: "Garage door open"
      message: "The garage door has been open for 10 minutes."
```


</details>

### 晚上自动关闭车库门

此自动化在晚上 10 点自动关闭车库门（如果它正好是打开的）。

<details>
<summary>示例 YAML 配置</summary>


```yaml
alias: "Close garage door at night"
description: >
  Close the garage door at 10 PM if it is still open.
triggers:
  - trigger: time
    at: "22:00:00"
conditions:
  - condition: state
    entity_id: cover.garage_door
    state: "open"
actions:
  - action: cover.close_cover
    target:
      entity_id: cover.garage_door
```


</details>

## 数据更新

门状态和电池电量通过每 15 秒 polling Aladdin Connect 云服务来更新。所有通信都通过云端 API 进行。没有本地或基于推送的选项。

## 已知限制

- 只有您的 Aladdin Connect 账户拥有的门才可用。您的账户被授予共享访问权限的门不受支持。
- 没有位置控制。您可以打开或关闭门，但不能在特定位置停止它。
- 所有通信都通过云端进行。没有本地或基于局域网的控制，因此如果您的互联网连接中断，集成将停止工作。
- 需要 Home Assistant Cloud 订阅才能进行身份验证。
 

## 故障排除

### 设置失败并显示"cloud not enabled"

此错误意味着 Home Assistant Cloud 未激活。转到 [**设置** > **Home Assistant Cloud**](https://my.home-assistant.io/redirect/cloud/) 并验证您拥有有效的 [Home Assistant Cloud](https://www.nabucasa.com/) 订阅。

### OAuth 登录失败或超时

检查您的互联网连接并重试。如果持续发生，请在手机上打开 **AladdinConnect** 应用程序并注销后重新登录，以确认您的凭据仍然有效。

### 设置后门未显示

只有您拥有的门才会显示在 Home Assistant 中。共享门不受支持。打开 **AladdinConnect** 应用程序，检查缺失的门是否列在您自己的账户下，而不是共享部分下。

### 设备变为不可用

当车库门实体无法访问 Aladdin Connect 云服务时，它将显示为不可用。首先检查您的互联网连接。然后打开 **AladdinConnect** 应用程序，看看您是否仍可以从那里控制门。如果应用程序也无法连接，则 Aladdin Connect 服务可能已关闭。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
