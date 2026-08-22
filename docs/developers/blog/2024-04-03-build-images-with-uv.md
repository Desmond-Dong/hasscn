---
author: Robert Resch
authorURL: https://github.com/edenhaus
authorImageURL: https://avatars.githubusercontent.com/u/26537646?s=96&v=4
title: "uv 如何每月为 Home Assistant 节省 215 个计算小时"
---

在我们的生产镜像中用 `uv` 替换 `pip` 后，我们的构建流水线（因此发布新版本）快了很多。
`Uv` 是一个由 Rust 编写的极其快速的 Python 包安装器和解析器。它由 [Astral](https://astral.sh/) 开发，并且是开源的。可以在 [GitHub](https://github.com/astral-sh/uv) 上查看它。

在下表中，您可以看到每次构建可以节省大约 5 小时的执行时间。

| Arch      | Pip          | UV       | Savings  |
|-----------|--------------|----------|----------|
| aarch64   | 1h 24m 53s   | 5m 18s   | ~1h 20m  |
| armhf     | 1h 52m 20s   | 6m 2s    | ~1h 46m  |
| armv7     | 1h 26m 43s   | 5m 28s   | ~1h 21m  |
| amd64     | 22m 10s      | 3m 20s   | ~19m     |
| i386      | 17m 37s      | 3m 11s   | ~14m     |

平均而言，我们运行构建流水线 43 次，因为我们要创建：
- 31 个 nightly（每天一个 nightly）
- 7 个 beta 版本
- 5 个 stable 版本（包括 patch 版本）

总共，我们每月节省约 215 小时。
有了这一巨大的改进，我们现在可以更快速地发布热修复，因为发布新版本的流水线现在大约需要 20 分钟，而不是 2.5 小时。

每月节省的 215 个执行小时可供其他任务使用，使所有开发者和我们社区的 CI 体验更好。
通过将 `pip` 替换为 `uv`，我们通过使用更少的资源来构建镜像，提高了我们的可持续性。


**非常感谢 Astral 开发了这款出色的工具。**
请查看他们的[网站](https://astral.sh/)和提供的产品，例如他们还提供了一个"闪电"般快速的 Python linter/formatter。
