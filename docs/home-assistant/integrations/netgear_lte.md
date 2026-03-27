---
title: NETGEAR LTE
description: 'The NETGEAR LTE integration for Home Assistant allows you to observe and control NETGEAR LTE modems(https://www.netgear.com/home/mobile-wifi/lte-modems/).。'

ha_release: 0.72
ha_category:
  - Binary sensor
  - Network
  - Notifications
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: netgear_lte
ha_platforms:
  - binary_sensor
  - notify
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: device
---
# NETGEAR LTE

The **NETGEAR LTE** integration for Home Assistant allows you to observe and control [NETGEAR LTE modems](https://www.netgear.com/home/mobile-wifi/lte-modems/).

Home Assistant 目前支持以下设备类型：

- 通知
- 传感器
- 二进制传感器

该集成支持通过 SMS 发送通知、报告传入的 SMS 事件以及报告多个传感器和二进制传感器中的调制解调器和连接状态。

:::note
Splitting of long SMS messages is not supported so notifications can contain a maximum of 70 characters. Simple messages using the reduced GSM-7 alphabet can contain up to 160 characters. Most emojis are not supported.

:::
## Configuration

To add the **NETGEAR LTE** device to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=netgear_lte)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=netgear_lte).
- From the list, select **NETGEAR LTE**.
- Follow the instructions on screen to complete the setup.

</details>

## Notification Actions

集成将创建与集成条目名称匹配的“通知”操作。这是默认设备的型号名称。

## Events

### Event `netgear_lte_sms`

到达调制解调器收件箱的消息将作为“netgear_lte_sms”类型的事件发送，并包含以下内容。

| Event data attribute | Description                              |
| -------------------- | ---------------------------------------- |
| `host`               | The modem that received the message.
| `sms_id`             | The inbox ID of the received message.
| `from`               | The sender of the message.
| `message`            | The SMS message content.

## Actions

### Action: Connect LTE

“netgear_lte.connect_lte”操作要求调制解调器建立其 LTE 连接，如果调制解调器不自动连接，则该操作很有用。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem that should connect (optional when just one modem is configured).

### Action: Disconnect LTE

“netgear_lte.disconnect_lte”操作要求调制解调器关闭其 LTE 连接。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem that should disconnect (optional when just one modem is configured).

### Action: Delete SMS

“netgear_lte.delete_sms”操作会从调制解调器收件箱中删除消息。这可用于在传入 SMS 事件后进行清理。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem that should have a message deleted (optional when just one modem is configured).
| `sms_id`               | no       | Integer or list of integers with inbox IDs of messages to delete.

### Action: Set option

`netgear_lte.set_option` 操作设置调制解调器配置选项（否则可在调制解调器 Web UI 中使用）。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem to set options on (optional when just one modem is configured).
| `autoconnect`          | yes      | Autoconnect value: `never`/`home`/`always`, with `home` meaning "not roaming".
| `failover`             | yes      | Failover mode: `wire` (wired connection only), `mobile` (mobile connection only), `auto` (wired connection with failover to mobile connection).

## Examples

以下自动化示例使用 [Conversation](/home-assistant/integrations/conversation/) 集成处理传入的 SMS 消息，然后从收件箱中删除该消息。


```yaml
automation:
  - alias: "SMS conversation"
    triggers:
      - trigger: event
        event_type: netgear_lte_sms
    actions:
      - action: conversation.process
        data:
          text: "{{ trigger.event.data.message }}"
      - action: netgear_lte.delete_sms
        data:
          host: "{{ trigger.event.data.host }}"
          sms_id: "{{ trigger.event.data.sms_id }}"
```


