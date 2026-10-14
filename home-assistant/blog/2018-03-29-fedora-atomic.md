# 在 Fedora Atomic 上运行 Home Assistant

Hackerspace [Eastermundigen](http://www.eastermundigen.ch/) 一直是我做 Home Assistant 相关实战的“试验场”，其中不少场景甚至更偏工业自动化而非家庭场景。在那里我还能接触到自己没有的设备，比如 3D 打印机、激光切割机、联网插排等。过去，当地的 Home Assistant 实例运行在一台装有 [Fedora ARM](https://arm.fedoraproject.org/) 的旧 [CubieBoard2](http://cubieboard.org/) 上。它只是多台 24/7 运行设备之一。为了降低电费，我们决定把实体机器合并成两台：一台负责存储，另一台负责其余服务。

<!--more-->

这篇文章记录了具体配置过程，也许对其他人有参考价值。我们的新系统运行的是来自 [Project Atomic](http://www.projectatomic.io) 的 Fedora 27。本文不会展开 Atomic 主机安装流程及 Project Atomic 本身细节。若需更多背景，可参考 [Benjamin Affolter](https://twitter.com/bliemli) 的[文章](https://www.puzzle.ch/博客/articles/2017/09/28/atomic-host-basic-设置-and-usage)，其中也介绍了一些基础内容。

Atomic 主机的安装流程与 Fedora Server / Fedora Workstation 基本一致。你可以制作 Live USB，或使用 PXE 启动安装。比如先启动 iPXE，再用 `chain --autofree https://boot.netboot.xyz` 链式加载 [netboot.yxz](https://netboot.xyz/)，然后按 `anaconda` 向导完成设置。

首次启动后，复制 SSH 密钥、用 `visudo` 添加用户，并完成新系统常规初始化。我们只允许密钥 SSH 登录、强制使用 `sudo`，并设置了特殊网络策略等。不过这些额外配置对普通局域网部署并非必需。

系统运行后，先检查是否为最新发布版本。

```bash
$ sudo atomic host status
State: idle; auto updates disabled
Deployments:
● ostree://fedora-atomic:fedora/27/x86_64/atomic-host
                   Version: 27.100 (2018-03-13 17:19:44)
                    Commit: 326f62b93a5cc836c97d31e73a71b6b6b6955c0f225f7651b52a693718e6aa91
              GPGSignature: Valid signature by 860E19B0AFA800A1751881A6F55E7430F5282EE4
```

当前版本是 27.100，最新是 27.105。下面先更新主机并重启。

```bash
sudo atomic host upgrade
sudo systemctl reboot
```

你也会看到 Docker 已经在运行，无需额外安装。

```bash
$ sudo systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; enabled; vendor preset: disabled)
   Active: active (running) since Thu 2018-03-28 15:44:04 CEST; 35min ago
...
```

下面我们会介绍 Home Assistant 和 [Mosquitto](https://mosquitto.org/) 的部署方式。对于这个规模较小的环境，使用 [kubernetes](https://kubernetes.io) 有点过重，因此我们选择继续用 `systemd`。

除了 `docker`，我们也可以使用命令行工具 [`atomic`](http://www.projectatomic.io/docs/usr-bin-atomic/) 完成很多任务。先下载容器镜像。我们从 [Docker Hub](https://hub.Docker.com/) 拉取镜像，因此需要添加对应 registry。

```bash
sudo atomic install docker.io/​homeassistant/home-assistant
sudo atomic install docker.io/eclipse-mosquitto
```

两个容器都需要额外目录用于持久化存储。

```bash
sudo mkdir -p /opt/home-assistant
sudo mkdir -p /opt/mosquitto/{config,data,log}
```

后续运行 Mosquitto 需要一份 `mosquitto.conf`：

```bash
sudo curl -o /opt/mosquitto/config/mosquitto.conf \
  https://raw.githubusercontent.com/eclipse/mosquitto/master/mosquitto.conf
```

为了管理容器，我们为 [Home Assistant](https://hub.Docker.com/r/homeassistant/home-assistant/) 和 [Mosquitto](https://hub.Docker.com/_/eclipse-mosquitto/) 创建 systemd 服务单元文件。示例如下。`ExecStart` 相关细节可参考 [Docker](/home-assistant/docs/installation/Docker/) 部署文档。先是 Home Assistant：

```bash
$ su
# cat <<'EOF' >> /etc/systemd/system/home-assistant.service
[Unit]
Description=Home Assistant
Requires=docker.service
Wants=docker.service
After=docker.service
 
[Service]
Restart=on-failure
RestartSec=10
ExecStart=/usr/bin/docker run --rm --name %p -v /opt/home-assistant:/config:Z -v /etc/localtime:/etc/localtime:ro --network host homeassistant/home-assistant
ExecStop=-/usr/bin/docker stop -t 30 %p
 
[Install]
WantedBy=multi-user.target
EOF
```

下面是 Mosquitto：

```bash
# cat <<'EOF' >> /etc/systemd/system/mosquitto.service
[Unit]
Description=Mosquitto MQTT docker container
Requires=docker.service
Wants=docker.service
After=docker.service

[Service]
Restart=on-failure
RestartSec=10
ExecStart=/usr/bin/docker run --name %p -v mosquitto.conf:/opt/mosquitto/config/mosquitto.conf -v /opt/mosquitto/data:/opt/mosquitto/data -v /opt/mosquitto/log:/mosquitto/log -p 1883:1883 -p 9001:9001 eclipse-mosquitto
ExecStop=/usr/bin/docker stop -t 2 %p
ExecStopPost=/usr/bin/docker rm -f %p

[Install]
WantedBy=multi-user.target
EOF
```

退出 `root` 用户：

```bash
# exit
```

重载 `systemd`，让它识别新的配置。

```bash
sudo systemctl daemon-reload
```

现在两个容器都可以通过 `systemctl` 控制。

```bash
sudo systemctl enable home-assistant.service --now
sudo systemctl enable mosquitto.service --now
```

使用 `$ sudo systemctl status [name].service` 检查服务是否报错、是否正常运行。

[NGINX](https://nginx.org/en/)（静态内容 Web 服务器）、[grafana](https://grafana.com/) 和 [InfluxBD](https://www.influxdata.com/) 的部署方式与 Home Assistant、Mosquitto 类似。若要正确配置 [traefik](https://traefik.io/)，还需要额外阅读资料并做更多配置。
