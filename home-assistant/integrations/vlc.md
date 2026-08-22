# VLC media player

**VLC media player** 集成允许您控制 [VLC media player](https://www.videolan.org/vlc/index.html)。

:::important
**VLC media player** 集成目前仅适用于基于 Python 虚拟环境运行 Home Assistant Core 的安装方式。

:::

## 配置

要将 VLC 媒体播放器添加到您的安装中，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
media_player:
  - platform: vlc
```

```yaml
name:
  description: 在前端中显示的名称。
  required: false
  type: string
arguments:
  description: 传递给 VLC 的附加参数。
  required: false
  type: string
```

目前仅支持 `music` 媒体类型。

此集成控制的是后台运行的 VLC 实例，因此与 Kodi 媒体播放器等情况不同，您无法使用它来控制桌面上手动启动的 VLC 实例。

## 完整配置

VLC 的完整配置可以如下所示：

```yaml
# configuration.yaml 示例
media_player:
  - platform: vlc
    name: speaker_1
    arguments: "--alsa-audio-device=hw:1,0"
```

## macOS 上的额外配置

在 macOS 上，除非您将以下内容添加到运行 Home Assistant 的用户 `.bash_profile` 中，否则 `python-vlc` 无法找到 VLC 插件目录：

```bash
export VLC_PLUGIN_PATH=$VLC_PLUGIN_PATH:/Applications/VLC.app/Contents/MacOS/plugins
```

## Linux 上的额外配置

您需要将 `homeassistant` 用户添加到 `audio` 组：

```bash
sudo usermod -a -G audio homeassistant
```
