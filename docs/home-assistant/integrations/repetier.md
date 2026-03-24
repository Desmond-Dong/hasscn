---
title: Repetier-Server
description: 说明如何将 Repetier-Server 传感器添加到 Home Assistant。
ha_category:
  - Hub
  - Sensor
ha_release: 0.94
ha_iot_class: Local Polling
ha_codeowners:
  - '@ShadowBr0ther'
ha_domain: repetier
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

[Repetier-Server](https://www.repetier-server.com/) 是一个 3D 打印机/CNC 服务器，能够在同一服务器上控制多个设备。
此集成负责与该服务器进行主要对接。

目前在 Home Assistant 中支持以下设备类型：

- Sensor

## 配置

```yaml
repetier:
  - host: REPETIER_HOST
    api_key: YOUR_API_KEY
```

```yaml
repetier:
  description: Repetier 集成。
  type: list
  required: true
  keys:
    host:
      description: Repetier-Server 的主机 IP 或主机名。
      required: true
      type: string
    api_key:
      description: 用于连接 Repetier-Server 的用户 API 密钥。
      required: true
      type: string
    port:
      description: 用于连接主机的端口。
      required: false
      type: integer
      default: 3344
    sensors:
      description: 传感器配置。
      required: false
      type: map
      keys:
        monitored_conditions:
          description: 要启用的传感器。
          type: list
          default: all
          keys:
            "current_state":
              description: 当前状态文本。
            "extruder_temperature":
              description: 所有可用挤出机的温度。这些实体将显示为 `printer_name_extruder_N`。
            "bed_temperature":
              description: 所有可用热床的温度。这些实体将显示为 `printer_name_bed_N`。
            "chamber_temperature":
              description: 所有可用加热腔体的温度。这些实体将显示为 `printer_name_chamber_N`。
            "current_job":
              description: 在状态中返回当前任务完成百分比，并将当前任务信息作为属性提供。
            "job_start":
              description: 任务开始时间戳。
            "job_end":
              description: 预计任务结束时间戳。
```

多个 Repetier Server 的示例：

```yaml
repetier:
  - host: REPETIER_HOST
    api_key: YOUR_API_KEY
    sensors:
      monitored_conditions:
        - 'current_state'
        - 'current_job'
  - host: REPETIER_HOST
    api_key: YOUR_API_KEY
    port: 3344
```

如果 Repetier-Server 主机配有网络摄像头，也可以一并添加。

```yaml
camera:
  - platform: mjpeg
    name: Repetier
    still_image_url: http://YOUR_REPETIER_HOST_IP:8080/?action=snapshot
    mjpeg_url: http://YOUR_REPETIER_HOST_IP:8080/?action=stream
```

### 获取 API 密钥

要生成所需的 API 密钥，请执行以下步骤：

- 打开 Repetier Server Web 控制台。
- 点击设置图标（齿轮图标）。
- 选择 User Profiles。
- 创建一个新用户，取消勾选所有选项，然后点击 Create User。
- 编辑新创建的用户，记下该用户的 API 密钥；这就是在 Home Assistant 设置中要使用的密钥。
