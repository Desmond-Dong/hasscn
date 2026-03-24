---
title: Android Debug Bridge
description: 关于如何将 Android 和 Fire TV 设备集成到 Home Assistant 的说明。
ha_category:
  - Media player
  - Remote
ha_release: 0.7.6
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@JeffLIrion'
  - '@ollo69'
ha_domain: androidtv
ha_platforms:
  - diagnostics
  - media_player
  - remote
ha_integration_type: device
---

**Android Debug Bridge** 集成允许您控制 Android 设备或 [Amazon Fire TV](https://www.amazon.com/b/?node=8521791011) 设备。

:::important
设置此集成时，建议您不要使用 ADB 服务器，而是使用内置的 Python ADB 实现。这简化了设置并使故障排除更容易。如果此方法存在稳定性问题，您可能希望尝试使用 ADB 服务器。有关更多信息，请参阅 [ADB 设置](#adb-setup) 部分。

:::
## 设备准备

要设置您的设备，您需要找到其 IP 地址并启用 ADB 调试。对于 Android 设备，请查阅您设备的文档。

对于 Fire TV 设备，说明如下：

- 在您的 Amazon Fire TV 上启用 ADB 调试：
  - 从主（启动器）屏幕，选择 Settings。
  - 选择 My Fire TV > Developer Options。
  - 选择 ADB Debugging。
- 查找 Amazon Fire TV 设备 IP 地址：
  - 从主（启动器）屏幕，选择 Settings。
  - 选择 My Fire TV > About > Network。

如果 Settings 中缺少 Developer Options，则选择 My Fire TV 并在 About 上按按钮七次。请注意，在某些 Fire TV 设备上，例如 Insignia F30 系列，在设备上登录 Amazon 账户之前无法启用 Developer Options。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Options

To define options for Android Debug Bridge, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Android Debug Bridge are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.
```yaml
Configure Applications List:
  description: 在这里您可以定义后端库未自动检测到的应用程序，其中键是应用程序 ID，值是在 UI 中显示的应用程序名称。如果未提供名称且启用了"排除名称未知的应用"选项，则该应用永远不会显示在源列表中。
Retrieve the running apps as the list of sources:
  description: "是否将正在运行的应用程序作为源列表检索。如果选中此选项，将检索正在运行的应用程序并用作源。如果未选中，则只有一个源：当前应用。"
Exclude apps with unknown name:
  description: "从源列表中排除名称未知的应用。如果选中此选项，则只有`配置的应用程序列表`选项中配置的应用才会列在源中。"
Use screen capture for album art:
  description: "确定是否应从屏幕上显示的内容获取专辑封面。"
ADB shell turn off command:
  description: "覆盖默认关机命令的 ADB shell 命令。留空以使用默认值。"
ADB shell turn on command:
  description: "覆盖默认开机命令的 ADB shell 命令。留空以使用默认值。"
Configure State Detection Rules:
  description: 在这里您可以配置规则列表，其中规则键是应用程序 ID，其值是状态检测规则列表。例如，检测规则的有效值是 `["standby", {"playing":{"media_session_state":4}}, {"paused":{"media_session_state":3, "wake_lock_size":4}}]`。请注意，规则值必须始终在方括号 (`[...]`) 内。有关更多信息，请参阅[自定义状态检测](#custom-state-detection)部分。
```

## ADB 设置

此集成通过向您的 Android / Fire TV 设备发送 ADB 命令来工作。有两种方法可以实现这一点。

:::important
首次连接到您的设备时，您的 Android / Fire TV 上会出现一个对话框，要求您批准该连接。选中"始终允许来自此设备的连接"复选框，然后点击确定。

:::
### 1. Python ADB 实现

默认方法是使用 `adb-shell` Python 包连接到您的设备。从 Home Assistant 0.101 开始，如果需要密钥进行身份验证但未通过 `ADB Key` 设置选项提供，Home Assistant 将为您生成密钥。

:::important
要在集成设置时提供 `ADB Key`，您需要启用[高级模式](/home-assistant/blog/2019/07/17/release-96/#advanced-mode)。

:::
在 Home Assistant 0.101 之前，此方法对于较新的设备效果不佳。已经做出努力解决这些问题，但如果您遇到问题，则应使用 ADB 服务器选项。

### 2. ADB 服务器

第二个选项是使用 ADB 服务器连接到您的 Android 和 Fire TV 设备。

:::important
要在集成设置时配置 ADB 服务器，您需要启用[高级模式](/home-assistant/blog/2019/07/17/release-96/#advanced-mode)。

:::
使用此方法，Home Assistant 将把 ADB 命令发送到服务器，服务器再将它们发送到 Android / Fire TV 设备并向 Home Assistant 报告。要使用此选项，请将 `adb_server_ip` 选项添加到您的配置中。如果您在与 Home Assistant 相同的机器上运行服务器，则可以使用 `127.0.0.1` 作为此值。

## ADB 故障排除

如果您的 Android 或 Fire TV 设备设置失败，则可能是您的 ADB 连接存在问题。以下是一些可能的原因。

1. 您的设备 IP 地址错误。

2. 您的设备上未启用 ADB。

3. 您已经从另一台设备通过 ADB 连接到 Android / Fire TV。只能连接一台设备，因此断开另一台设备，重启 Android / Fire TV（为了保险起见），然后重启 Home Assistant。

4. 您需要批准 ADB 连接；请参阅上面 [ADB 设置](#adb-setup) 部分中的说明。

5. 某些 Android 设备（例如运行 Android TV 的飞利浦电视）仅通过其 Wi-Fi 接口接受初始 ADB 连接请求。如果您的电视是有线连接，您需要将其连接到 Wi-Fi 并再次尝试初始连接。一旦通过 Wi-Fi 授予身份验证，您也可以通过有线接口连接到电视。

6. 如果您的设备断开 Wi-Fi，导致 ADB 连接中断并使实体在 Home Assistant 中变得不可用，您可以安装唤醒锁工具（例如 [Wakelock](https://github.com/d4rken/wakelock-revamp)）来防止这种情况发生。一些用户报告了小米 Mi Box 设备存在此问题。

7. 如果您使用的是 [Python ADB 实现](#1-python-adb-implementation) 方法，如上所述，较新的设备可能存在一些问题。在这种情况下，您应该改用 [ADB 服务器](#2-adb-server) 方法。

## 设备不可用

某些设备，例如 Insignia F30 系列，在关闭时会从网络中消失。这可以表现为设备在 Home Assistant 中变得不可用（日志显示 TCP 超时错误），从网络中消失，并且不响应 ping。通常，这在关闭时每小时约 50 分钟内发生。可以通过打开设备上的 Settings 应用并使用"Display & Sounds" -> "Power Controls" -> "Voice Commands When TV Screen is Off"来修复此问题。将此值更改为"On"并接受关于功耗增加的警告。这将使设备始终保持监听网络，以便可以通过 Home Assistant 打开它。请注意，拔掉电源插头或断电后，设备需要手动打开一次，然后此设置才会再次生效。

## 动作

### 动作：选择源

`media_player.select_source` 动作允许您在设备上启动应用。只需将应用 ID 作为 `source` 提供。您还可以通过在应用 ID 前加 `!` 来停止应用。例如，您可以定义[脚本](/home-assistant/docs/scripts)来启动和停止 Netflix，如下所示：

```yaml
start_netflix:
  sequence:
  - action: media_player.select_source
    target:
      entity_id: media_player.fire_tv_living_room
    data:
      source: "com.netflix.ninja"

stop_netflix:
  sequence:
  - action: media_player.select_source
    target:
      entity_id: media_player.fire_tv_living_room
    data:
      source: "!com.netflix.ninja"
```

### `androidtv.adb_command`

`androidtv.adb_command` 动作允许您向 Android / Fire TV 设备发送按键或 ADB shell 命令。如果有任何输出，它将存储在 `'adb_response'` 属性中（即模板中的 `state_attr('media_player.android_tv_living_room', 'adb_response')`）并在 INFO 级别记录。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       否 | Android / Fire TV 实体的名称。
| `command`              |       否 | 按键命令或 ADB shell 命令。

在您的[自动化设置](/home-assistant/getting-started/automation/)的[动作](/home-assistant/getting-started/automation-action/)中，它可能如下所示：

```yaml
actions:
  - action: androidtv.adb_command
    target:
      entity_id: media_player.androidtv_tv_living_room
    data:
      command: "HOME"
```

可用的按键命令包括：

- `POWER`
- `SLEEP`
- `HOME`
- `UP`
- `DOWN`
- `LEFT`
- `RIGHT`
- `CENTER`
- `BACK`
- `MENU`

完整的按键命令列表可以在后端 [androidtv](https://github.com/JeffLIrion/python-androidtv) 包中找到。

您还可以使用命令 `GET_PROPERTIES` 来检索 Home Assistant 用于更新设备状态的属性。这些将存储在媒体播放器的 `'adb_response'` 属性中并在 INFO 级别记录。此信息可用于帮助改进后端 [androidtv](https://github.com/JeffLIrion/python-androidtv) 包中的状态检测，也可用于定义您自己的[自定义状态检测](#custom-state-detection)规则。

各种 intent 的列表可以在[这里](https://gist.github.com/mcfrojd/9e6875e1db5c089b1e3ddeb7dba0f304)找到。

### 动作：学习 sendevent（用于更快的 ADB 命令）

通过 ADB 发送 UP、DOWN、HOME 等命令时，设备响应可能很慢。问题不是 ADB，而是用于执行这些操作的 Android 命令 `input`。发送这些命令的更快方法是使用 Android `sendevent` 命令。挑战在于这些命令是特定于设备的。为了帮助用户学习其设备的命令，Android debug bridge 集成提供了 `androidtv.learn_sendevent` 动作。其用法如下：

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       否 | Android / Fire TV 实体的名称。

1. 执行 `androidtv.learn_sendevent` 动作。
2. 在 8 秒内，按下 Android / Fire TV 遥控器上的单个按钮。
3. 8 秒后，将出现一个持久通知，其中包含可以通过 `androidtv.adb_command` 动作发送的等效命令。此命令也可以在 Home Assistant 中媒体播放器的 `adb_response` 属性中找到，并将在 INFO 级别记录。

例如，[脚本](/home-assistant/docs/scripts)中的动作可以从这样：

```yaml
# 发送 "UP" 命令（慢）
- action: androidtv.adb_command
  target:
    entity_id: media_player.fire_tv_living_room
  data:
    command: UP
```

改为这样：

```yaml
# 使用 `sendevent` 发送 "UP" 命令（更快）
- action: androidtv.adb_command
  target:
    entity_id: media_player.fire_tv_living_room
  data:
    command: "sendevent /dev/input/event4 4 4 786979 && sendevent /dev/input/event4 1 172 1 && sendevent /dev/input/event4 0 0 0 && sendevent /dev/input/event4 4 4 786979 && sendevent /dev/input/event4 1 172 0 && sendevent /dev/input/event4 0 0 0"
```

### 动作：下载和上传

`androidtv.download` 动作允许您将文件从 Android / Fire TV 设备下载到您的 Home Assistant 实例。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       否 | Android / Fire TV 实体的名称。
| `device_path`          |       否 | Android / Fire TV 设备上的文件路径。
| `local_path`           |       否 | 您的 Home Assistant 实例上的文件路径。

`androidtv.upload` 动作允许您将文件从您的 Home Assistant 实例上传到 Android / Fire TV 设备。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       否 | Android / Fire TV 实体的名称。
| `device_path`          |       否 | Android / Fire TV 设备上的文件路径。
| `local_path`           |       否 | 您的 Home Assistant 实例上的文件路径。

## 自定义状态检测

Android Debug Bridge 集成通过定期轮询 Android / Fire TV 设备并收集一些属性来工作。不幸的是，没有标准 API 可以确定所有应用都遵守的设备状态。相反，后端 `androidtv` 包使用它收集的三个属性来确定状态：`audio_state`、`media_session_state` 和 `wake_lock_size`。确定状态的正确逻辑取决于当前应用，后端 `androidtv` 包为少数应用实现了特定于应用的状态检测逻辑。当然，在 `androidtv` 包中为每个应用实现自定义逻辑是不可行的。此外，正确的状态检测逻辑可能因设备和设备配置而异。

此问题的解决方案是 `state_detection_rules` 配置参数，它允许您提供自己的状态检测规则。键是应用 ID，值是按顺序评估的规则列表。有效的规则是：

- `'standby'`、`'playing'`、`'paused'`、`'idle'` 或 `'off'`
  - 如果这不是映射，则当此应用是当前应用时将始终报告此状态
  - 如果这是映射，则其条目是将被检查的条件。如果所有条件都为真，则将报告此状态。有效条件与 3 个属性相关（请参阅上面的示例配置）：
    1. ``'media_session_state'``
    2. ``'audio_state'``
    3. ``'wake_lock_size'``
- `'media_session_state'` = 尝试使用 `media_session_state` 属性确定状态
- `'audio_state'` = 尝试使用 `audio_state` 属性确定状态

要确定这些规则应该是什么，您可以使用 `androidtv.adb_command` 动作和命令 `GET_PROPERTIES`，如 [androidtv.adb_command](#androidtvadb_command) 部分所述。

## 遥控器

此集成支持 `remote` 平台。遥控器允许您使用 `remote.send_command` 动作向设备发送命令。您可以向 Android / Fire TV 设备发送按键或 ADB shell 命令。支持的按键因 Android 型号和版本而异。

<details>
<summary>完整键码列表</summary>


**电源键**
键|描述
---|-----------
"POWER"|电源切换
"SLEEP"|睡眠模式
"RESUME"|恢复
"SUSPEND"|挂起模式
"WAKEUP"|唤醒
____________

**输入键**
键|描述
---|-----------
"COMPONENT1"|分量 1
"COMPONENT2"|分量 2
"COMPOSITE1"|复合 1
"COMPOSITE2"|复合 2
"HDMI1"|HDMI 输出端口 1
"HDMI2"|HDMI 输出端口 2
"HDMI3"|HDMI 输出端口 3
"HDMI4"|HDMI 输出端口 4
"INPUT"|更改输入
"SAT"|卫星
"VGA"|VGA
_____________

**音量键**
键|描述
---|-----------
"VOLUME_DOWN"|音量减
"VOLUME_UP"|音量加
"MUTE"|静音
________________

**颜色键**
键|描述
---|-----------
"BLUE"|蓝色
"GREEN"|绿色
"YELLOW"|黄色
"RED"|红色
_____________

**其他键**
键|描述
---|-----------
"BACK"|返回
"CENTER"|中心
"DOWN"|下
"END"|结束
"ENTER"|回车
"ESCAPE"|退出
"FAST_FORWARD"|快进
"HOME"|主页
"LEFT"|左
"MENU"|菜单
"MOVE_HOME"|移动主页
"PAIRING"|配对
"REWIND"|快退
"RIGHT"|右
"SEARCH"|搜索
"SETTINGS"|设置
"SYSDOWN"|系统下
"SYSLEFT"|系统左
"SYSRIGHT"|系统右
"SYSUP"|系统上
"TEXT"|文本
"TOP"|顶部
"UP"|上


</details>

您还可以使用语法 `input keyevent {key}` 发送其他 Android 按键，将 `{key}` 替换为 Android 数字按键事件。有关详细信息，请参阅 [Android TV KeyEvent](https://developer.android.com/reference/android/view/KeyEvent)。

**发送命令序列的示例：**

```yaml
action: remote.send_command
target:
  device_id: 12345f9b4c9863e28ddd52c87dcebe05
data:
  command:
    - MENU
    - RIGHT
    - UP
    - UP
    - ENTER

```