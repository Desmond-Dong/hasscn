---
title: Azure Storage
description: '此集成允许您使用 Azure 存储账户(https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview) 与 Home Assistant 备份一起使用。 本页属于 Home Assistant 中文文档。'
ha_release: 2025.3
ha_category:
  - Backup
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: azure_storage
ha_codeowners:
  - '@zweckj'
ha_integration_type: service
ha_quality_scale: platinum
---
# Azure Storage

此集成允许您使用 [Azure 存储账户](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview) 与 Home Assistant 备份一起使用。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Storage account name:
  description: "存储账户的名称。仅名称，没有其他内容。"
Container name:
  description: "用于存储备份的 Blob 容器名称。如果容器不存在，将被创建。默认为 `hass-backups`。"
Storage account key:
  description: "两个存储账户密钥之一。用于对存储账户进行身份验证"
```


## 已知限制

- 目前仅支持具有默认 URL `storageaccountname.blob.core.windows.net` 的存储账户
- 由于仅支持基于密钥的身份验证，因此必须在您的存储账户中启用此功能。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 故障排除

<details>
<summary>身份验证失败</summary>


检查您的存储账户是否允许 [`Shared Key` 访问](https://learn.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent?tabs=portal#remediate-authorization-via-shared-key)。


</details>

<details>
<summary>DNS 错误</summary>


您可能会遇到 `aiodns.error.DNSError: (4, 'Domain name not found')` 错误。

要解决此问题：

1. 在 Home Assistant 中导航到 **Settings → System → Network → DNS Servers**
2. 手动将备用 DNS 服务器设置为 `1.1.1.1`（Cloudflare）和 `8.8.8.8`（Google）（或您喜欢的任何其他服务器）。这允许 Home Assistant 成功解析 Azure 域名。
3. 重启 Home Assistant 以传播新设置。


</details>