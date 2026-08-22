Issue registry 已从 `homeassistant.components.repairs` 移至 `homeassistant.helpers`，现在在 bootstrapping 过程中与其他 registries 一起非常早地加载，早于任何 integrations 的设置。

这允许在配置验证期间创建 issues。
