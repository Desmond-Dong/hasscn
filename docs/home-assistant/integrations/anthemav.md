---
title: Anthem A/V Receivers
description: 'Anthem 当前和上一代 <abbr title="Audio & video"A/V</abbr 接收器和处理器都支持基于 IP 的网络控制。此 Home Assistant 集成为您网络上的任何这些接收器添加了适当的"本地推送"支持。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: 0.37
ha_domain: anthemav
ha_codeowners:
  - '@hyralex'
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: device
---
# Anthem A/V Receivers

[Anthem] 当前和上一代 <abbr title="Audio & video">A/V</abbr> 接收器和处理器都支持基于 IP 的网络控制。此 Home Assistant 集成为您网络上的任何这些接收器添加了适当的"本地推送"支持。

## 支持的型号

### A/V 接收器

- [MRX 540](https://www.anthemav.com/products-current/type=av-receiver/model=mrx-540/page=overview), [MRX 740](https://www.anthemav.com/products-current/type=av-receiver/model=mrx-740/page=overview), [MRX 1140](https://www.anthemav.com/products-current/type=av-receiver/model=mrx-1140/page=overview)
- [MRX 520](https://www.anthemav.com/products-current/series=mrx-series-gen3/model=mrx-520/page=overview), [MRX 720](https://www.anthemav.com/products-current/collection=performance/model=mrx-720/page=overview), [MRX 1120](https://www.anthemav.com/products-current/collection=performance/model=mrx-1120/page=overview)
- [MRX 310](https://www.anthemav.com/products-archived/type=av-receiver/model=mrx-310/page=overview), [MRX 510](https://www.anthemav.com/products-archived/series=mrx-series/model=mrx-510/page=overview), [MRX 710](https://www.anthemav.com/products-archived/type=av-receiver/model=mrx-710/page=overview)

### A/V 处理器

- [AVM 60](https://www.anthemav.com/products-current/model=avm-60/page=overview), [AVM 70](https://www.anthemav.com/products-current/model=avm-70/page=overview)

### 分布式解决方案

- [MDX 8](https://www.anthemav.com/products-current/type=distribution/model=mdx-8/page=overview), [MDX 16](https://www.anthemav.com/products-current/type=distribution/model=mdx-16/page=overview)
- Martin Logan [MDA 8](https://www.martinlogan.com/en/product/mda8), [MDA 16](https://www.martinlogan.com/en/product/mda16)

如果您的型号不在列表中，请进行测试。如果一切正常，请通过选择上方的 **在 GitHub 上编辑此页面** 链接将其添加到列表中。

支持通过 Python [anthemav] 模块提供。较旧的基于 RS-232 串口的设备（如 [D2v 系列](https://www.anthemav.com/products-archived/model=d2v/page=overview)）使用完全不同的协议，目前不受支持。

[Anthem]: https://www.anthemav.com/
[anthemav]: https://github.com/nugget/python-anthemav


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
host:
  description: 设备的主机名或 IP 地址。
port:
  description: 设备的端口号。
```

## 注意事项和限制

- 调谐器目前不受支持，`media_player` 的播放、暂停、上一首和下一首控制也不受支持。
- 启用此平台将在您的 Anthem 设备中设置并强制执行 **Standby IP Control On**。您几乎肯定需要这个。如果您在设备上禁用它，它只会被 Home Assistant 重新启用。

:::warning
集成将保持与网络控制端口的持久连接，这将阻止任何其他应用程序与接收器通信。这包括 Anthem iOS 和 Android 遥控应用程序以及 ARC-2 Anthem 房间校准软件。如果您想使用另一个使用网络控制端口的应用程序，请禁用此集成并重新启动 Home Assistant。
<br /><br />
*底层 Python 模块具有暂停和恢复网络连接的钩子，但这些功能目前不受 Home Assistant 平台支持。*


:::
