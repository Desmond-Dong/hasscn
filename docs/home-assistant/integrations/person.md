---
title: Person
description: 'Person 集成允许将设备追踪器(/home-assistant/integrations/devicetracker/)实体关联到一个或多个人员实体。关联设备追踪器的状态更新会设置人员状态。使用多个设备追踪器时，人员状态按以下顺序确定：。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Presence detection
ha_release: 0.88
ha_quality_scale: internal
ha_domain: person
ha_iot_class: Calculated
ha_integration_type: system
---
# Person

**Person** 集成允许将[设备追踪器](/home-assistant/integrations/device_tracker/)实体关联到一个或多个人员实体。关联设备追踪器的状态更新会设置人员状态。使用多个设备追踪器时，人员状态按以下顺序确定：

1. 如果存在状态为 `home` 的静态追踪器（非 GPS 追踪器，例如路由器或蓝牙设备追踪器），则使用最近更新的那个追踪器。
2. 如果存在 `gps` 类型追踪器，则使用最近更新的那个追踪器。
3. 否则，使用状态为 `not_home` 的最新追踪器。

例如，假设您有三个追踪器：`tracker_gps`、`tracker_router` 和 `tracker_ble`。

1. 您在家中，三个设备都显示状态 `home`，则您的 Person 实体状态会是 `home`，来源是 `tracker_router` 或 `tracker_ble`（取最近更新者）。
2. 您刚离开家。`tracker_gps` 显示状态 `not_home`，但另外两个追踪器仍显示 `home`（它们可能因 `consider_home` 设置尚未更新，参见 [device_tracker](/home-assistant/integrations/device_tracker/#configuring-a-device_tracker-platform)）。由于静态追踪器优先，您仍会被视为 `home`。
3. 一段时间后，两个静态追踪器都显示状态 `not_home`。此时您的 Person 实体状态为 `not_home`，来源为 `tracker_gps`。
4. 当您离家在外时，Home Assistant 实例重启。在 `tracker_gps` 收到新更新之前，您的状态将由静态追踪器决定，因为重启后它们拥有最近一次更新。显然，此时状态为 `not_home`。
5. 接着您进入定义为 `zone1` 的区域，`tracker_gps` 发送更新后，您的状态变为 `zone1`，来源为 `tracker_gps`。
6. 您已回到家，且手机已连接路由器，但 `tracker_gps` 尚未更新。您的状态会是 `home`，来源为 `tracker_router`。
7. 当 `tracker_gps` 更新后，您的状态仍会是 `home`，来源是 `tracker_router` 或 `tracker_ble`（取最近更新者）。

简而言之，当您在家时，位置先由静态追踪器（若有）判定，再参考 GPS；当您离家时，位置先由 GPS 判定，再参考静态追踪器。

**提示**：当您同时使用多个设备追踪器（尤其是静态与 GPS 追踪器）时，建议将静态追踪器的 `consider_home` 设得尽可能小，参见 [device_tracker](/home-assistant/integrations/device_tracker/#configuring-a-device_tracker-platform)。

您可以 [在配置面板中的人员页面通过 UI 管理人员](https://my.home-assistant.io/redirect/people/)，也可以在 "`configuration.yaml`" 文件中通过 `YAML` 进行管理。

## 向 Home Assistant 添加人员

如果您拥有管理员权限，可以将其他人员添加到 Home Assistant 并为其创建用户账户。根据授予的权限，他们可以在自己的设备上使用 Home Assistant、拥有自己的仪表板，并在自动化中使用。

1. 前往 [**设置** > **人员**](https://my.home-assistant.io/redirect/people/)，然后选择 **添加人员**。
2. 输入其**姓名**。
3. 如果需要，可添加头像图片。
4. 在 **允许登录** 下，选择是否允许其登录。
   - 如果不允许登录，则不会创建用户账户，他们在 Home Assistant 中可执行的操作会很少。
   - 例如，他们不能拥有自己的仪表板。
   - 但他们仍可用于设备追踪、在地图上显示，并用于自动化。
5. 如果允许其登录，请填写用户信息。
   - 检查用户名是否正确。系统会根据人员姓名给出建议，但二者不必完全一致。
     - 用户名必须为小写且不含空格。
     - 登录时必须使用用户名。
     - 人员姓名是在 UI 中显示的名称。
    - 输入密码并妥善保管。
    - 设置是否启用 **仅本地访问**。
      - 启用后，他们在您的网络外将无法访问 Home Assistant（例如通过手机外网访问）。
    - 设置是否授予 **管理员** 权限。
    - 选择 **创建**。
6. 如果您已设置[presence detection](/home-assistant/getting-started/presence-detection/)设备，请**选择属于该人员的设备**。

### 自定义人员头像

您可以在前端轻松上传头像。只需点击某个人员，在输入框中选择或拖放图片，然后进行裁剪。

<lite-youtube videoid="rOlRnwaaT7Y" videotitle="Changing a profile picture" posterquality="maxresdefault"></lite-youtube>

有关 `www` 文件夹的更多信息，请参阅[托管文件](/home-assistant/integrations/http/#hosting-files)文档。

## 通过 Home Assistant 配置面板配置 `person` 集成

此集成默认启用，除非您在配置中禁用了或移除了 [`default_config:`](/home-assistant/integrations/default_config/) 这一行。若是这种情况，以下示例展示了如何手动启用此集成：

```yaml
person:
```

## 通过 YAML 配置 `person` 集成

如果您偏好 YAML，也可以通过 "`configuration.yaml`" 文件配置人员：

```yaml
# Example configuration.yaml entry
person:
  - name: Ada
    id: ada6789
    device_trackers:
      - device_tracker.ada
```

```yaml
  id:
    description: 人员的唯一 ID。
    required: true
    type: string
  name:
    description: 人员名称。
    required: true
    type: string
  user_id:
    description: 该人员对应的 Home Assistant 用户账户 ID。用户的 `user_id`（即 `ID`）可在配置面板的“用户”/“管理用户”页面查看。
    required: false
    type: string
  device_trackers:
    description: 要追踪的设备追踪器实体 ID 列表。这些实体将用于表示该人员状态。
    required: false
    type: [string, list]
```

扩展示例如下：

```yaml
# Example configuration.yaml entry
person:
  - name: Ada
    id: ada6789
    device_trackers:
      - device_tracker.ada
  - name: Stacey
    id: stacey12345
    user_id: 12345678912345678912345678912345
    device_trackers:
      - device_tracker.stacey
      - device_tracker.beacon
```

如果您修改了 YAML，可通过调用 `person.reload` 操作重新加载。
