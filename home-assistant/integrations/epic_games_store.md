# Epic Games Store

The **Epic Games Store** integration integrates the [Epic Games Store](https://store.epicgames.com/) service into Home Assistant.

The integration adds calendars to follow [discounts & free games](https://store.epicgames.com/free-games).

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Calendars

The following calendars will be created:

|Entity|Description|
|------|-----------|
|`epic_games_store_discount_games`|Current and upcoming discounts on games, one calendar event per game|
|`epic_games_store_free_games`|Free games for the current and upcoming week, one calendar event per game|

### Video tutorial

This video tutorial explains how to show the two free games from the Epic Games Store on your dashboard using a custom template sensor.

<lite-youtube videoid="fwpdi-Ua46A" videotitle="Get FREE GAMES with Home Assistant!" posterquality="maxresdefault"></lite-youtube>
