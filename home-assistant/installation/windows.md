# Windows

## 安装 Home Assistant Operating System

本指南介绍如何在 Windows 上使用虚拟机安装 Home Assistant。

### 下载合适的镜像

* [VirtualBox (Intel 芯片)][vdi] (.vdi)
* [VMware Workstation][vmdk] (.vmdk)
* [Hyper-V][vhdx] (.vhdx)

下载后，解压缩镜像。如果镜像是 ZIP 文件，解压缩它。

如果您已经在运行支持的虚拟机管理程序，请按照本指南操作。如果您不熟悉虚拟机，请直接在 [Home Assistant Yellow](/home-assistant/installation/yellow)、[树莓派](/home-assistant/installation/raspberrypi.md) 或 [ODROID](/home-assistant/installation/odroid.md) 上安装 Home Assistant OS。

### 创建虚拟机

将设备镜像加载到您的虚拟机管理程序中。（注意：您可以自由分配任意资源给 VM，请根据您的应用需求分配足够的资源。）

最低推荐配置：

* 2 GB RAM
* 2vCPU

### VirtualBox 配置

#### 创建虚拟机

1. 打开 VirtualBox 并选择 **新建** 按钮（蓝色星形）。
2. **名称**：输入 Home Assistant。
3. **ISO 镜像**：保留为 **无** 或 **空**。
4. **类型和版本**：选择 **Linux**，然后选择 **Oracle Linux (64-bit)**。
5. 选择 **下一步**。

#### 配置硬件

1. **基本内存**：将滑块移动到至少 **2048 MB** (2GB)。
2. **处理器数量**：将滑块移动到至少 **2**。
3. **EFI**：勾选 **启用 EFI（仅限特殊操作系统）**。这是 Home Assistant 启动所必需的。
4. 选择 **下一步**。

#### 完成向导

1. 在 **虚拟硬盘** 屏幕上，保留设置不变（它将建议创建新磁盘）。我们将在下一步将其替换为您下载的文件。
2. 选择 **完成**。

#### 附加 Home Assistant 磁盘 (VDI)

1. 在左侧列表中选择新的 "Home Assistant" VM，选择 **设置** 图标（橙色齿轮）。
2. 转到左侧菜单的 **存储** 部分。
3. 在 **存储设备** 列表中，您会看到 **控制器: SATA** 下已列出一个磁盘。右键单击该磁盘并选择 **移除附件**。这将移除空的占位符磁盘。
4. 选择 **添加硬盘** 图标（带有绿色加号的小磁盘），位于 **控制器: SATA** 旁边。
5. 在弹出的窗口中，选择顶部的 **添加** 按钮。
6. 找到并选择您之前下载并解压缩的 `.vdi` 文件。
7. 选择 **选择** 确认文件。

#### 配置网络

1. 仍在 **设置** 窗口中，转到 **网络** 部分。
2. 将 **连接方式** 从 **NAT** 更改为 **桥接网卡**。
3. 在 **名称** 下，选择您用于互联网访问的适配器。这允许 Home Assistant 与您家中的其他设备通信。
4. 选择 **确定**。

### VMware Workstation 配置

1. 启动 VMware Workstation 并选择 **创建新的虚拟机**。
2. 选择 **稍后安装操作系统**，然后选择 **Linux** > **其他 Linux 5.x 内核 64 位**。
3. 给 VM 命名，`home-assistant`，并定义一个易于访问的存储位置，例如 `C:\home-assistant`。
4. 指定磁盘大小并选择 **将虚拟磁盘存储为单个文件**。
5. 选择 **自定义硬件**。
6. 定义 VM 允许使用的内存量和核心数。
7. 移除 **新 CD/DVD** 条目。它不会被使用。
8. 连接以太网线并确保它连接到您的网络。
9. 在 **网络适配器** 下，选择 **桥接模式：直接连接到物理网络**。
   * 确保 **复制物理网络连接状态** 未选中。
   * 选择 **配置适配器**。
   * 确保所有虚拟适配器和蓝牙设备未选中。
   * 选择您的主机网络适配器。
10. 在向导结束时，选择 **完成**。

#### 编辑 VM 设置

1. 在 Windows 资源管理器中，转到新创建 VM 的存储位置，例如 `C:\home-assistant`。
2. 删除 `home-assistant.vmdk` 文件。
3. 在 `Downloads` 文件夹中，找到 `haos_ova_xx.x.vmdk` 文件。
   * 如果您还没有解压缩归档，解压缩它。
   * 在文件夹中，找到 `.vmdk` 文件并将其重命名为 `home-assistant.vmdk`。
   * 将文件（不是解压缩的文件夹）粘贴到 `C:\home-assistant` 文件夹中。
4. 右键单击 `.vmx` 文件并选择 **打开方式** > **记事本**。
5. 在 `.encoding` 下，添加一行。输入 `firmware = "efi"`。

### Hyper-V 配置

1. 打开 Hyper-V 管理器。
2. 选择 **新建** > **虚拟机**。
3. 给 VM 命名并选择存储位置。
4. 选择 **第 2 代**（Generation 2）。
5. 分配至少 2048 MB 内存。
6. 配置网络适配器。
7. 选择 **使用现有虚拟硬盘**，然后选择下载的 `.vhdx` 文件。
8. 完成向导。

### 启动虚拟机

1. 启动虚拟机。
2. 观察 Home Assistant Operating System 的启动过程。
3. 完成后，您将能够在 <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a> 访问 Home Assistant。

:::note
如果您运行的是较旧的 Windows 版本或有更严格的网络配置，您可能需要在 <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> 或 `http://X.X.X.X:8123`（将 X.X.X.X 替换为您虚拟机的 IP 地址）访问 Home Assistant。
:::

安装并可以访问 Home Assistant Operating System 后，您可以继续进行初始设置。

:::info [初始设置](/home-assistant/getting-started/onboarding/index.md)
:::

[vdi]: https://github.com/home-assistant/operating-system/releases/download//haos_ova-.vdi.zip

[vmdk]: https://github.com/home-assistant/operating-system/releases/download//haos_ova-.vmdk.zip

[vhdx]: https://github.com/home-assistant/operating-system/releases/download//haos_ova-.vhdx.zip
