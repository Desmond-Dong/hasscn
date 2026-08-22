---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
authorImageURL: https://avatars.githubusercontent.com/u/62932417?v=4
authorTwitter: GJohansson
title: "Climate entity 现在支持独立的水平 swing"
---

自 Home Assistant Core 2024.12 起，我们在 `ClimateEntity` 中实现了一个独立的属性和方法，用于控制水平 swing。

支持完全独立的垂直和水平 swing 控制和 state 的集成，现在可以使用之前的 `swing_mode` 仅用于垂直 swing，并使用新的 `swing_horizontal_mode` 来提供水平 swing 的 state 和控制。

不支持独立控制的集成仍应继续使用当前的 `swing_mode` 同时处理垂直和水平支持。


### 示例

以下是在你的 climate entity 中实现 `swing` 和 `swing_horizontal` 的示例要求。

```python

class MyClimateEntity(ClimateEntity):
    """Implementation of my climate entity."""

    @property
    def supported_features(self) -> ClimateEntityFeature:
        """Return the list of supported features."""
        return ClimateEntityFeature.SWING_MODE | ClimateEntityFeature.SWING_HORIZONTAL_MODE

    @property
    def swing_mode(self) -> str | None:
        """Return the swing setting.

        Requires ClimateEntityFeature.SWING_MODE.
        """
        return self._attr_swing_mode

    @property
    def swing_modes(self) -> list[str] | None:
        """Return the list of available swing modes.

        Requires ClimateEntityFeature.SWING_MODE.
        """
        return self._attr_swing_modes

    @property
    def swing_horizontal_mode(self) -> str | None:
        """Return the swing setting.

        Requires ClimateEntityFeature.SWING_HORIZONTAL_MODE.
        """
        return self._attr_swing_horizontal_mode

    @property
    def swing_horizontal_modes(self) -> list[str] | None:
        """Return the list of available swing modes.

        Requires ClimateEntityFeature.SWING_HORIZONTAL_MODE.
        """
        return self._attr_swing_horizontal_modes

    async def async_set_swing_mode(self, swing_mode: str) -> None:
        """Set new target swing operation."""
        await self.api.set_swing_mode(swing_mode)

    async def async_set_swing_horizontal_mode(self, swing_horizontal_mode: str) -> None:
        """Set new target horizontal swing operation."""
        await self.api.set_swing_horizontal_mode(swing_horizontal_mode)

```

更多详情请参阅 [climate 文档](/developers/core/entity/climate#swing-modes)。