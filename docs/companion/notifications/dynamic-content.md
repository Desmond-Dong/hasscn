---
title: "动态附件"
id: "dynamic-content"
---

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 专属<br />
地图和摄像头流等动态内容可以作为通知的一部分显示，而无需打开应用。

## 地图
将显示一个居中的地图，在给定坐标处有一个红色图钉。

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: 家里发生了一些事情！
  data:
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
```

### 2021.5 之前的 iOS 版本

在 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 版本 2021.5 之前，您需要像这样包含一个 `category`：

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: 家里发生了一些事情！
  data:
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
    # 兼容 2021.5 之前的 iOS 版本
    push:
      category: map
```

请注意，要发送地图，您必须发送一个名为 `map`、`map1`、`map2`、`map3` 或 `map4` 的推送 `category`，否则您将无法收到地图。

### 缩放级别

要更改地图的默认缩放级别，可以使用 `action_data` 下的以下属性。如果未设置，将使用默认值 `0.1` 度。

| 名称 | 类型 | 描述 |
| ------------ | ------------- | ------------- |  
| `latitude_delta:` | string | 要显示的南北距离（以度为单位）。 |
| `longitude_delta:` | string | 要显示的东西距离（以度为单位）。 |

### 显示第二个图钉

您可以使用 `action_data` 下的以下属性显示第二个图钉。如果使用，第一个图钉将是红色，第二个图钉将是绿色。

| 名称 | 类型 | 描述 |
| ------------ | ------------- | ------------- |  
| `second_latitude:` | string | 第二个图钉的纬度。 |
| `second_longitude:` | string | 第二个图钉的经度。 |
| `shows_line_between_points:` | boolean | 显示连接第一个和第二个图钉的线。 |

### 额外配置

您还可以在 `action_data` 下传递以下选项属性，以各种方式修改地图。此处列出的所有选项都接受布尔值（`true` / `false`）。

| 名称 | 类型 | 描述 |
| ------------ | ------------- | ------------- |
| `shows_compass:` | boolean | 在地图上显示指南针控件。 |
| `shows_points_of_interest:` | boolean | 在地图上显示兴趣点（POI）信息。 |
| `shows_scale:` | boolean | 在地图上显示比例尺信息。 |
| `shows_traffic:` | boolean | 在地图上显示交通信息。 |
| `shows_user_location:` | boolean | 尝试在地图上显示用户的位置。 |

![地图动态内容示例。](/companion-assets/ios/map.png)

## 摄像头流

通知的预览缩略图将显示摄像头的静态图像。展开时，如果摄像头支持，通知内容将显示实时 MJPEG 流。

您可以使用附件参数 `content-type` 和 `hide-thumbnail` 与摄像头一起控制缩略图。

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: 客厅检测到移动
  data:
    entity_id: camera.living_room_camera
```

### 2021.5 之前的 iOS 版本

在 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 版本 2021.5 之前，您需要像这样包含一个 `category`：

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: 客厅检测到移动
  data:
    entity_id: camera.living_room_camera
    # 兼容 2021.5 之前的 iOS 版本
    push:
      category: camera
```

请注意，要发送摄像头图像，您必须发送一个名为 `camera`、`camera1`、`camera2`、`camera3` 或 `camera4` 的推送类别，否则您将无法收到摄像头图像。

## 与 2021.5 之前 iOS 版本的可操作通知结合使用

在 2021.5 之前的版本中，`category` 键用于告诉设备使用哪种内容扩展。您可以在自己的自定义[操作](actionable.md)中使用相同的类别标识符，向内容扩展添加操作。

例如，此配置向摄像头内容消息添加操作。

```yaml
ios:
  push:
    categories:
      - name: 带操作的摄像头
        identifier: 'camera'
        actions:
          - identifier: 'OPEN_COVER'
            title: '打开遮盖'
            activationMode: 'background'
            authenticationRequired: true
            destructive: no
          - identifier: 'CLOSE_COVER'
            title: '关闭遮盖'
            activationMode: 'background'
            authenticationRequired: true
            destructive: true
```

## 故障排除

如果您在接收这些特殊通知时遇到问题，请先尝试重启手机。扩展有时直到重启才能正确注册。