# DNS 服务器问题

## 问题

Home Assistant 需要正常工作的 DNS 服务器才能运行。没有它，可能无法提供检查和执行更新、显示文档、访问加载项和集成所需的外部服务等功能。

## 解决方案

最简单的解决方案是通过在 CLI 中执行以下命令重新启用回退 DNS 选项：

```bash
ha dns options --fallback=true
```

或者，通过在 CLI 中执行以下命令查看系统问题：

```bash
ha resolution info
```

您将看到一个或多个上下文为 `dns_server` 的问题。对于每个此类问题，根据问题类型采取以下操作。

### `dns_server_failed`

1. 确保 DNS 服务器正常运行
2. 确保 DNS 服务器可以访问互联网
3. 确保主机名 `_checkdns.home-assistant.io` 未被阻止

### `dns_server_ipv6_error`

如果您看到此问题，意味着您用于 DNS 的应用程序未正确处理 A 和 AAAA 请求。您可以通过执行以下命令进行测试：

```bash
server="<DNS 服务器的 IP 地址>"
dig "@$server" _checkdns.home-assistant.io +noall +comments +answer A
dig "@$server" _checkdns.home-assistant.io +noall +comments +answer AAAA
```

正确处理 A 和 AAAA 请求的 DNS 服务器将对这两个查询响应 `NOERROR` 状态，即使 AAAA 请求没有答案。处理不当的 DNS 服务器只会对第一个查询返回 `NOERROR` 响应，而对第二个查询返回 `NXDOMAIN`、`REFUSED`、`SERVFAIL` 或其他错误状态。

使用能正确处理此情况的 DNS 服务器非常重要，因为 Home Assistant 在其许多容器中使用 alpine。Alpine 遵循 DNS 规范，如果对任一查询收到错误状态，它将把整个域名视为无法解析。在这种情况下，Home Assistant 将遇到许多意外问题，特别是在更新和安装软件方面。
