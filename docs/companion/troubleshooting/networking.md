---
title: 伴侣应用网络
id: 'networking'
---
让您的家庭在您去的任何地方都可以使用很重要，无论您是忘记关炉子还是因为警报想检查摄像头视图。

因为我们希望您的智能家居在网络上私密且安全，所以拼图的许多部分需要正确对齐，以便一切都按您的预期工作。本指南旨在帮助您了解设置对 Home Assistant 实例的网络访问的要求、一些复杂性以及我们推荐的典型解决方案：

## 基础：应用如何与您的 Home Assistant 通信
为了让应用与 HA 通信，它需要知道其地址。就在您的家庭网络内，您可能知道您的 Home Assistant 在像 `192.168.1.4` 这样的 IP 上，监听端口 8123。如果您使用 Home Assistant OS 并且没有更改任何默认设置，Home Assistant 也可以通过 [http://homeassistant.local:8123](http://homeassistant.local:8123) 访问。
这一切都很好，只要您从不将手机或平板电脑带出家门就可以完美工作，但如果您这样做呢？
最简单的方法是[订阅 Home Assistant Cloud](https://support.nabucasa.com/hc/articles/25649130769949)，每月支付[费用](https://www.nabucasa.com/pricing/)。此费用有助于支持 Home Assistant 的进一步开发。Home Assistant Cloud 充当互联网上的"智能"代理，以加密方式将您的前端从家庭隧道传输到您的手机，无论您在哪里，都不需要向来自互联网的入站流量开放您的家庭网络。

如果您不想使用 Home Assistant Cloud（这没关系，但您仍然应该订阅并享受支持 Home Assistant 的温暖感觉），您需要 Home Assistant 可以从互联网访问。这需要在路由器上打开端口并为您的 Home Assistant 在互联网上获取一个名称。虽然可以让您的 Home Assistant 在内部使用端口 8123，并让您的路由器从例如默认的 HTTPS 端口 443 进行端口转发到 8123，但出于简单性的原因，我们建议您不要这样做，这将在后面解释。您还需要为您的 Home Assistant 起一个名称，因为 `homeassistant.local` 是互联网上不存在的私有域后缀。


## 动态 DNS
大多数非商业互联网连接至少有以下两个缺点之一：您的互联网服务提供商通常不会给您静态 IP（意味着您的调制解调器/路由器分配的公共 IP 地址每隔一段时间甚至每 24 小时就会更改一次），一些 ISP 甚至不给您"真实"的 IP 地址，因为它们没有足够的地址可以分发。最后这种情况在有线电视提供商中非常常见，尤其是在亚洲/太平洋地区。如果您的 ISP 说他们使用运营商级 NAT（CG-NAT）或类似双栈精简版（DS-lite）之类的东西，您可能会遇到此问题。如果您受到影响，请参阅 CG-NAT 和 IPv6 附录。
对于动态的公共 IP 地址，解决方案很简单：通常用户选择动态 DNS 服务，例如 [duckdns.org](https://github.com/home-assistant/addons/blob/master/duckdns/README.md)，它将创建一个唯一的名称（例如 `my-home.duckdns.org`），支持通过您的路由器更新以始终指向您的公共地址。如果您在路由器的公共接口上创建了 TCP 8123 到内部 Home Assistant IP（例如 `192.168.1.4`）上的 TCP 8123 的端口转发，您的 Home Assistant 现在可以在网络上使用。此时您可以宣布胜利并停止，但不要这样做——因为此时一切都是未加密的，我们希望您以私密、安全的方式享受 HA。

## Hairpin NAT
在设置的这一点上，我们需要检查路由器的一项能力：Hairpin NAT（也称为 NAT 反射或 NAT 回环）。这意味着路由器能够将其内部（LAN）接口的请求镜像到其外部（WAN）地址，然后再返回到内部 IP 地址（在这种情况下是您的 Home Assistant），从而反射或发夹流量。检查这是否工作很容易：只需在连接到家庭网络的同时在手机或 PC 上打开浏览器，然后打开 `http://my-home.duckdns.org:8123`——如果它工作，您就有 Hairpin NAT 工作并可以继续下一部分。大多数当前的路由器开箱即支持 NAT hairpinning，但是有一些路由器（尤其是从 ISP 获得的路由器）没有此能力或已禁用。如果是这种情况，您需要检查是否可以在路由器上启用它，或者如果不能，您将需要设置 Split Brain DNS。

## 保护连接
我们将继续使用 DuckDNS 示例。使用 `http://my-home.duckdns.org:8123` 可以工作，但任何人都可以读取您的流量。让我们改变这一点！DuckDNS 插件将创建一个免费、受信任且有效的 LetsEncrypt SSL 证书，供您在 Home Assistant 上使用。只需按照[这里](https://github.com/home-assistant/addons/tree/master/duckdns)和[这里](https://github.com/home-assistant/addons/blob/master/duckdns/README.md)的安装说明操作，您将拥有安全、公共的 Home Assistant 访问权限。使用 DuckDNS 插件的好处是它使用 LetsEncrypt DNS 挑战，在请求证书期间通过创建临时 DNS 记录来证明域名的"所有权"。如果您使用 DuckDNS 以外的其他 DNS 提供商，可以使用 `Home Assistant` 的 [LetsEncrypt](https://github.com/home-assistant/addons/tree/master/letsencrypt) 插件，它支持通过 DNS 或 http 挑战证明名称所有权。后者需要在路由器上将 TCP 端口 80 端口转发到内部 Home Assistant IP 上的 TCP 端口 80。

有了 Hairpin NAT 工作和 SSL 在您的 DNS 域上，您现在可以在互联网和家中安全地访问 Home Assistant，您应该将 `external_url: my-home.duckdns.org:8123` 添加到 configuration.yaml 的 `homeassistant:` 部分。这不是严格必要的，但将有助于 iOS 应用入门期间的自动检测，因为应用将知道在哪里以及如何到达您的 Home Assistant。

## Split Brain DNS
那么什么是 split brain DNS（也称为 split horizon DNS、split-DNS），为什么我需要它？如果您的路由器不做 Hairpin NAT，您仍然需要通过公共 DNS 名称（例如 `my-home.duckdns.org`）访问您的 Home Assistant。为什么会这样？因为通过 https 和 SSL 证书的有效加密只适用于公共 DNS 名称。这意味着您服务器上的证书名称需要与您在浏览器或应用中输入的 DNS 名称匹配。这对于有 Hairpin NAT 可用时没问题，但在没有时就成为问题。在这种情况下，您需要"拆分"浏览器/应用在查找 `my-home.duckdns.org` 背后的 IP 地址时得到的答案——您需要一个答案指向家庭网络上的设备，指向您 Home Assistant 的内部 IP 地址（例如 `192.168.1.4`），另一个答案用于当您外出时（例如 `104.25.25.31`）。
最简单的解决方案是使用 Home Assistant 的 [AdGuard Home](https://github.com/hassio-addons/addon-adguard-home) 插件。这也可以在某些路由器上设置（例如 pfSense 或 UniFi Security Gateways），但我们将继续使用我们的示例指南和通过 Home Assistant 提供的工具：所以您现在安装了 AdGuard Home 插件并将路由器 DHCP 设置中的 DNS 服务器更改为您的 Home Assistant 地址。您现在应该转到[插件面板](https://my.home-assistant.io/redirect/supervisor/)中的 AdGuard Home 设置页面，然后转到 `Settings` -> `Filters` 并选择：`DNS rewrites`

在这里点击 `Add DNS rewrite` 并输入您的 `my-home.duckdns.org` 和您 Home Assistant 的内部 IP `192.168.1.4`，然后点击 `save`。现在发生的是，所有来自家庭网络内部的 `my-home.duckdns.org` 地址的 DNS 查询都将由 AdGuard 通过其自己的重写表回答，从而指向您 Home Assistant 的内部地址，而不是询问网络上的公共 DNS 服务器，这些服务器都将用您路由器的公共 IP 回答。
即使您不需要 split brain DNS，您可能也想设置这个，因为它将使您能够在互联网连接断开且 Hairpin NAT 无法工作时通过其公共名称访问 Home Assistant。减少一个对云的依赖！

## 设置应用
如果您遵循了我们所有的建议，您的应用应该会在入门期间连接到家庭 wifi 网络时自动找到您的 Home Assistant 实例。您也可以通过手动输入 `https://my-home.duckdns.org:8123` 在连接到互联网的任何地方进行入门，设置将在应用连接设置的 `External URL` 字段中完成该地址。不需要输入内部 URL，因为无论您的手机连接到哪里，相同的地址都可以工作。

如果您想（或必须）使用 Home Assistant Cloud 或根据您连接的网络使用不同的 URL，则需要更多步骤：

-   在系统设置中，将 Home Assistant 的位置访问权限在 iOS 上设置为"始终"，在 Android 上设置为"始终允许"。这是必需的，因为 iOS 13 及更新版本和所有 Android 版本只允许具有此类权限的应用访问 wifi SSID，应用使用它来确定是使用内部还是外部 URL。
-   授予权限后，将您的 Home Assistant 地址添加到内部 URL（如果您从本文顶部开始，这可能是 `http://homeassistant.local:8123`）
-  <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 如果您在 Home Assistant 中设置了 Home Assistant Cloud，那么"通过云连接"复选框现在应该可用。一旦您激活复选框，外部 URL 将变为停用状态。
-  <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 手动将您的 Home Assistant 外部 URL 更改为您的 Home Assistant Cloud URL。

:::note 使用 BSSID 而不是 SSID
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 您还可以在应用设置中输入 wifi 网络 BSSID，以防您有多个具有相同 SSID 的接入点，并且只想在连接到特定接入点时使用内部 URL。为此，添加一个新的 SSID，名称为 `BSSID:` 后跟 BSSID（例如：`BSSID:1A:2B:3C:4D:5E:6F`）。
:::

## 附录：CG-NAT
如果您的 ISP 不给您公共 IPv4 地址，您基本上只有两个解决方案：您可以致电您的 ISP 并询问他们是否可以给您一个真实地址，或者您的连接是否有可用的升级（奇怪的是，友好地询问对许多 ISP 都有效），或者使用 Home Assistant Cloud。

## 附录：IPv6
由于 IPv6 在过去 20 年中一直在推出，很可能连同 IPv4 地址，您的家庭网络也被提供了来自 ISP 的 IPv6 地址。所以您的 Home Assistant 主机可能有其 IPv4 地址 `192.168.1.4` 以及 IPv6 地址 `2001:db8:1042::51c1:28d8:3bdc:6724`。这就是我们建议不要更改转发到 Home Assistant 的 TCP 端口的地方：
-   Home Assistant 将监听 `192.168.1.4:8123` *和* `[2001:db8:1042::51c1:28d8:3bdc:6724]:8123` 上的流量
-   如果您真的想让您的设置面向未来，您将有两条 `my-home.duckdns.org` 的 DNS 记录：一条指向您路由器公共 IPv4 地址的 A 记录，该地址将端口转发到您 HA 主机的内部地址，以及一条 AAAA 记录，直接指向您 HA 主机的 IPv6 地址。现在，当您远程访问 HA 时，可以使用任一协议，因为您输入的只是 `https://my-home.duckdns.org:8123`。如果您将路由器上的端口更改为 https 默认的 443，那么如果您突然有了工作的 IPv6 设置，连接现在将失败，因为没有任何东西在监听 `[2001:db8:1042::51c1:28d8:3bdc:6724]:443`。

## 附录：通过 NGINX 反向代理
有些情况下，让 Home Assistant 提供 https 是不可能的或与您的某些设备不兼容。这对于通过 RestAPI 通信且只是没有能力进行 SSL 加密的基于 ESP 的低功耗 IoT 硬件来说尤其如此。一个例子是 [konnected.io 集成](https://www.home-assistant.io/integrations/konnected/)，它需要 Home Assistant 可以通过 http 访问。
所以为了适应这一点并仍然为外部访问提供加密，我们使用像 [NGINX](https://www.home-assistant.io/docs/ecosystem/nginx/) 这样的反向代理。反向代理的作用是作为客户端（浏览器或应用）的中间人。客户端通过 https 与反向代理安全通信，代理通过未加密的 http 连接将此流量传递给 Home Assistant。继续我们的 Home Assistant 示例，我们假设您已经设置了 DuckDNS 和 LetsEncrypt。您现在应该安装 Home Assistant 的 [NGINX Home Assistant SSL proxy](https://www.home-assistant.io/addons/nginx_proxy/) 插件并根据文档进行配置。

在您的 configuration.yaml 文件中需要进行以下更改：
```
homeassistant:
  external_url: https://my-home.duckdns.org # 注意这里不再有 :8123 端口

http:
  use_x_forwarded_for: true     # 确保 HA 理解客户端请求来自反向代理
  trusted_proxies:
    - 172.30.32.0/23            # 在 Home Assistant 中，我们需要添加 Docker 子网
    - 127.0.0.1                 # 添加 localhost IPv4 地址
    - ::1                       # 添加 localhost IPv6 地址
  # 注释或删除 SSL 证书行：
  # ssl_certificate: /ssl/fullchain.pem
  # ssl_key: /ssl/privkey.pem
```
完成后，您的路由器的端口转发应该是 `TCP 443` 到您的 Home Assistant 内部 IP `192.168.1.4 端口 443`。不要创建到 `192.168.1.4 端口 8123` 的转发，因为那是未加密的 http，应该只能从本地网络访问。
您现在可以通过 `https://my-home.duckdns.org` 在内部和外部访问您的 Home Assistant，同时让 `http://192.168.1.4:8123` 可用作未加密端点，用于像 `konnected.io` 这样的事情。
注意：如果您不使用 NGINX Home Assistant 插件而是自己搭建，请确保启用了 websockets 支持。

### TLS 客户端认证

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

如果您的 Home Assistant 需要 TLS 客户端认证（因为它位于配置为执行 TLS 客户端认证的反向代理后面），应用将请求证书。
请参阅您的设备和 Android 版本文档以安装证书，Pixel 手机的示例如下[添加和移除证书](https://support.google.com/pixelphone/answer/2844832)。

Wear OS 不支持使用已安装证书进行认证。应用无法自动将证书传输到 Wear OS 应用，因此在 Wear OS 应用入门期间会要求您提供证书。如果需要新证书，您必须通过从 Wear OS 应用注销来重新开始入门过程。证书（和密钥）必须作为 PKCS12 容器提供。对当前默认 PKCS12 加密方法的支持有限，但如果您的手机和手表足够新，可能会工作，所以请先尝试。只有在使用这种新格式入门失败的情况下，您才可以尝试使用旧版 PKCS12 容器。例如使用 OpenSSL，这可以通过在生成容器文件时使用 `-legacy` 标志来实现。

从 2024 年 2 月开始，[Let's Encrypt 已开始迁移到提供不再由 IdenTrust 的根 CA 证书交叉签名的密钥](https://letsencrypt.org/2023/07/10/cross-sign-expiration.html)，而是使用他们自己现在广泛受信任的根 CA 证书。未收到更新的受信任证书颁发机构列表的旧客户端会将较新的 Let's Encrypt SSL 密钥视为无效，其中包括早于 7.1.1 的 Android 版本。这将导致 Chrome 或伴侣应用显示 SSL 错误。一个简单的解决方法是使用 Firefox 访问 Home Assistant，因为它随自己更新的受信任证书颁发机构列表一起分发。另一个解决方法是手动将 Let's Encrypt 的活动 ISRG Root X1 自签名 PEM（不是 DST Root X3）安装到 Android 凭据存储中。