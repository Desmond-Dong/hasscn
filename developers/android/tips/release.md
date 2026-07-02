# 为发布而构建

:::warning
确保密钥库安全存储且不包含在版本控制中。它也适用于凭证。
:::

## 构建以供发布

要构建用于发布的应用程序，您需要对其进行签名。请按照下列步骤操作：

### 步骤 1：创建或使用现有密钥库

在构建应用程序之前，您必须有一个密钥库。您可以创建一个新的密钥库或使用现有的密钥库。

#### 创建密钥库

您可以直接从 Android Studio 创建密钥库：

1. 转到**菜单** > **建造** > **生成签名的APK**。
2. 选择创建新密钥库的选项。
3. **记住密码和密钥别名** 供将来使用。

#### 使用现有的密钥库

如果您已有密钥库，请确保其名为 `release_keystore.keystore` 并放置在以下文件夹中：

* @@保护0@@
* @@保护0@@

或者，您可以通过设置 `KEYSTORE_PATH` 环境变量来指定自定义位置。

***

### 第 2 步：构建应用程序

您可以使用 Android Studio 或命令行 (CLI) 构建应用程序。

#### 来自 Android Studio

1. 打开 Android Studio。
2. 转到**菜单** > **建造** > **生成签名的APK**。
3. 选择您创建的密钥库或现有的密钥库。
4. 按照步骤构建应用程序。

#### 从 CLI

1. @@格式0@@
   定义 `app/build.gradle.kts` 中使用的以下环境变量：
   * @@保护0@@
   * @@保护0@@
   * @@保护0@@
   * `KEYSTORE_PATH`（如果您的密钥库位于自定义位置）

2. @@格式0@@
   要构建 APK，请运行：

   ```bash
   ./gradlew assembleRelease # To build all the apps
   # OR
   ./gradlew :<GRADLE_MODULE>:assembleRelease # To build a specific module, such as :app, :automotive, or :wear
   ```

要构建 AAB，请运行：

```bash
./gradlew bundleRelease # To build all the apps
# OR
./gradlew :<GRADLE_MODULE>:bundleRelease # To build a specific module, such as :app, :automotive, or :wear
```
