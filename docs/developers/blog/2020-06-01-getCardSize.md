---
author: Bram Kragten
authorURL: https://github.com/bramkragten
authorTwitter: bramkragten
title: "Lovelace：getCardSize 现在可以是 async"
---

自从我们在 Lovelace 中引入 lazy loading cards 以来，获取 lazy loaded card 的 card size 一直很难。

我们过去会在 element 加载之前发送一个 error element，它会带有一个 `getCardSize` 函数。但那个尺寸是错误的。
当 element 被定义时，我们会触发并重建事件，以便重新创建正确的 card。

在 0.110 中我们停止了这种做法，我们会返回正确的 element，但 element constructor 还没有加载，因此它没有 `getCardSize`。
当 constructor 加载时，element 将被升级并设置 config。从那一刻起，我们可以调用 `getCardSize`。

在这个版本中，我们更改了 `getCardSize` 的逻辑，使其会等待这一点。这意味着一些 cards（如 stacks）将返回一个 promise，因为它们必须等待其 children 被定义。

如果你是 custom card 开发者，并且你的 custom card 使用 `getCardSize` 获取其他 cards 的尺寸，你必须调整它以处理这些 promises。

我们获取 card size 的函数（你可以复制），现在看起来像这样：

```ts
export const computeCardSize = (
  card: LovelaceCard | LovelaceHeaderFooter
): number | Promise<number> => {
  if (typeof card.getCardSize === "function") {
    return card.getCardSize();
  }
  if (customElements.get(card.localName)) {
    return 1;
  }
  return customElements
    .whenDefined(card.localName)
    .then(() => computeCardSize(card));
};
```

我们首先进行和以前相同的检查，如果 element 有 `getCardSize` 函数，我们将返回该值，这应该是一个 `number` 或解析为 `number` 的 `Promise`。

如果该函数不存在，我们将检查 element 的 constructor 是否已注册，如果已注册，这意味着该 element 没有 `getCardSize`，我们将像以前一样返回 `1`。

如果 element 尚未注册，我们将等待它被注册，然后再次调用相同函数获取现在已定义的 card 的尺寸。