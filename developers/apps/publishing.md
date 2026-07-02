# 发布您的应用程序

发布应用程序（以前称为附加组件）有两种不同的方式。一种是将预构建的容器发布到容器注册表，另一种选择是让用户在其 Home Assistant 实例上本地构建容器。

#### 预制容器

使用预构建的容器，开发人员负责为其计算机上的每个架构构建映像，并将结果推送到容器注册表。这对于用户来说有很多优势，他们只需下载最终的容器，并在下载完成后启动并运行。这使得安装过程快速并且几乎没有失败的机会，因此它是首选方法。

我们已经自动化了构建和发布应用程序的过程。请参阅下面的说明。

#### 本地构建容器

通过 Supervisor，可以分发将在用户计算机上构建的应用程序。优点是，作为开发人员，可以轻松测试想法并查看人们是否对您的应用程序感兴趣。此方法包括安装和可能编译代码。这意味着安装这样的应用程序速度很慢，并且比上述预构建的解决方案增加了用户 SD 卡/硬盘驱动器的磨损。如果容器的依赖项之一已更改或不再可用，则失败的可能性也会更高。

当您使用应用程序并查看某人是否对您的工作感兴趣时，请使用此选项。一旦您建立了存储库，请迁移到将构建推送到容器注册表，因为它极大地改善了用户体验。未来我们将在应用商店中标记本地构建的应用程序以警告用户。

## 构建脚本以将应用程序发布到容器注册表

所有应用程序（以前称为附加组件）都是容器。在您的应用程序 `config.yaml` 中，您指定将为您的应用程序安装的容器映像：

```yaml
...
image: "myhub/image-{arch}-addon-name"
...
```

您可以在映像名称中使用`{arch}`，以通过一 (1) 个配置文件支持多种架构。当我们加载图像时，它将被替换为用户的架构。如果您使用`Buildargs`，您可以使用`build.yaml` 覆盖我们的默认参数。

Home Assistant 假定应用程序存储库的默认分支与容器注册表上的最新标签匹配。当您构建新版本时，建议您使用另一个分支，即 `build` 或通过 GitHub 上的 PR 来完成。将应用程序推送到容器注册表后，您可以将此分支合并到主分支。

## 定制应用程序

您需要一个 Docker Hub 帐户来制作自己的应用程序。您可以使用 Docker `build` 命令构建容器映像，或使用我们的 [builder] 来简化过程。拉取我们的 [Builder Docker 引擎][builder] 并运行以下命令之一。

对于 git 存储库：

```shell
docker run \
  --rm \
  --privileged \
  -v ~/.docker/config.json:/root/.docker/config.json:ro \
  ghcr.io/home-assistant/amd64-builder \
  --all \
  -t addon-folder \
  -r https://github.com/xy/addons \
  -b branchname
```

对于本地存储库：

```shell
docker run \
  --rm \
  --privileged \
  -v ~/.docker/config.json:/root/.docker/config.json:ro \
  -v /my_addon:/data \
  ghcr.io/home-assistant/amd64-builder \
  --all \
  -t /data
```

:::tip
如果您在 macOS 上进行开发并使用 Docker for Mac，您可能会遇到类似于以下内容的错误消息：`error creating aufs mount to /var/lib/docker/aufs/mnt/<SOME_ID>-init: invalid argument`。建议的解决方法是通过 Docker > 首选项 > 守护程序 > 高级将以下内容添加到高级守护程序 JSON 配置中：`"storage-driver" : "aufs"` 或将 docker 套接字映射到容器中。
:::

[builder]: https://github.com/home-assistant/builder
