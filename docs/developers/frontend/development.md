---
title: "前端开发"
sidebar_label: "开发"
---

Home Assistant 前端基于 web components 构建。关于我们的技术选择的更多背景信息，[请参阅这篇博客](https://developers.home-assistant.io/blog/2019/05/22/internet-of-things-and-the-modern-web.html)。

:::caution
不要在生产环境中使用开发模式。Home Assistant 使用激进的缓存来改善移动端体验。在开发期间会禁用该缓存，这样你就不需要在每次更改之间重新启动服务器。
:::

## 设置环境

首先按照我们的 [devcontainer 开发环境](/developers/setup_devcontainer_environment) 指南，设置一个合适的开发环境。

### 获取代码

第一步是将 [frontend 仓库][hass-frontend] fork 到你的账户，并添加 upstream remote。你可以将 fork 后的仓库放在系统上的任意位置。

```shell
git clone git@github.com:YOUR_GIT_USERNAME/frontend.git
cd frontend
git remote add upstream https://github.com/home-assistant/frontend.git
```

### 配置 Home Assistant

你需要先设置好一个 Home Assistant 实例。开发实例请参考我们的 [设置开发环境](/developers/development_environment) 指南。

有两种方式可以测试前端：一种是运行开发实例 Home Assistant Core，另一种是配置前端以连接到一个已有的 Home Assistant 实例。第一种方式与其在生产环境中的工作方式一致。第二种方式允许以最小干扰的方式在已有 Home Assistant 上运行开发前端。缺点是无法测试所有功能。例如，登录页面将始终是你 Home Assistant 内置的那个。

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

<Tabs>

<TabItem value="使用 HA Core 开发实例">

#### 使用 Visual Studio Code + dev container 进行开发

要配置 Home Assistant 使其前端使用开发模式，请更新 `configuration.yaml` 中的前端配置，并将其设置为上一步中克隆的 frontend 仓库路径：

如果你在使用 Visual Studio Code 配合 dev containers 开发 Home Assistant Core，你需要将 frontend 仓库挂载到 dev container 中。将以下内容添加到 Home Assistant Core 仓库中的 `.devcontainer/devcontainer.json`：

```json
"mounts": [
  "source=/path/to/hass/frontend,target=/workspaces/frontend,type=bind,consistency=cached"
]
```

按 Shift+Command+P（Mac）/ Ctrl+Shift+P（Windows/Linux）打开 Command Palette，然后选择 **Dev Containers: Rebuild Container** 命令，以重新构建 dev container。

在 Home Assistant Core 仓库根目录下编辑 `config/configuration.yaml`，添加以下条目：

```yaml
frontend:
  development_repo: /workspaces/frontend
```

:::note
这是 dev container 内部的挂载路径，请参见上面的 `target` 参数。如果 `source` 路径不正确，web 前端将无法工作。
:::

在 VS Code 中运行 Home Assistant Core：

1. 打开 Command Palette：
   - Mac: `Shift+Command+P`
   - Windows/Linux: `Ctrl+Shift+P`
2. 选择 **Tasks: Run Task**
3. 选择 **Run Home Assistant Core**

:::caution
对 `.devcontainer/devcontainer.json` 的更改应从任何 PR 中排除，因为它包含你本地 `frontend` 仓库的路径。由于 `.devcontainer/devcontainer.json` 中的设置仅在容器重新构建时处理，因此在重新构建完成后，你可以安全地回滚该更改。
:::

#### 使用手动环境进行开发

如果你是手动为 Home Assistant Core 设置开发环境，请在 `configuration.yaml` 中填写 frontend 仓库路径：

```yaml
frontend:
  # 示例路径: /home/paulus/dev/hass/frontend
  development_repo: /path/to/hass/frontend
```

:::tip
`configuration.yaml` 文件位于 Home Assistant Core 仓库根目录下的 `config` 目录中。如果路径不正确或无法访问，web 前端将无法工作。
:::
</TabItem>

<TabItem value="使用生产 HA Core 实例">

如果你想将开发前端连接到一个已有的 Home Assistant 实例，而不完全替换其 UI，你需要在你将要连接的 Home Assistant 的 `configuration.yaml` 中添加开发前端的主机地址，如下所示：

```yaml
http:
  cors_allowed_origins:
    - http://localhost:8124
```

一旦前端开发环境设置完成（参见 [Development](#development) 部分），你可以使用以下命令替代标准 dev server。它会在 `http://localhost:8124` 上开发和运行前端，并连接到运行在 `http://localhost:8123` 的 Home Assistant。注意，如果你是从 devcontainer 运行此命令，则 URL 应能从容器主机访问。

```shell
yarn dev:serve
```

你可以通过传递 `-c` 选项来更改前端连接的 Home Assistant URL。这对于已有的生产核心实例同样适用。它不必是托管在本地上的开发版本。但是，如果你更改此选项的值，你需要先退出开发前端，它才会真正切换到新值。例如：

```shell
yarn dev:serve -c http://homeassistant.local
```

你可以通过传递 `-p` 选项来更改前端服务的端口。注意，如果你从 devcontainer 运行，还需要设置端口转发才能从容器主机访问它。例如：

```shell
yarn dev:serve -p 8654
```

:::note
如果你连接到一个生产环境的 Home Assistant 实例并使用 `-p` 更改端口，请确保 `cors_allowed_origins` 中包含带有对应端口的 frontend origin。对于上面的 `yarn dev:serve -p 8654` 示例，应添加 `http://localhost:8654` 而非 `http://localhost:8124`。
:::

:::note
它还接受 [在后台管理 dev server](#managing-the-dev-server-in-the-background) 中描述的 background lifecycle flags。
:::

</TabItem>

</Tabs>

### 安装 Node.js（仅手动环境）

构建前端需要 Node.js。安装 node.js 的推荐方式是使用 [nvm](https://github.com/nvm-sh/nvm)。按照 [README](https://github.com/nvm-sh/nvm#install--update-script) 中的说明安装 nvm，然后运行以下命令安装正确的 node.js：

```shell
nvm install
```

[Yarn](https://yarnpkg.com/en/) 用作 node modules 的包管理器。[请按照此处说明安装 yarn。](https://yarnpkg.com/getting-started/install)

### 安装开发依赖项

通过安装开发依赖项来引导前端开发环境。

```shell
nvm use
script/bootstrap
```

:::note
如果你正在使用开发容器，请在容器内部运行这些命令。
:::

## 开发

### 运行开发服务器

运行以下命令以构建前端并运行开发服务器：

```shell
nvm use
yarn dev --fetch-translations
```

当构建完成且 Home Assistant Core 已正确设置后，前端将可以通过 `http://localhost:8123` 访问。当你修改源文件时，服务器会自动重新构建前端。

:::note
`yarn dev` 是 `script/develop` 脚本的一个包装器。两者仍然都可用，但 `yarn dev` 添加了下面描述的 background lifecycle flags。
:::

### 在已有的 HA 实例上运行开发前端

运行以下命令以启动开发服务器：

```shell
nvm use
yarn dev:serve --fetch-translations -c http://homeassistant.local
```

你可能需要将 `http://homeassistant.local` 替换为你本地的 Home Assistant URL。`http://homeassistant.local` 假设的是使用默认端口 80 的 Home Assistant OS 安装；较旧的安装以及其他安装类型通常使用端口 8123（例如 `http://homeassistant.local:8123`）。

### 在后台管理 dev server

上述两个 dev server（以及下面的 demo、gallery 和端到端测试应用的 dev server）都接受一组生命周期标志。这让你可以启动服务器、让它保持运行，并在之后管理它，而无需保持终端会话处于附加状态：

| Flag                | 作用                                                                                                                |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `--background`      | 在分离状态下启动服务器，等待其就绪，打印其 URL（如果有）和 pid，然后退出并让其继续运行。 |
| `--status`          | 报告 dev server 是否在运行。                                                                                   |
| `--logs [--follow]` | 打印 dev server 日志，或使用 `--follow` 进行 tail。                                                                       |
| `--stop`            | 停止正在运行的后台 dev server。                                                                                       |

app、本地托管的 app、demo 和 gallery 命令也接受 `--fetch-translations`。这会在启动服务器前获取最新的翻译，并且在没有保存的 token 时提示进行 GitHub 授权。翻译获取在前台和后台模式下都使用同一个工作流锁。

如果之前的授权已不再有效（例如，你看到 "Bad Credentials" 错误），请删除 `translations/token.json`，然后再次使用 `--fetch-translations` 启动其中一个命令。

例如：

```shell
yarn dev:serve --background    # 启动并分离
yarn dev:serve --logs --follow # 监视输出
yarn dev:serve --stop          # 停止它
```

每个 dev server 都有自己的监听端口：

| Command                 | 端口 | 用途                                                                  |
| ----------------------- | ---- | ------------------------------------------------------------------------ |
| `yarn dev`              | 8123 | 由运行中的 Home Assistant Core（`development_repo`）提供的 app。   |
| `yarn dev:serve`        | 8124 | 在已有的 Home Assistant 实例上本地提供的 app。        |
| `yarn dev:demo`         | 8090 | [Demo](https://demo.home-assistant.io/)。                             |
| `yarn dev:gallery`      | 8100 | [设计图库](/developers/frontend/design)。                             |
| `yarn test:e2e:app:dev` | 8095 | [端到端测试](#end-to-end-tests) 使用的精简版 app。 |

这些受管理的 Yarn 开发工作流，连同 `yarn build` 和 `yarn build --modern`，共享一个工作流锁。再次启动同一个开发工作流会报告正在运行的服务器并成功。在已有工作流处于活动状态时启动另一个受管理工作流会被阻止，并报告带有相关状态、日志或停止命令的活动工作流。

:::note
当检测到 coding agent 时，`yarn dev:*` 会自动在后台运行，以免阻塞 agent 的会话。设置 `HA_DEV_BACKGROUND=0` 可强制 dev server 在前台运行。

冷构建最多等待 180 秒以变为就绪状态；可以通过 `HA_DEV_SERVER_TIMEOUT`（单位为秒）覆盖此值。

后台日志写入到 `node_modules/.cache/ha-dev-server/` 下。
:::

### 浏览器设置

打开 Google Chrome 的开发者工具，并确保已禁用缓存并设置了正确的选项以避免陈旧内容：

:::info
说明适用于基于 Google Chrome 的浏览器，但同样适用于其他浏览器。你应该能在你所选浏览器中找到类似的设置。
:::

1. 勾选 **Network** > **Disable cache** 中的复选框以禁用缓存

<p class='img'>
  <img src='/img/en/development/disable-cache.png' />
</p>

2. 在 **Application** > **Service Workers** > **Bypass for network** 中启用网络绕过

<p class='img'>
  <img src='/img/en/development/bypass-for-network.png' />
</p>

## 测试

在提交 pull request 之前，请运行 linters 和测试。这些命令都从 frontend 仓库中运行。

### Linting 和格式化

```shell
yarn lint       # ESLint, Prettier, TypeScript, and Lit analyzer
yarn format     # 自动修复 ESLint 和 Prettier 问题
yarn lint:types # 仅运行 TypeScript 编译器
```

:::warning
始终在不带文件参数的情况下运行 `yarn lint:types`（和 `tsc`）。传递文件名（例如 `yarn lint:types src/file.ts`）会使 `tsc` 忽略 `tsconfig.json`，并在 `src/` 中每个 `.ts` 源文件旁边生成编译后的 `.js` 文件，从而污染源码树。如果发生了这种情况，请使用 `git clean -fd src/` 删除多余的文件。
:::

### 单元测试

单元测试使用 [Vitest](https://vitest.dev/) 运行：

```shell
yarn test            # 运行单元测试
yarn test:coverage   # 带覆盖率报告地运行
```

### 端到端测试

端到端测试使用 [Playwright](https://playwright.dev/) 运行，分为三个套件，每个套件都有各自的 dev server：

- **App**：主 app，针对专为端到端测试构建的精简 harness 进行测试。
- **Demo**：[demo](https://demo.home-assistant.io/)。
- **Gallery**：[设计图库](/developers/frontend/design)。

| Suite   | Dev server              | Test command            | 运行端口 |
| ------- | ----------------------- | ----------------------- | ------------ |
| App     | `yarn test:e2e:app:dev` | `yarn test:e2e:app`     | 8095         |
| Demo    | `yarn dev:demo`         | `yarn test:e2e:demo`    | 8090         |
| Gallery | `yarn dev:gallery`      | `yarn test:e2e:gallery` | 8100         |

先启动套件的 dev server（理想情况下使用 [background lifecycle flags](#managing-the-dev-server-in-the-background)），然后运行该套件。Playwright 会复用已在端口上运行的 dev server，而不是进行缓慢的完整构建，而 watcher 会在保存时重新编译，因此你可以在无需重启任何东西的情况下进行迭代：

```shell
# App
yarn test:e2e:app:dev --background   # 启动 dev server 并分离
yarn test:e2e:app                    # 运行套件

# Demo
yarn dev:demo --background
yarn test:e2e:demo

# Gallery
yarn dev:gallery --background
yarn test:e2e:gallery
```

使用 `-g` 将运行范围缩小到匹配的测试，使用 `--project` 缩小到单个项目：

```shell
yarn test:e2e:app -g "more-info" --project=chromium       # 桌面版 Chromium（匹配 "more-info"）
yarn test:e2e:app -g "more-info" --project=mobile-chrome  # Pixel 7（匹配 "more-info"）
```

`yarn test:e2e` 运行全部三个套件，而 `yarn test:e2e:show-report` 打开合并的 HTML 报告。

## 创建 pull requests

如果你计划向 Home Assistant 代码库提交 PR，你需要 fork frontend 项目，并将你的 fork 作为 remote 添加到 Home Assistant frontend 仓库中。

```shell
git remote add fork <github URL to your fork>
```

完成更改并准备好推送后，切换到 frontend 项目的目录，然后推送你的更改

```bash
git add -A
git commit -m "Added new feature X"
git push -u fork HEAD
```

## 构建前端

如果你对前端的打包方式进行了更改，可能需要在主仓库中尝试使用一个新的打包好的前端构建（而不是指向 frontend 仓库）。从 frontend 仓库运行完整的生产构建：

```shell
yarn build
```

生产构建也可以作为受管理的后台进程运行：

```shell
yarn build --background    # 启动完整构建并分离
yarn build --status        # 报告是否有构建正在进行
yarn build --logs          # 打印后台构建日志
yarn build --logs --follow # 跟踪后台构建日志
yarn build --stop          # 停止正在运行的后台构建
```

在进行打包、bundle-size 或浏览器性能相关工作时，如果只需要现代的 `frontend_latest` bundle，请使用 `yarn build --modern`。添加 `--background` 可将仅现代构建作为受管理的后台进程运行。

:::caution
受管理的生产构建不能与受管理的开发服务器同时运行。在启动另一个受管理工作流之前，请使用其对应的 `--stop` 命令停止活动工作流。
:::

要在 Home Assistant 内部进行测试，从主 Home Assistant 仓库运行以下命令：

```shell
pip3 install -e /path/to/hass/frontend/ --config-settings editable_mode=compat
hass --skip-pip-packages home-assistant-frontend
```

[hass-frontend]: https://github.com/home-assistant/frontend

## 测试已有的 PR

有时你需要在不同的环境中测试前端更改，或者在不设置完整开发环境的情况下进行测试。例如，你可能想在 Home Assistant OS 实例上测试更改，或者在 PR 合并之前验证修复是否在你的特定设置中有效。

`development_pr` 选项允许你通过自动下载并使用来自 GitHub 的 frontend artifact 来轻松测试 frontend PR。

### 配置

要使用此功能，你需要一个 PR 编号和一个 GitHub token。

#### 创建 GitHub token

1. 转到 [GitHub Settings > Developer Settings > Personal Access Tokens > Fine-grained tokens](https://github.com/settings/personal-access-tokens)
2. 点击 "Generate new token"
3. 给它一个描述性的名称，例如 "Home Assistant Frontend Testing"
4. 设置过期日期（建议：90 天或更短）
5. 在 "Repository access" 下，选择 "Public Repositories (read-only)"
6. 跳过 "Permissions" 部分（保持为空）
7. 点击 "Generate token"
8. 立即复制该 token（之后将无法再次查看）

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

添加此配置后，重启 Home Assistant 使更改生效。

:::warning
妥善保管你的 GitHub token。不要将其提交到版本控制或公开分享。
:::

#### 恢复为生产前端

要停止使用 PR 构建并返回到标准的 Home Assistant 前端：

1. 从你的 `configuration.yaml` 中删除 `development_pr` 和 `github_token` 行
2. 重启 Home Assistant

Home Assistant 将自动恢复到使用内置的生产前端。

### 工作原理

当你配置 `development_pr` 时，Home Assistant 会在启动期间从 GitHub 上指定的 PR 下载 frontend build artifact，并使用它来替代生产版本。该 artifact 会在本地缓存，在随后的重启中，Home Assistant 会通过比较 SHA 和来检查该 PR 是否有新的 commit。如果发现了更新版本，它会自动下载更新后的 artifact。

:::info
如果你同时配置了 `development_repo` 和 `development_pr`，`development_repo` 优先。将使用本地开发仓库，而不是 PR 构建。
:::

### 使用场景

这在以下场景下特别有用：

- **在 HAOS 上测试**：在 Home Assistant OS 上测试 PR，而无需开发环境
- **特定环境的测试**：验证修复是否在你的特定硬件、网络或浏览器配置上有效
- **快速验证**：在无需克隆仓库和在本地构建前端的情况下测试修复或功能

### 限制

- PR 必须在 GitHub 上具有带有可用 artifacts 的成功构建
- Frontend artifacts 仅在 PR 构建完成后的 7 天内可用
- 此功能仅用于测试，不应在生产环境中使用

#### 重新创建 artifact

如果 artifact 已不再可用（例如因为它已经超过了 7 天），或者你想测试 PR 中新的上游更改，这会非常有用。

如果你是 PR 的作者，你可以通过以下方式触发新的 artifact：

- 更新你的分支——将其与 `dev` 分支合并，或在最新的 `dev` 分支之上 rebase。这将触发构建管道并创建一个新的 artifact，供 Home Assistant 下载。
- 关闭并重新打开 PR 以触发新的构建。

如果你不是作者，可以要求作者更新其 PR 分支以触发新的构建。

:::info
要使用新的 artifact，你需要重启 Home Assistant core
:::
