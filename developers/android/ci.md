## Android 持续集成与持续交付

本文档概述了 Android 项目的持续集成 (CI) 和持续交付 (CD) 流程。我们使用 **GitHub Actions** 作为 CI/CD 平台，并配置了多个工作流，以确保代码质量、自动化构建并简化部署。

## 概述

我们的 CI/CD 流程的主要目标是：

* ✅ 验证一切是否按预期工作。
* 🚨 在出现问题时通知相关人员。
* 🚀 支持应用的完全自动化持续交付。
* 🔄 通过将公共代码提取为 `.github/actions` 下的可复用本地 action，避免重复。

## 版本控制

我们遵循与核心项目相同的版本控制约定，使用 [CalVer]（日历版本号）。这确保了所有版本发布之间的一致性。

## 工作流

### Pull request 时

当 pull request (PR) 被创建或更新时，会触发 `pr.yml` 工作流。其目标是：

* 🧹 验证代码是否符合我们的 [linter](/developers/android/linter.md) 要求。
* 🔨 确保代码构建成功。
* ✅ 运行所有测试以验证正确性。
* 📦 在 GitHub Actions 选项卡中持久保存生成的 APK 以供审查。

如果任何步骤失败：

* CI 会通知 PR 所有者。
* PR 在问题解决之前会被阻止合并。
* 修复必须提交，这将自动重新启动工作流。

:::note
对于给定的 PR，同时只运行一个工作流。如果在短时间内连续推送多个提交，CI 会取消正在进行的构建，仅处理最新的提交。
:::

#### Debug 构建

为了在 CI 中以 debug 模式构建应用，我们使用位于 `/.github/mock-google-services.json` 的 mock Google services 文件。

#### 仪器化测试

##### Android（Emulator.wtf 上）

Android 应用的仪器化测试运行在 [Emulator.wtf](https://emulator.wtf) 上。每次 pull request，都会针对我们支持的每个 Android API 级别执行完整的测试套件，整个过程只需几秒钟即可完成，使得反馈循环极快。

##### Wear OS 和 Automotive（GitHub Actions 上）

Wear OS 和 Automotive 的仪器化测试运行在 [GitHub Actions](https://github.com/features/actions) 上经典的 Android 模拟器中，速度明显较慢，因此对于这些目标我们只覆盖少数几个 API 级别。

#### 从 pull request 下载 APK

请参阅 [Testing pull request builds](/developers/android/tips/testing_pr_builds.md) 技巧，了解如何从 pull request 下载并安装 APK 的说明。

### 推送到 `main` 时

当提交推送到 `main` 分支时，会触发 `onPush.yml` 工作流。其目标是：

* 🌐 从 [Lokalise](/developers/translations.md) 下载翻译。
* 📝 生成发布说明。
* 🔧 构建所有应用的 release 变体。
* 📤 将应用部署到 Firebase。
* 🛒 部署到 Play Store 的内部轨道。
* 📦 在 GitHub Actions 选项卡中持久保存生成的 APK。
* 🔐 注入发布所需的 secrets 和文件。

我们使用 [Fastlane](https://fastlane.tools/) 来简化向不同商店的部署。所有 Fastlane 配置均可在 `fastlane` 文件夹中找到。

:::note
该工作流也可以通过 `beta` 标志手动触发，以将某个构建提升到商店的 beta 轨道。
:::

### 每周构建

每周日 UTC 时间凌晨 4:00，`weekly.yml` 工作流会自动触发。其目标是：

* 🛠 创建一个每周的 GitHub pre-release。
* 🚀 调用 `onPush.yml` 工作流，并将 `beta` 标志设置为 `true`。

这确保了每周都会向 Play Store 的 beta 轨道推送一个新版本的应用。

### 每月版本标签

在每月的第一天，`monthly.yml` 工作流运行，以创建一个格式为 `YYYY.MM.0` 的初始版本标签。这符合我们的 [CalVer] 版本控制策略。

### 发布

`release.yml` 工作流由手动触发，以将最新的 beta 构建提升到生产环境。这确保了只有稳定且经过测试的构建才会发布给最终用户。

#### F-Droid 上的发布

[F-Droid](https://f-droid.org) 商店会在我们推送 GitHub release 时自行构建应用。该过程使用 [metadata](https://gitlab.com/fdroid/fdroiddata/-/blob/master/metadata/io.homeassistant.companion.android.minimal.yml)。

每个 GitHub release 包含以下 F-Droid 使用的文件：

* `version_code.txt` - 用于应用的版本控制（每次从 `main` 分支发布时创建）
* `strings.zip` - 在构建时包含来自 Lokalise 的所有应用翻译
* `locales_config.xml` - 根据下载的应用翻译生成的 [locales 配置](https://developer.android.com/guide/topics/resources/app-languages#use-localeconfig)

:::warning
我们无法保证在发布后应用何时会在 F-Droid 上可用。你可以在 [F-Droid](https://f-droid.org/packages/io.homeassistant.companion.android.minimal/) 上找到该应用。
:::

### 创建 pre-release 或月度标签时

当创建一个处于 `pre-release` 状态的发布或推送月度标签时，会触发 `prepareNextRelease.yml` 工作流。该工作流会创建一个 pull request，将 `changelog_master.xml` 文件更新以反映新版本。需要对该 pull request 进行手动批准。此过程有助于保持 changelog 版本与应用版本的一致性。

## 工作流汇总

| Workflow         | Trigger                     | Goals                                                                 |
|-------------------|-----------------------------|----------------------------------------------------------------------|
| `pr.yml`         | PR 创建或更新时             | Lint、构建、测试并持久保存 APK。                                    |
| `onPush.yml`     | 推送到 `main` 时          | 构建、部署并发布到 Firebase 和 Play Store。                          |
| `weekly.yml`     | 每周日凌晨 4:00             | 创建 pre-release 并将 beta 构建推送到 Play Store。                   |
| `monthly.yml`    | 每月第一天                  | 创建初始版本标签（`YYYY.MM.0`）。                                    |
| `release.yml`    | 手动触发                    | 将 beta 构建提升到生产环境。                                         |
| `prepareNextRelease.yml` | 创建 pre-release 或月度标签时 | 在 PR 中更新 `changelog_master.xml`。                    |

***

## 注意事项与最佳实践

* 🛠 将公共代码提取为 `.github/actions` 下的可复用 action，以避免重复。
* 🕒 注意工作流触发条件，避免不必要的资源消耗。
* 🔒 确保 secrets 和敏感文件在工作流中得到了妥善管理和注入。

[CalVer]: https://calver.org/
