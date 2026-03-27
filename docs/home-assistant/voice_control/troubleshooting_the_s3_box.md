---
title: ESP32-S3-BOX-3 故障排除
description: '本节提供适用于 Espressif ESP32-S3-BOX-3 的故障排除步骤。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# ESP32-S3-BOX-3 故障排除

本节提供适用于 Espressif ESP32-S3-BOX-3 的故障排除步骤。

## 错误：无法连接到 Wi-Fi

### 现象

ESP32-S3-BOX-3 显示无法连接到 Wi-Fi 的消息。

### 解决方法

1. 先检查您的网络本身是否正常。

   1. 确保路由器已开启，并且设备在信号覆盖范围内。
   2. 确保您选择的是支持 2.4 GHz 的 Wi-Fi 网络。ESP32-S3-BOX-3 无法连接到 5 GHz 网络。

2. 接下来请确认您输入的 Wi-Fi 密码正确。根据您是否已安装 ESPHome 应用，请按照 **选项 1** 或 **选项 2** 操作。

   - **选项 1**：您尚未安装 ESPHome 应用，或者虽然安装了，但**没有**接管 ESP32-S3-BOX-3。如果设备显示为绿色，说明它尚未被接管。
     ![ESP32-S3-BOX-3 not adopted](/home-assistant/images/assist/esp32-not-adopted.png)
     1. 确保 USB 线已连接到 ESP32-S3-BOX-3。
     2. 前往 [ESPHome projects 网站](https://esphome.io/projects/index.html)，选择 **Connect**，然后选择 **Change Wi-Fi**。
   - **选项 2**：您已经安装了 ESPHome 应用，并且已在 ESPHome 仪表盘中接管 ESP32-S3-BOX-3。

     1. 确保 USB 线已连接到 ESP32-S3-BOX-3。
     2. 在 Home Assistant 中，前往 [**设置** > **应用** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome)，然后选择 **打开 Web UI**。
     3. 在 **ESP32-S3-BOX-3** 条目上选择 **编辑**。
        ![ESP32-S3-BOX-3 open config file](/home-assistant/images/assist/esps32-s3-edit-config.png)
        - **结果**：编辑器会打开，并显示配置文件。
          ![ESP32-S3-BOX-3 edit config file](/home-assistant/images/assist/esp32-edit-wifi-credentials.png)
     4. 在 **WiFi** 部分检查是否引用了 `secrets` 文件，也就是包含 `!secret`。
        如果没有 **WiFi** 段，请添加以下内容：

     ```yaml
     wifi:
       ssid: !secret wifi_ssid
       password: !secret wifi_password
     ```

     5. 关闭编辑器，然后在概览中选择 **Secrets**。
        ![ESP32-S3-BOX-3 open config file](/home-assistant/images/assist/esp32-open-secrets.png)
     6. 输入您的 Wi-Fi 凭据。
        ![ESP32-S3-BOX-3 open config file](/home-assistant/images/assist/esp32-edit-secrets.png)

## 安装后始终没有出现 Wi-Fi 对话框

### 现象

安装向导没有显示连接 Wi-Fi 的对话框，而是直接返回 **Install Voice Assistant** 页面。

### 解决方法

1. 拔下连接 ESP32-S3-BOX-3 的 USB 线，然后重新连接。
2. 如果仍无效，请检查您使用的 USB 线是否只是供电线，而不支持数据传输。

## 错误：No Home Assistant

### 现象

ESP32-S3-BOX-3 显示没有 Home Assistant 的消息。

### 说明

这表示设备已经连接到 Wi-Fi，但无法与 Home Assistant 通信。

### 解决方法

1. 如果您是在重启期间或更新进行中看到这条消息，请等待重启或更新完成。
   - 这种情况下您无需操作。设备暂时停止通信是正常现象。
2. 确保设备与 Home Assistant 位于同一网络中。
   - 如果您的网络使用了 VLAN，请确认它们位于同一 VLAN。
3. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
   - 如果设备显示为 **已发现**，请选择 **添加**。
     ![ESP32-S3-BOX-3 open config file](/home-assistant/images/assist/esp32-discovered.png)
   - 如果没有被发现，请选择 [**添加集成** > **ESPHome**](https://my.home-assistant.io/redirect/config_flow_start/?domain=esphome)。
4. 如果您看到下图界面，但列表中没有 ESP32-S3-BOX-3，请选择 **设置另一个 ESPHome 实例**。

   ![ESP32-S3-BOX-3 open config file](/home-assistant/images/assist/esp32-s3-box-not-discovered.png)

   - 到路由器中查找设备的 IP 地址或主机名，然后手动输入。
