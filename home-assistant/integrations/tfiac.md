# Tfiac

The **Tfiac** integration integrates several vendors air conditioning systems, that uses the Tfiac mobile app, into Home Assistant. App currently available at [Play Store](https://play.google.com/store/apps/details?id=com.tcl.export) and [App Store](https://apps.apple.com/app/id1059938398).

## Configuration

To add your Tfiac integration into your Home Assistant installation, add the following to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Full manual example configuration.yaml entry
climate:
  - platform: tfiac
    host: IP_ADDRESS
```

```yaml
host:
  description: The IP address of your AC device.
  required: true
  type: string
```
