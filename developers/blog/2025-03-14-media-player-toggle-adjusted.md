media player 基类中的 toggle action service 实现已进行调整。
media player 现在会在处于 `off` 或 `standby` 状态时开启；在其他所有状态下，将会被关闭。

在此变更之前，如果 media player 处于 `idle` 状态，也会被关闭。这与 `idle` 状态的含义不符，因为它被视为[设备已开启的状态](/developers/core/entity/media-player.md#states)。

自定义集成如果覆盖了 `async_toggle`，可能需要更新其实现。

此变更引入于 [home assistant core PR #78192](https://github.com/home-assistant/core/pull/78192)。
