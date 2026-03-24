---
title: Duck DNS
description: 保持您的公共 IP 地址与 Duck DNS 子域名同步。
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: 0.55
ha_domain: duckdns
ha_integration_type: service
ha_codeowners:
  - '@tr4nt0r'
ha_config_flow: true
ha_quality_scale: platinum
---

**Duck DNS** 集成让您的 Duck DNS 子域名与您当前的公共 IP 地址保持同步。

## 关于 Duck DNS

[Duck DNS](https://www.duckdns.org) 是一项免费的动态 DNS 服务，允许您将 `duckdns.org` 下的自定义子域名分配给路由器使用的公共 IP 地址。当您的互联网服务提供商动态分配 IP 地址（导致它们随时间变化）时，这尤其有用。Duck DNS 确保您选择的子域名始终指向正确的 IP。

:::note
如果您运行的是 Home Assistant 的 Duck DNS 应用（以前称为 Duck DNS 插件），则不需要此集成。该应用会让您的 IP 与 Duck DNS 保持更新。


:::
## 如何使用此集成

- 让您的 Duck DNS 子域名自动与您的公共 IP 同步。
- 更新 ACME DNS-01 挑战以进行自动 SSL 证书验证。

## 先决条件

要设置集成，您需要您的 Duck DNS 子域名和令牌。登录后，您可以在 [Duck DNS 主页](https://www.duckdns.org) 上找到这些信息。如果您没有账户，请使用您喜欢的方法（例如 GitHub、Google）注册，然后创建一个新的子域名。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 配置参数

```yaml
  domain:
    description: 您的 Duck DNS 子域名（不带 `.duckdns.org` 后缀）。
    required: true
  access_token:
    description: 您的 Duck DNS 访问令牌。登录网站获取。
    required: true
```

## 动作 `set_txt`

设置您 Duck DNS 子域名的 TXT 记录。

| 数据属性               | 可选 | 描述                     |
| ---------------------- | ---- | ------------------------ |
| `config_entry_id`      | 否   | Duck DNS 集成 ID。       |
| `txt`                  | 是   | TXT 记录的负载。         |

<details>
<summary>YAML 配置示例</summary>


```yaml
action: duckdns.set_txt
data:
  config_entry_id: 01234567890ABCDEF # 替换为您的实际配置条目 ID
  txt: LoqXcYV8...jxAjEuX0.9jg46WB3...fm21mqTI # 替换为有效的 ACME DNS-01 挑战
```


</details>

## 数据更新

此集成每 5 分钟将您的公共 IP 与您的 Duck DNS 子域名同步一次。

## 已知限制

- Duck DNS 错误不能清楚地表明身份验证失败。如果您重新创建了令牌，请确保使用新令牌更新您的 Duck DNS 配置条目。
- 集成定期更新您的 Duck DNS 子域名，而不是持续监控您的公共 IP。长时间中断后，更新间隔会增加以减少不必要的请求。互联网连接恢复后，您的子域名可能需要长达 30 分钟才能反映您当前的 IP。

## 故障排除

**Duck DNS** 集成依赖于活动的互联网连接来更新子域名的 DNS 记录。如果遇到问题，请验证您的网络连接是否稳定，以及 Duck DNS 服务是否可访问。此外，Duck DNS 服务本身可能会遇到停机，无论是意外还是由于计划维护。

无论如何，在报告问题时，请启用[调试日志](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，重新启动集成，问题再次出现后立即停止调试日志（*调试日志文件将自动开始下载*）。

## 移除集成

可以按照以下步骤移除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.