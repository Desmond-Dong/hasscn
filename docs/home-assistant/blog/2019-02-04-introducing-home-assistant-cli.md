---
title: Introducing Home Assistant CLI aka. hass-cli
description: Interact with Home Assistant on a new level
---

当我刚开始使用 Home Assistant（HA）时，我一直觉得少了一个可以通过命令行（CLI）与 HA 交互的方式。CLI 能让你充分利用自动补全、脚本化以及直接访问带来的强大能力。

于是我开始着手开发 [Home Assistant CLI][github-hass-cli]，这是一个最初由 [Fabian Affolter][@fabaff] 发起的项目。

`hass-cli` 最棒的一点在于，它使用的正是其他 UI 和集成所使用的同一套 API，因此它能很好地补充 Home Assistant 工具生态。

上周我们发布了 0.4 版本，它已经提供了我最初希望在 CLI 中实现的大部分功能。

## 功能亮点

   - Get 配置 info (`hass-cli config`)
   - List, get, edit and delete 状态 for 实体 (`hass-cli entity`')
   - Query history with relative time ('hass-cli 实体 history')
   - List and run 服务 (`hass-cli services`)
   - Execute 模板 locally and remotely (`hass-cli template`)
   - Control over columns, sorting, etc. (`hass-cli --columns attr1,attr2 --sort-by attr3`)
   - Shell completion for most commands and arguments (`hass-cli completion zsh`)
   - Get 日志 (`hass-cli system log`)
   - Run discovery (`hass-cli discover`)
   - Show map for 区域 (`hass-cli map`)
   - Call raw api directly (`hass-cli raw`)
   - ... and more

## 用法

关于 `hass-cli` 的基础介绍，请查看 [GitHub][github-hass-cli] 上的文档。

## 安装

使用 pip 安装最新版 `homeassistant-cli`：

    $ pip3 安装 homeassistant-cli

如果要升级，请使用：

    $ pip3 安装 --升级 homeassistant-cli

如果你更喜欢隔离式安装，也可以使用 [pipsi][pipsi]：

    $ pipsi 安装 --python python3 homeassistant-cli

如果你喜欢折腾，也可以直接从 [source][github-hass-cli] 自行构建。

## 相比 0.1-0.3 的变化

首先，命令体系经过了清理，整体变得更清晰，也更明确。

    $ hass-cli
    ...
    ...
    Commands:
    completion  Output shell completion code for the specified shell (bash or...
    config      Get 配置 from a Home Assistant instance.
    discover    Discovery for the local network.
    实体      Get info and operate on 实体 from Home Assistant.
    event       Interact with events.
    info        Get basic info from Home Assistant.
    map         Print the current location on a map.
    raw         Call the raw API (advanced).
    服务     Call and work with 服务.
    system      System details and operations for Home Assistant.
    模板    Render 模板 on server or locally.

现在的命令不再使用笼统的通用词（例如 get、list），而是采用更明确的命名，并提供进一步的子命令层级。

最大的变化是，大多数操作现在默认使用“table”模式。也就是说，你拿到的不再是一大段 YAML 或 JSON 导出结果，而是更简洁清晰的表格视图：

    $ hass-cli 实体 list winter
    实体                           DESCRIPTION                状态    
    timer.timer_winter_garden                                   idle     
    group.winter_garden_lights       Winter Garden 灯光       off      
    group.winter_garden_motionview   winter garden              off      
    灯光.winter_garden_light_2      Winter Garden 灯光 2      off      
    灯光.winter_garden_light_5      Winter Garden 灯光 5      off      
    灯光.winter_garden_light_1      Winter Garden 灯光 1      off      
    灯光.winter_garden_light_3      Winter Garden 灯光 3      off      
    灯光.winter_garden_light_4      Winter Garden 灯光 4      off      
    媒体播放器.winter_garden       Winter Garden              paused   
    传感器.lightlevel_winter_garden  Winter Garden Motion       1.0      
    传感器.temperature_winter_garden Winter Garden Temperature  5.0      

除了更好的表格展示外，你还可以通过 `--sort-by` 按某个属性排序，也可以用 `--columns` 控制要显示哪些属性。

你还可以把这些能力组合起来，做类似下面这样的历史记录查询：

    $ hass-cli --sort-by last_changed 实体 history \
      --since 50m  灯光.kitchen_light_1 binary_sensor.presence_kitchen
    实体                          DESCRIPTION      状态
    binary_sensor.presence_kitchen  Kitchen Motion   off
    灯光.kitchen_light_1           Kitchen 灯光 1  on
    binary_sensor.presence_kitchen  Kitchen Motion   on
    binary_sensor.presence_kitchen  Kitchen Motion   off
    灯光.kitchen_light_1           Kitchen 灯光 1  off

如果你仍然希望查看完整细节，也可以使用 `-o yaml` 输出全部内容。

## 常见问题

下面是过去几个月里我们经常遇到的一些问题：

### 为什么会有人使用它？

它并不是为了取代现有访问 Home Assistant 的方式，也不是来和它们竞争的；它只是一个补充选项。如果你喜欢 CLI 以及自动补全带来的效率，你会觉得 `hass-cli` 非常好用；如果你更喜欢浏览器中的 UI，那就继续照常使用即可。我们自己平时也会继续使用 UI，但在追求效率或者需要脚本化操作时，`hass-cli` 就特别合适。

### 为什么不直接用 `curl` 之类的工具调用 REST API？

你当然可以直接用 `curl` 或类似工具访问 REST API——这本质上也是 `hass-cli` 在幕后所做的事情。不过 `hass-cli` 还是有一些优势。首先，你不需要死记每个精确命令，因为 `hass-cli` 提供了上下文帮助和自动补全，输入起来会轻松很多。其次，随着未来 `hass-cli` 逐步支持更完整的 WebSocket API，相比用 `curl` 做“原始访问”，它会变得更一致，也更易用。

### 它只能配合 HTTPS 和 hass.io 使用吗？

不是，它适用于 *任何* 暴露了 REST API 的 Home Assistant，而这本来就是默认行为。简单来说，只要你能在浏览器中打开 Home Assistant 并看到 UI，`hass-cli` 就也能与它通信并进行控制。

所以无论是 HTTP、HTTPS、hass.io，还是非 hass.io 方式，`hass-cli` 都支持。

### 使用它之前，我需要先在本机安装 Home Assistant 吗？

不需要，`hass-cli` 并不要求你运行它的那台电脑上已经安装了 Home Assistant。只要系统装有 Python 3.5 或更高版本，它就应该能在主流操作系统上运行。

### 它支持客户端生成的证书吗？

理论上应该支持，但我们目前还没有完成验证。如果你愿意帮忙测试，可以使用 `--cert <certificate.pem>` 运行，并在 issue [#66][client-cert-git] 中告诉我们结果。

## 下一步计划

就我个人而言，接下来最想加入的功能，是对系统控制命令提供更具体的支持（例如刷新分组、重启等），以及支持访问 hass.io 插件。同时，我也希望能提供一种简单方式，让用户接入事件总线（通过 WebSocket），实时查看系统里正在发生的事情。

你最希望看到什么功能？

## 反馈

如果你有问题或反馈，可以直接在这篇博文下留言，或者前往
[hass-cli 论坛主题][forum-Thread-hasscli]，也可以在 [GitHub][github-hass-cli]
提交 issue 或 pull request。

祝你玩得开心！

[Max Rydahl Andersen][@maxandersen]

[pipsi]: https://github.com/mitsuhiko/pipsi
[github-hass-cli]: https://github.com/home-assistant/home-assistant-cli
[github-hass-issues]: https://github.com/home-assistant/home-assistant-cli/issues
[@fabaff]: https://github.com/fabaff
[forum-Thread-hasscli]: https://community.home-assistant.io/t/resurrected-feature-home-assistant-cli/84107
[client-cert-git]: https://github.com/home-assistant/home-assistant-cli/issues/66
[@maxandersen]: https://xam.dk/about
