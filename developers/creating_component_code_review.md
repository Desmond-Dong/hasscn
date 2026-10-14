添加新组件时要做的事情清单。

:::info
并非所有现有代码都遵循本清单中的要求。这不能作为不遵循要求的理由！
:::

### 0. Common

1. 遵循我们的[风格指南](/developers/development_guidelines.md)
2. 使用 [`const.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/const.py) 中现有的常量
   * 只有当常量被广泛使用时才添加到 `const.py` 中。否则，请在组件级别保留它们

### 1. External requirements

1. 依赖项已添加到 [`manifest.json`](/developers/creating_integration_manifest.md)。`REQUIREMENTS` 常量已弃用。
2. 依赖项版本必须固定：`"requirements": ['phue==0.8.1']`
3. 每个依赖项都满足[库要求](/developers/api_lib_index.md#basic-library-requirements)。

### 2. Configuration

1. 有用于[配置验证](/developers/development_validation.md) 的 Voluptuous schema
2. 默认参数在 voluptuous schema 中指定，而不是在 `setup(…)` 中
3. 尽可能多地使用来自 `homeassistant.const` 的通用配置键
4. 如果你的组件有平台，请定义 `PLATFORM_SCHEMA` 而不是 `CONFIG_SCHEMA`。
5. 如果使用与 `EntityComponent` 配合的 `PLATFORM_SCHEMA`，请从 `homeassistant.helpers.config_validation` 导入基础 schema
6. 永远不要依赖用户在 `customize` 中添加内容来配置你的组件内部行为。

### 3. Component/platform communication

1. 可以通过 `hass.data[DOMAIN]` 与你的平台共享数据。
2. 如果组件获取的数据导致其相关平台实体更新，可以使用 `homeassistant.helpers.dispatcher` 中的 dispatcher 代码来通知它们。

### 4. Communication with devices/services

1. 所有与 API 相关的代码必须作为 PyPi 上托管的第三方库的一部分。Home Assistant 应该只与对象交互，而不直接调用 API。

   ```python
   # bad
   status = requests.get(url("/status"))
   # good
   from phue import Bridge

   bridge = Bridge(...)
   status = bridge.status()
   ```

   [关于发布你自己的 PyPI 包的教程](https://towardsdatascience.com/how-to-open-source-your-first-python-package-e717444e1da0)

   其他关于发布 Python 包的值得注意的资源：
   [Cookiecutter Project](https://cookiecutter.readthedocs.io/)
   [flit](https://flit.readthedocs.io/)
   [Poetry](https://python-poetry.org/)

### 5. Make your pull request as small as possible

将新集成保持在能让人从中获得价值的最小功能范围。这允许审查者一次一批地签署较小代码块，让我们能更早地获得你的新集成/功能。**包含大量代码倾倒的 pull request 不会成为审查的优先级，可能会被关闭。**

* 限制为单个平台
* 不要添加不支持该单个平台所需的功能（如自定义 service actions）
* 不要在单个 pull request 中混合清理工作与新功能
* 不要在单个 pull request 中解决多个问题
* 不要提交依赖于其他尚未合并工作的 pull request

在"现代化"某个长时间未触及的集成时，可能会倾向于打开一个大型 PR，以利用所有最新可用功能。正确的方法是尽可能将功能拆分为独立的功能性更改，并按顺序提交 PR。

处理顺序 PR 的一个策略是，在 `current` PR 的分支上为 `next` PR 创建一个分支，然后可以开始编写代码。如果你已经将 PR 拆分使得一个依赖于前一个，这种策略是有优势的，因为你是在 PR 合并后会在 `dev` 中的代码基础上工作。如果你因为更改/审查反馈而向 `current` PR 添加额外的提交，你可以对 `next` PR 的分支执行 rebase，并更容易地整合任何 merge conflicts。一旦你的 `current` PR 被合并，在 `next` PR 分支中 squash 来自 `current` PR 分支的提交，然后在 `dev` 上 rebase。然后就可以提交 `next` PR 分支进行审查，并根据需要重复此过程。

### 6. Event names

使用 domain 名称作为组件事件名称的前缀。例如，对于 `netatmo` 组件，使用 `netatmo_person` 而不是 `person`。请注意我们在 [Data Science portal](https://data.home-assistant.io/docs/events/#database-table) 上记录的数据结构。

### 7. Tests

强烈考虑为你的组件添加测试，以尽量减少未来的回归问题。
