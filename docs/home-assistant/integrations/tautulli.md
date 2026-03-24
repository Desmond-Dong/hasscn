---
title: Tautulli
description: 有关如何在 Home Assistant 中设置 Tautulli 传感器的说明。
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 0.82
ha_iot_class: Local Polling
ha_codeowners:
  - '@ludeeus'
  - '@tkdrob'
ha_domain: tautulli
ha_platforms:
  - sensor
ha_integration_type: hub
---

**Tautulli** 集成会监控指定 [Tautulli 服务器][tautulli] 上的活动。它会创建一个传感器，将当前活动串流数量显示为状态；点击该传感器查看更多详情时，还会显示更多统计信息。

## 设置

要找到您的 `api_key`，请打开 Tautulli Web 界面，依次进入 `Settings` 和 `Web interface`。`api_key` 位于该页面底部。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

默认提供以下统计信息：

- 局域网带宽
- 直接播放次数
- 直接串流次数
- 串流总数
- 最热门电影
- 最热门电视剧
- 最活跃用户
- 总带宽
- 转码次数
- 广域网带宽

[tautulli]: https://tautulli.com
