使用 [Application Credentials](https://developers.home-assistant.io/docs/core/platform/application_credentials/) 和 [Configuration via OAuth2](https://developers.home-assistant.io/docs/core/integration/config_flow/#configuration-via-oauth2) 的集成需要更新其错误处理，以在网络断开时正确处理配置。

目前，使用 OAuth2 配置的集成在 `__init__.py` 中的 `async_setup_entry` 里调用 `config_entry_oauth2_flow.async_get_config_entry_implementation`。以前在没有网络时，这会抛出 `ValueError: Implementation not available`，这是一个不可重试的错误，导致集成在网络恢复后需要手动重新配置（见 Issue [153956](https://github.com/home-assistant/core/issues/153956) 和 [144582](https://github.com/home-assistant/core/issues/144582)）。[core PR 154579](https://github.com/home-assistant/core/pull/154579) 添加了 `config_entry_oauth2_flow.ImplementationUnavailableError`，并在因缺少网络导致 OAuth2 配置不可用时，在 `config_entry_oauth2_flow.async_get_config_entry_implementation` 中抛出该错误。集成应捕获此错误并抛出 `ConfigEntryNotReady`。
带新异常的行为变更将在 2025.12 中发布。

以下是迁移示例：

```diff
-    implementation = await async_get_config_entry_implementation(hass, entry)
+    try:
+        implementation = await async_get_config_entry_implementation(hass, entry)
+    except ImplementationUnavailableError as err:
+        raise ConfigEntryNotReady(
+            "OAuth2 implementation temporarily unavailable, will retry"
+        ) from err
```

新集成将通过 `python3 -m script.scaffold config_flow_oauth2` 生成正确的 `try` / `except` 块。
