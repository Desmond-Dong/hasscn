Permissions 限制用户可以访问或控制的内容。Permissions 附加到 groups 上，用户可以成为其成员。用户所属的所有 groups 的 permissions 合并后，决定用户可以查看或控制什么。

Permissions 不适用于被标记为 "owner" 的用户。该用户将始终拥有对一切的访问权限。

## 通用权限结构

Policies 是字典，在根级别由不同类别的 permissions 组成。在当前的实现中，这仅限于 entities。

```python
{
    "entities": {
        # …
    }
}
```

每个 category 可以进一步拆分为描述该 category 各部分的 subcategories。

```python
{
    "entities": {
        "domains": {
            # …
        },
        "entity_ids": {
            # …
        },
    }
}
```

如果某个 category 被省略，用户将没有该 category 的权限。

在定义 policy 时，任何位置的任何字典值都可以用 `True` 或 `None` 替换。`True` 表示授予权限，`None` 表示使用默认值，即拒绝访问。

## 实体

Entity permissions 可以通过 `entity_ids`、`device_ids`、`area_ids` 和 `domains` 这些 subcategories 在按 entity 和按 domain 的基础上进行设置。你可以通过将值设为 `True` 来授予所有访问权限，也可以使用 "read"、"control"、"edit" permissions 逐个指定每个 entity。

系统将按照 `entity_ids`、`device_ids`、`area_ids`、`domains`、`all` 的顺序返回第一个匹配的结果。

```json
{
  "entities": {
    "domains": {
      "switch": true
    },
    "entity_ids": {
      "light.kitchen": {
        "read": true,
        "control": true
      }
    }
  }
}
```

## 合并策略

如果用户是多个 groups 的成员，这些 groups 的 permission policies 将在运行时合并为一个单一的 policy。在合并 policies 时，我们将检查字典的每一层，并使用以下方法对每个来源的值进行比较：

1. 如果任何值为 `True`，则合并后的值为 `True`。
2. 如果任何值为字典，则合并后的值成为一个通过递归使用此方法检查每个值而创建的字典。
3. 如果所有值都是 `None`，则合并后的值为 `None`。

来看一个示例：

```python
{
    "entities": {
        "entity_ids": {
            "light.kitchen": True
        }
    }
}
```

```python
{
    "entities": {
        "entity_ids": True
    }
}
```

合并后变为

```python
{
    "entities": {
        "entity_ids": True
    }
}
```

## 检查权限

我们目前有两种不同的 permission checks：用户能否对 entity 执行 read/control/edit 操作，以及用户是否为 admin 从而被允许更改此 configuration setting。

某些 APIs 对所有用户始终可访问，但可能根据 permissions 提供有限的范围，例如渲染 template。

### 检查权限

要检查 permission，你需要能够访问 user object。一旦有了 user object，检查 permission 就很容易了。

```python
from homeassistant.exceptions import Unauthorized
from homeassistant.auth.permissions.const import POLICY_READ, POLICY_CONTROL, POLICY_EDIT

# Raise error if user is not an admin
if not user.is_admin:
    raise Unauthorized()


# Raise error if user does not have access to control an entity
# Available policies: POLICY_READ, POLICY_CONTROL, POLICY_EDIT
if not user.permissions.check_entity(entity_id, POLICY_CONTROL):
    raise Unauthorized()
```

### context 对象

Home Assistant 中的所有 service actions、fired events 和 states 都有一个 context object。该对象允许我们将更改归因于 events 和 actions。这些 context objects 还包含一个 user id，用于检查 permissions。

对于 permission checking 来说，至关重要的是，代表用户执行的操作必须使用包含用户 ID 的 context 来完成。如果你在 service action handler 中，应该重用传入的 context `call.context`。如果你在 WebSocket API 或 Rest API endpoint 中，应该使用正确的用户创建 context：

```python
from homeassistant.core import Context

await hass.services.async_call(
    "homeassistant", "stop", context=Context(user_id=user.id), blocking=True
)
```

### 权限检查失败时

当你检测到 unauthorized action 时，应该抛出 `homeassistant.exceptions.Unauthorized` 异常。此异常将取消当前操作并通知用户其操作未被授权。

`Unauthorized` 异常有多个参数，用于标识失败的 permission check。所有字段都是可选的。

| Parameter | Description
| --------- | -----------
| context | The context of the current call.
| user\_id | The user ID that we tried to operate on.
| entity\_id | The entity ID that we tried to operate on.
| config\_entry\_id | The config entry ID that we tried to operate on.
| perm\_category | The permission category that we tested. Only necessary if we don't have an object ID that the user tried to operate on (like when we create a config entry).
| permission | The permission that we tested, ie `POLICY_READ`.

### 保护 service action handler

Actions 允许用户控制 entities 或与整个 integration 进行交互。Service action 使用附加的 context 来查看哪个用户触发了命令。由于使用了 context，重要的是你还要将 call context 传递给所有 service actions。

所有通过 entity component（`component.async_register_entity_service()`）注册的 service actions 将自动进行权限检查。

#### 检查实体权限

你的 service action handler 需要检查它将操作的每个 entity 的 permissions。

```python
from homeassistant.exceptions import Unauthorized, UnknownUser
from homeassistant.auth.permissions.const import POLICY_CONTROL


async def handle_entity_service(call: ServiceCall) -> None:
    """Handle a service action call."""
    entity_ids = call.data["entity_id"]

    for entity_id in entity_ids:
        if call.context.user_id:
            user = await hass.auth.async_get_user(call.context.user_id)

            if user is None:
                raise UnknownUser(
                    context=call.context,
                    entity_id=entity_id,
                    permission=POLICY_CONTROL,
                )

            if not user.permissions.check_entity(entity_id, POLICY_CONTROL):
                raise Unauthorized(
                    context=call.context,
                    entity_id=entity_id,
                    permission=POLICY_CONTROL,
                )

        # Do action on entity


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    hass.services.async_register(DOMAIN, "my_service", handle_entity_service)
    return True
```

#### 检查管理员权限

有一个特殊的 helper 用于保护需要 admin 访问权限的 service actions。

```python
from homeassistant.helpers.service import async_register_admin_service


async def handle_admin_service(call: ServiceCall) -> None:
    """Handle a service action call."""
    # Do admin action


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    async_register_admin_service(
        hass, DOMAIN, "my_service", handle_admin_service, vol.Schema({})
    )
    return True
```

### 保护 REST API endpoint

```python
from homeassistant.core import Context
from homeassistant.components.http.view import HomeAssistantView
from homeassistant.exceptions import Unauthorized


class MyView(HomeAssistantView):
    """View to handle Status requests."""

    url = "/api/my-component/my-api"
    name = "api:my-component:my-api"

    async def post(self, request):
        """Notify that the API is running."""
        hass = request.app["hass"]
        user = request["hass_user"]

        if not user.is_admin:
            raise Unauthorized()

        hass.bus.async_fire(
            "my-component-api-running", context=Context(user_id=user.id)
        )

        return self.json_message("Done.")
```

### 保护 Websocket API endpoint

在 Websocket API endpoint 中验证 permissions 可以通过访问 `connection.user` 来获取用户。如果需要检查 admin 访问权限，可以使用内置的 `@require_admin` decorator。

```python
from homeassistant.components import websocket_api


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    websocket_api.async_register_command(hass, websocket_create)
    return True


@websocket_api.require_admin
@websocket_api.async_response
@websocket_api.websocket_command(
    {vol.Required("type"): "my-component/my-action",}
)
async def websocket_create(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict,
) -> None:
    """Create a user."""
    # Do action
```
