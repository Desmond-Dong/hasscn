# 本地应用程序测试

开发应用程序（以前称为附加组件）的最快且推荐的方法是使用本地 Visual Studio Code 开发容器。我们维护一个[devcontainer for this purpose](https://github.com/home-assistant/devcontainer)，它在我们所有的应用程序存储库中使用。 VS Code 的开发容器设置运行 Supervisor 和 Home Assistant，所有应用程序都映射为内部本地应用程序，这使得 Windows、Mac 和 Linux 桌面操作系统上的应用程序开发人员变得简单。

* 按照说明下载并安装 [Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) VS Code 扩展。
* 将[`devcontainer.json`](https://github.com/home-assistant/devcontainer/raw/main/addons/devcontainer.json) 文件复制到存储库中的`.devcontainer/devcontainer.json`。
* 将[`tasks.json`](https://github.com/home-assistant/devcontainer/raw/main/addons/tasks.json) 文件复制到存储库中的`.vscode/tasks.json`。
* 打开 VS Code 内的根文件夹，并在出现提示时重新打开容器内的窗口（或者从命令面板中选择“在容器中重建并重新打开”）。
* 当 VS Code 打开容器中的文件夹时（首次运行可能需要一些时间），您需要运行任务（终端 -> 运行任务）“启动 Home Assistant”，这将引导 Supervisor 和 Home Assistant。
* 然后，您将能够通过 `http://localhost:7123/` 处的 Home Assistant 实例访问正常的入职流程。
* 在根文件夹中找到的应用程序将自动在本地应用程序存储库中找到。

## 远程开发

如果您需要访问无法本地模拟的物理硬件或其他资源（例如串行端口），那么开发应用程序的下一个最佳选择是将它们添加到运行 Home Assistant 的真实设备上的本地应用程序存储库。要访问远程设备上的本地应用程序存储库，请安装[Samba](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_samba) 或[SSH](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_ssh) 应用程序，并将应用程序文件复制到`/addons` 的子目录。

现在，应用程序将使用存储在 Docker Hub 上的映像（使用应用程序配置中的`image`）。为了确保应用程序是在本地构建的而不是从上游存储库获取，请确保 `image` 键在 `config.yaml` 文件中被注释掉（您可以通过在其前面添加 `#` 来实现这一点，例如 `#image: xxx`）。

## 本地构建

如果您不想使用 devcontainer 环境，您仍然可以使用 Docker 在本地构建应用程序。推荐的方法是使用[官方构建工具][hassio-builder]来创建Docker镜像。

假设您的插件位于文件夹 `/path/to/addon` 中，并且您的 Docker 套接字位于 `/var/run/docker.sock` 中，您可以通过运行以下命令为所有支持的体系结构构建插件：

```shell
docker run \
  --rm \
  -it \
  --name builder \
  --privileged \
  -v /path/to/addon:/data \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  ghcr.io/home-assistant/amd64-builder \
  -t /data \
  --all \
  --test \
  -i my-test-addon-{arch} \
  -d local
```

如果您不想使用官方构建工具，您仍然可以使用独立的 Docker 进行构建。如果您使用`FROM $BUILD_FROM`，您需要使用构建参数设置基本映像。通常您可以使用以下基础镜像：

* armhf：`ghcr.io/home-assistant/armhf-base:latest`
* aarch64：@@保护0@@
* amd64：@@保护0@@
* i386：@@保护0@@

使用包含应用程序文件的目录中的 `docker` 来构建测试插件：

```shell
docker build \
  --build-arg BUILD_FROM="ghcr.io/home-assistant/amd64-base:latest" \
  -t local/my-test-addon \
  .
```

[hassio-builder]: https://github.com/home-assistant/builder

## 本地运行

如果您不想使用 devcontainer 环境，您仍然可以使用 Docker 在本地运行应用程序。

为此，您可以使用以下命令：

```shell
docker run \
  --rm \
  -v /tmp/my_test_data:/data \
  -p PORT_STUFF_IF_NEEDED \
  local/my-test-addon
```

## 日志

所有 `stdout` 和 `stderr` 输出都被重定向到 Docker 日志。可以从 Home Assistant 的 Supervisor 面板内的应用程序页面获取日志。
