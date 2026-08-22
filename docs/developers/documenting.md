---
title: "为文档做贡献"
---

用户文档位于 [https://www.home-assistant.io](https://www.home-assistant.io)。
本节提供有关创建或修改内容的更多详细信息。

[home-assistant.io](https://home-assistant.io) 网站是使用 [Jekyll](https://github.com/jekyll/jekyll) 构建的。
页面是用 [Markdown](https://spec.commonmark.org/current/) 编写的。要添加一个页面，你不需要了解 HTML。

## 文档 PR 审查流程

在提交 PR 之前，请通读[通用 PR 审查流程](/developers/review-process)。
此外，在贡献文档时，还需考虑以下文档指南。

文档仓库有两个主要分支：`current` 和 `next`：

- 如果你在编写新集成或正在向代码添加功能的文档，请将目标指向 `next` 分支。
- 如果你在改进现有文档，请将目标指向 `current` 分支。

我们主要遵循 Microsoft Writing Style Guide，并有一些额外的指南：

- [文档标准](/developers/documenting/standards)
- [文档风格指南](/developers/documenting/general-style-guide)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [Merriam-Webster Dictionary](https://www.merriam-webster.com/)
- [YAML 风格指南](/developers/documenting/yaml-style-guide)

## 小的更改

你可以使用 **Edit** 按钮或 **Edit this page** 链接来编辑页面，它会自动在 GitHub 中创建一个 fork，并允许你快速编辑。请注意，使用这种方式工作时无法上传图片。你在自己的更改上工作并通过 PR 提出。

创建 PR 时，可以通过点击 Netlify 评论中的 **Deploy Preview** 链接来查看拟议更改的预览。

## 较大的更改

对于较大的更改，我们建议你克隆网站仓库。这样，你可以在本地查看更改。在网站上工作的过程与在 Home Assistant 本身上工作的过程没有区别。

### 使用 Visual Studio Code + devcontainer 进行开发

开始开发最简单的方法是使用带有 devcontainers 的 Visual Studio Code，这与在 Home Assistant Core 开发中工作的方式相同。请查看[开发环境](/developers/development_environment)页面获取说明。
在按照这些说明操作时，将 Home Assistant Core 仓库替换为 `home-assistant.io` 仓库。

要查看更改，请打开 VS Code 命令面板并选择 **Tasks: Run Task** > **Preview**。
你应该能够访问在 `http://localhost:4000` 上本地运行的文档网站。

### 手动环境

也可以设置一个更传统的开发环境。

#### 安装依赖项

要在本地测试更改，你需要 Ruby 及其依赖项（称为 gems）。

1. Fork 并克隆 home-assistant.io 的 [git 仓库](https://github.com/home-assistant/home-assistant.io)。
2. 在本地 `home-assistant.io` 目录中，安装 Ruby。当前所需的版本请查看 [.ruby-version](https://github.com/home-assistant/home-assistant.io/blob/current/.ruby-version)。
3. 为你的操作系统安装 Ruby 和 Bundler。

    - Fedora：

        ```shell
        sudo dnf -y install \
          gcc-c++ ruby ruby-devel rubygem-bundler rubygem-json rubygem-rake
        bundle
        ```

    - Debian/Ubuntu：

        ```shell
        sudo apt-get install \
          ruby ruby-dev ruby-bundler ruby-json g++ zlib1g-dev
        bundle
        ```

    - macOS，如果捆绑的 Ruby 不起作用：

        ```shell
        RUBY_FORMULA="ruby@$(cut -d . -f 1,2 .ruby-version)"
        brew install "$RUBY_FORMULA"
        export PATH="$(brew --prefix "$RUBY_FORMULA")/bin:$PATH"
        ```

4. 如果在上一步中尚未安装 gems，请在 `home-assistant.io` 目录中运行 `bundle`。

##### 可选：使用 mise-en-place 安装 Ruby

如果你使用 [mise-en-place](https://mise.jdx.dev/) 管理 Ruby，请使用 `mise` 代替主流程中的第 3 步。

在 Fedora 上，首先安装 `mise` 安装 Ruby 所需的包：

```shell
sudo dnf -y install \
  gcc-c++ make perl-FindBin openssl-devel readline-devel \
  zlib-ng-compat-devel libyaml-devel gmp-devel
```

信任仓库配置，以便 `mise` 从 `.ruby-version` 读取所需版本：

```shell
mise trust
mise install ruby
gem install bundler
bundle
```

#### 在本地预览网站

1. 生成第一次预览：

    ```shell
    bundle exec rake generate
    ```

    这可能需要一分钟的时间。
2. 创建、编辑或更新页面。集成文档位于 `source/_integrations/` 中。Home Assistant 文档位于 `source/_docs/` 中。
3. 启动本地预览：

    ```shell
    bundle exec rake preview
    ```

4. 在浏览器中打开 [http://127.0.0.1:4000](http://127.0.0.1:4000)。在预览运行期间，文件更改会被自动检测，受影响的页面会重新构建。在浏览器中刷新页面即可查看更新。
5. 准备提交 PR 时，请按照[文档 PR 审查流程](#documentation-pull-request-review-process)操作。

#### 在无头机器上预览网站

通过 `bundle exec rake` 生成的站点只能本地访问。如果你在无头机器上进行开发，请使用端口转发：

```shell
ssh -L 4000:localhost:4000 user_on_headless_machine@ip_of_headless_machine
```
