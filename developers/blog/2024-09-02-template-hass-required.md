随着 [core PR #89242](https://github.com/home-assistant/core/pull/89242) 的合并（该 PR 已合入 Home Assistant Core 2023.4），在 schema 验证期间创建的 `Template` 对象上将会设置 `Template.hass`。

在此更改之前，在渲染模板之前必须检查并设置 `Template.hass`，这在代码库的许多地方都有实现。
这类代码已从 Home Assistant Core 中移除，这将影响到自定义集成的作者：

* 手动创建 `Template` 对象的自定义集成必须向构造函数传入一个有效的 `hass` 对象。在 config entries 创建模板时尤其如此。如果不传入 `hass` 对象，将触发 deprecation warning，并在 Home Assistant Core 2025.10 中失效。
* 辅助函数 `template.attach` 已不再有任何作用，core 也不再使用它。它已被标记为 deprecated，并计划在 Home Assistant Core 2025.10 中移除。
