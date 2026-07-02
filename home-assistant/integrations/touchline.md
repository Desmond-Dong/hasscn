# Roth Touchline

The **Roth Touchline** integration lets you control [ROTH Touchline](https://www.roth-uk.com/en/roth-touchline.htm) floor heating thermostats from Roth.

To set it up, add the following information to your "`configuration.yaml`" file:

```yaml
climate:
  - platform: touchline
    host: YOUR_IPADDRESS
```

```yaml
host:
  description: The IP address of your controller, e.g., `http://192.168.1.1`.
  required: false
  type: string
```
