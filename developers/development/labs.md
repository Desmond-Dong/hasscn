Home Assistant Labs 提供了一种标准化的方式来发布预览功能，用户可以在其成为标准功能之前选择加入。本指南说明如何将新的预览功能添加到 Labs。

## 什么是 Labs 预览功能？

Labs 预览功能是已经过充分测试且功能完整的特性，其用户界面和设计理念正在通过真实使用场景和反馈进行打磨，之后才会成为 Home Assistant 的标准功能。这些功能的特点如下：

* **可选**: 默认禁用，用户必须显式启用
* **充分测试**: 生产就绪的代码，而非实验性或不完整的实现
* **可能变更**: 根据反馈，可能存在 breaking changes、扩展新功能或被移除
* **可逆**: 随时可以禁用，无需重启

Labs 的目的在于打磨用户界面和设计理念，而不是测试 bug。这与 beta 测试不同，beta 测试评估的是即将发布的 Home Assistant 版本的稳定性。

## 何时使用 Labs

Labs 适用于以下场景：

* 重大的 UI 变更或重新设计
* 重大的架构性变更
* 用户反馈将影响最终设计和实现的功能

Labs **不适用于**以下场景：

* 应作为标准功能的配置选项（应改用 integration options 或 config flow）
* 可以直接进入发布的微小变更
* 无法在运行时切换的功能
* 存在关键 bug 或本质上不完整的功能（这些应保持在开发阶段）

## 添加 Labs 预览功能

### 1. 在 manifest.json 中定义功能

在集成的 `manifest.json` 中，将功能添加到 `preview_features` 部分：

```json
{
  "domain": "my_integration",
  "name": "My Integration",
  "preview_features": {
    "my_preview_feature": {
      "feedback_url": "https://community.home-assistant.io/t/...",
      "learn_more_url": "https://www.home-assistant.io/integrations/my_integration",
      "report_issue_url": "https://github.com/home-assistant/core/issues/new?template=bug_report.yml"
    }
  }
}
```

**字段说明：**

* `feedback_url`: 指向社区论坛主题、反馈表单或讨论的链接，用于收集反馈
* `learn_more_url`: 指向有关该功能的文档的链接
* `report_issue_url`: 指向 GitHub issues 的链接，用于提交 bug 报告

所有字段都是可选的，但强烈建议提供，以便帮助用户反馈问题并报告 issue。

### 2. 添加翻译

在集成的 `strings.json` 中添加翻译：

```json
{
  "preview_features": {
    "my_preview_feature": {
      "name": "My preview feature",
      "description": "Enables the new preview feature that does X, Y, and Z.\n\nThis feature is stable but may change based on user feedback."
    }
  }
}
```

描述的编写指南：

* 清楚地说明该功能的作用
* 保持简洁但富有信息量
* 提及该功能集是否可能在未来版本中扩展
* 可以使用 Markdown 格式（粗体、链接等）

#### 自定义确认消息（可选）

可以自定义用户在启用或禁用功能时看到的确认消息。如果你的功能有特定行为或后果需要让用户了解，这会非常有用：

```json
{
  "preview_features": {
    "my_preview_feature": {
      "name": "My preview feature",
      "description": "Enables the new preview feature that does X, Y, and Z.\n\n**Note:** Enabling this feature will migrate your configuration to a new format. The configuration will remain in the new format even if you disable the feature later.\n\nThis feature is stable but may change based on user feedback.",
      "enable_confirmation": "This will migrate your existing configuration to the new format. You can disable the feature later, but the configuration will remain migrated.",
      "disable_confirmation": "This will stop the new behavior, but your configuration will remain in the migrated format."
    }
  }
}
```

**何时使用自定义确认消息：**

* 你的功能会进行持久化更改（迁移、新实体等）
* 用户需要了解特定的后果
* 该功能以不直观的方式与其他系统交互
* 希望明确用户对启用/禁用行为的预期

**指南：**

