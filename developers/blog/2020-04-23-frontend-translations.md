如果你是 custom Lovelace card 的作者，并且使用了 translations，请注意，state translation keys 已更改。

在 0.109 之前，state translations 位于 `state.<domain>.<state>` 或 `state.<domain>.<device class>.<state>`（针对 binary sensors）。从 0.109 版本开始，这些 translations 现在是 backend 的一部分，因此它们具有 backend translations 的 key 格式。我们将 state 格式标准化为始终包含 device class。Device class `_` 保留为没有 device class 的 entities 的 fallback。

| 旧                                     | 新                                               |
| --------------------------------------- | ------------------------------------------------- |
| `state.<domain>.<state>`                | `component.<domain>.state._.<state>`              |
| `state.<domain>.<device class>.<state>` | `component.<domain>.state.<device class>.<state>` |

在未来的版本中，我们计划将 state attribute translations 也迁移到 backend。发生时我们将在此博客上发布。
