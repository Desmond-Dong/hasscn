# 安卓持续集成与交付

## Android持续集成与交付

本文档概述了 Android 部署项目的持续集成 (CI) 和持续交付 (CD) 流程。我们使用 **GitHub 操作** 作为我们的 CI/CD 平台，配置了许多工作流程以确保代码质量、自动化构建和简化。

## 概述

我们 CI/CD 流程的主要目标是：

* ✅ 验证一切都按预期运行。
* 🚨如果出现问题，通知相关人员。
* 🚀 实现应用程序的持续交付。
* 🔄通过将公共代码提取到`.github/actions`下的可重用本地中操作来避免重复。

## 版本控制

我们遵循与核心项目相同的版本控制规定，使用[CalVer]（日历版本控制）。这确保了所有版本的一致性。

## 工作流程

### 根据拉取请求

当拉取请求(PR)打开或更新时，`pr.yml`工作流程将被触发。其目标是：

* 🧹验证代码是否符合我们的[linters](/developers/android/linter.md)。
* 🔨确保代码构建成功。
* ✅ 运行所有测试以验证正确性。
* 📦 将生成的 APK 保留在 GitHub Actions 选项卡中以供审核。

如果步骤任何失败：

* CI 通知 PR 业主。
* 在问题得到解决之前，PR 将被阻止合并。
* 必须提交修复，这会自动重新启动工作流程。

:::note
对于给定的 PR，一次仅运行一个工作流程。如果快速连续主动多个作业，CI 将取消发起的构建并仅处理最新的作业。
:::

#### 调试版本

为了在 CI 上调试应用程序，我们使用位于 `/.github/mock-google-services.json` 的模拟 Google 服务文件。

#### 从拉取请求下载 APK

有关如何从拉取请求下载和安装APK的说明，请参见[Testing pull request builds](/developers/android/tips/testing_pr_builds.md)提示。

### 工人到`main`

当提交被主动到`main`分支时，`onPush.yml`工作流程被触发。其目标是：

* 🌐来自[Lokalise](/developers/translations.md) 下载翻译。
* 📝生成发行说明。
* 🔧 构建所有应用程序的发布变体。
* 📤 将应用程序部署到 Firebase。
* 🛒 部署到 Play 商店的内部轨道。
* 📦将生成的APK保留在GitHub Actions选项卡中。
* 🔐注入发布所需的机密和文件。

我们使用[Fastlane](https://fastlane.tools/)来简化到不同商店的部署。所有Fastlane配置都可以在`fastlane`文件夹中找到。

:::note
还可以使用`beta`标志手动触发此工作流程，以将构建提升到商店的beta轨道。
:::

### 每周构建

每个星期日凌晨 4:00 UTC，`weekly.yml` 工作流程都会自动触发。其目标是：

* 🛠创建每周 GitHub 预发布。
* 🚀 调用`onPush.yml` 工作流程，并将`beta` 标志设置为`true`。

这确保了每周都会将新版本的应用程序主动程序到 Play 商店的测试版本中。

### 每月版本标签

每个月的第一天，`monthly.yml` 工作流程都会运行以创建 `YYYY.MM.0` 格式的初始版本标签。这符合我们的 [CalVer] 版本控制策略。

### 发布

`release.yml` 工作流程是手动触发的，只有将最新的测试版本升级到生产环境。这确保了稳定性并且经过测试的版本才会发布给最终用户。

#### 在F-Droid上发布

当我们积极参与 GitHub 版本时，[F-Droid](https://f-droid.org) 商店会自行构建应用程序。此过程使用[metadata](https://gitlab.com/fdroid/fdroiddata/-/blob/master/metadata/io.homeassistant.companion.android.minimal.yml)。

每个 GitHub 版本都包含 F-Droid 使用的以下文件：

* `version_code.txt` - 用于应用程序的版本控制（在`main`分支的版本每个上创建）
* `strings.zip` - 包含构建时 Lokalise 的所有应用程序翻译
* `locales_config.xml` - 从下载的应用程序翻译生成[locales configuration](https://developer.android.com/guide/topics/resources/app-languages#use-localeconfig)

:::warning
我们不保证应用程序在发布后何时可在 F-Droid 上使用。您可以找到应用程序[on F-Droid](https://f-droid.org/packages/io.homeassistant.companion.android.minimal/)。
:::

### 在预发布或每月标签上

当在`pre-release`状态下创建发布或每月每月标签时，会触发`prepareNextRelease.yml`工作流程。此工作流程创建一个拉取请求，更新`changelog_master.xml`以文件反映新版本。需要手动批准此拉取请求。此过程有助于保持变更日志版本与应用程序版本一致。

## 工作流程摘要

|工作流程 | 扳机 | 目标|
|-------------------|-----------------------------|----------------------------------------------------------------------|
|@@保护0@@ | PR开放或更新时间 | Lint、构建、测试和保留 APK。|
|@@保护0@@ | 工人到`main` | 构建、部署并发布到 Firebase 和 Play 商店。|
|@@保护0@@ | 每周日凌晨 4:00 | 创建预发行版并将测试版全民发布到 Play 商店。|
|@@保护0@@ | 那月的第一天 | 创建初始版本标签 (`YYYY.MM.0`)。|
|@@保护0@@ | 手动触发 | 将测试版本升级为生产版本。|
|@@保护0@@ | 在预发布或每月标签上 | 在 PR 中更新`changelog_master.xml`。|

***

## 观点和最佳实践

* 🛠 将公共代码提取到`.github/actions` 下的可重用操作中，居民重复。
* 🕒 注意工作流程消耗，占用的资源使用。
* 🔒确保机密和敏感文件在工作流程中得到正确的管理和输入。

[CalVer]: https://calver.org/
