# 前端开发

Home Assistant 前端使用 Web Components 构建。关于我们技术选型的更多背景，请[参阅这篇博客文章](https://developers.home-assistant.io/blog/2019/05/22/internet-of-things-and-the-modern-web.html)。

:::caution
请勿在生产环境中使用开发模式。Home Assistant 使用激进的缓存策略来提升移动端体验。开发期间会禁用这些缓存，因此你无需在每次修改之间重启服务器。
:::

## 设置环境

请先按照我们的[devcontainer development environment](/developers/setup_devcontainer_environment.md)指南设置合适的开发环境。

### 获取代码

第一步是 fork [frontend repository][hass-frontend]，并添加 upstream remote。你可以将 fork 后的仓库放在系统中的任意位置。

```shell
git clone git@github.com:YOUR_GIT_USERNAME/frontend.git
cd frontend
git remote add upstream https://github.com/home-assistant/frontend.git
```

### 配置 Home Assistant

你需要先准备一个 Home Assistant 实例。关于开发实例，请参阅我们的[设置开发环境](/developers/development_environment.md)指南。

有两种方式可以测试前端。你可以运行一个 Home Assistant Core 开发实例，或者将前端配置为连接到一个现有的 Home Assistant 实例。第一种方式与生产环境中的工作方式一致。第二种方式允许以前端开发模式连接现有 Home Assistant，并尽量减少干扰。缺点是并非所有内容都能以这种方式测试。例如，登录页面始终会使用你的 Home Assistant 内置的那个版本。

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

<Tabs>

<TabItem value="With a dev instance of HA Core">

#### 使用 Visual Studio Code + dev container 开发

要将 Home Assistant 配置为对前端使用开发模式，请更新 `configuration.yaml` 中的 frontend 配置，并将路径设置为你在上一步克隆的 frontend 仓库：

如果你正在为 Home Assistant Core 使用带 dev containers 的 Visual Studio Code，则需要将 frontend 仓库挂载到 dev container 中。在 Home Assistant Core 仓库里的 `.devcontainer/devcontainer.json` 中添加以下部分：

```json
"mounts": [
  "source=/path/to/hass/frontend,target=/workspaces/frontend,type=bind,consistency=cached"
]
```

按下 Shift+Command+P（Mac）或 Ctrl+Shift+P（Windows/Linux）打开 Command Palette，然后选择 **Dev Containers: Rebuild Container** 命令，以重建 dev container。

编辑 Home Assistant Core 仓库根目录下的 `config/configuration.yaml`，加入以下内容：

```yaml
frontend:
  development_repo: /workspaces/frontend
```

:::note
这是 dev container 内部的挂载路径，参见上方的 `target` 参数。如果 `source` 路径不正确，web frontend 将无法工作。
:::

在 VS Code 中运行 Home Assistant Core：

1. 打开 Command Palette：
   * Mac: `Shift+Command+P`
   * Windows/Linux: `Ctrl+Shift+P`
2. 选择 **Tasks: Run Task**
3. 选择 **Run Home Assistant Core**

:::caution
对 `.devcontainer/devcontainer.json` 的改动应从所有 PR 中排除，因为其中包含你本地 `frontend` 仓库的路径。由于 `.devcontainer/devcontainer.json` 中的设置仅在容器重建时处理，因此在重建完成后，你可以安全地回滚该改动。
:::

#### 使用手动环境开发

如果你是手动搭建 Home Assistant Core 开发环境，请在 `configuration.yaml` 中填入 frontend 仓库路径：

```yaml
frontend:
  # Example path: /home/paulus/dev/hass/frontend
  development_repo: /path/to/hass/frontend
```

:::tip
`configuration.yaml` 文件位于 Home Assistant Core 仓库根目录下的 `config` 目录中。如果路径不正确或无法访问，web frontend 将无法工作。
::: </TabItem>

<TabItem value="With a production instance of HA Core">

如果你想让开发中的前端连接到一个现有的 Home Assistant 实例，而不是完全替换 UI，那么你需要在它将连接到的那个 Home Assistant 的 `configuration.yaml` 中添加你的开发前端所托管的 url，如下所示：

```yaml
http:
  cors_allowed_origins:
    - http://localhost:8124
```

在你按照[开发](#development)一节中的说明设置好前端开发环境，并能够运行 `script/develop` 脚本后，你可以使用下面这个命令来替代开发流程，在 http://localhost:8124 上运行前端，并连接到运行在 http://localhost:8123 的 Home Assistant。请注意，如果你是在 devcontainer 中运行该命令，那么该 url 应该可从容器宿主机访问。

```shell
script/develop_and_serve
```

你可以通过传入 `-c` 选项来修改前端连接的 Home Assistant url。这同样适用于现有的生产 core 实例；它不必是本地托管的开发版本。不过，如果你修改了这个选项的值，你需要先从开发前端中退出登录，之后它才会真正切换到新值。例如：

```shell
script/develop_and_serve -c https://homeassistant.local:8123
```

你可以通过传入 `-p` 选项来修改前端服务端口。请注意，如果你是在 devcontainer 中运行，并且想从容器宿主机访问它，还需要同时设置端口转发。例如：

```shell
script/develop_and_serve -p 8654
```

</TabItem>

</Tabs>

### 安装 Node.js（仅手动环境）

构建前端需要 Node.js。安装 node.js 的首选方式是使用 [nvm](https://github.com/nvm-sh/nvm)。请按照 [README](https://github.com/nvm-sh/nvm#install--update-script) 中的说明安装 nvm，然后运行以下命令安装正确版本的 node.js：

```shell
nvm install
```

[Yarn](https://yarnpkg.com/en/) 用作 node modules 的包管理器。[按这里的说明安装 yarn。](https://yarnpkg.com/getting-started/install)

### 安装开发依赖并获取最新翻译

通过安装开发依赖并下载最新翻译来初始化前端开发环境。

```shell
nvm use
script/bootstrap
script/setup_translations
```

:::note
即使你使用的是 dev containers，这一步也需要手动完成。另外，系统会要求你输入一个代码并授权脚本获取最新翻译。

如果之前的授权不再可用（例如在获取翻译时看到 “Bad Credentials” 错误），请删除 `translations` 文件夹中的 `token.json` 文件，然后再次执行 `script/setup_translations` 以重新触发授权流程。
:::

:::note
如果你使用的是 development container，请在容器内部运行这些命令。
:::

## 开发

### 运行开发服务器

运行以下脚本以构建前端并启动开发服务器：

```shell
nvm use
script/develop
```

当脚本完成前端构建，并且 Home Assistant Core 已正确配置后，可通过 `http://localhost:8123` 访问前端。服务器会在你修改源文件时自动重新构建前端。

### 在现有 HA 实例上运行开发前端

运行以下命令启动开发服务器：

```shell
nvm use
script/develop_and_serve -c https://homeassistant.local:8123
```

你可能需要将 "https://homeassistant.local:8123" 替换为你的本地 Home Assistant url。

### 浏览器设置

打开 Google Chrome 的 Developer tools，并确保已禁用缓存且相关设置正确，以避免使用陈旧内容：

:::info
说明基于 Google Chrome
:::

1. 在 **Network** > **Disable cache** 中勾选禁用缓存

<p class='img'>
  <img src='/developers/img/en/development/disable-cache.png' />
</p>

2. 在 **Application** > **Service Workers** > **Bypass for network** 中启用 Bypass for network

<p class='img'>
  <img src='/developers/img/en/development/bypass-for-network.png' />
</p>

## 创建 pull requests

如果你计划向 Home Assistant 代码库提交 PR，你需要 fork frontend 项目，并将你的 fork 添加为 Home Assistant frontend 仓库的一个 remote。

```shell
git remote add fork <github URL to your fork>
```

当你完成更改并准备推送时，切换到 frontend 项目的工作目录，然后推送你的更改

```bash
git add -A
git commit -m "Added new feature X"
git push -u fork HEAD
```

## 构建前端

如果你更改了前端打包方式，可能有必要在主仓库中测试一个新的已打包前端版本（而不是直接指向 frontend 仓库）。为此，请先运行 `script/build_frontend` 构建前端的生产版本。

要在 Home Assistant 中测试它，请从主 Home Assistant 仓库运行以下命令：

```shell
pip3 install -e /path/to/hass/frontend/ --config-settings editable_mode=compat
hass --skip-pip-packages home-assistant-frontend
```

[hass-frontend]: https://github.com/home-assistant/frontend

## 测试现有 PR

有时你需要在不同环境中测试前端更改，或在不搭建完整开发环境的情况下进行测试。例如，你可能想在 Home Assistant OS 实例上测试更改，或在 PR 合并前验证某个修复是否在你的特定环境中生效。

`development_pr` 选项允许你通过自动下载并使用来自 GitHub 的前端 artifact，轻松测试前端 PR。

### 配置

要使用此功能，你需要同时提供一个 PR 编号和一个 GitHub token。

#### 创建 GitHub token

1. 前往 [GitHub Settings > Developer Settings > Personal Access Tokens > Fine-grained tokens](https://github.com/settings/personal-access-tokens)
2. 点击 "Generate new token"
3. 为它指定一个具有描述性的名称，例如 "Home Assistant Frontend Testing"
4. 设置过期日期（推荐：90 天或更短）
5. 在 "Repository access" 下选择 "Public Repositories (read-only)"
6. 跳过 'Permissions' 部分（留空）
7. 点击 "Generate token"
8. 立即复制 token（之后将无法再次查看）

#### 在 Home Assistant 中配置

将以下内容添加到你的 `configuration.yaml`：

```yaml
frontend:
  development_pr: <PR_NUMBER>
  github_token: <YOUR_GITHUB_TOKEN>
```

例如，要测试 PR #12345：

```yaml
frontend:
  development_pr: 12345
  github_token: ghp_your_token_here
```

添加该配置后，重启 Home Assistant 以使更改生效。

:::warning
请妥善保管你的 GitHub token。不要将其提交到版本控制，也不要公开分享。
:::

#### 恢复到生产前端

若要停止使用 PR 构建并恢复为标准 Home Assistant 前端：

1. 从你的 `configuration.yaml` 中移除 `development_pr` 和 `github_token` 两行
2. 重启 Home Assistant

Home Assistant 会自动恢复使用内置的生产前端。

### 工作原理

当你配置了 `development_pr` 后，Home Assistant 会在启动期间从 GitHub 上指定的 PR 下载前端构建 artifact，并使用它替代生产版本。该 artifact 会缓存在本地；在后续重启时，Home Assistant 会通过比较 SHA 值来检查该 PR 是否有新提交。如果发现了更新版本，它会自动下载更新后的 artifact。

:::info
如果你同时配置了 `development_repo` 和 `development_pr`，则 `development_repo` 优先。此时会使用本地开发仓库，而不是 PR 构建。
:::

### 使用场景

这在以下情况下尤其有用：

* **在 HAOS 上测试**：无需搭建开发环境，即可在 Home Assistant OS 上测试 PR
* **特定环境测试**：验证某个修复是否在你的特定硬件、网络或浏览器配置上有效
* **快速验证**：无需克隆仓库并在本地构建前端，也能测试修复或功能

### 限制

* PR 必须成功构建，并且 GitHub 上有可用的 artifacts
* 前端 artifacts 仅在 PR 构建完成后的 7 天内可用
* 此功能仅用于测试，不应在生产环境中使用

#### 重新生成 artifact

如果 artifact 已不可用（例如已超过 7 天），或者你想在该 PR 中测试新的上游更改，这会很有帮助。

如果你是该 PR 的作者，可以通过以下方式触发新的 artifact：

* 更新你的分支——可以将 `dev` 分支合并进来，或 rebase 到最新的 `dev` 分支之上。这会触发构建流水线，并生成一个可供 Home Assistant 下载的新 artifact。
* 关闭并重新打开该 PR，以触发新的构建。

如果你不是作者，可以请对方更新其 PR 分支以触发新的构建。

:::info
要使用新的 artifact，你必须重启 Home Assistant core
:::
