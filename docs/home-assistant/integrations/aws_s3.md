---
title: AWS S3
description: 关于如何设置 AWS S3 存储桶作为备份位置的说明。
ha_release: 2025.5
ha_category:
  - Backup
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: aws_s3
ha_codeowners:
  - '@tomasbedrich'
ha_integration_type: service
ha_quality_scale: bronze
ha_platforms:
  - sensor
---

**AWS S3** 集成允许您将 [AWS S3](https://aws.amazon.com/s3/) 存储桶与 Home Assistant 备份一起使用。

## 前提条件

:::important
此集成专门设计为**仅与 Amazon AWS S3** 一起使用，而不与声称 S3 API 兼容的第三方存储提供商一起使用。不支持 Wasabi、DigitalOcean Spaces、Backblaze B2、Infomaniak 等第三方提供商。

:::
此集成需要现有的 S3 存储桶和有权访问该存储桶的 IAM 用户。出于安全原因，强烈建议将 IAM 策略范围尽可能缩小到仅限所需的操作和资源。

<details>
<summary>创建新的 S3 存储桶</summary>


1. 登录 [AWS 管理控制台](https://console.aws.amazon.com/)。
1. 从服务菜单导航到 **S3**。
1. 点击 **Create bucket**。
1. 选择一个唯一的 **bucket name**（例如 `home-assistant-backups-123456`）。
1. 选择您首选的 AWS **region**（例如 `eu-central-1`）。
1. 调整设置：
   - ✅ **Block all public access**（默认启用，推荐）
   - ⚠️ **Enable Bucket Versioning**（可选）。这允许您在 Home Assistant 删除备份后恢复备份，但它**可能会增加存储成本**。禁用此选项可允许根据保留设置永久删除。
1. 点击 **Create bucket**。

记下存储桶名称 — 稍后您需要用到它。


</details>

<details>
<summary>创建 IAM 用户</summary>


要创建可以访问 S3 存储桶的新 IAM 用户：

1. 在 AWS 管理控制台中转到 **IAM > Users**。
1. 点击 **Add users**。
1. 使用类似 `home-assistant-backup` 的名称。
1. 仅勾选 **Access key - Programmatic access**。
1. 点击 **Next: Permissions**。

现在，让我们创建并附加自定义 IAM 策略，以授予用户对存储桶的必要权限：

1. 点击 **Create policy**，转到 **JSON** 选项卡，粘贴以下内容（替换 `YOUR_BUCKET_NAME`）：

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "AllowS3BackupOperations",
          "Effect": "Allow",
          "Action": [
            "s3:ListBucket",
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject",
            "s3:AbortMultipartUpload"
          ],
          "Resource": [
            "arn:aws:s3:::YOUR_BUCKET_NAME",
            "arn:aws:s3:::YOUR_BUCKET_NAME/*"
          ]
        }
      ]
    }
    ```

1. 为策略命名（例如 `HomeAssistantS3Policy`）并创建它。
1. 返回用户创建向导并附加新策略。
1. 完成用户设置。
1. 保存 **Access Key ID** 和 **Secret Access Key** — 在 Home Assistant 中设置 AWS S3 集成时您需要这些。


</details>

:::note
- 避免使用您的 AWS 根账户或拥有超过必要权限的 IAM 用户的凭据。
- 通过将凭据限制为特定存储桶，您可以降低风险并帮助保护您的 AWS 账户安全。


:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Access Key ID:
  description: "您的 AWS S3 账户的访问密钥 ID。"
Secret Access Key:
  description: "您的 AWS S3 账户的秘密访问密钥。"
Bucket Name:
  description: "用于存储备份的 S3 存储桶名称。存储桶必须已存在且可由提供的凭据写入。"
Endpoint URL:
  description: "提供给 [Boto3 Session](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html) 的端点 URL。特定区域的 [AWS S3 端点](https://docs.aws.amazon.com/general/latest/gr/s3.html) 在其文档中可用。默认为 `https://s3.eu-central-1.amazonaws.com/`。"
```

## 在 Home Assistant 中设置 AWS S3 集成

1. 在 Home Assistant 中，转到 **Settings > Devices & services**。
1. 点击 **Add Integration** 并搜索 **AWS S3**。
1. 输入以下详细信息：
   - 来自 IAM 用户的 Access Key ID 和 Secret Access Key
   - 您的存储桶名称
   - 区域端点（例如 `https://s3.eu-central-1.amazonaws.com/`）

集成将测试连接并确认对您的 S3 存储桶的访问。

## 传感器

集成提供以下传感器，每 6 小时更新一次：

- **备份总大小**：存储在为此 Home Assistant 安装配置的 S3 存储桶中的所有 Home Assistant 备份的总大小。

## 已知限制

AWS S3 集成有以下限制：

### 不支持第三方 S3 API 兼容提供商

此集成设计为仅与官方 Amazon AWS S3 服务一起使用。尽管声称 S3 API 兼容，但 Wasabi、DigitalOcean Spaces、Backblaze B2、Infomaniak、OVH Cloud 等第三方存储提供商经常被证明不兼容。即使它们最初看起来可以工作，也无法保证将来与此 AWS S3 集成的持续兼容性。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.