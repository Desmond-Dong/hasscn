在 Home Assistant 中，app（以前称为 add-on）之间有多种不同的通信方式。

## 网络

我们使用一个内部网络，该网络允许通过名称或别名与每个 app（包括与 Home Assistant 之间）进行通信。仅在主机网络上运行的 app 受到的限制是，它们可以通过名称与所有内部 app 通信，但所有其他 app 无法通过名称寻址这些 app。然而，使用别名对两者都有效！

名称/别名用于 Home Assistant 内部的通信。
名称的生成格式为：`{REPO}_{SLUG}`，例如 `local_xy` 或 `3283fh_myaddon`。在这个示例中，`{SLUG}` 定义在 app 的 `config.yaml` 文件中。你也可以将此名称用作 DNS 名称，但你需要将任何 `_` 替换为 `-` 才能成为有效的 hostname。如果 app 在本地安装，`{REPO}` 将是 `local`。如果 app 从 GitHub 仓库安装，`{REPO}` 是从 GitHub 仓库 URL 生成的哈希标识符（例如：`https://github.com/xy/my_hassio_addons`）。请参见[此处](https://github.com/home-assistant/supervisor/blob/4ac7f7dcf08abb6ae5a018536e57d078ace046c8/supervisor/store/utils.py#L17)了解此标识符的生成方式。请注意，在使用 [Supervisor app API][supervisor-addon-api] 的某些操作中需要此标识符。你可以通过向 Supervisor API `addons` endpoint 发送 GET 请求来查看所有当前已安装 app 的仓库标识符。

使用 `supervisor` 与内部 API 通信。

## Home Assistant 核心

app（以前称为 add-on）可以通过内部代理与 [Home Assistant Core API][core-api] 通信。这样你无需知道密码、端口或关于 Home Assistant 实例的任何其他信息，就能轻松地与 API 通信。使用此 URL：`http://supervisor/core/api/` 可以确保内部通信被重定向到正确的地方。下一步是在 `config.yaml` 文件中添加 `homeassistant_api: true` 并读取环境变量 `SUPERVISOR_TOKEN`。在发起请求时将其作为 Home Assistant Core [bearer token](/developers/auth_api.md#making-authenticated-requests) 使用。

例如 `curl -X GET -H "Authorization: Bearer ${SUPERVISOR_TOKEN}" -H "Content-Type: application/json" http://supervisor/core/api/config`

还有一个用于 [Home Assistant Websocket API][core-websocket] 的代理，它的工作原理与上面的 API 代理相同，需要 `SUPERVISOR_TOKEN` 作为密码。使用此 URL：`ws://supervisor/core/websocket`。

你也可以在内部网络上直接与名为 `homeassistant` 的 Home Assistant 实例通信。然而，你需要知道正在运行的实例所使用的配置。

我们在 Home Assistant 中有几个 action 可以运行任务。通过 STDIN 向 app 发送数据以使用 `hassio.addon_stdin` action。

## Supervisor API

要启用对 [Supervisor API][supervisor-api] 的调用，请在 `config.yaml` 文件中添加 `hassio_api: true` 并读取环境变量 `SUPERVISOR_TOKEN`。现在你可以在 URL `http://supervisor/` 上使用 API。使用 `Authorization: Bearer` 头携带 `SUPERVISOR_TOKEN`。你还需要将 Supervisor API 角色更改为 `hassio_role: default`。

app 可以在无需设置 `hassio_api: true` 的情况下调用某些 API 命令：

* `/core/api`
* `/core/api/stream`
* `/core/websocket`
* `/addons/self/*`
* `/services*`
* `/discovery*`
* `/info`

***注意：*** 有关 Home Assistant API 访问要求，请参见上文。

## Services API

我们有一个内部 services API，可以在无需用户添加任何配置的情况下将服务公开给其他 app。app 可以获取服务的全部配置来使用并连接到它。app 需要在 app [配置](/developers/apps/configuration.md) 中标记服务的使用，才能访问服务。所有受支持的服务，包括其可用选项，都记录在 [API 文档][supervisor-services-api] 中。

支持的服务有：

* mqtt
* mysql

你可以使用 Bashio 在 app 初始化时为 app 获取这些信息：`bashio::services <service> <query>`

例如：

```bash
MQTT_HOST=$(bashio::services mqtt "host")
MQTT_USER=$(bashio::services mqtt "username")
MQTT_PASSWORD=$(bashio::services mqtt "password")
```

[core-api]: /api/rest.md

[core-websocket]: /api/websocket.md

[supervisor-api]: /api/supervisor/endpoints.md

[supervisor-addon-api]: /api/supervisor/endpoints.md#apps

[supervisor-services-api]: /api/supervisor/endpoints.md#service
