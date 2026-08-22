---
author: Jan Čermák
authorURL: https://github.com/sairon
authorImageURL: https://avatars.githubusercontent.com/u/211416?s=96&v=4
title: "将 app builds 迁移到 Docker BuildKit"
---

传统的 `home-assistant/builder` container 以及旧的 `home-assistant/builder` GitHub Action 已被废弃。我们建议你按照本文所述，迁移所有 app（原 add-ons）的 GitHub workflows 和 Dockerfiles。

## 变更内容及原因

旧版 builder 在单个特权 Docker-in-Docker container 中使用 QEMU 模拟运行每种架构的 build。这速度慢、需要高权限，而且已经熟悉 Docker 的用户还需要学习如何使用自定义的 Home Assistant builder container。旧版 builder 还存在不必要的维护开销。如今，builder 所做的一切都可以完全用 Docker BuildKit 替代，GitHub Actions runners 原生支持它，并且在需要时内置了带 QEMU 模拟的多架构支持。

对于 CI 来说，替代方案是一组专注的 [composite GitHub Actions](https://github.com/home-assistant/builder)，它们将构建任务委托给 runner 的原生 Docker 并使用 Docker BuildKit。在 CI 之外，迁移意味着你的 `Dockerfile` 现在成为构建 app 镜像的唯一可信来源，你可以直接使用 `docker build` 在本地构建和测试你的 app，而无需使用 builder container。

## 迁移过程

迁移包括两部分：更新 Dockerfiles 和更新 GitHub Actions workflows。

### 更新 Dockerfiles

新的 build workflow 不再使用 `build.yaml`。将内容移动到 `Dockerfile` 中，如下所示：

- **`build_from`** — 用 `Dockerfile` 中的 `FROM` 语句替换 `build.yaml` 中的 `build_from` key：

  ```dockerfile
  FROM ghcr.io/home-assistant/base:latest
  ```

  由于 base images 现在作为 multi-platform manifests 发布，通常不再需要为每种架构定义 base images。`build-image` action 仍然提供 `BUILD_ARCH` 作为 build argument，如果你需要在 base image 名称模板中使用它，可以在 `Dockerfile` 中使用。

- **`labels`** — 将所有自定义 Docker labels 直接移动到 `Dockerfile` 中，使用 `LABEL` 语句：

  ```dockerfile
  LABEL \
      org.opencontainers.image.title="Your awesome app" \
      org.opencontainers.image.description="Description of your app." \
      org.opencontainers.image.source="https://github.com/your/repo" \
      org.opencontainers.image.licenses="Apache License 2.0"
    ```

  如果你正在创建自定义 workflow，请注意旧版 builder 会自动添加 `io.hass.type`、`io.hass.name`、`io.hass.description` 和 `io.hass.url` labels。新 action 不会推断这些值，因此通过 `build-image`（或类似）action 的 `labels` input 显式添加它们。

- **`args`** — 将自定义 build arguments 作为带默认值的 `ARG` 定义移动到 `Dockerfile` 中：

  ```dockerfile
  ARG MY_BUILD_ARG="default-value"
  ```

  `ARG` 中的默认值替代了之前通过 `build.yaml` 的 `args` 字典提供的值。如果需要，仍然可以在 build 时使用 `--build-arg` 覆盖。

将 `build.yaml` 的内容迁移后，你可以将该文件从仓库中删除。

### 更新 GitHub Actions workflows

移除任何使用 `home-assistant/builder@master` 的 workflow steps，并替换为新的 composite actions。查看我们示例 app 仓库中的 [example workflow](https://github.com/home-assistant/apps-example/blob/main/.github/workflows/builder.yaml) 以获得完整的可工作示例。或者，根据需要，在更自定义的 workflow 中使用 [individual actions](https://github.com/home-assistant/builder?tab=readme-ov-file#example-workflow)。

### 镜像命名

引用已发布的 app image 的首选方式现在是**通用的（multi-arch）名称**，不带架构前缀：

```yaml
# config.yaml
image: "ghcr.io/my-org/my-app"
```

`{arch}` 占位符（例如 `ghcr.io/my-org/{arch}-my-app`）仍然作为兼容性后备方案受支持，但建议改用通用名称，让 manifest 处理平台解析。

### 本地构建

更新 `Dockerfile` 后，你可以使用 `docker build` 直接构建 app 镜像——详情请参阅 [Local app testing](/developers/apps/testing)。

## 由 Supervisor 在本地构建的 Apps

为了向后兼容，Supervisor 仍然会读取 `build.yaml` 文件（如果存在），并用从该文件中读取的值填充 image build arguments。这将产生警告，并会在未来的某个时候被移除，因此建议迁移到上述基于 Dockerfile 的方式。
