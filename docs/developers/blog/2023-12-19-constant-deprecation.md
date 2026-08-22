---
author: Robert Resch
authorURL: https://github.com/edenhaus
authorImageURL: https://avatars.githubusercontent.com/u/26537646?s=96&v=4
title: "已弃用的常量会产生日志条目"
---

近年来，许多常量通过添加指向其替代项的代码注释，被 Enum 或其他值所取代。
现在使用已弃用的常量将生成一条警告日志条目，其中包含使用的集成、替代项以及该常量将从 core 中移除的版本。
将有一年的弃用期，以确保所有自定义集成作者有时间进行调整。

大多数常量应该已经被替换了，因为过去我们发布了多篇关于其弃用的博客文章。部分列于下方：
- [Deprecating all SUPPORT_* constants](2022-04-02-support-constants-deprecation.md)
- [Constant deprecations for 2022.5](2022-05-03-constants-deprecations.md)
- [AutomationActionType deprecation for 2022.9](2022-08-15-automation-action-type-deprecation.md)
- [Device tracker deprecations for 2022.9](2022-07-29-device-tracker_source-type-deprecation.md)
- [Deprecating media player constants](2022-09-06-media-player-repeat-mode-deprecation.md)
- [Add new precipitation intensity units](2022-10-25-new-precipitation-intensity-units.md)
- [Introducing new unit enumerators](2022-10-26-new-unit-enumerators.md)
- [Add more unit enumerators](2022-11-28-more-unit-enumerators.md)
- [Add more unit enumerators](2022-12-05-more-unit-enumerators.md)

更多详情可在 [core PR #105736](https://github.com/home-assistant/core/pull/105736) 中找到，或者通过查看弃用 helper 中 [`check_if_deprecated_constant`](https://github.com/home-assistant/core/blob/dev/homeassistant/helpers/deprecation.py#L240) 函数的使用情况。
