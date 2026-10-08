# Glances

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

* 对于每个检测到的磁盘（或挂载点），将创建以下传感器：
  * disk\_use\_percent：已使用的磁盘空间百分比。
  * disk\_use：已使用的磁盘空间。
  * disk\_free：空闲磁盘空间。
* 对于每个检测到的物理磁盘，将创建以下传感器：
  * diskio\_read：从设备读取数据的平均速率（兆字节/秒）。
  * diskio\_write：向设备写入数据的平均速率（兆字节/秒）。
* memory\_use\_percent：已使用的内存百分比。
* memory\_use：已使用的内存。
* memory\_free：空闲内存。
* swap\_use\_percent：已使用的交换空间百分比。
* swap\_use：已使用的交换空间。
* swap\_free：空闲交换空间。
* processor\_load：负载。
* process\_running：运行中的进程数。
* process\_total：进程总数。
* process\_thread：线程数。
* process\_sleeping：休眠中的进程数。
* cpu\_use\_percent：已使用的 CPU 百分比。
* sensor\_temp：每个提供温度的设备的温度传感器（取决于平台）。
* docker\_active：活动 Docker 容器的数量。
* docker\_cpu\_use：Docker 容器的总 CPU 使用百分比。
* docker\_memory\_use：Docker 容器使用的总内存。
* 对于每个检测到的 RAID，将创建以下传感器：
  * raid\_available：RAID 可用的设备数量。
  * raid\_used：RAID 使用的设备数量。
* 对于每个检测到的网络接口，将创建以下传感器：
  * network\_rx：自上次更新以来接收数据的平均速率（兆比特/秒）。
  * network\_tx：自上次更新以来发送数据的平均速率（兆比特/秒）。
* 对于每个检测到的 GPU（显卡），将创建以下传感器：
  * memory\_use：已使用的可用显存百分比。
  * processor\_use：GPU 处理器负载百分比。
  * temperature：GPU 报告的温度，单位摄氏度。
  * fan\_speed：GPU 风扇速度，百分比。
* uptime：服务器运行时间。

并非所有平台都能提供所有指标。例如，GPU 传感器需要安装 py3nvml Python 包，而 CPU 温度传感器需要在 Ubuntu 中安装和配置 `lmsensors`，在其他平台可能完全不可用。
