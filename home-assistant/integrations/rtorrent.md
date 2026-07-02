# rTorrent

**rTorrent** 集成允许您在 Home Assistant 中监控 [rTorrent](https://rakshasa.github.io/rtorrent/) 的下载情况，并基于这些信息设置自动化。

要启用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: rtorrent
    url: "http://<user>:<password>@<host>:<port>/RPC2"
    monitored_variables:
      - 'current_status'
      - 'download_speed'
      - 'upload_speed'
      - 'all_torrents'
      - 'stopped_torrents'
      - 'complete_torrents'
      - 'uploading_torrents'
      - 'downloading_torrents'
      - 'active_torrents'
```

此传感器要求通过 HTTP 接口暴露 rTorrent 的 XML-RPC API。
请注意，出于安全原因，仅使用 rTorrent 的 SCGI 接口（默认 `localhost:5000`）是无法工作的。
[官方参考文档](https://github.com/rakshasa/rtorrent/wiki/RPC-Setup-XMLRPC)介绍了如何设置该 HTTP 接口。

或者，也可以使用 [arch-rtorrentvpn](https://github.com/binhex/arch-rtorrentvpn) 容器，并将 `url` 设置为 `http://admin:rutorrent@127.0.0.1:9080/RPC2`。

```yaml
url:
  description: rTorrent XML-RPC API 的 HTTP 端点 URL。
  required: true
  type: string
name:
  description: 显示该 rTorrent 实例时使用的名称。
  required: false
  type: string
monitored_variables:
  description: 要监控的项目。
  required: true
  type: list
  keys:
    current_status:
      description: rTorrent 守护进程的状态。
    download_speed:
      description: 当前下载速度。
    upload_speed:
      description: 当前上传速度。
    all_torrents:
      description: 所有 torrent 的数量。
    stopped_torrents:
      description: 已停止的 torrent 数量。
    complete_torrents:
      description: 已完全下载的 torrent 数量。
    uploading_torrents:
      description: 正在做种的 torrent 数量。
    downloading_torrents:
      description: 正在下载中的 torrent 数量。
    active_torrents:
      description: 正在活跃下载、做种或两者兼有（有可测速度）的 torrent 数量。
```
