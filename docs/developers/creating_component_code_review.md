---
title: "创建组件的清单"
sidebar_label: 组件清单
---

添加新组件时需要完成的检查清单。

:::info
并非所有现有代码都符合此清单中的要求，但这绝不是忽视这些要求的理由！
:::

### 0. 通用

1. 遵循我们的[开发指南](/developers/development_guidelines)
2. 使用现有常量 [`const.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/const.py)
   - 只有在某个新常量会被广泛使用时，才将其添加到 `const.py` 中；否则请保留在组件级别

### 1. 外部依赖

1. 在 [`manifest.json`](/developers/creating_integration_manifest) 中添加 `requirements`。`REQUIREMENTS` 常量已弃用。
2. 依赖版本必须固定，例如：`"requirements": ['phue==0.8.1']`
3. 每个依赖都应满足[库要求](/developers/api_lib_index#basic-library-requirements)。

### 2. 配置

1. 提供合理的[配置校验](/developers/development_validation) schema
2. 默认参数应在 voluptuous schema 中指定，而不是在 `setup(...)` 中设置
3. 尽可能使用 `homeassistant.const` 中的通用配置键
4. 如果您的组件包含平台，请定义 `PLATFORM_SCHEMA`，而不是 `CONFIG_SCHEMA`
5. 如果将 `PLATFORM_SCHEMA` 与 `EntityComponent` 一起使用，请从 `homeassistant.helpers.config_validation` 导入基础 schema
6. 不要依赖用户在 `customize` 中添加内容来配置组件内部行为

### 3. 组件/平台通信

1. 您可以使用 `hass.data[DOMAIN]` 在平台之间共享数据。
2. 如果组件获取的数据会触发其相关平台实体更新，可以使用 `homeassistant.helpers.dispatcher` 中的 dispatcher 代码通知它们。

### 4. 与设备/服务通信

1. 所有 API 特定代码都必须放在托管于 PyPI 的第三方库中。Home Assistant 应只与对象交互，而不是直接调用 API。

    ```python
    # bad
    status = requests.get(url("/status"))
    # good
    from phue import Bridge

    bridge = Bridge(...)
    status = bridge.status()
    ```

    [发布自己的 PyPI 包的教程](https://towardsdatascience.com/how-to-open-source-your-first-python-package-e717444e1da0)

其他值得参考的 Python 包发布资源：
    [Cookiecutter](https://cookiecutter.readthedocs.io/)  
    [Flit](https://flit.readthedocs.io/)  
    [Poetry](https://python-poetry.org/)  

### 5. 尽量让 Pull Request 保持精简

将新的集成限制在用户真正获得价值所需的最小功能集上。这样审阅者就能一次审核较小的一块代码，也能让您的新集成或功能更快合入。**包含大量代码倾倒的 Pull Request 不会成为审查优先项，甚至可能被直接关闭。**

- 限制为单个平台
- 不要添加单个平台并不直接需要的功能（例如自定义服务操作）
- 不要在同一个 Pull Request 中混合清理与新功能
- 不要在同一个 Pull Request 中解决多个问题
- 不要提交依赖于其他尚未合并工作的 Pull Request

当对一个久未维护的集成进行“现代化”改造，试图一次性用上所有新特性时，很容易开出一个很大的 PR。更好的做法是尽可能将工作拆分为独立的功能变更，并按顺序提交多个 PR。

处理连续 PR 的一种策略是：先基于当前 `current` PR 的分支创建下一个 `next` PR 分支，然后直接在该分支上继续开发。如果您已经将 PR 拆分，并且后一个 PR 依赖前一个 PR，这种策略尤其有帮助，因为您实际上是在针对最终会合入 `dev` 的代码继续工作。如果由于变更或审查反馈，您需要向 `current` PR 补充提交，也可以更容易地重新调整 `next` PR 分支的基线并解决合并冲突。`current` PR 合并后，将它的提交从 `next` PR 分支中压缩掉，再基于 `dev` 进行变基。这样您就可以提交 `next` PR 供审查，并按需重复这一流程。

### 6. 事件名称

组件事件名称应带上域名前缀。例如，对于 `netatmo` 组件，应使用 `netatmo_person`，而不是 `person`。另请注意，我们会在数据结构中记录相关信息，参见[数据科学门户](https://data.home-assistant.io/docs/events/#database-table)。

### 7. 测试

强烈建议为您的组件添加测试，以尽量减少未来的回归。
