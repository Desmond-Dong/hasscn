# 自定义 S3-BOX-3

## 使用您自己的插图自定义 S3-BOX-3

本教程将向您展示如何把 Espressif [ESP32-S3-BOX-3](https://www.espressif.com/en/news/ESP32-S3-BOX-3) 上的 Home Assistant 状态插图替换为您自己的图片。

您既可以准备自己的插图，也可以从社区仓库导入一些现成作品。

<lite-youtube videoid="HQQfaXTbhvc" videotitle="Okay Frenck！运行在 Espressif ESP32-S3-Box 上的开源语音助手
"></lite-youtube>

### ESP32-S3-BOX-3 语音助手状态插图

ESP32-S3-BOX-3 语音助手使用 6 张插图来表示状态：

<p class='img'>
  <img src='/home-assistant/images/assist/s3-box-status-images.png' alt='ESP32-S3-BOX-3 状态插图'>
  ESP32-S3-BOX-3 的状态包括：loading、idle、listening、thinking、replying 和 error。
</p>

图中显示的是默认插图。下面的步骤将向您展示如何修改它们。

### 前提条件

* 已安装 Home Assistant Operating System 的最新版 Home Assistant
* [Home Assistant Cloud](/home-assistant/voice_control/voice_remote_cloud_assistant/index.md) 或手动配置的 [Assist 流水线](/home-assistant/voice_control/voice_remote_local_assistant.md)
* [ESP32-S3-BOX-3](https://www.aliexpress.us/item/1005005920207976.html)。ESP32-S3-BOX-Lite 和 ESP32-S3-BOX 也适用，但目前已不再销售。
* 已成功完成[ESP32-S3-BOX-3 语音助手](/home-assistant/voice_control/s3_box_voice_assistant/index.md)教程

<a id="adopting-the-device-in-the-esphome-app"></a>

### 在 ESPHome 应用中接管设备

在导入新插图之前，您需要先安装 ESPHome 应用（旧称加载项），并在该应用中接管设备。

1. 确保 ESP32-S3-BOX-3 已经启动并连接到您的 Wi-Fi。
2. 前往 **设置** > **应用**，检查是否已安装 **ESPHome** 应用。
   * 如果尚未安装，请前往 [**设置** > **应用** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome) 进行安装。
3. 启动该应用，然后选择 **Open web UI**。
4. 在 ESPHome 应用的仪表盘中，找到 **ESP32-S3-BOX-3** 卡片并选择 **Adopt**。

   ![在 ESPHome 应用中接管 ESP32-S3-BOX-3](/home-assistant/images/assist/esp32-adopt-s3.png)
5. 如果需要，您可以给它设置一个新名称。然后选择 **Adopt**。
   * 接管 ESPHome 设备后，您就可以自定义现有软件。
   * **结果**：状态将变为 **Online**。
6. 现在您已经设置好 ESPHome 应用，可以选择以下两种方式之一来添加自定义图片：
   * [选项 1：使用社区仓库中的图片](#option-1-using-images-from-a-community-repository)
   * [选项 2：使用您自己的图片](#option-2-using-your-own-illustrations)

<a id="option-1-using-images-from-a-community-repository"></a>

### 选项 1：使用社区仓库中的图片

如果您想换新图片，但不想自己制作，可以使用社区提供的图片。
如果您想使用自己的图片，请跳过本节，直接前往[选项 2：使用您自己的图片](#option-2-using-your-own-illustrations)。

#### 使用社区图片

1. 在 **ESP32-S3-BOX-3** 应用中，选择编辑。
   * **结果**：编辑器会打开，并显示配置文件。
     ![ESP32-S3-BOX-3 配置文件](/home-assistant/images/assist/esp32-adopt-s3-01.png)

2. 为了给您一些灵感，我们准备了一些示例图片。
   * 您可以在这个[仓库](https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/tree/main/frenck/illustrations)中查看。

3. 在本教程中，我们将使用 Frenck 的部分图片。
   * 将以下内容添加到 `substitutions` 块中。

     ```yaml
     substitutions:
       loading_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/loading.png
       idle_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/idle.png
       listening_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/listening.png
       thinking_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/thinking.png
       replying_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/replying.png
       error_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/error.png
     ```

4. 保存更改，然后选择 **安装**。
   * 根据您的环境不同，安装过程可能需要一段时间。
     ![ESP32-S3-BOX-3 配置文件](/home-assistant/images/assist/esp32-s3-config-05.png)

5. 安装完成后，您就可以在 ESP32-S3-BOX-3 上看到新图片。
   * 现在说一句命令来测试新设置。例如，*OK Nabu，关闭客厅的灯*。

<a id="option-2-using-your-own-illustrations"></a>

### 选项 2：使用您自己的插图

这部分分为 2 个步骤：

* [准备您自己的插图](#to-prepare-your-own-images)
* [将插图添加到配置中](#to-add-your-images-to-the-configuration)

<a id="about-the-image-specifications"></a>

#### 关于图片规格

以下内容可以帮助您在 ESP32-S3-BOX-3 屏幕上获得最佳显示效果。

##### 使用浅色和深色背景

在[状态插图总览](#esp32-s3-box-3-语音助手状态插图)中，您可以看到默认图片使用了不同的背景颜色。这样做是为了让您在看屏幕时更容易识别状态变化。

在您的图片中，可以使用两种不同的背景颜色：

* loading 和 idle：使用深色背景
* listening、thinking 和 replying：使用浅色背景
* error：可按您的喜好设置

如果您的图片带有透明区域，您可以在配置中定义背景颜色。下面的步骤会介绍如何修改背景。

##### 图片尺寸和文件格式

* **尺寸**：屏幕分辨率为 320 x 240 像素。如果您提供的图片不是 4:3 比例，剩余区域会用背景色填充。
* **文件格式**：PNG、JPEG 或 SVG

<a id="to-prepare-your-own-images"></a>

#### 准备您自己的图片

1. 根据[关于图片规格](#about-the-image-specifications)一节中的说明创建自己的图片。
   * 您甚至可以手绘。
   * 我们还提供了一个[模板](#to-draw-your-own-images)。
2. 将 6 张图片全部复制到一个文件夹中，例如 `voice_assistant_gfx`。
3. 确保您已经[可以访问配置文件](/home-assistant/common-tasks/os/index.md#configuring-access-to-files)。
   * [安装 Samba 应用](/home-assistant/common-tasks/os/index.md#installing-and-using-the-samba-app)。
   * 这样可以一次复制多个文件。
4. 将图片文件夹复制到配置目录：
   * 打开 `config` 文件夹，然后打开 `ESPHome` 文件夹。
   * 将您的图片文件夹复制到其中。
     ![ESP32-S3-BOX-3 配置文件](/home-assistant/images/assist/s32-s3-add-image-folder.png)

<a id="to-add-your-images-to-the-configuration"></a>

#### 将图片添加到配置中

1. 在 Home Assistant 中，前往 [**设置** > **应用** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome)，然后选择 **Open Web UI**。

2. 在 **ESP32-S3-BOX-3** 应用中，选择编辑。
   * **结果**：编辑器会打开，并显示配置文件。
     ![ESP32-S3-BOX-3 配置文件](/home-assistant/images/assist/esp32-adopt-s3-01.png)

3. 要添加您的图片，请将以下内容添加到 `substitutions` 块中。

   ```yaml
   substitutions:
     loading_illustration_file: voice_assistant_gfx/loading.png
     idle_illustration_file: voice_assistant_gfx/idle.png
     listening_illustration_file: voice_assistant_gfx/listening.png
     thinking_illustration_file: voice_assistant_gfx/thinking.png
     replying_illustration_file: voice_assistant_gfx/replying.png
     error_illustration_file: voice_assistant_gfx/error.png
   ```

4. 如果您的图片使用了透明区域，并且您想修改背景色，请将以下内容添加到 `substitutions` 块中：
   * `000000` 代表黑色，`FFFFFF` 代表白色，均为[十六进制颜色代码](https://www.w3schools.com/html/html_colors_hex.asp)。
   * 如果您想使用其他颜色，请替换对应的颜色代码。
   * 如需查找颜色代码，可以使用 Google 取色器之类的工具。

     ```yaml
     substitutions:
       ...
       loading_illustration_background_color: '000000'
       idle_illustration_background_color: '000000'
       listening_illustration_background_color: 'FFFFFF'
       thinking_illustration_background_color: 'FFFFFF'
       replying_illustration_background_color: 'FFFFFF'
       error_illustration_background_color: '000000'
     ```

5. 保存更改并选择 **安装**。
   ![ESP32-S3-BOX-3 配置文件](/home-assistant/images/assist/s32-s3-add-image-config-02.png)

6. 再次保存更改。
   * 根据您的环境不同，安装过程可能需要一段时间。

7. 安装完成后，您就可以在 S3-BOX 上看到新图片。
   * 现在说一句命令来测试新设置。例如，*OK Nabu，打开灯*。

<a id="to-draw-your-own-images"></a>

## 绘制您自己的图片

1. 我们为您准备了一个模板，方便您绘制自己的状态图片。
   ![ESP32-S3-BOX-3 绘图模板](/home-assistant/images/assist/draw_assist.png)
2. 下载文件后就可以开始绘制。

      <a href="/home-assistant/images/assist/draw_assist.pdf" Download>
      <img width="60" src="/home-assistant/images/assist/download-file.png" alt="Draw Assist">
      </a>
3. 完成后：
   * 分别为每张图片拍照。
   * 按照[这些步骤](#to-prepare-your-own-images)将它们放到您的语音助手中。

<a id="customizing-on-device-wake-words-microwakeword"></a>

## 自定义设备端唤醒词（microWakeWord）

您可以修改 S3-BOX-3 上使用的设备端唤醒词，也就是 microWakeWord。

### 前提条件

* 已安装 Home Assistant Operating System 的 Home Assistant 2024.2 或更高版本。如果您尚未安装 Home Assistant，请参考[安装页面](/home-assistant/installation/index.md)
* 已成功[在 S3-BOX-3 上安装 ESPHome](/home-assistant/voice_control/s3_box_voice_assistant/index.md)
* ESPHome 2024.2 或更高版本
* Home Assistant 服务器至少有 2 GB 可用内存
  * 固件在安装到 S3-BOX-3 之前，需要先在服务器上编译。
  * 编译过程需要一定内存。
* 您已在 S3-BOX-3 上安装设备端唤醒词

*(同样适用于现已停产的 S3-BOX 和 S3-BOX-Lite)*

### 在 S3-BOX-3 上自定义设备端唤醒词

1. 如果您还没有这样做，请先[在 ESPHome 应用中接管设备](#adopting-the-device-in-the-esphome-app)。

2. 在 Home Assistant 中，前往 [**设置** > **应用** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome)，然后选择 **Open Web UI**。

3. 在 **ESP32-S3-BOX-3** 条目上选择编辑。
   * **结果**：编辑器会打开，并显示配置文件。
     ![ESP32-S3-BOX-3 配置文件](/home-assistant/images/assist/esp32-adopt-s3-01.png)

4. 要更改唤醒词，请将以下内容添加到 `substitutions` 块中。
   * 除了 `okay_nabu` 之外，您还可以使用 `alexa` 或 `hey_jarvis`。

     ```yaml
     substitutions:
       ...
       micro_wake_word_model: hey_jarvis
     ```

5. 保存更改，然后在右上角选择 **安装**。
   * 根据您的环境不同，安装过程可能需要一段时间。
   * 例如，在 Home Assistant Green 上大约需要 45 分钟。

6. 选择 **ESPHome** 集成。在 **设备** 下，您应该会看到 **ESP32-S3-BOX**。
   * 在 ESP32-S3-BOX-3 条目上选择 **设备**，打开设备页面。
   * 在 **Wake word engine location** 下，选择 **On device**。

     ![ESP32-S3-BOX-3 设备端唤醒词处理](/home-assistant/images/assist/wake_word_engine_location.png)

7. 现在说一句命令来测试新设置。例如，*Hey Jarvis，打开灯*。

[microWakeWord]: https://github.com/kahrendt/microWakeWord

[Kevin Ahrendt]: https://www.kevinahrendt.com/
