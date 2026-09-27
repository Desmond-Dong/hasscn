三年前，Paul Ganssle 写了一篇[对比文章](https://blog.ganssle.io/articles/2018/03/pytz-fastest-footgun.html)，比较了 `pytz` 和 `python-dateutil` 之间的时区处理方式。在这篇文章中，他展示了 `pytz` 很容易以几乎正确但难以发现错误的方式来使用：

```python
import pytz
from datetime import datetime, timedelta

NYC = pytz.timezone('America/New_York')
dt = datetime(2018, 2, 14, 12, tzinfo=NYC)
print(dt)
# 2018-02-14 12:00:00-04:56
```

*[(链接到文章解释为什么是 -4:56 的部分)](https://blog.ganssle.io/articles/2018/03/pytz-fastest-footgun.html#pytz-s-time-zone-model)*

在 Home Assistant 2021.6 中，我们将切换到 `python-dateutil`。如果你的 custom integration 依赖于非官方接口 `my_time_zone.localize(my_dt)`，你需要进行升级。请改用 Python 的官方方法 `my_dt.astimezone(my_time_zone)`。

属性 `hass.config.time_zone` 也将变为字符串，而不是时区对象。

感谢 [@bdraco] 帮助重启这项努力并推动此变更[完成](https://github.com/home-assistant/core/pull/49643)。我们实际上在迁移过程中发现了一些 bugs！也感谢 Paul Ganssle 维护 `python-dateutil` 以及出色的文章。

[@bdraco]: https://github.com/bdraco

## 5 月 10 日更新

哇，时间过得真快！Paul，`python-dateutil` 的作者，也是启发我们的博文作者，提醒我们 Python 3.9 包含了升级后的时区处理，我们应该改用它。在 Nick 和 Paul 的帮助下，`python-dateutil` 已被移除，改为使用 `zoneinfo`（[PR](https://github.com/home-assistant/core/pull/50387)）。
