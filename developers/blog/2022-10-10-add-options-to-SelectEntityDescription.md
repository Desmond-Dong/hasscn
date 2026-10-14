从 Home Assistant Core 2022.11 开始，`options` 作为 `SelectEntityDescription` 的标准属性可用。
如果自定义集成之前实现了自定义的 `options` 属性，可能会导致问题。

请通过删除或重命名自定义 `options` 属性来调整自定义集成。
