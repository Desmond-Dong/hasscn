---
title: P5 FutureNow
description: 关于如何在 Home Assistant 中将 P5 FutureNow 继电器/调光器单元设置为灯光的说明。
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.75
ha_domain: futurenow
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**P5 FutureNow** 集成允许您将 [P5](https://www.p5.hu/) FutureNow 继电器/调光器单元用作灯光。目前支持的单元：

- [FutureNow FNIP-6x2AD](https://www.p5.hu/index.php/products/ethernet-modules/265-fnip-6x2ad) 调光器单元（仅输出）
- [FutureNow FNIP-8x10A](https://www.p5.hu/index.php/products/ethernet-modules/263-fnip-8x10a) 继电器单元（仅输出）

### 配置示例

要使用您的 FutureNow 单元，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
light:
  - platform: futurenow
    driver: FNIP6x10ad
    host: 192.168.1.101
    port: 7078
    devices:
      5:
        name: Dimmer Channel 5
        dimmable: true
```

```yaml
driver:
  description: "设备类型。目前支持 `FNIP6x10ad` 或 `FNIP8x10a`。"
  required: true
  type: string
host:
  description: "您单元的 IP 地址或主机名，例如 `192.168.1.101`。"
  required: true
  type: string
port:
  description: "TCP 端口，在单元设置中配置。默认为 `7078`。"
  required: true
  type: string
devices:
  description: "要设置为灯光的输出通道列表。"
  required: true
  type: map
  keys:
    channel_number:
      description: "输出（灯光）属性。"
      required: true
      type: map
      keys:
        name:
          description: "灯光的名称。"
          required: true
          type: string
        dimmable:
          description: "设置为 `true` 以启用调光（仅限 FNIP6x10ad）。"
          required: false
          type: boolean
          default: false
```

### 扩展配置示例

以下示例 "`configuration.yaml`" 包含两个不同的 FutureNow 单元和多个通道：

```yaml
# 示例 configuration.yaml 条目
light:
  - platform: futurenow
    driver: FNIP6x10ad
    host: 192.168.1.101
    port: 7078
    devices:
      5:
        name: Dimmer Channel 5
      6:
        name: Dimmer Channel 6
        dimmable: true

  - platform: futurenow
    driver: FNIP8x10a
    host: 192.168.1.102
    port: 7078
    devices:
      1:
        name: Relay Channel 1
      2:
        name: Relay Channel 2
```