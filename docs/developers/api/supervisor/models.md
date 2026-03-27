---
title: "模型"
description: '这些模型用于描述 Supervisor API 返回的对象。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 模型

这些模型用于描述 Supervisor API 返回的对象。

## App（旧称 add-on）

| 键 | 类型 | 说明 |
| ---------------- | -------------- | ----------------------------------------------------- |
| name             | string         | 应用名称 |
| slug             | string         | 应用 slug |
| advanced         | boolean        | `true` 表示仅对高级用户可见 |
| description      | string         | 应用说明 |
| repository       | string         | 应用来源仓库 |
| version          | string or null | 应用已安装版本 |
| version_latest   | string         | 应用当前发布的最新版本 |
| update_available | boolean        | `true` 表示有可用更新 |
| installed        | string         | `true` 表示该应用已安装 |
| available        | boolean        | `false` 表示该应用无法安装 |
| icon             | bool           | 应用是否有图标文件 |
| logo             | bool           | 应用是否有 logo 文件 |
| state            | string         | 应用状态（started、stopped） |
| system_managed   | bool           | 表示该应用是否由 Home Assistant 管理 |

## Application

| 键 | 类型 | 说明 |
| ------------ | ------- | -------------------------------------- |
| name         | string  | 应用名称 |
| index        | int     | TODO：这是什么？ |
| stream_index | int     | TODO：这是什么？ |
| stream_type  | string  | 流的类型（INPUT、OUTPUT） |
| volume       | float   | 当前音量 |
| mute         | boolean | `true` 表示该应用已静音 |
| addon        | string  | 应用 slug |

## Audio

