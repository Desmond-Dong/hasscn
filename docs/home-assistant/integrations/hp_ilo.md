---
title: HP Integrated Lights-Out (ILO)
description: 关于如何在 Home Assistant 中集成 HP ILO（集成远程管理）传感器的说明。
ha_category:
  - System monitor
ha_release: 0.27
ha_iot_class: Local Polling
ha_domain: hp_ilo
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**HP Integrated Lights-Out** 集成允许您对服务器的 HP ILO（集成远程管理）传感器进行 API 调用，并在 Home Assistant 传感器中使用这些数据。

如果 ILO 或指定的 jsonpath 查询仅返回单个值（例如温度或状态），它将被放入状态字段。如果返回数据结构，它将被放入 `ilo_data` 属性中。

有关可以从这些传感器检索的内容的更多详细信息，请参阅 [python-hpilo 文档](https://seveas.github.io/python-hpilo/)。

<p class='img'>
  <img src='/home-assistant/images/screenshots/hp_ilo.png' />
</p>

## 配置

要在您的系统中使用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: hp_ilo
    host: IP_ADDRESS or HOSTNAME
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    monitored_variables:
      - name: SENSOR NAME
        sensor_type: SENSOR TYPE
```

```yaml
host:
  description: 可以访问 ILO 的主机名或 IP 地址。
  required: true
  type: string
port:
  description: 可以访问 ILO 的端口。
  required: false
  default: 443
  type: string
username:
  description: 用于连接到 ILO 的用户名。
  required: true
  type: string
password:
  description: 用于连接到 ILO 的密码。
  required: true
  type: string
monitored_variables:
  description: 从 ILO 数据创建的传感器。
  required: false
  default: 默认为空列表（不创建传感器）。
  type: list
  keys:
    name:
      description: 传感器名称。
      required: true
      type: string
    sensor_type:
      description: 传感器类型，必须是下面指定的有效传感器类型之一。
      required: true
      type: string
    unit_of_measurement:
      description: 传感器的测量单位。
      required: false
      type: string
    value_template:
      description: 当在此处指定 Jinja2 模板时，创建的传感器将输出模板结果。可以使用 `ilo_data` 变量引用 ILO 响应。
      required: false
      type: template
```

有效的 sensor_types：
- **server_name**：获取此 iLO 管理的服务器名称。
- **server_fqdn**：获取此 iLO 管理的服务器的 FQDN。
- **server_host_data**：获取描述主机的 SMBIOS 记录。
- **server_oa_info**：获取有关封闭机箱的板载管理器的信息。
- **server_power_status**：服务器是否已开机。
- **server_power_readings**：获取当前、最小、最大和平均功率读数。
- **server_power_on_time**：服务器已开机多少分钟（非重置计数器，类似于使用小时数）。
- **server_asset_tag**：获取服务器资产标签。
- **server_uid_status**：获取 UID 指示灯的状态。
- **server_health**：获取服务器健康信息。
- **network_settings**：获取 iLO 网络设置。

## 示例

为了获取报告 CPU 风扇速度和环境入口温度的两个传感器，以及 HP Microserver Gen8 上的 `server_health` 转储，您可以在 "`configuration.yaml`" 文件中使用以下内容


```yaml
sensor:
  - platform: hp_ilo
    host: IP_ADDRESS or HOSTNAME
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    monitored_variables:
      - name: CPU fanspeed
        sensor_type: server_health
        unit_of_measurement: "%"
        value_template: '{{ ilo_data.fans["Fan 1"].speed[0] }}'
      - name: Inlet temperature
        sensor_type: server_health
        unit_of_measurement: "°C"
        value_template: '{{ ilo_data.temperature["01-Inlet Ambient"].currentreading[0] }}'
      - name: Server Health
        sensor_type: server_health
        value_template: '{{ ilo_data.health_at_a_glance }}'
```


<p class='img'>
  <img src='/home-assistant/images/screenshots/hp_ilo_sensors.png' />
</p>

## 硬件特性

:::note
并非所有硬件都支持所有值。

:::
### HP Microserver Gen8

在此硬件上，您应避免使用以下 sensor_types 作为 `monitored_variables:` 以防止错误。

- `server_oa_info`
- `server_power_readings`
- `server_power_on_time`