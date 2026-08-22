## 组件更新

### Component sizes 使用 Web Awesome 名称

`ha-button`、`ha-button-toggle-group` 和 `ha-slider` 现在使用简短的 Web Awesome size 名称。

对于 `ha-button`，使用：

```html
<ha-button size="s">Save</ha-button>
```

支持的值是 `xs`、`s`、`m`、`l` 和 `xl`。

对于 `ha-button-toggle-group`，使用 `s` 或 `m`：

```html
<ha-button-toggle-group size="s" .buttons=${buttons}></ha-button-toggle-group>
```

`ha-slider` 使用 `s` 或 `m`。

如果你的自定义卡片或 editor 仍然在这些 components 上使用 `small`、`medium` 或 `large`，请将它们迁移到 `s`、`m` 或 `l` 等简短值。

### 虚拟列表

我们添加了两个用于大数据集的 list components：

* `ha-list-virtualized`
* `ha-list-selectable-virtualized`

当 picker 或 dialog 能够渲染足够多行从而影响到滚动或初始渲染时间时使用它们。Virtualized list 仅渲染可见行，同时保留 `ha-list-base` 的 roving-tabindex 键盘导航。

Rows 通过 `aria-setsize` 和 `aria-posinset` 暴露 accessibility metadata，因此辅助技术仍然能获得完整的 list 位置，即使只有部分 list 在 DOM 中。

对于可选择的 lists，渲染 `ha-list-item-option` rows。

## Context 和 editor 基础设施

### Dirty state 跟踪

Dialogs 和 editors 现在有共享的 dirty-state 基础设施：

* `DirtyStateProviderMixin`
* `dirtyStateContext`
* `isDirtyState`
* `isEffectiveDirtyState`

对于需要阻止 scrim 关闭、仅在编辑后启用 Save、或与子 components 协调 dirty state 的新 dialogs 或 editors，使用 `DirtyStateProviderMixin`。

```ts
class MyDialog extends DirtyStateProviderMixin<MyState>()(LitElement) {
  public openDialog() {
    this._initDirtyTracking({ type: "shallow" }, this._state);
  }

  private _stateChanged(state: MyState) {
    this._updateDirtyState(state);
  }
}
```

`isDirtyState` 是原始比较，通常适用于启用 Save。`isEffectiveDirtyState` 可以忽略等效的 config 输出，例如当 editor 将显式默认值规范化为相同的有效 config 时。

### 相关上下文

Pages 和 editors 现在可以为附近的 pickers 发布 related context：

* `relatedContext`
* `fireRelatedContext`
* `fireEntityRelatedContext`

当 card editor、badge editor、automation trace page 或类似表面知道当前的 entity、device 或 area 时，它可以提供该 context。Entity pickers 和 add-element searches 然后可以优先考虑相关的 entities、devices 和 areas。

```ts
fireEntityRelatedContext(this, "light.kitchen");
```

当 editor 不再有 related item 时，用 `undefined` 清除 context。

### 窄视口上下文

`narrowViewportContext` 暴露主 Home Assistant viewport 是否处于 narrow layout。

只需要 narrow-layout state 的 components 可以消费此 context，而不是通过多层 properties 接收 `narrow`。

```ts
@consume({ context: narrowViewportContext, subscribe: true })
private _narrow!: boolean;
```

## Lovelace 更新

### Strategy regeneration 控制

Lovelace strategies 现在可以避免不必要的 regeneration。

Strategies 可以声明 `registryDependencies` 以仅对它们依赖的 registries 使用默认的 reference-change 检查：

```ts
static registryDependencies = ["entities", "areas"] as const;
```

对于自定义逻辑，实现 `shouldRegenerate()`：

```ts
static shouldRegenerate(config, oldHomeAssistant, newHomeAssistant) {
  return oldHomeAssistant.entities !== newHomeAssistant.entities;
}
```

如果两者都未提供，strategies 保持先前的默认行为，并在 entities、devices、areas 或 floors 发生变更时重新生成。
