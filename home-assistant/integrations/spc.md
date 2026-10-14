# Vanderbilt SPC

Home Assistant has support to integrate your [Vanderbilt SPC](https://www.spcsupportinfo.com/SPCConnectPro/) alarm panel and any connected motion, door, smoke and technical sensors.

Integration with SPC is done through a third-party API gateway called [SPC Web Gateway](https://www.lundix.se/smarta-losningar/) which must be installed and configured somewhere on your network.

There is currently support for the following device types within Home Assistant:

* [Alarm](#alarm)
* [Binary sensor](#binary-sensor)

Home Assistant needs to know where to find the SPC Web Gateway API endpoints, to configure this add the following section to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
spc:
  api_url: API_URL
  ws_url: WS_URL
```

```yaml
api_url:
  description: URL of the SPC Web Gateway command REST API, e.g., `http://<ip>:8088`.
  required: true
  type: string
ws_url:
  description: URL of the SPC Web Gateway WebSocket, e.g., `ws://<ip>:8088/ws/spc`.
  required: true
  type: string
```

## Alarm

The `spc` alarm control panel platform allows you to control your [Vanderbilt SPC](https://www.spcsupportinfo.com/SPCConnectPro/) alarms.

The `changed_by` attribute enables one to be able to take different actions depending on who armed/disarmed the alarm in [automation](/home-assistant/getting-started/automation/index.md).

```yaml
automation:
  - alias: "Alarm status changed"
    triggers:
      - trigger: state
        entity_id: alarm_control_panel.alarm_1
    actions:
      - action: notify.notify
        data:
          message: >
            Alarm changed from {{ trigger.from_state.state }}
            to {{ trigger.to_state.state }}
            by {{ trigger.to_state.attributes.changed_by }}
```

## Binary sensor

The `spc` platform allows you to get data from your [Vanderbilt SPC](https://www.spcsupportinfo.com/SPCConnectPro/) binary sensors from within Home Assistant.

Check the [type/class](/home-assistant/integrations/binary_sensor/index.md) list for a possible visualization of your zone. Currently motion, smoke, door and technical sensors are supported.

Hint: In SPC, Technical zones can be used to track (for example) the status of an output. Virtual zones are supported in SPC firmware from 3.11. You can set up a virtual zone as technical, and link it to a mapping key that is controlling an output.
