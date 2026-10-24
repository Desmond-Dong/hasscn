# OneDrive

此集成允许您将 [OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage) 用于 [Home Assistant 备份](/home-assistant/common-tasks/general/index.md#backups)，也可用于将普通文件上传到 OneDrive。

备份加密默认启用，也可以禁用，如[备份文档](/home-assistant/common-tasks/general/index.md#to-define-the-backup-location-for-automatic-backups)中所示。

默认情况下，备份将创建在 OneDrive 的“应用程序文件夹”中名为“Home Assistant\backups\_<id>”的文件夹中。
“id”是 Home Assistant 实例唯一 ID 的一部分，允许从多个实例备份到同一 OneDrive 帐户。

该集成只能访问“应用程序文件夹”中特定于应用程序的“Home Assistant”文件夹，而无法访问 OneDrive 的任何其他部分。

:::important
由于 Microsoft API 的一个问题，应用专用文件夹通常会被命名为 `Graph`，而不是 `Home Assistant`。更多信息请参见[下文](#backup-folder-is-called-graph)。

:::

## 配置

要将 **OneDrive** 服务添加到您的 Home Assistant 实例，请使用此 My 按钮：

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=onedrive)

<details>
<summary>手动配置步骤</summary>

* 打开您的 Home Assistant 实例。
* 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
* 在右下角，选择 [**添加集成**](https://my.home-assistant.io/redirect/config_flow_start/?domain=onedrive)。
* 在列表中选择 **OneDrive**。
* 按照屏幕上的说明完成设置。

</details>
```yaml
Client ID:
  description: "Application ID of the app registration to be used with the integration. Uses Home Assistant provided by default."
Client secret:
  description: "Application secret for the app registration. Uses Home Assistant provided by default."
Folder name:
  description: "The name of the instance specific [backup folder](#backup-folder)."
```

## 选项

要为 OneDrive 设置选项，请按以下步骤操作：

1. 在 Home Assistant 中，前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。

2. 如果已配置多个 OneDrive 实例，请选择您要配置的实例。

3. 在卡片上选择齿轮图标 `[mdi:cog-outline]`。

   * 如果卡片上没有齿轮图标，则表示该集成不支持此设备的选项。

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. 编辑选项，然后选择 **提交** 以保存更改。

```yaml
Delete files permanently:
  description: By default, files are put into the Recycle Bin when deleted, where they remain available for another 30 days. If you enable this option, files will be deleted immediately when they are cleaned up by the backup system.
```

## 备份文件夹

备份文件夹为“root:\Apps\[Home Assistant |图]\backups\_{id}\`。这是不可配置的，因为否则集成将需要写入整个驱动器的权限。但是，您可以重命名 OneDrive 中名为“Home Assistant”或“Graph”的应用程序文件夹。

层次结构中的最后一个文件夹 (backups\_{id}) 始终是每个 Home Assistant 实例的唯一文件夹，以确保来自不同实例的备份不会混合。该文件夹的名称可以在集成设置期间设置，并且可以稍后通过重新配置集成或在 OneDrive 中重命名该文件夹来更改。

### 备份文件夹名为“Graph”

此集成使用 Microsoft 的 Graph API 与您的 OneDrive 进行通信。由于该 API 中的[问题](https://github.com/OneDrive/onedrive-api-docs/issues/1866)，应用程序文件夹通常不以应用程序的名称命名（“Home Assistant”），而是以“Graph”命名。

不存在不同应用程序混合在该“Graph”文件夹中的风险，如果您已经有来自不同应用程序的此类“Graph”文件夹，则下一个文件夹将仅称为“Graph 1”、“Graph 2”等。

您应该能够手动将文件夹重命名为其他名称，而不会破坏集成。

## 集成请求的权限

集成将在您的 OneDrive 上请求以下权限才能使集成正常工作：

* `Files.ReadWrite.AppFolder`：授予应用程序在 OneDrive 内其自己的、特定于应用程序的文件夹中读取和写入的权限
* `offline_access`：授予应用程序刷新其身份验证令牌的权限，无需您手动干预
* `openid`：授予应用程序读取基本信息的权限，例如如果您有 OneDrive

<img src='/home-assistant/images/integrations/onedrive/onedrive-permissions.png' alt='应用程序将请求的权限列表。'>

## 传感器

该集成提供以下传感器，每 5 分钟更新一次：

* **可用存储总量**：驱动器的总大小（默认情况下禁用）
* **已用存储空间**：您已用完的存储空间量
* **剩余存储空间**：驱动器中剩余的存储空间量
* **驱动器状态**：根据剩余存储空间计算出的驱动器状态。可能的值：“正常”、“接近限制”、“严重”、“超出”

:::note
处于 **驱动器状态** `Exceeded` 的驱动器会被自动冻结，也就是您将无法继续上传备份和文件，直到释放出足够的存储空间。

:::

## 操作

此集成提供以下操作：

### 操作 `onedrive.upload`

您可以使用“onedrive.upload”操作从 Home Assistant 上传文件
到 OneDrive。例如，上传“相机”快照。

<details>
<summary>上传操作详情</summary>

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `filename` | no | Path to the file to upload. | /media/image.jpg |
| `destination_folder` | no | Folder inside your `Apps/Home Assistant` app folder that is the destination for the uploaded content. Will be created if it does not exist. Supports subfolders. | Snapshots/2025 |
| `config_entry_id` | no | The ID of the OneDrive config entry (the OneDrive you want to upload to). | a1bee602deade2b09bc522749bbce48e |

</details>

## 自动化

开始使用这些自动化示例。

### 当驱动器接近存储限制时发送警报

当驱动器使用率接近存储限制并需要清理时发送警报。

<details>
<summary>配置示例</summary>

```yaml
alias: Alert when OneDrive is close to storage limit
description: Send notification to phone when drive needs cleanup.
triggers:
  - trigger: state
    entity_id:
      - sensor.my_drive_drive_state
    from: "normal"
    to: "nearing"
  - trigger: state
    entity_id:
      - sensor.my_drive_drive_state
    from: "nearing"
    to: "critical"
actions:
  - action: notify.mobile_app_iphone
    data:
      title: OneDrive is almost full!
      message: >
        OneDrive has used up {{ states('sensor.my_drive_used_storage') }} of {{
        states('sensor.my_drive_total_available') }}GB.  Only {{ states('sensor.my_drive_remaining_storage') }}GB remaining.
mode: single
```

</details>

## 获取应用程序凭据

此集成通过 Home Assistant 帐户链接附带一组预定义的[应用程序凭据](https://www.home-assistant.io/integrations/application_credentials/)。这意味着您不需要提供凭据，而是被重定向到 Microsoft 的登录页面。

即使您使用默认凭据，除了您之外没有人可以访问您的数据，因为该应用程序无权自行执行任何操作。它仅适用于登录用户（它仅具有“委派”而不是“应用程序权限”）。

但是，如果您想使用自己的凭据，请按照[本指南](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate) 创建您自己的客户端 ID 和密钥。

:::tip
您需要有一个带有效 Azure 订阅的 Azure 租户，才能创建自己的客户端凭据。

:::
确保在应用程序注册时配置以下设置：

* **支持的帐户类型**：仅限个人 Microsoft 帐户
* **重定向 URI**：类型：`Web`，URL：`https://my.home-assistant.io/redirect/oauth`

<img src='/home-assistant/images/integrations/onedrive/onedrive-app-registration.png' alt='配置自定义应用程序。'>

:::note
如果您最初使用默认凭据设置该集成，之后再切换到自定义凭据，OneDrive 中的备份文件夹会发生变化，您需要手动将现有备份从旧文件夹复制到新文件夹。

:::

## 已知限制

* 目前仅支持个人 OneDrive。

## 删除集成

此集成遵循标准集成删除。不需要额外的步骤。

### 从 Home Assistant 中删除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后选择该集成卡片。
2. 在设备列表中，选择您要删除的集成实例。
3. 在该条目旁边，选择三点菜单 `[mdi:dots-vertical]`，然后选择 **删除**。

## 故障排除

<details>
<summary>添加集成时出现未知错误</summary>

请确认您的 OneDrive 没有被冻结。如果您长时间未使用 OneDrive，或超出了数据配额，就可能发生这种情况。

</details>

<details>
<summary>默认凭据不可用</summary>

如果该集成要求您输入 `client ID` 和 `client secret`，通常意味着您在 Home Assistant 配置中禁用了 `default_config` 的一部分。要让账户关联正常工作，您需要加载 `my` 和 `cloud` 集成。

</details>
