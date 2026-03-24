---
title: We Have Apps Now
description: A new subsystem that allows 自动化 to be coded using Python
---

我一直在开发一个新的子系统，用来补充 Home Assistant 的自动化与脚本组件。`AppDaemon` 是一个 Python 守护进程，它会消费来自 Home Assistant 的事件，并将这些事件传递给称为 “Apps” 的 Python 代码片段。一个 App 是一个 Python 类，可以由 `AppDaemon` 实例化一次或多次，并为各种系统事件注册回调。它也能够查看和设置状态，以及调用服务。该 API 提供了非常丰富的环境，既适合家庭自动化任务，也能充分利用 Python 的全部能力。

<!--more-->

## 自动化的另一种思路

如果你还没有读过 Paulus 那篇很棒的博客文章 [Perfect Home automation](/home-assistant/blog/2016/01/19/perfect-home-automation/)，我非常建议你去看看。作为体验过多个家庭自动化系统、并见过它们不同成败的老用户，这篇文章比任何其他内容都更让我相信：Home Assistant 背后的理念是正确的，而且方向也走对了。文中最重要的观点之一是：用手机控制灯光，十有八九比按开关更麻烦。家庭自动化真正发挥价值，是当你开始不再需要手机或开关时——这才是 Home 自动化里的“自动化”。令人意外的是，市面上有大量系统都忽略了这个关键点，自动化能力非常有限；这也正是为什么像 Home Assistant 这样健壮且开放的系统，在把庞大而混乱的“物联网”生态整合起来这件事上如此重要。

既然自动化如此重要，那自动化系统到底应该让我们做到什么？我本质上是个务实主义者，所以我会用是否能轻松完成几项基础但有代表性的任务来评估一个系统：

- 系统能否根据有人在家或离家来做出响应？
- 我能否在日落前后一定时间打开灯光？
- 我回家时不管天亮天黑，灯光能否自行判断该开还是该关？
- 随着系统规模变大，我能否让各个部分彼此协作，并复用（可能很复杂的）逻辑，确保整体顺畅运行？
- 系统是否开放、可扩展？
- 能否完全本地运行，不依赖云端？

在我看来，Home Assistant 借助自动化、脚本、模板以及它的 Restful API，已经把其中大部分都做得非常好。

那为什么还需要 `AppDaemon`？`AppDaemon` 不是用来取代 Home Assistant 的自动化和脚本，而是对它们的补充。很多场景下，自动化规则已经很好用，也可以写得非常简洁。但有一类更复杂的自动化，配置起来会越来越吃力，这正是 AppDaemon 发挥优势的地方。它带来了不少能力：

- 新范式：有些问题需要过程式和/或迭代式方法，而 `AppDaemon` 的 Apps 天生更适合这类需求。Home Assistant 最近在脚本和模板上的增强非常大，但在最复杂的场景里，Apps 仍然能做到自动化规则做不到的事。
- 易用性：`AppDaemon` 的 API 里有大量辅助函数，尽可能让编程自然、直观。它们的设计和行为都尽量保持 “Pythonic”，有经验的 Python 开发者会很快上手。
- 可复用：一段代码写一次，就能用不同参数实例化多次。比如一个动作感应灯逻辑，可以在家里 5 个不同位置复用。代码本体不变，只需在配置文件里动态新增实例。
- 动态性：`AppDaemon` 从设计之初就通过松耦合，让你在不重启 Home Assistant 的情况下修改逻辑。但它还能做得更多：你修改代码后，`AppDaemon` 会自动重载，识别哪些 Apps 在使用该代码，并只重启那些 Apps 来加载新版本，而不需要重启 `AppDaemon` 本身。你也可以动态修改单个或多个 App 的参数，甚至动态增删 App。这样一来，测试迭代效率会高很多。
- 复杂逻辑：面对任意复杂的嵌套逻辑，Python 的 If/Else 结构更清晰，也更容易编写。
- 持久变量与状态：变量可以在事件之间保留，用于追踪例如动作传感器触发次数、某扇门已开启多久等信息。
- 完整 Python 能力：你可以使用任意 Python 库、创建自己的模块、共享变量、重构和复用代码，既可以用一个 App 包办所有逻辑，也可以拆分为多个 App 各司其职——几乎没有限制。

事实上，这恰恰体现了 Home Assistant 的开放性：像 `AppDaemon` 这样的组件可以非常紧密、自然地集成进来，在各方面都像系统扩展的一部分，而不是“二等公民”。Home Assistant 底层设计的一大优势在于，它不会对“控制什么”“响应什么”或“上报什么状态”做任何预设。这在一定程度上得益于 Python 作为 Home Assistant 编程环境的高度灵活性。沿着这条思路，我也将同样的理念带到了 `AppDaemon`：只用了出乎意料地少量代码，就能以完全开放的方式响应基础事件并调用服务；后续绝大多数工作，其实只是不断补充辅助函数，让原本就能做到的事情变得更简单。

## 工作原理

展示 `AppDaemon` 能做什么的最好方式，就是看几个简单例子。