* **在描述中包含重要后果**：用户应该能通过阅读描述来理解会发生什么，而不仅仅依靠确认消息
* 使用确认消息在用户执行操作的那一刻提醒他们关键点
* 明确说明启用/禁用时会发生什么
* 保持消息简洁但富有信息量
* 不要重复通用信息（用户已经能看到标准警告）

### 3. 实现功能

#### 后端功能

对于后端功能，在代码中检查 flag：

```python
from homeassistant.components.labs import async_is_preview_feature_enabled
from homeassistant.core import HomeAssistant

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the integration."""
    if async_is_preview_feature_enabled(hass, DOMAIN, "my_preview_feature"):
        # Enable preview functionality
        await setup_preview_feature(hass)

    # Standard setup continues
    return True
```

#### 前端功能

对于前端功能，在 TypeScript 中检查 flag：

```typescript
import { fetchLabFeatures } from "../../../data/labs";

const features = await fetchLabFeatures(this.hass);
const featureEnabled = features.find(
  (f) => f.domain === "my_integration" && f.preview_feature === "my_preview_feature"
)?.enabled;

if (featureEnabled) {
  // Load preview UI component
}
```

#### 响应功能切换

使用 `async_subscribe_preview_feature()` 辅助函数来订阅功能切换事件。监听器会接收事件数据作为参数，并支持 async coroutine 函数：

```python
from homeassistant.components.labs import (
    EventLabsUpdatedData,
    async_subscribe_preview_feature,
)
from homeassistant.core import HomeAssistant

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the integration."""

    async def _async_update_my_preview_feature(
        event_data: EventLabsUpdatedData,
    ) -> None:
        """Enable or disable the preview feature based on current state."""
        if event_data["enabled"]:
            # Enable feature
            await async_enable_my_feature(hass)
        else:
            # Disable feature
            await async_disable_my_feature(hass)

    # Subscribe to changes for this specific feature
    entry.async_on_unload(
        async_subscribe_preview_feature(
            hass,
            DOMAIN,
            "my_preview_feature",
            _async_update_my_preview_feature,
        )
    )

    return True
```

`async_subscribe_preview_feature()` 辅助函数会自动过滤针对你的 domain 和 feature 的事件，并将事件数据（包括 `enabled` 状态）直接传递给监听器。

:::info
对于更复杂的场景或多个预览功能，仍然可以直接使用较低层级的 `EVENT_LABS_UPDATED` 事件。`async_subscribe_preview_feature()` 辅助函数适用于大多数用例，因为它减少了样板代码并提高了代码可读性。
:::

### 4. 需要运行时激活

**关键要求**：所有 Labs 预览功能必须在运行时激活和停用，而不能要求重启 Home Assistant。

好的模式：

* 动态加载/卸载 UI 组件
* 在功能切换时创建/删除实体
* 启用/禁用后台任务
* 注册/注销事件监听器

不好的模式：

* 更改核心 bootstrap 行为
* 修改仅在启动时加载的集成
* 从根本上改变系统初始化过程的功能
* 要求更改 `configuration.yaml`

### 5. 创建反馈渠道

在发布功能之前，创建合适的反馈渠道：

1. **社区论坛**：在 "Beta" 或 "Feature Requests" 类别中创建主题
2. **GitHub**：可选地创建 discussion 或指定一个 issue 用于收集反馈
3. 在你的功能定义的 `feedback_url` 中链接这些渠道

选择最适合需求的渠道。社区论坛主题适合开放讨论，而 GitHub 更适合技术反馈和 issue 跟踪。

### 6. 更新生成文件

修改 `manifest.json` 后，运行：

```bash
python -m script.hassfest
```

这将使用你的功能更新 `homeassistant/generated/labs.py`。

### 7. 编写功能文档

添加关于预览功能的文档：

* 更新集成的文档页面，提及该 Labs 功能
* 说明正在预览的内容以及正在寻求哪些反馈
* 提供启用它的清晰说明

### 8. 创建 My Home Assistant 链接（可选）

可以创建 My Home Assistant 链接，直接导航到 Labs 中的功能。这对于以下场景尤其有用：

