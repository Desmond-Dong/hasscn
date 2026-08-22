---
title: "Android 依赖"
sidebar_label: "依赖"
---

## 版本目录

我们使用[version catalog](https://docs.gradle.org/current/userguide/version_catalogs.html)来管理项目中直接使用的所有库。这是添加依赖的**唯一允许方式**。为保持一致性和可追溯性，严禁在 catalog 之外添加依赖。

### 使用 version catalog 的好处

- **集中管理**：所有依赖定义在一个位置（`gradle/libs.versions.toml`），使其更容易跟踪和更新。
- **一致性**：确保所有模块使用共享依赖的相同版本。
- **简化更新**：使跨整个项目更新依赖变得更加容易。

## 管理依赖和 lockfile

本项目利用 Gradle 的[dependency locking](https://docs.gradle.org/current/userguide/dependency_locking.html)功能，通过跟踪所有使用库的精确版本，确保构建的一致性和可重现性。

### 为什么使用 dependency locking

- **可重现的构建**：通过锁定所有依赖的精确版本，确保不同环境下的构建保持一致。
- **避免意外**：防止传递依赖出现意外更新而破坏构建。

### 更新依赖和 lockfile

在 `gradle/libs.versions.toml` 中添加或更新依赖时，务必同时更新相应的 lockfile。lockfile 捕获所有直接和传递依赖的精确版本。

要从项目根目录更新 lockfile，请运行以下命令：

```bash
./gradlew alldependencies --write-locks
```

此命令解析所有依赖并更新每个模块中的 `gradle.lockfile`。

:::info
如果 version catalog 已更新但 lockfile 未更新，CI 流水线将会失败。
:::

## 使用 Renovate 自动更新依赖

为简化依赖管理，我们已将[Renovate](https://docs.renovatebot.com/)集成到仓库中。Renovate 会自动创建 pull request 来更新依赖和 lockfile。

### Renovate 工作原理

- **自动更新**：Renovate 扫描项目中过时的依赖并创建 pull request 来更新它们。
- **Lockfile 更新**：Renovate 确保 lockfile 与依赖一起更新。
- **自定义配置**：Renovate 被配置为遵守项目的版本策略和更新策略。

:::note
Renovate 被配置为在库的新版本发布 3 天后再打开 pull request。这一延迟允许早期采用者识别并报告任何明显的问题。
:::

### 使用 Renovate 的好处

- **节省时间**：自动完成检查并更新依赖的繁琐过程。
- **降低风险**：确保更新通过 CI 流水线一致应用并经过测试。
- **提升安全性**：保持依赖为最新，降低漏洞风险。

## 使用非稳定版本

虽然我们力求跟上所用库的最新版本，但我们优先考虑稳定性。因此，我们避免使用 `alpha`、`beta`、`rc` 或其他非稳定版本。

:::note
在极少数特定情况下，我们已在 PR 中同意使用 `alpha` 版本以访问新功能。但这会带来每次更新后需解决问题的代价，因为 API 并不稳定。一个显著的例子是 `wear-compose-material` 库。
:::
