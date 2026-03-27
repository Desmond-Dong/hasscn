---
title: Tedee
description: '此集成通过 HTTP 与 Tedee Bridge 通信，从而与您的 Tedee(https://tedee.com) 门锁交互。该集成会在本地与门锁通信。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 2024.2
ha_category:
  - Binary sensor
  - Lock
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: tedee
ha_platforms:
  - binary_sensor
  - diagnostics
  - lock
  - sensor
ha_codeowners:
  - '@patrickhilker'
  - '@zweckj'
ha_integration_type: hub
ha_quality_scale: platinum
---
# Tedee

此集成通过 HTTP 与 Tedee Bridge 通信，从而与您的 [Tedee](https://tedee.com) 门锁交互。该集成会在本地与门锁通信。

## 前提条件

- 您需要桥接器才能通过此集成添加门锁。
- 您需要启用 **local API** 和 **encrypted token**。
- 要让推送更新正常工作，桥接器固件版本必须至少为 `2.2.18086`。

如果您没有桥接器，仍可通过 [HomeKit device integration](/home-assistant/integrations/homekit_controller/) 将门锁添加到 Home Assistant（仅支持 PRO 型号）。这种情况下将通过蓝牙通信，功能也会受限。

:::note
该集成会尝试配置 webhook，以接收桥接器关于门锁状态变化的近实时推送更新。要让此功能正常工作，桥接器必须能够访问您的 Home Assistant 实例。它会优先使用已配置的 `internal_url`，因此请确保桥接器能够在您的网络中访问该地址。如果无法通过 webhook 通信，集成将每 30 秒轮询一次更新。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "桥接器的 IP 地址。您可以在路由器中查看，或在 Tedee 应用的 **Bridge Settings** > **Local API** 中找到。"
Local Access Token:
  description: "桥接器的本地访问令牌。您可以在 Tedee 应用的 **Bridge Settings** > **Local API** 中找到。"
```

## 支持的设备

此集成支持：

- Tedee PRO
- Tedee GO

## 二进制传感器

- **Charging**：表示电池当前是否正在充电。
- **Pullspring enabled**：表示 pull spring 设置是否已启用。
- **Semi locked**：表示门锁是否处于“半锁定”位置。“半锁定”表示门锁被手动转动，位于正常终点位置之间。在此位置下，锁实体本身会不可用。
- **Lock uncalibrated**（默认禁用）：显示门锁是否处于“未校准状态”。

:::note
`lock.open` 服务只有在门锁已在 Tedee 应用中配置为 `**auto pull-spring enabled**` 时才会拉动锁舌。这是 Tedee API 的限制所致。

:::
## 传感器

当前该集成提供两个传感器：一个 **battery** 传感器，用于显示门锁电量；一个 **pull spring duration** 传感器，用于显示执行拉锁舌操作后，锁舌会保持拉开的时长（单位为秒，若设备支持）。

## 可能的使用场景

- 基于在家状态自动锁门/开锁
- 通过智能家居面板控制门锁
- 在电池电量低时接收提醒

## 自动化

可通过以下自动化示例快速开始使用。

### 最后一人离家时自动锁门

<details>
<summary>YAML 配置示例</summary>


```yaml
alias: Lock door when last person leaves
description: Lock the door when last person leaves the home
mode: single
triggers:
  - trigger: state
    entity_id:
      - zone.home
    to: "0"
conditions: []
actions:
  - action: lock.lock
    metadata: {}
    data: {}
    target:
      entity_id: lock.lock_a1b2
```

 
</details>

## 已知限制

此集成仅支持本地可用的功能。这意味着以下内容不受支持：

- 活动日志
- 更新
- 键盘设备

## 移除此集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 故障排查

<details>
<summary>锁状态未实时更新</summary>


请确保桥接器可以访问您的 Home Assistant 实例。这意味着如果您使用了独立 VLAN，就需要正确配置防火墙。另外，如果您为 Internal URL（[Settings > System > Network](https://my.home-assistant.io/redirect/network/) > Home Assistant URL）配置了启用 SSL 的地址，请尝试改回实例的 IP 地址（或非 HTTPS URL），因为 HTTPS 有时会导致推送更新出现问题。


</details>

<details>
<summary>尝试使用集成时出现认证失败</summary>


- 此集成仅支持 *local* token，云端 token 无法使用
- 必须在 [bridge settings](https://docs.tedee.com/bridge-api#tag/Authenticate) 中启用 **encrypted token**
- 用于与门锁通信的 token 具有时效性。有时如果 Home Assistant 主机时钟略有偏差会导致问题，因此请尝试同步主机时间。


</details>
