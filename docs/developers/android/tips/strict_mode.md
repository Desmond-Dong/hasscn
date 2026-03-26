---
title: "严格模式"
sidebar_label: "严格模式"
---

## 调试版本中的严格模式

当您在 Android 上以调试模式运行应用程序时，StrictMode 默认处于启用状态。 StrictMode 可帮助您识别主线程上的意外磁盘或网络访问，以及开发过程中的其他潜在问题。有关详细信息，请参阅[StrictMode documentation](https://developer.android.com/reference/android/os/StrictMode)。

StrictMode 还可以通过在开发早期突出显示已弃用或有问题的行为来帮助我们迁移到新版本的 Android API。

[VM policy](https://developer.android.com/reference/android/os/StrictMode.VmPolicy.Builder) 配置有`death` 惩罚，[threading policy](https://developer.android.com/reference/android/os/StrictMode.ThreadPolicy.Builder) 设置为`log`。在开发时仔细检查日志以发现并解决任何问题。

如果您在开发过程中遇到 StrictMode 引起的问题，可以通过设置 `noStrictMode` Gradle 标志来暂时禁用它：

```bash
./gradlew app:assembleFullDebug -PnoStrictMode
```

如果您需要禁用 StrictMode，请在 GitHub 上提出问题或在 Discord 上联系。这有助于确保问题得到跟踪并且不会影响其他开发人员。