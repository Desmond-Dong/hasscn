---
title: HDMI-CEC
description: 关于如何通过 Home Assistant 与 HDMI-CEC 交互的说明。
ha_category:
  - Automation
ha_release: 0.23
ha_iot_class: Local Push
ha_domain: hdmi_cec
ha_platforms:
  - media_player
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@inytar'
ha_quality_scale: legacy
---

**HDMI-CEC** 集成提供了一组操作，可让您选择活动设备、打开所有设备、让所有设备进入待机状态，并为 HDMI 设备创建开关实体。您可以在配置文件中通过关联 HDMI 端口号和设备名称来定义设备。还支持那些提供额外 HDMI 端口的已连接设备，例如条形音箱和 AVR。设备列表是从启用了 CEC 的 Home Assistant 设备视角来描述的。无论设备是否支持 CEC，都可以将其列出。理想情况下，设备上的 HDMI 端口号会正确映射到 CEC 物理地址。如果没有正确映射，请使用 `cec-client`（`libcec` 软件包的一部分）监听 CEC 总线上的流量，并找出正确的编号。

## CEC 设置

### Home Assistant OS

要测试 HDMI-CEC 是否可在您的 Home Assistant OS 安装中正常工作，您可以使用 Home Assistant 官方的 CEC Scanner 应用（以前称为 CEC Scanner 加载项）。运行此应用可查看您的硬件是否具备 HDMI-CEC 功能，以及当前连接了哪些设备。不要为此应用启用 **开机启动**，因为这会干扰该集成。

运行 CEC Scanner 应用后，您就可以使用扫描结果来配置该集成。

### 适配器

