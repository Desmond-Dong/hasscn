---
title: "扩展 WebSocket API"
---

作为一个组件，你可能有一些想要提供给前端使用的信息。例如，media player 可能希望提供专辑封面供前端显示。我们的前端通过 websocket API 与后端通信，而它可以通过自定义命令进行扩展。

## 注册命令（Python）

要注册一个命令，你需要有消息类型、消息 schema 和消息处理器。你的组件不必将 websocket API 作为依赖项。你只需注册命令；如果用户正在使用 websocket API，该命令就会可用。

### 定义命令 schema

命令 schema 由消息类型和调用该命令时期望接收的数据类型组成。你可以通过给命令处理器添加 decorator 来同时定义命令类型和数据 schema。消息处理器是运行在事件循环中的回调函数。

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
    """Handle the websocket command."""
    panels = ...
    connection.send_result(msg["id"], {"panels": panels})
```

#### 执行 I/O 或发送延迟响应

如果你的命令需要与网络、设备交互，或需要计算信息，你需要排队一个任务来完成这项工作并发送响应。为此，请将函数设为 async，并使用 `@websocket_api.async_response` decorator。

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
    """Handle get media player cover command."""
    # Retrieve media player using passed in entity id.
    player = hass.data[DOMAIN].get_entity(msg["entity_id"])

    # If the player does not exist, send an error message.
    if player is None:
        connection.send_error(
                msg["id"], "entity_not_found", "Entity not found"
        )
        return

    data, content_type = await player.async_get_media_image()

    # No media player thumbnail available
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

### 向 Websocket API 注册

当所有部分都已定义完成，就该注册命令了。这一步在你的 setup 方法中完成。

```python
from homeassistant.components import websocket_api

async def async_setup(hass, config):
    """Setup of your component."""
    websocket_api.async_register_command(hass, ws_get_panels)
    websocket_api.async_register_command(hass, ws_handle_thumbnail)
```

## 从前端调用命令（JavaScript）

定义好命令后，就可以从前端调用它了！这一步使用 JavaScript 完成。你需要访问 `hass` 对象，它持有到后端的 WebSocket 连接。然后直接调用 `hass.connection.sendMessagePromise`。它会返回一个 promise：命令成功时 resolve，失败时抛出错误。

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

如果你的命令不发送响应，你可以使用 `hass.connection.sendMessage`。
