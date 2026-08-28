# 安全设置

Home Assistant 的一个主要优势是它不依赖云服务。即使您只在本地网络上使用 Home Assistant，也应该采取措施保护您的实例。

## 检查清单

以下是您*必须*采取的措施来保护您的 Home Assistant 系统的摘要：

* 将敏感数据集中存储在 [secrets](/home-assistant/docs/configuration/secrets/index.md) 中（但请记得备份它们）。
  * **注意**：在 `secrets.yaml` 中存储机密信息并不会加密它们。
* 定期保持系统更新。

## 远程访问

如果您想要安全的远程访问，最简单的选择是使用 [Home Assistant Cloud](/home-assistant/cloud/index.md)，您也可以通过它支持开发 Home Assistant、ESPHome 等项目的 [Open Home Foundation](https://www.openhomefoundation.org)。

另一个选择是通过集成 Let's Encrypt 的 [Duck DNS](/home-assistant/integrations/duckdns/index.md) 应用程序使用 TLS/SSL。

要将您的实例暴露到互联网，请使用 [VPN](https://pivpn.io) 或 [SSH 隧道](/home-assistant/blog/2017/11/02/secure-shell-tunnel/)。确保在路由器中开放使用的端口。

### 手动安装的额外建议

除了上述内容外，我们建议您考虑以下措施以提高安全性：

* 对于使用 SSH 的系统，在您的 sshd 配置（通常是 `/etc/ssh/sshd_config`）中设置 `PermitRootLogin no`，并使用 SSH 密钥而非密码进行身份验证。如果您启用了对 SSH 服务的远程访问，这一点尤为重要。
* 按照最佳实践指南加固主机，例如：
  * [Securing Debian Manual](https://www.debian.org/doc/manuals/securing-debian-manual/index.en.html)（这也适用于树莓派 OS）
  * [Red Hat Enterprise Linux 7 Security Guide](https://access.redhat.com/docs/en-us/red_hat_enterprise_linux/7/html/security_guide/index), [CIS Red Hat Enterprise Linux 7 Benchmark](https://www.cisecurity.org/cis-benchmarks/)
