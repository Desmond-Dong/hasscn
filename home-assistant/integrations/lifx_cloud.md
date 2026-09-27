# LIFX Cloud

The **LIFX Cloud** integration allows you to activate the scenes that LIFX smartphone apps store in the LIFX cloud.

To enable the LIFX Cloud integration, add it to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
scene:
  - platform: lifx_cloud
    token: YOUR_LIFX_TOKEN
```

You can then activate each scene with its name from the smartphone app:

```yaml
  - action: scene.turn_on
    target:
      entity_id: scene.goodnight
```

```yaml
token:
  description: The API token for your LIFX Cloud account.
  required: true
  type: string
timeout:
  description: Network timeout in seconds.
  required: false
  default: 10
  type: integer
```

### Getting an API token

You create your API token on the LIFX website:

1. Sign in to the [LIFX Cloud](https://cloud.lifx.com/)
2. Click on your email address and select *Personal Access Tokens*
3. Now click *Generate New Token*
4. Enter a meaningful label, such as 'Home Assistant'
5. Click *Generate*
6. Copy the token that now appears
7. Paste the token into the Home Assistant configuration file
