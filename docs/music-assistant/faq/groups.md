---
title: Frequently Asked Questions - Groups
description: Music Assistant 中的播放器分组功能
---

# 组

> [!CAUTION]
> **注意**
>
| 当组正在播放时，不要删除或禁用组中的播放器

Music Assistant 使用四种类型的组（这些在[分组播放器](/music-assistant/ui/#grouping-players)部分中概述，三种类型在下面详细描述），这提供了一种灵活的方式来组合播放器。当组开机时，无法再单独播放到组的各个成员。要单独播放到某个成员，必须关闭组或将单独的播放器从组中移除。如果组仍然开机，则只能从[临时同步组](#temporary-sync-group)或启用了动态成员选项的[同步组](#sync-groups)和[通用组](#universal-groups)中移除播放器。如果允许，可以使用[播放器列表](/music-assistant/ui/#player-list)中的复选框或使用 <a href="https://www.home-assistant.io/integrations/media_player/#media-control-actions" target="_blank" rel="noopener noreferrer">HA media_player.unjoin 操作</a> 移除播放器。

另请参阅公告[组行为](/music-assistant/integration/announcements/#group-behaviour)部分。

## 临时同步组

临时同步组播放器通过[播放器列表](/music-assistant/ui/#player-list)或 HA 操作配置。这种类型的组提供了一种非常灵活的方式来创建和销毁同步组，因为播放器可以随时添加或删除。

### 功能

- 可以在播放前或播放期间动态添加或删除播放器
- 组中的播放器将完美同步播放
- 可以使用 <a href="https://www.home-assistant.io/integrations/media_player/#action-media_playerjoin" target="_blank" rel="noopener noreferrer">media_player.join</a> 和 <a href="https://www.home-assistant.io/integrations/media_player/#action-media_playerunjoin" target="_blank" rel="noopener noreferrer">media_player.unjoin</a> HA 操作来管理此类型的组

### 已知问题 / 说明

- 可以通过[播放器列表](/music-assistant/ui/#player-list)中的复选框链接播放器
- 只允许加入支持同步播放的相同播放器类型
- 当以这种方式分组播放器时，只有主播放器持有队列。例如，播放器 A 有现有队列，播放器 B 和 C 加入播放器 A。如果播放器 A 关闭，播放器 B 和 C 将停止
- 加入新设备时，某些播放器类型可能会短暂暂停
- 可以使用 HA 自动化快速创建常用的播放器组

## 同步组

这些是通过 MA 设置配置的永久组播放器。当组的组成很少更改并且希望播放器通常都持续播放音乐时，应使用这些组。如果组正在播放，则无法从组中移除播放器，尽管可以将其静音（或将音量降低到 0）。如果需要添加或删除其他播放器，请启用动态成员选项或切换到使用手动同步组。在同步组开机/关机时，将恢复原始成员集。

!<a href="/assets/screenshots/syncgroup.png" target="_blank"><img src="/assets/screenshots/syncgroup.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

如上所示选择添加组播放器后，将显示组配置屏幕，其中必须选择组类型。您需要为组播放器指定名称。创建组时选择播放器的顺序将是在[播放器列表](/music-assistant/ui/#player-list)中查看组时显示播放器的顺序。

> [!NOTE]
| 只有在添加了支持完美同步的播放器提供者或通用组播放器提供者时，添加组播放器按钮才可见

> [!TIP]
| 请记住，Chromecast 设备必须在 Google Home 应用中分组才能完美同步

### 功能

- 显示的原生播放器类型（即不是通用组选项）支持完美同步
- 除了同步播放外，无论组中哪些播放器关闭，组都将持有队列

### 已知问题 / 说明

- 如上所述，组播放器持有队列而不是任何单独的播放器。但是，如果组长丢失，则播放将停止，但可以重新启动队列
- 如果其中一个子播放器同步到另一个组，则组不会开机
- 即使一个或多个子播放器不可用，组也会开机
- 如果在组设置中，播放器友好名称已被异常 ID 替换，则可能是 MA 逻辑将播放器视为不可用。检查单个播放器状态
- 将播放器添加到已播放的组时，AirPlay、Snapcast 和 Sonos 将继续播放，但所有其他类型将短暂暂停以重新同步

## 通用组

Music Assistant 支持分组不同的播放设备。配置方式与同步组部分中描述的相同，组类型选择通用。这些组也支持动态成员选项。通用组功能默认不启用，必须首先作为提供者添加。

### 功能

- 所有设备都可以分组并播放相同的音频，但不会同步播放音频。仅对彼此距离不近的播放器使用此播放器类型
- 有关任何特定限制，请参阅各个播放器提供者页面

### 已知问题 / 说明

- 如果可以使用[同步组或原生组](/music-assistant/ui/#grouping-players)，则应避免此类型的组
- 通用组可以包括同步组，但不能包括其他通用组
- 将播放器添加到已播放的组时，MA 将尝试无缝加入，但某些播放器类型可能会略有暂停
- 如果其中一个子播放器同步到另一个组，则组不会开机
- 即使一个或多个子播放器不可用，组也会开机
- 如果在组设置中，播放器友好名称已被异常 ID 替换，则可能是 MA 逻辑将播放器视为不可用。检查单个播放器状态
- 通用组是基于尽力而为的基础，可能不适用于所有播放器型号或产生意外结果

