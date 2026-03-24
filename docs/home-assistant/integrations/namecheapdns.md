---
title: Namecheap DynamicDNS
description: "让您的 namecheap 动态 DNS 保持最新"

ha_category:
  - Network
ha_iot_class: Cloud Push
ha_release: 0.56
ha_domain: namecheapdns
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_codeowners:
  - '@tr4nt0r'
ha_config_flow: true
ha_quality_scale: platinum
---

With the **Namecheap DynamicDNS** integration you can automatically update your dynamic DNS entry hosted by Namecheap's [FreeDNS](https://www.namecheap.com/store/domains/freedns/) or [PremiumDNS](https://www.namecheap.com/security/premiumdns/) services.

## Prerequisites

在设置集成之前，您需要以下元素：

- 拥有 [Namecheap 帐户](https://ap.www.namecheap.com/)。
 - **主机**（“@”用于更新根域）和要更新的**域**，以及该域的**动态 DNS 密码**。您可以在您的 [Namecheap 帐户](https://ap.www.namecheap.com/) 的 **域名列表** > **管理** > **高级 DNS** > **动态 DNS** 下找到动态 DNS 密码。

## About Namecheap

[Namecheap](https://www.namecheap.com/) 是一家域名注册商和网络托管提供商，为在 Namecheap 和其他注册商注册的域名提供免费和付费 DNS 服务，包括动态 DNS 更新服务。

## Configuration

To add the **Namecheap DynamicDNS** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=namecheapdns)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=namecheapdns).
- From the list, select **Namecheap DynamicDNS**.
- Follow the instructions on screen to complete the setup.

</details>

### Configuration parameters

```yaml
  host:
    description: The host to update ('home' for home.example.com). Use '@' to update the root domain
  domain:
    description: The domain to update ('example.com')
  password:
    description: Dynamic DNS password for the domain
```

请参阅 Namecheap 的[如何设置动态 DNS 主机？](https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns) 指南以获取更多说明。

## Data updates

此集成每 5 分钟将您的公共 IP 与您（子）域的 DNS 记录同步一次。

## Known limitations

- Namecheap 仅支持更新 IPv4 地址。
- 集成会定期更新您（子）域的 DNS 记录，而不是持续监控您的公共 IP。

## Troubleshooting

**Namecheap DynamicDNS** 集成依赖于活动的互联网连接来更新您（子）域的 DNS 记录。如果遇到问题，请验证您的网络连接是否稳定以及 Namecheap DynamicDNS 服务是否可访问。此外，Namecheap DynamicDNS 服务本身可能会遇到停机（无论是意外停机还是由于计划维护）。

无论如何，在报告问题之前，请启用[调试日志记录](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，重新启动集成，一旦问题再次出现，请再次停止调试日志记录（*调试日志文件的下载将自动开始*）。

## Removing the integration

可以通过以下步骤删除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
