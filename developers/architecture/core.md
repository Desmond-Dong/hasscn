Home Assistant Core 由四个主要部分组成。在此之上，它还包含许多用于处理常见场景的辅助类，例如提供实体（entity）或处理位置信息。

* **事件总线（Event Bus）**：实现事件的触发与监听——Home Assistant 的核心所在。
* **状态机（State Machine）**：跟踪各类对象的状态，并在状态发生变化时触发 `state_changed` 事件。
* **服务注册表（Service Registry）**：监听事件总线上的 `call_service` 事件，并允许其他代码注册 service actions。
* **定时器（Timer）**：每秒在事件总线上发送一次 `time_changed` 事件。

<img class='invertDark'
alt='Home Assistant 核心架构概览'
src='/img/en/architecture/ha_architecture.svg'
/>
