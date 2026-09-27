# Device tracker

Device tracker 可让您在 Home Assistant 中跟踪设备。这可以通过查询无线路由器来实现，也可以通过应用推送位置信息来实现。

:::note Building block integration
This device tracker is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this device tracker building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the device tracker building block offers.
:::

## 配置 `device_tracker` 平台

要开始使用，请将以下内容添加到 `configuration.yaml` 中（NETGEAR 示例）：

```yaml
# NETGEAR 设备的 `configuration.yaml` 示例条目
device_tracker:
  - platform: netgear
    host: IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    new_device_defaults:
      track_new_devices: true
```

以下可选参数可用于任意平台：

:::note
Device tracker 只会在第一个已配置平台的配置下读取以下全局设置：

:::
| 参数 | 默认值 | 说明 |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `interval_seconds` | 12 | 每次扫描新设备之间的秒数。此项仅适用于本地 device tracker，不适用于会主动推送更新的应用。 |
| `consider_home` | 180 | 设备在一段时间未被看到后，等待多久再将某人标记为不在家。此参数对于家中使用 Apple iOS 设备的情况尤其有用，因为这些设备在仍位于家中时可能会进入睡眠模式以节省电量。iPhone 有时会暂时从网络中消失，然后再次出现。使用 Nmap 之类的 IP 扫描器进行在家状态检测时，`consider_home` 有助于避免误报。`consider_home` 接受多种时间表示方式，例如 `180`、`0:03`、`0:03:00` 都表示 3 分钟。 |

:::note
请注意，即使设置了 `track_new_devices: false`，新设备仍会记录到 `known_devices.yaml` 中，但不会被跟踪（`track: false`）。

:::
在 `configuration.yaml` 中，上面的扩展示例如下：

```yaml
# NETGEAR 设备的 `configuration.yaml` 示例条目
device_tracker:
  - platform: netgear
    host: IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    interval_seconds: 10
    consider_home: 180
    new_device_defaults:
      track_new_devices: true
```

多个 device tracker 可以并行使用，例如 [Owntracks](/home-assistant/integrations/owntracks/index.md) 和 [Nmap](/home-assistant/integrations/nmap_tracker/index.md)。设备状态将由最后一次上报的来源决定。

## `known_devices.yaml`

:::warning
从 0.94 开始，`known_devices.yaml` 已逐步弃用，不再被所有 tracker 使用。根据您所使用的集成，本节内容可能已不再适用。这包括 OwnTracks、GeoFency、GPSLogger、Locative 和 Huawei LTE。

:::
启用 `device_tracker` 后，会在您的配置目录中创建一个名为 `known_devices.yaml` 的文件。您可以编辑此文件来调整要跟踪哪些设备。

下面是单个设备的配置示例：

```yaml
devicename:
  name: Friendly Name
  mac: EA:AA:55:E7:C6:94
  picture: https://www.home-assistant.io/images/favicon-192x192.png
  track: true
```

:::important
在上面的示例中，`devicename` 指的是检测到的设备名称。例如，在 `nmap` 中，这会是 MAC 地址（省略字节分隔符）。

:::
| 参数 | 默认值 | 说明 |
| --------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name` | 主机名或 `Unnamed Device` | 设备的友好名称。 |
| `mac` | None | 设备的 MAC 地址。如果您使用的是 Nmap 或 SNMP 之类的网络设备跟踪器，请添加此项。 |
| `picture` | None | 可用于轻松识别人或设备的图片。您也可以将图片文件保存在与 `configuration.yaml` 同一位置的 `www` 文件夹中（可通过开发者工具获取路径），然后直接使用 `picture: /local/favicon-192x192.png`。其中 `local` 路径映射到您创建的 `www` 文件夹。 |
| `icon` | mdi:account | 此设备的图标（可作为 `picture` 的替代项）。 |
| `gravatar` | None | 设备所有者的电子邮件地址。如果提供了此项，它会覆盖 `picture`。 |
| `track` | \[使用平台设置] | 如果为 `yes`、`on` 或 `true`，则设备会被跟踪。否则，其位置和状态将不会更新。`track` 设置仅适用于直接通过 YAML 配置的设备。 |
| `consider_home` | \[使用平台设置] | 设备在一段时间未被看到后，等待多久再将某人标记为不在家。此项允许您在单个设备级别覆盖平台配置中的全局 `consider_home` 设置。`consider_home` 设置仅适用于直接通过 YAML 配置的设备。 |

## 已跟踪设备的状态

device tracker 可具有的状态类型取决于其数据来源是 GPS 还是路由器。

以 **GPS** 为来源的 device tracker 可以具有任意数量的字符串状态。该集成可以返回以下任一情况：

* 上报 GPS 坐标。坐标随后会匹配到一个区域（并将其设为状态）。如果匹配到 home zone，状态将为 **Home**。如果没有匹配到任何区域，状态将为 **Not home**。
* 上报一个位置。它可以是任意字符串，并被设置为状态。

以 **router** 为来源的 device tracker 只有两种状态：**Home** 或 **Not home**。

* **Home**：您的跟踪设备位于 [home zone](/home-assistant/integrations/zone.md#home-zone) 中，由网络或基于蓝牙的在家状态检测发现。如果您使用的是包含坐标的在家状态检测方法，那么当设备位于某个区域内时，状态会等于该区域名称（区分大小写）。
* **Not home**：当设备不在家中且不在任何区域内时。

<p class='img'>
<img src='/home-assistant/images/integrations/device_tracker/state_device_tracker.png' alt='开发者工具中显示设备跟踪实体状态的截图' />
显示开发者工具中 device tracker 实体状态的截图。
</p>

此外，该实体还可能具有以下状态：

* **Unavailable**：实体当前不可用。
* **Unknown**：状态尚未知晓。

## `device_tracker.see` 操作

`device_tracker.see` 操作可用于手动更新 device tracker 的状态：

| 数据属性 | 可选 | 说明 |
| --------------- | -------- | --------------------------------------------------------------------------------------- |
| `dev_id` | 否 | `object_id`，例如 `device_tracker.tardis` 中的 `tardis` |
| `location_name` | 是 | 位置，可为 `home`、`not_home` 或区域名称 |
| `host_name` | 是 | device tracker 的主机名 |
| `mac` | 是 | 实体的 MAC 地址（仅在您更新基于网络的 tracker 时指定） |
| `gps` | 是 | 如果您提供的是位置，例如 `[51.513845, -0.100539]` |
| `gps_accuracy` | 是 | GPS 定位精度 |
| `battery` | 是 | 设备电池电量 |
