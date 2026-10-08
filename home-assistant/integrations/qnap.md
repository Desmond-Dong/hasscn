# QNAP

**QNAP** integration 允许从您的 [QNAP NAS](https://www.qnap.com/en-us/) 获取各种统计数据。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 集成实体

QNAP 集成将添加以下传感器：

* 系统：状态、系统温度
* CPU：使用率、温度
* 内存：使用率、可用、已用、总量
* 卷：使用率、已用
* 文件夹：使用率、已用
* 硬盘：SMART 状态、使用率
* 网络：带宽、状态

### QNAP 设备支持

此集成适用于大多数（但不是全部）QNAP 设备。完整、最新的[兼容设备列表可在此处找到](https://github.com/colinodell/python-qnapstats#device-support)。

对于 QTS 5，Home Assistant 使用的 QNAP 账户需要以下权限：

* 确保您登录设备的 Web 界面并完成所有协议、警告、向导或设置步骤，因为 QNAP API 可能会阻止请求直到这些完成。
* QNAP 账户必须有权访问系统监控。这可以通过成为管理员或让管理员分配系统监控权限来实现（在 QTS 中：ControlPanel > Privilege > Delegated Administration > System Monitoring）。
