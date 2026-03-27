---
title: 通用任务 - 安装无关
description: '本节提供不依赖于特定 Home Assistant 安装类型或特定集成的任务。它们可能在其他过程中被引用。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 通用任务 - 安装无关

本节提供不依赖于特定 Home Assistant 安装类型或特定集成的任务。它们可能在其他过程中被引用。

## 备份

定期备份您的 Home Assistant 设置非常重要。您可能花费了许多时间配置系统和创建自动化。保持配置安全，以便您可以[恢复](#恢复备份)系统或将 Home Assistant 迁移到新硬件。

备份是加密的并存储在压缩归档文件（.tar）中，默认情况下存储在本地的 `/backup` 目录。

完整备份包括以下目录：

- `config`
- `share`
- `addons`（仅手动安装或创建的应用，不是从商店安装的）
- `ssl`
- `media`

部分备份由上述任意数量的默认目录和已安装应用组成。

### 准备备份

在创建备份之前，检查是否可以减小备份的大小。如果您想使用备份将系统迁移到新硬件，这尤其重要，例如从树莓派 Compute Module 4 迁移到树莓派 Compute Module 5。

1. 检查您的配置目录是否包含大型数据库文件：
   - 进入 [**设置** > **系统** > **修复**](https://my.home-assistant.io/redirect/system_health/)。
   - 从三点 `[mdi:dots-vertical]` 菜单中，选择 **系统信息**，在 **记录器** 部分下，查找 **估计数据库大小 (MiB)**。
   - 默认情况下，数据保留 10 天。如果您将其修改为更长时间，请检查 [`recorder`](/home-assistant/integrations/recorder/) 集成页面，了解如何将数据库数据保持在不会引起问题的大小的选项。
   - 记录保留天数、清除间隔和包含/排除选项。
2. 要检查您总共使用了多少空间，进入 [**设置** > **系统** > **修复**](https://my.home-assistant.io/redirect/system_health/)。
   - 从三点 `[mdi:dots-vertical]` 菜单中，选择 **系统信息**，在 **Home Assistant Supervisor** > **磁盘使用** 下查看。
   - 如果您有不再使用的已安装应用，请卸载这些应用。有些应用需要相当大的空间。
3. 如果您想将备份存储在网络存储上而不仅仅是本地系统上，请按照[添加新的网络存储](/home-assistant/common-tasks/os/#添加新的网络存储)中的步骤操作，并选择 **备份** 选项。

### 设置自动备份过程

自动备份过程按预定义的时间表创建备份，并删除旧的、多余的备份。

1. 进入 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/supervisor_backups/)。
2. 在 **设置备份** 下，选择 **设置备份**。
3. 下载应急工具包并将其存储在安全的地方。
   - 您需要它来恢复加密备份。
   - 要了解有关备份加密的更多信息，请参阅[备份应急工具包](/home-assistant/more-info/backup-emergency-kit/)的文档。
4. 定义备份时间表。
   - 建议每天备份，但您也可以选择在特定日期备份。
   - 定义时间：
     - **系统最佳** 在 UI 中显示的预定义时间窗口内设置时间。
     - **自定义** 让您选择备份开始的时间。
     - 确保您选择的时间所有备份位置都在运行且可用。否则，备份将对不可用的位置失败。
5. 定义是否要在更新前自动备份。
   - 这设置了默认值。但您可以在每次更新前更改此设置。
   - 对于大型安装，备份可能需要一段时间。
   - 您的更新可能比预期开始得晚。
6. 定义要保留多少个备份。
   - 较旧的备份将自动删除。
   - 例如：如果您每天备份，并选择 7 个备份，则 8 天前及更早的备份将被删除。
7. 定义要备份的数据。
   - 建议禁用媒体和共享文件夹以减小备份大小。
   - 大型备份也需要更长时间来恢复。
   - 某些应用也可能相当大。
8. [定义备份位置](#定义备份位置)。

### 定义备份位置

如果系统崩溃，您可能需要备份。如果您只将备份存储在设备本身上，您将无法轻松访问它们。建议在另一个系统上保留副本（Home Assistant 之外），最好还有一个异地副本。

:::note
您可以在[这里](/home-assistant/integrations/#backup)找到提供备份位置的集成概述。
:::

#### 关于 Home Assistant Cloud 上的备份存储

如果您有 Home Assistant Cloud，您可以在 Home Assistant Cloud 上存储最大 5 GB 的备份。此云存储空间对所有现有和新的 Home Assistant Cloud 订阅者免费提供。它存储一个备份文件：最后保存到 Home Assistant Cloud 的备份。这些备份始终是加密的。要恢复加密备份，您需要存储在[备份应急工具包](/home-assistant/more-info/backup-emergency-kit/)中的加密密钥。

#### 为自动备份定义备份位置

1. 进入 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/supervisor_backups/)，在 **自动备份** 下，选择 **配置自动备份**。
2. 在 **位置** 下，使用切换开关启用您想要使用的所有备份位置。
   - 如果您在列表中没有看到 Home Assistant Cloud，说明您没有[登录](https://www.nabucasa.com/config/)。
   - 如果您想备份到您的 NAS（如 [Synology](/home-assistant/integrations/synology_dsm/#backup-location)）或云提供商（如 [Google Drive](/home-assistant/integrations/google_drive/) 或 [Microsoft OneDrive](/home-assistant/integrations/onedrive/)），请查看它们的集成文档，了解设置 Home Assistant 备份的具体说明。
   - 如果您没有看到网络存储，说明您还没有添加。请按照[添加新的网络存储](/home-assistant/common-tasks/os/#添加新的网络存储)中的步骤操作，并选择 **备份** 选项。
   ![定义备份位置](/home-assistant/images/screenshots/network-storage/backup_locations_encryption.png)
3. 对于每个启用的位置，选择齿轮 `[mdi:cog-outline]` 以启用/禁用加密。
   - **信息**：存储在 Home Assistant Cloud 上的备份始终是加密的。

### 使用备份操作创建备份自动化

如果 UI 中提供的备份自动化设置不符合您的用例，您可以使用 [backup.create_automatic](/home-assistant/integrations/backup/#action-backupcreate_automatic) 操作手动配置您自己的备份自动化。

在您自己的自动化中使用该操作允许您按任何您喜欢的时间表创建自动备份，甚至可以在其周围添加条件和操作。例如，您可以创建一个在日历上触发的自动化，打开您的 NAS，等待它上线，然后触发备份。

### 创建手动备份

这会立即创建备份。您可以随时创建手动备份，无论您是否定义了任何自动备份。

1. 进入 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/supervisor_backups/)。
2. 在右下角，选择 **立即备份** 并选择 **手动备份**。
3. 定义要备份的数据。
   - 建议禁用媒体和共享文件夹以减小备份大小。
   - 大型备份也需要更长时间来恢复。
   - 某些应用也可能相当大。
4. 为备份提供一个名称。
5. 选择备份位置。
   - 要了解有关位置的更多信息，请参阅[定义备份位置](#定义备份位置)部分。
6. 下载[备份应急工具包](/home-assistant/more-info/backup-emergency-kit/)并将其存储在安全的地方。确保记录它所属的备份名称。
7. 要开始备份过程，选择 **创建备份**。

### 下载本地备份

从 Home Assistant 备份页面下载备份时，它会即时解密，以便您可以使用您喜欢的归档工具查看数据。这对所有备份位置都适用，也包括从 Home Assistant Cloud 下载时。

有多种方法可以从您的 Home Assistant 实例下载本地备份并将其存储在另一个设备上：

**选项 1**：从备份页面下载：

1. 在 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/supervisor_backups/) 下，选择 **显示所有备份**。
2. 要选择多个备份，选择 `[mdi:order-checkbox-ascending]` 按钮。
3. 选择三点 `[mdi:dots-vertical]` 菜单并选择 **下载备份**。
   - **结果**：选定的备份存储在您计算机的 **下载** 文件夹中。
4. 如果备份存储在多个位置，您可以选择从哪里下载：
   - 选择备份，在 **位置** 下，选择三点 `[mdi:dots-vertical]` 并选择 **从此位置下载**。

**选项 2**：从备份文件夹复制备份：

1. 如果您还没有这样做，请使用其中列出的方法之一[配置对 Home Assistant 文件的访问](/home-assistant/common-tasks/os/#配置文件访问权限)。
   - 例如，[安装和使用 Samba 插件](/home-assistant/common-tasks/os/#安装和使用-samba-插件)。
2. 在您的文件资源管理器中，访问 Home Assistant，打开 `backup` 文件夹并将文件复制到您的计算机。

### 从 Home Assistant Cloud 下载备份

如果您在创建备份时已登录 Home Assistant Cloud 并启用了 Cloud 备份，您的最后一个备份将存储在 Home Assistant Cloud 上。

有两种方法可以从 Home Assistant Cloud 下载备份：

- **选项 1**：从备份页面
  1. 进入 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/supervisor_backups/) 并选择 **显示所有备份**。
  2. 从列表中选择备份。
  3. 在 **位置** 下，选择三点 `[mdi:dots-vertical]` 并选择 **从此位置下载**。

- **选项 2**：从您的 Home Assistant Cloud 账户
  1. 登录您的 [Home Assistant Cloud 账户](https://account.nabucasa.com/)。
  2. 在 **存储的文件** 下，您可以看到最新可用的备份文件。选择 **下载** 按钮。

### 删除过时备份

如果您定义了自动备份和备份清除计划，旧备份会自动删除。但是，您可能仍有一些想要删除的旧备份。

要删除旧备份，请按照以下步骤操作：

1. 在 Home Assistant 中，在 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/supervisor_backups/) 下，选择 **显示所有备份**。
2. 要**删除一个备份**：从列表中选择感兴趣的备份。
   - 选择三点 `[mdi:dots-vertical]` 菜单并选择 **删除**。
3. 要**删除多个备份**：选择 `[mdi:order-checkbox-ascending]` 按钮。
   - 从备份列表中，选择所有要删除的备份并选择 **删除所选**。
   - `[mdi:information-outline]` 考虑至少保留一个最近的备份以便恢复。
4. 要**删除存储在 Home Assistant Cloud 上的备份**，您有 2 个选项：
   - **选项 1**：从 Home Assistant 内触发备份删除
     - 按照上面的步骤 1 和 2。
     - 即使您在 Home Assistant 中选择 **删除**，它也会从 Home Assistant Cloud 存储中删除。
   - **选项 2**：从 Nabu Casa 账户页面删除备份。
     - 登录您的 [Nabu Casa 账户](https://account.nabucasa.com/)。
     - 在 **备份** 下，删除备份。

### 恢复备份

有两种使用备份的方式：

- 在您当前的系统上恢复设置。
- 在初始设置期间，将设置迁移到新设备或在执行恢复出厂设置的设备上恢复。

#### 预计持续时间

恢复备份所需的时间取决于您的安装。Home Assistant Core 和所有应用都将重新安装。对于较大的安装，此过程可能需要约 45 分钟。

#### 在初始设置期间恢复备份

您可以在初始设置过程中使用备份恢复配置。

**迁移**：如果您想从一个设备迁移到另一个设备，此过程也适用。在这种情况下，在新设备上使用旧设备的备份。目标设备可以是不同的设备类型。例如，您可以从树莓派迁移到另一个设备。

##### 先决条件

- 此过程假设您已在目标设备上完成了[安装](/home-assistant/installation/)过程，现在正在查看[初始设置](/home-assistant/getting-started/onboarding/)的欢迎屏幕。
- 您制作备份的设备的登录凭据。
- 包含解密备份所需密钥的[备份应急工具包](/home-assistant/more-info/backup-emergency-kit/)。
- **所需存储容量**：如果您将安装迁移到新设备，请确保新设备具有比现有设备更大的存储容量。
  - 迁移之前，在旧系统上检查您使用了多少存储。
  - 进入 **[设置 > 系统 > 修复 > ... > 系统信息](https://my.home-assistant.io/redirect/system_health/)**，在 **Home Assistant Supervisor** 下，查看 **磁盘使用** 值。
    - 目标设备必须有比源设备更多的可用空间。
    - 如果您的目标设备是 Home Assistant Yellow，请注意相关的是 eMMC 的大小。
    - 恢复过程主要使用 eMMC，而不是 NVMe。
    - 备份文件的大小不是您安装大小的指示。要知道安装的大小，您需要检查上面提到的 **磁盘使用** 值。
- 如果您正在迁移到新设备：
  - 您不需要将备份传输到 USB 或 SD 卡以将其带到您的设备。
  - 您将能够从您访问初始设置的设备上传备份文件。

##### 在初始设置期间恢复备份

1. 如果您正在迁移到新设备并且连接了控制器或无线电（如 Z-Wave 适配器或 Connect ZBT-2）：
   - 确保将它们插入新设备。
2. 您可以从本地机器恢复备份或恢复存储在 Home Assistant Cloud 上的备份：
   - **选项 1**：从本地备份恢复。
     - 在欢迎屏幕上，选择 **上传备份**。
     - 选择 **选择备份文件**。
       - 文件资源管理器将在您查看 Home Assistant 用户界面的设备上打开。
       - 您可以从那里访问任何连接的网络驱动器。
     - 选择备份文件。
   - **选项 2**：从 Home Assistant Cloud 备份恢复。
     - 在欢迎屏幕上，选择 **Home Assistant Cloud**。
     - 登录 Home Assistant Cloud。
3. 在对话框中，选择您想要恢复的所有部分。
      - 您当前的系统将被您选择恢复的部分覆盖。
      - 如果您想恢复完整配置及所有目录和应用，选择所有内容。
4. 输入存储在[备份应急工具包](/home-assistant/more-info/backup-emergency-kit/)中的加密密钥。
5. 要开始过程，选择 **恢复备份**。
   - 恢复可能需要一段时间，取决于数据量。
   - 不要刷新页面。只需等待。
     - 如果您刷新页面，您将看到 "未找到" 消息。这是因为系统正在关闭、擦除并从备份重新安装。在此期间，它将无法访问。
   - 如果您之前的安装直接为 [`http` 集成](/home-assistant/integrations/http/)启用了证书，当恢复完成时，它将不再响应 `http://` 请求。在这种情况下，使用 `https://`（添加 `s`）代替。
6. 在登录屏幕上，输入您制作备份的系统的凭据。
   - 登录密码和用户名必须与您制作备份时使用的密码和用户名匹配。
   - 您的仪表盘应显示创建备份时的所有元素。
   - 如果某些设备显示为不可用，您可能需要唤醒电池供电的设备。
7. 如果您在以前的系统上连接了[网络存储](/home-assistant/common-tasks/os/#网络存储)，您可能需要重新连接它们。
8. 如果您有 Zigbee 设备，并且您迁移到了具有内置 Zigbee 无线电的新设备：
   - 因为这现在是不同的 Zigbee 无线电，您需要[迁移 Zigbee](/home-assistant/integrations/zha/#migrating-to-a-new-zigbee-coordinator-adapter-inside-zha)。

#### 在当前系统上恢复备份

1. 进入 **[设置 > 系统 > 备份](https://my.home-assistant.io/redirect/backup/)**。
2. 从备份列表中，选择您要从中恢复的备份。
3. 选择要恢复的内容：
   - 您当前的系统将被您选择恢复的部分覆盖。
   - 如果您想恢复完整配置及所有目录和应用，选择所有内容。
   - 如果您只想恢复特定元素，只选择您想恢复的文件夹和应用。
4. 选择 **恢复**。
   - 这可能需要一段时间，取决于需要压缩或解压的内容。
5. 恢复完成后，Home Assistant 重启以应用新设置。
   - 您将失去与 UI 的连接，重启完成后它将返回。
6. 在登录屏幕上，输入制作备份时的密码和用户名。

## 启用或禁用实体

某些实体默认被禁用。设备的特定实体是禁用还是启用取决于集成。例如，诊断实体通常默认禁用，以免弄乱 Home Assistant。例如，ZHA 集成为每个 Zigbee 设备提供的 RSSI 实体（表示 RF 信号强度）默认被禁用。

有不同的方法启用实体。您可以在实体设置中启用单个实体，也可以从实体列表中一次启用多个实体。

### 启用或禁用单个实体

1. 进入 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择您的集成卡片。
2. 选择设备。
3. 要查看所有实体，您可能需要展开 **未显示的实体** 部分。
4. 选择感兴趣的实体，选择齿轮 `[mdi:cog-outline]`，然后选择 **启用** 的切换开关。
5. 选择 **更新**。
6. 确认说明实体大约需要 30 秒才能启用的通知。选择 **确定**。

   ![显示如何启用单个实体的屏幕录制](/home-assistant/images/docs/configuration/enable_entity.webp)

### 启用或禁用多个实体

1. 在 Home Assistant 中，打开感兴趣的表格。
   - 要启用或禁用实体，进入 [**设置** > **设备与服务** > **实体**](https://my.home-assistant.io/redirect/entities/)。
   - 要启用或禁用自动化，进入 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automations/)。
2. [启用多选](/home-assistant/docs/organizing/tables) 并选择所有要启用或禁用的实体。
3. 在右上角，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **启用** 或 **禁用**。

   ![显示如何启用或禁用多个自动化的屏幕截图](/home-assistant/images/organizing/enable_disable.png)

### 相关主题

- [自定义实体](/home-assistant/docs/configuration/customizing-devices/)
- [分组您的资产](/home-assistant/docs/organizing/)
- [使用表格](/home-assistant/docs/organizing/tables)

## 定义自定义轮询间隔

如果您想定义设备轮询数据的特定间隔，您可以禁用默认轮询间隔并创建自己的轮询自动化。

### 什么是数据轮询？

数据轮询是定期查询设备或服务以检查更新或检索数据的过程。通过定义自定义轮询间隔，您可以控制系统检查新数据的频率，这有助于优化性能并减少不必要的网络流量。

### 为什么使用自动化而不是更改集成的轮询配置？

为轮询创建自动化让您对何时轮询有更多灵活性：

1. 并非所有集成都有可配置的轮询间隔。另一方面，homeassistant.update_entity 服务适用于大多数集成；不需要代码更改。
2. 自动化允许您随时轮询。例如，如果您有一个每天有最大请求数限制的太阳能电池板提供商，您可能希望晚上降低/停止轮询，但在白天更频繁地轮询。

如果您想定义设备轮询数据的特定间隔，您可以禁用默认轮询间隔并创建自己的轮询自动化。

添加自动化：

1. 进入 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，选择您的集成。
2. 在集成条目上，选择 `[mdi:dots-vertical]`。
   - 然后，选择 **系统选项** 并切换按钮以禁用轮询。
   ![禁用更新轮询](/home-assistant/images/screenshots/custom_polling_01.png)
3. 要定义您的自定义轮询间隔，创建一个自动化。
   - 进入 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automations/) 并创建新自动化。
   - 定义您喜欢的任何触发器和条件。
   - 选择 **添加操作**，然后选择 **其他操作**。
   - 选择 **执行操作**，从列表中选择 [`homeassistant.update_entity` 操作](/home-assistant/integrations/homeassistant/#action-homeassistantupdate_entity)。
   - 通过选择 **选择区域**、**选择设备**、**选择实体** 或 **选择标签** 按钮来选择您的目标。
   ![更新实体](/home-assistant/images/screenshots/custom_polling_02.png)
4. 保存您的新自动化以轮询数据。

## 删除集成实例

如果您不再想在 Home Assistant 中使用设备或服务，您可以删除集成实例，包括设备或服务及其所有实体。

以下步骤描述了删除集成实例所需的一般步骤。根据集成，可能需要额外的步骤，例如重置设备或删除凭据。请参阅集成文档以了解是否需要额外的步骤。

### 从 Home Assistant 删除集成实例

1. 进入 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择集成卡片。
2. 从设备列表中，选择您要删除的集成实例。
3. 在条目旁边，选择三点 `[mdi:dots-vertical]` 菜单。然后，选择 **删除**。

![显示如何删除集成实例的屏幕截图](/home-assistant/images/docs/configuration/integration_instance_delete.png)