| 键 | 类型 | 说明 |
| ----------- | ---- | ----------------------------------------------- |
| card        | list | [Card 模型](#card)列表 |
| input       | list | [音频设备模型](#audio-device)列表 |
| output      | list | [输出设备模型](#audio-device)列表 |
| application | list | [Application 模型](#application)列表 |

## Audio device

| 键 | 类型 | 说明 |
| ------------ | ----------- | -------------------------------------------- |
| name         | string      | 设备名称 |
| index        | int         | TODO：这是什么？ |
| description  | string      | 设备说明 |
| volume       | float       | 当前音量 |
| mute         | string      | `true` 表示设备已静音 |
| default      | string      | `true` 表示该设备为默认设备 |
| card         | int or null | TODO：这是什么？ |
| applications | string      | [Application 模型](#application)列表 |

## Audio profile

| key         | type    | description                     |
| ----------- | ------- | ------------------------------- |
| name        | string  | The name of the profile         |
| description | string  | The description of the profile  |
| active      | boolean | `true` if the profile is active |

## Card

| key      | type   | description                                      |
| -------- | ------ | ------------------------------------------------ |
| name     | string | The name of the card                             |
| index    | int    | TODO: What is this?                              |
| driver   | string | The name of the card driver                      |
| profiles | list   | A list of [Audio profile models](#audio-profile) |

## Discovery

| key     | type   | description               |
| ------- | ------ | ------------------------- |
| addon   | string | The app slug           |
| service | string | The service name          |
| uuid    | string | The UUID of the discovery |
| config  | dict   | The configuration         |

## Host service

| key         | type   | description             |
| ----------- | ------ | ----------------------- |
| name        | string | The service name        |
| description | string | The service description |
| state       | string | The service state       |

## Network interface

| key         | type    | description                                                                                   |
| ----------- | ------- | --------------------------------------------------------------------------------------------- |
| interface   | string  | The interface name i.e eth0.                                                                  |
| type        | string  | The interface type: `ethernet`, `wireless` or `vlan`.                                         |
| enabled     | boolean | Return True if the interface is enabled.                                                      |
| connected   | boolean | Return True if the interface is connected to the network.                                     |
| primary     | boolean | `true` if it's the primary network interface.                                                 |
| ipv6        | struct or null  | An [IPv6 configuration](#ipv6-configuration) struct with IPv6 connection details.     |
| ipv4        | struct or null  | An [IPv4 configuration](#ipv4-configuration) struct with IPv4 connection details.     |
| wifi        | struct or null  | A [Wifi configuration](#wifi-configuration) struct with wireless connection details.  |
| vlan        | struct or null  | A [VLAN configuration](#vlan-configuration) struct with details about the vlan.       |

### IPv6 configuration

| key           | type    | description                                                                                 |
| ------------- | ------- | ------------------------------------------------------------------------------------------- |
| method        | string  | The method used to set the IP can be `static`, `auto` or `disabled`.                        |
| addr_gen_mode | string  | Address generation mode can be `eui64` or `stable-privacy`, `default-or-eui64` or `default` |
| ip6_privacy   | string  | Privacy extensions options are `disabled`, `enabled-prefer-public`, `enabled` or `default`  |
| address       | list    | A list with IP address and the netmask in a ::/XXX format.                                  |
| gateway       | string  | The IP address of the gateway.                                                              |
| nameservers   | list    | A list containing the IP addresses of the configured nameservers as strings.                |
| route_metric  | int     | Route metric. Lower value has higher priority. The kernel accepts zero (0) but coerces it to 1024 (user default). |

### IPv4 configuration

| key          | type    | description                                                                  |
| ------------ | ------- | ---------------------------------------------------------------------------- |
| method       | string  | The method used to set the IP can be `static`, `auto` or `disabled`.         |
| address      | list    | A list with IP address and the netmask in a X.X.X.X/XX format.               |
| gateway      | string  | The IP address of the gateway.                                               |
| nameservers  | list    | A list containing the IP addresses of the configured nameservers as strings. |
| route_metric | int     | Route metric. Lower value has higher priority.                               |

### Wifi configuration

| key         | type    | description                                                                  |
| ----------- | ------- | ---------------------------------------------------------------------------- |
| mode        | string  | Set the mode `infrastructure`, `mesh`, `adhoc` or `ap`.                      |
| auth        | string  | Set the auth mode: `open`, `web` or `wpa-psk`.                               |
| ssid        | string  | Set the SSID for the Wireless.                                               |
| signal      | integer | Percentage of signal strength.                                               |

### VLAN configuration

| key     | type    | description                                                                  |
| ------- | ------- | ---------------------------------------------------------------------------- |
| id      | integer | The VLAN ID.                                                                 |
| parent  | string  | Parent interface which is the vlan attached.                                 |

## 接入点

| key        | type    | description                                                                  |
| ---------- | ------- | ---------------------------------------------------------------------------- |
| mode       | string  | One of: `infrastructure`, `mesh` or `adhoc`.                                 |
| ssid       | string  | Wireless network ID.                                                         |
| frequency  | integer | The operating frequency of this Access Point.                                |
| signal     | integer | Percentage of signal strength.                                               |
| mac        | string  | MAC Address of the Access Point.                                             |

## Panel

| key    | type    | description                            |
| ------ | ------- | -------------------------------------- |
| enable | boolean | `true` if it's enabled                 |
| icon   | string  | The sidebar icon                       |
| title  | string  | The sidebar title                      |
| admin  | boolean | `true` if it's for admin accounts only |

## Repository

| key        | type           | description                           |
| ---------- | -------------- | ------------------------------------- |
| slug       | string         | The repository slug                   |
| name       | string         | The name of the repository            |
| source     | string         | The URL to the repository             |
| url        | string or null | URL for repository website            |
| maintainer | string         | The name of the repository maintainer |

## Service

| key       | type    | description                         |
| --------- | ------- | ----------------------------------- |
| slug      | string  | The service slug                    |
| available | boolean | `true` if the service is available  |
| providers | list    | A list of providers for the service |

## Backup

| key       | type    | description                                                                |
| --------- | ------- | -------------------------------------------------------------------------- |
| slug      | string  | A generated slug for the backup                                            |
| date      | string  | ISO date string representation of the date the backup was created          |
| name      | string  | The name given to the backup                                               |
| type      | string  | The type of backup (full, partial)                                         |
| protected | boolean | `true` if the backup is password protected                                 |
| content | dictionary | Details of the backup content. See [Backup -> content](#backup---content) |
| compressed | boolean | `true` if the backup is saved in a compressed archive                     |

### 备份 -> content

备份对象中的 `content` 键包含以下字段：

| key       | type    | description                                                           |
| --------- | ------- | --------------------------------------------------------------------- |
| homeassistant      | boolean  | `true` if the backup contains homeassistant
| addons      | list  | A list of app slugs included in the backup
| folders      | list  | A list of folder names included in the backup

## Backup details

| key                            | type           | description                                                                                                               |
| ------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| slug                           | string         | A generated slug for the backup                                                                                           |
| type                           | string         | The type of backup (full, partial)                                                                                        |
| name                           | string         | The name given to the backup                                                                                              |
| date                           | string         | ISO date string representation of the date the backup was created                                                         |
| size                           | string         | The size of the backup in MB                                                                                              |
| protected                      | boolean        | `true` if the backup is password protected                                                                                |
| location                       | string or null | The name of the backup mount it's stored on.  `null` if it's stored locally.                                              |
| homeassistant                  | string         | The version of Home Assistant that was in use                                                                             |
| addons                         | list           | A list of apps in the backup. Apps are represented as a dictionary with these keys [`slug`,`name`,`version`,`size`] |
| repositories                   | list           | A list of app repository URL's as strings                                                                              |
| folders                        | list           | A list of strings representing directories                                                                                |
| homeassistant_exclude_database | boolean        | `true` if the Home Assistant database file was excluded from this backup                                                  |

## Stats

| key            | type  | description                               |
| -------------- | ----- | ----------------------------------------- |
| cpu_percent    | float | The percentage of the CPU that is used    |
| memory_usage   | int   | The current memory usage in bytes         |
| memory_limit   | int   | The max allowed memory usage in bytes     |
| memory_percent | float | The percentage of the memory that is used |
| network_tx     | int   | Network transmission usage                |
| network_rx     | int   | Network receiver usage                    |
| blk_read       | int   | File system read usage                    |
| blk_write      | int   | File system write usage                   |

## Issue

| key       | type        | description                                         |
| ----------| ----------- | --------------------------------------------------- |
| uuid      | str         | A generated uuid as issue ID                        |
| type      | str         | Type of the issue                                   |
| context   | str         | In which context the issue occurs                   |
| reference | str or null | Depend on the Context, a reference to another Model |

## Suggestion

| key       | type        | description                                         |
| ----------| ----------- | --------------------------------------------------- |
| uuid      | str         | A generated uuid as suggestion ID                   |
| type      | str         | Type of the suggestion                              |
| context   | str         | In which context the suggestion occurs              |
| reference | str or null | Depend on the Context, a reference to another Model |
| auto      | bool        | True if the suggested fix will be auto-applied      |

## Check

| key       | type        | description                                         |
| ----------| ----------- | --------------------------------------------------- |
| slug      | str         | A generated slug for the check                      |
| enable    | bool        | The enabled state of the check                      |

## Device

| key        | type           | description                                                           |
| ---------- | -------------- | --------------------------------------------------------------------- |
| name       | string         | Name of the device object                                             |
| sysfs      | string         | Path to sysfs device object                                           |
| dev_path   | string         | Path to devfs                                                         |
| subsystem  | string or null | Subsystem type of the device (tty, input, sound, block, misc)         |
| parent     | string or null | Path to the parent sysfs device object                                |
| by_id      | string or null | Udev by ID link                                                       |
| attributes | dict           | A dict with pure udev device attributes for debug and understanding   |
| children   | list           | A list of path to the children sysfs devices                          |

## Disk

| key        | type           | description                                                            |
| ---------- | -------------- | ---------------------------------------------------------------------- |
| name       | string         | Name of the disk device                                                |
| vendor     | string         | Vendor of the disk device                                              |
| model      | string         | Model of the disk device                                               |
| serial     | string         | Serial number of the disk device                                       |
| size       | int            | Size of disk in bytes                                                  |
| id         | string         | Unique ID for the disk device (either UDisks2 drive ID or device path) |
| dev_path   | string         | Device path for the disk device                                        |

## Mount

| key        | type           | description                                                            | request/response |
| ---------- | -------------- | ---------------------------------------------------------------------- | ---------------- |
| name       | string         | Name of the mount                                                      | both             |
| type       | string         | Type of the mount (cifs or nfs)                                        | both             |
| usage      | string         | Usage of the mount (backup, media, or share)                           | both             |
| server     | string         | IP address or hostname of the network share server                     | both             |
| port       | int            | Port to use (if not using the standard one for the mount type)         | both             |
| read_only  | bool           | Mount is read-only (not available for backup mounts)                   | both             |
| path       | string         | (nfs mounts only) Path to mount from the network share                 | both             |
| share      | string         | (cifs mounts only) Share to mount from the network share               | both             |
| username   | string         | (cifs mounts only) Username to use for authentication                  | request only     |
| password   | string         | (cifs mounts only) Password to use for authentication                  | request only     |
| state      | string         | Current state of the mount (active, failed, etc.)                      | response only    |

仅请求字段可以出现在请求中，但永远不会出现在响应里。
仅响应字段会出现在响应中，但不能包含在请求里。

## Job

| key        | type    | description                                                   |
| ---------- | ------- | ------------------------------------------------------------- |
| name       | string  | Name of the job                                               |
| reference  | string  | A unique ID for instance the job is acting on (if applicable) |
| uuid       | string  | Unique ID of the job                                          |
| progress   | int     | Progress of the job (if accurate progress is obtainable)      |
| stage      | string  | A name for the stage the job is in (if applicable)            |
| done       | boolean | Is the job complete                                           |
| created    | string  | Date and time when job was created in ISO format              |
| child_jobs | list    | A list of child [jobs](#job) started by this one              |
| errors     | list    | A list of [errors](#job-error) that occurred during execution |
| extra      | dictionary or null | Additional metadata relevant to the job or stage (if applicable) |

## Job error

| key        | type    | description                                    |
| ---------- | ------- | ---------------------------------------------- |
| type       | string  | Type of error that occurred                    |
| message    | string  | Human-readable description of what went wrong  |
| stage      | string  | A name for the stage the job was in at the time the error occurred (if applicable) |

## Boot slot

| key        | type    | description                                     |
| ---------- | ------- | ----------------------------------------------- |
| state      | string  | Active or inactive (active slot is in use)      |
| status     | string  | Status of the last boot from slot (good or bad) |
| version    | string  | Version of OS installed                         |

## User

| key        | type    | description                                                   |
| ---------- | ------- | ------------------------------------------------------------- |
| username   | string  | Username used to login                                        |
| name       | string  | Name of the user                                              |
| is_owner   | boolean | Is the user the owner                                         |
| is_active  | boolean | Is the user active                                            |
| local_only | boolean | Can the user login from the network (e.g. via http)           |
| group_ids  | list    | Role(s) the user has (admin, etc)                             |

## Drive

| key            | type     | description                                                 |
| -------------- | -------- | ----------------------------------------------------------- |
| vendor         | string   | Drive vendor                                                |
| model          | string   | Drive model                                                 |
| serial         | string   | Drive serial number                                         |
| id             | string   | Unique and persistent id for drive                          |
| size           | int      | Size of the drive in bytes                                  |
| time_detected  | datetime | Time drive was detected by system                           |
| connection_bus | string   | Physical connection bus of the drive (USB, etc.)            |
| seat           | string   | Identifier of seat drive is plugged into                    |
| removable      | boolean  | Is the drive removable by the user?                         |
| ejectable      | boolean  | Is the drive ejectable by the system?                       |
| filesystems    | list     | A list of [filesystem partitions](#filesystem) on the drive |

## Filesystem

| key          | type    | description                                               |
| ------------ | ------- | --------------------------------------------------------- |
| device       | string  | Special device file for the filesystem (e.g. `/dev/sda1`) |
| id           | string  | Unique and persistent id for filesystem                   |
| size         | int     | Size of the filesystem in bytes                           |
| name         | string  | Name of the filesystem (if known)                         |
| system       | boolean | `true` if filesystem considered a system/internal device  |
| mount_points | list    | List of paths where the filesystem is mounted.            |
