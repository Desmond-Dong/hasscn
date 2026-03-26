---
title: "内置意图"
toc_max_heading_level: 2
---

import intents from '!!yaml-loader!../intents/intents.yaml';

以下意图为**受支持**：

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

以下意图已**弃用**：

 * HassOpenCover, HassCloseCover, HassToggle, HassHumidifierSetpoint, HassHumidifierMode, HassShoppingListLastItems

**槽位**

对于 *HassTurnOn* 和 *HassTurnOff*，*槽位*是可选的。

可用的槽位组合有：


| Slot combination        | Example                          |
| ----------------------- | ---------------------------------|
| 仅名称                  | table light                      |
| 仅区域                  | kitchen                          |
| 区域和名称              | living room reading light        |
| 区域和 domain           | kitchen lights                   |
| 区域和设备类别          | bathroom humidity                |
| 设备类别和 domain       | carbon dioxide sensors           |


## 受支持的意图

<>
{
  Object.entries(intents)
  .filter(([intent, info]) => info["supported"])
  .map(
    ([intent, info]) =>
      <>
        <h3>{intent}</h3>
        <p>{info.description}</p>
        {info.slots &&
          (<b>槽位</b>) && (
          <ul>
            {Object.entries(info.slots).map(([slot, slotInfo]) => (
              <li>
                <b>{slot}</b> - {slotInfo.description + (slotInfo.required ? "（必需）" : "")}
              </li>
            ))}
          </ul>
        )}
        <p><small>
          <a href={`https://www.home-assistant.io/integrations/${info.domain}`}>由 <code>{info.domain}</code> 集成提供。</a>
        </small></p>
      </>
  )
}
</>

## 已弃用的意图

这些是旧版意图，不受模板匹配句子支持，计划被移除或替换。


### HassOpenCover

_已弃用；请改用 `HassTurnOn`。_

打开一个 cover。

| Slot name | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| name | string | Yes | 要打开的 cover 实体名称。 |

### HassCloseCover

_已弃用；请改用 `HassTurnOff`。_

关闭一个 cover。

| Slot name | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| name | string | Yes | 要关闭的 cover 实体名称。 |

### HassToggle

切换实体的状态。

| Slot name | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| name | string | Yes | 要切换的实体名称。 |

### HassHumidifierSetpoint

设置目标湿度。

| Slot name | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| name | string | Yes | 要控制的实体名称。 |
| humidity | integer, 0-100 | Yes | 要设置的目标湿度。 |

### HassHumidifierMode

如果加湿器支持，则设置其模式。

| Slot name | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| name | string | Yes | 要控制的实体名称。 |
| mode | string | Yes | 要切换到的模式。 |

### HassShoppingListLastItems

列出购物清单中的最后 5 个项目。

_此意图没有槽位。_



[此页面基于 Intents 仓库自动生成。](https://github.com/home-assistant/intents/blob/main/intents.yaml)
