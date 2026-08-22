---
author: Wendelin Peleska
authorURL: https://github.com/wendevlin
title: "Frontend lazy context"
---

## 什么是 context？

在 Home Assistant frontend 中，[Context](https://lit.dev/docs/data/context/) 是一种在 component 树中共享数据的方式，无需显式地通过每一层作为 property 传递。通过 context 提供特定的数据片段，并仅在需要的地方消费它们，而不是将 `hass` 对象层层传递到多个 component 层级。

使用 context 而非传递整个 `hass` 对象的关键优势：

- **更易于使用**：Components 可以直接消费所需数据，无需父级 components 将其向下传递。这减少了 prop drilling，使 components 更加自包含且可复用。
- **减少不必要的 component re-renders**：当 component 以 property 形式接收 `hass` 时，`hass` 的任何变更都会触发该 component 及其所有子组件的 re-render——即使该 component 只关心数据的一个小子集。通过 context 仅提供 component 所需的特定数据，可以确保 components 仅在实际依赖发生变更时才 re-render，从而实现更好的性能和更响应的 UI。

## 引入 LazyContext

我们引入了一种新的 `LazyContext` 模式，它应替换传统的基于订阅的方式以及 `SubscribeMixin` 的使用。以前，components 会订阅数据源并手动管理订阅生命周期，这往往导致样板代码，且如果订阅未正确清理，则可能导致内存泄漏。

`LazyContext` 简化了这一点：

- **Lazy loading**：数据仅在 component 实际消费该 context 时才被获取
- **Automatic cleanup**：Subscriptions 被自动管理
- **Shared state**：消费同一 context 的多个 components 共享单个订阅
- **Optimized re-renders**：仅在数据变更时，消费该 context 的 components 才会 re-render

这种方式集中了 data-fetching 逻辑，使你更容易推理数据何时以及如何流经应用程序。

## 示例

### 定义一个 LazyContext

要定义一个 lazy context，使用 `LazyContextProvider` 并提供一个 fetch 函数：

```ts
new LazyContextProvider(this, {
  context: labelsContext,
  subscribeFn: (connection, setValue) => subscribeLabelRegistry(connection, setValue),
})
```

### 使用 lit 消费 context

要在 component 中消费 context，使用 `@consume` decorator：

```ts
@state()
@consume({ context: labelsContext, subscribe: true })
private _labels?: LabelRegistryEntry[];
```

查看更新后的 custom card 示例，以在 vanilla JS 中使用它：[Custom card example](/developers/frontend/custom-ui/custom-card#defining-your-card)。

### 使用 @transform 处理派生数据

_仅在 home-assistant frontend codebase 内可用_

`@transform` decorator 允许你从 context value 派生数据，确保 component 仅在转换后的值实际变更时才 re-render。

```ts
@state()
@consume({ context: statesContext, subscribe: true })
@transform({
  transformer: function (this: HuiButtonCard, entityStates: HassEntities) {
    return this._config?.entity ? entityStates?.[this._config?.entity] : undefined;
  },
  watch: ["_config"],
})
private _stateObj?: HassEntity;
```

使用 `@transform`，即使完整的 states 对象更新，你的 component 也仅会在转换后的结果（`_stateObj`）实际变更时才 re-render。`watch` 选项允许你指定应触发 transformer 函数重新求值的附加属性——在这种情况下，当 `_config` 变更时，transformer 会再次运行以提取正确的 entity state。
