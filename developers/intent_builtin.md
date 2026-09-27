import intents from '!!yaml-loader!../intents/intents.yaml';

以下 intents 受到**支持**：

<ul>
<li>
<>
{
  Object.entries(intents)
  .filter(([intent, info]) => info["supported"])
  .map(([intent, info]) => intent)
  .join(", ")
}
</>
</li>
</ul>

以下 intents 已被**弃用**：

* HassOpenCover、HassCloseCover、HassToggle、HassHumidifierSetpoint、HassHumidifierMode、HassShoppingListLastItems

**Slots**

对于 *HassTurnOn* 和 *HassTurnOff*，*slots* 是可选的。

可能的 slot 组合如下：

| Slot combination        | Example                          |
| ----------------------- | ---------------------------------|
| 仅 name                 | 桌灯                             |
| 仅 area                 | 厨房                             |
| area 和 name            | 客厅阅读灯                       |
| area 和 domain          | 厨房灯光                         |
| area 和 device class    | 浴室湿度                         |
| device class 和 domain  | 二氧化碳传感器                   |

## 支持的意图

<>
{
Object.entries(intents)
.filter((\[intent, info]) => info\["supported"])
.map(
(\[intent, info]) =>
<> <h3>{intent}</h3> <p>{info.description}</p>
{info.slots &&
(<b>Slots</b>) && ( <ul>
{Object.entries(info.slots).map((\[slot, slotInfo]) => ( <li> <b>{slot}</b> - {slotInfo.description + (slotInfo.required ? "（必需）" : "")} </li>
))} </ul>
)} <p><small>
\<a href={`https://www.home-assistant.io/integrations/${info.domain}`}>由 <code>{info.domain}</code> 集成提供。</a> </small></p>
\</>
)
}
\</>

## 已弃用的 intents

这些是旧版 intents，不被 template matching sentences 支持，计划将其移除或替换。

### HassOpenCover

*已弃用；请改用 `HassTurnOn`。*

打开一个 cover。

| Slot name | Type | Required | Description
| --------- | ---- | -------- | -----------
| name | string | 是 | 要打开的 cover entity 名称。

### HassCloseCover

*已弃用；请改用 `HassTurnOff`。*

关闭一个 cover。

| Slot name | Type | Required | Description
| --------- | ---- | -------- | -----------
| name | string | 是 | 要关闭的 cover entity 名称。

### HassToggle

切换一个 entity 的 state。

| Slot name | Type | Required | Description
| --------- | ---- | -------- | -----------
| name | string | 是 | 要切换的 entity 名称。

### HassHumidifierSetpoint

设置目标湿度。

| Slot name | Type | Required | Description
| --------- | ---- | -------- | -----------
| name | string | 是 | 要控制的 entity 名称。
| humidity | integer, 0-100 | 是 | 要设置的目标湿度。

### HassHumidifierMode

如果 humidifier 支持，设置其 mode。

| Slot name | Type | Required | Description
| --------- | ---- | -------- | -----------
| name | string | 是 | 要控制的 entity 名称。
| mode | string | 是 | 要切换到的 mode。

### HassShoppingListLastItems

列出购物清单上最近 5 个 items。

*此 intent 没有 slots。*

[此页面基于 Intents 仓库自动生成。](https://github.com/home-assistant/intents/blob/main/intents.yaml)
