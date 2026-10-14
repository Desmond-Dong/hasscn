从 Home Assistant 2026.4 开始，`hass` 对象暴露了一个 `formatEntityName` helper。这是内置卡片（tile card、entity rows 等）用来从 entity 的 registry 上下文（entity、device、area、floor）计算其显示名称的同一函数。自定义卡片可以使用它，以产生与 dashboard 其余部分保持一致的名称。

给定一个名为 `Temperature` 的温度传感器，位于一个名为 `Thermostat` 的设备上：

```js
const stateObj = hass.states["sensor.living_room_thermostat_temperature"];

hass.formatEntityName(
  stateObj,
  [{ type: "device" }, { type: "entity" }],
  { separator: " · " }
); // "Thermostat · Temperature"
```

Frontend 还提供了一个 `entity_name` selector。如果你的卡片使用了 [内置 form editor](/developers/frontend/custom-ui/custom-card.md#using-the-built-in-form-editor)，你可以向用户提供与内置卡片相同的名称选择器——接受自由格式的字符串或 registry items 的组合。

查看更新后的 [data 文档](/developers/frontend/data.md#hassformatentitynamestateobj-name-options)，了解完整的参考和更多示例。
