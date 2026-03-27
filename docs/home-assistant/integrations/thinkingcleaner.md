---
title: Thinking Cleaner
description: 'Home Assistant 目前支持以下设备类型：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.18
ha_domain: thinkingcleaner
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---
# Thinking Cleaner

Home Assistant 目前支持以下设备类型：

- [传感器](#sensor)
- [开关](#switch)

<a id="sensor"></a>
## 传感器

`thinkingcleaner` 传感器平台会显示您的 [Thinking Cleaner（网站存档）](https://web.archive.org/web/20220802042114/https://www.thinkingcleaner.com/) 附加组件的信息。

要在您的安装中启用此传感器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
sensor:
  - platform: thinkingcleaner
```

```yaml
host:
  description: Thinking Cleaner 设备的 IP 地址
  required: false
  type: string
```


这样会自动为您网络中的每个 Thinking Cleaner 添加传感器。

<a id="switch"></a>
## 开关

`thinkingcleaner` 开关平台可让您控制您的 [Thinking Cleaner（网站存档）](https://web.archive.org/web/20220802042114/https://www.thinkingcleaner.com/) 附加组件。

要在您的安装中启用此开关，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
switch:
  - platform: thinkingcleaner
```

```yaml
host:
  description: Thinking Cleaner 设备的 IP 地址
  required: false
  type: string
```


这样会自动为您网络中的每个 Thinking Cleaner 添加开关。

## 使用静态 IP 的 Roomba 配置示例

如果您的 `thinkingcleaner` 设备使用静态 IP 地址，您也可以通过 `host` 参数将其提供给传感器和开关。此项为可选配置，设置后将禁用自动发现。

```yaml
sensor:
  - platform: thinkingcleaner
    host: 10.0.0.55
switch:
  - platform: thinkingcleaner
    host: 10.0.0.55
```
