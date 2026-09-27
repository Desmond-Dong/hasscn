# Sky Hub

The **Sky Hub** integration offers presence detection by looking at connected devices to a [Sky Hub router](https://www.sky.com/shop/broadband-talk/sky-hub/) based router.

To use your Sky Hub device in your installation, add the following to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: sky_hub
```

```yaml
host:
  description: The IP address of your router.
  required: false
  default: 192.168.1.254
  type: string
```

See the [device tracker integration page](/home-assistant/integrations/device_tracker/index.md) for instructions how to configure the people to be tracked.
