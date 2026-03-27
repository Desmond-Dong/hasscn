---
title: Home Assistant 的 13 美元语音助手
description: '本教程将指导您把 ATOM Echo 变成一个语音助手。拿起这个小巧的设备，就可以和您的智能家居对话、发出命令并获得回复。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# Home Assistant 的 13 美元语音助手

本教程将指导您把 ATOM Echo 变成一个语音助手。拿起这个小巧的设备，就可以和您的智能家居对话、发出命令并获得回复。

<lite-youtube videoid="ziebKt4XLZQ" videotitle="Home Assistant 中 13 美元 ATOM Echo 的唤醒词演示
"></lite-youtube>

## 前提条件

- 已安装 Home Assistant Operating System 的 Home Assistant 2023.10 或更高版本。如果您尚未安装 Home Assistant，请参考[安装页面](/home-assistant/installation/)
- [Home Assistant Cloud](/home-assistant/voice_control/voice_remote_cloud_assistant/) 或手动配置的 [Assist 流水线](/home-assistant/voice_control/voice_remote_local_assistant)
- 已为语音助手[启用唤醒词](/home-assistant/voice_control/install_wake_word_add_on/)
- 您的 2.4 GHz Wi-Fi 网络密码
- 桌面版 Chrome 或其他基于 Chromium 的浏览器，例如 Edge，不支持 Android 或 iOS
- [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit)
- 用于连接 ATOM Echo 的 USB-C 线缆

## 在 ATOM Echo 上安装软件

在将此设备用于 Home Assistant 之前，您需要先为它安装一些软件。

1. 请确保本页面是在桌面上的 Chromium 浏览器中打开。平板和手机无法完成此操作。
   - 选择下方的 **Connect** 按钮。如果浏览器不支持 Web Serial，您看到的会是警告信息，而不是按钮。

      <script type="module" src="https://unpkg.com/esp-web-tools@10.2.1/dist/web/install-button.js?module" integrity="sha384-2Ea4WL8tjFb0qQKUqBoX45KlPVoUgL+Z3zUqsD0MHmtJ3faDbfNyZulLg/LfYDUZ" crossorigin="anonymous"></script>
      <esp-web-install-button manifest="https://firmware.esphome.io/wake-word-voice-assistant/m5stack-atom-echo/manifest.json"></esp-web-install-button>
   - **适合高级用户**：配置文件可在 [GitHub](https://github.com/esphome/wake-word-voice-assistants/blob/main/m5stack-atom-echo/m5stack-atom-echo.yaml) 上查看。

2. 按照以下步骤将 ATOM Echo 连接到电脑：
   - 在弹出窗口中查看可用端口。
   - 将 USB-C 线连接到 ATOM Echo，并连接到您的电脑。
   - 弹出窗口中现在应该会出现一个新条目。选择这个 USB 串口，然后选择 **Connect**。
   - **故障排除**：如果没有出现新端口，您的系统可能缺少驱动程序。关闭弹出窗口。
     - 在对话框中选择 CH342 驱动程序，安装后再选择 **Try again**。
   ![打开 My 链接](/home-assistant/images/assist/esp32-atom-flash-no-port.png)
3. 选择 **Install Voice Assistant**，然后选择 **Install**。
   - 安装完成后，选择 **Next**。
   - 将 ATOM Echo 添加到您的 Wi-Fi：
     - 根据提示从列表中选择您的网络，并输入 2.4 GHz Wi-Fi 凭据。
     - 选择 **Connect**。
     - ATOM Echo 加入网络后，选择 **Add to Home Assistant**。
4. 这会打开通向 Home Assistant 的 **My** 链接。
   - 如果您以前没有使用过 My Home Assistant，需要先完成配置。如果您的 Home Assistant URL 不是 `http://homeassistant.local:8123`，请替换为您自己的实例地址。
   - 打开该链接。

      ![打开 My 链接](/home-assistant/images/assist/esp32-atom-flash-06.png)

5. 选择 **OK**。

   ![设置 ESPHome](/home-assistant/images/assist/esp32-atom-flash-07.png)

6. 这会启动一个向导，用于自定义您的语音助手。
   - 按照向导步骤设置唤醒词并选择声音。
   - 完成后，选择 **Done**。
7. 您的 ATOM Echo 现在已通过 Wi-Fi 连接到 Home Assistant。现在，您可以使用 USB 电源把它移动到家里的任意位置。
8. 恭喜！您现在已经可以通过语音控制 Home Assistant 了，快来试试吧。

## 通过 ATOM Echo 控制 Home Assistant

1. 说出您配置的唤醒词，例如 “OK, Nabu”。
   - 等待 LED 开始蓝色闪烁。
2. 说出一条[受支持的语音命令](/home-assistant/voice_control/builtin_sentences/)。例如，*关闭厨房的灯*。
   - 在您说话时，蓝色 LED 会持续脉动。
   - 意图处理完成后，LED 会亮起绿色，Home Assistant 也会确认该操作。
      - 请确保您使用的区域名称与 Home Assistant 中定义的完全一致。
      - 您也可以提出问题，例如：
          - *前门锁上了吗？*
          - *客厅里有哪些灯是开着的？*
3. 如果您的命令不受支持，可以使用[句子触发器](/home-assistant/voice_control/custom_sentences/)添加自己的命令。
4. 如果您觉得 ATOM Echo 开始处理命令的时间过长：
   - 可以调整静音检测设置。
   - 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后选择 **ESPHome** 集成。
   - 在 **M5Stack ATOM Echo** 下，选择 **1 个设备**。在 **配置** 下修改 **Finished speaking detection**。
   - 这个设置决定了 Assist 需要检测到多长时间的静音，才会认为您已经说完并开始处理命令。

     ![打开 My 链接](/home-assistant/images/assist/esp32-atom_silence_detection_01.png)

## 故障排除

如果事情没有按预期工作：

- 请查看 [Assist 的通用故障排除部分](/home-assistant/voice_control/troubleshooting/)

## 从 ATOM Echo 中删除 Wi-Fi 凭据

如果您不再使用这个设备，或准备转交给其他人，可以删除设备中保存的 Wi-Fi 凭据。

1. 请确保本页面是在桌面上的 Chromium 浏览器中打开。平板和手机无法完成此操作。
   - 选择下方的 **Connect** 按钮。如果浏览器不支持 Web Serial，您看到的会是警告信息，而不是按钮。

      <script type="module" src="https://unpkg.com/esp-web-tools@10.2.1/dist/web/install-button.js?module" integrity="sha384-2Ea4WL8tjFb0qQKUqBoX45KlPVoUgL+Z3zUqsD0MHmtJ3faDbfNyZulLg/LfYDUZ" crossorigin="anonymous"></script>
      <esp-web-install-button manifest="https://firmware.esphome.io/wake-word-voice-assistant/m5stack-atom-echo/manifest.json"></esp-web-install-button>

2. 按照以下步骤将 ATOM Echo 连接到电脑：
   - 在弹出窗口中查看可用端口。
   - 将 USB-C 线连接到 ATOM Echo，并连接到您的电脑。
   - 弹出窗口中现在应该会出现一个新条目。选择这个 USB 串口，然后选择 **Connect**。
3. 在对话框中选择 **Erase user data**。
   - **结果**：设备中的 Wi-Fi 凭据会被删除。
   - 固件会保留在设备上。
