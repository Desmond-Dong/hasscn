`LightEntity` 不再支持 `white_value`，它已被[color mode](/developers/core/entity/light.md#color-modes) `white` 替代。

### 背景

Light 的 `white_value` 在 Home Assistant Core 2021.4 中通过
[PR #47720](https://github.com/home-assistant/core/pull/47720)被弃用，
并在 Home Assistant Core 2021.7 中通过
[PR #51411](https://github.com/home-assistant/core/pull/51411)被 color mode `white` 替代。
