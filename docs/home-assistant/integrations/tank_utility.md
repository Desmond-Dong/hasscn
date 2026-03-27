---
title: Tank Utility
description: 'Add Tank Utility(https://www.tankutility.com/) propane tank monitors to Home Assistant. 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.53
ha_domain: tank_utility
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Tank Utility

Add [Tank Utility](https://www.tankutility.com/) propane tank monitors to Home Assistant.

## Setup

### Authentication

Authentication for the Tank Utility API is performed with the same email and password credentials used at [https://app.tankutility.com](https://app.tankutility.com).

### Devices

Each item in the list of devices is a 24 character string. These values can be found by clicking on the **Usage Reports** link at the bottom of the graph on the [Tank Utility devices page](https://app.tankutility.com/#/devices).

The device item value is the last segment of the URL path, e.g., the URL
[https://app.tankutility.com/#/reports/000000000000000000000000](https://app.tankutility.com/#/reports/000000000000000000000000) would indicate `000000000000000000000000` as a device value.

### Using TankUtility API to Obtain Device ID

1. Obtain your personal token:

   ```bash
   curl --user <my_username>:<my_password> https://data.tankutility.com/api/getToken
   ```

   The JSON response structure should resemble:
   
   ```json
   {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MzgyMjQwODE0NjIsInYiOjAsImQiOnsidWleejoic2ltcGxlbG9naW46MzM1In0sImlhdCI6wwDIyMzk5NX0.kbYzxRtbGB2ke3IBgQTVMNQprHOWJZFgQQnPK6Wyas4"}
   ```

2. Receive the list of devices you have in your account:

   ```bash
   curl https://data.tankutility.com/api/devices?token=<my_personal_token>
   ```

   The JSON response structure should resemble:

   ```json
   {"devices":["54df6a066667531535371367","54ff69057492666782350667"]}
   ```

## Configuration

To enable the integration, add the following lines to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tank_utility
    email: YOUR_EMAIL_ADDRESS
    password: YOUR_PASSWORD
    devices:
      - "000000000000000000000000"
```

```yaml
email:
  description: "Your [https://app.tankutility.com](https://app.tankutility.com) email address."
  required: true
  type: string
password:
  description: "Your [https://app.tankutility.com](https://app.tankutility.com) password."
  required: true
  type: string
devices:
  description: All devices to monitor.
  required: true
  type: map
```
