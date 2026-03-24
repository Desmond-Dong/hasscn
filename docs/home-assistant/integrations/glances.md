---
title: Glances
description: 关于如何将 Glances 传感器集成到 Home Assistant 的说明。
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: 0.7.3
ha_config_flow: true
ha_codeowners:
  - '@engrbm87'
ha_domain: glances
ha_platforms:
  - sensor
ha_integration_type: service
---

**Glances** 集成允许您监控由 [Glances](https://github.com/nicolargo/glances) API 提供的系统信息。这使得可以跟踪远程主机并在 Home Assistant 中显示其统计信息。

## 设置

:::important
对 Glances api 版本 2 的支持已弃用。建议将您的 Glances 服务器升级到版本 3。升级后，重新加载集成以重新连接。

:::
这些传感器需要在主机上运行 [Web 服务器模式](https://glances.readthedocs.io/en/latest/quickstart.html#web-server-mode) 的 `glances` 实例。支持的最低 `glances` 版本为 2.3。

有关自动启动 `glances` 的详细信息，请参阅[通过 Systemd 启动 Glances](https://github.com/nicolargo/glances/wiki/Start-Glances-through-Systemd)。  


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 集成实体

如果平台可用，Glances 集成将添加以下传感器：

- 对于每个检测到的磁盘（或挂载点），将创建以下传感器：
  - disk_use_percent：已使用的磁盘空间百分比。
  - disk_use：已使用的磁盘空间。
  - disk_free：空闲磁盘空间。
- 对于每个检测到的物理磁盘，将创建以下传感器：
  - diskio_read：从设备读取数据的平均速率（兆字节/秒）。
  - diskio_write：向设备写入数据的平均速率（兆字节/秒）。
- memory_use_percent：已使用的内存百分比。
- memory_use：已使用的内存。
- memory_free：空闲内存。
- swap_use_percent：已使用的交换空间百分比。
- swap_use：已使用的交换空间。
- swap_free：空闲交换空间。
- processor_load：负载。
- process_running：运行中的进程数。
- process_total：进程总数。
- process_thread：线程数。
- process_sleeping：休眠中的进程数。
- cpu_use_percent：已使用的 CPU 百分比。
- sensor_temp：每个提供温度的设备的温度传感器（取决于平台）。
- docker_active：活动 Docker 容器的数量。
- docker_cpu_use：Docker 容器的总 CPU 使用百分比。
- docker_memory_use：Docker 容器使用的总内存。
- 对于每个检测到的 RAID，将创建以下传感器：
  - raid_available：RAID 可用的设备数量。
  - raid_used：RAID 使用的设备数量。
- 对于每个检测到的网络接口，将创建以下传感器：
  - network_rx：自上次更新以来接收数据的平均速率（兆比特/秒）。
  - network_tx：自上次更新以来发送数据的平均速率（兆比特/秒）。
- 对于每个检测到的 GPU（显卡），将创建以下传感器：
  - memory_use：已使用的可用显存百分比。
  - processor_use：GPU 处理器负载百分比。
  - temperature：GPU 报告的温度，单位摄氏度。
  - fan_speed：GPU 风扇速度，百分比。
- uptime：服务器运行时间。

并非所有平台都能提供所有指标。例如，GPU 传感器需要安装 py3nvml Python 包，而 CPU 温度传感器需要在 Ubuntu 中安装和配置 `lmsensors`，在其他平台可能完全不可用。