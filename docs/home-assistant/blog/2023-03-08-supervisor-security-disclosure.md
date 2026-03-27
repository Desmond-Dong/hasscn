---
layout: post
title: "披露：Supervisor 安全漏洞"
description: '我们获悉，一项安全问题影响了使用 Home Assistant Supervisor 的安装方式。 该安全问题的修复已通过 Supervisor 自动更新系统推送给所有受影响的 Home Assistant 用户，因此这一问题现已不存在。 本页属于 Home Assistant 中文博客与更新记录。'
date: 2023-03-08 00:00:00
date_formatted: "March 08, 2023"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Public-Service-Announcement
og_image: /images/blog/2023-03-supervisor-security-disclosure/social.png
---
# 披露：Supervisor 安全漏洞

![请注意并阅读](/home-assistant/images/blog/2023-03-supervisor-security-disclosure/social.png)

我们获悉，一项安全问题影响了使用 Home Assistant Supervisor 的安装方式。
该安全问题的修复已通过 Supervisor 自动更新系统推送给所有受影响的
Home Assistant 用户，因此这一问题现已不存在。

你可以在 [Home Assistant About page](https://my.home-assistant.io/redirect/info/) 确认自己是否已收到更新，
并检查当前运行的是否为 Supervisor 2023.03.1 或更高版本。如果你在“关于”页面中
没有看到 Supervisor 版本号，说明你使用的不是受影响的安装类型，也就不会受到该漏洞影响。

该问题也已在 Home Assistant 2023.3.0 中得到缓解。这个版本于 3 月 1 日发布，
此后已有[33% 的用户][analytics]完成安装。

[analytics]: https://analytics.home-assistant.io/

## 受影响的版本

该安全问题影响的安装类型包括 Home Assistant OS 和
Home Assistant Supervised，其中也包括运行在
Home Assistant Blue 和 Home Assistant Yellow 上的安装。

另外两种安装类型，即 Home Assistant Container（Docker）和
Home Assistant Core（自有 Python 环境），不受影响。

## 致谢

这一安全问题由来自 [elttam] 的 [Joseph Surin] 发现。非常感谢他向我们通报此事。

[Joseph Surin]: https://jsur.in
[elttam]: https://www.elttam.com/

## 关于该问题

Supervisor 是 Home Assistant OS 与 Home Assistant Supervised
安装中的一个组件，负责系统管理。该问题允许攻击者远程绕过身份验证，
并直接与 Supervisor API 交互。这会让攻击者获得安装 Home Assistant 更新、
管理附加组件以及备份的权限。我们的分析显示，这个问题自 2017 年引入 Supervisor 以来就一直存在于 Home Assistant 中。

我们已在 GitHub 上发布[安全公告 CVE-2023-27482][advisory]。

[advisory]: https://github.com/home-assistant/core/security/advisories/GHSA-2j8f-h4mr-qr25

## 常见问题

---

### 这个漏洞是否已被利用？

我们目前无法确认。到现在为止，我们还没有收到用户遭到入侵的报告。

### 是否有临时规避方案？

如果你当前无法升级 Home Assistant Supervisor 或
Home Assistant Core 应用，我们建议不要将你的
Home Assistant 实例暴露到互联网。