### 日出/日落照明

我们先从一个简单的 App 开始：每天日落时开灯，日出时关灯。每个 App 在首次启动时都会调用 `initialize()` 函数，你可以在这里向 `AppDaemon` 的调度器注册特定时间的回调。本例中我们使用 `run_at_sunrise()` 和 `run_at_sunset()` 分别注册两个回调。参数 `0` 表示相对日出或日落的偏移秒数，可以是正数也可以是负数。对于更复杂的时间区间，使用 Python 的 `datetime.timedelta` 进行计算会更方便。到了日出或日落时，会调用对应的回调函数 `sunrise_cb()` 或 `sunset_cb()`，再通过触发场景来调用 Home Assistant，实现门廊灯的开关。变量 `args["on_scene"]` 和 `args["off_scene"]` 来自这个 App 的配置，因此同一份代码也可以在不同实例中复用，去触发完全不同的场景。

```python
import appapi

class OutsideLights(appapi.AppDaemon):

  def initialize(self):
    self.run_at_sunrise(self.sunrise_cb, 0)
    self.run_at_sunset(self.sunset_cb, 0)

  def sunrise_cb(self, args, kwargs):
    self.turn_on(self.args["off_scene"])

  def sunset_cb(self, args, kwargs):
    self.turn_on(self.args["on_scene"])
```

这个需求用 Home Assistant 自动化也比较容易实现，但我们这才刚入门。

### 动作感应灯光

下一个示例是在检测到动作且天色已暗时开灯，并在一段时间后关灯。这次，`initialize()` 注册的是状态变化回调（动作传感器），而不是具体时间。我们通过在回调注册中增加参数 `new = "on"`，告诉 `AppDaemon` 只关心动作传感器变为开启状态。当检测到动作时，会调用回调函数 `motion()`，然后使用内置便捷函数 `sun_down()` 判断太阳是否已经落下。接着用 `turn_on()` 开灯，再通过 `run_in()` 设置一个 60 秒后的定时任务关灯。`run_in()` 本质上也是一次调度器调用：在指定时间后执行，所以 60 秒后 `AppDaemon` 会调用 `light_off()`，再通过 `turn_off()` 把灯关闭。从代码角度看，这仍然很简单：

```python
import appapi

class MotionLights(appapi.AppDaemon):

  def initialize(self):
    self.listen_state(self.motion, "binary_sensor.drive", new = "on")

  def motion(self, entity, attribute, old, new, kwargs):
    if self.sun_down():
      self.turn_on("light.drive")
      self.run_in(self.light_off, 60)

  def light_off(self, kwargs):
    self.turn_off("light.drive")
```

而如果在 Home Assistant 自动化里实现，这里就开始有点复杂了，通常需要一条自动化规则和两个独立脚本。

现在我们再扩展一个稍微“人为”一点的例子，来展示一件事：在 `AppDaemon` 中很简单，但用自动化规则会非常困难，甚至无法实现。假设你想在屋外有动作时提醒屋内的人：让一盏灯闪烁 10 次。逻辑上我们仍像之前一样，检测到动作后先开灯并设置定时关灯；另外再设置一个 1 秒后的定时任务执行 `flash_warning()`。该函数每次被调用时会切换屋内灯状态，并再次设置 1 秒后调用自己。为了避免无限触发，它会记录已触发次数，达到 10 次后退出。

```python
import appapi

class FlashyMotionLights(appapi.AppDaemon):

  def initialize(self):
    self.listen_state(self.motion, "binary_sensor.drive", new = "on")

  def motion(self, entity, attribute, old, new, kwargs):
    if self.self.sun_down():
      self.turn_on("light.drive")
      self.run_in(self.light_off, 60)
      self.flashcount = 0
      self.run_in(self.flash_warning, 1)

  def light_off(self, kwargs):
    self.turn_off("light.drive")

  def flash_warning(self, kwargs):
    self.toggle("light.living_room")
    self.flashcount += 1
    if self.flashcount < 10:
      self.run_in(self.flash_warning, 1)
```

当然，如果我想把这个 App（或前一个版本）做成可复用组件，我会把传感器、动作触发时要开启的灯、警示灯、闪烁次数以及每次闪烁间隔都做成参数。

此外，Apps 可以写入 `AppDaemon` 的日志文件，还有一套约束系统可用于控制 App 和回调在什么时间、什么条件下生效，从而让逻辑保持清晰简洁。

过去几周我已经把自己那套（相当复杂的）自动化逐步迁移到 `APPDaemon`，到目前为止运行非常稳定可靠。

有些人看到这里可能会说：“这些我本来就能做到，有什么用？”这完全没问题。正如我前面说的，它是替代方案之一，不是替换方案。但我仍希望，对一部分用户来说，这会是一种更自然、更强大、也更灵活的方式，用来构建潜在非常复杂的自动化。

如果这已经勾起了你的兴趣，不妨亲自试试看。你可以在[这里](https://github.com/acockburn/appdaemon)找到它，包含完整安装说明、API 参考文档，以及多个完整示例。

祝你自动化愉快！
