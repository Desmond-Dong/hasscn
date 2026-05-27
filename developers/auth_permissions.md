# 权限

:::info
这是一项实验性功能，目前尚未启用，也不会被强制执行。
:::

权限用于限制用户可以访问或控制的内容。权限附加在组上，用户可以属于一个或多个组。用户所属全部组的权限合并后，决定了该用户可以查看或控制什么。

权限不适用于被标记为“所有者”的用户。此类用户始终拥有对所有内容的访问权限。

## 一般权限结构

策略是在根层级由不同权限类别组成的字典。在当前实现中，这仅适用于实体。

```python
{
    "entities": {
        # …
    }
}
```

每个类别还可以继续细分为描述该类别不同部分的子类别。

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

如果省略某个类别，则表示用户没有该类别下的任何权限。

定义策略时，任意层级中的任意字典值都可以替换为 `True` 或 `None`。`True` 表示授予权限，`None` 表示使用默认值，也就是拒绝访问。

## 实体

可以通过 `entity_ids`、`device_ids`、`area_ids` 和 `domains` 这些子类别，在单个实体或整个域的层级上设置实体权限。您既可以将值设为 `True` 来授予全部权限，也可以针对单个实体分别指定 `read`、`control`、`edit` 权限。

系统会按以下顺序返回第一个匹配结果：`entity_ids`、`device_ids`、`area_ids`、`domains`、`all`。

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

如果用户属于多个组，这些组的权限策略会在运行时合并为一个策略。合并时，系统会遍历字典的每一层，并按以下规则比较各来源的值：

1. 如果其中任何一个值为 `True`，则合并后的值将变为 `True`。
2. 如果任一值是字典，则合并结果也会是一个字典，并继续按相同规则递归处理其中的每个值。
3. 如果所有值都是 `None`，则合并后的值将变为 `None`。

例如：

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

合并后的结果为：

```python
{
    "entities": {
        "entity_ids": True
    }
}
```

## 检查权限

目前有两类权限检查：一类是检查用户是否可以对实体执行 `read`、`control`、`edit` 操作；另一类是检查用户是否为管理员，从而判断其是否可以更改相关配置。

某些 API 始终对所有用户开放，但会根据权限限制可访问的范围，例如模板渲染。

### 检查权限

要检查权限，您需要先拿到用户对象。有了用户对象后，权限检查就很直接。

```python
from homeassistant.exceptions import Unauthorized
from homeassistant.permissions.const import POLICY_READ, POLICY_CONTROL, POLICY_EDIT

# Raise error if user is not an admin
if not user.is_admin:
    raise Unauthorized()


# Raise error if user does not have access to control an entity
# Available policies: POLICY_READ, POLICY_CONTROL, POLICY_EDIT
if not user.permissions.check_entity(entity_id, POLICY_CONTROL):
    raise Unauthorized()
```

### 上下文对象

Home Assistant 中的所有服务调用、触发事件和状态变更都带有一个上下文对象。该对象可用于追踪事件与操作的来源，并包含用于权限检查的用户 ID。

对于权限检查而言，关键在于：代表用户执行的操作必须在带有用户 ID 的上下文中进行。如果您处于服务处理函数中，应复用传入的 `call.context`。如果您位于 WebSocket API 或 REST API 端点中，则应使用正确的用户来创建上下文：

```python
from homeassistant.core import Context

await hass.services.async_call(
    "homeassistant", "stop", context=Context(user_id=user.id), blocking=True
)
```

### 如果权限检查失败

当检测到未获授权的操作时，应抛出 `homeassistant.exceptions.Unauthorized` 异常。该异常会终止当前操作，并通知用户其请求未获授权。

`Unauthorized` 异常支持多个参数，用于描述失败的权限检查。所有字段都是可选的。

| # 并非所有操作都有 ID（例如添加配置条目）
| # 因此我们使用这个后备字段来说明是哪一类权限检查失败

|字段|说明|
| --------- | ----------- |
|`context`|当前调用的上下文。|
|`user_id`|尝试操作的用户 ID。|
|`entity_id`|尝试操作的实体 ID。|
|`config_entry_id`|尝试操作的配置条目 ID。|
|`perm_category`|所检查的权限类别。只有在没有具体对象 ID 可用时才需要提供，例如创建配置条目时。|
|`permission`|所检查的权限，例如 `POLICY_READ`。|

### 保护服务处理函数

服务允许用户控制实体，或对整个集成执行操作。服务调用会借助附加上下文判断是哪个用户发起了请求，因此把调用上下文继续传递给后续服务操作也非常重要。

通过实体组件 (`component.async_register_entity_service()`) 注册的所有服务都会自动执行权限检查。

#### 检查实体权限

您的服务处理函数需要检查其将要操作的每个实体的权限。

```python
from homeassistant.exceptions import Unauthorized, UnknownUser
from homeassistant.auth.permissions.const import POLICY_CONTROL


async def handle_entity_service(call):
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


async def async_setup(hass, config):
    hass.services.async_register(DOMAIN, "my_service", handle_entity_service)
    return True
```

#### 检查管理员权限

从 Home Assistant 0.90 开始，提供了一个专门的辅助方法，用于注册需要管理员权限的服务。

```python
# New in Home Assistant 0.90
async def handle_admin_service(call):
    """Handle a service action call."""
    # Do admin action


async def async_setup(hass, config):
    hass.helpers.service.async_register_admin_service(
        DOMAIN, "my_service", handle_admin_service, vol.Schema({})
    )
    return True
```

### 保护 REST API 端点

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

### 保护 WebSocket API 端点

在 WebSocket API 端点中，可以通过 `connection.user` 访问当前用户并进行权限检查。如果需要检查管理员权限，可以使用内置的 `@require_admin` 装饰器。

```python
from homeassistant.components import websocket_api


async def async_setup(hass, config):
    websocket_api.async_register_command(hass, websocket_create)
    return True


@websocket_api.require_admin
@websocket_api.async_response
@websocket_api.websocket_command(
    {vol.Required("type"): "my-component/my-action",}
)
async def websocket_create(hass, connection, msg):
    """Create a user."""
    # Do action
```
