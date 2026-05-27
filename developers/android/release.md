# 安卓发布流程

## 安卓发布流程

本文档概述了 Android 应用程序从在您的计算机上开发到最终用户生产的步骤。它还介绍了 CI/CD 管道、内部测试、Beta 测试和 Google Play 商店验证的角色。

## 发布工作流程：从调试到生产

### 开发和调试构建

* 在开发过程中，您通常会在本地计算机上构建**调试应用程序**。
* 更改准备就绪后，您可以将**拉取请求 (PR)** 动态到存储库。

### 持续集成（CI）

* CI系统自动：
  * 构建应用程序。
  * 运行检查和测试以确保代码质量。
* 如果PR获得批准并合并到`main`分支：
  * CI 构建**发布应用程序**。
  * 版本已发布到 Google Play 商店和 Firebase 上的 **内部测试人员组**。

:::note
您可以从 [GitHub Actions page](https://github.com/home-assistant/android/actions/workflows/onPush.yml) 为 `main` 分支上的每个工作下载预构建的 APK。
:::

### 内部测试

* 内部测试人员验证发布版本以确保功能。
* 这个经过批准和合并的 PR 都会被自动到 Google Play 商店的内部测试版本渠道，考虑即时反馈。这是针对 Android Auto/Automotive 进行实际测试的唯一方法，因为调试版本不会出现在实际车辆中。
* 由于应用程序的复杂性，此阶段无法彻底测试所有功能。

### 每周测试版发布

* 每周六晚上9点（太平洋标准时间），最新的`main`版本都会自动到**公开测试版**频道。
* 在此预定日期之前（周五或周六），更新测试版本变更日志以突出显示新功能和重大更改。
* 公开版测试用户帮助在现实场景中测试应用程序并报告问题。

:::note
您可以通过[Google Play Store](https://play.google.com/apps/testing/io.homeassistant.companion.android)直接加入测试版计划。
:::

### 生产发布

如果版本测试稳定并得到维护者的批准，则将其升级为**生产**，供所有用户使用。每个版本都需要检查以下步骤：

* 更新更改日志以包含所有最新更改以及最新测试版本的版本号
* 取消选中 GitHub 中的预发布以获取最新的测试版本
* 准备配合文档 PR，删除该版本的所有 beta 标签，一旦 Google 批准该版本，PR 应合并
* 通知社区经理和 Android Discord 频道有关社交媒体即将发布的版本和亮点

:::note
您可以在[Google Play Store](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android)上找到该应用程序。
:::

## Google Play 商店验证

* 当应用程序进入**公开测试**阶段时，Google会对此进行验证。
* 验证时间可能会有所不同：
  * 在某些情况下可能需要一周以上的时间。
  * 由于每周都会发布一次，因此当提交新的测试版本时，之前的测试版本可能仍在验证中。如果发生这种情况，之前的测试版本将被删除并且不会被Google验证。
* 这种延迟不会阻止发布过程，但需要仔细规划以确保及时更新。
