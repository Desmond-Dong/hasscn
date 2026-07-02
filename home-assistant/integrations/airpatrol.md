# AirPatrol

**Airpatrol** integration 允许您通过 Home Assistant 中的 [Airpatrol](https://www.airpatrol.com/) 设备控制空调机组。

## 前提条件

:::important
您的 Airpatrol WiFi 单元必须先通过原生 Airpatrol 应用程序进行配置，然后才能与此集成一起使用。这包括设置 Wi-Fi 连接和任何初始设备配置。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Email:
    description: 您在 Airpatrol 应用程序中的账户邮箱。
Password:
    description: 您在 Airpatrol 应用程序中的账户密码。
```

## 支持的功能

### 气候

集成为发现的每个空调系统创建一个气候实体。气候实体允许您控制：

* **HVAC 模式**：设置运行模式，如关闭、制热和制冷。
* **目标温度**：设置供暖或制冷所需温度。
* **风扇模式**：控制风扇速度（如果您的系统支持）。

### 传感器

集成为发现的每个空调系统创建以下传感器：

* **温度**：显示房间内的当前温度（°C）。
* **湿度**：显示房间内的当前湿度。

## 已知限制

根据您的具体 Airpatrol 型号和固件版本，某些功能可能不可用。请查看 Airpatrol 文档以了解您的具体设备的可用功能。此集成仅在 **Airpatrol WiFi v5** 上进行了测试。

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
