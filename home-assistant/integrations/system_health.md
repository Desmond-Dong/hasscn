# System Health

The **System Health** integration provides an API to offer information on the system and its components. It also allows to run diagnostic tools to diagnose problems.

System Health integration data can be viewed at [**Settings** > **System** > **Repairs**](https://my.home-assistant.io/redirect/repairs/) > **System information** in the three dots menu (top right).

[![Open Settings > System > Repairs > System information in your Home Assistant instance.](https://my.home-assistant.io/badges/system_health.svg)](https://my.home-assistant.io/redirect/system_health/)

Data includes information about your system architecture, operating system and version, Home Assistant installation type and version, Python version, frontend version, the number of [Dashboards](/home-assistant/dashboards/dashboards/) and [Views](/home-assistant/dashboards/views/) you have, and more.

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/home-assistant/integrations/default_config/index.md) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
system_health:
```
