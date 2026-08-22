# Change device type of a switch

**Change device type of a switch** 辅助集成可让您将任意 Home Assistant 开关转换为 Home Assistant 的 Light、Cover、Fan、Lock、Siren 或 Valve。

在 Home Assistant 的世界里，墙插属于开关。这对于墙插本身当然是正确的，但这些插座常常被用来控制例如灯具或风扇。通用继电器也类似，因为它们有时会被用于门锁或车库门之类的设备。

借助 **Change device type of a switch** 辅助集成，您可以将这些开关转换为最适合您实际用途的实体类型。

## Configuration

To add the **Switch as X** helper to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=switch_as_x)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=switch_as_x).
* From the list, select **Switch as X**.
* Follow the instructions on screen to complete the setup.

</details>

```yaml
Switch entity:
  description: The switch entity you want to convert into something else.
Type:
  description: The type of entity you want the switch to become.
```

## 从现有实体使用 **Change device type of a switch**

在兼容情况下，**Change device type of a switch** 会出现在实体属性中。实体列表可在 **[Settings > Devices & services > Entities](https://my.home-assistant.io/redirect/entities/)** 中找到。

![Entity properties example](/home-assistant/images/integrations/switch_as_x/Entities_Properties.png)
