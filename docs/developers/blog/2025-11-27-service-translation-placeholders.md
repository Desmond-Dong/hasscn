---
author: Jan Bouwhuis
authorURL: https://github.com/jbouwh
authorImageURL: https://avatars.githubusercontent.com/u/7188918?s=96&v=4
title: 为 service action translations 引入 description placeholders
---

现在可以使用 translation placeholders 来处理（自定义）service actions。

[service action 示例](/developers/core/integration-quality-scale/rules/action-setup?_highlight=hass.services.async_register#example-implementation) 现在展示了如何在注册 service action 时提供可用的 description placeholders。

将 URL 从 service 描述和 translation strings 中移动到 description placeholders。