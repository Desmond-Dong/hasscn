---
author: Bram Kragten
authorURL: https://github.com/bramkragten
authorTwitter: bramkragten
title: "0.106 中可能影响 custom cards 的变更"
---

我们在 Home Assistant Core 0.106 中进行了一些可能会影响 custom Lovelace cards 的变更，如果你是 custom card 开发者，请阅读以下内容。

### 冻结配置

我们过去会给每张 card 一个配置的副本，因为有些 cards 会修改 Lovelace 传递给它们的配置。在 0.105 中我们停止了这种做法，因为为每张 card 创建深拷贝对性能不好。
这导致了一些问题，因为 cards 仍然在修改配置。在 0.106 中我们 freeze 了配置。这意味着 custom card 不能修改配置。如果它仍然尝试修改，将会抛出异常或静默失败，具体取决于是否在 strict mode 下运行。

请检查你的 custom card 在 0.106 中是否仍然正常工作，并进行调整以避免修改配置。如果你需要，可以自己创建配置的副本。

### 辅助函数

:::info
我们决定将此变更推迟到 0.107。
:::

所做的另一个变更是，我们不再默认加载所有 element types。我们在需要时加载它们。这也将有助于性能，但可能会破坏你的 custom card。

我们引入了一组 helpers，你可以使用它们来创建 Lovelace element，这些是 Home Assistant 内部使用的相同函数，并始终与用户使用的版本保持最新。
你可以按如下方式使用它们：

```js
const helpers = await loadCardHelpers();
const element = helpers.createRowElement(config);
element.hass = this.hass;
```

更多信息请参见 https://github.com/home-assistant/frontend/pull/4853