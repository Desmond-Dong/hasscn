# FortiOS

FortiOS 存在检测使 Home Assistant 能够跟踪具有从 [Fortinet](https://www.fortinet.com) 连接到 FortiGate 的 MAC 地址的设备。

该集成依赖于 [fortiosapi](https://pypi.org/project/fortiosapi/)。它已在运行 FortiOS v. 6.4.x（最高 6.4.8）、7.0.x（最高 7.0.4）和 7.2.0 的 FortiGate 设备和 FortiGate VM 上进行了验证。
支持的最低版本是 FortiOS 6.4.3。

所有具有 FortiGate 识别的 MAC 地址的设备都会被跟踪，这涵盖以太网和 Wi-Fi 设备，包括 LLDP 检测到的设备。

该集成基于 Home Assistant `device_tracker` 平台。

### 配置示例

此示例使用 FortiOS 集成作为设备跟踪器，带有 API 令牌，并且不验证 SSL 证书。
将以下内容添加到“`configuration.yaml`”文件中。
：：：提示
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml
device_tracker:
  - platform: fortios
    host: YOUR_HOST
    token: YOUR_API_USER_KEY
```

```yaml
主持人：
描述：FortiGate 的主机名或 IP 地址。可以选择添加端口名称，如“10.10.10.10:443”。如果添加了端口号，请记住引号。
必填：真实
类型：字符串
令牌：
描述：“请参阅：[Generate an API token for FortiOS](https://docs.fortinet.com/document/forticonverter/6.2.0/online-help/866905/connect-fortigate-device-via-api-token) 了解如何创建 API 令牌。此集成仅需要对 FortiGate 的读取访问权限，因此将 API 用户配置为仅具有有限的只读访问权限。”
必填：真实
类型：字符串
验证_ssl：
描述：是否需要验证SSL证书。在大多数家庭情况下，用户没有经过验证的证书。
必填：假
类型：布尔值
默认值：假
```
