`async_initialize_triggers` 的专用 `home_assistant_start` flag 已弃用，并将在 Home Assistant Core 2027.8 中移除。在弃用期间，该参数不再有任何效果。

该 flag 之所以存在，是因为 `homeassistant` start trigger 是一个伪 trigger：它不像真正的 trigger 那样运作，而是依赖于触发器 API 的调用者传递 `home_assistant_start=True`，以便 `async_initialize_triggers` 在启动期间触发该 trigger。

Start trigger 已被重写为像真正的 trigger 一样工作，因此不再需要该 flag。`async_initialize_triggers` 的调用者只需停止传递 `home_assistant_start` 即可。

为了使新实现成为可能，重写添加了 `HomeAssistant.async_add_startup_job`，它注册一个 job，该 job 将在所有对 `EVENT_HOMEASSISTANT_START` 的 listeners 执行之后、但在 `EVENT_HOMEASSISTANT_STARTED` 触发之前被调用。这镜像了已用于 homeassistant shutdown trigger 的方法，并避免了在 core states 和 events 之间已复杂的关 系中再添加另一个 core state 和 event。

更多详情，请参阅 [core PR 175160](https://github.com/home-assistant/core/pull/175160)。
