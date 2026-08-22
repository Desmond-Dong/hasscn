Home Assistant 现在有了一个 `infrared` entity platform，它将 IR 发射器硬件与它们所控制的设备解耦。每个设备集成不再直接与特定 IR 硬件通信，而是由发射器集成（如 `esphome`）暴露 `InfraredEntity` 实例，设备集成（如 `lg_infrared`）通过 helper 函数向其发送命令。

查看 [architecture discussion](https://github.com/home-assistant/architecture/discussions/1316) 了解完整背景。

<!--truncate-->

## 架构

Infrared domain 位于两类集成之间：

* **发射器集成**（ESPHome、Broadlink 等）实现 `InfraredEntity` base class 以提供特定硬件的 IR 传输。
* **消费方集成**（LG、Samsung、Daikin 等）使用 helper 函数通过可用的发射器发送特定设备的 IR 命令。

用户在消费方集成的 config flow 期间选择要使用哪个发射器。

## 实现一个发射器集成

发射器集成通过继承 `InfraredEntity` 并实现 `async_send_command` 来提供 `infrared` platform。Command 的 `get_raw_timings()` 方法返回与协议无关的 timing 数据，硬件可以据此传输：

```python
from homeassistant.components.infrared import InfraredCommand, InfraredEntity

class MyInfraredEntity(InfraredEntity):
    """My IR transmitter."""

    async def async_send_command(self, command: InfraredCommand) -> None:
        """Send an IR command."""
        timings = [
            interval
            for timing in command.get_raw_timings()
            for interval in (timing.high_us, -timing.low_us)
        ]
        await self._device.transmit(
            carrier_frequency=command.modulation,
            timings=timings,
        )
```

原始与协议无关的 timings 应转换为硬件所需的具体格式。

## 构建消费方集成

消费方集成通过向发射器 entity 发送命令来控制 IR 设备。它们不直接与 IR 硬件交互。

**1. 在 `manifest.json` 中声明依赖**：

```json
{
  "dependencies": ["infrared"]
}
```

**2. 在 config flow 中让用户选择发射器**：

```python
from homeassistant.components import infrared

emitters = infrared.async_get_emitters(hass)
if not emitters:
    return self.async_abort(reason="no_emitters")
```

**3. 使用 helper 函数和 [`infrared-protocols`](https://github.com/home-assistant-libs/infrared-protocols) 库发送 IR 命令**：

```python
from infrared_protocols.codes.lg.tv import LGTVCode, make_lg_tv_command
from homeassistant.components import infrared

await infrared.async_send_command(
    hass,
    self._infrared_entity_id,
    make_lg_tv_command(LGTVCode.VOLUME_UP),
    context=self._context,
)
```

## IR 协议和 codes

IR protocol 编码器及设备 code 集合存放在 Home Assistant 之外的 [`infrared-protocols`](https://github.com/home-assistant-libs/infrared-protocols) 库中。核心集成所使用的常见协议（NEC、Samsung 等）和知名设备 codes 应贡献到那里。对于小众或专有协议，也可以使用单独的第三方库。

更多详情，请参阅 [infrared entity 文档](/developers/core/entity/infrared.md)。
