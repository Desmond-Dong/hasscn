---
title: "Models"
---

这些模型描述了从 supervisor API 返回的对象。

## 应用（原称 add-on）

| key | type | description |
|-----|------|-------------|
| name | string | app 的名称 |
| slug | string | app 的 slug |
| advanced | boolean | 已弃用且被忽略；自 Supervisor 2026.03.0 起始终为 `false` |
| description | string | app 的描述 |
| repository | string | app 来自的 repository |
| version | string or null | app 已安装的版本 |
| version_latest | string | app 最新发布版本 |
| update_available | boolean | 有更新可用时为 `true` |
| installed | string | 已安装时为 `true` |
| available | boolean | 无法安装时为 `false` |
| icon | bool | app 拥有 icon 文件 |
| logo | bool | app 拥有 logo 文件 |
| state | string | app 的 state（started, stopped） |
| system_managed | bool | 指示该 app 是否由 Home Assistant 管理 |

## 应用

| key | type | description |
|-----|------|-------------|
| name | string | application 名称 |
| index | int | TODO: What is this? |
| stream_index | int | TODO: What is this? |
| stream_type | string | stream 的类型（INPUT, OUTPUT） |
| volume | float | 当前音量 |
| mute | boolean | 该 application 被静音时为 `true` |
| addon | string | app 的 slug |

## 音频

