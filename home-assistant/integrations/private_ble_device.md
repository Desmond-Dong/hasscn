# Private BLE Device

有些 BLE 设备使用一种名为 Resolvable Private Addresses 的隐私特性，以防止企业在您携带智能设备外出时对您进行追踪。它不会使用一个固定不变、可被持续跟踪的静态地址，而是会频繁更换蓝牙地址。如果您已经启用了并正常使用 [Bluetooth](/home-assistant/integrations/bluetooth.md)，并且知道自己设备的 Identity Resolving Key，就可以将其作为 Private BLE Device 添加到 Home Assistant。随后，Home Assistant 就能识别哪些随机 MAC 地址与该 IRK 相关，并对其进行追踪。

除了告诉您设备是在家还是离家之外，它还可以估算设备与最近的蓝牙适配器或代理之间的距离，以及信号强度。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

在将设备添加到 Home Assistant 之前，您的设备必须处于开机并在有效广播范围内，因为系统需要确认设备可见，以验证您填写的 IRK 是否正确。

IRK 常见有两种编码表示形式：base64 编码和十六进制编码。此集成同时支持这两种格式。

## 获取 Identity Resolving Key (IRK)

### 在 macOS 上

如果您想获取 iPhone 或 Apple Watch 的 IRK，您必须在 Mac 上登录与这些设备相同的 iCloud 账户。此方法通常也适用于已与 macOS 配对的设备。

1. 打开 **Keychain Access** 应用。
2. 根据 macOS 版本不同，Keychain Access 的界面可能有所不同。在 macOS 26 中，请在左侧边栏选择 **Local Items**。在更早版本的 macOS 中，请在侧边栏选择 **iCloud**。
3. 在右上角的搜索栏中输入 `Bluetooth`。
4. 界面会显示一组 GUID 列表。
5. 选择列表中的第一条记录。在顶部的 **Account** 字段中，您应该能看到 `Public: XX:XX:XX:XX:XX:XX`（也可能是 Random，您可以忽略以 Random 开头的记录）。
6. 向下滚动记录，找到与您的 iPhone 或 Watch 匹配的 MAC 地址（您可以在手机或手表的 **Settings** > **General** > **About** 中找到）。
7. 选择 **Show password**。
8. 系统会要求您输入密码，然后再输入用户名和密码。
9. macOS 会显示一段 XML。您需要查找 **Remote IRK** 字段，后面会有一个数据字段，其中包含以 base64 编码表示的 Identity Resolving Key。

### 在 Windows 上 / 适用于 Android

如果您使用的是已 root 的 Android 手机，可以在 `/data/misc/bluedroid/bt_config.conf` 文件中查看 IRK（以及 LTK）。其中，`LE_LOCAL_KEY_IRK` 表示 Android 设备自身的 IRK，而文件中每个已配对设备的 `LE_KEY_PID` 前 16 个字节表示该配对设备的 IRK。请注意，此文件中保存的密钥采用小端序，因此需要反转字节顺序。例如，小端序 IRK `22BC0E3F2EACF08EE36B865553EA0B4E` 需要转换为 `4E0BEA5355866BE38EF0AC2E3F0EBC22`。

或者，也可以通过 Wireshark 获取 Android 手机和/或辅助设备的 IRK：

1. 在 Android 手机的开发者选项中，启用 `USB Debugging` 和 `Enable Bluetooth HCI snoop log`。
2. 确保另一台蓝牙设备（例如智能手表或耳机）尚未配对。
3. 关闭并重新开启手机蓝牙，然后重新配对该辅助设备。
4. 将 Android 手机连接到一台已安装 [adb](https://developer.android.com/tools/adb) 的电脑。
5. 建立 adb 连接（`adb connect...`），然后运行命令：`adb bugreport scanwatch`。
6. 在生成的 `scanwatch.zip` 文件中，找到并解压 `FS\data\misc\bluetooth\logs\btsnoop_hci.log`。
7. 用 [Wireshark](https://www.wireshark.org/download.html) 打开 `btsnoop_hci.log`，并搜索 `btsmp.id_resolving_key`。
8. 选择其中一个帧并展开 `Bluetooth Security Manager Protocol`。十六进制转储中会显示发送端或接收端设备的 IRK。
9. 将显示的值按字节顺序反转。例如，如果显示为 `763af6c7f7d94ad6c262158e2320544e`，则应使用的 IRK 为 `4e5420238e1562c2d64ad9f7c7f63a76`。

### 在 Windows 上 - 适用于会连接到电脑的设备

1. 从 Microsoft 获取 PsExec 工具。它包含在 [Sysinternals Suite](https://learn.microsoft.com/en-us/sysinternals/downloads/psexec) 中。下载并解压 `PsExec.exe` 或 `PsExec64.exe`。
2. 以管理员身份打开命令提示符：按 Windows 键，输入 `cmd`，右键 **Command Prompt**，然后选择 **Run as administrator**。
3. 运行 PsExec：进入 PsExec 所在目录，执行 `psexec -i -s cmd` 或 `psexec64 -i -s cmd`。该命令会打开一个拥有 SYSTEM 权限的新命令提示符窗口。
4. 验证 SYSTEM 权限：在新命令提示符窗口中输入 `whoami`，确认您已拥有 SYSTEM 权限。
5. 以 SYSTEM 权限打开注册表编辑器：在新命令提示符窗口中输入 `regedit`。
6. 查找 IRK：导航到 `HKLM\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Keys`。其中有一个子文件夹通常对应电脑蓝牙无线电的 MAC 地址，进入后再查找与您蓝牙设备 MAC 地址对应的文件夹。
7. 右键该键（文件夹）并选择导出，将 `.reg` 文件保存到某处。
8. 用记事本打开 `.reg` 文件。按 Ctrl+H 打开 **Replace** 窗口。将 **Find what:** 设置为 `,`，将 **Replace with** 设置为空，然后选择 **Replace All**。这样可移除十六进制值中的所有逗号。
9. 复制 IRK 值（仅 `hex:` 后面的部分）即可直接使用，不需要反转字节顺序。

## ESPresense

如果您已经在 ESPresence 中使用 Identity Resolving Key 进行跟踪，那么您应该已经拥有一个十六进制编码格式的 Identity Resolving Key。Home Assistant 可以直接使用这种格式的密钥。
