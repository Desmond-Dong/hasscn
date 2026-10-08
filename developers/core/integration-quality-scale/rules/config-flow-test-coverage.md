import RelatedRules from './\_includes/related\_rules.jsx'

## 理由

config flow 是用户与你的集成进行的第一次交互。
确保 config flow 按预期工作，使用户能够毫无问题地（或与 config flow 相关的错误地）完成集成设置，这一点非常重要。

这意味着我们希望对 config flow 达到 **100%** 的测试覆盖率。
在这些测试中，我们要求验证 flow 能够从错误中恢复，以确认即使用户遇到某些问题时也能顺利完成 flow。

为了让用户在使用其他集成 flow 时获得顺畅体验，本规则也适用于 reconfigure、reauthentication 和 options flow。

为集成编写测试的额外好处是，它可以引导开发者接触测试，使其更容易为集成的其他部分编写测试。

:::warning
尽管用于检查 config entry 唯一性的代码很可能会被 happy flow 测试触及，但仍请确保测试 flow 不允许添加超过一个唯一配置条目，以达到完整覆盖率。
:::

## 示例实现

我们需要针对 config flow 可以被触发的每种方式（由用户触发、通过 discovery 触发或通过 import flow 触发）测试以下场景。

下面的示例展示了由用户发起的基本 happy flow。

`test_config_flow.py`:

```python showLineNumbers
async def test_full_flow(
    hass: HomeAssistant,
    mock_my_client: AsyncMock,
    mock_setup_entry: AsyncMock,
) -> None:
    """Test full flow."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN,
        context={"source": SOURCE_USER},
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {CONF_HOST: "10.0.0.131"},
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "My integration"
    assert result["data"] == {
        CONF_HOST: "10.0.0.131",
    }
```

## 附加资源

关于 config flow 的更多信息，请参阅 [config flow 文档](/developers/core/integration/config_flow.md)。
关于集成测试的更多信息，请参阅 [测试文档](/developers/development_testing.md)。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
