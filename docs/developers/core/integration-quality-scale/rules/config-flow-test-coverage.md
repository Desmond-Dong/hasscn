---
title: "配置流程的完整测试覆盖率"
related_rules:
  - config-flow
  - test-before-configure
  - unique-config-entry
  - discovery
  - reauthentication-flow
  - reconfiguration-flow
---
import RelatedRules from './_includes/related_rules.jsx'

## 推理

配置流程是用户与集成发生的第一次交互。
因此，确保配置流程按预期工作、用户能够顺利完成设置、且过程中不会遇到与配置流程相关的问题，至关重要。

这也是为什么我们希望配置流程具备 **100%** 的测试覆盖率。
这些测试还应验证流程能够从错误中恢复，确保即使出现问题，用户仍能完成设置。

由于我们也希望用户在重新配置、重新认证和选项流程中获得流畅体验，因此这条规则同样适用于这些流程。

对集成进行测试还有一个额外好处：它能帮助开发者熟悉测试体系，从而更容易为集成的其他部分编写测试。

:::warning
尽管用于检查配置条目唯一性的代码通常会被快乐路径测试覆盖到，但仍请确保专门测试该流程不会允许添加多个具有相同唯一 ID 的配置条目，以实现完整覆盖。
:::

## 实施示例

我们需要针对配置流的每种启动方式（例如用户发起、发现触发或导入触发）测试以下场景。

下面的示例展示了一个由用户发起的基础快乐路径流程。

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

## 其他资源

有关配置流的更多信息，请参阅 [config flow documentation](/developers/config_entries_config_flow_handler)。
有关集成测试的更多信息，请参阅 [testing documentation](/developers/development_testing)。

## 例外情况

此规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
