---
title: "StrictMode"
sidebar_label: "StrictMode"
---

## debug 构建中的 StrictMode

在 Android 上以 debug 模式运行应用时，StrictMode 默认启用。StrictMode 帮助你识别在主线程上意外进行的磁盘或网络访问，以及开发过程中的其他潜在问题。更多信息请参阅 [StrictMode 文档](https://developer.android.com/reference/android/os/StrictMode)。

StrictMode 还帮助我们在开发早期通过突出显示已弃用或有问题的行为来迁移到新的 Android API 版本。

[VM policy](https://developer.android.com/reference/android/os/StrictMode.VmPolicy.Builder) 配置了 `death` penalty，[threading policy](https://developer.android.com/reference/android/os/StrictMode.ThreadPolicy.Builder) 设置为 `log`。在开发过程中仔细查看日志以发现并解决任何问题。

如果在开发过程中遇到由 StrictMode 引起的问题，你可以通过设置 `noStrictMode` Gradle 标志来临时禁用它：

```bash
./gradlew app:assembleFullDebug -PnoStrictMode
```

如果需要禁用 StrictMode，请在 GitHub 上打开 issue 或在 Discord 上寻求帮助。这有助于确保问题被跟踪且不影响其他开发者。
