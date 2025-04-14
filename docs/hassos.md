---
layout: doc
---

# 🏠 Home Assistant 针对国人优化各种极速版

> 🌈 专为中国用户打造，彻底解决因网络导致的使用困难

## **🎯 Home Assistant OS 极速版**

> **⚠️ 注意：** 既然是公测版，肯定是还有一些不太确定的 **bug** 存在，请勿当正式版使用！

如遇到 bug，请通过以下方式反馈：
- 在微信中留言
- 在 GitHub 上提 [issue](https://github.com/ha-china/HAOS-CN/issues)


### ✨ 核心亮点

#### 🛠️ 原汁原味的官方体验
- 🟢 100% 保留官方源代码
- 🚀 仅优化升级镜像地址为中国可访问节点

#### 📚 HACS 极速版 [Alone](https://anlo.ng/)
- ⚡ 内置 HACS 极速版，集成安装零报错
- 🔍 支持在集成中直接搜索添加 HACS
- 🇨🇳 [Gitee 源](https://gitee.com/hacs-china/)


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

#### [升级速度演示](https://www.bilibili.com/video/BV1judBY2ES7?t=82.3)



### 📥 [系统镜像下载](download#中国优化版系统镜像下载)
---

## **🖥️ Home Assistant Supervised 极速版**

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

## **🏠 Home Assistant Supervised(Docker) 极速版**

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

## HACS 极速版

[![version](https://img.shields.io/github/v/release/hacs-china/integration)](https://github.com/hacs-china/integration/releases/latest?include_prereleases)
[![releases](https://img.shields.io/github/downloads/hacs-china/integration/total)](https://github.com/hacs-china/integration/releases)
[![stars](https://img.shields.io/github/stars/hacs-china/integration)](https://github.com/hacs-china/integration/stargazers)

[HACS](https://hacs.xyz)是一款优秀的 [Home Assistant](https://www.home-assistant.io) 集成商店，然而国人想要使用它下载插件或前端卡片却困难重重，主要原因就是国内的网络环境。
本项目使用了[gitmirror.com](https://gitmirror.com)和[fastgit.org](https://fastgit.org)等提供的Github代理服务，可以让大家更快的下载商店里的插件。

<a name="install"></a>
### 安装/更新

> 本项目是HACS官方集成的修改版，安装本项目会覆盖官方的集成，但是无需重新配置集成(共用一套配置)，因此你可以放心安装。如果想切换到官方版本，使用官方的shell命令再安装即可。
>
> 以下几种方法任选其一！

#### 方法1️⃣: 使用命令安装

```shell
wget -O - https://get.hacs.vip | bash -

# 或

curl -fsSL get.hacs.vip | bash
```

- 如果是haos/hassio/supervised版本的HA，可直接在宿主机或`Terminal & SSH`加载项中执行上面的命令
- 如果是core/docker版本的HA，需要ssh登陆宿主机后，并cd进入到HA配置目录再执行安装命令

#### 方法2️⃣: [`加载项安装器: https://hacs.vip/get-addon`](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgitee.com%2Fhacs-china%2Faddons)

> 需要HAOS或Supervised版本的HA

1. 添加加载项仓库 [`https://gitee.com/hacs-china/addons`](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgitee.com%2Fhacs-china%2Faddons)
2. 找到`HACS极速版安装器`并安装加载项
3. 启动加载项并观察日志
4. 重启HA

#### 方法3️⃣: [`upgrade`](https://my.home-assistant.io/redirect/developer_call_service/?service=hacs.upgrade)服务

> 需要已安装HACS极速版v1.33.0.3版本及以上

1. 在开发者工具中执行服务 [`service: hacs.upgrade`](https://my.home-assistant.io/redirect/developer_call_service/?service=hacs.upgrade)
2. 重启HA使更新后的HACS生效

#### 方法4️⃣: [`shell_command`](https://my.home-assistant.io/redirect/developer_call_service/?service=shell_command.update_hacs_china)服务

1. 复制代码到HA配置文件 `configuration.yaml`
    ```yaml
    shell_command:
      update_hacs_china: |-
        wget -O - https://get.hacs.vip | bash -
    ```
2. 重启HA使配置生效
3. 在开发者工具中执行动作 [`action: shell_command.update_hacs_china`](https://my.home-assistant.io/redirect/developer_call_service/?service=shell_command.update_hacs_china)
4. 再次重启HA使更新后的HACS生效

#### 方法5️⃣: [`Docker安装`](https://hub.docker.com/r/hacn/hacn)

> 仅针对未安装HACS的**Docker**版本的HA

1. 使用命令方式安装
    ```bash
    docker run -d \
      --name homeassistant \
      --privileged \
      --restart=unless-stopped \
      -e TZ=Asia/Shanghai \
      -v /PATH_TO_YOUR_CONFIG:/config \
      -v /run/dbus:/run/dbus:ro \
      --network=host \
      hacn/hacn:stable
    ```
2. 使用Compose安装
    ```yaml
    services:
      homeassistant:
        container_name: homeassistant
        image: hacn/hacn:stable
        volumes:
          - /PATH_TO_YOUR_CONFIG:/config
          - /etc/localtime:/etc/localtime:ro
          - /run/dbus:/run/dbus:ro
        restart: unless-stopped
        privileged: true
        network_mode: host
    ```
3. 启动后[添加HACS集成](https://my.home-assistant.io/redirect/config_flow_start/?domain=hacs)

#### 方法6️⃣: 手动安装

- [点击这里下载](https://github.com/hacs-china/integration/releases/latest/download/hacs.zip)安装包并解压 (如果下载不了请点[这里](https://ghproxy.com/github.com/hacs-china/integration/releases/latest/download/hacs.zip)或[这里](https://hub.fastgit.xyz/hacs-china/integration/releases/latest/download/hacs.zip))
- 通过samba/ftp进入HA配置目录，通常为以下目录：
  - `/usr/share/hassio/homeassistant` haos/hassio宿主机
  - `/config` haos/hassio的`Samba`或`Terminal & SSH`加载项
  - `$HOME/.homeassistant` 以core方式安装的HA默认配置目录
  - docker安装的HA为`-v`参数后面映射的目录
- 在HA配置目录下创建`custom_components`文件夹 (如果已有请忽略)
- 在`custom_components`目录下创建`hacs`文件夹 (如果已有请删除重新创建)
- 將解压出来的文件复制到刚创建的`hacs`文件夹
- 重启HA
- [添加HACS集成](https://my.home-assistant.io/redirect/config_flow_start/?domain=hacs) (仅首次安装)

> ⚠️ 请不要通过下图中的位置下载HACS，会缺少文件
> ![download hacs](./images/hacs-china.png)


### 代理

> **Note**
> 
> 自v1.27.1.3开始，HACS极速版支持自定义Github API地址，如果你的HACS无法加载集成列表和集成详情，修改此选项会有所改善。
> 此前的版本仅能解决集成下载不了，而该版本后能解决大部分Github访问不了导致的大部分问题。
> 
> 不过遗憾的是，首次安装HACS时的授权过程仍然还不能被加速，如果你在授权过程中一直转圈，请稍后再试或使用其他科学的方式。

- 社区提供的免费代理：
  - `https://ghapi.hacs.vip` - [@al-one](https://github.com/al-one)
  - `https://ghapi-cf.hacs.vip/api` - [@al-one](https://github.com/al-one)
  - `https://hacs-china.chrome7.com/api` - [@goxofy](https://github.com/goxofy)
  - `https://hacs-china.casen.tk/api` - [@CasenChan](https://github.com/CasenChan)

> **Note**
> 
> 以上地址由贡献者免费提供，是由`Cloudflare Worker`搭建，每个代理每天有10万次请求次数限制，请随机使用上面的代理。
> 我们建议你使用自己的域名创建代理，当然也可以使用[`freenom.com`](https://freenom.com)的免费域名。

- 创建自己的代理：
  - 登陆或注册[`Cloudflare`](https://cloudflare.com)添加自己的域名，并修改域名的NS记录
  - [创建`Worker`服务](https://dash.cloudflare.com/?account=workers)，选择`HTTP 处理程序`
  - 复制[`index.js`](https://raw.githubusercontent.com/hacs-china/gh-proxy/master/index.js)中的代码，并张贴至Worker的代码编辑器中
  - 部署并在触发器中添加自定义域名，Worker分配的域名是无法被访问的
  - 访问`https://your.mirror.domain/api/`检查是否生效
  - 在HA的集成与服务页面找到已添加的HACS，点击`选项`
  - 填入地址`https://your.mirror.domain/api`


<a name="faq"></a>
### 常见问题

- [极速版和官方HACS的差别有那些？](https://github.com/hacs-china/integration/compare/main...china)

