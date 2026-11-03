# OctoPrint

[OctoPrint](https://octoprint.org/) 是 3D 打印机的 Web 界面。这是集成 OctoPrint 传感器的主要集成。

## Configuration

To add the **OctoPrint** service to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=octoprint)

OctoPrint can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=octoprint).
* From the list, select **OctoPrint**.
* Follow the instructions on screen to complete the setup.

</details>

```yaml
username:
  description: Username for the server.
host:
  description: Address of the server, e.g., `192.168.1.32`.
port:
  description:  Port of the server.
path:
  description: URL path of the server
ssl:
  description: Whether to use SSL or not when communicating.
verify ssl:
  description: Should the SSL certificate be validated.
```

### API key

为了使集成正常工作，请检查 Octoprint 中的 [Discovery Plugin](https://docs.octoprint.org/en/master/bundledplugins/discovery.html) 是否已启用，并且在 **设置** > **打印机通知** 菜单中选中 **启用弹出窗口**。
Octoprint 集成将尝试通过[应用程序密钥插件](https://docs.octoprint.org/en/master/bundledplugins/appkeys.html) 自行注册。在 Home Assistant 中提交配置 UI 后，以您刚刚在 Home Assistant 中输入凭据的用户身份登录 Octoprint，然后在提示中选择 **允许**。

注意：您*必须*以要添加到 Home Assistant 的用户身份登录 Octoprint。如果您以任何其他用户身份登录 Octoprint，您将不会看到允许访问的提示。

## Binary sensor

OctoPrint 集成提供以下二进制传感器：

* Printing
* Print Error

## Sensor

OctoPrint 集成可让您监控 3D 打印机及其打印作业的各种状态。

Supported sensors:

* 实际床温
* 实际工具（喷嘴）温度
* 当前打印机状态
* 预计完成时间
* 工作完成百分比
* 预计开始时间
* 目标床层温度
* 目标工具（喷嘴）温度
* 当前文件名
* 当前文件大小

## Camera

如果在 OctoPrint 中配置了摄像头源，则 OctoPrint 集成可提供摄像头源。

## Buttons

OctoPrint 集成提供以下按钮：

* 暂停作业
* 重新启动系统
* 重新启动Octoprint
* 恢复工作
* 关机系统
* 停止工作

## Number

OctoPrint 集成可让您设置目标床和工具温度。这些可写属性返回与目标温度传感器相同的数据，并且还允许通过自动化、脚本或实体卡交互来更改目标温度。

* 设置目标床温度
* 设置目标工具（喷嘴）温度

## Actions

OctoPrint 集成提供以下操作，可以从自动化、脚本或作为按钮交互调用。

* Connect to printer

## Troubleshooting

### 设备已配置为第二个实例

这通常是由于在 OctoPrint 实例之间复制/备份/恢复部分配置文件引起的。

1. 通过 SSH 连接到正在添加的 OctoPrint 实例。
2. 编辑实例的“config.yaml”（通常为“/home/pi/.octoprint”）
3. 在“plugins/discovery”下，更改“upnpUuid”的值以具有不同的 uuid。
   4.重新启动OctoPrint服务
4. 尝试再次添加实例。
