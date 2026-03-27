---
title: Broadlink
description: 'Broadlink 集成允许您控制和监控 Broadlink 万能遥控器、智能插座、排插、开关和传感器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Climate
  - Light
  - Remote
  - Sensor
  - Switch
ha_release: 0.35
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
  - '@felipediel'
  - '@L-I-Am'
  - '@eifinger'
ha_domain: broadlink
ha_config_flow: true
ha_platforms:
  - climate
  - light
  - remote
  - select
  - sensor
  - switch
  - time
ha_dhcp: true
ha_integration_type: device
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Broadlink

**Broadlink** 集成允许您控制和监控 Broadlink 万能遥控器、智能插座、排插、开关和传感器。

需要制造商的应用程序才能将新设备连接到网络。

支持以下设备：

- 恒温器：`Hysen HY02B05H` 和 `Floureon HY03WE`
- 排插：`MP1-1K3S2U` 和 `MP1-1K4S`
- 传感器：`e-Sensor`
- 智能插座：`SP mini`、`SP mini+`、`SP mini 3`、`SP1`、`SP2`、`SP2-CL`、`SP2-UK/BR/IN`、`SP3`、`SP3-EU`、`SP3S-EU`、`SP3S-US`、`SP4L-EU` 和 `SP4M-US`
- 万能遥控器：`RM mini`、`RM mini 3`、`RM pro`、`RM pro+`、`RM plus`、`RM4 mini`、`RM4 pro`、`RM4C mini`、`RM4C pro` 和 `RM4 TV mate`
- Wi-Fi 控制开关：`BG1`、`SC1`
- 智能灯泡：`LB1`、`LB2`


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 实体和子域

除了自定义 IR/RF 开关外，不再需要设置平台。设备配置完成后，所有实体将自动创建。

实体默认与设备同名。要更改名称、图标或实体 ID，请在前端选择实体并选择右上角的设置图标。如果您认为实体没有用处，也可以在那里禁用它。完成后别忘了选择**更新**以保存您的更改。

实体分为四个子域：

