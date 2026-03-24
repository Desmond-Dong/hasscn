---
title: Alexa Devices
description: 关于如何将 Alexa 设备集成到 Home Assistant 的说明。
ha_category:
  - Binary Sensor
  - Notify
  - Sensor
  - Switch
ha_release: '2025.6'
ha_domain: alexa_devices
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
ha_iot_class: Cloud Polling
ha_platforms:
  - binary_sensor
  - diagnostics
  - notify
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: platinum
---

**Alexa Devices** integration 允许您控制连接到您的 Amazon 账户的 Alexa 启用设备。

该集成提供有关已连接设备的信息，并支持控制主要功能。

## 支持的设备

Home Assistant 支持以下设备系列：

- **Amazon Echo Auto**
- **Amazon Echo Dot**
- **Amazon Echo Flex**
- **Amazon Echo Plus**
- **Amazon Echo Show**
- **Amazon Fire TV Stick**
- **Amazon Fire Tablet**
- **Amazon Air Quality Monitor**
- 具有内置 Alexa 功能的**第三方设备**。

:::warning
此集成需要使用身份验证应用程序（例如 Microsoft Authenticator）进行多因素身份验证。要启用 MFA，请在您的 Amazon账户设置中选择 **登录与安全** > **两步验证** > **备用方法** > **添加新应用**。有关更多信息，请参阅 [Amazon 文档](https://www.amazon.com/gp/help/customer/display.html?nodeId=G9MX9LXNWXFKMJYU)。

您必须确保身份验证器应用程序已设置为您的 2FA 首选方法。


:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
  username:
    description: 您 Amazon 账户的电子邮件地址。
  password:
    description: 您 Amazon 账户的密码。
  otp:
    description: 通过身份验证器应用程序获取的一次性密码。
```

## 动作

### 可用动作

可用动作：`notify.send_message`、`alexa_devices.send_sound`、`alexa_devices.send_text_command`、`alexa_devices.send_info_skill`

### 动作：发送消息

`notify.send_message` 动作允许您向具有适当功能且已创建语音和公告通知实体的设备发送消息。

| 数据属性 | 可选 | 描述 |
| -------------- | -------- | ----------------------------------------- |
| `message` | 否 | 要输出的文本（有关高级标记，请参见下文） |

:::tip
向多个设备发送通知时，由于 Amazon 的速率限制，您可能会遇到延迟。您可以通过向在 Alexa 中创建的扬声器组发送通知来避免这种情况。

:::
<details>
<summary>高级消息标记</summary>


Amazon 提供标记来控制说什么以及如何说，并添加额外的选项，如暂停和播放某些音频剪辑。详细信息在 [Amazon 文档](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html) 中介绍，其中有很多示例（只需将 `<speak>` 和 `</speak>` 元素之间的所有内容传递给动作的 `message` 参数）。

音频文件必须满足大小、比特率和采样率的某些标准，并且必须通过 HTTPS 提供（有关完整详细信息，请参阅[文档](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html#audio)）。这些限制使它们适合文本和音效，但您无法以这种方式播放音乐。

Amazon 提供了一组[可使用的声音](https://developer.amazon.com/en-US/docs/alexa/custom-skills/ask-soundlibrary.html)，其中包含该剪辑所需的标记。


</details>

### 动作：发送文本命令

`alexa_devices.send_text_command` 动作允许您使用文本命令而不是语音来控制 Alexa。您应该能够通过此动作请求任何您可以通过语音请求的内容。

| 数据属性 | 可选 | 描述 |
| -------------- | -------- | ----------------------------------------- |
| `device_id` | 否 | 您要在其上运行动作的设备 |
| `text_command` | 否 | 要发送的命令 |

### 动作：发送声音

`alexa_devices.send_sound` 动作允许您播放内置的 Alexa 声音之一。完整的声音列表可在 [Amazon 文档（需要身份验证）](https://alexa.amazon.com/api/behaviors/entities?skillId=amzn1.ask.1p.sound) 中找到

:::tip
使用 `notify.send_message` [动作](#action-notifysend_message) 的高级标记可获取其他声音

:::
| 数据属性 | 可选 | 描述 |
| -------------- | -------- | ----------------------------------------- |
| `device_id` | 否 | 您要在其上播放声音的设备 |
| `sound` | 否 | 要播放的声音名称 |

### 动作：发送信息技能

`alexa_devices.send_info_skill` 动作允许您运行一些内置的 Alexa 动作，输出日期、天气预报或讲笑话等内容。

| 数据属性 | 可选 | 描述 |
| -------------- | -------- | ----------------------------------------- |
| `device_id` | 否 | 您要在其上运行动作的设备 |
| `info_skill` | 否 | 您要运行的信息技能 |

## 传感器

当连接的设备公开信息时，集成会创建传感器实体。并非每台设备都支持每个传感器。

### 闹钟、计时器和提醒传感器

所有 Alexa 启用设备都有时间戳传感器，显示下一个预定的闹钟、计时器和提醒及其标签。

### 环境和设备传感器

- **温度**
- **照度**
- **Wi-Fi 和蓝牙连接**

#### 空气质量监测仪传感器

- **颗粒物** - 10 μm 和 2.5 μm
- **一氧化碳**
- **挥发性有机化合物指数**
- **空气质量指数**

## 支持的功能

除传感器外，您还可以使用以下实体：

- **通知** - 语音和公告通知
- **开关** - 请勿打扰

## 示例

### 当您到家时发送公告

```yaml
automation:
- alias: "Alexa Announce"
  id: "alexa_announce"
  triggers:
    - platform: state
      entity_id: person.simone
      to: "home"
  actions:
    - action: notify.send_message
      data:
        message: Welcome home Simone
      target:
        entity_id: notify.echo_dot_livingroom_announce
```

### 询问时间

```yaml
action: alexa_devices.send_text_command
data:
  device_id: 037d79c1af96c67ba57ebcae560fb18e
  text_command: whats the time
```

### 设置音量

:::note
一旦支持媒体播放器功能，您将能够通过标准媒体播放器动作实现此操作。

:::
```yaml
action: alexa_devices.send_text_command
data:
  device_id: 037d79c1af96c67ba57ebcae560fb18e
  text_command: volume 7
```

### 控制 Alexa 中的设备

```yaml
action: alexa_devices.send_text_command
data:
  device_id: 037d79c1af96c67ba57ebcae560fb18e
  text_command: turn study lights off
```

### 播放 BBC Radio 6

```yaml
action: alexa_devices.send_text_command
data:
  device_id: 037d79c1af96c67ba57ebcae560fb18e
  text_command: play BBC Radio 6
```

### 播放门铃声音

```yaml
action: alexa_devices.send_sound
data:
  sound: amzn_sfx_doorbell_chime_01
  device_id: 037d79c1af96c67ba57ebcae560fb18e
```

### 在通知中使用高级标记

```yaml
action: notify.send_message
data:
  message: >
    Hello, lets have some examples.
    <amazon:emotion name="excited" intensity="medium"> This is me being mildly excited! </amazon:emotion>
    The farmer's dog was called <say-as interpret-as='spell-out'>bingo</say-as>.
    <prosody pitch='high'> I can sing high </prosody> <prosody pitch='low'> and I can sing low </prosody>
target:
  entity_id: notify.study_dot_speak
```

```yaml
action: notify.send_message
data:
  message: >
    Stop! <break time='3s'/> Hammer Time. Watch out
    <audio src="soundbank://soundlibrary/scifi/amzn_sfx_scifi_laser_gun_battle_01"/>
    Shields up! <audio src="soundbank://soundlibrary/scifi/amzn_sfx_scifi_shields_up_01" />
    <amazon:effect name="whispered">
      <prosody rate="x-slow"><prosody volume="loud">Enough now</prosody></prosody>
    </amazon:effect>
target:
  entity_id: notify.study_dot_speak

```

## 数据更新

此集成默认每五分钟从设备 polls 数据一次。

## 已知限制

- 此集成需要使用身份验证应用程序（例如 Microsoft Authenticator）进行多因素身份验证。要启用 MFA，请在您的 Amazon 账户设置中选择 **登录与安全** > **两步验证** > **备用方法** > **添加新应用**。有关更多信息，请参阅 [Amazon 文档](https://www.amazon.com/gp/help/customer/display.html?nodeId=G9MX9LXNWXFKMJYU)。
- 如果配置的账户链接到 Alexa 家庭，提醒可能不会添加到传感器。
- [Amazon Japan](https://www.amazon.co.jp) 似乎使用与其他位置不同的登录机制，导致无法设置集成。这应在未来的版本中解决。

## 故障排除

### 无法设置

#### 症状："CannotAuthenticate"

##### 描述

尝试设置集成时，您将在日志中看到 `MFA OTP code not found on login page` 或 `Cannot find "auth-mfa-otpcode" in html source`。这是因为身份验证详细信息不正确。

您需要确保：

- 使用正确的凭据（您用于登录 Alexa 应用程序和 Amazon 购物网站的凭据）
- 设置为使用基于应用程序的 2FA
- 未设置为接收短信 2FA 代码

要测试此问题，您应该在浏览器中以隐身/私人模式登录本地 Amazon 购物网站，并检查您是否收到来自身份验证器应用程序的 OTP 代码提示，以及您是否能够成功登录。

### 传感器不可用

#### 症状："Too many requests"

您会看到类似以下内容

- `Error retrieving devices state: Too many requests for path ['listEndpoints']`
- `Error retrieving data: CannotRetrieveData('Request failed: Bad Request')`
- `Failed to obtain notification data.  Timers and alarms have not been updated`

在日志中。

##### 描述

这是由于 Amazon 应用的速率限制导致的。我们正在努力减少这些错误。如果这些错误给您带来问题，您可以禁用集成的轮询。禁用轮询将停止这些错误，但也会停止 DND、传感器和连接的更新。但是，语音、公告和文本命令将继续工作。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.