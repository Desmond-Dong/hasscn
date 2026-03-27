---
title: 报警控制面板实体
description: '报警控制面板实体控制报警。 平台实体派生自homeassistant.components.alarmcontrolpanel.AlarmControlPanelEntity(https://github.com/home-assistant/core/blob/dev/homeassistant/compo。'
sidebar_label: 报警控制面板
---
# 报警控制面板实体

报警控制面板实体控制报警。  平台实体派生自[`homeassistant.components.alarm_control_panel.AlarmControlPanelEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/alarm_control_panel/__init__.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| alarm_state | <code>AlarmControlPanelState &#124; None</code> | **Required** | **州** 中列出的警报值之一。
| code_arm_required | bool | `True` | 手臂动作是否需要该代码。
| code_format | <code>CodeFormat &#124; None</code> | `None` | **代码格式** 部分中列出的状态之一。
| changed_by | <code>str &#124; None</code> | `None` | 最后一次更改触发的。

### 状态

设置状态应从 `alarm_state` 属性中的 `AlarmControlPanelState` 返回一个枚举。

| 值 | 说明
| ----- | -----------
| `DISARMED` | 警报已解除 (`off`)。
| `ARMED_HOME` | 警报器在家庭模式下布防。
| `ARMED_AWAY` | 警报在离开模式下布防。
| `ARMED_NIGHT` | 警报在夜间模式下启动。
| `ARMED_VACATION` | 警报在假期模式下布防。
| `ARMED_CUSTOM_BYPASS` | 警报以自定义旁路模式启动，其中一个或多个区域或传感器被旁路（禁用），并且所得到的旁路区域和传感器的组合不符合标准的外出、家庭或夜间模式。请勿使用此状态来表示传感器已断开、发生故障或电池电量不足；相反，通过专用传感器实体报告这些条件。
| `PENDING` | 警报处于待处理状态（朝向 `triggered`）。
| `ARMING` | 警报正在布防。
| `DISARMING` | 警报正在解除。
| `TRIGGERED` | 警报被触发。

## 支持的功能

支持的功能通过使用 `AlarmControlPanelEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 常量 | 说明 |
|----------|--------------------------------------|
| `AlarmControlPanelEntityFeature.ARM_AWAY` | 报警器支持在离开模式下布防。
| `AlarmControlPanelEntityFeature.ARM_CUSTOM_BYPASS` | 报警器支持旁路布防。
| `AlarmControlPanelEntityFeature.ARM_HOME` | 报警器支持家庭模式下布防。
| `AlarmControlPanelEntityFeature.ARM_NIGHT` | 报警器支持夜间模式布防。
| `AlarmControlPanelEntityFeature.ARM_VACATION` | 报警支持假期模式布防。
| `AlarmControlPanelEntityFeature.TRIGGER` | 可以远程触发警报。

### 代码格式

支持的代码格式是通过使用 `CodeFormat` 枚举中的值来定义的。

| 值 | 说明
| ----- | -----------
| `None` | 无需代码。
| `CodeFormat.NUMBER` | 代码是一个数字（在前端显示十键键盘）。
| `CodeFormat.TEXT` | 代码是一个字符串。

## 方法

### 警报撤防

发送撤防命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # Implement one of these methods.

    def alarm_disarm(self, code: str | None = None) -> None:
        """Send disarm command."""

    async def async_alarm_disarm(self, code: str | None = None) -> None:
        """Send disarm command."""
```

### 报警臂回家

发送手臂回家命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # Implement one of these methods.

    def alarm_arm_home(self, code: str | None = None) -> None:
        """Send arm home command."""

    async def async_alarm_arm_home(self, code: str | None = None) -> None:
        """Send arm home command."""
```

### 警报臂远离

发送手臂离开命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # Implement one of these methods.

    def alarm_arm_away(self, code: str | None = None) -> None:
        """Send arm away command."""

    async def async_alarm_arm_away(self, code: str | None = None) -> None:
        """Send arm away command."""
```

### 夜间报警臂

发送手臂夜间命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # Implement one of these methods.

    def alarm_arm_night(self, code: str | None = None) -> None:
        """Send arm night command."""

    async def async_alarm_arm_night(self, code: str | None = None) -> None:
        """Send arm night command."""
```

### 报警臂休假

发送手臂休假命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # Implement one of these methods.

    def alarm_arm_vacation(self, code: str | None = None) -> None:
        """Send arm vacation command."""

    async def async_alarm_arm_vacation(self, code: str | None = None) -> None:
        """Send arm vacation command."""
```

### 报警触发

发送报警触发命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # Implement one of these methods.

    def alarm_trigger(self, code: str | None = None) -> None:
        """Send alarm trigger command."""

    async def async_alarm_trigger(self, code: str | None = None) -> None:
        """Send alarm trigger command."""
```

### 报警自定义旁路

发送arm自定义旁路命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # Implement one of these methods.

    def alarm_arm_custom_bypass(self, code: str | None = None) -> None:
        """Send arm custom bypass command."""

    async def async_alarm_arm_custom_bypass(self, code: str | None = None) -> None:
        """Send arm custom bypass command."""
```