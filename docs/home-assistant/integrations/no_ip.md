---
title: No-IP.com
description: 'With the No-IP.com integration you can keep your current IP address in sync with your NO-IP.com(https://www.noip.com) hostname or domain. 本页属于 Home。'

ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_domain: no_ip
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# No-IP.com

With the **No-IP.com** integration you can keep your current IP address in sync with your [NO-IP.com](https://www.noip.com)  hostname or domain.  

请注意，它不会确认您的主机名（免费域名定期需要确认）；您仍然需要手动执行此操作。

To use the integration in your installation, add the following to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes.

```yaml
# Example configuration.yaml entry
no_ip:
  domain: subdomain.domain.com
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

```yaml
  domain:
    description: Your fully qualified domain name (FQDN).
    required: true
    type: string
  username:
    description: The generated username for this DDNS record.
    required: true
    type: string
  password:
    description: The generated password for this DDNS record.
    required: true
    type: string
  timeout:
    description: Timeout (in seconds) for the API calls.
    required: false
    type: integer
    default: 10
```
