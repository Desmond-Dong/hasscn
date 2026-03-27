---
title: FRITZ!Box Call Monitor
description: 'FRITZ!Box Call Monitor 集成监控 FRITZ!Box(https://en.fritz.com/products/fritzbox/) 路由器（由 FRITZ!，以前的 AVM）在 TCP 端口 1012 上公开的呼叫监视器。它将采用值 idle、ringing、dialing 或。'
ha_category:
  - System monitor
ha_release: 0.27
ha_iot_class: Local Polling
ha_domain: fritzbox_callmonitor
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---
# FRITZ!Box Call Monitor

**FRITZ!Box Call Monitor** 集成监控 [FRITZ!Box](https://en.fritz.com/products/fritzbox/) 路由器（由 FRITZ!，以前的 AVM）在 TCP 端口 1012 上公开的呼叫监视器。它将采用值 `idle`、`ringing`、`dialing` 或 `talking` 以及状态属性中包含的涉及的电话号码。
它还可以访问路由器的内部电话簿来查找与电话号码对应的名称并将其存储在状态属性中。

## 先决条件

要在您的安装中使用 FRITZ!Box 呼叫监视器，必须创建至少具有 `Voice messages, faxes, FRITZ!App Fon and call list` 权限的用户：

1. 通过 `fritz.box` 或 FRITZ!Box 的 IP 地址（例如 `192.168.1.1`）打开 Web 用户界面。
2. 使用您的管理员用户凭据登录。默认的管理员用户凭据可以在 FRITZ!Box 的底部找到。
3. 导航到 **系统** > **FRITZ!Box 用户**。
4. 单击 `Add User` 按钮。
5. 启用选项 `User account enabled`。
6. 输入用户名和密码。
7. 选中 `Voice messages, faxes, FRITZ!App Fon and call list` 旁边的权限框。
8. 单击 `Apply` 按钮。

您还需要从 HA 到端口 `tcp/1012` 上的 FRITZ!Box 的网络访问权限以进行呼叫监控，以及*一次性访问*端口 `tcp/80` 以设置集成。

＃＃ 设置

要激活 FRITZ!Box 上的呼叫监视器，请从与其连接的任何电话拨打 **#96\*5\***。使用 DECT 电话时，电话不得通过 DECT 中继器连接，必须直接连接到 FRITZ!Box。


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

如果您希望 Home Assistant 根据 FRITZ!Box 电话簿将号码解析为姓名，则必须配置正确的前缀。通常，您只需要一个前缀，它等于您的国家/地区呼叫代码，例如德国为 `+49`，法国为 `+33`。在 [Wikipedia](https://en.wikipedia.org/wiki/List_of_country_calling_codes) 上找到正确的前缀并将其添加到配置页面上。

## 示例

### 发送状态更改通知

此示例展示了如何在传感器状态发生变化时发送通知。当您接到电话和拨打电话时，您都会收到通知。


```yaml
# Example configuration.yaml entry.
automation:
  - alias: "Notify about phone state"
    triggers:
      - trigger: state
        entity_id: sensor.phone
    actions:
      - action: notify.notify
        data:
          title: "Phone"
          message: >-
            {% if is_state("sensor.phone", "idle") %}
              Phone is idle
            {% elif is_state("sensor.phone", "dialing") %}
              Calling {{ state_attr('sensor.phone', 'to_name') }} ({{ state_attr('sensor.phone', 'to') }})
            {% elif is_state("sensor.phone", "ringing") %}
              Incoming call from {{ state_attr('sensor.phone', 'from_name') }} ({{ state_attr('sensor.phone', 'from') }})
            {% else %}
              Talking to {{ state_attr('sensor.phone', 'with_name') }} ({{ state_attr('sensor.phone', 'with') }})
            {% endif %}
```


