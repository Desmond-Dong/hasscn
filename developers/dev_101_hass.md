在开发 Home Assistant 时，你会看到一个无处不在的变量：`hass`。这是 Home Assistant 的实例，通过它可以访问系统的各个部分。

### The `hass` object

Home Assistant 实例包含四个对象，帮助你与系统进行交互。

| Object | Description |
| ------ | ----------- |
| `hass` | 这是 Home Assistant 的实例。允许启动、停止以及排队新任务（jobs）。 |
| `hass.config` | 这是 Home Assistant 的核心配置，暴露位置、温度偏好和 config 目录路径。 |
| `hass.states` | 这是 StateMachine。允许你设置 state 并跟踪它们的变更。[了解更多。](https://developers.home-assistant.io/docs/dev_101_states) |
| `hass.bus` | 这是 EventBus。允许你触发事件和监听事件。[了解更多。](https://developers.home-assistant.io/docs/dev_101_events) |
| `hass.services` | 这是 ServiceRegistry。允许你注册 service actions。[了解更多。](https://developers.home-assistant.io/docs/dev_101_services) |

<img class='invertDark'
alt='Home Assistant 核心架构概览'
src='/img/en/architecture/ha_architecture.svg'
/>

### Where to find `hass`

根据你编写的内容不同，`hass` 对象的提供方式也有所不同。

**Component**

通过 `setup(hass, config)` 或 `async_setup(hass, config)` 传入。

**Platform**

通过 `setup_platform(hass, config, add_entities, discovery_info=None)` 或 `async_setup_platform(hass, config, async_add_entities, discovery_info=None)` 传入。

**Entity**

在 platform 内部通过 `add_entities` 回调添加 entity 后，可作为 `self.hass` 使用。
