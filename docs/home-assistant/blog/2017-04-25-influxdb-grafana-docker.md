---
title: 使用 Docker 设置 InfluxDB 和 Grafana
description: 使用本教程在 Docker 容器中设置 InfluxDB 和 Grafana，并将其与 Home Assistant 搭配使用。
---

Home Assistant 会收集大量适合生成精美图表的（时间序列）数据。虽然 [History](/home-assistant/integrations/history/) 集成已经提供了不错的图表，但我相信你一直想要那种更强大的 [Grafana](https://grafana.com/) 图表。不过问题在于，我们大多数人用于运行 Home Assistant 的低功耗设备，比如树莓派，并不适合承担这类工作。

与其在树莓派或其他系统上运行 [InfluxDB](https://www.influxdata.com/) 和 Grafana，并采用[分别安装这两个工具的传统方法](/home-assistant/blog/2015/12/07/influxdb-and-grafana/)，你也可以把它们放到另一台机器上的 Docker 容器中运行。在这篇教程中，我使用的是 Synology NAS，但这些说明同样适用于其他可以运行 Docker 的设备。请按下面的步骤操作：

1.	通过 SSH 登录到你的 NAS。如果遇到权限错误，你可能需要运行 `sudo su`。
2.	使用下面的命令下载 [Docker-statsd-influxdb-grafana]( https://hub.Docker.com/r/samuelebistoletti/Docker-statsd-influxdb-grafana/) 镜像：
`docker pull samuelebistoletti/docker-statsd-influxdb-grafana`
3.	首次启动时，使用以下命令运行容器：
    ```bash
    docker run -d \
      --name docker-statsd-influxdb-grafana \
      -p 3003:3003 \
      -p 3004:8083 \
      -p 8086:8086 \
      -p 22022:22 \
      -p 8125:8125/udp \
      samuelebistoletti/docker-statsd-influxdb-grafana:latest
    ```
4.	现在镜像应该已经在运行，InfluxDB 和 Grafana 也都已经启动。
5.	你可以通过 http://NAS_IP_ADDRESS:3004/ 访问 InfluxDB，通过 http://NAS_IP_ADDRESS:3003/ 访问 Grafana。
6.	打开 http://NAS_IP_ADDRESS:3004/，然后使用命令 `CREATE DATABASE home_assistant` 创建数据库 `home_assistant`。
    <p class='img'>
      <img src='/home-assistant/images/blog/2017-04-influxdb-grafana/create_HA_database.png' />
    </p>
7.	现在你需要配置 Home Assistant 使用 InfluxDB。由于我们没有为数据库设置用户名或密码，所以只需将下面的内容添加到 `configuration.yaml` 中（把 IP 地址替换为运行 Docker 的设备地址），然后重启 Home Assistant 即可启用 InfluxDB（你之后可以再根据自己的需求细调配置）：
    ```yaml
    influxdb:
      host: 192.168.2.113
    ```
8.	接下来，我们需要配置 Grafana 使用 InfluxDB。打开 http://NAS_IP_ADDRESS:3003/ 进入 Grafana（用户名和密码都是 `root`），然后添加你的第一个数据源。下面是将 Grafana 配置为使用 InfluxDB 数据库的示例。注意，`192.168.2.113` 是我这台 NAS 的 IP 地址。
    <p class='img'>
      <img src='/home-assistant/images/blog/2017-04-influxdb-grafana/add_data_source.png' />
    </p>
9.	如果一切配置正确，你应该会看到 `Data source is working`。
10.	完成这些配置后，就可以开始做更有趣的事情了。你可以创建任意数量的仪表盘，然后把它们导入 Home Assistant。
11.	要在 Home Assistant 中添加 Grafana 仪表盘，请使用以下配置：
    ```yaml
    panel_iframe:
      router:
        title: "Temperature"
        url: "http://192.168.2.113:3003/dashboard/db/temperature?edit&tab=time%20range"
    ```
    这个 URL 可以通过在你的仪表盘中选择 Share dashboard 链接获得：
    <p class='img'>
      <img src='/home-assistant/images/blog/2017-04-influxdb-grafana/share_dashboard.png' />
    </p>
