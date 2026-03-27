---
title: Z-Wave
description: 'Z-Wave 集成允许您通过 Z-Wave JS(https://zwave-js.github.io/node-zwave-js//) 驱动程序从 Home Assistant 控制 Z-Wave 网络。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
featured: true
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Event
  - Fan
  - Hub
  - Humidifier
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
  - Update
ha_release: '2021.2'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/z-wave'
ha_domain: zwave_js
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - event
  - fan
  - humidifier
  - light
  - lock
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_integration_type: hub
ha_zeroconf: true
related:
  - docs: /connect/zwa-2
    title: Home Assistant Connect ZWA-2 Z-Wave 适配器
  - docs: /docs/z-wave/controllers/
    title: 其他 Z-Wave 适配器
---
# Z-Wave

**Z-Wave** 集成允许您通过 [Z-Wave JS](https://zwave-js.github.io/node-zwave-js/#/) 驱动程序从 Home Assistant 控制 Z-Wave 网络。

## 入门

本节介绍如何设置 Z-Wave 网络以及如何将 Z-Wave 终端设备添加到该网络。

Home Assistant 中的 Z-Wave 网络包括以下元素：

- Z-Wave 适配器（例如 [Home Assistant Connect ZWA-2](/home-assistant/connect/zwa-2)）
- Z-Wave 服务器（例如 **Z-Wave JS** 应用程序，以前称为插件）
- 此 Z-Wave 集成
- Z-Wave 终端设备

### 在 Home Assistant 中设置 Z-Wave 服务器

本节介绍如何在 Home Assistant 中使用 **Z-Wave JS** 应用程序设置 Z-Wave 服务器。

有关设置 Z-Wave 服务器的其他方法，请参阅[高级安装说明](#advanced-installation-instructions)。

设置完 Z-Wave 服务器后，您可以[向网络添加设备](#adding-a-new-device-to-the-z-wave-network)。

#### 前提条件

- [支持的 Z-Wave 适配器](/home-assistant/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules)。
  - 首次使用？有关推荐，请参阅[应该购买哪种 Z-Wave 适配器](#which-z-wave-adapter-should-i-buy)。

#### 设置 Z-Wave 服务器

1. 打开 Home Assistant 用户界面。
2. 将 Z-Wave 适配器插入运行 Home Assistant 的设备。
   - 您的适配器很可能会被自动识别。
   - 在对话框中，选择 **推荐安装**。
     - 这将在 Home Assistant 服务器上安装 Z-Wave JS 应用程序。
   - 将设备添加到区域并选择 **完成**。
   - **故障排除**：如果您的适配器未被自动识别，请按照[这些步骤](#my-z-wave-adapter-isnt-recognized-automatically-during-setup)操作。

3. 等待安装完成。
4. 根据您的 Home Assistant 版本，您可能会被提示输入网络安全密钥。
   - 如果您是首次使用 Z-Wave，请将所有字段留空并选择 **提交**。系统将为您生成网络安全密钥。
   - 如果此 Z-Wave 适配器已经与安全设备配对，您需要输入之前使用的网络密钥作为 S0 网络密钥。S2 安全密钥将为您自动生成。
   - 确保将这些密钥的备份保存在安全的地方，以防您需要将 Z-Wave 适配器移动到另一台设备。复制并粘贴到安全的地方。
5. 等待 Z-Wave JS 应用程序启动。
6. 安装完成后，将显示 Z-Wave 适配器的 **设备信息**。
   - 您已成功安装 Z-Wave 集成和 Z-Wave JS 应用程序。
   - 您现在可以[向 Z-Wave 网络添加设备](/home-assistant/integrations/zwave_js/#adding-a-new-device-to-the-z-wave-network)。

:::note
虽然您的 Z-Wave 网格永久存储在适配器上，但额外的元数据并不是。当 Z-Wave 集成首次启动时，它将查询您的整个 Z-Wave 网络。根据与 Z-Wave 适配器配对的设备数量，这可能需要一些时间。您可以通过手动唤醒电池供电设备来加快此过程。大多数情况下，这是在这些设备上按下一个按钮（参见其手册）。无需从网格中排除并重新包含设备。

:::
### 向 Z-Wave 网络添加新设备

1. 在 Home Assistant 中，转到 [**设置** > **Z-Wave**](https://my.home-assistant.io/redirect/config_zwave_js/)。
2. 选择 **添加设备**。
   - Z-Wave 适配器现在处于添加模式。
3. 检查您的设备是否支持 SmartStart：
   - 在包装上检查 SmartStart 标签。
   - 找到二维码。它可以在包装上或设备本身上。
4. 根据您的设备是否支持 SmartStart，按照选项 1 或 2 中的步骤操作：
   - **选项 1：您的设备支持 SmartStart**：
     - 确保设备已关闭。
     - 选择 **扫描二维码** 并扫描设备上的二维码。
       - **故障排除**：如果扫描不起作用（例如由于缺少 HTTPS），请从其他二维码阅读器粘贴二维码内容作为文本，然后选择 **提交**。
     - 如果设备支持 Z-Wave Long Range，您将被提示选择网络类型。
       - **Long Range**：如果它远离其他设备，或者该位置过去有连接问题。这也可能有助于延长电池寿命。
       - **Mesh**：如果您已经有网格网络。添加它可以增强此网络的覆盖范围和可靠性。
       - 您随时可以移除并重新配对设备以切换到其他网络类型。
     - 打开设备并将其设置为添加模式。
       - 如果已经打开，您可能需要重新通电。
   - **选项 2：您的设备不支持 SmartStart**：
     - 将设备设置为添加模式。请参阅设备手册了解如何操作。
     - 如果您的设备使用 S2 安全添加，您可能会被提示输入设备提供的 PIN 码。通常，此 PIN 码随文档提供，并且也印在设备本身上。有关安全添加的更多信息，请参阅[本节](/home-assistant/integrations/zwave_js/#should-i-use-secure-inclusion)。
5. 界面应确认设备已添加。稍等片刻（几秒到几分钟），实体也应该被创建。
6. **故障排除**：如果适配器无法添加/找到您的设备，请取消添加过程。
   - 在某些情况下，在添加设备之前先[移除](#removing-a-device-from-a-foreign-z-wave-network)设备（排除）可能会有所帮助，即使该设备尚未添加到此 Z-Wave 网络。
   - 另一种方法是将设备恢复出厂设置。请参阅设备手册了解如何操作。

**重要：**

1. **不要移动您的 Z-Wave 适配器来添加设备。** 移动适配器已不再必要，并且会导致路由中断。
2. **不要从 Z-Wave 适配器本身启动设备添加。** 这已不再支持。

### 从当前 Z-Wave 网络移除设备

在将设备与其他适配器一起使用之前，或者当您不再使用该设备时执行此操作。它从存储在适配器上的 Z-Wave 网络中移除设备。它还从 Home Assistant 中移除设备及其所有实体。如果设备仍与适配器配对，则无法将其加入新网络。

1. 在 Home Assistant 中，转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 选择 **Z-Wave** 集成。
   - 然后，选择要移除的设备。
3. 在 **设备信息** 下，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **删除**。
   - 这将打开一个包含移除设备选项的对话框。
4. 选择 **移除正常工作的设备**。
   - Z-Wave 适配器现在处于排除模式。
5. 将要移除的设备设置为排除模式。请参阅其手册了解如何操作。
6. 界面应确认设备已移除，设备和实体将从 Home Assistant 中移除。

### 从外部 Z-Wave 网络移除设备

当您有一个仍与适配器配对的设备，但您不再有该适配器的访问权限时执行此操作。如果设备未从该适配器中排除，则无法将其加入新网络。此过程从以前的适配器网络中移除设备，允许您将其与新适配器配对。

1. 在 Home Assistant 中，转到 [**设置** > **Z-Wave**](https://my.home-assistant.io/redirect/config_zwave_js/)。
2. 选择 **选项**。
3. 在 **移除外部设备** 旁边，选择 **移除** > **开始排除**。
4. 将要移除的设备设置为排除模式。请参阅其手册了解如何操作。
5. 界面应确认设备已移除，设备和实体将从 Home Assistant 中移除。

## 将 Z-Wave 网络迁移到新适配器

如果您有现有的 Z-Wave 网络并希望用新适配器替换其适配器，请执行此操作。带有所有实体的 Z-Wave 集成将保留在 Home Assistant 中。新适配器被添加到 Home Assistant 并与现有网络配对。

:::tip
您不能使用同一 Z-Wave 应用程序实例同时运行两个 Z-Wave 适配器。如果您只想使用单个应用程序实例，则需要将网络迁移到新适配器。如果您想同时使用两个适配器，则需要第二个 Z-Wave JS Server 实例。您可以在单独的容器中运行此额外的 Z-Wave JS Server 实例，或在 Home Assistant 之外的另一个系统上运行 Z-Wave JS Server 或 Z-Wave JS UI。

:::
### 前提条件

- Home Assistant 管理员权限

#### 特定设备的前提条件

<details>
<summary>从 500 系列适配器迁移</summary>


在开始迁移之前，您需要将适配器更新到 SDK 6.61+

- 查看设备文档，了解是否以及如何更新。
- [更新 Aeotec Z-Stick 5 的步骤](https://aeotec.freshdesk.com/support/solutions/articles/6000252294-z-stick-gen5-v1-02-firmware-update)。


</details>

<details>
<summary>从 Nortek HUSBZB-1 适配器迁移</summary>


没有简单的方法来更新该设备。

- 您需要设置一个新网络。
- 如果您熟悉焊接：
  - 一些用户报告说他们能够使用[此更新程序（需要焊接）](https://community.hubitat.com/t/guide-nortek-husbzb-1-nvm-backup-restore-and-updating-z-wave-firmware/48012)升级 **Nortek HUSBZB-1** 的固件。
  - 该过程非常复杂。从头开始可能更快。


</details>

### 将 Z-Wave 网络迁移到新适配器

1. 在 Home Assistant 中，转到 [**设置** > **Z-Wave**](https://my.home-assistant.io/redirect/config_zwave_js/)。
2. 在 **迁移适配器** 下，选择 **迁移**。
3. 当显示 **拔掉您的适配器** 对话框时，拔掉您的旧适配器。
   - 现在移除旧设备很重要，因为它可能会干扰新设备。即使它可能不会立即抛出错误，也可能会导致问题。
4. 连接新适配器。
5. 选择 **提交**。
6. 在 **选择您的设备** 对话框中，选择您刚刚连接的 Z-Wave 适配器。
   - 通常，您可以选择连接到 USB 端口的设备。
   - 要连接到通过 TCP 暴露的 Z-Wave 控制器（如 [Portable Z-Wave](https://www.home-assistant.io/blog/2025/10/13/portable-z-wave-with-wifi-and-poe/)），请选择 **使用套接字** 选项。
7. 选择 **提交**。
   - 新适配器现在正在与您现有的 Z-Wave 网络配对。
   - **故障排除**：如果迁移失败，可能是因为您错误地选择了 **使用套接字**。如果您使用的是基于 USB 的控制器，请重新插入旧适配器，并等待网络重新加载。
     - 一旦旧适配器连接并且网络运行正常，请重复迁移步骤。
     - 确保这次选择新控制器（而不是 **使用套接字**）。
8. 迁移完成后，检查是否要重命名适配器。如果您之前更改过名称，新适配器可能会保留旧适配器的名称。
   - 在左上角，选择返回按钮返回集成页面。
   - 在设备列表中，检查设备名称。
   - 要更改设备名称，请选择 `[mdi:pencil]` 按钮。

## 从 Z-Wave JS UI 迁移到 Z-Wave JS 应用程序

如果您一直在使用 Z-Wave JS UI 应用程序，可以迁移到 Z-Wave JS 应用程序，而无需重新配对设备。Z-Wave JS 应用程序是 Z-Wave JS UI 应用程序的继任者，提供更好的体验和更多功能。迁移过程涉及安装 Z-Wave JS 应用程序，它将自动接管 Z-Wave JS UI 应用程序。

### 前提条件

- Home Assistant 管理员权限
- 您的 Z-Wave 网络当前由 Z-Wave JS UI 应用程序管理

### 安装必要的应用程序

1. 在 Home Assistant 中，转到 [**设置** > **应用程序** > **Z-Wave JS**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_zwave_js)。
2. 通过选择 **安装** 来安装 Z-Wave JS 应用程序。
   - 暂时不要启动应用程序。
3. 安装必要的辅助应用程序：
   - 安装 [**Terminal & SSH** 应用程序](/home-assistant/common-tasks/os/#installing-and-using-the-ssh-app)，以便您可以在 Home Assistant 主机上运行命令。
   - 安装一个让您在 Home Assistant 主机上上传和编辑文件的应用程序，如 [**File Editor** 应用程序](/home-assistant/common-tasks/os/#installing-and-using-the-file-editor-app) 或 [**Studio Code Server** 应用程序](/home-assistant/common-tasks/os/#installing-and-using-the-visual-studio-code-vsc-app)。

### 从 Z-Wave JS UI 下载备份

1. 打开 **Z-Wave JS UI** Web 界面并转到 **Store** 选项卡。

   ![Z-Wave JS UI Web 界面中的 Store 选项卡](/home-assistant/images/integrations/z-wave/z-wave-js-ui-store-tab.png)

2. 下载备份：
   - 在右下角，选择 **Download**。

   ![Z-Wave JS UI Web 界面中的 Download 按钮](/home-assistant/images/integrations/z-wave/z-wave-js-ui-download-backup.png)

3. 停止 **Z-Wave JS UI** 应用程序。

### 运行迁移脚本

1. 从 `https://gist.github.com/AlCalzone/eb0947a39a3ff91c053f259f0ac4efc3#file-migrate_to_zwave_js_app-sh` 下载迁移脚本 `.zip` 文件。
2. 解压 zip 文件并找到 `migrate_to_zwave_js_app.sh` 脚本。
3. 找到您从 Z-Wave JS UI Web 界面下载的备份文件。它应该是一个 `.zip` 文件。
4. 打开 Studio Code Server 或 SSH 应用程序。
5. 将备份文件和迁移脚本上传到临时文件夹，最好是 `/tmp` 文件夹。
6. 打开终端，然后使用 `cd /tmp` 导航到 `/tmp` 文件夹。

   ![在终端中导航到临时文件夹](/home-assistant/images/integrations/z-wave/z-wave-js-ui-migration-tmp-1.png)

7. 通过运行 `chmod +x ./migrate_to_zwave_js_app.sh` 使脚本可执行

   ![在终端中使脚本可执行](/home-assistant/images/integrations/z-wave/z-wave-js-ui-migration-run-chmod.png)

8. 运行 `./migrate_to_zwave_js_app.sh <backup-filename>`，然后按照屏幕上的说明操作：

   ![在终端中运行迁移脚本](/home-assistant/images/integrations/z-wave/z-wave-js-ui-migration-run-script.png)

### 重新配置 Z-Wave 集成以使用 Z-Wave JS 应用程序

1. 转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/?domain=zwave_js)。
2. 选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **重新配置**。

   ![重新配置 Z-Wave 集成](/home-assistant/images/integrations/z-wave/z-wave-js-ui-migration-reconfigure.png)

3. 选择 **重新配置当前适配器**。

   ![重新配置当前适配器](/home-assistant/images/integrations/z-wave/z-wave-js-ui-migration-reconfigure-adapter.png)

4. 根据您的控制器连接方式，您可能需要选择或清除 **使用 Z-Wave Supervisor 应用程序** 复选框。
   - _选项 1：_ 如果您使用的是基于 USB 或基于 TCP 的控制器：
     - 选择 **使用 Z-Wave Supervisor 应用程序** 复选框。

       ![选择 Z-Wave Supervisor 应用程序复选框](/home-assistant/images/integrations/z-wave/z-wave-js-ui-migration-select-option.png)

     - 在下一步中，选择您的控制器并选择 **提交**。

       ![重新配置当前适配器](/home-assistant/images/integrations/z-wave/z-wave-js-ui-migration-select-adapter-1.png)

   - _选项 2：_ 如果您使用的是 GPIO 模块或您的控制器未显示在列表中：
     - 清除 **使用 Z-Wave Supervisor 应用程序** 复选框。

       ![取消选择 Z-Wave Supervisor 应用程序](/home-assistant/images/integrations/z-wave/z-wave-js-ui-migration-deselect-option.png)

     - 输入 Z-Wave JS 应用程序的连接详细信息：
       - 在 **URL** 字段中，输入 `ws://core-zwave-js:3000`。

       ![重新配置当前适配器](/home-assistant/images/integrations/z-wave/z-wave-js-ui-migration-enter-url.png)

5. 删除您为迁移上传到 `/tmp` 文件夹的临时文件。
6. 完成！您的 Z-Wave JS 应用程序现在正在管理您的 Z-Wave 网络。您可以启动 Z-Wave JS 应用程序并停止和卸载 Z-Wave JS UI 应用程序。

## 在 Z-Wave JS 应用程序中覆盖适配器的无线电频率区域

Z-Wave 设备使用的频率取决于您所在的地区。对于 700 和 800 系列适配器，此频率可以更改。终端设备的频率不能更改，因此您需要购买特定于您所在地区的设备。

如果您使用的是 Z-Wave JS 应用程序，Home Assistant 会自动更改无线电频率区域以匹配您所在的国家/地区。如果需要，您可以覆盖此设置。

### 前提条件

- Home Assistant 管理员权限
- 您的所有 Z-Wave 设备必须指定用于该区域
- 注意：此过程仅适用于您的适配器是[使用 Z-Wave JS 应用程序设置](#to-set-up-a-z-wave-server)的情况

### 覆盖 Z-Wave 适配器的无线电频率区域

1. 转到 [**设置** > **应用程序** > **Z-Wave JS**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_zwave_js)。
2. 打开 **配置** 选项卡。
3. 在 **选项** 部分，选择 **无线电频率区域**。
   - **自动** 根据 [**设置** > **系统** > **常规**](https://my.home-assistant.io/redirect/general/) 下定义的位置设置区域。
   - 对于支持 Long Range 的地区，如果适配器支持，它将使用 Long Range。
   - 如果您手动设置区域，请选择可用的 Long Range 选项之一：
     - **欧洲（Long Range）** 或 **美国（Long Range）**。
   - 即使选择了 Long Range 选项，您仍然可以添加不支持 Long Range 的设备。
4. 要应用更改，选择 **保存**。
   - 您的 Z-Wave 适配器现在已准备好与指定用于所选区域的设备通信。
5. 要返回默认设置并使用 Home Assistant 定义的区域，在 **无线电频率区域** 下选择 **自动**。

## 备份您的 Z-Wave 网络

建议在对 Z-Wave 网络进行任何重大更改之前创建备份。例如，在从一个适配器迁移到另一个适配器之前，或在重置适配器之前。备份存储您的 Z-Wave 适配器的非易失性存储器（NVM），其中包含您的网络信息，包括配对的设备。它存储在一个可以下载的二进制文件中。

### 前提条件

- Home Assistant 管理员权限

### 备份 Z-Wave 网络

1. 在 Home Assistant 中，转到 [**设置** > **Z-Wave**](https://my.home-assistant.io/redirect/config_zwave_js/)。
2. 在 **下载备份** 下，选择 **下载**。
   - **结果**：备份文件下载到您发起下载的设备。
3. 完成！将备份文件存储在安全的地方，以便以后需要恢复 Z-Wave 网络时使用。

## 从备份恢复 Z-Wave 网络

您可以从备份恢复 Z-Wave 网络。

### 前提条件

- Home Assistant 管理员权限
- 已下载[备份](#backing-up-your-z-wave-network)

### 从备份恢复 Z-Wave 网络

1. 在 Home Assistant 中，转到 [**设置** > **Z-Wave**](https://my.home-assistant.io/redirect/config_zwave_js/)。
2. 在 **从备份恢复** 下，选择 **恢复**。
   - 选择要从其恢复的备份。
   - **结果**：Z-Wave 网络正在恢复，属于该网络的设备应该会重新出现。

## 更新 Z-Wave 设备的固件

具有固件更新元数据命令类的适配器和设备允许您通过上传固件文件来更新固件。在这些情况下，您可以从 Home Assistant 中的设备页面启动固件更新。请参阅设备制造商的文档以找到相应的固件文件。一个例子是 [Zooz 的固件页面](https://www.support.getzooz.com/kb/article/1158-zooz-ota-firmware-files/)。

:::note
**固件更新可能导致设备损坏**

固件更新可能会损坏您的 Z-Wave 设备。

- 在更新 Z-Wave 设备之前，确保更新是必要的，并且您拥有与设备匹配的正确固件文件。
- 一旦您开始更新过程，您不得中断更新过程，而是让其完成。

Home Assistant 和 Z-Wave JS 团队对因固件更新导致的任何设备损坏不承担任何责任，如果由于固件更新导致设备无法使用，将无法为您提供帮助。

:::
### 前提条件

- Home Assistant 管理员权限
- 从制造商网站下载的固件文件

### 更新 Z-Wave 设备的固件

1. 在 Home Assistant 中，转到 [**设置** > **Z-Wave**](https://my.home-assistant.io/redirect/config_zwave_js/)。
2. 选择 **设备**。
   - 然后选择要更新的设备。
3. 在 **设备信息** 下，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **更新**。
4. 选择您之前下载到计算机的固件文件。
   - **注意：设备损坏风险**
     - 确保选择正确的固件文件。
       - 错误的固件文件可能会损坏您的设备。
     - 一旦开始更新过程，必须等待更新完成。
       - 中断的更新可能会损坏您的设备。
5. 选择 **开始固件更新** 并等待其完成。

## 重置 Z-Wave 适配器

建议在重置设备之前备份 Z-Wave 网络。

- 适配器将忘记所有与其配对的设备。
- 此网络的所有 Z-Wave 设备将从 Home Assistant 中移除。

- 如果重置时仍有设备与适配器配对，它们必须经过排除过程才能重新配对。
- 设备固件将保留在设备上。

### 前提条件

- Home Assistant 管理员权限
- [备份您的 Z-Wave 网络](#backing-up-your-z-wave-network)
- [从网络中移除所有与适配器配对的设备](#removing-a-device-from-the-z-wave-network)。
  - 移除可以由任何适配器完成，而不仅仅是原本管理网络的适配器。理论上，这也可以稍后完成。

### 重置 Z-Wave 适配器

1. 在 Home Assistant 中，转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 选择 **Z-Wave** 集成。然后，选择控制器。
3. 在 **设备信息** 下，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **恢复出厂设置**。


    ![显示 Z-Wave 适配器设备面板的屏幕截图](/home-assistant/images/integrations/z-wave/z-wave-controller-commands.png)
4. 在设备信息页面上，检查 **活动** 面板。当您看到状态实体变为不可用时，重置过程已完成。
   - 您现在可以拔掉适配器并使用它来启动新网络，或将其传递给其他人。
5. 如果您不再需要 Z-Wave 集成，可以从 Home Assistant 中[移除它](#removing-z-wave-js-from-home-assistant)。

## 特殊 Z-Wave 实体

Z-Wave 集成提供几个特殊实体，其中一些可用于每个 Z-Wave 设备，另一些则根据设备条件提供。

### 每个 Z-Wave 设备可用的实体

1. **节点状态** 传感器：此传感器显示给定 Z-Wave 设备的节点状态。该传感器默认禁用。可用的节点状态在 [Z-Wave JS 文档](https://zwave-js.github.io/node-zwave-js/#/api/node?id=status)中有解释。它们可用于状态更改自动化。例如，当设备死机时 ping 设备，或在设备唤醒时刷新值。
2. **Ping** 按钮：可以按下此按钮来 ping 设备。它是 `zwave_js.ping` 动作的替代方案。
3. **适配器/节点统计** 传感器：Z-Wave JS 收集有关[节点](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotstatistics-updatedquot)和[适配器](https://zwave-js.github.io/node-zwave-js/#/api/controller?id=quotstatistics-updatedquot)之间通信的统计信息。这些统计信息可用于排除环境中的 RF 问题。这些统计信息在网络配置和设备信息面板中可用。但它们也可作为默认禁用的传感器使用。

### 条件实体

1. **手动空闲通知** 按钮：设备上具有空闲状态的任何通知命令类（CC）值将获得相应的按钮实体。此按钮实体可用于在通知不会自动清除时手动空闲通知。一个设备可以有多个通知 CC 值。例如，一个用于检测烟雾，一个用于检测一氧化碳。

## 使用高级功能（仅限 UI）

虽然集成旨在通过现有的 Home Assistant 结构（实体、状态、自动化、动作等）提供尽可能多的功能，但有一些功能仅通过 UI 可用。

所有这些功能都可以在 Z-Wave 集成配置面板或 Z-Wave 设备的设备面板中访问。

### 集成配置面板

以下功能可以从集成配置面板访问：

![Z-Wave 集成配置面板](/home-assistant/images/integrations/z-wave/z-wave-integration-config-panel.png)

- **添加设备**：右下角的按钮。允许您预配置 SmartStart 设备或启动添加新设备到网络的添加过程。

**我的网络** 部分让您访问 Z-Wave 网络的设备和实体列表。

- **显示地图**：允许您查看 Z-Wave 网络的可视化表示，显示设备和它们之间的路由。这有助于排查网络中的问题。

- **选项** > **移除设备**：启动[从网络中移除外部设备](#removing-a-device-from-a-foreign-z-wave-network)的排除过程。这允许您移除仍与另一个 Z-Wave 适配器配对的设备。
- **选项** > **发现并分配新路由**：发现适配器和设备之间的新路由。当设备或适配器移动到新位置，或者您的网络存在严重问题时，这很有用。发现过程会产生大量网络流量，应谨慎使用。
- **[统计](https://zwave-js.github.io/node-zwave-js/#/api/controller?id=quotstatistics-updatedquot)**：提供有关适配器和其他设备之间通信的统计信息，让您排查网络的 RF 质量。
- **日志**：提供对 Z-Wave JS 日志的访问，这有助于排查网络问题。
- **分析**：允许您选择加入或退出 Z-Wave JS 项目收集的遥测数据，以帮助开发和制造商做出明智的决定。此遥测默认禁用，必须选择加入才能激活。
- **网络信息**：有关 Z-Wave 网络的元数据，例如 Home ID、服务器版本或服务器 URL。此信息在排查网络问题或联系支持时很有帮助。
- **下载备份**：创建并[下载 Z-Wave 网络的备份](#backing-up-your-z-wave-network)。备份包含 Z-Wave 适配器的非易失性存储器（NVM），其中包括所有配对的设备。建议在对 Z-Wave 网络进行任何重大更改之前创建备份，例如迁移到新适配器或重置适配器。
- **从备份恢复**：从您之前下载的备份文件[恢复 Z-Wave 网络](#restoring-a-z-wave-network-from-backup)。这在迁移到新适配器时，或者在重置适配器后想要恢复网络时很有帮助。
- **迁移适配器**：允许您[将 Z-Wave 网络迁移到新适配器](#migrating-a-z-wave-network-to-a-new-adapter)。

#### 关于网络信息

集成配置面板中的 **网络信息** 部分显示有关 Z-Wave 网络和运行它的软件的元数据。此信息在排查问题或联系支持时很有用。

- **Home ID**：分配给您 Z-Wave 网络的唯一标识符。配对到您网络的每个设备都共享此 ID。它可用于验证设备是否属于您的网络，或在寻求帮助时识别您的网络。
- **驱动版本**：Z-Wave JS 服务器上运行的 [Z-Wave JS 驱动程序](https://github.com/zwave-js/node-zwave-js)版本。驱动程序是直接与您的 Z-Wave 适配器通信的核心库。
- **服务器版本**：您设置中运行的 [Z-Wave JS 服务器](https://github.com/zwave-js/zwave-js-server)版本。服务器充当 Z-Wave JS 驱动程序和 Home Assistant 之间的桥梁。
- **服务器 URL**：Home Assistant 用于连接到 Z-Wave JS 服务器的 WebSocket URL，例如 `ws://homeassistant.local:3000`。这在您需要验证或重新配置 Home Assistant 和 Z-Wave JS 服务器之间的连接时很有用。

### 集成菜单

某些功能可以从集成本身的菜单访问。由于它们不是 Z-Wave 特有的，这里不详细描述。
![Z-Wave 集成配置面板](/home-assistant/images/integrations/z-wave/z-wave-integration-menu.png)

- **[下载诊断](/home-assistant/docs/configuration/troubleshooting/#download-diagnostics)：** 导出一个 JSON 文件，描述向此集成注册的所有设备的实体。

#### 网络设备

以下功能可以从您网络上任何 Z-Wave 设备（适配器除外）的设备面板访问：

![Z-Wave 设备面板](/home-assistant/images/integrations/z-wave/z-wave-device-info.png)

- **配置：** 提供一种简便的方法来查找和更新设备的配置参数。虽然有设置配置参数值的现有动作，但此 UI 有时可能更快用于一次性更改。
- **重新查询：** 强制设备再次经历查询过程，以便 Z-Wave-JS 可以发现其所有功能。如果您没有看到设备的所有预期实体，这会有所帮助。
- **重建路由：** 发现适配器和设备之间的新路由。如果您认为设备出现意外延迟或 RF 问题，请使用此功能。在此过程中，您的设备可能会响应较慢。
- **删除：** 打开一个包含以下移除设备选项的对话框：
   - 使用排除从网络中移除它
   - 在不从网络排除的情况下从适配器移除故障设备
- **[统计](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotstatistics-updatedquot)：** 提供有关此设备和适配器之间通信的统计信息，让您排查设备的 RF 问题。
- **更新：** 使用手动上传的固件文件更新设备的固件。只有某些设备支持此功能（具有固件更新元数据命令类的适配器和设备）。
- **下载诊断：** 导出一个 JSON 文件，描述此特定设备的实体。

## 动作

### 动作：设置配置参数

`zwave_js.set_config_parameter` 动作更新配置参数。要在单次调用中更新多个部分参数，请使用 `zwave_js.bulk_set_partial_config_parameters` 动作。

| 数据属性 | 必需 | 描述                                                                                                                                                                                                                                                                |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`    | 否       | 要设置配置参数的实体（或实体列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                                                                                                                                                                                                  |
| `device_id`    | 否       | 要设置配置参数的设备 ID（或设备 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                                                                                                                             |
| `area_id`      | 否       | 要设置配置参数的设备/实体的区域 ID（或区域 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                                                                                                            |
| `parameter`    | 是       | 参数编号或属性名称。属性名称区分大小写。                                                                                                                                                                              |
| `bitmask`      | 否       | 部分参数的位掩码，十六进制（0xff）或十进制（255）格式。如果提供了参数名称，则不需要此项。不能与 value_size 或 value_format 组合使用。                                                                               |
| `value`        | 是       | 参数的目标值，可以是整数值或状态标签。状态标签区分大小写。                                                                                                                                                             |
| `value_size`   | 否       | 目标参数值的大小，可以是 1、2 或 4。当配置参数未在设备配置文件中定义时，与 value_format 组合使用。不能与 bitmask 组合使用。                                                              |
| `value_format` | 否       | 目标参数值的格式，0 表示有符号整数，1 表示无符号整数，2 表示枚举，3 表示位字段。当配置参数未在设备配置文件中定义时，与 value_size 组合使用。不能与 bitmask 组合使用。 |

#### 设置单个参数值的示例

让我们以[此设备](https://devices.zwave-js.io/?jumpTo=0x000c:0x0203:0x0001:0.0)的参数 31 为例，展示设置 `LED 1 Blink Status (bottom)` 部分参数的不同方式示例。注意在我们为同一键使用不同值的地方，这些不同值在示例中可以互换使用。例如，我们可以在所有示例中为 `value` 互换使用 `1` 或 `Blink`。

示例 1：

```yaml
action: zwave_js.set_config_parameter
target:
  entity_id: switch.fan
data:
  parameter: 31
  bitmask: 0x01
  value: 1
```

示例 2：

```yaml
action: zwave_js.set_config_parameter
target:
  entity_id: switch.fan
data:
  parameter: 31
  bitmask: 1
  value: "Blink"
```

示例 3：

```yaml
action: zwave_js.set_config_parameter
target:
  entity_id: switch.fan
data:
  entity_id: switch.fan
  parameter: "LED 1 Blink Status (bottom)"
  value: "Blink"
```

### 动作：批量设置部分配置参数

`zwave_js.bulk_set_partial_config_parameters` 动作批量设置多个部分配置参数。请注意，正确使用此动作需要 Z-Wave 的高级知识。

| 数据属性 | 必需 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`    | 否       | 要批量设置部分配置参数的实体（或实体列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                                                                                                                                                                                                                                                                                     |
| `device_id`    | 否       | 要批量设置部分配置参数的设备 ID（或设备 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                                                                                                                                                                                                                                                                                |
| `area_id`      | 否       | 要批量设置部分配置参数的设备/实体的区域 ID（或区域 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                                                                                                                                                                                                                                                               |
| `parameter`    | 是       | 属性的参数编号。属性名称区分大小写。                                                                                                                                                                                                                                                                                                                                                       |
| `value`        | 是       | 要为整个参数设置的原始整数值，或者一个字典，其中键是位掩码（整数或十六进制形式）或部分参数名称，值是要为每个部分设置的值（整数值或适用的命名状态）。请注意，使用字典时，未提供的位掩码将设置为其当前缓存的值。 |

#### 批量设置部分参数值的示例

让我们以[此设备](https://devices.zwave-js.io/?jumpTo=0x031e:0x000a:0x0001:0.0)的参数 21 为例，展示如何批量设置部分参数。在这种情况下，我们要将 `0xff` 设置为 `127`，`0x7f00` 设置为 `10`，`0x8000` 设置为 `1`（或原始值 `4735`）。

:::note
使用字典格式将部分参数映射到值时，缺失部分参数的缓存值将被使用。因此，在示例 2、3、4 和 5 中，动作将使用部分参数 `0xff0000`、`0x3f000000` 和 `0x40000000` 的缓存值，因为没有指定新值。如果您发送原始整数值，则假定您已计算完整值，因此在示例 1 中，部分参数 `0xff0000`、`0x3f000000` 和 `0x40000000` 都将设置为 `0`。

:::
示例 1：

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value: 4735
```

示例 2：

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value:
    0xff: 127
    0x7f00: 10
    0x8000: 1
```

示例 3：

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value:
    255: 127
    32512: 10
    32768: 1
```

示例 4：

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value:
    255: 127
    32512: 10
    32768: "Fine"
```

示例 5：

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value:
    "Quick Strip Effect: Hue Color Wheel / Color Temp": 127
    "Quick Strip Effect Intensity": 10
    "Quick Strip Effect Intensity Scale": "Fine"
```

### 动作：刷新值

`zwave_js.refresh_value` 动作刷新实体的值。此动作将在您的 Z-Wave 网络上产生额外流量，应谨慎使用。来自电池供电设备的更新可能需要一些时间才能收到。

| 数据属性       | 必需 | 描述                                                                                                                                      |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`          | 是       | 要刷新值的实体或实体列表。                                                                                                |
| `refresh_all_values` | 否       | 是否应刷新所有值。如果为 `false`，只刷新主值。如果为 `true`，将刷新所有监视的值。 |

### 动作：设置值

`zwave_js.set_value` 动作在 Z-Wave 设备上设置值。它适用于需要修改节点状态且无法使用原生 Home Assistant 实体功能完成的高级用例。请注意，正确使用此动作需要 Z-Wave 的高级知识。该动作提供最少的验证并盲目调用 Z-Wave JS API，因此如果您在使用它时遇到问题，很可能是因为您在某处提供了不正确的值。要设置配置参数，您应该使用 `zwave_js.set_config_parameter` 或 `zwave_js.bulk_set_partial_config_parameters` 动作，而不是此动作。

| 数据属性    | 必需 | 描述                                                                                                                                                                                                                                                             |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`       | 否       | 要设置值的实体（或实体列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                                                                                                                                                 |
| `device_id`       | 否       | 要设置值的设备 ID（或设备 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                                                                                                                                            |
| `area_id`         | 否       | 要设置值的设备/实体的区域 ID（或区域 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                                                                                                                           |
| `command_class`   | 是       | 要设置值的命令类 ID。                                                                                                                                                                                                                 |
| `property`        | 是       | 要设置值的属性 ID。                                                                                                                                                                                                                      |
| `property_key`    | 否       | 要设置值的属性键 ID。                                                                                                                                                                                                                  |
| `endpoint`        | 否       | 要设置值的端点 ID。                                                                                                                                                                                                                      |
| `value`           | 是       | 要设置的新值。                                                                                                                                                                                                                                     |
| `options`         | 否       | 设置值选项映射。有关可以设置哪些选项的更多信息，请参阅 Z-Wave JS 文档。                                                                                                                                                            |
| `wait_for_result` | 否       | 指示是否等待节点响应的布尔值。如果未包含在有效负载中，集成将决定是否等待。如果设置为 `true`，请注意，如果在休眠的电池设备上设置值，动作可能需要一段时间。 |

### 动作：多播设置值

`zwave_js.multicast_set_value` 动作使用多播在多个 Z-Wave 设备上设置值。它适用于需要同时在多个节点上设置相同值的高级用例。请注意，正确使用此动作需要 Z-Wave 的高级知识。该动作提供正确调用 Z-Wave JS API 所必需的最小验证之外的最少验证，因此如果您在使用它时遇到问题，很可能是因为您在某处提供了不正确的值。

| 数据属性  | 必需 | 描述                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`     | 否       | 要通过多播设置值的实体（或实体列表）。如果不是广播命令，必须解析至少两个 `entity_id` 或 `device_id`。                                                                                                                                                                                                                                   |
| `device_id`     | 否       | 要通过多播设置值的设备 ID（或设备 ID 列表）。如果不是广播命令，必须解析至少两个 `entity_id` 或 `device_id`。                                                                                                                                                                                                                              |
| `area_id`       | 否       | 要通过多播设置值的设备/实体的区域 ID（或区域 ID 列表）。如果不是广播命令，必须解析至少两个 `entity_id` 或 `device_id`。                                                                                                                                                                                                             |
| `broadcast`     | 否       | 指示是否要将消息广播到网络上所有节点的布尔值。如果您只配置了一个 Z-Wave 网络，当此设置为 true 时，您不需要提供 `device_id` 或 `entity_id`。当您配置了多个 Z-Wave 网络时，您必须提供至少一个 `device_id` 或 `entity_id`，以便动作知道要针对哪个网络。 |
| `command_class` | 是       | 要设置值的命令类 ID。                                                                                                                                                                                                                                                                                                                                     |
| `property`      | 是       | 要设置值的属性 ID。                                                                                                                                                                                                                                                                                                                                          |
| `property_key`  | 否       | 要设置值的属性键 ID。                                                                                                                                                                                                                                                                                                                                      |
| `endpoint`      | 否       | 要设置值的端点 ID。                                                                                                                                                                                                                                                                                                                                          |
| `value`         | 是       | 要设置的新值。                                                                                                                                                                                                                                                                                                                                                         |
| `options`       | 否       | 设置值选项映射。有关可以设置哪些选项的更多信息，请参阅 Z-Wave JS 文档。                                                                                                                                                                                                                                                                                |

### 动作：调用命令类 API

`zwave_js.invoke_cc_api` 动作直接使用命令类 API。在大多数情况下，`zwave_js.set_value` 动作可以完成您需要的操作，但某些命令类有无法通过该动作访问的 API 命令。请参阅 [Z-Wave JS 命令类文档](https://zwave-js.github.io/node-zwave-js/#/api/CCs/index)了解可用的 API 和参数。调用此动作时请确保知道自己在做什么。

| 数据属性  | 必需 | 描述                                                                                                                                                                                                                                                                                                            |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`     | 否       | 要 ping 的实体（或实体列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。如果指定了 `endpoint`，将使用该端点为所有设备进行 CC API 调用，否则将使用每个实体的主值端点。                                         |
| `device_id`     | 否       | 要 ping 的设备 ID（或设备 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。如果指定了 `endpoint`，将使用该端点为所有设备进行 CC API 调用，否则将使用每个设备的根端点（0）。                                         |
| `area_id`       | 否       | 要 ping 的设备/实体的区域 ID（或区域 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。如果指定了 `endpoint`，将使用该端点为所有设备进行 CC API 调用，否则将使用该区域中每个 `zwave_js` 设备的根端点（0）。 |
| `command_class` | 是       | 要设置值的命令类 ID。                                                                                                                                                                                                                                                                |
| `endpoint`      | 否       | 要对其调用 CC API 的端点。                                                                                                                                                                                                                                                                               |
| `method_name`   | 是       | 从 CC API 调用的方法名称。                                                                                                                                                                                                                                                           |
| `parameters`    | 是       | 传递给 CC API 方法的参数列表。                                                                                                                                                                                                                                                                     |

### 动作：刷新通知

`zwave_js.refresh_notifications` 动作刷新支持通知命令类的设备上给定类型的通知。

| 数据属性       | 必需 | 描述                                                                                                                                            |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`          | 否       | 要刷新通知的实体（或实体列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                       |
| `device_id`          | 否       | 要刷新通知的设备 ID（或设备 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。                  |
| `area_id`            | 否       | 要刷新通知的设备/实体的区域 ID（或区域 ID 列表）。必须至少提供一个 `entity_id`、`device_id` 或 `area_id`。 |
| `notification_type`  | 是       | 要刷新的通知类型。                                                                                                                   |
| `notification_event` | 否       | 要刷新的通知事件。                                                                                                                     |

### 动作：重置电表

`zwave_js.reset_meter` 动作重置支持电表命令类的设备上的电表。

| 数据属性 | 必需 | 描述                                                                                                 |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `entity_id`    | 是       | 要重置的电表的实体（或实体列表）。                                              |
| `meter_type`   | 否       | 如果设备支持，指示要重置的电表类型。并非所有设备都支持此选项。      |
| `value`        | 否       | 如果设备支持，指示要将电表重置为的值。并非所有设备都支持此选项。 |

### 动作：设置门锁配置

`zwave_js.set_lock_configuration` 动作设置门锁的配置。

| 数据属性          | 必需 | 描述                                                                                              |
| ----------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `entity_id`             | 否       | 要设置用户码的门锁实体或实体列表。                                                     |
| `operation_type`        | 是       | 门锁操作类型，`timed` 或 `constant` 之一。                                                       |
| `lock_timeout`          | 否       | 门锁模式超时前的秒数。仅当操作类型为 `timed` 时使用。                     |
| `auto_relock_time`      | 否       | 门锁返回安全状态前的持续时间（秒）。仅当操作类型为 `constant` 时强制执行。 |
| `hold_and_release_time` | 否       | 锁舌保持缩回的持续时间（秒）。                                                           |
| `twist_assist`          | 否       | 启用 Twist Assist。                                                                                     |
| `block_to_block`        | 否       | 启用 block-to-block 功能。                                                                     |

### 动作：设置门锁用户码

`zwave_js.set_lock_usercode` 动作将门锁的用户码设置到代码槽 Y 的位置 X。有效的用户码至少为 4 位数字。

| 数据属性 | 必需 | 描述                                          |
| -------------- | -------- | ---------------------------------------------------- |
| `entity_id`    | 否       | 要设置用户码的门锁实体或实体列表。 |
| `code_slot`    | 是       | 要将用户码设置到的代码槽。              |
| `usercode`     | 是       | 要设置到槽中的代码。                         |

### 动作：清除门锁用户码

`zwave_js.clear_lock_usercode` 动作清除代码槽 X 中门锁的用户码。
有效的代码槽在 1-254 之间。

| 数据属性 | 必需 | 描述                                            |
| -------------- | -------- | ------------------------------------------------------ |
| `entity_id`    | 否       | 要清除用户码的门锁实体或实体列表。 |
| `code_slot`    | 是       | 要从中清除用户码的代码槽。              |

### 动作：获取门锁用户码

`zwave_js.get_lock_usercode` 动作从门锁中检索[用户码](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data)。您可以查询单个代码槽或一次检索所有代码槽。返回每个槽的用户码和使用状态。

| 数据属性 | 必需 | 描述                                                                                                                                   |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`    | 否       | 要从中获取用户码的门锁实体或实体列表。                                                                                        |
| `code_slot`    | 否       | 要检索的代码槽。如果未指定，则返回所有代码槽。                                                                     |

<details>
<summary>示例动作响应</summary>


```yaml
"1":
  usercode: "1234"
  in_use: true
"2":
  usercode: ""
  in_use: false
```


</details>

## 事件

有两种类型的事件被触发，通知事件和值通知事件。您可以使用事件 [Home Assistant 中的开发者工具](https://my.home-assistant.io/redirect/developer_events/) 测试传入的事件，并分别订阅 `zwave_js_notification` 或 `zwave_js_value_notification` 事件。一旦您知道事件数据的样子，您可以使用它来创建自动化。

### 节点事件（通知）

请查看 [Z-Wave JS 通知事件文档](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotnotificationquot)了解通知事件数据的解释。这些事件以 `zwave_js_notification` 事件类型触发。

通知事件数据可用于触发自动化，无论是在自动化 UI 中还是在 YAML 中，使用事件平台。通过在[开发者工具](/home-assistant/docs/tools/dev-tools/#subscribe-to-an-event)中订阅 zwave_js_notification 事件来检查事件的详细信息。

```yaml
# 当键盘解锁门锁时触发。
triggers:
  - trigger: event
    event_type: zwave_js_notification
    event_data:
      node_id: 14
      event_label: "Keypad unlock operation"
```

#### 通知命令类

这些是使用通知命令类的设备触发的通知事件。下面示例中的 `parameters` 属性是可选的，当包含它时，属性中的键将根据事件而变化。

```json
{
    "domain": "zwave_js",
    "node_id": 1,
    "endpoint": 0,
    "home_id": "974823419",
    "device_id": "ad8098fe80980974",
    "command_class": 113,
    "command_class_name": "Notification",
    "type": 6,
    "event": 5,
    "label": "Access Control",
    "event_label": "Keypad lock operation",
    "parameters": {"userId": 1}
}
```

#### 多级开关命令类

这些是使用多级开关命令类的设备触发的通知事件。有开始级别更改和停止级别更改的事件。这些通常用于像 Aeotec Nano Dimmer 这样带有外部开关的设备，以响应长按按钮。

##### 开始级别更改

```json
{
    "domain": "zwave_js",
    "node_id": 1,
    "endpoint": 0,
    "home_id": 974823419,
    "device_id": "2f44f0d4152be3123f7ad40cf3abd095",
    "command_class": 38,
    "command_class_name": "Multilevel Switch",
    "event_type": 4,
    "event_type_label": "label 1",
    "direction": "up"
},
```

##### 停止级别更改

```json
{
    "domain": "zwave_js",
    "node_id": 8,
    "endpoint": 0,
    "home_id": 3803689189,
    "device_id": "2f44f0d4152be3123f7ad40cf3abd095",
    "command_class": 38,
    "command_class_name": "Multilevel Switch",
    "event_type": 5,
    "event_type_label": "label 2",
    "direction": null
},
```

#### 入口控制命令类

这些是使用入口控制命令类的设备触发的通知事件。

```json
{
    "domain": "zwave_js",
    "node_id": 1,
    "endpoint": 0,
    "home_id": "974823419",
    "device_id": "ad8098fe80980974",
    "command_class": 111,
    "command_class_name": "Entry Control",
    "event_type": 6,
    "event_type_label": "label 1",
    "data_type": 5,
    "data_type_label": "label 2",
    "event_data": "555"
}
```

### 场景事件（值通知）

值通知用于无状态值，如 `中央场景` 和 `场景激活`。这些事件以 `zwave_js_value_notification` 事件类型触发。

值通知示例：

```json
{
    "domain": "zwave_js",
    "node_id": 1,
    "home_id": "974823419",
    "endpoint": 0,
    "device_id": "ad8098fe80980974",
    "command_class": 91,
    "command_class_name": "Central Scene",
    "label": "Event value",
    "property": "scene",
    "property_name": "scene",
    "property_key": "001",
    "property_key_name": "001",
    "value": "KeyPressed",
    "value_raw": 0
}
```

### 值更新事件

由于某些设备不遵循 Z-Wave 规范，存在设备发送值更新但在 Home Assistant 中无法检测到状态更改的情况。为了解决此差距，可以监听 `zwave_js_value_updated` 事件以捕获受影响实体收到的任何值更新。此事件**按设备和实体域启用**，这些实体将设置 `assumed_state` 为 `true`。此更改将影响这些实体的 UI 外观；如果您希望 UI 与其他未设置 `assumed_state` 为 `true` 的相同类型实体匹配，可以通过[实体自定义](/home-assistant/docs/configuration/customizing-devices/#assumed_state)覆盖设置。

以下设备当前支持此事件：

| 制造商            | 型号                            | 实体域 |
| --------------- | -------------------------------- | ------------- |
| Vision Security | ZL7432 In Wall Dual Relay Switch | `switch`      |

值更新示例：

```json
{
    "node_id": 4,
    "home_id": "974823419",
    "device_id": "ad8098fe80980974",
    "entity_id": "switch.in_wall_dual_relay_switch",
    "command_class": 37,
    "command_class_name": "Switch Binary",
    "endpoint": 0,
    "property": "currentValue",
    "property_name": "currentValue",
    "property_key": null,
    "property_key_name": null,
    "value": 0,
    "value_raw": 0
}
```

此事件可用于在需要检索新状态时触发值刷新。以下是一个自动化示例：

```yaml
triggers:
  - trigger: event
    event_type: zwave_js_value_updated
    event_data:
      entity_id: switch.in_wall_dual_relay_switch
actions:
  - action: zwave_js.refresh_value
    data:
      entity_id:
        - switch.in_wall_dual_relay_switch_2
        - switch.in_wall_dual_relay_switch_3
```

## 自动化

`Z-Wave` 集成提供自己的触发平台，可用于自动化。

### `zwave_js.value_updated`

此触发平台可用于在任何 Z-Wave JS 值更新时触发自动化，包括 Home Assistant 中不通过实体支持的 Z-Wave JS 值。虽然它们无法从自动化 UI 编写，但可以在 `configuration.yaml` 中直接用 YAML 编写。

#### 示例自动化触发配置

```yaml
# 当 `latchStatus` 值在三个设备上从 `closed` 更改为 `opened` 时触发（设备将从实体 ID 派生）。
triggers:
  - trigger: zwave_js.value_updated
    # 必须至少提供一个 `device_id` 或 `entity_id`
    device_id: 45d7d3230dbb7441473ec883dab294d4  # 车库门锁设备 ID
    entity_id:
      - lock.front_lock
      - lock.back_door
    # `property` 和 `command_class` 是必需的
    command_class: 98 # Door Lock CC
    property: "latchStatus"
    # `property_key` 和 `endpoint` 是可选的
    property_key: null
    endpoint: 0
    # `from` 和 `to` 都将接受值列表，如果值更新与列出的任何值匹配，则触发
    from:
      - "closed"
      - "jammed"
    to: "opened"
```

#### 可用的触发数据

除了[标准自动化触发数据](/home-assistant/docs/automation/templating/#all)外，`zwave_js.value_updated` 触发平台还有额外的触发数据可供使用。

| 模板变量            | 数据                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `trigger.device_id`          | 设备注册表中设备的设备 ID。                                           |
| `trigger.node_id`            | Z-Wave 节点 ID。                                                                            |
| `trigger.command_class`      | 命令类 ID。                                                                          |
| `trigger.command_class_name` | 命令类名称。                                                                        |
| `trigger.property`           | Z-Wave 值的属性。                                                                   |
| `trigger.property_name`      | Z-Wave 值的属性名称。                                                              |
| `trigger.property_key`       | Z-Wave 值的属性键。                                                               |
| `trigger.property_key_name`  | Z-Wave 值的属性键名称。                                                          |
| `trigger.endpoint`           | Z-Wave 值的端点。                                                                   |
| `trigger.previous_value`     | 此 Z-Wave 值的上一个值（尽可能转换为状态名称）。       |
| `trigger.previous_value_raw` | 此 Z-Wave 值的原始上一个值（当状态被命名时为状态的键）。 |
| `trigger.current_value`      | 此 Z-Wave 值的当前值（尽可能转换为状态名称）。        |
| `trigger.current_value_raw`  | 此 Z-Wave 值的原始当前值（当状态被命名时为状态的键）。  |

### `zwave_js.event`

此触发平台可用于在任何 Z-Wave JS 控制器、驱动程序或节点事件上触发自动化，包括 Home Assistant 可能不会自动处理的事件。请参阅链接的 [Z-Wave JS 文档](https://zwave-js.github.io/node-zwave-js/#/)了解更多有关可用事件及其发送的数据。

根据所有已知事件类型进行了严格验证，因此如果您遇到不支持的事件类型，请在 `home-assistant/core` 存储库中提交 GitHub 问题。

#### 示例自动化触发配置

```yaml
# 当 `interview failed` 事件在三个设备上触发时触发（设备将从设备和实体 ID 派生）。
triggers:
  - trigger: zwave_js.event
    # 对于 `node` 事件，必须至少提供一个 `device_id` 或 `entity_id`。对于任何其他事件，需要提供 `config_entry_id`。
    device_id: 45d7d3230dbb7441473ec883dab294d4  # 车库门锁设备 ID
    entity_id:
      - lock.front_lock
      - lock.back_door
    config_entry_id:
    # `event_source` 和 `event` 是必需的
    event_source: node   # 选项有 node、controller 和 driver
    event: "interview failed"  # 事件名称可从 Z-Wave JS 文档中检索（见上面的链接）
    # `event_data` 和 `partial_dict_match` 是可选的。如果未包含 `event_data`，则给定上下文的给定类型的所有事件都将触发自动化。当触发 `interview failed` 事件时，所有参数都位于 `event_data` 字典内 `args` 键下的字典中。默认行为是要求下面 event_data 字典的完全匹配和传递给事件的字典。通过将 `partial_dict_match` 设置为 true，Home Assistant 将检查 isFinal 参数是否为 true 并忽略字典中的任何其他值。如果此设置为 false，此触发器将永远不会触发，因为字典总是包含比 `isFinal` 更多的键，因此比较检查永远不会评估为 true。
    event_data:
      args:
        isFinal: true
    partial_dict_match: true  # 默认为 false
```

#### 可用的触发数据

除了[标准自动化触发数据](/home-assistant/docs/automation/templating/#all)外，`zwave_js.event` 触发平台还有额外的触发数据可供使用。

| 模板变量      | 数据                                                                             |
| ---------------------- | -------------------------------------------------------------------------------- |
| `trigger.device_id`    | 设备注册表中设备的设备 ID（仅节点事件包含）。 |
| `trigger.node_id`      | Z-Wave 节点 ID（仅节点事件包含）。                                  |
| `trigger.event_source` | 事件来源（node、controller 或 driver）。                                   |
| `trigger.event`        | 事件名称。                                                                   |
| `trigger.event_data`   | 事件中包含的任何数据。                                                  |

## 高级安装说明

如果您使用的是 Home Assistant Container 或不想使用内置的 Z-Wave JS 应用程序，您需要自己运行 Z-Wave JS Server，Z-Wave 集成将连接到它。

### 运行 [Z-Wave JS Server](https://github.com/zwave-js/zwave-js-server)

此应用程序提供 Z-Wave 适配器和 Home Assistant 之间的连接。Home Assistant Z-Wave 集成通过 WebSocket 连接连接到此服务器。您需要运行此 Z-Wave JS 服务器才能使用集成。

有多种运行此服务器的方式：
下面的图表说明了选项 1 和 3，它们仅适用于 Home Assistant OS。

![安装选项 1 和 3 概览](/home-assistant/images/integrations/z-wave/z-wave-server-install-options-1-2.png)

**选项 1：官方 Z-Wave JS 应用程序，如上所述**

_此选项仅适用于 Home Assistant Operating System（推荐的安装类型）安装。_

此应用程序（以前称为插件）只能通过 Home Assistant 中内置的 Z-Wave 控制面板进行配置。如果您按照标准[安装程序](#setting-up-a-z-wave-js-server)操作，这就是您运行 Z-Wave JS 服务器的方式。

**选项 2：Z-Wave JS UI Docker 容器**

如果您运行的是 Home Assistant Container，这是推荐的方法。请参阅 [Z-Wave JS UI 文档](https://zwave-js.github.io/zwave-js-ui//#/getting-started/quick-start)获取说明。

此方法提供与 Z-Wave JS UI 应用程序相同的服务器应用程序和 UI。安装 Docker 映像后，确保在 **设置** 页面的 **Home Assistant** 部分启用 **WS Server**。

**选项 3：自己运行 Z-Wave JS 服务器**

这被认为是更复杂的用例。在这种情况下，您直接运行 Z-Wave JS Server 或 Z-Wave JS UI NodeJS 应用程序。安装和维护这不属于本文档的范围。请参阅 [Z-Wave JS server](https://github.com/zwave-js/zwave-js-server) 或 [Z-Wave JS UI](https://github.com/zwave-js/zwave-js-ui/) GitHub 存储库获取信息。

:::note
[支持的 Z-Wave 适配器](/home-assistant/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules)。Z-Wave 适配器应连接到运行 Z-Wave JS 服务器的同一主机。在 Z-Wave JS 服务器的配置中，您需要提供此适配器的路径。建议使用适配器路径的 `/dev/serial-by-id/yourdevice` 版本，以确保路径在重新启动后不会更改。最常见的已知路径是 `/dev/serial/by-id/usb-0658_0200-if00`。

:::
:::note
**网络密钥** 用于安全连接到兼容设备。网络密钥由 32 个十六进制字符组成，例如 `2232666D100F795E5BB17F0A1BB7A146`（不要使用此密钥，选择一个随机的）。没有网络安全密钥，启用安全功能的设备无法安全添加，将无法正常工作。您必须在 Z-Wave JS Server 的配置部分提供这些网络密钥。

对于新安装，Z-Wave JS 应用程序将为您自动生成唯一的默认密钥。

确保将这些密钥的备份保存在安全的地方。您需要输入相同的密钥才能访问安全配对的设备。

:::
### 在 Home Assistant 中安装和配置 Z-Wave 集成

一旦 Z-Wave JS 服务器启动并运行，您需要在 Home Assistant 中安装和配置集成（如上所述）。

如果您运行带有 supervisor 的完整 Home Assistant，您将看到一个对话框，询问您是否要使用 Z-Wave JS Supervisor 应用程序。如果您以除官方 Z-Wave JS 应用程序之外的任何方式运行 Z-Wave JS 服务器，包括使用 Z-Wave JS UI 应用程序，您**必须**取消选中此框。

如果您没有运行 supervisor 或已取消选中上述框，您将被要求输入 WebSocket URL（默认为 ws://localhost:3000）。在这里填写正确的（Docker）IP/主机名非常重要。例如，对于 Z-Wave JS UI 应用程序，这是 `ws://a0d7b954-zwavejs2mqtt:3000`。

## 常见问题：支持的设备和命令类

有关支持的设备列表，请参阅 [Z-Wave JS 设备数据库](https://devices.zwave-js.io/)。

虽然支持最常见的设备，但某些命令类尚未在 Z-Wave JS 中完全实现。您可以[在此处](https://github.com/zwave-js/node-zwave-js/issues/6)跟踪状态。

您还可以查看本页末尾的 Z-Wave [Home Assistant 查询时响应的命令类](#z-wave-command-classes-home-assistant-responds-to-when-queried)列表。

您还可以[在此处](https://github.com/home-assistant-libs/zwave-js-server-python/issues/56)跟踪 Z-Wave 集成的路线图。

## 常见问题：安装和配置

### 应该购买哪种 Z-Wave 适配器？

Z-Wave 支持所有已知的 500、700 和 800 系列 Z-Wave 适配器。如果您刚开始使用，我们建议您购买 800 系列适配器（固件更新至 >=7.23.2）。

有关更多信息，请参阅[支持的 Z-Wave 适配器](/home-assistant/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules)

### 为什么我（没）被自动提示安装 Z-Wave？

某些 Z-Wave 适配器可以自动发现，这可以简化 Z-Wave 设置过程。以下设备已通过发现测试，提供快速设置体验；然而，这些**不是** Z-Wave 支持的所有设备：

| 设备               | 标识符 | 供应商                                                                             |
| -------------------- | ---------- | ---------------------------------------------------------------------------------- |
| Aeotec Z-Stick Gen5+ | 0658:0200  | <https://aeotec.com/products/aeotec-z-stick-gen5/>                                 |
| Nortek HUSBZB-1      | 10C4:8A2A  | <https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/> |
| Zooz ZST10           | 10C4:EA60  | <https://www.getzooz.com/zooz-zst10-s2-stick/>                                     |
| Z-WaveMe UZB         | 0658:0200  | <https://z-wave.me/products/uzb/>                                                  |

其他设备可能是可发现的，但上面只列出了已确认可发现的设备。

### Zwavejs2Mqtt 或 Z-Wave JS to MQTT 应用程序发生了什么？

Zwavejs2Mqtt 于 2022 年 9 月更名为 Z-Wave JS UI。它们是同义词，功能上没有区别。

### Z-Wave JS UI 应用程序发生了什么？

**Z-Wave JS UI** 应用程序正在逐步淘汰，因为其功能丰富的 UI 现在已包含在 **Z-Wave JS** 应用程序中。**Z-Wave JS UI** 应用程序将继续支持一段时间，但鼓励用户切换到 **Z-Wave JS** 应用程序。

### 我应该使用安全添加吗？

这取决于。Z-Wave 加密有两代，Security S0 和 Security S2。两者都提供加密并允许检测数据包损坏。

Security S0 会对您的网格产生大量额外流量，仅推荐用于不支持 Security S2 但需要加密才能工作的旧设备，例如门锁。

Security S2 不会产生额外的网络流量并提供额外的好处。例如，使用 S2 的终端设备需要集线器报告它是否已收到并理解其报告。

默认情况下，如果支持，Z-Wave 首选 Security S2。Security S0 仅在绝对必要时使用。

### 在哪里可以查看 Z-Wave JS 应用程序中的安全密钥？

Z-Wave 适配器初始设置后，您可以在 Z-Wave JS 应用程序中查看安全密钥。转到 [**设置** > **应用程序** > **Z-Wave JS**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_zwave_js) 并打开 **配置** 选项卡。您现在可以看到三个 S2 密钥和 S0 密钥。网络安全密钥是旧版配置设置，与 S0 密钥相同。

## 常见问题：故障排除主题

### 我遇到了问题，首先要做什么？

_许多_ 报告的问题是由系统 USB 端口的 RF 干扰引起的。这可能表现为多种方式，包括无法添加的设备、无法安全添加的设备、传感器值错误（数据包损坏）、设备控制延迟或无法控制设备。

**鼓励所有用户使用 USB 延长线来防止此类干扰。** 请在提出问题或在 Discord 上请求支持之前尝试使用此类延长线。这几乎总是我们会要求您采取的第一个故障排除步骤。

确保使用延长线后，重建网络路由。

这两个步骤的组合可以纠正大量报告的困难。

### 我的 Z-Wave 适配器在设置期间未被自动识别

如果您的 Z-Wave 适配器没有自动显示在 **已发现** 部分，请尝试手动添加：

1. 检查硬件：
   - 确保适配器已通电。
   - 确保您使用的电缆支持数据传输，而不仅仅是电源。
2. 转到 **[设置 > 设备与服务](https://my.home-assistant.io/redirect/integrations/)**。
3. 在右下角，选择
  **[**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=zwave_js)** 按钮并选择 **Z-Wave**。
4. 按照屏幕上的说明完成设置。
5. 如果仍未发现，请[检查干扰](#im-having-a-problem-what-to-do-first)。

### 我有一个 Aeotec Gen5 适配器，它在 Raspberry Pi 4 上未被检测到？

第一代 Gen5 适配器在插入 Pi 4 和可能的其他系统时有一个已知错误。Aeotec 发布了 Gen5+ 棒来修正此错误。Gen5 用户可以将适配器插入 USB 2.0 集线器以解决此问题。

### 我在 Home Assistant 中没有看到为我的设备创建任何实体

实体只有在节点准备好（查询完成）后才会创建。另外，请注意某些设备（如按钮遥控器）不创建任何实体，但只会在按下按钮时提供事件。请参阅事件部分了解如何在自动化中处理这些事件。

如果您确定您的设备应该有实体但看不到它们（即使在重启 Home Assistant Core 后），请在 GitHub 问题跟踪器上创建一个关于您问题的问题。

### 如果我手动控制设备，设备状态不会在 HA 中自动更新

您的设备可能不会向适配器发送自动状态更新。虽然最好的建议是更新到最近的 Z-Wave Plus 设备，但有一种使用主动轮询（请求状态）的变通方法。

Z-Wave 不会定期自动轮询设备。轮询可能很快导致网络拥塞，应非常谨慎地使用，仅在必要时使用。

- 我们提供 `zwave_js.refresh_value` 动作来手动轮询值，例如从只在同一房间有移动时才轮询设备的自动化中。

- Z-Wave JS 允许您在每个值的基础上配置定时轮询，您可以使用它来保持某些值更新。它还允许您从自动化中按需轮询单个值，如果可能，这应该优于盲目地一直轮询。

:::warning
轮询只能作为最后手段使用。您必须谨慎使用，并接受对网络的负面影响。Z-Wave 是一个非常低速的网络，轮询请求很容易淹没您的网络并减慢您的命令。

:::
### 我的设备被识别为未知制造商和/或某些功能在 Z-Wave 集成中不起作用

当您的设备尚未完全查询时，此信息尚不存在。因此，请确保您的设备至少被查询过一次。

如果查询已完成，则该设备尚无 Z-Wave JS 的设备文件。与其他 Z-Wave 驱动程序不同，即使没有此类文件，您的设备也可能按预期工作。如果您的设备未完全支持，请考虑[贡献设备配置文件](https://zwave-js.github.io/node-zwave-js/#/config-files/contributing-files)。

### 如何获取当前网络状态的转储？

当试图确定某些事情为何未按预期工作，或在报告集成问题时，了解 Z-Wave JS 视为 Z-Wave 网络当前状态的内容很有帮助。要获取当前网络状态的转储，请按照以下步骤操作：

1. 转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 选择 **Z-Wave** 集成。然后，选择三点 `[mdi:dots-vertical]` 菜单。
3. 从下拉菜单中，选择 **下载诊断**。

### 如何解决干扰问题？

许多用户报告当适配器直接连接到机器（近距离）时会出现干扰问题。如果您遇到问题，请尝试使用短的 USB 2.0 A（公对母）延长线。

### 如何访问 Z-Wave 日志？

#### 简单方法

##### 启用 Z-Wave JS 日志记录

1. 转到 Z-Wave 集成面板：[![Open **Settings** > **Devices & services** in your Home Assistant instance.](https://my.home-assistant.io/badges/integration.svg)](https://my.home-assistant.io/redirect/integration/?domain=zwave_js)
2. 在右上角，选择三点 `[mdi:dots-vertical]` 菜单并选择 **启用调试日志记录**。
   - **结果**：集成、库和可选驱动程序（如果驱动程序日志级别尚未设置为 `verbose`、`debug` 或 `silly`）的日志级别将设置为 `debug`，所有 Z-Wave JS 日志将添加到 Home Assistant 日志中。
3. 如果您想更改日志级别，在 Z-Wave 集成面板上：[![Open **Settings** > **Devices & services** in your Home Assistant instance.](https://my.home-assistant.io/badges/integration.svg)](https://my.home-assistant.io/redirect/integration/?domain=zwave_js)，选择齿轮 `[mdi:cog-outline]`。
   - 选择 **日志** 选项卡，然后选择日志级别。

##### 禁用 Z-Wave JS 日志记录

1. 转到 Z-Wave 集成面板：[![Open **Settings** > **Devices & services** in your Home Assistant instance.](https://my.home-assistant.io/badges/integration.svg)](https://my.home-assistant.io/redirect/integration/?domain=zwave_js)
2. 在右上角，选择三点 `[mdi:dots-vertical]` 菜单并选择 **禁用调试日志记录**。
   - **结果**：集成、库和驱动程序的日志级别将重置为其先前的值，Home Assistant 前端将自动向您发送在此期间生成的 Z-Wave 日志以供下载。

#### 高级方法

##### 手动启用 Z-Wave JS 日志记录，或通过自动化

将 `zwave_js_server` 的日志级别设置为 `debug`。这可以在 `configuration.yaml` 的 `logger` 部分完成，或使用 `logger.set_level` 动作。当集成检测到日志级别已设置为 `debug` 时，如果级别尚未是 `verbose`、`debug` 或 `silly`，它也会将 Z-Wave JS 日志设置为 `debug`，并将这些日志包含在 Home Assistant 日志中。Z-Wave JS 日志可以在日志记录器名称 `zwave_js_server.server` 下找到。

##### 手动禁用 Z-Wave JS 日志记录，或通过自动化

将 `zwave_js_server` 的日志级别设置为高于 `debug` 的级别。这可以在 `configuration.yaml` 的 `logger` 部分完成，或使用 `logger.set_level` 动作。Z-Wave JS 日志将不再包含在 Home Assistant 日志中，如果 Z-Wave JS 的日志级别被集成更改，它将自动恢复到其原始级别。

## 不支持的功能

本节列出 Z-Wave 中可用但当前在 Home Assistant 中不支持的功能。

### 将适配器设置为学习模式以接收网络信息

在 Home Assistant 中，当前无法将 Z-Wave 控制器设置为学习模式以从另一个控制器接收网络信息。

### 使用[经典添加](#classic-inclusion-versus-smartstart)在现有网络中添加/排除适配器

管理空网络的 Z-Wave 控制器也可以加入不同的网络并在那里充当辅助控制器。但是，在 Home Assistant 中，这是不可能的。Home Assistant 不允许 Z-Wave 控制器加入另一个网络，因为 Home Assistant 充当中央集线器。

## Z-Wave 关联组

在 Home Assistant 中，实现了单个[关联组](#association-group)：

- **组 1**：这是一个只包含一个设备的关联组。它在[恢复出厂设置](#resetting-a-z-wave-adapter)后使用，用于发送 **设备本地重置通知**。

此关联组在 Home Assistant [重置 Z-Wave 适配器](#resetting-a-z-wave-adapter)时使用。

在正常情况下，不需要将设备添加到此组。

## 通过 Z-Wave 识别

其他 Z-Wave 设备可以通过发送以下 `Indicator Set` Z-Wave 命令指示 Home Assistant 实例识别自己（所有字节均为十六进制）：

```text
87010003500308500403500506
            ~~    ~~    ~~
```

下划线标记为 `~` 的字节也可以有任何其他值。

收到此命令后，Home Assistant 将在其侧边栏中显示通知，提及哪个节点发送了该命令。

## Z-Wave Home Assistant 查询时响应的命令类

下表列出了命令类以及实现的版本和所需的安全类。这些是 Home Assistant 在被其他设备查询时将响应的命令类。

| 命令类                 | 版本 | 安全类  |
| ----------------------------- | ------- | --------------- |
| Association                   | 4       | 最高授予 |
| Association Group Information | 3       | 最高授予 |
| CRC-16 Encapsulation          | 1       | 无            |
| Device Reset Locally          | 1       | 最高授予 |
| Firmware Update Meta Data     | 8       | 最高授予 |
| Inclusion Controller          | 1       | 无            |
| Indicator                     | 4       | 最高授予 |
| Manufacturer Specific         | 2       | 最高授予 |
| Multi Channel Association     | 5       | 最高授予 |
| Multi Command                 | 1       | 无            |
| Power Level                   | 1       | 最高授予 |
| Security                      | 1       | 无            |
| Security 2                    | 1       | 无            |
| Supervision                   | 2       | 无            |
| Transport Service             | 2       | 无            |
| Version                       | 3       | 最高授予 |
| Z-Wave Plus Info              | 2       | 无            |

:::note
Home Assistant 和 Z-Wave JS 永远不会为监督命令类的有效和支持命令返回"工作"或"失败"状态。

:::
## Z-Wave 术语

本节解释您可能在 Z-Wave 产品文档中找到的一些 Z-Wave 术语和概念。

### 关联组

Z-Wave 术语中的_关联_是指两个或多个 Z-Wave 产品直接通信。这使设备能够相互通信，而无需通过集线器通信，或向中央集线器发送未经请求的报告。

Z-Wave 术语中的_关联组_是一组设备，另一个设备将在某些情况下向它们发送命令。关联组及其功能特定于发送命令的设备。有关详细信息，请参阅设备手册。

### 经典添加与 SmartStart

Home Assistant 支持_经典添加_和 _SmartStart_。_经典添加_意味着您将集线器和要添加的设备设置为相应的模式。替代方案是 _SmartStart_，其中集线器不断监听来自想要加入网络的设备的添加请求。

### SmartStart

启用 SmartStart 的产品可以通过扫描产品上的 Z-Wave 二维码添加到 Z-Wave 网络中，适配器需支持 SmartStart 添加。
无需进一步操作，SmartStart 产品将在开机后 10 分钟内自动添加到网络范围内。并非所有设备都支持 SmartStart。某些设备需要_经典添加_。有关向 Home Assistant 添加设备的文档，请参阅[向 Z-Wave 网络添加新设备](#adding-a-new-device-to-the-z-wave-network)。

### 术语映射表

本文档中使用 Home Assistant 术语。对于某些概念，术语与 Z-Wave 文档中使用的术语不对应。下表提供了其中一些术语的对应关系。

| Z-Wave 功能 | Home Assistant | 定义 |
| -------------------- | -------------- | ---------- |
| barrier operator | cover | |
| controller | adapter，指提供 Z-Wave 功能的硬件设备。术语 controller 仍在指代网络角色（如主控制器、辅助控制器）时使用  | |
| exclusion | remove | 从 Z-Wave 网络中移除节点的过程 |
| [inclusion](#classic-inclusion-versus-smartstart) | add | 向 Z-Wave 网络添加节点的过程 |
| multilevel switch | 由不同的实体类型表示：light、fan 等。 | |
| replication | copy（Home Assistant 中不支持） | 将网络信息从一个适配器复制到另一个的过程。Home Assistant 中不支持。 |
| window covering | cover | |

## 从 Home Assistant 移除 Z-Wave JS

这将从 Home Assistant 中移除所有配对的 Z-Wave 设备及其实体、Z-Wave JS 应用程序和 Z-Wave 集成。

### 从 Home Assistant 移除 Z-Wave JS

1. [从 Z-Wave 网络中移除设备](/home-assistant/integrations/zwave_js/#removing-a-device-from-the-z-wave-network)。
   - 对加入您网络的每个设备执行此操作，使其不再与适配器配对。
   - 您不能将设备添加到新适配器，而它仍与旧适配器配对。
   - 或者，您可以将每个设备恢复出厂设置。请参阅设备手册了解如何操作。
     - 这通常涉及在家庭中找到设备并按下按钮。
2. 移除 Z-Wave 集成。
   - 转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择集成卡片。
   - 在集成条目旁边，选择三点 `[mdi:dots-vertical]` 菜单。
   - 选择 **删除**。
3. 如果未自动删除，请移除 Z-Wave JS 应用程序。
   - 转到 [**设置** > **应用程序** > **Z-Wave JS**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_zwave_js)。
   - 选择 **卸载**。
   - 决定是否也删除与应用程序相关的数据或保留它。
4. 完成。Z-Wave JS 现在已从您的 Home Assistant 服务器中完全移除。
   - 您现在可以在新服务器上使用您的 Z-Wave 设备和适配器。