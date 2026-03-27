---
title: Sony PlayStation 4
description: 'Sony PlayStation 4 集成可让你控制 Sony PlayStation 4 主机(https://www.playstation.com/ps4/)。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media player
ha_release: 0.89
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@ktnrg45'
ha_domain: ps4
ha_platforms:
  - media_player
ha_integration_type: hub
---
# Sony PlayStation 4

**Sony PlayStation 4** 集成可让你控制 [Sony PlayStation 4 主机](https://www.playstation.com/ps4/)。

## 要求

- Android 或 iOS 设备
- 设备上已安装适用于 [Android](https://play.google.com/store/apps/details?id=com.playstation.mobile2ndscreen) 或 [iOS](https://apps.apple.com/app/id1201372796) 的 PS4 Second Screen App。

## 设置

1. 下载 Second Screen App，并确认你可以正常发现并控制 PlayStation 4。

:::important
继续之前，请先阅读下方“授予端口访问权限”部分。

:::
1. 前往 `Settings -> Integrations`，点击右下角的加号按钮，并从集成列表中选择 `PlayStation 4`。

2. 按照界面提示生成用户凭据。当出现包含多个字段的表单时，即表示此步骤已完成。

3. 在 PS4 上前往 Settings / Mobile App Connection Settings / Add Device，此时会显示一个 PIN 码。

4. 使用上一步中的 PIN 码填写表单字段，将 Home Assistant 与 PlayStation 4 配对。

- **注意：** 要找到正确的地区，请参阅 [Regions](#regions) 部分。

## 授予端口访问权限

PlayStation 4 集成在配置期间需要使用特权端口才能正常工作，具体为 UDP 987 端口和 TCP 997 端口。根据你的 Home Assistant 实例所运行的操作系统，可能需要手动允许使用这些特权端口。

:::warning
不要为了实现这一点而将 <b>Home Assistant Core</b> 实例本身以 <b>root</b> 或带有 <b>root/sudo 权限</b> 的方式运行。这会给宿主系统带来安全风险。

:::
具体实现方式因运行 Home Assistant 的操作系统而异。准确来说，需要让运行 Home Assistant 实例的 *Python 解释器* 能访问上述端口。

### Docker

使用 Docker 运行 Home Assistant 时，请确保 PS4 能发现 Home Assistant 容器。通常可以通过让 Home Assistant 容器使用 `host` 网络驱动来实现（创建容器时传入 `--net=host`，或在使用 `docker-compose` 时向 compose 文件添加 `network_mode: "host"`）。

## 配置

:::note
PlayStation 4 集成不使用 `configuration.yaml` 中的条目。你必须通过 `Integrations` 来配置此集成。

:::
## 地区

根据你的[地区](https://www.playstation.com/country-selector/index.html)，某些标题在 PlayStation Store 数据库中会有不同的 SKU。你必须在设置时选择具体地区，才能正确获取这些标题的封面图。如果找不到，集成会尝试在其他数据库中搜索正确的标题。

:::important
以下地区没有可用数据库，因此此集成无法使用：
中国、菲律宾、塞尔维亚、越南。

:::
## 媒体数据

PlayStation 4 集成会从你所在地区的 [PlayStation Store](https://store.playstation.com) 数据库中获取当前正在运行的游戏或应用信息。
  
有时该集成可能无法获取数据，或获取到错误数据。为解决此问题，集成允许你使用任意文本编辑器进行手动编辑。
  
### 格式

当集成从 PlayStation Store 获取数据后，会将其存储到与 "`configuration.yaml`" 所在目录相同位置的 `.ps4-games.json` 文件中。文件第一行为 `{`，最后一行为 `}`。在这两行之间，会为集成找到的每个游戏或应用写入缩进条目。请参见下方示例和表格：
  
```json
{
    "CUSA00129": {
        "locked": true,
        "media_content_type": "app",
        "media_image_url": "http://localhost:8123/local/image.jpg",
        "media_title": "Some App"
    },
    "CUSA00123": {
        "locked": false,
        "media_content_type": "game",
        "media_image_url": "https://somerandomurl.com/image.jpg",
        "media_title": "Some Game"
    }
}
```

| 字段 | 值 | 说明 |
| -------------------- | ------- | ---------------------------- |
| `locked`             | boolean | 必须为 `true` 或 `false` |
| `media_content_type` | string  | 必须为 `game` 或 `app` |
| `media_image_url`    | string  | 任意有效的图片 URL |
| `media_title`        | string  | 游戏或应用的标题 |

示例中的数据包含 2 个条目。

每个条目都以该标题的 SKU ID 开头，例如 `CUSA00000`，并带有名为 `locked` 的字段，其值为 `true` 或 `false`。每个条目的默认值均为 `false`。如果 `locked` 为 `true`，集成将不会覆盖该游戏或应用对应的数据。

`media_image_url` 的值可以是任意有效 URL，也包括 Home Assistant 实例中的 `local directory`。示例中的第一个条目指向位于 `config/www/` 目录下名为 `image.jpg` 的文件。
  
### 使用文本编辑器编辑

:::warning
继续之前，请先备份一份 `.ps4-games.json` 文件。如果格式有误，文件可能会被删除。

:::
编辑时，只需用文本编辑器打开该文件，找到你想修改的游戏或应用，修改相应的值后保存即可。下次你在主机上运行该游戏或应用时，更改就会生效。

## 动作

### 动作 `select_source`

打开新的应用/游戏，并关闭当前运行的应用/游戏。该游戏或应用必须位于实体的 source 列表中。你正常打开游戏时，它们会自动被添加。

| 数据属性 | 可选 | 示例 | 说明 |
| ---------------------- | -------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `entity_id`            | 否 | `media_player.ps4` | 你的 PlayStation 4 的实体 ID。 |
| `source`               | 否 | `Some Game` 或 `CUSA00123` | 你想打开的游戏/应用。可使用标题或 SKU ID，其中使用 SKU ID 最可靠。 |

### 动作 `send_command`

模拟在 PlayStation 4 上按下按钮。这里模拟的是 PS4 Second Screen App 可用的命令，不要与 DualShock 4 手柄按键混淆。

| 数据属性 | 可选 | 示例 | 说明 |
| ---------------------- | -------- | ------------------ | ------------------------------------- |
| `entity_id`            | 否 | `media_player.ps4` | 你的 PlayStation 4 的实体 ID。 |
| `command`              | 否 | `ps` | 你要发送的命令。 |

#### 可用命令

支持命令的完整列表。

| 命令 | 模拟按钮 |
| --------- | ------------------ |
| `ps`      | PS（PlayStation） |
| `ps_hold` | 长按 PS |
| `option`  | Option |
| `enter`   | Enter |
| `back`    | Back |
| `up`      | 向上滑动 |
| `down`    | 向下滑动 |
| `left`    | 向左滑动 |
| `right`   | 向右滑动 |

## 故障排查

### 封面图问题
如果你在 PS4 上运行的游戏/标题没有显示封面，或显示了错误封面，请在[这里](https://github.com/ktnrg45/pyps4-2ndscreen/issues)提交 issue。

请务必包含以下信息：
- 你的国家/地区

以及你 PS4 实体状态中以下属性的准确值：
- media_title
- media_content_id

## 高级用法

### 端口

该集成在运行时使用 UDP 1987 端口作为源端口；在配置期间，源端口为 UDP 1988。这些端口分配可用于配置防火墙规则。

如果这些端口无法使用，则会回退到随机端口。
