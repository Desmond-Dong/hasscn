`labs` 集成中的 `async_listen` helper 已被弃用，建议改用 `async_subscribe_preview_feature`。

新的 `async_subscribe_preview_feature` 函数提供了更一致的 API，其中 listener callback 会接收到一个包含更新后 feature state 的 `EventLabsUpdatedData` 参数。这消除了需要在 listener 内部分别调用 `async_is_preview_feature_enabled` 来检查当前值的需要。

### 旧用法

```python
from homeassistant.components.labs import async_is_preview_feature_enabled, async_listen

def my_listener() -> None:
    if async_is_preview_feature_enabled(hass, DOMAIN, "my_feature"):
        # feature 已启用
        ...

async_listen(
    hass,
    domain=DOMAIN,
    preview_feature="my_feature",
    listener=my_listener,
)
```

### 新用法

```python
from homeassistant.components.labs import EventLabsUpdatedData, async_subscribe_preview_feature

async def my_listener(event_data: EventLabsUpdatedData) -> None:
    if event_data["enabled"]:
        # feature 已启用
        ...

async_subscribe_preview_feature(
    hass,
    domain=DOMAIN,
    preview_feature="my_feature",
    listener=my_listener,
)
```

请注意，新的 listener 是一个协程函数，并接收 `EventLabsUpdatedData` 作为参数。

`async_listen` 将在 Home Assistant 2027.3 中移除。

更多详情请参阅 [core PR #162648](https://github.com/home-assistant/core/pull/162648)。
