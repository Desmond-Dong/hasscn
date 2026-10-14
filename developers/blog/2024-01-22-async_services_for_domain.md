在 Home Assistant 2024.2 中，我们将引入 `hass.services.async_services_for_domain()`，这是一种按 domain 枚举 services 的新方式，允许集成检查哪些 services 可用，而无需获取系统中的所有 services。我们发现大多数集成只关心它们自己提供的 services，而在集成只关心自己的 services 时，枚举系统中的所有 services 成本很高。

调用 `hass.services.async_services()[DOMAIN]` 以获取特定 domain 的 services 的集成，应将调用替换为 `hass.services.async_services_for_domain(DOMAIN)`。
