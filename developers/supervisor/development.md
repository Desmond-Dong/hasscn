# Supervisor 开发

本文说明如何通过与开发中的或远程的 Supervisor 交互，来开发 Supervisor、Supervisor 前端面板以及 `hassio` 集成。本文默认你使用一台开发机器进行开发，也会用到 devcontainer 和其他依赖 Docker 的工具。请先按照我们的[devcontainer 开发环境](/developers/setup_devcontainer_environment.md)指南准备好合适的开发环境。

## Supervisor development

这里的说明适用于开发 Supervisor 本身。

1. Fork Supervisor 仓库（https://github.com/home-assistant/supervisor）并将其克隆到你的开发机器。
2. 使用 Visual Studio Code devcontainer 打开仓库。
3. 在你的 fork 中创建一个分支。
4. 进行修改。
5. 按照下面的说明测试你的修改。
6. 提交并推送修改，然后向 https://github.com/home-assistant/supervisor 的 `main` 分支创建 PR。

### Local testing

在 Visual Studio Code 中启动任务 "Run Supervisor"，这会在 devcontainer 内启动一个 Supervisor 实例，供你测试修改。
初始化完成后，你可以通过 `http://localhost:9123` 访问 Home Assistant 前端。

### Testing on a remote system

首先，你需要在 [Docker Hub](https://hub.docker.com/) 创建一个账号。

1. 通过 SSH 或直接控制台访问远程系统。
2. 在机器上运行 `ha info`，如果是 Home Assistant OS 也可直接运行 `info`，以确认架构。
3. 在开发机器上使用我们的 [builder](https://github.com/home-assistant/builder) 构建并发布你的 Supervisor 镜像。

示例：

:::note

以下示例中的值都需要你自行调整。

* 将 `aarch64` 替换为你在第 2 步中查到的架构。
* 将 `awesome-user` 替换为你的 Docker Hub 用户名。
* 将 `secret-password` 替换为你的 Docker Hub 密码或发布令牌。

:::

```bash
docker run --rm \
    --privileged \
    -v /run/docker.sock:/run/docker.sock \
    -v "$(pwd):/data" \
    ghcr.io/home-assistant/amd64-builder:dev \
        --generic latest \
        --target /data \
        --aarch64 \
        --docker-hub awesome-user \
        --docker-user awesome-user \
        --docker-password secret-password \
        --no-cache
```

4. 在远程系统上运行 `ha supervisor --channel dev`，如果是 Home Assistant OS，也可运行 `supervisor --channel dev`，将通道切换到 `dev`。
5. 使用 `docker pull awesome-user/aarch64-hassio-supervisor:latest` 拉取你的 Supervisor 镜像。
6. 将你的 Supervisor 镜像打标签为 `homeassistant/aarch64-hassio-supervisor:latest`。

```bash
docker tag awesome-user/aarch64-hassio-supervisor:latest homeassistant/aarch64-hassio-supervisor:latest
```

7. 使用 `systemctl restart hassos-supervisor` 重启 `hassio-supervisor` 服务。
8. 使用 `journalctl -fu hassos-supervisor` 检查问题。

## Integration development

这里的说明适用于开发 `hassio` 集成。我们假设你已经搭建好 [Home Assistant Core 开发环境](/developers/development_environment.md)，并且已经配置好 [Supervisor API Access](#supervisor-api-access)。

要让 Home Assistant Core 连接到远程 supervisor，请在启动 Home Assistant 时设置以下环境变量：

* `SUPERVISOR`：设置为运行 Home Assistant 的机器 IP 和端口 80（API proxy add-on）。
* `SUPERVISOR_TOKEN`：设置为你在 [Supervisor API Access](#supervisor-api-access) 中获取到的令牌。

```shell
SUPERVISOR=192.168.1.100:80 SUPERVISOR_TOKEN=abcdefghj1234 hass
```

此时你的本地 Home Assistant 安装将连接到一个远程的 Home Assistant 实例。

## Frontend development

:::info
所有 supervisor 前端面板都已弃用，在 Home Assistant core >= 2026.2 中将不会再被加载。
:::

Home Assistant 前端通过 core proxy 使用 supervisor。请参阅 [Home Assistant frontend development environment](/developers/frontend/development.md) 了解如何进行前端开发。

## Supervisor API access

要开发 `hassio` 集成和 Supervisor 面板，我们需要对 supervisor 的 API 访问权限。这个 API 受令牌保护，我们可以通过一个特殊的 add-on 提取该令牌。你可以在运行中的系统上执行，也可以在 [devcontainer](#local-testing) 中执行。

[![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fhome-assistant%2Faddons-development)
[![Open your Home Assistant instance and show the dashboard of a Supervisor add-on.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=ae6e943c_remote_api)

1. 添加我们的开发者 Add-on 仓库：<https://github.com/home-assistant/addons-development>
2. 安装 add-on "Remote API proxy"
3. 点击 Start
4. 令牌会打印在日志中

该 add-on 需要保持运行，才能允许 Home Assistant Core 建立连接。

Remote API proxy 令牌的权限比生产环境中的 Home Assistant Core 略少。如果你想获取具备完整权限的真实令牌，需要 SSH 登录到主机系统并运行：

```shell
docker inspect homeassistant | grep SUPERVISOR_TOKEN
```

请注意，这两种令牌在系统重启或 OS/容器更新后都可能发生变化。
