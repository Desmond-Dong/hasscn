# YouLess

Home Assistant 的 **YouLess** 集成可让您读取由 [YouLess](https://www.youless.nl/home.html) 创建的传感器中的计量值。

此集成已针对以下 YouLess 设备完成测试和验证：

* LS110
* LS120 running PVOutput firmware
* LS120 running Enologic firmware

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

此集成会创建以下传感器：

* 当前用电功率
* 燃气表读数
* 水表读数
* 当前电表读数（包括高峰和低谷）
* 太阳能回送电量读数
