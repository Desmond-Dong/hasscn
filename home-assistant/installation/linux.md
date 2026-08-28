# Linux

## 安装 Home Assistant Operating System

如果您想轻松开始使用 Home Assistant，或者您几乎没有 Linux 经验，请按照本指南操作。

## 推荐硬件

您需要几样东西来开始安装 Home Assistant。

首先，我们推荐 ODROID-N2+，这是为我们的 [Home Assistant Blue](/home-assistant/blue/) 提供动力的主板，或 ODROID-M1。

如果不可用，我们也推荐 [ODROID-C4](https://ameridroid.com/products/odroid-c4)。

:::important

<b>前提条件</b>

本指南假设您有一台专用 PC 来专门运行 **Home Assistant Operating System**。

* 这通常是基于 Intel 或 AMD 的系统。
* 系统必须支持 64 位并能够使用 UEFI 启动。
  * 过去 10 年生产的大多数系统都支持 UEFI 启动模式。

<b>概述</b>

1. 首先，您需要将 PC 配置为使用 UEFI 启动模式。
2. 然后，将 **Home Assistant Operating System** 磁盘镜像写入您的启动介质。

:::

## 配置 x86-64 硬件的 BIOS

要启动 Home Assistant OS，BIOS 需要启用 UEFI 启动模式并禁用安全启动。以下截图来自第 7 代 Intel NUC 系统。BIOS 菜单在您的系统上可能看起来不同，但选项应该仍然存在且名称相似。

1. 要进入 BIOS，启动您的 x86-64 硬件并反复按 `F2` 键（在某些系统上可能是 `Del`、`F1` 或 `F10`）。
   ![使用 F2、Del、F1 或 F10 键进入 BIOS](/home-assistant/images/installation/intel-nuc-enter-bios.jpg)

2. 确保启用了 UEFI 启动模式。
   ![启用 UEFI 启动模式](/home-assistant/images/installation/intel-nuc-uefi-boot.jpg)

3. 禁用安全启动。
   ![禁用安全启动模式](/home-assistant/images/installation/intel-nuc-disable-secure-boot.jpg)

4. 保存更改并退出。

BIOS 配置现已完成。

## 将 HAOS 写入您的 x86-64 硬件

接下来，您需要将 Home Assistant Operating System 镜像写入 *启动介质*，这是您的 x86-64 硬件运行 Home Assistant 时将从中启动的介质。

:::note
HAOS 没有自动写入镜像的集成安装程序。您将使用 Ubuntu 的 <b>磁盘</b> 实用程序或 Balena Etcher 手动写入。
:::

通常，x86-64 启动介质使用内部介质，如 S-ATA 硬盘、S-ATA SSD、M.2 SSD 或不可移动的 eMMC。或者，可以使用外部介质，如 USB SSD，但不推荐。

要将 HAOS 镜像写入 x86-64 硬件上的启动介质，有两种不同的方法：

**方法 1（推荐）**：从 USB 闪存驱动器启动 Ubuntu，并从那里安装 **Home Assistant Operating System**。它也适用于带有内部硬盘的笔记本电脑和 PC。

**方法 2**：使用此方法，您可以直接从常规计算机将 Home Assistant Operating 磁盘镜像写入启动介质。步骤稍微复杂一些。如果您有不可移动的内部介质（例如，因为您使用的是笔记本电脑）或没有必要的适配器（例如 USB 转 S-ATA 适配器），请改用方法 1。

### 方法 1：通过从 USB 闪存驱动器启动 Ubuntu 安装 HAOS

#### 所需材料

* 计算机
* 要安装 **Home Assistant Operating System** (HAOS) 的目标 x86-64 硬件
* USB 闪存驱动器（USB 拇指驱动器即可，应至少 8 GB）
* 互联网连接

#### 通过 Ubuntu 从 USB 闪存驱动器安装 HAOS

1. **注意**：此过程将把 **Home Assistant Operating System** 写入您的设备。
   * 这意味着您将丢失所有数据以及之前安装的操作系统。
   * 在执行此过程之前备份您的数据。
2. 在 USB 闪存驱动器上创建 *实时操作系统*：
   * 按照 [Ubuntu Desktop 说明](https://documentation.ubuntu.com/desktop/en/latest/tutorial/try-ubuntu-desktop/) 将 Ubuntu Desktop iso 文件写入 USB 设备。
3. 将 USB 闪存驱动器插入要运行 Home Assistant 的系统。
   * 启动实时操作系统。
   * 您可能需要调整启动顺序或使用 F10（可能是不同的 F 键，取决于 BIOS）选择 USB 闪存驱动器作为启动设备。
4. 当提示时，确保选择 **试用 Ubuntu**。这将在 USB 闪存设备上运行 Ubuntu。
   * 系统然后启动 Ubuntu。
   * 将您的系统连接到网络并确保它有互联网访问。
5. 在 Ubuntu 中，打开浏览器并打开当前文档页面，以便您可以按照步骤操作。
   * 从那里，[下载镜像][generic-x86-64]。
6. 在 Ubuntu 中，在左下角选择 **显示应用程序**。
7. 在应用程序中，搜索并打开 **磁盘** 并开始恢复 HAOS 镜像：
   1. 在 **磁盘** 中，在左侧选择要安装 HAOS 的内部磁盘设备。
   2. 在屏幕顶部，选择三点菜单并选择 **恢复磁盘镜像...**。
      ![恢复磁盘镜像：选择三点菜单](/home-assistant/images/installation/ubuntu_restore_disk_image.png)
   3. 选择您刚刚下载的镜像。
      ![恢复磁盘镜像：选择镜像](/home-assistant/images/installation/select_haos.png)
   4. 选择 **开始恢复...**。
      ![恢复磁盘镜像：开始恢复](/home-assistant/images/installation/start_restoring.png)
   5. 通过选择 **恢复** 确认。
      ![恢复磁盘镜像：选择恢复](/home-assistant/images/installation/restore.png)
   6. 在分区概述中，您现在应该看到恢复操作正在进行中。
      * Home Assistant Operating System 现在正在安装到您的系统上。
        ![恢复磁盘镜像：恢复中...](/home-assistant/images/installation/haos_restoring.png)
8. 一旦 Home Assistant Operating System 安装完成，关闭系统。
   * 一旦 Ubuntu 关闭，移除 USB 闪存驱动器（Ubuntu 会通知您何时可以这样做）。
   * 您的 Home Assistant 服务器现已设置完成，您可以开始使用它。
   * 要使用它，请按照 [启动您的通用 x86-64](/home-assistant/installation/generic-x86-64.md#start-up-your-generic-x86-64) 中描述的步骤操作。

### 方法 2：直接从启动介质安装 HAOS

:::note
仅当方法 1 不适合您时才使用此方法。
:::

#### 所需材料

* 计算机
* 要安装 **Home Assistant Operating System** (HAOS) 的目标 x86-64 硬件
* 启动介质
* 互联网连接

#### 将镜像写入启动介质

1. **注意**：此过程将把 **Home Assistant Operating System** 写入您的设备。
   * 这意味着您将丢失所有数据以及之前安装的操作系统。
   * 在继续下一步之前备份您的数据。
2. 将 Home Assistant 启动介质连接到您的计算机。
3. 下载并启动 <a href="https://www.balena.io/etcher" target="_blank">Balena Etcher</a>。在 Windows 上您可能需要以管理员权限运行它。
4. 将镜像下载到您的计算机。
5. 在浏览器中粘贴 URL 开始下载。
6. 解压缩您刚刚下载的文件。
7. 选择 **从文件烧录** 并选择您刚刚解压缩的镜像。
   * 不要使用 **从 URL 烧录**。它在某些系统上不起作用。
     ![Etcher 软件截图，显示选择了从 URL 烧录。](/home-assistant/images/installation/etcher1_file.png)
8. **选择目标**。
   ![Etcher 软件截图，显示选择目标按钮高亮显示。](/home-assistant/images/installation/etcher3.png)
9. 选择要用于安装的启动介质。
   ![Etcher 软件截图，显示可用的目标。](/home-assistant/images/installation/etcher4.png)
10. 选择 **烧录！** 开始写入镜像。
    * 如果操作失败，解压缩 .xz 文件并重试。
      ![Etcher 软件截图，显示烧录按钮高亮显示。](/home-assistant/images/installation/etcher5.png)
    * 当 Balena Etcher 完成写入镜像时，您将看到确认。
      ![Etcher 软件截图，显示安装已完成。](/home-assistant/images/installation/etcher6.png)

### 启动您的通用 x86-64

* 如果您使用方法 1 进行安装，确保 USB 闪存驱动器已从系统中移除。
* 如果您使用方法 2 进行安装，将启动介质安装到您的 x86-64 硬件中。

1. 插入连接到网络和互联网的以太网线。
   * 注意：需要互联网，因为新安装的 Home Assistant OS 尚未包含所有 Home Assistant 组件。它在首次启动时下载最新版本的 Home Assistant Core。
2. 打开系统电源。如果您有连接到系统的屏幕，大约一分钟后 Home Assistant 欢迎横幅将出现在控制台中。

:::note

如果机器抱怨找不到可启动介质，您可能需要在 BIOS 中指定 EFI 条目。
这可以通过使用实时操作系统（例如 Ubuntu）并运行以下命令来完成（将 `<drivename>` 替换为 Linux 分配的适当驱动器名称，通常是 `sda` 或 NVMe SSD 上的 `nvme0n1`）：

```text
efibootmgr --create --disk /dev/<drivename> --part 1 --label "HAOS" \
   --loader '\EFI\BOOT\bootx64.efi'
```

efibootmgr 命令仅在您以 UEFI 模式启动实时操作系统时才有效，因此请确保以这种模式从 USB 闪存驱动器启动。
根据您在提示符上的权限，您可能需要使用 sudo 运行 efibootmgr。

或者，BIOS 可能会提供一个工具来添加启动选项，您可以在那里指定 EFI 文件的路径：

```text
\EFI\BOOT\bootx64.efi
```

:::

1. 插入您刚刚创建的启动介质。

2. 插入连接到网络和互联网的以太网线并打开系统电源。
   * 注意：需要互联网，因为新安装的 Home Assistant OS 尚未包含所有 Home Assistant 组件。它在首次启动时下载最新版本的 Home Assistant Core。

3. 在桌面系统的浏览器中，几分钟内您将能够在 <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a> 访问您的新 Home Assistant。

:::note
如果您运行的是较旧的 Windows 版本或有更严格的网络配置，您可能需要在 <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> 或 `http://X.X.X.X:8123`（将 X.X.X.X 替换为您系统的 IP 地址）访问 Home Assistant。
:::

[generic-x86-64]: https://github.com/home-assistant/operating-system/releases

## 下载合适的镜像

* [VirtualBox (Intel 芯片)][vdi] (.vdi)
* [VirtualBox (Apple Silicon 芯片)][vmdk_arch64] (.vmdk)
* [KVM][qcow2] (.qcow2)
* [KVM/Proxmox][qcow2] (.qcow2)
* [VMware ESXi/vSphere][Virtual Appliance] (.ova)
* [VMware Workstation][vmdk] (.vmdk)
* [Hyper-V][vhdx] (.vhdx)

下载后，解压缩镜像。如果镜像是 ZIP 文件，例如，解压缩它。

如果您已经在运行支持的虚拟机管理程序，请按照本指南操作。如果您不熟悉虚拟机，请直接在 [Home Assistant Yellow](/home-assistant/installation/yellow)、[树莓派](/home-assistant/installation/raspberrypi.md) 或 [ODROID](/home-assistant/installation/odroid.md) 上安装 Home Assistant OS。

### 创建虚拟机

将设备镜像加载到您的虚拟机管理程序中。（注意：您可以自由分配任意资源给 VM，请根据您的应用需求分配足够的资源。）

最低推荐配置：

* 2 GB RAM
* 2vCPU

### 启动虚拟机

1. 启动虚拟机。
2. 观察 Home Assistant Operating System 的启动过程。
3. 完成后，您将能够在 <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a> 访问 Home Assistant。如果您运行的是较旧的 Windows 版本或有更严格的网络配置，您可能需要在 <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> 或 `http://X.X.X.X:8123`（将 X.X.X.X 替换为您虚拟机的 IP 地址）访问 Home Assistant。

安装并可以访问 Home Assistant Operating System 后，您可以继续进行初始设置。

:::info [初始设置](/home-assistant/getting-started/onboarding/index.md)
:::

[vdi]: https://github.com/home-assistant/operating-system/releases/download//haos_ova-.vdi.zip

[vmdk]: https://github.com/home-assistant/operating-system/releases/download//haos_ova-.vmdk.zip

[vmdk_arch64]: https://github.com/home-assistant/operating-system/releases/download//haos_ova--aarch64.vmdk.zip

[qcow2]: https://github.com/home-assistant/operating-system/releases/download//haos_ova-.qcow2.zip

[vhdx]: https://github.com/home-assistant/operating-system/releases/download//haos_ova-.vhdx.zip

[Virtual Appliance]: https://github.com/home-assistant/operating-system/releases/download//haos_ova-.ova
