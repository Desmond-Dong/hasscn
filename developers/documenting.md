# 参与文档贡献

用户文档位于 <https://www.home-assistant.io>。
本节补充说明如何创建或修改文档内容。

[home-assistant.io](https://home-assistant.io) 网站基于 [Jekyll](https://github.com/jekyll/jekyll) 构建。
页面使用 [Markdown](https://spec.commonmark.org/current/) 编写，因此新增页面时不需要了解 HTML。

## 文档 Pull Request 评审流程

在提交 Pull Request 之前，请先阅读[通用 Pull Request 评审流程](/developers/review-process.md)。
此外，参与文档贡献时还需要遵循以下规范。

文档仓库主要使用两个分支：`current` 和 `next`：

* 如果你在为新增的集成或新功能补充文档，请提交到 `next` 分支。
* 如果你是在改进已有文档，请提交到 `current` 分支。

我们主要遵循 Microsoft Writing Style Guide，并额外补充了以下规范：

* [Documentation standards](/developers/documenting/standards.md)
* [Documentation style guide](/developers/documenting/general-style-guide.md)
* [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
* [YAML Style Guide](/developers/documenting/yaml-style-guide.md)

## 小型改动

你也可以直接在 GitHub 中打开对应页面的源文件进行在线编辑。这样会自动创建一个 fork，便于快速修改。需要注意的是，这种方式下无法上传图片。完成修改后，请通过 Pull Request（PR）提交。

创建 Pull Request（PR）后，你可以在 Netlify 评论中点击 **Deploy Preview** 链接预览拟议改动。

## 较大改动

如果改动较大，建议先克隆网站仓库。这样你就可以在本地预览和检查修改结果。整体流程与参与 Home Assistant 本体开发并无本质区别。

### 使用 Visual Studio Code + devcontainer 开发

最简单的方式是使用 Visual Studio Code 配合 devcontainer，这与 Home Assistant Core 的开发环境配置方式相同。具体步骤请参考[开发环境](/developers/development_environment.md)页面。
按照这些说明操作时，请将仓库从 Home Assistant Core 替换为 `home-assistant.io`。

要预览改动，请打开 VS Code 命令面板，选择 **Tasks: Run Task** > **Preview**。
随后你应该可以通过 `http://localhost:4000` 访问本地运行的文档站点。

### 手动配置环境

你也可以使用更传统的本地开发环境。

如果要在本地测试修改，需要安装 **Ruby** 及其依赖（gems）：

* 如果尚未安装，请先[安装 Ruby](https://www.ruby-lang.org/en/documentation/installation/)。
  当前所需版本请参考 [.ruby-version](https://github.com/home-assistant/home-assistant.io/blob/current/.ruby-version)。

* 安装 Ruby 的依赖管理工具 `bundler`：`gem install bundler`（某些环境下可能需要使用 `sudo` 执行）。

* Fedora 快速安装命令：

  ```shell
  sudo dnf -y install gcc-c++ ruby ruby-devel rubygem-bundler rubygem-json && bundle
  ```

* Debian/Ubuntu 快速安装命令：

  ```shell
  sudo apt-get install ruby ruby-dev ruby-bundler ruby-json g++ zlib1g-dev && bundle
  ```

* macOS 快速安装命令（如果系统自带的 Ruby 不可用）：

  ```shell
  brew install ruby@3.1 && export PATH="/usr/local/opt/ruby@3.1/bin:$PATH"
  ```

* macOS 快速安装命令（如果系统自带的 Ruby 不可用；请确保在 `home-assistant.io` 目录下执行）：

  ```shell
  brew install ruby@$(cat .ruby-version) && export PATH="/usr/local/opt/ruby@$(cat .ruby-version)/bin:$PATH"
  ```

* Fork `home-assistant.io` [git 仓库](https://github.com/home-assistant/home-assistant.io)。

* 在 `home-assistant.io` 根目录执行 `bundle`，安装所需 gems。

完成后即可开始处理文档：

* 运行 `bundle exec rake generate` 生成首次预览，通常需要等待一分钟左右。
* 创建、编辑或更新页面。集成 / 平台文档位于 `source/_integrations/`，Home Assistant 自身文档位于 `source/_docs/`。
* 在本地测试 `home-assistant.io` 改动：执行 `bundle exec rake preview`，然后访问 <http://127.0.0.1:4000>。命令运行期间，文件变更会自动被检测并更新对应页面，但仍需你手动刷新浏览器。
* 如果文档对应的是新功能、平台或集成，请向 `home-assistant.io` 的 **next** 分支提交 Pull Request（PR）。
* 如果是修正文档问题、添加 Cookbook 条目，或扩展已有文档，请向 `home-assistant.io` 的 **current** 分支提交 Pull Request（PR）。

`bundle exec rake` 生成的站点仅能在本地访问。如果你是在无界面设备上开发，可以使用端口转发：

```shell
ssh -L 4000:localhost:4000 user_on_headless_machine@ip_of_headless_machine
```
