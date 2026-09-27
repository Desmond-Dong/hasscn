使用 [Data Update Coordinator](https://developers.home-assistant.io/docs/integration_fetching_data/#coordinated-single-api-poll-for-data-for-all-entities) 的集成可以通过新参数 `retry_after` 增强 `UpdateFailed` 异常，以延迟下一次计划的刷新指定秒数，然后在 API 恢复后恢复正常节奏。

在轮询 API 因超载而返回 HTTP 429 或在响应头中提供 `Retry-After` 的情况下，集成现在可以遵守这些 backoff 信号。
集成和 API 客户端必须检测这些 backoff 信号并清理 API 期望的 backoff 时间段。`UpdateFailed` 异常接受一个 `retry_after` 参数（以秒为单位的 float），用于延迟下一次计划的刷新。一旦 API 恢复且不再抛出 `UpdateFailed`，集成将恢复其正常的 `update_interval`。

使用示例：

```python
try:
    request = await self.client.get_information()
except APIClientRateLimited as err:
    raise UpdateFailed(
        retry_after=60  # 也可以从 API 响应中获取，或提供默认值
    ) from err
```

#### ConfigEntryNotReady

`retry_after` 参数在 Update Coordinator 设置阶段（`async_config_entry_first_refresh`）被忽略。如果第一次刷新失败，Home Assistant 将抛出 `ConfigEntryNotReady` 异常，允许 config entry 设置使用内置的 retry 自动重试。一旦 coordinator 设置成功，`retry_after` 将应用于后续的刷新。
