---
author: Franck Nijhof
authorURL: https://twitter.com/frenck
authorTwitter: frenck
title: "引入 update entity"
---

Home Assistant 2022.4 将提供一个全新的 entity platform：
`update` entity。

`update` entity 可由集成提供，用于向 Home Assistant 用户指示设备或服务有可用的更新。它允许你提供关于更新的附加信息，例如可用最新版本、发布说明摘要以及在线完整发布公告的链接。

此外，可以实现 `install` 方法，使用户能够直接从 Home Assistant 中安装更新。

向你的集成添加 `update` platform 相对简单，因为它只需要几个属性和（如果集成支持的话）一个 `install` 方法。大多数其他细节由 Home Assistant 自动处理。

在 Home Assistant Core [2021.12](https://www.home-assistant.io/blog/2021/12/11/release-202112/#brand-new-configuration-panel) 中，我们将由 Supervisor 提供的更新移到了 Configuration 面板。通过使用这个新 platform，我们将能够在不久的将来通过新 entities 提供的信息对其进行扩展。

请参阅我们的[开发者文档](/developers/core/entity/update)了解如何在集成中实现此功能。

如果你的集成此前提供了一个带有 `update` device class 的 `binary_sensor` 或 `button` entity，请考虑用 `update` entity 替换它们。
