---
title: 遥控器 Monitoring with Glances
description: This post describes the 设置 for monitoring 遥控器 hosts with Home Assistant.
---
# 遥控器 Monitoring with Glances

<img src='/home-assistant/images/supported_brands/glances.png' style='border:none; box-shadow: none; float: right;' height='80' />
受到一个 [feature requests](https://github.com/home-assistant/home-assistant/issues/310) 的启发，我开始研究可用于监控远程主机的方案。这个功能请求希望能像 [systemmonitor](/home-assistant/integrations/systemmonitor) 传感器监控本地系统那样显示系统信息。后来我觉得，这对没有完整系统监控方案的小型家庭网络会是一个很好的补充。

<!--more-->

最基础的问题是如何从远程主机获取数据。从 systemmonitor 传感器使用的 [psutil](https://pypi.python.org/pypi/psutil) 出发，一个现成可用的方案就是 [Glances](https://github.com/nicolargo/glances)。Glances 提供了不错的 curses 界面和一个 [RESTful API](https://github.com/nicolargo/glances/wiki/The-Glances-RESTFULL-JSON-API)。

[Glances 传感器](/home-assistant/integrations/glances) 就是通过这个 API 获取所需数据。

在这篇文章中，被监控主机使用的是默认安装的 Fedora 22 Workstation。实际上，只要系统里可用 Glances，不论是本机还是远程主机都可以。稍作调整后，它也能在你的系统上工作，差异主要在软件包和防火墙管理工具上。

首先，除了 Glances 之外还需要一些额外软件包，尤其是 [bottle](http://bottlepy.org/docs/dev/index.html) Web 服务器。我猜你的发行版里也有 Glances；如果没有，请按照这些 [instructions](https://github.com/nicolargo/glances#安装) 安装。

```bash
sudo dnf -y install glances python-bottle
```

Fedora 的防火墙设置比较严格。我们先开放 61208 端口，允许其他主机连接。如果你只监控本机，则不需要这一步。

```bash
sudo firewall-cmd --permanent --add-port=61208/tcp
sudo firewall-cmd --reload
```

启动 `glances`，并观察输出。

```bash
$ glances -w
Glances web server started on http://0.0.0.0:61208/
```

然后访问 http://IP_ADRRESS:61208/，你应该能看到 Glances 的 Web 界面。

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-glances/web-glances.png' />
  Glances Web 界面
</p>

还可以再检查一次：访问位于 http://IP_ADRRESS:61208/api/2/mem/used 的 API，并确认它会返回包含内存使用详情的 JSON 响应。如果没问题，就可以继续了。

```bash
$ curl -X GET http://IP_ADDRESS:61208/api/2/mem/used
{"used": 203943936}
```

把 [glances 传感器](/home-assistant/integrations/glances) 配置项添加到 `configuration.yaml`，然后重启 Home Assistant。

```yaml
# Example configuration.yaml entry
  - platform: glances
    name: NAS
    host: IP_ADDRESS
    resources:
      - 'disk_use_percent'
      - 'disk_use'
      - 'disk_free'
```

如果日志里没有错误，你就会看到新传感器。

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-glances/sensors.png' />
  Glances 传感器
</p>

[Glances](https://github.com/nicolargo/glances) 还有一些可选依赖，可以扩展可提供的信息范围。这意味着你可以获取 RAID 系统、硬盘温度、IP 地址、传感器等更多细节。如果你做了扩展，欢迎提交 [Pull request](https://github.com/home-assistant/home-assistant/pulls)；如果你希望在 Home Assistant 前端看到更多信息，也可以提交 [Feature request](https://github.com/home-assistant/home-assistant/issues/new)。
