## 为什么测试很重要

Home Assistant iOS 应用涵盖多个 target 和平台。测试有助于在贡献者更改共享逻辑、onboarding、widgets、notifications、watch 功能和与 Home Assistant 的集成时，确保行为的稳定性。

## 默认测试命令

在本地环境中运行默认测试，执行：

```bash
bundle exec fastlane test
```

这将在本地 Fastlane test lane 配置的模拟器上运行 `HomeAssistant.xcworkspace` 中的 `Tests-Unit` scheme。

## 测试布局

仓库包含多个测试区域：

* `Tests/App`：应用特定行为
* `Tests/Shared`：共享逻辑、模型、数据库、传感器、通知和工具
* `Tests/UI`：UI 自动化测试
* `Tests/Widgets`：widget 相关的快照式测试

## 仓库中的测试类型

### 单元测试和功能测试

大多数贡献者更改应附带在 `Tests/App` 或 `Tests/Shared` 中的针对性测试。这些测试由默认 CI test lane 运行。

### UI 测试

UI 测试位于 `Tests/UI` 下。当行为最好通过用户交互验证而非隔离逻辑验证时，使用它们。

### 快照和 widget 测试

仓库包含 widget 和快照测试，包括存储在 `Tests/Widgets/__Snapshots__` 下的快照。如果你有意更改 widget 或视觉输出，请仔细检查快照更新。

### Push server 测试

`Sources/PushServer` 下的更改还应使用以下命令验证：

```bash
cd Sources/PushServer
swift test
```

## 良好的测试习惯

* 保持测试聚焦于单一行为
* 优先使用确定性测试而非依赖时序的测试
* 在可能出现回归的地方添加覆盖率，尤其是在共享代码中
* 更改跨 target 行为时，不要只考虑主应用，尽量在接近共享逻辑的地方添加测试

## 从 Xcode 运行测试

在 Xcode 中，从 **HomeAssistant.xcworkspace** 运行相关测试 scheme：

* **Tests-Unit**：主要自动化测试套件
* **Tests-UI**：UI 自动化覆盖率

使用与 CI 相同的 workspace 和 scheme，可减少后续意外。
