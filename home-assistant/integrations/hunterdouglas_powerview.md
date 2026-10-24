# Hunter Douglas PowerView

**Hunter Douglas PowerView** 集成允许您将 [Hunter Douglas PowerView](https://www.hunterdouglas.com/smart-automation) 设备集成到 Home Assistant 中。该产品在欧洲和澳大利亚也以 Luxaflex Powerview 品牌名称闻名[如其网站所述](https://www.hunterdouglasgroup.com/worldwide-offices/)，但此集成应该适用于两个品牌。

目前 Home Assistant 支持以下设备类型：

* 按钮
* 遮盖
* 数字
* 场景
* 选择
* 传感器

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Hub 功能

### 第 1 代 + 第 2 代

当所有调用都直接通过 Powerview 应用程序或 Home Assistant 本身进行时，第 1 代和第 2 代 Hub 与 Home Assistant 配合使用效果更好。

第 1 代和第 2 代 Pebble 遥控器使用专有的低功耗蓝牙（PLE），不会将遮盖位置更改报告回 Hub。

这将导致 Home Assistant 中显示的遮盖位置不正确。

:::note
对遮盖实体调用更新实体动作（`homeassistant.update_entity`）将触发 Hub 唤醒遮盖并报告其当前位置。

下面提供了[示例自动化](#强制更新遮盖位置)适用于市电供电的遮盖。虽然该自动化适用于电池供电的遮盖，但会快速耗尽这些设备的电池。

:::

### 第 3 代

第 3 代引入了 RF Radio Pebble 遥控器。

第 3 代遮盖自动将位置更改报告回 Hub。它们应该在 Home Assistant 中正确显示，无需任何额外的自动化或位置考虑。

## 遮盖

:::note
您的遮盖即使未列出也可能工作。如果遇到问题，请在社区论坛上提出功能请求。

:::
| 名称（类型）                               | 功能                    |
| :---------------------------------------- | :------------------------------ |
| AC Roller  (49)                           | 底部向上                       |
| Banded Shades (52)                        | 底部向上                       |
| Bottom Up (5)                             | 底部向上                       |
| Curtain, Left Stack (69)                  | 垂直                        |
| Curtain, Right Stack (70)                 | 垂直                        |
| Curtain, Split Stack (71)                 | 垂直                        |
| Facette (43)                              | 底部向上 关闭时倾斜 90°      |
| Designer Roller (1)                       | 底部向上                       |
| Duette (6)                                | 底部向上                       |
| Duette, Top Down Bottom Up (8)            | 顶部向下 底部向上              |
| Duette and Applause SkyLift (10)          | 底部向上                       |
| Duette Architella, Top Down Bottom Up (9) | 顶部向下 底部向上              |
| Duette DuoLite, Top Down Bottom Up (9)    | 顶部向下 底部向上              |
| Duolite Lift (79)                         | 双遮盖重叠           |
| M25T Roller Blind (42)                    | 底部向上                       |
| Palm Beach Shutters (66)                  | 仅倾斜 180°                  |
| Pirouette (18)                            | 底部向上 关闭时倾斜 90°      |
| Pleated, Top Down Bottom Up (47)          | 顶部向下 底部向上              |
| Provenance Woven Wood (19)                | 底部向上                       |
| Roman (4)                                 | 底部向上                       |
| Silhouette (23)                           | 底部向上 关闭时倾斜 90°      |
| Silhouette Duolite (38)                   | 双遮盖重叠 倾斜 90°  |
| Skyline Panel, Left Stack (26)            | 垂直                        |
| Skyline Panel, Right Stack (27)           | 垂直                        |
| Skyline Panel, Split Stack (28)           | 垂直                        |
| Top Down (7)                              | 顶部向下                        |
| Twist (44)                                | 底部向上 关闭时倾斜 180°     |
| Venetian, Tilt Anywhere (51)              | 底部向上 任意位置倾斜 180°     |
| Venetian, Tilt Anywhere (62)              | 底部向上 任意位置倾斜 180°     |
| Vertical Slats, Left Stack (54)           | 垂直 任意位置倾斜 180°      |
| Vertical Slats, Right Stack (55)          | 垂直 任意位置倾斜 180°      |
| Vertical Slats, Split Stack (56)          | 垂直 任意位置倾斜 180°      |
| Vignette (31)                             | 底部向上                       |
| Vignette (32)                             | 底部向上                       |
| Vignette (84)                             | 底部向上                       |
| Vignette Duolite (65)                     | 双遮盖重叠           |

## 功能信息

### 底部向上

这些遮盖仅提供传统遮盖的简单上下移动。

### 顶部向下

这些遮盖提供与传统遮盖相反的独特移动，遮盖固定在地板上并从屋顶降下。

### 顶部向下 底部向上（TDBU）

TDBU 遮盖由两个导轨组成，由指定为顶部和底部的两个电机控制，中间是织物。
顶部和底部可以独立移动以覆盖窗户的不同部分，但不能越过另一个。

将为每个遮盖创建两个不同的实体：顶部和底部。

#### 顶部实体

* "向上/打开"将顶部导轨移动到窗户底部，并将底部导轨设置为其关闭位置。
* "向下/关闭"将顶部导轨移动到窗户顶部，并将底部导轨设置为其关闭位置。
* "位置"是顶部导轨可以从窗户顶部（0）移动到底部（100）的位置。
* 顶部导轨的位置不能越过底部导轨。如果设置不可能的位置，位置将回退到与请求最接近的可能值。

#### 底部实体

* "向上/打开"将底部导轨移动到窗户顶部，并将顶部导轨设置为其关闭位置。
* "向下/关闭"将底部导轨移动到窗户底部，并将顶部导轨设置为其关闭位置。
* "位置"是底部导轨可以从窗户底部（0）移动到顶部（100）的位置。
* 底部导轨的位置不能越过顶部导轨。如果设置不可能的位置，位置将回退到与请求最接近的可能值。

### 关闭时倾斜

具有关闭时倾斜功能的遮盖仅在关闭时允许遮盖倾斜，并在遮盖从关闭位置移动时自动关闭叶片。

### 任意位置倾斜

这些遮盖可以在任何位置倾斜，不需要遮盖打开或关闭即可调整倾斜位置。

### 双遮盖重叠

这些遮盖由连接到单个导轨的两块织物组成。前遮盖是透明的，后遮盖是不透明的，两个面板都不能独立移动。

将为每个遮盖创建三个不同的实体：前、后和组合。

#### 前实体

* "向上/打开"将前遮盖移动到天花板
* "向下/关闭"将前遮盖移动到地板
* 由于前遮盖的定位需要后不透明层完全打开，任何移动都将强制后遮盖打开

#### 后实体

* "向上/打开"将后遮盖移动到天花板
* "向下/关闭"将后遮盖移动到地板
* 由于后遮盖的定位需要前透明层完全关闭，任何移动都将强制前遮盖关闭

#### 组合实体

* "向上/打开"将前后遮盖移动到天花板
* "向下/关闭"将前后遮盖移动到地板
* 此实体将两个实体的移动合并为一个
  * 0-50 代表后遮盖
  * 51-100 代表前遮盖
* 支持倾斜的遮盖在此实体上也将具有倾斜功能
  * 倾斜时需要前透明层完全关闭，这将自动发生

## 按钮

### 校准

:::important
仅限第 1 代和第 2 代。

:::
启动遮盖位置校准。校准是 Duette 型遮盖的常见要求，这种遮盖带有用于降下和升起百叶窗的绳索，而卷帘型则较少需要。

### 识别

识别将"抖动"遮盖位置作为诊断工具，以确保您尝试移动的遮盖既是预期遮盖又能正确通信。

### 收藏

:::important
仅限第 1 代和第 2 代。

:::
将遮盖移动到设备上物理编程的收藏位置。这将执行与 pebble 遥控器上的心形相同的移动。

## 选择实体

### 电源类型

:::important
仅限第 1 代和第 2 代。

:::
设置连接电源的类型。可用选项包括硬连线电源、电池棒和可充电电池

## 数字实体

### 速度

:::important
仅限第 3 代。

:::
速度控制遮盖的移动速度。Hunter Douglas 的默认速度为 0；将其设置得更高将增加遮盖的速度。

## 示例自动化

### 调用 Powerview 场景

```yaml
alias: "夜间关闭百叶窗"
triggers:
  - trigger: time
    at: "18:00:00"
actions:
  - action: scene.turn_on
    target:
      entity_id: scene.10877
```

### 强制更新遮盖位置

不建议对电池供电的遮盖使用此自动化。

```yaml
alias: "强制更新"
description: "更新指定遮盖的位置"
triggers:
  - trigger: time_pattern
    hours: 1
actions:
  - action: homeassistant.update_entity
    target:
      entity_id:
        - cover.family_right
        - cover.family_left
        - cover.kitchen_roller
```
