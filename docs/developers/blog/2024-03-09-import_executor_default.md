---
author: J. Nick Koston
authorURL: https://github.com/bdraco
title: "在 executor 中导入集成以避免阻塞 event loop"
---

从 Home Assistant 2024.4 开始，所有集成都在 executor 中导入，以避免在代码被导入和执行期间阻塞 event loop。

在极少数情况下，如果集成在导入时创建了与 loop 绑定的对象，这可能会失败，因为在 executor 中没有正在运行的 loop。

自定义集成如果需要更多时间来调整代码以避免创建此类对象，可以选择退出，继续让代码在 event loop 中导入，但需了解系统稳定性将受到影响。

要退出在 executor 中导入，集成可以在其 [`manifest.json`](/developers/creating_integration_manifest) 中添加：

`"import_executor": false`
