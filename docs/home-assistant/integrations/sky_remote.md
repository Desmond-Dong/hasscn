---
title: Sky Remote Control
description: Sky Remote 集成允许您通过 Home Assistant 控制 Sky box。
ha_category:
  - Remote
ha_release: 2024.12
ha_domain: sky_remote
ha_config_flow: true
ha_codeowners:
  - '@dunnmj'
  - '@saty9'
ha_iot_class: Assumed State
ha_platforms:
  - remote
ha_integration_type: device
related:
  - docs: /docs/configuration/
    title: Configuration file
---

**Sky Remote Control** 集成可让您使用 Home Assistant 控制 [Sky](https://www.sky.com/) 机顶盒。

## 支持的型号

此集成适用于控制带 LAN 端口的 Sky+ HD 和 Sky Q 卫星接收盒，不支持控制 Sky Stream 盒子。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
host:
  description: "您的 Sky 设备的主机名或 IP 地址（例如 `192.168.1.250`）。通常可在 Sky 盒子的网络设置或路由器的 DHCP 客户端列表中找到。"
  required: true
  type: string
```

## Remote

Sky Remote 平台会为设备创建一个 [Remote](/home-assistant/integrations/remote/) 实体。您可以通过 `remote.send_command` 操作发送命令。

### 操作：发送命令

`remote.send_command` 操作用于向一台 Sky 盒子发送单个命令或一组命令。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | --------------------------------------------------- |
| `entity_id`            | 否       | 目标实体 ID。 |
| `command`              | 否       | 要发送的单个命令或命令列表。 |


发送多个命令的典型操作如下：

```yaml
action: remote.send_command
target:
  entity_id: remote.192_168_1_250
data:
  command:
    - sky
    - tvguide
```

### 可用命令

支持以下命令：

#### 电源与导航

- `power` - 打开或关闭 Sky 盒子
- `up`、`down`、`left`、`right` - 在菜单和节目指南中导航
- `select` - 确认选择
- `backup` - 返回上一个界面或上一步导航

#### 菜单访问

- `sky` - 退出菜单并返回直播电视
- `tvguide` - 打开电视节目指南
- `boxoffice` - 进入 Sky Box Office
- `services` - 进入 Sky 服务菜单
- `interactive` - 使用互动功能

#### 频道控制

- `channelup` - 切换到下一个频道，或翻到菜单下一页
- `channeldown` - 切换到上一个频道，或翻到菜单上一页

#### 信息与帮助

- `i` - 显示当前节目信息
- `text` - 在直播电视中访问文字服务
- `help` - 在直播电视中访问字幕或音频描述

#### 彩色快捷按钮

`red`、`green`、`yellow`、`blue` - 在用户界面中执行特定操作或打开选项。这些按钮的功能会因当前使用的菜单或应用而异。

#### 数字键盘

`0`、`1`、`2`、`3`、`4`、`5`、`6`、`7`、`8`、`9` - 用于输入频道号或 PIN 码的数字键

#### 播放控制

- `play` - 开始或恢复播放。
- `pause` - 暂停播放。
- `stop` - 完全停止播放。
- `record` - 开始录制当前节目或选中内容。
- `fastforward` - 快进播放。
- `rewind` - 倒退播放。

#### 仅限 SkyQ

- `sidebar` - 打开 SkyQ 侧边栏
- `dismiss` - 关闭互动内容
- `search` - 打开 SkyQ 搜索界面
- `home` - 打开 SkyQ 首页
