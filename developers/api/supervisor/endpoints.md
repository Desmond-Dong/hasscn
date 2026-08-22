import ApiEndpoint from '@site/static/js/api\_endpoint.jsx'

对于标记有 :lock: 的 API endpoints，你需要使用带有 `Bearer` token 的 authorization header。

该 token 对 apps（原称 add-ons）和 Home Assistant 可通过
`SUPERVISOR_TOKEN` 环境变量获取。

要查看每个 endpoint 的更多细节，点击展开即可。

### 应用

<ApiEndpoint path="/addons" method="get">
返回已安装 app 的概述信息。

**Payload:**

| key | type | description |
|-----|------|-------------|
| addons | list | [Addon models](api/supervisor/models.md#app-formerly-known-as-an-add-on) 列表 |

**Example response:**

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
重新加载关于 app 的存储信息。
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/changelog" method="get">
获取 app 的 changelog。
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/documentation" method="get">
获取 app 的 documentation。
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs" method="get">

通过 Systemd journal 后端获取 app 的 logs。

该 endpoint 接受与 `/host/logs` 相同的 headers 并提供相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs/follow" method="get">

与 `/addons/<addon>/logs` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs/latest" method="get">

返回该 app 容器最近一次启动的所有 logs。

`Range` header 被忽略，但可以使用 `lines` query 参数。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs/boots/<bootid>" method="get">

获取与特定 boot 相关的 app logs。

`bootid` 参数的解释方式与 `/host/logs/boots/<bootid>` 中相同，该 endpoint 否则提供与 `/host/logs` 相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logs/boots/<bootid>/follow" method="get">

与 `/addons/<addon>/logs/boots/<bootid>` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/icon" method="get">
获取 app icon
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/info" method="get">
获取关于 app 的详细信息

**Returned data:**

| key | type | description |
|-----|------|-------------|
| advanced | boolean | 已弃用且被忽略；自 Supervisor 2026.03.0 起始终为 `false` |
| apparmor | string | disabled、default 或 profile 名称 |
| arch | list | app 支持的架构列表 |
| audio | boolean | 已启用 audio 时为 `true` |
| audio\_input | float or null | 设备索引 |
| audio\_output | float or null | 设备索引 |
| auth\_api | boolean | 已授予 auth api 访问权限时为 `true` |
| auto\_uart | boolean | 已授予 auto\_uart 访问权限时为 `true` |
| auto\_update | boolean | 已启用 auto update 时为 `true` |
| available | boolean | app 可用时为 `true` |
| boot | string | "auto" 或 "manual" |
| boot\_config | string | addon 的默认 boot 模式，或无法自动 boot 时为 "manual\_only" |
| build | boolean | 本地 app 时为 `true` |
| changelog | boolean | changelog 可用时为 `true` |
| description | string | app 描述 |
| detached | boolean | app 以 detached 方式运行时为 `true` |
| devices | list | 附加的设备列表 |
| devicetree | boolean | 已授予 devicetree 访问权限时为 `true` |
| discovery | list | discovery 服务列表 |
| dns | list | app 使用的 DNS server 列表 |
| docker\_api | boolean | 已授予 docker\_api 访问权限时为 `true` |
| documentation | boolean | documentation 可用时为 `true` |
| full\_access | boolean | 已授予完全访问权限时为 `true` |
| gpio | boolean | 已授予 gpio 访问权限时为 `true` |
| hassio\_api | boolean | 已授予 hassio api 访问权限时为 `true` |
| hassio\_role | string | hassio role（default, homeassistant, manager, admin） |
| homeassistant | string or null | 最低的 Home Assistant Core 版本 |
| homeassistant\_api | boolean | 已授予 homeassistant api 访问权限时为 `true` |
| host\_dbus | boolean | 已授予 host dbus 访问权限时为 `true` |
| host\_ipc | boolean | 已授予 host ipc 访问权限时为 `true` |
| host\_network | boolean | 已授予 host network 访问权限时为 `true` |
| host\_pid | boolean | 已授予 host pid 访问权限时为 `true` |
| host\_uts | boolean | 已启用 host UTS 命名空间访问时为 `true`。 |
| hostname | string | app 的 host 名 |
| icon | boolean | icon 可用时为 `true` |
| ingress | boolean | 已启用 ingress 时为 `true` |
| ingress\_entry | string or null | ingress 入口点 |
| ingress\_panel | boolean or null | 已启用 ingress\_panel 时为 `true` |
| ingress\_port | int or null | ingress 端口 |
| ingress\_url | string or null | ingress URL |
| ip\_address | string | app 的 IP 地址 |
| kernel\_modules | boolean | 已授予 kernel module 访问权限时为 `true` |
| logo | boolean | logo 可用时为 `true` |
| long\_description | string | app 的长描述 |
| machine | list | app 支持的 machine 类型列表 |
| name | string | app 名称 |
| network | dictionary or null | app 的网络配置 |
| network\_description | dictionary or null | 网络配置的描述 |
| options | dictionary | app 配置。已脱敏（空字典），除非调用者是 Home Assistant Core、查询自身信息的 app，或具有 `manager` 或 `admin` role 的 app，因为 options 可能包含密码或 API keys 等 secrets |
| privileged | list | app 可访问的硬件/系统 attributes 列表 |
| protected | boolean | 已启用 protection mode 时为 `true` |
| rating | int | addon rating |
| repository | string | 指向 app repository 的 URL |
| schema | dictionary or null | app 配置的 schema |
| services\_role | list | services 及 app 在该 service 中 role 的列表 |
| slug | string | app 的 slug |
| stage | string | app 的 stage（stable, experimental, deprecated） |
| startup | string | app 启动的 stage（initialize, system, services, application, once） |
| state | string or null | app 的 state（started, stopped） |
| stdin | boolean | app 接受 stdin 命令时为 `true` |
| system\_managed | boolean | 指示该 app 是否由 Home Assistant 管理 |
| system\_managed\_config\_entry | string | 如果 app 由 Home Assistant 管理，则提供 configuration entry ID |
| translations | dictionary | 包含 app 翻译文件内容的字典 |
| udev | boolean | 已授予 udev 访问权限时为 `true` |
| update\_available | boolean | 有更新可用时为 `true` |
| url | string or null | 指向该 app 更多信息的 URL |
| usb | list | 附加的 USB 设备列表 |
| version | string | app 已安装的版本 |
| version\_latest | string | app 的最新版本 |
| video | boolean | 已启用 video 时为 `true` |
| watchdog | boolean | 已启用 watchdog 时为 `true` |
| webui | string or null | 指向 app web UI 的 URL |
| signed | boolean | 镜像已签名且受信任时为 True |

**Example response:**

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
安装一个 app

**已弃用！** 请使用 [`/store/addons/<addon>/install`](#store) 代替。

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/logo" method="get">
获取 app logo
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/options" method="post">
设置 app 的 options。

:::tip
要重置自定义的 network/audio/options，将其设为 `null`。
:::

**Payload:**

| key | type | description |
|-----|------|-------------|
| boot | string | (auto, manual) |
| auto\_update | boolean | app 应自动更新时为 `true` |
| network | dictionary | network configuration 的映射。 |
| options | dictionary | app 配置 |
| audio\_output | float or null | 音频输出设备的索引 |
| audio\_input | float or null | 音频输入设备的索引 |
| ingress\_panel | boolean | 已启用 ingress\_panel 时为 `true` |
| watchdog | boolean | 已启用 watchdog 时为 `true` |

**你需要在 payload 中至少提供一个 key。**

**Example payload:**

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
更改 system managed addons 特有的 options。

此 endpoint 只能由 Home Assistant 调用，不能由其他任何客户端调用。

**Payload**

| key | type | description |
|-----|------|-------------|
| system\_managed | boolean | 由 Home Assistant 管理时为 `true` |
| system\_managed\_config\_entry | boolean | 管理 addon 的 config entry ID |

**你需要在 payload 中至少提供一个 key。**

**Example payload:**

```json
{
  "system_managed": true,
  "system_managed_config_entry": "abc123"
}
```

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/options/validate" method="post">
针对当前存储的 app 配置或 payload 运行 configuration 验证。

**Payload:**

可选地提供原始的 app options。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| message | string | 包含错误消息 |
| valid | boolean | 配置是否有效 |
| pwned | boolean | None | True 或 false，指示是否包含被盗 secrets。出错时为 None |

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/options/config" method="get">
获取其自身渲染后 configuration 的 Data endpoint。
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/rebuild" method="post">
重建 app，仅支持 local build apps。

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| force | boolean | True | 即使提供了预构建镜像，也强制重建 app |

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/restart" method="post">
重启一个 app
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/security" method="post">
设置 app 的 protection mode。

此函数不能由自身调用，你不能在此处使用 `self` 作为 slug。

**Payload:**

| key | type | description |
|-----|------|-------------|
| protected | boolean | 已开启 protection mode 时为 `true` |

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/start" method="post">
启动一个 app
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/stats" method="get">

为该 app 返回一个 [Stats model](api/supervisor/models.md#stats)。

**Example response:**

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
向 app 的 stdin 写入数据。

你想传入 addon 的 payload 应作为请求的 body 提供给该 endpoint。 </ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/stop" method="post">
停止一个 app
</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/uninstall" method="post">
卸载一个 app

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| remove\_config | boolean | True | 删除 addon 的 config 文件夹（如果使用了） |

</ApiEndpoint>

<ApiEndpoint path="/addons/<addon>/update" method="post">
更新一个 app

**已弃用！** 请使用 [`/store/addons/<addon>/update`](#store) 代替。

</ApiEndpoint>

### 音频

<ApiEndpoint path="/audio/default/input" method="post">
将一个 profile 设为默认输入 profile

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| name | string | False | profile 的名称 |

</ApiEndpoint>

<ApiEndpoint path="/audio/default/output" method="post">
将一个 profile 设为默认输出 profile

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| name | string | False | profile 的名称 |

</ApiEndpoint>

<ApiEndpoint path="/audio/info" method="get">
返回关于 audio 插件的信息。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| host | string | 插件的 IP 地址 |
| version | string | 已安装的 observer 版本 |
| version\_latest | string | 最新发布的版本 |
| update\_available | boolean | 有更新可用时为 `true` |
| audio | dictionary | 一个 [Audio model](api/supervisor/models.md#audio) |

**Example response:**

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

通过 Systemd journal 后端获取 audio 插件容器的 logs。

该 endpoint 接受与 `/host/logs` 相同的 headers 并提供相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/audio/logs/follow" method="get">

与 `/audio/logs` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/audio/logs/latest" method="get">

返回 audio 插件容器最近一次启动的所有 logs。

`Range` header 被忽略，但可以使用 `lines` query 参数。

</ApiEndpoint>

<ApiEndpoint path="/audio/logs/boots/<bootid>" method="get">

获取与特定 boot 相关的 audio 插件容器 logs。

`bootid` 参数的解释方式与 `/host/logs/boots/<bootid>` 中相同，该 endpoint 否则提供与 `/host/logs` 相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/audio/logs/boots/<bootid>/follow" method="get">

与 `/audio/logs/boots/<bootid>` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/audio/mute/input" method="post">
静音输入设备

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| index | string | False | 设备的索引 |
| active | boolean | False | 已静音时为 `true` |

</ApiEndpoint>

<ApiEndpoint path="/audio/mute/input/<application>" method="post">
对特定 application 静音输入

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| index | string | False | 设备的索引 |
| active | boolean | False | 已静音时为 `true` |

</ApiEndpoint>

<ApiEndpoint path="/audio/mute/output" method="post">
静音输出设备

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| index | string | False | 设备的索引 |
| active | boolean | False | 已静音时为 `true` |

</ApiEndpoint>

<ApiEndpoint path="/audio/mute/output/<application>" method="post">
对特定 application 静音输出

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| index | string | False | 设备的索引 |
| active | boolean | False | 已静音时为 `true` |

</ApiEndpoint>

<ApiEndpoint path="/audio/profile" method="post">
创建一个 audio profile

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| card | string | False | audio 设备的名称 |
| name | string | False | profile 的名称 |

</ApiEndpoint>

<ApiEndpoint path="/audio/reload" method="post">
重新加载 audio 信息
</ApiEndpoint>

<ApiEndpoint path="/audio/restart" method="post">
重启 audio 插件
</ApiEndpoint>

<ApiEndpoint path="/audio/stats" method="get">

为该 audio 插件返回一个 [Stats model](api/supervisor/models.md#stats)。

**Example response:**

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
更新 audio 插件

**Payload:**

| key | type | description |
|-----|------|-------------|
| version | string | 要安装的版本，默认为最新版本 |

</ApiEndpoint>

<ApiEndpoint path="/audio/volume/input" method="post">
设置输入音量

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| index | string | False | 设备的索引 |
| volume | float | False | 音量（介于 `0.0` 和 `1.0` 之间） |

</ApiEndpoint>

<ApiEndpoint path="/audio/volume/input/<application>" method="post">
为特定 application 设置输入音量

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| index | string | False | 设备的索引 |
| volume | float | False | 音量（介于 `0.0` 和 `1.0` 之间） |

</ApiEndpoint>

<ApiEndpoint path="/audio/volume/output" method="post">
设置输出音量

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| index | string | False | 设备的索引 |
| volume | float | False | 音量（介于 `0.0` 和 `1.0` 之间） |

</ApiEndpoint>

<ApiEndpoint path="/audio/volume/output/<application>" method="post">
为特定 application 设置输出音量

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| index | string | False | 设备的索引 |
| volume | float | False | 音量（介于 `0.0` 和 `1.0` 之间） |

</ApiEndpoint>

### 认证

<ApiEndpoint path="/auth" method="get">
你可以使用 Basic Authentication 对 Home Assistant Core 进行认证。
使用 `X-Supervisor-Token` header 提供 Supervisor authentication token。
请参阅对应的 POST 方法以提供 JSON 或 urlencoded 凭据。
</ApiEndpoint>

<ApiEndpoint path="/auth" method="post">
你可以对 Home Assistant Core 进行认证。
你可以以 JSON、urlencoded（使用 `application/x-www-form-urlencoded` header）或使用 basic authentication 的方式 POST 数据。
使用 Basic authentication 时，你可以使用 `X-Supervisor-Token` 作为 Supervisor authentication token。

**Payload:**

| key | type | description |
|-----|------|-------------|
| username | string | 用户的 username |
| password | string | 用户的 password |

</ApiEndpoint>

<ApiEndpoint path="/auth/reset" method="post">
为 Home Assistant Core 用户设置新密码。

**Payload:**

| key | type | description |
|-----|------|-------------|
| username | string | 用户的 username |
| password | string | 用户的新 password |

</ApiEndpoint>

<ApiEndpoint path="/auth/cache" method="delete">

重置内部 authentication cache，如果你在更改用户密码后需要清除内部 cache，这将非常有用。

</ApiEndpoint>

<ApiEndpoint path="/auth/list" method="get">

列出 Home Assistant 中的所有用户，以帮助凭据恢复。需要一个 admin 级别的 authentication token。

**Payload:**

| key | type | description |
|-----|------|-------------|
| users | list | Home Assistant [users](api/supervisor/models.md#user) 列表。 |

</ApiEndpoint>

### 备份

<ApiEndpoint path="/backups" method="get">

返回一个 [Backups](api/supervisor/models.md#backup) 列表

**Example response:**

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

返回关于 backup manager 的信息。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| backups | list | [Backups](api/supervisor/models.md#backup) 列表 |
| days\_until\_stale | int | 距 backup 被视为 stale 的天数 |

**Example response:**

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

创建一个 full backup。

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| name | string | True | 你想赋予 backup 的名称 |
| password | string | True | 你想赋予 backup 的密码 |
| compressed | boolean | True | `false` 以创建未压缩的 backups |
| location | string or null | True | backup mount 名称，或 `null` 表示 /backup |
| homeassistant\_exclude\_database | boolean | True | 从 backup 中排除 Home Assistant 数据库文件 |
| background | boolean | True | 立即返回 `job_id`，不等待 backup 完成。客户端必须检查 job 以获取 status 和 slug。 |

**Example response:**

```json
{
  "slug": "skuwe823"
}
```

</ApiEndpoint>

<ApiEndpoint path="/backups/new/upload" method="post">

上传一个 backup。

**Example response:**

```json
{
  "slug": "skuwe823",
  "job_id": "abc123"
}
```

:::note

如果单独的消息无法准确描述发生了什么，此 API 的错误响应也可能包含 `job_id`。
调用者应引导用户查看 job 或 supervisor logs，以了解发生了什么。

:::

</ApiEndpoint>

<ApiEndpoint path="/backups/new/partial" method="post">

创建一个 partial backup。

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| name | string | True | 你想赋予 backup 的名称 |
| password | string | True | 你想赋予 backup 的密码 |
| homeassistant | boolean | True | 将 home assistant core 设置添加到 backup 中 |
| addons | list | True | 表示 app slugs 的字符串列表 |
| folders | list | True | 表示目录的字符串列表 |
| compressed | boolean | True | `false` 以创建未压缩的 backups |
| location | string or null | True | backup mount 名称，或 `null` 表示 /backup |
| homeassistant\_exclude\_database | boolean | True | 从 backup 中排除 Home Assistant 数据库文件 |
| background | boolean | True | 立即返回 `job_id`，不等待 backup 完成。客户端必须检查 job 以获取 status 和 slug。 |

**你需要在 payload 中至少提供一个 key。**

**Example response:**

```json
{
  "slug": "skuwe823",
  "job_id": "abc123"
}
```

:::note

如果单独的消息无法准确描述发生了什么，此 API 的错误响应也可能包含 `job_id`。
调用者应引导用户查看 job 或 supervisor logs，以了解发生了什么。

:::

</ApiEndpoint>

<ApiEndpoint path="/backups/options" method="post">
更新 backup manager 的 options，你需要在 API 调用中至少提供一个 payload key。

**Payload:**

| key | type | description |
|-----|------|-------------|
| days\_until\_stale | int | 设置距 backup 被视为 stale 的天数 |

**你需要在 payload 中至少提供一个 key。**

</ApiEndpoint>

<ApiEndpoint path="/backups/reload" method="post">

从存储中重新加载 backup。

</ApiEndpoint>

<ApiEndpoint path="/backups/freeze" method="post">

将 Supervisor 置于 freeze 状态，并为外部 backup 准备 Home Assistant 和 addons。

:::note

此操作不会执行 backup。它只是为 Home Assistant 和 addons 准备 backup，但预期是用户使用外部工具来执行 backup。例如 KVM 或 Proxmox 的 snapshot 功能。调用者应在完成后调用 `/backups/thaw`。

:::

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| timeout | int | True | freeze 超时并自动开始 thaw 之前的秒数（默认：600）。 |

</ApiEndpoint>

<ApiEndpoint path="/backups/thaw" method="post">

结束由 `/backups/freeze` 发起的 freeze，并恢复 Home Assistant 和 addons 的正常行为。

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>/download" method="get">

以下载给定 slug 的 backup 文件。

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>/info" method="get">

为该 app 返回一个 [Backup details model](api/supervisor/models.md#backup-details)。

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>" method="delete">

移除给定 slug 的 backup 文件。

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>/restore/full" method="post">

对给定 slug 的 backup 执行 full restore。

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| password | string | True | backup 的密码（如果有） |
| background | boolean | True | 立即返回 `job_id`，不等待 restore 完成。客户端必须检查 job 以获取 status。 |

**Example response:**

```json
{
  "job_id": "abc123"
}
```

:::note

如果单独的消息无法准确描述发生了什么，此 API 的错误响应也可能包含 `job_id`。
调用者应引导用户查看 job 或 supervisor logs，以了解发生了什么。

:::

</ApiEndpoint>

<ApiEndpoint path="/backups/<backup>/restore/partial" method="post">

对给定 slug 的 backup 执行 partial restore。

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| homeassistant | boolean | True | 应恢复 Home Assistant 时为 `true` |
| addons | list | True | 应恢复的 app slugs 列表 |
| folders | list | True | 应恢复的目录列表 |
| password | string | True | backup 的密码（如果有） |
| background | boolean | True | 立即返回 `job_id`，不等待 restore 完成。客户端必须检查 job 以获取 status。 |

**你需要在 payload 中至少提供一个 key。**

**Example response:**

```json
{
  "job_id": "abc123"
}
```

:::note

如果单独的消息无法准确描述发生了什么，此 API 的错误响应也可能包含 `job_id`。
调用者应引导用户查看 job 或 supervisor logs，以了解发生了什么。

:::

</ApiEndpoint>

### CLI

<ApiEndpoint path="/cli/info" method="get">
返回关于 CLI 插件的信息

**Returned data:**

| key | type | description |
|-----|------|-------------|
| version | string | 已安装的 cli 版本 |
| version\_latest | string | 最新发布的版本 |
| update\_available | boolean | 有更新可用时为 `true` |

**Example response:**

```json
{
  "version": "1",
  "version_latest": "2",
  "update_available": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/cli/stats" method="get">

为 CLI 插件返回一个 [Stats model](api/supervisor/models.md#stats)。

**Example response:**

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
更新 CLI 插件

**Payload:**

| key | type | description |
|-----|------|-------------|
| version | string | 要安装的版本，默认为最新版本 |

</ApiEndpoint>

### 核心

<ApiEndpoint path="/core/api" method="get">
将 GET API 调用代理到 Home Assistant API
</ApiEndpoint>

<ApiEndpoint path="/core/api" method="post">
将 POST API 调用代理到 Home Assistant API
</ApiEndpoint>

<ApiEndpoint path="/core/check" method="post">
运行 configuration 检查
</ApiEndpoint>

<ApiEndpoint path="/core/info" method="get">
返回关于 Home Assistant core 的信息

**Returned data:**

| key | type | description |
|-----|------|-------------|
| version | string | 已安装的 core 版本 |
| version\_latest | string | 活动 channel 中最新发布的版本 |
| update\_available | boolean | 有更新可用时为 `true` |
| arch | string | host 的架构（armhf, aarch64, i386, amd64） |
| machine | string | 运行 host 的 machine 类型 |
| ip\_address | string | 指向 supervisor 的内部 docker IP 地址 |
| image | string | 运行 core 的容器镜像 |
| boot | boolean | 应在 boot 时启动时为 `true` |
| port | int | Home Assistant 运行的端口 |
| ssl | boolean | Home Assistant 使用 SSL 时为 `true` |
| watchdog | boolean | 已启用 watchdog 时为 `true` |
| wait\_boot | int | boot 期间等待的最大时间 |
| audio\_input | string or null | audio 输入设备的描述 |
| audio\_output | string or null | audio 输出设备的描述 |
| backups\_exclude\_database | boolean | 默认在 backups 中排除 Home Assistant 数据库文件 |
| duplicate\_log\_file | boolean | Home Assistant 将 logs 复制到一个文件中 |

**Example response:**

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
  "port": 80,
  "ssl": false,
  "watchdog": true,
  "wait_boot": 800,
  "audio_input": "AMCP32",
  "audio_output": "AMCP32"
}
```

</ApiEndpoint>

<ApiEndpoint path="/core/logs" method="get">

通过 Systemd journal 后端获取 Home Assistant Core 容器的 logs。

该 endpoint 接受与 `/host/logs` 相同的 headers 并提供相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/core/logs/follow" method="get">

与 `/core/logs` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/core/logs/latest" method="get">

返回 Home Assistant Core 容器最近一次启动的所有 logs。

`Range` header 被忽略，但可以使用 `lines` query 参数。

</ApiEndpoint>

<ApiEndpoint path="/core/logs/boots/<bootid>" method="get">

获取与特定 boot 相关的 Home Assistant Core 容器 logs。

`bootid` 参数的解释方式与 `/host/logs/boots/<bootid>` 中相同，该 endpoint 否则提供与 `/host/logs` 相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/core/logs/boots/<bootid>/follow" method="get">

与 `/core/logs/boots/<bootid>` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/core/options" method="post">
更新 Home Assistant 的 options，你需要在 API 调用中至少提供一个 payload key。
更新 options 后，你需要调用 `/core/restart`。

:::tip
传递 `image`、`refresh_token`、`audio_input` 或 `audio_output` 且值为 `null` 可重置该 option。
:::

**Payload:**

| key | type | description |
|-----|------|-------------|
| boot | boolean | 在 boot 时启动 Core |
| image | string or null | 自定义镜像的名称 |
| port | int | Home Assistant 运行的端口 |
| ssl | boolean | 启用 SSL 时为 `true` |
| watchdog | boolean | 启用 watchdog 时为 `true` |
| wait\_boot | int | 等待 Core 启动的时间 |
| refresh\_token | string or null | 用于与 Core 认证的 token |
| audio\_input | string or null | audio 输入的 profile 名称 |
| audio\_output | string or null | audio 输出的 profile 名称 |
| backups\_exclude\_database | boolean | 从 backups 中排除 Home Assistant 数据库文件时为 `true` |
| duplicate\_log\_file | boolean | 将 Home Assistant logs 复制到一个文件中时为 `true` |

**你需要在 payload 中至少提供一个 key。**

</ApiEndpoint>

<ApiEndpoint path="/core/rebuild" method="post">
重建 Home Assistant core 容器

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| safe\_mode | boolean | True | 以 safe mode 重建 Core |
| force | boolean | True | 在 Home Assistant offline db migration 期间强制重建 |

</ApiEndpoint>

<ApiEndpoint path="/core/restart" method="post">
重启 Home Assistant core 容器

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| safe\_mode | boolean | True | 以 safe mode 重启 Core |
| force | boolean | True | 在 Home Assistant offline db migration 期间强制重启 |

</ApiEndpoint>

<ApiEndpoint path="/core/start" method="post">
启动 Home Assistant core 容器
</ApiEndpoint>

<ApiEndpoint path="/core/stats" method="get">

为 Home Assistant core 返回一个 [Stats model](api/supervisor/models.md#stats)。

**Example response:**

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
停止 Home Assistant core 容器

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| force | boolean | True | 在 Home Assistant offline db migration 期间强制停止 |

</ApiEndpoint>

<ApiEndpoint path="/core/update" method="post">
更新 Home Assistant core

**Payload:**

| key | type | description |
|-----|------|-------------|
| version | string | 要安装的版本，默认为最新版本 |
| backup | boolean | 在更新前创建 core 和 core configuration 的 partial backup，默认为 false |

</ApiEndpoint>

<ApiEndpoint path="/core/websocket" method="get">
代理到 Home Assistant Core websocket。
</ApiEndpoint>

### 发现

<ApiEndpoint path="/discovery" method="get">
返回关于已启用 discoveries 的信息。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| discovery | list | [Discovery models](api/supervisor/models.md#discovery) 列表 |
| services | dictionary | services 的字典，包含拥有该 service 的 apps 列表。 |

**Example response:**

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
创建一个 discovery service

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| service | string | False | service 的名称 |
| config | dictionary | False | service 的 configuration |

**Example response:**

```json
{
  "uuid": "uuid"
}
```

</ApiEndpoint>

<ApiEndpoint path="/discovery/<uuid>" method="get">

获取一个 UUID 的 [discovery model](api/supervisor/models.md#discovery)。

</ApiEndpoint>

<ApiEndpoint path="/discovery/<uuid>" method="delete">
删除一个特定的 service。
</ApiEndpoint>

### DNS

<ApiEndpoint path="/dns/info" method="get">
返回关于 DNS 插件的信息。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| fallback | bool | 失败时尝试 fallback DNS |
| host | string | 插件的 IP 地址 |
| llmnr | bool | 能解析 LLMNR hostnames |
| locals | list | DNS servers 列表 |
| mdns | bool | 能解析 MulticastDNS hostnames |
| servers | list | DNS servers 列表 |
| update\_available | boolean | 有更新可用时为 `true` |
| version | string | 已安装的 observer 版本 |
| version\_latest | string | 最新发布的版本 |

**Example response:**

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

通过 Systemd journal 后端获取 DNS 插件容器的 logs。

该 endpoint 接受与 `/host/logs` 相同的 headers 并提供相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/dns/logs/follow" method="get">

与 `/dns/logs` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/dns/logs/latest" method="get">

返回 DNS 插件容器最近一次启动的所有 logs。

`Range` header 被忽略，但可以使用 `lines` query 参数。

</ApiEndpoint>

<ApiEndpoint path="/dns/logs/boots/<bootid>" method="get">

获取与特定 boot 相关的 DNS 插件容器 logs。

`bootid` 参数的解释方式与 `/host/logs/boots/<bootid>` 中相同，该 endpoint 否则提供与 `/host/logs` 相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/dns/logs/boots/<bootid>/follow" method="get">

与 `/dns/logs/boots/<bootid>` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/dns/options" method="post">
设置 DNS options

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| fallback | bool | True | 启用/禁用 fallback DNS |
| servers | list | True | DNS servers 列表 |

**你需要在 payload 中至少提供一个 key。**

</ApiEndpoint>

<ApiEndpoint path="/dns/reset" method="post">
重置 DNS configuration。
</ApiEndpoint>

<ApiEndpoint path="/dns/restart" method="post">
重启 DNS 插件
</ApiEndpoint>

<ApiEndpoint path="/dns/stats" method="get">

为 DNS 插件返回一个 [Stats model](api/supervisor/models.md#stats)。

**Example response:**

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
更新 DNS 插件

**Payload:**

| key | type | description |
|-----|------|-------------|
| version | string | 要安装的版本，默认为最新版本 |

</ApiEndpoint>

### Docker

<ApiEndpoint path="/docker/info" method="get">
返回关于 docker 实例的信息。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| version | string | docker engine 的版本 |
| enable\_ipv6 | bool | 为 containers 启用/禁用 IPv6 |
| storage | string | 存储类型 |
| logging | string | 日志类型 |
| registries | dictionary | 包含 `username` 和 `password` keys 的字典集合，用于 registries。 |

**Example response:**

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
设置 docker options

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| enable\_ipv6 | bool | True | 为 containers 启用/禁用 IPv6 |

**你需要在 payload 中至少提供一个 key。**

</ApiEndpoint>

<ApiEndpoint path="/docker/registries" method="get">
获取所有已配置的 container registries，返回一个 dict，以 registry hostname 作为 key，包含为对应 registry 配置的 username 字典。

**Example response:**

```json
{
  "registry.example.com": {
    "username": "AwesomeUser"
  }
}
```

</ApiEndpoint>

<ApiEndpoint path="/docker/registries" method="post">
添加一个新的 container registry。

**Payload:**

| key | type | description |
|-----|------|-------------|
| hostname | dictionary | 包含为 registry 的 `username` 和 `password` keys 的字典。 |

**Example payload:**

```json
{
  "registry.example.com": {
    "username": "AwesomeUser",
    "password": "MySuperStrongPassword!"
  }
}
```

:::note

要登录到默认的 container registry（Docker Hub），请使用 `hub.docker.com` 作为 registry。

:::

</ApiEndpoint>

<ApiEndpoint path="/docker/registries/<registry>" method="delete">
从已配置的 container registries 中删除一个 registry。
</ApiEndpoint>

<ApiEndpoint path="/docker/migrate-storage-driver" method="post">
安排 Docker storage driver 迁移。该迁移将在下次系统重启时应用。

此 endpoint 允许迁移到以下任一：

* `overlayfs`: Containerd overlayfs driver
* `overlay2`: Docker graph overlay2 driver

:::note

此 endpoint 需要 Home Assistant OS 17.0 或更新版本。在较旧版本或非 HAOS 安装中将返回 `404` 错误。

:::

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| storage\_driver | string | False | 目标 storage driver（`overlayfs` 或 `overlay2`） |

**Example payload:**

```json
{
  "storage_driver": "overlayfs"
}
```

调用此 endpoint 后，需要重启才能应用迁移。响应会在 resolution center 中创建一个 `reboot_required` issue。

</ApiEndpoint>

### 硬件

<ApiEndpoint path="/hardware/info" method="get">
获取 hardware 信息。

**Example response:**

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

**Returned data:**

| key | description |
|-----|-------------|
| devices | [Device models](api/supervisor/models.md#device) 列表 |
| drives | [Drive models](api/supervisor/models.md#drive) 列表 |

</ApiEndpoint>

<ApiEndpoint path="/hardware/audio" method="get">
获取 audio 设备

**Example response:**

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
返回关于 host 的信息。

**Returned data**

| key | type | description |
|-----|------|-------------|
| agent\_version | string or null | host 上运行的 agent 版本 |
| apparmor\_version | string or null | host 的 AppArmor 版本 |
| boot\_timestamp | int | 最后一次 boot 的时间戳（微秒） |
| broadcast\_llmnr | bool or null | host 正在广播其 LLMNR hostname |
| broadcast\_mdns | bool or null | host 正在广播其 MulticastDNS hostname |
| chassis | string or null | chassis 类型 |
| virtualization | string or null | 正在使用的虚拟化 hypervisor（如果有） |
| cpe | string or null | 本地 CPE |
| deployment | string or null | OS 的部署 stage（如果有） |
| disk\_total | float | 磁盘总空间（GB） |
| disk\_used | float | 已使用的磁盘空间（GB） |
| disk\_free | float | 可用的磁盘空间（GB） |
| features | list | host 可用 features 列表 |
| hostname | string or null | host 的 hostname |
| kernel | string or null | host 的 kernel 版本 |
| llmnr\_hostname | string or null | 当前通过网络通过 LLMNR 暴露的 hostname |
| operating\_system | string | host 的 operating system |
| startup\_time | float | 最后一次 boot 所用的时间（秒） |
| disk\_life\_time | float or null | 估计的磁盘生命周期使用百分比（0–100）。并非所有磁盘都提供此信息，不可用时返回 `null`。 |
| timezone | string | host 的当前 timezone。 |
| dt\_utc | string | host 的当前 UTC 日期/时间（ISO 8601 格式）。 |
| dt\_synchronized | bool | host 已与 NTP service 同步时为 `true`。 |
| use\_ntp | bool | host 使用 NTP service 进行时间同步时为 `true`。 |

**Example response:**

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

从 host 获取 systemd Journal logs。以纯文本形式返回 log entries，每行一条 log record。

**HTTP Request Headers**

| Header | optional | description |
|--------|----------|-------------|
| Accept | true | 数据类型（text/plain 或 text/x-log） |
| Range | true | log entries 的范围。格式为 `entries=cursor[[:num_skip]:num_entries]` |

**HTTP Query Parameters**

这些是上述 headers 的便捷替代方案，因为 query 参数在开发中和与 Home Assistant proxy 一起使用时更易于使用。你应该只提供其中一种。

| Query | type | description |
|-------|------|-------------|
| verbose | N/A | 如果包含，使用 `text/x-log` 作为 log 输出类型（`Accept` header 的替代方案） |
| lines | int | 要返回的输出行数（`Range` header 的替代方案） |
| no\_colors | N/A | 如果包含，ANSI 转义码用于终端着色将从输出中剥离 |

示例 query string：

```text
?verbose&lines=100&no_colors
```

:::tip
要获取最后的 log entries，Range 请求 header 支持负值
作为 `num_skip`。例如，`Range: entries=:-9:` 返回最后的 10 条 entries。或者
`Range: entries=:-200:100` 查看从 200 条之前的 100 条 entries。
:::

API 默认返回最后的 100 行。提供一个 `Range` 值以查看更早的 logs。

`Accept` header 可以设为 `text/x-log` 以获取带有附加信息的 logs，例如时间戳和 Systemd unit 名称。如果未指定标识符（即对于 host logs 包含多个
标识符/units 的 logs），此选项将被忽略——这些 logs 始终被标注。

</ApiEndpoint>

<ApiEndpoint path="/host/logs/follow" method="get">

与 `/host/logs` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/host/logs/identifiers">

返回一个来自 systemd journal 的 syslog identifiers 列表，你可以用它们配合
`/host/logs/identifiers/<identifier>` 和 `/host/logs/boots/<bootid>/identifiers/<identifier>` 使用。

</ApiEndpoint>

<ApiEndpoint path="/host/logs/identifiers/<identifier>" method="get">

从 host 获取与特定 log identifier 相关的 systemd Journal logs。这里有用的一些 identifiers 示例包括

* `audit` - 如果在开发 apparmor profile 时遇到权限问题
* `NetworkManager` - 遇到网络问题时显示 NetworkManager logs
* `bluetoothd` - 遇到蓝牙问题时显示 bluetoothd logs

调用 `GET /host/logs/identifiers` 将显示 `identifier` 可能值的全部列表。

否则它提供与 `/host/logs` 相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/host/logs/identifiers/<identifier>/follow" method="get">

与 `/host/logs/identifiers/<identifier>` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boots">

返回一个该系统的 boot IDs 字典，你可以用它们配合
`/host/logs/boots/<bootid>` 和 `/host/logs/boots/<bootid>/identifiers/<identifier>` 使用。

字典中每项的 key 是 boot 偏移量。0 是当前 boot，
负数表示距当前 boot 往前的 boot 次数。

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boots/<bootid>" method="get">

从 host 获取与特定 boot 相关的 systemd Journal logs。
调用 `GET /host/info/boots` 查看 boot IDs。或者你也可以提供一个
boot 偏移量：

* 0 - 当前 boot
* 负数 - 从当前 boot 往前计数（-1 是前一次 boot）
* 正数 - 从已知的最后一次 boot 往后计数（1 是已知的最后一次 boot）

否则它提供与 `/host/logs` 相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boots/<bootid>/follow" method="get">

与 `/host/logs/boots/<bootid>` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boots/<bootid>/identifiers/<identifier>" method="get">

获取特定 log identifier 和特定 boot 的 systemd Journal logs entries。
它是 `/host/logs/boots/<bootid>` 和 `/host/logs/identifiers/<identifier>` 的组合。

</ApiEndpoint>

<ApiEndpoint path="/host/logs/boot/<bootid>/<identifier>/entries/follow" method="get">

与 `/host/logs/boots/<bootid>/identifiers/<identifier>` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/host/options" method="post">
设置 host options

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| hostname | string | True | 将用作新 hostname 的字符串 |

**你需要在 payload 中至少提供一个 key。**

</ApiEndpoint>

<ApiEndpoint path="/host/reboot" method="post">
重启 host

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| force | boolean | True | 在 Home Assistant offline db migration 期间强制重启 |

</ApiEndpoint>

<ApiEndpoint path="/host/reload" method="post">
重新加载 host 信息
</ApiEndpoint>

<ApiEndpoint path="/host/service/<service>/start" method="post">
在 host 上启动一个 service。
</ApiEndpoint>

<ApiEndpoint path="/host/service/<service>/stop" method="post">
在 host 上停止一个 service。
</ApiEndpoint>

<ApiEndpoint path="/host/service/<service>/reload" method="post">
在 host 上重新加载一个 service。
</ApiEndpoint>

<ApiEndpoint path="/host/services" method="get">
获取关于 host services 的信息。

**Returned data:**

| key | description |
|-----|-------------|
| services | [Host service models](api/supervisor/models.md#host-service) 字典 |

**Example response:**

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
关闭 host

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| force | boolean | True | 在 Home Assistant offline db migration 期间强制关闭 |

</ApiEndpoint>

<ApiEndpoint path="/host/disks/<disk>/usage" method="get">
获取以字节为单位的详细磁盘使用情况信息。

`disk` 选择要测量的对象。使用 `default` 表示数据磁盘，或使用 mount 名称来测量该 mount。`default` 始终指向数据磁盘，因此同名 mount 无法通过此 endpoint 访问。

支持可选的 `max_depth` query 参数，用于控制细分的深度。数据磁盘默认为 1，mount 默认为 0。

数据磁盘将其已知的一级路径报告为 children，`max_depth` 控制在其中内部继续细分的深度。

Mount 没有这种固定层级，因此它通过遍历目录来测量，并且只有剩余深度超过一级时目录才会列出。因此 `max_depth` 为 0 或 1 仅返回总计，第一级目录在 2 时出现，再往下的每一级都需要多加一级。

当 mount 列出 children 时，一个 `other` child 携带遍历未归因到目录的所有内容：直接位于 mount 根部的文件、保留空间以及无法读取的条目。当该余数为正时，节点 children 之和恰好等于其自身的 `used_bytes`。如果在遍历期间文件系统发生变化，目录总计可能与 `used_bytes` 不一致；在这种情况下，细分将完全被省略，仅报告总计，因此 children 之和永远不会超过其父节点。

请求不存在的 mount 的使用情况将返回 `404`。对于不 active 的 mount、unit 仍报告 active 但已实际未挂载的 mount、无法读取的 mount 或 usage probe 在 60 秒内未完成的 mount，将返回 `400`。该 probe 在超时后仍会继续运行，因此重试请求将加入已在进行的 probe，而不是启动一个新的。

**Example response:**

```json
{
  "id": "root",
  "label": "Root",
  "total_bytes": 503312781312,
  "used_bytes": 430245011456,
  "children": [
    {
      "id": "system",
      "label": "System",
      "used_bytes": 75660903137
    },
    {
      "id": "addons_data",
      "label": "Addons data",
      "used_bytes": 42349200762
    },
    {
      "id": "addons_config",
      "label": "Addons configuration",
      "used_bytes": 5283318814
    },
    {
      "id": "media",
      "label": "Media",
      "used_bytes": 476680019
    },
    {
      "id": "share",
      "label": "Share",
      "used_bytes": 37477206419
    },
    {
      "id": "backup",
      "label": "Backup",
      "used_bytes": 268350699520
    },
    {
      "id": "ssl",
      "label": "SSL",
      "used_bytes": 202912633
    },
    {
      "id": "homeassistant",
      "label": "Home assistant",
      "used_bytes": 444090152
    }
  ]
}
```

**Example response for a mount**，使用 `max_depth=2` 请求：

```json
{
  "id": "media_nas",
  "label": "media_nas",
  "total_bytes": 2000398934016,
  "used_bytes": 1240247081779,
  "children": [
    {
      "id": "music",
      "label": "music",
      "used_bytes": 402653184000
    },
    {
      "id": "movies",
      "label": "movies",
      "used_bytes": 800000000000
    },
    {
      "id": "other",
      "label": "Other",
      "used_bytes": 37593897779
    }
  ]
}
```

</ApiEndpoint>

### Ingress

<ApiEndpoint path="/ingress/panels" method="get">

**Returned data:**

| key | type | description |
|-----|------|-------------|
| panels | dictionary | [Panel models](api/supervisor/models.md#panel) 字典 |

**Example response:**

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
创建一个用于访问 ingress service 的新 session。

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| user\_id | string | True | 新 session 认证用户的 ID |

**Returned data:**

| key | type | optional | description |
|-----|------|----------|-------------|
| session | string | False | ingress session 的 token |

</ApiEndpoint>

<ApiEndpoint path="/ingress/validate_session" method="post">
验证一个 ingress session，并延长其有效期。

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| session | string | False | ingress session 的 token |

</ApiEndpoint>

### 任务

<ApiEndpoint path="/jobs/info" method="get">
返回关于被忽略的 job 条件和当前运行或已完成的 jobs 的信息

**Returned data:**

| key | type | description |
|-----|------|-------------|
| ignore\_conditions | list | 被忽略的 job 条件列表 |
| jobs | list | 运行中或已完成的 [Jobs](api/supervisor/models.md#job) 列表 |

**Example response:**

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
设置 job manager 的 options

**Payload:**

| key | type | description |
|-----|------|-------------|
| ignore\_conditions | list | 要忽略的 job 条件列表（替换现有列表） |

</ApiEndpoint>

<ApiEndpoint path="/jobs/<job_id>" method="get">
返回关于当前运行或已完成 job 的信息

**Returned data:**

参见 [Job](api/supervisor/models.md#job) model

**Example response:**

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
如果客户端不再关心该已完成的 job，则将其从 Supervisor cache 中移除
</ApiEndpoint>

<ApiEndpoint path="/jobs/reset" method="post">
将 job manager 重置为默认值（停止忽略任何被忽略的 job 条件）

</ApiEndpoint>

### 根

<ApiEndpoint path="/available_updates" method="get">

返回关于可用更新的信息

**Example response:**

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

**Returned data:**

| key | type | description |
|-----|------|-------------|
| update\_type | string | `addon`、`os`、`core` 或 `supervisor` |
| name | string | 返回名称（仅当 `update_type` 为 `addon` 时） |
| icon | string | 返回 icon 的路径（如果有）（仅当 `update_type` 为 `addon` 时） |
| version\_latest | string | 返回可用版本 |
| panel\_path | string | 返回 UI 可以加载的路径 |

</ApiEndpoint>

<ApiEndpoint path="/reload_updates" method="post">
这将重新加载关于主要组件（OS、Supervisor、Core 和
Plug-ins）的信息。
</ApiEndpoint>

<ApiEndpoint path="/refresh_updates" method="post">
这将重新加载关于 app repositories 的信息并获取新的 version files。
此 endpoint 目前不推荐使用。请使用 `/reload_updates` 或 `/store/reload`
代替。
</ApiEndpoint>

<ApiEndpoint path="/info" method="get">
返回一个包含来自其他 `/*/info` endpoints 的部分 key 的 dict。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| supervisor | string | 已安装的 supervisor 版本 |
| homeassistant | string | 已安装的 Home Assistant 版本 |
| hassos | string or null | Home Assistant OS 版本或 null |
| docker | string | host 上的 docker 版本 |
| hostname | string | host 上的 hostname |
| operating\_system | string | host 的 operating system |
| features | list | host 上的可用 features 列表 |
| machine | string | machine 类型 |
| machine\_id | string or null | 底层 operating system 的 machine ID |
| arch | string | host 的架构 |
| supported\_arch | list | 受支持的 host 架构列表 |
| supported | boolean | 环境受支持时为 `true` |
| channel | string | 活动 channel（stable, beta, dev） |
| logging | string | 活动 log 级别（debug, info, warning, error, critical） |
| state | string | Supervisor 的 core state。 |
| timezone | string | 当前 timezone |

**Example response:**

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

### 挂载点

<ApiEndpoint path="/mounts" method="get">
返回关于 Supervisor 中配置的 mounts 的信息

**Returned data:**

| key | type | description |
|-----|------|-------------|
| mounts | list | [Mounts](api/supervisor/models.md#mount) 列表 |
| default\_backup\_mount | string or null | backup mount 名称或 `null` 表示 /backup |

**Example response:**

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
设置 mount manager options

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| default\_backup\_mount | string or null | True | backup mount 名称或 `null` 表示 /backup |

**你需要在 payload 中至少提供一个 key。**

</ApiEndpoint>

<ApiEndpoint path="/mounts" method="post">
在 Supervisor 中添加一个新 mount 并挂载它

**Payload:**

接受一个 [Mount](api/supervisor/models.md#mount)

`name` 中的值必须是唯一的，且只能由字母、数字和下划线组成。

**Example payload:**

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
更新 Supervisor 中现有的 mount 并重新挂载它

**Payload:**

接受一个 [Mount](api/supervisor/models.md#mount)。

应省略 `name` 字段。如果包含，其值必须与现有名称匹配，不能更改。删除并重新添加 mount 以更改名称。

**Example payload:**

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
卸载并从 Supervisor 中删除现有的 mount。

</ApiEndpoint>

<ApiEndpoint path="/mounts/<name>/reload" method="post">
卸载并使用相同的配置重新挂载 Supervisor 中现有的 mount。

</ApiEndpoint>

### Multicast

<ApiEndpoint path="/multicast/info" method="get">
返回关于 multicast 插件的信息

**Returned data:**

| key | type | description |
|-----|------|-------------|
| version | string | 已安装的 multicast 版本 |
| version\_latest | string | 最新发布的版本 |
| update\_available | boolean | 有更新可用时为 `true` |

**Example response:**

```json
{
  "version": "1",
  "version_latest": "2",
  "update_available": true
}
```

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs" method="get">

通过 Systemd journal 后端获取 multicast 插件的 logs。

该 endpoint 接受与 `/host/logs` 相同的 headers 并提供相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs/follow" method="get">

与 `/multicast/logs` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs/latest" method="get">

返回 multicast 插件容器最近一次启动的所有 logs。

`Range` header 被忽略，但可以使用 `lines` query 参数。

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs/boots/<bootid>" method="get">

获取与特定 boot 相关的 multicast 插件 logs。

`bootid` 参数的解释方式与 `/host/logs/boots/<bootid>` 中相同，该 endpoint 否则提供与 `/host/logs` 相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/multicast/logs/boots/<bootid>/follow" method="get">

与 `/multicast/logs/boots/<bootid>` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/multicast/restart" method="post">
重启 multicast 插件。
</ApiEndpoint>

<ApiEndpoint path="/multicast/stats" method="get">

为 multicast 插件返回一个 [Stats model](api/supervisor/models.md#stats)。

**Example response:**

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
更新 multicast 插件

**Payload:**

| key | type | description |
|-----|------|-------------|
| version | string | 要安装的版本，默认为最新版本 |

</ApiEndpoint>

### 网络

<ApiEndpoint path="/network/info" method="get">
获取 network 信息。

**Returned data:**

| key | description |
|-----|-------------|
| interfaces | [Network interface models](api/supervisor/models.md#network-interface) 列表 |
| docker | 关于内部 docker network 的信息 |
| host\_internet | 指示 host 是否可以访问 internet 的 Boolean。 |
| supervisor\_internet | 指示 Supervisor 是否可以访问 internet 的 Boolean。 |

**Example response:**

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

返回特定 network interface 的 [Network interface model](api/supervisor/models.md#network-interface)。

</ApiEndpoint>

<ApiEndpoint path="/network/reload" method="post">

更新所有 Network interface 数据。

</ApiEndpoint>

<ApiEndpoint path="/network/interface/<interface>/update" method="post">
更新 network interface 的设置。

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| enabled | bool | True | 启用/禁用 ethernet interface / 禁用时 VLAN 被移除 |
| ipv6 | dict | True | 包含 ipv6 interface 设置的 struct |
| ipv4 | dict | True | 包含 ipv4 interface 设置的 struct |
| wifi | dict | True | 包含 Wireless 连接设置的 struct |

**ipv6:**

| key | type | optional | description |
|-----|------|----------|-------------|
| method | string | True | 设置 IP 配置方法，`auto` 表示 DHCP 或 Router Advertisements，`static` 或 `disabled` |
| addr\_gen\_mode | string | True | Address generation mode 可以是 `eui64`、`stable-privacy`、`default-or-eui64` 或 `default` |
| ip6\_privacy | string | True | Privacy extensions 选项有 `disabled`、`enabled-prefer-public`、`enabled` 或 `default` |
| address | list | True | 接口的新 IP 地址，以 ::/XX 格式作为列表 |
| nameservers | list | True | 要使用的 DNS servers 列表 |
| gateway | string | True | 接口应使用的 gateway |
| route\_metric | int | True | Route metric。值越低优先级越高。内核接受零（0）但会将其强制转换为 1024（用户默认值） |

**ipv4:**

| key | type | optional | description |
|-----|------|----------|-------------|
| method | string | True | 设置 IP 配置方法，`auto` 表示 DHCP，`static` 或 `disabled` |
| address | list | True | 接口的新 IP 地址，以 X.X.X.X/XX 格式作为列表 |
| nameservers | list | True | 要使用的 DNS servers 列表 |
| gateway | string | True | 接口应使用的 gateway |
| route\_metric | int | True | Route metric。值越低优先级越高 |

**wifi:**

| key | type | optional | description |
|-----|------|----------|-------------|
| mode | string | True | 设置模式 `infrastructure`（默认）、`mesh`、`adhoc` 或 `ap` |
| auth | string | True | 设置 auth 模式：`open`（默认）、`web`、`wpa-psk` |
| ssid | string | True | 设置要连接到的 SSID |
| psk | string | True | 与 `web` 或 `wpa-psk` 一起使用的共享密钥 |

</ApiEndpoint>

<ApiEndpoint path="/network/interface/<interface>/accesspoints" method="get">

返回此 Wireless interface 上可用的 [Access Points](api/supervisor/models.md#access-points) 列表。

**此功能仅适用于 Wireless interfaces！**

**Returned data:**

| key | description |
|-----|-------------|
| accesspoints | [Access Points](api/supervisor/models.md#access-points) 列表 |

**Example response:**

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

在此 network interface 上创建一个新的 VLAN *id*。

**此功能仅适用于 ethernet interfaces！**

**Payload:**

| key | type | optional | description |
|-----|------|----------|-------------|
| ipv6 | dict | True | 包含 ipv6 interface 设置的 struct |
| ipv4 | dict | True | 包含 ipv4 interface 设置的 struct |

</ApiEndpoint>

### 观察者

<ApiEndpoint path="/observer/info" method="get">

返回关于 observer 插件的信息

**Returned data:**

| key | type | description |
|-----|------|-------------|
| host | string | 插件的 IP 地址 |
| version | string | 已安装的 observer 版本 |
| version\_latest | string | 最新发布的版本 |
| update\_available | boolean | 有更新可用时为 `true` |

**Example response:**

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

为 observer 插件返回一个 [Stats model](api/supervisor/models.md#stats)。

**Example response:**

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

更新 observer 插件

**Payload:**

| key | type | description |
|-----|------|-------------|
| version | string | 要安装的版本，默认为最新版本 |

</ApiEndpoint>

### OS

<ApiEndpoint path="/os/config/sync" method="post">

从 USB 闪存驱动器加载 host configurations。

</ApiEndpoint>

<ApiEndpoint path="/os/info" method="get">

返回关于 OS 的信息。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| version | string | OS 当前版本 |
| version\_latest | string | 活动 channel 中 OS 最新发布的版本 |
| update\_available | boolean | 有更新可用时为 `true` |
| board | string | board 名称 |
| boot | string | 正在使用的 slot |
| data\_disk | string | 用于持久存储 OS 数据的设备 |
| boot\_slots | dict | 以名称为 key 的 [boot slots](api/supervisor/models.md#boot-slot) 字典 |

**Example response:**

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

更新 Home Assistant OS

完成此操作后需要重启才能完成更新。可以通过后续调用 `/host/reboot`
完成，或者让用户按计划使用 repair 完成。

**Payload:**

| key | type | description |
|-----|------|-------------|
| version | string | 要安装的版本，默认为最新版本 |

</ApiEndpoint>

<ApiEndpoint path="/os/boot-slot" method="post">

更改 active boot slot，**这也会重启设备！**

**Payload:**

| key | type | description |
|-----|------|-------------|
| boot\_slot | string | 要更改到的 boot slot。查看 `/os/info` API 中 `boot_slots` 的选项。 |

</ApiEndpoint>

<ApiEndpoint path="/os/config/swap" method="get">

获取当前 HAOS swap configuration。在 Supervised 上不可用。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| swap\_size | string | 当前 swap 大小。 |
| swappiness | int | 当前 kernel swappiness 值。 |

**Example response:**

```json
{
  "swap_size": "2G",
  "swappiness": 1
}
```

</ApiEndpoint>

<ApiEndpoint path="/os/config/swap" method="post">

设置 HAOS swap configuration。在 Supervised 上不可用。

**Payload:**

| key | type | description |
|-----|------|-------------|
| swap\_size | string | 新的 swap 大小，带可选单位的数字（K/M/G）。低于 40K 的值将禁用 swap。 |
| swappiness | int | 新的 swappiness 值（0-100）。 | </ApiEndpoint>

<ApiEndpoint path="/os/datadisk/list" method="get">

返回新的 data partition 可能的目标。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| devices | list | 可能的 data disk 目标 ID 列表 |
| disks | list | 可能作为 data disk 目标的 [disks](api/supervisor/models.md#disk) 列表 |

**Example response:**

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

将 datadisk 移动到新位置，**这也会重启设备！**

**Payload:**

| key | type | description |
|-----|------|-------------|
| device | string | 用作 data 迁移目标的 disk 设备 ID |

</ApiEndpoint>

<ApiEndpoint path="/os/datadisk/wipe" method="post">

擦除 datadisk 包括所有用户数据和设置，**这也会重启设备！** 此 API 需要 admin token

此 API 将擦除 addons、Home Assistant 和 Operating System 的所有 config/settings，以及 config、backups、media 等中本地存储的任何数据。机器将在此过程中重启。

重启完成后将下载最新稳定版本的 Home Assistant 和 Supervisor。处理完成后用户将看到 onboarding，就像初始设置时一样。

此擦除还包括 network 设置。因此重启后用户可能需要重新配置这些设置才能再次访问 Home Assistant。

Operating system 版本及其 boot configuration 将被保留。

</ApiEndpoint>

<ApiEndpoint path="/os/boards/{board}" method="get">

如果 board 有可以从 Home Assistant 修改的 features 或 settings，则返回关于它的信息。`board` 的值是 `/os/info` 返回的 `board` 字段中的值。

具有以下选项的 boards 记录如下。

</ApiEndpoint>

<ApiEndpoint path="/os/boards/yellow" method="get">

如果在 yellow board 上运行，返回其 settings 的当前值。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| disk\_led | boolean | disk LED 是否启用 |
| heartbeat\_led | boolean | heartbeat LED 是否启用 |
| power\_led | boolean | power LED 是否启用 |

**Example response:**

```json
{
  "disk_led": true,
  "heartbeat_led": true,
  "power_led": false
}
```

</ApiEndpoint>

<ApiEndpoint path="/os/boards/yellow" method="post">

如果在 yellow board 上运行，更改其一个或多个 settings。

**Payload:**

| key | type | description |
|-----|------|-------------|
| disk\_led | boolean | 启用/禁用 disk LED |
| heartbeat\_led | boolean | 启用/禁用 heartbeat LED |
| power\_led | boolean | 启用/禁用 power LED |

</ApiEndpoint>

<ApiEndpoint path="/os/boards/green" method="get">

如果在 green board 上运行，返回其 settings 的当前值。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| activity\_led | boolean | green activity LED 是否启用 |
| power\_led | boolean | white power LED 是否启用 |
| system\_health\_led | boolean | yellow system health LED 是否启用 |

**Example response:**

```json
{
  "activity_led": true,
  "power_led": true,
  "system_health_led": false
}
```

</ApiEndpoint>

<ApiEndpoint path="/os/boards/green" method="post">

如果在 green board 上运行，更改其一个或多个 settings。

**Payload:**

| key | type | description |
|-----|------|-------------|
| activity\_led | boolean | 启用/禁用 green activity LED |
| power\_led | boolean | 启用/禁用 white power LED |
| system\_health\_led | boolean | 启用/禁用 yellow system health LED |

</ApiEndpoint>

<ApiEndpoint path="/os/boards/raspberrypi/firmware" method="get">

返回 Raspberry Pi firmware 信息。在 Raspberry Pi 4 / 5 和 OS Agent 版本至少为 1.9.0 的 Home Assistant Yellow 上可用。报告的版本涵盖捆绑的 firmware payload（bootloader EEPROM 和 VL805 USB controller（如果存在））。如果 OS Agent 版本早于 1.9.0 则返回 `404`，如果运行中的 board 没有 Raspberry Pi firmware 接口则返回 `400`。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| current\_version | string | 当前安装的 firmware 版本 |
| latest\_version | string | OS 中捆绑的最新 firmware 版本 |
| update\_available | boolean | `latest_version` 比 `current_version` 新时为 `true` |
| update\_blocked | boolean | 当前 boot 设备或 board configuration 阻止捆绑的 updater 应用时为 `true` |
| update\_pending | boolean | 已应用 firmware 更新但系统尚未重启时为 `true` |
| blocked\_reason | string or null | 当 `update_blocked` 为 `true` 时的阻止原因；否则为 `null`。参见下面注释。 |

每当 `update_blocked` 为 `true` 时，`blocked_reason` 始终为 `unsupported_boot_device`。根本原因各不相同（例如 USB/NVMe boot 设备，或禁用了 self-update 的 board）。未来可能会引入更具体的值。

**Example response:**

```json
{
  "current_version": "1765222194",
  "latest_version": "1778498402",
  "update_available": true,
  "update_blocked": false,
  "update_pending": false,
  "blocked_reason": null
}
```

</ApiEndpoint>

<ApiEndpoint path="/os/boards/raspberrypi/firmware/update" method="post">

应用捆绑的 Raspberry Pi firmware 更新（bootloader EEPROM 和 VL805（如果存在））。成功后，Supervisor 会提出 `reboot_required` issue；需要重启才能开始运行新 firmware。如果 OS Agent 版本早于 1.9.0 则返回 `404`，如果运行中的 board 没有 Raspberry Pi firmware 接口或该 board / boot 设备阻止了更新，则返回 `400`。

</ApiEndpoint>

### 分辨率

<ApiEndpoint path="/resolution/info" method="get">

**Returned data:**

| key | type | description |
|-----|------|-------------|
| unsupported | list | 安装被标记为 unsupported 的原因列表（container, dbus, docker\_configuration, docker\_version, lxc, network\_manager, os, privileged, systemd） |
| unhealthy | list | 安装被标记为 unhealthy 的原因列表（docker, supervisor, privileged, setup） |
| issues | list | [Issue models](api/supervisor/models.md#issue) 列表 |
| suggestions | list | [Suggestion models](api/supervisor/models.md#suggestion) actions 列表 |
| checks | list | [Check models](api/supervisor/models.md#check) 列表 |

**Example response:**

```json
{
  "unsupported": ["os"],
  "unhealthy": ["docker"],
  "issues": [
    {
      "uuid": "A89924620F9A11EBBDC3C403FC2CA371",
      "type": "free_space",
      "context": "system",
      "reference": null,
      "reference_extra": null
    }
  ],
  "suggestions": [
    {
      "uuid": "B9923620C9A11EBBDC3C403FC2CA371",
      "type": "clear_backups",
      "context": "system",
      "reference": null,
      "reference_extra": null,
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

应用一个建议的 action

</ApiEndpoint>

<ApiEndpoint path="/resolution/suggestion/<suggestion>" method="delete">

忽略一个建议的 action

</ApiEndpoint>

<ApiEndpoint path="/resolution/issue/<issue>/suggestions" method="get">

获取如果应用可以解决该 issue 的建议。

**Returned data:**

| key | type | description |
|-----|------|-------------|
| suggestions | list | [Suggestion models](api/supervisor/models.md#suggestion) actions 列表 |

**Example response:**

```json
{
  "suggestions": [
    {
      "uuid": "B9923620C9A11EBBDC3C403FC2CA371",
      "type": "clear_backups",
      "context": "system",
      "reference": null,
      "reference_extra": null,
      "auto": false
    }
  ]
}
```

</ApiEndpoint>

<ApiEndpoint path="/resolution/issue/<issue>" method="delete">

忽略一个 issue

</ApiEndpoint>

<ApiEndpoint path="/resolution/healthcheck" method="post">

执行 healthcheck 并自动修复和通知。

</ApiEndpoint>

<ApiEndpoint path="/resolution/check/<check>/options" method="post">

设置此 check 的 options。

**Payload:**

| key | type | description |
|-----|------|-------------|
| enabled | bool | check 应启用还是禁用 |

</ApiEndpoint>

<ApiEndpoint path="/resolution/check/<check>/run" method="post">

立即执行特定 check。

</ApiEndpoint>

### 服务

<ApiEndpoint path="/services" method="get">

**Returned data:**

| key | type | description |
|-----|------|-------------|
| services | dictionary | [Service models](api/supervisor/models.md#service) 字典 |

**Example response:**

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

**Returned data:**

| key | type | description |
|-----|------|-------------|
| addon | string | app 的 slug |
| host | string | 运行该 service 的 addon 的 IP |
| port | string | service 运行的端口 |
| ssl | boolean | 使用 SSL 时为 `true` |
| username | string | service 的 username |
| password | string | service 的 password |
| protocol | string | MQTT protocol |

**Example response:**

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

创建一个 service definition

**Payload:**

| key | type | description |
|-----|------|-------------|
| host | string | 运行该 service 的 addon 的 IP |
| port | string | service 运行的端口 |
| ssl | boolean | 使用 SSL 时为 `true` |
| username | string | service 的 username |
| password | string | service 的 password |
| protocol | string | MQTT protocol |

</ApiEndpoint>

<ApiEndpoint path="/services/mqtt" method="delete">

删除 service definitions

</ApiEndpoint>

<ApiEndpoint path="/services/mysql" method="get">

**Returned data:**

| key | type | description |
|-----|------|-------------|
| addon | string | app 的 slug |
| host | string | 运行该 service 的 addon 的 IP |
| port | string | service 运行的端口 |
| ssl | boolean | 使用 SSL 时为 `true` |
| username | string | service 的 username |
| password | string | service 的 password |
| protocol | string | MQTT protocol |

**Example response:**

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

创建一个 service definition

**Payload:**

| key | type | description |
|-----|------|-------------|
| host | string | 运行该 service 的 addon 的 IP |
| port | string | service 运行的端口 |
| username | string | service 的 username |
| password | string | service 的 password |

</ApiEndpoint>

<ApiEndpoint path="/services/mysql" method="delete">

删除 service definitions

</ApiEndpoint>

### 存储

<ApiEndpoint path="/store" method="get">

返回 app store 信息。

**Example response:**

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

返回 store apps 列表

**Example response:**

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

返回关于 store app 的信息

**Example response:**

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

从 store 安装一个 app。

**Payload:**

| key | type | description |
|-----|------|-------------|
| background | boolean | 立即返回 `job_id`，不等待安装完成。客户端必须检查 job 以获取 status |

</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/update" method="post">

从 store 更新一个 app。

**Payload:**

| key | type | description |
|-----|------|-------------|
| backup | boolean | 创建 app 的 partial backup，默认为 false |
| background | boolean | 立即返回 `job_id`，不等待更新完成。客户端必须检查 job 以获取 status |

</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/changelog" method="get">
获取 app 的 changelog。
</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/documentation" method="get">
获取 app 的 documentation。
</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/icon" method="get">
获取 app icon
</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/logo" method="get">
获取 app logo
</ApiEndpoint>

<ApiEndpoint path="/store/addons/<addon>/availability" method="get">

如果 app 的最新版本能够安装到当前系统上，则返回 200 成功状态。如果无法安装，则返回 400 错误状态，并附带说明原因的消息。

</ApiEndpoint>

<ApiEndpoint path="/store/reload" method="post">

重新加载关于 app 的存储信息。

</ApiEndpoint>

<ApiEndpoint path="/store/repositories" method="get">

返回 store repositories 列表

**Example response:**

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

向 store 添加一个 addon repository

**Payload:**

| key | type | description |
|-----|------|-------------|
| repository | string | 要添加到 store 的 addon repository URL。 |

**Example payload:**

```json
{
  "repository": "https://example.com/addons"
}
```

</ApiEndpoint>

<ApiEndpoint path="/store/repositories/<repository>" method="get">

返回关于 store repository 的信息

**Example response:**

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

从 store 移除一个未使用的 addon repository。

</ApiEndpoint>

<ApiEndpoint path="/store/repositories/<repository>/repair" method="post">

修复/重置 store 中缺失或显示不正确信息的 addon repository。

</ApiEndpoint>

### 安全

<ApiEndpoint path="/security/info" method="get">

返回关于 security features 的信息

**Returned data:**

| key | type | description |
|-----|------|-------------|
| pwned | bool | pwned 检查在 backend 上启用还是禁用 |
| force\_security | bool | force-security 在 backend 上启用还是禁用 |

**Example response:**

```json
{
  "pwned": true,
  "force_security": false,
}
```

</ApiEndpoint>

<ApiEndpoint path="/security/options" method="post">

**Payload:**

| key | type | description |
|-----|------|-------------|
| pwned | bool | 禁用/启用 pwned |
| force\_security | bool | 禁用/启用 force-security |

</ApiEndpoint>

### Supervisor

<ApiEndpoint path="/supervisor/info" method="get">

返回关于 supervisor 的信息

**Returned data:**

| key | type | description |
|-----|------|-------------|
| version | string | 已安装的 supervisor 版本 |
| version\_latest | string | 活动 channel 中最新发布的版本 |
| update\_available | boolean | 有更新可用时为 `true` |
| arch | string | host 的架构（armhf, aarch64, i386, amd64） |
| channel | string | 活动 channel（stable, beta, dev） |
| timezone | string | 当前 timezone |
| healthy | bool | supervisor 处于健康状态 |
| supported | bool | 环境受支持 |
| logging | string | 当前 log 级别（debug, info, warning, error, critical） |
| ip\_address | string | 指向 supervisor 的内部 docker IP 地址 |
| wait\_boot | int | boot 期间等待的最大时间 |
| debug | bool | Debug 已激活 |
| debug\_block | bool | 已启用 debug block 时为 `true` |
| diagnostics | bool or null | 已启用发送 diagnostics |
| addons\_repositories | list | app repository URL 字符串列表 |
| auto\_update | bool | 是否已为 supervisor 启用 auto update |
| detect\_blocking\_io | bool | Supervisor 针对事件循环中的 blocking I/O 抛出异常 |
| feature\_flags | dict | 开发 feature flag 名称与其启用状态的映射 |

**Example response:**

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
  "detect_blocking_io": false,
  "feature_flags": {
    "supervisor_v2_api": false
  }
}
```

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs" method="get">

通过 Systemd journal 后端获取 Supervisor 容器的 logs。如果
Systemd journal gateway 无法提供 logs，则以原始 Docker container logs 作为回退返回。

该 endpoint 接受与 `/host/logs` 相同的 headers 并提供相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs/follow" method="get">

与 `/supervisor/logs` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs/latest" method="get">

返回 Supervisor 容器最近一次启动的所有 logs。

`Range` header 被忽略，但可以使用 `lines` query 参数。

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs/boots/<bootid>" method="get">

获取与特定 boot 相关的 Supervisor 容器 logs。

`bootid` 参数的解释方式与 `/host/logs/boots/<bootid>` 中相同，该 endpoint 否则提供与 `/host/logs` 相同的功能。

</ApiEndpoint>

<ApiEndpoint path="/supervisor/logs/boots/<bootid>/follow" method="get">

与 `/supervisor/logs/boots/<bootid>` 相同，区别在于它会持续返回新的 log entries。

</ApiEndpoint>

<ApiEndpoint path="/supervisor/options" method="post">

更新 supervisor 的 options，你需要在 API 调用中至少提供一个 payload key。
更新 options 后，你需要调用 `/supervisor/reload`。

**Payload:**

| key | type | description |
|-----|------|-------------|
| channel | string | 设置活动 channel（stable, beta, dev） |
| timezone | string | 设置 timezone |
| wait\_boot | int | 设置等待 boot 的时间 |
| debug | bool | 启用 debug |
| debug\_block | bool | 启用 debug block |
| logging | string | 设置 logging 级别 |
| addons\_repositories | list | 设置 app repositories 的 URL 字符串列表 |
| auto\_update | bool | 为 supervisor 启用/禁用 auto update |
| detect\_blocking\_io | string | 启用事件循环中的 blocking I/O 检测。有效值为 `on`、`off` 和 `on_at_startup`。 |
| feature\_flags | dict | 部分更新开发 feature flags。Keys 为 feature flag 名称（例如 `supervisor_v2_api`），values 为布尔值。省略的 keys 保持不变。 |

</ApiEndpoint>

<ApiEndpoint path="/supervisor/ping" method="get" unprotected>

向 supervisor 发送 Ping 以检查它是否能返回响应。

</ApiEndpoint>

<ApiEndpoint path="/supervisor/reload" method="post">

重新加载 supervisor 的部分内容，这将启用新的 options 并检查更新。

</ApiEndpoint>

<ApiEndpoint path="/supervisor/restart" method="post">

重启 supervisor，有助于让 supervisor 恢复健康状态。

</ApiEndpoint>

<ApiEndpoint path="/supervisor/repair" method="post">

修复 docker overlay 问题和丢失的镜像。

</ApiEndpoint>

<ApiEndpoint path="/supervisor/stats" method="get">

为 supervisor 返回一个 [Stats model](api/supervisor/models.md#stats)。

**Example response:**

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

更新 supervisor

**Payload:**

| key | type | description |
|-----|------|-------------|
| version | string | 要安装的版本。默认为最新版本。仅限开发：仅在 Supervisor 开发环境中有效。 |

</ApiEndpoint>

### 占位符

一些 endpoints 在 endpoint URL 中使用以 `<...>` 表示的占位符。

| placeholder | description |
|-------------|-------------|
| addon | addon 的 slug。要获取 slug，可以调用 `/addons`。要为调用 endpoint 的 app 调用 endpoints，可以使用 `self` 作为 slug。 |
| application | application 名称。调用 `/audio/info` 获取正确的名称 |
| backup | 有效的 backup slug，例如 `skuwe823`。要获取 slug，可以调用 `/backups` |
| bootid | 特定 boot 的 id 或偏移量，用于筛选 logs。调用 `/host/logs/boots` 获取 boot ids 列表，或查看 `/host/logs/boots/<bootid>` 以了解 boot 偏移量 |
| check | Supervisor resolution manager 中 system check 的 slug。调用 `/resolution/info` 从 `checks` 字段获取选项列表 |
| disk | 附加到 host 的 disk 标识符或 `default`。查看 `/host/disks/<disk>/usage` 获取更多细节 |
| id | 特定 interface 上 vlan 的数值 id。查看 `/network/interface/<interface>/vlan/<id>` 获取细节 |
| identifier | 用于筛选 logs 的 syslog identifier。调用 `/host/logs/identifiers` 获取选项列表。查看 `/host/logs/identifiers/<identifier>` 了解一些常见示例 |
| interface | 有效的 interface 名称，例如 `eth0`。要获取 interface 名称，可以调用 `/network/info`。可以使用 `default` 获取 primary interface |
| issue | Supervisor 识别的系统 issue 的 UUID。调用 `/resolution/info` 从 `issues` 字段获取选项列表 |
| job\_id | 当前运行或已完成的 Supervisor job 的 UUID |
| name | 添加到 Supervisor 的 mount 名称。调用 `/mounts` 从 `mounts` 字段获取选项列表 |
| registry | 在 container registry configuration 中定义的 registry hostname。要获取 hostname，可以调用 `/docker/registries` |
| repository | 添加到 Supervisor 的 addon repository 的 slug。调用 `/store` 从 `repositories` 字段获取选项列表 |
| service | host 上 service 的 service name。 |
| suggestion | Supervisor 识别的系统 issue 的 suggestion 的 UUID。调用 `/resolution/info` 从 `suggestions` 字段获取选项列表 |
| uuid | discovery service 的 UUID。要获取 UUID，可以调用 `/discovery` |
