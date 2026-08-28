作为 component，你可能有想要让前端可用的信息。例如，media player 会希望将专辑封面提供给前端显示。我们的前端通过 websocket API 与后端通信，该 API 可以扩展自定义命令。

## 注册命令（Python）

要注册一个命令，你需要一个 message type、一个 message schema 和一个 message handler。你的 component 不必将 websocket API 添加为依赖。注册命令后，如果用户正在使用 websocket API，该命令将变得可用。

### 定义你的命令 schema

Command schema 由一个 message type 和命令被调用时期望的数据类型组成。你在命令 handler 上通过 decorator 定义命令类型和数据 schema。Message handlers 是在 event loop 中运行的回调函数。

```python
from homeassistant.components import websocket_api

@websocket_api.websocket_command(
    {
        vol.Required("type"): "frontend/get_panels",
        vol.Optional("preload_panels"): bool,
    }
)
@callback
def ws_get_panels(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """处理 websocket 命令"""
    panels = ...
    connection.send_result(msg["id"], {"panels": panels})
```

#### 执行 I/O 或发送延迟响应

如果你的命令需要与网络或设备交互，或需要计算信息，你将需要排入一个 job 来完成工作并发送响应。为此，将你的函数设为 async 并使用 `@websocket_api.async_response` 进行装饰。

```python
from homeassistant.components import websocket_api

@websocket_api.websocket_command(
    {
        vol.Required("type"): "camera/get_thumbnail",
        vol.Optional("entity_id"): str,
    }
)
@websocket_api.async_response
async def ws_handle_thumbnail(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    """处理获取 media player 封面的命令"""
    # 使用传入的 entity id 获取 media player。
    player = hass.data[DOMAIN].get_entity(msg["entity_id"])

    # 如果 player 不存在，发送错误消息。
    if player is None:
        connection.send_error(
                msg["id"], "entity_not_found", "Entity not found"
        )
        return

    data, content_type = await player.async_get_media_image()

    # 没有可用的 media player 缩略图
    if data is None:
        connection.send_error(
            msg["id"], "thumbnail_fetch_failed", "Failed to fetch thumbnail"
        )
        return

    connection.send_result(
        msg["id"],
        {
            "content_type": content_type,
            "content": base64.b64encode(data).decode("utf-8"),
        },
    )
```

### 在 WebSocket API 中注册

在定义了所有 component 之后，是时候注册命令了。这在你的 setup 方法内部完成。

```python
from homeassistant.components import websocket_api

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """设置你的 component。"""
    websocket_api.async_register_command(hass, ws_get_panels)
    websocket_api.async_register_command(hass, ws_handle_thumbnail)
    return True
```

## 从前端调用命令（JavaScript）

定义了命令后，是时候从前端调用它了！这使用 JavaScript 完成。你需要能够访问持有与后端 WebSocket 连接的 `hass` 对象。然后只需调用 `hass.connection.sendMessagePromise`。这将返回一个 promise，命令成功时 resolve，命令失败时 error。

```js
hass.connection.sendMessagePromise({
    type: 'media_player/thumbnail',
    entity_id: 'media_player.living_room_tv',
}).then(
    (resp) => {
        console.log('Message success!', resp.result);
    },
    (err) => {
        console.error('Message failed!', err);
    }
);
```

如果你的命令不发送响应，可以使用 `hass.connection.sendMessage`。
