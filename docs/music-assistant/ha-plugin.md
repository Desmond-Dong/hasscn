---
title: Home Assistant Plugin Provider
description: Home Assistant 插件提供从 HA 到 MA 的连接
---
# Home Assistant 插件提供者 <img src="/assets/icons/ha-logo.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Home Assistant 插件提供从 HA 到 MA 的连接。这将允许 HA 播放器在 MA 中可见并接收流式传输。

要实现此功能，需要安装 HA 插件和 [HA 播放器提供者](/music-assistant/player-support/ha/)。

## 功能

- 允许 HA 媒体播放器成为 MA 用户界面中的播放器
- 允许将 HA 实体链接到 MA 中任何可用播放器的电源、静音或音量控制。如果播放器本身不支持该功能或在高级用例中，这可能很有用
 
## 配置

在添加插件之前，必须[安装](/music-assistant/integration/installation/) HA 集成。

- 导航到 MA 设置>>提供者并添加插件提供者
- 如果使用 Music Assistant 应用（即 HAOS），则不需要任何服务器详细信息，它应该自动连接到本地 HA 实例
- 如果使用 MA 服务器的 docker 版本，则需要输入 HA 实例的 URL，然后进行身份验证

## 已知问题 / 说明

如果 MA 服务器作为 Home Assistant 应用运行，此插件将自动安装（并且无法禁用）。

Home Assistant 插件可以将 HA 实体暴露给 MA，然后可以映射到 MA 播放器的电源、音量或静音功能。有三个下拉列表包含过滤后的 HA 实体列表：

- 对于电源控制，将显示可以打开/关闭并具有布尔状态的实体。（即 switch、input_boolean 和 media_player）

- 对于静音控制，将显示可以打开/关闭并具有布尔状态的实体。（即 switch、input_boolean 以及 media_player（其中静音状态将被映射））

- 对于音量控制，将显示可以具有数值/状态的实体。（即 number、input_number 和 media_player（其中 volume_level 将被映射））

当选择一个实体时，它将作为选项出现在单个播放器的 <a href="https://www.music-assistant.io/player-support/#player-controls" target="_blank" rel="noopener noreferrer">播放器控制</a> 设置中。

