距离我们上次发布关于 Supervisor 的变更已经有一段时间了。以下是过去一年的一些亮点以及未来的计划。这些信息主要针对 add-on 开发者，但这里也有一些适合所有人的内容。如果你还没有看到，我们在[主站发布了一篇博客][main_blog]，建议你阅读。

## Snapshot 到 Backup

首先，正如[主站上的博客][main_blog]中提到的，我们已经开始从"snapshot"这一名称（自 Supervisor 诞生之初就一直使用）向更容易被识别的"backup"过渡。

这些变更现已在 Supervisor 的 `dev` 频道上线，你可以开始测试和调整你的工具/add-ons，确保在用户使用时它们仍然能正常工作。

### API 变更

随着从"snapshot"到"backup"的过渡，Supervisor API 中增加了一个新的基础部分 [`/backups`][supervisor_api_backups]，它的运作方式与 [`/snapshots`][supervisor_api_snapshots] 相同，拥有旧部分的所有相同 endpoints，但有两个关键区别：

* 如果你访问 `/backups`，返回的数据现在将是 `{"backups": []}` 而不是 `{"snapshots": []}`
* 要删除 snapshot，你现在必须使用 `DELETE` HTTP 方法配合 `/backups` endpoint，此前同时支持 `POST` 和 `DELETE`。

旧的 [`/snapshots`][supervisor_api_snapshots] endpoints 现已弃用，计划于今年第四季度移除。

### Backup 结构变更

为了保持一致性，我们还更改了 backup tar 中 meta 文件的名称，从 `snapshot.json` 改为 `backup.json`。如果你的工具使用了该文件，你应该查找这两种文件，这样你的工具就可以同时适用于现有和新备份。

## 流式 ingress

一些 add-ons 需要接收用户传来的大量数据，例如上传。此前，运行在 ingress 后面的 add-ons 每个请求的限制为 16 MB，这仍然是默认值。如果你需要接收更大的负载，可以通过在 add-on 配置中将 `ingress_stream` 设置为 `True` 来启用此功能。这样做时，请求将从客户端流式传输到你的 add-on，且请求没有大小限制，几乎没有任何开销。

请注意，并非所有 webservers 默认都能处理此功能，因此你可能需要对其进行调整。

## 弃用的 API endpoints

在过去几年中，我们重组了部分 API endpoints，但同时也保留了旧 endpoints 的可用性。如果你的工具/add-ons 使用了任何弃用的 endpoints，你应该立即迁移到新 endpoints。所有弃用的 endpoints 计划于今年第四季度移除。

以下是弃用的 endpoints 及其替代项列表：

弃用的 endpoints | 替代为
\-- | --
`/homeassistant/*` | `/core/*`
`/snapshots/*` | `/backups/*`

此外，以下内容也已弃用，并计划于今年第四季度移除。

* 环境变量 `HASSIO_TOKEN` 已被 `SUPERVISOR_TOKEN` 替代。
* 使用 `X-Hassio-Key` header 已被[使用带 Bearer token 的 `Authorization`][api_example]替代。
* 使用 `http://hassio/` 与 Supervisor 通信已被 `http://supervisor/` 替代。

## Supervised 安装

目前维护[supervised installation][supervised_installation]的体验并不理想。大多数用户用来安装的[脚本][supervised_script]落后于 Supervisor 对主机的要求。由于没有真正的升级路径，使用它的用户需要手动调整安装。

最近我们创建了 [OS Agent][os_agent]，如[主站上的博客][main_blog]中所述。这改善了主机操作系统与 Supervisor 之间的通信，并引入了更多功能。为了利用这些功能，当前 supervised 安装的用户必须手动安装 OS Agent。

作为替代方案，可以将 supervised installation 打包并分发为 deb 包，以便在主机上使用 `apt` 安装和升级。为了使这可行，我们正在寻找一个人（或一群人）来创建和维护这种类型的部署，使 supervised installation 方法与我们的 OS 保持同等水平，更重要的是让用户在主机上进行必要的更新更容易。

如果你对这些变更有疑问，欢迎在[我们的 Discord 服务器][discord]上的 `#devs_supervisor` 频道中咨询。

下次再见 👋

[discord]: https://discord.gg/c5DvZ4e

[main_blog]: https://www.home-assistant.io/blog/2021/08/24/supervisor-update/

[supervisor_api_backups]: /docs/api/supervisor/endpoints#backup

[supervisor_api_snapshots]: /docs/api/supervisor/endpoints#backup

[supervised_installation]: https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md

[supervised_script]: https://github.com/home-assistant/supervised-installer

[os_agent]: https://github.com/home-assistant/os-agent

[api_example]: /docs/api/supervisor/examples#get-network-information-with-curl
