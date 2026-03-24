---
title: Backblaze B2
description: 关于如何设置 Backblaze B2 存储桶作为备份位置的说明。
ha_release: 2025.12
ha_category:
  - Backup
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: backblaze_b2
ha_codeowners:
  - '@hugo-vrijswijk'
  - '@ElCruncharino'
ha_integration_type: service
ha_quality_scale: bronze
ha_platforms:
  - diagnostics
---

**Backblaze** integration 允许您在 Home Assistant 中使用 [Backblaze B2](https://www.backblaze.com/cloud-storage) 存储桶作为备份位置。

## 前提条件

此集成需要一个现有的 B2 存储桶和一个有权访问该存储桶的应用程序密钥。建议创建一个仅能访问所需存储桶和前缀（如果需要）的密钥。

<details>
<summary>创建新的 B2 存储桶</summary>


1. 登录 [Backblaze 控制台](https://secure.backblaze.com/b2_buckets.htm)。
2. [创建存储桶](https://www.backblaze.com/docs/cloud-storage-create-and-manage-buckets)。
   - 选择一个唯一的**存储桶名称**（例如 `home-assistant-backups-123456`）。
   - 记下存储桶名称——稍后您会用到它。
3. 调整设置：
   - **将存储桶设置为私有**：默认启用，推荐使用。
   - **加密**：这将启用 Backblaze 的服务器端加密。这与 Home Assistant 备份加密是分开的。此选项可选。如果 Home Assistant 备份配置为使用加密，您可以禁用此选项。


</details>

<details>
<summary>创建应用程序密钥</summary>


要创建可以访问存储桶的应用程序密钥：

1. 在侧边栏中转到 [**应用程序密钥**](https://secure.backblaze.com/app_keys.htm)。
2. [创建新的应用程序密钥](https://www.backblaze.com/docs/cloud-storage-create-and-manage-app-keys)。
   - 使用类似 `home-assistant-backup` 的名称。
   - 通过从**选择存储桶**下拉菜单中选择来限制对存储桶的访问。
   - 访问类型应为**读取和写入**。
   - **允许列出所有存储桶名称**可以保持未选中状态。
   - 可选地，如果您想将备份保存在存储桶内的特定文件夹中，可以将密钥限制为特定前缀（例如 `home-assistant-backups`）。
3. 保存**密钥 ID** 和**应用程序密钥**。在 Home Assistant 中设置 Backblaze 集成时需要这些信息。


</details>

:::note
通过将凭据限制为特定存储桶，您可以降低风险并帮助保护您的 Backblaze 账户安全。


:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Key ID:
   description: "您的 Backblaze 账户的访问密钥 ID。"
Application Key:
   description: "您的 Backblaze 账户的应用程序密钥。"
Bucket Name:
   description: "用于存储备份的存储桶名称。存储桶必须已存在并且可由提供的凭据写入。"
Prefix:
   description: "备份的可选前缀。如果您想将备份存储在存储桶内的特定文件夹中，这很有用。"
```

## 故障排除

### 密钥过期

如果应用程序密钥过期，您需要创建一个新的密钥并在 Home Assistant 中更新集成。

### 由于存储桶前缀不唯一导致文件被覆盖

如果您设置了前缀，所有备份都将存储在该前缀下的存储桶中。请确保前缀是唯一的，以避免覆盖其他文件。更改前缀不会移动现有的备份。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.