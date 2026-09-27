# DNS IP

**DNS IP** 集成会通过 DNS 解析获取 IP 地址，并将其作为实体值显示，每 2 分钟更新一次。根据解析器的可访问性，它会分别提供 IPv4 和 IPv6 查询传感器。

1. 使用默认值启用该集成后，它会向 [OpenDNS](https://www.opendns.com/) 的名称服务器查询主机名 `myip.opendns.com`，该名称会解析为您的外部或公网 IP 地址。
2. 如果您指定了 `hostname`，则会执行常规 DNS 查询，并返回该主机名解析到的 IP 地址。如果主机名解析出多个 IP 地址，状态值会返回其中最小的 IP。前 10 个 IP 会按升序显示在 `ip_addresses` 属性中。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Options

To define options for DNS IP, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of DNS IP are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Resolver:
  description: "您可以通过设置任意名称服务器 IP 地址来覆盖默认使用的 IPV4 和 IPV6 名称服务器，例如 `1.1.1.1`（IPV4）或 `2606:4700:4700::1111`（IPV6）。"
Port:
  description: "您可以覆盖默认的 DNS 端口 `53`。这在绕过 DNS 过滤或重定向时可能会有帮助。"
```
