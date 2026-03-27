---
title: Phone Modem
description: 'Phone Modem 集成使用可用调制解调器来收集来电显示信息。它要求使用兼容 Hayes AT 且支持来电显示检测（通过 AT+VCID=1）的调制解调器。通常，任何使用 CX93001 的调制解调器都支持此功能。 本页属于 Home Assistant 中文文档。'

ha_category:
  - Sensor
ha_release: '0.40'
ha_iot_class: Local Polling
ha_domain: modem_callerid
ha_codeowners:
  - '@tkdrob'
ha_platforms:
  - button
  - sensor
ha_config_flow: true
ha_integration_type: device
---
# Phone Modem

**Phone Modem** 集成使用可用调制解调器来收集来电显示信息。它要求使用兼容 Hayes AT 且支持来电显示检测（通过 `AT+VCID=1`）的调制解调器。通常，任何使用 CX93001 的调制解调器都支持此功能。

当传感器检测到新来电时，每响铃一次其状态就会变为 `ring`；收到来电显示信息时，状态变为 `callerid`。当停止响铃后，它会恢复为 `idle`。状态事件包含属性负载，其中包括来电时间、姓名和号码。

此集成还提供一个按钮，可先接听再挂断电话，以便正确拒接（通过 `ATA` 和 `ATH`）。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 兼容性

已报告可与此集成配合工作的型号包括：
- [StarTech.com USB56KEMH2](https://www.startech.com/en-us/networking-io/usb56kemh2)
- Zoom USB Modem Model 3095

无法工作的设备：
- [StarTech.com USB56KEM3](https://www.startech.com/en-us/networking-io/usb56kem3)

## 示例

自动化示例：


```yaml
automation:
  - alias: "Notify CallerID"
    triggers:
      - trigger: state
        entity_id: sensor.phone_modem
        to: "callerid"
    actions:
      - action: notify.notify
        data:
          message: "Call from {{ state_attr('sensor.phone_modem', 'cid_name') }} at {{ state_attr('sensor.phone_modem', 'cid_number') }} "

  - alias: "Notify CallerID webui"
    triggers:
      - trigger: state
        entity_id: sensor.phone_modem
        to: "callerid"
    actions:
      - action: persistent_notification.create
        data:
          title: "Call from"
          message: "{{ state_attr('sensor.phone_modem', 'cid_time').strftime("%I:%M %p") }} {{ state_attr('sensor.phone_modem', 'cid_name') }}  {{ state_attr('sensor.phone_modem', 'cid_number') }} "

  - alias: "Say CallerID"
    triggers:
      - trigger: state
        entity_id: sensor.phone_modem
        to: "callerid"
    actions:
      - action: tts.google_say
        data:
          message: "Call from {{ state_attr('sensor.phone_modem', 'cid_name') }}"
```


