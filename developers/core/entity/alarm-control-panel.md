Alarm control panel entity 控制一个 alarm。从 [`homeassistant.components.alarm_control_panel.AlarmControlPanelEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/alarm_control_panel/__init__.py) 派生 platform entity。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| alarm\_state | `AlarmControlPanelState \| None` | **必需** | **States** 中列出的 alarm 值之一。
| code\_arm\_required | bool | `True` | 执行 arm actions 时是否需要 code。
| code\_format | `CodeFormat \| None` | `None` | **Code formats** section 中列出的 states 之一。
| changed\_by | `str \| None` | `None` | 上次变更的触发者。

### 状态

设置 state 应在 `alarm_state` property 中返回一个 `AlarmControlPanelState` 枚举值。

| Value | Description
| ----- | -----------
| `DISARMED` | Alarm 处于 disarmed 状态（`off`）。
| `ARMED_HOME` | Alarm 处于 home mode 的 armed 状态。
| `ARMED_AWAY` | Alarm 处于 away mode 的 armed 状态。
| `ARMED_NIGHT` | Alarm 处于 night mode 的 armed 状态。
| `ARMED_VACATION` | Alarm 处于 vacation mode 的 armed 状态。
| `ARMED_CUSTOM_BYPASS` | Alarm 处于 custom bypass mode 的 armed 状态，其中一个或多个 zones 或 sensors 被 bypass（禁用），且被 bypass 的 zones 和 sensors 的组合与标准的 away、home 或 night modes 不对应。不要使用此 state 来指示断开连接、故障或电量低的 sensor；请通过专门的 sensor entity 报告这些情况。
| `PENDING` | Alarm 处于 pending 状态（即将 `triggered`）。
| `ARMING` | Alarm 正在 arming。
| `DISARMING` | Alarm 正在 disarming。
| `TRIGGERED` | Alarm 已 triggered。

## 支持的功能

Supported features 通过使用 `AlarmControlPanelEntityFeature` enum 中的值来定义，
并使用按位或（`|`）运算符组合。

| Constant | Description |
|----------|--------------------------------------|
| `AlarmControlPanelEntityFeature.ARM_AWAY` | Alarm 支持 away mode 的 arming。
| `AlarmControlPanelEntityFeature.ARM_CUSTOM_BYPASS` | Alarm 支持带 bypass 的 arming。
| `AlarmControlPanelEntityFeature.ARM_HOME` | Alarm 支持 home mode 的 arming。
| `AlarmControlPanelEntityFeature.ARM_NIGHT` | Alarm 支持 night mode 的 arming。
| `AlarmControlPanelEntityFeature.ARM_VACATION` | Alarm 支持 vacation mode 的 arming。
| `AlarmControlPanelEntityFeature.TRIGGER` | Alarm 可以远程触发。

### 代码格式

Supported code formats 通过使用 `CodeFormat` enum 中的值来定义。

| Value | Description
| ----- | -----------
| `None` | 不需要 code。
| `CodeFormat.NUMBER` | Code 是数字（前端显示十键 pad）。
| `CodeFormat.TEXT` | Code 是字符串。

## 方法

### 解除警报

发送 disarm 命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # 实现以下方法之一。

    def alarm_disarm(self, code: str | None = None) -> None:
        """Send disarm command."""

    async def async_alarm_disarm(self, code: str | None = None) -> None:
        """Send disarm command."""
```

### 布防 - 在家

发送 arm home 命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # 实现以下方法之一。

    def alarm_arm_home(self, code: str | None = None) -> None:
        """Send arm home command."""

    async def async_alarm_arm_home(self, code: str | None = None) -> None:
        """Send arm home command."""
```

### 布防 - 外出

发送 arm away 命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # 实现以下方法之一。

    def alarm_arm_away(self, code: str | None = None) -> None:
        """Send arm away command."""

    async def async_alarm_arm_away(self, code: str | None = None) -> None:
        """Send arm away command."""
```

### 布防 - 夜间

发送 arm night 命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # 实现以下方法之一。

    def alarm_arm_night(self, code: str | None = None) -> None:
        """Send arm night command."""

    async def async_alarm_arm_night(self, code: str | None = None) -> None:
        """Send arm night command."""
```

### 布防 - 度假

发送 arm vacation 命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # 实现以下方法之一。

    def alarm_arm_vacation(self, code: str | None = None) -> None:
        """Send arm vacation command."""

    async def async_alarm_arm_vacation(self, code: str | None = None) -> None:
        """Send arm vacation command."""
```

### 触发警报

发送 alarm trigger 命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # 实现以下方法之一。

    def alarm_trigger(self, code: str | None = None) -> None:
        """Send alarm trigger command."""

    async def async_alarm_trigger(self, code: str | None = None) -> None:
        """Send alarm trigger command."""
```

### 布防 - 自定义绕过

发送 arm custom bypass 命令。

```python
class MyAlarm(AlarmControlPanelEntity):
    # 实现以下方法之一。

    def alarm_arm_custom_bypass(self, code: str | None = None) -> None:
        """Send arm custom bypass command."""

    async def async_alarm_arm_custom_bypass(self, code: str | None = None) -> None:
        """Send arm custom bypass command."""
```
