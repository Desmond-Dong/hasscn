---
title: 错误
id: 'errors'
---

以下是您可能遇到的所有错误代码列表，以及有关发生原因和处理方法的详细文档。

## 设置和连接

### "Invalid Client ID or Redirect URI" 和 "OS Error while looking up redirect_uri"
检查您的 `home-assistant.log` 文件中是否有关于 `indieauth` 的错误。如果还提到 OS Error，您很可能有损坏的 IPv6 实现。您可以通过在运行 Home Assistant 的机器上运行 `curl -v6 https://home-assistant.io/iOS/beta-auth` 来确认这一点。如果您收到关于无法连接到服务器的错误，您的 IPv6 栈已损坏，您应该禁用它。

### "Invalid Client ID or Redirect URI" 和 "Timeout while while looking up redirect_uri"
检查您的 `home-assistant.log` 文件中是否有关于 `indieauth` 的错误。如果还提到 Timeout，您的 DNS 可能存在异常行为的问题。您可以通过在运行 Home Assistant 的机器上运行 `dig home-assistant.io` 和 `nslookup home-assistant.io` 来确认这一点。如果您看到任何错误，可能存在 DNS 问题。

解决此问题的方法因您的设置而异 - 但值得尝试使用 Google DNS 服务器 `8.8.8.8` 和 `1.1.1.1`。如果您运行的是 hassOS 设置，可以使用 `ha dns options --servers dns://8.8.8.8 --servers dns://1.1.1.1` 来完成。

### SSL error while looking up redirect_uri [https://home-assistant.io/iOS](https://home-assistant.io/iOS)
此错误意味着您的 Home Assistant 无法协商与 [https://home-assistant.io](https://home-assistant.io) 的加密连接。此问题曾在运行在 MacOS 上的安装中出现，其中安装程序关于证书的通知被跳过和忽略。来自 Python 3.7.5 自述文件：

>证书验证和 OpenSSL
>此软件包包含其自己的 OpenSSL 1.1.1 私有副本。由 Keychain Access 应用程序和 security 命令行工具管理的系统和用户钥匙串中的信任证书不会被 Python `ssl` 模块用作默认值。`/Applications/Python 3.7` 中包含一个示例命令脚本，用于安装来自第三方 [certifi](https://pypi.org/project/certifi/) 包的精选默认根证书包。双击 `Install Certificates` 运行它。
>捆绑的 pip 有其自己的默认证书存储用于验证下载连接。

### "Setup failed for dependencies: `zeroconf`"
此错误通常由以下两个问题之一引起：
*   您正在运行两个具有相同名称的 Home Assistant 实例。解决方案是重命名其中一个。
*   您的 `configuration.yaml` 文件中缺少 `default_config:`。可以只将 `zeroconf:` 添加到 `configuration.yaml`，但添加 `default_config:` 将连同 `zeroconf:` 一起添加[几个有用的集成](https://www.home-assistant.io/integrations/default_config/)。

### Response status code was unacceptable: 400
当设置期间发送的数据不符合 Home Assistant 的期望时会发生这种情况。这最常发生在两种情况下：

* 您运行的 Home Assistant 版本低于最低要求（目前为 0.104.0）
* 您的设备名称中有意外字符。在设置移动应用集成时，我们尝试删除非标准字符和表情符号（从 Home Assistant 0.112 开始）。但是，如果您收到此错误，值得简化您的设备名称以删除此类字符。

### URLSessionTask failed with error
此错误通常由以下两个问题之一引起：
*   您拒绝了应用的本地网络访问。要在 iOS 上解决此问题，打开系统设置中的 Home Assistant 条目并验证本地网络是否已启用。
*   您在实例中配置了错误的外部 URL。例如，当将外部端口 443 转发到您的实例端口（通常为 8123）时，您不必在 URL 中附加端口。
* 您[登录了 Home Assistant Cloud](https://support.nabucasa.com/hc/articles/25649130769949) 但没有订阅，并尝试通过反向代理访问您的实例。只需从您的 Home Assistant Cloud 帐户注销即可。