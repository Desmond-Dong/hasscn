---
title: 泄露密码和机密信息
description: '我们使用 Have I Been Pwned (HIBP)(https://haveibeenpwned.com/Passwords) 服务来检测泄露或受损的机密信息，如密码。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 泄露密码和机密信息

我们使用 [Have I Been Pwned (HIBP)](https://haveibeenpwned.com/Passwords) 服务来检测泄露或受损的机密信息，如密码。

如果您收到相关警告，这意味着您在配置中使用的机密信息已被泄露且公开已知。强烈建议尽快将这些机密信息更改为更安全的替代方案。

请注意；此功能不会发送您的机密信息进行检查。您的机密信息和隐私通过 [K-匿名性][k-anonymity] 得到保证。您的机密信息会被哈希处理，哈希结果的前 5 个字符用于查询 Have I Been Pwned。Have I Been Pwned 返回匹配的可能密码哈希结果，我们在本地对照此列表检查密码哈希的最后一部分。

[阅读 CloudFlare 博客文章了解更多关于 K-匿名性的信息][k-anonymity]。

[k-anonymity]: https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/
