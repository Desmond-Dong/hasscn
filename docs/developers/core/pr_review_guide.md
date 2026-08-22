# PR 审查指南

审查 `home-assistant/core` 上 pull requests 的实用指南。

---

## 1. 第一遍检查：门禁检查

在阅读任何代码之前，先验证这些内容。如果有任何失败，发表评论并停止。继续审查会浪费你的时间。

- **CLA 已签署。** 检查是否存在 `cla-signed` 标签。如果存在 `cla-needed`，评论要求贡献者签署，然后跳过。在 CLA 解决之前不要审查代码。
- **CI 是绿的。** 所有检查必须通过。如果 CI 因贡献者的更改而变红，转换为 draft 并要求他们修复。不要审查有问题的代码。
- **PR 有单一目的。** 一个 bugfix、一个 feature、一个 integration 或一个 refactor。如果 PR 混合了关注点（例如，依赖更新同时也重构测试），要求作者拆分。
- **PR 类型复选框与内容匹配。** PR 模板有类型复选框：验证只有一个被勾选且与代码实际内容匹配。
- **不依赖于其他打开的 PR。** 检查是否有指向其他未合并 PR 的引用。依赖 PR 不应提交，直到其依赖项合并。
- **描述有用。** "Proposed change" 部分应解释*为什么*，而不只是*什么*。对于 bugfix，应有链接的 issue。对于新集成，应有品牌/设备的上下文。
- **PR 描述没有未填充的占位符。** 检查是否有空的 Breaking Change 部分、未填充的 `fixes #` 占位符。

### 1.1 分类信号：此 PR 是否可能完成？

早期识别高风险 PR 的信号可以节省审查者的时间。

**高风险指标**（在解决之前考虑优先推迟审查）：

- **首次贡献者的大型 PR。** 首次贡献者的新集成 PR 废弃率最高。如果 PR 是新集成且作者没有先前的已合并 PR，考虑等待 CI 通过并处理初始 bot 反馈后再投入深度审查时间。
- **AI 生成 PR 信号。** 注意那些解决理论而非实际问题的 PR、格式异常完美的描述但代码表现出根本性误解的 PR、在没有相应行为更改的情况下修改 test fixtures 的 PR，或为不可能发生的条件添加防御性代码的 PR。

---

## 2. 新集成 PR（`new-integration`）

这些审查非常密集。quality scale 的 bronze 规则是基准线：每个新集成都必须满足它们。

### 2.1 范围

- **仅限单一 platform。** 初始 PR 应只暴露一个 entity platform（例如，仅 `sensor` 或仅 `switch`）。检查 `__init__.py` 中的 `PLATFORMS` 列表——如果有多于一个条目，要求作者选择一个并将其余推迟。
- **无 diagnostics。** 初始集成 PR 中不应存在 `diagnostics.py`。这是 gold 级别的 quality scale feature，应放在后续 PR 中。
- **无 reconfigure flow。** `config_flow.py` 中的 reconfigure flow（`async_step_reconfigure`）是 gold 级别。要求作者将其删除并单独提交。
- **无 options flow（通常）。** 除非集成确实从一开始就需要用户可配置的 options，否则 options flow 应放在后续 PR 中。
- **无万能集成。** 注意添加所有可能 entity 的 PR。初始 PR 应最小且功能可用。额外的 platforms、entities 和 features 在后续 PR 中添加。

### 2.2 Manifest (`manifest.json`)

- **`iot_class` 正确。** 必须与集成实际的通信方式匹配：`local_polling`、`cloud_push` 等。
- **Library 是开源的。** PyPI 依赖必须公开可用源代码并带有开源 license。检查 repo 链接。
- **License 与 Apache-2.0 兼容。** HA Core 是 Apache-2.0。依赖必须使用兼容 license（MIT、BSD、Apache-2.0、LGPL、MPL-2.0、ISC、Unlicense 均可）。**GPL-2.0、GPL-3.0 和 AGPL 不兼容。**
- **存在 License 元数据。** library 必须在 PyPI 上声明 license。没有 license 的 library 在法律上等于 "all rights reserved"。
- **License identifier 与 LICENSE 文件匹配。** 验证 `pyproject.toml`/`setup.cfg` 中的 `license` 字段与源代码仓库中实际的 LICENSE 文件文本匹配。不匹配表示错误或误导。
- **传递依赖的 license 兼容。** MIT library 引入 GPL-3.0 传递依赖会产生同样的不兼容性。检查完整的依赖树。
- **Library 未废弃或近期未转移。** 检查提交历史和 PyPI maintainer。一个 2+ 年没有活动的 library 突然出现新的 maintainer 值得审查。

