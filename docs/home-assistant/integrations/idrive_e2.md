---
title: IDrive e2
description: 关于如何设置 IDrive e2 存储桶作为备份位置的说明。
ha_release: 2026.3
ha_category:
  - Backup
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: idrive_e2
ha_codeowners:
  - '@patrickvorgers'
ha_integration_type: service
ha_quality_scale: bronze
---

**IDrive e2** 集成允许您将 [IDrive e2](https://www.idrive.com/s3-storage-e2/) 存储桶与 Home Assistant 备份一起使用。

## 前提条件

在配置此集成之前，您需要准备您的 IDrive e2 账户。这包括创建一个用于存储备份的存储桶和一个具有该存储桶权限的访问密钥。

<details>
<summary>创建新的 IDrive e2 存储桶</summary>


1. 登录 [IDrive e2 管理控制台](https://app.idrivee2.com/dashboard/)。
2. 按照 iDrive 文档中[创建存储桶](https://www.idrive.com/s3-storage-e2/videos)的步骤操作。
3. 当提示定义存储桶名称时，确保它是唯一的：**名称**（例如，`home-assistant-backups-123456`）。
4. 调整设置时：
   - **存储桶中的文件是私有的**：默认启用。建议保持启用。
   - **版本控制**（可选）：允许您在 Home Assistant 删除备份后恢复备份，但这*可能会增加存储成本*。禁用此选项可允许根据保留设置永久删除。
5. 记下存储桶名称和区域。稍后您会用到。


</details>

<details>
<summary>创建访问密钥</summary>


要创建具有存储桶访问权限的访问密钥：

1. 登录 [IDrive e2 管理控制台](https://app.idrivee2.com/dashboard/)。
2. 按照 iDrive 文档中[创建访问密钥](https://www.idrive.com/s3-storage-e2/videos)的步骤操作。
3. 当提示定义名称时，使其具有描述性（例如，`home-assistant-backup`）。
4. 调整设置时：
   - **访问密钥过期**：默认禁用。建议保持禁用。
   - **访问权限**：读取和写入（默认）。
     - **允许删除对象**：默认启用。建议保持启用。
     - **允许删除存储桶**：*禁用此选项*（取消选中）。
5. 将访问密钥分配给您之前创建的存储桶。
6. 记下 **访问密钥 ID** 和 **秘密访问密钥**。在 Home Assistant 中配置集成时您会用到它们。


</details>

:::note
- 避免使用具有超出必要权限的凭据。
- 通过将凭据限制为特定存储桶，您可以降低风险并帮助保护您的 IDrive e2 账户安全。


:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Access key id:
  description: "您的 IDrive e2 账户的访问密钥 ID。"
Secret access key:
  description: "您的 IDrive e2 账户的秘密访问密钥。"
Bucket name:
  description: "用于存储备份的 IDrive e2 存储桶名称。存储桶必须已存在并且可由提供的凭据写入。"
```

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.