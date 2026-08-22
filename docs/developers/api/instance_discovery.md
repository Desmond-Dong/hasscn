---
title: "实例发现"
---

Home Assistant 会在本地网络上以 `_home-assistant._tcp.local.` mDNS/Zeroconf 服务的形式宣告自己。客户端（例如 companion apps）可以浏览该服务来发现实例，而无需向用户询问地址。

该服务在 [`frontend`](https://www.home-assistant.io/integrations/frontend/) 集成完成设置（或启动时）后注册，这样当记录发布时 HTTP 服务器已经启动并可达。

## 服务记录

| Field | Value |
| --- | --- |
| Service type | `_home-assistant._tcp.local.` |
| Instance name | `<location_name>.<service type>`。`location_name` 中的 `.` 会被替换为空格，并截断以符合 63-byte DNS label 限制。发生名称冲突时，Zeroconf 会追加后缀（`allow_name_change`）。 |
| Host (server) | `<uuid>.local.`，其中 `<uuid>` 为 instance ID。 |
| Port | HTTP server 端口。Home Assistant OS 安装默认为 `80`，其他为 `8123`，除非通过 `SETUP_PORT` 环境变量更改。 |

## TXT 属性

| Property | Meaning | Default |
| --- | --- | --- |
| `location_name` | 友好 instance 名称，来自 `hass.config.location_name`。 | 未配置名称时为 `Home` |
| `uuid` | instance ID（`core.uuid`）；一个稳定的、不透明的 32 位十六进制标识符。同样用作 host 名（`<uuid>.local.`）。 | 首次运行时生成 |
| `version` | [Home Assistant Core version](../versioning.md)。可选：客户端应将 optional 视为当前未知版本。这通常意味着 Core 尚未安装（例如初始设置期间显示的 landing page）。目前 landing page 以哨兵版本 `0000.0.0` 宣告。这不是有效的 Home Assistant Core 版本，仅是为绕过当前 Android 应用的限制。 | 当前 Core 版本 |
| `internal_url` | 内部/LAN URL，通过 `get_url(..., allow_external=False)` 解析。 | 不可用时为 `""` |
| `external_url` | 外部 URL，通过 `get_url(..., allow_internal=False)` 解析。 | 不可用时为 `""` |
| `base_url` | 已弃用；为向后兼容保留。设置为 `external_url`，或无外部 URL 时为 `internal_url`。 | 两者都不可用时为 `""` |
| `requires_api_password` | 遗留标志，始终宣告为 `True`。其引用的 `api_password` 认证机制已在 [0.90 中弃用](https://github.com/home-assistant/core/pull/21884)，并在 [2024.7.0 中移除](https://github.com/home-assistant/core/pull/119976)，因此该标志现已无意义。客户端不应再解析它。 | `True` |
| `landingpage` | 仅在 Core 设置完成之前由 [landing page](https://github.com/home-assistant/landingpage) 发布的记录中存在，且设为 `True`。运行中的 Core 实例中不存在。 | 未设置 |

:::note

TXT property 值最多为 230 bytes（`key=value` 上限为 255）。任何超出该长度的值都会被抑制（替换为空字符串），以免破坏宣告。

:::