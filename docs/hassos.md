---
layout: doc
---

# 🏠 Home Assistant 中国专区

> 🌈 专为中国用户打造，彻底解决因网络导致的使用困难

## 🎯 Home Assistant OS 中国版（公测）

### ✨ 核心亮点

<div class="features-grid">

#### 🛠️ 原汁原味的官方体验
- 🟢 100% 保留官方源代码
- 🚀 仅优化升级镜像地址为中国可访问节点

#### 📚 极速集成商店 [Alone](https://anlo.ng/)
- ⚡ 内置 HACS 极速版，集成安装零报错
- 🔍 支持在集成中直接搜索添加 HACS
- 🌐 双源支持：
  - 🇨🇳 [Gitee 源](https://gitee.com/hacs-china/)
  - 🌍 [GitHub 源](https://github.com/hacs-china/)

#### 📱 海量加载项支持
- 📦 内置 400+ 中国版加载项
- 🖱️ 一键安装，流畅升级
- ✅ 彻底解决：
  - 🌐 网络问题导致的安装失败
  - 🗑️ 系统误删加载项
- 🔗 访问地址：[加载项仓库](https://gitee.com/desmond_GT/hassio-addons)

#### 📅 智能更新策略
- 🗓️ 每月 28 日统一更新版本
- 🛡️ 避免月初更新导致的集成问题
- ⏳ 比官方版本延迟约 1 个月，确保稳定性
- 📝 支持根据用户反馈调整更新频率

#### 💻 极速在线升级
- ⚡ 初始化与在线升级全面优化
- 🕒 告别漫长等待，升级体验大幅提升

#### ⚡ 完全开源透明
- 🔓 所有修改公开透明
- 🔍 支持代码审查
- 🔒 无任何后门，确保系统安全

#### 🔧 新设备适配计划
- 📈 持续扩展设备支持范围
- 💡 欢迎用户提交设备适配需求
- 🤝 共同完善生态建设

</div>

### 📥 [系统镜像下载](download.html#中国优化版系统静像下载)

---

## 🖥️ Home Assistant Supervised 中国版

### 👨‍💻 版本修改作者：[Alone](https://anlo.ng/)

### ⚠️ 系统要求
请确保您已了解[系统要求](https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md)

### 📖 简介
此安装方法可在常规操作系统上提供完整的 Home Assistant 体验。这意味着将使用 Home Assistant 方法中的所有组件，除了 Home Assistant 操作系统。该系统将运行 Home Assistant Supervisor。Supervisor 不仅仅是一个应用程序，它是一个管理整个系统的完整设备。如果设置不再符合预期值，它将进行清理、修复或将设置重置为默认值。

由于不使用 Home Assistant 操作系统，用户需要负责确保所有必需的组件都已安装并维护。所需的组件及其版本会随着时间的推移而变化。Home Assistant Supervised 作为社区支持的 DIY 解决方案的基础，按原样提供。我们只接受在全新安装、完全更新且没有额外软件包的 Debian 系统上重现的问题的错误报告。

此方法被认为是高级的，仅适用于精通 Linux 操作系统、Docker 和网络管理的专家。

### 🛠️ 安装指南

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

```bash
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

### 🖥️ 支持的机器类型

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

### ⚙️ 配置说明

默认的 `$DATA_SHARE` 路径是 `/var/lib/homeassistant`（之前是 `/usr/share/hassio`）。
该路径用于存储所有与 Home Assistant 相关的内容。

您可以在安装时通过以下方式重新配置该路径：

```bash
DATA_SHARE=/my/own/homeassistant dpkg --force-confdef --force-confold -i homeassistant-supervised.deb
```
### 🛠️ 问题排查

如果遇到问题，可以使用 `journalctl -f` 查看系统日志。如果您不熟悉 Linux 系统及其问题排查方法，我们建议您使用 Home Assistant OS。

## **🏠 Home Assistant Supervised(Docker) 中国版**

### 👨‍💻 版本修改作者：[Alone](https://anlo.ng/)

> 通过Docker安装[Home Assistant Supervised](https://github.com/hasscc/supervised-installer) (HassIO)，并对国内网络环境进行优化

| 　　　 | HAOS | Supervised | Container | Core |
|:-----:|:----:|:----------:|:---------:|:----:|
| 自动化 |  ✅  |     ✅     |     ✅    |  ✅  |
| 仪表盘 |  ✅  |     ✅     |     ✅    |  ✅  |
| 集　成 |  ✅  |     ✅     |     ✅    |  ✅  |
| 加载项 |  ✅  |     ✅     |     ❌    |  ❌  |
| 升　级 |  ✅  |     ✅     |     ❌    |  ❌  |
| 备　份 |  ✅  |     ✅     |     ✅    |  ✅  |


### 🐳 Compose 安装

```bash
HASSIO=/usr/share/hassio
mkdir -p $HASSIO
cd $HASSIO
wget https://ghrp2.hacs.vip/raw/hasscc/hass-super/main/compose.yml
docker compose up -d
```

> `/usr/share/hassio`用于存储HassIO数据，包括HA配置及Add-ons配置等，可更改为其他路径
> 
> `compose.yml`中的`docker_lib`用于存储HassIO容器及镜像等数据，会占用较大的空间，且对存储驱动有特殊要求，不要挂载到本地目录
> 
> 仅当`DEFAULT_TZ=Asia/Shanghai`时才会对国内网络环境进行优化


### 🖥️ 命令安装

```bash
# 新建用于存储容器及镜像等数据的卷，对存储驱动有特殊要求，因此不能挂载到本地目录
docker volume create hass_super_docker

# 运行容器
docker run -d \
  --name hass-super \
  -v /usr/share/hassio:/usr/share/hassio \
  -v /run/dbus:/run/dbus:ro \
  -v hass_super_docker:/var/lib/docker \
  -e DEFAULT_TZ=Asia/Shanghai \
  --device /dev/net/tun \
  --restart unless-stopped \
  --network host \
  --hostname hassio \
  --privileged \
  ghcr.nju.edu.cn/hasscc/hass-super
```

> 首次安装时，需要较长时间安装环境及拉取镜像，请耐心等待
> 
> 通过`http://192.168.xx.xx:4357`可以查看系统状态
> 
> 通过`http://192.168.xx.xx:8123`进入Home Assistant

### 🛠️ 问题排查

> 如果提示无网络连接`no host internet connection`，请尝试在[网络配置](https://my.home-assistant.io/redirect/network/)中禁用IPv6
> 
> 如果安装后超过10分钟仍然无法进入Home Assistant，请尝试执行以下命令查看日志

```bash
docker exec -it hass-super tail -f /tmp/hassio.log -n 500
docker exec -it hass-super journalctl -f -u docker -n 100
docker exec -it hass-super journalctl -f -u hassio-supervisor -n 200
docker exec -it hass-super docker logs -f hassio_supervisor
docker exec -it hass-super ha core info
docker exec -it hass-super ha core start
```


### 🎉 鸣谢
- [NJU Mirror](https://doc.nju.edu.cn/books/e1654/page/ghcr)