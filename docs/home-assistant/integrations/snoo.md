---
title: Happiest Baby Snoo
description: 有关如何将 Snoo 集成到 Home Assistant 的说明
ha_category:
  - Binary Sensor
  - Event
  - Select
  - Sensor
  - Switch
ha_iot_class: Cloud Push
ha_release: 2025.3
ha_config_flow: true
ha_codeowners:
  - '@Lash-L'
ha_domain: snoo
ha_platforms:
  - binary_sensor
  - button
  - event
  - select
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

[Snoo](https://www.happiestbaby.com/products/snoo-smart-bassinet) 是由 [Happiest Baby](https://www.happiestbaby.com/) 推出的智能婴儿床，帮助宝宝入睡并保持睡眠状态。


## 安装集成
此集成遵循标准的集成安装流程，无需额外步骤。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 二进制传感器

### 左右安全卡扣

显示左侧或右侧安全卡扣是否已连接到宝宝的襁褓。

## 事件

### Snoo 事件

这些是设备广播出来的事件，其中最值得关注的是宝宝哭泣事件。

可能的事件包括：

- Timer - 当前 Snoo 等级的计时器已启动或更新。
- Cry - Snoo 检测到宝宝哭泣。
- Command sent - Snoo 收到了一条命令。
- Safety clip changed - 左侧或右侧安全卡扣已断开或连接。
- Long activity press - 长按活动按钮。
- Activity press - 短按活动按钮。
- Power button pressed - 按下电源按钮。
- Status requested - 集成或移动应用请求了状态更新。
- Sleepytime sounds updated - Sleepytime sounds 已被开启或关闭。
- Config change - 某项配置已更改，例如 motion limiter。

## 传感器

### 状态

Snoo 可能处于以下 8 种状态之一：
1. Baseline - Snoo 启动时的基础状态，尚未检测到需要进一步安抚。
2. Level 1 - 最低级别的安抚
3. Level 2
4. Level 3
5. Level 4
6. Stop - Snoo 已停止运行
7. Pre-timeout - Snoo 正准备回到停止旋转状态
8. Timeout - Snoo 正在停止旋转

## 剩余时间
该值表示 Snoo 距离下次切换等级还有多久；如果当前没有计划切换等级，则显示为 Unknown。

## 选择器

### 强度

这允许您设置 Snoo 的安抚等级。

1. Baseline - Snoo 启动时的基础状态，尚未检测到需要进一步安抚。
2. Weaning baseline - 与 Baseline 相同，但不包含运动。
3. Level 1 - 最低级别的安抚。
4. Level 2
5. Level 3
6. Level 4
7. Stop - Snoo 已停止运行。

## 开关

### 等级锁定

将 SNOO 的节奏锁定在宝宝偏好的等级（Baseline、Level 1 或 Level 2）。

### Sleepytime sounds

允许您在把宝宝放入 SNOO 前，或在抱出宝宝换尿布/喂奶后，开启 SNOO 的安抚声音。

## 按钮

### Start

为 SNOO 启动 Sleepytime sounds 和运动。此操作会遵循 car ride 或 weaning mode 等设置。

## 移除此集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
