每个 app（以前称为 add-on）都存储在一个文件夹中。文件结构如下：

```text
addon_name/
  translations/
    en.yaml
  apparmor.txt
  CHANGELOG.md
  config.yaml
  DOCS.md
  Dockerfile
  icon.png
  logo.png
  README.md
  run.sh
```

:::note
Translation files 和 `config` 支持 `.json`、`.yml` 和 `.yaml` 作为文件类型。

为简单起见，所有示例都使用 `.yaml`。
:::

## App 脚本

与每个 Docker 容器一样，你需要一个脚本在容器启动时运行。用户可能会运行许多 app，因此如果你做的是简单的事情，建议使用 Bash 脚本。

我们所有的镜像还安装了 [bashio][bashio]。它包含一组常用操作，可以在 app 中使用以减少 app 之间的代码重复，从而使 app 更容易开发和维护。

在开发你的脚本时：

* `/data` 是用于持久化存储的 volume。
* `/data/options.json` 包含用户配置。你可以使用 Bashio 来解析这些数据。

```shell
CONFIG_PATH=/data/options.json

TARGET="$(bashio::config 'target')"
```

因此如果你的 `options` 包含

```json
{ "target": "beer" }
```

那么在 bash 文件的环境中将会有一个包含 `beer` 的变量 `TARGET`。

[bashio]: https://github.com/hassio-addons/bashio

## App Dockerfile

大多数 app（以前称为 add-on）都基于最新的 Alpine Linux 镜像。如果需要运行在不同的时区，请添加 `tzdata`。`tzdata` 已经添加到我们的 base 镜像中。

```dockerfile
FROM ghcr.io/home-assistant/base:latest

# Install requirements for app
RUN \
  apk add --no-cache \
    example_alpine_package

# Copy data for app
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
```

:::note

当 Supervisor 构建没有 `build.yaml` 的 app 时，它之前会自动传递 `BUILD_FROM=ghcr.io/home-assistant/base:latest`。自 Supervisor 2026.04.0 起，该 fallback 不再适用，请确保你的 Dockerfile 不依赖于通过默认 `BUILD_FROM` 参数提供的外部 base 镜像。

:::

如果你没有使用 Home Assistant GitHub builder actions（请参见 [Publishing your app](/developers/apps/publishing.md)），请确保 Dockerfile 也包含一组 labels，其中包括：

```dockerfile
LABEL \
  io.hass.version="VERSION" \
  io.hass.type="app" \
  io.hass.arch="aarch64|amd64"
```

### 构建参数

我们默认支持以下构建参数：

| ARG | Description |
|-----|-------------|
| `BUILD_VERSION` | App 版本（从 `config.yaml` 读取）。 |
| `BUILD_ARCH` | 保存当前构建的 arch。 |

:::note

自 Supervisor 2026.04.0 起，`BUILD_FROM` 参数默认不再提供。请在你的 Dockerfile 中显式使用 `FROM ghcr.io/home-assistant/base:latest`，以获得与之前相同的构建结果。建议使用固定版本的 base 镜像以获得更好的构建稳定性。

:::

## App 配置

app（以前称为 add-on）的配置存储在 `config.yaml` 中。

```yaml
name: "Hello world"
version: "1.1.0"
slug: folder
description: >-
  "Long description"
arch:
  - amd64
url: "website with more information about the app (e.g., a forum thread for support)"
ports:
  123/tcp: 123
map:
  - type: share
    read_only: False
  - type: ssl
  - type: homeassistant_config
    read_only: False
    path: /custom/config/path
image: ghcr.io/my-org/my-app
```

:::note
避免在 app 中使用 `config.yaml` 作为文件名来存放 app 配置以外的任何东西。Supervisor 会在 app 仓库中递归搜索 `config.yaml`。
:::

### 必填配置选项

| Key | Type | Description |
| --- | ---- | ----------- |
| `name` | string | app 的名称。 |
| `version` | string | app 的版本。如果你使用带有 `image` 选项的 docker 镜像，这必须与将要使用的镜像的 tag 相匹配。 |
| `slug` | string | app 的 slug。这必须在 app 发布的 [repository](/developers/apps/repository.md) 范围内是唯一的，并且要 URI friendly。 |
| `description` | string | app 的描述。 |
| `arch` | list | 支持的架构列表：`aarch64`、`amd64`。 |

### 可选配置选项