* 宣布新预览功能的 release notes
* 带有明确行动号召的文档
* 希望用户轻松测试功能的社区讨论

链接格式为：

```text
https://my.home-assistant.io/redirect/labs/?domain=<domain>&preview_feature=<feature_id>
```

例如：

```text
https://my.home-assistant.io/redirect/labs/?domain=kitchen_sink&preview_feature=special_repair
```

当用户点击此链接时：

1. 他们会被重定向到 Home Assistant 实例中的 Labs 面板
2. 页面会自动滚动到你的特定功能
3. 功能卡片会高亮显示 3 秒以吸引注意力

可以在以下位置使用这些链接：

* Release notes: "通过访问 Labs 面板来试用新功能"
* 文档: 包含一个 My 链接按钮，让用户可以轻松启用该功能
* 社区论坛帖子: 引导用户测试特定功能

**Markdown 示例：**

```markdown
To try this new preview feature, visit {% my labs domain="kitchen_sink" preview_feature="special_repair" title="Labs" %}
and enable the "Special repair" feature.
```

## 完整示例：Kitchen Sink special repair

参见 Kitchen Sink 集成获取完整的工作示例：

`manifest.json`:

```json
{
  "domain": "kitchen_sink",
  "preview_features": {
    "special_repair": {
      "feedback_url": "https://community.home-assistant.io",
      "learn_more_url": "https://www.home-assistant.io/integrations/kitchen_sink",
      "report_issue_url": "https://github.com/home-assistant/core/issues/new"
    }
  }
}
```

`strings.json`:

```json
{
  "preview_features": {
    "special_repair": {
      "name": "Special repair",
      "description": "Creates a **special repair issue** when enabled.\n\nThis demonstrates how lab features can interact with other Home Assistant integrations.",
      "enable_confirmation": "This will create a special repair issue to demonstrate how preview features can interact with the repairs system. The repair will be removed when you disable this feature.",
      "disable_confirmation": "This will remove the special repair issue that was created by this preview feature."
    }
  },
  "issues": {
    "special_repair": {
      "title": "Special repair feature preview",
      "description": "This is a special repair created by a preview feature! This demonstrates how lab features can interact with the Home Assistant repair system. You can disable this by turning off the kitchen sink special repair feature in Settings > System > Labs."
    }
  }
}
```

`__init__.py`:

```python
from homeassistant.components.labs import (
    EventLabsUpdatedData,
    async_is_preview_feature_enabled,
    async_subscribe_preview_feature,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.issue_registry import (
    IssueSeverity,
    async_create_issue,
    async_delete_issue,
)

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the integration."""

    async def _async_update_special_repair(
        event_data: EventLabsUpdatedData | None = None,
    ) -> None:
        """Create or delete the special repair issue.

        Creates a repair issue when the special_repair lab feature is enabled,
        and deletes it when disabled. This demonstrates how lab features can interact
        with Home Assistant's repair system.
        """
        enabled = (
            event_data["enabled"]
            if event_data is not None
            else async_is_preview_feature_enabled(hass, DOMAIN, "special_repair")
        )

        if enabled:
            async_create_issue(
                hass,
                DOMAIN,
                "kitchen_sink_special_repair_issue",
                is_fixable=False,
                severity=IssueSeverity.WARNING,
                translation_key="special_repair",
            )
        else:
            async_delete_issue(hass, DOMAIN, "kitchen_sink_special_repair_issue")

    # Subscribe to labs feature updates
    entry.async_on_unload(
        async_subscribe_preview_feature(
            hass,
            DOMAIN,
            "special_repair",
            _async_update_special_repair,
        )
    )

    # Check if lab feature is currently enabled and create repair if so
    await _async_update_special_repair()

    return True
```

## 最佳实践

### 功能设计

* 保持预览功能专注且易于测试
* 提供清晰的启用/禁用行为
* 出现问题时优雅地失败
* 适当记录日志（对非关键信息使用 debug 级别）
* 使功能完全可逆

### 处理变更

虽然 Labs 功能可以有 breaking changes：

