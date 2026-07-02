# 端点

import ApiEndpoint from '@site/static/js/api\_endpoint.jsx'

带有 :lock: 标记的 API 端点需要使用 `Bearer` token 形式的授权请求头。

应用（以前称为附加组件）和 Home Assistant 可以通过以下方式获取该 token：
`SUPERVISOR_TOKEN` 环境变量。

要查看每个端点的更多详细信息，请点击将其展开。

### 应用

<ApiEndpoint path="/addons" method="get">
返回已安装应用的概览信息。

**负载：**

| 键 | 类型 | 说明 |
| ------------ | ---- | -------------------------------------------------- |
| addons       | list | [Addon 模型](/developers/api/supervisor/models.md#addon)列表 |

**示例响应：**

```json
{
  "addons": [
    {
      "name": "Awesome app",
      "slug": "awesome_addon",
      "description": "My awesome app",
      "advanced": false,
      "stage": "stable",
      "repository": "core",
      "version": null,
      "version_latest": "1.0.1",
      "update_available": false,
      "installed": false,
      "detached": true,
      "available": true,
      "build": false,
      "url": null,
      "icon": false,
      "logo": false,
      "system_managed": false
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/addons/reload" method="post">
重新加载已存储的应用信息。
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/changelog" method="get">
获取应用的更新日志。
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/documentation" method="get">
获取应用文档。
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs" method="get">

通过 Systemd journal 后端获取应用日志。

该端点接受与 `/host/logs` 相同的请求头，并提供相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs/follow" method="get">

与 `/addons/<addon>/logs` 相同，但会持续返回新的日志条目。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs/latest" method="get">

返回该应用容器最近一次启动的全部日志。

会忽略 `Range` 请求头，但可以使用 `lines` 查询参数。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs/boots/<bootid>" method="get">

获取与特定启动记录相关的应用日志。

`bootid` 参数的解释方式与 `/host/logs/boots/<bootid>` 中一致，
该端点其余功能也与 `/host/logs` 相同。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs/boots/<bootid>/follow" method="get">

与 `/addons/<addon>/logs/boots/<bootid>` 相同，但会持续返回新的日志条目。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/icon" method="get">
获取应用图标
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/info" method="get">
获取应用详情

**返回数据：**

| key                 | type               | description                                                                            |
| ------------------- | ------------------ | -------------------------------------------------------------------------------------- |
| advanced            | boolean            | `true` if advanced mode is enabled                                                     |
| apparmor            | string             | disabled, default or the name of the profile                                           |
| arch                | list               | A list of supported architectures for the app                                       |
| audio               | boolean            | `true` if audio is enabled                                                             |
| audio\_input         | float or null      | The device index                                                                       |
| audio\_output        | float or null      | The device index                                                                       |
| auth\_api            | boolean            | `true` if auth api access is granted is enabled                                        |
| auto\_uart           | boolean            | `true` if auto\_uart access is granted is enabled                                       |
| auto\_update         | boolean            | `true` if auto update is enabled                                                       |
| available           | boolean            | `true` if the app is available                                                      |
| boot                | string             | "auto" or "manual"                                                                     |
| boot\_config         | string             | Default boot mode of addon or "manual\_only" if boot mode cannot be auto                |
| build               | boolean            | `true` if local app                                                                 |
| changelog           | boolean            | `true` if changelog is available                                                       |
| description         | string             | The app description                                                                 |
| detached            | boolean            | `true` if the app is running detached                                               |
| devices             | list               | A list of attached devices                                                             |
| devicetree          | boolean            | `true` if devicetree access is granted is enabled                                      |
| discovery           | list               | A list of discovery services                                                           |
| dns                 | list               | A list of DNS servers used by the app                                               |
| docker\_api          | boolean            | `true` if docker\_api access is granted is enabled                                      |
| documentation       | boolean            | `true` if documentation is available                                                   |
| full\_access         | boolean            | `true` if full access access is granted is enabled                                     |
| gpio                | boolean            | `true` if gpio access is granted is enabled                                            |
| hassio\_api          | boolean            | `true` if hassio api access is granted is enabled                                      |
| hassio\_role         | string             | The hassio role (default, homeassistant, manager, admin)                               |
| homeassistant       | string or null     | The minimum Home Assistant Core version                                                |
| homeassistant\_api   | boolean            | `true` if homeassistant api access is granted is enabled                               |
| host\_dbus           | boolean            | `true` if host dbus access is granted is enabled                                       |
| host\_ipc            | boolean            | `true` if host ipc access is granted is enabled                                        |
| host\_network        | boolean            | `true` if host network access is granted is enabled                                    |
| host\_pid            | boolean            | `true` if host pid access is granted is enabled                                        |
| host\_uts            | boolean            | `true` if host UTS namespace access is enabled.                                        |
| hostname            | string             | The host name of the app                                                            |
| icon                | boolean            | `true` if icon is available                                                            |
| ingress             | boolean            | `true` if ingress is enabled                                                           |
| ingress\_entry       | string or null     | The ingress entrypoint                                                                 |
| ingress\_panel       | boolean or null    | `true` if ingress\_panel is enabled                                                     |
| ingress\_port        | int or null        | The ingress port                                                                       |
| ingress\_url         | string or null     | The ingress URL                                                                        |
| ip\_address          | string             | The IP address of the app                                                           |
| kernel\_modules      | boolean            | `true` if kernel module access is granted is enabled                                   |
| logo                | boolean            | `true` if logo is available                                                            |
| long\_description    | string             | The long app description                                                            |
| machine             | list               | A list of supported machine types for the app                                       |
| name                | string             | The name of the app                                                                 |
| network             | dictionary or null | The network configuration for the app                                               |
| network\_description | dictionary or null | The description for the network configuration                                          |
| options             | dictionary         | The app configuration                                                               |
| privileged          | list               | A list of hardwars/system attributes the app has access to                         |
| protected           | boolean            | `true` if protection mode is enabled                                                   |
| rating              | int                | The addon rating                                                                       |
| repository          | string             | The URL to the app repository                                                       |
| schema              | dictionary or null | The schema for the app configuration                                                |
| services\_role       | list               | A list of services and the apps role for that service                               |
| slug                | string             | The app slug                                                                        |
| stage               | string             | The app stage (stable, experimental, deprecated)                                    |
| startup             | string             | The stage when the app is started (initialize, system, services, application, once) |
| state               | string or null     | The state of the app (started, stopped)                                             |
| stdin               | boolean            | `true` if the app accepts stdin commands                                            |
| system\_managed      | boolean            | Indicates whether the app is managed by Home Assistant                              |
| system\_managed\_config\_entry | string     | Provides the configuration entry ID if the app is managed by Home Assistant         |
| translations        | dictionary         | A dictionary containing content of translation files for the app                    |
| udev                | boolean            | `true` if udev access is granted is enabled                                            |
| update\_available    | boolean            | `true` if an update is available                                                       |
| url                 | string or null     | URL to more information about the app                                               |
| usb                 | list               | A list of attached USB devices                                                         |
| version             | string             | The installed version of the app                                                    |
| version\_latest      | string             | The latest version of the app                                                       |
| video               | boolean            | `true` if video is enabled                                                             |
| watchdog            | boolean            | `true` if watchdog is enabled                                                          |
| webui               | string or null     | The URL to the web UI for the app                                                   |
| signed              | boolean            | True if the image is signed and trust                                                  |

**示例响应：**

```json
{
  "advanced": false,
  "apparmor": "default",
  "arch": ["armhf", "aarch64", "i386", "amd64"],
  "audio_input": null,
  "audio_output": null,
  "audio": false,
  "auth_api": false,
  "auto_uart": false,
  "auto_update": false,
  "available": false,
  "boot": "auto",
  "boot_config": "auto",
  "build": false,
  "changelog": false,
  "description": "description",
  "detached": false,
  "devices": ["/dev/xy"],
  "devicetree": false,
  "discovery": ["service"],
  "dns": [],
  "docker_api": false,
  "documentation": false,
  "full_access": false,
  "gpio": false,
  "hassio_api": false,
  "hassio_role": "default",
  "homeassistant_api": false,
  "homeassistant": null,
  "host_dbus": false,
  "host_ipc": false,
  "host_network": false,
  "host_pid": false,
  "host_uts": false,
  "hostname": "awesome-addon",
  "icon": false,
  "ingress_entry": null,
  "ingress_panel": true,
  "ingress_port": 1337,
  "ingress_url": null,
  "ingress": false,
  "ip_address": "172.0.0.21",
  "kernel_modules": false,
  "logo": false,
  "long_description": "Long description",
  "machine": ["raspberrypi2", "tinker"],
  "name": "Awesome app",
  "network_description": "{}|null",
  "network": {},
  "options": {},
  "privileged": ["NET_ADMIN", "SYS_ADMIN"],
  "protected": false,
  "rating": "1-6",
  "repository": "12345678",
  "schema": {},
  "services_role": ["service:access"],
  "slug": "awesome_addon",
  "stage": "stable",
  "startup": "application",
  "state": "started",
  "stdin": false,
  "system_managed": true,
  "system_managed_config_entry": "abc123",
  "translations": {
    "en": {
      "configuration": {
        "lorem": "ipsum"
      }
    }
  },
  "udev": false,
  "update_available": false,
  "url": null,
  "usb": ["/dev/usb1"],
  "version_latest": "1.0.2",
  "version": "1.0.0",
  "video": false,
  "watchdog": true,
  "webui": "http://[HOST]:1337/xy/zx",
  "signed": false
}
```

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/install" method="post">
安装应用

**Deprecated!** Use [`/store/addons/<addon>/install`](#store) instead.

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logo" method="get">
获取应用 logo
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/options" method="post">
设置应用选项。

:::tip
若要重置自定义的 network/audio/options，请将其设为 `null`。
:::

**负载：**

| 键 | 类型 | 说明 |
| ------------- | ------------- | --------------------------------------- |
| boot          | string        | (auto, manual)                          |
| auto\_update   | boolean       | `true` 表示应用应自动更新 |
| network       | dictionary    | 网络配置映射。 |
| options       | dictionary    | 应用配置 |
| audio\_output  | float or null | 音频输出设备索引 |
| audio\_input   | float or null | 音频输入设备索引 |
| ingress\_panel | boolean       | `true` 表示已启用 ingress\_panel |
| watchdog      | boolean       | `true` 表示已启用 watchdog |

**你至少需要在负载中提供一个键。**

**示例负载：**

```json
{
  "boot": "manual",
  "auto_update": false,
  "network": {
    "CONTAINER": "1337"
  },
  "options": {
    "awesome": true
  },
  "watchdog": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/sys_options" method="post">
修改系统托管应用的专用选项。

该端点只能由 Home Assistant 调用，其他客户端不能调用。

**负载：**

| 键 | 类型 | 说明 |
| --------------------------- | ------------- | --------------------------------------- |
| system\_managed              | boolean       | `true` 表示由 Home Assistant 管理 |
| system\_managed\_config\_entry | boolean       | 管理该应用的配置条目 ID |

**你至少需要在负载中提供一个键。**

**示例负载：**

```json
{
  "system_managed": true,
  "system_managed_config_entry": "abc123"
}
```

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/options/validate" method="post">
针对当前已存储的应用配置或传入负载执行配置校验。

**负载：**

可选：原始应用选项。

**返回数据：**

| 键 | 类型 | 说明 |
| ---------------- | ----------- | -------------------------------- |
| message          | string      | 错误信息 |
| valid            | boolean        | 配置是否有效 |
| pwned            | boolean | None | 是否包含已泄露的密钥；出错时为 `None` |

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/options/config" method="get">
用于获取其自身渲染后配置的数据端点。
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/rebuild" method="post">
重新构建应用，仅支持本地构建型应用。

**负载：**

| key   | type    | optional | description                                                       |
| ----- | ------- | -------- | ----------------------------------------------------------------- |
| force | boolean | True     | Force rebuild of the app even if pre-built images are provided |

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/restart" method="post">
重启应用
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/security" method="post">
Set the protection mode on an app.

This function is not callable by itself and you can not use `self` as the slug here.

**负载：**

| key       | type    | description                     |
| --------- | ------- | ------------------------------- |
| protected | boolean | `true` if protection mode is on |

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/start" method="post">
启动应用
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/stats" method="get">

返回该应用对应的 [Stats 模型](/developers/api/supervisor/models.md#stats)。

**示例响应：**

```json
{
  "cpu_percent": 14.0,
  "memory_usage": 288888,
  "memory_limit": 322222,
  "memory_percent": 32.4,
  "network_tx": 110,
  "network_rx": 902,
  "blk_read": 12,
  "blk_write": 27
}
```

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/stdin" method="post">
向应用的 stdin 写入数据。

你想传递给应用的负载应作为请求体发送到该端点。 </ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/stop" method="post">
停止应用
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/uninstall" method="post">
卸载应用

**负载：**

| 键 | 类型 | 可选 | 说明 |
| ------------- | ------- | -------- | -------------------------------------- |
| remove\_config | boolean | True     | 删除应用的配置文件夹（如果有） |

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/update" method="post">
更新应用

**已弃用！** 请改用 [`/store/addons/<addon>/update`](#store)。

</ApiEndpoint>

### 音频

<ApiEndpoint path="/audio/default/input" method="post">
Set a profile as the default input profile

**负载：**

| key  | type   | optional | description             |
| ---- | ------ | -------- | ----------------------- |
| name | string | False    | The name of the profile |

</ApiEndpoint>

<ApiEndpoint path="/audio/default/output" method="post">
Set a profile as the default output profile

**负载：**

| key  | type   | optional | description             |
| ---- | ------ | -------- | ----------------------- |
| name | string | False    | The name of the profile |

</ApiEndpoint>

<ApiEndpoint path="/audio/info" method="get">
Return information about the audio plugin.

**返回数据：**

| key              | type       | description                      |
| ---------------- | ---------- | -------------------------------- |
| host             | string     | The IP address of the plugin     |
| version          | string     | The installed observer version   |
| version\_latest   | string     | The latest published version     |
| update\_available | boolean    | `true` if an update is available |
| audio            | dictionary | An [Audio model](/developers/api/supervisor/models.md#audio) |

**示例响应：**

```json
{
  "host": "172.0.0.19",
  "version": "1",
  "latest_version": "2",
  "update_available": true,
  "audio": {
    "card": [
      {
        "name": "Awesome card",
        "index": 1,
        "driver": "Awesome driver",
        "profiles": [
          {
            "name": "Awesome profile",
            "description": "My awesome profile",
            "active": false
          }
        ]
      }
    ],
    "input": [
      {
        "name": "Awesome device",
        "index": 0,
        "description": "My awesome device",
        "volume": 0.3,
        "mute": false,
        "default": false,
        "card": null,
        "applications": [
          {
            "name": "Awesome application",
            "index": 0,
            "stream_index": 0,
            "stream_type": "INPUT",
            "volume": 0.3,
            "mute": false,
            "addon": "awesome_addon"
          }
        ]
      }
    ],
    "output": [
      {
        "name": "Awesome device",
        "index": 0,
        "description": "My awesome device",
        "volume": 0.3,
        "mute": false,
        "default": false,
        "card": 1,
        "applications": [
          {
            "name": "Awesome application",
            "index": 0,
            "stream_index": 0,
            "stream_type": "INPUT",
            "volume": 0.3,
            "mute": false,
            "addon": "awesome_addon"
          }
        ]
      }
    ],
    "application": [
      {
        "name": "Awesome application",
        "index": 0,
        "stream_index": 0,
        "stream_type": "OUTPUT",
        "volume": 0.3,
        "mute": false,
        "addon": "awesome_addon"
      }
    ]
  }
}
```

</ApiEndpoint>

<ApiEndpoint path="/audio/logs" method="get">

Get logs for the audio plugin container via the Systemd journal backend.

The endpoint accepts the same headers and provides the same functionality as
`/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/audio/logs/follow" method="get">

Identical to `/audio/logs` except it continuously returns new log entries.

</ApiEndpoint>

<ApiEndpoint path="/audio/logs/latest" method="get">

Return all logs of the latest startup of the audio plugin container.

The `Range` header is ignored but the `lines` query parameter can be used.

</ApiEndpoint>

<ApiEndpoint path="/audio/logs/boots/<bootid>" method="get">

Get logs for the audio plugin container related to a specific boot.

The `bootid` parameter is interpreted in the same way as in
`/host/logs/boots/<bootid>` and the endpoint otherwise provides the same
functionality as `/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/audio/logs/boots/<bootid>/follow" method="get">

Identical to `/audio/logs/boots/<bootid>` except it continuously returns
new log entries.

</ApiEndpoint>

<ApiEndpoint path="/audio/mute/input" method="post">
Mute input devices

**负载：**

| key    | type    | optional | description             |
| ------ | ------- | -------- | ----------------------- |
| index  | string  | False    | The index of the device |
| active | boolean | False    | `true` if muted         |

</ApiEndpoint>

<ApiEndpoint path="/audio/mute/input/<application>" method="post">
Mute input for a specific application

**负载：**

| key    | type    | optional | description             |
| ------ | ------- | -------- | ----------------------- |
| index  | string  | False    | The index of the device |
| active | boolean | False    | `true` if muted         |

</ApiEndpoint>

<ApiEndpoint path="/audio/mute/output" method="post">
Mute output devices

**负载：**

| key    | type    | optional | description             |
| ------ | ------- | -------- | ----------------------- |
| index  | string  | False    | The index of the device |
| active | boolean | False    | `true` if muted         |

</ApiEndpoint>

<ApiEndpoint path="/audio/mute/output/<application>" method="post">
Mute output for a specific application

**负载：**

| key    | type    | optional | description             |
| ------ | ------- | -------- | ----------------------- |
| index  | string  | False    | The index of the device |
| active | boolean | False    | `true` if muted         |

</ApiEndpoint>

<ApiEndpoint path="/audio/profile" method="post">
Create an audio profile

**负载：**

| key  | type   | optional | description                  |
| ---- | ------ | -------- | ---------------------------- |
| card | string | False    | The name of the audio device |
| name | string | False    | The name of the profile      |

</ApiEndpoint>

<ApiEndpoint path="/audio/reload" method="post">
Reload audio information
</ApiEndpoint>

<ApiEndpoint path="/audio/restart" method="post">
Restart the audio plugin
</ApiEndpoint>

<ApiEndpoint path="/audio/stats" method="get">

Returns a [Stats model](/developers/api/supervisor/models.md#stats) for the audio plugin.

**示例响应：**

```json
{
  "cpu_percent": 14.0,
  "memory_usage": 288888,
  "memory_limit": 322222,
  "memory_percent": 32.4,
  "network_tx": 110,
  "network_rx": 902,
  "blk_read": 12,
  "blk_write": 27
}
```

</ApiEndpoint>

<ApiEndpoint path="/audio/update" method="post">
Update the audio plugin

**负载：**

| key     | type   | description                                                    |
| ------- | ------ | -------------------------------------------------------------- |
| version | string | The version you want to install, default is the latest version |

</ApiEndpoint>

<ApiEndpoint path="/audio/volume/input" method="post">
Set the input volume

**负载：**

| key    | type   | optional | description                         |
| ------ | ------ | -------- | ----------------------------------- |
| index  | string | False    | The index of the device             |
| volume | float  | False    | The volume (between `0.0`and `1.0`) |

</ApiEndpoint>

<ApiEndpoint path="/audio/volume/input/<application>" method="post">
Set the input volume for a specific application

**负载：**

| key    | type   | optional | description                         |
| ------ | ------ | -------- | ----------------------------------- |
| index  | string | False    | The index of the device             |
| volume | float  | False    | The volume (between `0.0`and `1.0`) |

</ApiEndpoint>

<ApiEndpoint path="/audio/volume/output" method="post">
Set the output volume

**负载：**

| key    | type   | optional | description                         |
| ------ | ------ | -------- | ----------------------------------- |
| index  | string | False    | The index of the device             |
| volume | float  | False    | The volume (between `0.0`and `1.0`) |

</ApiEndpoint>

<ApiEndpoint path="/audio/volume/output/<application>" method="post">
Set the output volume for a specific application

**负载：**

| key    | type   | optional | description                         |
| ------ | ------ | -------- | ----------------------------------- |
| index  | string | False    | The index of the device             |
| volume | float  | False    | The volume (between `0.0`and `1.0`) |

</ApiEndpoint>

### 认证

<ApiEndpoint path="/auth" method="get">
You can do authentication against Home Assistant Core using Basic Authentication.
Use the `X-Supervisor-Token` header to provide the Supervisor authentication token.
See the corresponding POST method to provide JSON or urlencoded credentials.
</ApiEndpoint>

<ApiEndpoint path="/auth" method="post">
You can do authentication against Home Assistant Core.
You can POST the data as JSON, as urlencoded (with `application/x-www-form-urlencoded` header) or by using use basic authentication.
For using Basic authentication, you can use the `X-Supervisor-Token` for Supervisor authentication token.

**负载：**

| key      | type   | description               |
| -------- | ------ | ------------------------- |
| username | string | The username for the user |
| password | string | The password for the user |

</ApiEndpoint>

<ApiEndpoint path="/auth/reset" method="post">
Set a new password for a Home Assistant Core user.

**负载：**

| key      | type   | description                   |
| -------- | ------ | ----------------------------- |
| username | string | The username for the user     |
| password | string | The new password for the user |

</ApiEndpoint>

<ApiEndpoint path="/auth/cache" method="delete">

Reset internal authentication cache, this is useful if you have changed the password for a user and need to clear the internal cache.

</ApiEndpoint>

<ApiEndpoint path="/auth/list" method="get">

List all users in Home Assistant to help with credentials recovery. Requires an admin level authentication token.

**负载：**

| key      | type   | description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| users    | list   | List of the Home Assistant [users](/developers/api/supervisor/models.md#user). |

</ApiEndpoint>

### 备份

<ApiEndpoint path="/backups" method="get">

Return a list of [Backups](/developers/api/supervisor/models.md#backup)

**示例响应：**

```json
{
  "backups": [
    {
      "slug": "skuwe823",
      "date": "2020-09-30T20:25:34.273Z",
      "name": "Awesome backup",
      "type": "partial",
      "size": 44,
      "protected": true,
      "location": "MountedBackups",
      "compressed": true,
      "content": {
        "homeassistant": true,
        "addons": ["awesome_addon"],
        "folders": ["ssl", "media"]
      }
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/backups/info" method="get">

Return information about backup manager.

**返回数据：**

| key              | type       | description                                          |
| ---------------- | ---------- | ---------------------------------------------------- |
| backups          | list       | A list of [Backups](/developers/api/supervisor/models.md#backup) |
| days\_until\_stale | int        | Number of days until a backup is considered stale    |

**示例响应：**

```json
{
  "backups": [
    {
      "slug": "skuwe823",
      "date": "2020-09-30T20:25:34.273Z",
      "name": "Awesome backup",
      "type": "partial",
      "size": 44,
      "protected": true,
      "compressed": true,
      "location": null,
      "content": {
        "homeassistant": true,
        "addons": ["awesome_addon"],
        "folders": ["ssl", "media"]
      }
    }
  ],
  "days_until_stale": 30
}
```

</ApiEndpoint>

<ApiEndpoint path="/backups/new/full" method="post">

Create a full backup.

**负载：**

| key                            | type           | optional | description                                          |
| ------------------------------ | -------------- | -------- | ---------------------------------------------------- |
| name                           | string         | True     | The name you want to give the backup                 |
| password                       | string         | True     | The password you want to give the backup             |
| compressed                     | boolean        | True     | `false` to create uncompressed backups               |
| location                       | string or null | True     | Name of a backup mount or `null` for /backup         |
| homeassistant\_exclude\_database | boolean        | True     | Exclude the Home Assistant database file from backup |
| background                     | boolean        | True     | Return `job_id` immediately, do not wait for backup to complete. Clients must check job for status and slug. |

**示例响应：**

```json
{
  "slug": "skuwe823"
}
```

</ApiEndpoint>

<ApiEndpoint path="/backups/new/upload" method="post">

Upload a backup.

**示例响应：**

```json
{
  "slug": "skuwe823",
  "job_id": "abc123"
}
```

:::note

Error responses from this API may also include a `job_id` if the message alone cannot accurately describe what happened.
Callers should direct users to review the job or supervisor logs to get an understanding of what occurred.

:::

</ApiEndpoint>

<ApiEndpoint path="/backups/new/partial" method="post">

Create a partial backup.

**负载：**

| key                            | type           | optional | description                                          |
| ------------------------------ | -------------- | -------- | ---------------------------------------------------- |
| name                           | string         | True     | The name you want to give the backup                 |
| password                       | string         | True     | The password you want to give the backup             |
| homeassistant                  | boolean        | True     | Add home assistant core settings to the backup       |
| addons                         | list           | True     | A list of strings representing app slugs          |
| folders                        | list           | True     | A list of strings representing directories           |
| compressed                     | boolean        | True     | `false` to create uncompressed backups               |
| location                       | string or null | True     | Name of a backup mount or `null` for /backup         |
| homeassistant\_exclude\_database | boolean        | True     | Exclude the Home Assistant database file from backup |
| background                     | boolean        | True     | Return `job_id` immediately, do not wait for backup to complete. Clients must check job for status and slug. |

**你至少需要在负载中提供一个键。**

**示例响应：**

```json
{
  "slug": "skuwe823",
  "job_id": "abc123"
}
```

:::note

Error responses from this API may also include a `job_id` if the message alone cannot accurately describe what happened.
Callers should direct users to review the job or supervisor logs to get an understanding of what occurred.

:::

</ApiEndpoint>

<ApiEndpoint path="/backups/options" method="post">
Update options for backup manager, you need to supply at least one of the payload keys to the API call.

**负载：**

| key              | type           | description                                           |
| ---------------- | -------------- | ----------------------------------------------------- |
| days\_until\_stale | int            | Set number of days until a backup is considered stale |

**你至少需要在负载中提供一个键。**

</ApiEndpoint>

<ApiEndpoint path="/backups/reload" method="post">

Reload backup from storage.

</ApiEndpoint>

<ApiEndpoint path="/backups/freeze" method="post">

Put Supervisor in a freeze state and prepare Home Assistant and addons for an external backup.

:::note

This does not take a backup. It prepares Home Assistant and addons for one but the expectation
is that the user is using an external tool to make the backup. Such as the snapshot feature in
KVM or Proxmox. The caller should call `/backups/thaw` when done.

:::

**负载：**

| key     | type  | optional | description                                                                   |
| ------- | ----- | -------- | ----------------------------------------------------------------------------- |
| timeout | int   | True     | Seconds before freeze times out and thaw begins automatically (default: 600). |

</ApiEndpoint>

<ApiEndpoint path="/backups/thaw" method="post">

End a freeze initiated by `/backups/freeze` and resume normal behavior in Home Assistant and addons.

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>/download" method="get">

Download the backup file with the given slug.

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>/info" method="get">

Returns a [Backup details model](/developers/api/supervisor/models.md#backup-details) for the app.

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>" method="delete">

Removes the backup file with the given slug.

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>/restore/full" method="post">

Does a full restore of the backup with the given slug.

**负载：**

| key        | type    | optional | description                          |
| ---------- | ------- | -------- | ------------------------------------ |
| password   | string  | True     | The password for the backup if any   |
| background | boolean | True     | Return `job_id` immediately, do not wait for restore to complete. Clients must check job for status. |

**示例响应：**

```json
{
  "job_id": "abc123"
}
```

:::note

Error responses from this API may also include a `job_id` if the message alone cannot accurately describe what happened.
Callers should direct users to review the job or supervisor logs to get an understanding of what occurred.

:::

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>/restore/partial" method="post">

Does a partial restore of the backup with the given slug.

**负载：**

| key           | type    | optional | description                                    |
| ------------- | ------- | -------- | ---------------------------------------------- |
| homeassistant | boolean | True     | `true` if Home Assistant should be restored    |
| addons        | list    | True     | A list of app slugs that should be restored |
| folders       | list    | True     | A list of directories that should be restored  |
| password      | string  | True     | The password for the backup if any             |
| background    | boolean | True     | Return `job_id` immediately, do not wait for restore to complete. Clients must check job for status. |

**你至少需要在负载中提供一个键。**

**示例响应：**

```json
{
  "job_id": "abc123"
}
```

:::note

Error responses from this API may also include a `job_id` if the message alone cannot accurately describe what happened.
Callers should direct users to review the job or supervisor logs to get an understanding of what occurred.

:::

</ApiEndpoint>

### CLI

<ApiEndpoint path="/cli/info" method="get">
Returns information about the CLI plugin

**返回数据：**

| key              | type       | description                      |
| ---------------- | ---------- | -------------------------------- |
| version          | string     | The installed cli version        |
| version\_latest   | string     | The latest published version     |
| update\_available | boolean    | `true` if an update is available |

**示例响应：**

```json
{
  "version": "1",
  "version_latest": "2",
  "update_available": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/cli/stats" method="get">

Returns a [Stats model](/developers/api/supervisor/models.md#stats) for the CLI plugin.

**示例响应：**

```json
{
  "cpu_percent": 14.0,
  "memory_usage": 288888,
  "memory_limit": 322222,
  "memory_percent": 32.4,
  "network_tx": 110,
  "network_rx": 902,
  "blk_read": 12,
  "blk_write": 27
}
```

</ApiEndpoint>

<ApiEndpoint path="/cli/update" method="post">
Update the CLI plugin

**负载：**

| key     | type   | description                                                    |
| ------- | ------ | -------------------------------------------------------------- |
| version | string | The version you want to install, default is the latest version |

</ApiEndpoint>

### Core

<ApiEndpoint path="/core/api" method="get">
Proxy GET API calls to the Home Assistant API
</ApiEndpoint>

<ApiEndpoint path="/core/api" method="post">
Proxy POST API calls to the Home Assistant API
</ApiEndpoint>

<ApiEndpoint path="/core/check" method="post">
Run a configuration check
</ApiEndpoint>

<ApiEndpoint path="/core/info" method="get">
Returns information about the Home Assistant core

**返回数据：**

| key                      | type           | description                                                |
| ------------------------ | -------------- | ---------------------------------------------------------- |
| version                  | string         | The installed core version                                 |
| version\_latest           | string         | The latest published version in the active channel         |
| update\_available         | boolean        | `true` if an update is available                           |
| arch                     | string         | The architecture of the host (armhf, aarch64, i386, amd64) |
| machine                  | string         | The machine type that is running the host                  |
| ip\_address               | string         | The internal docker IP address to the supervisor           |
| image                    | string         | The container image that is running the core               |
| boot                     | boolean        | `true` if it should start on boot                          |
| port                     | int            | The port Home Assistant is running on                      |
| ssl                      | boolean        | `true` if Home Assistant is using SSL                      |
| watchdog                 | boolean        | `true` if watchdog is enabled                              |
| wait\_boot                | int            | Max time to wait during boot                               |
| audio\_input              | string or null | The description of the audio input device                  |
| audio\_output             | string or null | The description of the audio output device                 |
| backups\_exclude\_database | boolean        | Backups exclude Home Assistant database file by default    |
| duplicate\_log\_file       | boolean        | Home Assistant duplicates logs to a file                   |

**示例响应：**

```json
{
  "version": "0.117.0",
  "version_latest": "0.117.0",
  "update_available": true,
  "arch": "arch",
  "machine": "amd64",
  "ip_address": "172.0.0.15",
  "image": "homeassistant/home-assistant",
  "boot": true,
  "port": 8123,
  "ssl": false,
  "watchdog": true,
  "wait_boot": 800,
  "audio_input": "AMCP32",
  "audio_output": "AMCP32"
}
```

</ApiEndpoint>

<ApiEndpoint path="/core/logs" method="get">

Get logs for the Home Assistant Core container via the Systemd journal backend.

The endpoint accepts the same headers and provides the same functionality as
`/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/core/logs/follow" method="get">

Identical to `/core/logs` except it continuously returns new log entries.

</ApiEndpoint>

<ApiEndpoint path="/core/logs/latest" method="get">

Return all logs of the latest startup of the Home Assistant Core container.

The `Range` header is ignored but the `lines` query parameter can be used.

</ApiEndpoint>

<ApiEndpoint path="/core/logs/boots/<bootid>" method="get">

Get logs for the Home Assistant Core container related to a specific boot.

The `bootid` parameter is interpreted in the same way as in
`/host/logs/boots/<bootid>` and the endpoint otherwise provides the same
functionality as `/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/core/logs/boots/<bootid>/follow" method="get">

Identical to `/core/logs/boots/<bootid>` except it continuously returns
new log entries.

</ApiEndpoint>

<ApiEndpoint path="/core/options" method="post">
Update options for Home Assistant, you need to supply at least one of the payload keys to the API call.
You need to call `/core/restart` after updating the options.

:::tip
Passing `image`, `refresh_token`, `audio_input` or `audio_output` with `null` resets the option.
:::

**负载：**

| key                      | type           | description                                                 |
| ------------------------ | -------------- | ----------------------------------------------------------- |
| boot                     | boolean        | Start Core on boot                                          |
| image                    | string or null | Name of custom image                                        |
| port                     | int            | The port that Home Assistant run on                         |
| ssl                      | boolean        | `true` to enable SSL                                        |
| watchdog                 | boolean        | `true` to enable the watchdog                               |
| wait\_boot                | int            | Time to wait for Core to startup                            |
| refresh\_token            | string or null | Token to authenticate with Core                             |
| audio\_input              | string or null | Profile name for audio input                                |
| audio\_output             | string or null | Profile name for audio output                               |
| backups\_exclude\_database | boolean        | `true` to exclude Home Assistant database file from backups |
| duplicate\_log\_file       | boolean        | `true` to duplicate Home Assistant logs to a file           |

**你至少需要在负载中提供一个键。**

</ApiEndpoint>

<ApiEndpoint path="/core/rebuild" method="post">
Rebuild the Home Assistant core container

**负载：**

| key       | type       | optional | description                      |
| --------- | ---------- | -------- | -------------------------------- |
| safe\_mode | boolean    | True     | Rebuild Core into safe mode      |
| force     | boolean    | True     | Force rebuild during a Home Assistant offline db migration |

</ApiEndpoint>

<ApiEndpoint path="/core/restart" method="post">
Restart the Home Assistant core container

**负载：**

| key       | type       | optional | description                      |
| --------- | ---------- | -------- | -------------------------------- |
| safe\_mode | boolean    | True     | Restart Core into safe mode      |
| force     | boolean    | True     | Force restart during a Home Assistant offline db migration |

</ApiEndpoint>

<ApiEndpoint path="/core/start" method="post">
Start the Home Assistant core container
</ApiEndpoint>

<ApiEndpoint path="/core/stats" method="get">

Returns a [Stats model](/developers/api/supervisor/models.md#stats) for the Home Assistant core.

**示例响应：**

```json
{
  "cpu_percent": 14.0,
  "memory_usage": 288888,
  "memory_limit": 322222,
  "memory_percent": 32.4,
  "network_tx": 110,
  "network_rx": 902,
  "blk_read": 12,
  "blk_write": 27
}
```

</ApiEndpoint>

<ApiEndpoint path="/core/stop" method="post">
Stop the Home Assistant core container

**负载：**

| key       | type       | optional | description                      |
| --------- | ---------- | -------- | -------------------------------- |
| force     | boolean    | True     | Force stop during a Home Assistant offline db migration |

</ApiEndpoint>

<ApiEndpoint path="/core/update" method="post">
Update Home Assistant core

**负载：**

| key     | type   | description                                                    |
| ------- | ------ | -------------------------------------------------------------- |
| version | string | The version you want to install, default is the latest version |
| backup | boolean | Create a partial backup of core and core configuration before updating, default is false |

</ApiEndpoint>

<ApiEndpoint path="/core/websocket" method="get">
Proxy to Home Assistant Core websocket.
</ApiEndpoint>

### 发现

<ApiEndpoint path="/discovery" method="get">
Return information about enabled discoveries.

**返回数据：**

| key       | type       | description                                                                     |
| --------- | ---------- | ------------------------------------------------------------------------------- |
| discovery | list       | A list of [Discovery models](/developers/api/supervisor/models.md#discovery)                                |
| services  | dictionary | A dictionary of services that contains a list of apps that have that service. |

**示例响应：**

```json
{
  "discovery": [
    {
      "addon": "awesome_addon",
      "service": "awesome.service",
      "uuid": "fh874r-fj9o37yr3-fehsf7o3-fd798",
      "config": {}
    }
  ],
  "services": {
    "awesome": ["awesome_addon"]
  }
}
```

</ApiEndpoint>

<ApiEndpoint path="/discovery" method="post">
Create a discovery service

**负载：**

| key     | type       | optional | description                      |
| ------- | ---------- | -------- | -------------------------------- |
| service | string     | False    | The name of the service          |
| config  | dictionary | False    | The configuration of the service |

**示例响应：**

```json
{
  "uuid": "uuid"
}
```

</ApiEndpoint>

<ApiEndpoint path="/discovery/<uuid>" method="get">

Get a [discovery model](/developers/api/supervisor/models.md#discovery) for a UUID.

</ApiEndpoint>

<ApiEndpoint path="/discovery/<uuid>" method="delete">
Delete a specific service.
</ApiEndpoint>

### DNS

<ApiEndpoint path="/dns/info" method="get">
Return information about the DNS plugin.

**返回数据：**

| key              | type    | description                      |
| ---------------- | ------- | -------------------------------- |
| fallback         | bool    | Try fallback DNS on failure      |
| host             | string  | The IP address of the plugin     |
| llmnr            | bool    | Can resolve LLMNR hostnames      |
| locals           | list    | A list of DNS servers            |
| mdns             | bool    | Can resolve MulticastDNS hostnames |
| servers          | list    | A list of DNS servers            |
| update\_available | boolean | `true` if an update is available |
| version          | string  | The installed observer version   |
| version\_latest   | string  | The latest published version     |

**示例响应：**

```json
{
  "host": "127.0.0.18",
  "version": "1",
  "version_latest": "2",
  "update_available": true,
  "servers": ["dns://8.8.8.8"],
  "locals": ["dns://127.0.0.18"],
  "mdns": true,
  "llmnr": false,
  "fallback": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/dns/logs" method="get">

Get logs for the DNS plugin container via the Systemd journal backend.

The endpoint accepts the same headers and provides the same functionality as
`/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/dns/logs/follow" method="get">

Identical to `/dns/logs` except it continuously returns new log entries.

</ApiEndpoint>

<ApiEndpoint path="/dns/logs/latest" method="get">

Return all logs of the latest startup of the DNS plugin container.

The `Range` header is ignored but the `lines` query parameter can be used.

</ApiEndpoint>

<ApiEndpoint path="/dns/logs/boots/<bootid>" method="get">

Get logs for the DNS plugin container related to a specific boot.

The `bootid` parameter is interpreted in the same way as in
`/host/logs/boots/<bootid>` and the endpoint otherwise provides the same
functionality as `/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/dns/logs/boots/<bootid>/follow" method="get">

Identical to `/dns/logs/boots/<bootid>` except it continuously returns
new log entries.

</ApiEndpoint>

<ApiEndpoint path="/dns/options" method="post">
Set DNS options

**负载：**

| key      | type | optional | description                 |
| -------  | ---- | -------- | --------------------------- |
| fallback | bool | True     | Enable/Disable fallback DNS |
| servers  | list | True     | A list of DNS servers       |

**你至少需要在负载中提供一个键。**

</ApiEndpoint>

<ApiEndpoint path="/dns/reset" method="post">
Reset the DNS configuration.
</ApiEndpoint>

<ApiEndpoint path="/dns/restart" method="post">
Restart the DNS plugin
</ApiEndpoint>

<ApiEndpoint path="/dns/stats" method="get">

Returns a [Stats model](/developers/api/supervisor/models.md#stats) for the dns plugin.

**示例响应：**

```json
{
  "cpu_percent": 14.0,
  "memory_usage": 288888,
  "memory_limit": 322222,
  "memory_percent": 32.4,
  "network_tx": 110,
  "network_rx": 902,
  "blk_read": 12,
  "blk_write": 27
}
```

</ApiEndpoint>

<ApiEndpoint path="/dns/update" method="post">
Update the DNS plugin

**负载：**

| key     | type   | description                                                    |
| ------- | ------ | -------------------------------------------------------------- |
| version | string | The version you want to install, default is the latest version |

</ApiEndpoint>

### Docker

<ApiEndpoint path="/docker/info" method="get">
Returns information about the docker instance.

**返回数据：**

| key         | type   | description                        |
| ----------- | ------ | ---------------------------------- |
| version     | string | The version of the docker engine   |
| enable\_ipv6 | bool   | Enable/Disable IPv6 for containers |
| storage     | string | The storage type                   |
| logging     | string | The logging type                   |
| registries  | dictionary | A dictionary of dictionaries containing `username` and `password` keys for registries. |

**示例响应：**

```json
{
  "version": "1.0.1",
  "enable_ipv6": true,
  "storage": "overlay2",
  "logging": "journald",
  "registries": {}
}
```

</ApiEndpoint>

<ApiEndpoint path="/docker/options" method="post">
Set docker options

**负载：**

| key         | type | optional | description                        |
| ----------- | ---- | -------- | ---------------------------------- |
| enable\_ipv6 | bool | True     | Enable/Disable IPv6 for containers |

**你至少需要在负载中提供一个键。**

</ApiEndpoint>

<ApiEndpoint path="/docker/registries" method="get">
Get all configured container registries, this returns a dict with the registry hostname as the key, and a dictionary containing the username configured for that registry.

**示例响应：**

```json
{
  "registry.example.com": {
    "username": "AwesomeUser"
  }
}
```

</ApiEndpoint>

<ApiEndpoint path="/docker/registries" method="post">
Add a new container registry.

**负载：**

| key      | type       | description                                                              |
| -------- | ---------- | ------------------------------------------------------------------------ |
| hostname | dictionary | A dictionary containing `username` and `password` keys for the registry. |

**示例负载：**

```json
{
  "registry.example.com": {
    "username": "AwesomeUser",
    "password": "MySuperStrongPassword!"
  }
}
```

:::note

To login to the default container registry (Docker Hub), use `hub.docker.com` as the registry.

:::

</ApiEndpoint>

<ApiEndpoint path="/docker/registries/<registry>" method="delete">
Delete a registry from the configured container registries.
</ApiEndpoint>

<ApiEndpoint path="/docker/migrate-storage-driver" method="post">
Schedule a Docker storage driver migration. The migration will be applied on the next system reboot.

This endpoint allows migrating to either:

* `overlayfs`: The Containerd overlayfs driver
* `overlay2`: The Docker graph overlay2 driver

:::note

This endpoint requires Home Assistant OS 17.0 or newer. A `404` error will be returned on older versions or non-HAOS installations.

:::

**负载：**

| key            | type   | optional | description                                           |
| -------------- | ------ | -------- | ----------------------------------------------------- |
| storage\_driver | string | False    | The target storage driver (`overlayfs` or `overlay2`) |

**示例负载：**

```json
{
  "storage_driver": "overlayfs"
}
```

After calling this endpoint, a reboot is required to apply the migration. The response will create a `reboot_required` issue in the resolution center.

</ApiEndpoint>

### 硬件

<ApiEndpoint path="/hardware/info" method="get">
Get hardware information.

**示例响应：**

```json
{
    "devices": [
      {
        "name": "ttyACM0",
        "sysfs": "/sys/devices/usb/00:01",
        "dev_path": "/dev/ttyACM0",
        "by_id": "/dev/serial/by-id/usb-Silicon_Labs-RFUSB_9017F723B061A7C01410CFCF-if00-port1",
        "subsystem": "tty",
        "parent": null,
        "attributes": {
          "MINOR": "5"
        },
        "children": [
          "/sys/devices/soc/platform/00ef"
        ]
      }
    ],
    "drives": [
      {
        "vendor": "Generic",
        "model": "Flash Disk",
        "revision": "8.07",
        "serial": "AABBCCDD",
        "id": "Generic-Flash-Disk-AABBCCDD",
        "size": 8054112256,
        "time_detected": "2023-02-15T21:44:22.504878+00:00",
        "connection_bus": "usb",
        "seat": "seat0",
        "removable": true,
        "ejectable": true,
        "filesystems": [
          {
            "device": "/dev/sda1",
            "id": "by-uuid-1122-1ABA",
            "size": 67108864,
            "name": "",
            "system": false,
            "mount_points": []
          }
        ]
      }
    ]
}
```

**返回数据：**

| key      | description                                                  |
| -------- | ------------------------------------------------------------ |
| devices  | A list of [Device models](/developers/api/supervisor/models.md#device)   |
| drives   | A list of [Drive models](/developers/api/supervisor/models.md#drive)

</ApiEndpoint>

<ApiEndpoint path="/hardware/audio" method="get">
Get audio devices

**示例响应：**

```json
{
  "audio": {
    "input": {
      "0,0": "Mic"
    },
    "output": {
      "1,0": "Jack",
      "1,1": "HDMI"
    }
  }
}
```

</ApiEndpoint>

### 主机

<ApiEndpoint path="/host/info" method="get">
Return information about the host.

**Returned data**

| key              | type           | description                               |
| ---------------- | -------------- | ----------------------------------------- |
| agent\_version    | string or null | Agent version running on the Host         |
| apparmor\_version | string or null | The AppArmor version from host            |
| boot\_timestamp   | int            | The timestamp for the last boot in microseconds |
| broadcast\_llmnr  | bool or null   | Host is broadcasting its LLMNR hostname   |
| broadcast\_mdns   | bool or null   | Host is broadcasting its MulticastDNS hostname |
| chassis          | string or null | The chassis type                          |
| virtualization   | string or null | Virtualization hypervisor in use (if any) |
| cpe              | string or null | The local CPE                             |
| deployment       | string or null | The deployment stage of the OS if any     |
| disk\_total       | float          | Total space of the disk in MB             |
| disk\_used        | float          | Used space of the disk in MB              |
| disk\_free        | float          | Free space of the disk in MB              |
| features         | list           | A list of features available for the host |
| hostname         | string or null | The hostname of the host                  |
| kernel           | string or null | The kernel version on the host            |
| llmnr\_hostname   | string or null | The hostname currently exposed on the network via LLMNR for host |
| operating\_system | string         | The operating system on the host          |
| startup\_time     | float          | The time in seconds it took for last boot |
| disk\_life\_time   | float or null  | Percentage of estimated disk lifetime used (0–100). Not all disks provide this information, returns `null` if unavailable. |
| timezone         | string         | The current timezone of the host. |
| dt\_utc           | string         | Current UTC date/time of the host in ISO 8601 format. |
| dt\_synchronized  | bool           | `true` if the host is synchronized with an NTP service. |
| use\_ntp          | bool           | `true` if the host is using an NTP service for time synchronization. |

**示例响应：**

```json
{
  "agent_version": "1.2.0",
  "apparmor_version": "2.13.2",
  "chassis": "specific",
  "cpe": "xy",
  "deployment": "stable",
  "disk_total": 32.0,
  "disk_used": 30.0,
  "disk_free": 2.0,
  "features": ["shutdown", "reboot", "hostname", "services", "haos"],
  "hostname": "Awesome host",
  "llmnr_hostname": "Awesome host",
  "kernel": "4.15.7",
  "operating_system": "Home Assistant OS",
  "boot_timestamp": 1234567788,
  "startup_time": 12.345,
  "broadcast_llmnr": true,
  "broadcast_mdns": false,
  "virtualization": "",
  "disk_life_time": 10.0,
  "timezone": "Europe/Brussels",
  "dt_utc": "2025-09-08T12:00:00.000000+00:00",
  "dt_synchronized": true,
  "use_ntp": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/host/logs" method="get">

Get systemd Journal logs from the host. Returns log entries in plain text, one
log record per line.

**HTTP Request Headers**

| Header   | optional | description                                                                   |
| -------- | -------- |-------------------------------------------------------------------------------|
| Accept   | true     | Type of data (text/plain or text/x-log)                                       |
| Range    | true     | Range of log entries. The format is `entries=cursor[[:num_skip]:num_entries]` |

**HTTP Query Parameters**

These are a convenience alternative to the headers shown above as query
parameters are easier to use in development and with the Home Assistant proxy.
You should only provide one or the other.

| Query     | type  | description                                                                           |
| --------  | ----- | -----------------------------------------------------------------------------------   |
| verbose   | N/A   | If included, uses `text/x-log` as log output type (alternative to `Accept` header)    |
| lines     | int   | Number of lines of output to return (alternative to `Range` header)                   |
| no\_colors | N/A   | If included, ANSI escape codes for terminal coloring will be stripped from the output |

查询字符串示例：

```text
?verbose&lines=100&no_colors
```

:::tip
To get the last log entries the Range request header supports negative values
as `num_skip`. E.g. `Range: entries=:-9:` returns the last 10 entries. Or
`Range: entries=:-200:100` to see 100 entries starting from the one 200 ago.
:::

API returns the last 100 lines by default. Provide a value for `Range` to see
logs further in the past.

The `Accept` header can be set to `text/x-log` to get logs annotated with
extra information, such as the timestamp and Systemd unit name. If no
identifier is specified (i.e. for the host logs containing logs for multiple
identifiers/units), this option is ignored - these logs are always annotated.

</ApiEndpoint>

<ApiEndpoint path="/host/logs/follow" method="get">

Identical to `/host/logs` except it continuously returns new log entries.

</ApiEndpoint>

<ApiEndpoint path="/host/logs/identifiers">

Returns a list of syslog identifiers from the systemd journal that you can use
with `/host/logs/identifiers/<identifier>` and `/host/logs/boots/<bootid>/identifiers/<identifier>`.

</ApiEndpoint>

<ApiEndpoint path="/host/logs/identifiers/<identifier>" method="get">

Get systemd Journal logs from the host for entries related to a specific log
identifier. Some examples of useful identifiers here include

* `audit` - If developing an apparmor profile shows you permission issues
* `NetworkManager` - Shows NetworkManager logs when having network issues
* `bluetoothd` - Shows bluetoothd logs when having bluetooth issues

A call to `GET /host/logs/identifiers` will show the complete list of possible
values for `identifier`.

Otherwise it provides the same functionality as `/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/host/logs/identifiers/<identifier>/follow" method="get">

Identical to `/host/logs/identifiers/<identifier>` except it continuously returns
new log entries.

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boots">

Returns a dictionary of boot IDs for this system that you can use with
`/host/logs/boots/<bootid>` and `/host/logs/boots/<bootid>/identifiers/<identifier>`.

The key for each item in the dictionary is the boot offset. 0 is the current boot,
a negative number denotes how many boots ago that boot was.

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boots/<bootid>" method="get">

Get systemd Journal logs from the host for entries related to a specific boot.
Call `GET /host/info/boots` to see the boot IDs. Alternatively you can provide a
boot offset:

* 0 - The current boot
* Negative number - Count backwards from current boot (-1 is previous boot)
* Positive number - Count forward from last known boot (1 is last known boot)

Otherwise it provides the same functionality as `/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boots/<bootid>/follow" method="get">

Identical to `/host/logs/boots/<bootid>` except it continuously returns
new log entries.

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boots/<bootid>/identifiers/<identifier>" method="get">

Get systemd Journal logs entries for a specific log identifier and boot.
A combination of `/host/logs/boots/<bootid>` and `/host/logs/identifiers/<identifier>`.

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boot/<bootid>/<identifier>/entries/follow" method="get">

Identical to `/host/logs/boots/<bootid>/identifiers/<identifier>` except it continuously
returns new log entries.

</ApiEndpoint>

<ApiEndpoint path="/host/options" method="post">
Set host options

**负载：**

| key      | type   | optional | description                                    |
| -------- | ------ | -------- | ---------------------------------------------- |
| hostname | string | True     | A string that will be used as the new hostname |

**你至少需要在负载中提供一个键。**

</ApiEndpoint>

<ApiEndpoint path="/host/reboot" method="post">
Reboot the host

**负载：**

| key       | type       | optional | description                                               |
| --------- | ---------- | -------- | --------------------------------------------------------- |
| force     | boolean    | True     | Force reboot during a Home Assistant offline db migration |

</ApiEndpoint>

<ApiEndpoint path="/host/reload" method="post">
Reload host information
</ApiEndpoint>

<ApiEndpoint path="/host/service/<service>/start" method="post">
Start a service on the host.
</ApiEndpoint>

<ApiEndpoint path="/host/service/<service>/stop" method="post">
Stop a service on the host.
</ApiEndpoint>

<ApiEndpoint path="/host/service/<service>/reload" method="post">
Reload a service on the host.
</ApiEndpoint>

<ApiEndpoint path="/host/services" method="get">
Get information about host services.

**返回数据：**

| key      | description                                                  |
| -------- | ------------------------------------------------------------ |
| services | A dictionary of [Host service models](/developers/api/supervisor/models.md#host-service) |

**示例响应：**

```json
{
  "services": [
    {
      "name": "awesome.service",
      "description": "Just an awesome service",
      "state": "active"
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/host/shutdown" method="post">
Shutdown the host

**负载：**

| key       | type       | optional | description                                                 |
| --------- | ---------- | -------- | ----------------------------------------------------------- |
| force     | boolean    | True     | Force shutdown during a Home Assistant offline db migration |

</ApiEndpoint>

<ApiEndpoint path="/host/disks/<disk>/usage" method="get">
Get detailed disk usage information in bytes.

The only supported `disk` for now is "default". It will return usage info for the data disk.

Supports an optional `max_depth` query param. Defaults to 1

**示例响应：**

```json
{
  "id": "root",
  "label": "Default",
  "total_space": 503312781312,
  "used_space": 430245011456,
  "children": [
    {
      "id": "system",
      "label": "System",
      "used_space": 75660903137
    },
    {
      "id": "addons_data",
      "label": "Addons data",
      "used_space": 42349200762
    },
    {
      "id": "addons_config",
      "label": "Addons configuration",
      "used_space": 5283318814
    },
    {
      "id": "media",
      "label": "Media",
      "used_space": 476680019
    },
    {
      "id": "share",
      "label": "Share",
      "used_space": 37477206419
    },
    {
      "id": "backup",
      "label": "Backup",
      "used_space": 268350699520
    },
    {
      "id": "ssl",
      "label": "SSL",
      "used_space": 202912633
    },
    {
      "id": "homeassistant",
      "label": "Home assistant",
      "used_space": 444090152
    }
  ]
}
```

</ApiEndpoint>

### Ingress

<ApiEndpoint path="/ingress/panels" method="get">

**返回数据：**

| key    | type       | description                                  |
| ------ | ---------- | -------------------------------------------- |
| panels | dictionary | dictionary of [Panel models](/developers/api/supervisor/models.md#panel) |

**示例响应：**

```json
{
  "panels": {
    "addon_slug": {
      "enable": true,
      "icon": "mdi:awesome-icon",
      "title": "Awesome app",
      "admin": true
    }
  }
}
```

</ApiEndpoint>

<ApiEndpoint path="/ingress/session" method="post">
Create a new session for access to the ingress service.

**负载：**

| key      | type   | optional | description                                          |
| -------- | ------ | -------- | ---------------------------------------------------- |
| user\_id  | string | True     | The ID of the user authenticated for the new session |

**返回数据：**

| key     | type   | optional | description                       |
| ------- | ------ | -------- | --------------------------------- |
| session | string | False    | The token for the ingress session |

</ApiEndpoint>

<ApiEndpoint path="/ingress/validate_session" method="post">
Validate an ingress session, extending it's validity period.

**负载：**

| key     | type   | optional | description                       |
| ------- | ------ | -------- | --------------------------------- |
| session | string | False    | The token for the ingress session |

</ApiEndpoint>

### 任务

<ApiEndpoint path="/jobs/info" method="get">
Returns info on ignored job conditions and currently running or completed jobs

**返回数据：**

| key               | type       | description                                                    |
| ----------------- | ---------- | -------------------------------------------------------------- |
| ignore\_conditions | list       | List of job conditions being ignored                           |
| jobs              | list       | List of running or completed [Jobs](/developers/api/supervisor/models.md#job) |

**示例响应：**

```json
{
  "ignore_conditions": [],
  "jobs": [{
    "name": "backup_manager_full_backup",
    "reference": "a01bc3",
    "uuid": "123456789",
    "progress": 0,
    "stage": "addons",
    "done": false,
    "child_jobs": [],
    "extra": null
  }]
}
```

</ApiEndpoint>

<ApiEndpoint path="/jobs/options" method="post">
Set options for job manager

**负载：**

| key               | type       | description                                               |
| ----------------- | ---------- | --------------------------------------------------------- |
| ignore\_conditions | list       | List of job conditions to ignore (replaces existing list) |

</ApiEndpoint>

<ApiEndpoint path="/jobs/<job_id>" method="get">
Returns info on a currently running or completed job

**返回数据：**

See [Job](/developers/api/supervisor/models.md#job) model

**示例响应：**

```json
{
  "name": "backup_manager_full_backup",
  "reference": "a01bc3",
  "uuid": "123456789",
  "progress": 0,
  "stage": "addons",
  "done": false,
  "child_jobs": [],
  "extra": null
}
```

</ApiEndpoint>

<ApiEndpoint path="/jobs/<job_id>" method="delete">
Removes a completed job from Supervisor cache if client is no longer interested in it
</ApiEndpoint>

<ApiEndpoint path="/jobs/reset" method="post">
Reset job manager to defaults (stops ignoring any ignored job conditions)

</ApiEndpoint>

### 根

<ApiEndpoint path="/available_updates" method="get">

Returns information about available updates

**示例响应：**

```json
{
  "available_updates": [
  {
      "panel_path": "/update-available/core",
      "update_type": "core",
      "version_latest": "321",
    },
    {
      "panel_path": "/update-available/os",
      "update_type": "os",
      "version_latest": "321",
    },
    {
      "panel_path": "/update-available/supervisor",
      "update_type": "supervisor",
      "version_latest": "321",
    },
    {
      "name": "Awesome addon",
      "icon": "/addons/awesome_addon/icon",
      "panel_path": "/update-available/awesome_addon",
      "update_type": "addon",
      "version_latest": "321",
    }
  ]
}
```

**返回数据：**

| key | type | description |
| -- | -- | -- |
| update\_type | string | `addon`, `os`, `core` or `supervisor` |
| name | string | Returns the name (only if the `update_type` is `addon`) |
| icon | string | Returns the path for the icon if any (only if the `update_type` is `addon`) |
| version\_latest | string | Returns the available version |
| panel\_path | string | Returns path where the UI can be loaded |

</ApiEndpoint>

<ApiEndpoint path="/reload_updates" method="post">
This reloads information about main components (OS, Supervisor, Core, and
Plug-ins).
</ApiEndpoint>

<ApiEndpoint path="/refresh_updates" method="post">
This reloads information about app repositories and fetches new version files.
This endpoint is currently discouraged. Use `/reload_updates` or `/store/reload`
instead.
</ApiEndpoint>

<ApiEndpoint path="/info" method="get">
Returns a dict with selected keys from other `/*/info` endpoints.

**返回数据：**

| key              | type           | description                                                  |
| ---------------- | -------------- | ------------------------------------------------------------ |
| supervisor       | string         | The installed version of the supervisor                      |
| homeassistant    | string         | The installed version of Home Assistant                      |
| hassos           | string or null | The version of Home Assistant OS or null                     |
| docker           | string         | The docker version on the host                               |
| hostname         | string         | The hostname on the host                                     |
| operating\_system | string         | The operating system on the host                             |
| features         | list           | A list ov available features on the host                     |
| machine          | string         | The machine type                                             |
| machine\_id       | string or null | The machine ID of the underlying operating system            |
| arch             | string         | The architecture on the host                                 |
| supported\_arch   | list           | A list of supported host architectures                       |
| supported        | boolean        | `true` if the environment is supported                       |
| channel          | string         | The active channel (stable, beta, dev)                       |
| logging          | string         | The active log level (debug, info, warning, error, critical) |
| state | string | The core state of the Supervisor. |
| timezone         | string         | The current timezone                                         |

**示例响应：**

```json
{
  "supervisor": "300",
  "homeassistant": "0.117.0",
  "hassos": "5.0",
  "docker": "24.17.2",
  "hostname": "Awesome Hostname",
  "operating_system": "Home Assistant OS",
  "features": ["shutdown", "reboot", "hostname", "services", "hassos"],
  "machine": "ova",
  "arch": "amd64",
  "supported_arch": ["amd64"],
  "supported": true,
  "channel": "stable",
  "logging": "info",
  "state": "running",
  "timezone": "Europe/Brussels"
}
```

</ApiEndpoint>

### 挂载

<ApiEndpoint path="/mounts" method="get">
Returns information about mounts configured in Supervisor

**返回数据：**

| key                  | type           | description                                        |
| -------------------- | -------------- | -------------------------------------------------- |
| mounts               | list           | A list of [Mounts](/developers/api/supervisor/models.md#mount) |
| default\_backup\_mount | string or null | Name of a backup mount or `null` for /backup       |

**示例响应：**

```json
{
  "default_backup_mount": "my_share",
  "mounts": [
    {
      "name": "my_share",
      "usage": "media",
      "type": "cifs",
      "server": "server.local",
      "share": "media",
      "state": "active",
      "read_only": false
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/mounts/options" method="post">
Set mount manager options

**负载：**

| key                  | type           | optional | description                                  |
| -------------------- | -------------- | -------- | -------------------------------------------- |
| default\_backup\_mount | string or null | True     | Name of a backup mount or `null` for /backup |

**你至少需要在负载中提供一个键。**

</ApiEndpoint>

<ApiEndpoint path="/mounts" method="post">
Add a new mount in Supervisor and mount it

**负载：**

Accepts a [Mount](/developers/api/supervisor/models.md#mount)

Value in `name` must be unique and can only consist of letters, numbers and underscores.

**示例负载：**

```json
{
  "name": "my_share",
  "usage": "media",
  "type": "cifs",
  "server": "server.local",
  "share": "media",
  "username": "admin",
  "password": "password",
  "read_only": false
}
```

</ApiEndpoint>

<ApiEndpoint path="/mounts/<name>" method="put">
Update an existing mount in Supervisor and remount it

**负载：**

Accepts a [Mount](/developers/api/supervisor/models.md#mount).

The `name` field should be omitted. If included the value must match the existing
name, it cannot be changed. Delete and re-add the mount to change the name.

**示例负载：**

```json
{
  "usage": "media",
  "type": "nfs",
  "server": "server.local",
  "path": "/media/camera",
  "read_only": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/mounts/<name>" method="delete">
Unmount and delete an existing mount from Supervisor.

</ApiEndpoint>

<ApiEndpoint path="/mounts/<name>/reload" method="post">
Unmount and remount an existing mount in Supervisor using the same configuration.

</ApiEndpoint>

### 组播

<ApiEndpoint path="/multicast/info" method="get">
Returns information about the multicast plugin

**返回数据：**

| key              | type       | description                       |
| ---------------- | ---------- | --------------------------------- |
| version          | string     | The installed multicast version   |
| version\_latest   | string     | The latest published version      |
| update\_available | boolean    | `true` if an update is available  |

**示例响应：**

```json
{
  "version": "1",
  "version_latest": "2",
  "update_available": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs" method="get">

Get logs for the multicast plugin via the Systemd journal backend.

The endpoint accepts the same headers and provides the same functionality as
`/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs/follow" method="get">

Identical to `/multicast/logs` except it continuously returns new log entries.

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs/latest" method="get">

Return all logs of the latest startup of the multicast plugin container.

The `Range` header is ignored but the `lines` query parameter can be used.

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs/boots/<bootid>" method="get">

Get logs for the multicast plugin related to a specific boot.

The `bootid` parameter is interpreted in the same way as in
`/host/logs/boots/<bootid>` and the endpoint otherwise provides the same
functionality as `/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs/boots/<bootid>/follow" method="get">

Identical to `/multicast/logs/boots/<bootid>` except it continuously returns
new log entries.

</ApiEndpoint>

<ApiEndpoint path="/multicast/restart" method="post">
Restart the multicast plugin.
</ApiEndpoint>

<ApiEndpoint path="/multicast/stats" method="get">

Returns a [Stats model](/developers/api/supervisor/models.md#stats) for the multicast plugin.

**示例响应：**

```json
{
  "cpu_percent": 14.0,
  "memory_usage": 288888,
  "memory_limit": 322222,
  "memory_percent": 32.4,
  "network_tx": 110,
  "network_rx": 902,
  "blk_read": 12,
  "blk_write": 27
}
```

</ApiEndpoint>

<ApiEndpoint path="/multicast/update" method="post">
Update the multicast plugin

**负载：**

| key     | type   | description                                                    |
| ------- | ------ | -------------------------------------------------------------- |
| version | string | The version you want to install, default is the latest version |

</ApiEndpoint>

### 网络

<ApiEndpoint path="/network/info" method="get">
Get network information.

**返回数据：**

| key        | description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| interfaces | A list of [Network interface models](/developers/api/supervisor/models.md#network-interface) |
| docker     | Information about the internal docker network |
| host\_internet | Boolean to indicate if the host can reach the internet. |
| supervisor\_internet | Boolean to indicate if the Supervisor can reach the internet. |

**示例响应：**

```json
{
  "interfaces": [
    {
      "interface": "eth0",
      "type": "ethernet",
      "primary": true,
      "enabled": true,
      "connected": true,
      "ipv4": {
        "method": "static",
        "ip_address": "192.168.1.100/24",
        "gateway": "192.168.1.1",
        "nameservers": ["192.168.1.1"],
      },
      "ipv6": null,
      "wifi": null,
      "vlan": null,
    }
  ],
  "docker": {
    "interface": "hassio",
    "address": "172.30.32.0/23",
    "gateway": "172.30.32.1",
    "dns": "172.30.32.3"
  },
  "host_internet": true,
  "supervisor_internet": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/network/interface/<interface>/info" method="get">

Returns a [Network interface model](/developers/api/supervisor/models.md#network-interface) for a specific network interface.

</ApiEndpoint>

<ApiEndpoint path="/network/reload" method="post">

Update all Network interface data.

</ApiEndpoint>

<ApiEndpoint path="/network/interface/<interface>/update" method="post">
Update the settings for a network interface.

**负载：**

| key     | type   | optional | description                                                            |
| ------- | ------ | -------- | ---------------------------------------------------------------------- |
| enabled | bool   | True     | Enable/Disable an ethernet interface / VLAN got removed with disabled  |
| ipv6    | dict   | True     | A struct with ipv6 interface settings                                  |
| ipv4    | dict   | True     | A struct with ipv4 interface settings                                  |
| wifi    | dict   | True     | A struct with Wireless connection settings                             |

**ipv6:**

| key           | type   | optional | description                                                                                         |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| method        | string | True     | Set IP configuration method can be `auto` for DHCP or Router Advertisements, `static` or `disabled` |
| addr\_gen\_mode | string | True     | Address generation mode can be `eui64`, `stable-privacy`, `default-or-eui64` or `default`           |
| ip6\_privacy   | string | True     | Privacy extensions options are `disabled`, `enabled-prefer-public`, `enabled` or `default`          |
| address       | list   | True     | The new IP address for the interface in the ::/XX format as list                                    |
| nameservers   | list   | True     | List of DNS servers to use                                                                          |
| gateway       | string | True     | The gateway the interface should use                                                                |
| route\_metric  | int    | True     | Route metric. Lower value has higher priority. The kernel accepts zero (0) but coerces it to 1024 (user default) |

**ipv4:**

| key          | type   | optional | description                                                                           |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------- |
| method       | string | True     | Set IP configuration method can be `auto` for DHCP, `static` or `disabled`            |
| address      | list   | True     | The new IP address for the interface in the X.X.X.X/XX format as list                 |
| nameservers  | list   | True     | List of DNS servers to use                                                            |
| gateway      | string | True     | The gateway the interface should use                                                  |
| route\_metric | int    | True     | Route metric. Lower value has higher priority                                         |

**wifi:**

| key    | type   | optional | description                                                                    |
| ------ | ------ | -------- | ------------------------------------------------------------------------------ |
| mode   | string | True     | Set the mode `infrastructure` (default), `mesh`, `adhoc` or `ap`               |
| auth   | string | True     | Set the auth mode: `open` (default), `web`, `wpa-psk`                          |
| ssid   | string | True     | Set the SSID for connect into                                                  |
| psk    | string | True     | The shared key which is used with `web` or `wpa-psk`                           |

</ApiEndpoint>

<ApiEndpoint path="/network/interface/<interface>/accesspoints" method="get">

Return a list of available [Access Points](/developers/api/supervisor/models.md#access-points) on this Wireless interface.

**This function only works with Wireless interfaces!**

**返回数据：**

| key          | description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| accesspoints | A list of [Access Points](/developers/api/supervisor/models.md#access-points)      |

**示例响应：**

```json
{
  "accesspoints": [
    {
      "mode": "infrastructure",
      "ssid": "MY_TestWifi",
      "mac": "00:00:00:00",
      "frequency": 24675,
      "signal": 90
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/network/interface/<interface>/vlan/<id>" method="post">

Create a new VLAN *id* on this network interface.

**This function only works with ethernet interfaces!**

**负载：**

| key     | type   | optional | description                                                            |
| ------- | ------ | -------- | ---------------------------------------------------------------------- |
| ipv6    | dict   | True     | A struct with ipv6 interface settings                                  |
| ipv4    | dict   | True     | A struct with ipv4 interface settings                                  |

</ApiEndpoint>

### Observer

<ApiEndpoint path="/observer/info" method="get">

Returns information about the observer plugin

**返回数据：**

| key              | type       | description                      |
| ---------------- | ---------- | -------------------------------- |
| host             | string     | The IP address of the plugin     |
| version          | string     | The installed observer version   |
| version\_latest   | string     | The latest published version     |
| update\_available | boolean    | `true` if an update is available |

**示例响应：**

```json
{
  "host": "172.0.0.17",
  "version": "1",
  "version_latest": "2",
  "update_available": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/observer/stats" method="get">

Returns a [Stats model](/developers/api/supervisor/models.md#stats) for the observer plugin.

**示例响应：**

```json
{
  "cpu_percent": 14.0,
  "memory_usage": 288888,
  "memory_limit": 322222,
  "memory_percent": 32.4,
  "network_tx": 110,
  "network_rx": 902,
  "blk_read": 12,
  "blk_write": 27
}
```

</ApiEndpoint>

<ApiEndpoint path="/observer/update" method="post">

Update the observer plugin

**负载：**

| key     | type   | description                                                    |
| ------- | ------ | -------------------------------------------------------------- |
| version | string | The version you want to install, default is the latest version |

</ApiEndpoint>

### OS

<ApiEndpoint path="/os/config/sync" method="post">

Load host configurations from a USB stick.

</ApiEndpoint>

<ApiEndpoint path="/os/info" method="get">

Returns information about the OS.

**返回数据：**

| key              | type    | description                                                                  |
| ---------------- | ------- | ---------------------------------------------------------------------------- |
| version          | string  | The current version of the OS                                                |
| version\_latest   | string  | The latest published version of the OS in the active channel                 |
| update\_available | boolean | `true` if an update is available                                             |
| board            | string  | The name of the board                                                        |
| boot             | string  | Which slot that are in use                                                   |
| data\_disk        | string  | Device which is used for holding OS data persistent                          |
| boot\_slots       | dict    | Dictionary of [boot slots](/developers/api/supervisor/models.md#boot-slot) keyed by name |

**示例响应：**

```json
{
  "version": "4.3",
  "version_latest": "5.0",
  "update_available": true,
  "board": "ova",
  "boot": "slot1",
  "data_disk": "BJTD4R-0x123456789",
  "boot_slots": {
    "A": {
      "state": "inactive",
      "status": "good",
      "version": "10.1"
    },
    "B": {
      "state": "active",
      "status": "good",
      "version": "10.2"
    }
  }
}
```

</ApiEndpoint>

<ApiEndpoint path="/os/update" method="post">

Update Home Assistant OS

**负载：**

| key     | type   | description                                                    |
| ------- | ------ | -------------------------------------------------------------- |
| version | string | The version you want to install, default is the latest version |

</ApiEndpoint>

<ApiEndpoint path="/os/boot-slot" method="post">

Change the active boot slot, **This will also reboot the device!**

**负载：**

| key       | type   | description                                                              |
| --------- | ------ | ------------------------------------------------------------------------ |
| boot\_slot | string | Boot slot to change to. See options in `boot_slots` from `/os/info` API. |

</ApiEndpoint>

<ApiEndpoint path="/os/config/swap" method="get">

Get current HAOS swap configuration. Unavailable on Supervised.

**返回数据：**

| key        | type   | description                      |
|------------|--------|----------------------------------|
| swap\_size  | string | Current swap size.               |
| swappiness | int    | Current kernel swappiness value. |

**示例响应：**

```json
{
  "swap_size": "2G",
  "swappiness": 1
}
```

</ApiEndpoint>

<ApiEndpoint path="/os/config/swap" method="post">

Set HAOS swap configuration. Unavailable on Supervised.

**负载：**

| key        | type   | description                                                                                |
|------------|--------|--------------------------------------------------------------------------------------------|
| swap\_size  | string | New swap siz as number with optional units (K/M/G). Anything lower than 40K disables swap. |
| swappiness | int    | New swappiness value (0-100).                                                              | </ApiEndpoint>

<ApiEndpoint path="/os/datadisk/list" method="get">

Returns possible targets for the new data partition.

**返回数据：**

| key              | type    | description                                                                         |
| ---------------- | ------- | ----------------------------------------------------------------------------------- |
| devices          | list    | List of IDs of possible data disk targets                                           |
| disks            | list    | List of [disks](/developers/api/supervisor/models.md#disk) which are possible data disk targets |

**示例响应：**

```json
{
  "devices": [
    "Generic-Flash-Disk-123ABC456",
    "SSK-SSK-Storage-ABC123DEF"
  ],
  "disks": [
    {
      "name": "Generic Flash Disk (123ABC456)",
      "vendor": "Generic",
      "model": "Flash Disk",
      "serial": "123ABC456",
      "size": 8054112256,
      "id": "Generic-Flash-Disk-123ABC456",
      "dev_path": "/dev/sda"
    },
    {
      "name": "SSK SSK Storage (ABC123DEF)",
      "vendor": "SSK",
      "model": "SSK Storage",
      "serial": "ABC123DEF",
      "size": 250059350016,
      "id": "SSK-SSK-Storage-ABC123DEF",
      "dev_path": "/dev/sdb"
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/os/datadisk/move" method="post">

Move datadisk to a new location, **This will also reboot the device!**

**负载：**

| key     | type   | description                                                                     |
| ------- | ------ | ------------------------------------------------------------------------------- |
| device  | string | ID of the disk device which should be used as the target for the data migration |

</ApiEndpoint>

<ApiEndpoint path="/os/datadisk/wipe" method="post">

Wipe the datadisk including all user data and settings, **This will also reboot the device!** This API requires an admin token

This API will wipe all config/settings for addons, Home Assistant and the Operating
System and any locally stored data in config, backups, media, etc. The machine will
reboot during this.

After the reboot completes the latest stable version of Home Assistant and Supervisor
will be downloaded. Once the process is complete the user will see onboarding, like
during initial setup.

This wipe also includes network settings. So after the reboot the user may need to
reconfigure those in order to access Home Assistant again.

The operating system version as well as its boot configuration will be preserved.

</ApiEndpoint>

<ApiEndpoint path="/os/boards/{board}" method="get">

Returns information about your board if it has features or settings
that can be modified from Home Assistant. The value for `board`
is the value in the `board` field returned by `/os/info`.

Boards with such options are documented below.

</ApiEndpoint>

<ApiEndpoint path="/os/boards/yellow" method="get">

If running on a yellow board, returns current values for its settings.

**返回数据：**

| key           | type    | description                  |
| ------------- | ------- | ---------------------------- |
| disk\_led      | boolean | Is the disk LED enabled      |
| heartbeat\_led | boolean | Is the heartbeat LED enabled |
| power\_led     | boolean | Is the power LED enabled     |

**示例响应：**

```json
{
  "disk_led": true,
  "heartbeat_led": true,
  "power_led": false
}
```

</ApiEndpoint>

<ApiEndpoint path="/os/boards/yellow" method="post">

If running on a yellow board, changes one or more of its settings.

**负载：**

| key           | type    | description                      |
| ------------- | ------- | ---------------------------------|
| disk\_led      | boolean | Enable/disable the disk LED      |
| heartbeat\_led | boolean | Enable/disable the heartbeat LED |
| power\_led     | boolean | Enable/disable the power LED     |

</ApiEndpoint>

<ApiEndpoint path="/os/boards/green" method="get">

If running on a green board, returns current values for its settings.

**返回数据：**

| key               | type    | description                             |
| ----------------- | ------- | --------------------------------------- |
| activity\_led      | boolean | Is the green activity LED enabled       |
| power\_led         | boolean | Is the white power LED enabled          |
| system\_health\_led | boolean | Is the yellow system health LED enabled |

**示例响应：**

```json
{
  "activity_led": true,
  "power_led": true,
  "system_health_led": false
}
```

</ApiEndpoint>

<ApiEndpoint path="/os/boards/green" method="post">

If running on a green board, changes one or more of its settings.

**负载：**

| key               | type    | description                                 |
| ----------------- | ------- | ------------------------------------------- |
| activity\_led      | boolean | Enable/disable the green activity LED       |
| power\_led         | boolean | Enable/disable the white power LED          |
| system\_health\_led | boolean | Enable/disable the yellow system health LED |

</ApiEndpoint>

### 解析中心

<ApiEndpoint path="/resolution/info" method="get">

**返回数据：**

| key      | type       | description                                      |
| -------- | ---------- | ------------------------------------------------ |
| unsupported | list | A list of reasons why an installation is marked as unsupported (container, dbus, docker\_configuration, docker\_version, lxc, network\_manager, os, privileged, systemd) |
| unhealthy | list | A list of reasons why an installation is marked as unhealthy (docker, supervisor, privileged, setup) |
| issues | list | A list of [Issue models](/developers/api/supervisor/models.md#issues) |
| suggestions | list | A list of [Suggestion models](/developers/api/supervisor/models.md#suggestion) actions |
| checks | list | A list of [Check models](/developers/api/supervisor/models.md#check) |

**示例响应：**

```json
{
  "unsupported": ["os"],
  "unhealthy": ["docker"],
  "issues": [
    {
      "uuid": "A89924620F9A11EBBDC3C403FC2CA371",
      "type": "free_space",
      "context": "system",
      "reference": null
     }
  ],
  "suggestions": [
    {
      "uuid": "B9923620C9A11EBBDC3C403FC2CA371",
      "type": "clear_backups",
      "context": "system",
      "reference": null,
      "auto": false
    }
  ],
  "checks": [
    {
      "slug": "free_space",
      "enabled": true
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/resolution/suggestion/<suggestion>" method="post">

Apply a suggested action

</ApiEndpoint>

<ApiEndpoint path="/resolution/suggestion/<suggestion>" method="delete">

Dismiss a suggested action

</ApiEndpoint>

<ApiEndpoint path="/resolution/issue/<issue>/suggestions" method="get">

Get suggestions that would fix an issue if applied.

**返回数据：**

| key         | type       | description                                                                |
| ----------- | ---------- | -------------------------------------------------------------------------- |
| suggestions | list       | A list of [Suggestion models](/developers/api/supervisor/models.md#suggestion) actions |

**示例响应：**

```json
{
  "suggestions": [
    {
      "uuid": "B9923620C9A11EBBDC3C403FC2CA371",
      "type": "clear_backups",
      "context": "system",
      "reference": null,
      "auto": false
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/resolution/issue/<issue>" method="delete">

Dismiss an issue

</ApiEndpoint>

<ApiEndpoint path="/resolution/healthcheck" method="post">

Execute a healthcheck and autofix & notification.

</ApiEndpoint>

<ApiEndpoint path="/resolution/check/<check>/options" method="post">

Set options for this check.

**负载：**

| key     | type   | description                                                    |
| ------- | ------ | -------------------------------------------------------------- |
| enabled | bool   | If the check should be enabled or disabled                     |

</ApiEndpoint>

<ApiEndpoint path="/resolution/check/<check>/run" method="post">

Execute a specific check right now.

</ApiEndpoint>

### 服务

<ApiEndpoint path="/services" method="get">

**返回数据：**

| key      | type       | description                                      |
| -------- | ---------- | ------------------------------------------------ |
| services | dictionary | dictionary of [Service models](/developers/api/supervisor/models.md#service) |

**示例响应：**

```json
{
  "services": [
    {
      "slug": "name",
      "available": true,
      "providers": ["awesome_addon"]
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/services/mqtt" method="get">

**返回数据：**

| key      | type    | description                             |
| -------- | ------- | --------------------------------------- |
| addon    | string  | The app slug                         |
| host     | string  | The IP of the addon running the service |
| port     | string  | The port the service is running on      |
| ssl      | boolean | `true` if SSL is in use                 |
| username | string  | The username for the service            |
| password | string  | The password for the service            |
| protocol | string  | The MQTT protocol                       |

**示例响应：**

```json
{
  "addon": "awesome_mqtt",
  "host": "172.0.0.17",
  "port": "8883",
  "ssl": true,
  "username": "awesome_user",
  "password": "strong_password",
  "protocol": "3.1.1"
}
```

</ApiEndpoint>

<ApiEndpoint path="/services/mqtt" method="post">

Create a service definition

**负载：**

| key      | type    | description                             |
| -------- | ------- | --------------------------------------- |
| host     | string  | The IP of the addon running the service |
| port     | string  | The port the service is running on      |
| ssl      | boolean | `true` if SSL is in use                 |
| username | string  | The username for the service            |
| password | string  | The password for the service            |
| protocol | string  | The MQTT protocol                       |

</ApiEndpoint>

<ApiEndpoint path="/services/mqtt" method="delete">

Deletes the service definitions

</ApiEndpoint>

<ApiEndpoint path="/services/mysql" method="get">

**返回数据：**

| key      | type    | description                             |
| -------- | ------- | --------------------------------------- |
| addon    | string  | The app slug                         |
| host     | string  | The IP of the addon running the service |
| port     | string  | The port the service is running on      |
| ssl      | boolean | `true` if SSL is in use                 |
| username | string  | The username for the service            |
| password | string  | The password for the service            |
| protocol | string  | The MQTT protocol                       |

**示例响应：**

```json
{
  "addon": "awesome_mysql",
  "host": "172.0.0.17",
  "port": "8883",
  "username": "awesome_user",
  "password": "strong_password"
}
```

</ApiEndpoint>

<ApiEndpoint path="/services/mysql" method="post">

Create a service definition

**负载：**

| key      | type   | description                             |
| -------- | ------ | --------------------------------------- |
| host     | string | The IP of the addon running the service |
| port     | string | The port the service is running on      |
| username | string | The username for the service            |
| password | string | The password for the service            |

</ApiEndpoint>

<ApiEndpoint path="/services/mysql" method="delete">

Deletes the service definitions

</ApiEndpoint>

### 商店

<ApiEndpoint path="/store" method="get">

Returns app store information.

**示例响应：**

```json
{ "addons":
  [
    {
      "name": "Awesome app",
      "slug": "7kshd7_awesome",
      "description": "Awesome description",
      "repository": "https://example.com/addons",
      "version": "1.0.0",
      "installed": "1.0.0",
      "icon": false,
      "logo": true,
      "state": "started"
    }
  ],
  "repositories": [
    {
      "slug": "awesom_repository",
      "name": "Awesome Repository",
      "source": "https://example.com/addons",
      "url": "https://example.com/addons",
      "maintainer": "Awesome Maintainer"
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/store/addons" method="get">

Returns a list of store apps

**示例响应：**

```json
[
  {
    "name": "Awesome app",
    "slug": "7kshd7_awesome",
    "description": "Awesome description",
    "repository": "https://example.com/addons",
    "version": "1.0.0",
    "installed": "1.0.0",
    "icon": false,
    "logo": true,
    "state": "started"
  }
]
```

</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>" method="get">

Returns information about a store app

**示例响应：**

```json
{
  "advanced": false,
  "apparmor": "default",
  "arch": ["armhf", "aarch64", "i386", "amd64"],
  "auth_api": true,
  "available": true,
  "build": false,
  "description": "Awesome description",
  "detached": false,
  "docker_api": false,
  "documentation": true,
  "full_access": true,
  "hassio_api": false,
  "hassio_role": "manager",
  "homeassistant_api": true,
  "homeassistant": "2021.2.0b0",
  "host_network": false,
  "host_pid": false,
  "icon": false,
  "ingress": true,
  "installed": false,
  "logo": true,
  "long_description": "lorem ipsum",
  "name": "Awesome app",
  "rating": 5,
  "repository": "core",
  "signed": false,
  "slug": "7kshd7_awesome",
  "stage": "stable",
  "update_available": false,
  "url": "https://example.com/addons/tree/main/awesome_addon",
  "version_latest": "1.0.0",
  "version": "1.0.0"
}
```

</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/install" method="post">

Install an app from the store.

**负载：**

| key        | type    | description                                                                                         |
| ---------- | ------- | --------------------------------------------------------------------------------------------------- |
| background | boolean | Return `job_id` immediately, do not wait for install to complete. Clients must check job for status |

</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/update" method="post">

Update an app from the store.

**负载：**

| key        | type    | description                                                                                        |
| ---------- | ------- | -------------------------------------------------------------------------------------------------- |
| backup     | boolean | Create a partial backup of the app, default is false                                            |
| background | boolean | Return `job_id` immediately, do not wait for update to complete. Clients must check job for status |

</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/changelog" method="get">
Get the changelog for an app.
</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/documentation" method="get">
Get the documentation for an app.
</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/icon" method="get">
Get the app icon
</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/logo" method="get">
Get the app logo
</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/availability" method="get">

Returns 200 success status if the latest version of the app is able to be
installed on the current system. Returns a 400 error status if it is not with a
message explaining why.

</ApiEndpoint>

<ApiEndpoint path="/store/reload" method="post">

Reloads the information stored about apps.

</ApiEndpoint>

<ApiEndpoint path="/store/repositories" method="get">

Returns a list of store repositories

**示例响应：**

```json
[
  {
    "slug": "awesom_repository",
    "name": "Awesome Repository",
    "source": "https://example.com/addons",
    "url": "https://example.com/addons",
    "maintainer": "Awesome Maintainer"
  }
]
```

</ApiEndpoint>

<ApiEndpoint path="/store/repositories" method="post">

Add an addon repository to the store

**负载：**

| key        | type   | description                                      |
| ---------- | ------ | ------------------------------------------------ |
| repository | string | URL of the addon repository to add to the store. |

**示例负载：**

```json
{
  "repository": "https://example.com/addons"
}
```

</ApiEndpoint>

<ApiEndpoint path="/store/repositories/<repository>" method="get">

Returns information about a store repository

**示例响应：**

```json
{
  "slug": "awesom_repository",
  "name": "Awesome Repository",
  "source": "https://example.com/addons",
  "url": "https://example.com/addons",
  "maintainer": "Awesome Maintainer"
}
```

</ApiEndpoint>

<ApiEndpoint path="/store/repositories/<repository>" method="delete">

Remove an unused addon repository from the store.

</ApiEndpoint>

<ApiEndpoint path="/store/repositories/<repository>/repair" method="post">

Repair/reset an addon repository in the store that is missing or showing incorrect information.

</ApiEndpoint>

### 安全

<ApiEndpoint path="/security/info" method="get">

Returns information about the security features

**返回数据：**

| key                 | type         | description                                                   |
| ------------------- | ------------ | ------------------------------------------------------------- |
| pwned               | bool         | If pwned check is enabled or disabled on the backend          |
| force\_security      | bool         | If force-security is enabled or disabled on the backend       |

**示例响应：**

```json
{
  "pwned": true,
  "force_security": false,
}
```

</ApiEndpoint>

<ApiEndpoint path="/security/options" method="post">

**负载：**

| key                 | type   | description                                            |
| ------------------- | ------ | ------------------------------------------------------ |
| pwned               | bool   | Disable/Enable pwned                                   |
| force\_security      | bool   | Disable/Enable force-security                          |

</ApiEndpoint>

### Supervisor

<ApiEndpoint path="/supervisor/info" method="get">

Returns information about the supervisor

**返回数据：**

| key                 | type         | description                                                   |
| ------------------- | ------------ | ------------------------------------------------------------- |
| version             | string       | The installed supervisor version                              |
| version\_latest      | string       | The latest published version in the active channel            |
| update\_available    | boolean      | `true` if an update is available                              |
| arch                | string       | The architecture of the host (armhf, aarch64, i386, amd64)    |
| channel             | string       | The active channel (stable, beta, dev)                        |
| timezone            | string       | The current timezone                                          |
| healthy             | bool         | The supervisor is in a healthy state                          |
| supported           | bool         | The environment is supported                                  |
| logging             | string       | The current log level (debug, info, warning, error, critical) |
| ip\_address          | string       | The internal docker IP address to the supervisor              |
| wait\_boot           | int          | Max time to wait during boot                                  |
| debug               | bool         | Debug is active                                               |
| debug\_block         | bool         | `true` if debug block is enabled                              |
| diagnostics         | bool or null | Sending diagnostics is enabled                                |
| addons\_repositories | list         | A list of app repository URL's as strings                  |
| auto\_update         | bool         | Is auto update enabled for supervisor                         |
| detect\_blocking\_io  | bool         | Supervisor raises exceptions for blocking I/O in event loop   |

**示例响应：**

```json
{
  "version": "246",
  "version_latest": "version_latest",
  "update_available": true,
  "arch": "amd64",
  "channel": "dev",
  "timezone": "TIMEZONE",
  "healthy": true,
  "supported": false,
  "logging": "debug",
  "ip_address": "172.0.0.2",
  "wait_boot": 800,
  "debug": false,
  "debug_block": false,
  "diagnostics": null,
  "addons_repositories": ["https://example.com/addons"],
  "auto_update": true,
  "detect_blocking_io": false
}
```

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs" method="get">

Get logs for the Supervisor container via the Systemd journal backend. If the
Systemd journal gateway fails to provide the logs, raw Docker container logs are
returned as the fallback.

The endpoint accepts the same headers and provides the same functionality as
`/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs/follow" method="get">

Identical to `/supervisor/logs` except it continuously returns new log entries.

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs/latest" method="get">

Return all logs of the latest startup of the Supervisor container.

The `Range` header is ignored but the `lines` query parameter can be used.

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs/boots/<bootid>" method="get">

Get logs for the Supervisor container related to a specific boot.

The `bootid` parameter is interpreted in the same way as in
`/host/logs/boots/<bootid>` and the endpoint otherwise provides the same
functionality as `/host/logs`.

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs/boots/<bootid>/follow" method="get">

Identical to `/supervisor/logs/boots/<bootid>` except it continuously returns
new log entries.

</ApiEndpoint>

<ApiEndpoint path="/supervisor/options" method="post">

Update options for the supervisor, you need to supply at least one of the payload keys to the API call.
You need to call `/supervisor/reload` after updating the options.

**负载：**

| key                 | type   | description                                            |
| ------------------- | ------ | ------------------------------------------------------ |
| channel             | string | Set the active channel (stable, beta, dev)             |
| timezone            | string | Set the timezone                                       |
| wait\_boot           | int    | Set the time to wait for boot                          |
| debug               | bool   | Enable debug                                           |
| debug\_block         | bool   | Enable debug block                                     |
| logging             | string | Set logging level                                      |
| addons\_repositories | list   | Set a list of URL's as strings for app repositories |
| auto\_update         | bool   | Enable/disable auto update for supervisor              |
| detect\_blocking\_io  | string | Enable blocking I/O in event loop detection. Valid values are `on`, `off` and `on_at_startup`. |

</ApiEndpoint>

<ApiEndpoint path="/supervisor/ping" method="get" unprotected>

Ping the supervisor to check if it can return a response.

</ApiEndpoint>

<ApiEndpoint path="/supervisor/reload" method="post">

Reload parts of the supervisor, this enable new options, and check for updates.

</ApiEndpoint>

<ApiEndpoint path="/supervisor/restart" method="post">

Restart the supervisor, can help to get the supervisor healthy again.

</ApiEndpoint>

<ApiEndpoint path="/supervisor/repair" method="post">

Repair docker overlay issues, and lost images.

</ApiEndpoint>

<ApiEndpoint path="/supervisor/stats" method="get">

Returns a [Stats model](/developers/api/supervisor/models.md#stats) for the supervisor.

**示例响应：**

```json
{
  "cpu_percent": 14.0,
  "memory_usage": 288888,
  "memory_limit": 322222,
  "memory_percent": 32.4,
  "network_tx": 110,
  "network_rx": 902,
  "blk_read": 12,
  "blk_write": 27
}
```

</ApiEndpoint>

<ApiEndpoint path="/supervisor/update" method="post">

Update the supervisor

**负载：**

| key     | type   | description                                                    |
| ------- | ------ | -------------------------------------------------------------- |
| version | string | The version to install. Defaults to the latest version. Development only: Only works in the Supervisor development environment. |

</ApiEndpoint>

### 占位符

Some of the endpoints uses placeholders indicated with `<...>` in the endpoint URL.

| placeholder | description                                                                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| addon       | The slug for the addon, to get the slug you can call `/addons`, to call endpoints for the app calling the endpoints you can use `self`as the slug. |
| application | The name of an application, call `/audio/info` to get the correct name                                                                                |
| backup      | A valid backup slug, example `skuwe823`, to get the slug you can call `/backups`                                                                      |
| bootid      | An id or offset of a particular boot, used to filter logs. Call `/host/logs/boots` to get a list of boot ids or see `/host/logs/boots/<bootid>` to understand boot offsets |
| check       | The slug of a system check in Supervisor's resolution manager. Call `/resolution/info` for a list of options from the `checks` field                  |
| disk        | Identifier of a disk attached to host or `default`. See `/host/disks/<disk>/usage` for more details                                                   |
| id          | Numeric id of a vlan on a particular interface. See `/network/interface/<interface>/vlan/<id>` for details                                            |\
| identifier  | A syslog identifier used to filter logs. Call `/host/logs/identifiers` to get a list of options. See `/host/logs/identifiers/<identifier>` for some common examples |
| interface   | A valid interface name, example `eth0`, to get the interface name you can call `/network/info`. You can use `default` to get the primary interface    |
| issue       | The UUID of an issue with the system identified by Supervisor. Call `/resolution/info` for a list of options from the `issues` field                  |
| job\_id      | The UUID of a currently running or completed Supervisor job                                                                                           |
| name        | Name of a mount added to Supervisor. Call `/mounts` to get a list of options from `mounts` field                                                      |
| registry    | A registry hostname defined in the container registry configuration, to get the hostname you can call `/docker/registries`                            |
| repository  | The slug of an addon repository added to Supervisor. Call `/store` for a list of options from the `repositories` field                                |
| service     | The service name for a service on the host.                                                                                                           |
| suggestion  | The UUID of a suggestion for a system issue identified by Supervisor. Call `/resolution/info` for a list of options from the `suggestions` field      |
| uuid        | The UUID of a discovery service, to get the UUID you can call `/discovery`                                                                            |
