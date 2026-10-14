# LG Netcast

The **LG Netcast** integration allows you to control a LG Smart TV running NetCast 3.0 (LG Smart TV models released in 2012) and NetCast 4.0 (LG Smart TV models released in 2013). For the new LG WebOS TV's use the [webostv](/home-assistant/integrations/webostv.md#media-player) platform.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Turn on action

Home Assistant can turn on an LG Netcast TV if you specify an action provided by an integration like [HDMI-CEC](/home-assistant/integrations/hdmi_cec/index.md) or [WakeOnLan](/home-assistant/integrations/wake_on_lan/index.md).

1. To create an automation, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and open the device page.
2. Under **Automations**, select the + icon to create an automation with that device.
3. In the dialog, select the **Device is requested to turn on** automation.

Automations can also be created using an automation action:

The example below shows how you can use the `turn_on_action` with the [`wake_on_lan` integration](/home-assistant/integrations/wake_on_lan/index.md).

```yaml
# Example configuration.yaml entry
wake_on_lan: # enables `wake_on_lan` integration

# Enables the `lg_netcast` media player
automation:
  - alias: "Turn On Living Room TV with WakeOnLan"
    triggers:
      - trigger: lg_netcast.turn_on
        entity_id: media_player.lg_netcast_smart_tv
    actions:
      - action: wake_on_lan.send_magic_packet
        data:
          mac: AA-BB-CC-DD-EE-FF
          broadcast_address: 11.22.33.44
```

Any other [actions](/home-assistant/docs/automation/action/index.md) to power on the device can be configured.

## Change channel through play\_media action

The `play_media` action can be used in a script to switch to the specified TV channel. It selects the major channel number according to the `media_content_id` parameter:

```yaml
# Example action entry in script to switch to channel number 15
action: media_player.play_media
target:
  entity_id: media_player.lg_tv
data:
  media_content_id: 15
  media_content_type: channel
```
