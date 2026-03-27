---
title: Emulated Hue
description: '请注意，对于新的 Google Home 用户来说，emulatedhue 已不再可用。如果您以前没有配置过并成功使用它，请改用 Google Assistant(/home-assistant/integrations/googleassistant/) 集成或 Nabu Casa。'
ha_category:
  - Hub
ha_release: 0.27
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: emulated_hue
ha_integration_type: integration
ha_codeowners:
  - '@bdraco'
  - '@Tho85'
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Emulated Hue

:::warning
请注意，对于新的 **Google Home** 用户来说，`emulated_hue` 已不再可用。如果您以前没有配置过并成功使用它，请改用 [Google Assistant](/home-assistant/integrations/google_assistant/) 集成或 [Nabu Casa cloud](/home-assistant/integrations/cloud) 集成。


:::
**Emulated Hue** 集成提供一个完全由软件实现的虚拟 [Philips Hue](https://www.philips-hue.com) 网桥，让支持 Hue API 的服务可以与 Home Assistant 实体交互。此功能的主要用途是让 Home Assistant 能在除了配置修改外无需额外成本的情况下，与 Amazon Echo 或 Google Home 协同工作。

这个虚拟网桥可以打开或关闭实体，也可以调整可调光灯的亮度。媒体播放器的音量级别也可以作为亮度来控制。

:::important
Philips Hue 灯具仍然需要物理 Hue Bridge 才能工作，这个虚拟网桥并不能取代物理网桥。它的作用是让 Home Assistant 能把非 Philips Hue 设备以 Philips Hue 设备的形式呈现给 Amazon Echo，从而让 Amazon Echo 通过内建支持来控制它们。

:::
:::tip
建议为运行 Home Assistant 的计算机分配一个静态 IP 地址。这是因为 Amazon Echo 通过 IP 地址发现设备，如果 IP 发生变化，Echo 将无法继续控制这些设备。通常最简单的做法是在路由器中进行设置，详情请参阅您的路由器说明书。

:::
:::note
Google Home 和 Alexa 都会使用它们最初设置时绑定的设备与 `emulated_hue` 通信。换句话说，如果您删除或更换了这个设备，`emulated_hue` 也会失效。若要恢复 `emulated_hue` 功能，请先备份 `config/.storage/emulated_hue.ids` 文件，删除原文件，然后重启您的 Home Assistant 实例。

如果您新增了 Alexa 设备，或者升级到了较新的 Alexa 设备后发现无法找到设备，您必须将 `listen_port` 改为 `80`。如果 Alexa 返回 "value is out of range for device..."，说明在发现过程中开关被自动当成灯具添加了。请在 Alexa 应用中移除这些设备，在 Home Assistant 中打开所有开关，然后在 Alexa 应用中前往 "Add New Device"，选择 "Switch"，再选择 "other"，以正确添加它们。


:::
:::note
[Sleep Cycle](https://www.sleepcycle.com) 和 [Sleep as Android](https://sleep.urbandroid.org) 这类智能闹钟应用可以通过 emulated_hue 打开和关闭实体。Sleep Cycle 仅在 iOS 应用中实现了这一功能，详情请参阅 [Sleep Cycle support](https://support.sleepcycle.com/hc/articles/207670385-Does-Sleep-Cycle-integrates-with-Phillips-Hue-)。该应用需要与 Google Home 相同的配置方式；如果在配置中将类型定义为 Alexa，则无法使用。


:::
:::note
Logitech Harmony 遥控器无法通过 Android 和 iOS 移动应用连接到这个模拟器，因为它们要求按下集线器上的实体按钮。您必须使用原装线缆配合 [MyHarmony 桌面软件](https://support.myharmony.com/download) 进行连接，然后选择 "Scan for Devices"。


:::
### 配置

要启用模拟 Hue 网桥，请将以下任一配置添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Google Home example configuration.yaml entry
emulated_hue:
  listen_port: 80
  # Google Home 无法在其他端口上工作。
```

```yaml
# Amazon Echo example configuration.yaml entry
emulated_hue:
  listen_port: 80
  # Amazon Echo/Alexa 已无法在其他端口上工作。在 Alexa 应用中搜索 "Philips Hue Bridge V1 (round)" 以发现设备。
```

```yaml
type:
  description: 要模拟的助手类型，可为 `alexa` 或 `google_home`。**此配置选项已弃用，并将在未来版本中移除。现在已不再需要定义 type。**
  required: false
  type: string
  default: google_home
host_ip:
  description: 您的 Home Assistant 安装所运行的 IP 地址。如果未指定此选项，集成会尝试自行确定该地址。
  required: false
  type: string
listen_port:
  description: "Hue bridge API Web 服务器运行的端口。可以使用系统上的任意空闲端口。不过，所有新的 Alexa 设备都要求 `listen_port: 80`。如果 Home Assistant 以非 root 用户运行且端口设置小于 `1024`，请参阅下方的 `setcap` 说明。"
  required: false
  type: integer
  default: 8300
advertise_ip:
  description: 如果您需要覆盖用于 UPnP 发现的 IP 地址。（例如，在 Docker 中使用网络隔离时。）
  required: false
  type: string
advertise_port:
  description: 如果您需要专门覆盖通告的 UPnP 端口。
  required: false
  type: integer
upnp_bind_multicast:
  description: 是否将 UPnP（SSDP）监听器绑定到组播地址（239.255.255.250），还是绑定到上方指定的（或自动确定的）单播 `host_ip` 地址。在某些特殊情况下，例如运行在 FreeBSD 或 FreeNAS jail 中时，您可能需要禁用此项。
  required: false
  type: boolean
  default: true
off_maps_to_on_domains:
  description: 会将 "off" 命令映射为 "on" 命令的域。例如，如果列表中包含 `script`，而您让 Alexa "turn off the *water plants* script"，该命令会按您要求她打开该脚本来处理。
  required: false
  type: list
  default: [script, scene]
expose_by_default:
  description: "实体是否默认通过网桥暴露，而不是显式指定暴露（请参见下方的 `emulated_hue` 自定义配置）。警告：如果您的设备很多（所有暴露域合计超过 49 个），请谨慎使用此选项。暴露的设备数量超过 Alexa 支持的上限时，可能会导致它一个设备都看不到。如果您在发现设备时遇到问题，请尝试禁用此项，并一次只显式暴露少量设备，看看能否解决问题。"
  required: false
  type: boolean
  default: true
exposed_domains:
  description: 当 `expose_by_default` 设为 true 时，默认暴露的域。
  required: false
  type: list
  default: [switch, light, group, input_boolean, media_player, fan, humidifier]
entities:
  description: 实体的自定义配置。
  required: false
  type: list
```

完整配置示例如下。请将这些配置项添加到 `configuration.yaml` 文件中。

```yaml
# Example configuration.yaml entry
emulated_hue:
  host_ip: 192.168.1.186
  listen_port: 8300
  advertise_ip: 10.0.0.10
  advertise_port: 8080
  off_maps_to_on_domains:
    - script
    - scene
  expose_by_default: true
  exposed_domains:
    - light
  entities:
    light.bedroom_light:
      name: "Bedside Lamp"
    light.ceiling_lights:
      hidden: true
```

以下属性可用于 `entities` 部分：

- **name**（*可选*）：emulated Hue 使用的名称。默认值为实体的友好名称。
- **hidden**（*可选*）：emulated Hue 网桥是否应暴露该实体。添加 `hidden: false` 会将实体暴露给 Alexa。此属性的默认值由 `expose_by_default` 选项控制。

:::note
这些属性过去位于 `homeassistant` 的 `customize` 部分，但现在已经移动到 `entities` 中。`homeassistant.customize` 下的 Emulated Hue 配置将在不久的将来弃用。


:::
### 故障排除

您可以在本地浏览器中访问以下 URL，以确认 `emulated_hue` 集成已加载并正在响应：

- `http://<HA IP Address>:80/description.xml` - 此 URL 应返回一个 XML 格式的描述文件。
- `http://<HA IP Address>:80/api/v2/lights` - 此 URL 会返回 `emulated_hue` 暴露给 Alexa 的设备、灯具、场景、组等列表。

您可以使用 `curl` 命令打开或关闭灯具：

- `curl -X PUT -d '{"on":true}' http://<HA IP Address>/api/v2/lights/219/state` - 该命令会打开编号为 219 的灯。

请确认上面的 URL 使用的是端口 80，而不是 8300（例如 `http://<HA IP Address>:80/description.xml`）。Google Home 和 Amazon Alexa/Echo（至少从 2019-08 固件开始）都要求使用端口 80。

### 平台特定说明

#### Home Assistant Core

如果您要以非 root 用户运行 Home Assistant 并使用端口 80，则需要额外执行一步操作。

##### Linux

在 Linux 系统（如 Ubuntu、Debian）上，请执行以下命令，以允许 `emulated_hue` 在非 root 用户下使用端口 80：

```bash
sudo setcap 'cap_net_bind_service=+ep' /srv/homeassistant/homeassistant_venv/bin/python3
```

请注意，具体路径会因安装方式不同而有所差异。例如，如果您按照 [Virtualenv 说明](/home-assistant/installation/linux/) 进行安装，路径会是 `/srv/homeassistant/bin/python3`。

### 许可证

这部分代码的大部分内容基于 Bruce Locke 的 [ha-local-echo](https://github.com/blocke/ha-local-echo) 项目，该项目最初以 MIT 许可证发布。许可证可在[这里](https://github.com/blocke/ha-local-echo/blob/b9bf5dcaae6d8e305e2283179ffba64bde9ed29e/LICENSE)查看。
