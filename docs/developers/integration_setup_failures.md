---
title: "处理设置失败"
description: '集成可能因为多种原因而设置失败。最常见的是设备或服务离线，或者凭据已经失效。你的集成必须支持重试设置，这样当设备或服务恢复可用时，Home Assistant 能尽快恢复，而不需要用户手动重启。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 处理设置失败

集成可能因为多种原因而设置失败。最常见的是设备或服务离线，或者凭据已经失效。你的集成必须支持重试设置，这样当设备或服务恢复可用时，Home Assistant 能尽快恢复，而不需要用户手动重启。

## 处理离线或不可用的设备和服务

### 使用 `async_setup_entry` 的集成

在集成的 `__init__.py` 中，如果 `async_setup_entry` 抛出 `ConfigEntryNotReady`，Home Assistant 会自动稍后重试设置。需要注意的是，在平台的 `async_setup_entry` 中抛出 `ConfigEntryNotReady` 是无效的，因为此时已经太晚，无法再由配置条目的设置流程捕获。

#### 示例

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Setup the config entry for my device."""
    device = MyDevice(entry.data[CONF_HOST])
    try:
        await device.async_setup()
    except (asyncio.TimeoutError, TimeoutException) as ex:
        raise ConfigEntryNotReady(f"Timeout while connecting to {device.ipaddr}") from ex
```

如果你使用的是[数据更新协调器](/developers/integration_fetching_data#协调式单个-api-轮询全部实体数据)，那么首次刷新失败时，调用 `await coordinator.async_config_entry_first_refresh()` 也会自动触发这个异常。

如果你的集成支持发现，那么一旦设备或服务再次被发现，Home Assistant 也会自动重试。

#### 处理重试时的日志记录

把错误消息作为第一个参数传给 `ConfigEntryNotReady`。Home Assistant 会以 `debug` 级别记录日志。该错误消息也会传递到 UI，并显示在集成页面上。

如果你在抛出 `ConfigEntryNotReady` 时没有提供消息，Home Assistant 会尝试从触发它的原始异常中提取原因（如果它是由另一个异常链式抛出的）。

集成不应额外记录与重试有关的非 `debug` 日志，而应依赖 `ConfigEntryNotReady` 内置的日志逻辑，以避免日志刷屏。

### 使用 `async_setup_platform` 的集成

如果在 `async_setup_platform` 中抛出 `PlatformNotReady`，Home Assistant 会自动稍后重试设置。

#### 示例

```python
async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Set up the platform."""
    device = MyDevice(conf[CONF_HOST])
    try:
        await device.async_setup()
    except ConnectionError as ex:
        raise PlatformNotReady(f"Connection error while connecting to {device.ipaddr}: {ex}") from ex
```

#### 处理重试时的日志记录

把错误消息作为第一个参数传给 `PlatformNotReady`。Home Assistant 会在首次重试时以 `warning` 级别记录，后续重试则使用 `debug` 级别。

如果你在抛出异常时没有提供消息，Home Assistant 会尝试从触发它的原始异常中提取原因。

集成不应额外记录与重试有关的非 `debug` 日志，而应依赖 `PlatformNotReady` 内置的日志逻辑，以避免日志刷屏。

## 处理过期凭据

抛出 `ConfigEntryAuthFailed` 异常后，Home Assistant 会自动将配置条目标记为失败，并启动重新认证流程。这个异常必须从 `__init__.py` 中的 `async_setup_entry` 或 `DataUpdateCoordinator` 中抛出，否则无法正确触发重新认证。如果你的集成没有使用 `DataUpdateCoordinator`，也可以调用 `entry.async_start_reauth()` 作为替代方案来启动该流程。

`reauth` 流程启动时会携带以下上下文变量，并可在 `async_step_reauth` 中读取：

- `source`：始终为 `SOURCE_REAUTH`
- `entry_id`：需要重新认证的配置条目的 `entry_id`
- `unique_id`：需要重新认证的配置条目的 `unique_id`

#### 示例

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Setup the config entry for my device."""
    device = MyDevice(entry.data[CONF_HOST])
    try:
        await device.async_setup()
    except AuthFailed as ex:
        raise ConfigEntryAuthFailed(f"Credentials expired for {device.name}") from ex
    except (asyncio.TimeoutError, TimeoutException) as ex:
        raise ConfigEntryNotReady(f"Timed out while connecting to {device.ipaddr}") from ex
```
