:::note
本文描述的 builder action（`home-assistant/builder@master`）是遗留工作流。它已被专门的 composite actions 取代。请参见 [builder migration 博文](/developers/blog/2026-04-02-builder-migration.md) 了解当前推荐的方法。
:::

## GitHub Action

你现在可以将我们的 [builder][marketplace] 作为 [GitHub action][github_action] 使用！:tada:

这已经在我们的 [hassio-addons 仓库][addons] 中使用，你可以[在这里][builder-action]查看我们如何实现它的示例。

它可以用来确保 add-on 在仓库做出更改后仍能构建，并将镜像作为 release workflow 的一部分发布。如何使用该 action 已在 [builder 仓库][builder-action] 中记录。

以下是使用它的示例：

```yaml
jobs:
  build:
    name: Test build
    runs-on: ubuntu-latest
    steps:
    - name: Checkout the repository
      uses: actions/checkout@v2
    - name: Test build
      uses: home-assistant/builder@master
      with:
        args: |
          --test \
          --all \
          --target /data
```

此示例将在 add-on 的所有支持架构上运行测试构建。

:::tip
你的仓库被映射到 action 中的 `/data`，因此如果你的 add-on 文件在子目录中，你需要提供 `--target /data/{directoryname}` 作为 builder action 的参数。
:::

## 文档

我们的 [API 文档][api_docs] 已移至 developer documentation 站点。在此过程中，它还进行了样式更新，以便更易于导航。一些 endpoints 仍然缺少内容。如果你还没有达到 [Hacktoberfest] 的配额，也许你想为我们的 API 描述贡献更多细节？

## API 变更

* 使用 `/homeassistant/*` endpoints 已弃用，将于今年晚些时候移除。你需要改用 `/core/*`。
* 使用 `http://hassio/` 已弃用，将于今年晚些时候移除。你需要改用 `http://supervisor/`。
* 使用 `HASSIO_TOKEN` 已弃用，将于今年晚些时候移除。你需要改用 `SUPERVISOR_TOKEN`。
* 使用 `POST` 调用 `/supervisor/snapshots/<slug>/remove` 删除 snapshots 已弃用，将于今年晚些时候移除。你需要改用 `DELETE` 方法调用 `/supervisor/snapshots/<slug>`。
* 使用 `X-Hassio-Key` 头作为认证方法已弃用，将于今年晚些时候移除。你需要改用带有 `Bearer` token 的 authorization 头。

[API 文档][api_docs] 已更新以反映这些变更。

## Add-on 选项

`/data/options.json` 文件的权限从 `644` 更改为 `600`。如果你的 add-on 以非 root 身份运行并读取此文件，现在将出现权限问题。

你可以在 add-on 中采取以下几个步骤来继续使用这些信息：

* 如果你在 add-on 中使用 [S6-overlay]，可以使用 [`/etc/fix-attrs.d`][S6-overlay-permissions] 确保运行 add-on 的用户有权访问该文件。
* 你可以将 add-on 更改为以 `root`（默认）身份运行。

## 发布版本

到目前为止，Supervisor、我们的 plugins 和 add-ons 一直使用 build number 和 [Semantic Versioning (SemVer)][semver] 的混合作为版本系统。我们决定为这些仓库替换它，改为采用 [Calendar Versioning (CalVer)][calver] 作为我们的版本系统。

我们正在将 Supervisor 从基于 release 的开发迁移到 continuous development。这与我们现有的基于 channel 的更新策略（stable、beta 和 dev）完美契合。我们现在利用自动化的 pipelines 将新的 Supervisor 版本构建并发布到正确的 channel。采用这种结构后不再需要双分支设置，因此我们的 `dev` 和 `master` 分支现在已被新的 `main` 分支替换。Supervisor 的 plugins（DNS、Multicast、Observer、CLI）也将遵循这一 continuous development 原则。

我们做出这一更改是为了通过自动测试系统提供更高的软件质量。现在每个 commit 都会触发一个新的 dev release，由我们的测试实例进行测试。问题会立即报告给 sentry。这使我们有时间在创建 release 之前测试所有更改。创建 release 时，更改将在 beta channel 中可用。一旦宣布为 stable，我们就可以将 release 推广到 stable channel。

我们使用 [builder action][marketplace] 配合 [GitHub actions][github_action] 来构建和发布 Supervisor、我们的 plugins 和 Docker 容器的 base images。如果你有兴趣了解我们如何做到这一点，可以查看[此处的 Supervisor builder action][builder_action]，以及[此处的 action helpers][action_helpers]。

[action_helpers]: https://github.com/home-assistant/actions/tree/master/helpers

[addons]: https://github.com/home-assistant/hassio-addons

[api_docs]: /docs/api/supervisor/endpoints

[builder_action]: https://github.com/home-assistant/supervisor/blob/main/.github/workflows/builder.yml

[builder-action]: https://github.com/home-assistant/builder#github-action

[calver]: https://calver.org/

[github_action]: https://github.com/features/actions

[Hacktoberfest]: https://hacktoberfest.digitalocean.com/

[marketplace]: https://github.com/marketplace/actions/home-assistant-builder

[S6-overlay-permissions]: https://github.com/just-containers/s6-overlay#fixing-ownership--permissions

[S6-overlay]: https://github.com/just-containers/s6-overlay

[semver]: https://semver.org/
