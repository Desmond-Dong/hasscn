---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
title: "Cover intents 已弃用"
---

从 Home Assistant 2023.02 开始，`HassCoverOpen` 和 `HassCoverClose` intents 已弃用。请改用 `HassTurnOn` 和 `HassTurnOff` intents。这样做的原因是某些语言不区分 Open/On 和 Close/Off。