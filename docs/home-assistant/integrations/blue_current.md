---
title: Blue Current
description: 'Blue Current(https://www.bluecurrent.nl/) 是一家制造电动汽车充电器的荷兰公司。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Car
  - Sensor
  - Switch
ha_release: 2024.1
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@gleeuwen'
  - '@NickKoepr'
  - '@jtodorova23'
ha_domain: blue_current
ha_platforms:
  - button
  - sensor
  - switch
ha_integration_type: hub
---
# Blue Current

[Blue Current](https://www.bluecurrent.nl/) 是一家制造电动汽车充电器的荷兰公司。

Blue Current 集成允许您将 blue current 账户连接到 Home Assistant 并监控您的充电桩。

## 前提条件

1. 登录 [my.bluecurrent.nl](https://my.bluecurrent.nl/)。
2. 点击您的用户名并转到设置。
3. 启用高级选项。
4. 再次点击您的用户名并转到高级。
5. 生成 API 令牌。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

Blue Current 集成提供以下传感器：

### 充电桩传感器

- 活动
- 平均电流
- 平均电压
- 能耗（kWh）
- 最大用量（安培）
  - 充电桩可使用的最大安培数。
- 离线时间
- 开始时间
- 停止时间
- 总费用（欧元）
- 总功率（估计）
- 车辆状态

以下传感器也会创建，但默认禁用：

- 电流相位 1-3
- 离线最大用量
- 剩余电流
- 智能充电最大用量
- 电压相位 1-3

### 电网传感器

- 电网平均电流
- 电网最大电流

以下传感器也会创建，但默认禁用：

- 电网电流相位 1-3

## 按钮

Blue Current 集成提供以下按钮：

### 充电桩按钮

- 重置
- 重启
- 停止充电会话

## 动作
Blue Current 集成提供以下动作：

### 动作：启动充电会话

`blue_current.start_charge_session` 动作允许您启动新的充电会话。当未提供充电卡 ID 时，将不使用充电卡。

| 数据属性 | 可选 | 描述 |
| -------------- | -------- | ----------- |
| `device_id` | 否 | 充电桩设备 ID |
| `charging_card_id` | 是 | 用于启动充电会话的充电卡 ID。 |

## 开关

Blue Current 集成提供以下开关：

- 切换 **即插即充**
  - 允许您无需扫描卡片即可启动会话。
- 仅切换已关联的充电卡
  - 启用后，访客无法使用充电桩。仅允许已关联的充电卡。
- 切换充电桩锁定
  - 启用或禁用充电桩。