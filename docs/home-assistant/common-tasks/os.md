---
title: 常见任务 - 操作系统
description: '本节将提供运行、维护和编辑 Home Assistant OS 系统所需的一些常见任务和信息指南。有关任何特定主题的更多详细信息，请务必参阅特定插件（原称为 add-ons）的文档或此处列出的主题。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 常见任务 - 操作系统

本节将提供运行、维护和编辑 Home Assistant OS 系统所需的一些常见任务和信息指南。有关任何特定主题的更多详细信息，请务必参阅特定插件（原称为 add-ons）的文档或此处列出的主题。

## 配置文件访问权限

您的 Home Assistant 操作服务器默认包含两个仓库：官方核心插件仓库和社区插件仓库。通过用户界面中的 [**设置** > **插件** > **插件商店**](https://my.home-assistant.io/redirect/supervisor_store/) 导航到插件商店，可以安装此处提到的所有插件。

安装 Home Assistant OS 后首先要处理的事情之一是为自己提供文件访问权限。有几个插件通常用于此目的，大多数用户会混合使用各种插件。主机上的默认目录映射到插件，以便它们可以被特定插件可能提供的各种服务访问。在主机系统上，这些目录存在于 `/data` 分区的 `/mnt/data/supervisor/` 中。

使用下面列出的任何插件，可以访问以下目录：

- `addons`
- `backup`
- `config`
- `media`
- `share`
- `ssl`

---

### 安装和使用 Samba 插件

**Samba** 插件允许您将 Home Assistant 上的目录与网络上的其他系统共享。安装该插件后，您还可以使用客户端计算机上您喜欢的编辑器编辑文件。该插件可以从插件商店的官方仓库安装。

要安装该插件，请按照以下步骤操作：

1. 进入插件商店并选择 **安装**。
2. 在 **配置** 选项卡上，定义 **用户名** 和 **密码**，将它们保存在安全的地方，并保存您的更改。
   - 您可以指定任何用户名和密码。
   - 它们与您用于登录 Home Assistant 或登录访问文件的计算机的登录凭据无关。
   - 如果未定义用户名和密码，插件将无法启动。
3. 有关更多配置信息，请参阅 **文档** 选项卡。
4. 要启动插件，在 **信息** 选项卡上，选择 **启动**。

要从其他设备访问 Home Assistant 目录，请按照以下步骤操作：

1. 进入 [**设置** > **系统** > **网络**](https://my.home-assistant.io/redirect/network/) 并记下 **主机名**。
   - 或者，您可以在路由器上查找 Home Assistant 的主机名或 IP 地址。
2. 从其他设备连接到 Home Assistant 的方式取决于您的系统。使用以下选项之一：
   - **在 Windows 上**：打开 **文件资源管理器**，在地址栏中输入 IP 地址或主机名，前面加两个反斜杠，如 `\\your.ha.ip.address` 或 `\\hostname`。

     <p class='img'>
         <img src='/home-assistant/images/hassio/screenshots/file_explorer.png' alt='文件资源管理器截图，显示使用 IP 地址导航到文件共享'>
         文件资源管理器截图，显示使用 IP 地址导航到文件共享
     </p>

   - **在 OS X 上**：打开 **Finder** 并选择 **前往** > **连接服务器...**，输入 IP 地址或主机名，如 `smb://your.ha.ip.address` 或 `smb://hostname`。
   - **在 Ubuntu 上**：打开 **文件**，在地址栏中输入 IP 地址或主机名，如 `smb://your.ha.ip.address` 或 `smb://hostname`。

3. 输入您在 **Samba** 插件配置中输入的凭据。
   - 您还可以选择存储凭据，这样就不需要再次输入。
4. 完成！您现在可以访问这些目录，然后可以将它们挂载为驱动器或固定到快速访问。

---

### 安装和使用 Visual Studio Code (VSC) 插件

**Studio Code Server** 插件通过功能丰富的基于 Web 的 Visual Studio Code 编辑器版本提供访问。目前仅支持 AMD64 和 aarch64/ARM64 机器。该插件还通过 VSC 的内置终端提供对 Home Assistant 命令行界面 (CLI) 的访问，允许检查日志、停止和启动 Home Assistant 及插件、创建/恢复备份等。（有关更多信息，请参阅 [通过命令行使用 Home Assistant](/home-assistant/hassio/commandline/)）。

<p class='img'>
<img src='/home-assistant/images/docs/configuration/config-yaml_via-vscode.png' alt='configuration.yaml 文件示例截图，通过 Studio Code Server 插件在 Home Assistant 操作系统安装中访问'>
configuration.yaml 文件示例截图，通过 Studio Code Server 插件在 Home Assistant 操作系统安装中访问
</p>

要在 Home Assistant 中安装和使用 **Studio Code Server**，请按照以下步骤操作：

1. 要安装插件，进入插件商店并安装该插件。
2. 安装插件后，如果需要，选择 **在侧边栏显示** 选项。然后，选择 **启动**。
3. 有关配置设置的信息，打开 **文档** 选项卡。
4. 要开始浏览，在 **信息** 选项卡上，选择 **打开 Web UI**。

---

### 安装和使用文件编辑器插件

**文件编辑器** 插件是一个基于 Web 的文件系统浏览器和文本编辑器。它是 Visual Studio Code 的一个更基本、更轻量的替代方案。编辑时会自动检查 YAML 文件的语法错误。

<p class='img'>
<img src='/home-assistant/images/docs/configuration/config-yaml_via-file-editor.png' alt='configuration.yaml 文件示例截图，通过文件编辑器插件在 Home Assistant 操作系统安装中访问'>
configuration.yaml 文件示例截图，通过文件编辑器插件在 Home Assistant 操作系统安装中访问
</p>

要在 Home Assistant 中安装和使用文件编辑器，请按照以下步骤操作：

1. 要安装插件，进入插件商店。
   - 安装插件后，您可以编辑 `/config` 目录中的文件。
2. 如果您希望能够访问 `/config` 目录之外的目录，在插件中打开 **配置** 选项卡并禁用 **强制基本路径** 选项。
   - 注意：**强制基本路径** 选项旨在保护您免于意外更改设置文件。
3. 有关其他配置设置的信息，打开 **文档** 选项卡。
4. 要确认您的更改，选择 **保存**。
5. 要开始浏览，在 **信息** 选项卡上，选择 **打开 Web UI**。

---

### 安装和使用 SSH 插件

如果您想使用 Home Assistant 命令行或 SSH 客户端，可以通过 **Terminal & SSH** 插件实现。

**Terminal & SSH** 插件提供以下功能：

- 它提供了一个可以从 Home Assistant 用户界面访问的 Web 终端。
- 它允许您使用 Home Assistant 命令行界面 (CLI)，该界面提供用于检查日志、停止和启动 Home Assistant 及插件、创建/恢复备份等的自定义命令。
- 有关命令行命令列表，请参阅 [通过命令行使用 Home Assistant](/home-assistant/common-tasks/os/#通过命令行使用-home-assistant)。
- 它允许使用 SSH 客户端连接到您的系统。
- 它还包括常见的工具，如 nano 和 vi 编辑器。
- Terminal & SSH 插件**不提供**对底层主机文件系统的访问。

要开始使用 **Terminal & SSH** 插件，请按照以下步骤操作：

1. 在左下角，选择您的用户以打开 [**个人资料**](https://my.home-assistant.io/redirect/profile/) 页面。确保启用了 **高级模式**。
2. 要安装插件，进入 [**设置** > **插件**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_ssh) 下的插件商店并安装 **Terminal & SSH** 插件。
3. 要使用 Web 终端，**启动** 插件，然后选择 **打开 Web UI**。
   - 您现在可以开始输入您的[命令](/home-assistant/common-tasks/os/#通过命令行使用-home-assistant)。
4. 如果您想从 SSH 客户端访问，需要输入凭据：
   - 打开 **配置** 页面。
   - 输入密码或授权密钥。
   - 然后保存并启动插件。

## 备份

要了解如何备份系统或如何从备份恢复系统，请参阅[通用任务](/home-assistant/common-tasks/general/#备份)下的备份文档。

### 替代方法：使用 Home Assistant 命令行界面创建备份

通常，要创建备份或从备份恢复，请按照[通用任务](/home-assistant/common-tasks/general/#备份)中描述的步骤操作。但是，如果您已安装 **Home Assistant Operating System**，也可以从命令行创建备份。请按照以下步骤操作：

1. `ha backups list` - 列出备份及其 slug 名称
2. `ha backups restore slugname` - 恢复特定备份
3. `ha backups new --name nameofbackup` - 创建备份

有关命令行使用的更多信息，请使用 `ha help` 命令或参阅[Home Assistant 命令行文档](/home-assistant/common-tasks/os/#通过命令行使用-home-assistant)。

## 更新 Home Assistant

如果您已安装 **Home Assistant Operating System**，您会收到来自不同组件的更新通知：

- **Home Assistant Operating System**
- **Home Assistant Supervisor**
- **Home Assistant 核心**
- **插件**，如果您已安装任何插件

每个组件需要单独更新。

### 更新 Home Assistant Operating System

**Home Assistant Operating System** 的更新独立于其他更新。它们不会触发修复问题，通常向后兼容。

#### 前提条件

- [备份您的安装](/home-assistant/common-tasks/general/#备份)。
  - 确保备份存储在安装 Home Assistant 的设备之外的[备份位置](/home-assistant/common-tasks/general/#定义备份位置)。
    - 例如，如果 Home Assistant 安装在 [Home Assistant Green](https://www.home-assistant.io/green) 上，请确保它存储在 [Home Assistant Cloud](/home-assistant/common-tasks/general/#关于-home-assistant-cloud-上的备份存储) 或其他位置。
  - 这样，如果系统出现问题，您可以[从该备份恢复](/home-assistant/common-tasks/general/#恢复备份)。

#### 更新 Home Assistant Operating System


**使用用户界面**

1. 打开 **设置** 面板。
2. 在顶部查看更新通知。
   - **故障排除**：如果您没有看到通知：
     - 在右上角，选择三点 `[mdi:dots-vertical]` 菜单并选择 **检查更新**。
     - 进入 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/)。
     - 选择更新通知。
     - 选择齿轮图标 `[mdi:cog-outline]`，然后将 **可见** 设为开启。
3. 打开要更新的组件通知。
4. 如果您想先备份系统（推荐），请启用备份开关。
5. 选择 **更新**。
6. 检查是否有修复问题，并查看日志，确认没有需要处理的配置问题。


#### 关于更新期间使用的启动槽

**Home Assistant Operating System** 使用两个启动槽。首次安装时，使用启动槽 A。之后，在每次操作系统更新时，另一个启动槽会被更新并触发重启。在该重启时，系统从另一个启动槽启动（A ➝ B ➝ A,...）。当启动失败时，系统会自动使用上一个启动槽，以便从上次正常工作的操作系统启动。

#### 更改使用的启动槽

您可以手动定义使用上一个启动槽。这在系统启动但仍然出现问题的情况下很有用。例如，当设备不再被正确检测或您看到另一个可能与操作系统最新更新相关的问题时。

1. 要检查当前正在使用的启动槽以及各个槽中安装的操作系统版本，在 Home Assistant 命令行中输入以下命令：

    ```bash
    ha os info
    ```

2. 要更改启动槽，输入以下命令：
   - 这将启动到另一个（上一个）操作系统版本。

    ```bash
    ha os boot-slot other
    ```

或者，如果操作系统运行在使用 GRUB 引导加载程序的平台，在启动早期会显示启动菜单。可以在此处选择替代启动槽，如果以下启动尝试成功，则将其标记为未来启动的活动槽。

### 更新 Home Assistant 核心

#### 前提条件

1. [备份您的安装](/home-assistant/common-tasks/general/#备份)，并将备份和[备份应急工具包](/home-assistant/more-info/backup-emergency-kit/)存储在安全的地方。
   - 这样可确保您在需要时能够[从备份恢复安装](/home-assistant/common-tasks/general/#恢复备份)。
2. 查看 [Home Assistant 发布说明](/home-assistant/blog/categories/core/) 上的发布说明中是否有向后不兼容的更改。请务必检查您正在运行的版本与您要升级到的版本之间的所有发布说明。使用浏览器中的搜索功能 (`CTRL + f` / `CMD + f`) 并搜索 **向后不兼容的更改**。

#### 更新 Home Assistant 核心

要更新 Home Assistant 核心，选择以下选项之一。

  
**使用用户界面**

1. 打开 Home Assistant 用户界面。
2. 进入 **设置** 面板。
3. 在顶部查看更新通知。
   - **故障排除**：如果您没有看到通知：
     - 在右上角，选择三点 `[mdi:dots-vertical]` 菜单并选择 **检查更新**。
     - 进入 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/)。
     - 选择更新通知。
     - 选择齿轮图标 `[mdi:cog-outline]`，然后将 **可见** 设为开启。
4. 打开要更新的组件通知。
5. 如果您想先备份系统（推荐），请启用备份开关。
6. 选择 **更新**。
7. 更新完成后，检查是否有修复问题，并查看日志，确认没有需要处理的配置问题。


**命令行**

如果您更喜欢使用 Home Assistant 命令行，也可以运行以下命令：

```bash
ha core update --backup
```

_这里的_ `--backup` _标志可确保在更新前创建部分备份，以便您在需要时回退。_

更新后，检查是否有任何修复问题，并检查日志以查看是否有任何需要解决的配置问题。

## 网络存储

您可以配置网络文件系统 (NFS) 和 Samba/Windows (CIFS) 目标，以便在 Home Assistant 和插件中使用。
要列出所有当前连接的网络存储，请在用户界面中进入 **[设置 > 系统 > 存储](https://my.home-assistant.io/redirect/storage/)**。

:::important
您需要先更新到 Home Assistant Operating System 10.2 才能使用此功能。
:::

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/list_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/home-assistant/images/screenshots/network-storage/list_light.png">
  </picture>
  存储面板内的网络共享列表截图。
</p>

### 添加新的网络存储

1. 在用户界面中进入 **[设置 > 系统 > 存储](https://my.home-assistant.io/redirect/storage/)**。
2. 选择 **添加网络存储**。
3. 填写网络存储的所有信息。
4. 选择 **连接**。

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/connect_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/home-assistant/images/screenshots/network-storage/connect_light.png">
  </picture>
  连接新网络存储的截图。
</p>

#### 网络存储配置

名称：
  说明：这是系统中挂载目录使用的名称。
用途：
  说明：在这里，您可以选择此目标的用途。[请参阅下面的用途类型](#用途类型)
服务器：
  说明：运行 NFS 或 CIFS 服务的服务器 IP 地址或主机名。
"协议<sup>3</sup>":
  说明：服务器用于提供网络存储的协议。
"[NFS]<sup>1</sup> 远程共享路径":
  说明：用于连接远程存储服务器的路径。
"[CIFS]<sup>2</sup> 用户名":
  说明："连接到存储服务器时使用的用户名。对于域账户，请使用用户主体名称，例如：`user@domain.com`。"
"[CIFS]<sup>2</sup> 密码":
  说明：连接到存储服务器时使用的密码。
"[CIFS]<sup>2</sup> 共享":
  说明：要连接的存储服务器共享名称。

<sup>1</sup> _前缀为 `[NFS]` 的选项仅适用于 NFS 目标。_<br>
<sup>2</sup> _前缀为 `[CIFS]` 的选项仅适用于 CIFS 目标。_<br>
<sup>3</sup> _对于 `CIFS` 选项，仅支持版本 2.1+。_<br>

##### 用途类型

备份：
  说明：这将成为一个备份目标。您可以在创建自动或手动备份时使用它。您添加的第一个此类型存储将成为新的默认目标。如果您想更改默认目标，请参阅[更改默认本地备份位置](#更改默认本地备份位置)。
媒体：
  说明：系统会在 `/media` 下创建一个以您的网络存储命名的新目录。Home Assistant 和插件都可以访问此目录。
共享：
  说明：系统会在 `/share` 下创建一个以您的网络存储命名的新目录。Home Assistant 和插件都可以访问此目录。

### 更改默认本地备份位置

默认情况下，您添加的第一个 **备份** 类型的网络存储将用作您的本地默认备份位置。

如果您想更改用于存储备份的本地网络存储，请按照以下步骤操作：

1. 进入 **[设置 > 系统 > 备份](https://my.home-assistant.io/redirect/backups/)**。
2. 选择 **设置和历史**。
3. 在右上角，选择三个点 `[mdi:dots-vertical]` 菜单并选择 **更改默认操作位置**。
4. 选择您首选的网络位置并保存您的更改。
   ![选择用于本地备份的默认位置](/home-assistant/images/screenshots/network-storage/backup_select_local_default.png)
5. **故障排除**：看不到您的外部存储位置？此列表仅包含您添加的 **备份** 类型的网络存储目标。

## 忘记密码和密码重置

请参阅 [我被锁定了！](/home-assistant/docs/locked_out/) 文档页面。

## 安装第三方插件仓库

Home Assistant 允许任何人创建插件仓库，与社区分享他们自己的插件。

:::warning
Home Assistant 无法保证第三方插件的质量或安全性。使用风险自负。
:::

要添加插件仓库，请按照以下步骤操作：

1. 复制仓库的 URL。
   - URL 是 git 仓库克隆 URL（在 GitHub 上，使用 Code 按钮并复制 HTTPS URL）。
   - 本文档使用一个示例插件仓库。它实际上并不实用，但遵循相同的步骤。
   - 如果您对插件开发感兴趣，请参阅我们的 [Home Assistant 插件开发文档](https://developers.home-assistant.io/docs/add-ons/)。

        ```text
        https://github.com/home-assistant/hassio-addons-example
        ```
2. 进入 [**设置** > **插件**](https://my.home-assistant.io/redirect/supervisor/) 并选择 **插件商店**。
   ![Home Assistant 插件商店截图](/home-assistant/images/getting-started/app-store.png)
3. 在右上角，选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **仓库**。
4. 添加仓库的 URL 并选择 **添加**。
   ![插件商店截图](/home-assistant/images/getting-started/adding_repositories-url.png)
   - **结果**：第三方仓库的新卡片将出现。
   ![插件商店截图](/home-assistant/images/getting-started/add-ons-community_example.png)

### 故障排除：仓库未显示

如果您添加了插件仓库，但它没有显示，请确保刷新您的浏览器。如果仍然不显示，插件仓库可能包含无效的配置数据。

1. 进入 [**设置** > **系统** > **日志**](https://my.home-assistant.io/redirect/logs/) 并在右上角选择 Supervisor 以获取 Supervisor 日志。
   - 它应该告诉您出了什么问题。
2. 将此信息报告给插件仓库作者。

## 配置检查

更改配置或自动化文件后，在重启 Home Assistant 核心之前检查配置是否有效。

### 从用户界面运行配置检查

1. 进入 [您的用户资料](https://my.home-assistant.io/redirect/profile/) 并启用 **高级模式**。
2. 进入 [**设置** > **开发者工具** > **YAML**](https://my.home-assistant.io/redirect/server_controls/)，在 **配置验证** 部分，选择 **检查配置** 按钮。
   - 这是为了在重启 Home Assistant 之前确保没有语法错误。
   - 它检查有效的 YAML 和有效的配置结构。
3. 如果您需要进行更全面的配置检查，请[从 CLI 运行检查](#从-cli-运行配置检查)。

### 从 CLI 运行配置检查

使用以下命令检查配置是否有效。命令行配置检查验证 YAML 文件并检查有效的配置结构以及其他一些元素。

```bash
ha core check
```

如果您需要更多帮助，可以使用以下命令查看说明：

```bash
ha core check --help
```

## Home Assistant 版本

要查看您的系统正在运行的版本，进入 [**设置** > **关于**](https://my.home-assistant.io/redirect/info/)。

### 功能预览

如果您想预览即将推出的功能，可以在 [**设置** > **系统** > **实验室**](https://my.home-assistant.io/redirect/labs/) 下启用预览。

**实验室** 允许您预览已稳定但仍正在微调的选定功能。预览与安装测试版或开发版本不同，后者用于开发和测试。

更多信息，请参阅 [实验室文档](/home-assistant/integrations/labs)。

### 运行测试版本

如果您想在其他人之前测试下一个发布版本，您可以安装测试版本。


**从用户界面**

1. 在 Home Assistant 中，进入 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/)。
2. 在右上角，选择三点 `[mdi:dots-vertical]` 菜单。
3. 选择 **加入测试版**。
4. 进入 [**配置**](https://my.home-assistant.io/redirect/configuration/) 面板。
5. 安装显示给您的更新。
   - **故障排除**：如果您没有看到通知：
     - 在右上角，选择三点 `[mdi:dots-vertical]` 菜单并选择 **检查更新**。
     - 进入 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/)。
     - 选择更新通知。
     - 选择齿轮图标 `[mdi:cog-outline]`，然后将 **可见** 设为开启。


安装显示给您的测试版更新即可。

### 运行开发版本

如果您想保持在 Home Assistant 核心开发分支的最前沿，您可以升级到 `dev`。

`dev` 分支很可能不稳定。潜在后果包括数据丢失和实例损坏。

1. 加入开发频道。

    ```bash
    ha supervisor options --channel dev
    ```

2. 重新加载 **Home Assistant Supervisor**。

    ```bash
    ha supervisor reload
    ```

3. 将 **Home Assistant 核心** 更新到最新的开发版本。

    ```bash
    ha core update --backup
    ```

    _这里的_ `--backup` _标志确保您拥有当前设置的部分备份，以防您需要降级。_

完成后，Home Assistant 核心会更新到最新的开发版本。

### 运行特定版本

要查看您的系统正在运行的版本，进入 [**设置** > **关于**](https://my.home-assistant.io/redirect/info/)。

如果 Home Assistant 核心版本与您的硬件设置不兼容，您可以降级到以前的发布版本。在此示例中，`<version>` 用作目标版本，但您可以选择您想要运行的版本。

要升级到特定版本，您可以使用命令行 (CLI)。下面的示例显示如何升级到 `<version>`。要了解如何在 Home Assistant 中开始使用命令行，请参阅[SSH 插件设置说明](/home-assistant/common-tasks/os/#安装和使用-ssh-插件)。

```bash
ha core update --version <version> --backup
```

_这里的_ `--backup` _标志确保您拥有当前设置的部分备份，以防您以后需要降级。_

要降级您的安装，请改为执行[恢复备份](/home-assistant/common-tasks/general/#恢复备份)。

如果您想固定到某个特定版本，只需运行上面的命令即可。

## 使用外部数据磁盘

**Home Assistant Operating System** 支持在辅助存储介质上存储数据。例如，这可以是第二个内部 SSD 或 HDD，或 USB 连接的 SSD 或 HDD。此数据磁盘不仅包含用户数据，还包含大部分 Home Assistant 软件（核心、Supervisor 等）。这意味着快速的数据磁盘将使整个系统更快。

![显示数据磁盘功能架构的图示](/home-assistant/images/haos/usb-data-disk.png)

数据磁盘功能可以在现有安装上使用而不会丢失数据：系统将自动将现有数据移动到外部数据磁盘。但是，仍建议您在继续之前先创建并下载完整的<a href="#备份">备份</a>！

目标磁盘上的所有数据将被覆盖！

:::important
外部数据磁盘的存储容量必须大于现有（启动）磁盘的存储容量。
:::

:::important
如果您之前一直使用 **Home Assistant Operating System** 的数据磁盘，您需要使用您的主机计算机删除所有分区，*然后*才能再次将其用作数据磁盘。
:::

### 使用用户界面移动数据分区

1. 将数据磁盘连接到您的系统。
2. 在用户界面中进入 **[设置 > 系统 > 存储](https://my.home-assistant.io/redirect/storage/)**。
3. 选择 **移动数据磁盘**。
4. 从可用设备列表中选择数据磁盘。
5. 选择 **移动**。
   - 根据数据量，这可能需要一段时间。

### 使用 CLI 移动数据分区

要查看当前数据磁盘，使用：

```bash
$ ha os info
...
data_disk: /dev/mmcblk1p4
...
```

要获取 `datadisk` 可以使用的潜在目标列表：

```bash
ha os datadisk list
```

要启动移动到新数据磁盘，使用 `move` 命令：

```bash
ha os datadisk move /dev/sdx
```

系统将准备数据磁盘并立即重启。重启将需要 10 分钟或更长时间，具体取决于新数据磁盘的速度；请耐心等待！

:::warning
使用 USB 连接的 SSD 可能会消耗相当多的电力。例如，在 Raspberry Pi 3 上，官方 Raspberry Pi 电源 (PSU) 仅提供 2.5A，这可能太紧张了。如果您遇到问题，请使用更强大的电源。或者使用有源 USB 集线器。将集线器连接到 Raspberry Pi 的 USB 插槽之一，并将 SSD 连接到集线器。在这种设置中，集线器的电源将为连接的设备供电。
:::

### 将外部数据磁盘迁移到另一个系统

本节介绍如何将外部数据磁盘从一个系统移动到另一个系统。
如果以下元素适用于您的使用场景，这可能是一个选项：

- 您已经有一个正常运行的使用外部数据磁盘的 Home Assistant 实例（系统 1）。
- 您有另一个新的 Home Assistant 实例（系统 2）。
- 您现在想在系统 2 上使用系统 1 的数据磁盘。

目标是将数据从系统 1 迁移到系统 2。一种方法是通过[恢复备份](/home-assistant/common-tasks/general/#恢复备份)。另一种方法是移动数据磁盘。如果您的外部磁盘上有大量数据，或者其容量大于新系统的内置存储，这会是一个值得考虑的方案。

#### 前提条件

- 一个使用外部数据磁盘的 Home Assistant 实例（系统 1）
- 一个您想要将外部数据磁盘移动到的 Home Assistant 实例（系统 2）

#### 将外部数据磁盘迁移到另一个系统

要将外部数据磁盘从一个系统迁移到另一个系统，请按照以下步骤操作：

1. [为两个系统创建备份](/home-assistant/common-tasks/general/#备份)，并将这些备份存储在另一台系统上（这不是强制要求，但建议至少对重要数据这样做）。
2. 关闭系统 1 并移除数据磁盘。
3. 确保系统 2 已安装 Home Assistant OS，并且 Home Assistant 已启动并运行。此时，Home Assistant 正在使用启动驱动器（例如 SD 卡）上的数据磁盘（分区）。
4. 确保系统 2 已完成基本的 [入门](/home-assistant/getting-started/onboarding/) 步骤，包括自动发现设备的最后步骤。
5. 将外部磁盘插入系统 2 并进入 **设置** > **系统**。选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **重启 Home Assistant** > **重启系统**。

   **结果**：显示一个修复问题 **检测到多个数据磁盘**。
   - 出现修复问题是因为系统 2 现在看到两个具有相同名称的文件系统。在重启期间，与现有数据磁盘存在名称冲突，因为未定义应该使用哪个文件系统。这可能导致您最终使用的系统的随机选择。因此您必须做出决定。
6. 打开修复问题并选择以下选项之一：
   - 选择 **使用检测到的数据磁盘而不是当前系统**。
     - 这将覆盖系统 2 的当前文件系统，改为使用您的外部数据磁盘。
     - 您将无法再访问当前的 Home Assistant 数据。它将被标记为非活动数据磁盘。
   - 如果您改变主意不想使用外部数据磁盘：
     - 拔掉外部数据磁盘。
     - 如果由于某种原因无法拔掉外部数据磁盘，选择 **标记为非活动数据磁盘（重命名文件系统）**。
       - 这确保重启后没有名称冲突。
       - 这也意味着您无法使用存储在外部磁盘上的文件系统。
       - 您继续使用系统 1 的当前文件系统。

<!-- Accessing Home Assistant from the commandline-->
## 通过命令行使用 Home Assistant

在 [SSH 命令行](/home-assistant/common-tasks/os/) 上，您可以使用 `ha` 命令检索日志、检查连接硬件的详细信息等。

### Home Assistant

```bash
ha core check
ha core info
ha core logs
ha core options
ha core rebuild
ha core restart
ha core restart --safe-mode
ha core start
ha core stats
ha core stop
ha core update
```

### Supervisor

```bash
ha supervisor info
ha supervisor logs
ha supervisor reload
ha supervisor update
```

### 主机

```bash
ha host reboot
ha host shutdown
ha host update
```

### 硬件

```bash
ha hardware info
ha hardware audio
```

### 使用示例

要将 Home Assistant 更新到特定版本，使用命令：

```bash
ha core update --version x.y.z
```

将 x.y.z 替换为所需版本，如 `--version 2024.1.0`

您可以通过输入 `ha help` 获取 CLI 功能的更好描述：

```text
The Home Assistant CLI is a small and simple command line utility that allows
you to control and configure different aspects of Home Assistant

Usage:
  ha [command]

Available Commands:
  addons         Install, update, remove and configure Home Assistant apps
  audio          Audio device handling.
  authentication Authentication for Home Assistant users.
  backups        Create, restore and remove backups
  banner         Prints the CLI Home Assistant banner along with some useful information
  cli            Get information, update or configure the Home Assistant cli backend
  core           Provides control of the Home Assistant Core
  dns            Get information, update or configure the Home Assistant DNS server
  docker         Docker backend specific for info and OCI configuration
  hardware       Provides hardware information about your system
  help           Help about any command
  host           Control the host/system that Home Assistant is running on
  info           Provides a general Home Assistant information overview
  jobs           Get information and manage running jobs
  multicast      Get information, update or configure the Home Assistant Multicast
  network        Network specific for updating, info and configuration imports
  observer       Get information, update or configure the Home Assistant observer
  os             Operating System specific for updating, info and configuration imports
  resolution     Resolution center of Supervisor, show issues and suggest solutions
  supervisor     Monitor, control and configure the Home Assistant Supervisor

Flags:
      --api-token string   Home Assistant Supervisor API token
      --config string      Optional config file (default is $HOME/.homeassistant.yaml)
      --endpoint string    Endpoint for Home Assistant Supervisor (default is 'supervisor')
  -h, --help               help for ha
      --log-level string   Log level (defaults to Warn)
      --no-progress        Disable the progress spinner
      --raw-json           Output raw JSON from the API

Use "ha [command] --help" for more information about a command.
```

### 控制台访问

您还可以通过直接连接的键盘和显示器访问 **Home Assistant Operating System**，即控制台。

#### 从命令行擦除数据磁盘

在 **Home Assistant Operating System** 中，`ha os datadisk wipe` 命令擦除数据磁盘。该命令删除所有用户数据以及 Home Assistant 核心、Supervisor 和任何已安装的插件。

命令 `ha os datadisk wipe` 将数据分区（无论是内部 eMMC 或 SD 卡上的，还是外部连接的数据磁盘上的）标记为在下一次重启时清除。该命令自动重启系统。重启后，数据被清除。然后系统继续启动并重新安装所有 Home Assistant 组件的最新版本。

`ha os datadisk wipe` 命令只能从本地终端运行。连接显示器和键盘并使用终端。

注意，某些系统有一个重置按钮，您可以使用它来清除数据磁盘，而不是使用命令行：

- 如果您有带 Raspberry Pi Compute Module 5 的 Home Assistant Yellow，请使用上述命令行步骤。

- 如果您有带 Raspberry Pi Compute Module 4 的 Home Assistant Yellow，有一个红色硬件按钮可以擦除数据磁盘。请按照 [重置 Home Assistant Yellow](https://support.nabucasa.com/hc/articles/25463622043165) 上的程序操作。
- 如果您有 Home Assistant Green，有一个黑色硬件按钮可以擦除数据磁盘。请按照 [重置 Home Assistant Green](https://support.nabucasa.com/hc/en-us/articles/25161225495837) 上的程序操作。

#### 从命令行列出所有用户

在 **Home Assistant Operating System** 中，`ha auth list` 命令列出您的 Home Assistant 上注册的所有用户。

`ha auth list` 命令只能从本地终端运行。连接显示器和键盘并使用终端。

## 启用重复日志文件

默认情况下，Home Assistant 核心日志会发送到 Systemd Journal，您可以使用[`ha core logs` 命令](/home-assistant/common-tasks/os/#通过命令行使用-home-assistant)读取。如果您还需要将日志写入文件（`/config/home-assistant.log`），可以通过[命令行](/home-assistant/common-tasks/os/#通过命令行使用-home-assistant)启用重复日志文件选项：

```bash
ha core options --duplicate-log-file=true
ha core rebuild
ha core restart
```

要禁用它：

```bash
ha core options --duplicate-log-file=false
ha core rebuild
ha core restart
```

<!-- Enabling i2c-->
## 启用 I2C

使用 **Home Assistant Operating System** 的 Home Assistant 是一个托管环境，这意味着您不能使用现有方法在 Raspberry Pi 上启用 I2C 总线。为了使用 I2C 设备，您需要：
- 为 Home Assistant Operating System 启用 I2C
- 设置 I2C 设备，例如传感器

### 使用 SD 卡读卡器启用 I2C

#### 访问启动分区

您需要：
- SD 卡读卡器
- 刷入了 **Home Assistant Operating System** 的 SD 卡

关闭/断开您的 Home Assistant 安装并拔出 SD 卡。
将 SD 卡插入 SD 卡读卡器并找到一个名为 `hassos-boot` 的驱动器/文件系统。文件系统可能会自动显示/挂载。如果没有，
使用您操作系统的磁盘管理实用程序找到 SD 卡读卡器，并确保第一个分区可用。

#### 添加文件以启用 I2C

- 在 `hassos-boot` 分区的根目录中，添加一个名为 `CONFIG` 的新文件夹。
- 在 `CONFIG` 文件夹中，添加另一个名为 `modules` 的新文件夹。
- 在 `modules` 文件夹中，添加一个名为 `rpi-i2c.conf` 的文本文件，内容如下：
  ```text
  i2c-dev
  ```
- 在 `hassos-boot` 分区的根目录中，编辑名为 `config.txt` 的文件，向其中添加两行：
  ```text
  dtparam=i2c_vc=on
  dtparam=i2c_arm=on
  ```

#### 使用新的操作系统配置启动

- 将 SD 卡重新插入您的 Raspberry Pi。
- 启动时，`hassos-config.service` 将自动获取新的 `rpi-i2c.conf` 配置。
- 可能需要另一次重启以确保刚导入的 `rpi-i2c.conf` 在启动时存在。

### 通过 Home Assistant Operating System 终端启用 I2C

或者，通过将键盘和屏幕连接到您的设备，您可以访问 **Home Assistant Operating System** 的物理终端。

您可以通过此终端启用 I2C：

- 以 `root` 身份登录。
- 输入 `login` 并按回车键访问 shell：

  ```bash
  mkdir -p /mnt/boot/CONFIG/modules
  echo i2c-dev > /mnt/boot/CONFIG/modules/rpi-i2c.conf
  echo dtparam=i2c_vc=on >> /mnt/boot/config.txt
  echo dtparam=i2c_arm=on >> /mnt/boot/config.txt
  sync
  reboot
  ```
### 故障排除

重启主机后，`/dev` 中应该有 `i2c-0` 和类似的设备文件。如果缺少这样的设备文件，则 I2C 启用由于某种原因失败。您可以通过在终端中使用 `lsmod | grep i2c` 来检查 I2C 内核模块的状态。如果它们已加载，您应该至少找到条目 `i2c_dev`。模块的活动使用由数字指示，例如，`i2c_dev 20480 2` 表示有两个活动的 I2C 设备文件。

活动的 I2C 也可以用万用表检查，在 I2C 引脚 GPIO2 和 GPIO3 上显示 3.3 V。
