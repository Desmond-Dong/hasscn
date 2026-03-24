---
title: Obihai
description: "有关如何将 Obihai 设备集成到 Home Assistant 的说明。"

ha_iot_class: Local Polling
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 0.99
ha_codeowners:
  - '@dshokouhi'
  - '@ejpenney'
ha_domain: obihai
ha_platforms:
  - button
  - sensor
ha_integration_type: device
ha_dhcp: true
---

The **Obihai** integration allows you to view the call status for your [Obihai devices](https://www.obitalk.com/info/products#home_section).

## Configuration

To add the **Obihai** device to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=obihai)

Obihai can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=obihai).
- From the list, select **Obihai**.
- Follow the instructions on screen to complete the setup.

</details>

```yaml
host:
  description: IP Address of Obihai device
username:
  description: Username for the Obihai device.
password:
  description: Password for the Obihai device.
```

以下是使用“用户”帐户时预期传感器及其预期状态的列表：

- 传感器是否需要重新启动设备（“True”或“False”）
- 每个配置服务的传感器（“0”表示无呼叫，“1”表示呼叫，“2”表示呼叫等待/3路呼叫）
- 最后重启日期的传感器
- 呼叫方向传感器（“无活动呼叫”、“入站呼叫”或“出站呼叫”）

除了上面的列表之外，“admin”帐户还可以看到以下传感器：

- Obihais 服务状态（Obihais 网络中的“正常”、“关闭”或其他状态）
- 每个正在使用的电话端口的传感器（“挂机”、“摘机”和“响铃”）
- 最后呼叫者姓名和号码的传感器（这也是当前来电，如果没有提供数据，也会显示“--”）

您还将看到每个配置的 Obihai 的重新启动按钮，按下此按钮将重新启动 Obihai。