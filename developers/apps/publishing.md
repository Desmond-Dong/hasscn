发布 app（以前称为 add-on）有两种不同的方式。一种是将预构建的容器发布到容器注册表，另一种方式是让用户在自己的 Home Assistant 实例上本地构建容器。

## 预构建容器

使用预构建容器时，开发者负责为每种架构构建镜像并将结果推送到容器注册表。这对用户有很多好处：用户只需下载最终的容器，下载完成后即可运行。这使得安装过程快速且几乎不会失败，因此是首选方法。

我们已通过 GitHub Actions 自动化了构建和发布 app 的过程。详见下面的说明。

## 本地构建容器

使用 Supervisor，可以分发将在用户机器上构建的 app。它的优点是，对于开发者来说，测试一个想法并看看是否有人对你的 app 感兴趣很容易。这种方法包括安装和潜在的代码编译。这意味着安装这样的 app 速度较慢，并且比上述预构建方案更容易磨损用户的 SD 卡/硬盘。如果容器的某个依赖项已更改或不再可用，它的失败几率也更高。

在玩 app 并看看是否有人对你的工作感兴趣时，请使用此选项。一旦你的仓库已建立，请迁移到将构建推送到容器注册表，因为这能大大改善用户体验。将来我们会在 app 商店中标记本地构建的 app，以提醒用户。

## 使用 GitHub Actions 将 app 发布到容器注册表

构建和发布多架构 app 镜像的推荐方式是通过 GitHub Actions，使用 Home Assistant 项目维护的 builder composite actions。这些 action 可以用于 app 仓库中的构建矩阵。有关构建多个 app 的复杂示例，请参见示例 app 仓库中的 [builder workflow](https://github.com/home-assistant/apps-example/blob/main/.github/workflows/builder.yaml)，或者 builder 仓库中针对单个 app 构建的 [example workflow](https://github.com/home-assistant/builder?tab=readme-ov-file#example-workflow)。builder action 设计灵活，可以根据需要用于更复杂的工作流中。

### 镜像命名

在 app 的 `config.yaml` 中，将 `image` 字段设置为发布在容器注册表中的镜像名称：

```yaml
image: "ghcr.io/my-org/my-app"
```

`{arch}` 占位符仍受支持，用于向后兼容按架构发布的镜像。当有可用的多架构 manifest 时，通用名称是首选的公共引用：

```yaml
# Preferred — resolves via the multi-arch manifest
image: "ghcr.io/my-org/my-app"

# Compatibility fallback — still works if only arch-prefixed images exist
image: "ghcr.io/my-org/{arch}-my-app"
```

### 已发布的镜像

成功运行后，可获得两种类型的镜像引用：

* **Per-architecture images**（例如，`ghcr.io/my-org/aarch64-my-app:1.0.0`）— 由 `build-image` action 推送。
* **Generic manifest image**（例如，`ghcr.io/my-org/my-app:1.0.0`）— 由 `publish-multi-arch-manifest` action 推送；这是在 `config.yaml` 中使用以及向用户共享的首选引用。

### 示例 app 仓库

请参见 [Home Assistant example app repository](https://github.com/home-assistant/apps-example)，这是一个完整的、最新的可运行示例。
