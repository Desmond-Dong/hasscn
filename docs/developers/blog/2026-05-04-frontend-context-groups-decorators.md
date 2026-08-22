---
author: Wendelin Peleska
authorURL: https://github.com/wendevlin
title: "Frontend context groups、新的 context decorators 和已弃用的 contexts"
---

上个版本我们引入了 lazy context，我们希望在传递 hass 对象方面更多地使用 hass context 和 lazy context。我们发现一些小任务经常需要订阅很多 contexts，因此我们将 Hass contexts 分组为逻辑组。

## 上下文组

新增以下 context groups：

- registriesContext：包含所有 registries（device、entity、area 等）
- internationalizationContext：包含所有 internationalization 相关数据（locale、localize 等）
- apiContext：包含所有 API 相关方法（callService、callWS 等）
- connectionContext：包含所有 connection 相关数据（connection、connected、hassUrl 等）
- uiContext：包含所有 UI 相关数据（themes、panels、dockedSidebar 等）
- configContext：包含所有 config 相关数据（auth、config、user 等）

## 消费上下文条目装饰器

在上一篇 [blogpost](/developers/blog/2026-03-25-frontend-lazy-context) 中，我展示了如何使用 `@transform` 与 context 配合。`@transform` 功能强大，但有时你只需要一个 context entry，并不想定义 transform 函数。
为此，我们添加了直接消费单个 context entry 的 decorators。
你传入一个定义 entity ID 来源的数组（通常是 config 属性），decorator 会消费正确的 context 并将 entity ID 映射到正确的 registry entry。
它还会监视定义的路径，并在需要时更新 entry。

新的 decorators：

- @consumeEntityState
- @consumeEntityStates
- @consumeEntityRegistryEntry

使用示例：

```ts
@state()
@consumeEntityRegistryEntry({ entityIdPath: ["_config", "entity"] })
_entity?: EntityRegistryDisplayEntry;
```

我们将来可能会添加更多这类 decorators，例如用于 areas、devices 等。

## 弃用 contexts

以下 contexts 仍然可用，但可能在未来版本中被移除。请使用新的 context groups 替代。

- connectionSingleContext
- localizeContext
- localeContext
- configSingleContext
- themesContext
- selectedThemeContext
- userContext
- userDataContext
- panelsContext
- authContext
