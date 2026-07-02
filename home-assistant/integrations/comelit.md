# Comelit SimpleHome

**Comelit SimpleHome** 集成允许您控制您的 [Comelit 智能家居设备](https://comelitgroup.it/installatore/offerta/home-building-automation/)。

该集成提供已连接设备的信息，并支持报警系统的控制。

## 支持的设备

Home Assistant 支持以下设备：

* **Comelit Serial Bridge**
* **Comelit VEDO System**

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
  host:
    description: Comelit SmartHome 设备的 IP 地址。
  port:
    description: Comelit SmartHome 设备的 TCP 端口。默认为端口 80（HTTP 标准）。
  pin:
    description: Comelit SmartHome 设备的 PIN 码。
  type:
    description: Comelit SmartHome 设备的类型。
    keys:
      bridge:
        description: Comelit Serial Bridge。
      vedo:
        description: Comelit VEDO System。
```

## 示例

### 自动化：离开家时激活报警

```yaml
automation:
- alias: "Arm alarm away"
  id: "arm_alarm_away"
  triggers:
    - platform: state
      entity_id: person.simone
      to: "not_home"
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home
      data:
        code: "12345"
```

### 自动化：如果您不在家，日落时关闭遮盖

```yaml
automation:
- alias: Close covers at sunset
  id: "covers_close_sunset"
  trigger:
   - platform: sun
     event: sunset
  condition:
    conditions:
      - alias: "condition alias (not home)"
        condition: state
        entity_id: group.person_family
        state: "not_home"
  actions:
    entity_id:
      - cover.group_home_covers
    action: cover.close_cover
```

## 数据更新

此集成默认每 5 秒从设备 polls 一次数据。

## 支持的功能

**Comelit SimpleHome** 集成提供以下实体：

### Comelit Serial Bridge

* 气候
* 遮盖
* 除湿机
* 加湿器
* 灯光
* 传感器 - 功耗
* 开关 - 灌溉和插座（其他）

### Comelit VEDO System

* 报警控制面板 - 按区域
* 二值传感器 - 按区域存在检测
* 传感器 - 按区域状态

## 故障排除

### 无法设置设备

#### 症状："无法连接"

尝试设置集成时，表单显示消息"无法连接"。

##### 描述

这意味着指定的 IP 地址或端口错误。

##### 解决方法

要解决此问题，请通过在网页浏览器中访问来验证设备的 IP 地址和端口。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
