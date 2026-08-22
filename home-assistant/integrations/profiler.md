# Profiler

**Profiler** 集成提供性能分析功能。它会生成一组统计信息，用于识别 Home Assistant 各部分耗时，可帮助你定位性能问题，或了解某个集成行为异常的原因。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 动作：Start

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.start)

`profiler.start` 动作会启动性能分析，并持续指定秒数。

| Data attribute | Optional | Description                                                |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `seconds`              | yes      | 分析持续秒数，默认 `60.0`                                  |

分析完成后，Profiler 会在你的配置目录生成一个 Python `cprof` 文件和一个 `callgrind.out` 文件。文件的完整路径会通过持久通知显示，便于你定位并复制到桌面。

`cprof` 文件可用以下工具查看：

* [SnakeViz](https://jiffyclub.github.io/snakeviz/)
* [Gprof2dot](https://github.com/jrfonseca/gprof2dot)

此外，Profiler 还会生成 `callgrind.out` 文件，可用以下工具查看：

* [KCachegrind or QCachegrind](https://kcachegrind.github.io/)
* [Gprof2dot](https://github.com/jrfonseca/gprof2dot)

gprof2dot 工具会生成 [DOT](http://www.graphviz.org/doc/info/lang.html) 文件。你可以使用 [Graphviz](http://www.graphviz.org/) 的 `dot` 工具将其转换为图片，或使用 [xdot](https://github.com/jrfonseca/xdot.py) 直接查看。`-e` 和 `-n` 参数可用于设置输出文件中函数最小占比阈值。示例如下：

```bash
# Generating the .dot files:
gprof2dot -f pstats    -e 0.05 -n 0.25 profile.1234567890123456.cprof -o profile.dot
gprof2dot -f callgrind -e 0.05 -n 0.25 callgrind.out.1234567890123456 -o callgrind.dot

# Converting to SVG and PNG formats:
dot callgrind.dot -Tsvg -o callgrind.svg
dot callgrind.dot -Tpng -o callgrind.png

# Alternatively, both commands in a single line:
gprof2dot -f pstats profile.1234567890123456.cprof | dot -Tsvg -o profile.svg
```

### 动作：Memory

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.memory)

`profiler.memory` 动作会启动内存分析，并持续指定秒数。

| Data attribute | Optional | Description                                                |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `seconds`              | yes      | 分析持续秒数，默认 `60.0`                                  |

内存分析完成后，Profiler 会在你的配置目录生成 `.hpy` 文件。文件完整路径会通过持久通知显示，便于你定位并复制到桌面。

`hpy` 文件可用任意文本编辑器查看。若需可视化表示，可使用 [Heapy Profile Browser](http://guppy-pe.sourceforge.net/ProfileBrowser.html)。它是 guppy3 包的一部分，可通过以下脚本启动：

```python
#! /usr/bin/python3
from guppy import hpy
hpy().pb()
```

### 动作：Start log objects

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.start_log_objects)

`profiler.start_log_objects` 动作用于开始记录内存中对象数量增长。

| Data attribute | Optional | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `scan_interval`        | yes      | 记录对象增长的间隔频率，默认 `30.0`                         |

此动作会定期记录内存中新对象的增长。主要用途是查找内存泄漏。你可以长时间运行该动作以定位慢速泄漏。若要定位快速泄漏，更建议使用 `profiler.start_log_object_sources`，但它会更消耗 CPU。

关于此数据的记录格式，请参阅 [`growth()` 对应文档](https://mg.pov.lt/objgraph/objgraph.html#objgraph.growth)。

### 动作：Stop log objects

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.stop_log_objects)

`profiler.stop_log_objects` 动作用于停止记录内存中对象增长。

### 动作：Start log object sources

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.start_log_object_sources)

`profiler.start_log_object_sources` 动作用于记录内存中对象增长，并尝试查找新对象来源。

| Data attribute | Optional | Description                                                                |
| ---------------------- | -------- | -------------------------------------------------------------------------- |
| `scan_interval`        | yes      | 记录对象增长的间隔频率，默认 `30.0`                                        |
| `max_objects`          | yes      | 每次记录时检查来源信息的新对象数量，默认 `5`                               |

此动作会定期记录内存中新对象增长，主要用于查找内存泄漏。

它与 `start_log_objects` 类似，但 CPU 开销更高，因为每次记录时都会尝试定位最多 `max_objects` 个新对象的来源。

### 动作：Stop log object sources

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.stop_log_object_sources)

`profiler.stop_log_object_sources` 动作用于停止记录带来源信息的对象增长。

### 动作：Dump log objects

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.dump_log_objects)

`profiler.dump_log_objects` 动作可帮助你分析内存中的对象。当 `start_log_objects` 显示某类对象持续增长时，可以用该动作进一步调查。匹配 `type` 的每个对象的 `repr` 都会写入日志。

| Data attribute | Optional | Description                            |
| ---------------------- | -------- | -------------------------------------- |
| `type`                 | no       | 要输出到日志的对象类型。               |

该动作适合调查内存中对象状态。例如，如果系统中的模板渲染过于频繁，可使用以下示例动作定位问题来源模板：

```yaml
action: profiler.dump_log_objects
data:
  type: RenderInfo
```

```yaml
action: profiler.dump_log_objects
data:
  type: Template
```

### 动作：Log thread frames

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.log_thread_frames)

