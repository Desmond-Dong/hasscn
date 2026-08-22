---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "数值型 sensor 不再允许将 state 设置为 NaN 或 inf"
---

数值型 sensor 不再允许将 state 设置为[非数字 (Not a Number)](https://en.wikipedia.org/wiki/NaN) 或正无穷/负无穷。

此变更在 [core PR#98110](https://github.com/home-assistant/core/pull/98110) 中引入。

更多详情，请参阅[`sensor` 文档](/developers/core/entity/sensor)。
