---
title: Habitica
description: 'Habitica 集成可让你在 Home Assistant 中监控自己在 Habitica(https://habitica.com/) 中的冒险者进度和属性，并无缝整合待办事项、日常任务等内容。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Calendar
  - Image
  - Sensor
  - To-do list
ha_release: 0.78
ha_iot_class: Cloud Polling
ha_domain: habitica
ha_platforms:
  - binary_sensor
  - button
  - calendar
  - diagnostics
  - image
  - notify
  - sensor
  - switch
  - todo
ha_codeowners:
  - '@tr4nt0r'
ha_config_flow: true
ha_integration_type: service
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://habitica.com/
    title: Habitica
ha_quality_scale: platinum
---
# Habitica

**Habitica** 集成可让你在 Home Assistant 中监控自己在 [Habitica](https://habitica.com/) 中的冒险者进度和属性，并无缝整合待办事项、日常任务等内容。

## 关于 Habitica

Habitica 是一个游戏化任务管理器和习惯追踪器，它会把你的日常目标和待办事项变成角色扮演游戏，帮助你在获取奖励、提升角色等级的同时保持动力和效率。

## 你可以如何使用此集成

Habitica 集成可让你自动化管理任务，例如在家电运行完成时创建待办事项，或通过智能传感器将日常任务标记为已完成。你还可以在 Home Assistant 仪表板中可视化任务和属性，或为到期任务创建通知，帮助你保持条理并持续朝目标前进。

## Habitica 集成前提条件

- 要设置 Habitica 集成，你首先需要一个有效的 Habitica 账户。你可以在 [Habitica.com](https://habitica.com/) 注册。
- 在 Home Assistant 的设置过程中，你可以在两种登录方式之间进行选择：
  - “Login to Habitica”：使用你的*用户名*或*电子邮件地址*以及*密码*登录。
  - “Login to other instances”：需要提供你的 `User ID` 和 `API Token`。你可以登录 Habitica 账户后，前往 **Settings** 菜单并选择 **Site Data** 来获取 `User ID` 和 `API Token`。
  - 此外，你还需要提供想要连接的 Habitica 实例 URL；默认 URL 为 `https://habitica.com`，如果你使用的是其他 Habitica 实例或自托管实例，也可以指定不同的 URL。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 登录到 Habitica

```yaml
"Email or username":
  description: "用于将 Home Assistant 连接到 Habitica 账户的电子邮件或用户名（区分大小写）"
Password:
  description: "用于将 Home Assistant 连接到 Habitica 的账户密码"
```

### 高级配置

如果你选择“**Login to other instances**”，将看到以下配置选项：

```yaml
"User ID":
  description: "你的 Habitica 账户的 User ID（*参见[前提条件](#prerequisites-for-habitica-integration)*）"
API Token:
  description: "Habitica 账户的 API Token（*参见[前提条件](#prerequisites-for-habitica-integration)*）"
URL:
  description: "要连接的 Habitica 安装实例 URL。默认为 `https://habitica.com`（*参见[前提条件](#prerequisites-for-habitica-integration)*）"
Verify SSL certificate:
  description: 为安全连接启用 SSL 证书验证。仅当连接使用自签名证书的 Habitica 实例时才应禁用
```

## 传感器

- **Class**：显示角色职业（Warrior、Rogue、Healer 或 Mage）。
- **Display name**：显示角色昵称。
- **Experience**：显示角色当前经验值（例如 "144 XP"）。
- **Gold**：显示角色拥有的金币数量（例如 "22.29 GP"）。
- **Health**：显示角色当前生命值（例如 "42 HP"）。
- **Level**：显示角色当前等级。
- **Mana**：显示角色当前法力值（例如 "61 MP"）。
- **Max. mana**：显示角色在当前等级下可拥有的最大法力值（例如 "70 MP"）。
- **Next level**：显示升到下一级所需的剩余经验值（例如 "440 XP"）。
- **Gems**：显示角色当前拥有的宝石总数，可用于购买物品和个性化内容。
- **Mystic hourglasses**：显示作为订阅者获得的神秘沙漏数量，可兑换过去活动中的专属物品。
- **Strength, intelligence, constitution, perception**：显示角色属性点。传感器属性中会细分等级、战斗装备、职业装备加成、分配点数和增益带来的贡献。
- **Eggs**：显示背包中的蛋总数。传感器属性会提供每种蛋的详细类型和数量列表。
- **Pet food**：显示当前可用食物总量。传感器属性会列出每种食物的类型和数量。你可以把它喂给宠物，它们也许会成长为坐骑。
- **Saddles**：显示你拥有的马鞍数量，可用于立即将宠物培养为坐骑。
- **Hatching potions**：显示可用孵化药水总数。传感器属性会详细列出每种药水的类型和数量。把它倒在蛋上即可孵化宠物。
- **Quest scrolls**：显示背包中的任务卷轴总数。传感器属性中会提供每种任务卷轴及其数量列表。
- **Pending damage**：显示当天通过完成任务累积的总伤害值。该伤害会在当天结束时用于攻击任务 Boss。
- **Pending quest items**：显示当天完成任务时获得的任务物品。总数会在当天结束时计入任务目标。
- **Last check-in**：显示用户上次签到时间。

## 二进制传感器

- **Pending quest invitation**：显示你是否有等待回应的任务邀请。
  
## 图像

- **Avatar**：显示角色当前头像（注意：当前不支持动态头像，会以静态图片显示）。

## 待办列表

以下 Habitica 任务会在 Home Assistant 中作为待办列表提供。你可以添加、删除、编辑并勾选已完成任务。

- **To-Do's**：显示活动中和已完成的待办事项完整列表。每个待办事项都会在适用时显示截止日期，方便你勾选、编辑、删除或创建新的待办事项。
- **Dailies**：显示今天或未来需要完成的日常任务。昨天完成的任务在新一天开始前，仍可作为 "yesterdailies" 进行标记。

## 日历

将创建以下日历：

- **To-Do calendar**：列出所有活动中待办任务的截止日期。该日历中的每个事件都代表一个设置了截止日期的待办事项，方便你追踪即将到来的期限并安排计划。
- **Dailies calendar**：显示今天安排且仍处于活动状态的所有日常任务，也会显示未来日期安排的任务，帮助你保持条理并跟踪即将到来的日程。如果今天还有未完成任务，日历传感器会处于活动状态，并显示下一个到期的日常任务（如果当天有多个任务，则按排序顺序决定）。
- **To-Do reminders calendar**：列出与你在 Habitica 中待办事项相关的提醒事件，帮助你了解特定待办事项的通知何时触发。
- **Dailies reminders calendar**：显示与你在 Habitica 中日常任务相关的提醒事件，确保你知道日常任务通知何时发生。

## 按钮控制

- **Start my day**：在 Habitica 中启动每日例行流程，包括重置日常任务、结算未完成日常任务和任务 Boss 造成的伤害、调整习惯、结束增益效果，以及根据已完成日常任务恢复法力。
- **Revive from death**：让角色在 Habitica 中复活。复活后生命值会完全恢复，但角色会失去所有金币、1 个等级、全部经验值、1 个属性点以及 1 件装备。
- **Buy a health potion**：让角色在 Habitica 中购买生命药水。购买后会立即使用，消耗 25 GP 恢复 15 HP。
- **Allocate all stat points**：根据之前设置的自动分配方式分配所有未分配属性点。如果未设置分配方式，则所有点数都会分配给力量（STR）。

## 职业技能按钮控制

如果你已解锁职业系统，则会根据你选择的职业提供施放个人和队伍技能的按钮控制。任务技能请参见[动作 `habitica.cast_skill`](#action-habiticacast_skill)。

### Mage

- **Ethereal surge**：你牺牲法力，让队伍中除其他法师外的成员获得 MP。（基于：INT）
- **Earthquake**：你的精神力量撼动大地，并提升全队的智力。（基于：未加成 INT）
- **Chilling frost**：施放后，寒冰会冻结你的所有连击，使其明天不会归零。

### Warrior

- **Defensive stance**：你压低身形并获得体质增益。（基于：未加成 CON）
- **Valorous presence**：你的勇气会提升全队的力量。（基于：未加成 STR）
- **Intimidating gaze**：你凶狠的目光会提升全队的体质。（基于：未加成 CON）

### Rogue

- **Tools of the trade**：你的技巧会提升全队的感知。（基于：未加成 PER）
- **Stealth**：每次施放后，你的一部分未完成日常任务今晚将不会造成伤害，它们的连击和颜色也不会变化。（基于：PER）

### Healer

- **Healing light**：闪耀的光芒会恢复你的生命值。（基于：CON 和 INT）
- **Searing brightness**：一道强光会让你的任务更偏蓝、没那么偏红。（基于：INT）
- **Protective aura**：你通过提升队伍体质来保护全队。（基于：未加成 CON）
- **Blessing**：你安抚人心的法术会恢复全队生命值。（基于：CON 和 INT）

## 开关控制

- **Rest in the Inn**：启用后，角色可在 Habitica 的旅店中休息，并暂停来自日常任务和任务 Boss 的伤害。

## 通知器

- **Party chat**：向队伍群聊发送消息。
- **Private message**：向队伍中的单个成员发送私信。系统会为队伍中的每位成员创建一个单独的 notify 实体。

## 队伍

如果你属于某个队伍，此集成会创建一个包含以下实体的设备。

- **Boss health**：任务 Boss 的总生命值。
- **Boss health remaining**：任务 Boss 的剩余生命值。
- **Collected quest items**：显示已收集物品总数。属性中会细分每种所需物品类型，并显示已收集数量和所需数量。
- **Group leader**：队伍队长的用户名。
- **Member count**：当前队伍成员数量。
- **Quest**：显示队伍当前正在进行的任务名称。
- **Quest boss**：显示队伍当前正在对战的敌人名称和图像。
- **Boss rage**：任务参与者未完成日常任务时累积的怒气值。
- **Boss rage limit break**：任务 Boss 可积累的最大怒气值。达到上限后，Boss 会释放怒气技能。

:::note
某些实体仅会在你参与 Boss 任务或收集任务时提供。


:::
### 关注你的队友状态

你可以将队伍成员添加到 Home Assistant 中，以便查看他们的生命值和其他关键属性。要添加队伍成员，请前往 [**Settings** > **Devices & services** > **Habitica**](https://my.home-assistant.io/redirect/integration/?domain=habitica)，然后选择 **`[mdi:plus]` Add party member**。

添加后，Home Assistant 会创建一个新的条目，其中包含以下实体：

- **Sensors**：Class、display name、health、mana、max. mana、experience、next level、strength、intelligence、constitution 和 perception。
- **Image**：Avatar

有关这些实体的详细说明，请参见上方的 [**Sensors**](#sensors) 和 [**Image**](#image) 部分。

## 动作

### 动作：施放技能

`habitica.cast_skill` 动作会让你的 Habitica 角色对特定任务使用技能或法术，以影响其进度或状态。

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `config_entry` | no       |  要施放技能的角色对应的配置条目。 |
| `skill`        | no       |  要对任务施放的技能或法术。只能使用角色职业可用的技能。 |
| `task`         | no       |  要作为目标的任务名称。你也可以使用 `task ID` 或 **alias**。支持的任务类型包括 **to-do**、**habit** 和 **daily**。 |

#### 可用技能

- **Rogue**: `pickpocket`, `backstab`
- **Warrior**: `smash`
- **Mage**: `fireball`

要使用任务别名，请确保已在 [**Settings** > **Site Data**](https://habitica.com/user/settings/siteData) 下启用 **Developer Mode**。任务别名只能通过 **Habitica** Web 客户端编辑。

### 动作：接受任务

`habitica.accept_quest` 动作用于接受待处理的任务邀请。示例请参见[`自动接受任务邀请`](#auto-accept-quest-invitation)自动化，其中演示了如何使用此动作自动接受任务邀请。

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | 用于接受任务邀请的角色配置条目。 |

### 动作：拒绝任务

`habitica.reject_quest` 动作用于拒绝待处理的任务邀请。

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | 用于拒绝任务邀请的角色配置条目。 |

### 动作：离开任务

`habitica.leave_quest` 动作用于离开你当前参与的任务。

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | 用于离开任务的角色配置条目。 |

### 动作：终止任务 🔒

`habitica.abort_quest` 动作用于终止队伍当前正在进行的任务。所有进度都会丢失，任务卷轴会退回到拥有者的背包中。只有任务发起者或队长才能执行此动作。

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | 用于终止任务的角色配置条目。 |

:::note
带有 🔒 标记的动作存在使用限制。详情请参阅对应动作说明。


:::
### 动作：开始任务 🔒

`habitica.start_quest` 动作用于立即开始任务，并跳过所有尚未接受或拒绝的待处理邀请。只有任务发起者或队长才能执行此动作。

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | 用于强制开始任务的角色配置条目。 |

### 动作：取消任务 🔒

`habitica.cancel_quest` 动作用于取消尚未开始的任务。所有已接受和待处理的邀请都会被取消，任务卷轴会退回到拥有者的背包中。只有任务发起者或队长才能执行此动作。

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `config_entry` | no       | 用于取消任务的角色配置条目。 |

### 动作：记录习惯

`habitica.score_habit` 动作用于增加某个习惯的正向或负向连击。

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `config_entry` | no       |  用于记录该习惯的角色配置条目。 |
| `task`         | no       |  要记录的习惯名称、`task ID` 或 **alias**。 |
| `direction`    | no       |  `up` 表示记录正向进展，`down` 表示记录负向进展。 |

### 动作：购买奖励

`habitica.score_reward` 动作用于用金币购买自定义奖励。

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `config_entry` | no       |  用于购买奖励的角色配置条目。 |
| `task`         | no       |  要购买的自定义奖励名称、`task ID` 或 **alias**。 |

### 动作：变形

`habitica.transformation` 动作用于对你自己或队伍成员使用 Habitica 角色背包中的变形道具。

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `config_entry` | no       |  使用变形道具的角色配置条目。 |
| `item`         | no       |  要使用的变形道具。该道具必须在角色背包中。 |
| `target`       | no       |  要使用变形道具的目标角色。可按显示名、用户名或用户 ID 匹配。 |

#### 可用变形道具

- **Snowball**：`snowball`（变成雪人伙伴）
- **Spooky sparkles**：`spooky_sparkles`（变成幽灵）
- **Seafoam**：`seafoam`（变成海星）
- **Shiny seed**：`shiny_seed`（变成花朵）

### 动作：获取任务

`habitica.get_tasks` 动作用于从你的 Habitica 账户中获取任务，并可通过可选筛选条件缩小结果范围，以更精确地检索任务。

| Data attribute   | Optional | Description                                                                                              |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `config_entry`   | no       | 选择要从中获取任务的 Habitica 角色。 |
| `type`           | yes      | 按类型筛选任务。有效值：`habits`、`dailies`、`todos`、`rewards`。 |
| `priority`       | yes      | 按难度筛选任务。有效值：`trivial`、`easy`、`medium`、`hard`。 |
| `task`           | yes      | 通过任务名称（或任务 ID）选择特定任务。 |
| `tag`            | yes      | 筛选带有一个或多个所选标签的任务。 |
| `keyword`        | yes      | 按关键字筛选任务，会在标题、备注和检查清单中搜索。 |

### 动作：更新奖励

`habitica.update_reward` 动作用于更新所选 Habitica 角色的特定奖励。

| Data attribute | Optional | Description                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `config_entry` | no       | 选择要更新奖励的 Habitica 账户。 |
| `task`         | no       | 要更新的奖励名称（或任务 ID）。 |
| `rename`       | yes      | Habitica 奖励的新标题。 |
| `notes`        | yes      | Habitica 奖励的新备注。 |
| `cost`         | yes      | 更新奖励花费。 |
| `tag`          | yes      | 为 Habitica 奖励添加标签。如果标签不存在，将自动创建。 |
| `remove_tag`   | yes      | 从 Habitica 奖励中移除标签。 |
| `alias`        | yes      | 可使用任务别名代替名称或任务 ID。仅支持短横线、下划线和字母数字字符，且该别名在所有任务中必须唯一。 |

### 动作：创建奖励

`habitica.create_reward` 动作用于为所选 Habitica 角色创建奖励。

| Data attribute | Optional | Description                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `config_entry` | no       | 选择要创建奖励的 Habitica 账户。 |
| `name`         | no       | Habitica 奖励的标题。 |
| `notes`        | yes      | Habitica 奖励的备注。 |
| `cost`         | no       | 奖励花费。 |
| `tag`          | yes      | 为 Habitica 奖励添加标签。如果标签不存在，将自动创建。 |
| `alias`        | yes      | 可使用任务别名代替名称或任务 ID。仅支持短横线、下划线和字母数字字符，且该别名在所有任务中必须唯一。 |

### 动作：更新习惯

`habitica.update_habit` 动作用于更新所选 Habitica 角色的特定习惯。

| Data attribute | Optional | Description                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `config_entry` | no       | 选择要更新习惯的 Habitica 账户。 |
| `task`         | no       | 要更新的习惯名称（或任务 ID）。 |
| `rename`       | yes      | Habitica 习惯的新标题。 |
| `notes`        | yes      | Habitica 习惯的新备注。 |
| `up_down`      | yes      | Update if the habit is good and rewarding (positive), bad and penalizing (negative) or both. Valid values: `up`, `down`, or `[up, down]` |
| `priority`     | yes      | Update the difficulty of a habit. Valid values: `trivial`, `easy`, `medium`, `hard`          |
| `frequency`    | yes      | Update when a habit's counter resets. Valid values: `daily`, `weekly`, `monthly`             |
| `tag`          | yes      | 为 Habitica 习惯添加标签。如果标签不存在，将自动创建。 |
| `remove_tag`   | yes      | Remove tags from the Habitica habit.                                                         |
| `counter_up`   | yes      | Update the up counter of a positive habit.                                                   |
| `counter_down` | yes      | Update the down counter of a negative habit.                                                 |
| `alias`        | yes      | 可使用任务别名代替名称或任务 ID。仅支持短横线、下划线和字母数字字符，且该别名在所有任务中必须唯一。 |

### 动作：创建习惯

`habitica.create_habit` 动作用于为所选 Habitica 角色创建习惯。

| Data attribute | Optional | Description                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `config_entry` | no       | 选择要创建习惯的 Habitica 账户。 |
| `name`         | no       | Habitica 习惯的标题。 |
| `notes`        | yes      | Habitica 习惯的备注。 |
| `up_down`      | yes      | Defines if the habit is good and rewarding (positive), bad and penalizing (negative) or both. Valid values: `up`, `down`, or `[up, down]` |
| `priority`     | yes      | Sets the difficulty of the habit. Valid values: `trivial`, `easy`, `medium`, `hard`. Default: `easy` |
| `frequency`    | yes      | Defines when the habit's counter resets. Valid values: `daily`, `weekly`, `monthly`. Default: `daily` |
| `tag`          | yes      | 为 Habitica 习惯添加标签。如果标签不存在，将自动创建。 |
| `alias`        | yes      | 可使用任务别名代替名称或任务 ID。仅支持短横线、下划线和字母数字字符，且该别名在所有任务中必须唯一。 |

### 动作：更新待办事项

The `habitica.update_todo` action updates a specific to-do for the selected Habitica character.

| Data attribute | Optional | Description                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `config_entry` | no       | Select the Habitica account to update a to-do.                                               |
| `task`         | no       | The name (or task ID) of the to-do you want to update.                                       |
| `rename`       | yes      | The new title for the Habitica to-do.                                                        |
| `notes`        | yes      | The new notes for the Habitica to-do.                                                        |
| `add_checklist_item`     | yes | The items to add to the to-do's checklist.                                              |
| `remove_checklist_item`  | yes | Remove items from a to-do's checklist.                                                  |
| `score_checklist_item`   | yes | Mark items from a to-do's checklist as completed.                                       |
| `unscore_checklist_item` | yes | Undo completion of items of a to-do's checklist.                                        |
| `collapse_checklist`     | yes | Whether the checklist is displayed as collapsed or expanded.                            |
| `priority`     | yes      | Update the difficulty of a to-do. Valid values: `trivial`, `easy`, `medium`, `hard`          |
| `date`         | yes      | The to-do's due date.                                                                        |
| `clear_date`   | yes      | Remove the due date from a to-do.                                                            |
| `reminder`     | yes      | Add reminders to a Habitica to-do.                                                           |
| `remove_reminder` | yes   | Remove specific reminders from a Habitica to-do.                                             |
| `clear_reminder`  | yes   | Remove all reminders from a Habitica to-do.                                                  |
| `tag`          | yes      | Add tags to the Habitica to-do. If a tag does not already exist, a new one will be created.  |
| `remove_tag`   | yes      | Remove tags from the Habitica to-do.                                                         |
| `alias`        | yes      | A task alias can be used instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The task alias must be unique among all your tasks. |

### 动作：创建待办事项

The `habitica.create_todo` action creates a to-do for the selected Habitica character.

| Data attribute | Optional | Description                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `config_entry` | no       | Select the Habitica account to create a to-do.                                               |
| `name`         | no       | The title for the Habitica to-do.                                                            |
| `notes`        | yes      | The notes for the Habitica to-do.                                                            |
| `add_checklist_item`     | yes | The items to add to the to-do's checklist.                                              |
| `collapse_checklist`     | yes | Whether the checklist is displayed as collapsed or expanded.                            |
| `priority`     | yes      | The difficulty of the to-do. Valid values: `trivial`, `easy`, `medium`, `hard`               |
| `date`         | yes      | The to-do's due date.                                                                        |
| `reminder`     | yes      | Add reminders to a Habitica to-do.                                                           |
| `tag`          | yes      | Add tags to the Habitica to-do. If a tag does not already exist, a new one will be created.  |
| `alias`        | yes      | A task alias can be used instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The task alias must be unique among all your tasks. |

### 动作：更新日常任务

The `habitica.update_daily` action updates a specific daily for the selected Habitica character.

| Data attribute | Optional | Description                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `config_entry` | no       | Select the Habitica account to update a daily.                                               |
| `task`         | no       | The name (or task ID) of the daily you want to update.                                       |
| `rename`       | yes      | The new title for the Habitica daily.                                                        |
| `notes`        | yes      | The new notes for the Habitica daily.                                                        |
| `add_checklist_item`     | yes | The items to add to the daily's checklist.                                              |
| `remove_checklist_item`  | yes | Remove items from a daily's checklist.                                                  |
| `score_checklist_item`   | yes | Mark items from a daily's checklist as completed.                                       |
| `unscore_checklist_item` | yes | Undo completion of items of a daily's checklist.                                        |
| `collapse_checklist`     | yes | Whether the checklist is displayed as collapsed or expanded.                            |
| `priority`     | yes      | Update the difficulty of a daily. Valid values: `trivial`, `easy`, `medium`, `hard`          |
| `start_date`   | yes      | Defines when the daily task becomes active and specifies the exact weekday or day of the month it repeats on. |
| `frequency`    | yes      | The repetition interval of a daily. Valid values: `daily`, `weekly`, `monthly`, `yearly`.    |
| `every_x`      | yes      | The number of intervals (`days`, `weeks`, `months`, or `years`) after which the daily repeats, based on the chosen repetition interval. A value of 0 makes the daily inactive (a *Gray Daily*). |
| `repeat`       | yes      | The days of the week the daily repeats. Applicable when the repetition interval is set to weekly. |
| `repeat_monthly` | yes    | Whether a monthly recurring task repeats on the same calendar day each month (`day_of_month`), or on the same weekday and week of the month (`day_of_week`), based on the start date. Applicable when the repetition interval is set to monthly. |
| `reminder`     | yes      | Add reminders to a Habitica daily.                                                           |
| `remove_reminder` | yes   | Remove specific reminders from a Habitica daily.                                             |
| `clear_reminder`  | yes   | Remove all reminders from a Habitica daily.                                                  |
| `tag`          | yes      | Add tags to the Habitica daily. If a tag does not already exist, a new one will be created.  |
| `remove_tag`   | yes      | Remove tags from the Habitica daily.                                                         |
| `streak`       | yes      | Adjust or reset the streak counter of the daily.                                             |
| `alias`        | yes      | A task alias can be used instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The task alias must be unique among all your tasks. |

### 动作：创建日常任务

The `habitica.create_daily` action creates a daily for the selected Habitica character.

| Data attribute | Optional | Description                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `config_entry` | no       | Select the Habitica account to create a daily.                                               |
| `name`         | no       | The title for the Habitica daily.                                                            |
| `notes`        | yes      | The new notes for the Habitica daily.                                                        |
| `add_checklist_item` | yes | The items to add to the daily's checklist.                                                  |
| `collapse_checklist` | yes | Whether the checklist is displayed as collapsed or expanded.                                |
| `priority`     | yes      | The difficulty of a daily. Valid values: `trivial`, `easy`, `medium`, `hard`                 |
| `start_date`   | yes      | The date when the daily becomes active and specifies the exact weekday or day of the month it repeats on. |
| `frequency`    | yes      | The repetition interval of a daily. Valid values: `daily`, `weekly`, `monthly`, `yearly`.    |
| `every_x`      | yes      | The number of intervals (`days`, `weeks`, `months`, or `years`) after which the daily repeats, based on the chosen repetition interval. A value of 0 makes the daily inactive (a *Gray Daily*). |
| `repeat`       | yes      | The days of the week the daily repeats. Applicable when the repetition interval is set to weekly. |
| `repeat_monthly` | yes    | Whether a monthly recurring task repeats on the same calendar day each month (`day_of_month`), or on the same weekday and week of the month (`day_of_week`), based on the start date. Applicable when the repetition interval is set to monthly. |
| `reminder`     | yes      | Add reminders to a Habitica daily.                                                           |
| `tag`          | yes      | Add tags to the Habitica daily. If a tag does not already exist, a new one will be created.  |
| `alias`        | yes      | A task alias can be used instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The task alias must be unique among all your tasks. |

## 自动化

你可以从以下 Habitica 自动化示例开始，每个示例都附带可直接使用的蓝图。

### 自动接受任务邀请

自动接受来自 Habitica 队伍的任务邀请，并创建持久通知，告知你任务已成功接受。

[![Open **Import blueprint** in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fcommunity.home-assistant.io%2Ft%2Fhabitica-auto-accept-quest-invitation%2F791002)

<details>
<summary>YAML 配置示例</summary>


```yaml
triggers:
  - trigger: state
    entity_id: binary_sensor.habitica_pending_quest_invitation
    from: "off"
    to: "on"
actions:
  - action: habitica.accept_quest
    data:
      config_entry: config_entry_id
    response_variable: action_response
  - action: notify.persistent_notification
    data:
      title: You have been invited to a quest!
      message: >-
        ![{{action_response["key"]}}](https://habitica-assets.s3.amazonaws.com/mobileApp/images/inventory_quest_scroll_{{action_response["key"]}}.png)

        The invitation has been accepted, and the quest {% if
        action_response["active"] %}has already started{% else %}is waiting
        for other party members to join{% endif %}.
```


</details>

:::note
创建自动化时，请注意[速率限制](#known-limitations)。频繁触发或同时运行多个自动化，可能很快就会超过允许的请求数量。

:::
### 创建“清空洗碗机”待办事项

在洗碗机完成洗涤周期时自动创建 Habitica 待办事项。

[![Open **Import blueprint** in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fcommunity.home-assistant.io%2Ft%2Fhabitica-create-to-do-when-dishwasher-finishes-its-cycle%2F786625)

<details>
<summary>YAML 配置示例</summary>


```yaml
triggers:
  - trigger: state
    entity_id: sensor.dishwasher
    from: "on"
    to: "off"

actions:
  - action: todo.add_item
    data:
      item: "Empty the dishwasher 🥣🍽️"
      due_date: "{{now().date()}}"
      description: "Empty the clean dishes from the dishwasher and load any dirty dishes that are waiting."
    target:
      entity_id: todo.habitica_to_dos
```


</details>

### 完成 Habitica 日常列表中的刷牙任务

当检测到牙刷正在使用时，自动将你早晨和晚上的刷牙日常任务标记为已完成。

[![Open **Import blueprint** in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fcommunity.home-assistant.io%2Ft%2Fhabitica-complete-toothbrushing-tasks-on-your-habitica-dailies-list%2F786631)

<details>
<summary>YAML 配置示例</summary>


```yaml
triggers:
  - trigger: state
    entity_id: sensor.oralb_toothbrush_state
    to: "running"
    for:
      hours: 0
      minutes: 0
      seconds: 10 # Time delay for debouncing to avoid false triggers
actions:
  - choose:
      - conditions:
          - condition: time
            after: "05:00:00"
            before: "12:00:00"
        sequence:
          - action: todo.update_item
            data:
              item: "Brush your teeth in the morning 🪥"
              status: completed
            target:
              entity_id: todo.habitica_dailies
      - conditions: 
          - condition: time
            after: "18:00:00"
            before: "23:59:00"
        sequence:
          - action: todo.update_item
            data:
              item: "Brush your teeth before bed 🪥"
              status: completed
            target:
              entity_id: todo.habitica_dailies
```


</details>

## 数据更新

此集成每 60 秒与 Habitica 同步一次，以保持你的个人数据为最新状态。
队伍数据（包括你作为子条目添加的所有队伍成员）每 15 分钟刷新一次。

## 已知限制

Habitica 对第三方应用设置了每分钟 30 次请求的速率限制，这一限制会作用于你使用的所有工具和集成的总请求量。

此集成会执行以下请求：

- 每次数据更新会发起 3 次请求（每 60 秒一次）。
- 每执行一个动作会发起 1 次请求，例如施放技能或与待办事项、日常任务交互。
- 在执行动作后 5 秒，还会额外发起 1 次请求，以便与 Habitica 同步数据。

请牢记这些限制，以避免超出 Habitica 允许的请求额度。目前仍在持续优化该集成，以减少其发出的请求数量。

## 故障排除

Habitica 集成依赖有效的互联网连接来与 **Habitica** 通信。如果你遇到问题，请先确认网络连接稳定。此外，Habitica 服务本身也可能因突发故障或计划维护而暂时不可用。遇到这种情况时，你可以参考由社区维护的 Habitica Wiki 上的 [Habitica Outage Instructions](https://habitica.fandom.com/wiki/Outage_Instructions)。

无论如何，在报告问题时，请启用[调试日志](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，重启该集成，并在问题再次出现后立即停止调试日志（*调试日志文件会自动开始下载*）。此外，如果条件允许，也请下载[诊断](/home-assistant/integrations/diagnostics)数据。如果你已经收集了调试日志和诊断数据，请一并附在问题报告中。

## 移除此集成

你可以按以下步骤移除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
