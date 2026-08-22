---
author: Erwin Douna
authorURL: https://github.com/erwindouna
authorImageURL: https://avatars.githubusercontent.com/u/5011203?s=96&v=4
title: "OAuth 2.0 helper 错误处理的变更"
---

## 变更摘要

自 `2026.3` 起，我们正在增强 OAuth 2.0 helper 处理 token request 和 refresh token 失败的方式。此变更使错误处理更加健壮，不再依赖于 aiohttp 库，并帮助使用 [Data Update Coordinator](https://developers.home-assistant.io/docs/integration_fetching_data/#coordinated-single-api-poll-for-data-for-all-entities) 的集成自动触发正确的错误处理。

## 有哪些变更

当 OAuth 2.0 token request 或 token refresh 失败时，Home Assistant 会允许底层的 `aiohttp.ClientResponseError` 直接传播到集成。此行为正在变更和增强。

我们引入了三个新的异常，提供 clearer 的语义：
- `OAuth2TokenRequestTransientError` - 可恢复的错误，可以重试。
- `OAuth2TokenRequestReauthError` - 不可恢复的错误，需要重新认证。
- `OAuth2TokenRequestError` - 当上述两个条件都不满足时的基类异常，或允许集成捕获所有 token request 异常。

### Data Update Coordinator

大多数使用 OAuth 2.0 helper 的集成，也使用 Data Update Coordinator。当 token request 或 refresh token 失败时，异常将在 Data Update Coordinator 中冒泡，并触发以下错误处理：

对于不可恢复的错误（400+，除 429（rate limit）外）：

- `OAuth2TokenRequestReauthError`：Data Update Coordinator 会在需要抛出异常时抛出 `ConfigEntryAuthFailed`，或启动重新认证 flow。

对于 transient 错误（500+ 和 429）：

- `OAuth2TokenRequestTransientError`：Data Update Coordinator 将其视为 `UpdateFailed`，并触发 retry 机制。

这意味着使用 OAuth 2.0 helper 结合 Data Update Coordinator 的集成不需要对这些新异常做任何特殊处理。

### 迁移

目前使用 OAuth 2.0 helper 且明确处理 `aiohttp.ClientResponseError` 的集成应调整其错误处理，以应对新异常。为便于过渡，我们添加了一个兼容层，让新的 OAuth 异常继承自 `aiohttp.ClientResponseError`。捕获此异常类型的现有代码应该继续正常工作。但建议重构代码以使用新异常。详情请参阅代码示例。

#### 迁移代码示例

更新异常处理，然后继续判断是否为（不可）恢复错误。例如：

```python
    try:
        await auth.async_get_access_token()
    except OAuth2TokenRequestReauthError as err:
        raise ConfigEntryAuthFailed(
            translation_domain=DOMAIN, translation_key="reauth_required"
        ) from err
    except (OAuth2TokenRequestError, ClientError) as err:
        raise ConfigEntryNotReady(
            translation_domain=DOMAIN, translation_key="auth_server_error"
        ) from err
```