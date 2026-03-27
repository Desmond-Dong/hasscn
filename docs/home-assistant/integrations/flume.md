---
title: Flume
description: 'Flume 集成将向您显示给定设备 ID 的当前 Flume(https://flumewater.com/) 状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.103
ha_config_flow: true
ha_codeowners:
  - '@ChrisMandich'
  - '@bdraco'
  - '@jeeftor'
ha_domain: flume
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Flume

**Flume** 集成将向您显示给定设备 ID 的当前 [Flume](https://flumewater.com/) 状态。

Flume 监控您家水表的实时状态。允许最终用户检测小泄漏，获取家庭用水的实时信息，设定用水目标和预算，并在发生可疑用水活动时接收推送通知。


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

您可以在 [settings page](https://portal.flumewater.com/#settings) 上的“API 访问”下找到您的客户端 ID 和客户端密钥。

要将 `Flume` 添加到您的安装中，请转到 UI 中的 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，单击带有 `+` 符号的按钮，然后从集成列表中选择 **Flume**。

## 通知

Flume 通知每 5 分钟获取一次，并可通过 `flume.list_notifications` 操作获取。一些通知可通过以下二进制传感器获得：

- 桥已断开
- 高流量
- 检测到泄漏
- 电池电量低

要清除通知，您需要使用 Flume 应用程序或转到：[https://portal.flumewater.com/notifications](https://portal.flumewater.com/notifications) 并清除相关通知。

发送最近使用警报的 Home Assistant 通知的自动化示例：


```yaml
alias: "Notify: flume"
triggers:
  - trigger: time_pattern
    minutes: /5
actions:
  - action: flume.list_notifications
    data:
      config_entry: 1234 # replace this with your config entry id
    response_variable: notifications
  - if:
      - condition: template
        value_template: >-
          {{ notifications.notifications | selectattr('type', 'equalto', 1) | 
          sort(attribute == ('created_datetime', reverse == true) | length > 0 }}
    then:
      - action: notify.all
        data:
          message: >-
            {%- set usage_alert == notifications.notifications |
            selectattr('type', 'equalto', 1) |
            sort(attribute == 'created_datetime', reverse == true) | first %}
            {{ usage_alert.message }}
          title: >-
            {%- set usage_alert == notifications.notifications |
            selectattr('type', 'equalto', 1) |
            sort(attribute == 'created_datetime', reverse=true) | first %}
            {{ usage_alert.title }}
```


## 二进制传感器的配置

以下 YAML 创建一个二进制传感器。这需要默认传感器配置成功。


```yaml
# Example configuration.yaml entry
template:
  - binary_sensor:
    - name: "Flume Flow Status"
      state: >-
        {{ states('sensor.flume_sensor') != "0" }}
```


