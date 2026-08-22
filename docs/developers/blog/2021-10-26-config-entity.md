---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "Device configuration URL 和 entity categories"
---

Home Assistant Core 2021.11 引入了两个新概念，使设备管理更加容易：
device configuration URL 和 entity categories。

### 设备配置 URL

现在可以提供一个 configuration_url 作为 device registry 信息的一部分。
configuration_url 在 device card 中使用，允许用户访问设备
以进行在 Home Assistant 中不可用的配置或诊断。
注意，链接到的 URL 不由 Home Assistant 代理，因此在远程连接到 Home Assistant 时通常无法使用。

[![显示访问设备的截图](/img/en/blog/2021-10-26-config-entity/configuration_url.png)](/img/en/blog/2021-10-26-config-entity/configuration_url.png)

### 实体类别

实体现在有一个可选属性 `entity_category`，用于分类非 primary
实体。对于允许更改设备配置的实体，设置为 `config`，
例如，一个可以开关设备背景照明的 switching entity。对于暴露设备的某些配置参数
或诊断信息但不允许更改它的实体，设置为 `diagnostic`，例如，显示
RSSI 或 MAC 地址（含允许值）的 sensor。

设置了 `entity_category` 的实体：

- 不包含在针对整个设备或 area 的 service call 中。
- 默认不暴露给 Google Assistant 或 Alexa。
- 显示在设备配置页面的独立 card 上。
- 不出现在自动生成的 Lovelace Dashboards 上。

[![显示 entity categories 分离的截图](/img/en/blog/2021-10-26-config-entity/entity_categories.png)](/img/en/blog/2021-10-26-config-entity/entity_categories.png)
