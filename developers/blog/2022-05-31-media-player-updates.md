从 Home Assistant 2022.6 开始，media player integration 对 `media_player.play_media` service 进行了两项更新。`enqueue` 属性在 [PR #72406](https://github.com/home-assistant/core/pull/72406) 中已更改为 string，并在 [PR #72566](https://github.com/home-assistant/core/pull/72566) 中添加了新的 `announce` boolean 属性。

更多信息请参见更新的 [media player play\_media 文档](/developers/core/entity/media-player.md#play-media)。