### 2.3 质量等级（`quality_scale.yaml`）

- **所有 bronze 规则都已处理。** 每个 bronze rule 都应标记为 `done` 或 `exempt`（附带原因）。不应有 `todo`。
- **Exempt 原因有效。** 如果任何 rule 被标记为 `exempt`，原因应是合理的（例如，"此集成没有 actions" 适用于 `action-setup`）。
- **声称 `done` 的规则确实完成了。** 抽查几个：quality-scale-rule-verifier agent 在此处可以提供帮助。

### 2.4 Config flow

- **`test-before-configure` 已实现。** config flow 必须尝试连接到设备/服务，如果无法连接则以用户友好的错误优雅失败。
- **`unique-config-entry` 防止重复。** flow 应调用 `self._abort_if_unique_id_configured()` 或等效方法来防止添加同一设备两次。
- **Reconfigure 时有建议值。** 如果存在 reconfigure flow（初始 PR 中不应存在，但对于后续 PR）：输入字段应使用 `suggested_value` 预填充当前值。

### 2.5 发现流程（Zeroconf / DHCP / SSDP）

Discovery 配置是反复拉锯的常见来源。

- **Discovery patterns 足够具体。** Zeroconf service types、DHCP hostnames 和 SSDP manufacturers 应只匹配目标设备。过于宽泛的模式（例如，匹配 `duco` 而实际上意味着 `duco [`）会意外声明不相关的设备。问自己："此模式是否可能匹配它不应匹配的内容？"
- **适当位置使用 `raise_on_progress=False`。** 从多个 steps 调用 `async_set_unique_id` 的 flows 需要在 flow source 应优先于 discovery flow 的 steps 中传递 `raise_on_progress=False` 参数。例如，由用户启动的 flow 应始终优先于同一设备 unique id 的 discovery flow。
- **DHCP 作为后备。** 如果集成支持 Zeroconf，考虑是否也应添加 DHCP discovery 作为后备，用于 mDNS 效果不佳的网络。
- **考虑 `registered_devices` 支持。** 对于设备 hostname/IP 可能更改的集成，`registered_devices` 允许重新发现已配置的设备。
- **Manifest discovery entries 与实现匹配。** 如果 `manifest.json` 声明了 `zeroconf`、`dhcp` 或 `ssdp`，请验证 config flow 实际上实现了相应的 `async_step_*` 方法。

### 2.6 协调器与数据获取

