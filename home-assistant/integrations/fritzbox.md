# FRITZ!SmartHome

Home Assistant 的 **FRITZ!SmartHome** 集成允许您集成 [FRITZ! Smart Home](https://fritz.com/en/collections/smart-home/)（*前 AVM FRITZ!DECT*）设备，如插头、恒温器或快门驱动器，还可以触发所谓的智能家居模板（*包含相同类型智能家居设备的设置*）。

#### 测试设备

* FRITZ!Box 路由器
* \[FRITZ!Box 5590 纤维]\[fritzbox\_5590\_ Fiber]
* FRITZ!Box 6490 电缆
* FRITZ!Box 6591 电缆
* 弗里茨！盒子 7590
* 弗里茨！盒子 7490
* 弗里茨！盒子 7430
* \[FRITZ!Box 7590 AX]\[fritzbox\_7590\_ax]
* \[FRITZ!Box 7530 AX]\[fritzbox\_7530\_ax]
* \[FRITZ!智能网关]\[fritz\_smart\_gateway]
* FRITZ！智能家居设备
* \[FRITZ!Smart Energy 200]\[fritzdect\_200]（*前 FRITZ!DECT 200*）
* \[FRITZ!智能能源 210]\[fritzdect\_210]（*前 FRITZ!DECT 210*）
* FRITZ!Smart Thermo 301（*前 FRITZ!DECT 301*）
* \[FRITZ!Smart Thermo 302]\[fritzdect\_302]（*前 FRITZ!DECT 302*）
* 弗里茨！DECT 500
* 其他供应商的智能家居设备
* 欧洲电子彗星 DECT
* 品红色智能家居 LED E27 颜色
* 洋红色 SmartHome LED E27 暖白光
* \[Homepilot RolloTron DECT 1213]\[rademacher\_rollotron\_dect\_1213]（*前 Rademacher RolloTron DECT 1213*）

## 先决条件

请注意，在 [mesh](https://fritz.com/en/apps/knowledge-base/FRITZ-Box-7590/3329_Mesh-with-FRITZ/) 设置中，只有具有网格主机角色的 FRITZ!Box 才应添加到 FRITZ!SmartHome 集成中。

### 用户名

建议创建一个单独的用户将 Home Assistant 连接到您的 FRITZ!Box。要创建用户，请在 FRITZ!Box 中转至 **系统** > **FRITZ!Box 用户** > **用户** > **添加用户**。确保用户拥有**智能家居**权限。

:::note
如果您仍想使用预定义用户，请注意，从 FRITZ!OS 7.24 开始，如果您没有自己设置用户名，FRITZ!Box 会为管理员用户创建一个随机用户名。登录 FRITZ!Box 并访问 **系统** > **FRITZ!Box 用户** > **用户** 后可以找到此信息。用户名以 `fritz` 开头，后跟四个随机数字。在右侧的属性下，显示 `created automatically`。在 FRITZ!OS 7.24 之前，默认用户名是 `admin`。

:::
:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
主持人：
描述：“您的 FRITZ!Box 路由器的主机名或 IP 地址。”
用户名：
描述：“将 Home Assistant 连接到 FRITZ!Box 的用户名（_参见 [Username](#username)_）”
密码：
描述：“用户将 Home Assistant 连接到 FRITZ!Box 的密码（_参见 [Username](#username)_）”
```

## 数据获取和限制

由于 FRITZ!Box 的 API 不提供推送机制，因此此集成每 30 秒从 FRITZ!Box 轮询一次数据。因此，集成无法支持基于事件的设备的主要功能，例如 \[FRITZ!Smart Control 350]\[fritzdect\_350] 门/窗接触传感器或 \[FRITZ!Smart Control 440]\[fritzdect\_440] 按钮（*有关详细信息，请参阅 [other devices](#other-devices) 部分*）。

## 设备

### 灯泡

FRITZ!DECT 500 或 Magenta SmartHome LED E27 Color 等灯泡将作为灯光实体集成。

:::note
FRITZ!DECT 500 灯泡仅支持 36 种颜色。当在 Home Assistant 中选择设备不支持的颜色时，将激活接近的颜色。

:::

### 插头

\[FRITZ!Smart Energy 200]\[fritzdect\_200] 或 \[FRITZ!Smart Energy 210]\[fritzdect\_210] 等插头将作为开关实体集成。

此外，还根据每个设备的功能为其创建了额外的传感器和 binary sensor 实体：

* 通过用户界面锁定按钮
* 设备上的按钮锁定
* 电流
* 功耗
* 温度
* 总能量
* 电压

### 例程

FRITZ内自定义[routines](https://fritz.com/en/apps/knowledge-base/FRITZ-Box-7590/3707_Creating-a-routine-for-smart-home-devices)！盒子智能家居配置菜单将被集成为开关实体。这些实体可以通过 Home Assistant 激活或停用。

### 快门驱动器

\[Homepilot RolloTron DECT 1213]\[rademacher\_rollotron\_dect\_1213] 等快门驱动器将作为封面实体集成。

### 模板

FRITZ!Box 智能家居配置菜单中自定义的 [templates](https://fritz.com/en/apps/knowledge-base/FRITZ-Box-7590/3708_Creating-a-template-and-scene-for-smart-home-devices) 将集成为按钮实体，并且可以从 Home Assistant 中触发。

### 恒温器

FRITZ!Smart Thermo 系列或 Eurotronic Comet DECT 等恒温器将被集成为气候实体。

此外，还为每个设备创建了额外的传感器和 binary sensor 实体，根据其功能，这些实体可用于自动化和模板：

* 电池
* 电池电量低
* 通过用户界面锁定按钮
* 设备上的按钮锁定
* 舒适温度
* 当前预定预设
* 生态温度
* 假期模式
* 下次预定变更时间
* 下一个预定预设
* 下一个预定温度
* 检测到打开的窗口
* 夏季模式
* 温度

### 其他设备

基于事件的设备，如运动检测传感器或窗/门触点或按钮（*例如，\[FRITZ!Smart Control 350]\[fritzdect\_350] 或 \[FRITZ!Smart Control 440]\[fritzdect\_440]*）无法通过此集成进行控制或使用，但仍可以集成其传感器。

这些传感器和 binary sensor 实体的可用性取决于所连接设备的特性和功能，并且可以是以下一项或多项：

* 电池
* 电池电量低
* 通过用户界面锁定按钮
* 设备上的按钮锁定
* 湿度
* 检测到打开的窗口
* 温度

\[fritzbox\_5590\_ Fiber]：https://fritz.com/en/products/fritz-box-5590-fiber-20002981
\[fritzbox\_7590\_ax]：https://fritz.com/en/products/fritz-box-7590-ax-20002998
\[fritzbox\_7530\_ax]：https://fritz.com/en/products/fritz-box-7530-ax-20002930
\[fritzdect\_200]：https://fritz.com/en/products/fritz-dect-200-20002572
\[fritzdect\_210]：https://fritz.com/en/products/fritz-dect-210-20002723
\[fritzdect\_302]：https://fritz.com/en/products/fritz-smart-thermo-302-20003120
\[fritzdect\_350]：https://fritz.com/en/products/fritz-dect-440-20002905
\[fritzdect\_440]：https://fritz.com/en/products/fritz-smart-control-350-20003119
\[fritz\_smart\_gateway]：https://fritz.com/en/products/fritz-smart-gateway-20003012
\[rademacher\_rollotron\_dect\_1213]：https://www.rademacher.de/shop/rollladen-sonnenschutz/elektrischer-gurtwickler/rollotron-dect-1213

## 故障排除

无论如何，报告问题时，请启用 [debug logging](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)，重新启动集成，并且一旦问题再次发生，就再次停止调试日志记录（*调试日志文件的下载将自动开始*）。此外\_如果仍然可能\_，还请下载 [diagnostics](/home-assistant/integrations/diagnostics.md) 数据。如果您已收集调试日志和诊断数据，请向他们提供问题报告。

## 删除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

如果您不再使用单独创建的 FRITZ!Box 用户，请将其从 FRITZ!Box 中的 **系统** > **FRITZ!Box 用户** > **用户** 下删除。
