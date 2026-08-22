从 Home Assistant 2026.5 开始，你现在可以注册自定义 dashboard strategies，就像你可以使用 [custom cards](/developers/frontend/custom-ui/custom-card.md) 一样，在 **Community dashboards** 部分下通过 **新的 dashboard** 对话框更容易地发现并添加它们。

以前，你必须引导用户创建一个空白 dashboard，在 YAML 模式下编辑，然后粘贴你的自定义 strategy。现在你可以注册一个友好的名称、描述和文档。

要注册你的 strategy，用包含以下 keys 的对象调用 `window.customStrategies.push()`：

* `type`：不带 `custom:` 前缀的 strategy type，例如 `"my-demo"`。
* `strategyType`：设置为 `"dashboard"` 以注册 dashboard strategy。
* `name`：strategy 的友好名称。
* `description`（可选）：strategy 的简短描述。
* `documentationURL`（可选）：指向 strategy 文档的 URL。目前在 strategy UI 中不会显示，但将来可能会显示。

示例：

```js
window.customStrategies = window.customStrategies || [];
window.customStrategies.push({
  type: "my-demo",
  strategyType: "dashboard",
  name: "My demo dashboard",
  description: "A starter dashboard generated from JavaScript.",
  documentationURL: "https://example.com/my-demo-dashboard",
});
```

此元数据独立于自定义元素本身。你的 strategy 仍然需要用类似 `ll-strategy-dashboard-my-demo` 的 tag 注册，用户仍然需要在 Home Assistant 发现它之前加载该资源。你可以为此使用 HACS，因为像 custom cards 一样，其他资源也可以添加。

查看更新后的 [custom strategies](/developers/frontend/custom-ui/custom-strategy.md) 文档，其中包含示例代码和更多详情。
