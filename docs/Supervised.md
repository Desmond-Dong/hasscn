# 此安装方法仅适用于高级用户

### 此版本修改作者：[Alone](https://anlo.ng/)


### 请确保您已了解[系统要求](https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md)

# 安装 Home Assistant Supervised

此安装方法可在常规操作系统上提供完整的 Home Assistant 体验。这意味着将使用 Home Assistant 方法中的所有组件，除了 Home Assistant 操作系统。该系统将运行 Home Assistant Supervisor。Supervisor 不仅仅是一个应用程序，它是一个管理整个系统的完整设备。如果设置不再符合预期值，它将进行清理、修复或将设置重置为默认值。

由于不使用 Home Assistant 操作系统，用户需要负责确保所有必需的组件都已安装并维护。所需的组件及其版本会随着时间的推移而变化。Home Assistant Supervised 作为社区支持的 DIY 解决方案的基础，按原样提供。我们只接受在全新安装、完全更新且没有额外软件包的 Debian 系统上重现的问题的错误报告。

此方法被认为是高级的，仅适用于精通 Linux 操作系统、Docker 和网络管理的专家。

## 安装

以 root 身份运行以下命令（在安装了 sudo 的机器上使用 `su -` 或 `sudo su -`）：

步骤 1：使用以下命令安装依赖项：

```bash
apt install \
apparmor \
bluez \
cifs-utils \
curl \
dbus \
iproute2 \
jq \
libglib2.0-bin \
lsb-release \
network-manager \
nfs-common \
systemd-journal-remote \
systemd-resolved \
systemd-timesyncd \
udisks2 \
wget -y
```

如果您之前没有使用过 NetworkManager，您可能会看到有关如何让 NetworkManager 管理当前网络接口的说明。

```
...
Setting up network-manager (1.42.4-1) ...

The following network interfaces were found in /etc/network/interfaces
which means they are currently configured by ifupdown:
- enp1s0
If you want to manage those interfaces with NetworkManager instead
remove their configuration from /etc/network/interfaces.
...
```

在继续之前，请按照以下步骤操作！

步骤 2：使用以下命令安装 Docker-CE：

```bash
curl -fsSL get.docker.com | sh
```

步骤 3：安装 OS-Agent：

OS-Agent 的安装说明可以在[这里](https://github.com/home-assistant/os-agent/tree/main#using-home-assistant-supervised-on-debian)找到

步骤 4：安装 Home Assistant Supervised Debian 包：

```bash
wget -O homeassistant-supervised.deb https://github.com/hasscc/supervised-installer/releases/latest/download/homeassistant-supervised.deb
apt install ./homeassistant-supervised.deb
```

## 支持的机器类型

- generic-x86-64
- odroid-c2
- odroid-c4
- odroid-n2
- odroid-xu
- qemuarm
- qemuarm-64
- qemux86
- qemux86-64
- raspberrypi
- raspberrypi2
- raspberrypi3
- raspberrypi4
- raspberrypi3-64
- raspberrypi4-64
- raspberrypi5-64
- tinker
- khadas-vim3

## 配置说明

默认的 `$DATA_SHARE` 路径是 `/var/lib/homeassistant`（之前是 `/usr/share/hassio`）。
该路径用于存储所有与 Home Assistant 相关的内容。

您可以在安装时通过以下方式重新配置该路径：

```bash
DATA_SHARE=/my/own/homeassistant dpkg --force-confdef --force-confold -i homeassistant-supervised.deb
```
## 问题排查

如果遇到问题，可以使用 `journalctl -f` 查看系统日志。如果您不熟悉 Linux 系统及其问题排查方法，我们建议您使用 Home Assistant OS。

[![Home Assistant - 开源家庭基金会项目](https://www.openhomefoundation.org/badges/home-assistant.png)](https://www.openhomefoundation.org/)