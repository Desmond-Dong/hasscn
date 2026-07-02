# 移除集成页面

如果你移除了某个集成，也请同步移除对应的集成文档。

1. 删除对应的[集成文档页面](https://github.com/home-assistant/home-assistant.io/tree/current/source/_integrations)。
2. 从 [Brands 仓库](https://github.com/home-assistant/brands) 中删除相关 logo 和 icon。
3. 删除 [`codeowners` 文件](https://github.com/home-assistant/home-assistant.io/blob/current/CODEOWNERS)中的对应条目，可参考[这个 PR](https://github.com/home-assistant/home-assistant.io/pull/41531/files#diff-fcf14c4b7b34fe7a11916195871ae66a59be87a395f28db73e345ebdc828085bL268)的做法。
4. 在[redirect 文件](https://github.com/home-assistant/home-assistant.io/blob/current/source/_redirects#L516)的 **Removed integrations** 区段中加入一条 301 记录。
