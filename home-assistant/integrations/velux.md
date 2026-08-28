# Velux

[Velux](https://www.velux.com/) Home Assistant 集成允许您连接到 Velux KLF 200 接口，从而控制 [io-homecontrol](http://www.io-homecontrol.com) 设备，例如窗户、窗帘、灯光和开关。该集成还允许您启动在 KLF 200 上配置的场景。

KLF 200 设备至少需要高于 2.0.0.0 的固件版本。您可以从[厂商网站](https://www.velux.com/klf200)获取固件镜像，并通过 KLF 200 的 Web 界面导入。

Home Assistant 目前支持以下设备类型：

* Binary sensor（报告支持该功能的窗户的雨水检测状态）
* Button（网关设备上的重启按钮，用于重启 KLF 200 网关）
* Cover
* Light
* Number（控制连接到网关的外部加热设备功率等级，范围为 0% 到 100%）
* Scene
* Switch

受支持窗户的雨量传感器不会自动上报，必须每 5 分钟轮询一次。因此，这些实体默认处于禁用状态，因为轮询比仅上报窗户位置变化更占用无线带宽和电池电量。

## 前提条件

1. 确保您已获取网关无线接入点的密码。
   * 您可以在 KLF 200 设备底部找到该密码。
   * 它不是 Web 登录密码。
2. 重启或断电再上电 KLF 200 设备。
   * 您必须在设备重启后的 5 分钟内完成配置，此时其 Wi-Fi 接入点仍然可见。
3. 配置期间，请让 Home Assistant 保持连接到您的常规网络。
   * 不要连接到设备自己的无线接入点。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

配置期间，系统会要求您输入主机名和密码：

```yaml
Hostname:
    description: "KLF 200 网关的 IP 地址或主机名。您可以在路由器中找到它。"
Password:
    description: "网关无线接入点的密码。您可以在设备底部找到它。它不是 Web 登录密码。"
```

请记住：您必须在 KLF 200 网关重启后的 5 分钟内完成配置。如果未能及时完成并导致设置失败，请重新断电再上电设备后重试。

## 移除集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 不受支持的硬件

### Velux KLF 150

此集成不支持 Velux KLF 150，尽管 Velux 将其宣传为已停产 KLF 200 的替代产品。与 KLF 200 不同，KLF 150 不提供可供 Home Assistant 直接通信的本地 API。

不过，社区中有一个[项目](https://github.com/uncaught/gpio-shutter-bridge)可将 KLF 150 的 GPIO 接口桥接到 MQTT。配合额外硬件使用该项目后，您可以通过 [MQTT Cover 集成](/home-assistant/integrations/cover.mqtt/index.md) 控制 KLF 150。

### Velux Active (KIX 300)

此集成不支持 Velux Active（KIX 300）套装。若要将 Velux Active（KIX 300）接入 Home Assistant，您可以使用 [HomeKit Controller](/home-assistant/integrations/homekit_controller.md) 集成，从而完整控制窗户、窗帘、遮阳设备，以及 KLA 300 空气质量传感器等。

使用 HomeKit 配对方式添加 Velux Active 网关（配对码位于 Velux Active 网关底部的贴纸上）后，连接到该网关的设备（包括传感器）将被自动发现并添加到 Home Assistant。
