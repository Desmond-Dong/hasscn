# Kira

**Kira** 集成是用于将 Keene Electronics 的 IP 红外 [Kira](https://k2audio.co.uk/collections/ip-and-internet-control) 模块接入 Home Assistant 的主集成。

Home Assistant 目前支持以下设备类型：

* Remote（在 Home Assistant 指示下发射 IR 代码）
* Sensor（接收到特定 IR 信号时触发 Home Assistant 执行某些操作）

某些型号（原版 Kira 和 Kira128）可配置为传感器或遥控器。设为 Standalone 模式时，它们也可以同时承担这两种角色。无线型号受硬件限制，接收器只能作为传感器集成，发射器只能作为遥控器集成。

如果你使用两个或更多 Kira 设备在网络中进行点对点 IR 传输，它们仍可继续执行这一功能，同时也可作为 Home Assistant 的传感器或遥控器使用。

## 配置

```yaml
# configuration.yaml 示例条目
kira:
```

Kira 模块没有内建自动发现机制，因此需要配置为向 Home Assistant 发送数据包。具体过程取决于模块类型。各型号的文档可在[厂商网站](https://www.info.keene-electronics.co.uk)找到。

### 配置选项

```yaml
# configuration.yaml 示例条目
kira:
  sensors:
    - name: kira_sensor
      host: 0.0.0.0
      port: 65432
  remotes:
    - name: kira_remote
      host: 192.168.100.1
      port: 65432
```

```yaml
sensors:
  description: 要注册的 Kira 传感器。
  required: false
  type: map
  keys:
    name:
      description: 此传感器的名称。
      required: false
      type: string
    host:
      description: 此传感器绑定的地址。
      required: false
      default: 0.0.0.0
      type: string
    port:
      description: 用于监听数据包的 UDP 端口。
      required: false
      default: 65432
      type: integer
remotes:
  description: 要注册的 Kira 遥控模块。
  required: false
  type: map
  keys:
    name:
      description: 此遥控器的名称。
      required: false
      type: string
    host:
      description: 用于发送命令的 Kira 模块 IP 地址。
      required: true
      type: string
    port:
      description: 用于发送数据包的 UDP 端口。
      required: false
      default: 65432
      type: integer
```

如果未指定任何传感器或遥控器，将添加一个使用默认值的传感器。

### 实体

重启 Home Assistant 后，你现在应该会看到一个名为 `kira_remote` 的实体（或者你自定义的名称）。可前往 **Settings** > **Developer tools** > **States**，在实体列表中输入 “kira” 进行检查。

<p class='img'>
  <img src='/home-assistant/images/integrations/kira/kira_states.png' />
</p>

### IR 代码

首次加载 Kira 集成时，会在 Home Assistant 配置目录中创建 `kira_codes.yaml`。

```yaml
# kira_codes.yaml 示例条目
- name: LivingRoomTVOn
  code: "K 2322 228A 1126 023E 0227 023E 0207 023F 0658 025D 0207 023F 0227 0220 0227 023F 0222 023E 0222 0220 067D 023F 0658 0222 0227 025C 0640 023F 0658 025D 0640 023E 0658 025D 0640 023F 0222 025C 0207 0222 0678 023E 0207 023F 0227 023F 0222 025C 063B 025C 0640 023E 0660 023E 0658 025D 0207 0222 0678 023E 0660 0220 0678 023E 0202 025D 0207 023F 2000"
  type: kira
- name: HDMI_1
  code: "0000 006d 0026 0000 0155 00aa 0016 0015 0016 0015 0016 0040 0016 0015 0016 0015 0016 0014 0016 0015 0016 0015 0016 0040 0016 0040 0016 0015 0016 0040 0016 0040 0016 0040 0016 0040 0016 0040 0016 0015 0016 0040 0016 0040 0016 0040 0016 0014 0016 0015 0016 0040 0016 0040 0016 0040 0016 0015 0016 0014 0016 0014 0016 0040 0016 0040 0016 0014 0016 0015 0016 060b 0155 0055 0016 0e58 0155 0055 0016 00aa"
  device: LivingRoomTv
  type: pronto
- name: RGB
  code: "F709 DC24"
  device: LivingRoomTv
  type: nec
```

```yaml
name:
  description: 此代码的名称。
  required: true
  type: string
code:
  description: 此代码的数据（见下文）。
  required: true
  type: string
device:
  description: 与此代码关联的设备。
  required: false
  default: unknown
  type: string
type:
  description: 此代码的类型。若省略该字段，会在可能时自动检测类型。
  required: false
  type: string
repeat:
  description: 发送时重复此代码的次数。
  required: false
  default: 1
  type: integer
```

某些厂商（例如 Samsung）要求某个 IR 代码在短时间内连续发送多次（通常为 3 次）。这不适用于绝大多数设备，但在需要时会很有帮助。

你现在需要编辑 `kira_codes.yaml`，确保其中包含你希望 Kira 作为遥控器发射或作为传感器响应的代码。请注意，每次编辑并保存 `kira_codes.yaml` 后，都需要重启 Home Assistant 才能使更改生效，仅重新加载自动化是不够的。

### 遥控器示例

以下示例使用 Panasonic DVD 播放器上的数字 1 按钮：

```yaml
# kira_codes.yaml 示例条目
- name: PanaOne
code: "K 2432 0D31 06EB 0196 01F3 0194 0538 01B4 01D3 01B4 01D1 01B4 01D3 01B4 01D3 01B3 01D3 01B3 01D3 01B4 01D3 01B3 01D3 01B3 01D3 01B4 01D3 01B3 01D3 01B4 0518 01B4 01D3 01B3 01D3 01B4 01D1 01B7 01D1 01B7 01D1 01B4 01D3 01B4 0518 01B4 01D3 01B4 01D1 01B7 0518 01B4 01D3 01B3 01D3 01B4 01D1 01B7 01D1 01B4 01D3 01B4 01D1 01B7 01D1 01B7 01D1 01B4 01D3 01B4 01D1 01B7 01D1 01B4 01D3 01B4 0518 01B4 01D3 01B4 01D1 01B7 01D1 01B7 01D1 01B4 01D3 01B4 01D1 01B7 01D1 01B4 01D3 01B4 01D1 01B7 01D1 01B4 0518 01B7 2000"
device: DVD
type: kira
```

前往“Configuration”，选择“Scripts”，然后点击添加新脚本。以下是使用上方 Panasonic 代码的示例。

<p class='img'>
  <img src='/home-assistant/images/integrations/kira/kira_remote_script.png' />
</p>

填写与 YAML 条目对应的数据后，保存脚本，并点击你设置的名称旁边的播放按钮进行测试。如果一切正常，Kira 模块现在应会发射该 IR 代码并控制你的设备。

<p class='img'>
  <img src='/home-assistant/images/integrations/kira/kira_test_script.png' />
</p>

确认代码可以正常工作且流程正确后，你就可以通过多种方式使用该功能，例如根据传感器读数触发输出，或在 Home Assistant 前端中添加多个按钮作为虚拟遥控器。

### 传感器示例

以下示例使用 Panasonic DVD 播放器上的数字 1 和 2 按钮：

```yaml
# kira_codes.yaml 示例条目
- name: PanaOne
  code: "K 2432 0D31 06EB 0196 01F3 0194 0538 01B4 01D3 01B4 01D1 01B4 01D3 01B4 01D3 01B3 01D3 01B3 01D3 01B4 01D3 01B3 01D3 01B3 01D3 01B4 01D3 01B3 01D3 01B4 0518 01B4 01D3 01B3 01D3 01B4 01D1 01B7 01D1 01B7 01D1 01B4 01D3 01B4 0518 01B4 01D3 01B4 01D1 01B7 0518 01B4 01D3 01B3 01D3 01B4 01D1 01B7 01D1 01B4 01D3 01B4 01D1 01B7 01D1 01B7 01D1 01B4 01D3 01B4 01D1 01B7 01D1 01B4 01D3 01B4 0518 01B4 01D3 01B4 01D1 01B7 01D1 01B7 01D1 01B4 01D3 01B4 01D1 01B7 01D1 01B4 01D3 01B4 01D1 01B7 01D1 01B4 0518 01B7 2000"
  device: DVD
  type: kira

- name: PanaTwo
  code: "K 2432 0D30 06EE 0192 01F6 0192 053A 0192 01F3 0194 01F3 0194 01F3 0192 01F6 0192 01F3 0194 01F3 0192 01F6 0192 01F3 0194 01F3 0192 01F6 0192 01F3 0194 053A 0192 01F3 0194 01F3 0194 01F3 0194 01F3 0192 01F3 0194 01F3 0194 053A 0192 01F6 0192 01F3 0194 053A 0192 01F3 0194 01F3 0194 01F3 0194 01F3 0192 01F6 0192 01F3 0194 01F3 0192 01F3 0194 053A 0194 01F3 0194 01F3 0192 01F6 0192 053A 0192 01F3 0194 01F3 0194 01F3 0194 053A 0192 01F3 0194 01F3 0194 01F3 0194 01F3 0192 01F6 0192 01F3 0194 053A 0192 2000"
  device: DVD
  type: kira
```

访问 Kira 模块配置页面，并根据你的模块用途确认做出以下更改：

如果这是 Kira 模块的唯一用途，请将 TARGET IP 地址设置为你的 Home Assistant 安装实例地址。如果有“auto find”选项，请取消勾选。点击保存并重启模块。

如果 Kira 模块要与另一模块配合用于 IR over IP，请将 TARGET IP 地址保留为（或设置为）另一台 Kira 模块的地址；此时应将 COMPUTER IP 地址设置为你的 Home Assistant 安装实例的 IP 地址。如果有 “send to alternative device” 选项，请勾选。点击保存并重启以使更改生效。

请注意，一旦更改了 COMPUTER IP，你将无法再在 PC 上使用 Kira 工具来捕获 IR 代码。

接下来，在 Home Assistant 中前往 Developer tools -> States，向下滚动直到看到 `sensor.kira_(你设置的名称)`。将遥控器对准 Kira 设备，并按下你已保存代码的按钮。如果一切正常，你应会看到状态变为你为该代码设置的名称。

<p class='img'>
  <img src='/home-assistant/images/integrations/kira/kira_sensor_states.png' />
</p>

以下是使用这些 IR 代码切换 Sonoff 插座的自动化示例。

```yaml
# kira_sensor 示例
- alias: "Panasonic 开启"
  description: "打开 Sonoff S20 继电器"
  triggers:
    - trigger: state
      entity_id: sensor.kira_wireless
      to: "PanaOne"
  actions:
    - device_id: 3628b4f34df943b3b721ead954cf3ca7
      domain: switch
      entity_id: switch.plug2_relay
      type: turn_on

- alias: "Panasonic 关闭"
  description: "关闭 Sonoff S20 继电器"
  triggers:
    - trigger: state
      entity_id: sensor.kira_wireless
      to: "PanaTwo"
  actions:
    - device_id: 3628b4f34df943b3b721ead954cf3ca7
      domain: switch
      entity_id: switch.plug2_relay
      type: turn_off
```

### 代码类型

在 `kira_codes.yaml` 中创建条目时，可以使用几种不同类型的代码。

* **kira**：这是 Kira 模块使用的原生有线协议。可通过厂商网站提供的免费 Kira 工具进行捕获。
* **pronto**：支持 Pronto 代码。
* **nec**：如果设备使用 NEC IR 代码且厂商已公开这些代码，也可以在这里使用。

**注意**：NEC 代码本身包含足够的信息来识别 IR 序列，但不足以重建它。这类代码只能接收使用（可供传感器使用，不能供遥控器使用）。
