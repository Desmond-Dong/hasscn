# Fronius

**Fronius** 集成轮询 [Fronius](https://www.fronius.com/) 太阳能逆变器或数据记录器，获取 Fronius SolarNet 设置的详细信息，并将其集成到您的 Home Assistant 安装中。

## 支持的设备

该集成支持所有具有集成 Datamanager 或提供版本 `v0` 或 `v1` 的 Fronius SolarAPI (JSON) 接口的外部"Datalogger Web"的逆变器。这包括：

* Agilo
* Eco
* Galvo
* Gen24
* IG Plus
* Primo
* Symo
* Symo Hybrid
* Tauro
* Verto (Plus)

连接到这些逆变器或数据记录器的设备也受支持。

* 电表（Fronius 智能电表或连接到逆变器的 S0 电表）
* Ohmpilot
* 储能

## 前提条件

您应该为 Fronius 设备设置静态 IP 或分配静态 DHCP 租约，或者如果您的网络配置相应，则通过本地 DNS 名称访问它。

:::note
对于 Gen24 设备（固件版本 >= 1.14.1），请确保在逆变器的 Web 界面中激活"Solar API"。对于较旧的设备，Solar API 应默认启用。

:::

## 配置

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: "设备的主机名或 IP 地址。"
    required: true
    type: string
```

## 监控数据

每个设备都会向 Home Assistant 添加一组传感器。

* SolarNet 设备

  * 记录器信息

    关于 Fronius 数据记录器的常规信息。"Gen24" 设备上不可用。
    每小时更新。

    * 序列号、软件和硬件平台
    * 数据记录器设置中设置的消耗能源和返回电网的能源的当前价格以及 CO₂ 因子

  * 功率流

    SolarNet 系统的累积数据。
    每 10 秒更新。

    * 当天、当年产生的能源和总产量
    * 输送到电网的功率（如果为正）或从电网消耗的功率（如果为负）
    * 作为发电机（如果为正）或消费者（如果为负）的功率负载
    * 电池充电功率（如果为正）或放电功率（如果为负）以及有关备用或待机模式的信息
    * 光伏发电量
    * 当前生产能源的相对自用率
    * 当前相对自主率

* 逆变器

  单个逆变器的当天、当年（Gen24 设备不提供当年数据）产生的能源和总产量、功率、电流、电压、频率和状态。
  每分钟更新。

* 电表

  有关功率、电流和电压的详细信息（如果支持），按相位分类。
  每分钟更新。

* Ohmpilot

  有关 Ohmpilot 的能源、功率和温度的详细信息。
  每分钟更新。

* 储能

  有关已安装电池的电流、电压、状态、循环次数、容量等的详细信息。
  每分钟更新。

当端点未正确响应时，更新间隔将增加到 10 分钟（功率流为 3 分钟），直到再次收到有效数据。这减少了使用夜间模式（无光伏发电时关闭）的 Fronius 设备的请求数量。

## 能源仪表板

推荐的[能源仪表板](/home-assistant/docs/energy/index.md)配置：

* 对于 *"太阳能发电"*：
  * 如果没有电池连接到逆变器：添加每个逆变器的 `总发电量` 实体。
  * 如果有电池连接到逆变器：使用 `SolarNet 光伏功率` 实体的 [黎曼和](/home-assistant/integrations/integration/index.md)。
* *"电池系统"* 能源值不直接受 Solar API 支持。使用 [黎曼和](/home-assistant/integrations/integration/index.md) 将 `SolarNet 电池充电功率` 和 `SolarNet 电池放电功率` 积分为能源值 (kWh)。
* 对于 *"设备"*，使用 Ohmpilot 的 `消耗能源` 实体。

与 Fronius 设备集成的电表可以安装在两种不同的安装位置：*"馈入路径"*（电网互连点）或\_"消耗路径"\_。

### 馈入路径电表

电表位于馈入路径的推荐能源仪表板配置：

* 对于 *"电网消耗"*，使用电表的 `实际消耗能源` 实体。
* 对于 *"返回电网"*，使用电表的 `实际发电能源` 实体。

### 消耗路径电表

电表位于消耗路径的推荐能源仪表板配置：

1. 使用 [黎曼和](/home-assistant/integrations/integration/index.md) 将 `SolarNet 电网输入功率` 和 `SolarNet 电网输出功率` 实体积分为能源值（Wh 或 kWh）。
2. 在能源仪表板配置中将这些能源实体用于 `电网消耗` 和 `返回电网`。

## 示例自动化

以下自动化在太阳能发电量超过特定阈值时切换开关：

```yaml
description: "当光伏功率高于 1000 W 时打开开关，低于 50 W 时关闭开关。"
mode: single
triggers:
  - trigger: state
    entity_id:
      - sensor.solarnet_power_photovoltaics
conditions: []
actions:
  - choose:
      - conditions:
          - condition: numeric_state
            entity_id: sensor.solarnet_power_photovoltaics
            above: 1000
        sequence:
          - action: switch.turn_on
            metadata: {}
            data: {}
            target:
              entity_id: switch.swtest
      - conditions:
          - condition: numeric_state
            entity_id: sensor.solarnet_power_photovoltaics
            below: 50
        sequence:
          - action: switch.turn_off
            metadata: {}
            data: {}
            target:
              entity_id: switch.swtest

```

## 注意

Fronius 经常为其系统中的数据管理器接口和设备提供固件更新，建议定期检查并应用它们。此集成依赖于相当新的固件中存在的功能。

## 已知限制

此集成使用的 Solar API 是只读的。它不提供任何控制 Fronius 设备的方法。然而，大多数 Fronius 设备确实直接支持 Modbus TCP，因此可以利用 [Modbus 集成](/home-assistant/integrations/modbus/index.md) 从 Home Assistant 控制设备。有关 Modbus 寄存器的详细信息可以在设备文档或 [Fronius 网站](https://www.fronius.com/) 找到。

## 故障排除

### 无法设置设备

* 确保设备在当前不产生能源时未处于省电模式。
* 确保设备已连接到网络且可从 Home Assistant 实例访问。
* 检查设备设置以确保 **Solar API** 已启用。

### 设置或重启 Home Assistant 后某些设备缺失

* 确保逆变器在当前不产生能源时未处于省电模式——或等待它们开始产生能源。

### 设置后某些实体缺失

某些数据（如光伏发电量）仅在非零时由 Fronius 设备提供。
在夜间添加集成时，可能不会添加提供光伏相关数据的实体。日出时，当 Fronius 设备开始提供更多数据时，将添加实体。

## 移除集成

可以按照以下步骤移除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