- **使用 `DataUpdateCoordinator` 进行轮询。** 轮询集成不应实现自己的轮询循环。例外情况是集成使用[每个 individual entity 的单独轮询](/developers/integration_fetching_data#separate-polling-for-each-individual-entity)。
- **一次性工作用 `_async_setup`，轮询用 `_async_update_data`。** 一次性设置工作（认证、连接设置、初始设备信息获取）属于 `_async_setup`。`_async_update_data` 方法在每次 poll cycle 运行——不要在这里放入设置逻辑。
- **认证错误使用 `ConfigEntryAuthFailed`。** 当 API 在数据更新期间返回 auth 错误时，coordinator 必须抛出 `ConfigEntryAuthFailed`（而不是 `UpdateFailed`）。这将触发 reauth flow 而不是只是记录错误并永远重试。要让 reauth flow 实际启动，集成必须已实现 `async_step_reauth` 方法；没有它，entry 只是保持在失败状态。
- **Coordinator 数据已正确类型化。** coordinator 应使用 generics（`DataUpdateCoordinator[MyDataType]`），以便 entity 代码获得类型检查对 coordinator 数据的访问。
- **轮询频率合理。** 检查 `update_interval`：对设备/服务是否合适？天气 API 不需要 10 秒轮询。本地设备可能需要更快的更新。

### 2.7 Entities

- **稳定的 `unique_id`。** Entity unique IDs 不得使用 IP addresses、hostnames 或任何可能更改的内容。优先使用 MAC addresses（使用 `format_mac()` 规范化）、序列号或设备分配 ID。
- **MAC addresses 已规范化。** 如果 MAC address 用作 unique ID 或在 device info 中，必须通过 `homeassistant.helpers.device_registry` 的 `format_mac()` 处理。
- **使用 Entity description。** 新 entity 应使用基于 dataclass 的 [entity description](/developers/core/entity#entity-description)（如 `SensorEntityDescription`）来定义。链接文档中描述的其他模式也被接受，但在新代码中优先使用 entity description 模式。
- **设置 `PARALLEL_UPDATES`。** 对于基于 coordinator 的集成，在每个 platform 模块中设置 `PARALLEL_UPDATES = 0`（因为 coordinator 处理同步）。
- **Entity categories 正确。** 请参阅第 8 节获取详细的 `EntityCategory` 指导：这是最常见的审查模式之一。
- **Debug entities 默认禁用。** 用于调试目的的 entities（信号强度、rate limits、固件版本）应设置 `entity_registry_enabled_default=False`。

### 2.8 Strings & translations

- **所有面向用户的字符串在 `strings.json` 中。** Python 代码中不得有硬编码的英文字符串。
- **Sentence case。** `strings.json` 中所有 string 值必须使用 sentence case（不是 Title Case，不是 ALL CAPS）。
- **适用时使用 Common translation keys。** 如果字符串匹配现有的 common key（如通用名称 "Temperature"、"Humidity"），引用 common key 而不是定义新的。
- **代码样式的字面量用反引号包围。** Translatable strings 渲染为 markdown，因此用反引号包围代码样式的字面量（entity IDs、action 名称、文件名、状态值）。协议和品牌名称不加反引号；按其官方大小写书写（如 MQTT、Z-Wave、Zigbee）。
- **Integration name 不在 log messages 中。** Integration domain 已经是 logger name 的一部分——不要在消息文本中重复。

---

## 3. 新功能 PR（`new-feature`）

向现有集成添加功能。

### 3.1 范围与兼容性

- **范围适当。** feature 应该是单一、连贯的添加。一次添加三个新的 entity platforms 太多了——拆分开。
- **与现有集成风格一致。** 新代码应遵循集成中已建立的约定（命名、结构、模式）。
- **维持 quality scale 级别。** 如果集成有 quality scale 级别，新代码不得使其回退。检查新 entity 是否遵循所有适用规则。
- **新字符串遵循 translation 规则。** 与新集成相同的规则：`strings.json`、sentence case、common keys。
- **Breaking changes 已记录。** 如果 feature 更改了现有行为（重命名 entities、更改状态值格式、修改 service schemas），PR 描述必须包含为最终用户编写的 "Breaking change" 部分。什么算 "breaking" 需要理解用户可见的契约：这是 AI reviewer 持续搞错的人类判断。

### 3.2 Config entry lifecycle

- **Schema 更改时进行 config entry migration。** 如果 feature 更改了存储在 config entry 中的内容，必须有 migration：在 config flow 类中 bump `VERSION`，实现 `async_migrate_entry`，并添加涵盖从旧格式到新格式的迁移的测试。
- **VERSION bump 与 schema 更改匹配。** 如果 config entry 数据字段被添加、删除或重组，且 config flow `VERSION` 没有被 bump，标记它。反之，如果 `VERSION` 被 bump，则应有相应的迁移代码。
- **`async_unload_entry` 清理所有资源。** 当 config entry 被卸载时，所有 event listeners、polling tasks 和 connections 都应被清理。缺少清理会导致资源泄漏和 stale 状态。
- **设置失败后不访问 `runtime_data`。** 如果 `async_setup_entry` 中途失败，错误处理程序中的代码不应尝试访问 `entry.runtime_data`：它可能尚未被设置。

### 3.3 发现与设备注册

- **需要时更新 Discovery patterns。** 如果 feature 添加了对新设备型号的支持，检查 `manifest.json` discovery entries（Zeroconf、DHCP、SSDP）是否需要扩展。
- **Device info 完整。** 新 entity 应包含完整的 `DeviceInfo`，在可用时包含 manufacturer、model、serial number 和 firmware version。

---

## 4. Bugfix PRs (`bugfix`)

Bugfix 虽然概念上比其他更改更简单，但生成的审查评论却很多——因为审查者会仔细审视修复是否真正正确且完整。

- **存在关联的 issue。** Bugfix PR 应引用它们修复的 issue（`fixes #XXXX`）。如果没有 issue，询问原因：应确认 bug 确实存在。
- **修复最小化。** 更改应只修复报告的 bug，不做其他改动。没有顺手重构，没有"顺便修一下"的改进。
- **根本原因已解决。** 修复应解决实际原因，而不是掩盖症状。如果 `TypeError` 崩溃是因为 `value` 为 `None`，修复应在适当层级处理 `None`，而不仅仅是在 `try/except` 中包装所有内容。
- **包含回归测试。** 最好有一个本应捕获此 bug 的测试。该测试在没有修复时应失败，有修复时应通过。并非所有集成都需要测试，但具有测试的现有集成应始终维持测试覆盖。
- **无无关的测试更改。** 测试重构（snapshot 更新、parametrize 重写）不应混入 bugfix PR 中。

### 4.1 Bugfix 中的错误处理

- **`HomeAssistantError` 从 service/action handlers 传播。** 当 service handler 捕获来自底层 library 的异常时，应重新抛出为 `HomeAssistantError`（或像 `ServiceValidationError` 这样的子类），以便错误通过 UI 到达用户。在 service handler 中静默吞没异常是一种常见的 bug 模式。
- **错误具体性。** 添加错误处理的 bugfix 应捕获特定的异常类型，而不是宽泛的 `except Exception`。请参阅第 10 节了解详情。
- **认证相关的 bugfix 使用 `ConfigEntryAuthFailed`。** 如果 bugfix 处理 coordinator 中的认证问题，请验证它抛出 `ConfigEntryAuthFailed`（而不是 `UpdateFailed`）以触发 reauth flow。

---

## 5. 代码质量 PR（`code-quality`）

通常由 quality-scale 改进驱动。

- **改进是真实的。** 更改应使代码可测量地更好（更易读、更快、更易维护），而不仅仅是不同。
- **无行为变更。** Code quality PR 不应更改功能。如果更改了，应以不同方式标记。
- **测试已更新以匹配。** 如果代码结构更改，测试应相应更新——但测试重构应与代码更改匹配，不应超出。
- **Breaking changes 已注明。** 即使 code-quality PR 也可能是 breaking 的（例如，删除已弃用的常量）。如适用，必须填写 "Breaking change" 部分。
- **已验证 quality scale 声明。** 验证所有声称的规则确实满足：quality-scale-rule-verifier agent 可以自动化此操作。

---

## 6. 依赖更新 PR（`dependency`）

与 new-integration PR 相比，Dependency PR 生成的审查评论较少，但出现的模式很具体，更大的担忧是在更新依赖时的安全风险。

### 6.1 范围与结构

- **仅更新依赖。** PR 应触及 `manifest.json`（version bump）以及跟踪依赖的 requirements 文件（如重新生成的 `requirements_all.txt`），以及新版本所需的最少代码更改。仅此而已。
- **无顺手重构。** 如果贡献者还重构了测试、清理了 imports 或做了样式更改——要求他们将其拆分为单独的 PR。
- **`quality_scale` 未被意外移除。** 检查 `manifest.json` 是否丢失了 `quality_scale` 或 `loggers` 字段：这在依赖更新中出人意料地经常发生。

### 6.2 上游更改审查

- **Changelog/release notes 已链接。** PR 描述应包含指向 library changelog 或版本间 diff 的链接，以便审查者能看到上游更改了什么。
- **Breaking library 更改已处理。** 如果上游 library 做了 breaking changes，验证集成代码正确适应。
- **已审查 Upstream diff 的安全隐患。** 检查 library 在旧版本和新版本之间实际更改了什么。查找：新的网络调用、新的 `requests`/`aiohttp`/`socket`/`subprocess`/`os.system` imports 或调用、新的环境变量访问、预期路径之外的新文件 I/O。
- **无新的传递依赖。** 如果 library 版本添加了新的传递依赖，应明确提及。新的传递依赖是最常见的供应链攻击向量。
- **PyPI maintainer 未更改。** 如果 library 的 PyPI maintainer 在版本之间发生了变化，这是一个重要的信任事件（可能的账户接管）。标记以仔细检查。
- **Source repo 未移动或未归档。** 验证 library 仍然具有相同的公共 source repository。版本之间的 repo 转移、归档或删除是危险信号。

### 6.3 许可证合规

- **版本之间 license 未更改。** 版本之间的 license 更改（如 MIT → GPL-3.0）将是关键问题。比较 PyPI 上两个版本的 `license` 字段。
- **License 仍与 Apache-2.0 兼容。** 与新集成相同的规则：GPL-2.0/3.0/AGPL 与 HA Core 的 Apache-2.0 license 不兼容。
- **License identifier 仍与 LICENSE 文件匹配。** 验证声明的 license identifier 与实际 LICENSE 文本匹配：每次更新都应重新验证，而不仅仅是首次引入时。

---

## 7. 测试审查（所有 PR 类型）

### 7.1 结构

- **测试在正确位置。** Integration tests 应放在 `tests/components/<domain>/` 中。
- **所有测试函数参数都有类型注释。** 使用具体类型（`HomeAssistant`、`MockConfigEntry`），不要使用 `Any`。
- **测试练习 HA 的公共接口。** Integration 行为测试应通过 `async_setup_component()` 或 `hass.config_entries.async_setup()` 设置集成，通过 `hass.states` 断言状态，并通过 `hass.services` 触发 actions。它们不应直接实例化集成类或调用内部方法。针对隔离的 helpers 和 utilities 或纯逻辑的聚焦 unit tests 在该边界确实是预期边界时可以直接调用这些方法。

### 7.2 模式

- **实体 platform 使用 Snapshot testing。** Platform 测试（sensor、switch 等）应使用 `snapshot_platform` 验证 entity 状态，而不是手动断言各个属性。
- **`@pytest.mark.parametrize` 用于重复案例。** 如果多个测试函数使用不同输入测试相同行为，应将它们参数化为一个函数。但不要过度参数化：一个场景的单个测试不需要 parametrize。
- **时间测试使用 `freezer`。** 涉及时间的测试必须使用 `freezer` fixture——绝不能直接 mock `datetime`、`time` 或 `utcnow`。
- **不要在 `sys.modules` 上使用 `mock.patch`。** 这是脆弱的且会破坏其他测试。使用适当的 mocking patterns。
- **Config flow 测试有完整覆盖。** config flow 中的每个分支都应被测试：happy path、错误处理、用户中止、每个 step。测试 step 错误的测试应继续 flow 以创建 entry 结果以显示错误恢复。早期审查 config flow 测试通常是快速发现其余代码中 bug 的好方法。
- **错误/恢复场景已测试。** 测试应覆盖设备/服务不可用、返回错误或需要重新认证时会发生什么。这是最常被请求的缺失测试类型。
- **测试脆弱性最小化。** 避免硬编码依赖上游数据的值（如特定节假日）。使用 mocking 或选择稳定的测试数据，这样依赖更新时不会更改。

### 7.3 Mocking

- **Mock library，而不是 HA 内部。** Mocks 应针对第三方 library 的 API 调用，而不是 Home Assistant 的内部机制。例如，mock 集成调用的 client methods（或在 `conftest.py` 中 patch client class），而不是 patch `DataUpdateCoordinator`、`hass` helpers 或 entity 内部。Mock HA 内部会使测试变脆弱并停止测试真实的集成 wiring。
- **Fixtures 在 `conftest.py` 中。** 共享测试 fixtures（mock client、config entry 设置）应放在集成的 `conftest.py` 中，而不是在测试文件中重复。

---

## 8. 实体模式（所有 PR 类型）

Entity 相关的反馈占审查者注意力的主导地位。本节适用于添加或修改 entity 的所有 PR。

### 8.1 `EntityCategory` 分类

贡献者经常错误分类 entity。规则：

**决策树：**

1. 用户是否希望此 entity 出现在主 dashboard 上？→ **无 category**（默认）
2. 它是否是控制集成行为的设置？（模式、阈值、开关）→ **`EntityCategory.CONFIG`**
3. 它是否是 debug/diagnostic 信息？（固件版本、信号强度、rate limits、IP 地址、MAC 地址）或者是设备类为 IDENTIFY 的特定 button entity → **`EntityCategory.DIAGNOSTIC`**

标记为 `CONFIG` 或 `DIAGNOSTIC` 的 entity 会从默认 dashboards 中隐藏并排除在 voice assistants 之外。

- **Diagnostic entities 标记为 `EntityCategory.DIAGNOSTIC`。** 用于调试的 entity——信号强度、rate limits、固件版本、连接统计、错误计数——必须是 `EntityCategory.DIAGNOSTIC`。
- **Config entities 标记为 `EntityCategory.CONFIG`。** 重置按钮、模式选择器、配置开关、阈值设置——任何控制集成或设备如何运行的都必须是 `EntityCategory.CONFIG`。
- **Debug/diagnostic entities 默认禁用。** 除了 `EntityCategory.DIAGNOSTIC` 外，纯粹用于调试的 entity 应设置 `entity_registry_enabled_default=False`。
- **主要功能 entity 无 category。** 用户交互的主要 entity（thermostat 温度、switch 状态、light 亮度）应**没有** `EntityCategory`。不要过度分类。

### 8.2 可用性与 `None` 处理

这是审查者需要理解的最重要模式之一——也是 AI 最难正确处理的一个。

**核心区别：**

- **`native_value` 返回 `None`** = entity 可用，但当前值未知 → entity 在 UI 中显示 "unknown"
- **`_attr_available = False`** = 设备/服务不可达 → entity 在 UI 中显示 "unavailable"

这是非常不同的用户体验。搞错意味着要么显示错误的数据，要么隐藏真实的故障。

- **`None` 不被类型转换隐藏。** `bool(None)` 返回 `False`，这会隐藏数据缺失的事实。`int(None)` 抛出 `TypeError`。当 API 的值可能为 `None` 时，entity property 应返回 `None`（或 `bool | None`），而不是将其转换为具体值。
- **不可用信号正确。** 当设备无响应或 API 失败时，entity 应变得不可用（`_attr_available = False`），而不是显示 stale 数据。检查 coordinator 错误处理：失败的更新是否将 entity 标记为不可用？
- **`None` 返回是有意为之，而非偶然。** 如果 `native_value` 可以返回 `None`，请验证这是预期行为。有时 `None` 意味着 "API 未包含此字段"，此时 entity 应该是不可用的。

### 8.3 额外状态属性与独立实体

HA 项目正在积极迁移 away 从 `extra_state_attributes`。审查者一致推动将 attributes 拆分为单独的 entity。

- **Extra state attributes 是有理由的。** 如果 PR 使用 `extra_state_attributes`，询问每个属性是否应该成为自己的 entity。问题是："此数据是否独立有用？用户是否希望专门基于它进行自动化？"如果为是，它应该是单独的 entity。
- **不再添加新的 `extra_state_attributes`。** 在新代码中，优先使用单独的 entity 而不是 extra attributes。唯一的例外是真正仅在 parent entity 上下文中才有意义的辅助数据。

### 8.4 乐观状态更新

- **Optimistic 更新是合适的。** 当 entity 发送命令（打开 switch、设置温度）时，它应该立即更新其状态（optimistic）还是等待下一次 poll/push 确认？这取决于：
  - 设备是否可靠地回传状态？
  - poll cycle 有多快？
  - 延迟的 UI 反馈是否可接受？

  没有普遍正确的答案。具有快速 push 更新的本地设备通常不需要 optimistic 更新。轮询慢的 cloud-controlled 设备通常需要。

### 8.5 Device class & state class

- **适用的情况下设置 Device class 且正确。** Sensor、binary sensor 和其他 typed entities 在适用时应具有适当的 `device_class`。这决定了 UI 图标、单位处理和图表渲染。`device_class` 是可选的——当没有 class 匹配时省略它。
- **支持统计的数值 sensor 设置 State class。** 其值符合长期统计资格的数值 sensor 应设置 `state_class`（`MEASUREMENT`、`TOTAL`、`TOTAL_INCREASING`）。某些 device classes（如 `date`、`timestamp`、`enum`）不符合资格，不应设置 `state_class`。

---

## 9. 代码风格与模式（所有 PR 类型）

### 9.1 架构

- **常量在 `const.py` 中，从那里导入。** 在多个模块之间共享的集成常量（`CONF_*`、`DOMAIN`、entity keys）应放在 `const.py` 中并从那里导入——而不是从 `__init__.py` 或其他 re-exporting 模块导入。如果常量只在单个模块中使用，它应保留在那里。应该是常量 magic strings 应被提取出来。
- **提前返回 / guard clauses。** 优先使用 `if not condition: return` 而不是将整个函数体包裹在 `if condition:` 中。避免深层嵌套。
- **验证后直接使用 dict 访问。** 当验证保证 key 存在时，使用 `data["key"]` 而不是 `data.get("key")`。契约违规应被暴露，而不是静默掩盖。
- **不在 service actions 上添加不必要的防御性检查。** HA 的 service/action schemas 已经验证输入。不要为 schema 验证过的字段添加冗余检查。
- **集成目录中没有 `.gitignore` 文件。** 这些偶尔会从贡献者的本地仓库中混入。
- **使用 dataclasses 处理结构化数据。** 当传递多个相关值时，使用 dataclass 而不是 tuple、dict 或单独的变量。

### 9.2 错误处理

- **Service/action handlers 中使用 `HomeAssistantError`。** 捕获 library 异常的 service handler 必须重新抛出为 `HomeAssistantError`（或 `ServiceValidationError`），以便错误通过 UI 传播给用户。静默吞没异常意味着用户在 action 失败时看不到任何反馈。
- **Narrow exception handling。** `except Exception:` 捕获包括编程错误在内的一切。只捕获预期的 connection/API 异常。
- **Narrow try blocks。** 只将可能抛出你要捕获的异常的语句保留在 `try` block 中。宽 try blocks 使调试更困难，因为可能捕获到错误的行。
- **`async_unload_entry` 完整。** 当 config entry 被卸载时，所有 event listeners、timers 和 connections 必须被清理。检查在 `async_setup_entry` 中创建的一切是否有相应的 teardown。
- **关机时关闭连接。** 当 Home Assistant 停止时，连接应该被关闭。监听 `EVENT_HOMEASSISTANT_STOP` 事件来调度清理。Home Assistant 进程终止时内存会自动释放。

### 9.3 字符串与日志

- **Log messages 中没有 integration domain。** Logger 已经包含 domain。
- **所有面向用户的字符串使用 sentence case。** 包括 entity names、config flow labels、错误消息。
- **正确的 log levels。** 用户应采取操作的事项用 `_LOGGER.error`，降级但仍能功能运行的状态用 `_LOGGER.warning`，开发者 diagnostics 用 `_LOGGER.debug`。不要用 `error` 处理预期条件，如 "device offline"。

### 9.4 属性与状态

- **`@property` vs attributes 用于值。** 考虑 property 还是 instance attribute 是正确的选择。如果值每次访问时都需要从其他数据计算，使用 `@property` 而不是将其存储为 instance variable。但检查值是否计算昂贵——如果是，考虑缓存它。如果不需要计算，或者我们可以用单个方法计算并且计算的需求是由方法驱动的而不是由我们访问值驱动的，则使用 instance attribute。大多数 `Entity` 状态属性都有 `_attr_` 前缀的 attributes，推荐直接实现 property。不要在同一位置存储相同的值。
- **Entity `native_value` 返回正确的类型。** 当值真正未知时返回 `None`。不要返回掩盖未知状态的默认值（0、`False`、`""`）。请参阅第 8.2 节。

---

## 10. 常见陷阱与令人困惑的 API

这些模式代表了贡献者（和自动化审查者）持续出错的地方。

### 10.1 类型转换陷阱

Python 的 truthiness 规则是 HA 集成中常见的 bug 来源：

| Expression | Result | Problem |
| ---------- | ------ | ------- |
| `bool(None)` | `False` | 隐藏缺失数据：entity 显示 "off" 而不是 "unknown/unavailable" |
| `bool("0")` | `True` | 非空字符串是 truthy：entity 在值为 "0" 时显示 "on" |
| `bool(0)` | `False` | 正确，但如果 API 更改为返回 `"0"` 则脆弱 |
| `int(None)` | `TypeError` | 崩溃而不是返回 `None` |
| `float("nan")` | `nan` | `nan != nan` 为 `True`，静默破坏比较 |

- **不在 value 可能为 `None` 的地方使用 `bool(value)`。** 使用显式比较：`value is not None`、`value == "1"`，或返回 `bool | None` 并让 entity framework 处理它。
- **不在 value 可能为 `None` 的地方使用 `int(value)` 或 `float(value)`。** 改为返回 `None` 或在转换前检查。
- **String-to-bool 转换是显式的。** 如果 API 返回 `"0"`/`"1"` 或 `"true"`/`"false"`，显式转换（`value == "1"`）而不是依赖 Python truthiness。

### 10.2 生产代码中的 `assert`

Python 的 `assert` 语句在 Python 使用 `-O`（optimize）运行时被剥离。对运行时验证使用 `if not condition: raise ValueError(...)` 或类似方式。`assert` 仅用于测试或类型提示。

- **测试文件中的 `assert`。** 测试使用 `assert` 语句验证测试在那一时刻的状态。
- **用于类型提示的 `assert`。** 有时可能需要 `assert` 语句向类型检查器解释类型。只有当调整类型注释以取得相同结果很繁琐或不可能时才使用它。始终将此类语句包裹在 `if TYPE_CHECKING:` 条件中。

### 10.3 协调器生命周期混淆

`DataUpdateCoordinator` 有两个看起来相似但用途不同的方法：

| Method | 何时运行 | 用途 |
| ------ | ------------ | ------- |
| `_async_setup` | **一次**，在 coordinator 初始化时 | 认证、连接设置、获取设备信息、初始状态 |
| `_async_update_data` | **每次 poll cycle**（例如，每 30 秒） | 从设备/API 获取当前状态/数据 |

将设置逻辑放入 `_async_update_data` 意味着它会在每次 poll 时运行——浪费资源并可能导致 auth token 刷新或连接重新建立。

- **一次性设置在 `_async_setup` 中。** 如果你在 `_async_update_data` 中看到连接建立、auth token 获取或设备信息获取，应将其移动到 `_async_setup`。

### 10.4 `ConfigEntryAuthFailed` vs `UpdateFailed`

coordinator 中最常被混淆的错误类型：

| Exception | 效果 | 何时使用 |
|-----------|--------|-------------|
| `ConfigEntryAuthFailed` | 触发 **reauth flow**：用户被提示重新认证 | API 返回 401/403、token 过期、凭据无效 |
| `UpdateFailed` | 记录错误，**下次 poll 时重试** | 临时网络故障、API 超时、rate limiting |

对 auth 错误使用 `UpdateFailed` 意味着集成会永远用错误的凭据重试，而不是提示用户修复它们。

- **Auth 错误抛出 `ConfigEntryAuthFailed`。** 在 `_async_update_data` 中，任何捕获认证相关异常的 `except` block（401、403、`InvalidToken`、`AuthenticationError`）应抛出 `ConfigEntryAuthFailed`，而不是 `UpdateFailed`。要允许用户重新认证，集成还需要实现 `async_step_reauth` 方法。

### 10.5 `HomeAssistantError` propagation

集成中的 service/action handlers 必须将错误传播给用户。如果 service 调用（`turn_on`、`set_temperature`、custom actions）捕获了 library 异常，应重新抛出为 `HomeAssistantError` 以便错误出现在 UI 中。

```python
# 错误 — 用户看不到任何反馈
async def async_turn_on(self, **kwargs):
    try:
        await self.device.turn_on()
    except DeviceError:
        _LOGGER.error("Failed to turn on")  # 仅在日志中，用户看不到

# 正确 — 错误到达用户
async def async_turn_on(self, **kwargs):
    try:
        await self.device.turn_on()
    except DeviceError as err:
        raise HomeAssistantError(f"Failed to turn on: {err}") from err
```

- **Service handlers 传播 `HomeAssistantError`。** 检查 service/action handlers 是否没有静默吞没异常。错误应到达用户。确保避免重复错误日志记录。传递给抛出的 `HomeAssistantError` 的参数应包含错误消息，该消息默认会被记录。不要单独记录此错误消息。

---

## 11. Git 与 PR 卫生

- **Commits 讲述故事。** 每个 commit 应是一个逻辑单元。审查者应能跟踪进展。
- **打开后不 amend/squash/rebase。** 根据 repo 政策："不要 amend、squash 或 rebase 已经在 PR review 开始后推送到 PR 分支的 commits。" 从 `dev` 拉取最新更改的 merge commits 没问题。
- **从 base branch unclean merge 或 rebase 后没有无关 commits。** 如果 PR 包含来自 `dev` 的无关 commits，git history 已损坏。要求作者创建干净的分支并打开新的 PR。
- **没有注释掉的代码。** Dead code 应被删除，而不是注释。

---

## 12. 审查者工作流程

审查 PR 的建议顺序：

1. **Gate checks**（第 1 节）：如果 CLA 缺失、CI 是红的或 PR 显示高风险 triage 信号，在此停止。
2. **Scope 检查**（第 2.1 节 / 特定类型章节）：此 PR 是否在做一件事？
3. **Manifest & 元数据**（第 2.2-2.3 节）：快速结构检查。
4. **Config flow 测试**（第 7.2 节）：早期审查 config flow 测试通常能很快暴露其余代码中的问题。
5. **Entity patterns**（第 8 节）：Entity categories 正确？Availability 处理得当？无 type casting traps？
6. **剩余测试审查**（第 7 节）：测试是否真的测试了重要内容？使用了 snapshot？覆盖了错误场景？
7. **代码审查**（第 9-10 节）：架构、模式、风格、常见陷阱。
8. **Strings & translations**（第 2.8 节）：快速浏览 `strings.json`。
9. **整体评估**：批准、请求更改或评论。

**请求更改时：** 具体说明需要更改什么及原因。尽可能链接到文档。如果 PR 需要重大返工，明确说明，而不是留下许多加起来等于"推倒重来"的 inline comments。

---

*此指南基于对 home-assistant/core 中 1,100+ PR 和 8,200+ 审查评论的分析，以及官方开发者文档和仓库约定。数据收集于 2026 年 4 月。在 AI 生成后经过人工策展。*
