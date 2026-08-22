---
title: "Supervisor 开发"
sidebar_label: "开发"
---

这些说明适用于 Supervisor、Supervisor 前端面板和 `hassio` 集成的开发，通过与发展中的或远程的 supervisor 交互进行，这假设你正在使用一台开发机器进行开发。这些说明还将使用 devcontainer 和其他依赖 Docker 的工具，请先按照我们的 [devcontainer 开发环境](/developers/setup_devcontainer_environment) 指南设置合适的开发环境。


## Supervisor 开发

这里的说明适用于 Supervisor 本身的开发。

1. Fork Supervisor 仓库（https://github.com/home-assistant/supervisor）并将其克隆到你的开发机器上。
2. 使用 Visual Studio Code devcontainer 打开该仓库。
3. 在你的 fork 中创建一个分支。
4. 完成你的更改。
5. 按照下面的说明测试你的更改。
6. 提交并推送你的更改，针对 https://github.com/home-assistant/supervisor 的 `main` 分支创建 PR。

### 本地测试

在 Visual Studio Code 中启动任务"Run Supervisor"，这将在 devcontainer 中启动一个 Supervisor 实例，你可以用它来测试你的更改。
初始化完成后，你可以在 `http://localhost:9123` 访问 Home Assistant 前端。

### 在远程系统上测试

1. 通过 SSH 或直接控制台访问远程系统。
2. 使用 `ha info` 检查机器上的架构，如果是 Home Assistant OS，则直接运行 `info`。
3. 在你的开发机器上，构建你的 Supervisor 镜像并将其推送到容器注册表。以 GitHub Container Registry 为例（调整 `YOUR_GH_USERNAME` 和架构以匹配你在第 2 步中找到的内容）：

```bash
docker build \
    --platform linux/arm64 \
    --tag ghcr.io/YOUR_GH_USERNAME/aarch64-hassio-supervisor:latest \
    --push \
    .
```

:::note

所有示例都包含你需要调整的值。

- 将 `linux/arm64` 和 `aarch64` 调整为你在第 2 步中找到的架构。
- 将 `YOUR_GH_USERNAME` 调整为你的 GitHub 用户名或组织。
- 要像上面的示例那样将镜像推送到 GitHub Container Registry，你需要使用具有适当权限范围的 personal access token 进行身份验证。更多详情请参见 [GitHub Container Registry 文档](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)。

:::

:::note

`--platform` 选项中使用的架构与 Home Assistant 中使用的并不相同。虽然 Home Assistant 中的 `amd64` 对应于 `--platform linux/amd64`，但 Home Assistant 中的 `aarch64` 对应于 Docker 中的 `--platform linux/arm64`。

:::

4. 在你的远程系统上，使用 `ha supervisor options --channel dev` 将 channel 更改为 `dev`，如果是 Home Assistant OS，则直接运行 `supervisor options --channel dev`。
5. 拉取你的 Supervisor 镜像：

```bash
docker pull ghcr.io/YOUR_GH_USERNAME/aarch64-hassio-supervisor:latest
```

:::note

上传到 GHCR 的 Docker 镜像默认是私有的。要下载它们，你需要在远程系统上也使用 personal access token 进行身份验证，或者[更改 GitHub 上包的可见性](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility#configuring-visibility-of-packages-for-your-personal-account)。

:::

6. 将你的 Supervisor 镜像标记为预期的本地名称：

```bash
docker tag ghcr.io/YOUR_GH_USERNAME/aarch64-hassio-supervisor:latest ghcr.io/home-assistant/aarch64-hassio-supervisor:latest
```

7. 使用 `systemctl restart haos-supervisor` 重启 `haos-supervisor` 服务
8. 使用 `journalctl -fu haos-supervisor` 检查问题

## 集成开发

这里的说明适用于 `hassio` 集成的开发，我们假设你已经设置了 [Home Assistant Core 开发环境](development_environment.mdx)，并且你已经设置了 [Supervisor API 访问](#supervisor-api-access)。

要配置 Home Assistant Core 连接到远程 supervisor，在启动 Home Assistant 时设置以下环境变量：

- `SUPERVISOR`：设置为运行 Home Assistant 的机器的 IP 和端口 8880（API proxy add-on）
- `SUPERVISOR_TOKEN`：设置为你在 [Supervisor API 访问](#supervisor-api-access) 中找到的 token

```shell
SUPERVISOR=192.168.1.100:8880 SUPERVISOR_TOKEN=abcdefghj1234 hass
```

你的本地 Home Assistant 安装现在将连接到远程 Home Assistant 实例。

## 前端开发

:::info
所有 supervisor 前端面板已被弃用，在 Home Assistant core >= 2026.2 时将不再加载
:::

Home Assistant 前端通过核心代理使用 supervisor。请查看 [Home Assistant 前端开发环境](/developers/frontend/development) 了解如何开发前端。

## Supervisor API 访问

要为 `hassio` 集成和 Supervisor 面板开发，我们需要访问 supervisor 的 API。该 API 由一个 token 保护，我们可以使用一个特殊的 add-on 来提取该 token。这可以在一个运行的系统上完成，或者使用 [devcontainer](#local-testing)。

[![Open your Home Assistant instance and show the add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fhome-assistant%2Faddons-development)
[![Open your Home Assistant instance and show the dashboard of a Supervisor add-on.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=ae6e943c_remote_api)

1. 添加我们的开发者 Add-on 仓库：[https://github.com/home-assistant/addons-development](https://github.com/home-assistant/addons-development)
2. 安装 Add-on"Remote API proxy"
3. 点击 Start
4. token 将打印在日志中

该 add-on 需要保持运行状态，以允许 Home Assistant Core 连接。

Remote API proxy token 的权限略低于 Home Assistant Core 在生产环境中的权限。要获取具有完全权限的实际 token，你需要 SSH 到主机系统并运行：

```shell
docker inspect homeassistant | grep SUPERVISOR_TOKEN
```

注意，任何一种 token 在 OS/容器重启或更新后都可能更改。
