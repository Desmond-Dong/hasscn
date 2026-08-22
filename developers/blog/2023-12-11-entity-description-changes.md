`EntityDescription` 类已发生变更；派生的 `dataclasses` 现在应设置 `frozen=True` 和 `kw_only=True`。

将 `frozen` 设置为 `True` 使 `EntityDescription` 实例不可变，这意味着它们在创建后不会被意外更新。
将 `kw_only` 设置为 `True` 确保 base 类中字段的顺序可以更改，而不会破坏用户代码。

在一段以 HA Core 2025.1 结束的弃用期内，仍然可以派生未设置 `frozen=True` 或 `kw_only=True` 的 `dataclasses`，但会被记录日志，并要求用户为自定义集成创建 issue。

一旦 HA Core 2025.1 发布，将不再可能派生未设置 `frozen=True` 或 `kw_only=True` 的 `dataclasses`。

更多详情可在[core PR #105211](https://github.com/home-assistant/core/pull/105211)中找到。
