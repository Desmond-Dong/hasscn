# SCSGate

The **SCSGate** integration support the [SCSGate](https://translate.google.com/translate?hl=en\&sl=it\&tl=en\&u=http%3A%2F%2Fguidopic.altervista.org%2Feibscsgt%2Finterface.html) device. This a home-brew device allows to interact with the MyHome system from BTicino/Legrande.

There is currently support for the following device types within Home Assistant:

* [Cover](/home-assistant/integrations/scsgate/index.md#cover)
* [Light](/home-assistant/integrations/scsgate/index.md#light)
* [Switch](/home-assistant/integrations/scsgate/index.md#switch)

To enable SCSGate in your installation, add the following to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
scsgate:
  device: PATH_TO_DEVICE
```

```yaml
device:
  description: The path to your device, e.g., `/dev/ttyACM0`.
  required: true
  type: string
```

### How to find the scs\_id for your devices

The SCSGate integration relies on the [scsgate](https://github.com/flavio/scsgate) Python module.

This module provides also a command line tool called `scs-monitor`. This program can be used to find the IDs of your lights, switches and roller shutters and produce the YAML snippet to insert into your "`configuration.yaml`" file.

For more information checkout [this](https://scsgate.readthedocs.org/en/latest/?badge=latest#creation-of-a-home-assistant-configuration-file) section of `scsgate`'s documentation.

### Cover

The SCSGate devices can control motorized covers connected to the BTicino MyHome system.

To enable SCSGate covers in your installation, add the following to your "`configuration.yaml`" file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: scsgate
    devices:
      living_room:
        name: Living Room
        scs_id: XXXXX
```

```yaml
devices:
  description: A list of devices.
  required: true
  type: list
  keys:
    slug:
      description: Slug of the device.
      required: true
      type: list
      keys:
        name:
          description: Name to use in the frontend.
          required: true
          type: string
        scs_id:
          description: The ID of your SCSGate device.
          required: true
          type: string
```

:::note
**Known limitation:** It is not possible to know the current state of the cover.

:::

### Light

The SCSGate device can control lights of the BTicino MyHome system.

To enable SCSGate lights in your installation, add the following to your "`configuration.yaml`" file:

```yaml
# Example configuration.yaml entry
light:
  - platform: scsgate
    devices:
      living_room:
        name: Living Room
        scs_id: XXXXX
```

```yaml
devices:
  description: A list of devices with their name to use in the frontend.
  required: true
  type: list
```

### Switch

The SCSGate device can control switches of the BTicino MyHome system.

To enable SCSGate switches in your installation, add the following to your "`configuration.yaml`" file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: scsgate
    devices:
      living_room:
        scs_id: XXXXX
```

```yaml
devices:
  description: A list of devices with their name to use in the frontend.
  required: true
  type: list
```
