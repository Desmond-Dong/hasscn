---
author: Jan-Philipp Benecke
authorURL: https://github.com/jpbede
authorImageURL: https://avatars.githubusercontent.com/u/3989428?s=96&v=4
title: "延长 @bind_hass 和 hass.components 的 deprecation 期限"
---

在 2024 年 2 月 27 日，我们[宣布弃用](/developers/blog/2024-02-27-deprecate-bind-hass-and-hass-components)了 `@bind_hass` decorator 和 `hass.components` 属性，计划于 Home Assistant 2024.9 版本生效。
由于仍有大量自定义集成在使用它们，并且近期又发布了 HACS v2 更新，我们决定将 deprecation 期限再延长六个月。

这意味着从 Home Assistant 2025.3 开始，`@bind_hass` decorator 和 `hass.components` 将被移除。

我们鼓励所有自定义集成的开发者更新他们的代码，以避免在 Home Assistant 2025.3 发布之前出现任何问题。