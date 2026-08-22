---
title: "测试 App"
sidebar_label: "测试"
---

开发 app（以前称为 add-on）的最快且推荐的方法是使用本地 Visual Studio Code devcontainer。我们为此维护了一个 [devcontainer](https://github.com/home-assistant/devcontainer)，它被用于我们所有的 app 仓库。这个面向 VS Code 的 devcontainer 设置会运行 Supervisor 和 Home Assistant，并将所有 app 映射为内部本地 app，使得在 Windows、Mac 和 Linux 桌面操作系统上的 app 开发者可以轻松开发。

- 按照说明下载并安装 [Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) VS Code 扩展。
- 将 [`devcontainer.json`](https://github.com/home-assistant/devcontainer/raw/main/apps/devcontainer.json) 文件复制到仓库中的 `.devcontainer/devcontainer.json`。
- 将 [`tasks.json`](https://github.com/home-assistant/devcontainer/raw/main/apps/tasks.json) 文件复制到仓库中的 `.vscode/tasks.json`。
- 在 VS Code 中打开根文件夹，当提示时在容器中重新打开窗口（或者，从 Command Palette 中选择"Rebuild and Reopen in Container"）。
- 当 VS Code 在容器中打开你的文件夹时（首次运行可能需要一些时间），你需要运行任务（Terminal -> Run Task）"Start Home Assistant"，这将启动 Supervisor 和 Home Assistant。
- 然后你将能通过 `http://localhost:7123/` 上的 Home Assistant 实例访问正常的 onboarding 流程。
- 你的根文件夹中的 app 将自动出现在 Local Apps 仓库中。

## 远程开发

如果你需要访问物理硬件或其他无法在本地模拟的资源（例如串口），开发 app 的下一个最佳选项是将它们添加到运行 Home Assistant 的真实设备上的本地 app 仓库中。要访问远程设备上的本地 app 仓库，请安装 [Samba](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_samba) 或 [SSH](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_ssh) 这两个 app，并将 app 文件复制到 `/addons` 的子目录中。

目前 app 可以使用存储在 Docker Hub 上的镜像（通过 app 配置中的 `image`）。为确保 app 在本地构建而非从上游仓库获取，请确保 `config.yaml` 文件中的 `image` 键被注释掉（你可以在它前面加上 `#`，例如 `#image: xxx`）。

## 本地构建

如果你不想使用 devcontainer 环境，可以使用独立 Docker 在本地构建 app。这对于在当前工作的主机上快速进行单一架构检查很有用。

在包含 app 文件的目录中使用 `docker` 来构建测试 app：

```shell
docker build \
  -t local/my-test-app \
  .
```

对于多平台构建或交叉编译，你可以使用 `--platform` flag 和相应的目标平台（例如，`--platform linux/arm64` 在 AMD64 主机上使用 QEMU 构建 `aarch64` 镜像）。有关更多详细信息，请参见 Docker 官方文档中的 [multi-platform builds](https://docs.docker.com/build/building/multi-platform/)。

:::note

`--platform` 选项中使用的架构与 Home Assistant 中使用的架构不同。Home Assistant 中的 `amd64` 对应 `--platform linux/amd64`，Home Assistant 中的 `aarch64` 对应 Docker 中的 `--platform linux/arm64`。

:::

## 本地运行

如果你不想使用 devcontainer 环境，仍然可以使用 Docker 在本地运行 app。

为此可以使用以下命令：

```shell
docker run \
  --rm \
  -v /tmp/my_test_data:/data \
  -p PORT_STUFF_IF_NEEDED \
  local/my-test-app
```

## 日志

所有 `stdout` 和 `stderr` 输出都会被重定向到 Docker 日志。可以在 Home Assistant 的 Supervisor 面板中的 app 页面获取日志。
