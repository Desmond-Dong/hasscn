---
title: Smappee
description: 'Smappee 集成允许您通过官方云 API(https://smappee.atlassian.net/wiki/spaces/DEVAPI/overview)或受限的本地方式，将 Smappee 监视器、Smappee Comfort Plug 和 Smappee Switch 接入 Home。'
ha_category:
  - Binary sensor
  - Energy
  - Hub
  - Sensor
  - Switch
ha_iot_class: Cloud Polling
ha_release: 0.64
ha_config_flow: true
ha_codeowners:
  - '@bsmappee'
ha_domain: smappee
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Smappee

**Smappee** 集成允许您通过[官方云 API](https://smappee.atlassian.net/wiki/spaces/DEVAPI/overview)或受限的本地方式，将 Smappee 监视器、Smappee Comfort Plug 和 Smappee Switch 接入 Home Assistant。

## Smappee 监视器

下表汇总了针对不同 Smappee 监视器类型，在 Home Assistant 中启动 Smappee 集成的可用方式。

| Monitor type          | Local discovery | Cloud API |
| --------------------- | --------------- | --------- |
| Smappee Energy        | Yes             | Yes       |
| Smappee Solar         | Yes             | Yes       |
| Smappee Plus          | Yes             | Yes       |
| Smappee Pro           | Yes             | Yes       |
| Smappee Genius        | Yes             | Yes       |
| Smappee Connect       | No              | Yes       |
| Smappee Wi-Fi Connect | No              | Yes       |
| Smappee P1/S1 module  | No              | Yes       |

## 本地发现

在大多数情况下，Home Assistant 会通过网络扫描自动发现 Smappee Energy、Solar、Plus、Pro 和 Genius 监视器。
这些自动发现的 Smappee 设备会列在集成页面中，并且无需额外信息即可完成配置。
不过，这种方式只会提供数量有限的实体。
如果您的家庭网络不支持 mDNS，您仍然可以通过选择 LOCAL 选项，并在配置流程中输入 Smappee 监视器的 IP 地址，来手动启动 Smappee 集成。

技术说明：Smappee 设备的自动发现要求其 mDNS 名称和密码保持为出厂默认值。通常可以在设备的专家 Web 门户中查看这些值（本地地址为 http://[IP-Address]/smappee.html）。如果您修改过 mDNS 名称，默认通常是 `Smappee[serialnumber]`。

### 传感器
系统会为当前有功功率使用量添加一个传感器实体。如果存在太阳能发电，也会添加一个有功发电功率实体。

Smappee Genius 设备还会提供当前无功功率、各相电压，以及每个已配置负载（子电表）的当前有功功率实体。

### 开关

系统会为每个 Smappee Switch 和 Smappee Comfort Plug 创建开关实体。


## Cloud API 配置

要使用 Smappee 云集成，您需要个人 `client_id` 和 `client_secret`，并将它们添加到 `configuration.yaml` 文件中。对于个人使用，API 访问是免费的，您可以通过联系 [support@smappee.com](mailto:support@smappee.com) 获取凭据。对于商业用途，API 访问需要定期付费，您可以通过联系 [info@smappee.com](mailto:info@smappee.com) 获取凭据。
有关 API 使用的任何信息，请参阅 [Smappee API 空间](https://smappee.atlassian.net/wiki/spaces/DEVAPI/overview)。

```yaml
# Example configuration.yaml entry
smappee:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

Home Assistant 重启后，请前往 **Settings** > **Devices & services** 并选择 Smappee 集成。系统会将您重定向到登录页面，您可以在那里选择希望在 Home Assistant 中使用的位置。

使用 Smappee 云集成后，您可以从本地网络之外访问您的 Smappee 监视器和其他共享设备。此外，还会提供多个（二进制）传感器实体。

### 传感器

系统会为当前有功功率使用量、
常开有功功率、今日总耗电量、
当前小时总耗电量、过去 5 分钟总耗电量
以及今日常开（待机）耗电量添加传感器实体。如果存在太阳能发电，也会添加有功发电功率、今日太阳能总发电量
以及当前小时太阳能发电量实体。

Smappee Pro、Plus、Genius 和 Connect 设备会为每个已配置负载（子电表）创建当前有功功率实体。

如果还安装了 Smappee 燃气和/或水表，也会提供一个显示今日消耗量的实体。

此外，Smappee、Genius 和 Connect 设备还会提供线电压和相电压（每一相）的实体。

### 开关

系统会为每个 Smappee Switch、Smappee Comfort Plug 和 Smappee Output 模块创建开关实体。

### 二进制传感器

对于每个发现的 NILM 电器，系统都会添加一个二进制传感器，用于显示该电器的当前状态。

```yaml
client_id:
  description: 您的 Smappee API 客户端 ID。
  required: true
  type: string
client_secret:
  description: 您的 Smappee API 客户端密钥。
  required: true
  type: string
```
