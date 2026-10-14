# Telnet

The **Telnet** integration allows you to control devices with telnet commands.

To enable this integration, add the following lines to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
switch:
  - platform: telnet
    switches:
      projector:
        resource: THE_IP_ADDRESS
        port: 4002
        command_on: "PWR ON"
        command_off: "PWR OFF"
        command_state: "PWR?"
        value_template: '{{ value == "PWR=01" }}'
        timeout: 0.9
```

```yaml
switches:
  description: The array that contains all switches.
  required: true
  type: list
  keys:
    identifier:
      description: Name of the switch as slug. Multiple entries are possible.
      required: true
      type: list
      keys:
        resource:
          description: Host name or IP address of the device.
          required: true
          type: string
        port:
          description: Port to connect to.
          required: false
          default: 23
          type: integer
        command_on:
          description: Command to turn device on.
          required: true
          type: string
        command_off:
          description: Command to turn device off.
          required: true
          type: string
        command_state:
          description: Command to determine the state of the switch. If not defined the switch will assume successful state changes.
          required: false
          type: string
        value_template:
          description: The template evaluating to `true` will indicate that the switch is on.
          required: false
          type: template
        name:
          description: The name used to display the switch in the frontend.
          required: false
          type: string
        timeout:
          description: How long to wait for a reply after a telnet command is sent. 
          required: false
          default: 0.2
          type: float
```
