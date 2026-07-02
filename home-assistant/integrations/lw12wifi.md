# LAGUTE LW-12

The **LAGUTE LW-12** integration supports Lagute LW-12 Wifi LED controller.

## Configuration

To enable these lights, add the following lines to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
light:
  - platform: lw12wifi
    host: IP_ADDRESS_CONTROLLER
```

```yaml
host:
  description: Host name or IP of LW-12 LED stripe to control.
  required: true
  type: string
port:
  description: Some firmware versions of the LW-12 controller listen on different ports.
  required: false
  type: integer
  default: 5000
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: LW-12 FC
```
