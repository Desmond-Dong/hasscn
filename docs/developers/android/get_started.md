---
title: "安卓入门"
description: '欢迎使用 Home Assistant Android 开发指南！本文档将帮助您设置环境、分叉存储库并构建您的第一个应用程序。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: "开始使用"
---
# 安卓入门

## Home Assistant Android开发入门

欢迎使用 Home Assistant Android 开发指南！本文档将帮助您设置环境、分叉存储库并构建您的第一个应用程序。

## 设置您的开发环境

首先，安装[Android Studio](https://developer.android.com/studio) 的最新稳定版本。这是构建应用程序所需的唯一工具。

## 分叉、克隆并创建分支

### 分叉仓库

1. 打开[Home Assistant Android repository](https://github.com/home-assistant/android)。
2. 单击**叉**创建自己的存储库副本。

:::tip
如果您遇到任何问题，请参阅[GitHub documentation on forking a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)。
:::

### 克隆您的分叉存储库

创建存储库分叉后，使用以下命令将其克隆到本地计算机：

```bash
git clone https://github.com/<your-github-username>/android.git
```

或者，您可以使用Android Studio：

1. 转到`File -> New -> Project from Version Control...`。
2. 输入您的存储库 URL 并克隆它。

### 创建分支

在进行任何更改之前，请创建一个具有有意义的名称的新分支，以反映您正在执行的工作。例如：

```bash
git checkout -b feature/add-new-feature
```

:::tip
如果您是Git新手，请查看[Git Branching Guide](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)。您还可以直接在Android Studio中创建分支。
:::

## 构建家庭助理应用程序

将存储库克隆到本地后，您可以使用 Android Studio 或终端构建应用程序。

### 来自Android Studio

1. 在Android Studio中打开项目。
2. 同步Gradle文件。
3. 点击顶部栏的绿色**播放**按钮。Android Studio将自动创建模拟器并为您运行应用程序。

:::note
该项目安装**NDK**（需要本机开发套件）和**CMake**。这些通常在项目同步期间自动安装。如果自动安装失败，您可以手动安装：

1. 打开**Android Studio > 设置 > 语言和框架 > Android SDK > SDK 工具**。
2. 检查**NDK（并排）** 和**CMake**。
3. 安装项目根目录中 `libs.versions.toml` 文件中定义的特定版本。

:::

### 从航站楼出发

:::info
您需要将 `JAVA_HOME` 环境变量设置为 JDK。我们目前使用的是 JDK 21。
:::

#### 在 macOS/Linux 上

```bash
./gradlew assembleDebug
```

#### 在Windows上

```powershell
gradlew.bat assembleDebug
```

:::info
如果您需要创建发布版本，请遵循[release build instructions](/developers/android/tips/release)。
:::

## Firebase 设置

Firebase 用于通知。如果您不需要这些功能，则应使用模拟的 Firebase 配置。

:::info
您仍然可以通过 WebSocket 发送通知，而无需使用 Firebase。
:::

### 设置模拟 Firebase 项目

如果您不需要真正的 Firebase 功能，可以使用模拟配置：

1. 复制位于`/.github/mock-google-services.json` 的文件。
2. 上面文件的副本重命名为`google-services.json` 将其放置在以下每个文件夹中：
   - @@保护0@@
   - @@保护0@@
   - @@保护0@@
3. 完成此步骤后，您的项目中应该有以下文件：
   - @@保护0@@
   - @@保护0@@
   - @@保护0@@

### 实现真正的 Firebase 项目

请按照我们的[Push notification guide](/developers/android/tips/fcm_push_notification)获取其他设置说明。

## 下一步怎么办？

现在您已经构建了应用程序，请浏览文档的其余部分，以加深您对项目的理解。 [Architecture guide](/developers/android/architecture) 是一个很好的起点，它解释了代码库的一般结构。

## 需要帮助吗？

如果您遇到困难，请随时寻求帮助！ **@@保护0@@**，请确保选择开发人员角色并前往**@@保护0@@** 项目线程与其他贡献者联系以寻求帮助。