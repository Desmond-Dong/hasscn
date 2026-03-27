---
title: 通用 x86-64
description: '如果您想轻松开始使用 Home Assistant，或者几乎没有 Linux 经验，请按照本指南操作。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 通用 x86-64

## 安装 Home Assistant Operating System

如果您想轻松开始使用 Home Assistant，或者几乎没有 Linux 经验，请按照本指南操作。

## 推荐硬件

您需要准备一些东西才能开始安装 Home Assistant。以下链接指向 Ameridroid。如果您不在美国，应该能在您所在国家的网店找到这些物品。

首先，我们推荐 ODROID-N2+，这是驱动我们 [Home Assistant Blue](/home-assistant/blue/) 的主板，或者是 ODROID-M1。

如果无法获得，我们也推荐 [ODROID-C4](https://ameridroid.com/products/odroid-c4)。

Home Assistant 套装（美国市场）：

套装预装了 Home Assistant。

- [ODROID-N2+: 2 GB RAM / 16 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44748729286935)
- [ODROID-N2+: 4 GB RAM / 64 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44748729221399)
- ODROID-M1: 4 GB RAM / 256 GB NVMe / [16 GB &micro;SD](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44929573028119) 或 [16 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44994940567831)
- ODROID-M1: 8 GB RAM / 256 GB NVMe / [16 GB &micro;SD](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44929573093655) 或 [16 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44994940633367)
- [ODROID-M1: 8 GB RAM / 1 TB NVMe / 64 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44994940698903)

未预装 Home Assistant 的版本：

- ODROID-N2+，[2 GB RAM](https://ameridroid.com/products/odroid-n2-plus?variant=40371828719650) 或 [4 GB RAM](https://ameridroid.com/products/odroid-n2-plus?variant=40371828752418)
- [ODROID-C4](https://ameridroid.com/products/odroid-c4)
- [ODROID-M1](https://ameridroid.com/products/odroid-M1)
- ODROID-M1S，[4 GB RAM](https://ameridroid.com/products/odroid-m1s?variant=47425396474135) 或 [8 GB RAM](https://ameridroid.com/products/odroid-m1s?variant=47425396506903)

相关组件：

- [电源适配器](https://ameridroid.com/products/12v-2a-power-supply-plug)
- [CR2032 纽扣电池](https://ameridroid.com/products/rtc-bios-battery)
- [eMMC 模块](https://ameridroid.com/products/emmc-module-n2-linux-red-dot)
- [外壳](https://ameridroid.com/products/odroid-n2-case)

*这些是联盟链接。我们通过本文中的链接购买可获得佣金。*

:::important

<b>前提条件</b>

本指南假设您有一台专用的 PC 专门运行 **Home Assistant Operating System**。

- 这通常是基于 Intel 或 AMD 的系统。
- 系统必须支持 64 位并能使用 UEFI 启动。
  - 最近 10 年生产的大多数系统都支持 UEFI 启动模式。

<b>摘要</b>

1. 首先，您需要将 PC 配置为使用 UEFI 启动模式。
2. 然后，将 **Home Assistant Operating System** 磁盘镜像写入您的启动介质。

:::

## 配置 x86-64 硬件的 BIOS

要启动 Home Assistant OS，BIOS 需要启用 UEFI 启动模式并禁用安全启动。以下截图来自第 7 代 Intel NUC 系统。您的系统上的 BIOS 菜单可能看起来不同，但选项应该仍然存在且命名类似。

1. 要进入 BIOS，启动您的 x86-64 硬件并反复按 `F2` 键（在某些系统上可能是 `Del`、`F1` 或 `F10`）。
![使用 F2、Del、F1 或 F10 键进入 BIOS](/home-assistant/images/installation/intel-nuc-enter-bios.jpg)

2. 确保启用了 UEFI 启动模式。
![启用 UEFI 启动模式](/home-assistant/images/installation/intel-nuc-uefi-boot.jpg)

3. 禁用安全启动。
![禁用安全启动模式](/home-assistant/images/installation/intel-nuc-disable-secure-boot.jpg)

4. 保存更改并退出。

BIOS 配置现已完成。

## 将 HAOS 写入您的 x86-64 硬件

接下来，您需要将 Home Assistant Operating System 镜像写入*启动介质*，即您的 x86-64 硬件在运行 Home Assistant 时将从中启动的介质。

:::note
HAOS 没有集成的安装程序可以自动写入镜像。您将使用 Ubuntu 的 <b>磁盘</b> 工具或 Balena Etcher 手动写入。
:::

通常，x86-64 启动介质使用内部介质，如 S-ATA 硬盘、S-ATA SSD、M.2 SSD 或不可移动的 eMMC。或者，也可以使用外部介质，如 USB SSD，但不推荐这样做。

要将 HAOS 镜像写入 x86-64 硬件上的启动介质，有 2 种不同的方法：

  **方法 1（推荐）**：从 USB 闪存驱动器启动 Ubuntu，并从那里安装 **Home Assistant Operating System**。它也适用于带有内部硬盘的笔记本电脑和 PC。

  **方法 2**：使用此方法，您直接从常规计算机将 Home Assistant Operating 磁盘镜像写入启动介质。步骤稍微复杂一些。如果您有不可移动的内部介质（例如因为您使用的是笔记本电脑）或没有必要的适配器（例如 USB 转 S-ATA 适配器），请改用方法 1。

### 方法 1：通过从 USB 闪存驱动器启动 Ubuntu 安装 HAOS

#### 所需材料

- 计算机
- 目标 x86-64 硬件，您要在其上安装 **Home Assistant Operating System**（HAOS）
- USB 闪存驱动器（USB 拇指驱动器即可，大小应至少为 8 GB）
- 互联网连接

#### 通过 USB 闪存驱动器从 Ubuntu 安装 HAOS

1. **注意**：此过程将把 **Home Assistant Operating System** 写入您的设备。
   - 这意味着您将丢失所有数据以及之前安装的操作系统。
   - 在执行此过程之前备份您的数据。
2. 在 USB 闪存驱动器上创建一个*实时操作系统*：
   - 按照 [Ubuntu Desktop 说明](https://documentation.ubuntu.com/desktop/en/latest/tutorial/try-ubuntu-desktop/)将 Ubuntu Desktop iso 文件写入 USB 设备。
3. 将 USB 闪存驱动器插入您想要运行 Home Assistant 的系统。
   - 启动实时操作系统。
   - 您可能需要调整启动顺序或使用 F10（可能是不同的 F 键，取决于 BIOS）来选择 USB 闪存驱动器作为启动设备。
4. 当提示时，确保选择 **试用 Ubuntu**。这将在 USB 闪存设备上运行 Ubuntu。
   - 然后系统启动 Ubuntu。
   - 将您的系统连接到网络并确保它可以访问互联网。
5. 在 Ubuntu 中，打开浏览器并打开当前文档页面，以便您可以按照步骤操作。
   - 从那里，[下载镜像][generic-x86-64]。
6. 在 Ubuntu 中，在左下角选择 **显示应用程序**。
7. 在应用程序中，搜索并打开 **磁盘** 并开始恢复 HAOS 镜像：
   1. 在 **磁盘** 中，在左侧选择您要安装 HAOS 的内部磁盘设备。
   2. 在屏幕顶部，选择三点 `[mdi:dots-vertical]` 菜单并选择 **恢复磁盘镜像...**。
      ![恢复磁盘镜像：选择三点菜单](/home-assistant/images/installation/ubuntu_restore_disk_image.png)
   3. 选择您刚刚下载的镜像。
      ![恢复磁盘镜像：选择镜像](/home-assistant/images/installation/select_haos.png)
   4. 选择 **开始恢复...**。
      ![恢复磁盘镜像：开始恢复](/home-assistant/images/installation/start_restoring.png)
   5. 通过选择 **恢复** 确认。
      ![恢复磁盘镜像：选择恢复](/home-assistant/images/installation/restore.png)
      - 如果您收到 **Error unmounting filesystem** 错误消息，说明 **target is busy**：
      - 很可能，您正在内部磁盘上运行 Ubuntu。相反，您需要在您的 USB 驱动器上运行它。
        - 返回步骤 3，在启动期间，确保您选择 **Try Ubuntu**（而不是 **Install Ubuntu**）。
      - 另一个问题可能是实时 Ubuntu 正在使用现有 Linux 安装的 Swap 分区。
        - 如果您在要安装 HAOS 的驱动器上看到列出了"Swap"分区，只需选择 Swap 分区，然后按停止按钮卸载它，然后再次尝试恢复操作。
   6. 在分区概览中，您现在应该看到正在进行的恢复操作。
      - Home Assistant Operating System 现在正在安装到您的系统上。
        ![恢复磁盘镜像：正在恢复...](/home-assistant/images/installation/haos_restoring.png)
8. 一旦 Home Assistant Operating System 安装完成，关闭系统。
   - Ubuntu 关闭后，移除 USB 闪存驱动器（Ubuntu 会通知您何时可以这样做）。
   - 您的 Home Assistant 服务器现已设置完成，您可以开始使用它。
   - 要使用它，请按照 [启动您的通用 x86-64](/home-assistant/installation/generic-x86-64#start-up-your-generic-x86-64) 中描述的步骤操作。

### 方法 2：直接从启动介质安装 HAOS

:::note
仅在方法 1 对您不起作用时使用此方法。
:::

#### 所需材料

- 计算机
- 目标 x86-64 硬件，您要在其上安装 **Home Assistant Operating System**（HAOS）
- 启动介质
- 互联网连接

#### 将镜像写入您的启动介质

### 将镜像写入您的启动介质

1. **注意**：此过程将把 **Home Assistant Operating System** 写入您的设备。
   - 这意味着您将丢失所有数据以及之前安装的操作系统。
   - 在继续下一步之前备份您的数据。
2. 将 Home Assistant 启动介质连接到您的计算机。
    
      如果您使用的是 ODROID-M1，请注意不支持从 NVMe 启动。如果您想从 eMMC 启动，请在安装镜像之前[更新固件](https://github.com/home-assistant/operating-system/blob/dev/documentation/boards/hardkernel/odroid-m1.md)。

      如果您使用的是 [Home Assistant Blue](/home-assistant/blue) 或 ODROID-N2+，您可以[直接连接您的设备](/home-assistant/installation/odroid#flashing-an-odroid-n2)。

      如果您使用的是 ODROID-M1S，您需要按照本指南[将您的设备启动到 UMS 模式](/home-assistant/installation/odroid#flashing-an-odroid-m1s)。
    
3. 下载并启动 <a href="https://www.balena.io/etcher" target="_blank">Balena Etcher</a>。在 Windows 上您可能需要以管理员权限运行它。
4. 将镜像下载到您的计算机。
   - 复制镜像的 URL。
   - 如果下面有多个链接，确保为您的版本选择正确的链接。
    
    
    
    
    

    ```text
    
    //haos_-.img.xz
    ```

    

    *选择并复制 URL 或使用悬停时出现的"复制"按钮。*
5. 将 URL 粘贴到浏览器中以开始下载。
6. 解压您刚刚下载的文件。
7. 选择 **从文件烧录** 并选择您刚刚解压的镜像。
   - 不要使用 **从 URL 烧录**。它在某些系统上不起作用。
    ![显示选择了从 URL 刷写的 Etcher 软件截图。](/home-assistant/images/installation/etcher1_file.png)
8. **选择目标**。
    ![显示选择目标按钮高亮的 Etcher 软件截图。](/home-assistant/images/installation/etcher3.png)
9. 选择您要用于安装的启动介质。
    ![显示可用目标的 Etcher 软件截图。](/home-assistant/images/installation/etcher4.png)
10. 选择 **烧录！** 开始写入镜像。
    - 如果操作失败，解压 .xz 文件并重试。
    ![显示 Flash 按钮高亮的 Etcher 软件截图。](/home-assistant/images/installation/etcher5.png)
    - 当 Balena Etcher 完成写入镜像后，您将看到确认信息。
    ![显示安装已完成的 Etcher 软件截图。](/home-assistant/images/installation/etcher6.png)

### 启动您的通用 x86-64

- 如果您使用方法 1 进行安装，确保 USB 闪存驱动器已从系统中移除。

- 如果您使用方法 2 进行安装，将启动介质安装到您的 x86-64 硬件中。

1. 插入连接到网络和互联网的以太网电缆。
   - 注意：需要互联网，因为新安装的 Home Assistant OS 尚未包含所有 Home Assistant 组件。它将在首次启动时下载最新版本的 Home Assistant 核心。
2. 打开系统电源。如果您有连接到系统的屏幕，大约一分钟后 Home Assistant 欢迎横幅将出现在控制台中。

:::note

如果机器抱怨找不到可启动介质，您可能需要在 BIOS 中指定 EFI 条目。
这可以通过使用实时操作系统（例如 Ubuntu）并运行以下命令来完成（将 `<drivename>` 替换为 Linux 分配的适当驱动器名称，通常是 `sda` 或在 NVMe SSD 上是 `nvme0n1`）：

  ```text
  efibootmgr --create --disk /dev/<drivename> --part 1 --label "HAOS" \
     --loader '\EFI\BOOT\bootx64.efi'
  ```

efibootmgr 命令仅在您以 UEFI 模式启动实时操作系统时才有效，因此请确保在此模式下从 USB 闪存驱动器启动。
根据您在提示符下的权限，您可能需要使用 sudo 运行 efibootmgr。

否则，BIOS 可能会为您提供一个添加启动选项的工具，您可以在那里指定 EFI 文件的路径：

  ```text
  \EFI\BOOT\bootx64.efi
  ```

:::

1. 插入您刚刚创建的启动介质。
2. 插入连接到网络和互联网的以太网电缆并打开系统电源。
   - 注意：需要互联网，因为新安装的 Home Assistant OS 尚未包含所有 Home Assistant 组件。它将在首次启动时下载最新版本的 Home Assistant 核心。

3. 在桌面系统的浏览器中，几分钟内您将能够在 <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a> 访问您的新 Home Assistant。

:::note
如果您运行的是较旧的 Windows 版本或有更严格的网络配置，您可能需要在 <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> 或 `http://X.X.X.X:8123`（将 X.X.X.X 替换为您的 IP 地址）访问 Home Assistant。
:::

### 下载适当的镜像

- [VirtualBox (Intel 芯片)][vdi] (.vdi)

- [VirtualBox (Apple Silicon 芯片)][vmdk_arch64] (.vmdk)

- [KVM][qcow2] (.qcow2)

- [KVM/Proxmox][qcow2] (.qcow2)
- [VMware ESXi/vSphere][Virtual Appliance] (.ova)

- [VMware Workstation][vmdk] (.vmdk)
- [Hyper-V][vhdx] (.vhdx)

下载后，解压镜像。如果镜像是 ZIP 文件，例如，解压它。

如果您已经在运行支持的虚拟机管理程序，请按照本指南操作。如果您不熟悉虚拟机，请直接在 [Home Assistant Yellow](/home-assistant/installation/yellow)、[树莓派](/home-assistant/installation/raspberrypi) 或 [ODROID](/home-assistant/installation/odroid) 上安装 Home Assistant OS。

- 如果您的 Mac 不支持 VirtualBox，并且您有使用虚拟机的经验，您可以尝试在 [UTM](https://mac.getutm.app/) 上运行 Home Assistant Operating System。

### 创建虚拟机

将设备镜像加载到您的虚拟机管理程序中。（注意：您可以自由地为 VM 分配任意多的资源，请根据您的应用需求分配足够的资源）。

最低推荐配置：

- 2 GB RAM
- 2vCPU

*如果您的使用需要更多资源，所有这些都可以扩展。*

### 管理程序特定配置


**VirtualBox**

```
#### 创建虚拟机
    
    1. 打开 VirtualBox 并选择 **New（新建）** 按钮（蓝色星形图标）。
    2. **Name（名称）:** 输入 Home Assistant。
    3. **ISO Image（ISO 镜像）:** 保留为 **None（无）** 或 **Empty（空）**。
    4. **Type & Version（类型和版本）:** 选择 **Linux**，然后选择 **Oracle Linux (64-bit)**（如果您使用的是 M1/M2/M3 芯片的 Mac，则选择 **ARM 64-bit**）。
    5. 选择 **Next（下一步）**。
 
    #### 配置硬件
    1. **Base Memory（基础内存）:** 将滑块移动到至少 **2048 MB**（2GB）。
    2. **Number of CPUs（CPU 数量）:** 将滑块移动到至少 **2**。
    3. **EFI:** 勾选 **Enable EFI (special OSes only)（启用 EFI，仅用于特殊操作系统）** 复选框。这是 Home Assistant 启动所必需的。
    4. 选择 **Next（下一步）**。

    #### 完成向导

    1. 在 **Virtual Hard Disk（虚拟硬盘）** 页面上，保留默认设置（它会建议创建一个新磁盘）。我们会在下一步将其替换为已下载的文件。
    2. 选择 **Finish（完成）**。

    #### 附加 Home Assistant 磁盘 (VDI)

    1. 在左侧列表中选择新建的 "Home Assistant" 虚拟机，然后选择 **Settings（设置）** 图标（橙色齿轮）。
    2. 在左侧菜单中进入 **Storage（存储）**。
    3. 在 **Storage Devices（存储设备）** 列表里，您会看到 **Controller: SATA** 下已有一个磁盘。右键点击该磁盘并选择 **Remove Attachment（移除挂载）**，删除这个空白占位磁盘。
    4. 选择 **Controller: SATA** 旁边的 **Add Hard Disk（添加硬盘）** 图标（带绿色加号的小磁盘）。
    5. 在弹出窗口中，点击顶部的 **Add（添加）**。
    6. 找到并选择您之前下载并解压的 `.vdi` 文件。
    7. 选择 **Choose（选择）** 确认文件。

    #### 配置网络

    1. 在 **Settings（设置）** 窗口中，转到 **Network（网络）** 页面。
    2. 将 **Attached to（连接方式）** 从 **NAT** 改为 **Bridged Adapter（桥接网卡）**。
    3. 在 **Name（名称）** 下，选择您用于联网的网卡，这样 Home Assistant 才能与局域网中的其他设备通信。
    4. 选择 **OK（确定）**。

    `[mdi:alert-outline]`  默认情况下，VirtualBox 不会
    释放未使用的磁盘空间。要自动收缩 vdi 磁盘镜像，必须使用主机终端启用 `discard` 选项：
```
bash
    VBoxManage storageattach <VM name> --storagectl "SATA" --port 0 --device 0 --nonrotational on --discard on
    ```

    有关该命令的更多详细信息可以在[这里](https://www.virtualbox.org/manual/ch08.html#vboxmanage-storageattach)找到。

## Unraid
1. 下载上面的 **.qcow2** 镜像并解压。（Windows 中为 **Extract all**）
    2. 将镜像存储在您服务器上的 **isos** 共享中。
    3. 确保在 **Settings** > **VM manager** 下，**Enable VMs** 已启用。
    4. 创建一个新的虚拟机：**VMS** > **Add VM**。
    5. 选择类型 **Linux** 并给 VM 一个名称和描述。
    6. 选择您想让 VM 使用的 CPU 核心并给它一些内存。
    7. 在 **Primary vDisk Location** 下，选择 **Manual**，然后选择 qcow2 镜像。
    8. 在 **VM Console Keyboard** 下选择您的键盘语言。
    9. 在 **Network Source** 下选择 **br0**。
    10. 在 **Network model** 下选择 **virtio**。
    11. 选择任何您想透传给 Home Assistant 的 USB 设备，例如 Zigbee 或 Z-Wave 控制器。
    12. 取消选择 **Start VM after creation**。
    13. 选择 **Create**。
    14. 选择您新 VM 的名称并选择磁盘的容量数字。在这里，您可以将磁盘扩展到您需要的任何大小。默认值为 32 GB。
    15. 选择您新 VM 的图标并选择 **start with console (VNC)**。

## KVM (virt-manager)
1. 在 `virt-manager` 中创建一个新的虚拟机。
    2. 选择 **Import existing disk image**，提供上面 QCOW2 镜像的路径。
    3. 为操作系统选择 **Generic Default**。
    4. 勾选 **Customize configuration before install** 复选框。
    5. 在 **Network Selection** 下，选择您的网桥。
    6. 在自定义下选择 **Overview** > **Firmware** > **UEFI x86_64: ...**。确保选择非安全启动版本的 OVMF（不包含 `secure`、`secboot` 等词），例如 `/usr/share/edk2/ovmf/OVMF_CODE.fd`。
    7. 选择 **Add Hardware**（左下角），然后选择 **Channel**。
    8. 选择设备类型：**unix**。
    9. 选择名称：**org.qemu.guest_agent.0**。
    10. 最后，选择 **Begin Installation**（左上角）。

## KVM (virt-install)
```bash
    virt-install --name haos --description "Home Assistant OS" --os-variant=generic --ram=4096 --vcpus=2 --disk <PATH TO QCOW2 FILE>,bus=scsi --controller type=scsi,model=virtio-scsi --import --graphics none --boot uefi
    ```

    `[mdi:alert-outline]` 如果您有 USB
    加密狗要附加，您需要添加选项 `--hostdev busID.deviceId`。您可以
    通过 `lsusb` 命令发现这些 ID。例如，如果 `lsusb` 输出为：

    ```bash
       Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
       Bus 003 Device 004: ID 30c9:0052 Luxvisions Innotech Limited Integrated RGB Camera
       Bus 003 Device 003: ID 1a86:55d4 QinHeng Electronics SONOFF Zigbee 3.0 USB Dongle Plus V2
       Bus 003 Device 002: ID 06cb:00fc Synaptics, Inc. 
       Bus 003 Device 005: ID 8087:0033 Intel Corp. 
       Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
       Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
       Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
    ```

    您可以在 `Bus 003 Device 003` 识别 Sonoff 加密狗。所以安装 VM 的命令将变为：

    ```bash
    virt-install --name haos --description "Home Assistant OS" --os-variant=generic --ram=4096 --vcpus=2 --disk <PATH TO QCOW2 FILE>,bus=scsi --controller type=scsi,model=virtio-scsi --import --graphics none --boot uefi --hostdev 003.003
    ```

    请注意，此配置（总线 003，设备 003）只是一个示例，您的加密狗可能在另一个总线和/或具有另一个设备 ID。
    请使用 `lsusb` 检查您 USB 加密狗的正确 ID。

## VMware Workstation
1. 启动 VMware Workstation 并选择 **Create a New Virtual Machine（创建新的虚拟机）**。
       - 注意：以下设置的确切名称和位置取决于 VMware 版本。此过程基于版本 17。
    2. 选择 **I will install the operating system later（稍后安装操作系统）**，然后选择 **Linux** > **Other Linux 5.x kernel 64-bit**。
    3. 给 VM 一个名称，`home-assistant`，并定义一个易于访问的存储位置，例如 `C:\home-assistant`。
    4. 指定磁盘大小并选择 **Store virtual disk as a single file（将虚拟磁盘存储为单个文件）**。
    5. 选择 **Customize Hardware（自定义硬件）**。
    6. 定义 VM 允许使用的内存量和核心数。
    7. 删除 **New CD/DVD（新建 CD/DVD）** 条目。该设备不会被使用。
    8. 连接以太网电缆并确保它连接到您的网络。
    9. 在 **Network adapter（网络适配器）** 下，选择 **Bridged: Connected directly to the physical network（桥接：直接连接到物理网络）**。
       - 确保未勾选 **Replicate physical network connection state（复制物理网络连接状态）**。
       - 选择 **Configure Adapters（配置适配器）**。
       - 确保取消选择所有虚拟适配器和蓝牙设备。
       - 选择您的主机网络适配器。很可能是列表中前 2 个复选框之一：
         - 选择用于以太网的那个。
         - 这些适配器的确切名称取决于您的硬件。
    10. 在向导结束时，选择 **Finish（完成）**。

      ## 编辑 VM 设置

      11. 在 Windows 资源管理器中，转到您新创建的 VM 的存储位置，例如 `C:\home-assistant`。
      12. 删除 `home-assistant.vmdk` 文件。
      3. 在 `Downloads` 文件夹中，找到 `haos_ova_xx.x.vmdk` 文件。 
         - 如果您尚未解压存档，请解压它。
         - 在文件夹中，找到 `.vmdk` 文件并将其重命名为 `home-assistant.vmdk`。
         - 将文件（而不是解压的文件夹）粘贴到 `C:\home-assistant` 文件夹中。
      4. 右键单击 `.vmx` 文件并选择 **Open with（打开方式）** > **Notepad（记事本）**。
      5. 在 `.encoding` 下，添加一行。输入 `firmware = "efi"`。
      6. 现在继续下一步启动您的 VM。 
         - 如果您看到关于侧信道缓解措施的提示，选择 **OK（确定）**。
         - 如果您看到一条消息指出找不到 `.vmdk` 文件，在步骤 3 中，您可能粘贴了文件夹而不是文件。重复步骤 3。

## VMware ESXi/vSphere
使用 `E1000` 或 `E1000E` 虚拟网络适配器。使用 VMware 的 `VMXnet3` 虚拟网络适配器时，已确认存在 mDNS/多播发现问题。

```

### 启动您的虚拟机

1. 启动虚拟机。
2. 观察 Home Assistant Operating System 的启动过程。
3. 完成后，您将能够在 <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a> 访问 Home Assistant。如果您运行的是较旧的 Windows 版本或有更严格的网络配置，您可能需要在 <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> 或 `http://X.X.X.X:8123`（将 X.X.X.X 替换为您虚拟机的 IP 地址）访问 Home Assistant。

Home Assistant Operating System 已安装并可访问，您可以继续进行入门设置。

:::info [入门设置](/home-assistant/getting-started/onboarding/)
:::

## 刷写 ODROID-N2+

可以通过板前部的 USB-OTG 连接将 Home Assistant 直接刷写到 ODROID-N2+，将设备直接连接到您的计算机。该设备包含 Petitboot 引导加载程序，这使得 ODROID-N2+ 存储显示为就像它是一个 USB 驱动器一样。

_所有这些说明对 ODROID-N2（非 plus 版本）同样适用。_

### 您将需要什么

要使用 Petitboot 和 OTG-USB 刷写您的 eMMC，您需要以下物品：

- HDMI 电缆和显示器
- USB 键盘
- USB 2.0 转 micro-USB 电缆
- 如果您的主板是 Home Assistant Blue 套装：No.2 六角扳手用于打开外壳

### 启用 SPI 启动模式

要启用 SPI 启动模式：

1. 通过拔掉电源线关闭 ODROID-N2+。
2. 移除外壳。

   ![已移除外壳的照片](/home-assistant/images/hassio/screenshots/case-removed.jpg)

3. 找到启动模式切换开关并将其从 MMC 切换到 SPI。

   ![SPI 切换开关照片](/home-assistant/images/hassio/screenshots/toggle_spi.jpg)
   
4. 通过位于板前部的 USB-OTG 端口将 ODROID-N2+ 直接连接到您的计算机。
5. 将 USB 键盘和显示器（使用 HDMI）连接到您的 ODROID-N2+。
6. 插入电源线以启动 ODROID-N2+。

### 启用 USB 驱动器模式

当 ODROID-N2+ 设置为 SPI 启动模式并通电后，它会启动到终端。要启用 USB 驱动器模式：

1. 从菜单中选择 `Exit to shell`。

   ![退出到 shell](/home-assistant/images/hassio/screenshots/exit-shell.png)

:::note
使用命令行时，它可能会返回以下消息：
`can't access tty; job control turned off.`
您可以安全地忽略此消息并继续安装
:::

1. 在控制台使用以下命令确认存储设备节点：

   ```bash
   ls /dev/mmc*
   ```

2. 使用 `ums` 命令将 ODROID-N2+ 上的存储设备设置为海量存储设备（USB 大容量存储模式）。
这将配置 ODROID-N2+ 和 OTG 作为存储卡读取器：

   ```bash
   ums /dev/mmcblk0
   ```

### 刷写 Home Assistant

1. 通过 ODROID-N2+ 前部的 micro-USB 端口将 ODROID-N2+ 连接到您的 PC。 
2. 当 ODROID-N2 被识别为 USB 连接的存储设备时，您可以使用 [Etcher](https://www.balena.io/etcher/) 刷写 eMMC。
   - 使用 [ODROID-N2+](https://github.com/home-assistant/operating-system/releases/download//haos_odroid-n2-.img.xz) 的最新稳定版 Home Assistant OS（haos_odroid-n2-.img.xz）。
   - 在 Balena 中，使用 **Flash from file**。**Flash from URL** 在所有系统上都不起作用。

3. 当刷写过程完成时，从您的 PC 断开 ODROID-N2+。
   - 移除电源线。
   - 移除 USB 和 HDMI 电缆。
   - 确保将启动模式开关切换回 MMC。

4. 将 ODROID 放回外壳中。
5. 用以太网电缆将您的 ODROID-N2+ 连接到网络，确保有互联网访问，然后插入电源。

6. 如果您的路由器支持 mDNS，您可以在 `http://homeassistant.local:8123` 访问您的安装。 
   - 如果您的网络不支持 mDNS，您必须使用 ODROID-N2+ 的 IP 地址而不是 `homeassistant.local`。例如，`http://192.168.0.9:8123`。
   - 您应该能够从路由器的管理界面找到 ODROID-N2+ 的 IP 地址。
7. 继续[入门设置](/home-assistant/getting-started/onboarding/)。
## 刷写 ODROID-M1S

可以通过板前部的 USB-OTG 连接将 Home Assistant 刷写到 ODROID-M1S，将设备直接连接到您的计算机。
与其他 ODROID 板不同，M1S 没有可选 <abbr title="embedded MultiMediaCard">eMMC</abbr> 模块的插槽。它也没有单独的闪存芯片来容纳专用的引导加载程序。
相反，M1S 有一个内置的 64 GB <abbr title="embedded MultiMediaCard">eMMC</abbr> 直接焊接在板上，默认情况下容纳引导加载程序。本指南将向您展示如何将 **Home Assistant Operating System** 安装到内置 <abbr title="embedded MultiMediaCard">eMMC</abbr>。

<ins>**警告：</ins> 安装 Home Assistant OS 会将 <abbr title="embedded MultiMediaCard">eMMC</abbr> 上的固件和 <abbr title="secondary program loader">SPL</abbr> 替换为 Home Assistant OS 提供的主流版本。因此，不再可能使用带有 EMMC2UMS 镜像的 SD 卡，因为主流 <abbr title="secondary program loader">SPL</abbr> 目前（2024 年 2 月）与 EMMC2UMS 镜像中的 U-Boot 不兼容。这对标准使用没有任何问题，只是如果您想返回 Hardkernel 提供的操作系统会更复杂（参见 [HK 恢复](#hk-recovery)）。**

### 您将需要什么

要使用 <abbr title="USB-On-The-Go">USB-OTG</abbr> 刷写您的 <abbr title="embedded MultiMediaCard">eMMC</abbr>，您需要以下物品：

- 一张小型 SD 卡
- 另一台计算机
- USB 2.0 转 micro-USB 电缆
- 特殊的 Hardkernel eMMC-to-USB-mass-storage 镜像

### 启动到大容量存储模式

（这些步骤与官方 [Hardkernel wiki](https://wiki.odroid.com/odroid-m1s/getting_started/os_installation_guide?redirect=1#install_over_usb_from_pc) 页面相同。）

1. 下载 [ODROID-M1S_EMMC2UMS.img](https://dn.odroid.com/RK3566/ODROID-M1S/Installer/ODROID-M1S_EMMC2UMS.img)。
2. 使用 [balena Etcher](https://www.balena.io/etcher/) 或其他工具将 UMS 实用程序刷写到 SD 卡上。
   - 使用 **Flash from file**。**Flash from URL** 在所有系统上都不起作用。
      （balena Etcher 会抱怨刷写过程中出了问题。您可以忽略此消息）
3. 将该 SD 卡插入您的 ODROID-M1S 并启动它。

### 刷写 Home Assistant M1S

1. 下载 [ODROID-M1S](https://github.com/home-assistant/operating-system/releases/download//haos_odroid-m1s-.img.xz) 的最新稳定版 Home Assistant OS。
2. 除了要刷写的 HAOS 镜像（M1S 而不是 N2+ 版本）外，您可以按照[这里](/home-assistant/common-tasks/os/#flashing-home-assistant)的 N2+ 分步刷写指南操作。

#### _HK 恢复_

如果您想将 M1S 恢复到 Hardkernel 的初始状态，您必须恢复 HK 的引导加载程序。
重新刷写 eMMC 与您选择的操作系统的可靠方法是使用 Home Assistant OS 刷写 EMMC2UMS 镜像，这将 ODROID-M1S 转换为 USB 大容量存储设备。刷写 EMMC2UMS 镜像后，您可以再次刷写任何操作系统。您需要一根 micro USB 电缆将 ODROID-M1S 连接到 PC。

注意：此命令将导致您当前的 Home Assistant OS 安装无法启动！

使用本地终端（HDMI/键盘）访问系统控制台。在 Home Assistant CLI（命令行）上，输入 `login` 进入 root shell 并使用 `curl` 下载镜像并使用 `dd` 将其写入 eMMC 块设备：

```bash
curl -L -A "Mozilla/5.0" https://dn.odroid.com/RK3566/ODROID-M1S/Installer/ODROID-M1S_EMMC2UMS.img | sudo dd of=/dev/mmcblk0 bs=4M status=progress conv=fsync
```

这样，设备将在下次启动时以移除 SD 卡后的 UMS 模式启动。按照[从 PC 通过 USB 安装](https://wiki.odroid.com/odroid-m1s/getting_started/os_installation_guide#install_over_usb_from_pc)安装不同的操作系统。

[generic-x86-64]: //haos_generic-x86-64-.img.xz
[vmdk]: //haos_ova-.vmdk.zip
[vmdk_arch64]: //haos_generic-aarch64-.vmdk.zip
[vhdx]: //haos_ova-.vhdx.zip
[vdi]: //haos_ova-.vdi.zip
[qcow2]: //haos_ova-.qcow2.xz
[Virtual Appliance]: //haos_ova-.ova

## 安装 Home Assistant Container

以下说明用于在您自己管理的容器环境中安装运行 **Home Assistant Container**。任何 [OCI](https://opencontainers.org/) 兼容的运行时都可以使用，但本指南将重点介绍使用 Docker 进行安装。

:::note
此安装类型**无法访问应用**。如果您想使用应用，您需要使用其他安装类型。推荐的类型是 **Home Assistant Operating System**。查看[安装类型概览表](https://www.home-assistant.io/installation/#about-installation-types)了解差异。
:::

:::important

<b>前提条件</b>
本指南假设您已经设置了操作系统并安装了容器运行时（如 Docker）。

如果您使用 Docker，需要 Docker Engine 23.0.0 或更高版本。Docker _Desktop_ 不起作用；您必须使用 Docker _Engine_。

:::

### 平台安装

使用 Docker 安装很简单。调整以下命令：

- `/PATH_TO_YOUR_CONFIG` 指向您要存储配置的文件夹并运行它。确保保留 `:/config` 部分。
- `MY_TIME_ZONE` 是 [tz 数据库名称](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)，如 `TZ=America/Los_Angeles`。
- D-Bus 是可选的，但如果您计划使用[蓝牙集成](/home-assistant/integrations/bluetooth)则是必需的。

  ### Synology NAS

带有 DSM 的 Synology 现在通过容器管理器包支持容器管理，允许您安装 Home Assistant 而无需使用命令行。有关该包的详细信息（包括兼容性信息，如果您的 NAS 受支持），请参阅 <https://www.synology.com/en-us/dsm/packages/ContainerManager>。
步骤如下：

- 使用 Synology 的套件中心，安装 **Container Manager** 套件。
- 启动容器管理器应用并导航到 **Registry** 部分。
- 在注册表页面上，搜索 `homeassistant/home-assistant` 并选择 **Download**。选择 **stable** 标签。
- 等待镜像被拉取。
- 导航到容器管理器应用的 **Image** 部分。
- 选择 `homeassistant/home-assistant` 镜像并选择 **Run**。
- 在 **General Settings** 页面上：
  - 选择您想要的容器名称（例如，`homeassistant`）。
  - 如果您愿意，设置 **Enable auto-restart**。
  - 选择 **Next**。
- 在 **Advanced Settings** 页面上：
  - 在 **Volume Settings** 部分，选择 **Add Folder** 并选择现有文件夹或添加新文件夹（例如，在 `docker` 共享文件夹中，添加一个名为 `homeassistant` 的新文件夹，然后在该新文件夹中添加另一个新文件夹 `config`），然后选择 **Select**。然后将 **Mount path** 编辑为 `/config`，权限设置为 **Read/Write**。这配置了 Home Assistant 存储配置和日志的位置。
  - 为确保 Home Assistant 显示正确的时区，在 **Environment** 部分，选择 **Add** 按钮，在 **Variable** 字段中添加 `TZ`，在值中添加您的时区（例如，`Europe/London`）。时区可以在[这里](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)找到。
  - 在 **Network** 部分，将网络下拉菜单设置为 `host`。
- 选择 **Next**。
- 确保选中 **Run this container after the wizard is finished** 并选择 **Done**。
- 您在 Docker 中的 Home Assistant 现在应该运行，并将从 Docker 主机上的端口 8123 提供 Web 界面（这将是您的 Synology NAS IP 地址 - 例如 `http://192.168.1.10:8123`）。

如果您使用内置防火墙，您还必须将端口 8123 添加到允许列表。这可以在 **Control Panel** > **Security** 然后是 **Firewall** 选项卡中找到。选择 **Firewall Profile** 下拉框旁边的 **Edit Rules**。创建一个新规则并为端口选择 **Custom** 并添加 8123。如果您愿意可以编辑源 IP 或保留默认的 **All**。操作应保持为 **Allow**。

要使用 Z-Wave USB 适配器进行 Z-Wave 控制，HA Docker 容器需要额外配置才能访问 USB 适配器。虽然有多种方法可以做到这一点，但在撰写本文时，授予访问权限的最少特权方式只能通过终端执行。有关配置 Synology NAS 的终端访问，请参阅此页面：

<https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_terminal>

:::tip
[请参阅此页面了解如何通过 SSH 访问终端](https://www.synology.com/en-global/knowledgebase/DSM/tutorial/General_Setup/How_to_login_to_DSM_with_root_permission_via_SSH_Telnet)
:::

按如下方式调整终端命令：

- 将 `/PATH_TO_YOUR_CONFIG` 替换为指向您要存储配置的文件夹 - 确保保留 `:/config` 部分
- 将 `/PATH_TO_YOUR_USB_STICK` 替换为与您的 USB 适配器路径匹配（例如，大多数 Synology 用户为 `/dev/ttyACM0`）
- 将 `Australia/Melbourne` 替换为[您的时区](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

在终端中运行它。

```bash
sudo docker run --restart always -d --name homeassistant -v /PATH_TO_YOUR_CONFIG:/config --device=/PATH_TO_YOUR_USB_STICK -e TZ=Australia/Melbourne --net=host :stable
```

通过[按照此处的说明](/home-assistant/integrations/zwave_js)完成其余的 Z-Wave 配置。

备注：要在 Synology NAS 上的 Docker 中更新您的 Home Assistant，您只需执行以下操作：

- 转到 **Container Manager** 应用并移至 **Image** 部分。
- 在 Image 中找到 `homeassistant/home-assistant` 并选择 **Update**。
- 等待系统消息/通知弹出，显示下载已完成（没有进度条）。
- 移至 **Container** 部分。
- 如果容器正在运行，停止它。
- 右键单击它并选择 **Action** > **Reset**。您不会丢失任何数据，因为所有文件都存储在您的配置目录中。
- 再次启动容器 - 它将使用新的 Home Assistant 镜像启动。

备注：要在 Synology NAS 中重启您的 Home Assistant，您只需执行以下操作：

- 转到 **Container Manager** 应用并移至 **Container** 部分。
- 右键单击它并选择 **Action** > **Restart**。

:::note

如果您想在 Synology Docker 上的 Home Assistant 中使用 USB 蓝牙适配器或 Z-Wave USB 适配器，这些说明没有正确配置容器以访问 USB 设备。要在 Synology Docker Home Assistant 上配置这些设备，您可以按照 Phil Hawthorne 提供的[说明](https://philhawthorne.com/installing-home-assistant-io-on-a-synology-diskstation-nas/)操作。

:::

### QNAP NAS

带有 QTS 的 QNAP 支持 Docker，允许您使用 Docker 安装 Home Assistant 而无需命令行。有关该包的详细信息（包括兼容性信息，如果您的 NAS 受支持），请参阅 <https://www.qnap.com/solution/container_station/en/index.php>。

步骤如下：

- 在您的 Qnap NAS 上安装 **Container Station** 包。
- 启动容器站并移至 **Create Container** 部分。
- 使用 Docker Hub 搜索镜像 `homeassistant/home-assistant` 并选择 **Install**。
- 选择 **stable** 版本并选择 **Next**。
- 选择您想要的容器名称（例如，`homeassistant`）。
- 选择 **Advanced Settings**。
- 在 **Shared Folders** 中选择 **Volume from host** > **Add** 并选择现有文件夹或添加新文件夹。挂载点必须是 `/config`，以便 Home Assistant 将其用于配置和日志。
- 在 **Network** 中选择网络模式为 **Host**。
- 为确保 Home Assistant 显示正确的时区，转到 **Environment** 选项卡并选择加号，然后添加 `variable` = `TZ` 和 `value` = `Europe/London`，选择[您的正确时区](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。
- 选择 **Create**。
- 等待一段时间，直到您的 NAS 创建容器。
- 您在 Docker 中的 Home Assistant 现在应该运行，并将从 Docker 主机上的端口 8123 提供 Web 界面（这将是您的 Qnap NAS IP 地址 - 例如 `http://192.xxx.xxx.xxx:8123`）。

备注：要在 Qnap NAS 上的 Docker 中更新您的 Home Assistant，您只需删除容器和镜像并再次执行步骤（不要删除 `config` 文件夹）。

### 社区说明

请注意，一些用户报告了在 ARM QNAP 系统（例如 TS-233）上使用容器站 3 创建 Home Assistant 容器的问题。一个可能的解决方法是基于 YAML 文件的 **Docker compose** 方法（参见 **Docker compose** 部分）。在 QNAP 容器站 3 UI 中，可以通过转到 **Applications** 部分并选择 **Create** 来访问。然后会提示您输入 YAML 代码，可以从 **Docker compose** 部分显示的代码复制。注意以两种方式修改此代码：首先，添加一行 `version: '3'`；其次，将文本 `/PATH_TO_YOUR_CONFIG` 替换为 NAS 系统上的有效路径，例如 `/share/Container/HomeAssistant/config`。

  
**安装**

```

```bash
    Docker run -d \
      --name homeassistant \
      --privileged \
      --restart=unless-stopped \
      -e TZ=MY_TIME_ZONE \
      -v /PATH_TO_YOUR_CONFIG:/config \
      -v /run/dbus:/run/dbus:ro \
      --network=host \
      :
    ```

```

一旦 Home Assistant 容器运行，Home Assistant 应该可以使用 `http://<host>:8123` 访问（将 <host> 替换为系统的主机名或 IP）。您可以继续进行入门设置。

:::info [入门设置](/home-assistant/getting-started/onboarding/)
:::

### 重启 Home Assistant

如果您更改配置，您必须重启服务器。有 3 个选项可以做到这一点。

1. 在您的 Home Assistant UI 中，转到 [**Settings** > **System**](https://my.home-assistant.io/redirect/config/) 并在右上角选择三点 `[mdi:dots-vertical]` 菜单。然后，选择 **Restart Home Assistant**。
2. 转到 [**Settings** > **Developer Tools** > **Actions**](https://my.home-assistant.io/redirect/developer_services/)，选择 `homeassistant.restart` 并选择 **Perform Action**。
3. 从终端重启它。


**Docker CLI**

```

```bash
    Docker restart homeassistant
    ```

```

### Docker compose

:::tip
`docker compose` 应该[已经安装](https://www.Docker.com/blog/announcing-compose-v2-general-availability/)在您的系统上。如果没有，您可以[手动](https://docs.Docker.com/compose/install/linux/)安装它。
:::

随着 Docker 命令变得越来越复杂，切换到 `docker compose` 可能更可取，并支持在失败或系统重启时自动重启。创建一个 `compose.yaml` 文件：

```yaml
  services:
    homeassistant:
      container_name: homeassistant
      image: ":"
      volumes:
        - /PATH_TO_YOUR_CONFIG:/config
        - /etc/localtime:/etc/localtime:ro
        - /run/dbus:/run/dbus:ro
      restart: unless-stopped
      privileged: true
      network_mode: host
      environment:
        TZ: Europe/Amsterdam
```

通过运行启动它：

```bash
docker compose up -d
```

一旦 Home Assistant 容器运行，Home Assistant 应该可以使用 `http://<host>:8123` 访问（将 <host> 替换为系统的主机名或 IP）。您可以继续进行入门设置。

:::info [入门设置](/home-assistant/getting-started/onboarding/)
:::

### 暴露设备

为了使用 Zigbee 或其他需要访问设备的集成，您需要将适当的设备映射到容器中。确保运行容器的用户具有访问 `/dev/tty*` 文件的正确权限，然后将设备映射添加到您的容器说明中：


**Docker CLI**

```

```bash
    Docker run ... --device /dev/ttyUSB0:/dev/ttyUSB0 ...
    ```

```

### 优化

Home Assistant 容器使用替代内存分配库 [jemalloc](http://jemalloc.net/) 以获得更好的内存管理和 Python 运行时加速。

由于使用的 jemalloc 配置可能在某些具有大于 4K 页大小的硬件上引起问题（如某些特定的 ARM64 SoC），可以通过传递环境变量 `DISABLE_JEMALLOC` 与任何值来禁用它，例如：


**Docker CLI**

```

```bash
    Docker run ... -e "DISABLE_JEMALLOC=true" ...
    ```

```

错误消息 `<jemalloc>: Unsupported system page size` 是一个已知的指示器。
