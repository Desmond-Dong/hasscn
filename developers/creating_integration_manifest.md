每个集成都有一个 manifest 文件，用于指定其基本信息。该文件以 `manifest.json` 的形式存储在你的集成目录中。添加该文件是必需的。

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

或者一个可以直接复制到你的项目中的最小示例：

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

## 域名

domain 是由字符和下划线组成的短名称。该 domain 必须唯一，且无法更改。mobile app 集成的 domain 示例：`mobile_app`。domain 键必须与该文件所在的目录相匹配。

## 名称

集成名称必须遵循以下规则：

* 如果某个产品或服务同时提供本地和云端集成，则云端版本应在名称后附加"Cloud"（例如，**LIFX Cloud**）。
* 本地版本（或同时支持本地和云端通信的版本）应直接使用不带后缀的产品或服务名称（例如，**LIFX**）。不要附加"Local"。
* 对本身即基于云端的产品或服务，其集成应直接使用原名称，不加任何后缀（例如，**iCloud** 而不是 **iCloud Cloud**）。

## 版本

对于核心集成，应省略此项。

自定义集成必须提供集成版本。版本必须是 [AwesomeVersion](https://github.com/ludeeus/awesomeversion) 认可的有效版本，例如 [CalVer](https://calver.org/) 或 [SemVer](https://semver.org/)。

## 集成类型

集成被分为多种类型。每个集成必须在它们的 manifest 中提供一个 `integration_type`，用于描述其主要用途。

:::warning
对于具有 config flow 的核心集成，设置 `integration_type` 是必需的。对于自定义集成和基于 YAML 的集成，如果未设置 `integration_type`，则默认值为 `hub`，但建议显式设置正确的类型。
:::

| 类型 | 描述
| ---- | -----------
| `device` | 提供单个设备，例如 ESPHome。 |
| `entity` | 提供基本的实体 platform，例如 sensor 或 light。通常不应使用。 |
| `hardware` | 提供硬件集成，例如 Raspberry Pi 或 Hardkernel。通常不应使用。 |
| `helper` | 提供实体来帮助用户进行自动化，例如 input boolean、derivative 或 group。 |
| `hub` | 提供 hub 集成，包含多个设备或服务，例如 Philips Hue。 |
| `service` | 提供单个服务，例如 DuckDNS 或 AdGuard。 |
| `system` | 提供系统集成，是预留的，通常不应使用。 |
| `virtual` | 本身并不是一个集成。它指向另一个集成或 IoT 标准。请参阅 [virtual integration](#virtual-integration) 部分。 |

:::info
`hub` 与 `service` 或 `device` 之间的区别由集成的性质决定。`hub` 提供通往多个其他设备或服务的网关。`service` 和 `device` 是每次 config entry 提供一个设备或服务的集成。
:::

## 文档

包含集成使用文档的网站。如果该集成正在提交以纳入 Home Assistant，则应该是 `https://www.home-assistant.io/integrations/<domain>`。

## 问题跟踪器

你集成的 issue tracker，用户在此报告问题。如果该集成正在提交以纳入 Home Assistant，则应省略此项。对于内置集成，Home Assistant 会自动生成正确的链接。

## 依赖项

依赖项是指其他 Home Assistant 集成，你需要 Home Assistant 在加载本集成之前成功设置它们。将某个集成添加到 dependencies 中，可以确保被依赖的集成先于本集成加载，但这并不能保证所有依赖的配置条目（config entry）都已设置完成。如果你希望提供来自其他集成的功能（例如 webhooks 或 MQTT 连接），添加依赖项可能是必要的。如果某个依赖项是可选的但不是关键性的，添加一个[后置依赖（after dependency）](#after-dependencies)可能是更好的选择。有关在 MQTT 方面的处理详情，请参阅 [MQTT 部分](#mqtt)。

内置集成在 `dependencies` 中只能指定其他内置集成。自定义集成可以在 `dependencies` 中同时指定内置集成和自定义集成。

## 后置依赖项

此选项用于指定集成可能会使用但不是必需的依赖项。当存在 `after_dependencies` 时，集成的设置会等待 `after_dependencies` 中列出的集成（通过 YAML 或 config entry 配置的）先完成设置，然后再设置本集成。它还会确保安装 `after_dependencies` 的 requirements，以便集成中的方法可以安全地导入，而不论 `after_dependencies` 中列出的集成是否已配置。例如，如果 `camera` 集成在某些配置中可能会使用 `stream` 集成，将 `stream` 添加到 `camera` 的 manifest 的 `after_dependencies` 中，就能确保如果 `stream` 已配置，它会在 `camera` 之前加载，并且 `stream` 的任何依赖都会被安装并可由 `camera` 导入。如果 `stream` 未配置，`camera` 仍然会正常加载。

内置集成在 `after_dependencies` 中只能指定其他内置集成。自定义集成可以在 `after_dependencies` 中同时指定内置集成和自定义集成。

## 代码所有者

负责该集成的 GitHub 用户名或团队名称。你应该至少在此添加自己的 GitHub 用户名，以及所有帮助编写已包含代码的人员。

## 配置流

如果你的集成具有 config flow 以创建 config entry，请指定 `config_flow` 键。当指定时，文件 `config_flow.py` 必须存在于你的集成中。

```json
{
  "config_flow": true
}
```

### 仅支持单个 config entry

如果你的集成只支持一个 config entry，请指定 `single_config_entry` 键。当指定时，将不允许用户为该集成添加多于一个的 config entry。

```json
{
  "single_config_entry": true
}
```

## 需求

requirements 是你在正常使用 `pip` 为你的 component 安装的 Python 库或模块。如果你没有使用 `venv`，Home Assistant 会尝试将 requirements 安装到 Home Assistant[配置目录](https://www.home-assistant.io/docs/configuration/)的 `deps` 子目录中；如果你运行在虚拟环境中，则会安装到类似 `path/to/venv/lib/python3.6/site-packages` 的位置。这将确保在启动时所有 requirements 都已就位。如果某些步骤失败，例如编译模块所需的包缺失或其他安装错误，该 component 将无法加载。

requirements 是一个字符串数组。每个条目都是一个与 `pip` 兼容的字符串。例如，media player 的 Cast platform 依赖于 Python 包 PyChromecast v3.2.0：`["pychromecast==3.2.0"]`。

### 开发和测试期间的自定义 requirements

在开发 component 期间，测试某个 requirement 的不同版本可能很有用。可以分两步完成，以 `pychromecast` 为例：

```shell
pip install pychromecast==3.2.0 --target ~/.homeassistant/deps
hass --skip-pip-packages pychromecast
```

这将使用指定的版本，并阻止 Home Assistant 尝试用 `requirements` 中指定的版本覆盖它。如果要阻止任何包被自动覆盖，而无需指定依赖，可以使用全局 `--skip-pip` 标志启动 Home Assistant。

如果需要修改某个 requirement 以支持你的 component，也可以使用 `pip install -e` 安装该 requirement 的开发版本：

```shell
git clone https://github.com/balloob/pychromecast.git
pip install -e ./pychromecast
hass --skip-pip-packages pychromecast
```

也可以使用公开的 git 仓库来安装 requirement。例如，在将 requirement 依赖的更改发布到 PyPI 之前，测试这些更改非常有用。语法如下：

```json
{
  "requirements": ["<library>@git+https://github.com/<user>/<project>.git@<git ref>"]
}
```

`<git ref>` 可以是任意 git 引用：分支、标签、commit hash 等。请参阅 [PIP 有关 git 支持的文档](https://pip.pypa.io/en/stable/topics/vcs-support/#git)。

以下示例将直接从 GitHub 安装 `pycoolmaster` 库的 `except_connect` 分支：

```json
{
  "requirements": ["pycoolmaster@git+https://github.com/issacg/pycoolmaster.git@except_connect"]
}
```

### 自定义集成的 requirements

自定义集成只应包含 Core [requirements.txt](https://github.com/home-assistant/core/blob/dev/requirements.txt) 中未包含的 requirements。

## 日志记录器

`loggers` 字段是一个名称列表，表示该集成的 requirements 在其 [getLogger](https://docs.python.org/3/library/logging.html?highlight=logging#logging.getLogger) 调用中使用的名称。

## 蓝牙

如果你的集成支持通过蓝牙发现，可以在你的 manifest 中添加一个 matcher。如果用户加载了 `bluetooth` 集成，那么在发现设备时，将加载你的集成的 config flow 的 `bluetooth` 步骤。我们支持通过匹配 `connectable`、`local_name`、`service_uuid`、`service_data_uuid`、`manufacturer_id` 和 `manufacturer_data_start` 来监听蓝牙发现。`manufacturer_data_start` 字段期望一个以 0-255 整数编码的字节列表。manifest 值是一个 matcher 字典列表。如果蓝牙数据中找到了任意指定 matcher 的所有项，你的集成就会被发现。去重则由你的 config flow 负责。

`local_name` 的匹配在前三个（3）字符中不得包含任何模式。

如果设备只需要 advertisement 数据，将 `connectable` 设置为 `false` 将选择加入接收来自那些不支持建立连接的蓝牙控制器的发现。

以下示例将匹配 Nespresso Prodigio 机器：

```json
{
  "bluetooth": [
    {
      "local_name": "Prodigio_*"
    }
  ]
}
```

以下示例将匹配用于 SwitchBot bot 和窗帘设备的 128 位 uuid 的 service data：

```json
{
  "bluetooth": [
    {
      "service_uuid": "cba20d00-224d-11e6-9fb8-0002a5d5c51b"
    }
  ]
}
```

如果你想匹配具有 16 位 uuid 的 service data，需要先将它转换为 128 位 uuid，方法是将 `00000000-0000-1000-8000-00805f9b34fb` 中的第 3 和第 4 个字节替换为 16 位 uuid。例如，对于 Switchbot sensor 设备，16 位 uuid 是 `0xfd3d`，对应的 128 位 uuid 变为 `0000fd3d-0000-1000-8000-00805f9b34fb`。因此，以下示例将匹配用于 SwitchBot sensor 设备的 16 位 uuid 的 service data：

```json
{
  "bluetooth": [
    {
      "service_data_uuid": "0000fd3d-0000-1000-8000-00805f9b34fb"
    }
  ]
}
```

以下示例将匹配 HomeKit 设备：

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

## Zeroconf

如果你的集成支持通过 [Zeroconf](https://en.wikipedia.org/wiki/Zero-configuration_networking) 发现，可以在你的 manifest 中添加类型。如果用户加载了 `zeroconf` 集成，那么在发现设备时，将加载你的集成的 config flow 的 `zeroconf` 步骤。

Zeroconf 是一个列表，因此你可以指定多个类型进行匹配。

```json
{
  "zeroconf": ["_googlecast._tcp.local."]
}
```

某些 zeroconf 类型非常通用（例如 `_printer._tcp.local.`、`_axis-video._tcp.local.` 或 `_http._tcp.local`）。在这种情况下，你应该包含一个 Name（`name`）或 Properties（`properties`）过滤器：

```json
{
  "zeroconf": [
    {"type":"_axis-video._tcp.local.","properties":{"macaddress":"00408c*"}},
    {"type":"_axis-video._tcp.local.","name":"example*"},
    {"type":"_airplay._tcp.local.","properties":{"am":"audioaccessory*"}},
   ]
}
```

注意，`properties` 过滤器中的所有值必须是小写的，并且可以包含 fnmatch 类型的通配符。

## SSDP

如果你的集成支持通过 [SSDP](https://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol) 发现，可以在你的 manifest 中添加类型。如果用户加载了 `ssdp` 集成，那么在发现设备时，将加载你的集成的 config flow 的 `ssdp` 步骤。我们支持通过 SSDP 的 ST、USN、EXT 和 Server 头（头名称小写）以及 [UPnP 设备描述](https://openconnectivity.org/developer/specifications/upnp-resources/upnp/basic-device-v1-0/) 中的数据来进行 SSDP 发现。manifest 值是一个 matcher 字典列表，如果 SSDP/UPnP 数据中找到了任意指定 matcher 的所有项，你的集成就会被发现。去重则由你的 config flow 负责。

以下示例包含一个由三项组成的 matcher，必须全部匹配才能通过此配置进行发现。

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

如果你的集成支持通过 HomeKit 发现，可以在你的 manifest 中添加受支持的型号名称。如果用户加载了 `zeroconf` 集成，那么在发现设备时，将加载你的集成的 config flow 的 `homekit` 步骤。

HomeKit 发现是通过测试发现的模型名是否以 manifest.json 中指定的任何模型名开头来实现的。

```json
{
  "homekit": {
    "models": [
      "LIFX"
    ]
  }
}
```

通过 HomeKit 发现并不意味着你必须使用 HomeKit 协议来与你的设备通信。你可以以任何你合适的方式与设备通信。

当发现信息因为你在 manifest 中的此条目而被路由到你的集成时，该发现信息不再被路由到监听 HomeKit zeroconf 类型的集成。

## MQTT

如果你的集成支持通过 MQTT 发现，可以在你的 manifest 中添加用于发现的 topic。如果用户加载了 `mqtt` 集成，那么在发现设备时，将加载你的集成的 config flow 的 `mqtt` 步骤。

MQTT 发现是通过订阅在 manifest.json 中指定的 MQTT topic 来实现的。

```json
{
  "mqtt": [
    "tasmota/discovery/#"
  ]
}
```

如果你的集成需要 `mqtt`，请确保它被添加到了[依赖项](#dependencies)中。

依赖于 MQTT 的集成应该使用 `await mqtt.async_wait_for_mqtt_client(hass)` 等待 MQTT client 可用后才能订阅。`async_wait_for_mqtt_client` 方法会阻塞，并在 MQTT client 可用时返回 `True`。

## DHCP

如果你的集成支持通过 DHCP 发现，可以在你的 manifest 中添加类型。如果用户加载了 `dhcp` 集成，那么在发现设备时，将加载你的集成的 config flow 的 `dhcp` 步骤。我们支持被动监听 DHCP 发现，基于 `hostname` 和 [OUI](https://en.wikipedia.org/wiki/Organizationally_unique_identifier) 进行匹配，或者在 `registered_devices` 设置为 `true` 时，匹配 device registry 中的 mac address。manifest 值是一个 matcher 字典列表，如果 DHCP 数据中找到了任意指定 matcher 的所有项，你的集成就会被发现。使用[Unix 文件名模式匹配](https://docs.python.org/3/library/fnmatch.html)进行匹配。去重则由你的 config flow 负责。

如果集成希望在设备上线时接收发现流程以更新设备的 IP 地址，但 `hostname` 或 `oui` 匹配过于宽泛，并且它已经使用 `CONNECTION_NETWORK_MAC` 在 device registry 中注册了 mac address，那么它应该添加一个 `registered_devices` 设置为 `true` 的 DHCP 条目。

如果集成支持 `zeroconf` 或 `ssdp`，则应优先于 `dhcp` 使用，因为它通常能提供更好的用户体验。

以下示例包含两个由两项组成的 matcher。任意 matcher 中的所有项都必须匹配，才能通过此配置进行发现。

例如：

* 如果 `hostname` 为 `Rachio-XYZ` 且 `macaddress` 为 `00:9D:6B:55:12:AA`，则会触发发现（第 1 个 matcher）。
* 如果 `hostname` 为 `Dachio-XYZ` 或 `Pachio-XYZ`，且 `macaddress` 为 `00:9D:6B:55:12:AA`，则会触发发现（第 3 个 matcher）。
* 如果 `hostname` 为 `Rachio-XYZ` 且 `macaddress` 为 `00:00:00:55:12:AA`，则不会触发发现（MAC 不匹配）。
* 如果 `hostname` 为 `NotRachio-XYZ` 且 `macaddress` 为 `00:9D:6B:55:12:AA`，则不会触发发现（hostname 不匹配）。

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

设置 `registered_devices` 为 `true` 的示例：

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

如果你的集成支持通过 usb 发现，可以在你的 manifest 中添加类型。如果用户加载了 `usb` 集成，那么在发现设备时，将加载你的集成的 config flow 的 `usb` 步骤。我们通过从 USB 描述符中提取 VID（Vendor ID）、PID（Device ID）、序列号（Serial Number）、制造商（Manufacturer）和描述（Description）来支持发现。有关如何识别这些值的帮助，请参阅[如何识别设备](https://wiki.debian.org/HowToIdentifyADevice/USB)。manifest 值是一个 matcher 字典列表。如果 USB 数据中找到了任意指定 matcher 的所有项，你的集成就会被发现。去重则由你的 config flow 负责。

:::warning
某些 VID 和 PID 组合被许多互不相关的设备使用。例如 VID `10C4` 和 PID `EA60` 可以匹配任何 Silicon Labs CP2102 USB-Serial 桥接芯片。在匹配此类设备时，重要的是要匹配 `description` 或其他标识符，以避免意外的发现。
:::

以下示例包含两个由两项组成的 matcher。任意一个 matcher 中的所有项都必须匹配，才能通过此配置进行发现。

例如：

* 如果 `vid` 为 `AAAA` 且 `pid` 为 `AAAA`，则会触发发现。
* 如果 `vid` 为 `AAAA` 且 `pid` 为 `FFFF`，则不会触发发现。
* 如果 `vid` 为 `CCCC` 且 `pid` 为 `AAAA`，则不会触发发现。
* 如果 `vid` 为 `1234`，`pid` 为 `ABCD`，`serial_number` 为 `12345678`，`manufacturer` 为 `Midway USB`，`description` 为 `Version 12 Zigbee Stick`，则会触发发现。

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

[Integration Quality Scale](/developers/core/integration-quality-scale.md) 根据代码质量和用户体验对集成进行评分。质量等级的每一级都包含一个要求列表。如果集成符合所有要求，则认为它已达到该级别。

新集成至少需要满足 bronze 级别，因此请务必查看[Integration Quality Scale](/developers/core/integration-quality-scale.md)的要求列表。它有助于极大地改进代码和用户体验。

```json
{
 "quality_scale": "silver"
}
```

## IoT 类别

[IoT class][iot_class] 描述集成如何与设备或服务进行连接。有关 IoT 类别的更多信息，请阅读关于["分类物联网"](https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#classifiers)的博客。

manifest 中接受的 IoT 类别如下：

* `assumed_state`：我们无法获取设备的状态。我们只能根据最后一次命令来推测状态。
* `cloud_polling`：此设备的集成通过云端进行，需要活跃的互联网连接。轮询状态意味着状态的更新可能会稍后才会被注意到。
* `cloud_push`：此设备的集成通过云端进行，需要活跃的互联网连接。一旦有新状态可用，Home Assistant 就会收到通知。
* `local_polling`：提供与设备的直接通信。轮询状态意味着状态的更新可能会稍后才会被注意到。
* `local_push`：提供与设备的直接通信。一旦有新状态可用，Home Assistant 就会收到通知。
* `calculated`：集成不自己处理通信，而是提供了一个计算结果。

[iot_class]: https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#classifiers

## 虚拟集成

有些产品是由不以该产品命名的集成支持的。例如，Yale Home 门锁是通过 August 集成集成的，而 IKEA SYMFONISK 产品线可以与 Sonos 集成一起使用。

还有一种情况是，某产品线只支持标准的 IoT 标准，例如 Zigbee 或 Z-Wave。例如，U-tec ultraloq 通过 Z-Wave 工作，没有特定的专用集成。

对于最终用户来说，找到如何将那些产品与 Home Assistant 集成起来可能会感到困惑。为了帮助处理上述情况，Home Assistant 提供了"Virtual integrations"。这些集成并不是真正的集成，而是用于帮助用户为其设备找到正确的集成。

virtual integration 是一个只包含单个 manifest 文件的集成，没有任何其他代码。有两种类型的 virtual integration：由另一个集成支持的 virtual integration 和使用现有 IoT 标准的 virtual integration。

:::info
virtual integration 只能由 Home Assistant Core 提供，不能由自定义集成提供。
:::

### 支持来源

"Supported by" virtual integration 是指向另一个集成的集成，由后者提供其实现。例如，Yale Home 门锁是通过 August (`august`) 集成集成的。

示例 manifest：

```json
{
  "domain": "yale_home",
  "name": "Yale Home",
  "integration_type": "virtual",
  "supported_by": "august"
}
```

`domain` 和 `name` 与其他任何集成相同，但 `integration_type` 设置为 `virtual`。
此 virtual integration 的 domain 的 logo 必须添加到我们的[brands 仓库](https://github.com/home-assistant/brands/)，因此在这种情况下，会使用 Yale Home 的品牌标识。

`supported_by` 是为该产品提供实现的集成的 domain。在上面的示例中，Yale Home 门锁由 August 集成支持，并指向其 domain `august`。

结果：

* Yale Home 会列在我们的用户文档网站的集成部分下，并附带一个自动生成的 stub 页面，引导用户使用该集成。
* Yale Home 会在 Home Assistant 中点击"添加集成"时列出。选中后，我们会向用户解释该产品是通过另一个集成集成的，然后用户继续进入 Xioami Miio 的 config flow。

### IoT 标准

"IoT Standards" virtual integration 是指使用现有 IoT 标准来与设备进行连接的集成。例如，U-tec ultraloq 通过 Z-Wave 工作，没有特定的专用集成。

示例 manifest：

```json
{
  "domain": "ultraloq",
  "name": "ultraloq",
  "integration_type": "virtual",
  "iot_standards": ["zwave"],
}

```

`domain` 和 `name` 与其他任何集成相同，但 `integration_type` 设置为 `virtual`。
此 virtual integration 的 domain 的 logo 应添加到我们的[brands 仓库](https://github.com/home-assistant/brands/)。

`iot_standards` 是该产品用于连接的标准。在上面的示例中，U-tech ultraloq 产品使用 Z-Wave 与 Home Assistant 集成。

结果：

* U-tech ultraloq 会列在我们的用户文档网站的集成部分下，并附带一个自动生成的 stub 页面，引导用户使用该集成。
* U-tech ultraloq 会在 Home Assistant 中点击"添加集成"时列出。选中后，我们会引导用户添加此 Z-Wave 设备（如果 Z-Wave 尚未设置，则先设置 Z-Wave）。

:::info
品牌也[支持设置 IoT 标准](/developers/creating_integration_brand.md#iot-standards)。

优先建议在品牌层面设置 IoT 标准，只有在会对最终用户造成混淆的情况下，才使用 virtual integration。
:::
