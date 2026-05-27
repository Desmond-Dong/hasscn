# 自动化模式

自动化可以在正在运行时被再次触发。

自动化的 `mode` 配置选项用于控制当自动化在上一次触发的动作仍在运行时，被再次触发会发生什么。

模式 | 描述
-|-
`single` | （默认）不启动新的运行。发出警告。
`restart` | 在停止上一次运行后启动新的运行。自动化仅在条件满足时才会重新启动。
`queued` | 在所有之前的运行完成后启动新的运行。运行保证按照排队的顺序执行。请注意，后续排队的自动化只有在触发时满足其条件才会加入队列。
`parallel` | 与之前的运行并行启动一个新的、独立的运行。

<p class='img'>
  <img src='/home-assistant/images/integrations/script/script_modes.jpg'>
</p>

对于 `queued` 和 `parallel` 模式，配置选项 `max` 控制可以同时执行和/或排队的最大运行次数。默认值为 10。

当超过 `max` 时（对于 `single` 模式实际上为 1），将发出日志消息以指示发生了这种情况。配置选项 `max_exceeded` 控制该日志消息的严重级别。将其设置为 `silent` 以忽略警告，或设置为[日志级别](/home-assistant/integrations/logger/index.md#log-levels)。默认值为 `warning`。

## 节流自动化示例

有些自动化你只想每 5 分钟运行一次。这可以通过使用 `single` 模式并在自动化运行时被触发时静默警告来实现。

```yaml
automation:
  - mode: single
    max_exceeded: silent
    triggers:
      - ...
    actions:
      - ...
      - delay: 300  # seconds (=5 minutes)
```

## 队列示例

有时自动化正在对不支持多个同时动作的设备执行动作。在这种情况下，可以使用队列。此时，自动化将在当前调用和队列完成后执行。

```yaml
automation:
  - mode: queued
    max: 25
    triggers:
      - ...
    actions:
      - ...
```
