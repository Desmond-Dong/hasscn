如果删除了集成，也应删除相关的集成文档。

1. 删除相关的[集成文档页面](https://github.com/home-assistant/home-assistant.io/tree/current/source/_integrations)及其相关的[triggers](https://github.com/home-assistant/home-assistant.io/tree/current/source/_triggers)、[conditions](https://github.com/home-assistant/home-assistant.io/tree/current/source/_conditions)和[actions](https://github.com/home-assistant/home-assistant.io/tree/current/source/_actions)（如适用）。
2. 从[Brands 仓库](https://github.com/home-assistant/brands)中删除相关的 logos 和 icons。
3. 从[`codeowners` file](https://github.com/home-assistant/home-assistant.io/blob/current/CODEOWNERS)中删除该条目，如[此 PR](https://github.com/home-assistant/home-assistant.io/pull/41531/files#diff-fcf14c4b7b34fe7a11916195871ae66a59be87a395f28db73e345ebdc828085bL268)所示。
4. 在[redirect file](https://github.com/home-assistant/home-assistant.io/blob/current/source/_redirects#L516)中的**Removed integrations** section 添加一个 `301` 条目。
