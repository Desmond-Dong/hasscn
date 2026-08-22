---
author: Robert Resch
authorURL: https://github.com/edenhaus
authorImageURL: https://avatars.githubusercontent.com/u/26537646
title: "用 prek 替代 pre-commit"
---

通过将 `pre-commit` 替换为 [`prek`](https://prek.j178.dev/)，我们可以提升检查的性能。Prek 使用与 `pre-commit` 相同的 `.pre-commit-config.yaml`，是完整的替代方案。由于 `prek` 是用 Rust 编写的，并允许并行执行不同的 job，我们可以更快地检查代码。

新的开发环境将自动安装 `prek`，对于现有的开发环境，请通过运行 `uv pip install requirements_test.txt` 更新测试依赖。