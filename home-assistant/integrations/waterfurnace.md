# WaterFurnace

**WaterFurnace** 集成通过 WaterFurnace Symphony 网站使用的 WebSocket 与服务通信，以显示系统中的多个传感器。虽然这不是官方 API，但它与 Symphony 网站使用的是同一后端，因此应当具有较好的稳定性。

提供的传感器包括：

* 温控器设定温度
* 温控器当前温度
* 出风温度
* 进水回路温度
* 当前湿度
* 当前湿度设定值
* 系统总功率（瓦）
* 炉机模式
* 压缩机功率
* 风扇功率
* 辅助加热功率
* 回路水泵功率
* 压缩机转速
* 风扇转速

## 前提条件

要在安装环境中使用 WaterFurnace，您需要使用 Symphony WaterFurnace 账户配置此集成。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
username:
  description: 您的 Symphony WaterFurnace 账户邮箱地址
password:
  description: 您的 Symphony WaterFurnace 账户密码
```

## 限制

如果您的账户有多个设备或多个位置，则只会使用第一个位置中的第一个设备。

此模块使用的 WebSocket 接口需要主动轮询，以防服务器端关闭连接。默认情况下，每 10 秒轮询一次。每个轮询周期都会更新所有传感器。

虽然该集成会与温控器通信，但地热系统在不使用温度回退、并保持室内恒温时通常效率最高。采集系统数据以了解其运行表现仍然很有价值，但不会实现完整的 climate 控制界面。
