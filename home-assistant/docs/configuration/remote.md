# 远程访问

如果您希望在外出时登录 Home Assistant，则需要使您的实例能够远程访问。以下是几种实现方式。

:::tip
请记住在执行此操作之前遵循[安全检查清单](/home-assistant/docs/configuration/securing/index.md)。
:::

## Home Assistant Cloud

<a href="https://www.nabucasa.com">Home Assistant Cloud</a> 的用户可以使用 <a href="https://www.nabucasa.com/config/remote/">Home Assistant Cloud 远程访问</a>功能，无需任何配置。

系统将为您生成一个唯一的远程 URL，并提供证书，以便您与 Home Assistant 的所有流量都自动加密。

## VPN

远程访问 Home Assistant 的一种安全方式是使用虚拟专用网络 (VPN) 服务，例如 [Tailscale](https://tailscale.com/) 或 [ZeroTier One](https://www.zerotier.com/)。

在从本地网络外部连接到 Home Assistant 之前，需要先建立 VPN 连接。VPN 使此连接变得安全。当使用 Home Assistant Companion 应用程序（例如在移动设备上）时，如果没有此连接，您的传感器将不会在 Home Assistant 中更新。

## 端口转发

在您的路由器上设置端口转发（任意端口）到运行 Home Assistant 的计算机的 8123 端口。有关如何执行此操作的一般说明，可以通过搜索 `<路由器型号> 端口转发说明` 找到。您可以使用路由器上的任何空闲端口并将其转发到端口 8123。

开放端口的一个问题是，一些互联网服务提供商只提供动态 IP。这可能导致您在外出时无法访问 Home Assistant。您可以使用免费的动态 DNS 服务（如 [DuckDNS](https://www.duckdns.org/)）来解决此问题。

如果您无法远程访问您的 Home Assistant 安装，请记住检查您的 ISP 是否为您提供专用 IP，而不是通过 [CG-NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) 与其他用户共享的 IP。由于 IPv4 地址短缺，这种情况如今相当普遍。一些（如果不是大多数）ISP 会要求您支付额外费用才能获得专用 IPv4 地址。

仅仅开放端口是不安全的。如果您要远程访问 Home Assistant 安装，绝对应该考虑加密您的流量。有关详细信息，请查看[使用 Let's Encrypt 设置加密](/home-assistant/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/)博客文章或这篇关于在 Home Assistant 中使用 Let's Encrypt 的[详细指南](https://community.home-assistant.io/t/196970)。

## 将远程 URL 添加到 Home Assistant

要设置可以从本地网络外部访问您的 Home Assistant 的 URL，请按照以下步骤操作：

1. 在左下角，选择您的用户名以进入您的[**用户资料**](https://my.home-assistant.io/redirect/profile/)，并确保已启用**高级模式**。
2. 转到[**设置** > **系统** > **网络**](https://my.home-assistant.io/redirect/network/)。
3. 在 **Home Assistant URL** 下，输入您之前为您的实例设置的外部 URL。
