---
title: "SARIF报告"
description: 'SARIF（静态分析结果交换格式）报告在 GitHub Actions 中使用，以通知 linter 或代码样式工具发现的问题。本指南解释了我们的项目中如何处理 SARIF 报告，以及如何将多个报告合并为一个报告以与 GitHub Actions 兼容。'
sidebar_label: "SARIF报告"
---
# SARIF报告

## 概述

SARIF（静态分析结果交换格式）报告在 GitHub Actions 中使用，以通知 linter 或代码样式工具发现的问题。本指南解释了我们的项目中如何处理 SARIF 报告，以及如何将多个报告合并为一个报告以与 GitHub Actions 兼容。

## 为什么 SARIF 报告？

GitHub Actions 支持用于代码扫描的 SARIF 报告，从而可以更轻松地直接在拉取请求或存储库的安全选项卡中识别和解决问题。在[GitHub documentation](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning) 中了解有关 SARIF 的更多信息。

## 处理多个 SARIF 报告

### 问题

在我们的项目中，我们使用多个 Gradle 模块。当运行生成 SARIF 报告的任务时，每个模块都会生成自己的报告。但是，GitHub Actions 不再支持在单个工作流运行中处理多个 SARIF 报告。

### 解决方案

为了解决这个问题，我们使用自定义 Python 脚本将所有 SARIF 报告合并到一个文件中。这确保了与 GitHub Actions 的兼容性。

用于合并 SARIF 报告的脚本位于`.github/scripts/merge_sarif.py`。请按照以下步骤使用它：

1. @@格式0@@
2. 运行`python3 .github/scripts/merge_sarif.py`

您将在存储库的根级别有一个新的 SARIF 文件。