# UTC 与时区感知

我最近合并了一次重构，将 Home Assistant 内部时间全面改为仅使用 UTC。这是一次非常必要的调整。我还为时间敏感部分补充了更多测试覆盖，以确保稳定性。这些代码已经在 dev 分支运行了 9 天，很快就会发布到 master 分支。

从现在开始，所有内部通信都将使用 UTC：比如时间变化事件、状态的 datetime 属性等。要获取当前 UTC 时间，你可以调用 `homeassistant.util.dt.utcnow()`。它会返回一个带时区信息的 UTC datetime 对象。[`homeassistant.util.dt`](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/util/dt.py) 是一个新的日期工具包。

当然也有“本地时间”。本地时间基于你在 `configuration.yaml` 中设置的时区。本地时间只应用于面向用户的信息，比如日志、前端界面，以及 `configuration.yaml` 里的自动化设置。

### 设置时区

时区需要在 `configuration.yaml` 中设置。如果你没有配置时区，系统会使用现有的检测代码通过 [freegeoip.net](https://freegeoip.net) 自动探测。你可以在 [Wikipedia](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 上查看兼容的时区列表。

```yaml
homeassistant:
  time_zone: America/Los_Angeles
```

### 兼容性

这次代码变更在大多数情况下向后兼容。旧方法 `hass.track_time_change` 和 `hass.track_point_in_time` 现在内部会调用两个新方法：`hass.track_utc_time_change` 和 `hass.track_point_in_utc_time`。旧方法的使用方式没有变化，按理应保持向后兼容。

这次重构还新增了一次数据库迁移，为事件和状态表添加了 `utc_offset` 列。该信息目前还未使用，但未来分析历史数据时可能会很有帮助。

### 向后不兼容的内容

所有内置组件都已升级。下面这份列表仅适用于运行自定义组件的用户：

* `hass.track_time_change` 和 `hass.track_point_in_time` 现在会返回带时区信息的 datetime 对象。Python 不允许比较 naive datetime 和 aware datetime。
* 日出和日落相关的 sun 属性现在都是 UTC。`sun.next_rising(hass)` 和 `sun.next_setting(hass)` 方法保持向后兼容，但如果你以前直接读取原始属性，需要注意。
* API 现在会以 UTC 发送所有时间。如果你使用前端以外的方式与 Home Assistant 通信，请确认它能正确处理这一变化。
