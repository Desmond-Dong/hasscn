---
title: Cloudflare
description: 自动更新您的 Cloudflare DNS 记录。
ha_category:
  - Network
ha_release: 0.74
ha_iot_class: Cloud Push
ha_codeowners:
  - '@ludeeus'
  - '@ctalkington'
ha_domain: cloudflare
ha_config_flow: true
ha_integration_type: service
---

通过 **Cloudflare** 集成，您可以让您的 Cloudflare DNS 记录保持最新。

集成每小时运行一次，但也可以通过运行 [`cloudflare.update_records` action](https://my.home-assistant.io/redirect/developer_services/?service=cloudflare.update_records) 来触发。

## 要求

设置需要创建一个 API 令牌，该令牌对您账户中的所有区域具有 `Zone:Zone:Read` 和 `Zone:DNS:Edit` 权限。

创建此令牌的简单方法是从"编辑区域 DNS"模板开始，然后将 `Zone:Zone:Read` 添加到权限中。

[Cloudflare API 令牌指南](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 附加信息

### 外部服务的使用

此集成使用 [home-assistant/services.home-assistant.io](https://github.com/home-assistant/services.home-assistant.io) 的 whoami 服务来设置公共 IP 地址。

### 限制

#### 不可用的顶级域名

由于 Cloudflare API 的限制，您不能将此集成与以下任何顶级域名一起使用：

- `.cf`
- `.ga`
- `.gq`
- `.ml`
- `.tk`

#### 记录类型

此集成只能更新 A 记录。

#### 区域

此集成只能有 1 个实例并管理 1 个区域/顶级域名。

#### 重新配置

必须删除并重新添加此集成才能更改区域和 A 记录选择。
集成配置完成后，您无法查看选择了哪些记录或查看 API 令牌。