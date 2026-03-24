---
title: Set up encryption using Let's Encrypt
description: Tutorial how to encrypt your connection with Home Assistant.
---

:::note
这篇博客文章中的说明已过时。请查看<a href='/home-assistant/博客/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/'>新说明</a>。
:::

将 Home Assistant 实例暴露到外网一直都不容易。你需要在路由器上设置端口转发，并且通常还要添加动态 DNS 服务，以应对运营商变更你的公网 IP。完成这些后，你就可以在任意地点使用 Home Assistant，但这里有一个重大隐患：没有加密。

本教程将带你一步步为 IP 设置动态 DNS，并通过 [DuckDNS] 和 [Let's Encrypt] 免费建立受信任的加密连接。

<p class='img'>
<img src='/home-assistant/images/blog/2015-12-lets-encrypt/letsencrypt-secured.png' />
</p>

<!--more-->

**更新于 2016-06-18**

### Requirements

本教程中 DuckDNS 部分没有特殊要求，但运行 Let's Encrypt 客户端目前需要满足以下条件。

  - 可直接连接互联网，或具备路由器管理权限以设置端口转发
  - 一台运行类 Unix 系统并包含 Python 2.6 或 2.7 的设备（也可使用 Docker）
  - Root 权限，用于写入默认配置、日志和库目录，并绑定 80 端口

<img src='/home-assistant/images/supported_brands/duckdns.png' style='clear: right; border:none; box-shadow: none; float: right; margin-left: 8px; margin-bottom: 8px;' width='60' />

### DuckDNS

第一步是设置 [DuckDNS]。这是一个免费的动态 DNS 服务，你可以用它申请一个指向家庭网络的 DuckDNS.org 子域名。动态 DNS 服务的工作方式是让家里的计算机每 5 分钟向 DuckDNS.org 报告一次当前 IP，这样 DuckDNS 就能确保你的域名始终指向正确地址。

在本示例中，我们假设域名是 hass-example.duckdns.org。

首先需要申请并设置域名。访问 [DuckDNS]，使用任意受支持的登录方式登录后添加域名。然后查看它们的[安装说明][duckdns-安装]来完成 DuckDNS 安装。如果你使用的是树莓派，请在 "Operating Systems" 分类中查看 "Pi"。

<img src='/home-assistant/images/supported_brands/letsencrypt.png' style='clear: right; border:none; box-shadow: none; float: right; margin-left: 8px; margin-bottom: 8px;' width='60' />

### Let's Encrypt

[Let's Encrypt] 是一个免费、自动化、开放的证书颁发机构（CA）。我们将使用它获取证书，以加密与 Home Assistant 的连接。

如果通过域名验证挑战，Let's Encrypt 会为你签发一个免费的 90 天证书。域名验证是通过让 Let's Encrypt 能够访问你域名下的特定数据来完成的（[官方解释更详细][letsencrypt-technology]）。

假设你的家庭网络位于路由器后方，首先要做的是将路由器端口转发到运行 Let's Encrypt 的计算机。对于 Let's Encrypt 设置，我们需要将外部端口 `80` 转发到内部端口 `80`（HTTP 连接）。你可以在路由器管理界面中完成此设置（[按路由器型号提供端口转发说明的网站][port-forward]）。每次向 Let's Encrypt 申请新证书时都必须启用该端口转发，通常每三个月一次。如果你平时没有应用监听 `80` 端口，一般可以长期保持该端口开放，这样续期会更方便。

现在你已经可以安装并运行向 Let's Encrypt 申请证书的客户端。下面示例将使用跨平台脚本安装并运行 Let's Encrypt 的 [certbot][certbot] 客户端。如果你的操作系统有 certbot 软件包，建议优先安装软件包，而不是使用跨平台脚本。更多信息请阅读 [docs][certbot]。此外，还有其他客户端可提供更多自定义选项，可查看 Let's Encrypt 的[客户端选项页面][letsencrypt-clients]。

```bash
$ mkdir certbot
$ cd certbot/
$ wget https://dl.eff.org/certbot-auto
$ chmod a+x certbot-auto
$ ./certbot-auto certonly --standalone \
                          --standalone-supported-challenges http-01 \
                          --email your@email.address \
                          -d hass-example.duckdns.org
```

如果你使用 Docker，请运行以下命令生成所需密钥：

```bash
sudo mkdir /etc/letsencrypt /var/lib/letsencrypt
sudo docker run -it --rm -p 80:80 --name certbot \
                -v "/etc/letsencrypt:/etc/letsencrypt" \
                -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
                quay.io/letsencrypt/letsencrypt:latest certonly \
                --standalone --standalone-supported-challenges http-01 \
                --email your@email.address -d hass-example.duckdns.org
```

无论使用哪种方法，证书都会生成并放在目录 `/etc/letsencrypt/live/hass-example.duckdns.org` 中。由于有效期只有 90 天，你需要每 90 天重复一次。可以使用一条专门命令来简化证书续期：

```bash
./certbot-auto renew --quiet --no-self-upgrade --standalone \
                     --standalone-supported-challenges http-01
```

<img width="60" src="/home-assistant/images/favicon-192x192.png" style='float: right; border:none; box-shadow: none;'>

### Home Assistant

在更新 Home Assistant 配置之前，我们需要把端口 `443`（HTTPS 连接）转发到运行 Home Assistant 的计算机上的端口 `8123`。和之前设置端口 `80` 一样，在路由器配置中完成即可。

最后一步是让 Home Assistant 使用已生成的证书。在此之前，请确保运行 Home Assistant 的用户对证书所在文件夹有读取权限。

```yaml
http:
  api_password: YOUR_SECRET_PASSWORD
  ssl_certificate: /etc/letsencrypt/live/hass-example.duckdns.org/fullchain.pem
  ssl_key: /etc/letsencrypt/live/hass-example.duckdns.org/privkey.pem
```

现在你可以访问 `https://hass-example.duckdns.org`，享受加密连接了！

_特别感谢 Fabian Affolter 在本文中提供的帮助和反馈。_

[DuckDNS]: https://duckdns.org
[duckdns-安装]: https://www.duckdns.org/安装.jsp
[Let's Encrypt]: https://letsencrypt.org
[letsencrypt-technology]: https://letsencrypt.org/how-it-works/
[letsencrypt-clients]: https://letsencrypt.org/docs/client-options/
[port-forward]: http://portforward.com
[certbot]: https://certbot.eff.org/