* **尽可能避免 breaking changes**：即使是预览阶段，也应尽量保持兼容性
* **在可行的情况下提供自动迁移**：当 breaking changes 不可避免时，如果可行，自动迁移用户数据和设置
* **沟通变更**：更新功能描述并通过合适渠道通知用户
* **重视用户**：虽然是预览阶段，但用户在家中依赖这些功能

### 代码组织

```python
# Good: Conditional logic is clear and separated
if async_is_preview_feature_enabled(hass, DOMAIN, "my_feature"):
    await preview_setup(hass)
else:
    await standard_setup(hass)

# Bad: Mixing preview and stable code without clear separation
await setup(hass, preview=async_is_preview_feature_enabled(hass, DOMAIN, "my_feature"))
```

### 测试

同时测试启用和禁用状态：

```python
async def test_feature_enabled(hass, hass_storage, mock_config_entry):
    """Test with feature enabled."""
    # Enable the feature by pre-populating storage
    hass_storage["core.labs"] = {
        "version": 1,
        "data": {
            "preview_feature_status": [
                {"domain": "my_integration", "preview_feature": "my_feature"},
            ]
        },
    }

    await hass.config_entries.async_setup(mock_config_entry.entry_id)
    # Test preview behavior

async def test_feature_disabled(hass, mock_config_entry):
    """Test with feature disabled."""
    # Feature disabled by default (no storage entry)

    await hass.config_entries.async_setup(mock_config_entry.entry_id)
    # Test standard behavior

async def test_feature_toggle(hass, mock_config_entry, hass_ws_client):
    """Test toggling the feature on and off."""
    await hass.config_entries.async_setup(mock_config_entry.entry_id)

    client = await hass_ws_client(hass)

    # Enable feature
    await client.send_json_auto_id({
        "type": "labs/update",
        "domain": "my_integration",
        "preview_feature": "my_feature",
        "enabled": True,
    })
    msg = await client.receive_json()
    assert msg["success"]

    # Verify feature behavior
    # ...

    # Disable feature
    await client.send_json_auto_id({
        "type": "labs/update",
        "domain": "my_integration",
        "preview_feature": "my_feature",
        "enabled": False,
    })
    msg = await client.receive_json()
    assert msg["success"]

    # Verify feature disabled
    # ...
```

## 功能生命周期

### 预览期间

* 定期监控反馈渠道
* 根据用户反馈迭代
* 按需更新功能（这是预览！）
* 如果 breaking changes 能改进功能，则是可接受的，但应在可能的情况下避免
* 当 breaking changes 不可避免时，在可行的情况下为用户提供自动迁移
* 保持功能描述的准确性
* 及时响应 bug 报告

### 毕业为标准功能

当功能准备成为标准功能时：

1. 从 `manifest.json` 中的 `preview_features` 移除该功能
2. 移除所有 `async_is_preview_feature_enabled()` 检查
3. 使功能始终处于活动状态
4. 运行 `python -m script.hassfest` 以更新生成文件
5. 更新文档以反映它已成为标准功能
6. 在 release notes 中宣布

### 移除

如果功能最终不可行：

1. 从 `manifest.json` 中的 `preview_features` 移除该功能
2. 移除所有相关代码
3. 清理翻译
4. 运行 `python -m script.hassfest`
5. 在 release notes 中宣布移除并附上说明

## 常见陷阱

❌ **不要**将 Labs 用于永久性设置或配置选项

❌ **不要**创建需要重启的功能

❌ **不要**长期保留预览功能而不将其毕业或移除

❌ **不要**将 Labs 用于存在关键 bug 或本质上不完整的功能

❌ **不要**忘记记录你需要什么样的反馈

✅ **应该**使功能在运行时完全可逆

✅ **应该**提供清晰、简洁的描述

✅ **应该**从一开始就规划毕业或移除

✅ **应该**积极参与用户反馈

✅ **应该**在添加到 Labs 之前确保功能已充分测试且生产就绪

✅ **应该**在反馈基础上可能扩展功能集时进行说明
