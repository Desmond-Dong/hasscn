# PECO Outage Counter

PECO 是一家为费城都会区提供电力服务的公用事业公司。

要了解有关 PECO 的更多信息，请访问[其简介页面](https://www.peco.com/AboutUs/Pages/Default.aspx)。

:::note
此集成仅适用于 PECO 客户。要查看您所在县是否受支持，请参阅[其停电地图](https://www.peco.com/Outages/CheckOutageStatus/Pages/OutageMap.aspx)。

PECO 是 Exelon Business Services Co., LLC 的注册商标。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 可用实体

PECO Outage Counter 集成可让您获取任意县当前的停电数量，以及整个运营区域的总停电数。

* **Outage Count**：返回某个县或整个运营区域当前的停电数量。
* **Smart Meter**：可利用部分电表的智能电表功能，验证电力是否已输送到您家中。

此集成会创建以下 6 个实体：

* 一个传感器，用于显示您所在县的停电数量。
* 一个传感器，用于显示当前断电客户总数。
* 一个传感器，用于显示该县服务的客户总数。
* 一个传感器，用于显示断电客户所占百分比。
* 一个传感器，用于显示在线停电地图打开时出现的警报。
* 一个二进制传感器，用于返回您的电表状态。
