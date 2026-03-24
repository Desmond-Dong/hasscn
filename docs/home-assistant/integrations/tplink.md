---
title: TP-Link Smart Home
description: 关于将 TP-Link 智能家居设备集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Climate
  - Fan
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
  - Vacuum
ha_release: 0.89
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@rytilahti'
  - '@bdraco'
  - '@sdb9696'
ha_domain: tplink
ha_platforms:
  - binary_sensor
  - button
  - camera
  - climate
  - diagnostics
  - fan
  - light
  - number
  - select
  - sensor
  - siren
  - switch
  - vacuum
ha_dhcp: true
ha_integration_type: device
ha_quality_scale: platinum
---

**TP-Link Smart Home** 集成可让你控制 [TP-Link Kasa Smart Home 设备](https://www.kasasmart.com/)和 [TP-Link Tapo 设备](https://www.tapo.com/)，包括摄像头、门铃、铃声设备、灯光、插座、墙壁开关、扫地机器人、Hub 及 Hub 挂载设备。

## 你可以如何使用此集成

TP-Link 集成支持多种能力，例如根据计划或事件开关设备、在 Home Assistant 仪表板中监控能耗、查看摄像头实时画面，以及手动或通过自动化控制设备配置。

## 先决条件

新购买的设备在通过集成添加前，需要先完成入网配置。你可以使用 [kasa 命令行工具](https://python-kasa.readthedocs.io/en/latest/cli.html#provisioning)，或先将设备添加到官方 Kasa / Tapo 应用后再尝试添加到 Home Assistant。TP-Link 其他产品的部分应用（如 Deco）也可添加 Kasa 与 Tapo 设备。由于这些设备都使用同一个 TP-Link 云账户授权，因此同样可用于此集成。

如果你的设备是较新的 Kasa 或 Tapo 型号，则需要 TP-Link 云账户用户名与密码用于本地访问认证。
如果你的旧设备当前无需认证，你可以考虑关闭自动固件更新，以维持该行为。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: |
    你的 TP-Link 设备主机名或 IP 地址。
Username:
  description: |
    你的 TP-Link 云账户用户名，也就是区分大小写的邮箱地址。Tapo 及较新的 Kasa 设备必填。
Password:
  description: |
    你的 TP-Link 云账户密码。Tapo 及较新的 Kasa 设备必填。
Live view:
  description: |
    勾选后会为 Tapo 摄像头创建实时画面摄像头实体。需要使用你在 Tapo 应用 **Device Settings** > **Advanced Settings** > **Camera Account** 中设置的摄像头账户凭据。
Camera account username:
  description: |
    你在 Tapo 应用中配置的摄像头账户用户名。
Camera account password:
  description: |
    你在 Tapo 应用中为设备配置的摄像头账户密码。
```

## Supported Devices

最新支持列表（含硬件和固件版本）请参阅 [python-kasa 的 Supported Devices](https://python-kasa.readthedocs.io/en/stable/SUPPORTED.html)。

未列出的设备也可能可用；如遇问题，请向 [python-kasa](https://github.com/python-kasa/python-kasa) 提交缺陷报告。

:::note
Hub 挂载的 Tapo 按钮 S200B 和 S200D 当前不支持按下时告警。

:::
:::note
部分 Tapo 摄像头固件版本在原生 Tapo 应用中未启用 **Tapo Lab** > **Third-Party Compatibility** 时无法认证。
或者你也可以恢复出厂设置，然后阻止设备访问互联网。

:::
### 支持的 Kasa 设备

- **Plugs**: EP10, EP25[^1], HS100[^2], HS103, HS105, HS110, KP100, KP105, KP115, KP125, KP125M[^1], KP401
- **Power Strips**: EP40, EP40M[^1], HS107, HS300, KP200, KP303, KP400
- **Wall Switches**: ES20M, HS200[^2], HS210, HS220[^2], KP405, KS200, KS200M, KS205[^1], KS220, KS220M, KS225[^1], KS230, KS240[^1]
- **Bulbs**: KL110, KL120, KL125, KL130, KL135, KL50, KL60, LB110
- **Light Strips**: KL400L5, KL420L5, KL430
- **Hubs**: KH100[^1]
- **Hub-Connected Devices[^3]**: KE100[^1]

### 支持的 Tapo[^1] 设备

- **Plugs**: P100, P105, P110, P110M, P115, P125M, P135, TP15
- **Power Strips**: P210M, P300, P304M, P306, TP25
- **Wall Switches**: S210, S220, S500D, S505, S505D
- **Bulbs**: L510B, L510E, L530E, L630
- **Light Strips**: L900-10, L900-5, L920-5, L930-5
- **Cameras**: C100, C120, C210, C220, C225, C325WB, C520WS, C720, TC65, TC70
- **Doorbells and chimes**: D100C, D130, D230
- **Vacuums**: RV20 Max Plus, RV30 Max
- **Hubs**: H100, H200
- **Hub-Connected Devices[^3]**: S200B, S200D, T100, T110, T300, T310, T315

[^1]: 该型号需要认证
[^2]: 较新版本需要认证
[^3]: 设备可能可在 TAPO/KASA 品牌 Hub 之间工作


## Supported functionality

### 摄像头、门铃和铃声设备

当前仅支持 Tapo 摄像头、门铃和铃声设备。
要在支持的设备上使用实时画面，你需要在 Tapo 应用 **Device Settings** > **Advanced Settings** > **Camera Account** 中启用摄像头账户。
如果你不想启用，请在添加设备时不要勾选 **Live view**。后续可通过集成条目的 `reconfigure` 选项修改。

根据摄像头支持的功能，你可以控制隐私模式、云台转动、移动侦测告警等设置。

### 灯光

灯泡、灯带和调光开关会创建 light 实体。
根据设备支持能力，集成可调整亮度、颜色、色温和灯效。

如果设备支持灯效，可在灯光卡片底部选择。
也支持灯光预设，可在设备页面的配置预设下拉菜单中设置。

根据设备支持能力，你还可控制开关过渡、自动开关等其他配置。

### 插座和开关

插座、普通墙壁开关和排插会创建 switch 实体。除开关控制外，你还可配置设备支持的选项，如自动开关和自动固件更新。

### 扫地机器人

扫地机器人会创建 vacuum 实体。除启动和暂停外，你还可以让其回充、定位设备并控制风速等配置。

### 能耗监控

如果设备支持能耗监控，会创建对应传感器用于采集能耗指标，并可接入 Home Assistant 能源仪表板。

### Hub 挂载设备

支持多种 Hub 挂载设备，例如提供温控、移动检测、湿度监测和漏水检测的设备。


## 数据更新

设备每 5 秒轮询一次更新数据。当你通过 Home Assistant 更改状态（例如开设备）时，设备状态会立即更新，而不是等待下一次轮询。
该集成通过局域网直连设备，不经过 TP-Link 云。这与原生 Tapo/Kasa 应用不同，后者在设备可联网时会通过 TP-Link 云连接设备。

## Known limitations

### 摄像头连接

部分 Tapo 摄像头固件版本在未启用 **Tapo Lab** > **Third-Party Compatibility** 时无法认证。
或者你也可以恢复出厂设置，然后阻止设备访问互联网。

### Subnets and discovery

如果设备与 Home Assistant 不在同一子网，自动发现将无法工作。
此时建议通过 IP 地址添加设备，并为其配置静态 IP，避免地址变化带来问题。

### Buttons

Hub 挂载的 Tapo 按钮 S200B 和 S200D 当前不支持按下时告警。

### Hub-attached cameras

未来将支持 Hub 挂载摄像头。出于电池续航考虑，这类设备不支持实时画面。

### No light effects on kasa bulbs

Kasa 灯泡当前不支持灯效。

### Kasa power strips

由于设备限制，Kasa 排插子插孔的能耗状态仅每 60 秒更新一次。

如有需要，你可以在 **Developer tools** > **Actions** > **Home Assistant Core Integration: Update entity** 中传入子实体列表以手动触发更新。

## Troubleshooting

### Device connections

- 注意上文关于子网的已知限制。
- 确认用户名是 TP-Link 云账户用户名，即区分大小写的邮箱地址。
- 确认已在 Tapo 应用中启用 **Tapo Lab** > **Third-Party Compatibility**。完成后你可能需要恢复出厂并重新添加到 Tapo 应用。某些排插和插座型号在该设置未正确处理时会连接失败，集成会报通信错误。
- 禁用或移除与本集成支持的 TP-Link 设备冲突的自定义集成。
- 确保 Home Assistant 与设备之间网络连接稳定。
- 在接入新设备前，先断开网络中已存在的 TP-Link/Tapo 设备。TP-Link Simple Setup（TSS）协议会从已有设备共享凭据，可能导致认证异常。若问题持续，请恢复新设备出厂，并在无其他 TP-Link 设备在线时重新添加。
- 查看下方[已报告的连接解决方案](#reported-connection-solutions)。
- 查看[支持设备列表](#supported-devices)，确认设备是否经过测试并受支持。
- 尝试运行 [kasa 工具](https://github.com/python-kasa/python-kasa)连接设备。简单方式是先[安装 uv](https://docs.astral.sh/uv/getting-started/installation/)，再运行 `uvx --from python-kasa kasa --username <tplink cloud username> --password <tplink cloud password>`。
- 提交支持问题。请参阅下文[提交支持问题](#raising-support-issues)指南。

#### Reported connection solutions

以下是 Home Assistant 用户反馈可解决设备连接问题的一些方法：

- 将 TP-Link 云账户邮箱用户名首字母改为大写，这可能是首次在 Tapo 应用输入时被自动大写导致。
- 从 Tapo 应用移除设备后，按正确型号搜索并重新添加（不要使用自动发现）。
- 退出 Tapo 和 Kasa 应用，恢复设备出厂，重新登录 Tapo 应用，再把设备重新添加到 Tapo 应用。
- 针对摄像头，可在 Tapo 应用 **Settings** > **Advanced Settings** > **Camera account** 中先关闭再开启相关选项。
- 针对摄像头，可在 Tapo 应用 **Settings** > **Advanced Settings** > **Camera account** 中重置账户凭据。

### Unavailable entities

如果某些实体已从集成中移除，它们可能显示为 Unavailable。

#### Total consumption 传感器

此实体仅由较旧 Kasa 设备上报。
当前 Tapo 设备和较新的 Kasa 设备不会上报总耗电；在 2024.6 期间曾短暂错误地将“今日耗电”上报为“总耗电”。如果在较新 Kasa 或 Tapo 设备上该实体显示不可用，你可以安全删除。

#### Update available 传感器

该实体因调用 TP-Link 云 API 检查更新时存在稳定性问题而被移除。未来版本会以新的 Update 实体替代。如果你有以 `binary_sensor.` 开头、以 `update` 结尾且显示 Unavailable 的实体 ID，可以安全删除。

### Raising support issues

为便于 TP-Link 集成维护者有效协助排查，请遵循以下指南：

- 在 [Home Assistant Core](https://github.com/home-assistant/core/issues) 提交 issue。
- 尽可能完整填写 issue 模板字段。
- 如适用，请列出你在上文[设备连接故障排除](#device-connections)中已执行的步骤。
- 上传从 Home Assistant 启动到错误出现期间的[调试日志](#enable-debug-logging)。

### Enable debug logging

要捕获从 Home Assistant 启动开始的调试日志，请将 [`configuration.yaml`](https://www.home-assistant.io/docs/configuration/) 更新为如下内容：

```yaml
logger:
  default: warning  # This will already be present. Add the lines below.
  logs:
    homeassistant.components.tplink: debug
    kasa: debug
```

然后重启 Home Assistant，复现错误，并在 **Settings** > **System** > **Logs** > **Download logs** 下载日志。

:::note
排查完成后请记得关闭调试日志，以避免日志过快增长并影响性能。

:::
## 示例

### 自动化思路

- 天黑时自动开灯，并通过语音命令关灯。
- 离家时（基于地理围栏）关闭室内摄像头隐私模式并开启移动侦测，回家后自动切回。

### 灯效服务

有两个可在自动化中使用的灯效服务。

这些服务可用于支持灯效的设备（如灯泡和灯带），但 [Kasa 灯泡](#no-light-effects-on-kasa-bulbs)除外。

#### Random Effect - 动作 `tplink.random_effect`

灯带支持设置随机效果。

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the light strip to set the effect on |
| `init_states` | Initial HSV sequence |
| `backgrounds` | List of HSV sequences (Max 16) |
| `segments` | List of segments (0 for all) |
| `brightness` | Initial brightness |
| `duration` | Duration |
| `transition` | Transition |
| `fadeoff` | Fade off |
| `hue_range` | Range of hue |
| `saturation_range` | Range of saturation |
| `brightness_range` | Range of brightness |
| `transition_range` | Range of transition |
| `random_seed` | Random seed |

```yaml
#Example action
action: tplink.random_effect
target:
  entity_id:
    - light.strip
data:
  init_states: 199,99,96
  backgrounds:
    - - 199
      - 89
      - 50
    - - 160
      - 50
      - 50
    - - 180
      - 100
      - 50
  segments: 0, 2, 4, 6, 8
  brightness: 90
  transition: 2000
  fadeoff: 2000
  hue_range: 340, 360
  saturation_range: 40, 95
  brightness_range: 90, 100
  transition_range: 2000, 6000
  random_seed: 80
```

#### Sequence Effect - 动作 `tplink.sequence_effect`

灯带支持设置序列效果。

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the light strip to set the effect on |
| `sequence` | List of HSV sequences (Max 16) |
| `segments` | List of segments (0 for all) |
| `brightness` | Initial brightness |
| `duration` | Duration |
| `repeat_times` | Repetitions (0 for continuous) |
| `transition` | Transition |
| `spread` | Speed of spread |
| `direction` | Direction |

```yaml
#Example action
action: tplink.sequence_effect
target:
  entity_id:
    - light.strip
data:
  sequence:
    - - 340
      - 20
      - 50
    - - 20
      - 50
      - 50
    - - 0
      - 100
      - 50
  segments: 0, 2, 4, 6, 8
  brightness: 80
  transition: 2000
  spread: 1
  direction: 1
```

## 删除集成

此集成遵循标准移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
