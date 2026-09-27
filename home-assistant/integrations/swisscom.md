# Swisscom Internet-Box

The **Swisscom Internet-Box** integration offers presence detection by looking at connected devices to an [Internet-Box](https://www.swisscom.ch/en/residential/help/device/internet-router.html) router from [Swisscom](https://www.swisscom.ch) which is an Internet provider in Switzerland.

:::note
There are three models of Internet-Box (light, standard and plus). The platform has only been tested on the Internet-Box plus but the others should work as well because they have the same web interface.

:::
To use an Internet-Box router in your installation, add the following to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: swisscom
```

```yaml
host:
  description: The IP address of your router.
  required: false
  default: 192.168.1.1
  type: string
```

See the [device tracker integration page](/home-assistant/integrations/device_tracker/index.md) for instructions how to configure the people to be tracked.
