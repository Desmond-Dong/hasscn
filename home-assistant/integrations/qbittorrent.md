# qBittorrent

**qBittorrent** integration 允许您在 Home Assistant 中监控 [qBittorrent](https://www.qbittorrent.org/) 的下载，并根据信息设置自动化。
您可以通过 `Alternative speed` 开关控制备用速度。

## 设置

此传感器需要启用 qBittorrent Web UI。[官方参考](https://github.com/qbittorrent/qBittorrent/wiki#webui-related)描述了如何设置 Web UI。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

qBittorrent 集成将添加以下传感器：

* `sensor.qbittorrent_status`：qBittorrent 的状态 - `up_down`、`seeding`、`downloading` 或 `idle`。
* `sensor.qbittorrent_connection_status`：qBittorrent 的连接状态 - `connected`、`firewalled` 或 `disconnected`。
* `sensor.qbittorrent_upload_speed`：当前总上传速度（以 kB/s 为单位）。
* `sensor.qbittorrent_download_speed`：当前总下载速度（以 kB/s 为单位）。
* `sensor.qbittorrent_upload_speed_limit`：活动的 qBittorrent 上传速度限制（默认禁用）。
* `sensor.qbittorrent_download_speed_limit`：活动的 qBittorrent 下载速度限制（默认禁用）。
* `sensor.qbittorrent_alltime_upload`：上传数据的总量。
* `sensor.qbittorrent_alltime_download`：下载数据的总量。
* `sensor.qbittorrent_global_ratio`：全局分享率（默认禁用）。
* `sensor.qbittorrent_all_torrents`：qBittorrent 中当前的种子总数。
* `sensor.qbittorrent_active_torrents`：qBittorrent 中当前活动的种子。
* `sensor.qbittorrent_inactive_torrents`：qBittorrent 中当前不活动的种子。
* `sensor.qbittorrent_paused_torrents`：qBittorrent 中当前暂停的种子。
* `sensor.qbittorrent_errored_torrents`：qBittorrent 中当前出错的种子。

## 开关

qBittorrent 集成添加以下开关：

* `Alternative speed`：允许您启用或禁用 qBittorrent 的备用速度。

## 动作

### 动作：Get torrents

`qbittorrent.get_torrents` 动作使用提供的过滤器填充[响应数据](/home-assistant/docs/scripts/perform-actions.md#use-templates-to-handle-response-data)中的种子字典。

| 数据属性 | 可选 | 描述                                    | 示例                                             |
| ---------------------- | -------- | ---------------------------------------------- | --------------------------------------------------- |
| `device`               | 否       | 您要检查种子的设备 | all, active, inactive, paused, downloading, seeding |
| `torrent_filter`       | 否       | 您想要在响应中返回的种子类型  | all, active, inactive, paused, errored, downloading, seeding |

```yaml
action: qbittorrent.get_torrents
data:
  filter: "all"
response_variable: torrents
```

响应数据包含 `torrents` 字段，其中包含种子字典。种子的名称是键。

### 动作：Get all torrents

`qbittorrent.get_all_torrents` 动作使用提供的过滤器填充[响应数据](/home-assistant/docs/scripts/perform-actions.md#use-templates-to-handle-response-data)中的种子字典。

| 数据属性 | 可选 | 描述                                   | 示例                                             |
| ---------------------- | -------- | --------------------------------------------- | --------------------------------------------------- |
| `torrent_filter`       | 否       | 您想要在响应中返回的种子类型 | all, active, inactive, paused, errored, downloading, seeding |

```yaml
action: qbittorrent.get_all_torrents
data:
  filter: "all"
response_variable: all_torrents
```

响应数据包含 `all_torrents` 字段，其中包含集成字典，每个集成包含种子字典。种子的名称是键。
