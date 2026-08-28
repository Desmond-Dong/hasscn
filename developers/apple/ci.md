Home Assistant iOS 仓库使用 **GitHub Actions** 配合 **Fastlane** 进行 linting、测试、构建、本地化更新和分发。

## 主 CI 工作流

CI 在 pull request 和推送到 `main` 时运行。

## Linting 任务

每次 pull request，CI 运行 [编码风格指南](/developers/apple/codestyle.md) 中描述的相同 linter：

* 使用 SwiftFormat 检查 Swift 格式
* 使用 SwiftLint lint Swift 代码，包括仓库的自定义规则
* 使用 RuboCop lint Ruby（Fastlane）代码
* Lint YAML 文件（工作流和配置）

这些在容器中的 Linux 上运行，这保持了风格检查的快速，并独立于 macOS 构建环境。

## Pull request 安全检查

仓库有额外的仅针对 pull request 的检查：

### SwiftLint disable 检测

如果 PR 添加了新的 `// swiftlint:disable` 行，CI 会在 pull request 上评论，以便维护者审查该抑制是否必要。

### 未使用本地化检测

CI 运行 `Tools/detect_unused_strings.py`，并在发现未使用的本地化字符串时在 pull request 上评论。

## 测试 job

`test` job 在 macOS 上运行，并使用：

* 当前 CI Xcode 版本
* 用于 Ruby 依赖的 Bundler
* 用于 Apple 平台依赖的 CocoaPods
* `bundle exec fastlane test`

默认的 Fastlane test lane 在 CI 配置的模拟器上运行 `HomeAssistant.xcworkspace` 中的 `Tests-Unit` scheme。有关确切的 Xcode 和模拟器版本，请参阅 [`ci.yml`](https://github.com/home-assistant/iOS/blob/main/.github/workflows/ci.yml)。

CI 还会上传：

* 来自 `Tests-Unit.xcresult` bundle 的代码覆盖率
* 测试日志和崩溃诊断
* 用于快速验证和仅 frontend 测试的模拟器 `.app` artifact

## 分发工作流

`distribute.yml` 工作流在推送到 `main` 时运行，也可以由拥有仓库写权限的维护者手动触发。它构建：

* iOS App Store artifact
* macOS artifact，包括 Developer ID 和 App Store 打包

这些构建使用 Fastlane lane 进行签名、归档、导出、公证和上传到 Apple 服务。

## 其他工作流

### 本地化更新

`download_localized_strings.yml` 按计划运行，也可以由拥有仓库写权限的维护者手动触发。它与 Lokalise 同步本地化字符串，并在有更新时打开 pull request。

### Push server 测试

`push_ci.yml` 对 `Sources/PushServer/**` 下的更改运行 `swift test`。

### 版本递增

`set_version.yml` 通过 Fastlane 更新 `Configuration/Version.xcconfig`，并打开一个包含版本变更的 pull request。

## 这对你意味着什么

CI 验证的不仅仅是编译：风格、字符串和 artifact 也是审查循环的一部分。有关 linting，请参阅[编码风格指南](/developers/apple/codestyle.md)；有关在推送之前在本地运行测试，请参阅[入门指南](/developers/apple/get_started.md)。