运行 Home Assistant 的计算机必须支持 CEC，并且当然还需要通过 HDMI 连接到同样支持 CEC 的设备。如有需要，您可以购买一个 [USB CEC 适配器](https://www.pulse-eight.com/p/104/usb-hdmi-cec-adapter) 来添加支持。请注意，所有 Raspberry Pi 型号都原生支持 CEC。

### libcec

本节仅适用于在 Python 虚拟环境中运行 Home Assistant Core 的用户。

[libcec](https://github.com/Pulse-Eight/libcec) 必须已安装，此集成才能正常工作。请按照链接中针对您环境提供的安装说明进行操作。默认情况下，`libcec` 会将 Python 3 绑定安装为系统 Python 模块。如果您是在 [Python 虚拟环境](/home-assistant/docs/installation/virtualenv/) 中运行 Home Assistant，请确保它可以访问该系统模块，方法是创建符号链接，或使用 `--system-site-packages` 标志。

#### 在虚拟环境中创建符号链接

为 `cec` 安装创建一个符号链接，包括 `_cec.so` 文件。请注意，不同的安装方式会导致 `cec` 所在位置不同。

```bash
ln -s /path/to/your/installation/of/cec.py /path/to/your/venv/lib/python*/site-packages
ln -s /path/to/your/installation/of/_cec.so /path/to/your/venv/lib/python*/site-packages

```

##### 符号链接示例

对于 [在 Raspberry Pi 上手动安装](/home-assistant/installation/raspberrypi/) 的默认虚拟环境，命令如下。

```bash
ln -s /usr/local/lib/python*/dist-packages/cec.py /srv/homeassistant/lib/python*/site-packages
ln -s /usr/local/lib/python*/dist-packages/_cec.so /srv/homeassistant/lib/python*/site-packages
```

:::note
如果在创建符号链接并将 `hdmi_cec:` 添加到配置后，日志中仍出现以下错误：
`* failed to open vchiq instance`，您还需要将运行 Home Assistant 的用户帐户添加到 `video` 组中。要将 Home Assistant 用户帐户加入 `video` 组，请运行以下命令：`$ usermod -a -G video <hass_user_account>`

:::
## 测试您的安装

- 登录到 Raspberry Pi

```bash
ssh pi@your_raspberry_pi_ip
```

- 在命令行中输入：

```bash
echo scan | cec-client -s -d 1
```

注意：要使用此命令，您必须安装 `cec-utils` 软件包。在基于 Debian 的系统上，请运行 `sudo apt install cec-utils`。

- 这将显示总线上的设备列表

```bash
opening a connection to the CEC adapter...
requesting CEC bus information ...
CEC bus information
===================
device #4: Playback 1
address:       3.0.0.0
active source: no
vendor:        Sony
osd string:    BD
CEC version:   1.4
power status:  on
language:      ???
```

:::note
上面的 `address:` 条目将用于配置 Home Assistant，下面示例中的 `3: BlueRay player` 就表示这个地址。

:::
## 配置示例

在以下示例中，一台运行 Home Assistant 的 Pi Zero 连接在电视的 HDMI 1 端口上。HDMI 2 端口连接到 AV 接收器。AV 接收器的 HDMI 1 到 3 端口上又连接了三个设备。

您可以直接将名称映射到设备的物理地址

```yaml
hdmi_cec:
  devices:
    TV: 0.0.0.0
    Pi Zero: 1.0.0.0
    Fire TV Stick: 2.1.0.0
    Chromecast: 2.2.0.0
    Another Device: 2.3.0.0
    BlueRay player: 3.0.0.0
```

或使用端口映射树：

```yaml
hdmi_cec:
  devices:
    1: Pi Zero
    2:
      1: Fire TV Stick
      2: Chromecast
      3: Another Device
    3: BlueRay player
```

两种方案只能选择一种，不能混合使用。

您还可以在配置中使用 `platform` 选项，用于指定 HDMI 设备的默认平台。支持 `switch` 和 `media_player`，默认值为 `switch`。

```yaml
hdmi_cec:
  platform: media_player
```

然后，您可以在自定义配置中为单个设备设置平台：

```yaml
hdmi_cec:
  types:
    hdmi_cec.hdmi_5: media_player
```

最后一个选项是 `host`。PyCEC 支持通过 TCP 转发 CEC 命令。当您在带 HDMI 端口的机器上启动 pyCEC（`python -m pycec`）后，就可以在另一台机器上运行 Home Assistant，并通过 TCP 连接到 CEC。请指定 pyCEC 服务器的 TCP 地址：

```yaml
hdmi_cec:
  host: 192.168.1.3
```

## 操作

### 选择设备

使用 `hdmi_cec.select_device` 操作，并传入配置中的设备名称、`entity_id` 或物理地址来选择设备，例如：

```json
{"device": "Chromecast"}
```

```json
{"device": "switch.hdmi_3"}
```

```json
{"device": "1.1.0.0"}
```

因此，使用上述示例的自动化操作看起来会像这样。

```yaml
actions:
  - action: hdmi_cec.select_device
    data:
      device: Chromecast
```

### 开机

使用 `hdmi_cec.power_on` 操作（无参数）来打开任何支持该功能的设备。

使用上述示例的自动化操作看起来会像这样。

```yaml
actions:
  - action: hdmi_cec.power_on
```

### 待机

使用 `hdmi_cec.standby` 操作（无参数）让任何支持该功能的设备进入待机状态。

使用上述示例的自动化操作看起来会像这样。

```yaml
actions:
  - action: hdmi_cec.standby
```

### 更改音量级别

使用 `hdmi_cec.volume` 操作，并搭配以下任一命令：

#### 调高音量

将音量提高三次：

```json
{"up": 3}
```

持续提高音量，直到调用 release：

```json
{"up": "press"}
```

停止提高音量：

```json
{"up": "release"}
```

#### 调低音量

将音量降低三次：

```json
{"down": 3}
```

持续降低音量，直到调用 release：

```json
{"down": "press"}
```

停止降低音量：

```json
{"down": "release"}
```

#### 静音

切换静音：

```json
{"mute": ""}
```

该值会被忽略。

## 参考资源

- [CEC overview](https://kwikwai.com/knowledge-base/the-hdmi-cec-bus/)
- [CEC-o-matic](https://www.cec-o-matic.com/)
