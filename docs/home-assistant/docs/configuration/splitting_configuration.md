---
title: 拆分配置
description: '您使用 Home Assistant 已经有一段时间了，您的 configuration.yaml 文件已经大到让人看了想哭。或者，您只是想从一开始就采用分布式的方法。以下是如何将 configuration.yaml 拆分成更易于管理（即：人类可读）的部分。'
---
您使用 Home Assistant 已经有一段时间了，您的 **`configuration.yaml`** 文件已经大到让人看了想哭。或者，您只是想从一开始就采用分布式的方法。以下是如何将 **`configuration.yaml`** 拆分成更易于管理（即：人类可读）的部分。

## 示例配置文件供参考

首先，一些社区成员提供了他们配置的清理版本（即：不包含 API 密钥/密码）供查看。您可以在 [GitHub 上的示例配置列表](https://github.com/search?q=topic%3Ahome-assistant-config&type=Repositories) 中查看。

由于代码并不总是有注释，请继续阅读以详细了解配置文件的结构方式。

## 分析配置文件

在本节中，我们将使用一些示例配置文件，并更详细地了解它们的结构和格式。

现在您可能认为 **`configuration.yaml`** 在拆分过程中会被替换。然而，它实际上会保留下来，只是以一种更加简洁的形式。

### 核心配置文件

在这个精简版本中，我们仍然需要所谓的核心片段：

```yaml
homeassistant:
  # Name of the location where Home Assistant is running
  name: "My Home Assistant Instance"
  # Location required to calculate the time the sun rises and sets
  latitude: 37
  longitude: -121
  # 'metric' for Metric, 'us_customary' for US Customary
  unit_system: us_customary
  # Pick yours from here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  time_zone: "America/Los_Angeles"
  customize: !include customize.yaml
```

### 缩进、包含、注释和模块化

请注意，`homeassistant:` 之后的每一行都缩进两个空格。由于 Home Assistant 中的配置文件基于 YAML 语言，缩进和间距很重要。还要注意 `customize:` 下面那个看似奇怪的条目。

`!include customize.yaml` 是告诉 Home Assistant 在该位置插入 `customize.yaml` 解析内容的语句。被包含文件的内容必须是 YAML 数据，并且在其包含位置有效。这就是我们将一个庞大且难以阅读的文件（当它变大时）拆分成更易于管理的块的方法。

现在，在我们开始拆分不同组件之前，让我们看看将保留在基础文件中的其他集成（在我们的示例中）：

```yaml
history:
frontend:
logbook:
http:
  api_password: "ImNotTelling!"

ifttt:
  key: ["nope"]

mqtt:
  sensor:
    - name: "test sensor 1"
      state_topic: "test/some_topic1"
    - name: "test sensor 2"
      state_topic: "test/some_topic2"
```

与核心片段一样，缩进很重要：

- 集成标题（`mqtt:`）应该完全左对齐（即没有缩进）。
- 键（`sensor:`）应该缩进两个空格。
- 键 `sensor` 下面的列表 `-` 应该再缩进两个空格，后跟一个空格。
- `mqtt` 传感器列表包含两个配置，每个配置有两个键。

#### 注释

# 符号（井号/磅号）表示"注释"，就命令解释而言。换句话说，任何以 `#` 为前缀的行都会被软件忽略。它仅供人类阅读。注释允许将文件分解以提高可读性，以及在保留条目的同时关闭功能。

#### 模块化和粒度

虽然这些集成中的某些在技术上可以移动到单独的文件中，但它们太小或是"一次性的"，拆分它们是多余的。

现在，假设在 Home Assistant 配置目录中已经为以下每个创建了一个空白文件：

```text
automation.yaml
zone.yaml
sensor.yaml
switch.yaml
device_tracker.yaml
customize.yaml
```

`automation.yaml` 将保存所有自动化集成详细信息。`zone.yaml` 将保存区域集成详细信息，依此类推。这些文件可以随意命名，但给它们起与其功能匹配的名称将使事情更容易跟踪。

在基础配置文件中，添加以下条目：

```yaml
automation: !include automation.yaml
zone: !include zone.yaml
sensor: !include sensor.yaml
switch: !include switch.yaml
device_tracker: !include device_tracker.yaml
```

#### `!include` 语句和包用于拆分文件

嵌套 `!include` 语句（在被 `!include` 的文件中使用 `!include`）也可以工作。

某些集成支持多个顶级 `!include` 语句。这包括定义 IoT 域的集成。例如，`light`、`switch` 或 `sensor`；以及 `automation`、`script` 和 `template` 集成，如果您给每个集成一个不同的标签。

其他集成的配置可以使用包进行拆分。要了解更多信息，请参阅[包](/home-assistant/docs/configuration/packages)页面。

#### 顶级键

`light` 平台的多个顶级键示例。

```yaml
light:
- platform: group
  name: "Bedside Lights"
  entities:
    - light.left_bedside_light
    - light.right_bedside_light

# define more light groups in a separate file
light groups: !include light-groups.yaml

# define some light switch mappings in a different file
light switches: !include light-switches.yaml
```

其中 `light-groups.yaml` 可能如下所示：

```yaml
- platform: group
  name: "Outside Lights"
  entities:
    - light.porch_lights
    - light.patio_lights
 ```
 
`light-switches.yaml` 包含：

```yaml
- platform: switch
  name: "Patio Lights"
  entity_id: switch.patio_lights
  
- platform: switch
  name: "Floor Lamp"
  entity_id: switch.floor_lamp_plug
```

好了，现在基础文件中已经有了单个集成和 `!include` 语句，那么那些额外的文件里该放什么呢？

让我们看看示例中的 `device_tracker.yaml` 文件：

```yaml
- platform: owntracks
- platform: nmap_tracker
  home_interval: 3
  hosts: 192.168.2.0/24

  track_new_devices: true
  interval_seconds: 40
  consider_home: 120
```

这个小例子说明了"拆分"文件是如何工作的。在这种情况下，我们从两个设备追踪器条目（`owntracks` 和 `nmap`）开始。这些文件遵循 ["样式 1"](/home-assistant/getting-started/devices/#style-2-list-each-device-separately)，即完全左对齐的前导条目（`- platform: owntracks`），后跟缩进两个空格的参数条目。

这个（大型）传感器配置为我们提供了另一个示例：

```yaml
### sensor.yaml
### METEOBRIDGE #############################################
- platform: tcp
  name: "Outdoor Temp (Meteobridge)"
  host: 192.168.2.82
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: ""
  unit: C
- platform: tcp
  name: "Outdoor Humidity (Meteobridge)"
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: ""
  unit: Percent

#### STEAM FRIENDS ##################################
- platform: steam_online
  api_key: ["not telling"]
  accounts:
    - 76561198012067051

#### TIME/DATE ##################################
- platform: time_date
  display_options:
    - "time"
    - "date"
- platform: worldclock
  time_zone: Etc/UTC
  name: "UTC"
- platform: worldclock
  time_zone: America/New_York
  name: "Ann Arbor"
```

您会注意到这个示例包含一个次要参数部分（在 steam 部分下），以及注释如何用于将文件分解为部分的更好示例。

以上所有内容都可以在使用包拆分文件时应用。要了解更多信息，请参阅[包](/home-assistant/docs/configuration/packages)页面。

这差不多就是全部内容了。

如果您遇到问题，请检查文件缩进并检查 [Home Assistant 日志](/home-assistant/integrations/logger/#viewing-logs)。如果所有方法都失败了，请前往我们的 [Discord 聊天服务器][discord] 并提问。

## 调试配置文件

如果您有许多配置文件，Home Assistant 提供了一个 CLI，允许您查看它如何解析这些文件。每种安装类型在常见任务中都有自己的章节：

- [操作系统](/home-assistant/common-tasks/os/#configuration-check)
- [容器](/home-assistant/common-tasks/container/#configuration-check)

## 高级用法

我们提供四个高级选项来一次包含整个目录。请注意，您的文件必须具有 `.yaml` 文件扩展名；不支持 `.yml`。

这将允许您从 `.yaml` 文件中 `!include` 具有 `.yml` 扩展名的文件；而这些 `.yml` 文件不会被以下命令本身导入。

- `!include_dir_list` 将目录内容作为列表返回，每个文件内容作为列表中的一个条目。列表条目根据文件名的字母数字顺序排序。
- `!include_dir_named` 将目录内容作为字典返回，映射文件名 => 文件内容。
- `!include_dir_merge_list` 将目录内容作为列表返回，通过将所有文件（应该包含列表）合并为一个大列表。
- `!include_dir_merge_named` 将目录内容作为字典返回，通过加载每个文件并将其合并为一个大字典。

这些操作是递归的。例如，使用 `!include_dir_list automation`，将包含下面显示的所有 6 个文件：

```bash
.
└── .homeassistant
    ├── automation
    │   ├── lights
    │   │   ├── turn_light_off_bedroom.yaml
    │   │   ├── turn_light_off_lounge.yaml
    │   │   ├── turn_light_on_bedroom.yaml
    │   │   └── turn_light_on_lounge.yaml
    │   ├── say_hello.yaml
    │   └── sensors
    │       └── react.yaml
    └── configuration.yaml (not included)
```

### 示例：`!include_dir_list`

`configuration.yaml`

```yaml
automation:
  - alias: "Automation 1"
    triggers:
      - trigger: state
        entity_id: device_tracker.iphone
        to: "home"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.entryway
  - alias: "Automation 2"
    triggers:
      - trigger: state
        entity_id: device_tracker.iphone
        from: "home"
    actions:
      - action: light.turn_off
        target:
          entity_id: light.entryway
```

可以转换为：

`configuration.yaml`

```yaml
automation: !include_dir_list automation/presence/
```

`automation/presence/automation1.yaml`

```yaml
alias: "Automation 1"
triggers:
  - trigger: state
    entity_id: device_tracker.iphone
    to: "home"
actions:
  - action: light.turn_on
    target:
      entity_id: light.entryway
```

`automation/presence/automation2.yaml`

```yaml
alias: "Automation 2"
triggers:
  - trigger: state
    entity_id: device_tracker.iphone
    from: "home"
actions:
  - action: light.turn_off
    target:
      entity_id: light.entryway
```

需要注意的是，使用 `!include_dir_list` 时，每个文件必须只包含**一个**条目。

### 示例：`!include_dir_named`

`configuration.yaml`

```yaml

alexa:
  intents:
    LocateIntent:
      actions:
        action: notify.pushover
        data:
          message: "Your location has been queried via Alexa."
      speech:
        type: plaintext
        text: >
          
            
               is at 
            
          
            I am sorry. Pootie! I do not know where  is.
          
    WhereAreWeIntent:
      speech:
        type: plaintext
        text: >
          
            iPhone is home.
          
            iPhone is not home.
          
```

可以转换为：

`configuration.yaml`

```yaml
alexa:
  intents: !include_dir_named alexa/
```

`alexa/LocateIntent.yaml`

```yaml

actions:
  action: notify.pushover
  data:
    message: "Your location has been queried via Alexa."
speech:
  type: plaintext
  text: >
    
      
         is at 
      
    
      I am sorry. Pootie! I do not know where  is.
    
```

`alexa/WhereAreWeIntent.yaml`

```yaml

speech:
  type: plaintext
  text: >
    
      iPhone is home.
    
      iPhone is not home.
    
```

### 示例：`!include_dir_merge_list`

`configuration.yaml`

```yaml
automation:
  - alias: "Automation 1"
    triggers:
      - trigger: state
        entity_id: device_tracker.iphone
        to: "home"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.entryway
  - alias: "Automation 2"
    triggers:
      - trigger: state
        entity_id: device_tracker.iphone
        from: "home"
    actions:
      - action: light.turn_off
        target:
          entity_id: light.entryway
```

可以转换为：

`configuration.yaml`

```yaml
automation: !include_dir_merge_list automation/
```

`automation/presence.yaml`

```yaml
- alias: "Automation 1"
  triggers:
    - trigger: state
      entity_id: device_tracker.iphone
      to: "home"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.entryway
- alias: "Automation 2"
  triggers:
    - trigger: state
      entity_id: device_tracker.iphone
      from: "home"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.entryway
```

需要注意的是，使用 `!include_dir_merge_list` 时，您必须在每个文件中包含一个列表（每个列表项用连字符 [-] 表示）。每个文件可以包含一个或多个条目。

### 示例：`!include_dir_merge_named`

`configuration.yaml`

```yaml
group:
  bedroom:
    name: "Bedroom"
    entities:
      - light.bedroom_lamp
      - light.bedroom_overhead
  hallway:
    name: "Hallway"
    entities:
      - light.hallway
      - thermostat.home
  front_yard:
    name: "Front Yard"
    entities:
      - light.front_porch
      - light.security
      - light.pathway
      - sensor.mailbox
      - camera.front_porch
```

可以转换为：

`configuration.yaml`

```yaml
group: !include_dir_merge_named group/
```

`group/interior.yaml`

```yaml
bedroom:
  name: "Bedroom"
  entities:
    - light.bedroom_lamp
    - light.bedroom_overhead
hallway:
  name: Hallway
  entities:
    - light.hallway
    - thermostat.home
```

`group/exterior.yaml`

```yaml
front_yard:
  name: "Front Yard"
  entities:
    - light.front_porch
    - light.security
    - light.pathway
    - sensor.mailbox
    - camera.front_porch
```

### 示例：结合 `!include_dir_merge_list` 和 `automations.yaml`

您想以更高级的方式拆分自动化，但仍希望能够[在 UI 中创建自动化](https://my.home-assistant.io/redirect/automations/)？
在上面的章节中，我们介绍了嵌套 `!include`。下面是如何为自动化实现这一点。

使用像 `manual` 或 `ui` 这样的标签，可以在配置中使用多个键：

`configuration.yaml`

```yaml

# My own handmade automations
automation manual: !include_dir_merge_list automations/

# Automations I create in the UI
automation ui: !include automations.yaml
```

[discord]: https://discord.gg/c5DvZ4e