`profiler.log_thread_frames` 动作会记录每个运行中线程的当前栈帧，帮助你发现失控线程、执行器过载原因或其他线程问题。

示例如下：

```text
[homeassistant.components.profiler] Thread [SyncWorker_6]: File "/usr/local/lib/python3.8/threading.py", line 890, in _bootstrap
    self._bootstrap_inner()
  File "/usr/local/lib/python3.8/threading.py", line 932, in _bootstrap_inner
    self.run()
  File "/usr/local/lib/python3.8/threading.py", line 870, in run
    self._target(*self._args, **self._kwargs)
  File "/usr/local/lib/python3.8/concurrent/futures/thread.py", line 80, in _worker
    work_item.run()
  File "/usr/local/lib/python3.8/concurrent/futures/thread.py", line 57, in run
    result = self.fn(*self.args, **self.kwargs)
  File "/usr/src/homeassistant/homeassistant/components/samsungtv/media_player.py", line 139, in update
    self._state = STATE_ON if self._bridge.is_on() else STATE_OFF
  File "/usr/src/homeassistant/homeassistant/components/samsungtv/bridge.py", line 72, in is_on
    return self._get_remote() is not None
  File "/usr/src/homeassistant/homeassistant/components/samsungtv/bridge.py", line 274, in _get_remote
    self._remote.open()
  File "/usr/local/lib/python3.8/site-packages/samsungtvws/remote.py", line 146, in open
    self.connection = websocket.create_connection(
  File "/usr/local/lib/python3.8/site-packages/websocket/_core.py", line 511, in create_connection
    websock.connect(url, **options)
  File "/usr/local/lib/python3.8/site-packages/websocket/_core.py", line 219, in connect
    self.sock, addrs = connect(url, self.sock_opt, proxy_info(**options),
  File "/usr/local/lib/python3.8/site-packages/websocket/_http.py", line 120, in connect
    sock = _open_socket(addrinfo_list, options.sockopt, options.timeout)
  File "/usr/local/lib/python3.8/site-packages/websocket/_http.py", line 170, in _open_socket
    sock.connect(address)
```

### 动作：Log event loop scheduled

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.log_event_loop_scheduled)

`profiler.log_event_loop_scheduled` 动作会记录事件循环中已计划的任务。它有助于定位以下问题：某些集成在 Home Assistant 停止时没有取消监听器，或锁机制不足导致前一次更新尚未完成就又调度了新更新。

每个即将执行的计划项都会记录，类似如下示例：

```text
[homeassistant.components.profiler] Scheduled: <TimerHandle when=1528307.1818668307 async_track_point_in_utc_time.<locals>.run_action(<Job HassJobType.Coroutinefunction <bound method DataUpdateCoordinator._handle_refresh_interval of <homeassistant.components.screenlogic.ScreenlogicDataUpdateCoordinator object at 0x7f985d896d30>>>) at /usr/src/homeassistant/homeassistant/helpers/event.py:1175>`
```

### 动作：LRU stats

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.lru_stats)

`profiler.lru_stats` 动作会记录 [lru\_cache](https://docs.python.org/3/library/functools.html#functools.lru_cache) 和 [lru-dict](https://pypi.org/project/lru-dict/) 的统计信息，帮助你优化 Home Assistant，并定位内存泄漏。

### 动作：Set asyncio debug

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.set_asyncio_debug)

`profiler.set_asyncio_debug` 动作用于启用或禁用 asyncio 调试模式。启用后，`asyncio` 会以[调试模式](https://docs.python.org/3/library/asyncio-dev.html#debug-mode)运行。可用该动作帮助识别阻塞事件循环的集成。

| Data attribute | Optional | Description                            |
| ---------------------- | -------- | -------------------------------------- |
| `enabled`              | yes      | 是否启用 asyncio 调试的布尔值。        |

### 动作：Log current tasks

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.log_current_tasks)

`profiler.log_current_tasks` 动作会记录当前所有正在运行的任务。可帮助你定位任务泄漏，或找出拖慢启动的任务。

示例如下：

```text
[homeassistant.components.profiler] Task: <Task pending name='Task-1133' coro=<HubConnector._listener() running at /usr/local/lib/python3.12/site-packages/aioharmony/hubconnector_websocket.py:362> wait_for=<Future pending cb=[Task.task_wakeup()]>>
```

### 动作：Dump sockets

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=profiler.dump_sockets)

`profiler.dump_sockets` 动作会记录 Home Assistant 使用的所有套接字。主要用于识别当前打开的网络连接，帮助你追踪未被正确关闭的连接。

输出示例：

```text
[homeassistant.components.profiler] Sockets used by Home Assistant:
<socket.socket [closed] fd=-1, family=2, type=1, proto=6>
<socket.socket fd=97, family=2, type=1, proto=6, laddr=('192.168.1.10', 80), raddr=('192.168.1.14', 59086)>
<socket.socket fd=7, family=1, type=1, proto=0>
<socket.socket fd=8, family=1, type=1, proto=0>
<socket.socket fd=11, family=10, type=1, proto=6, laddr=('::', 80, 0, 0)>
<socket.socket fd=12, family=2, type=1, proto=6, laddr=('0.0.0.0', 80)>
<socket.socket fd=15, family=10, type=2, proto=0, laddr=('::', 5353, 0, 0)>
...
```
