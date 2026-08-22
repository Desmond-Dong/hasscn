Home Assistant 现在有了一个 `radio_frequency` entity platform，它将 RF 收发器硬件与所控制的设备解耦。每个设备集成不再直接与特定 RF 硬件通信，而是由发射器集成（如 `esphome`）暴露 `RadioFrequencyTransmitterEntity` 实例，设备集成通过 helper 函数向其发送命令。

这与 [`infrared` entity platform](/developers/blog/2026-03-30-infrared-entity-platform.md) 类似，并已在 [architecture discussion #1365](https://github.com/home-assistant/architecture/discussions/1365) 中获得批准。

<!--truncate-->

## 架构

`radio_frequency` domain 位于两类集成之间：

* **发射器集成**（ESPHome、Broadlink 等）实现 `RadioFrequencyTransmitterEntity` base class 以提供特定硬件的 RF 传输。
* **消费方集成**（车库门开启器、RF 遥控器、无线开关等）使用 helper 函数通过可用的发射器发送特定设备的 RF 命令。

用户在消费方集成的 config flow 期间选择要使用哪个发射器，并根据设备的工作频率进行筛选。

## 实现一个发射器集成

发射器集成通过继承 `RadioFrequencyTransmitterEntity`、声明其 `supported_frequency_ranges` 并实现 `async_send_command` 来提供 `radio_frequency` platform：

```python
from rf_protocols import RadioFrequencyCommand
from homeassistant.components.radio_frequency import RadioFrequencyTransmitterEntity

class MyRadioFrequencyTransmitterEntity(RadioFrequencyTransmitterEntity):
    """My RF transmitter."""

    @property
    def supported_frequency_ranges(self) -> list[tuple[int, int]]:
        """Return the list of (min_hz, max_hz) ranges this hardware can transmit on."""
        return [(300_000_000, 348_000_000), (433_050_000, 434_790_000)]

    async def async_send_command(self, command: RadioFrequencyCommand) -> None:
        """Send an RF command."""
        await self._device.transmit(
            frequency=command.frequency,
            modulation=command.modulation,
            timings=command.get_raw_timings(),
        )
```

Base class 会将最后发送命令的时间戳作为 entity state 跟踪，因此发射器集成只需处理实际传输。

## 构建消费方集成

消费方集成通过向发射器 entity 发送命令来控制 RF 设备。它们不直接与 RF 硬件交互。下面的代码片段改编自 [`honeywell_string_lights`](https://github.com/home-assistant/core/pull/168450) 集成，该集成使用此 platform 驱动一套 Honeywell String Lights。

**1. 在 `manifest.json` 中声明依赖**：

```json
{
  "dependencies": ["radio_frequency"]
}
```

**2. 从 [`rf-protocols`](https://github.com/home-assistant-libs/rf-protocols) 库加载设备的命令**：

```python
from rf_protocols import get_codes

COMMANDS = get_codes("honeywell/string_lights")
```

每个加载的命令会暴露设备使用的频率和调制方式，config flow 需要用这些信息筛选发射器。

**3. 在 config flow 中让用户选择发射器**，使用样本命令根据设备所需的频率和调制方式进行筛选：

```python
from rf_protocols import RadioFrequencyCommand
from homeassistant.components.radio_frequency import async_get_transmitters
from homeassistant.exceptions import HomeAssistantError

sample_command: RadioFrequencyCommand = await self.hass.async_add_executor_job(
    COMMANDS.load_command, "turn_on"
)
try:
    transmitters = async_get_transmitters(
        self.hass, sample_command.frequency, sample_command.modulation
    )
except HomeAssistantError:
    return self.async_abort(reason="no_transmitters")

if not transmitters:
    return self.async_abort(reason="no_compatible_transmitters")
```

目前只支持 `ModulationType.OOK`（on-off keying），后续版本可以添加其他调制方式。

**4. 使用 helper 函数和存储的发射器 entity ID 发送 RF 命令**：

```python
from homeassistant.components.radio_frequency import async_send_command

async def async_turn_on(self, **kwargs: Any) -> None:
    """Turn on the light."""
    command = await self.hass.async_add_executor_job(
        COMMANDS.load_command, "turn_on"
    )
    await async_send_command(self.hass, self._transmitter, command)
    self._attr_is_on = True
    self.async_write_ha_state()
```

## RF 协议和 codes

RF protocol 编码器及设备 code 集合存放在 Home Assistant 之外的 [`rf-protocols`](https://github.com/home-assistant-libs/rf-protocols) 库中。常见协议和知名设备 codes 应贡献到那里。对于小众或专有协议，也可以使用单独的第三方库。

更多详情，请参阅 [radio frequency entity 文档](/developers/core/entity/radio-frequency.md)。
