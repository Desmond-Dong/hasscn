---
title: Satel Integra
description: 有关如何使用 Satel 的 ETHM 网络扩展将 Satel Integra 报警面板与 Home Assistant 集成的说明。
ha_category:
  - Alarm
  - Binary sensor
  - Hub
  - Switch
ha_release: 0.54
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Tommatheussen'
ha_domain: satel_integra
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - diagnostics
  - switch
ha_integration_type: device
---
# Satel Integra

**Satel Integra** 集成可让您将 [Satel Integra 报警系统](https://www.satel.pl/en/product-category/intruder-alarms/integra/) 连接到 Home Assistant，以控制并监控报警系统。

Home Assistant 目前支持以下设备类型：

- Binary sensor：报告分区或输出状态
- Switch：允许设置所选输出的状态
- Alarm control panel：表示分区（波兰语为 “strefa”），会报告其状态，并可用于布防/撤防该分区

该模块通过 Satel 在其网站上公开的 TCP 协议进行通信。它会订阅报警系统发出的新事件，并立即作出响应。

## 支持的设备

此集成仅支持固件版本 2.00 或更高的 **ETHM-1 Plus**。同时仅支持 Integra 系列报警系统。

## 前提条件

1. 打开 [DLOADX](https://www.satel.eu/nl/product/343/DLOADX,INTEGRA-en-VERSA-Alarmsysteem-installatie-programma) 安装程序。
2. 打开您现有的项目文件。
3. 打开 **System and hardware structure** 选项卡。
4. 进入 **Hardware** 部分，展开树状结构并选择 **ETHM-1 Plus** 模块。
5. 勾选 **Integration** 复选框。
6. 取消勾选 **Encrypted integration**。当前不支持加密连接。

:::note
如果您无法访问 DLOADX 程序或项目文件，请联系安装人员为您调整这些设置。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: Satel Integra ETHM 模块的 IP 地址。
Port:
  description: ETHM 模块监听集成协议客户端连接所使用的端口。
Code:
  description: 可选代码，用于切换可开关输出。
```

## 配置分区、区域和输出

设置好连接详情后，您可以在 [**Satel Integra**](https://my.home-assistant.io/redirect/integration/?domain=satel_integra) 集成页面中，将分区、区域和输出配置为 **Subentries**。

通过运行 DLOADX 程序并连接到报警系统，您可以获取所有分区、区域和输出的 ID 列表。
要创建相应实体，请选择 **Add partition**、**Add zone**、**Add output** 或 **Add switchable output** 按钮。按照 UI 中的说明设置各个实体。
**Result**：每个分区都会拥有自己的报警面板；每个区域和输出都会有一个二进制传感器；每个可切换输出还会创建一个开关。

配置好区域和输出后，您就可以将它们用于自动化，例如在卧室检测到移动时作出响应。
例如：

```yaml
  alias: "Flick the input switch when movement in bedroom detected"
  triggers:
    - trigger: state
      entity_id: "binary_sensor.bedroom"
      to: "on"
  actions:
    - action: input_boolean.turn_on
      target:
        entity_id: input_boolean.movement_detected
```

## 移除此集成

此集成遵循标准的集成移除流程。移除此集成后，建议您通过 DLOADX 禁用 ETHM-1 Plus 模块的通信能力，以降低安全风险。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
