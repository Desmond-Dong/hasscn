---
title: "在集成初始化期间检查我们是否能够正确设置它"
related_rules:
  - runtime-data
---
import RelatedRules from './_includes/related_rules.jsx'

## 推理

当我们初始化集成时，我们应该检查是否能够正确设置它。
这样我们就可以立即让用户知道它不起作用。

实施这些检查可以增强集成正确运行的信心，并提供一种用户友好的方式来显示错误。
这将改善用户体验。

## 实施示例

当失败原因是暂时性的（例如设备暂时离线）时，我们应抛出 `ConfigEntryNotReady`，Home Assistant 会稍后重试设置该配置条目（config entry）。
如果失败原因是密码错误或 API 密钥无效，我们应抛出 `ConfigEntryAuthFailed`，Home Assistant 会要求用户重新进行身份验证（如果已实现重新认证流程）。
如果我们预期该集成在可预见的未来都无法正常工作，则应抛出 `ConfigEntryError`。

ZZ保护0ZZ:
```python {6-13} showLineNumbers
async def async_setup_entry(hass: HomeAssistant, entry: MyIntegrationConfigEntry) -> bool:
    """Set up my integration from a config entry."""

    client = MyClient(entry.data[CONF_HOST])

    try:
        await client.async_setup()
    except OfflineException as ex:
        raise ConfigEntryNotReady("Device is offline") from ex
    except InvalidAuthException as ex:
        raise ConfigEntryAuthFailed("Invalid authentication") from ex
    except AccountClosedException as ex:
        raise ConfigEntryError("Account closed") from ex

    entry.runtime_data = client

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    return True
```

:::info
请注意，当通过 `await coordinator.async_config_entry_first_refresh()` 使用数据更新协调器时，这也可能会隐式实现。
:::

## 其他资源

有关配置条目（config entry）及其生命周期的更多信息，请参阅 [config entry documentation](/developers/config_entries_index)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
