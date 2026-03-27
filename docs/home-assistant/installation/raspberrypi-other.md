---
title: 树莓派高级安装
description: '虽然我们推荐使用 Home Assistant Operating System，但您也可以通过 Home Assistant Container 安装 Home Assistant。继续之前，请先了解它与 Home Assistant Operating System 相比的限制和差异。'
---
# 树莓派高级安装

虽然我们推荐使用 **Home Assistant Operating System**，但您也可以通过 **Home Assistant Container** 安装 Home Assistant。继续之前，请先了解它与 **Home Assistant Operating System** 相比的限制和差异。更多信息请参阅[安装页面](/home-assistant/installation/#about-installation-methods)。最重要的一点是，<a href="/home-assistant/addons">附加组件</a>仅适用于 Home Assistant Operating System。

## 安装 Home Assistant Container

以下说明适用于在您自行管理的容器环境中安装并运行 **Home Assistant Container**。任何兼容 [OCI](https://opencontainers.org/) 的运行时都可以使用，但本指南重点介绍 Docker。

:::note
此安装类型**无法使用附加组件**。如果您想使用附加组件，需要选择其他安装类型。推荐使用 **Home Assistant Operating System**。差异请参阅[安装类型概览表](https://www.home-assistant.io/installation/#about-installation-types)。
:::

:::important

<b>前提条件</b>
本指南假设您已经完成操作系统设置，并安装了容器运行时（例如 Docker）。

如果您使用 Docker，则需要 Docker Engine 23.0.0 或更高版本。Docker _Desktop_ 不适用；您必须使用 Docker _Engine_。

:::

### 平台安装

使用 Docker 安装非常简单。请根据实际情况调整下面的命令：

- `/PATH_TO_YOUR_CONFIG` 指向您要存储配置的文件夹，并确保保留 `:/config` 部分。
- `MY_TIME_ZONE` 是 [tz 数据库名称](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)，例如 `TZ=America/Los_Angeles`。
- D-Bus 是可选的，但如果您计划使用[蓝牙集成](/home-assistant/integrations/bluetooth)，则必须启用。

### Synology NAS

运行 DSM 的 Synology 现已通过 Container Manager 套件支持容器管理，因此您无需命令行即可安装 Home Assistant。有关该套件的详细信息（包括兼容性信息以及您的 NAS 是否受支持），请参阅 <https://www.synology.com/en-us/dsm/packages/ContainerManager>。

步骤如下：

- 使用 Synology 的套件中心安装 **Container Manager**。
- 启动 Container Manager 应用并进入 **Registry** 部分。
- 在注册表页面搜索 `homeassistant/home-assistant`，然后选择 **Download**。选择 **stable** 标签。
- 等待镜像拉取完成。
- 进入 Container Manager 应用的 **Image** 部分。
- 选择 `homeassistant/home-assistant` 镜像并点击 **Run**。
- 在 **General Settings** 页面中：
  - 选择您想要的容器名称（例如 `homeassistant`）。
  - 如有需要，启用 **Enable auto-restart**。
  - 选择 **Next**。
- 在 **Advanced Settings** 页面中：
  - 在 **Volume Settings** 部分，选择 **Add Folder**，然后选择现有文件夹或创建新文件夹（例如在 `docker` 共享文件夹中创建 `homeassistant` 文件夹，并在其中再创建一个 `config` 文件夹），然后选择 **Select**。接着将 **Mount path** 修改为 `/config`，权限设为 **Read/Write**。这决定了 Home Assistant 存储配置和日志的位置。
  - 为确保 Home Assistant 显示正确时区，在 **Environment** 部分点击 **Add**，在 **Variable** 中输入 `TZ`，在值中输入您的时区（例如 `Europe/London`）。时区列表可在[这里](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)找到。
  - 在 **Network** 部分，将网络下拉菜单设置为 `host`。
- 选择 **Next**。
- 确保勾选 **Run this container after the wizard is finished**，然后选择 **Done**。
- 现在，Docker 中的 Home Assistant 应已运行，并通过 Docker 主机的 8123 端口提供 Web 界面（即您的 Synology NAS IP 地址，例如 `http://192.168.1.10:8123`）。

如果您启用了内置防火墙，还必须将端口 8123 添加到允许列表中。可在 **Control Panel** > **Security** > **Firewall** 中完成。选择 **Firewall Profile** 下拉框旁边的 **Edit Rules**，创建新规则，为端口选择 **Custom** 并添加 8123。您也可以按需编辑源 IP，或保留默认的 **All**。操作应保持为 **Allow**。

如果您想通过 Z-Wave USB 适配器控制 Z-Wave，HA Docker 容器需要额外配置才能访问 USB 适配器。虽然有多种实现方式，但在撰写本文时，权限最小化的做法仍需要通过终端完成。有关如何在 Synology NAS 上启用终端访问，请参阅：

<https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_terminal>

:::tip
[请参阅此页面，了解如何通过 SSH 访问终端](https://www.synology.com/en-global/knowledgebase/DSM/tutorial/General_Setup/How_to_login_to_DSM_with_root_permission_via_SSH_Telnet)
:::

请按如下方式调整终端命令：

- 将 `/PATH_TO_YOUR_CONFIG` 替换为您要存储配置的文件夹，并确保保留 `:/config`。
- 将 `/PATH_TO_YOUR_USB_STICK` 替换为您的 USB 适配器路径（例如，大多数 Synology 用户使用 `/dev/ttyACM0`）。
- 将 `Australia/Melbourne` 替换为[您的时区](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。

然后在终端中运行：

```bash
sudo docker run --restart always -d --name homeassistant -v /PATH_TO_YOUR_CONFIG:/config --device=/PATH_TO_YOUR_USB_STICK -e TZ=Australia/Melbourne --net=host ghcr.io/home-assistant/home-assistant:stable
```

其余的 Z-Wave 配置请[按照此处说明](/home-assistant/integrations/zwave_js)完成。

备注：要在 Synology NAS 上更新 Docker 中的 Home Assistant，只需执行以下操作：

- 打开 **Container Manager** 并进入 **Image** 部分。
- 找到 `homeassistant/home-assistant` 并选择 **Update**。
- 等待系统消息或通知弹出，提示下载已完成（此处没有进度条）。
- 进入 **Container** 部分。
- 如果容器正在运行，请先停止。
- 右键点击容器并选择 **Action** > **Reset**。由于所有文件都保存在配置目录中，因此不会丢失数据。
- 再次启动容器，它将使用新的 Home Assistant 镜像启动。

备注：要在 Synology NAS 上重启 Home Assistant，只需执行以下操作：

- 打开 **Container Manager** 并进入 **Container** 部分。
- 右键点击容器并选择 **Action** > **Restart**。

:::note

如果您想在 Synology Docker 上运行的 Home Assistant 中使用 USB 蓝牙适配器或 Z-Wave USB 适配器，上述步骤并未正确配置容器对 USB 设备的访问。要在 Synology Docker Home Assistant 中正确配置这些设备，您可以参考 Phil Hawthorne 提供的[说明](https://philhawthorne.com/installing-home-assistant-io-on-a-synology-diskstation-nas/)。

:::

### QNAP NAS

运行 QTS 的 QNAP 支持 Docker，因此您可以无需命令行直接安装 Home Assistant。有关该套件的详细信息（包括兼容性信息以及您的 NAS 是否受支持），请参阅 <https://www.qnap.com/solution/container_station/en/index.php>。

步骤如下：

- 在您的 QNAP NAS 上安装 **Container Station** 套件。
- 启动 Container Station 并进入 **Create Container** 部分。
- 使用 Docker Hub 搜索镜像 `homeassistant/home-assistant` 并选择 **Install**。
- 选择 **stable** 版本并点击 **Next**。
- 选择您想要的容器名称（例如 `homeassistant`）。
- 选择 **Advanced Settings**。
- 在 **Shared Folders** 中选择 **Volume from host** > **Add**，然后选择现有文件夹或创建新文件夹。挂载点必须为 `/config`，以便 Home Assistant 存储配置和日志。
- 在 **Network** 中将网络模式设置为 **Host**。
- 为确保 Home Assistant 显示正确时区，请进入 **Environment** 选项卡并点击加号，然后添加 `variable` = `TZ` 和 `value` = `Europe/London`；请替换为[您的正确时区](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。
- 选择 **Create**。
- 等待 NAS 创建容器。
- 现在，Docker 中的 Home Assistant 应已运行，并通过 Docker 主机的 8123 端口提供 Web 界面（即您的 QNAP NAS IP 地址，例如 `http://192.xxx.xxx.xxx:8123`）。

备注：要在 QNAP NAS 上更新 Docker 中的 Home Assistant，只需删除容器和镜像后重新执行上述步骤（不要删除 `config` 文件夹）。

### 社区说明

请注意，一些用户报告称，在 ARM 架构的 QNAP 系统（例如 TS-233）上使用 Container Station 3 创建 Home Assistant 容器时会遇到问题。一个可能的解决办法是改用基于 YAML 文件的 **Docker compose** 方法（见 **Docker compose** 一节）。在 QNAP Container Station 3 的界面中，可通过进入 **Applications** 部分并选择 **Create** 来使用该方式。随后系统会提示您输入 YAML 代码，您可以复制 **Docker compose** 一节中的示例。请注意做两处修改：首先，在第一行加入 `version: '3'`；其次，将 `/PATH_TO_YOUR_CONFIG` 替换为 NAS 上的有效路径，例如 `/share/Container/HomeAssistant/config`。

**安装**

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /run/dbus:/run/dbus:ro \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

一旦 Home Assistant 容器启动完成，您就可以通过 `http://<host>:8123` 访问 Home Assistant（请将 `<host>` 替换为系统的主机名或 IP 地址）。接下来可以继续进行初始设置。

:::info [初始设置](/home-assistant/getting-started/onboarding/)
:::

### 重启 Home Assistant

如果您修改了配置，则必须重启服务器。您有 3 种方法可以完成此操作。

1. 在 Home Assistant UI 中，前往 [**设置** > **系统**](https://my.home-assistant.io/redirect/config/)，然后在右上角打开三点 `[mdi:dots-vertical]` 菜单，选择 **重启 Home Assistant**。
2. 前往 [**设置** > **开发者工具** > **操作**](https://my.home-assistant.io/redirect/developer_services/)，选择 `homeassistant.restart`，然后点击 **执行操作**。
3. 从终端中重启。

**Docker CLI**

```bash
docker restart homeassistant
```

### Docker compose

:::tip
`docker compose` 通常[已预装](https://www.docker.com/blog/announcing-compose-v2-general-availability/)在您的系统中。如果没有，您也可以[手动安装](https://docs.docker.com/compose/install/linux/)。
:::

随着 Docker 命令变得越来越复杂，改用 `docker compose` 往往更方便，也支持在失败或系统重启后自动重启。创建一个 `compose.yaml` 文件：

```yaml
services:
  homeassistant:
    container_name: homeassistant
    image: ghcr.io/home-assistant/home-assistant:stable
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

运行以下命令启动：

```bash
docker compose up -d
```

一旦 Home Assistant 容器启动完成，您就可以通过 `http://<host>:8123` 访问 Home Assistant（请将 `<host>` 替换为系统的主机名或 IP 地址）。接下来可以继续进行初始设置。

:::info [初始设置](/home-assistant/getting-started/onboarding/)
:::

### 暴露设备

为了使用 Zigbee 或其他需要访问设备的集成，您需要将相应设备映射到容器中。请确保运行容器的用户具备访问 `/dev/tty*` 文件的正确权限，然后将设备映射添加到容器配置中：

**Docker CLI**

```bash
docker run ... --device /dev/ttyUSB0:/dev/ttyUSB0 ...
```

### 优化

Home Assistant Container 使用替代内存分配库 [jemalloc](http://jemalloc.net/) 来改善内存管理并提升 Python 运行时性能。

由于当前使用的 jemalloc 配置可能会在某些页大小大于 4K 的硬件上引发问题（例如特定的 ARM64 SoC），您可以传入任意值的环境变量 `DISABLE_JEMALLOC` 来禁用它，例如：

**Docker CLI**

```bash
docker run ... -e "DISABLE_JEMALLOC=true" ...
```

错误信息 `<jemalloc>: Unsupported system page size` 是一个已知指示信号。
