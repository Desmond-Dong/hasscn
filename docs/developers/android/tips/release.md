---
title: "构建 release"
sidebar_label: "构建 release"
---

:::warning
确保 keystore 安全存储且未包含在版本控制中。凭据同样适用此要求。
:::

## 构建 release

要为发布构建应用，你需要对其进行签名。请遵循以下步骤：

### 步骤 1：创建或使用现有 keystore

在构建应用之前，你必须拥有一个 keystore。你可以创建一个新的或使用现有的 keystore。

#### 创建 keystore

你可以直接从 Android Studio 创建 keystore：

1. 进入 **菜单** > **Build** > **Generate Signed APK**。
2. 选择创建新 keystore 的选项。
3. **记住密码和 key alias**，以便将来使用。

#### 使用现有 keystore

如果你已有 keystore，请确保其命名为 `release_keystore.keystore` 并放置在以下文件夹中：
- `app`
- `wear`

或者，你可以通过设置 `KEYSTORE_PATH` 环境变量来指定自定义位置。

---

### 步骤 2：构建应用

你可以使用 Android Studio 或命令行（CLI）来构建应用。

#### 从 Android Studio

1. 打开 Android Studio。
2. 进入 **菜单** > **Build** > **Generate Signed APK**。
3. 选择你创建的 keystore 或现有的一个。
4. 按照步骤构建应用。

#### 从 CLI

1. **设置环境变量**
   定义 `app/build.gradle.kts` 中使用的以下环境变量：
   - `KEYSTORE_PASSWORD`
   - `KEYSTORE_ALIAS`
   - `KEYSTORE_ALIAS_PASSWORD`
   - `KEYSTORE_PATH`（如果 keystore 位于自定义位置）

2. **构建应用**
   要构建 APK，请运行：

   ```bash
   ./gradlew assembleRelease # 构建所有应用
   # 或
   ./gradlew :<GRADLE_MODULE>:assembleRelease # 构建特定模块，例如 :app、:automotive 或 :wear
   ```

   要构建 AAB，请运行：

   ```bash
   ./gradlew bundleRelease # 构建所有应用
   # 或
   ./gradlew :<GRADLE_MODULE>:bundleRelease # 构建特定模块，例如 :app、:automotive 或 :wear
   ```
