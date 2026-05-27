# 泄漏金丝雀🐤

## 如何在调试版本中禁用 LeakCanary

[LeakCanary](https://square.github.io/leakcanary/)是一个强大的工具，用于检测Android应用程序中的内存泄漏。但是，在某些情况下您可能希望禁用它，例如在为性能测试准备调试版本时或不需要它时。

### 通过 Gradle 命令禁用 LeakCanary

您可以通过在 Gradle 命令中传递 `-PnoLeakCanary` 标志来手动禁用 LeakCanary。例如：

```bash
./gradlew app:assembleFullDebug -PnoLeakCanary
```

该标志确保 LeakCanary 被排除在构建之外。

### 通过属性文件禁用 LeakCanary

或者，您可以通过在 gradle.properties 文件中设置 noLeakCanary 属性来禁用 LeakCanary。这可以在项目级别或家庭级别完成。

```properties
noLeakCanary=true
```

::::warning
如果禁用LeakCanary，则需要更新锁定文件；否则，Gradle 会抱怨依赖项的问题。

@@保护0@@。
::::

## 使用 LeakCanary 的最佳实践

* **定期监控内存泄漏**：在开发过程中使用 LeakCanary 尽早识别和修复内存泄漏。
* **记录已知泄漏**：如果内存泄漏是由第三方库引起的并且无法立即修复，请记录下来以供将来参考。
* **报告泄密**：如果 LeakCanary 报告泄漏，请打开 GitHub 问题。
