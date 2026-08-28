# UniFi AP

This integration allows you to detect presence by looking at devices connected to a [UniFi AP](https://www.ui.com/products/#unifi). This device tracker differs from [Ubiquiti UniFi](/home-assistant/integrations/unifi.md) because it doesn't require the UniFi Network application.

To use this device tracker in your installation, add the following to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: unifi_direct
    host: YOUR_AP_IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

```yaml
host:
  description: The hostname or IP address of your UniFi AP.
  required: true
  type: string
username:
  description: The SSH device username used to connect to your UniFi AP.
  required: true
  type: string
password:
  description: The SSH device password used to connect to your UniFi AP.
  required: true
  type: string
```

See the [device tracker integration page](/home-assistant/integrations/device_tracker/index.md) for instructions how to configure the people to be tracked.
