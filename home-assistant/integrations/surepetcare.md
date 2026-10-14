# Sure Petcare

**Sure Petcare** 集成允许您获取 Sure Petcare Connect 宠物门或猫门的信息。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

以下是 Sure Petcare 集成中可用的实体。

### 宠物

#### 二进制传感器

* **Presence**：宠物是否在室内。

#### 传感器

* **Last seen flap device ID**：宠物最近使用的门设备 ID（对 [pet select location blueprint](#pet-select-location-template-entity) 很有用）。如果最近状态不是由门设备更新产生，则为 `unknown`。此传感器默认禁用。
* **Last seen user ID**：最近一次手动更改宠物位置的用户 ID（对 [pet select location blueprint](#pet-select-location-template-entity) 很有用）。如果最近状态不是由手动更新产生，则为 `unknown`。此传感器默认禁用。

### 宠物门和猫门

#### Binary sensors

* **Connectivity**：设备连接状态（在线）；可用时显示设备 RSSI。

#### 锁

* **Locked in**：锁状态：门只允许进入。
* **Locked out**：锁状态：门只允许出去。
* **Locked all**：锁状态：双向都锁定。

#### Sensors

* **Battery level**：电池电量百分比（由电池电压推算）。

### 喂食器

#### Binary sensors

* **Connectivity**：喂食器连接状态（在线）；可用时显示设备 RSSI。

#### Sensors

* **Battery level**：电池电量百分比（由电池电压推算）。

### Felaqua

#### Binary sensors

* **Connectivity**：Felaqua 连接状态（在线）；可用时显示设备 RSSI。

#### Sensors

* **Felaqua**：碗中剩余水量。
* **Battery level**：电池电量百分比（由电池电压推算）。

### Hub

#### Binary sensors

* **Connectivity**：Hub 连接状态（在线）；属性包括 `led_mode` 和 `pairing_mode`。

## 操作

### 操作：设置锁状态

`surepetcare.set_lock_state` 操作用于更改门的锁定状态。

| 数据属性 | 必填 | 类型 | 说明 |
| ---------------------- | -------- | -------- | ----------- |
| `flap_id` | `True` | integer | 要修改的门 ID；如何查找设备 ID 见下文 |
| `lock_state` | `True` | string | 要设置的新门状态 |

可按以下步骤找到 `flap_id`：

* 登录 [surepetcare.io](https://surepetcare.io/)。
* 打开侧边栏并点击对应的门设备。
* `flap_id` 位于 URL 末尾（例如 `https://surepetcare.io/control/device/FLAP-ID`）。

`lock_state` 应为以下值之一：

* `unlocked` - 门未锁定，宠物可自由进出。
* `locked_in` - 门为“只进不出”状态，宠物可以进来但不能出去。
* `locked_out` - 门为“只出不进”状态，宠物可以出去但不能进来。
* `locked_all` - 门双向锁定。

### 操作：设置宠物位置

`surepetcare.set_pet_location` 操作用于设置宠物位置。

| 数据属性 | 必填 | 类型 | 说明 |
| ---------------------- | -------- | -------- | ----------- |
| `name` | yes | string | 宠物名称 |
| `location` | yes | string | 宠物位置 |

`location` 应为以下值之一：

* `Inside` - 宠物在室内。
* `Outside` - 宠物在室外。

## 蓝图

### 宠物位置选择（模板实体）

<!-- markdownlint-disable MD034 -->

[![Open Import blueprint in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FZhephyr54%2F846f369dce673a989e141e9c2555e4d2)

<!-- markdownlint-enable MD034 -->

为宠物创建一个表示当前位置的 select 实体。
如果您有多个并不直接通向室外的门，而现有的二进制传感器又无法准确反映宠物位置，这会特别有用。

最多支持 10 个门设备。

同步是单向的。宠物位置选择实体会从宠物二进制传感器同步状态，但手动更改该 select 实体状态不会影响宠物二进制传感器（因此也不会影响 Sure Petcare 中的状态）。
