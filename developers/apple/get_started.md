本指南将带你走完克隆仓库、安装依赖、配置本地签名和运行应用的最快路径。

## 要求

你需要：

* [Xcode 26.2 或更高版本](https://developer.apple.com/xcode/)
* 通过 [Homebrew](https://formulae.brew.sh/formula/ruby)、[`rbenv`](https://github.com/rbenv/rbenv) 或 [`mise`](https://mise.jdx.dev/) 安装的 Ruby 3.1（有关示例，请参见下方的[安装依赖](#install-dependencies)）

Ruby 为 **Bundler**（用于 Ruby 工具链）和 **[CocoaPods](https://cocoapods.org/)**（用于 Apple 平台依赖）提供动力，这两者都是作为依赖安装步骤的一部分进行安装的。

## Fork、clone 并创建分支

### Fork 仓库

1. 打开 [Home Assistant iOS 仓库](https://github.com/home-assistant/iOS)。
2. 点击 **Fork** 创建你自己的副本。

### Clone 你的 fork

```bash
git clone https://github.com/<your-github-username>/iOS.git
cd iOS
```

### 创建分支

在进行更改之前创建分支：

```bash
git checkout -b feature/my-change
```

## 安装依赖

选择一个适合你的 Ruby 设置，然后安装 gems 和 pods。

### 使用 Homebrew Ruby 的示例

```bash
brew install ruby@3.1 cocoapods
$(brew --prefix)/opt/ruby@3.1/bin/bundle install
$(brew --prefix)/opt/ruby@3.1/bin/bundle exec pod install --repo-update
```

### 使用 `mise` 的示例

```bash
brew install mise
mise install
bundle install
bundle exec pod install --repo-update
```

如果你已经有一个可用的 Ruby 环境，`bundle install` 后跟 `bundle exec pod install --repo-update` 就足够了。

## 配置本地代码签名

Debug 构建使用自动配置，但由于应用使用了多个 entitlement，你仍然需要本地覆盖。

创建 `Configuration/HomeAssistant.overrides.xcconfig` 并添加：

```text
DEVELOPMENT_TEAM = YourTeamID
BUNDLE_ID_PREFIX = some.bundle.prefix
```

* `DEVELOPMENT_TEAM` 是你的 Apple 开发者团队标识符。
* `BUNDLE_ID_PREFIX` 应该是你控制的 prefix，以便 Xcode 可以创建本地 provisioning profile。

该文件被 Git 忽略，应保持在本地。

## 打开并运行应用

依赖安装完成后：

1. 在 Xcode 中，打开 **HomeAssistant.xcworkspace**。
2. 在 scheme 选择器中，选择 **App-Debug**。
3. 在 destination 选择器中，选择一个 iOS 模拟器或开发设备。
4. 在 Xcode 中构建并运行。

**App-Debug** 是本地开发的常规入口点。

## 有用的本地命令

运行仓库质量检查：

```bash
bundle exec fastlane lint
```

对支持的问题运行自动修正：

```bash
bundle exec fastlane autocorrect
```

运行默认的自动化测试套件：

```bash
bundle exec fastlane test
```

## 测试 Home Assistant frontend 更改

如果你正在 [Home Assistant frontend](https://github.com/home-assistant/frontend)（在应用的 WebView 内渲染的 web UI）上工作，并且只需要验证这些更改，你可以跳过自己构建应用：

1. 下载 CI 在最近一次 `main` 构建中生成的模拟器应用 artifact。
2. 将其安装到 iOS 模拟器中。
3. 使用 Safari Web Inspector 调试嵌入的 WebView。

## 下一步是什么？

* 阅读[架构指南](/developers/apple/architecture.md)了解代码库布局。
* 浏览[目标概述](/developers/apple/targets.md)查看每个 surface（iPhone、Watch、CarPlay、widgets 等）。
* 在打开 pull request 之前，审阅[编码风格指南](/developers/apple/codestyle.md)。
* 在[持续集成指南](/developers/apple/ci.md)中了解 CI 如何工作。
* [加入我们的 Discord 社区](https://www.home-assistant.io/join-chat)，确保选择开发者角色，并前往 **[iOS](https://discord.com/channels/330944238910963714/1481713628553019392)** 项目线程，与其他贡献者联系。
