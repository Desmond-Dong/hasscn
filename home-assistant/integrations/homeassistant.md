# Home Assistant Core Integration

**Home Assistant Core** 集成提供一些通用实现，例如通用的 `homeassistant.turn_on` 动作。

## 在 YAML 中编辑常规设置

Home Assistant Core 集成也负责管理常规设置。这些设置会在初始引导时定义，但你稍后也可以在 [**Settings** > **System** > **General**](https://my.home-assistant.io/redirect/general/) 下进行更改。详细步骤请参见[基本设置](/home-assistant/docs/configuration/basic/index.md)。

如果你更喜欢用 YAML 编辑，可以在 "`configuration.yaml`" 文件中定义常规设置。
请注意，某些设置一旦在 YAML 中定义，就无法在 UI 中编辑，它们会显示为灰色或无法访问。

<p class='img'>
    <img class="no-shadow" src='/home-assistant/images/docs/configuration/coordinates-defined-in-yaml.png' alt='Screenshot showing coordinates cannot be edited because they are defined in configuration.yaml file'>
    截图显示坐标因已在 configuration.yaml 文件中定义而无法编辑。
</p>

要开始在 YAML 中配置常规设置，请按以下步骤操作：

1. 将以下内容复制到你的 "`configuration.yaml`" 文件中。

   ```yaml
   homeassistant:
     name: Home
     latitude: 32.87336
     longitude: 117.22743
     elevation: 430
     radius: 100
     unit_system: metric
     currency: USD
     country: US
     time_zone: "America/Los_Angeles"
     allowlist_external_dirs:
       - "/usr/var/dumping-ground"
       - "/tmp"
     allowlist_external_urls:
       - "http://images.com/image1.png"
     media_dirs:
       media: "/media"
       recordings: "/mnt/recordings"
     debug: false
   ```

2. 按照你的家庭环境修改各项配置。

```yaml
name:
  description: Home Assistant 运行位置的名称。
  required: false
  type: string
latitude:
  description: 你所在位置的纬度，用于计算日出和日落时间。
  required: false
  type: float
longitude:
  description: 你所在位置的经度，用于计算日出和日落时间。
  required: false
  type: float
elevation:
  description: 海拔高度（米），会影响日出数据。
  required: false
  type: integer
radius:
  description: 以米为单位定义你所在区域的半径，会影响位置感知。
  required: false
  type: integer
unit_system:
  description: "`metric` 表示公制，`us_customary` 表示美制。这也会设置 temperature_unit：公制为 Celsius，美制为 Fahrenheit"
  required: false
  type: string
temperature_unit:
  description: "覆盖由 unit_system 设置的温度单位。`C` 表示 Celsius，`F` 表示 Fahrenheit。"
  required: false
  type: string
time_zone:
  description: "从 [Wikipedia 的 tz 数据库时区列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 的 **TZ** 列中选择你的时区"
  required: false
  type: string
currency:
  description: "从 [Wikipedia 的 ISO 4217 有效货币代码列表](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) 的 **Code** 列中选择你的货币代码"
  required: false
  type: string
  default: "EUR"
external_url:
  description: "Home Assistant 可从互联网访问的 URL。例如：`https://example.duckdns.org:8123`。请注意，此设置只能包含协议、主机名和端口，不支持路径。你也可以在 **["Settings](https://my.home-assistant.io/redirect/network/)** 中配置。"
  required: false
  type: string
internal_url:
  description: "Home Assistant 可从本地网络访问的 URL。例如：`http://192.168.0.10:8123`。请注意，此设置只能包含协议、主机名和端口，不支持路径。你也可以在 **["Settings](https://my.home-assistant.io/redirect/network/)** 中配置。"
  required: false
  type: string
customize:
  description: "[自定义](#editing-entity-settings-in-yaml)实体。"
  required: false
  type: string
customize_domain:
  description: "[自定义](#editing-entity-settings-in-yaml)某个 domain 中的所有实体。"
  required: false
  type: string
customize_glob:
  description: "[自定义](#editing-entity-settings-in-yaml)匹配某个模式的实体。"
  required: false
  type: string
allowlist_external_dirs:
  description: 可用作发送文件来源的文件夹列表。
  required: false
  type: list
allowlist_external_urls:
  description: 可抓取的外部 URL 列表。URL 可以匹配特定资源（例如 `http://10.10.10.12/images/image1.jpg`），也可以是允许访问其下资源的相对路径（例如 `http://10.10.10.12/images` 将允许访问该路径下的任何内容）
  required: false
  type: list
media_dirs:
  description: 本地媒体来源及其磁盘路径的映射。
  required: false
  type: map
language:
  description: "Home Assistant 使用的默认语言。例如，这可能会影响语音助手所使用的语言。语言应以 RFC 5646 语言标签指定，并且必须是 Home Assistant 已提供翻译的语言。"
  required: false
  type: string
  default: "en"
country:
  description: "Home Assistant 运行所在的国家。例如，这可能会影响无线电设置以符合当地法规。国家应以 ISO 3166.1 alpha-2 代码指定。请从 [Wikipedia 的 ISO 3166.1 alpha-2 正式分配代码列表](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) 的 **Code** 列中选择你的国家。"
  required: false
  type: string
debug:
  description: 启用 Home Assistant 内置调试功能。它通过启用运行时实现错误检查来帮助定位行为异常的集成，并可阻止许多不安全的线程操作导致系统崩溃。启用调试会对系统性能产生轻微影响，因此不建议长期使用。
  required: false
  type: boolean
  default: false
webrtc:
  description: 用于 WebRTC 视频流的[自定义 STUN 和 TURN 服务器列表](#custom-stun-and-turn-servers)。
  required: false
  type: map
```

## 在 YAML 中编辑实体设置

Home Assistant Core 集成也负责实体设置。
默认情况下，你的所有设备都会显示，并使用由其 domain 决定的默认图标。你可以通过修改部分参数来自定义首页的外观。这可以通过覆盖特定实体的属性来实现。

其中大多数设置都可以在 UI 中更改。详细步骤请参见[自定义实体](/home-assistant/docs/configuration/customizing-devices/index.md)。

如果你更喜欢用 YAML 编辑，可以在 "`configuration.yaml`" 文件中定义这些设置。

### 可用值

### Configuration variables for `customize`

friendly\_name:
description: 实体在 UI 中显示的名称。
required: false
type: string
entity\_picture:
description: 用作实体图片的 URL。
required: false
type: string
icon:
description: "来自 [Material Design Icons](https://pictogrammers.com/library/mdi/) 的任意图标。名称需加上 `mdi:` 前缀，例如 `mdi:home`。注意：较新的图标可能在当前 Home Assistant 版本中尚不可用。"
required: false
type: string
assumed\_state:
description: 对于具有假定状态的开关，将显示两个按钮（关闭、开启）而不是一个开关。将 `assumed_state` 设为 `false` 后，将使用默认开关图标。
required: false
type: boolean
default: true
device\_class:
description: 设置设备类别，从而改变 UI 中显示的设备状态和图标（见下文）。它不会设置 `unit_of_measurement`。
required: false
type: device\_class
default: None
unit\_of\_measurement:
description: 定义测量单位（如果有）。这也会影响历史可视化中是否以连续值方式显示。缺少 `unit_of_measurement` 的传感器会显示为离散值。
required: false
type: string
default: None
initial\_state:
description: 设置自动化的初始状态，`on` 或 `off`。
required: false
type: boolean
default: None

### 设备类别

设备类别用于对某些实体进行分类，并影响它们在仪表板中的显示方式。有些设备类别按测量类型分类，例如传感器或二进制传感器；另一些则按更具体的类型分类。例如，一个 cover 可以是百叶帘，也可以是窗帘。对于特定平台，设备类别会影响用户界面的显示内容。比如 humidifier 平台有两个设备类别：humidifier 和 dehumidifier。如果设备类别设为 `humidifier`，UI 会显示 **Humidifying**；如果设为 `dehumidifier`，则显示 **Drying**。

以下平台当前支持设备类别：

* [Binary sensor](/home-assistant/integrations/binary_sensor/index.md#device-class)
* [Button](/home-assistant/integrations/button/index.md#device-class)
* [Cover](/home-assistant/integrations/cover/index.md#device-class)
* [Event](/home-assistant/integrations/event/index.md#device-class)
* [Humidifier](/home-assistant/integrations/humidifier/index.md#device-class)
* [Media player](/home-assistant/integrations/media_player/index.md#device-class)
* [Number](/home-assistant/integrations/number/index.md#device-class)
* [Sensor](/home-assistant/integrations/sensor.md#device-class)
* [Switch](/home-assistant/integrations/switch/index.md#device-class)
* [Update](/home-assistant/integrations/update/index.md#device-class)
* [Valve](/home-assistant/integrations/valve/index.md#device-class)

支持的设备类别列表请参见相应平台的文档。

### 手动自定义

:::important
如果你在 "`configuration.yaml`" 文件中使用 `customize`、`customize_domain` 或 `customize_glob`，必须确保它们位于 `homeassistant:` 内部，否则将无法生效。

:::

```yaml
homeassistant:
  name: Home
  unit_system: metric
  # etc

  customize:
    # 为每个要覆盖的实体添加一个条目。
    thermostat.family_room:
      entity_picture: https://example.com/images/nest.jpg
      friendly_name: Nest
    switch.wemo_switch_1:
      friendly_name: Toaster
      entity_picture: /local/toaster.jpg
    switch.wemo_switch_2:
      friendly_name: Kitchen kettle
      icon: mdi:kettle
    switch.rfxtrx_switch:
      assumed_state: false
    media_player.my_media_player:
      source_list:
        - Channel/input from my available sources
  # 自定义某个 domain 中的所有实体
  customize_domain:
    light:
      icon: mdi:home
    automation:
      initial_state: "on"
  # 自定义匹配某个模式的实体
  customize_glob:
    "light.kitchen_*":
      icon: mdi:description
    "scene.month_*_colors":
      icon: mdi:other
```

## 自定义 STUN 和 TURN 服务器

你可以覆盖用于启动 WebRTC 流传输的默认 STUN 和 TURN 服务器列表。
每个 STUN 或 TURN 服务器都可以按下表说明进行配置。

### Configuration variables for `webrtc`

ice\_servers:
description: STUN 和 TURN 服务器配置列表
required: true
type: list
keys:
url:
description: STUN 或 TURN 服务器 URL。可以是单个 URL，也可以是 URL 列表。
required: true
type: string
username:
description: TURN 服务器认证用户名
required: false
type: string
credential:
description: TURN 服务器认证凭据
required: false
type: string

### WebRTC 配置示例

:::important
如果你在 "`configuration.yaml`" 文件中使用 `webrtc`，必须确保它位于 `homeassistant:` 内部，否则将无法生效。

:::

```yaml
homeassistant:
  name: Home
  unit_system: metric
  # etc

  webrtc:
    ice_servers:
    # 为每个 STUN 或 TURN 服务器添加一个条目
    - url:
      - "stun:stun.example.com:19302"
      - "stun:stun2.example.com:12345"
    - url: "turn:turn.domain.com"
      username: "username"
      credential: "abc123"
```

## 动作

`homeassistant` 集成提供了用于控制 Home Assistant 本身的动作，以及可用于任意实体的通用控制动作。

### 动作：检查配置

`homeassistant.check_config` 动作会读取配置文件并检查其正确性，但不会将其加载到 Home Assistant 中。如果发现错误，它会创建一条持久通知和一条日志记录。

### 动作：重新加载全部

`homeassistant.reload_all` 动作会重新加载所有无需重启 Home Assistant 即可重载的 YAML 配置。

它会对所有提供 `reload` 动作的 domain 调用该动作。此外，它还会重新加载核心配置（等同于调用 `homeassistant.reload_core_config`）、主题（`frontend.reload_themes`）以及自定义 Jinja（`homeassistant.reload_custom_templates`）。

在重新加载之前，会先执行一次基础配置检查。如果检查失败，则不会执行重载，并会抛出错误。

### 动作：重新加载自定义模板

`homeassistant.reload_custom_templates` 动作会重新加载 `config/custom_templates` 目录中的所有 Jinja 模板。这些模板的更改将在下次渲染导入它们的模板时生效。

### 动作：重新加载配置条目

`homeassistant.reload_config_entry` 动作用于重新加载集成配置条目。

| Data attribute | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `entity_id`    | 用于引用配置条目的实体 ID 列表。 |
| `area_id`      | 用于引用配置条目的区域 ID 列表。 |
| `device_id`    | 用于引用配置条目的设备 ID 列表。 |
| `entry_id`     | 用于引用配置条目的单个配置条目 ID。 |

### 动作：重新加载核心配置

`homeassistant.reload_core_config` 动作会重新加载 `homeassistant:` 下的核心配置及所有关联文件。加载完成后，新配置会立即应用。新的 `customize:` 信息将在相关实体下次状态更新时生效。

### 动作：重启

`homeassistant.restart` 动作会重启 Home Assistant 实例（并在启动时重新加载配置）。

此动作在重启前也会执行配置检查。如果检查失败，Home Assistant 将不会重启。取而代之的是，它会创建一个 ID 为 `persistent_notification.homeassistant_check_config` 的持久通知。日志中会显示配置检查失败的详细信息。

### 动作：停止

`homeassistant.stop` 动作会停止 Home Assistant 实例。之后必须从宿主设备重新启动 Home Assistant 才能继续运行。

### 动作：设置位置

`homeassistant.set_location` 动作用于更新 Home Assistant 默认区域（通常为 “Home”）的位置。

| Data attribute | Optional | Description                 |
| -------------- | -------- | --------------------------- |
| `latitude`     | no       | 你所在位置的纬度。 |
| `longitude`    | no       | 你所在位置的经度。 |
| `elevation`    | yes      | 你所在位置的海拔。 |

#### 示例

```yaml
actions:
  - action: homeassistant.set_location
    data:
      latitude: 32.87336
      longitude: 117.22743
      elevation: 120
```

### 动作：切换

`homeassistant.toggle` 动作是一个用于切换设备开关状态的通用动作。它的用法与 `light.toggle`、`switch.toggle` 以及其他切换动作相同。与这些动作相比，它的不同之处在于可以同时混合使用不同的 domain。例如，你可以在一个动作中同时切换灯和开关。

| Data attribute | Optional | Description                                   |
| -------------- | -------- | --------------------------------------------- |
| `entity_id`    | yes      | 要切换开关状态的设备 `entity_id`。 |

#### 示例

```yaml
actions:
  - action: homeassistant.toggle
    target:
      entity_id: 
        - light.living_room
        - switch.tv
```

### 动作：打开

`homeassistant.turn_on` 动作是一个用于打开设备的通用动作。它的用法与 `light.turn_on`、`switch.turn_on` 以及其他打开动作相同。与这些动作相比，它的不同之处在于可以同时混合使用不同的 domain。例如，你可以在一个动作中同时打开灯和开关。

| Data attribute | Optional | Description                             |
| -------------- | -------- | --------------------------------------- |
| `entity_id`    | yes      | 要打开的设备 `entity_id`。 |

#### 示例

```yaml
actions:
  - action: homeassistant.turn_on
    target:
      entity_id:
        - light.living_room
        - switch.tv
```

### 动作：关闭

`homeassistant.turn_off` 动作是一个用于关闭设备的通用动作。它的用法与 `light.turn_off`、`switch.turn_off` 以及其他关闭动作相同。与这些动作相比，它的不同之处在于可以同时混合使用不同的 domain。例如，你可以在一个动作中同时关闭灯和开关。

| Data attribute | Optional | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `entity_id`    | yes      | 要关闭的设备 `entity_id`。 |

#### 示例

```yaml
actions:
  - action: homeassistant.turn_off
    target:
      entity_id:
        - light.living_room
        - switch.tv
```

### 动作：更新实体

`homeassistant.update_entity` 动作会强制一个或多个实体立即更新数据，而不是等待下一次计划更新。

| Data attribute | Optional | Description                                             |
| -------------- | -------- | ------------------------------------------------------- |
| `entity_id`    | no       | 要更新的一个或多个 `entity_id`，可以为列表。 |

#### 示例

```yaml
actions:
  - action: homeassistant.update_entity
    target:
      entity_id:
      - light.living_room
      - switch.coffe_pot
```

### 动作：保存持久状态

`homeassistant.save_persistent_states` 动作会立即保存持久状态（适用于派生自 RestoreEntity 的实体），同时保留正常的周期性保存间隔。

通常，这些状态会在启动时、每 15 分钟一次，以及关闭时保存。
