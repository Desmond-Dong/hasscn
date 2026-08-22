---
title: "Handling setup failures"
---

你的 integration 可能因为各种原因无法完成设置。最常见的情况是 device 或 service 离线，或者凭据已不再有效。你的 integration 必须重试 setup，这样当 device 或 service 恢复上线时，就能尽快恢复，而无需用户重启 Home Assistant。

## 处理离线或不可用的 devices 和 services

### 使用 `async_setup_entry` 的 integrations

在 integration 的 `__init__.py` 中的 `async_setup_entry` 里抛出 `ConfigEntryNotReady` 异常，Home Assistant 会自动安排稍后重试设置。为避免混淆，在 platform 的 `async_setup_entry` 中抛出 `ConfigEntryNotReady` 是无效的，因为此时对于 config entry 的设置来说已经太晚了。

#### 示例

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the config entry for my device."""
    device = MyDevice(entry.data[CONF_HOST])
    try:
        await device.async_setup()
    except (asyncio.TimeoutError, TimeoutException) as ex:
        raise ConfigEntryNotReady(f"Timeout while connecting to {device.ipaddr}") from ex
```

如果你正在使用 [DataUpdateCoordinator](integration_fetching_data#coordinated-single-api-poll-for-data-for-all-entities)，调用 `await coordinator.async_config_entry_first_refresh()` 也会在首次刷新失败时自动触发此异常。

如果你的 integration 支持 discovery，Home Assistant 会在你的 device 或 service 被发现时自动重试。

#### 处理重试的 logging

将错误消息作为第一个参数传递给 `ConfigEntryNotReady`。Home Assistant 会以 `debug` 级别记录。错误消息还会传播到 UI，并显示在 integrations 页面上。如果你在抛出 `ConfigEntryNotReady` 时不设置消息，Home Assistant 会尝试从导致 `ConfigEntryNotReady` 的异常中提取原因，前提是该异常是从另一个异常传播而来的。

该 integration 不应记录任何关于重试的非 debug 消息，而应依赖 `ConfigEntryNotReady` 内置的 logic，以避免刷屏日志。

### 使用 `async_setup_platform` 的 integrations

在 `async_setup_platform` 中抛出 `PlatformNotReady` 异常，Home Assistant 会自动安排稍后重试设置。

#### 示例

```python
async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Set up the platform."""
    device = MyDevice(config[CONF_HOST])
    try:
        await device.async_setup()
    except ConnectionError as ex:
        raise PlatformNotReady(f"Connection error while connecting to {device.ipaddr}: {ex}") from ex
```

#### 处理重试的 logging

将错误消息作为第一个参数传递给 `PlatformNotReady`。Home Assistant 会以 `warning` 级别记录一次重试，随后的重试会以 `debug` 级别记录。如果你在抛出 `PlatformNotReady` 时不设置消息，Home Assistant 会尝试从导致 `PlatformNotReady` 的异常中提取原因，前提是该异常是从另一个异常传播而来的。

该 integration 不应记录任何关于重试的非 debug 消息，而应依赖 `PlatformNotReady` 内置的 logic，以避免刷屏日志。

## 处理过期凭据

抛出 `ConfigEntryAuthFailed` 异常，Home Assistant 会自动将 config entry 置为失败状态并启动一个 reauth flow。该异常必须从 `__init__.py` 中的 `async_setup_entry` 抛出，或从 `DataUpdateCoordinator` 抛出，否则将无法有效触发 reauth flow。如果你的 integration 不使用 `DataUpdateCoordinator`，可以调用 `entry.async_start_reauth()` 作为启动 reauth flow 的替代方案。

`reauth` flow 会使用以下 context 变量启动，这些变量在 `async_step_reauth` step 中可用：

- source：始终为 "SOURCE_REAUTH"
- entry_id：需要重新认证的 config entry 的 entry_id
- unique_id：需要重新认证的 config entry 的 unique_id

#### 示例

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the config entry for my device."""
    device = MyDevice(entry.data[CONF_HOST])
    try:
        await device.async_setup()
    except AuthFailed as ex:
        raise ConfigEntryAuthFailed(f"Credentials expired for {device.name}") from ex
    except (asyncio.TimeoutError, TimeoutException) as ex:
        raise ConfigEntryNotReady(f"Timed out while connecting to {device.ipaddr}") from ex
```