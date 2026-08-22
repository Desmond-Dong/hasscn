---
author: Paul Bottein
authorURL: https://github.com/piitaya
title: "Card picker 中的自定义卡片建议"
---

从 Home Assistant 2026.6 开始，自定义卡片可以作为建议显示在 card picker 中。当用户选择一个 entity 时，选择加入的自定义卡片会显示在内置建议下方的 **Community** 部分下。

要加入，在你的 `window.customCards` 条目中添加一个 `getEntitySuggestion` 函数。它接收 `hass` 对象和被选中的 entity id，并返回一个建议（如果该 entity 不受支持则返回 `null`）：

```js
window.customCards.push({
  type: "my-card",
  name: "My Card",
  getEntitySuggestion: (hass, entityId) => {
    if (entityId.split(".")[0] !== "light") {
      return null;
    }
    return {
      config: { type: "custom:my-card", entity: entityId },
    };
  },
});
```

你也可以返回一个建议数组，以提供多个变体，每个变体都有自己的 `label`。

仅当卡片对该 entity 有意义时才建议你的卡片。使用 `hass` 对象检查 domain、device class 或 supported features，否则返回 `null`。为每个 entity 都建议你的卡片会使 picker 变得杂乱。

更多详情，请参阅 [custom card 文档](/developers/frontend/custom-ui/custom-card#suggesting-your-card-for-an-entity)。
