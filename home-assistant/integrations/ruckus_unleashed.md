# Ruckus

**Ruckus** 集成允许您连接到 [Ruckus](https://www.ruckusnetworks.com/) 接入点。

支持 [Ruckus Unleashed](https://www.ruckusnetworks.com/products/network-control-and-management/controller-less/)、[Ruckus ZoneDirector](https://support.ruckuswireless.com/products/73)、[Ruckus SmartZone](https://www.ruckusnetworks.com/products/network-control-and-management/network-controllers/) 和 [Ruckus One](https://www.ruckusnetworks.com/products/network-control-and-management/cloud-managed/) 接入点。不支持运行 Standalone/Solo 固件的接入点。

目前在 Home Assistant 中支持以下设备类型：

* **Presence detection** - 平台会检查连接到接入点的设备，并为每个发现的设备创建一个 `device_tracker`。

## 先决条件

* 用于连接 Ruckus 控制器 Web 仪表板的 **IP 地址 / 主机名**、**用户名** 和 **密码**。

### Ruckus Unleashed

您可以将任意接入点的 **IP 地址 / 主机名** 作为 Host 输入。
如果您已配置 Unleashed Management Interface，则应优先使用它。

### Ruckus One

您需要在 Ruckus One 仪表板中创建一个 Application Token。前往 **Administration** > **Settings** 页面底部并选择 **Add Token** 链接。**Application Name** 可自定义，例如 `Home Assistant`。**Token Scope** 可设为 **Read Only**。

当 Home Assistant 提示输入 Ruckus 连接信息时，请将某个 Ruckus One 仪表板页面的完整 URL 作为 Host（例如 `https://asia.ruckus.cloud/5dd1000334cc2a01fcf28a740a6c95cf/t/dashboard`），将 Token 的 **Client ID** 作为用户名，将 Token 的 **Shared Secret** 作为密码。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 限制

此集成目前不适用于大型多场馆的 SmartZone 或 Ruckus One 网络：它无法按 Venue 或 Zone 过滤设备。

如果您为接入点配置了更长的 Client Inactivity Timeout，那么设备要被检测为 `not_home` 也会等待这么久。

## 故障排除

要让此平台正常工作，Ruckus 控制器或 Unleashed AP 必须能通过 HTTPS 访问。
如果 Home Assistant 无法连接，请确认您指定的用户可以登录 Web 仪表板，并查看 AP、WLAN 和 Client 信息。
