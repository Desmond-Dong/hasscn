---
author: Joost Lekkerkerker
authorURL: https://github.com/joostlek
authorImageURL: https://avatars.githubusercontent.com/u/7083755?v=4
title: "为 DeviceInfo 添加 model_id"
---

从 2024.8 开始，您现在可以在 `DeviceInfo` 类中添加一个 model 标识符。该标识符可用于在集成和 frontend 中识别 device model。

例如，Philips Hue ambiance spot 以前被列为"Hue ambiance spot (LTG002)"。现在可以将其拆分，其中 `model` 为"Hue ambiance spot"，`model_id` 为"LTG002"。
