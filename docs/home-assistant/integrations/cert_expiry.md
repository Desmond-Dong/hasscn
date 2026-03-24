---
title: Certificate Expiry
description: 关于如何在 Home Assistant 中设置 HTTPS (SSL) 证书过期传感器的说明。
ha_category:
  - Network
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jjlawren'
ha_domain: cert_expiry
ha_platforms:
  - sensor
ha_integration_type: service
---

**Certificate Expiry** 集成从配置的主机获取证书，并在时间戳传感器中显示其过期时间。
传感器每 12 小时检查并更新配置主机的证书信息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 属性

Certificate Expiry 实体提供额外的属性来表示证书的状态。

| 名称 | 描述 |
| ---- | ----------- |
| `is_valid` | 证书是否能够验证：`True` / `False`。
| `error` | 如果证书被认为无效，则为人类可读的错误描述，否则为"None"。
