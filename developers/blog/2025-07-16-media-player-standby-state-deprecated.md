根据 [home-assistant/architecture#799](https://github.com/home-assistant/architecture/discussions/799) 的决定，media player 的 state `MediaPlayerState.STANDBY` 已被弃用，并将在 Home Assistant Core 2026.8 中移除。
集成应改用 `MediaPlayerState.IDLE` 或 `MediaPlayerState.OFF`。

更多详情请参阅 [media player 开发文档](/developers/core/entity/media-player.md#states)。
