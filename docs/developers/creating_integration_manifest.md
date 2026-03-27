---
title: "集成清单"
description: '每个集成都有一个 manifest 文件，用于声明其基础信息。该文件以 manifest.json 的形式存放在集成目录中，并且是必需的。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: "manifest"
---
# 集成清单

每个集成都有一个 `manifest` 文件，用于声明其基础信息。该文件以 `manifest.json` 的形式存放在集成目录中，并且是必需的。

```json
{
  "domain": "hue",
  "name": "Philips Hue",
  "after_dependencies": ["http"],
  "codeowners": ["@balloob"],
  "dependencies": ["mqtt"],
  "documentation": "https://www.home-assistant.io/components/hue",
  "integration_type": "hub",
  "iot_class": "local_polling",
  "issue_tracker": "https://github.com/balloob/hue/issues",
  "loggers": ["aiohue"],
  "requirements": ["aiohue==1.9.1"],
  "quality_scale": "platinum"
}
```

也可以使用下面这个最小示例作为起点：

```json
{
  "domain": "your_domain_name",
  "name": "Your Integration",
  "codeowners": [],
  "dependencies": [],
  "documentation": "https://www.example.com",
  "integration_type": "hub",
  "iot_class": "cloud_polling",
  "requirements": []
}
```

## 域

域是由小写字符和下划线组成的简短标识符。该值必须唯一且不可更改。移动应用集成的域名示例为 `mobile_app`。`domain` 必须与该集成所在的目录名一致。

## 名称

集成名称必须遵循以下规则：

- 如果产品或服务同时提供本地和云端集成，则云端变体应在名称后追加 “Cloud”（例如 **LIFX Cloud**）。
- 本地变体（或同时支持本地和云端通信的变体）应直接使用产品或服务原名（例如 **LIFX**），不要追加“本地”等后缀。
- 对于本质上就是云服务的产品或服务，应直接使用其原始名称，不要额外添加后缀（例如 **iCloud**，而不是 **iCloud Cloud**）。

## 版本

对于 Core 集成，应省略该字段。

