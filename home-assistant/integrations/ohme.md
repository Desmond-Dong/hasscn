# Ohme

The **Ohme** integration allows you to connect your [Ohme](https://ohme-ev.com/) EV charger to Home Assistant.

## Prerequisites

* 啊奥姆帐户。如果您使用 Google 等第三方帐户注册 Ohme，则在配置此集成之前需要[重置密码](https://api.ohme.io/fleet/index.html#/authentication/forgotten-password)。

## Supported devices

已知该集成支持以下设备：

* 欧姆家庭专业版
* 欧姆之家
* 奥梅·戈
* 欧姆 ePod

## Configuration

To add the **Ohme** device to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=ohme)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=ohme).
* From the list, select **Ohme**.
* Follow the instructions on screen to complete the setup.

</details>
```yaml
Email:
    description: "Email to log in to your Ohme account."
Password:
    description: "Password to log in to your Ohme account."
```

## Supported functionality

### Entities

Ohme 集成提供以下实体。

#### Buttons

* **批准收费**
  * **描述**：如果传感器**状态**为“待批准”，则将批准收费。
  * **适用于设备**：所有

#### Numbers

* **目标百分比**
  * **描述**：设置您车辆的充电目标。
  * **适用于设备**：所有
* **预处理持续时间**
  * **描述**：定义在目标时间之前对车辆进行预处理的时间。 “0”表示禁用预处理。
  * **适用于设备**：所有

#### Selects

* **充电模式**
  * **描述**：设置充电器的模式。可能的选项：“智能充电”、“最大充电”、“已暂停”。仅当车辆已插入电源时才可用。
  * **适用于设备**：所有
* **车辆**
  * **描述**：选择要充电的车辆。这将显示 Ohme 应用程序中配置的车辆。
  * **适用于设备**：所有

#### Sensors

* **状态**
  * **描述**：充电器的当前状态。可能的状态：“已拔出”、“待批准”、“已插入”、“正在充电”、“已完成充电”。
  * **适用于设备**：所有
* **电源**
  * **描述**：充电器的功率消耗（以千瓦为单位）。
  * **适用于设备**：所有
* **当前**
  * **描述**：充电器消耗的电流（以安培为单位）。
  * **适用于设备**：所有
* **能源**
  * **描述**：充电器的能耗（以千瓦时为单位）。
  * **适用于设备**：所有
* **电压**
  * **描述**：提供给充电器的电压。仅当连接车辆时才可用。
  * **适用于设备**：所有
* **充电槽列表**
  * **描述**：Ohme 生成的计划的费用槽列表。此功能仅在充电时可用。
  * **适用于设备**：所有

#### Switches

* **价格上限**
  * **描述**：当电价超过定义的阈值时防止充电。该阈值可以通过服务“ohme.set\_price\_cap”设置。 ***不适用于某些能源提供商和关税。***
  * **适用于设备**：所有
* **锁定按钮**
  * **描述**：禁用设备上的控件。
  * **适用于设备**：所有
* **需要批准**
  * **说明**：每次插入车辆时都需要批准。
  * **适用于设备**：Home Pro
* **不活动时睡觉**
  * **描述**：几分钟不活动后关闭设备屏幕。
  * **适用于设备**：Home Pro

#### Times

* **目标时间**
  * **说明**：设置您需要为车辆充电的时间。
  * **适用于设备**：所有

## Actions

该集成提供以下操作。

### Action: List charge slots

`ohme.list_charge_slots` 操作用于从充电器获取充电槽列表。仅当充电正在进行时，充电槽才会被返还。

| Data attribute         | Optional | Description                                                  |
|------------------------|----------|--------------------------------------------------------------|
| `config_entry`         | No       | The config entry of the account to get the charge list from. |

### Action: Set price cap

`ohme.set_price_cap` 操作用于设置价格上限阈值。这可以通过开关**价格上限**进行切换。

| Data attribute         | Optional | Description                                                 |
|------------------------|----------|-------------------------------------------------------------|
| `config_entry`         | No       | The config entry of the account to apply the price cap to.  |
| `price_cap`            | No       | Threshold in 1/100ths of your local currency.               |

## Use cases

这种集成使多个用例能够优化太阳能和/或电池存储系统的效率。

### 太阳能充电

使用充电器模式最大限度地提高太阳能消耗：

* 当太阳能产量较低时将充电器设置为“暂停”
* 在太阳高峰时段切换到“最大充电”

### 电池存储

如果您有家用电池系统：

* 当电池超过一定容量时为您的电动汽车充电
* 当电池需要补充时暂停电动汽车充电

## Examples

### 发送状态更改通知

要在充电器状态发生变化时收到通知（例如，当车辆插入电源时），您可以使用自动化功能。

```yaml
# Example automation
triggers:
  - trigger: state
    entity_id:
      - sensor.ohme_home_pro_status
    from: unplugged
actions:
  - action: notify.mobile_app_iphone
    data:
      message: "Vehicle plugged in"
```

## Troubleshooting

### 实体显示为不可用

您可能需要重新启动充电器。请参阅[制造商指南](https://ohme-ev.com/support/my-charger-is-offline/) 了解该过程。

## Data updates

此集成每 30 秒获取一次数据，但以下情况除外：

* CT 读数每分钟获取一次。
* 每 30 分钟获取一次设备设置。

## Known limitations

该集成不提供管理车辆或例程的功能，可以在制造商的应用程序上进行管理。

## Removing the integration

此集成遵循标准集成删除。不需要额外的步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
