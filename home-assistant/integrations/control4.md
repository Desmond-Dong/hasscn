# Control4

**Control4** 集成允许您从本地 Control4 系统控制和监控灯光、房间媒体和气候设备。您的 Control4 控制器必须运行 OS 3.0+。

## 先决条件

设置之前，您应该在路由器上为您的 Control4 控制器分配静态 IP 地址/DHCP 保留。Home Assistant 必须能够通过本地网络与控制器通信；不支持 4Sight 远程访问。

此集成所需的用户名和密码与您用于登录 Control4 移动应用和客户门户 <https://customer.control4.com/> 的凭据相同。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 配置选项

Control4 集成在 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) > **Control4** > **选项** 中提供以下附加选项：

```yaml
更新间隔秒数:
  description: Home Assistant 从 Control4 控制器轮询状态更新的频率。轮询过于频繁可能会导致控制器出现延迟，尤其是在设备较多时。
  required: false
  type: integer
  default: 5
```
