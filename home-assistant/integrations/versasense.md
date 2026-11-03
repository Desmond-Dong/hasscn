# VersaSense

The **VersaSense** integration supports the VersaSense Edge Gateway. The gateway is able to control hubs and their peripherals (sensors and actuators) in the mesh network.

## Configuration

To enable VersaSense in your installation, add it to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
versasense:
  host: GATEWAY_URI
```

```yaml
host:
  description: "The IP address or hostname of the VersaSense gateway. Including *protocol* and *port*, e.g., `https://gateway.versasense.com:8889`"
  required: true
  type: string
```

## Supported hardware

All VersaSense gateways with software version >= 1.0.2.10

The integration is tested with following peripherals and devices:

* S03 S04: Temperature and Humidity sensor
* S06: Barometric Pressure sensor
* S10: Light sensor
* S17: Object detection sensor
* S19: Buzzer actuator
* Pxx: SmartMesh IP Hub
* M01: SmartMesh Edge Gateway
