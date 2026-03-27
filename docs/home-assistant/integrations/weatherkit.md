---
title: Apple WeatherKit
description: 'Apple WeatherKit 集成可从 Apple Weather 获取当前天气和天气预报（按小时和按天）。由于 Apple 收购了 Dark Sky 并将其技术整合进自己的天气服务，因此它是 Dark Sky API 最直接的替代方案。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Weather
ha_release: '2023.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@tjhorner'
ha_domain: weatherkit
ha_integration_type: service
ha_platforms:
  - sensor
  - weather
---
# Apple WeatherKit

**Apple WeatherKit** 集成可从 Apple Weather 获取当前天气和天气预报（按小时和按天）。由于 Apple 收购了 Dark Sky 并将其技术整合进自己的天气服务，因此它是 Dark Sky API 最直接的替代方案。

Home Assistant 目前支持以下设备类型：

- Weather
- Sensor

## 要求

要使用此集成，您需要一个[付费的 Apple Developer Program 账户](https://developer.apple.com/support/compare-memberships/)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 凭据

您需要获取用于连接 Apple WeatherKit 的相应凭据。为此，需要在 Apple Developer 账户中注册以下内容：

1. 前往 Apple Developer 账户中的 [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/certificates/list)。
2. 在 [Keys](https://developer.apple.com/account/resources/authkeys/list) 部分中添加一个新密钥。
    1. 名称可自行填写。
    2. 从列表中选择 `WeatherKit`。
    3. 下载提供的 `.p8` 文件。这就是您的 **Private Key**。
    4. 记下 **Key ID**，后面会用到。
3. 在 [Identifiers](https://developer.apple.com/account/resources/identifiers/list) 部分中添加一个新标识符。
    1. 在右上角下拉菜单中选择 `Services IDs`。
    2. 描述可自行填写。
    3. 对于标识符，Apple 建议使用反向 DNS 风格的名称，例如 `com.example.homeassistant`。
    4. 保存您使用的标识符。这就是您的 **Service ID**。

现在您已经准备好所有凭据，可以添加新的 WeatherKit 集成条目。根据前面的信息，内容大致如下：

- **Key ID**: `ABC123DEFG`
- **Service ID**: `com.example.homeassistant`
- **Apple team ID**: `ABC123DEFG`
  - 该值可在 Apple Developer 网站右上角找到。
- **Private key**: `-----BEGIN PRIVATE KEY----- [...]`
  - 用文本编辑器打开之前下载的 `.p8` 文件，并将其_完整内容_复制到此字段中，包括头部和尾部。

### 故障排除

如果您在设置集成时遇到问题，请确认以下内容：

- 您输入的密钥与 `.p8` 文件中的内容完全一致，包括头部和尾部。
- 其他配置值前后都没有多余空格。
