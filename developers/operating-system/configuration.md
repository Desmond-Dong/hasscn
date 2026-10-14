## 自动

你可以使用带有 HassOS 的 USB 驱动器来配置网络选项、对主机的 SSH 访问以及安装更新。

将一个 USB 驱动器格式化为 FAT32/EXT4/NTFS，并将其命名为 `CONFIG`（全大写）。或者，你也可以在 `boot` 分区内创建一个 `CONFIG` 文件夹。在 USB 驱动器中使用以下目录结构：

```text
network/
modules/
modprobe/
udev/
authorized_keys
timesyncd.conf
hassos-xy.raucb
```

* `network` 文件夹可以包含任何类型的 NetworkManager 连接文件。更多信息请参见 [Network][network.md]。
* `modules` 文件夹用于 modules-load 配置文件。
* `modprobe` 文件夹用于模块配置文件（/etc/modprobe.d）
* `udev` 文件夹用于 udev 规则文件。
* `authorized_keys` 文件会在端口 `22222` 上启用 debug SSH 访问。请参见 [Debugging Home Assistant][debug-homeassistant]。
* `timesyncd.conf` 文件允许你设置不同的 NTP 服务器。HassOS 在缺少正确运行的时间服务器时将无法启动！
* `hassos-*.raucb` 文件是将被安装的固件 OTA 更新包。这些可以在 [release][hassos-release] 页面中找到。

USB 驱动器上的文本文件必须使用 Unix（LF）换行符。如果你在 Windows 机器上创建 USB 驱动器，请务必使用 Notepad++、Visual Studio Code 或其他支持不同换行符的编辑器。在 Notepad++ 中，可以通过设置 `Edit -> EOL Conversion -> Unix (LF)` 启用 LF EOL。

你可以将这支 USB 驱动器插入设备，它将在启动时被读取，文件也会写入正确的位置。你也可以稍后通过 CLI 中的 `ha os import` 命令，或在 OS shell 上调用 `systemctl restart hassos-config` 来触发此过程。*USB 驱动器只需在此设置过程中插入设备，之后即可移除。*

## 本地

### Bootargs

你可以在 boot 分区中编辑或创建 `cmdline.txt`。它将被 bootloader 读取。

### Kernel-Module

内核模块文件夹 `/etc/modules-load.d` 是持久的，你可以在那里添加配置文件。请参见 [Systemd modules load][systemd-modules]。你还可以在 `/etc/modprobe.d` 中添加模块配置文件，它也是持久的。

### Udev 规则

udev 规则文件夹 `/etc/udev/rules.d` 是持久的，你可以在那里添加配置文件。

### 网络

你可以手动添加、编辑或删除 `/etc/NetworkManager/system-connections` 中的连接配置。

### NTP

你可以手动编辑 `/etc/systemd/timesyncd.conf` 上的 systemd timesync 文件。

我们的默认 NTP 配置如下：

```
[Time]
NTP=time.cloudflare.com
FallbackNTP=0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org 3.pool.ntp.org
```

[systemd-modules]: https://www.freedesktop.org/software/systemd/man/modules-load.d.html

[network.md]: /developers/operating-system/network.md

[hassos-release]: https://github.com/home-assistant/hassos/releases/

[debug-homeassistant]: https://developers.home-assistant.io/docs/operating-system/debugging
