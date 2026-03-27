---
title: InfluxDB and Grafana
description: A step by step guide to start recording data from Home Assistant in InfluxDB
  and visualizing it using Grafana.
---
# InfluxDB and Grafana

<img src='/home-assistant/images/supported_brands/influxdb.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' /><img src='/home-assistant/images/supported_brands/grafana.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
[InfluxDB](https://influxdb.com/) 数据库是一种所谓的时间序列数据库，主要用于存储传感器数据和实时分析数据。

`influxdb` 组件可以将 Home Assistant 中所有状态变化传输到外部 [InfluxDB](https://influxdb.com/) 数据库。

<!--more-->

第一步是安装 InfluxDB 软件包。如果你不是在 Fedora 上运行，请查看[安装](https://influxdb.com/docs/v0.9/introduction/安装.html)章节了解更多细节。

```bash
sudo dnf -y install http://influxdb.s3.amazonaws.com/influxdb-0.9.5.1-1.x86_64.rpm
```

启动 InfluxDB 服务。

```bash
sudo systemctl start influxdb
```

如果一切顺利，你应该可以通过 `http://localhost:8083/` 访问数据库的 Web 界面。通过 Web 界面或命令行工具 `influx` 创建一个名为 `home_assistant` 的数据库，供 Home Assistant 使用。

<p class='img'>
  <img src='/home-assistant/images/blog/2015-12-influxdb/influxdb-frontend.png' />
  InfluxDB Web 前端
</p>

```bash
$ influx
Visit https://enterprise.influxdata.com to register for updates, InfluxDB server management, and monitoring.
Connected to http://localhost:8086 version 0.9.5.1
InfluxDB shell 0.9.5.1
> CREATE DATABASE home_assistant
```

可选步骤是创建一个用户。如果你要这样做，请记得在下一步中调整配置（添加 `username` 和 `password`）。

```bash
> CREATE USER "home-assistant" WITH PASSWORD 'password'
```

要在你的安装中使用 `influxdb` 组件，请在 `configuration.yaml` 文件中添加以下内容：

```yaml
influxdb:
  host: 127.0.0.1
```

重启 Home Assistant 后，你应该会看到 InfluxDB 数据库开始写入数据。用于查询数据库的[语法](https://influxdb.com/docs/v0.9/query_language/index.html)与 SQL 类似。

```bash
$ influx
[...]
> USE home_assistant
Using database home_assistant
> SELECT * FROM binary_sensor
name: binary_sensor
-------------------
time			domain		entity_id	value
1449496577000000000	binary_sensor	bathroom_door	0
1449496577000000000	binary_sensor	bathroom_window	0
1449496577000000000	binary_sensor	basement_door	0
1449496577000000000	binary_sensor	basement_window	0
1449496684000000000	binary_sensor	bathroom_window	1
[...]
```

[Grafana](http://grafana.org/) 是一个仪表盘工具，可以从包括 InfluxDB 在内的不同数据源创建图表。安装过程很简单，针对不同配置的详细步骤可以在 [Grafana 安装](http://docs.grafana.org/installation/)页面找到。对于较新的 Fedora 系统：

```bash
sudo dnf -y install https://grafanarel.s3.amazonaws.com/builds/grafana-2.5.0-1.x86_64.rpm
```

启动 Grafana 服务器。

```bash
sudo systemctl daemon-reload
sudo systemctl start grafana-server
sudo systemctl status grafana-server
```

访问 `http://localhost:3000/login`，使用用户名 `admin` 和密码 `admin` 登录。然后按照 [InfluxDB 设置说明](http://docs.grafana.org/datasources/influxdb/) 继续操作。

现在你就可以开始创建仪表盘和图表了。图表的数据获取方式有多种选择。下面的图像展示的是温度传感器的设置截图。

<p class='img'>
  <img src='/home-assistant/images/blog/2015-12-influxdb/grafana-settings.png' />
  Grafana 设置
</p>

如果图表没有显示在仪表盘中，你需要调整右上角的时间范围。图表是根据 Home Assistant 记录的所有状态变化生成的。

<p class='img'>
  <img src='/home-assistant/images/blog/2015-12-influxdb/grafana-graph.png' />
  Grafana 温度图表
</p>
