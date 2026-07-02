# Home Assistant 操作系统配置

## Automatic

你可以使用带有 HassOS 的 USB 驱动器来配置网络选项、主机 SSH 访问以及安装更新。
将 USB 盘格式化为 FAT32/EXT4/NTFS，并命名为 `CONFIG`（必须全大写）。或者，你也可以在 `boot` 分区中创建一个 `CONFIG` 文件夹。在 USB 驱动器中使用以下目录结构：

```text
network/
modules/
modprobe/
udev/
authorized_keys
timesyncd.conf
hassos-xy.raucb
```

* `network` 文件夹可包含任意类型的 NetworkManager 连接文件。更多信息见 [Network][network.md]。
* `modules` 文件夹用于 modules-load 配置文件。
* `modprobe` 文件夹用于模块配置文件（/etc/modprobe.d）。
* `udev` 文件夹用于 udev 规则文件。
* `authorized_keys` 文件会在端口 `22222` 上启用调试 SSH 访问。参见 [Debugging Home Assistant][debug-homeassistant]。
* `timesyncd.conf` 文件允许你设置不同的 NTP 服务器。若没有正确可用的时间服务器，HassOS 将无法启动！
* `hassos-*.raucb` 文件是将被安装的固件 OTA 更新。这些文件可在 [release][hassos-release] 页面找到。

USB 盘上的文本文件必须使用 Unix（LF）行尾字符。如果你在 Windows 机器上创建 USB 盘，请确保使用 Notepad++、Visual Studio Code 或其他支持不同换行符的编辑器。在 Notepad++ 中，可通过 `Edit -> EOL Conversion -> Unix (LF)` 启用 LF EOL。

你可以将这个 USB 盘插入设备，系统会在启动时读取并将文件写入正确位置。你也可以稍后通过 CLI 运行 `ha os import` 触发该过程，或在 OS shell 中运行 `systemctl restart hassos-config`。*在这个设置过程中，USB 盘只需要插在设备上，之后即可移除。*

## Local

### Bootargs

你可以在 boot 分区中编辑或创建 `cmdline.txt`。bootloader 会读取该文件。

### Kernel-Module

内核模块目录 `/etc/modules-load.d` 是持久化的，你可以在其中添加自己的配置文件。参见 [Systemd modules load][systemd-modules]。你也可以在 `/etc/modprobe.d` 中添加模块配置文件，该目录同样是持久化的。

### Udev rules

udev 规则目录 `/etc/udev/rules.d` 是持久化的，你可以在其中添加自己的配置文件。

### Network

你可以手动在 `/etc/NetworkManager/system-connections` 中添加、编辑或删除连接配置。

### NTP

你可以手动编辑位于 `/etc/systemd/timesyncd.conf` 的 systemd timesync 文件。

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
