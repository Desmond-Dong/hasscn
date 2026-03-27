---
title: Proxmox VE
description: 'Proxmox VE(https://www.proxmox.com/en/) 是一个开源服务器虚拟化环境。此集成可让你在 Home Assistant 中监控 Proxmox VE 节点、虚拟机和容器，并公开控制操作（前提是你的 Proxmox 权限允许）。'
ha_category:
  - Binary sensor
  - Button
  - Sensor
ha_release: 0.103
ha_iot_class: Local Polling
ha_codeowners:
  - '@Corbeno'
  - '@erwindouna'
  - '@CoMPaTech'
ha_domain: proxmoxve
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
ha_config_flow: true
---
# Proxmox VE

[Proxmox VE](https://www.proxmox.com/en/) 是一个开源服务器虚拟化环境。此集成可让你在 Home Assistant 中监控 Proxmox VE 节点、虚拟机和容器，并公开控制操作（前提是你的 Proxmox 权限允许）。

## 前提条件

:::important
要在 Home Assistant 中看到实体，你至少需要在 Proxmox VE 中有一个节点，并且该节点上至少有一个虚拟机或容器。

在设置此集成之前，请确保你已创建一个具有适当权限的 Proxmox VE 用户。请参阅 [Proxmox 权限](#proxmox-permissions)。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "你的 Proxmox 实例地址。例如：`https://proxmox.example.com`。"
Port:
  description: "连接到 Proxmox 的端口。默认值为 `8006`。"
Realm:
  description: "Proxmox VE 中的认证域。默认值为 `pam`。对于专用的 Home Assistant 账户，建议使用 Proxmox VE 内置认证域并选择 `pve`（参见 [Proxmox 权限](#proxmox-permissions)）。"
Username:
  description: "用于认证的已配置用户名。"
Password:
  description: "与用户名对应的密码。"
Verify SSL certificate:
  description: "启用 SSL 证书校验以确保连接安全。"
```

## Proxmox 权限

此集成会从 Proxmox VE 读取状态与资源使用情况，并可通过 `button` 实体执行操作。

:::important
为保证安全，请为 Home Assistant 创建一个专用的 Proxmox VE 用户，并且只授予所需权限。简而言之，不要使用 `root` 账户。

:::
### 选择合适的角色

所需的最低权限取决于你希望执行的操作：

- **仅监控**（传感器和二进制传感器）：通常 **Auditor** 角色（`PVEAuditor`）就足够了。
- **监控并控制**（如启动、停止、重启等 `button` 实体）：你需要一个允许这些操作的角色，例如 **User**（`PVEVMUser`），或其他包含所需权限的自定义角色。

如果你不确定在自己的 Proxmox VE 环境中进行控制需要哪些权限，可以先使用 `PVEVMUser`，确认一切正常后，再切换到自定义角色以收紧权限。如果你需要完整但仍负责任的控制，可从 `PVEVMAdmin` 开始。

### 创建 Home Assistant 组

在创建用户之前，你需要先为该用户创建一个组。
权限既可以应用于组，也可以应用于角色。

1. 选择 **Datacenter**。
2. 打开 **Permissions** 并选择 **Groups**。
3. 点击现有组列表上方的 **Create** 按钮。
4. 为新组命名（例如 `HomeAssistant`）。
5. 点击 **Create** 确认。

### 为所有资源添加组权限

将你选择的角色在根路径（`/`）分配给该组，以便它适用于所有节点、虚拟机和容器。

1. 选择 **Datacenter**。
2. 选择 **Permissions**。
3. 打开 **Add** 并选择 **Group Permission**。
4. 在 **Path** 中选择 **/**。
5. 在 **Group** 中选择你的 Home Assistant 组（`HomeAssistant`）。
6. 在 **Role** 中选择要使用的角色，例如 **PVEAuditor**（仅监控）或 **PVEVMUser**（监控加基础操作）。
7. 确保勾选 **Propagate**。
8. 点击 **Create** 确认。

### 为 Home Assistant 创建用户

使用 `pve` 域有助于将账户限制为 API 访问，而不是 Linux 系统认证和远程（SSH）命令行访问。

:::important
如果你计划使用 `pve` 域，请确保在创建用户时选择它，并在 Home Assistant 中使用 `@pve` 后缀（例如 `hass@pve`）。

:::
1. 选择 **Datacenter**。
2. 打开 **Permissions** 并选择 **Users**。
3. 点击 **Add**。
4. 输入用户名（例如 `hass`）。
5. 将域设置为 `pve` 对应的 **Proxmox VE authentication server**（或 `pam` 对应的 **Linux PAM standard authentication**）。
6. 输入一个安全密码（可以设置得很复杂，因为你只需要将其复制粘贴到 Home Assistant 配置中）。
7. 选择之前创建的组（`HomeAssistant`），以授予对 Proxmox 的访问权限。
8. 确保勾选 **Enabled**，并将 **Expire** 设置为“永不过期”（例如留空）。
9. 点击 **Add** 确认。

## 实体

### 传感器

- **CPU**：CPU 使用百分比。
- **Max CPU**：节点/VM/LXC 上可用的最大 CPU 量。
- **Disk**：节点/VM/LXC 的磁盘使用量。
- **Max disk**：可用的最大磁盘空间。
- **Memory**：内存使用量。
- **Max memory**：节点/VM/LXC 上的最大内存量。
- **Status**：节点/VM/LXC 的当前状态。

### 二进制传感器

此集成会为每个被跟踪的虚拟机或容器自动创建一个二进制传感器。如果 VM 状态为运行中，则该二进制传感器为 on；否则为 off。

创建的传感器名称格式为 `binary_sensor.NODE_NAME_VMNAME_running`。

### 按钮

- **Start**：启动节点/VM/LXC。
- **Start all**：启动某节点上已知的所有 VM 和 LXC。
- **Stop**：停止节点/VM/LXC。
- **Stop all**：停止某节点上已知的所有 VM 和 LXC。
- **Restart**：重启 VM/LXC。
- **Reboot**：重启节点。
- **Shutdown**：关闭节点。
- **Hibernate**：让 VM 进入休眠；仅适用于 VM。
- **Reset**：重置 VM；仅适用于 VM。

## 故障排除

### 按钮无法工作

如果你想使用 `button` 实体来控制电源操作（如启动、停止、重启等），Proxmox VE 用户必须具备执行这些操作所需的权限（例如在相关路径上具有 `VM.PowerMgmt`）。如果监控功能正常但按钮操作失败，请分配一个权限更宽松的角色（或创建自定义角色）后重试。

### 诊断数据

如果你需要创建 issue 报告 bug，或想检查诊断数据，请按以下步骤获取诊断信息：

1. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，并选择你的集成和设备。
2. 在集成条目上，选择 `[mdi:dots-vertical]`。
   - 然后选择 **Download diagnostics**，系统会下载一个 JSON 文件。
3. 你可以检查下载的文件，或在被要求时将其上传到 issue 报告中。

## 移除此集成

此集成遵循标准集成移除流程。在 Home Assistant 内无需执行额外步骤。请记得清理 Proxmox 中为其配置的权限。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
