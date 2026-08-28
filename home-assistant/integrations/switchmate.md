# Switchmate SimplySmart Home

The **Switchmate SimplySmart Home** integration allows you to control Switchmate [devices](https://www.mysimplysmarthome.com/products/switchmate-switches/).

## Configuration

To enable it, add the following lines to your "`configuration.yaml`":

```yaml
switch:
  - platform: switchmate
    mac: "cb:25:0b......"
```

```yaml
mac:
  description: Device MAC address.
  required: true
  type: string
name:
  description: The name used to display the switch in the frontend.
  required: false
  type: string
flip_on_off:
  description: Option to flip the on/off state.
  required: false
  type: boolean
  default: false
```

The integration is tested with SwitchMate Lighting Control Rocker and SwitchMate Lighting Control Toggle.
