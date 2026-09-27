[Selectors](https://www.home-assistant.io/docs/blueprint/selectors/) 已扩展，现在也包含了 `CountrySelector`。

在[config flows](/developers/data_entry_flow_index.md#show-form)中使用它可以让 frontend 自动将国家代码翻译成正确的国家名称。

示例：

```python
vol.Schema(
    {
        vol.Optional(CONF_COUNTRY): CountrySelector(
            CountrySelectorConfig(
                countries=["DE", "US"],
            )
        ),
    }
)
```
