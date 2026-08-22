# 忽略内容信任

## 问题

您已禁用内容信任检查。这意味着 Home Assistant 无法再验证内容是否可信且未被攻击者修改。
我们强烈建议启用此检查。

对于内容信任，我们使用开源解决方案 [CodeNotary](https://codenotary.io)。

## 解决方案

要解决此状态，您需要使用 CLI 重新启用内容信任保护机制：

```bash
ha supervisor options --content-trust
```

启用内容信任后，重启 Supervisor。

```bash
ha supervisor restart
```
