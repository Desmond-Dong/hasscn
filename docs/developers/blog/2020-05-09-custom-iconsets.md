---
author: Bram Kragten
authorURL: https://github.com/bramkragten
authorTwitter: bramkragten
title: Custom icon sets
---

如果你是 custom icon set 的维护者，你可能需要更新它。

在 Home Assistant core 版本 0.110 中，我们将更改 icons 的加载方式。我们不再一次性加载所有 `mdi` icons，它们也不会成为 DOM elements。
这将为我们节省近 5000 个 DOM elements，并将减少加载时间。

这也意味着我们不再使用或加载 `<ha-iconset-svg>`，如果你的 icon set 依赖于这个 element，你将不得不更改你的 icon set。

我们引入了一个新 API，你可以通过一个 async 函数注册你的 custom icon set，我们将使用 icon name 作为参数调用它。
我们期望返回一个包含所请求 icon 的 object 的 promise。你的 icon set 可以决定加载和缓存的策略。

API 的格式为：
```ts
window.customIconsets: {
  [iconset_name: string]: (icon_name: string) => Promise< { path: string; viewBox?: string } > 
};
```
`path` 是 `svg` 的 path。这是 `<path>` 元素的 `d` 属性中的字符串。
`viewBox` 是可选的，默认为 `0 0 24 24`。

以下是 icon `custom:icon` 的一个非常简单示例：

```js
async function getIcon(name) {
  return {
    path: "M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z",
  };
}
window.customIconsets = window.customIconsets || {};
window.customIconsets["custom"] = getIcon;
```

当设置了 icon `custom:icon` 时，Home Assistant 将调用函数 `getIcon("icon")`。