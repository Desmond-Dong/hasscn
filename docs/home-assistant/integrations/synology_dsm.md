---
title: Synology DSM
description: 'Synology DSM 集成可访问您的 Synology NAS(https://www.synology.com)（DSM 5.x 及以上）中的多种统计信息，也可接入 Surveillance Station(https://www.synology.com/surveillance) 中的摄像头。'
ha_category:
  - Backup
  - Camera
  - Media source
  - System monitor
  - Update
ha_release: 0.32
ha_iot_class: Local Polling
ha_domain: synology_dsm
ha_codeowners:
  - '@hacf-fr'
  - '@Quentame'
  - '@mib1185'
ha_config_flow: true
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - sensor
  - switch
  - update
ha_integration_type: device
ha_zeroconf: true
---
# Synology DSM

**Synology DSM** 集成可访问您的 [Synology NAS](https://www.synology.com)（_DSM 5.x 及以上_）中的多种统计信息，也可接入 [Surveillance Station](https://www.synology.com/surveillance) 中的摄像头，并允许将 [File Station](https://www.synology.com/en-us/dsm/feature/file_sharing) 用作备份位置。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::warning
如果您的 Synology NAS 处于休眠模式，此集成会将其唤醒。

默认轮询间隔为 15 分钟。如有需要，您也可以[定义自定义轮询间隔](/home-assistant/common-tasks/general/#defining-a-custom-polling-interval)。

如果启用了 [Surveillance Station](https://www.synology.com/en-us/surveillance) 的摄像头实体或家庭模式（Home mode）开关，则会每 30 秒拉取一次数据。如果您不希望 NAS 被如此频繁地访问，请禁用这些实体。

:::
:::important
当 SSDP 在同一子网内具有两个或更多不同 IP 地址网卡的 NAS 上启用时，会出现接管循环。NAS 会以不同 IP 地址被多次发现，而集成会接管“新发现”的 IP，从而导致重新加载。要解决此问题，请<a href="https://kb.synology.com/en-id/DSM/help/DSM/AdminCenter/file_service_advanced_introduction?version=7" target="_blank">在 NAS 上禁用 SSDP</a>，或使用网卡绑定（NIC bonding）来确保仅有一个 IP 地址。

:::
## 单独用户配置

:::note
您必须为该用户授予管理员权限，因为根据 Synology DSM API 的结构，此集成的基础功能需要管理员权限。

:::
创建该用户时，可以拒绝其访问所有位置和应用。这样做后，该用户将无法登录网页界面，也无法查看 Synology NAS 上的任何文件；但它仍可通过 API 读取使用率和存储信息。

如果您想添加来自 [Surveillance Station](https://www.synology.com/surveillance) 的摄像头，则该用户需要具有 [Surveillance Station](https://www.synology.com/surveillance) 的应用权限。

如果您想将 [File Station](https://www.synology.com/en-us/dsm/feature/file_sharing) 中的共享文件夹用作备份位置，则该用户需要具有 [File Station](https://www.synology.com/en-us/dsm/feature/file_sharing) 的应用权限，以及目标[共享文件夹](https://kb.synology.com/en-us/DSM/help/DSM/AdminCenter/file_share_desc) 的读写权限。

### 如果您的 Synology NAS 使用了 2-Step Verification 或双因素认证（2FA）

如果您在 **Control Panel > Security > Account > 2-Factor Authentication** 中勾选了 `Enforce 2-step verification for the following users`，则在该用户的凭据可用于 Home Assistant 之前，您需要先为刚创建的用户配置二步验证/一次性密码（OTP）。

请确保先退出您“常用”用户的账户，然后使用专门为 Home Assistant 创建的独立用户登录。DSM 会引导您为该用户设置一次性密码，之后您就可以在 Home Assistant 前端配置界面中使用它。

:::note
如果您拒绝了该用户访问所有位置和应用，那么使用这个独立用户登录时看到提示“无权访问 DSM”是正常的。如上所述，您并不需要实际访问 DSM，Home Assistant 仍然能够读取 NAS 的统计信息。

:::
## 备份位置

NAS 还可以直接作为备份位置使用，而无需将其作为网络驱动器添加到 Home Assistant（_这需要 DSM 6.0 及以上版本_）。为此，您需要先为该用户设置正确权限（_见上文 [单独用户配置](#separate-user-configuration)_）。之后，您就可以在集成选项中选择共享文件夹并定义相对路径，作为备份位置使用（[**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) > **Synology DSM** > _选择实例_ > **Configure**）。

:::important
请不要在 NAS 的备份路径中手动删除或重命名文件，否则可能导致备份无法再被读取或恢复。


:::
### 示例

假设有一个名为 `HA Backup` 的共享文件夹，其中包含两个目录：`productive_instance` 和 `test_instance`。

<img src="/home-assistant/images/integrations/synology_dsm/synology_file_station.png" />

#### 使用现有路径

1. 选择 `HA Backup` 作为共享文件夹。
2. 将 `productive_instance` 定义为备份路径（_末尾不要加斜杠_）。
   - **结果**：现有的 `productive_instance` 将被用作备份位置。

#### 使用不存在的路径

1. 选择 `HA Backup` 作为共享文件夹。
2. 将 `cottage_instance` 定义为备份路径（_末尾不要加斜杠_）。
   - **结果**：第一次备份时，会在共享文件夹 `HA Backup` 中创建一个新的 `cottage_instance` 目录。

:::important
备份路径中的子目录必须使用普通斜杠 `/` 分隔，例如：`home-assistant/prod_instance`。


:::
## 传感器

### CPU 使用率传感器

这些实体报告 NAS 当前和汇总后的 CPU 使用率。包括分别报告用户（User）、系统（System）和其他（others）的当前 CPU 负载传感器。默认仅启用用户（User）传感器。

此外还有汇总 CPU 负载传感器，用于报告整个 NAS 的总 CPU 负载。可用类型包括当前（current）、1 分钟（1min）、5 分钟（5min）和 15 分钟（15min）负载传感器。默认情况下 1 分钟（1min）负载传感器为禁用状态。

### 内存使用率传感器

这些实体报告 NAS 当前和汇总后的内存及交换分区使用率。传感器包括总安装容量、当前可用容量以及已用内存百分比。

### 网络传感器

这些实体报告 NAS 当前网络传输速率。包括上传和下载传感器。

### 常规传感器

这些实体报告 NAS 的内部温度和运行时长。`uptime` 传感器默认禁用。

### 磁盘传感器

这些实体报告 NAS 中每块磁盘的内部温度、状态（与 Synology DSM 中显示一致）以及 SMART 状态。SMART 状态传感器默认禁用。

### 存储卷传感器

这些实体报告 NAS 中每个卷的状态、总大小（TB）、已用大小（TB）、已用百分比、平均磁盘温度和最高磁盘温度。默认情况下，总大小和最高磁盘温度传感器处于禁用状态。

## 二进制传感器

### 常规传感器

该实体用于报告 NAS 的安全状态。

:::note
安全状态对应于 DSM Security Advisor 的分析结果。例如，`Update` 属性中的 `outOfDate` 状态不仅反映已安装 DSM 版本的更新状态，也反映已安装 DSM 软件包的状态。

:::
### 磁盘传感器

与[普通磁盘传感器](#disk-sensors)类似，这里还有用于报告每块磁盘状态的二进制传感器。它们会指示磁盘是否超过了检测到坏扇区的最大阈值，以及剩余寿命是否低于阈值。

## 开关

提供了一个开关，用于启用/禁用 [Surveillance Station](https://www.synology.com/surveillance) 的家庭模式（Home mode）。

## 摄像头

对于 [Surveillance Station](https://www.synology.com/surveillance) 中添加的每个摄像头，Home Assistant 中都会创建一个对应的摄像头实体。

## 按钮

### 按钮 `reboot`

重启 NAS。

### 按钮 `shutdown`

关闭 NAS。

## 媒体源

该集成为您的 [Synology Photos](https://www.synology.com/en-global/dsm/feature/photos) 提供媒体源。

媒体源 URI 格式如下：`media-source://synology_dsm/<unique_id>/<album_id>/<image>`。

此媒体浏览器支持多个 Synology Photos 实例。`<unique_id>` 是该 NAS 在 Home Assistant 中的 ID（_通常为 NAS 的序列号_）。您可在使用媒体浏览器时将鼠标悬停在 NAS 名称上来查看此 ID；它会显示简短名称及唯一 ID，例如：`192.168.0.100:5001 - 18C0PEN253705`。

要找到 `<album_id>`，请进入 Photos 实例中的相册，对应 ID 会出现在 URL 中，例如：`https://192.168.0.100:5001/#/album/19`，其中 19 就是相册 ID。若 `<album_id>` 为 0，则表示包含所有图片。

出于性能考虑，媒体浏览器最多只会显示 1000 张图片。

## UPS 支持

该集成不直接支持连接到 NAS 的 UPS 系统，但可以通过 [Network UPS Tools (NUT)](/home-assistant/integrations/nut) 集成实现。您需要先按照 Synology 官方 [UPS](https://kb.synology.com/en-me/DSM/help/DSM/AdminCenter/system_hardware_ups) 文档在 NAS 设置中启用 UPS 支持，然后通过 NUT 集成将 NAS 作为 UPS 服务器接入。大致步骤如下：

1. 在 NAS 设置中进入 **Control Panel** > **Hardware & Power** > **UPS**，启用 **Enable UPS support**。
2. 启用 **Enable network UPS server**。
3. 选择 **Permitted Synology NAS Devices**，并添加您的 Home Assistant 实例 IP 地址。
4. 设置 [Network UPS Tools (NUT)](/home-assistant/integrations/nut) 集成。
   - **Host**：您的 NAS 的 IP 地址或主机名。
   - **Port**：保持默认值（_3493_）。
   - **Username** 和 **Password**：保持为空，因为 NAS 不支持 NUT 服务器凭据。

## 故障排查

无论哪种情况，在报告问题时，请先启用 [调试日志](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，重启集成，并在问题再次出现后立即关闭调试日志（_调试日志文件会自动开始下载_）。另外，如果仍然可行，也请下载 [诊断](/home-assistant/integrations/diagnostics) 数据。如果您已收集调试日志和诊断数据，请在提交问题时一并附上。

## 移除此集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

如果您不再使用单独创建的用户（_见上文 [单独用户配置](#separate-user-configuration)_），请在 NAS 的 **Control Panel** > **User & Group** > **User** 中将其删除。如果您还想保留该用户主目录中的数据（_例如 Home Assistant 备份_），请不要忘记先进行备份。
