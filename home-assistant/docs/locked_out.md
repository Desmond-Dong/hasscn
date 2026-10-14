# 我被锁定了！

以下各节介绍如何从无法登录或需要恢复数据的情况中恢复。

## 忘记用户名

### 症状：我是所有者，但我忘记了用户名

您是 Home Assistant 服务器的**所有者**，但因为忘记了用户名而无法登录。

#### 解决方法

1. 检查是否满足以下条件：
   * 您正在使用 **Home Assistant Operating System**
   * 您可以访问 Home Assistant 服务器。
2. 打开与 Home Assistant 的终端连接：
   * 如果您使用的是 Home Assistant Green，请按照以下步骤[访问控制台](https://support.nabucasa.com/hc/articles/25153288092829)。
   * 如果您使用的是 Home Assistant Yellow，请按照以下步骤：
     * [从 Windows 访问控制台](https://support.nabucasa.com/hc/articles/25454894609693)
     * [从 Linux 或 macOS 访问控制台](https://support.nabucasa.com/hc/articles/25454972435357)。
   * 如果您使用的是其他系统，请连接键盘和显示器。该过程可能与 Green 使用的过程类似。
   * 如果您使用的是 Home Assistant OVA（虚拟化镜像）：
     * 通过虚拟化平台的界面（例如 Proxmox、VMware、VirtualBox）打开终端来访问系统控制台。
     * 按照特定平台的步骤与虚拟机的控制台进行交互。
3. 在终端中，输入 `auth list` 命令。
   * 此命令列出在您的 Home Assistant 上注册的所有用户。

## 忘记密码

### 症状：我是所有者，但我忘记了密码

您是 Home Assistant 的所有者或管理员，但忘记了密码。

### 解决方法：重置所有者密码

如果您是所有者或拥有管理员权限，根据您的情况，有不同的方法可以重置密码：

* [仍处于登录状态时重置密码](#to-reset-a-password-while-still-logged-in)
* [退出登录后重置所有者密码](#to-reset-an-owners-password-via-console)
* [通过容器命令行重置用户密码](#to-reset-a-users-password-via-the-容器-command-line)

#### 仍处于登录状态时重置密码

重置密码的方法取决于您的用户权限：

* 如果您是没有管理员权限的普通用户，请让所有者[为您设置新密码](/home-assistant/docs/locked_out/index.md#to-reset-a-users-password-as-an-owner-via-the-web-interface)。
* 如果您是所有者，请选择以下过程之一来重置密码。
  * 您无法从 Home Assistant 内部恢复所有者密码。
  * 每个系统只有一个所有者。您无法添加新的所有者。
* 如果您是管理员，请添加一个新用户作为管理员，并为该新用户设置一个您能记住的密码。
  1. 然后退出登录，并使用这个新用户登录。
  2. 通过这个新的管理员账户重置您的密码（然后[删除此新账户](/home-assistant/docs/locked_out/index.md#to-delete-a-user)）。
     * 您的配置将保留，您无需重新进行初始设置流程。

#### 通过控制台重置所有者密码

仅在满足以下条件时使用此过程：

* 您可以**在设备本身上**访问 Home Assistant 控制台（而不是通过应用程序的 SSH 终端）。

1. 如果您使用的是 Home Assistant Yellow 或 Green，请参阅其文档。
   * 如果您使用的是 Home Assistant Yellow，请参考以下步骤：
     * [重置 Home Assistant Yellow 上的所有者密码](https://support.nabucasa.com/hc/articles/25455301907997)
   * 如果您使用的是 Home Assistant Green，请参考以下步骤：
     * [重置 Home Assistant Green 上的所有者密码](https://support.nabucasa.com/hc/articles/25142896227357)
2. 如果您没有使用 Yellow 或 Green：连接到 Home Assistant 服务器的控制台：
   * 如果您使用的是虚拟机，请连接到您的虚拟机控制台。
   * 如果您使用的是其他开发板，请将键盘和显示器连接到您的设备并访问终端。该过程可能与 Home Assistant Green 描述的过程非常相似。
3. 打开 Home Assistant 命令行后，输入以下命令：
   * **命令**：`auth reset --interactive`
   * 这将显示用户列表。选择您的用户并在提示时输入新密码。
   * **故障排除**：如果您看到消息 `zsh: command not found: auth`，您可能不是在连接到设备本身的串行控制台中输入命令，而是在 Home Assistant 内部的终端中输入的。
4. 您现在可以使用新密码登录 Home Assistant。

#### 通过容器命令行重置用户密码

如果您在容器中运行 Home Assistant，可以使用容器中的命令行通过 `hass` 命令更改密码。以下步骤适用于 Docker 中名为 `homeassistant` 的 Home Assistant 容器。请注意，在容器中工作时，命令执行需要一些时间。

1. `docker exec -it homeassistant bash` 打开容器命令行
2. `hass` 创建默认用户（如果是您第一次使用此工具）
3. `hass --script auth --config /config change_password existing_user new_password` 更改密码
4. `exit` 退出容器命令行
5. `docker restart homeassistant` 重启容器。

#### 所有者通过 Web 界面重置用户密码

只有所有者才能更改其他用户的密码。

1. 在左下角，选择您的用户以进入 [**个人资料**](https://my.home-assistant.io/redirect/profile/) 页面，并确保已激活**高级模式**。
2. 进入 [**设置** > **用户**](https://my.home-assistant.io/redirect/people/)，选择您要更改密码的人员。
3. 在对话框底部，选择**更改密码**。
   * 注意：此功能仅对所有人可用，而非管理员。
4. 输入新密码，然后选择**确定**。
5. 再次输入新密码以确认，然后再次选择**确定**。
6. 将显示确认框，内容为**密码已成功更改**。

## 准备系统以开始新的入门设置流程

如果您丢失了与所有者账户关联的密码，并且上述步骤无法重置密码，则唯一的解决方法是开始新的入门设置流程。

* 如果您有一个外部备份，其中包含您仍然知道登录凭据的管理员账户，您可以恢复该备份。

* 如果您没有备份，重置设备将删除所有数据。

* 如果您使用的是 Home Assistant Green，[重置 Green](https://support.nabucasa.com/hc/articles/25161225495837)。

* 如果您使用的是 Home Assistant Yellow，[重置 Yellow](https://support.nabucasa.com/hc/articles/25463622043165)。

## 恢复 Home Assistant 的数据

除非您的 SD 卡/数据已损坏，否则您仍然可以访问文件或进一步进行故障排除。
有几种方法：

* 将 USB 键盘和 HDMI 显示器直接连接到树莓派。
* 取出 SD 卡并从另一台机器访问文件（最好运行 Linux 的机器）。

## 直接连接

如果您使用的是树莓派，您可能需要拔掉电源才能让显示器在启动时被识别。拔掉电源有损坏 SD 卡的风险，但您可能没有其他选择。大多数标准 USB 键盘应该可以轻松识别。

连接后，您将看到正在运行的 dmesg 日志。按回车键中断日志。
以 "root" 身份登录。没有密码。

然后您将进入 Home Assistant CLI，可以在其中运行自定义命令。这些命令与使用 SSH 应用程序运行的命令相同，但不需要在前面加 `ha`。例如：

* `core logs` 查看 Home Assistant 核心日志
* `supervisor logs` 查看 supervisor 日志
* `host reboot` 重启主机
* `dns logs` 检查 DNS
* 等等（输入 `help` 将显示更多）

## 从 SD 卡/硬盘访问文件

### 取出 SD 卡并从另一台计算机访问文件

文件位于 EXT4 分区（`hassos-data`）上，路径为 `/mnt/data/supervisor`。
使用另一台支持 EXT 的 Linux 机器可以轻松访问这些文件。

对于 Windows 或 macOS，您需要第三方软件。以下是一些选项。

* Windows：<https://www.diskinternals.com/linux-reader/>（对 SD 卡的只读访问）
* macOS：<https://osxfuse.github.io/>

## 删除用户

您需要是所有者或拥有管理员权限才能删除用户。

1. 进入 [**设置** > **用户**](https://my.home-assistant.io/redirect/people/)，选择您要删除的人员。
   * 注意：您无法删除所有者。
2. 在对话框底部，选择**删除**。
   * 将显示确认对话框。
3. 要确认，请选择**确定**。
