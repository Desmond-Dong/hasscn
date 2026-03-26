---
title: "hass 对象"
sidebar_label: "简介"
---

在开发 Home Assistant 时，你会看到一个无处不在的变量：`hass`。这是 Home Assistant 实例，它让你可以访问系统的各个部分。

### `hass` 对象

Home Assistant 实例包含四个对象，帮助你与系统交互。

| Object | Description |
| ------ | ----------- |
| `hass` | 这是 Home Assistant 的实例。可用于启动、停止以及将新任务加入队列。 |
| `hass.config` | 这是 Home Assistant 的核心配置，暴露了位置、温度偏好和配置目录路径。 |
| `hass.states` | 这是 `StateMachine`。它允许你设置状态并跟踪状态变化。[查看可用方法。](https://developers.home-assistant.io/docs/dev_101_states) |
| `hass.bus` | 这是 `EventBus`。它允许你触发和监听事件。[查看可用方法。](https://developers.home-assistant.io/docs/dev_101_events) |
| `hass.services` | 这是 `ServiceRegistry`。它允许你注册服务动作。[查看可用方法。](https://developers.home-assistant.io/docs/dev_101_services) |

<img class='invertDark'
  alt='Home Assistant 核心架构概览'
  src='/developers/img/en/architecture/ha_architecture.svg'
/>

### 在哪里可以找到 `hass`

根据你编写的内容不同，`hass` 对象会以不同方式提供给你。

**组件**
通过 `setup(hass, config)` 或 `async_setup(hass, config)` 传入。

**平台**
通过 `setup_platform(hass, config, add_entities, discovery_info=None)` 或 `async_setup_platform(hass, config, async_add_entities, discovery_info=None)` 传入。

**实体**
当实体通过平台中的 `add_entities` 回调被添加后，可通过 `self.hass` 访问。
