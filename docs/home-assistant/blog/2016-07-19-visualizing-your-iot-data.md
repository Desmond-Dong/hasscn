---
title: 可视化你的 IoT 数据
description: '<img src=''/home-assistant/images/blog/2016-07-reporting/mpl-sensor.png'' style=''clear: right; border:none; box-shadow: none; float: right; margin-bottom:。'
---
# 可视化你的 IoT 数据

<img src='/home-assistant/images/blog/2016-07-reporting/mpl-sensor.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />

[history 组件](/home-assistant/integrations/history/) 会跟踪 Home Assistant 中发生的一切。这意味着，你可以访问家中所有已存储的信息。我们的历史记录功能并不是一个完整的图形处理和可视化组件，不像你在系统监控或网络监控工具中看到的那些那样全面。目前的限制是，你只能选择一天来查看信息的可视化结果，而不能选择一个时间段。另外，也无法深入查看某个特定实体。

这篇博客文章将向你展示几种导出数据的方法，用于报表、可视化，或者对自动化规则进行进一步分析。

<!--more-->

在这篇博客文章中，我会以我住处附近 [Aare 河](https://en.wikipedia.org/wiki/Aare) 的温度为例。这些温度数据由 [Swiss Hydrological Data 传感器](/home-assistant/integrations/swiss_hydrological_data) 记录，传感器的名称是 `sensor.aare`。

数据库以 [SQLite 数据库](https://www.sqlite.org/index.html) 的形式存储在 `<path to config dir>/.homeassistant/home-assistant_v2.db`。在下面所有示例中，我们都会使用这个路径：`/home/ha/.homeassistant/home-assistant_v2.db`

如果你只是想看看数据库里存了什么，可以使用 `sqlite3` 命令行工具，或者像 [DB Browser for SQLite](https://sqlitebrowser.org/) 这样的图形化工具。

用于保存状态的表名为 `states`。`events` 表则负责存储发生过的事件。因此，我们先来检查一下 `states` 表中有多少条记录。`sqlite3` 需要知道数据库文件所在的位置。要操作你的数据库，请确保 Home Assistant 没有在运行，或者先复制一份现有数据库。建议使用副本进行操作。

```bash
$ sqlite3 /home/ha/.homeassistant/home-assistant_v2.db
SQLite version 3.11.0 2016-02-15 17:29:24
sqlite> SELECT count(*) FROM states;
24659
```

我们来看一个 [SQL](https://en.wikipedia.org/wiki/SQL) 查询示例。这个查询会显示传感器 `sensor.aare` 在某一时间段内的所有状态。

```sql
SELECT state, last_changed FROM states
  WHERE
    entity_id = 'sensor.aare'
  AND
     last_changed BETWEEN
    '2016-07-05 00:00:00.000000' AND '2016-07-07 00:00:00.000000';
```

你可以按照自己的需要来编写 SQL 语句。这意味着，你可以用任何想要的方式处理这些数据，以便进一步使用。很多时候，去除某些条目，比如 `Unknown` 或异常峰值，会更有意义。

如果你在 DB Browser for SQLite 中执行上面的查询，就可以把这个传感器的图表保存为 png。

<p class='img'>
  <img src='/home-assistant/images/blog/2016-07-reporting/db-browser.png' />
  使用 DB Browser for SQLite 进行可视化
</p>

你可能会问：为什么不直接用 LibreOffice Calc 或其他电子表格应用来做？由于大多数电子表格应用无法直接处理 SQLite 数据库，我们接下来会把数据从数据库导出为 [CSV](https://en.wikipedia.org/wiki/Comma-separated_values)。

```bash
sqlite3 -header -csv /home/ha/.homeassistant/home-assistant_v2.db "SELECT last_changed, state FROM states WHERE entity_id = 'sensor.aare' AND last_changed BETWEEN '2016-07-05 00:00:00.000000' AND '2016-07-07 00:00:00.000000';" > sensor.csv
```

为了让时间戳排在前面、状态排在后面，我们调整了 `SELECT` 的字段顺序。现在，我们就可以把 CSV 文件导入你选择的应用中，这里使用的是 LibreOffice Calc。

<p class='img'>
  <img src='/home-assistant/images/blog/2016-07-reporting/libreoffice-import.png' />
  导入 CSV 文件
</p>

导入之后，就可以基于现有数据创建图表了。

<p class='img'>
  <img src='/home-assistant/images/blog/2016-07-reporting/libreoffice-graph.png' />
  LibreOffice 中的图表
</p>

你也可以使用 [matplotlib](https://matplotlib.org/) 来生成图表，作为电子表格应用的替代方案。这是一个功能强大的 Python 2D 绘图库。借助 Python 内置的 SQLite 支持，只需要几行代码就能把你的数据可视化。

```python
import sqlite3
from matplotlib import dates
import matplotlib.pyplot as plt

import homeassistant.util.dt as dt

values = []
timestamps = []

conn = sqlite3.connect('/home/ha/.homeassistant/home-assistant_v2.db')
data = conn.execute("SELECT state, last_changed FROM states WHERE "
                    "entity_id = 'sensor.aare' AND last_changed BETWEEN "
                    "'2016-07-05 00:00:00.000000' AND "
                    "'2016-07-07 00:00:00.000000'")

for x in data:
    timestamps.append(dates.date2num(dt.parse_datetime(x[1])))
    values.append(float(x[0]))

plt.plot_date(x=timestamps, y=values, fmt="r-")
plt.ylabel('Temperature')
plt.xlabel('Time line')

plt.savefig('sensor.png')
```

创建数据库连接并执行查询，与前面展示的方法类似。查询返回的值会被拆分到两个列表中。时间戳必须转换成 matplotlib 可接受的数值格式，然后就可以生成图表并保存为图像。

<p class='img'>
  <img src='/home-assistant/images/blog/2016-07-reporting/mpl-sensor.png' />
  使用 matplotlib 生成的传感器图表
</p>

大多数图表看起来都挺朴素的，所以你可能还需要进一步美化。如果你已经做出了包含出色图表的漂亮报表，Home Assistant 社区会非常感谢你在我们的[论坛](https://community.home-assistant.io/)中分享。
