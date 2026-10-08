## Android 发布流程

本文档概述了将 Android 应用从本地开发交付到最终用户生产环境所需执行的步骤。它还涵盖了 CI/CD 流水线、内部测试、beta 测试以及 Google Play Store 验证的角色。

## 发布工作流：从 debug 到生产环境

### 开发与 debug 构建

* 开发期间，你通常会在本地机器上构建 **debug 应用**。
* 一旦更改准备就绪，你就向仓库推送一个 **Pull Request (PR)**。

### 持续集成 (CI)

* CI 系统会自动：
  * 构建应用。
  * 运行 linter 和测试，以确保代码质量。
* 如果 PR 获得批准并合并到 `main` 分支：
  * CI 会构建 **release 应用**。
  * release 构建会被推送到 Google Play Store 和 Firebase 上的**内部测试员组**。

:::note
你可以从 [GitHub Actions 页面](https://github.com/home-assistant/android/actions/workflows/onPush.yml) 下载 `main` 分支上每个提交的预构建 APK。
:::

### 内部测试

* 内部测试员验证 release 构建，以确保其功能正常。
* 每个获得批准并合并的 PR 都会被推送到 Google Play Store 的内部 beta 渠道，以获取即时反馈。这也是对 Android Auto/Automotive 进行真实世界测试的唯一方式，因为 debug 构建不会在真实车辆中显示。
* 由于应用的复杂性，在此阶段无法对所有功能进行详尽测试。

### 每周 beta 发布

* 每周六美西时间晚上 9 点，最新的 `main` 构建会被推送到**公开 beta** 渠道。
* 在该截止时间（周五或周六）之前，请更新 beta changelog，以突出新功能和不兼容变更。
* 公开 beta 用户帮助在真实场景下测试应用并报告问题。

:::note
你可以直接通过 [Google Play Store](https://play.google.com/apps/testing/io.homeassistant.companion.android) 加入 beta 计划。
:::

### 生产发布

如果 beta 版本稳定并获得了维护者的批准，它将被提升到**生产环境**，对所有用户开放。详细检查清单如下文 [发布流程（将 beta 提升到生产环境）](#release-process-promoting-beta-to-production) 中所述。

:::note
你可以在 [Google Play Store](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) 上找到该应用。
:::

## Google Play Store 验证

* Google 会在应用推送到**公开 beta** 阶段时进行验证。
* 验证时间可能有所不同：
  * 在某些情况下可能需要一周以上。
  * 由于发布是每周进行的，当新的 beta 提交时，之前的 beta 发布可能仍在验证中。如果发生这种情况，之前的 beta 将被移除，且不会被 Google 验证。
* 这种延迟不会阻碍发布流程，但需要仔细规划，以确保及时更新。

## 发布流程（将 beta 提升到生产环境）

该提升由维护者按照以下检查清单执行：

### 提升之前

* 在 beta 发布后等待几天，给 beta 用户时间发现回归问题。
* 检查应用内 changelog（`app/src/main/res/xml/changelog_master.xml`）是否为最新，并且其版本与正在提升的 beta 相匹配。版本递增通过 [`prepareNextRelease.yml` 工作流](/developers/android/ci.md#on-pre-release-or-monthly-tag) 创建的 PR 自动进行，但内容应手动验证。
* 打开 Sentry dashboard，查看 beta 版本是否存在异常高数量的问题。
* 打开 [Google Play Console](https://play.google.com/console)，查看是否有报告的任何异常（崩溃、ANR、Android vitals）。
* 准备一个 [companion docs](https://github.com/home-assistant/companion.home-assistant) PR，移除本次发布中所有带 beta 标签的功能。

### 提升

* 在 [GitHub](https://github.com/home-assistant/android/releases) 上编辑最新的 beta 发布：保留生成的所有提交列表，但手动在其顶部添加一个 **Highlights of this release** 部分，与应用内 changelog XML 文件的内容相匹配（参见 [2026.6.1](https://github.com/home-assistant/android/releases/tag/2026.6.1) 作为示例），取消勾选 **pre-release** 复选框，并将其设置为 **latest** 发布。
* 取消勾选 pre-release 复选框会自动触发 [`release.yml` 工作流](/developers/android/ci.md#releases)，该工作流使用 Fastlane 在 Play Store 上将 beta 轨道提升到移动端、Wear OS 和 Automotive 应用的生产环境。

:::note
提升后，发布并不会立即上线：Google 会先进行审查，这通常需要几天时间。审查期间无需采取任何操作；其余步骤将在[发布可用后](#after-the-release-is-available-on-stores)执行。
:::

### 其他商店

Play Store 提升仅覆盖 `full` 风味。其他商店的更新方式如下：

* 将 automotive `minimal` 风味发送到 Harman Ignite 商店。
* 在 [Amazon 开发者控制台](https://developer.amazon.com/apps-and-games/console/apps/list.html) 中手动提交发布以供审查。APK 和 changelog 在通过 `onPush.yml` 工作流中的 `prep_amazon` Fastlane lane 创建 beta 时已经上传。
* 在 Meta Quest 商店上发布 `minimal` 风味。
* F-Droid 会在几天后通过从 GitHub 发布构建来自动获取该发布（参见 [F-Droid 上的发布](/developers/android/ci.md#release-on-f-droid)）。

### 发布在商店上可用后

* 一旦发布在 Play Store 上可用，合并那个移除 beta 标签的 companion docs PR。
* 如果本次发布自上次生产发布以来修复了任何安全问题，请更新 GitHub 发布说明中的 CVE 披露信息。在亮点之后手动向发布说明中添加一个 **Disclosed security advisories** 部分，并附上指向每个已发布公告的链接。

:::note
如果发布包含重大变更或出色的新功能，请请求社区经理协助推广（博客文章、社交媒体等）。
:::
