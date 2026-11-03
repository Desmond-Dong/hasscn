# iNELS

**iNELS** 集成允许您控制和监控连接到控制单元（[BUS](https://www.elkoep.com/wired) 或 [eLAN](https://www.elkoep.com/wireless)）的设备。

目前 Home Assistant 支持以下设备类型：

* 开关

## 前提条件

* MQTT 代理。
* 刷入 `mqtt_1.0` 或更高版本的 eLAN 设备。
* 刷入 `mqtt_1.0` 或更高版本的 BUS 设备。
* 有关如何配置控制单元的说明，请参阅 [Wiki 页面](https://wiki.inels.com/)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

### 从 eLANRF 移除设置

1. 启动 **IDM** 应用程序。
2. 从菜单中选择 **中央单元配置**。
3. 选择 **MQTT 设置**，然后在模式选项中选择 **不连接**，并点击 **保存到 CU**。

### 从 CU3 移除设置

1. 打开 eLANRF **Web** 界面。
2. 转到 **设置**，并在 **MQTT 连接** 下禁用 MQTT。
