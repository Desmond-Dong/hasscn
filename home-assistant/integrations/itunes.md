# Apple iTunes

**Apple iTunes** 集成允许您从 Home Assistant 控制 [iTunes](https://apple.com/itunes/)。它使用一个运行在您 Mac 上的第三方服务器 [itunes-api](https://github.com/maddox/itunes-api)。您可以远程控制 Mac 上 iTunes 的播放、暂停或跳过歌曲。

除了控制 iTunes 外，您可用的 AirPlay 端点也会作为媒体播放器添加。之后，您可以单独控制它们，并执行开启、关闭或调节音量等操作。

## 配置

要将 iTunes 添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
media_player:
  - platform: itunes
    host: 192.168.1.50
```

```yaml
host:
  description: itunes-api 的 IP 地址，例如 192.168.1.50。
  required: true
  type: string
port:
  description: itunes-api 可访问的端口，例如 8181。
  required: false
  default: 8181
  type: integer
```
