## 如何在 debug 构建中禁用 LeakCanary

[LeakCanary](https://square.github.io/leakcanary/) 是一个强大的工具，用于检测 Android 应用中的内存泄漏。但在某些场景下你可能想要禁用它，例如准备用于性能测试的 debug 构建或不需要它时。

### 通过 Gradle 命令禁用 LeakCanary

你可以在 Gradle 命令中传递 `-PnoLeakCanary` 标志来手动禁用 LeakCanary。例如：

```bash
./gradlew app:assembleFullDebug -PnoLeakCanary
```

此标志确保 LeakCanary 被排除在构建之外。

### 通过 properties 文件禁用 LeakCanary

或者，你也可以通过在 `gradle.properties` 文件中设置 `noLeakCanary` 属性来禁用 LeakCanary。这可以在项目级别或主目录级别完成。

```properties
noLeakCanary=true
```

::::warning
如果禁用了 LeakCanary，你需要更新 lockfile；否则 Gradle 会抱怨依赖存在问题。

[如何更新 lockfile](/developers/android/tips/dependencies.md#updating-dependencies-and-lockfiles)。
::::

## 使用 LeakCanary 的最佳实践

* **定期监控内存泄漏**：在开发过程中使用 LeakCanary 来及早发现并修复内存泄漏。
* **记录已知泄漏**：如果内存泄漏是由第三方库引起且无法立即修复，请记录下来以供将来参考。
* **报告泄漏**：如果 LeakCanary 报告了泄漏，请打开一个 GitHub issue。
