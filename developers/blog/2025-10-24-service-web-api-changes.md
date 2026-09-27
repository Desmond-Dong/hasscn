在 `strings.json` 中定义的 action translations 不再包含在 WebSocket `get_services` 命令和 REST `/api/services` 端点的响应中，因为它们不完整，且 Home Assistant 前端并未使用它们。

来自 `services.yaml` 的旧版未翻译的 action 名称和描述仍然保留在 WebSocket 和 REST 响应中。

使用 WebSocket 命令 `frontend/get_translations` 获取完整的 action translations。

更多详情请参阅 [core PR 147120](https://github.com/home-assistant/core/pull/147120)。
