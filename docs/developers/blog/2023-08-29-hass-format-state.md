---
author: Paul Bottein
authorURL: https://github.com/piitaya
authorTwitter: piitaya
title: Entity state 格式化
---

在 Home Assistant Core 2023.9 版本中，我们在 `hass` 对象中引入了 3 个新方法，以允许自定义卡片对 entity state 进行带本地化支持格式化：

- `hass.formatEntityState`
- `hass.formatEntityAttributeValue`
- `hass.formatEntityAttributeName`

示例：

```js
hass.formatEntityState(hass.states["cover.living_room_shutter"]); 
// 如果用户语言是英语，将返回 "Open"。
// 如果用户语言是法语，将返回 "Ouvert"。
```

更多详情，请参阅[entity state 格式化文档](/developers/frontend/data#entity-state-formatting)。