- [Climate](#climate)
- [Remote](#remote)
- [Select](#select)
- [Sensor](#sensor)
- [Switch](#switch)
- [Light](#light)
- [Time](#time)

## Climate

`climate` 实体允许您监控和控制 Broadlink 恒温器。

## Remote

`remote` 实体允许您使用万能遥控器学习和发送代码。当您配置具有 IR/RF 功能的设备时，它们会自动创建。

### 学习命令

使用 `remote.learn_command` 学习 IR 和 RF 代码。这些代码按设备分组，作为命令存储在[存储文件夹](#learned-codes-storage-location)中。稍后可以使用 `remote.send_command` 动作发送它们。

| 数据属性 | 可选 | 描述                           |
| ---------------------- | -------- | ------------------------------------- |
| `entity_id`            | 否       | 遥控器的 ID。                     |
| `device`               | 否       | 要控制的设备名称。  |
| `command`              | 否       | 要学习的命令名称。  |
| `command_type`         | 是      | 命令类型。`ir`（默认）或 `rf`。 |
| `alternative`          | 是      | 切换命令指示器。             |

#### 学习 IR 代码

要学习 IR 代码，请使用设备名称和要学习的命令调用 `remote.learn_command`：

```yaml
# 示例 configuration.yaml 条目
script:
  learn_tv_power:
    sequence:
      - action: remote.learn_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
```

当 LED 闪烁时，将遥控器对准 Broadlink 设备并按下您想学习的按钮。

之后，您可以使用相同的数据调用 `remote.send_command` 来发送代码。您也可以访问存储文件夹中的代码来构建自定义 IR/RF 开关，或使用 `b64:` 前缀发送它。

#### 学习 RF 代码

学习 RF 代码分两步进行。首先使用 `command_type: rf` 选项调用 `remote.learn_command`：

```yaml
# 示例 configuration.yaml 条目
script:
  learn_car_unlock:
    sequence:
      - action: remote.learn_command
        target:
          entity_id: remote.garage
        data:
          device: car
          command: unlock
          command_type: rf
```

当 LED 第一次闪烁时，按住按钮以扫描频率。然后等待 LED 再次闪烁，第二次按下按钮以捕获代码。

代码将以与 IR 代码相同的方式存储。您不需要指定 `command_type` 来发送它们，因为此信息存储在代码的第一个字节中。

_提示：_ 使用动作后点击侧边栏的通知，按照说明确保您在正确的时间按下按钮。

#### 学习命令序列

为了简化学习过程，您可能想要提供要顺序学习的命令列表：

```yaml
# 示例 configuration.yaml 条目
script:
  learn_tv_commands:
    sequence:
      - action: remote.learn_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command:
            - turn on
            - turn off
            - volume up
            - volume down
```

使用此动作后，您将被提示按照提供的相同顺序按下按钮。检查通知以保持进度，并确保在正确的时间按下正确的按钮。

#### 学习备用代码

某些协议需要一个切换位来区分一次按钮按下和另一次。在这种情况下，学习备用代码将显著提高设备的响应率。

当按钮用于多种目的时，切换位很常见，例如电源按钮可以打开和关闭电视，音量按钮可以短按或长按使用。

如果代码有时有效，有时无效，您可以尝试使用 `alternative: true` 选项重新学习它：

```yaml
# 示例 configuration.yaml 条目
script:
  learn_tv_power_button:
    sequence:
      - action: remote.learn_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
          alternative: true
```

当 LED 第一次闪烁时，按下您想学习的按钮。然后等待 LED 再次闪烁并按下相同的按钮。这样做将学习同一命令的两个不同代码，它们将在每次调用时交替发送。

#### 已学习代码存储位置

已学习的代码存储在 `/config/.storage/` 中的 `broadlink_remote_MACADDRESS_codes` JSON 文件中。您可以使用文本编辑器打开此文件并复制代码来设置[自定义 IR/RF 开关](#setting-up-custom-irrf-switches)或将其作为 [base64 代码](#sending-a-base64-code)发送，但请注意：.storage 文件夹中的文件_不应手动编辑_。

### 发送命令

使用 `remote.learn_command` 动作学习 IR 和 RF 代码后，您可以使用 `remote.send_command` 发送它们。您也可以使用此动作发送从其他地方获取的 base64 代码。

| 数据属性 | 可选 | 描述                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | 否       | 遥控器的 ID。                                                      |
| `command`              | 否       | 要发送的命令名称或带有 `b64:` 前缀的 base64 代码。 |
| `device`               | 是      | 要控制的设备名称（base64 代码可选）。       |
| `num_repeats`          | 是      | 重复命令的次数。                                |
| `delay_secs`           | 是      | 一次发送和另一次发送之间的间隔秒数。                      |

#### 发送命令

要发送您已学习的命令，请使用设备名称和要发送的命令调用 `remote.send_command`：

```yaml
# 示例 configuration.yaml 条目
script:
  tv_power:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
```

#### 重复发送命令

使用 `num_repeats:` 多次发送同一命令：

```yaml
# 示例 configuration.yaml 条目
script:
  turn_up_tv_volume_20:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: volume up
          num_repeats: 20
```

#### 发送命令序列

您可以提供要顺序发送的命令列表：

```yaml
# 示例 configuration.yaml 条目
script:
  turn_on_ac:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: air conditioner
          command:
            - turn on
            - turn off display
```

#### 发送 base64 代码

有时您可能想发送从其他地方获取的 base64 代码。使用 `b64:` 前缀：

```yaml
# 示例 configuration.yaml 条目
script:
  turn_on_tv:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          command: b64:JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
```

#### 发送 base64 代码序列

您可以像普通命令一样发送 base64 代码序列：

```yaml
# 示例 configuration.yaml 条目
script:
  turn_on_ac:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          command:
            - b64:JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
            - b64:JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
```

#### 混合命令和 base64 代码

您可以混合命令和 base64 代码：

```yaml
# 示例 configuration.yaml 条目
script:
  turn_on_ac:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command:
            - turn on
            - b64:JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
```

### 删除命令

您可以使用 `remote.delete_command` 删除使用 `remote.learn_command` 动作学习的命令。

| 数据属性 | 可选 | 描述                          |
| ---------------------- | -------- | ------------------------------------ |
| `entity_id`            | 否       | 遥控器的 ID。                    |
| `device`               | 否       | 设备名称。                  |
| `command`              | 否       | 要删除的命令名称。 |

#### 删除命令

要删除命令，请使用设备名称和要删除的命令调用 `remote.delete_command`：

```yaml
# 示例 configuration.yaml 条目
script:
  delete_tv_power:
    sequence:
      - action: remote.delete_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
```

#### 删除多个命令

您可以提供要删除的命令列表：

```yaml
# 示例 configuration.yaml 条目
script:
  delete_tv_commands:
    sequence:
      - action: remote.delete_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command:
            - power
            - source
            - menu
```

## Select

`select` 实体允许您控制 Broadlink 设备的工作日。当您配置支持的设备时，这些实体会自动创建。

## Sensor

`sensor` 实体允许您监控 Broadlink 传感器。当您配置具有传感器的设备时，这些实体会自动创建。

## Light

`light` 实体允许您控制 Broadlink 灯光。您可以打开和关闭它们、更改亮度、调整颜色或设置色温。当您配置具有灯光的设备时，这些实体会自动创建。

## Time

`time` 实体允许您控制 Broadlink 设备的时间。当您配置支持的设备时，这些实体会自动创建。

## Switch

`switch` 实体允许您控制和监控 Broadlink 智能插座、排插和开关。您可以打开和关闭它们，并在可用时监控其状态和功耗。当您配置具有开关的设备时，这些实体会自动创建。

您还可以定义要通过万能遥控设备控制的自定义 IR/RF 开关。

### 设置自定义 IR/RF 开关

第一步是通过配置流程正常配置设备。然后将这些行添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: broadlink
    mac: MAC_ADDRESS
    switches:
      - name: Philips TV
        command_on: JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
        command_off: JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
```

上面的示例创建 `switch.philips_tv`，它使用提供的 MAC 地址的万能遥控器发送 IR/RF 代码。

```yaml
mac:
  description: 万能遥控器的 MAC 地址。
  required: true
  type: string
switches:
  description: 包含所有自定义开关的列表。
  required: true
  type: list
  keys:
    name:
      description: 开关的名称。
      required: true
      type: string
    command_on:
      description: 作为"打开"命令发送的 base64 代码。
      required: false
      type: string
    command_off:
      description: 作为"关闭"命令发送的 base64 代码。
      required: false
      type: string
```

您可以为同一遥控器配置多个开关：

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: broadlink
    mac: MAC_ADDRESS
    switches:
      - name: Philips TV
        command_on: JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
        command_off: JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
      - name: LG TV
        command_on: JgBYAAABIJISExETETcSEhISEhQQFBETETcROBESEjcRNhM1EjcTNRMTERISNxEUERMSExE2EjYSNhM2EhIROBE3ETcREhITEgAFGwABH0oSAAwzAAEfShEADQU=
        command_off: JgBYAAABIJISExETETcSEhISEhQQFBETETcROBESEjcRNhM1EjcTNRMTERISNxEUERMSExE2EjYSNhM2EhIROBE3ETcREhITEgAFGwABH0oSAAwzAAEfShEADQU=
```

上面的示例创建 `switch.philips_tv` 和 `switch.lg_tv`，它们与同一万能遥控器相关。

__重要__：始终为您的开关使用唯一名称。一个好的选择是在名称前加上设备所在区域的名称，例如 Bedroom TV。

### 使用 e-Control 遥控器

如果您已经在 e-Control 应用上学习了遥控器，您可以使用此方法将它们"复制"到 Home Assistant。

首先在 e-Control 中获取或学习您想要添加到 Home Assistant 的所有遥控器

1. 下载

    从[这里](https://github.com/clach04/Broadlink-e-control-db-dump)获取脚本。

2. 从应用中转储数据

    在移动设备上打开 e-Control 应用。在左侧菜单中选择"Share"，然后选择"Share to other phones in WLAN"。它将生成脚本所需的文件。

3. 从 Android 设备获取数据

    将您的 Android 设备连接到计算机并浏览 SD 卡/外部存储文件夹"/broadlink/newremote/SharedData/"。您需要获取以下文件并将它们放在与此脚本相同的文件夹中：

    jsonSubIr
    jsonButton
    jsonIrCode

4. 安装依赖

    运行 `pip install simplejson`。您必须在将用于运行脚本的同一 Python 版本中安装 `simplejson`。您可以通过尝试再次安装并确认看到"Requirement already satisfied"来确保已安装当前版本。

5. 从设备获取数据

    导航到您下载的文件夹并运行 `python getBroadlinkSharedData.py`。按照屏幕上的步骤操作。注意：这些脚本仅在 Python 2.7 上测试过。

6. 安装 python-broadlink 库：

    ```bash
    git clone https://github.com/mjg59/python-broadlink.git
    cd python-broadlink
    sudo python setup.py install
    ```

7. 测试代码
    使用您已经下载的 `sendcode` 脚本测试从设备获取的代码。
    您需要使用 RM Pro IP 地址和 MAC 地址以及 HEX 格式的代码编辑脚本。
    运行脚本时，如果收到消息则表示代码有效。
    Code sent...
    并非所有代码都有效。

8. 将 HEX 代码转换为 base64。
    使用[此](https://tomeko.net/online_tools/hex_to_base64.php?lang=en1)工具将十六进制代码转换为 base64 以便在 Home Assistant 中使用。

### 使用 iOS 和 Windows 获取代码

1. 使用 e-Control 应用从所有合适的遥控器学习代码。根据遥控器的不同，尝试为按钮和/或遥控器添加有用的名称。这意味着您应该只需要运行此过程一次，并有助于快速将它们导入 Home Assistant。通过导航到汉堡图标，选择 `share and select`，然后选择 `Share to other phones on WLAN` 在应用中转储文件。

2. 安装依赖

   - 在 Windows PC 上下载并安装 Python 2.7。
   - 运行 `pip install simplejson`。您必须在将用于运行脚本的同一 Python 版本中安装 `simplejson`。您可以通过尝试再次安装并确认看到"Requirement already satisfied"来确保已安装当前版本。
   - 下载并安装 [iBackup Viewer](https://www.imactools.com/iphonebackupviewer/)。
   - 下载[这些](https://github.com/NightRang3r/Broadlink-e-control-db-dump) GitHub 文件。确保将它们放在 Windows 的 \Python27 路径中。确保下载的 getBroadlinkSharedData.py 在此目录中。

3. 将 iPhone 插入 Windows PC，打开 iTunes 并创建设备的非加密备份。

4. 打开 iBackup viewer，然后选择您创建的 iOS 备份。导航到 App 图标，然后滚动直到找到 e-control.app，选择它。选择并提取文件 jsonButton、jsonIrCode 和 jsonSublr；它们将位于 Documents/SharedData 部分中。将这些文件放在与 getBroadlinkSharedData.py 相同的位置。

5. 现在打开命令提示符并导航到上述文件所在的目录，例如 `C:\Python27`。现在运行命令 `python getBroadlinkSharedData.py`，您应该看到类似这样的内容：

    ```bash
    C:\Python27>python getBroadlinkSharedData.py
    ID: 1 | Name: TV
    ID: 2 | Name: Upstairs
    ID: 3 | Name: Sort in order
    ID: 4 | Name: Soundbar
    ID: 5 | Name: TV
    ID: 6 | Name: Xbox One
    ID: 7 | Name: User-Defined Aircon
    ID: 8 | Name: Sort in order
    ID: 9 | Name: User-Defined Aircon
    ID: 10 | Name: Kids Fan
    ID: 11 | Name: Downstairs
    ID: 12 | Name: Ceiling Fan
    ID: 13 | Name: Samsung TV
    ID: 14 | Name: Xbox One
    ID: 15 | Name: SONY SoundBar
    ID: 16 | Name: Fire TV
    ID: 17 | Name: New RF Remote
    ```

   选择您想要提取的遥控器 ID：

    ```bash
    Select accessory ID: 5
    [+] You selected:  TV
    [+] Dumping codes to TV.txt
    ```

6. 现在应该有一个以您选择的遥控器命名的文件，在同一目录中以 `.txt` 结尾。打开它，它将包含 Home Assistant 所需的 Base64 代码。为确保这些代码正确工作，您可能需要在 "`configuration.yaml`" 文件（或您的开关所在的任何位置）中的代码末尾添加 `==`。

### 使用 Broadlink Manager 在 Windows 上获取代码

1. 从此 SourceForge 链接[这里](https://sourceforge.net/projects/broadlink-manager/)安装 Broadlink Manager。
2. 打开应用程序并点击"scan"以激活您的 broadlink 设备。
3. 点击"Learn New Command"并按照屏幕上的说明操作。
4. "OnRawData Base64"是要在 Home Assistant 中使用的值。

### 使用 Node-RED 获取代码

1. 在 Node-RED 中安装 Broadlink Control 调色板（点击右上角的汉堡菜单 > Settings > Palette > Install 并输入 Broadlink。点击 node-red-contrib-broadlink-control 上的 install）。
2. 安装后，验证节点菜单中是否有名为 broadlink 的新调色板。
3. 将 RM 节点拖到空流程中并双击以配置节点。

   ```bash
   a. 为您的 RM 设备命名以便识别
   b. 点击铅笔编辑设备信息
   c. 输入 Broadlink RM PRO 或 RM Mini 的 MAC 地址
   d. 输入 Broadlink RM PRO 或 RM mini 的 IP 地址
   e. 将 Catalog 字段留空。
   ```

4. 点击 Update，设备字段应显示新添加设备的 MAC 地址。如果没有，只需选择它。
5. 在 Action 字段中，选择 Learn，然后点击 Done。
6. 将 Inject 节点拖到 RM 节点的左侧并连接它们。Inject 的类型不重要。保留默认值。
7. 将 Template 节点拖到 Flow 上 RM 节点的右侧并将其连接到 RM 节点。
8. 双击 Template 节点进行编辑，选择：

   

   ```bash
   Property: msg.payload
   Format: Mustache template
   Template field: 输入 '{{payload.data}}'。
   Output as: Plain text
   ```

   

9. 将 Debug 节点拖到 Template 节点的右侧并连接它们。
10. 显示调试消息，部署流程并点击 inject 按钮。
11. 调试窗口中将显示一条消息：

    ```bash
    3/23/2019, 9:56:53 AMnode: RM_Mini1
    msg : string[47]
    "Please tap the remote button within 30 seconds."
    ```

12. 将 IR 遥控器对准 RM 设备并按住所需按钮约 2 秒。调试窗口将显示一个数字数组。例如：

    ```bash
    '38,0,132,3,19,18,19,18,19,18,19,17,20,54,20,54,20,54,19,18,19,18,19,18,19,17,20,17,20,17,20,54,20,17,19,18,19,18,19,18,19,17,20,17,20,54,20,17,20,54,19,55,19,54,20,54,20,54,19,55,19,0,6,6,150,146,20,54,20,54,20,54,19,18,19,18,19,18,19,17,20,17,20,54,20,54,19,55,19,18,19,17,20,17,20,17,20,17,20,17,20,54,19,18,19,18,19,18,19,17,20,17,20,17,20,54,19,18,19,55,19,54,20,54,20,54,20,54,19,55,19,0,6,6,150,146,20,54,20,54,19,55,19,18,19,17,20,17,20,17,20,17,20,54,19,55,19,54,20,17,20,17,20,17,20,17,20,17,19,18,19,55,19,17,20,17,20,17,20,17,20,17,19,18,19,55,19,18,19,54,20,54,20,54,19,55,19,54,20,54,20,0,6,5,150,146,20,54,20,54,20,54,19,18,19,18,19,18,19,17,20,17,20,54,20,54,19,55,19,18,19,17,20,17,20,17,20,17,20,17,20,54,19,18,19,18,19,18,19,17,20,17,20,17,20,54,19,18,19,55,19,54,20,54,20,54,19,55,19,54,20,0,6,6,149,147,20,54,19,55,19,54,20,17,20,17,20,17,20,17,20,17,19,55,19,54,20,54,20,17,20,17,20,17,19,18,19,18,19,18,19,54,20,17,20,17,20,17,20,17,19,18,19,18,19,54,20,17,20,54,20,54,20,54,19,...'
    ```

这是我们需要再次传输以复制相同遥控功能的代码。

### 使用 Node-RED 发送代码

1. 在我们之前创建的同一流程上拖动另一个 RM 节点。RM 节点默认应配置为之前创建的 RM 设备。
2. 在 Action 字段中，选择 - Set from msg.payload -。
3. 拖动一个 Inject 节点并给它一个与遥控按钮功能相关的有意义名称，如"TV On"或"TV Source"。
4. 拖动一个 template 节点并双击它进行配置：

   ```bash
   Property: msg.payload
   Format: Mustache template
   Template: 输入以下内容：
   '{
      "action" : "send",
      "data" : [ 38, 0, 34, 1, 40, 15, 40, 15 ] // 这里您必须输入上面第 12 点的整个代码，不带末尾的 "."
   }'
   在 Output as 字段中，"select Parsed JSON"。
   ```

5. 点击 Done。
6. 拖动一个 debug 节点并将其连接到 RM 节点的输出。
7. 将 Inject 节点连接到 Template 节点，将 template 节点连接到 RM 节点。
8. 点击 Deploy 激活流程，然后点击 inject 按钮。调试窗口应显示调试消息。例如：

   ```bash
   {"action":"send","data":   [38,0,152,0,0,1,39,148,19,18,18,19,18,55,19,18,18,19,18,19,18,19,18,55,18,56,18,19,18,55,18,19,18,56,18,18,19,55,18,19,18,19,18,18,18,56,18,19,18,18,19,55,18,56,18,18,19,18,18,19,18,19,18,55,19,18,18,19,18,19,18,19,18,18,18,19,18,19,18,55,19,55,18,19,18,19,18,18,19,18,18,56,18,19,18,18,19,55,18,56,18,18,19,18,18,19,18,19,18,19,18,18,19,18,18,56,18,55,18,19,18,19,18,19,18,18,19,55,18,19,18,55,19,18,18,56,18,19,18,18,19,18,18,19,18,19,18,19,18,18,18,56,18,0,13,5],"status":"OK"}
   ```

末尾的 "status" : "OK" 是 Broadlink RM 设备已连接并已传输负载的反馈。

现在您可以添加任意数量的 template 节点，每个都有特定的代码，并添加任何类型的输入节点来激活 template 并传输代码。

### 使用 broadlink_cli 获取代码

也可以使用 [python-broadlink](https://github.com/mjg59/python-broadlink) 项目中的 `broadlink_cli` 获取代码。

首先使用发现来查找您的 Broadlink 设备：

```bash
$ ./broadlink_discovery
Discovering...
###########################################
RM2
# broadlink_cli --type 0x2787 --host 192.168.1.137 --mac 34ea34b45d2c
Device file data (to be used with --device @filename in broadlink_cli) :
0x2787 192.168.1.137 34ea34b45d2c
temperature = 27.1
```

然后在 cli 命令中使用此信息。支持 IR 和 RF 学习。

#### 学习 IR 代码

使用 `--learn` 获取 IR 代码：

```bash
./broadlink_cli --learn --device "0x2787 192.168.1.137 34ea34b45d2c"
Learning...
```

按下遥控器上的按钮，您将获得代码：

```text
260058000001219512131114113910141114111411141114103911391114103911391139103911391039113911141039111411391015103911141114113910141139111410391114110005250001274b11000c520001274b11000d05
Base64: b'JgBYAAABIZUSExEUETkQFBEUERQRFBEUEDkROREUEDkRORE5EDkRORA5ETkRFBA5ERQRORAVEDkRFBEUETkQFBE5ERQQOREUEQAFJQABJ0sRAAxSAAEnSxEADQU='
```

#### 学习 RF 代码

使用 `--rfscanlearn` 获取 RF 代码：

```bash
$ ./broadlink_cli --rfscanlearn --device "0x2787 192.168.1.137 34ea34b45d2c"
Learning RF Frequency, press and hold the button to learn...
```

按住遥控器上的按钮。

当您看到以下文本时，表示成功：
```text
Found RF Frequency - 1 of 2!
You can now let go of the button
Press enter to continue...
```

如果尝试失败，您将看到错误：
```text
RF Frequency not found
```
如果发生失败，您可能需要在 `Learning RF Frequency` 步骤期间简单地持续按下按钮，因为某些遥控器在按住按钮时似乎不会持续传输。

成功后，执行以下两个选项之一：

1. 要学习单次按钮按下 RF 代码，按回车并按照提示操作：
    ```text
    To complete learning, single press the button you want to learn
    ```
    短按按钮，您将获得代码：
    ```text
    Found RF Frequency - 2 of 2!
    b2002c0111211011211121112111212110112122101121112111202210211121112110221011211121112121102210112121111021112221101121211100017b10211111211121102111212210112121111121102111212210211121102210211111211121102122102111112121101121112122101121211000017c10211111211022102111212210112121111022102112202210211121102210221011211022102122102210112121101122102122101121211100017b10211111211121102210212210112122101121102210212210221021112110221011211121112121102210112121111121102122101121221000017b1121101121112111211121211110212210112111211121211121102210211121101121112111212111211011222110112111212111112121100005dc000000000000000000000000
    Base64: b'sgAsAREhEBEhESERIREhIRARISIQESERIREgIhAhESERIRAiEBEhESERISEQIhARISERECERIiEQESEhEQABexAhEREhESEQIREhIhARISERESEQIREhIhAhESEQIhAhEREhESEQISIQIRERISEQESERISIQESEhEAABfBAhEREhECIQIREhIhARISERECIQIRIgIhAhESEQIhAiEBEhECIQISIQIhARISEQESIQISIQESEhEQABexAhEREhESEQIhAhIhARISIQESEQIhAhIhAiECERIRAiEBEhESERISEQIhARISERESEQISIQESEiEAABexEhEBEhESERIREhIREQISIQESERIREhIREhECIQIREhEBEhESERISERIRARIiEQESERISERESEhEAAF3AAAAAAAAAAAAAAAAA=='
    ```

2. 要学习按钮长按 RF 代码，按住您想学习的按钮 1-2 秒，然后立即按回车。  
    - 您将看到与短按相同的提示。您应该看到它返回不同的 base64 代码。
    - 测试 base64 代码以确保它按预期执行按钮"长按"命令，而不是按钮"短按"命令。
    - 这可能需要一些尝试和错误来在扫描代码之前获得正确的长按时机。

### 从其他项目转换代码

对于旧/棘手的设备，另一种可能性是尝试使用 LIRC 项目收集的数据获取代码。

假设您的（或类似的）设备在以下数据库之一中：

- <https://sourceforge.net/p/lirc-remotes/code/ci/master/tree/>
- <https://github.com/probonopd/irdb/tree/master/>

您可以从 [irdb2broadlinkha](https://github.com/molexx/irdb2broadlinkha) 项目获取 `irdb2broadlinkha.sh` 并尝试将代码转换为适合 Home Assistant 的格式。