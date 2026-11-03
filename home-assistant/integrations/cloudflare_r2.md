# Cloudflare R2

**Cloudflare R2** 集成允许您将 [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) 存储桶与 Home Assistant 备份一起使用。

## 先决条件

此集成需要一个现有的 R2 存储桶，以及对该存储桶的管理员访问权限，以便您可以创建 Secret Access Key。

<details>
<summary>创建新的 Cloudflare R2 存储桶</summary>

1. 登录您的 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 在侧边栏中，进入 **Storage & databases**，点击 **R2 object storage**，然后点击 **Overview**。
3. 选择 **+ Create bucket**。
4. 选择一个唯一的 **Bucket name**，例如 `home-assistant-backups-123456`。
5. 选择您首选的[位置](https://developers.cloudflare.com/r2/reference/data-location/)。
6. 选择您偏好的[存储类别](https://developers.cloudflare.com/r2/buckets/storage-classes/#set-default-storage-class-for-buckets)；使用 Standard 即可，因为 Infrequent Access 仍处于测试阶段。
7. 选择 **Create bucket**。

记下存储桶名称，稍后您会用到它。

</details>

<details>
<summary>创建 API Token/Secret Key</summary>

要创建可访问 R2 存储桶的新 Secret Key：

1. 返回 **R2 object storage > Overview** 页面。
2. 点击 **Manage API Tokens**。
3. 点击 **Create User API token**。
4. 为它命名，例如 `Home Assistant Backup`。
5. 勾选 **Object Read & Write**。
6. 点击 **Apply to specific buckets only** 并选择您之前创建的存储桶（例如 `home-assistant-backups-123456`）。
7. 不要修改其他选项，点击 **Create User API Token**。
8. 保存 **Access Key ID**、**Secret Access Key** 和 **S3 endpoint**。在 Home Assistant 中设置 Cloudflare R2 集成时需要这些信息。

</details>

:::note

* 避免使用权限超出实际需要的凭据和 API Key。
* 通过将凭据限制为特定存储桶，您可以降低风险并帮助保护您的 Cloudflare 账户安全。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
访问密钥 ID:
  description: "用于连接 Cloudflare R2 的访问密钥 ID。"
秘密访问密钥:
  description: "用于连接 Cloudflare R2 的秘密访问密钥。请参阅 [Cloudflare 文档](https://developers.cloudflare.com/r2/api/tokens/)。"
存储桶名称:
  description: "用于存储备份的 R2 存储桶名称。存储桶必须已存在，并且提供的凭据必须对其具有写入权限。"
端点 URL:
  description: "Cloudflare R2 的 S3 兼容端点。"
文件夹前缀:
  description: "存储桶内的可选文件夹路径，例如 `backups/homeassistant`。"
```

## 删除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
