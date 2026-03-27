---
title: ESP32-S3-BOX 语音助手
description: '本教程将指导您把 ESP32-S3-BOX、ESP32-S3-BOX-3(B) 或 ESP32-S3-BOX-Lite 变成 Home Assistant 语音助手。请注意，文中的 ESP32-S3-BOX 也可能泛指这 3 种产品型号。 本页属于 Home Assistant 中文文档。'
---
# ESP32-S3-BOX 语音助手

本教程将指导您把 ESP32-S3-BOX、ESP32-S3-BOX-3(B) 或 ESP32-S3-BOX-Lite 变成 Home Assistant 语音助手。请注意，文中的 ESP32-S3-BOX 也可能泛指这 3 种产品型号。

<lite-youtube videoid="erf7HqTwCGs" videotitle="Okay Nabu！运行在 Espressif ESP32-S3-Box 上的开源语音助手
"></lite-youtube>

## 前提条件

- 已安装 Home Assistant Operating System 的 Home Assistant 2023.12 或更高版本。如果您尚未安装 Home Assistant，请参考[安装页面](/home-assistant/installation/)
- [Home Assistant Cloud](/home-assistant/voice_control/voice_remote_cloud_assistant/) 或手动配置的 [Assist 流水线](/home-assistant/voice_control/voice_remote_local_assistant)
- 您的 2.4 GHz Wi-Fi 网络密码
- 桌面版 Chrome 或 Edge 浏览器，不支持 Android 或 iOS
- 以下 Espressif ESP32-S3-BOX 型号之一：
  - ESP32-S3-BOX-3B
  - ESP32-S3-BOX-3、ESP32-S3-BOX 或 ESP32-S3-BOX-Lite（目前已不再销售）
