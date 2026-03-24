---
title: Immich
description: 关于如何将 Immich 用户账户集成到 Home Assistant 的说明。
ha_category:
  - Media source
  - Multimedia
  - Sensor
  - Update
ha_release: 2025.6
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: immich
ha_platforms:
  - diagnostics
  - sensor
  - update
ha_codeowners:
  - '@mib1185'
ha_integration_type: service
ha_quality_scale: platinum
---

此集成允许将 [Immich](https://immich.app/) 用户账户添加到 Home Assistant。

## 先决条件

您需要在 Immich 实例中为您的用户账户[获取 API key](https://immich.app/docs/features/command-line-interface#obtain-the-api-key)。

### API key 权限

创建 API key 时，请启用以下权限。缺少这些权限时，集成可能无法正常工作。“admin-only” 权限仅在 API key 属于管理员用户时可用。

- `album.read`
- `albumAsset.create`
- `asset.download`
- `asset.upload`
- `asset.view`
- `person.read`
- `server.about`
- `server.statistics` (_admin-only_)
- `server.storage`
- `server.versionCheck`
- `tag.read`
- `user.read`

:::important
在 Immich server 1.138.0 之前，您的 API key 需要 `all` 权限。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
  description: "您的 Immich 实例 URL。(_例如 `https://immich.example.com`_)。"
API key:
  description: "用于连接到 Immich 实例的用户账户 API key。"
Verify SSL certificate:
  description: "当使用 SSL 加密连接到 Immich 实例时，是否验证 SSL 证书。"
```

## 数据获取

此集成每 60 秒轮询一次数据。

## 媒体源

此集成为您的 [Immich](https://immich.app/) 相册提供一个[媒体源](/home-assistant/integrations/media_source/)。它只显示您拥有或与您共享的资源。如果您在 Home Assistant 中配置了多个 Immich 集成（_每个 Immich 用户一个集成_），则只会显示对应用户的资源。这些资源会按相册、人物和标签分组。

## 传感器

将创建以下传感器。其中部分传感器要求 API key 具有管理员权限。

| Entity | Description | Default enabled |
| --- | --- | --- |
| **Disk size** | Overall size of the disk | ✅ |
| **Disk available** | Free space on the disk  | ✅ |
| **Disk used** | Used space on the disk | ❌ |
| **Disk usage** | Usage of the disk in percentage | ❌ |
| **Photos count** | Count of stored photos (_admin only_) | ✅ |
| **Videos count** | Count of stored videos (_admin only_) | ✅ |
| **Disk used by photos** | Used disk space by photos (_admin only_) | ❌ |
| **Disk used by videos** | Used disk space by videos (_admin only_) | ❌ |

## 更新实体

会创建一个更新实体，用于提示是否有新的 Immich server 版本可用（_需要 Immich server v1.134.0_）。

## 操作

### 上传文件

此操作允许您将媒体文件上传到 Immich 实例。它接受以下参数：

```yaml
Immich instance:
  description: 要上传文件到哪个 Immich 实例的配置条目。
File:
  description: 使用 [MediaSelector](/home-assistant/docs/blueprint/selectors/#media-selector) 定义要上传的文件。
  keys:
    media_content_id:
      description: [媒体源](/home-assistant/integrations/media_source) URL。
    media_content_type:
      description: 要上传文件的 MIME 类型。
Album ID:
  description: 文件上传后应放入的相册。要获取相册 ID，请在浏览器中打开 Immich 实例 Web UI 并进入对应相册，相册 ID 可在 URL `https://your-immich-instance/albums/<ALBUM-ID>` 中找到。
```

#### 脚本示例

通过 [`camera.snapshot`](/home-assistant/integrations/camera/#action-snapshot) 操作抓取摄像头实体快照，使用 [local media](/home-assistant/integrations/media_source/#local-media) 路径保存快照，然后将其上传到 Immich 实例中的指定相册。


```yaml
sequence:
  - variables:
      file_name: camera.yourcamera_{{ now().strftime("%Y%m%d-%H%M%S") }}.jpg
  - action: camera.snapshot
    data:
      filename: "/media/{{ file_name }}"
    target:
      entity_id: camera.yourcamera
  - action: immich.upload_file
    data:
      config_entry_id: 01JVJ0RA387MWA938VE8HGXBMJ
      file:
        media_content_id: "media-source://media_source/local/{{ file_name }}"
        media_content_type: "image/jpeg"
      album_id: f2de0ede-d7d4-4db3-afe3-7288f4e65bb1
```


## 故障排除

无论遇到什么问题，在报告 issue 时，请先启用[调试日志](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，重启集成，并在问题再次出现后立即关闭调试日志（_调试日志文件会自动开始下载_）。如果仍然可行，也请同时下载[诊断](/home-assistant/integrations/diagnostics/)数据。如果您已收集调试日志和诊断数据，请在 issue 报告中一并提供。

## 已知限制

目前没有已知限制。

## 移除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

如果 API key 不再使用，您可以在 Immich 实例中将其删除。
