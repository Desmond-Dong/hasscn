---
title: "代码风格"
sidebar_label: "代码风格"
---

## 为什么强制代码风格很重要

一致的格式化和 linting 可以减少 review 噪音，使维护者更容易关注行为、架构和边界情况，而不是风格问题。

## 仓库中使用的工具

iOS 项目使用几种自动化检查：

- **SwiftFormat** 用于 Swift 格式化
- **SwiftLint** 用于 Swift linting 和项目特定规则
- **RuboCop** 用于 Fastlane 和 Ruby 代码
- **Yamllint** 用于 workflow 和其他 YAML 文件

这些检查在 [pull request](/developers/apple/ci) 中运行，你应该在打开或更新 PR 之前在本地运行它们。

## 在本地运行检查

运行所有默认 linting 检查：

```bash
bundle exec fastlane lint
```

应用支持的自动修复：

```bash
bundle exec fastlane autocorrect
```

## 仓库特定的 linting 细节

### SwiftFormat

SwiftFormat 通过 `.swiftformat` 进行配置。仓库目前目标为 Swift 5.8 格式化规则，并排除生成的或外部内容，如 `Pods`、`vendor`、resources 和 `fastlane`。

### SwiftLint

SwiftLint 通过 `.swiftlint.yml` 进行配置，并使用有效规则的 allowlist，而不是启用所有默认规则。

配置还包括自定义规则，例如：

- 防止在批准的位置之外直接赋值给 `Current.*`
- 优先使用 `SFSafeSymbols` 辅助方法而非原始系统 symbol 字符串

### `swiftlint:disable`

请谨慎使用 `swiftlint:disable`。CI 包含一个 pull request 检查，当添加新的 disable 指令时会发出评论，因此每次抑制都应该是有意且合理的。

## 一般指导

- 优先使用小型、命名良好的类型和函数。
- 将共享代码放在共享模块中，而不是在各个 target 之间重复逻辑。
- 避免将 target 特定的假设引入 extension-safe 或共享代码中。
- 使更改易于隔离测试。

## Dependencies 和生成的代码

- 不要编辑 `Pods` 下的文件。此目录由仓库根目录中的 `Podfile` 生成，并通过 `bundle exec pod install` 刷新。
- 注意生成的或与 localization 相关的文件；有些由脚本和 workflow 维护。生成的文件通常会在文件顶部的注释中说明（例如，`// This file is auto-generated`），localization 文件与 `.strings` 和 `.xcstrings` 资源共存。
- 更改 Ruby 或 workflow 自动化时，确保相关的 lint 检查仍然通过。