自定义集成必须提供 `version`。该版本号必须是 [AwesomeVersion](https://github.com/ludeeus/awesomeversion) 支持的有效版本格式，例如 [CalVer](https://calver.org/) 或 [SemVer](https://semver.org/)。

## 集成类型

集成分为多种类型。每个集成都必须在 manifest 中提供 `integration_type`，用于描述其主要定位。

:::warning
对使用 config flow 的 Core 集成而言，`integration_type` 是必填项。对于自定义集成和基于 YAML 的集成，如果未设置 `integration_type`，默认值为 `hub`，但仍建议显式声明正确的类型。
:::

| 类型 | 说明 |
| ---- | -----------
|`device`|提供单个设备，例如 ESPHome。|
|`entity`|提供基础实体平台，例如传感器或灯。通常不应使用。|
|`hardware`|提供硬件类集成，例如 Raspberry Pi 或 Hardkernel。通常不应使用。|
|`helper`|提供实体，用于帮助用户实现如 input boolean、导数或组等自动化功能。|
|`hub`|提供一个可连接多个设备或服务的集线器型集成，例如 Philips Hue。|
|`service`|提供单一服务，例如 DuckDNS 或 AdGuard。|
|`system`|系统级集成，属于保留类型，通常不应使用。|
|`virtual`|并非真正的集成，而是指向另一个集成或某种物联网标准。参见[虚拟集成](#虚拟集成)。|

:::info
`hub` 与 `service` / `device` 的区别取决于集成本身的性质。`hub` 提供通向多个其他设备或服务的入口；`service` 和 `device` 则是按单个设备或单项服务来提供能力。
:::

## 文档

这里填写介绍如何使用该集成的文档地址。如果该集成将被纳入 Home Assistant，则应填写 `https://www.home-assistant.io/integrations/<domain>`。

## 问题跟踪器

这里填写该集成的问题跟踪地址，用户遇到问题时可在此提交反馈。
如果该集成将被纳入 Home Assistant，则应省略此字段。对于内置集成，Home Assistant 会自动生成正确的链接。

## 依赖关系

`dependencies` 用于声明在当前集成加载前，必须先成功设置的其他 Home Assistant 集成。将某个集成加入 `dependencies` 后，可以确保它会先被加载，但不能保证其所有配置条目都已经完成设置。如果您需要依赖其他集成提供的功能（例如 Webhook 或 MQTT 连接），可能就需要添加依赖项。如果依赖是可选的而非关键性的，使用[after_dependencies](#依赖之后)通常更合适。关于 MQTT 的更多说明，请参阅[MQTT](#mqtt)。

内置集成只能在 `dependencies` 中声明其他内置集成。自定义集成则可以在 `dependencies` 中声明内置集成和自定义集成。

## 依赖之后

此选项用于声明集成可能会使用、但不是必需的依赖项。设置了 `after_dependencies` 后，当前集成会在这些依赖集成（通过 YAML 或配置条目配置）完成设置后再继续设置。它还会确保这些依赖集成的 `requirements` 已安装，从而使当前集成可以安全地导入相关模块，而不必关心这些依赖是否已经配置。例如，如果 `camera` 集成在某些场景下可能会使用 `stream` 集成，那么将 `stream` 添加到 `camera` 的 `after_dependencies` 中后，就能保证在 `stream` 已配置的情况下它会先于 `camera` 加载，同时其依赖也已安装；如果 `stream` 未配置，`camera` 仍然可以正常加载。

内置集成只能在 `after_dependencies` 中声明其他内置集成。自定义集成则可以在 `after_dependencies` 中声明内置集成和自定义集成。

## 代码所有者

这里填写负责该集成的 GitHub 用户名或团队名称。至少应包含您自己的 GitHub 用户名，以及帮助编写该集成代码的其他贡献者。

## 配置流

如果您的集成带有 config flow，请设置 `config_flow` 键以启用配置条目。设置后，集成目录中必须存在 `config_flow.py`。

```json
{
  "config_flow": true
}
```

### 仅允许单个配置条目

如果您的集成只支持一个配置条目，请设置 `single_config_entry`。设置后，用户将无法再为该集成添加多个配置条目。

```json
{
  "single_config_entry": true
}
```

## requirements

`requirements` 是当前集成所依赖的 Python 库或模块，通常通过 `pip` 安装。若未使用 `venv`，Home Assistant 会尝试将这些依赖安装到[配置目录](https://www.home-assistant.io/docs/configuration/)下的 `deps` 子目录；若在虚拟环境中运行，则会安装到类似 `path/to/venv/lib/python3.6/site-packages` 的位置。这样可以确保这些依赖在启动时可用。如果安装失败，例如缺少用于编译模块的软件包，或发生其他安装错误，则该集成将无法加载。

`requirements` 是字符串数组。每个条目都必须是 `pip` 可识别的依赖说明。例如，Cast 媒体播放器平台依赖 Python 包 PyChromecast v3.2.0：`["pychromecast==3.2.0"]`。

### 在开发和测试期间使用自定义 requirements

在开发集成时，测试不同版本的依赖有时会很有帮助。以 `pychromecast` 为例，可以分两步完成：

```shell
pip install pychromecast==3.2.0 --target ~/.homeassistant/deps
hass --skip-pip-packages pychromecast
```

这样会使用指定版本的依赖，并阻止 Home Assistant 用 `requirements` 中声明的版本覆盖它。如果想在不单独指定依赖项的情况下阻止任何包被自动覆盖，可以使用全局 `--skip-pip` 参数启动 Home Assistant。

如果您需要修改某个依赖来支持自己的集成，也可以通过 `pip install -e` 安装该依赖的开发版本：

```shell
git clone https://github.com/balloob/pychromecast.git
pip install -e ./pychromecast
hass --skip-pip-packages pychromecast
```

也可以直接从公开的 git 仓库安装依赖。例如，这在依赖尚未发布到 PyPI、但您想先测试其修改内容时非常有用。语法如下：

```json
{
  "requirements": ["<library>@git+https://github.com/<user>/<project>.git@<git ref>"]
}
```
`<git ref>` 可以是任意 git 引用，例如分支、标签或提交哈希。详见 [pip 关于 git 支持的文档](https://pip.pypa.io/en/stable/topics/vcs-support/#git)。

下面的示例将直接从 GitHub 安装 `pycoolmaster` 仓库中的 `except_connect` 分支：

```json
{
  "requirements": ["pycoolmaster@git+https://github.com/issacg/pycoolmaster.git@except_connect"]
}
```

### 自定义集成的 requirements

自定义集成的 `requirements` 中，只应包含 Home Assistant Core 的 `requirements.txt` 中尚未包含的依赖。[requirements.txt](https://github.com/home-assistant/core/blob/dev/requirements.txt)

## loggers

`loggers` 字段用于列出该集成使用的 logger 名称，也就是传给 [`logging.getLogger`](https://docs.python.org/3/library/logging.html?highlight=logging#logging.getLogger) 的名称。

## Bluetooth

如果您的集成支持通过 Bluetooth 发现，可以在 manifest 中添加匹配器。如果用户已加载 `bluetooth` 集成，那么当发现匹配设备时，会进入您集成 config flow 的 `bluetooth` 步骤。我们支持通过匹配 `connectable`、`local_name`、`service_uuid`、`service_data_uuid`、`manufacturer_id` 和 `manufacturer_data_start` 来监听 Bluetooth 发现。`manufacturer_data_start` 需要填写一个字节列表，其中每个值都是 0-255 的整数。manifest 中该字段的值是一个匹配器字典列表；只要某个匹配器中声明的所有项目都在 Bluetooth 数据中命中，就会发现该集成。重复项应由您的 config flow 负责过滤。

`local_name` 匹配模式的前 3 个字符中不得包含通配模式。

如果设备只需要广播数据，则将 `connectable` 设为 `false`，这样即可从不支持建立连接的 Bluetooth 控制器接收发现事件。

下面的示例将匹配 Nespresso Prodigio 设备：

```json
{
  "bluetooth": [
    {
      "local_name": "Prodigio_*"
    }
  ]
}
```

下面的示例将按 128 位 UUID 匹配用于 SwitchBot Bot 和 Curtain 设备的服务数据：

```json
{
  "bluetooth": [
    {
      "service_uuid": "cba20d00-224d-11e6-9fb8-0002a5d5c51b"
    }
  ]
}
```

如果要按 16 位 UUID 匹配服务数据，必须先将其转换为 128 位 UUID：把 `00000000-0000-1000-8000-00805f9b34fb` 中的第 3、4 个字节替换为对应的 16 位 UUID。例如，对于 SwitchBot 传感器设备，16 位 UUID 为 `0xfd3d`，对应的 128 位 UUID 就是 `0000fd3d-0000-1000-8000-00805f9b34fb`。因此，下面的示例会按该 16 位 UUID 对应的 128 位值来匹配 SwitchBot 传感器设备的服务数据：

```json
{
  "bluetooth": [
    {
      "service_data_uuid": "0000fd3d-0000-1000-8000-00805f9b34fb"
    }
  ]
}
```

下面的示例将匹配 HomeKit 设备：


```json
{
  "bluetooth": [
    {
      "manufacturer_id": 76,
      "manufacturer_data_start": [6]
    }
  ]
}
```


## 零配置

如果您的集成支持通过 [Zeroconf](https://en.wikipedia.org/wiki/Zero-configuration_networking) 发现，可以在 manifest 中添加对应类型。如果用户已加载 `zeroconf` 集成，那么当设备被发现时，会进入您集成 config flow 的 `zeroconf` 步骤。

`zeroconf` 是一个列表，因此您可以声明多种要匹配的类型。

```json
{
  "zeroconf": ["_googlecast._tcp.local."]
}
```

某些 Zeroconf 类型过于通用（例如 `_printer._tcp.local.`、`_axis-video._tcp.local.` 或 `_http._tcp.local`）。这种情况下，您应当额外添加名称 (`name`) 或属性 (`properties`) 过滤条件：

```json
{
  "zeroconf": [
    {"type":"_axis-video._tcp.local.","properties":{"macaddress":"00408c*"}},
    {"type":"_axis-video._tcp.local.","name":"example*"},
    {"type":"_airplay._tcp.local.","properties":{"am":"audioaccessory*"}},
   ]
}
```

请注意，`properties` 过滤器中的所有值都必须为小写，并且可以使用 `fnmatch` 风格的通配符。

## SSDP

如果您的集成支持通过 [SSDP](https://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol) 发现，可以在 manifest 中添加对应类型。如果用户已加载 `ssdp` 集成，那么当设备被发现时，会进入您集成 config flow 的 `ssdp` 步骤。我们支持基于 SSDP 的 `ST`、`USN`、`EXT` 和 `Server` 头（头名称为小写）以及 [UPnP 设备描述](https://openconnectivity.org/developer/specifications/upnp-resources/upnp/basic-device-v1-0/)中的数据进行匹配。manifest 中该字段的值是匹配器字典列表；只要某个匹配器中声明的所有项目都在 SSDP/UPnP 数据中命中，就会发现该集成。重复项应由您的 config flow 负责过滤。

下面的示例包含一个由 3 个条件组成的匹配器，只有全部命中时才会触发发现。

```json
{
  "ssdp": [
    {
      "st": "roku:ecp",
      "manufacturer": "Roku",
      "deviceType": "urn:roku-com:device:player:1-0"
    }
  ]
}
```

## HomeKit

如果您的集成支持通过 HomeKit 发现，可以在 manifest 中添加支持的型号名称。如果用户已加载 `zeroconf` 集成，那么当设备被发现时，会进入您集成 config flow 的 `homekit` 步骤。

HomeKit 发现的匹配逻辑是：检查发现到的型号名称，是否以 `manifest.json` 中指定的任一型号前缀开头。

```json
{
  "homekit": {
    "models": [
      "LIFX"
    ]
  }
}
```

支持通过 HomeKit 发现，并不意味着您必须使用 HomeKit 协议与设备通信。您仍然可以按最适合的方式与设备交互。

当发现信息因 manifest 中该条目而被路由到此集成后，它就不会再被转发给那些监听 HomeKit Zeroconf 类型的其他集成。

## MQTT

如果您的集成支持通过 MQTT 发现，可以添加用于发现的主题。如果用户已加载 `mqtt` 集成，那么当检测到匹配内容时，会进入您集成 config flow 的 `mqtt` 步骤。

MQTT 发现的工作方式是订阅 `manifest.json` 中声明的 MQTT 主题。

```json
{
  "mqtt": [
    "tasmota/discovery/#"
  ]
}
```

如果您的集成依赖 `mqtt`，请确保将其添加到[dependencies](#依赖关系)。

依赖 MQTT 的集成应在订阅前调用 `await mqtt.async_wait_for_mqtt_client(hass)`，等待 MQTT 客户端可用。`async_wait_for_mqtt_client` 会阻塞，直到 MQTT 客户端可用后返回 `True`。

## DHCP

如果您的集成支持通过 DHCP 发现，可以在 manifest 中添加对应类型。如果用户已加载 `dhcp` 集成，那么当设备被发现时，会进入您集成 config flow 的 `dhcp` 步骤。我们支持通过 `hostname`、[OUI](https://en.wikipedia.org/wiki/Organizationally_unique_identifier) 被动监听 DHCP 发现，或在 `registered_devices` 设为 `true` 时匹配设备注册表中的 MAC 地址。manifest 中该字段的值是匹配器字典列表；只要某个匹配器中声明的所有项目都在 DHCP 数据中命中，就会发现该集成。匹配规则使用 [Unix 文件名模式匹配](https://docs.python.org/3/library/fnmatch.html)。重复项应由您的 config flow 负责过滤。

如果某个集成希望接收发现事件，以便在设备在线时更新其 IP 地址，但 `hostname` 或 `oui` 的匹配范围过宽，而且该设备已经通过 `CONNECTION_NETWORK_MAC` 的 MAC 地址注册到设备注册表中，那么应添加一个 DHCP 条目，并将 `registered_devices` 设为 `true`。

如果集成同时支持 `zeroconf` 或 `ssdp`，通常应优先使用它们，而不是 `dhcp`，因为前者通常能带来更好的性能和用户体验。

下面的示例包含两个匹配器，每个匹配器都由两个条件组成。只要任一匹配器中的所有条件都命中，就会触发发现。

例如：

- 如果 `hostname` 是 `Rachio-XYZ` 且 `macaddress` 是 `00:9D:6B:55:12:AA`，则会触发发现（匹配第一个匹配器）。
- 如果 `hostname` 是 `Dachio-XYZ` 或 `Pachio-XYZ`，且 `macaddress` 是 `00:9D:6B:55:12:AA`，则会触发发现（匹配第二个匹配器）。
- 如果 `hostname` 是 `Rachio-XYZ`，但 `macaddress` 是 `00:00:00:55:12:AA`，则不会触发发现（MAC 不匹配）。
- 如果 `hostname` 是 `NotRachio-XYZ`，但 `macaddress` 是 `00:9D:6B:55:12:AA`，则不会触发发现（主机名不匹配）。


```json
{
  "dhcp": [
    {
    "hostname": "rachio-*",
    "macaddress": "009D6B*"
    },
    {
    "hostname": "[dp]achio-*",
    "macaddress": "009D6B*"
    }
  ]
}
```

下面是将 `registered_devices` 设为 `true` 的示例：

```json
{
  "dhcp": [
    {
    "hostname": "myintegration-*",
    },
    {
    "registered_devices": true,
    }
  ]
}
```

## USB

如果您的集成支持通过 USB 发现，可以在 manifest 中添加对应类型。如果用户已加载 `usb` 集成，那么当设备被发现时，会进入您集成 config flow 的 `usb` 步骤。我们支持通过 USB 描述符中的 VID（厂商 ID）、PID（设备 ID）、序列号、制造商和描述等信息进行匹配。若需要协助识别这些值，可参阅[如何识别设备](https://wiki.debian.org/HowToIdentifyADevice/USB)。manifest 中该字段的值是匹配器字典列表；只要某个匹配器中声明的所有项目都在 USB 数据中命中，就会发现该集成。重复项应由您的 config flow 负责过滤。

:::warning
某些 VID 和 PID 组合会被许多彼此无关的设备共用。例如，VID `10C4` 与 PID `EA60` 会匹配所有使用 Silicon Labs CP2102 USB 串口桥接芯片的设备。匹配这类设备时，务必同时匹配 `description` 或其他标识信息，以避免误发现。
:::

下面的示例包含多个匹配器。只要任一匹配器中的所有条件都命中，就会触发发现。

例如：

- 如果 `vid` 是 `AAAA` 且 `pid` 是 `AAAA`，则会触发发现。
- 如果 `vid` 是 `AAAA` 但 `pid` 是 `FFFF`，则不会触发发现。
- 如果 `vid` 是 `CCCC` 但 `pid` 是 `AAAA`，则不会触发发现。
- 如果 `vid` 是 `1234`、`pid` 是 `ABCD`、`serial_number` 是 `12345678`、`manufacturer` 是 `Midway USB`、`description` 是 `Version 12 Zigbee Stick`，则会触发发现。

```json
{
  "usb": [
    {
    "vid": "AAAA",
    "pid": "AAAA"
    },
    {
    "vid": "BBBB",
    "pid": "BBBB"
    },
    {
    "vid": "1234",
    "pid": "ABCD",
    "serial_number": "1234*",
    "manufacturer": "*midway*",
    "description": "*zigbee*"
    },
  ]
}
```

## 集成质量等级

[集成质量等级](/developers/core/integration-quality-scale)用于衡量集成在代码质量和用户体验方面的成熟度。质量等级的每个级别都对应一组 requirements；当集成满足该级别的全部 requirements 时，即可视为达到该等级。

新的集成至少需要达到 Bronze 等级，因此请务必查看[集成质量等级](/developers/core/integration-quality-scale)中的 requirements 列表。这会显著改善代码质量和用户体验。

```json
{
 "quality_scale": "silver"
}
```

## IoT 类别

[IoT 类别][iot_class]用于描述集成与设备或服务的连接方式。更多信息可参阅博客文章[《Classifying the Internet of Things》][iot_class]。

清单中接受以下 IoT 类：

- `assumed_state`：无法直接获取设备状态，只能根据最近一次发出的命令来推断状态。
- `cloud_polling`：通过云端连接设备，并依赖可用的互联网连接；状态通过轮询获取，因此更新可能会有延迟。
- `cloud_push`：通过云端连接设备，并依赖可用的互联网连接；一旦有新状态，Home Assistant 会立即收到通知。
- `local_polling`：与设备直接通信；状态通过轮询获取，因此更新可能会有延迟。
- `local_push`：与设备直接通信；一旦有新状态，Home Assistant 会立即收到通知。
- `calculated`：集成本身不负责通信，而是提供计算结果。

[物联网类]：https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#classifiers

## 虚拟集成

有些产品并不是通过以其品牌命名的专用集成来接入的。例如，Yale Home 门锁通过 August 集成接入，宜家 SYMFONISK 产品线则可与 Sonos 集成配合使用。

还有一些产品线只支持通用物联网标准，例如 Zigbee 或 Z-Wave。例如，U-tec ultraloq 通过 Z-Wave 工作，并没有专门的独立集成。

对最终用户来说，如何将这类产品接入 Home Assistant 往往并不直观。为解决这个问题，Home Assistant 提供了“虚拟集成”。虚拟集成不包含真正的实现代码，而是用于帮助用户找到适合其设备的实际集成方式。

虚拟集成只包含一个 manifest 文件，不包含额外代码。它主要分为两类：一种由另一个集成实际提供支持，另一种依赖现有的 IoT 标准。

:::info
虚拟集成只能由 Home Assistant Core 提供，不能由自定义集成提供。
:::

### 由其他集成支持

这类虚拟集成会指向另一个真正提供实现的集成。例如，Yale Home 门锁通过 August（`august`）集成接入。

清单示例：

```json
{
  "domain": "yale_home",
  "name": "Yale Home",
  "integration_type": "virtual",
  "supported_by": "august"
}
```

`domain` 和 `name` 的含义与其他集成相同，但 `integration_type` 需要设为 `virtual`。
该虚拟集成对应域的图标和徽标必须添加到我们的[品牌库](https://github.com/home-assistant/brands/)，在这个例子中应使用 Yale Home 的品牌资源。

`supported_by` 用于指定实际为该产品提供实现的集成域。在上面的示例中，Yale Home 门锁由 August 集成支持，因此该值为 `august`。

结果：

- Yale Home 会出现在用户文档站点的集成列表中，并带有自动生成的占位页面，引导用户前往实际使用的集成。
- 当用户点击“添加集成”时，Yale Home 也会显示在 Home Assistant 中；选中后，系统会说明该产品实际上通过另一个集成接入，并引导用户继续使用对应的配置流。

### IoT 标准

这类虚拟集成表示某产品通过现有 IoT 标准接入设备。例如，U-tec ultraloq 通过 Z-Wave 工作，没有专用的独立集成。

清单示例：

```json
{
  "domain": "ultraloq",
  "name": "ultraloq",
  "integration_type": "virtual",
  "iot_standards": ["zwave"],
}

```

`domain` 和 `name` 的含义与其他集成相同，但 `integration_type` 需要设为 `virtual`。
该虚拟集成对应域的图标和徽标也应添加到我们的[品牌库](https://github.com/home-assistant/brands/)。

`iot_standards` 用于声明该产品所使用的连接标准。在上面的示例中，U-tech ultraloq 通过 Z-Wave 接入 Home Assistant。

结果：

- U-tech ultraloq 会出现在用户文档站点的集成列表中，并带有自动生成的占位页面，引导用户使用对应的标准接入方式。
- 当用户点击“添加集成”时，U-tech ultraloq 也会显示在 Home Assistant 中；选中后，系统会提示用户添加这个 Z-Wave 设备（如果尚未配置 Z-Wave，则会先引导其完成 Z-Wave 设置）。

:::info
品牌层也支持声明[IoT 标准](/developers/creating_integration_brand#物联网标准)。

通常更推荐在品牌层面声明 IoT 标准；只有在可能给最终用户造成困惑时，才使用虚拟集成。
:::
