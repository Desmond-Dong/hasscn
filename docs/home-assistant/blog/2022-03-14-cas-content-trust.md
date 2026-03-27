---
title: Home Assistant 与 Codenotary CAS 的内容信任
description: '我们已开始使用 Codenotary CAS(https://cas.codenotary.com/) 更新 Home Assistant 的内容信任机制。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# Home Assistant 与 Codenotary CAS 的内容信任

我们已开始使用 [Codenotary CAS](https://cas.codenotary.com/) 更新 Home Assistant 的内容信任机制。

通过内容信任，我们可以确保你的系统只运行由原作者发布的容器或软件。在这里，作者可以是 Home Assistant 项目本身，也可以是某个附加组件开发者。这个安全特性非常重要，因为它能保护你的实例不去运行潜在的恶意软件。内容信任会验证你下载、安装或升级的软件，与其创建者最初发布的版本完全一致，并确保在传输过程中没有人动过手脚。

Codenotary CAS 构建于一种名为 [immudb](https://github.com/codenotary/immudb) 的去中心化、密码学一致且可验证的数据库技术之上。它被用来存储所有这些受信任内容的签名。

借助 immudb，我们将能够自行托管部分受信任内容签名数据（目前我们还没有这样做）。它甚至可以作为 Home Assistant 附加组件提供，让用户在本地安装。需要特别说明的是，CAS 不会上传任何用户数据来进行验证；所有操作都在本地完成，这正是我们喜欢的方式。
当你安装或更新系统中带有签名的部分时，它会检查 CAS 数据库，以确保该镜像未被撤销（类似于 SSL 中的 CRL），并验证我们通过多个公共端点提供的下载内容，与系统刚刚下载到的更新完全一致。

在推出这套新系统期间，我们遇到了一些问题，导致用户在 3 月 11 日的大约 12 小时内无法安装更新；对此我们深表歉意。感谢 Codenotary 工程师的帮助，我们得以快速且有序地修复这个问题。

Pascal
