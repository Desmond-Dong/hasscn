---
title: Analytics
description: 'Home Assistant 允许用户通过分析集成分享其使用数据。汇总数据可在 <https://analytics.home-assistant.io 查看。这些数据用于影响 Home Assistant 的开发优先级，并说服制造商添加本地控制和注重隐私的功能。'
ha_category:
  - Other
ha_release: 2021.4
ha_iot_class: Cloud Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: analytics
ha_integration_type: system
---
# Analytics

Home Assistant 允许用户通过分析集成分享其使用数据。汇总数据可在 <https://analytics.home-assistant.io> 查看。这些数据用于影响 Home Assistant 的开发优先级，并说服制造商添加本地控制和注重隐私的功能。

## 数据收集

发送的信息取决于您选择启用的选项。您可以在引导过程中启用，也可以通过 **[设置 > 系统 > 分析](https://my.home-assistant.io/redirect/analytics/)** 启用。

[![Open **Settings** > **System** > **Analytics** in your Home Assistant instance.](https://my.home-assistant.io/badges/analytics.svg)](https://my.home-assistant.io/redirect/analytics/)

启用后，数据将在每次启动后 15 分钟发送，之后每 24 小时发送一次。发送的数据会打印到您的日志中。

### 基本分析

包括：

- 您系统的唯一标识符（确保每个安装只被计算一次）
- Home Assistant 版本
- Home Assistant 安装类型
- 您的国家代码（从您的 IP 地址在服务器端推断），例如：挪威为 `"NO"`。
  - 如果您住在美国，还将包括地区（州）代码，例如：如果您住在科罗拉多州，将使用 `"CO"`。

如果您的系统包含 Supervisor，还将包括：

- 您的安装是否受支持
- 您的安装是否健康
- 您安装的架构

如果您运行的是 Home Assistant Operating System，还将包括：

- 您使用的板卡类型
- 操作系统的版本

<details>
<summary>示例数据包</summary>


```json
{
  "uuid": "12a3456bc78d90123ef4567g789012h3",
  "version": "2026.3.0",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true,
    "arch": "amd64"
  },
  "operating_system": {
    "board": "odroid-n2",
    "version": "14.2"
  }
}
```


</details>

### 使用分析

_需要启用基本分析。_

包括：

- 所有核心集成的名称
- 如果有自定义集成，包括所有自定义集成的名称和版本
- [recorder 集成](/home-assistant/integrations/recorder) 中使用的引擎名称和版本
- 指示 [energy 集成](/home-assistant/integrations/energy) 已配置的布尔值
- 指示已配置 [HTTP 证书](https://www.home-assistant.io/integrations/http/#ssl_certificate) 的布尔值

如果您的系统包含 Supervisor，还将包括：

- 对于 Home Assistant 中的每个应用（以前称为插件）
  - 名称
  - 版本
  - 是否启用了保护模式
  - 是否启用了自动更新

<details>
<summary>示例数据包</summary>


```json
{
  "uuid": "12a3456bc78d90123ef4567g789012h3",
  "version": "2026.3.0",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true,
    "arch": "amd64"
  },
  "operating_system": {
    "board": "odroid-n2",
    "version": "14.2"
  },
  "integrations": ["awesome_integration"],
  "addons": [
      {
          "slug": "awesome_addon",
          "protected": true,
          "version": "1.0.0",
          "auto_update": false
      }
  ],
  "energy": {
    "configured": true
  },
  "recorder": {
    "engine": "sqlite",
    "version": "123"
  },
  "certificate": false
}
```


</details>

### 统计数据

_需要启用基本分析。_

包括：

- 集成数量
- 用户数量
- 实体数量
- 自动化数量

如果您的系统包含 Supervisor，还将包括：

- Home Assistant 中安装的应用数量

<details>
<summary>示例数据包</summary>


```json
{
  "uuid": "12a3456bc78d90123ef4567g789012h3",
  "version": "2026.3.0",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true,
    "arch": "amd64"
  },
  "operating_system": {
    "board": "odroid-n2",
    "version": "14.2"
  },
  "state_count": 1,
  "automation_count": 2,
  "integration_count": 3,
  "addon_count": 4,
  "user_count": 5
}
```


</details>

### 诊断

如果启用，当发生意外错误时将收集崩溃报告并上传到 [Sentry](https://sentry.io)。这些报告将帮助修复错误并提高性能和稳定性。

崩溃报告仅对 Home Assistant Core 开发人员可见。此功能目前仅限于 [Supervisor](/home-assistant/docs/glossary/#home-assistant-supervisor) 和 [OS-Agent](https://github.com/home-assistant/os-agent)。

## 数据存储与处理

所有数据由 Home Assistant Analytics Receiver 接收和处理（[源码](https://github.com/home-assistant/analytics.home-assistant.io)）。

当您的安装发送数据包时，该数据包包含一个唯一标识符。此标识符用于确保您的安装只被计算一次。

您的数据安全存储在 [Cloudflare 的键值存储](https://www.cloudflare.com/products/workers-kv/) 中。自上次更新以来，数据最多存储 60 天。只有汇总数据才会公开。

这是信息存储方式的示例：
```yaml
"uuid:12a3456bc78d90123ef4567g789012h3":
  description: "{'version': '2026.3.0', 'installation_type': 'Home Assistant OS', 'country': 'NO'}"
```