| Key | Type | Default | Description |
| --- | ---- | -------- | ----------- |
| `machine` | list | | 默认支持所有 machine 类型。你可以配置 app 仅在特定机器上运行。你可以在 machine 类型前使用 `!` 来取反。 |
| `url` | url | | app 的主页。你可以在这里解释 app 和选项。 |
| `startup` | string | `application` | `initialize` 会在 Home Assistant 设置时启动 app。`system` 用于数据库之类的东西，且不依赖于其他东西。`services` 会在 Home Assistant 之前启动，而 `application` 则在之后启动。最后 `once` 适用于不作为 daemon 运行的应用程序。 |
| `webui` | string | | app web 界面的 URL。如 `http://[HOST]:[PORT:2839]/dashboard`，端口需要使用内部端口，它将被替换为有效的端口。还可以将协议部分绑定到配置选项：`[PROTO:option_name]://[HOST]:[PORT:2839]/dashboard`，并在其为 `true` 且指向 `https` 时进行查找。 |
| `boot` | string | `auto` | `auto` 启动由系统控制，`manual` 配置 app 仅手动启动。如果 app 不应在启动时自动启动，请使用 `manual_only` 来防止用户更改。 |
| `ports` | dict | | 从容器暴露的网络端口。格式为 `"container-port/type": host-port`。如果主机端口为 `null`，则映射被禁用。 |
| `ports_description` | dict | | 网络端口描述映射。格式为 `"container-port/type": "description of this port"`。或者使用 [Port description translations](#port-description-translations)。 |
| `host_network` | bool | `false` | 如果为 `true`，app 在主机网络上运行。 |
| `host_ipc` | bool | `false` | 允许 IPC namespace 与其他共享。 |
| `host_dbus` | bool | `false` | 将主机 D-Bus 服务映射到 app。 |
| `host_pid` | bool | `false` | 允许容器在主机 PID namespace 上运行。仅适用于未受保护的 app。**警告：** 与 S6 Overlay 不兼容。如果必须将其设为 `true` 且你使用普通的 app base 镜像，你需要通过覆盖 `/init` 来禁用 S6。或者使用替代的 base 镜像。 |
| `host_uts` | bool | `false` | 使用主机的 UTS namespace。 |
| `devices` | list | | 要映射到 app 的设备列表。格式为：`<path_on_host>`。例如，`/dev/ttyAMA0` |
| `homeassistant` | string | | 固定 app 所需的最小 Home Assistant Core 版本。值是一个版本字符串，如 `2022.10.5`。 |
| `hassio_role` | str | `default` | 基于角色的 Supervisor API 访问。可用：`default`、`homeassistant`、`backup`、`manager` 或 `admin` |
| `hassio_api` | bool | `false` | 此 app 可以访问 Supervisor 的 REST API。使用 `http://supervisor`。 |
| `homeassistant_api` | bool | `false` | 此 app 可以访问 Home Assistant REST API proxy。使用 `http://supervisor/core/api`。 |
| `docker_api` | bool | `false` | 允许 app 只读访问 Docker API。仅适用于未受保护的 app。 |
| `privileged` | list | | 访问硬件/系统的权限。可用访问：`BPF`、`CHECKPOINT_RESTORE`、`DAC_READ_SEARCH`、`IPC_LOCK`、`NET_ADMIN`、`NET_RAW`、`PERFMON`、`SYS_ADMIN`、`SYS_MODULE`、`SYS_NICE`、`SYS_PTRACE`、`SYS_RAWIO`、`SYS_RESOURCE` 或 `SYS_TIME`。 |
| `full_access` | bool | `false` | 像 Docker 的 privileged 模式一样授予对硬件的完全访问权限。仅适用于未受保护的 app。考虑使用其他 app 选项而不是此选项，如 `devices`。如果你启用了此选项，请不要添加 `devices`、`uart`、`usb` 或 `gpio`，因为这是不必要的。 |
| `apparmor` | bool/string | `true` | 启用或禁用 AppArmor 支持。如果已启用，你还可以使用 profile 的名称作为自定义 profile。 |
| `map` | list | | 要绑定挂载到你的容器中的 Home Assistant 目录类型列表。可能的值：`homeassistant_config`、`addon_config`、`ssl`、`addons`、`backup`、`share`、`media`、`all_addon_configs` 和 `data`。默认为只读，你可以通过添加属性 `read_only: false` 来更改。默认情况下，所有路径都映射到 app 容器中的 `/<type-name>`，但也可以提供可选的 `path` 属性来配置路径（示例：`path: /custom/config/path`）。如果使用，路径不能为空，必须与为该 app 定义的任何其他路径不同，并且不能是根路径。注意，`data` 目录始终映射且可写，但可以使用相同的约定设置 `path` 属性。 |
| `environment` | dict | | 运行 app 所需的环境变量字典。 |
| `audio` | bool | `false` | 标记此 app 使用内部音频系统。我们将一个可用的 PulseAudio 设置映射到容器中。如果你的应用程序不支持 PulseAudio，你可能需要安装：Alpine Linux `alsa-plugins-pulse` 或 Debian/Ubuntu `libasound2-plugins`。 |
| `video` | bool | `false` | 标记此 app 使用内部视频系统。所有可用设备都将映射到 app 中。 |
| `gpio` | bool | `false` | 如果设置为 `true`，`/sys/class/gpio` 将映射到 app 中以访问内核的 GPIO 接口。某些库还需要 `/dev/mem` 和 `SYS_RAWIO` 才能对此设备进行读写访问。在启用 AppArmor 的系统上，你需要禁用 AppArmor 或为该 app 提供你自己的 profile，后者对安全性更好。 |
| `usb` | bool | `false` | 如果设置为 `true`，它会将原始 USB 访问权限 `/dev/bus/usb` 映射到 app 中，并支持即插即用。 |
| `uart` | bool | `false` | 默认 `false`。自动将主机的所有 UART/串口设备映射到 app 中。 |
| `udev` | bool | `false` | 默认 `false`。将其设置为 `true` 会将主机的 udev 数据库以只读方式挂载到 app 中。 |
| `devicetree` | bool | `false` | 如果设置为 `true`，`/device-tree` 将映射到 app 中。 |
| `kernel_modules` | bool | `false` | 将主机内核模块和配置映射到 app 中（只读），并授予你 `SYS_MODULE` 权限。 |
| `stdin` | bool | `false` | 如果启用，你可以将 STDIN 与 Home Assistant API 一起使用。 |
| `legacy` | bool | `false` | 如果 Docker 镜像没有 `hass.io` labels，你可以启用 legacy 模式来使用 config 数据。 |
| `options` | dict | | app 的默认 options 值。 |
| `schema` | dict | | app 的 options 值的 schema。它可以是 `false` 以禁用 schema 验证和 options。 |
| `image` | string | | 与容器注册表一起使用。将其设置为通用（多架构）镜像名称，例如 `ghcr.io/my-org/my-app`。`{arch}` 占位符仍作为按架构镜像名称的兼容 fallback 受支持（例如，`ghcr.io/my-org/{arch}-my-app`）。如果使用此选项，请使用 `version` 选项设置活动 Docker tag。 |
| `timeout` | integer | 10 | 默认 10（秒）。等待 Docker daemon 完成或将被杀死的超时时间。 |
| `tmpfs` | bool | `false` | 如果设置为 `true`，容器的 `/tmp` 将使用 tmpfs（内存文件系统）。 |
| `discovery` | list | | 此 app 为 Home Assistant 提供的服务列表。 |
| `services` | list | | 将通过此 app 提供或消费的服务列表。格式为 `service`:`function`，函数包括：`provide`（此 app 可以提供此服务）、`want`（此 app 可以使用此服务）或 `need`（此 app 需要此服务才能正常工作）。 |
| `auth_api` | bool | `false` | 允许访问 Home Assistant 用户后端。 |
| `ingress` | bool | `false` | 为 app 启用 Ingress 功能。 |
| `ingress_port` | integer | `8099` | 对于在主机网络上运行的 app，你可以使用 `0` 并在之后通过 API 读取端口。 |
| `ingress_entry` | string | `/` | 修改 URL 入口点。 |
| `ingress_stream` | bool | `false` | 启用后，对 app 的请求将被流式处理 |
| `panel_icon` | string | `mdi:puzzle` | 菜单 panel 集成的 [MDI icon](https://materialdesignicons.com/)。 |
| `panel_title` | string | | 默认为 app 名称，但可以使用此选项修改。 |
| `panel_admin` | bool | `true` | 使菜单项仅对 admin 组中的用户可用。 |
| `backup` | string | `hot` | `hot` 或 `cold`。如果为 `cold`，supervisor 会在备份前关闭 app（使用 `cold` 时忽略 `pre/post` 选项）。 |
| `backup_pre` | string | | 在备份前在 app 上下文中执行的命令。 |
| `backup_post` | string | | 在备份后在 app 上下文中执行的命令。 |
| `backup_exclude` | list | | 从备份中排除的文件/路径列表（支持 glob）。 |
| `stage` | string | `stable` | 用以下属性之一标记 app，让用户了解其在开发生命周期中的位置：`stable`、`experimental` 或 `deprecated`。 |
| `init` | bool | `true` | 设置为 `false` 以禁用 Docker 默认系统 init。如果镜像有自己的 init 系统（如 [s6-overlay](https://github.com/just-containers/s6-overlay)），请使用此选项。*注意：从 S6 V3 开始，将其设置为 `false` 是必需的，否则 app 将无法启动，详情请参见[此处](https://developers.home-assistant.io/blog/2022/05/12/s6-overlay-base-images)。* |
| `watchdog` | string | | 用于监控 app 健康状况的 URL。如 `http://[HOST]:[PORT:2839]/dashboard`，端口需要使用内部端口，它将被替换为有效的端口。还可以将协议部分绑定到配置选项：`[PROTO:option_name]://[HOST]:[PORT:2839]/dashboard`，并在其为 `true` 且指向 `https` 时进行查找。对于简单的 TCP 端口监控，你可以使用 `tcp://[HOST]:[PORT:80]`。它适用于主机或内部网络上的 app。 |
| `realtime` | bool | `false` | 授予 app 对主机调度的访问权限，包括 `SYS_NICE` 用于更改执行时间/优先级。 |
| `journald` | bool | `false` | 如果设置为 `true`，主机的系统 journal 将以只读方式映射到 app 中。大多数情况下 journal 位于 `/var/log/journal`，但在某些主机上你将在 `/run/log/journal` 中找到它。依赖此功能的 app 应检查目录 `/var/log/journal` 是否已填充，如果没有则回退到 `/run/log/journal`。 |
| `breaking_versions` | list | | app 破坏性版本的列表。如果更新到破坏性版本或会跨越破坏性版本，即使用户已为 app 启用自动更新，也需要手动更新。 |
| `ulimits` | dict | | app 容器资源限制（ulimit）设置的字典。每个限制可以是一个简单的整数值，或一个包含 `soft` 和 `hard` 键的字典，每个键取一个简单整数以实现精细控制。单个值不得大于主机的硬限制（可通过 `ulimit -Ha` 检查；例如，在 Home Assistant Operating System 中 `nofile` 限制为 524288）。 |

### 选项 / Schema

`options` 字典包含所有可用选项及其默认值。将默认值设置为 `null` 或在 `schema` 字典中定义数据类型，即可使某个选项成为必填项。这样，在 app（以前称为 add-on）启动之前需要用户提供该选项。支持嵌套数组和字典，最大深度为二。

要使某个选项真正可选（没有默认值），需要使用 `schema` 字典。在数据类型末尾加一个 `?`，并且*不要*在 `options` 字典中定义任何默认值。如果给出了任何默认值，该选项就变成必填值。

```yaml
message: "custom things"
logins:
  - username: beer
    password: "123456"
  - username: cheep
    password: "654321"
random:
  - haha
  - hihi
link: "http://example.com/"
size: 15
count: 1.2
```

:::note
如果你从已经部署给用户的 app 中移除配置选项，建议删除该选项，以避免出现 `Option '<options_key>' does not exist in the schema for <App Name> (<app slug>)` 之类的警告。

要移除一个选项，可以使用 Supervisor addons API。使用 bashio 时，这简化为 `bashio::addon.option '<options_key>'`（不带额外参数以删除此 option key）。要检查该选项是否仍然设置，可以像这样检查 options 字典的内容：

```sh
options=$(bashio::addon.options)
old_key='test'
if bashio::jq.exists "${options}" ".${old_key}"; then
    bashio::log.info "Removing ${old_key}"
    bashio::addon.option "${old_key}"
fi
```

:::

`schema` 看起来像 `options`，但描述了我们如何验证用户输入。例如：

```yaml
message: str
logins:
  - username: str
    password: str
random:
  - "match(^\\w*$)"
ssh:
  private_key: str
  public_key: str
link: url
size: "int(5,20)"
count: float
not_need: "str?"
```

我们支持：

* `str` / `str(min,)` / `str(,max)` / `str(min,max)`
* `bool`
* `int` / `int(min,)` / `int(,max)` / `int(min,max)`
* `float` / `float(min,)` / `float(,max)` / `float(min,max)`
* `email`
* `url`
* `password`
* `port`
* `match(REGEX)`
* `list(val1|val2|...)`
* `device` / `device(filter)`：设备过滤器可以使用以下格式：`subsystem=TYPE`，即 `subsystem=tty` 用于串口设备。

:::note

以前，额外的构建选项（如 `build_from`、`args` 和 `labels`）是在单独的 `build.yaml` 文件中配置的，由旧版 builder 读取。该文件已不再使用。base 镜像应在你的 `Dockerfile` 中直接使用 `FROM` 语句设置，labels 使用 `LABEL` 语句设置，自定义构建参数使用 `ARG` 定义。有关详细的迁移说明，请参见 [builder migration blog post](/developers/blog/2026-04-02-builder-migration.md)。

:::

## App 翻译

app（以前称为 add-on）可以为 UI 中使用的配置选项提供翻译文件。

翻译文件的路径示例：`addon/translations/{language_code}.yaml`

`{language_code}` 使用有效的语言代码，如 `en`，[完整列表请参见此处](https://github.com/home-assistant/frontend/blob/dev/src/translations/translationMetadata.json)，`en.yaml` 将是一个有效的文件名。

此文件支持 2 个主要 key：`configuration` 和 `network`。

### 配置翻译

```yaml
configuration:
  ssl:
    name: Enable SSL
    description: Enable usage of SSL on the webserver inside the app
  ssh:
    name: SSH Options
    description: Configure SSH authentication options
    fields:
      public_key:
        name: Public Key
        description: Client Public Key
      private_key:
        name: Private Key
        description: Client Private Key
```

*此处在 `configuration` 下的 key（此例中为 `ssl`）需要与你的 `schema` 配置中的一个 key 相匹配（在 [`config.yaml`](#app-configuration) 中）。*

### 端口描述翻译

```yaml
network:
  80/TCP: The webserver port (Not used for Ingress)
```

*此处在 `network` 下的 key（此例中为 `80/TCP`）需要与你的 `ports` 配置中的一个 key 相匹配（在 [`config.yaml`](#app-configuration) 中）。*

## App 高级选项

有时 app 开发者可能希望允许用户配置提供自己的文件，这些文件随后将直接提供给内部服务作为其配置的一部分。一些示例包括：

1. 内部服务需要配置项的列表，且每项的 schema 很复杂，但服务没有提供 UI 进行设置，更简单的做法是将用户指向其文档并请求一个符合该 schema 的文件。
2. 内部服务需要一个二进制文件或作为其配置一部分的外部配置文件。
3. 内部服务支持配置变更时的实时重新加载，你希望为其部分或全部配置支持此功能，方法是要求用户提供一个符合其 schema 的文件进行实时重新加载。

在这些情况下，你应该在你的 app 配置文件的 `map` 中添加 `addon_config`。然后你应该指导用户将该文件放入 `/addon_configs/{REPO}_<your addon's slug>` 文件夹中。如果 app 在本地安装，`{REPO}` 将为 `local`。如果 app 从 GitHub 仓库安装，`{REPO}` 是从 GitHub 仓库 URL 生成的哈希标识符（例如：`https://github.com/xy/my_hassio_addons`）。
此文件夹在 app 的 docker 容器运行时将挂载在 `/config` 下。你应该在 app 的 schema 中提供一个选项来收集从该文件夹开始的相对文件路径，或者依赖固定的文件名并将其包含在文档中。

`addon_config` 的另一种用途可能是你的 app 想要提供基于文件的输出，或让用户访问内部文件以进行调试。一些示例包括：

1. 内部服务将日志记录到文件，你希望允许用户访问该日志文件
2. 内部服务使用数据库，你希望允许用户访问该数据库以进行调试
3. 内部服务生成一些文件，这些文件打算在其自身配置中使用，你希望允许用户访问它们

在这些情况下，你应该在 `map` 中添加 `addon_config:rw`，这样你的 app 就可以向该文件夹写入以及从中读取。然后你应该在 app 运行时将这些文件写出到 `/config`，以便用户可以看到和访问它们。