| key | type | description |
|-----|------|-------------|
| card | list | [Card models](#card) 列表 |
| input | list | [Audio device models](#audio-device) 列表 |
| output | list | [Output device models](#audio-device) 列表 |
| application | list | [Application models](#application) 列表 |

## 音频设备

| key | type | description |
|-----|------|-------------|
| name | string | 设备名称 |
| index | int | TODO: What is this? |
| description | string | 设备描述 |
| volume | float | 当前音量 |
| mute | string | 设备被静音时为 `true` |
| default | string | 设备为默认时为 `true` |
| card | int or null | TODO: What is this? |
| applications | string | [Application models](#application) 列表 |

## 音频配置文件

| key | type | description |
|-----|------|-------------|
| name | string | profile 名称 |
| description | string | profile 描述 |
| active | boolean | 该 profile 处于活动状态时为 `true` |

## 卡片

| key | type | description |
|-----|------|-------------|
| name | string | card 名称 |
| index | int | TODO: What is this? |
| driver | string | card driver 名称 |
| profiles | list | [Audio profile models](#audio-profile) 列表 |

## 发现

| key | type | description |
|-----|------|-------------|
| addon | string | app 的 slug |
| service | string | 服务名称 |
| uuid | string | discovery 的 UUID |
| config | dict | 配置 |

## 主机服务

| key | type | description |
|-----|------|-------------|
| name | string | 服务名称 |
| description | string | 服务描述 |
| state | string | 服务 state |

## 网络接口

| key | type | description |
|-----|------|-------------|
| interface | string | 接口名称，例如 eth0。 |
| type | string | 接口类型：`ethernet`、`wireless` 或 `vlan`。 |
| enabled | boolean | 接口已启用时返回 True。 |
| connected | boolean | 接口已连接到网络时返回 True。 |
| primary | boolean | 为主网络接口时为 `true`。 |
| ipv6 | struct or null | 包含 IPv6 连接详情的 [IPv6 configuration](#ipv6-configuration) struct。 |
| ipv4 | struct or null | 包含 IPv4 连接详情的 [IPv4 configuration](#ipv4-configuration) struct。 |
| wifi | struct or null | 包含无线连接详情的 [Wifi configuration](#wifi-configuration) struct。 |
| vlan | struct or null | 包含 vlan 详情的 [VLAN configuration](#vlan-configuration) struct。 |

### IPv6 configuration

| key | type | description |
|-----|------|-------------|
| method | string | 设置 IP 的方法可以是 `static`、`auto` 或 `disabled`。 |
| addr_gen_mode | string | Address generation mode 可以是 `eui64` 或 `stable-privacy`、`default-or-eui64` 或 `default` |
| ip6_privacy | string | Privacy extensions 选项有 `disabled`、`enabled-prefer-public`、`enabled` 或 `default` |
| address | list | 包含 IP 地址和 netmask 的列表，格式为 ::/XXX。 |
| gateway | string | 网关的 IP 地址。 |
| nameservers | list | 包含配置的 nameservers IP 地址的字符串列表。 |
| route_metric | int | Route metric。值越低优先级越高。内核接受零（0）但会将其强制转换为 1024（用户默认值）。 |

### IPv4 configuration

| key | type | description |
|-----|------|-------------|
| method | string | 设置 IP 的方法可以是 `static`、`auto` 或 `disabled`。 |
| address | list | 包含 IP 地址和 netmask 的列表，格式为 X.X.X.X/XX。 |
| gateway | string | 网关的 IP 地址。 |
| nameservers | list | 包含配置的 nameservers IP 地址的字符串列表。 |
| route_metric | int | Route metric。值越低优先级越高。 |

### Wi-Fi 配置

| key | type | description |
|-----|------|-------------|
| mode | string | 设置模式 `infrastructure`、`mesh`、`adhoc` 或 `ap`。 |
| auth | string | 设置 auth 模式：`open`、`web` 或 `wpa-psk`。 |
| ssid | string | 为 Wireless 设置 SSID。 |
| signal | integer | 信号强度百分比。 |

### VLAN configuration

| key | type | description |
|-----|------|-------------|
| id | integer | VLAN ID。 |
| parent | string | VLAN 附加到的父接口。 |

## 接入点

| key | type | description |
|-----|------|-------------|
| mode | string | 之一：`infrastructure`、`mesh` 或 `adhoc`。 |
| ssid | string | Wireless 网络 ID。 |
| frequency | integer | 此 Access Point 的工作频率。 |
| signal | integer | 信号强度百分比。 |
| mac | string | Access Point 的 MAC Address。 |

## 面板

| key | type | description |
|-----|------|-------------|
| enable | boolean | 已启用时为 `true` |
| icon | string | sidebar icon |
| title | string | sidebar title |
| admin | boolean | 仅供 admin 账户使用时为 `true` |

## 仓库

| key | type | description |
|-----|------|-------------|
| slug | string | repository slug |
| name | string | repository 名称 |
| source | string | 指向 repository 的 URL |
| url | string or null | repository website 的 URL |
| maintainer | string | repository 维护者名称 |

## 服务

| key | type | description |
|-----|------|-------------|
| slug | string | service slug |
| available | boolean | 服务可用时为 `true` |
| providers | list | 该服务的 providers 列表 |

## 备份

| key | type | description |
|-----|------|-------------|
| slug | string | 为 backup 生成的 slug |
| date | string | backup 创建日期的 ISO 日期字符串表示 |
| name | string | 赋予 backup 的名称 |
| type | string | backup 的类型（full, partial） |
| protected | boolean | backup 受密码保护时为 `true` |
| content | dictionary | backup content 详情。参见 [Backup -> content](#backup---content) |
| compressed | boolean | backup 以压缩归档保存时为 `true` |

### 备份到内容

Backup 对象的 `content` key 包含以下 key：

| key | type | description |
|-----|------|-------------|
| homeassistant | boolean | backup 包含 homeassistant 时为 `true` |
| addons | list | backup 中包含的 app slugs 列表 |
| folders | list | backup 中包含的文件夹名称列表 |

## 备份 details

| key | type | description |
|-----|------|-------------|
| slug | string | 为 backup 生成的 slug |
| type | string | backup 的类型（full, partial） |
| name | string | 赋予 backup 的名称 |
| date | string | backup 创建日期的 ISO 日期字符串表示 |
| size | string | backup 大小（MB） |
| protected | boolean | backup 受密码保护时为 `true` |
| location | string or null | backup 存储所在的 backup mount 名称。本地存储时为 `null`。 |
| homeassistant | string | 当时使用的 Home Assistant 版本 |
| addons | list | backup 中的 apps 列表。Apps 以字典形式表示，包含这些 key：[`slug`,`name`,`version`,`size`] |
| repositories | list | app repository URL 字符串列表 |
| folders | list | 表示目录的字符串列表 |
| homeassistant_exclude_database | boolean | Home Assistant 数据库文件被从此 backup 中排除时为 `true` |

## 统计

| key | type | description |
|-----|------|-------------|
| cpu_percent | float | 已使用的 CPU 百分比 |
| memory_usage | int | 当前内存使用量（字节） |
| memory_limit | int | 允许的最大内存使用量（字节） |
| memory_percent | float | 已使用的内存百分比 |
| network_tx | int | 网络发送使用量 |
| network_rx | int | 网络接收使用量 |
| blk_read | int | 文件系统读取使用量 |
| blk_write | int | 文件系统写入使用量 |

## 问题

| key | type | description |
|-----|------|-------------|
| uuid | str | 作为 issue ID 的生成 uuid |
| type | str | issue 类型 |
| context | str | issue 发生的上下文 |
| reference | str or null | 取决于上下文；对另一个 model 的引用（例如 app slug） |
| reference_extra | dict or null | 关于该 issue 的额外上下文特定元数据（例如哪个端口存在冲突） |

## 建议

| key | type | description |
|-----|------|-------------|
| uuid | str | 作为 suggestion ID 的生成 uuid |
| type | str | suggestion 类型 |
| context | str | suggestion 发生的上下文 |
| reference | str or null | 取决于上下文；对另一个 model 的引用（例如 app slug） |
| reference_extra | dict or null | 关于该 suggestion 的额外上下文特定元数据（例如要清除哪个端口） |
| auto | bool | 建议的修复将自动应用时为 True |

## 检查

| key | type | description |
|-----|------|-------------|
| slug | str | 为 check 生成的 slug |
| enable | bool | check 的启用状态 |

## 设备

| key | type | description |
|-----|------|-------------|
| name | string | 设备对象名称 |
| sysfs | string | 指向 sysfs 设备对象的路径 |
| dev_path | string | 指向 devfs 的路径 |
| subsystem | string or null | 设备的 subsystem 类型（tty, input, sound, block, misc） |
| parent | string or null | 指向父 sysfs 设备对象的路径 |
| by_id | string or null | Udev by ID 链接 |
| attributes | dict | 包含用于调试和理解的纯 udev 设备 attributes 的 dict |
| children | list | 指向子 sysfs 设备的路径列表 |

## 磁盘

| key | type | description |
|-----|------|-------------|
| name | string | 磁盘设备名称 |
| vendor | string | 磁盘设备厂商 |
| model | string | 磁盘设备型号 |
| serial | string | 磁盘设备的序列号 |
| size | int | 磁盘大小（字节） |
| id | string | 磁盘设备的唯一 ID（UDisks2 drive ID 或设备路径） |
| dev_path | string | 磁盘设备的设备路径 |

## 挂载

| key | type | description | request/response |
|-----|------|-------------|------------------|
| name | string | mount 名称 | both |
| type | string | mount 类型（cifs 或 nfs） | both |
| usage | string | mount 用途（backup, media, 或 share） | both |
| server | string | 网络共享服务器的 IP 地址或主机名 | both |
| port | int | 要使用的端口（如果不使用该 mount 类型的标准端口） | both |
| read_only | bool | mount 为只读（不适用于 backup mounts） | both |
| path | string | (仅 nfs mounts) 从网络共享挂载的路径 | both |
| share | string | (仅 cifs mounts) 从网络共享挂载的 share | both |
| username | string | (仅 cifs mounts) 用于认证的 username | request only |
| password | string | (仅 cifs mounts) 用于认证的 password | request only |
| state | string | mount 的当前 state（active, failed 等） | response only |

Request only 字段可以包含在 requests 中，但永远不会出现在 responses 中。
Response only 字段会出现在 responses 中，但不能包含在 requests 中。

## 任务

| key | type | description |
|-----|------|-------------|
| name | string | job 名称 |
| reference | string | job 所作用的实例的唯一 ID（如果适用） |
| uuid | string | job 的唯一 ID |
| progress | int | job 的进度（如果可以获得准确的进度） |
| stage | string | job 所处 stage 的名称（如果适用） |
| done | boolean | job 是否完成 |
| created | string | job 创建的日期和时间（ISO 格式） |
| child_jobs | list | 由该 job 启动的子[jobs](#job)列表 |
| errors | list | 执行期间发生的[errors](#job-error)列表 |
| extra | dictionary or null | 与该 job 或 stage 相关的额外元数据（如果适用） |

## 任务错误

| key | type | description |
|-----|------|-------------|
| type | string | 发生的错误类型 |
| message | string | 出错情况的人类可读描述 |
| stage | string | 错误发生时 job 所处 stage 的名称（如果适用） |

## 启动槽位

| key | type | description |
|-----|------|-------------|
| state | string | Active 或 inactive（active slot 正在使用中） |
| status | string | 从该 slot 最后一次启动的状态（good 或 bad） |
| version | string | 已安装 OS 的版本 |

## 用户

| key | type | description |
|-----|------|-------------|
| username | string | 用于登录的 Username |
| name | string | 用户名称 |
| is_owner | boolean | 该用户是否为 owner |
| is_active | boolean | 该用户是否 active |
| local_only | boolean | 用户能否从网络登录（例如通过 http） |
| group_ids | list | 用户拥有的 role(s)（admin 等） |

## 驱动器

| key | type | description |
|-----|------|-------------|
| vendor | string | Drive vendor |
| model | string | Drive 型号 |
| serial | string | Drive 序列号 |
| id | string | Drive 的唯一且持久 id |
| size | int | Drive 大小（字节） |
| time_detected | datetime | Drive 被系统检测到的时间 |
| connection_bus | string | Drive 的物理连接总线（USB 等） |
| seat | string | Drive 所插入的 seat 标识符 |
| removable | boolean | Drive 是否可由用户移除？ |
| ejectable | boolean | Drive 是否可由系统弹出？ |
| filesystems | list | Drive 上的[filesystem partitions](#filesystem)列表 |

## 文件系统

| key | type | description |
|-----|------|-------------|
| device | string | filesystem 的特殊设备文件（例如 `/dev/sda1`） |
| id | string | filesystem 的唯一且持久 id |
| size | int | filesystem 大小（字节） |
| name | string | filesystem 名称（如果已知） |
| system | boolean | filesystem 被视为 system/internal 设备时为 `true` |
| mount_points | list | filesystem 挂载的路径列表。 |