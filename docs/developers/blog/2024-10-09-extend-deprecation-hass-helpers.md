---
author: Jan-Philipp Benecke
authorURL: https://github.com/jpbede
authorImageURL: https://avatars.githubusercontent.com/u/3989428?s=96&v=4
title: "延长 hass.helpers 的 deprecation 期限"
---

在 2024 年 3 月 30 日，我们[宣布弃用](/developers/blog/2024-03-30-deprecate-hass-helpers)了 `hass.helpers` 属性，计划于 Home Assistant 2024.11 版本生效。
由于仍有大量自定义集成在使用它们，并且近期又发布了 HACS v2 更新，我们决定将 deprecation 期限再延长六个月。

这意味着从 Home Assistant 2025.5 开始，`hass.helpers` 将被移除。

我们鼓励所有自定义集成的开发者更新他们的代码，以避免在 Home Assistant 2025.5 发布之前出现任何问题。