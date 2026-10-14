## 开始 Home Assistant Android 开发

欢迎使用 Home Assistant Android 开发指南！本文档将帮助你设置环境、fork 仓库并构建你的第一个应用。

## 设置开发环境

要开始，请安装最新稳定版的 [Android Studio](https://developer.android.com/studio)。这是你构建应用所需的唯一工具。

## Fork、clone 并创建分支

### Fork 仓库

1. 打开 [Home Assistant Android 仓库](https://github.com/home-assistant/android)。
2. 点击 **Fork** 创建你自己的仓库副本。

:::tip
如果遇到任何问题，请参阅 [GitHub 关于 fork 仓库的文档](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)。
:::

### Clone 你 fork 的仓库

fork 仓库后，使用以下命令将其克隆到本地机器：

```bash
git clone https://github.com/<your-github-username>/android.git
```

或者，你可以使用 Android Studio：

1. 进入 `File -> New -> Project from Version Control...`。
2. 输入你的仓库 URL 并 clone 它。

### 创建分支

在进行任何更改之前，创建一个能反映你所做工作的、有意义的分支名。例如：

```bash
git checkout -b feature/add-new-feature
```

:::tip
如果你是 Git 新手，请参阅 [Git 分支指南](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)。你也可以直接在 Android Studio 中创建分支。
:::

## 构建 Home Assistant 应用

在本地 clone 仓库后，你可以使用 Android Studio 或终端来构建应用。

### 从 Android Studio

1. 在 Android Studio 中打开项目。
2. 同步 Gradle 文件。
3. 点击顶部栏的绿色 **Play** 按钮。Android Studio 会自动创建模拟器并为你运行应用。

:::note
项目需要安装 **NDK**（Native Development Kit）和 **CMake**。这些通常在项目同步期间自动安装。如果自动安装失败，你可以手动安装：

1. 打开 **Android Studio > Settings > Languages & Frameworks > Android SDK > SDK Tools**。
2. 勾选 **NDK (Side by side)** 和 **CMake**。
3. 安装项目根目录下 `libs.versions.toml` 文件中定义的特定版本。

:::

### 从终端

:::info
你需要将 `JAVA_HOME` 环境变量设置为一个 JDK。我们目前使用的是 JDK 21。
:::

#### 在 macOS/Linux 上

```bash
./gradlew assembleDebug
```

#### 在 Windows 上

```powershell
gradlew.bat assembleDebug
```

:::info
如果你需要创建 release 构建，请遵循 [release 构建说明](/developers/android/tips/release.md)。
:::

## Firebase 设置

Firebase 用于通知。如果你不需要这些功能，应该使用 mock Firebase 配置。

:::info
你仍然可以通过 WebSocket 发送通知，而无需使用 Firebase。
:::

### 设置 mock Firebase 项目

如果你不需要真实的 Firebase 功能，可以使用 mock 配置：

1. 复制位于 `/.github/mock-google-services.json` 的文件。
2. 将该文件的副本重命名并放置为 `google-services.json` 到以下每个文件夹中：
   * `/app`
   * `/automotive`
   * `/wear`
3. 完成此步骤后，你的项目中应包含以下文件：
   * `/app/google-services.json`
   * `/automotive/google-services.json`
   * `/wear/google-services.json`

### 设置真实的 Firebase 项目

请遵循我们的 [Push 通知指南](/developers/android/tips/fcm_push_notification.md) 获取更多设置说明。

## 下一步是什么？

在构建应用后，浏览其余文档以加深对项目的理解。一个好的起点是 [架构指南](/developers/android/architecture/overview.md)，它解释了代码库的整体结构。

## 需要帮助吗？

如果你遇到问题，请随时寻求帮助！ **[加入我们的 Discord 社区](https://www.home-assistant.io/join-chat)**，确保选择开发者角色，并前往 **[Android](https://discord.com/channels/330944238910963714/1346948551892009101)** 项目线程，与其他贡献者联系以获取帮助。
