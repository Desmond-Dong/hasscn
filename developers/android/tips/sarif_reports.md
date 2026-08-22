## 概述

SARIF（静态分析结果交换格式）报告用于在 GitHub Actions 中通知由 linter 或代码风格工具发现的问题。本指南说明了 SARIF 报告在我们的项目中的处理方式，以及如何将多个报告合并为一个，以兼容 GitHub Actions。

## 为什么使用 SARIF 报告？

GitHub Actions 支持 SARIF 报告进行代码扫描，使得在 Pull Request 或仓库的 Security 选项卡中直接识别和解决问题变得更加容易。了解更多 SARIF 信息，请参阅 [GitHub 文档](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)。

## 处理多个 SARIF 报告

### 问题

在我们的项目中，使用了多个 Gradle 模块。运行生成 SARIF 报告的任务时，每个模块都会生成自己的报告。然而，GitHub Actions 不再支持在单个 workflow 运行中处理多个 SARIF 报告。

### 解决方案

为解决此问题，我们使用自定义 Python 脚本将所有 SARIF 报告合并为一个文件，以确保与 GitHub Actions 的兼容性。

合并 SARIF 报告的脚本位于 `.github/scripts/merge_sarif.py`。使用方法如下：

1. **生成 SARIF 报告**
2. 运行 `python3 .github/scripts/merge_sarif.py`

仓库根目录下将生成一个新的 SARIF 文件。