- 用于连接 ESP32-S3-BOX 的 USB-C 线缆
- 本流程假设这是您第一次在设备上安装 ESPHome 固件。如果您以前已经完成过本教程，现在只是想安装最新版软件，请参考[更新 S3-BOX 上的软件](#updating-the-software-on-the-s3-box)

<a id="installing-the-software-onto-the-esp32-s3-box"></a>

## 在 ESP32-S3-BOX 上安装软件

在将此设备用于 Home Assistant 之前，您需要先为它安装一些软件。

**使用 ESP32-S3-BOX-3(B)**

```
1. 这些步骤同时适用于 ESP32-S3-BOX-3 和 ESP32-S3-BOX-3B。请确保本页面是在桌面上的 Chromium 浏览器中打开。平板和手机无法完成安装。

       - 先选择下方的 **Connect** 按钮，查看可用 USB 设备列表。此时先不要连接 ESP32-S3-BOX-3。先看清当前列表，后面更容易识别新出现的 ESP 设备。
       - 如果浏览器不支持 Web Serial，您看到的会是提示消息，而不是按钮。

           <script type="module" src="https://unpkg.com/esp-web-tools@10.2.1/dist/web/install-button.js?module" integrity="sha384-2Ea4WL8tjFb0qQKUqBoX45KlPVoUgL+Z3zUqsD0MHmtJ3faDbfNyZulLg/LfYDUZ" crossorigin="anonymous"></script>
           <esp-web-install-button manifest="https://firmware.esphome.io/wake-word-voice-assistant/esp32-s3-box-3/manifest.json"></esp-web-install-button>

       - **适合高级用户**：配置文件可在 GitHub 上查看：
         - [GitHub 上的 ESP32-S3-BOX-3 配置](https://github.com/esphome/wake-word-voice-assistants/blob/main/esp32-s3-box-3/esp32-s3-box-3.yaml)

    2. 按照以下步骤将 ESP32-S3-BOX-3 连接到电脑：
       - 在弹出窗口中查看可用端口。
       - 将 USB-C 线直接插入主机本体，而不是插在底座上，也不是蓝色部分，然后连接到电脑。
       - **故障排除**：如果浏览器显示的设备列表中没有 ESP32-S3-BOX-3，您需要手动进入 flash 模式：
         - 按住 "boot" 按钮，也就是左侧上方按钮，同时轻按 "reset" 按钮，也就是左侧下方按钮。
         - 几秒钟后，ESP32-S3-BOX-3 应该会出现在浏览器显示的 USB 设备列表中。
         - 按照步骤继续操作直到第 3 步。选择 **Next** 后，在 S3-BOX-3 上再次按一下 "Reset" 按钮。
         - 然后重新选择蓝色的 **Connect** 按钮，选择该 USB 设备，并按提示配置 Wi-Fi。
         - 这时在弹出窗口中应该会出现一个新条目。选择该 USB 串口，然后选择 **Connect**。
    3. 选择 **Install Voice Assistant**，然后选择 **Install**。
         - 安装完成后，选择 **Next**。
         - 将 ESP32-S3-BOX-3 添加到您的 Wi-Fi：
           - 根据提示从列表中选择您的网络，并输入 2.4 GHz Wi-Fi 凭据。
           - 选择 **Connect**。
           - ESP32-S3-BOX-3 加入网络后，选择 **Add to Home Assistant**。
    4. 这会打开通向 Home Assistant 的 **My** 链接。
       - 如果您以前没有使用过 My Home Assistant，需要先完成配置。如果您的 Home Assistant URL 不是 `http://homeassistant.local:8123`，请替换为您自己的实例地址。
       - 打开该链接。
       ![打开 My 链接](/home-assistant/images/assist/esp32-atom-flash-06.png)
    5. 选择 **OK**。

       ![设置 ESPHome](/home-assistant/images/assist/esp32-atom-flash-07.png)
    6. 要添加新发现的设备，请从列表中选择 ESP32-S3-BOX-3。
       - 将 ESP32-S3-BOX-3 分配到一个房间，然后选择 **Finish**。
    7. 您现在应该会看到 **ESPHome** 集成。
       ![发现新的 ESPHome 设备](/home-assistant/images/assist/m5stack-atom-echo-discovered-33.png)

    8. 选择 **ESPHome** 集成。在 **设备** 下，您应该会看到 **ESP32-S3-BOX**。
        ![发现 ESP32-S3-BOX-3](/home-assistant/images/assist/s32-s3-box-3-discovered.png)

        - 您的 ESP32-S3-BOX 已通过 Wi-Fi 连接到 Home Assistant。现在，您可以使用 USB 电源把它移动到家里的任意位置。
```

**使用 ESP32-S3-BOX**

```
1. 请确保本页面是在桌面上的 Chromium 浏览器中打开。平板和手机无法完成安装。

       - 如果浏览器不支持 Web Serial，您看到的会是提示消息，而不是按钮。

           <script type="module" src="https://unpkg.com/esp-web-tools@10.2.1/dist/web/install-button.js?module" integrity="sha384-2Ea4WL8tjFb0qQKUqBoX45KlPVoUgL+Z3zUqsD0MHmtJ3faDbfNyZulLg/LfYDUZ" crossorigin="anonymous"></script>
           <esp-web-install-button manifest="https://firmware.esphome.io/wake-word-voice-assistant/esp32-s3-box/manifest.json"></esp-web-install-button>

       - **适合高级用户**：配置文件可在 GitHub 上查看：
         - [GitHub 上的 ESP32-S3-BOX 配置](https://github.com/esphome/wake-word-voice-assistants/blob/main/esp32-s3-box/esp32-s3-box.yaml)

    2. 按照以下步骤将 ESP32-S3-BOX 连接到电脑：
       - 在弹出窗口中查看可用端口。
       - 将 USB-C 线连接到 ESP32-S3-BOX，并连接到电脑。
    3. 选择 **Install Voice Assistant**，然后选择 **Install**。
         - 安装完成后，选择 **Next**。
         - 将 ESP32-S3-BOX 添加到您的 Wi-Fi：
           - 根据提示从列表中选择您的网络，并输入 2.4 GHz Wi-Fi 凭据。
           - 选择 **Connect**。
           - ESP32-S3-BOX 加入网络后，选择 **Add to Home Assistant**。
    4. 这会打开通向 Home Assistant 的 **My** 链接。
       - 如果您以前没有使用过 My Home Assistant，需要先完成配置。如果您的 Home Assistant URL 不是 `http://homeassistant.local:8123`，请替换为您自己的实例地址。
       - 打开该链接。
       ![打开 My 链接](/home-assistant/images/assist/esp32-atom-flash-06.png)
    5. 选择 **OK**。
       ![设置 ESPHome](/home-assistant/images/assist/esp32-atom-flash-07.png)
    6. 要添加新发现的设备，请从列表中选择 ESP32-S3-BOX。
       - 将 ESP32-S3-BOX 分配到一个房间，然后选择 **Finish**。
    7. 您现在应该会看到 **ESPHome** 集成。
       ![发现新的 ESPHome 设备](/home-assistant/images/assist/m5stack-atom-echo-discovered-33.png)
    8. 选择 **ESPHome** 集成。在 **设备** 下，您应该会看到 **ESP32-S3-BOX**。
        ![发现 ESP32-S3-BOX-3](/home-assistant/images/assist/s32-s3-box-3-discovered.png)

        - 您的 ESP32-S3-BOX 已通过 Wi-Fi 连接到 Home Assistant。现在，您可以使用 USB 电源把它移动到家里的任意位置。
```

## 检查唤醒词设置

1. 确保您的助手已经[启用唤醒词](/home-assistant/voice_control/install_wake_word_add_on/)，并使用 “OK Nabu”。
2. 在 **设备** 下，选择 ESP32-S3-BOX* 条目的 **设备**，打开设备页面。
3. 检查设备设置：
    - 如果您愿意，可以在 ESP32-S3 设备上处理唤醒词，而不是在 Home Assistant 服务器上处理。这里的服务器指的是安装了 Home Assistant 的设备，例如 Home Assistant Green。
    - 在 **Wake word engine location** 下，选择 **On device**，这样唤醒词会在设备本身处理，而不是在 Home Assistant 中处理。
      - 本地处理速度更快。
      - 当前的唤醒词为 *Okay Nabu*。

      ![ESP32-S3-BOX-3 设备端唤醒词处理](/home-assistant/images/assist/wake_word_engine_location.png)

4. 如果您选择了设备端唤醒词处理，但不想使用 *Okay Nabu*，可以更改设备端唤醒词。
   - 当前支持的替代唤醒词有 *Hey Jarvis* 和 *Alexa*。
   - 如需更改，请按照[在 S3-BOX-3 上自定义设备端唤醒词](/home-assistant/voice_control/s3-box-customize/#customizing-on-device-wake-words-microwakeword)中的步骤操作。
5. 恭喜！您现在已经可以通过带显示屏的 ESP32 设备来语音控制 Home Assistant 了，快来试试吧。

## 控制 Home Assistant

1. 说出您的唤醒词。本教程中使用的是 “OK Nabu”。
2. 说出一条[受支持的语音命令](/home-assistant/voice_control/builtin_sentences/)。例如，*打开灯*。
   - 意图处理完成后，LED 会亮起绿色，Home Assistant 也会确认该操作。
      - 请确保您使用的区域名称与 Home Assistant 中定义的完全一致。
      - 您也可以提出问题，例如：
          - *前门锁上了吗？*
          - *客厅里有哪些灯是开着的？*
3. 如果您的命令不受支持，可以使用[句子触发器](/home-assistant/voice_control/custom_sentences/)添加自己的命令。

## 关闭麦克风或屏幕

1. 如果您暂时不希望 Assist 监听您，可以关闭麦克风。
   - 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后选择 **ESPHome** 集成。
      - 在 **ESP32-S3-BOX-3** 下，选择 **1 个设备**。
      - 启用 **Mute**。
      - ESP32-S3-BOX-3 的屏幕也会一并关闭。

      ![用于启用或禁用静音的开关](/home-assistant/images/assist/wake_word_disable.png)
2. 如果您只想使用唤醒词，但不想使用屏幕，也可以关闭屏幕。
   - 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后选择 **ESPHome** 集成。
     - 在 **ESP32-S3-BOX-3** 下，选择 **1 个设备**。
     - 关闭 **Screen**。

      ![用于启用或禁用屏幕的开关](/home-assistant/images/assist/s3-box-disable-screen.png)

<a id="updating-the-software-on-the-s3-box"></a>

## 更新 S3-BOX 上的软件

如需更新 S3-BOX 上的软件，请根据您的实际情况选择以下步骤：

- **选项 1**：您使用的是 Home Assistant 2024.7 或更高版本，并且没有手动修改过 S3-BOX 的 ESPHome 配置
  - 当有更新可用时，您会像收到其他更新一样收到更新通知。
  - 要直接在设备上安装预编译的新固件，请确保 S3-BOX 已连接到网络，然后在 **ESP32 S3 BOX...Firmware** 下选择 **安装**。
- **选项 2**：您使用的是 Home Assistant 2024.6 或更早版本，并且没有手动修改过 S3-BOX 的 ESPHome 配置
  - 按照[在 S3-BOX 上安装软件](#在-esp32-s3-box-上安装软件)流程中的前 1 到 3 步操作。
    - 这样会为您的 S3-BOX 安装最新的预编译固件。
- **选项 3**：您手动修改过 S3-BOX 的配置文件
  - 您需要自己编译固件。可以选择以下任一方式：
    - 在 Home Assistant 中使用 ESPHome 仪表盘应用。这是最简单的方法，但通常也是最慢的，而且在旧系统或内存、CPU 资源有限的系统上可能失败。
    - 按照 [ESPHome 文档](https://esphome.io/guides/getting_started_command_line/)中的说明，使用桌面级系统来编译和安装固件。初始设置更复杂，但整个过程明显更快，也更可靠。
