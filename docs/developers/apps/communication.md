---
title: "应用程序通讯"
---

Home Assistant 内的应用程序（以前称为附加组件）之间的通信方式有多种。

## 网络

我们使用内部网络，允许使用每个应用程序的名称或别名与每个应用程序进行通信，包括与 Home Assistant 之间的通信。只有在主机网络上运行的应用程序受到限制，因为它们可以通过名称与所有内部应用程序进行通信，但所有其他应用程序都无法通过名称来寻址这些应用程序。但是，使用别名对两者都适用！

姓名/别名用于 Home Assistant 内部的通信。
该名称使用以下格式生成：`{REPO}_{SLUG}`，例如`local_xy` 或`3283fh_myaddon`。在此示例中，`{SLUG}` 在应用程序的`config.yaml` 文件中定义。您也可以使用此名称作为 DNS 名称，但需要将任何 `_` 替换为 `-` 以获得有效的主机名。如果应用程序安装在本地，`{REPO}` 将是`local`。如果应用程序是从 GitHub 存储库安装的，则 `{REPO}` 是从 GitHub 存储库的 URL 生成的哈希标识符（例如：`https://github.com/xy/my_hassio_addons`）。请参阅[here](https://github.com/home-assistant/supervisor/blob/4ac7f7dcf08abb6ae5a018536e57d078ace046c8/supervisor/store/utils.py#L17) 以了解如何生成此标识符。请注意，在使用 [Supervisor 应用程序 API][supervisor-addon-api] 的某些操作中需要此标识符。您可以通过向 Supervisor API `addons` 端点发出 GET 请求来查看所有当前安装的应用程序的存储库标识符。

使用`supervisor` 与内部API 进行通信。

## 家庭助理核心

应用程序（以前称为附加组件）可以使用内部代理与 [Home Assistant Core API][core-api] 进行通信。这使得在不知道密码、端口或其他实例信息的情况下与 API 通信变得非常简单。使用 `http://supervisor/core/api/` 可以确保内部通信被重定向到正确位置。下一步是将 `homeassistant_api: true` 添加到 `config.yaml` 文件中，并读取环境变量 `SUPERVISOR_TOKEN`。发起请求时，可将其作为 Home Assistant Core 的 [Bearer Token](/developers/auth_api) 使用。

例如`curl -X GET -H "Authorization: Bearer ${SUPERVISOR_TOKEN}" -H "Content-Type: application/json" http://supervisor/core/api/config`

[Home Assistant Websocket API][core-websocket] 还有一个代理，其工作方式与上面的 API 代理类似，并且需要 `SUPERVISOR_TOKEN` 作为密码。使用此 URL：`ws://supervisor/core/websocket`。

还可以通过内部网络直接与名为 `homeassistant` 的 Home Assistant 实例进行通信。但是，您需要知道正在运行的实例使用的配置。

我们在 Home Assistant 中有几个操作来运行任务。通过 STDIN 将数据发送到应用程序以使用 `hassio.addon_stdin` 操作。

## 主管API

要启用对 [Supervisor API][supervisor-api] 的调用，请将`hassio_api: true` 添加到`config.yaml` 文件并读取环境变量`SUPERVISOR_TOKEN`。现在您可以通过 URL 使用 API：`http://supervisor/`。使用`SUPERVISOR_TOKEN` 和标头`Authorization: Bearer`。您可能还需要将 Supervisor API 角色更改为`hassio_role: default`。

应用程序可以调用一些API命令，而无需设置`hassio_api: true`：

- @@保护0@@
- @@保护0@@
- @@保护0@@
- @@保护0@@
- @@保护0@@
- @@保护0@@
- @@保护0@@

***笔记：*** 有关 Home Assistant API 访问要求，请参阅上文。

## 服务API

我们有一个内部服务 API，可以将服务公开给其他应用程序，而无需用户添加任何配置。应用程序可以获得服务的完整配置以供使用和连接。应用程序需要在应用程序[configuration](/developers/apps/configuration)中标记服务的使用，以便能够访问服务。所有支持的服务（包括其可用选项）均记录在 [API 文档][supervisor-services-api] 中。

支持的服务有：

- MQTT
- mysql

您可以使用 Bashio 为您的应用程序 init 获取此信息：`bashio::services <service> <query>`

例如：

```bash
MQTT_HOST=$(bashio::services mqtt "host")
MQTT_USER=$(bashio::services mqtt "username")
MQTT_PASSWORD=$(bashio::services mqtt "password")
```

[core-api]: /api/rest.md
[core-websocket]: /api/websocket.md
[supervisor-api]: /api/supervisor/endpoints.md
[supervisor-addon-api]: /api/supervisor/endpoints.md#addons
[supervisor-services-api]: /api/supervisor/endpoints.md#service
