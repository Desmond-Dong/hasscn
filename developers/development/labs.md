# 创建实验室预览功能

Home Assistant 实验室提供了一种标准化方式，用于发布预览功能，让用户可以在这些功能成为正式标准之前选择启用。本文介绍如何向实验室添加新的预览功能。

## 什么是实验室预览功能？

实验室预览功能已经过充分测试，其界面和设计会通过真实使用场景与用户反馈继续打磨，然后再成为 Home Assistant 的标准功能。这些功能具有以下特征：

* **可选**：默认关闭，用户必须主动启用
* **经过充分测试**：代码已可用于生产环境，而不是实验性或未完成的实现
* **可能发生变化**：可能会有重大调整、增加新能力，或根据反馈被移除
* **可逆**：可以随时关闭，无需重启

实验室的目的在于完善界面与设计，而不是测试 bug。这与 beta 测试不同；beta 测试关注的是即将发布的 Home Assistant 版本是否稳定。

## 何时使用实验室

实验室适用于：

* 重大 UI 变更或重设计
* 重要的架构变化
* 最终设计和实现会明显受到用户反馈影响的功能

实验室**不**适用于：

* 本应作为标准功能存在的配置选项（请改用集成选项或配置流程）
* 可以直接发布的小改动
* 不能在运行时切换的功能
* 存在严重 bug 或明显尚未完成的功能（这些应继续开发）

## 添加实验室预览功能

### 1. 在 `manifest.json` 中定义功能

将您的功能添加到集成的 `manifest.json` 中的 `preview_features` 部分：

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

* `feedback_url`：指向社区论坛主题、反馈表单或反馈讨论的链接
* `learn_more_url`：该功能相关文档的链接
* `report_issue_url`：指向 GitHub issue 报告页面的链接

所有字段都是可选的，但强烈建议提供，以便用户反馈和报告问题。

### 2. 添加翻译

将翻译添加到集成的 `strings.json`：

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

描述应当：

* 清楚说明该功能的作用
* 保持简洁，但信息充分
* 提及该功能未来是否可能继续扩展
* 可以使用 Markdown 格式（粗体、链接等）

#### 自定义确认消息（可选）

您可以自定义用户启用或禁用该功能时看到的确认消息。如果功能存在用户需要注意的特定行为或后果，这会非常有用：

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

**何时使用自定义确认：**

* 功能会产生持久性变更（迁移、新实体等）
* 用户需要理解某些特定后果
* 功能会以不那么直观的方式与其他系统交互
* 您希望对启用/禁用后的行为建立明确预期

**描述建议：**

* **在描述中写明重要后果**：用户应仅通过描述就能理解会发生什么，而不是只依赖确认弹窗
* 使用确认消息强调用户执行操作时需要注意的关键点
* 明确说明启用/禁用时会发生什么
* 保持信息简洁但充分
* 不要重复通用信息（用户已经看得到标准警告）

### 3. 实现功能

#### 后端功能

对于后端功能，请在代码中检查标志：

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

对于前端功能，请在 TypeScript 中检查标志：

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

#### 响应功能开关变更

使用 `async_subscribe_preview_feature()` 辅助函数订阅功能开关事件。监听器会接收事件数据作为参数，并支持异步协程函数：

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

`async_subscribe_preview_feature()` 会自动筛选当前域和当前功能的事件，并将包含 `enabled` 状态在内的事件数据直接传给监听器。

:::info
对于更复杂的场景或存在多个预览功能的情况，您仍然可以直接使用更底层的 `EVENT_LABS_UPDATED` 事件。对于大多数用例，建议优先使用 `async_subscribe_preview_feature()`，因为它可以减少样板代码并提升可读性。
:::

### 4. 必须支持运行时启用

**关键要求**：所有实验室预览功能都必须支持在运行时启用和禁用，且**不需要**重启 Home Assistant。

好的模式：

* 动态加载/卸载 UI 组件
* 在功能切换时创建/移除实体
* 启用/禁用后台任务
* 注册/注销事件监听器

不良模式：

* 更改 Core 的启动行为
* 修改仅在启动时加载的集成逻辑
* 从根本上改变系统初始化流程
* 要求修改 `configuration.yaml`

### 5. 建立反馈渠道

在发布功能之前，先建立合适的反馈渠道：

1. **社区论坛**：在 "Beta" 或 "Feature Requests" 分类中创建主题
2. **GitHub**：可选地创建 discussion，或指定专门的反馈 issue
3. 将这些链接填入功能定义中的 `feedback_url`

选择最适合您需求的渠道。社区论坛主题更适合公开讨论，而 GitHub 更适合技术反馈和问题跟踪。

### 6. 更新生成的文件

修改 `manifest.json` 后，运行：

```bash
python -m script.hassfest
```

这会用您的功能更新 `homeassistant/generated/labs.py`。

### 7. 记录功能

为预览功能补充文档：

* 更新集成文档页面，说明该实验室功能
* 解释当前预览的内容，以及您希望获得哪些反馈
* 提供清晰的启用说明

### 8. 创建 My Home Assistant 链接（可选）

您可以创建 "My Home Assistant" 链接，直接跳转到实验室中的对应功能。以下场景尤其适合使用：

* 宣布新预览功能的发行说明
* 带有明确行动引导的文档
* 希望用户轻松试用该功能的社区讨论

链接格式如下：

```text
https://my.home-assistant.io/redirect/labs/?domain=<domain>&preview_feature=<feature_id>
```

例如：

```text
https://my.home-assistant.io/redirect/labs/?domain=kitchen_sink&preview_feature=special_repair
```

当用户点击该链接时：

1. 会被重定向到其 Home Assistant 实例中的实验室面板
2. 页面会自动滚动到您的目标功能
3. 功能卡片会高亮显示 3 秒以吸引注意

您可以在以下位置使用这些链接：

* 发行说明：例如“前往实验室面板试用新功能”
* 文档：添加 "My" 链接按钮，方便用户直接启用
* 社区论坛帖子：引导用户测试特定功能

**Markdown 示例：**

```markdown
To try this new preview feature, visit {% my labs domain="kitchen_sink" preview_feature="special_repair" title="Labs" %} 
and enable the "Special repair" feature.
```

## 完整示例：Kitchen Sink Special Repair

有关完整可运行示例，请参见 `kitchen_sink` 集成：

`manifest.json`：

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

`strings.json`：

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

`__init__.py`：

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

    async def _async_update_s
```
